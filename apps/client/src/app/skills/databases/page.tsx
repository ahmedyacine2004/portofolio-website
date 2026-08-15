'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Database,
  DatabaseZap,
  ExternalLink,
  FileCode2,
  FolderGit2,
  HardDrive,
  KeyRound,
  Layers,
  Layers3,
  Lock,
  LucideIcon,
  Network,
  Play,
  RefreshCw,
  Search,
  Server,
  ServerCog,
  Shield,
  ShieldAlert,
  ShieldCheck,
  TableProperties,
  Terminal,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Database Schema Entity Definitions (Data -> Structure -> Relationships)
interface SchemaAttribute {
  name: string;
  type: string;
  tag?: 'PK' | 'FK' | 'IDX' | 'UNIQUE' | 'JSONB';
  desc: string;
}

interface SchemaEntity {
  id: string;
  name: string;
  type: 'SQL Table' | 'NoSQL Collection' | 'Cache Key-Value';
  records: string;
  engine: string;
  attributes: SchemaAttribute[];
  relationships: {
    target: string;
    type: '1:N' | 'M:N' | '1:1';
    foreignKey: string;
  }[];
}

const SCHEMA_ENTITIES: SchemaEntity[] = [
  {
    id: 'projects',
    name: 'projects_table',
    type: 'SQL Table',
    records: '18 Rows',
    engine: 'PostgreSQL / InnoDB',
    attributes: [
      { name: 'id', type: 'UUID', tag: 'PK', desc: 'Primary identifier' },
      { name: 'user_id', type: 'UUID', tag: 'FK', desc: 'Owner foreign key' },
      { name: 'slug', type: 'VARCHAR(120)', tag: 'IDX', desc: 'URL routing identifier' },
      { name: 'title', type: 'VARCHAR(200)', desc: 'Project headline' },
      { name: 'tech_stack', type: 'JSONB', tag: 'JSONB', desc: 'Indexed tags & metadata' },
      { name: 'is_featured', type: 'BOOLEAN', tag: 'IDX', desc: 'Filtered showcase flag' },
      { name: 'created_at', type: 'TIMESTAMP', desc: 'Creation timestamp' },
    ],
    relationships: [
      { target: 'users_table', type: '1:N', foreignKey: 'projects.user_id -> users.id' },
      { target: 'skills_matrix', type: 'M:N', foreignKey: 'project_skills (junction)' },
    ],
  },
  {
    id: 'users',
    name: 'users_table',
    type: 'SQL Table',
    records: '1.2K Rows',
    engine: 'PostgreSQL',
    attributes: [
      { name: 'id', type: 'UUID', tag: 'PK', desc: 'Primary identifier' },
      { name: 'email', type: 'VARCHAR(255)', tag: 'UNIQUE', desc: 'Unique account login' },
      { name: 'password_hash', type: 'CHAR(60)', desc: 'Bcrypt salted hash' },
      { name: 'role', type: 'ENUM(admin, user)', desc: 'RBAC authorization level' },
      { name: 'is_verified', type: 'BOOLEAN', desc: 'Email verification state' },
      { name: 'last_login', type: 'TIMESTAMP', desc: 'Session audit trace' },
    ],
    relationships: [
      { target: 'projects_table', type: '1:N', foreignKey: 'users.id -> projects.user_id' },
      { target: 'auth_sessions', type: '1:N', foreignKey: 'users.id -> sessions.user_id' },
    ],
  },
  {
    id: 'skills',
    name: 'skills_collection',
    type: 'NoSQL Collection',
    records: '32 Documents',
    engine: 'MongoDB Atlas',
    attributes: [
      { name: '_id', type: 'ObjectId', tag: 'PK', desc: 'BSON primary identifier' },
      { name: 'slug', type: 'String', tag: 'IDX', desc: 'Unique index on path' },
      { name: 'name', type: 'String', desc: 'Skill display title' },
      { name: 'category', type: 'String', tag: 'IDX', desc: 'Frontend, Backend, DB...' },
      { name: 'proficiency', type: 'Number', desc: 'Percentage mastery' },
      { name: 'toolkit', type: 'Array<Object>', desc: 'Nested sub-competencies' },
    ],
    relationships: [
      { target: 'projects_table', type: 'M:N', foreignKey: 'Referenced in tech_stack' },
    ],
  },
  {
    id: 'sessions',
    name: 'redis_cache_store',
    type: 'Cache Key-Value',
    records: '4.8K Keys',
    engine: 'Redis In-Memory',
    attributes: [
      { name: 'sess:{token_hash}', type: 'STRING', tag: 'PK', desc: 'TTL 7 Days active session' },
      { name: 'rate:{ip_address}', type: 'INTEGER', tag: 'IDX', desc: 'Sliding window counter' },
      { name: 'cache:projects:all', type: 'JSON STRING', desc: 'Hydrated project payload' },
      { name: 'stats:views:today', type: 'HYPERLOGLOG', desc: 'Cardinality counter' },
    ],
    relationships: [
      { target: 'users_table', type: '1:1', foreignKey: 'In-Memory mapping to user_id' },
    ],
  },
];

