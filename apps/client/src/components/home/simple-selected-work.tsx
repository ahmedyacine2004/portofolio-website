import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ArrowLeftRight, ArrowUpRight } from 'lucide-react';

import { DetailsDialog } from '@/components/home/simple-portfolio-motion';
import { CONSULTIFY_DETAILS, type WebProjectDetails } from '@/data/projects/consultify';
import { PORTFOLIO_WORKSPACE_DETAILS } from '@/data/projects/portfolio-workspace';
import { SHOPSPHERE_DETAILS } from '@/data/projects/shopsphere';
import { TASKFLOW_DASHBOARD_DETAILS } from '@/data/projects/taskflow-dashboard';
import { DESIGN_SYSTEM_OVERVIEW_DATA } from '@/data/projects/design-system';
import { HEALTHSYNC_OVERVIEW_DATA } from '@/data/projects/healthsync';
import {
  INSIGHT_ANALYTICS_OVERVIEW_DATA,
  type UIUXProjectOverviewData,
} from '@/data/projects/insight-analytics';
import { LEARNHUB_LMS_OVERVIEW_DATA } from '@/data/projects/learnhub-lms';
import { NEOBANK_MOBILE_OVERVIEW_DATA } from '@/data/projects/neobank-mobile';
import { TRAVELMATE_OVERVIEW_DATA } from '@/data/projects/travelmate';
import {
  APEX_BRAND_KIT_OVERVIEW_DATA,
  type GraphicDesignOverviewData,
} from '@/data/projects/apex-brand-kit';
import { EVENT_VISUAL_IDENTITY_OVERVIEW_DATA } from '@/data/projects/event-visual-identity';
import { SOCIAL_CAMPAIGN_2025_OVERVIEW_DATA } from '@/data/projects/social-campaign-2025';
import {
  GREENLEAF_MARKET_OVERVIEW_DATA,
  type BrandingOverviewData,
} from '@/data/projects/greenleaf-market';
import { LUMINA_STUDIO_OVERVIEW_DATA } from '@/data/projects/lumina-studio';
import { NOVA_COFFEE_OVERVIEW_DATA } from '@/data/projects/nova-coffee';
import consultifyImage from '@/assets/images/projects/consultify/consultify.png';
import portfolioImage from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/1.png';
import shopsphereImage from '@/assets/images/projects/shopsphere/storefront.jpg';
import taskflowImage from '@/assets/images/projects/taskflow/dashboard.jpg';

interface ProjectSection {
  title: string;
  description?: string;
  items?: string[];
}

interface ProjectFact {
  label: string;
  value: string;
}

interface SelectedProject {
  title: string;
  type: string;
  tagline: string;
  objective: string;
  image?: StaticImageData | string;
  workspaceHref: string;
  facts: ProjectFact[];
  sections: ProjectSection[];
}

function createWebProject(
  details: WebProjectDetails,
  type: string,
  image: StaticImageData,
  workspaceHref: string,
): SelectedProject {
  return {
    title: details.projectName,
    type,
    tagline: details.tagline,
    objective: details.coreObjective,
    image,
    workspaceHref,
    facts: [
      { label: 'Stage', value: details.currentPhase.join(' · ') },
      { label: 'Designed for', value: details.targetAudience.join(' · ') },
    ],
    sections: [
      {
        title: 'Product capabilities',
        items: details.systemModules.map(
          (module) => `${module.title} — ${module.description} (${module.status})`,
        ),
      },
      {
        title: 'Architecture',
        items: details.architectureSnapshot.map((node) => `${node.title}: ${node.subtitle}`),
      },
      { title: 'Engineering highlights', items: details.engineeringHighlights },
    ],
  };
}

