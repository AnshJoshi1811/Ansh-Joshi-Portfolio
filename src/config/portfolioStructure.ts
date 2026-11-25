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

export interface SocialPlatformConfig {
  id: SocialPlatformId;
  name: string;
  handle: string;
  profileUrl: string;
}

export interface ExperienceEntry {
  id: 'engineer' | 'intern';
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
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
  city: 'Pune',
} as const;

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
  { id: 'experience', index: '04', label: 'Experience', href: '#experience' },
  { id: 'skills', index: '05', label: 'Skills', href: '#skills' },
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
    role: 'Primary language',
    category: 'backend',
    tintClass: 'bg-[#F0F9FF] border-[#BAE6FD]',
  },
  {
    id: 'gin',
    name: 'Gin Framework',
    role: 'REST APIs',
    category: 'backend',
    tintClass: 'bg-[#ECFDF5] border-[#A7F3D0]',
  },
  {
    id: 'gorm',
    name: 'GORM',
    role: 'ORM · idempotent writes',
    category: 'backend',
    tintClass: 'bg-[#EFF6FF] border-[#BFDBFE]',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL & SQL',
    role: 'Indexing · query tuning',
    category: 'backend',
    tintClass: 'bg-[#EFF6FF] border-[#C7D2FE]',
  },
  {
    id: 'rest',
    name: 'REST APIs',
    role: 'API design',
    category: 'backend',
    tintClass: 'bg-[#F0FDFA] border-[#99F6E4]',
  },
  {
    id: 'microservices',
    name: 'Microservices',
    role: '15+ services on Kubernetes',
    category: 'backend',
    tintClass: 'bg-[#EEF2FF] border-[#C7D2FE]',
  },
  {
    id: 'python',
    name: 'Python',
    role: 'Scripting',
    category: 'backend',
    tintClass: 'bg-[#EFF6FF] border-[#BFDBFE]',
  },
  {
    id: 'bash',
    name: 'Bash Scripting',
    role: 'Automation',
    category: 'backend',
    tintClass: 'bg-[#F8FAFC] border-[#CBD5E1]',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    role: '3-node cluster ops',
    category: 'cloud',
    tintClass: 'bg-[#EFF6FF] border-[#BFDBFE]',
  },
  {
    id: 'docker',
    name: 'Docker & ECR',
    role: 'Containers',
    category: 'cloud',
    tintClass: 'bg-[#F0F9FF] border-[#BAE6FD]',
  },
  {
    id: 'terraform',
    name: 'Terraform',
    role: 'Infra as code',
    category: 'cloud',
    tintClass: 'bg-[#F5F3FF] border-[#DDD6FE]',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    role: 'S3 · IAM · VPC · ECR',
    category: 'cloud',
    tintClass: 'bg-[#FFFBEB] border-[#FDE68A]',
  },
  {
    id: 'codepipeline',
    name: 'AWS CodePipeline',
    role: 'Git-tag releases',
    category: 'cloud',
    tintClass: 'bg-[#FFF7ED] border-[#FED7AA]',
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    role: 'CI/CD pipelines',
    category: 'cloud',
    tintClass: 'bg-[#FEF2F2] border-[#FECACA]',
  },
  {
    id: 'sonarqube',
    name: 'SonarQube',
    role: 'Code quality scans',
    category: 'cloud',
    tintClass: 'bg-[#F0F9FF] border-[#BAE6FD]',
  },
  {
    id: 'linux',
    name: 'Linux',
    role: 'Servers',
    category: 'cloud',
    tintClass: 'bg-[#F8FAFC] border-[#CBD5E1]',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    role: 'Version control',
    category: 'cloud',
    tintClass: 'bg-[#FFF1F2] border-[#FECDD3]',
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    role: 'Metrics',
    category: 'observability',
    tintClass: 'bg-[#FFF7ED] border-[#FDBA74]',
  },
  {
    id: 'elk',
    name: 'ELK Stack (Filebeat)',
    role: 'Log collection',
    category: 'observability',
    tintClass: 'bg-[#FEFCE8] border-[#FEF08A]',
  },
  {
    id: 'claude',
    name: 'Claude Code & Copilot',
    role: 'Plan · build · test · review',
    category: 'observability',
    tintClass: 'bg-[#FFF7ED] border-[#FED7AA]',
  },
  {
    id: 'systemdesign',
    name: 'System Design',
    role: 'Scaling & trade-offs',
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
    highlights: [
      'Run 15+ ONAP microservices as pods on a 3-node Kubernetes cluster on AWS.',
      'Cut 22 Jenkins pipelines down to 4, with SonarQube scans built in.',
      'Provisioned dev, staging and production on AWS with Terraform.',
      'Built Git-tag releases on AWS CodePipeline, monitored with Prometheus and ELK.',
      'Cut onboarding for new simulations by 40% with a plugin design for SQS and Lambda in a Go simulator of 20+ cloud services.',
      'Cut team setup time by 60% by containerizing the simulator with Docker.',
    ],
  },
  {
    id: 'intern',
    role: 'Software Engineering Intern (Back End)',
    company: 'Calsoft',
    period: 'April 2024 – April 2025',
    location: 'Pune, India',
    highlights: [
      'Built a Go pipeline that updates multi-GB AWS pricing catalogs with zero downtime.',
      'Cut query timeouts by about 35% with Gin APIs and PostgreSQL indexing.',
    ],
  },
];

export const SOCIAL_PLATFORMS: SocialPlatformConfig[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: 'ANSHJOSHI1811',
    profileUrl: 'https://github.com/ANSHJOSHI1811',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'in/anshjoshi1811',
    profileUrl: 'https://linkedin.com/in/anshjoshi1811',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@CloudNetExplained',
    profileUrl: 'https://www.youtube.com/@CloudNetExplained',
  },
  {
    id: 'medium',
    name: 'Medium',
    handle: '@anshjoshii',
    profileUrl: 'https://medium.com/@anshjoshii',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    handle: 'Side Stand Stories · u/Original_Mongoose_74',
    profileUrl: 'https://www.reddit.com/user/Original_Mongoose_74/',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@its_unsh',
    profileUrl: 'https://www.instagram.com/its_unsh/',
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
    focus: 'Designing secure, highly available systems on AWS.',
  },
  {
    id: 'aws-cp',
    index: '02',
    code: 'CLF-C02',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    credentialType: 'Cloud Foundations',
    focus: 'AWS cloud fundamentals.',
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
