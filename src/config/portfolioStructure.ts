export type AccentTone = 'lavender' | 'yellow' | 'sage';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export type SocialPlatformId =
  | 'github'
  | 'linkedin'
  | 'reddit'
  | 'youtube'
  | 'medium'
  | 'instagram';

export type PixelSpriteKey =
  | 'hero'
  | 'idle'
  | 'intern'
  | 'engineer'
  | 'grad'
  | SocialPlatformId;

export interface SocialPlatformConfig {
  id: SocialPlatformId;
  name: string;
  accent: AccentTone;
  handle: string;
  profileUrl: string;
  personaTitle: string;
  peekTeaser: string;
  humorCaption: string;
  headline: string;
  subcopy: string;
}

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  items: string[];
  accent: AccentTone;
}

export interface ExperienceProjectGroup {
  name: string;
  stack: string;
  bullets: string[];
}

export interface ExperienceEntry {
  id: 'engineer' | 'intern';
  index: string;
  levelLabel: string;
  characterScaleLabel: string;
  spriteKey: 'engineer' | 'intern';
  role: string;
  company: string;
  period: string;
  location: string;
  projects: ExperienceProjectGroup[];
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  credentialType: string;
}

export interface SectionBuddyMood {
  spriteKey: PixelSpriteKey;
  contextTag: string;
  quips: string[];
  scale?: number;
}

export const SECTION_THEMES = {
  hero: '#F6F3EA',
  social: '#EFEBF6',
  skills: '#EBF0EC',
  experience: '#F6EFE0',
  certifications: '#F2EEF4',
  contact: '#F6F3EA',
} as const;

export const SITE_META = {
  owner: 'Ansh Joshi',
  role: 'Golang Backend Engineer',
  location: 'Pune, India',
  phone: '+91-6355025431',
  email: 'anshsjoshi07@gmail.com',
  award: 'Star Employee of the Month',
  domain: 'itsansh.space',
  summary:
    'Golang backend engineer with 2.5 years of experience building REST APIs and microservices (Gin, GORM, PostgreSQL) and running them on Kubernetes. Ran 15+ microservices on a 3-node cluster, cut 22 Jenkins pipelines down to 4, and cut query timeout errors by about 35%. Works with Claude Code and GitHub Copilot in a plan, build, test and review loop, and reviews and tests everything they generate.',
} as const;

export const PORTRAIT_IMAGE =
  '/assets/aistudio/WhatsApp_Image_2026-11-25_at_1.34.06_PM_1__0cd6d48c.jpeg';

export const PIXEL_SPRITES: Record<PixelSpriteKey, string> = {
  hero: '/src/assets/images/pixel_ansh_hero_1795594173499.jpg',
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
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'social-platforms', label: 'Social', href: '#social-platforms' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'certifications', label: 'Credentials', href: '#certifications' },
];