function createUiUxProject(
  details: UIUXProjectOverviewData,
  workspaceHref: string,
): SelectedProject {
  return {
    title: details.projectName,
    type: 'UI/UX Design',
    tagline: details.tagline,
    objective: details.solutionStatement,
    image: details.heroImageUrl,
    workspaceHref,
    facts: details.metadata,
    sections: [
      { title: 'The challenge', description: details.problemStatement },
      {
        title: 'Experience highlights',
        items: details.keyFeatures.map((feature) => `${feature.title} — ${feature.description}`),
      },
      {
        title: 'Design process',
        items: details.designProcess.map(
          (step) => `${step.step} · ${step.title} — ${step.description}`,
        ),
      },
      {
        title: 'Outcome signals',
        items: details.metrics.map((metric) => {
          const change = metric.change ? ` (${metric.change})` : '';
          return `${metric.label}: ${metric.value}${change} — ${metric.description}`;
        }),
      },
      { title: 'Tools', items: details.tools },
    ],
  };
}

function createGraphicDesignProject(
  details: GraphicDesignOverviewData,
  workspaceHref: string,
): SelectedProject {
  return {
    title: details.projectName,
    type: 'Graphic Design',
    tagline: details.summary,
    objective: details.solution,
    workspaceHref,
    facts: [
      { label: 'Client', value: details.client },
      { label: 'Role', value: details.role },
      { label: 'Year', value: details.year },
    ],
    sections: [
      { title: 'The challenge', description: details.challenge },
      {
        title: 'Creative direction',
        items: details.pillars.map((pillar) => `${pillar.title} — ${pillar.description}`),
      },
      {
        title: 'Deliverables',
        items: details.deliverables,
      },
      {
        title: 'Project signals',
        items: details.metrics.map(
          (metric) => `${metric.label}: ${metric.value} (${metric.change})`,
        ),
      },
      { title: 'Tools', items: details.tools },
    ],
  };
}

function createBrandingProject(
  details: BrandingOverviewData,
  workspaceHref: string,
): SelectedProject {
  return {
    title: details.projectName,
    type: 'Branding',
    tagline: details.tagline,
    objective: details.executiveSummary.outcome,
    workspaceHref,
    facts: [
      { label: 'Client', value: details.client },
      { label: 'Industry', value: details.industry },
      { label: 'Year', value: details.year },
      { label: 'Duration', value: details.duration },
      { label: 'Status', value: details.status },
    ],
    sections: [
      { title: 'The challenge', description: details.executiveSummary.challenge },
      { title: 'Brand strategy', description: details.executiveSummary.strategy },
      {
        title: 'Brand pillars',
        items: details.brandPillars.map((pillar) => `${pillar.title} — ${pillar.description}`),
      },
      {
        title: 'Deliverables',
        items: details.deliverables.flatMap((group) =>
          group.items.map((item) => `${group.category}: ${item}`),
        ),
      },
    ],
  };
}

const projects: SelectedProject[] = [
  createWebProject(
    CONSULTIFY_DETAILS,
    'Web Development',
    consultifyImage,
    '/projects/web-dev/consultify/project-details',
  ),
  createWebProject(
    PORTFOLIO_WORKSPACE_DETAILS,
    'Web Development',
    portfolioImage,
    '/projects/web-dev/portfolio-workspace/project-details',
  ),
  createWebProject(
    TASKFLOW_DASHBOARD_DETAILS,
    'Web Development',
    taskflowImage,
    '/projects/web-dev/taskflow-dashboard/project-details',
  ),
  createWebProject(
    SHOPSPHERE_DETAILS,
    'Web Development',
    shopsphereImage,
    '/projects/web-dev/shopsphere/project-details',
  ),
  createUiUxProject(NEOBANK_MOBILE_OVERVIEW_DATA, '/projects/ui-ux/neobank-mobile/overview'),
  createUiUxProject(INSIGHT_ANALYTICS_OVERVIEW_DATA, '/projects/ui-ux/insight-analytics/overview'),
  createUiUxProject(HEALTHSYNC_OVERVIEW_DATA, '/projects/ui-ux/healthsync/overview'),
  createUiUxProject(TRAVELMATE_OVERVIEW_DATA, '/projects/ui-ux/travelmate/overview'),
  createUiUxProject(LEARNHUB_LMS_OVERVIEW_DATA, '/projects/ui-ux/learnhub-lms/overview'),
  createUiUxProject(DESIGN_SYSTEM_OVERVIEW_DATA, '/projects/ui-ux/design-system/overview'),
  createGraphicDesignProject(
    APEX_BRAND_KIT_OVERVIEW_DATA,
    '/projects/graphic-design/apex-brand-kit/overview',
  ),
  createGraphicDesignProject(
    SOCIAL_CAMPAIGN_2025_OVERVIEW_DATA,
    '/projects/graphic-design/social-campaign-2025/overview',
  ),
  createGraphicDesignProject(
    EVENT_VISUAL_IDENTITY_OVERVIEW_DATA,
    '/projects/graphic-design/event-visual-identity/overview',
  ),
  createBrandingProject(LUMINA_STUDIO_OVERVIEW_DATA, '/projects/branding/lumina-studio/overview'),
  createBrandingProject(NOVA_COFFEE_OVERVIEW_DATA, '/projects/branding/nova-coffee/overview'),
  createBrandingProject(
    GREENLEAF_MARKET_OVERVIEW_DATA,
    '/projects/branding/greenleaf-market/overview',
  ),
];

