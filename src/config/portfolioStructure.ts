export interface NavItem {
  id: string;
  index: string;
  label: string;
  href: string;
}

export type SocialPlatformId =
  | 'github'
  | 'linkedin'
  | 'youtube'
  | 'medium'
  | 'reddit'
  | 'instagram';

export type PixelSpriteKey =
  | 'hero'
  | 'jumping'
  | 'idle'
  | 'intern'
  | 'engineer'
  | 'grad'
  | 'waitingCall'
  | 'peekingNose'
  | SocialPlatformId;

export type SkillCategoryKey = 'all' | 'backend' | 'cloud' | 'observability';

export type TechLogoId =
  | 'go'
  | 'gin'
  | 'gorm'
  | 'rest'
  | 'microservices'
  | 'postgresql'
  | 'python'
  | 'bash'
  | 'kubernetes'
  | 'docker'
  | 'terraform'
  | 'aws'
  | 'codepipeline'
  | 'jenkins'
  | 'sonarqube'
  | 'linux'
  | 'git'
  | 'prometheus'
  | 'elk'
  | 'claude'
  | 'systemdesign';

export interface SkillLogoItem {
  id: TechLogoId;
  name: string;
  role: string;
  category: Exclude<SkillCategoryKey, 'all'>;
  tintClass: string;
}

export interface SystemArchitectureNode {
  step: string;
  title: string;
  detail: string;
}

export interface SystemArchitectureSpec {
  id: 'onap' | 'pricing' | 'mcn';
  index: string;
  tabLabel: string;
  title: string;
  context: string;
  metricHighlight: string;
  problem: string;
  approach: string;
  stack: string[];
  nodes: SystemArchitectureNode[];
}

export interface SocialPlatformTheme {
  tabActive: string;
  headerBg: string;
  headerText: string;
  headerMuted: string;
  accentText: string;
  softSurface: string;
  softBorder: string;
  ctaBg: string;
  ctaHover: string;
  ctaText: string;
  badgeText: string;
}

export interface SocialPlatformConfig {
  id: SocialPlatformId;
  name: string;
  handle: string;
  profileUrl: string;
  personaTitle: string;
  peekTeaser: string;
  headline: string;
  subcopy: string;
  theme: SocialPlatformTheme;
}

export interface ExperienceProjectGroup {
  name: string;
  stack: string;
  bullets: string[];
}

export interface ExperienceEntry {
  id: 'engineer' | 'intern';
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  projects: ExperienceProjectGroup[];
}

export interface CertificationItem {
  id: string;
  index: string;
  code: string;
  title: string;
  issuer: string;
  credentialType: string;
  focus: string;
}

export const SITE_META = {
  owner: 'Ansh Joshi',
  role: 'Software Engineer',
  location: 'Pune, India',
  phone: '+91-6355025431',
  email: 'anshsjoshi07@gmail.com',
  award: 'Star Employee of the Month',
  domain: 'itsansh.space',
  heroLead:
    'I engineer reliable backend systems, automate cloud platforms, teach System Design & Cloud Networking, and write highway stories when I step away from the terminal.',
  summary:
    'Software engineer with 2.5 years of experience building REST APIs and microservices (Go, Gin, GORM, PostgreSQL) and running them on Kubernetes. Ran 15+ microservices on a 3-node cluster, cut 22 Jenkins pipelines down to 4, and cut query timeout errors by about 35%. Works with Claude Code and GitHub Copilot in a plan, build, test and review loop, and reviews and tests everything they generate.',
} as const;

export const HERO_METRICS = [
  { value: '2.5 yrs', label: 'Engineering Experience' },
  { value: '15+', label: 'K8s Microservices Run' },
  { value: '22 → 4', label: 'Unified CI/CD Pipelines' },
  { value: '~35%', label: 'Query Timeout Reduction' },
] as const;