// Interactive Query Optimization Simulator
interface QuerySample {
  id: string;
  title: string;
  dialect: 'PostgreSQL SQL' | 'MongoDB MQL' | 'Redis CLI';
  code: string;
  executionPlan: {
    nodeType: string;
    indexUsed: string;
    cost: string;
    rows: number;
    latency: string;
    improvement: string;
  };
  purpose: string;
}

const QUERY_SAMPLES: QuerySample[] = [
  {
    id: 'sql-complex-join',
    title: 'Optimized Filtered Join with Compound Index',
    dialect: 'PostgreSQL SQL',
    code: `SELECT p.id, p.title, p.slug, u.email, COUNT(s.id) AS skill_count
FROM projects p
INNER JOIN users u ON p.user_id = u.id
LEFT JOIN project_skills ps ON ps.project_id = p.id
LEFT JOIN skills s ON s.id = ps.skill_id
WHERE p.is_featured = true AND p.category = 'fullstack'
GROUP BY p.id, u.email
ORDER BY p.created_at DESC
LIMIT 6;`,
    executionPlan: {
      nodeType: 'Index Scan using idx_projects_featured_created',
      indexUsed: 'B-Tree (is_featured, created_at DESC)',
      cost: '0.28..12.45',
      rows: 6,
      latency: '0.74ms',
      improvement: '48x faster than Seq Scan (35.5ms)',
    },
    purpose:
      'Fetches featured portfolio projects with aggregated skills while avoiding full table locks.',
  },
  {
    id: 'mongo-aggregation',
    title: 'Multi-Stage Document Aggregation Pipeline',
    dialect: 'MongoDB MQL',
    code: `db.skills.aggregate([
  { $match: { category: "databases", proficiency: { $gte: 75 } } },
  { $lookup: {
      from: "projects",
      localField: "slug",
      foreignField: "tech_stack",
      as: "featured_in"
  } },
  { $project: {
      name: 1,
      proficiency: 1,
      projectCount: { $size: "$featured_in" },
      toolkit: 1
  } },
  { $sort: { proficiency: -1 } }
]);`,
    executionPlan: {
      nodeType: 'IXSCAN on idx_category_proficiency -> $lookup',
      indexUsed: 'Compound Index { category: 1, proficiency: -1 }',
      cost: 'Keys Examined: 5, Docs Examined: 5',
      rows: 5,
      latency: '1.18ms',
      improvement: 'Direct index seek with zero document scans',
    },
    purpose:
      'Correlates skills with portfolio projects in a single non-blocking database roundtrip.',
  },
  {
    id: 'redis-cache-get',
    title: 'Sub-Millisecond In-Memory Cache Lookup',
    dialect: 'Redis CLI',
    code: `# Atomic Token Verification & Rate Counter
EVAL "
  local token = redis.call('GET', KEYS[1])
  if not token then return nil end
  local count = redis.call('INCR', KEYS[2])
  if count == 1 then redis.call('EXPIRE', KEYS[2], 60) end
  return {token, count}
" 2 sess:auth_98a7bc rate:ip_197_45_23`,
    executionPlan: {
      nodeType: 'O(1) In-Memory Lookup & Sliding Counter',
      indexUsed: 'In-Memory Hash Table / Direct RAM Pointer',
      cost: 'CPU Time: < 0.1ms',
      rows: 1,
      latency: '0.19ms',
      improvement: 'Eliminates 99.4% of direct SQL hits',
    },
    purpose:
      'Verifies user session and applies rate-limiting in a single atomic Lua script on RAM.',
  },
];