export function SimpleSelectedWork() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-y border-border/70 bg-background-secondary/35"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Projects across development, product design, and visual identity
            </p>
            <h2 className="font-beni text-4xl uppercase leading-none sm:text-5xl">Selected work</h2>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium text-foreground-tertiary">
            <ArrowLeftRight className="size-3.5 text-primary" />
            Scroll horizontally to explore all {projects.length} projects
          </div>
        </div>

        <div
          aria-label="Selected projects"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4"
        >
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group flex w-[min(82vw,340px)] shrink-0 snap-start flex-col overflow-hidden rounded-[8px] border border-border bg-card transition-colors hover:border-primary/50 sm:w-[340px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-background-secondary">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="340px"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-primary/20 via-background-secondary to-background p-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                      {project.type}
                    </span>
                    <p className="max-w-[15rem] font-beni text-3xl uppercase leading-none text-foreground">
                      {project.title}
                    </p>
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-[8px] border border-white/15 bg-black/55 px-2 py-1 font-mono text-[9px] text-white backdrop-blur">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="absolute bottom-3 right-3 rounded-[8px] border border-white/15 bg-black/65 px-2.5 py-1 text-[9px] font-semibold text-white backdrop-blur">
                  {project.type}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-sans text-base font-bold uppercase leading-tight tracking-wide">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-foreground-secondary">
                  {project.tagline}
                </p>
                <div className="mt-4 border-l-2 border-primary/40 pl-3">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-foreground-tertiary">
                    Project focus
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-foreground-secondary">
                    {project.objective}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                  <DetailsDialog triggerLabel="Explore project" title={project.title}>
                    <p className="text-sm leading-6 text-foreground-secondary">{project.tagline}</p>

                    <section className="rounded-[8px] border border-border bg-background p-4">
                      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Project focus
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-foreground">{project.objective}</p>
                    </section>

                    {project.facts.length > 0 && (
                      <dl className="grid gap-2 sm:grid-cols-2">
                        {project.facts.map((fact) => (
                          <div
                            key={fact.label}
                            className="rounded-[8px] border border-border bg-background p-3"
                          >
                            <dt className="text-[9px] font-semibold uppercase tracking-wider text-foreground-tertiary">
                              {fact.label}
                            </dt>
                            <dd className="mt-1 text-xs leading-5 text-foreground-secondary">
                              {fact.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {project.sections.map((section) => (
                      <section key={section.title}>
                        <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          {section.title}
                        </h3>
                        {section.description && (
                          <p className="text-xs leading-5 text-foreground-secondary">
                            {section.description}
                          </p>
                        )}
                        {section.items && (
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {section.items.map((item) => (
                              <li
                                key={item}
                                className="rounded-[8px] border border-border bg-background p-3 text-xs leading-5 text-foreground-secondary"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    ))}

                    <div className="border-t border-border pt-4">
                      <Link
                        href={project.workspaceHref}
                        className="inline-flex items-center gap-1.5 rounded-[8px] bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        Open full project workspace <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </DetailsDialog>
                  <Link
                    href={project.workspaceHref}
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-foreground-secondary transition-colors hover:text-primary"
                  >
                    Full workspace <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