export const ENGINEERING_PRINCIPLES = [
  {
    index: '01',
    title: 'Repeatable infrastructure over fragile deploys',
    description:
      'Whether consolidating 22 fragmented Jenkins jobs into 4 clean pipelines or codifying AWS VPC, IAM, and S3 in Terraform, production releases should be scripted and consistent across every environment.',
  },
  {
    index: '02',
    title: 'Zero-downtime backend data engineering',
    description:
      'Multi-gigabyte cloud catalogs should never interrupt API traffic. Streaming JSON parsing, idempotent GORM upserts, Blue/Green swaps, and focused PostgreSQL indexing keep latency predictable.',
  },
  {
    index: '03',
    title: 'Disciplined AI-assisted engineering loops',
    description:
      'I pair Claude Code and GitHub Copilot inside structured plan, build, test, and review loops—moving faster on architectures while personally reviewing and testing every generated line.',
  },
] as const;

export const SYSTEM_ARCHITECTURES: SystemArchitectureSpec[] = [
  {
    id: 'onap',
    index: '01',
    tabLabel: 'ONAP K8s & CI/CD',
    title: 'ONAP Microservices Platform & Unified CI/CD',
    context: 'Calsoft · Development Engineer in Cloud',
    metricHighlight: '15+ pods on 3-node K8s · 22 → 4 pipelines',
    problem:
      'Manual dev deployments across 15+ microservices and 22 scattered Jenkins pipelines created drift, slow feedback cycles, and skipped code-quality checks.',
    approach:
      'Containerized and orchestrated 15+ ONAP microservices (13 owned by our team) on a 3-node AWS-hosted Kubernetes cluster, consolidated 22 Jenkins pipelines into 4 unified multi-stage pipelines, and embedded automated SonarQube scans directly before deployment.',
    stack: ['Kubernetes', 'Jenkins', 'SonarQube', 'Docker', 'AWS'],
    nodes: [
      { step: '01', title: 'Git Push', detail: '4 project repos' },
      { step: '02', title: 'Jenkins CI', detail: '4 unified dev/QA pipelines' },
      { step: '03', title: 'SonarQube', detail: 'Automated quality gate' },
      { step: '04', title: 'Docker Image', detail: 'Build & version tag' },
      { step: '05', title: '3-Node K8s', detail: '1 master · 2 workers · 15+ pods' },
    ],
  },
  {
    id: 'pricing',
    index: '02',
    tabLabel: 'Go Pricing Pipeline',
    title: 'Zero-Downtime Multi-Cloud Pricing Ingestion',
    context: 'Calsoft · Software Engineering Intern (Back End)',
    metricHighlight: 'Multi-GB JSON streaming · ~35% fewer timeouts',
    problem:
      'Ingesting multi-gigabyte AWS pricing files spiked memory usage, caused catalog downtime during refreshes, and produced recurring API query timeouts.',
    approach:
      'Built a streaming Go JSON parser with idempotent SKU ingestion via GORM and a Blue/Green catalog swap for zero-downtime updates, paired with Gin REST API optimizations and PostgreSQL indexing that cut query timeout errors by ~35%.',
    stack: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'Blue/Green'],
    nodes: [
      { step: '01', title: 'AWS Catalog', detail: 'Multi-GB JSON feed' },
      { step: '02', title: 'Go Streamer', detail: 'Bounded-memory parser' },
      { step: '03', title: 'GORM Upsert', detail: 'Idempotent SKU writes' },
      { step: '04', title: 'Blue / Green', detail: 'Atomic PostgreSQL swap' },
      { step: '05', title: 'Gin REST API', detail: 'Indexed · -35% timeouts' },
    ],
  },
  {
    id: 'mcn',
    index: '03',
    tabLabel: 'Multi-Cloud & CalCS',
    title: 'Multi-Cloud Networking (MCN) & CalCS Simulator',
    context: 'Calsoft · Cloud Infrastructure & Go Simulator',
    metricHighlight: '3 Terraform envs · 40% faster plugin onboarding',
    problem:
      'Environment drift across dev/staging/prod slowed releases, and local cloud testing depended heavily on costly vendor cloud environments.',
    approach:
      'Provisioned standardized AWS S3, IAM, and VPC infrastructure with Terraform, wired Git-tag CodePipeline/CodeBuild releases with Prometheus & ELK Filebeat observability, and architected a Dockerized Go (Gin) plugin simulator for SQS & Lambda.',
    stack: ['Terraform', 'AWS CodePipeline', 'Docker & ECR', 'Prometheus', 'ELK'],
    nodes: [
      { step: '01', title: 'Terraform IaC', detail: 'VPC · IAM · S3 (3 envs)' },
      { step: '02', title: 'Git Tag Trigger', detail: 'CodePipeline + CodeBuild' },
      { step: '03', title: 'Docker & ECR', detail: 'Immutable containers' },
      { step: '04', title: 'Observability', detail: 'Prometheus + ELK Filebeat' },
      { step: '05', title: 'CalCS Plugins', detail: 'Go SQS/Lambda · -60% setup' },
    ],
  },
];

