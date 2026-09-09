import { existsSync, readdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import type {
  AnalyticsSummary,
  ApiRequestLog,
  DashboardActivityItem,
  DashboardMetric,
  DashboardStatsResponse,
  DashboardSummaryResponse,
  DeviceStat,
  GoalProgressItem,
  HourlyStat,
  PageViewStat,
  ReferrerStat,
  SessionRecord,
  SessionStats,
  SystemHealthStatus,
  VisitorLog,
} from '../interfaces/dashboard.interface';

// ─── Circular Buffer ──────────────────────────────────────────────────────────

class CircularBuffer<T> {
  private buffer: T[] = [];
  private readonly max: number;

  constructor(max: number) {
    this.max = max;
  }

  push(item: T): void {
    if (this.buffer.length >= this.max) {
      this.buffer.shift();
    }
    this.buffer.push(item);
  }

  all(): T[] {
    return [...this.buffer].reverse();
  }

  get length(): number {
    return this.buffer.length;
  }
}

// ─── User-Agent Parser ────────────────────────────────────────────────────────

function parseDeviceLabel(ua: string): string {
  if (!ua || ua === '-') return 'Unknown';
  const lower = ua.toLowerCase();

  const isBot =
    lower.includes('bot') ||
    lower.includes('crawler') ||
    lower.includes('spider') ||
    lower.includes('slurp') ||
    lower.includes('facebookexternalhit') ||
    lower.includes('lighthouse');

  if (isBot) return 'Bot';

  const isMobile =
    lower.includes('mobile') ||
    lower.includes('android') ||
    lower.includes('iphone') ||
    lower.includes('ipod');

  const isTablet =
    lower.includes('ipad') ||
    (lower.includes('android') && !lower.includes('mobile'));

  const deviceType = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';

  let browser = 'Browser';
  if (lower.includes('edg/') || lower.includes('edge/')) browser = 'Edge';
  else if (lower.includes('opr/') || lower.includes('opera')) browser = 'Opera';
  else if (lower.includes('chrome') && !lower.includes('chromium'))
    browser = 'Chrome';
  else if (lower.includes('firefox')) browser = 'Firefox';
  else if (lower.includes('safari') && !lower.includes('chrome'))
    browser = 'Safari';
  else if (lower.includes('curl')) browser = 'cURL';
  else if (lower.includes('postman')) browser = 'Postman';

  return `${browser} / ${deviceType}`;
}

function maskIp(ip: string): string {
  if (!ip || ip === '::1' || ip === '127.0.0.1') return '127.0.0.x';
  if (ip.includes(':')) {
    // IPv6 — mask last 2 groups
    const parts = ip.split(':');
    return parts.slice(0, -2).join(':') + ':x:x';
  }
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.x.x`;
  }
  return ip;
}

function parseReferrerSource(referrer: string): string {
  if (!referrer || referrer === '-' || referrer === '') return 'Direct';
  try {
    const url = new URL(referrer);
    const host = url.hostname.replace(/^www\./, '');
    if (host.includes('google')) return 'Google';
    if (host.includes('github')) return 'GitHub';
    if (host.includes('linkedin')) return 'LinkedIn';
    if (host.includes('twitter') || host.includes('x.com'))
      return 'Twitter / X';
    if (host.includes('facebook')) return 'Facebook';
    if (host.includes('reddit')) return 'Reddit';
    if (host.includes('youtube')) return 'YouTube';
    return host;
  } catch {
    return 'Direct';
  }
}

function startOfDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function startOfWeek(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d.getTime();
}

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable()
export class DashboardService {
  private readonly startTime = Date.now();
  private readonly workspaceRoot = resolve(process.cwd(), '..', '..');
  private readonly clientDataRoot = join(
    this.workspaceRoot,
    'apps',
    'client',
    'src',
    'data',
  );
  private readonly projectsRoot = join(this.clientDataRoot, 'projects');
  private readonly skillsRoot = join(this.clientDataRoot, 'skills');

  // ─── Telemetry stores ───────────────────────────────────────────────────
  private readonly visitorBuffer = new CircularBuffer<VisitorLog>(500);
  private readonly requestBuffer = new CircularBuffer<ApiRequestLog>(1000);
  private readonly sessions = new Map<string, SessionRecord>();

  // ─── Filesystem helpers ─────────────────────────────────────────────────

  private listProjectFiles(): string[] {
    if (!existsSync(this.projectsRoot)) return [];
    return readdirSync(this.projectsRoot).filter(
      (f) => f.endsWith('.ts') && f !== 'index.ts',
    );
  }

  private listSkillFiles(): string[] {
    if (!existsSync(this.skillsRoot)) return [];
    return readdirSync(this.skillsRoot).filter(
      (f) => f.endsWith('.ts') && f !== 'index.ts',
    );
  }

  private getCodeLineCount(): number {
    const root = join(this.workspaceRoot, 'apps', 'client', 'src');
    if (!existsSync(root)) return 0;

    const walk = (dir: string): string[] => {
      const entries = readdirSync(dir, { withFileTypes: true });
      const files: string[] = [];
      for (const e of entries) {
        const p = join(dir, e.name);
        if (e.isDirectory()) files.push(...walk(p));
        else if (
          e.isFile() &&
          (e.name.endsWith('.ts') || e.name.endsWith('.tsx'))
        )
          files.push(p);
      }
      return files;
    };

    return walk(root).reduce((acc, f) => {
      const text = readFileSync(f, 'utf8');
      return acc + Math.max(0, text.split('\n').length);
    }, 0);
  }

  private deriveSkillDistribution(skillFiles: string[]) {
    const total = Math.max(skillFiles.length, 1);
    const match = (keywords: string[]) =>
      skillFiles.filter((f) => keywords.some((k) => f.includes(k))).length;

    const frontend = match(['react', 'nextjs', 'html', 'tailwindcss']);
    const backend = match(['nestjs', 'nodejs', 'express', 'spring']);
    const database = match(['database', 'databases', 'mongodb', 'jwt']);
    const devops = match(['devops', 'docker', 'apis', 'mobile']);

    return [
      {
        name: 'Frontend (React/Next.js)',
        count: Math.max(frontend, 1),
        percentage: Math.round((frontend / total) * 100),
        color: 'bg-sky-500',
      },
      {
        name: 'Backend (NestJS/Node/Express)',
        count: Math.max(backend, 1),
        percentage: Math.round((backend / total) * 100),
        color: 'bg-violet-600',
      },
      {
        name: 'Databases (MongoDB/PostgreSQL)',
        count: Math.max(database, 1),
        percentage: Math.round((database / total) * 100),
        color: 'bg-emerald-500',
      },
      {
        name: 'DevOps & Tooling (Docker/Git)',
        count: Math.max(devops, 1),
        percentage: Math.round((devops / total) * 100),
        color: 'bg-amber-500',
      },
    ];
  }

  // ─── Telemetry public API ───────────────────────────────────────────────

  /**
   * Called by TelemetryMiddleware for every HTTP request.
   */
  trackRequest(opts: {
    method: string;
    path: string;
    statusCode: number;
    latencyMs: number;
    ip: string;
    userAgent: string;
    referrer: string;
  }): void {
    const now = Date.now();
    const entry: ApiRequestLog = {
      id: randomUUID(),
      method: opts.method,
      path: opts.path,
      statusCode: opts.statusCode,
      latencyMs: opts.latencyMs,
      ip: maskIp(opts.ip),
      userAgent: opts.userAgent,
      timestamp: new Date(now).toISOString(),
      isError: opts.statusCode >= 400,
    };
    this.requestBuffer.push(entry);

    // Track visitor/session for non-API page requests
    if (!opts.path.startsWith('/api/')) {
      this.trackVisitor({
        ip: opts.ip,
        page: opts.path,
        referrer: opts.referrer,
        userAgent: opts.userAgent,
      });
    }
  }

  private trackVisitor(opts: {
    ip: string;
    page: string;
    referrer: string;
    userAgent: string;
  }): void {
    const now = Date.now();
    const deviceLabel = parseDeviceLabel(opts.userAgent);

    // Session key: ip + ua fingerprint
    const sessionKey = `${opts.ip}::${opts.userAgent.slice(0, 60)}`;

    const existing = this.sessions.get(sessionKey);
    if (existing) {
      existing.lastSeen = now;
      existing.pageCount += 1;
    } else {
      this.sessions.set(sessionKey, {
        sessionId: randomUUID(),
        ip: opts.ip,
        userAgent: opts.userAgent,
        deviceLabel,
        firstSeen: now,
        lastSeen: now,
        pageCount: 1,
      });
    }

    const session = this.sessions.get(sessionKey)!;

    // Purge sessions older than 30 minutes
    for (const [key, s] of this.sessions.entries()) {
      if (now - s.lastSeen > 30 * 60 * 1000) {
        this.sessions.delete(key);
      }
    }

    const visitor: VisitorLog = {
      id: randomUUID(),
      ip: maskIp(opts.ip),
      rawIp: opts.ip,
      page: opts.page || '/',
      referrer: opts.referrer || '',
      userAgent: opts.userAgent,
      deviceLabel,
      country: 'Unknown',
      timestamp: new Date(now).toISOString(),
      sessionId: session.sessionId,
    };

    this.visitorBuffer.push(visitor);
  }

  getVisitorLogs(limit = 50): VisitorLog[] {
    return this.visitorBuffer
      .all()
      .slice(0, limit)
      .map((v) => {
        const { rawIp: _rawIp, ...safe } = v;
        return safe as VisitorLog;
      });
  }

  getRequestLogs(limit = 100): ApiRequestLog[] {
    return this.requestBuffer.all().slice(0, limit);
  }

  getAnalytics(): AnalyticsSummary {
    const now = Date.now();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now);

    const allVisitors = this.visitorBuffer.all();
    const allRequests = this.requestBuffer.all();

    const visitorsToday = allVisitors.filter(
      (v) => new Date(v.timestamp).getTime() >= todayStart,
    );
    const visitorsWeek = allVisitors.filter(
      (v) => new Date(v.timestamp).getTime() >= weekStart,
    );
    const requestsToday = allRequests.filter(
      (r) => new Date(r.timestamp).getTime() >= todayStart,
    );

    // Top pages
    const pageMap = new Map<string, number>();
    for (const v of visitorsToday) {
      pageMap.set(v.page, (pageMap.get(v.page) ?? 0) + 1);
    }
    const totalPageViews =
      [...pageMap.values()].reduce((a, b) => a + b, 0) || 1;
    const topPages: PageViewStat[] = [...pageMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([page, views]) => ({
        page,
        views,
        percentage: Math.round((views / totalPageViews) * 100),
      }));

    // Device breakdown
    const deviceMap = new Map<string, number>();
    for (const v of visitorsToday) {
      const type = v.deviceLabel.includes('Bot')
        ? 'Bot'
        : v.deviceLabel.includes('Mobile')
          ? 'Mobile'
          : v.deviceLabel.includes('Tablet')
            ? 'Tablet'
            : v.deviceLabel === 'Unknown'
              ? 'Unknown'
              : 'Desktop';
      deviceMap.set(type, (deviceMap.get(type) ?? 0) + 1);
    }
    const totalDevices =
      [...deviceMap.values()].reduce((a, b) => a + b, 0) || 1;
    const deviceBreakdown: DeviceStat[] = [...deviceMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({
        type: type as DeviceStat['type'],
        count,
        percentage: Math.round((count / totalDevices) * 100),
      }));

    // Referrer breakdown
    const refMap = new Map<string, number>();
    for (const v of visitorsToday) {
      const src = parseReferrerSource(v.referrer);
      refMap.set(src, (refMap.get(src) ?? 0) + 1);
    }
    const totalRefs = [...refMap.values()].reduce((a, b) => a + b, 0) || 1;
    const referrerBreakdown: ReferrerStat[] = [...refMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([source, count]) => ({
        source,
        count,
        percentage: Math.round((count / totalRefs) * 100),
      }));

    // Hourly requests (last 24h)
    const hourlyMap = new Map<string, number>();
    for (let h = 23; h >= 0; h--) {
      const d = new Date(now - h * 3600 * 1000);
      const label = `${String(d.getHours()).padStart(2, '0')}:00`;
      hourlyMap.set(label, 0);
    }
    for (const r of requestsToday) {
      const d = new Date(r.timestamp);
      const label = `${String(d.getHours()).padStart(2, '0')}:00`;
      if (hourlyMap.has(label)) {
        hourlyMap.set(label, hourlyMap.get(label)! + 1);
      }
    }
    const hourlyRequests: HourlyStat[] = [...hourlyMap.entries()].map(
      ([hour, requests]) => ({ hour, requests }),
    );

    const errorsToday = requestsToday.filter((r) => r.isError).length;
    const avgLatencyMs =
      requestsToday.length > 0
        ? Math.round(
            requestsToday.reduce((acc, r) => acc + r.latencyMs, 0) /
              requestsToday.length,
          )
        : 0;

    const uniqueIpsToday = new Set(visitorsToday.map((v) => v.ip)).size;

    return {
      visitorsToday: visitorsToday.length,
      visitorsThisWeek: visitorsWeek.length,
      visitorsTotal: allVisitors.length,
      pageViewsToday: visitorsToday.length,
      uniqueIpsToday,
      topPages,
      deviceBreakdown,
      referrerBreakdown,
      hourlyRequests,
      requestsTotal: allRequests.length,
      requestsToday: requestsToday.length,
      errorsToday,
      avgLatencyMs,
    };
  }

  getSessionStats(): SessionStats {
    const now = Date.now();
    const todayStart = startOfDay(now);

    const activeSessions = [...this.sessions.values()].filter(
      (s) => now - s.lastSeen < 30 * 60 * 1000,
    );

    const totalSessionsToday = [...this.sessions.values()].filter(
      (s) => s.firstSeen >= todayStart,
    ).length;

    const avgDuration =
      activeSessions.length > 0
        ? Math.round(
            activeSessions.reduce(
              (acc, s) => acc + (s.lastSeen - s.firstSeen),
              0,
            ) / activeSessions.length,
          )
        : 0;

    // Top user agents
    const uaMap = new Map<string, number>();
    for (const s of this.sessions.values()) {
      const label = s.deviceLabel;
      uaMap.set(label, (uaMap.get(label) ?? 0) + 1);
    }
    const topUserAgents = [...uaMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([label, count]) => ({ label, count }));

    return {
      activeSessions: activeSessions.length,
      totalSessionsToday,
      avgSessionDurationMs: avgDuration,
      topUserAgents,
    };
  }

  // ─── Existing public API ────────────────────────────────────────────────

  getSummary(): DashboardSummaryResponse {
    const projectFiles = this.listProjectFiles();
    const skillFiles = this.listSkillFiles();
    const totalLines = this.getCodeLineCount();
    const projectCount = projectFiles.length;
    const skillCount = skillFiles.length;
    const codeVolume = Math.round(totalLines / 100) / 10;

    const analytics = this.getAnalytics();
    const health = this.getHealth();

    const metrics: DashboardMetric[] = [
      {
        id: 'visitors-today',
        label: 'Visitors Today',
        value: analytics.visitorsToday > 0 ? `${analytics.visitorsToday}` : '0',
        change: `${analytics.uniqueIpsToday} unique IPs`,
        trend: 'up',
        icon: 'Users',
        color: 'bg-sky-500',
        subtext: `${analytics.visitorsThisWeek} this week`,
      },
      {
        id: 'requests-today',
        label: 'API Requests',
        value: analytics.requestsToday > 0 ? `${analytics.requestsToday}` : '0',
        change:
          analytics.errorsToday > 0
            ? `${analytics.errorsToday} errors`
            : 'No errors',
        trend: analytics.errorsToday > 0 ? 'down' : 'up',
        icon: 'Activity',
        color: 'bg-violet-600',
        subtext: `${analytics.avgLatencyMs}ms avg latency`,
      },
      {
        id: 'projects',
        label: 'Total Projects',
        value: `${projectCount}+`,
        change: `${Math.max(2, Math.round(projectCount / 4))} active surfaces`,
        trend: 'up',
        icon: 'FolderKanban',
        color: 'bg-emerald-500',
        subtext: `${projectCount} project files tracked`,
      },
      {
        id: 'skills',
        label: 'Technologies',
        value: `${skillCount + 10}+`,
        change: `${skillCount} workspace domains`,
        trend: 'neutral',
        icon: 'Code2',
        color: 'bg-amber-500',
        subtext: 'TypeScript, React, NestJS',
      },
      {
        id: 'code-volume',
        label: 'Code Volume',
        value: `${Math.round(codeVolume)}k+`,
        change: 'Lines of Code',
        trend: 'up',
        icon: 'Zap',
        color: 'bg-rose-500',
        subtext: `Across ${projectCount} repositories`,
      },
      {
        id: 'system-uptime',
        label: 'System Uptime',
        value: health.uptimeFormatted,
        change: health.status === 'healthy' ? 'Operational' : health.status,
        trend: health.status === 'healthy' ? 'up' : 'down',
        icon: 'ShieldCheck',
        color: health.status === 'healthy' ? 'bg-emerald-600' : 'bg-amber-500',
        subtext: `${health.memoryUsageMb} MB heap used`,
      },
    ];

    return {
      metrics,
      workStatus: {
        availability: 'Available for Full-time & Freelance',
        focus: 'Building CONSULTIFY & Exploring AI-driven Workspaces',
        timezone: 'GMT+1 (Algiers, Algeria)',
        location: 'Tebessa, Algeria · ESTIN Student',
      },
      highlights: {
        featuredProject: {
          name: 'CONSULTIFY',
          slug: 'consultify',
          tech: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
          status: 'In Active Development',
        },
        totalCommitsEstimate: Math.round(projectCount * 30),
        linesOfCodeEstimate: `${Math.round(codeVolume)}k+`,
      },
    };
  }

  getActivity(category?: string, limit = 10): DashboardActivityItem[] {
    const projectFiles = this.listProjectFiles();
    const projectNames = projectFiles
      .map((f) => f.replace(/\.ts$/, ''))
      .slice(0, 5);

    const allActivities: DashboardActivityItem[] = projectNames.map(
      (projectName, index) => {
        const friendly = projectName
          .split('-')
          .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
          .join(' ');

        return {
          id: `act-${index + 1}`,
          title: `${friendly} Workspace`,
          description: `Repository-backed project surface indexed for ${friendly}.`,
          timestamp: new Date(
            Date.now() - 1000 * 60 * 60 * (index + 1),
          ).toISOString(),
          category: index % 2 === 0 ? 'project' : 'code',
          status: 'deployed',
          link: '/projects',
          badgeColor: index % 2 === 0 ? 'bg-violet-600' : 'bg-sky-500',
        };
      },
    );

    const systemActivity: DashboardActivityItem[] = [
      {
        id: 'act-system-1',
        title: 'Telemetry & Analytics Engine Online',
        description:
          'Real-time visitor tracking, session analytics, and request logging activated.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        category: 'system',
        status: 'verified',
        link: '/dashboard',
        badgeColor: 'bg-emerald-500',
      },
      {
        id: 'act-milestone-1',
        title: 'ESTIN Academic Milestone Completed',
        description:
          'Portfolio workspace advanced through the current project delivery cycle.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
        category: 'milestone',
        status: 'completed',
        link: '/about',
        badgeColor: 'bg-amber-500',
      },
    ];

    const merged = [...allActivities, ...systemActivity];
    const filtered =
      category && category !== 'all'
        ? merged.filter((item) => item.category === category)
        : merged;

    return filtered.slice(0, limit);
  }

  getStats(): DashboardStatsResponse {
    const projectFiles = this.listProjectFiles();
    const skillFiles = this.listSkillFiles();

    const monthlyActivity = [
      { month: 'Jan', contributions: 42 },
      { month: 'Feb', contributions: 68 },
      { month: 'Mar', contributions: 95 },
      { month: 'Apr', contributions: 82 },
      { month: 'May', contributions: 110 },
      { month: 'Jun', contributions: 124 },
      { month: 'Jul', contributions: 145 },
      {
        month: 'Aug',
        contributions: Math.min(190, projectFiles.length * 12 + 120),
      },
    ];

    return {
      techDistribution: this.deriveSkillDistribution(skillFiles),
      projectCategoryBreakdown: [
        {
          category: 'Full-Stack Apps',
          count: Math.max(1, Math.round(projectFiles.length * 0.38)),
        },
        {
          category: 'Frontend & UI Kits',
          count: Math.max(1, Math.round(projectFiles.length * 0.25)),
        },
        {
          category: 'Brand & Visual Identity',
          count: Math.max(1, Math.round(projectFiles.length * 0.18)),
        },
        {
          category: 'Backend & APIs',
          count: Math.max(1, Math.round(projectFiles.length * 0.14)),
        },
      ],
      skillProficiency: [
        {
          domain: 'Frontend Development',
          score: 94,
          skillsCount: Math.max(8, skillFiles.length),
        },
        {
          domain: 'Backend Architecture',
          score: 90,
          skillsCount: Math.max(6, skillFiles.length - 1),
        },
        {
          domain: 'UI/UX & Design Systems',
          score: 88,
          skillsCount: Math.max(6, Math.round(skillFiles.length * 0.8)),
        },
        {
          domain: 'Database & Data Modeling',
          score: 85,
          skillsCount: Math.max(4, Math.round(skillFiles.length * 0.7)),
        },
        {
          domain: 'DevOps & Deployment',
          score: 80,
          skillsCount: Math.max(4, Math.round(skillFiles.length * 0.6)),
        },
      ],
      monthlyActivity,
    };
  }

  getGoals(): GoalProgressItem[] {
    return [
      {
        id: 'goal-1',
        title: 'CONSULTIFY Platform v1.0 Launch',
        category: 'Product Launch',
        progress: 85,
        targetDate: 'Q3 2026',
        status: 'active',
      },
      {
        id: 'goal-2',
        title: 'Portfolio Workspace Interactive Shell V2',
        category: 'Engineering',
        progress: 95,
        targetDate: 'Q3 2026',
        status: 'active',
      },
      {
        id: 'goal-3',
        title: 'AWS Certified Cloud Practitioner',
        category: 'Certification',
        progress: 60,
        targetDate: 'Q4 2026',
        status: 'active',
      },
      {
        id: 'goal-4',
        title: 'Open-Source Devtools & Component Library',
        category: 'Open Source',
        progress: 40,
        targetDate: 'Q4 2026',
        status: 'planned',
      },
    ];
  }

  getHealth(): SystemHealthStatus {
    const uptimeSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = uptimeSeconds % 60;

    const mem = process.memoryUsage();
    const memoryUsageMb = Math.round(mem.heapUsed / 1024 / 1024);
    const memoryTotalMb = Math.round(mem.heapTotal / 1024 / 1024);
    const memoryPercent = Math.round((mem.heapUsed / mem.heapTotal) * 100);

    const cpu = process.cpuUsage();
    const allReqs = this.requestBuffer.all();
    const hourAgo = Date.now() - 3600 * 1000;
    const recentReqs = allReqs.filter(
      (r) => new Date(r.timestamp).getTime() >= hourAgo,
    );
    const errorsLastHour = recentReqs.filter((r) => r.isError).length;
    const avgLatencyMs =
      recentReqs.length > 0
        ? Math.round(
            recentReqs.reduce((a, r) => a + r.latencyMs, 0) / recentReqs.length,
          )
        : 0;

    return {
      status: 'healthy',
      uptimeSeconds,
      uptimeFormatted: `${hours}h ${minutes}m ${seconds}s`,
      memoryUsageMb,
      memoryTotalMb,
      memoryPercent,
      cpuUser: Math.round(cpu.user / 1000),
      cpuSystem: Math.round(cpu.system / 1000),
      nodeVersion: process.version,
      environment: process.env.NODE_ENV ?? 'development',
      databaseStatus: 'connected',
      apiLatencyMs: avgLatencyMs,
      version: '1.0.0',
      requestsTotal: allReqs.length,
      requestsLastHour: recentReqs.length,
      errorsLastHour,
    };
  }
}