// Categorized Database Technology Clusters
interface DatabaseTechItem {
  name: string;
  role: string;
  slug?: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  icon: LucideIcon;
  paradigm: string;
  tags: string[];
}

interface DatabaseCategoryCluster {
  title: string;
  description: string;
  icon: LucideIcon;
  items: DatabaseTechItem[];
}

const DATABASE_CLUSTERS: DatabaseCategoryCluster[] = [
  {
    title: 'Relational Databases (SQL & ACID)',
    description: 'Structured data modeling, strict constraints, and transaction safety',
    icon: TableProperties,
    items: [
      {
        name: 'PostgreSQL',
        role: 'Advanced ACID relational database with JSONB & indexing power',
        slug: 'postgresql',
        level: 'Expert',
        icon: Database,
        paradigm: 'Relational (ACID)',
        tags: ['JSONB Support', 'B-Tree & GIN', 'Transactions', 'PL/pgSQL'],
      },
      {
        name: 'MySQL',
        role: 'Battle-tested relational engine for high-volume read workloads',
        slug: 'mysql',
        level: 'Advanced',
        icon: Database,
        paradigm: 'Relational (InnoDB)',
        tags: ['InnoDB B+ Tree', 'Replication', 'Query Cache', 'Foreign Keys'],
      },
      {
        name: 'SQLite',
        role: 'Zero-configuration embedded serverless relational engine',
        level: 'Advanced',
        icon: Database,
        paradigm: 'Embedded SQL',
        tags: ['WAL Mode', 'Single-File', 'Mobile & Local', 'Low Overhead'],
      },
    ],
  },
  {
    title: 'Document & NoSQL Stores',
    description: 'Schema flexibility, hierarchical documents, and horizontal scalability',
    icon: Layers,
    items: [
      {
        name: 'MongoDB Atlas',
        role: 'Document-oriented NoSQL database with dynamic JSON schemas',
        slug: 'mongodb',
        level: 'Expert',
        icon: Database,
        paradigm: 'Document Store',
        tags: ['Aggregation Pipeline', 'Compound Index', 'Mongoose ODM', 'Replica Sets'],
      },
      {
        name: 'Firebase Firestore',
        role: 'Cloud document database with live WebSocket synchronization',
        slug: 'firebase',
        level: 'Proficient',
        icon: HardDrive,
        paradigm: 'BaaS / Document',
        tags: ['Real-Time Sync', 'Security Rules', 'Subcollections', 'Offline Persistence'],
      },
    ],
  },
  {
    title: 'In-Memory, Cache & ORM Tooling',
    description: 'Sub-millisecond data structures and type-safe abstraction layers',
    icon: Zap,
    items: [
      {
        name: 'Redis',
        role: 'Ultra-fast in-memory key-value store for caching & pub/sub',
        slug: 'redis',
        level: 'Advanced',
        icon: Zap,
        paradigm: 'In-Memory KV',
        tags: ['Sub-ms Latency', 'Pub/Sub', 'Sorted Sets', 'Session Cache'],
      },
      {
        name: 'TypeORM & Prisma',
        role: 'Type-safe object relational mapping & schema migrations',
        level: 'Expert',
        icon: FileCode2,
        paradigm: 'ORM / QueryBuilder',
        tags: ['Data Migrations', 'Schema Drift', 'Type-Safety', 'Relations'],
      },
    ],
  },
];