export const PORTRAIT_IMAGE =
  '/assets/aistudio/WhatsApp_Image_2026-11-25_at_1.34.06_PM_1__0cd6d48c.jpeg';

export const PIXEL_SPRITES: Record<PixelSpriteKey, string> = {
  hero: '/src/assets/images/pixel_ansh_hero_1795594173499.jpg',
  jumping: '/src/assets/images/pixel_ansh_jumping_1795602641922.jpg',
  idle: '/src/assets/images/pixel_ansh_idle_1795594176562.jpg',
  github: '/src/assets/images/pixel_ansh_github_1795594176565.jpg',
  linkedin: '/src/assets/images/pixel_ansh_linkedin_1795594178789.jpg',
  medium: '/src/assets/images/pixel_ansh_medium_1795594180200.jpg',
  youtube: '/src/assets/images/pixel_ansh_youtube_1795594181446.jpg',
  reddit: '/src/assets/images/pixel_ansh_reddit_travel_1795597475368.jpg',
  instagram: '/src/assets/images/pixel_ansh_instagram_1795594183537.jpg',
  intern: '/src/assets/images/pixel_ansh_intern_1795597479734.jpg',
  engineer: '/src/assets/images/pixel_ansh_engineer_1795597480797.jpg',
  grad: '/src/assets/images/pixel_ansh_grad_1795597480213.jpg',
  waitingCall: '/src/assets/images/pixel_ansh_waiting_call_1795605295350.jpg',
  peekingNose: '/src/assets/images/pixel_ansh_peeking_nose_1795605296469.jpg',
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'social-platforms', index: '02', label: 'Socials', href: '#social-platforms' },
  { id: 'systems', index: '03', label: 'Systems', href: '#systems' },
  { id: 'experience', index: '04', label: 'Experience', href: '#experience' },
  { id: 'skills', index: '05', label: 'Skills', href: '#skills' },
];

export const SCROLL_RAIL_ITEMS: NavItem[] = [
  { id: 'hero', index: '01', label: 'Intro', href: '#hero' },
  { id: 'social-platforms', index: '02', label: 'Socials', href: '#social-platforms' },
  { id: 'systems', index: '03', label: 'Systems', href: '#systems' },
  { id: 'experience', index: '04', label: 'Experience', href: '#experience' },
  { id: 'skills', index: '05', label: 'Skills', href: '#skills' },
  { id: 'certifications', index: '06', label: 'Credentials', href: '#certifications' },
  { id: 'contact', index: '07', label: 'Contact', href: '#contact' },
];

export const SKILL_FILTER_TABS: { id: SkillCategoryKey; label: string }[] = [
  { id: 'all', label: 'All Skills' },
  { id: 'backend', label: 'Backend & Languages' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'observability', label: 'Observability & AI' },
];

