/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code,
  Cpu,
  FileBadge,
  Filter,
  Layers,
  Lock,
  Search,
  ShieldCheck,
  User,
} from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useTranslation } from '@/hooks/use-translation';

// Import Icons from src/assets/icons
import awsIcon from '@/assets/icons/aws.svg';
import googleIcon from '@/assets/icons/google.svg';
import metaIcon from '@/assets/icons/meta.svg';
import mongodbIcon from '@/assets/icons/mongodb.svg';
import oracleIcon from '@/assets/icons/oracle.svg';

// Import Certificate Images from src/assets/images
import awsCertImage from '@/assets/images/aws-certificate.png';
import mongodbCertImage from '@/assets/images/mongodb-certificate.png';
import oracleCertImage from '@/assets/images/oracle-certificate.png';

interface SkillPill {
  name: string;
  color: string;
}

interface KeyTopic {
  title: string;
  subtitle: string;
  iconBg: string;
  icon: any;
}

interface RelatedProject {
  title: string;
  tech: string;
}

interface Certification {
  id: string;
  provider: string;
  title: string;
  issuedDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl: string;
  level: string;
  status: 'Verified' | 'Completed';
  activeStatus: 'Active' | 'Expired';
  credentialType: string;
  about: string;
  logo: StaticImageData | string;
  certImage: StaticImageData | string;
  skills: SkillPill[];
  keyTopics: KeyTopic[];
  relatedProjects: RelatedProject[];
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'aws-dev-assoc',
    provider: 'Amazon Web Services',
    title: 'AWS Certified Developer - Associate',
    issuedDate: 'May 15, 2024',
    expiryDate: 'May 15, 2027',
    credentialId: 'AWS-DA-2024-5F4A',
    verificationUrl: 'https://aws.amazon.com/verification',
    level: 'Associate Level',
    status: 'Verified',
    activeStatus: 'Active',
    credentialType: 'Certification',
    logo: awsIcon,
    certImage: awsCertImage,
    about:
      'This certification validates my ability to develop, deploy and debug secure and scalable applications on AWS. It demonstrates hands-on experience with AWS core services, SDKs, and best practices.',
    skills: [
      {
        name: 'AWS Lambda',
        color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      },
      {
        name: 'ECS',
        color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      },
      {
        name: 'CloudFormation',
        color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
      },
      {
        name: 'S3',
        color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      },
      {
        name: 'DynamoDB',
        color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      },
      { name: 'IAM', color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
      {
        name: 'AWS SDK',
        color: 'bg-blue-600/10 text-blue-600 dark:text-blue-400',
      },
      {
        name: 'API Gateway',
        color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      },
      {
        name: 'CloudWatch',
        color: 'bg-pink-600/10 text-pink-600 dark:text-pink-400',
      },
      {
        name: 'Best Practices',
        color: 'bg-red-600/10 text-red-600 dark:text-red-400',
      },
      { name: 'Security', color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
    ],
    keyTopics: [
      {
        title: 'Developing on AWS',
        subtitle: 'Building and deploying cloud applications',
        iconBg: 'bg-blue-500 text-white',
        icon: Cloud,
      },
      {
        title: 'Security Best Practices',
        subtitle: 'Implementing secure applications on AWS',
        iconBg: 'bg-purple-600 text-white',
        icon: Lock,
      },
      {
        title: 'Deployment & Debugging',
        subtitle: 'Managing, monitoring and debugging applications',
        iconBg: 'bg-emerald-500 text-white',
        icon: Cpu,
      },
      {
        title: 'AWS Core Services',
        subtitle: 'Working with compute, storage and databases',
        iconBg: 'bg-amber-500 text-white',
        icon: Layers,
      },
    ],
    relatedProjects: [
      { title: 'Cloud Deployment Platform', tech: 'Next.js' },
      { title: 'Serverless API System', tech: 'Node.js' },
    ],
  },
  {
    id: 'oracle-java-17',
    provider: 'Oracle',
    title: 'Oracle Certified Professional, Java SE 17 Developer',
    issuedDate: 'Feb 2024',
    expiryDate: 'Feb 2027',
    credentialId: 'ORCL-J17-88910',
    verificationUrl: 'https://oracle.com/verification',
    level: 'Professional Level',
    status: 'Verified',
    activeStatus: 'Active',
    credentialType: 'Certification',
    logo: oracleIcon,
    certImage: oracleCertImage,
    about:
      'Validates deep knowledge of Java object-oriented programming, concurrency, stream APIs, memory management, and modern language features up to Java 17.',
    skills: [
      { name: 'Java 17', color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
      { name: 'OOP', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
      {
        name: 'Streams API',
        color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      },
      {
        name: 'Concurrency',
        color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      },
    ],
    keyTopics: [
      {
        title: 'Core Java & Concurrency',
        subtitle: 'Multithreading and functional programming',
        iconBg: 'bg-red-500 text-white',
        icon: Code,
      },
      {
        title: 'Modular Architecture',
        subtitle: 'Building modular Java applications',
        iconBg: 'bg-blue-500 text-white',
        icon: Layers,
      },
    ],
    relatedProjects: [{ title: 'Enterprise Banking Core API', tech: 'Spring Boot' }],
  },
  {
    id: 'mongodb-dev-assoc',
    provider: 'MongoDB University',
    title: 'MongoDB Certified Developer Associate',
    issuedDate: 'Dec 2023',
    expiryDate: 'Dec 2026',
    credentialId: 'MDB-DEV-44219',
    verificationUrl: 'https://university.mongodb.com/verification',
    level: 'Associate Level',
    status: 'Verified',
    activeStatus: 'Active',
    credentialType: 'Certification',
    logo: mongodbIcon,
    certImage: mongodbCertImage,
    about:
      'Demonstrates mastery in data modeling, aggregation pipelines, indexing, transactions, and integration with modern web technologies.',
    skills: [
      {
        name: 'MongoDB',
        color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      },
      {
        name: 'Aggregation',
        color: 'bg-green-600/10 text-green-600 dark:text-green-400',
      },
      {
        name: 'Indexing',
        color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      },
    ],
    keyTopics: [
      {
        title: 'Aggregation Framework',
        subtitle: 'Complex data processing pipelines',
        iconBg: 'bg-emerald-600 text-white',
        icon: Layers,
      },
    ],
    relatedProjects: [{ title: 'Realtime Analytics Platform', tech: 'MongoDB & Node' }],
  },
  {
    id: 'meta-frontend',
    provider: 'Meta',
    title: 'Meta Front-End Developer Professional Certificate',
    issuedDate: 'Oct 2023',
    credentialId: 'META-FE-90123',
    verificationUrl: 'https://coursera.org/verify/meta-fe',
    level: 'Professional Certificate',
    status: 'Completed',
    activeStatus: 'Active',
    credentialType: 'Professional Certificate',
    logo: metaIcon,
    certImage: awsCertImage,
    about:
      'Comprehensive program covering HTML5, CSS3, React, modern JavaScript, UX design principles, and frontend testing practices.',
    skills: [
      { name: 'React', color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
      {
        name: 'JavaScript',
        color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      },
      {
        name: 'UI/UX',
        color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      },
    ],
    keyTopics: [
      {
        title: 'React Architecture',
        subtitle: 'State management and reusable component design',
        iconBg: 'bg-sky-500 text-white',
        icon: Code,
      },
    ],
    relatedProjects: [{ title: 'E-Commerce Marketplace', tech: 'React & Tailwind' }],
  },
  {
    id: 'google-it-automation',
    provider: 'Google',
    title: 'Google IT Automation with Python Professional Certificate',
    issuedDate: 'Aug 2023',
    credentialId: 'GGL-PY-33100',
    verificationUrl: 'https://coursera.org/verify/google-py',
    level: 'Professional Certificate',
    status: 'Verified',
    activeStatus: 'Active',
    credentialType: 'Professional Certificate',
    logo: googleIcon,
    certImage: awsCertImage,
    about:
      'Covers Python programming, Git/GitHub, operating system management, configuration management, and automation in cloud environments.',
    skills: [
      {
        name: 'Python',
        color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      },
      {
        name: 'Git',
        color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      },
      {
        name: 'Automation',
        color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      },
    ],
    keyTopics: [
      {
        title: 'Scripting & Automation',
        subtitle: 'Automating system administration tasks',
        iconBg: 'bg-blue-600 text-white',
        icon: Cpu,
      },
    ],
    relatedProjects: [{ title: 'Automated CI/CD Pipeline', tech: 'Python & Docker' }],
  },
];

export default function CertificationsPage() {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string>('aws-dev-assoc');
  const [activeTab, setActiveTab] = useState<'All' | 'Provider' | 'Skill'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCert = CERTIFICATIONS.find((c) => c.id === selectedId) || CERTIFICATIONS[0];

  const filteredCertifications = CERTIFICATIONS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div
      suppressHydrationWarning
      className="flex w-full flex-col gap-3 p-3 lg:h-full lg:overflow-y-auto lg:gap-3 lg:p-3"
    >
      {/* HEADER SECTION */}
      <header className="flex flex-col gap-2 border-b border-border/40 pb-3 sm:flex-row sm:items-center sm:justify-between lg:gap-2 lg:pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-[6px] bg-blue-500 text-white shadow-sm shadow-blue-500/20 lg:size-9">
            <Award className="size-4 lg:size-5" />
          </div>
          <div className="space-y-0.5">
            <h1 className="font-inter text-[25px] font-bold leading-tight text-[var(--color-text-primary)] max-md:text-[20px] max-md:leading-none">
              {t('certificationsPage.title')}
            </h1>
            <p className="text-[9px] leading-tight text-[var(--color-text-secondary)]">
              {t('certificationsPage.subtitle')}
            </p>
          </div>
        </div>

        {/* Counter Pill */}
        <div className="flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-bg-secondary)] px-2 py-0.5 text-[9px] font-semibold text-[var(--color-text-secondary)] shadow-xs shadow-gray-300 dark:shadow-none lg:px-2.5 lg:text-[10px]">
          <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>
            {CERTIFICATIONS.length} {t('certificationsPage.achievementsCount')}
          </span>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:gap-3">
        {/* ================= LEFT COLUMN: LIST & SEARCH ================= */}
        <div className="order-2 flex flex-col gap-3 overflow-visible lg:order-none lg:col-span-4 lg:gap-2.5 lg:overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-3 gap-1 rounded-[6px] bg-[var(--color-bg-secondary)] p-1 text-[9px] font-semibold shadow-xs shadow-gray-300 dark:shadow-none lg:text-[10px]">
            {(['All', 'Provider', 'Skill'] as const).map((tab) => (
              <button
                suppressHydrationWarning
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-[4px] py-1 transition-colors text-center ${
                  activeTab === tab
                    ? 'bg-background text-[var(--color-text-primary)] shadow-xs shadow-gray-300 dark:shadow-none'
                    : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {tab === 'All'
                  ? t('certificationsPage.allCertificates')
                  : tab === 'Provider'
                    ? t('certificationsPage.byProvider')
                    : t('certificationsPage.bySkill')}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex items-center gap-1.5">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-[var(--color-text-tertiary)]" />
              <input
                suppressHydrationWarning
                type="text"
                placeholder={t('certificationsPage.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[6px] bg-[var(--color-bg-secondary)] pl-7 pr-2.5 py-1.5 text-[9.5px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] shadow-xs shadow-gray-300 dark:shadow-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 lg:py-1 lg:text-[10.5px]"
              />
            </div>
            <button
              aria-label="Filter"
              className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-tertiary)] shadow-xs shadow-gray-300 dark:shadow-none"
            >
              <Filter className="size-3" />
            </button>
          </div>

          {/* Certificates List */}
          <div className="space-y-2 overflow-visible lg:flex-1 lg:overflow-y-auto lg:px-1 lg:py-1">
            {filteredCertifications.map((item) => {
              const isSelected = selectedId === item.id;

              return (
                <button
                  suppressHydrationWarning
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`relative flex w-full items-start gap-2 rounded-[6px] p-2 text-left transition-all lg:gap-2.5 lg:p-2.5 ${
                    isSelected
                      ? 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] shadow-[0_0_3px_var(--color-brand)] dark:shadow-none dark:[filter:drop-shadow(0_0_3px_var(--color-brand))]'
                      : 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] shadow-xs shadow-gray-300 dark:shadow-none'
                  }`}
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-white p-1 shadow-xs shadow-gray-300 dark:shadow-none lg:size-8">
                    <Image
                      src={item.logo}
                      alt={item.provider}
                      width={24}
                      height={24}
                      className="size-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-inter truncate text-[9px] font-bold leading-tight text-[var(--color-text-secondary)] lg:text-[10px]">
                      {item.provider}
                    </h2>
                    <p className="truncate text-[10px] font-semibold leading-snug text-[var(--color-text-primary)] lg:text-[11px]">
                      {item.title}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-1 text-[8px] text-[var(--color-text-tertiary)] lg:text-[9px]">
                      <span>{item.issuedDate}</span>
                      <span
                        className={`rounded px-1.5 py-0.2 text-[7px] font-bold lg:text-[8px] ${
                          item.status === 'Verified'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-purple-500/10 text-purple-500'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Load More Button */}
          <button
            suppressHydrationWarning
            className="w-full shrink-0 rounded-[6px] bg-[var(--color-bg-secondary)] py-1.5 text-[9px] font-semibold text-blue-500 transition-colors hover:bg-[var(--color-bg-tertiary)] shadow-xs shadow-gray-300 dark:shadow-none lg:text-[10px]"
          >
            <span>{t('certificationsPage.loadMore')}</span>
            <ChevronDown className="ml-1 inline size-3" />
          </button>
        </div>

        {/* ================= MIDDLE COLUMN: DETAILS ================= */}
        <div className="order-1 flex flex-col gap-3 overflow-visible rounded-[6px] bg-[var(--color-bg-secondary)] p-3 shadow-md shadow-gray-300 dark:shadow-none lg:order-none lg:col-span-5 lg:gap-3 lg:overflow-y-auto lg:p-3.5">
          {/* Header Status & ID */}
          <div className="flex flex-col gap-1 text-[9px] lg:flex-row lg:items-center lg:justify-between lg:text-[10px]">
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-500 shadow-xs shadow-emerald-500/10">
              <CheckCircle2 className="size-3" />
              <span>{t('certificationsPage.verifiedCertificate')}</span>
            </span>
            <span className="font-medium text-[var(--color-text-tertiary)]">
              ID:{' '}
              <span className="font-mono text-[var(--color-text-secondary)]">
                {selectedCert.credentialId}
              </span>
            </span>
          </div>

          {/* Banner */}
          <div className="flex items-start gap-2.5 pb-2 lg:gap-3 lg:pb-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-[6px] bg-white p-1.5 shadow-xs shadow-gray-300 dark:shadow-none lg:size-11">
              <Image
                src={selectedCert.logo}
                alt={selectedCert.provider}
                width={32}
                height={32}
                className="size-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-inter text-xs font-bold leading-tight text-[var(--color-text-primary)] lg:text-sm">
                {selectedCert.title}
              </h2>
              <p className="mt-0.5 text-[10px] font-medium text-[var(--color-text-secondary)] lg:text-[11px]">
                {selectedCert.provider}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1 text-[8px] text-[var(--color-text-tertiary)] lg:gap-1.5 lg:text-[9px]">
                <span>
                  {t('certificationsPage.issued')} {selectedCert.issuedDate}
                </span>
                {selectedCert.expiryDate && (
                  <>
                    <span>•</span>
                    <span>
                      {t('certificationsPage.expires')} {selectedCert.expiryDate}
                    </span>
                  </>
                )}
                <span>•</span>
                <span className="font-semibold text-[var(--color-text-secondary)]">
                  {selectedCert.level}
                </span>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="space-y-1">
            <h3 className="font-inter text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-primary)] lg:text-[10px]">
              {t('certificationsPage.aboutHeading')}
            </h3>
            <p className="text-[10px] font-normal leading-relaxed text-[var(--color-text-secondary)] lg:text-[11px]">
              {selectedCert.about}
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-1.5">
            <h3 className="font-inter text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-primary)] lg:text-[10px]">
              {t('certificationsPage.skillsValidated')}
            </h3>
            <div className="flex flex-wrap gap-1">
              {selectedCert.skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`rounded-[4px] px-1.5 py-0.5 text-[8px] font-bold shadow-xs shadow-gray-300 dark:shadow-none lg:px-2 lg:text-[9px] ${skill.color}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Key Topics */}
          <div className="space-y-2 pt-1 lg:pt-2">
            <h3 className="font-inter text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-primary)] lg:text-[10px]">
              {t('certificationsPage.keyTopics')}
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {selectedCert.keyTopics.map((topic) => {
                const TopicIcon = topic.icon;
                return (
                  <div
                    key={topic.title}
                    className="flex items-center gap-2 rounded-[6px] bg-background p-2 shadow-xs shadow-gray-300 dark:shadow-none"
                  >
                    <div
                      className={`flex size-6 shrink-0 items-center justify-center rounded-[4px] ${topic.iconBg} lg:size-7`}
                    >
                      <TopicIcon className="size-3 lg:size-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="truncate text-[9.5px] font-semibold text-[var(--color-text-primary)] lg:text-[10.5px]">
                        {topic.title}
                      </h4>
                      <p className="mt-0.5 truncate text-[8px] text-[var(--color-text-tertiary)] lg:text-[9px]">
                        {topic.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: CREDENTIAL & PROJECTS ================= */}
        <div className="order-3 flex flex-col gap-3 overflow-visible lg:order-none lg:col-span-3 lg:gap-3 lg:overflow-y-auto">
          {/* Certificate Image Card */}
          <div className="space-y-2.5 rounded-[6px] bg-[var(--color-bg-secondary)] p-2.5 shadow-md shadow-gray-300 dark:shadow-none lg:space-y-3 lg:p-3">
            <div className="overflow-hidden rounded-[6px] bg-background shadow-sm shadow-gray-300 dark:shadow-none">
              <Image
                src={selectedCert.certImage}
                alt={selectedCert.title}
                width={360}
                height={240}
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            {/* Credential Info */}
            <div className="space-y-1.5">
              <h3 className="font-inter text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-primary)] lg:text-[10px]">
                {t('certificationsPage.credentialInfo')}
              </h3>

              <div className="space-y-1 text-[9px] lg:space-y-1.5 lg:text-[10px]">
                <div className="flex items-center justify-between py-0.5">
                  <span className="flex items-center gap-1 text-[var(--color-text-tertiary)]">
                    <User className="size-3" /> ID
                  </span>
                  <span className="font-mono text-[8.5px] font-bold text-[var(--color-text-primary)] lg:text-[9.5px]">
                    {selectedCert.credentialId}
                  </span>
                </div>

                <div className="flex items-center justify-between py-0.5">
                  <span className="flex items-center gap-1 text-[var(--color-text-tertiary)]">
                    <CheckCircle2 className="size-3 text-blue-500" /> Link
                  </span>
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-0.5 text-[8.5px] font-semibold text-blue-500 hover:underline lg:text-[9.5px]"
                  >
                    <span>{t('certificationsPage.verify')}</span>
                    <ArrowUpRight className="size-2.5" />
                  </a>
                </div>

                <div className="flex items-center justify-between py-0.5">
                  <span className="flex items-center gap-1 text-[var(--color-text-tertiary)]">
                    <Building2 className="size-3" /> Provider
                  </span>
                  <span className="text-[8.5px] font-semibold text-[var(--color-text-primary)] lg:text-[9.5px]">
                    {selectedCert.provider}
                  </span>
                </div>

                <div className="flex items-center justify-between py-0.5">
                  <span className="flex items-center gap-1 text-[var(--color-text-tertiary)]">
                    <FileBadge className="size-3" /> Type
                  </span>
                  <span className="text-[8.5px] font-semibold text-[var(--color-text-primary)] lg:text-[9.5px]">
                    {selectedCert.credentialType}
                  </span>
                </div>

                <div className="flex items-center justify-between py-0.5">
                  <span className="flex items-center gap-1 text-[var(--color-text-tertiary)]">
                    <ShieldCheck className="size-3" /> Status
                  </span>
                  <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 text-[7px] font-bold text-emerald-500 lg:text-[8px]">
                    {selectedCert.activeStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            <div className="space-y-1.5 pt-1 lg:pt-2">
              <h3 className="font-inter text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-primary)] lg:text-[10px]">
                {t('certificationsPage.relatedProjects')}
              </h3>

              <div className="space-y-1">
                {selectedCert.relatedProjects.map((proj) => (
                  <div
                    key={proj.title}
                    className="flex items-center justify-between rounded-[4px] bg-background px-2 py-1 shadow-xs shadow-gray-300 dark:shadow-none"
                  >
                    <span className="truncate text-[8.5px] font-semibold text-[var(--color-text-primary)] lg:text-[9.5px]">
                      {proj.title}
                    </span>
                    <span className="rounded bg-[var(--color-bg-tertiary)] px-1 py-0.2 text-[7px] font-semibold text-[var(--color-text-tertiary)] lg:text-[8px]">
                      {proj.tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* View All Projects Button */}
            <Link
              href="/projects"
              className="flex w-full items-center justify-center gap-1 rounded-[6px] bg-background py-1.5 text-[9px] font-semibold text-blue-500 transition-colors hover:bg-[var(--color-bg-tertiary)] shadow-xs shadow-gray-300 dark:shadow-none lg:text-[10px]"
            >
              <span>{t('certificationsPage.viewAllProjects')}</span>
              <ChevronDown className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