export const GITHUB_SHOWCASE = {
  profileUrl: 'https://github.com/ANSHJOSHI1811',
  handle: 'github.com/ANSHJOSHI1811',
  currentlyReading: {
    heading: 'Abhi kya padh raha hoon',
    subtitle: 'Currently deep-diving & building notes around',
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

export const SOCIAL_PLATFORMS: SocialPlatformConfig[] = [
  {
    id: 'github',
    name: 'GitHub',
    accent: 'lavender',
    handle: 'ANSHJOSHI1811',
    profileUrl: 'https://github.com/ANSHJOSHI1811',
    personaTitle: 'Commit & Study Mode',
    peekTeaser: 'Psst… check my System Design guide!',
    humorCaption:
      'Laptop open, green commit confetti flying—also logged what I am currently reading right beside my repos.',
    headline: 'Open Source, System Design & Currently Studying',
    subcopy:
      'Featured System Design learning site, Go backend builds, and what I am diving into right now.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    accent: 'sage',
    handle: 'in/anshjoshi1811',
    profileUrl: 'https://linkedin.com/in/anshjoshi1811',
    personaTitle: 'Emergency Blazer Mode',
    peekTeaser: 'Threw a blazer on just for you!',
    humorCaption:
      'Threw a lavender blazer over a t-shirt and unlocked +100% corporate thumbs-up energy.',
    headline: 'Golang Backend & Cloud Engineering Profile',
    subcopy:
      'Development Engineer in Cloud at Calsoft · 2.5 years building Go microservices & Kubernetes platforms · Star Employee of the Month.',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    accent: 'yellow',
    handle: 'Side Stand Stories · u/Original_Mongoose_74',
    profileUrl: 'https://www.reddit.com/user/Original_Mongoose_74/',
    personaTitle: 'Side Stand Stories',
    peekTeaser: 'Kickstand down. Travel story time!',
    humorCaption:
      'Helmet off, bike on the side stand—writing honest road-trip memories and travel stories over on Reddit.',
    headline: 'Side Stand Stories — Travel Experiences',
    subcopy:
      'Where I kick down the side stand and share real road trips, detours, and travel stories from the highway.',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    accent: 'lavender',
    handle: '@CloudNetExplained',
    profileUrl: 'https://www.youtube.com/@CloudNetExplained',
    personaTitle: 'CloudNetExplained',
    peekTeaser: 'Take 47… rolling!',
    humorCaption:
      'Studio mic hot, clapperboard snapped—breaking down cloud and networking concepts clearly on CloudNetExplained.',
    headline: 'CloudNetExplained — Cloud & Networking Videos',
    subcopy:
      'Visual breakdowns of cloud architecture, networking fundamentals, and practical backend engineering.',
  },
  {
    id: 'medium',
    name: 'Medium',
    accent: 'yellow',
    handle: '@anshjoshii',
    profileUrl: 'https://medium.com/@anshjoshii',
    personaTitle: 'Quill & Markdown Mode',
    peekTeaser: 'Fresh technical notes inside…',
    humorCaption:
      'Drafting technical write-ups with a dramatic golden quill because plain editors lacked aura.',
    headline: 'Technical Articles & Engineering Write-ups',
    subcopy:
      'Long-form notes on Go, cloud infrastructure, Kubernetes workflows, and backend problem-solving.',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    accent: 'sage',
    handle: '@its_unsh',
    profileUrl: 'https://www.instagram.com/its_unsh/',
    personaTitle: 'Film Roll Mode',
    peekTeaser: 'Say cheese—latest frame up top!',
    humorCaption:
      'Retro camera out—capturing rides, everyday moments, and snapshots outside the terminal.',
    headline: '@its_unsh — Visual Frames & Moments',
    subcopy:
      'Snapshots from road trips, events, and life away from Kubernetes pods.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    index: '01',
    title: 'Languages',
    items: ['Go (Golang)', 'Python', 'SQL', 'Bash'],
    accent: 'lavender',
  },
  {
    id: 'backend-platform',
    index: '02',
    title: 'Backend & Platform',
    items: [
      'REST API',
      'Microservices',
      'Gin',
      'GORM',
      'PostgreSQL',
      'Kubernetes',
      'Docker',
    ],
    accent: 'sage',
  },
  {
    id: 'cicd-cloud',
    index: '03',
    title: 'CI/CD & Cloud',
    items: [
      'Jenkins',
      'SonarQube',
      'AWS CodePipeline',
      'AWS (S3, IAM, VPC, ECR)',
      'Terraform',
      'Git',
      'Linux',
    ],
    accent: 'yellow',
  },
  {
    id: 'observability',
    index: '04',
    title: 'Observability',
    items: ['Prometheus', 'ELK Stack (Filebeat)', 'Logging', 'Debugging'],
    accent: 'lavender',
  },
  {
    id: 'ai-dev',
    index: '05',
    title: 'AI-Assisted Development',
    items: ['Claude Code', 'GitHub Copilot', 'Agent Loop Engineering'],
    accent: 'sage',
  },
];

export const WORK_EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'engineer',
    index: '01',
    levelLabel: 'Level 02 · Scaled Up',
    characterScaleLabel: 'Full-Size Cloud Engineer',
    spriteKey: 'engineer',
    role: 'Development Engineer in Cloud',
    company: 'Calsoft',
    period: 'April 2025 – Present',
    location: 'Pune / Remote',
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
    index: '02',
    levelLabel: 'Level 01 · Origin Story',
    characterScaleLabel: 'Mini Backend Intern',
    spriteKey: 'intern',
    role: 'Software Engineering Intern (Back End)',
    company: 'Calsoft',
    period: 'April 2024 – April 2025',
    location: 'Pune, India',
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

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'aws-saa',
    index: '01',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    credentialType: 'Cloud Architecture',
  },
  {
    id: 'aws-cp',
    index: '02',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    credentialType: 'Cloud Foundations',
  },
];

export const EDUCATION = {
  degree: 'B.Tech, Computer Science and Engineering',
  institution: 'Acropolis Group of Institutions, Indore (RGPV University)',
  period: '2020 – 2024',
  cgpa: 'CGPA: 7.88 / 10.0',
} as const;

export const SECTION_BUDDY_MOODS: Record<string, SectionBuddyMood> = {
  hero: {
    spriteKey: 'hero',
    contextTag: 'Landed in 16-Bit',
    scale: 1,
    quips: [
      'Dropped straight out of the Hero photo without losing the curly hair physics.',
      'Golang backend engineer by day, 16-bit tour guide right now.',
    ],
  },
  skills: {
    spriteKey: 'idle',
    contextTag: 'Skills · Coffee Mode',
    scale: 1,
    quips: [
      'Fueled by oversized mug coffee, Go goroutines, and clean Kubernetes YAML.',
      'Floating lightbulb means I just thought of a cleaner Terraform module.',
    ],
  },
  experience: {
    spriteKey: 'engineer',
    contextTag: 'Cloud Engineer · LVL 2',
    scale: 1.08,
    quips: [
      'Hover Intern vs Development Engineer below to watch me level up in size!',
      'Star Employee of the Month pin polished and Kubernetes pods running.',
    ],
  },
  certifications: {
    spriteKey: 'grad',
    contextTag: 'Graduated & AWS Certified',
    scale: 1.02,
    quips: [
      'B.Tech diploma in one hand, AWS Solutions Architect badge in the other.',
      'Mortarboard cap somehow stayed balanced on top of all this curly hair.',
    ],
  },
  contact: {
    spriteKey: 'hero',
    contextTag: 'Say Hello',
    scale: 1,
    quips: [
      'Made it to the finish line! Grab my resume or drop an email anytime.',
      'Always up to talk Go, Kubernetes, system design, or motorcycle routes.',
    ],
  },
};