/* Rich, comprehensive 20-tool stack strictly from Ansh's real resume & builds */
export const SKILL_LOGOS: SkillLogoItem[] = [
  {
    id: 'go',
    name: 'Go (Golang)',
    role: 'Primary Backend Language',
    category: 'backend',
    tintClass: 'bg-[#F0F9FF] border-[#BAE6FD]',
  },
  {
    id: 'gin',
    name: 'Gin Framework',
    role: 'High-Throughput HTTP APIs',
    category: 'backend',
    tintClass: 'bg-[#ECFDF5] border-[#A7F3D0]',
  },
  {
    id: 'gorm',
    name: 'GORM',
    role: 'Idempotent ORM & Migrations',
    category: 'backend',
    tintClass: 'bg-[#EFF6FF] border-[#BFDBFE]',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL & SQL',
    role: 'Indexing · Blue/Green Swaps',
    category: 'backend',
    tintClass: 'bg-[#EFF6FF] border-[#C7D2FE]',
  },
  {
    id: 'rest',
    name: 'REST APIs',
    role: 'Service Contracts & Routing',
    category: 'backend',
    tintClass: 'bg-[#F0FDFA] border-[#99F6E4]',
  },
  {
    id: 'microservices',
    name: 'Microservices',
    role: 'Distributed 15+ Service Mesh',
    category: 'backend',
    tintClass: 'bg-[#EEF2FF] border-[#C7D2FE]',
  },
  {
    id: 'python',
    name: 'Python',
    role: 'Automation & Scripting',
    category: 'backend',
    tintClass: 'bg-[#EFF6FF] border-[#BFDBFE]',
  },
  {
    id: 'bash',
    name: 'Bash Scripting',
    role: 'CLI & Pipeline Automation',
    category: 'backend',
    tintClass: 'bg-[#F8FAFC] border-[#CBD5E1]',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    role: '3-Node Clusters · Pod Ops',
    category: 'cloud',
    tintClass: 'bg-[#EFF6FF] border-[#BFDBFE]',
  },
  {
    id: 'docker',
    name: 'Docker & ECR',
    role: 'Immutable Containers',
    category: 'cloud',
    tintClass: 'bg-[#F0F9FF] border-[#BAE6FD]',
  },
  {
    id: 'terraform',
    name: 'Terraform',
    role: 'Multi-Env Infra as Code',
    category: 'cloud',
    tintClass: 'bg-[#F5F3FF] border-[#DDD6FE]',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    role: 'S3 · IAM · VPC · EC2 · SQS',
    category: 'cloud',
    tintClass: 'bg-[#FFFBEB] border-[#FDE68A]',
  },
  {
    id: 'codepipeline',
    name: 'AWS CodePipeline',
    role: 'Git-Tag CodeBuild Releases',
    category: 'cloud',
    tintClass: 'bg-[#FFF7ED] border-[#FED7AA]',
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    role: 'Unified Dev/QA Pipelines',
    category: 'cloud',
    tintClass: 'bg-[#FEF2F2] border-[#FECACA]',
  },
  {
    id: 'sonarqube',
    name: 'SonarQube',
    role: 'Automated Code Quality Gates',
    category: 'cloud',
    tintClass: 'bg-[#F0F9FF] border-[#BAE6FD]',
  },
  {
    id: 'linux',
    name: 'Linux',
    role: 'Server Ops & Networking',
    category: 'cloud',
    tintClass: 'bg-[#F8FAFC] border-[#CBD5E1]',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    role: 'Tagging · PR Reviews · CI',
    category: 'cloud',
    tintClass: 'bg-[#FFF1F2] border-[#FECDD3]',
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    role: 'Service Metrics & Alerting',
    category: 'observability',
    tintClass: 'bg-[#FFF7ED] border-[#FDBA74]',
  },
  {
    id: 'elk',
    name: 'ELK Stack (Filebeat)',
    role: 'Centralized Log Collection',
    category: 'observability',
    tintClass: 'bg-[#FEFCE8] border-[#FEF08A]',
  },
  {
    id: 'claude',
    name: 'Claude Code & Copilot',
    role: 'Plan · Build · Test · Review',
    category: 'observability',
    tintClass: 'bg-[#FFF7ED] border-[#FED7AA]',
  },
  {
    id: 'systemdesign',
    name: 'System Design',
    role: 'Scaling · Caching · Trade-Offs',
    category: 'observability',
    tintClass: 'bg-[#EFF6FF] border-[#BFDBFE]',
  },
];