export default function DatabasesSkillsPage() {
  const [selectedEntityId, setSelectedEntityId] = useState<string>('projects');
  const [selectedQueryId, setSelectedQueryId] = useState<string>('sql-complex-join');
  const [isExecutingQuery, setIsExecutingQuery] = useState<boolean>(false);

  const selectedEntity = useMemo(
    () => SCHEMA_ENTITIES.find((e) => e.id === selectedEntityId) || SCHEMA_ENTITIES[0],
    [selectedEntityId],
  );

  const selectedQuery = useMemo(
    () => QUERY_SAMPLES.find((q) => q.id === selectedQueryId) || QUERY_SAMPLES[0],
    [selectedQueryId],
  );

  const handleRunQuery = (queryId: string) => {
    setSelectedQueryId(queryId);
    setIsExecutingQuery(true);
    setTimeout(() => {
      setIsExecutingQuery(false);
    }, 280);
  };

  return (
    <motion.div
      className="h-full w-full space-y-6 rounded-[8px] bg-background p-4 text-foreground md:p-8 overflow-y-auto overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. DATABASE CLUSTER HEADER & STORAGE ENGINE STATUS */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 border-b border-border/40 pb-5 lg:flex-row lg:items-center"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-[28px]">
              DATABASES WORKSPACE
            </h1>
            <span className="flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-0.5 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
              <span className="size-2 rounded-full bg-violet-500 animate-pulse" />
              Engines Online
            </span>
          </div>
          <p className="mt-1 max-w-2xl font-inter text-[13px] text-muted-foreground">
            Designing normalized data architectures, high-performance indexing strategies, ACID
            transactional guarantees, and distributed caches.
          </p>
        </div>

        {/* Database Metrics Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Database className="size-4 text-violet-600 dark:text-violet-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">
                Postgres / Mongo / Redis
              </span>
              <span className="text-[10px] text-muted-foreground">Active Engines</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Zap className="size-4 text-violet-600 dark:text-violet-400" />
            <div className="flex flex-col">
              <span className="font-mono text-[12px] font-bold leading-none">99.4%</span>
              <span className="text-[10px] text-muted-foreground">Buffer Cache Hit</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <Clock className="size-4 text-violet-600 dark:text-violet-400" />
            <div className="flex flex-col">
              <span className="font-mono text-[12px] font-bold leading-none">&lt; 1.2ms</span>
              <span className="text-[10px] text-muted-foreground">P95 Query Time</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[10px] border border-border/50 bg-card px-3.5 py-2 shadow-xs">
            <ShieldCheck className="size-4 text-violet-600 dark:text-violet-400" />
            <div className="flex flex-col">
              <span className="font-inter text-[12px] font-bold leading-none">ACID Compliant</span>
              <span className="text-[10px] text-muted-foreground">Data Integrity</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. DATA ARCHITECTURE: SCHEMA & RELATIONSHIP ENTITY INSPECTOR (Structure -> Relationships) */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
      >
        <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <TableProperties className="size-4 text-violet-600 dark:text-violet-400" />
              <h2 className="font-inter text-[16px] font-black uppercase tracking-tight text-foreground md:text-[18px]">
                Data Architecture &amp; Entity Schema Inspector
              </h2>
            </div>
            <p className="font-inter text-[12px] text-muted-foreground">
              Inspecting normalized table schemas, primary keys (`PK`), foreign keys (`FK`),
              compound indexes (`IDX`), and data relations.
            </p>
          </div>

          {/* Entity Tab Switcher */}
          <div className="flex flex-wrap items-center gap-1 rounded-[8px] bg-muted/30 p-1 border border-border/40">
            {SCHEMA_ENTITIES.map((entity) => {
              const isSelected = selectedEntityId === entity.id;
              return (
                <button
                  key={entity.id}
                  onClick={() => setSelectedEntityId(entity.id)}
                  className={`rounded-[6px] px-2.5 py-1 font-mono text-[11px] font-semibold transition-all ${
                    isSelected
                      ? 'bg-card text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {entity.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Entity Schema Structure & Relationship Diagram */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Table Attribute Grid */}
          <div className="rounded-[10px] border border-border/40 bg-muted/10 p-4 lg:col-span-8">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="size-4 text-violet-600 dark:text-violet-400" />
                <span className="font-mono text-[13px] font-bold text-foreground">
                  {selectedEntity.name}
                </span>
                <span className="rounded bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] font-bold text-violet-600 dark:text-violet-400">
                  {selectedEntity.type}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <span>
                  Engine: <strong className="text-foreground">{selectedEntity.engine}</strong>
                </span>
                <span>•</span>
                <span>
                  Records: <strong className="text-foreground">{selectedEntity.records}</strong>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-border/40 text-[10px] uppercase text-muted-foreground">
                    <th className="pb-2 font-semibold">Attribute</th>
                    <th className="pb-2 font-semibold">Type</th>
                    <th className="pb-2 font-semibold">Constraint</th>
                    <th className="pb-2 font-semibold">Purpose &amp; Index Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {selectedEntity.attributes.map((attr, i) => (
                    <tr key={i} className="transition-colors hover:bg-muted/30">
                      <td className="py-2 font-bold text-foreground">{attr.name}</td>
                      <td className="py-2 text-violet-600 dark:text-violet-400">{attr.type}</td>
                      <td className="py-2">
                        {attr.tag ? (
                          <span
                            className={`rounded px-1.5 py-0.5 text-[8.5px] font-bold ${
                              attr.tag === 'PK'
                                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                : attr.tag === 'FK'
                                  ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                                  : attr.tag === 'IDX'
                                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-violet-500/15 text-violet-600 dark:text-violet-400'
                            }`}
                          >
                            {attr.tag}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60">-</span>
                        )}
                      </td>
                      <td className="py-2 text-muted-foreground">{attr.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Relationship & Cardinality Inspector */}
          <div className="flex flex-col justify-between rounded-[10px] border border-border/40 bg-muted/10 p-4 lg:col-span-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Network className="size-4 text-violet-600 dark:text-violet-400" />
                <h3 className="font-inter text-[12px] font-bold uppercase tracking-wide text-foreground">
                  Cardinality &amp; Relationships
                </h3>
              </div>

              <div className="space-y-2.5">
                {selectedEntity.relationships.map((rel, idx) => (
                  <div
                    key={idx}
                    className="rounded-[8px] border border-border/30 bg-card p-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between font-mono text-[10.5px]">
                      <span className="font-bold text-foreground">{rel.target}</span>
                      <span className="rounded bg-violet-500/10 px-1.5 py-0.2 text-[9px] font-bold text-violet-600 dark:text-violet-400">
                        {rel.type}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[9.5px] text-muted-foreground">
                      {rel.foreignKey}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-[8px] bg-violet-500/10 p-3 font-mono text-[10px] text-violet-700 dark:text-violet-300 border border-violet-500/20">
              <div className="flex items-center justify-between">
                <span>Referential Integrity:</span>
                <span className="font-bold">ON DELETE CASCADE</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-muted-foreground">
                <span>B-Tree Tree Depth:</span>
                <span className="font-bold text-foreground">3 Levels</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. QUERY OPTIMIZATION TERMINAL & EXECUTION PLAN SIMULATOR (Queries) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* QUERY SELECTOR & CODE RUNNER */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-7"
        >
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-violet-600 dark:text-violet-400" />
                <h2 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                  Query Execution &amp; Plan Optimizer
                </h2>
              </div>
              <span className="font-mono text-[9px] text-muted-foreground">
                Select query to analyze
              </span>
            </div>

            {/* Query Buttons */}
            <div className="mb-3 flex flex-wrap gap-2">
              {QUERY_SAMPLES.map((q) => {
                const isSelected = selectedQueryId === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleRunQuery(q.id)}
                    className={`flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 font-mono text-[10px] font-semibold transition-all ${
                      isSelected
                        ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400'
                        : 'border-border/40 bg-muted/20 text-muted-foreground hover:bg-muted/40'
                    }`}
                  >
                    <Play className="size-2.5" />
                    {q.dialect}
                  </button>
                );
              })}
            </div>

            {/* Query Code Block */}
            <div className="relative rounded-[8px] bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-slate-200 border border-slate-800 overflow-x-auto">
              <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-1.5 text-[9.5px] text-slate-400">
                <span>{selectedQuery.title}</span>
                <span className="text-violet-400">{selectedQuery.dialect}</span>
              </div>
              <pre className="text-slate-100 whitespace-pre-wrap">{selectedQuery.code}</pre>
            </div>
            <p className="mt-2 text-[10.5px] text-muted-foreground">
              <strong>Purpose:</strong> {selectedQuery.purpose}
            </p>
          </div>
        </motion.div>

        {/* EXPLAIN ANALYZE EXECUTION PLAN */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-5"
        >
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-violet-600 dark:text-violet-400" />
                <h3 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
                  EXPLAIN ANALYZE Breakdown
                </h3>
              </div>
              {isExecutingQuery && (
                <span className="flex items-center gap-1 font-mono text-[9px] text-violet-600 dark:text-violet-400 animate-pulse">
                  <RefreshCw className="size-2.5 animate-spin" /> Scanning Index...
                </span>
              )}
            </div>

            <div className="space-y-2.5 font-mono text-[11px]">
              <div className="rounded-[8px] bg-muted/20 p-3 border border-border/30">
                <span className="text-[9.5px] text-muted-foreground uppercase">Execution Node</span>
                <p className="mt-0.5 font-bold text-foreground">
                  {selectedQuery.executionPlan.nodeType}
                </p>
              </div>

              <div className="rounded-[8px] bg-muted/20 p-3 border border-border/30">
                <span className="text-[9.5px] text-muted-foreground uppercase">Index Utilized</span>
                <p className="mt-0.5 font-bold text-violet-600 dark:text-violet-400">
                  {selectedQuery.executionPlan.indexUsed}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-[8px] bg-muted/20 p-2.5 border border-border/30">
                  <span className="text-[9px] text-muted-foreground uppercase">Optimizer Cost</span>
                  <p className="mt-0.5 font-bold text-foreground">
                    {selectedQuery.executionPlan.cost}
                  </p>
                </div>
                <div className="rounded-[8px] bg-muted/20 p-2.5 border border-border/30">
                  <span className="text-[9px] text-muted-foreground uppercase">
                    Execution Latency
                  </span>
                  <p className="mt-0.5 font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedQuery.executionPlan.latency}
                  </p>
                </div>
              </div>

              <div className="rounded-[8px] bg-emerald-500/10 p-2.5 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                <span className="text-[9px] uppercase font-bold">Optimization Gain</span>
                <p className="mt-0.5 text-[10.5px] font-semibold">
                  {selectedQuery.executionPlan.improvement}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. STORAGE & PERSISTENCE LIFECYCLE (Storage) */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-5 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="size-4 text-violet-600 dark:text-violet-400" />
            <h3 className="font-inter text-[13px] font-bold uppercase tracking-wide text-foreground">
              4-Tier Storage &amp; Persistence Hierarchy
            </h3>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            From RAM buffer pool down to non-volatile SSD pages
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Tier 01: Buffer Cache & Shared Memory',
              desc: 'Sub-millisecond access for active working set, reducing disk I/O load.',
              metric: '99.4% Hit Rate',
              icon: Zap,
            },
            {
              title: 'Tier 02: Write-Ahead Log (WAL)',
              desc: 'Sequential transaction journaling ensuring zero data loss on crash (Atomicity & Durability).',
              metric: 'Synchronous Flush',
              icon: ShieldCheck,
            },
            {
              title: 'Tier 03: Persistent B+ Tree Pages',
              desc: 'Segmented tablespaces, clustering indexes, and compression on NVMe SSD storage.',
              metric: '4,200 IOPS',
              icon: Database,
            },
            {
              title: 'Tier 04: Replica Sets & Automated Snapshots',
              desc: 'Primary-secondary replication with automatic failover and point-in-time recovery.',
              metric: '0ms Replica Lag',
              icon: HardDrive,
            },
          ].map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-[8px] border border-border/30 bg-muted/20 p-3.5"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Icon className="size-4 text-violet-600 dark:text-violet-400" />
                    <span className="font-mono text-[9.5px] font-bold text-violet-600 dark:text-violet-400">
                      {tier.metric}
                    </span>
                  </div>
                  <h4 className="font-inter text-[12px] font-bold text-foreground">{tier.title}</h4>
                  <p className="mt-1 text-[10.5px] text-muted-foreground leading-relaxed">
                    {tier.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 5. DATABASE TECHNOLOGY CLUSTERS (Relational, Document, In-Memory) */}
      <motion.div variants={cardVariants} className="space-y-4">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-inter text-[18px] font-black uppercase tracking-tight text-foreground md:text-[20px]">
              Database Technology Taxonomy
            </h2>
            <p className="font-inter text-[12px] text-muted-foreground">
              Deep expertise across Relational RDBMS, Document NoSQL databases, and In-Memory
              key-value caching.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DATABASE_CLUSTERS.map((cluster) => {
            const ClusterIcon = cluster.icon;
            return (
              <div
                key={cluster.title}
                className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-[8px] bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                      <ClusterIcon className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-inter text-[14px] font-bold text-foreground">
                        {cluster.title}
                      </h3>
                      <p className="text-[10.5px] text-muted-foreground leading-tight">
                        {cluster.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {cluster.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={item.name}
                          className="group rounded-[8px] border border-border/30 bg-muted/20 p-3 transition-colors hover:bg-muted/40"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <ItemIcon className="size-3.5 text-violet-600 dark:text-violet-400" />
                              <span className="font-inter text-[12px] font-bold text-foreground">
                                {item.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="rounded bg-violet-500/10 px-1.5 py-0.2 font-mono text-[8px] font-bold text-violet-600 dark:text-violet-400">
                                {item.level}
                              </span>
                              {item.slug && (
                                <Link
                                  href={`/skills/databases/${item.slug}`}
                                  className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                                  title={`Open ${item.name} workspace`}
                                >
                                  <ExternalLink className="size-3" />
                                </Link>
                              )}
                            </div>
                          </div>

                          <p className="mt-1 text-[10.5px] text-muted-foreground leading-tight">
                            {item.role}
                          </p>

                          <div className="mt-2.5 flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-[4px] border border-border/40 bg-card px-1.5 py-0.5 text-[9px] font-medium text-foreground/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 6. BOTTOM EXPLORE LINK BANNER */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-4 rounded-[12px] border border-violet-500/30 bg-violet-500/5 p-5 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <DatabaseZap className="size-5" />
          </div>
          <div>
            <h4 className="font-inter text-[13px] font-bold text-foreground">
              Explore Dedicated Database Workspaces
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Access individual schema metrics, execution logs, and indexing blueprints for MongoDB,
              PostgreSQL, MySQL, and Redis.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/skills/databases/mongodb"
            className="inline-flex items-center gap-1 rounded-[6px] bg-violet-600 px-3 py-1.5 font-inter text-[11px] font-semibold text-white shadow-xs transition-colors hover:bg-violet-700"
          >
            MongoDB Workspace <ArrowRight className="size-3" />
          </Link>
          <Link
            href="/skills/databases/postgresql"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            PostgreSQL Workspace
          </Link>
          <Link
            href="/skills/databases/redis"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            Redis Workspace
          </Link>
          <Link
            href="/skills/databases/mysql"
            className="inline-flex items-center gap-1 rounded-[6px] border border-border/50 bg-card px-3 py-1.5 font-inter text-[11px] font-semibold text-foreground transition-colors hover:bg-muted/40"
          >
            MySQL Workspace
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