/* Exact Verified LaTeX Resume Experience — Minimal Rajan-Style Layout */
export const WORK_EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'engineer',
    role: 'Development Engineer in Cloud',
    company: 'Calsoft',
    period: 'April 2025 – Present',
    location: 'Pune / Remote',
    summary:
      'Owning Kubernetes platform operations, unified CI/CD pipelines, Terraform AWS provisioning, and full-stack observability across ONAP and Multi-Cloud Networking.',
    projects: [
      {
        name: 'Open Network Automation Platform (ONAP)',
        stack: 'Kubernetes · Jenkins · SonarQube · Docker',
        bullets: [
          'Made dev deployments repeatable for 15+ ONAP microservices (13 owned by my team) by running them as pods on a 3-node Kubernetes cluster (1 master, 2 workers) on AWS-hosted servers.',
          'Cut 22 Jenkins pipelines across 4 projects down to 4 (one per project, with developer and QA stages), replacing manual dev deployments.',
          'Replaced manual code scans with automated SonarQube analysis inside the same Jenkins pipelines, next to build, tag, and Kubernetes deployment stages.',
        ],
      },
      {
        name: 'Multi-Cloud Networking (MCN)',
        stack: 'Terraform · AWS · Docker · Prometheus · ELK',
        bullets: [
          'Standardized 3 environments (dev, staging, production) by provisioning AWS infrastructure (S3, IAM, VPC) as code with Terraform.',
          'Cut manual deployment steps and made releases consistent by building CI/CD pipelines with AWS CodePipeline and CodeBuild, triggered by Git tags.',
          'Made application behavior easier to see by adding Prometheus and ELK Stack (Filebeat) monitoring and log collection, containerized in Docker and AWS ECR.',
        ],
      },
    ],
  },
  {
    id: 'intern',
    role: 'Software Engineering Intern (Back End)',
    company: 'Calsoft',
    period: 'April 2024 – April 2025',
    location: 'Pune, India',
    summary:
      'Built high-volume Go data ingestion pipelines and REST APIs for multi-cloud pricing catalogs with zero-downtime catalog updates.',
    projects: [
      {
        name: 'Multi-Cloud Pricing Ingestion Pipeline',
        stack: 'Go · GORM · PostgreSQL · Gin',
        bullets: [
          'Enabled zero-downtime catalog updates for multi-GB AWS pricing files by building a Go ingestion pipeline with stream-based JSON parsing, idempotent SKU ingestion through GORM, and a Blue/Green update strategy.',
          'Cut query timeout errors by about 35% by contributing Gin REST APIs and PostgreSQL indexing improvements.',
        ],
      },
    ],
  },
];

export const GITHUB_SHOWCASE = {
  profileUrl: 'https://github.com/ANSHJOSHI1811',
  handle: 'github.com/ANSHJOSHI1811',
  currentlyReading: {
    heading: 'Abhi kya padh raha hoon',
    subtitle: 'Currently deep-diving & writing notes around',
    topics: [
      'System Design fundamentals — scaling, caching, sharding & real-world trade-offs',
      'Kubernetes pod scheduling, multi-cloud networking & Terraform state patterns',
      'Agent loop engineering — structured plan, build, test & review workflows',
    ],
  },
  featuredProject: {
    title: 'System Design — Interactive Learning Guide',
    url: 'https://anshjoshi1811.github.io/SystemDesign/',
    stack: 'System Design · Architecture Patterns · Interactive Guide',
    description:
      'A structured, practical guide built for engineers who want to learn System Design cleanly—covering core building blocks, scalability trade-offs, and real architecture thinking in one place.',
  },
  secondaryProjects: [
    {
      title: 'AWS Cloud Simulator Platform (CalCS)',
      stack: 'Go · Gin · Docker · Claude Code',
      summary:
        'Plugin-based SQS and Lambda architecture inside a Go (Gin) simulator of 20+ AWS services. Cut new simulation onboarding by 40% and team setup time by 60% via Docker.',
      url: 'https://github.com/ANSHJOSHI1811',
    },
    {
      title: 'Multi-Cloud Pricing Ingestion Pipeline',
      stack: 'Go · GORM · PostgreSQL · Gin',
      summary:
        'Stream-based JSON parser with idempotent SKU ingestion and Blue/Green updates for multi-GB AWS pricing catalogs—cutting query timeout errors by ~35%.',
      url: 'https://github.com/ANSHJOSHI1811',
    },
  ],
} as const;

/* MAIN SHOWCASE: Each of the 6 Social Tabs has its own signature theme! */
export const SOCIAL_PLATFORMS: SocialPlatformConfig[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: 'ANSHJOSHI1811',
    profileUrl: 'https://github.com/ANSHJOSHI1811',
    personaTitle: 'Code & Study Log',
    peekTeaser: 'Psst… check SystemDesign!',
    headline: 'Open Source, System Design & Currently Studying',
    subcopy:
      'Featured System Design learning guide, Go backend builds, and live study notes.',
    theme: {
      tabActive: 'bg-[#0F172A] text-white border-[#0F172A] shadow-md',
      headerBg: 'bg-[#0F172A]',
      headerText: 'text-white',
      headerMuted: 'text-slate-300',
      accentText: 'text-[#10B981]',
      softSurface: 'bg-[#ECFDF5]',
      softBorder: 'border-[#A7F3D0]',
      ctaBg: 'bg-[#10B981] border-[#059669]',
      ctaHover: 'hover:bg-[#059669]',
      ctaText: 'text-white',
      badgeText: 'text-[#047857]',
    },
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'in/anshjoshi1811',
    profileUrl: 'https://linkedin.com/in/anshjoshi1811',
    personaTitle: 'Career & Network',
    peekTeaser: 'Blazer mode activated!',
    headline: 'Engineering Career & Cloud Milestones',
    subcopy:
      'Development Engineer in Cloud at Calsoft · Star Employee of the Month · AWS Certified.',
    theme: {
      tabActive: 'bg-[#0A66C2] text-white border-[#0A66C2] shadow-md',
      headerBg: 'bg-[#0A66C2]',
      headerText: 'text-white',
      headerMuted: 'text-blue-100',
      accentText: 'text-[#0A66C2]',
      softSurface: 'bg-[#EFF6FF]',
      softBorder: 'border-[#BFDBFE]',
      ctaBg: 'bg-[#0A66C2] border-[#004182]',
      ctaHover: 'hover:bg-[#004182]',
      ctaText: 'text-white',
      badgeText: 'text-[#0A66C2]',
    },
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@CloudNetExplained',
    profileUrl: 'https://www.youtube.com/@CloudNetExplained',
    personaTitle: 'CloudNetExplained',
    peekTeaser: 'Take 47… rolling!',
    headline: 'CloudNetExplained — Visual Cloud & Networking',
    subcopy:
      'Visual breakdowns of cloud architecture, networking fundamentals, and real backend engineering.',
    theme: {
      tabActive: 'bg-[#DC2626] text-white border-[#DC2626] shadow-md',
      headerBg: 'bg-[#991B1B]',
      headerText: 'text-white',
      headerMuted: 'text-red-100',
      accentText: 'text-[#DC2626]',
      softSurface: 'bg-[#FEF2F2]',
      softBorder: 'border-[#FECACA]',
      ctaBg: 'bg-[#DC2626] border-[#B91C1C]',
      ctaHover: 'hover:bg-[#B91C1C]',
      ctaText: 'text-white',
      badgeText: 'text-[#B91C1C]',
    },
  },
  {
    id: 'medium',
    name: 'Medium',
    handle: '@anshjoshii',
    profileUrl: 'https://medium.com/@anshjoshii',
    personaTitle: 'Editorial Writing',
    peekTeaser: 'Fresh write-ups inside…',
    headline: 'Engineering Write-Ups & Production Lessons',
    subcopy:
      'Practical, production-tested articles on Go, Kubernetes workflows, and cloud automation.',
    theme: {
      tabActive: 'bg-[#18181B] text-[#FDE68A] border-[#18181B] shadow-md',
      headerBg: 'bg-[#1C1917]',
      headerText: 'text-[#FAFAF9]',
      headerMuted: 'text-stone-300',
      accentText: 'text-[#B45309]',
      softSurface: 'bg-[#FFFBEB]',
      softBorder: 'border-[#FDE68A]',
      ctaBg: 'bg-[#1C1917] border-[#0C0A09]',
      ctaHover: 'hover:bg-[#292524]',
      ctaText: 'text-[#FDE68A]',
      badgeText: 'text-[#B45309]',
    },
  },
  {
    id: 'reddit',
    name: 'Reddit',
    handle: 'Side Stand Stories · u/Original_Mongoose_74',
    profileUrl: 'https://www.reddit.com/user/Original_Mongoose_74/',
    personaTitle: 'Side Stand Stories',
    peekTeaser: 'Kickstand down. Story time!',
    headline: 'Side Stand Stories — Highway Travel Journal',
    subcopy:
      'Where I kick down the side stand and share real motorcycle rides, detours, and road stories.',
    theme: {
      tabActive: 'bg-[#EA580C] text-white border-[#EA580C] shadow-md',
      headerBg: 'bg-[#C2410C]',
      headerText: 'text-white',
      headerMuted: 'text-orange-100',
      accentText: 'text-[#EA580C]',
      softSurface: 'bg-[#FFF7ED]',
      softBorder: 'border-[#FED7AA]',
      ctaBg: 'bg-[#EA580C] border-[#C2410C]',
      ctaHover: 'hover:bg-[#C2410C]',
      ctaText: 'text-white',
      badgeText: 'text-[#C2410C]',
    },
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@its_unsh',
    profileUrl: 'https://www.instagram.com/its_unsh/',
    personaTitle: 'Visual Diary',
    peekTeaser: 'Latest frames up top!',
    headline: '@its_unsh — Rides, Events & Candid Frames',
    subcopy:
      'Snapshots from road trips, developer community events, and everyday life off the keyboard.',
    theme: {
      tabActive: 'bg-[#BE185D] text-white border-[#BE185D] shadow-md',
      headerBg: 'bg-gradient-to-r from-[#831843] via-[#BE185D] to-[#DB2777]',
      headerText: 'text-white',
      headerMuted: 'text-pink-100',
      accentText: 'text-[#BE185D]',
      softSurface: 'bg-[#FDF2F8]',
      softBorder: 'border-[#FBCFE8]',
      ctaBg: 'bg-[#BE185D] border-[#9D174D]',
      ctaHover: 'hover:bg-[#9D174D]',
      ctaText: 'text-white',
      badgeText: 'text-[#BE185D]',
    },
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'aws-saa',
    index: '01',
    code: 'SAA-C03',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    credentialType: 'Cloud Architecture',
    focus: 'Resilient VPC design, IAM governance, high-availability workloads & cost optimization.',
  },
  {
    id: 'aws-cp',
    index: '02',
    code: 'CLF-C02',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    credentialType: 'Cloud Foundations',
    focus: 'Core AWS infrastructure, security shared-responsibility model, and cloud economics.',
  },
];

export const EDUCATION = {
  degree: 'B.Tech, Computer Science and Engineering',
  shortTag: 'B.TECH · CSE',
  institution: 'Acropolis Group of Institutions, Indore',
  university: 'RGPV University',
  period: '2020 – 2024',
  cgpa: '7.88 / 10.0',
} as const;
