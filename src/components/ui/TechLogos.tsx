import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa6';
import {
  SiClaude,
  SiDocker,
  SiElasticstack,
  SiGin,
  SiGit,
  SiGnubash,
  SiGo,
  SiJenkins,
  SiKubernetes,
  SiLinux,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiSonarqubeserver,
  SiTerraform,
} from 'react-icons/si';
import { TbApi, TbDatabaseCog, TbGitMerge, TbSitemap, TbTopologyStar3 } from 'react-icons/tb';
import type { TechLogoId } from '../../config/portfolioStructure';

/** Official brand marks (Simple Icons / Font Awesome / Tabler via react-icons) in brand colors. */
const LOGOS: Record<TechLogoId, { Icon: IconType; color: string }> = {
  go: { Icon: SiGo, color: '#00ADD8' },
  gin: { Icon: SiGin, color: '#008ECF' },
  gorm: { Icon: TbDatabaseCog, color: '#00ADD8' },
  rest: { Icon: TbApi, color: '#0F766E' },
  microservices: { Icon: TbTopologyStar3, color: '#7C3AED' },
  postgresql: { Icon: SiPostgresql, color: '#4169E1' },
  python: { Icon: SiPython, color: '#3776AB' },
  bash: { Icon: SiGnubash, color: '#4EAA25' },
  kubernetes: { Icon: SiKubernetes, color: '#326CE5' },
  docker: { Icon: SiDocker, color: '#2496ED' },
  terraform: { Icon: SiTerraform, color: '#844FBA' },
  aws: { Icon: FaAws, color: '#FF9900' },
  codepipeline: { Icon: TbGitMerge, color: '#C925D1' },
  jenkins: { Icon: SiJenkins, color: '#D24939' },
  sonarqube: { Icon: SiSonarqubeserver, color: '#126ED3' },
  linux: { Icon: SiLinux, color: '#1F2937' },
  git: { Icon: SiGit, color: '#F05032' },
  prometheus: { Icon: SiPrometheus, color: '#E6522C' },
  elk: { Icon: SiElasticstack, color: '#005571' },
  claude: { Icon: SiClaude, color: '#D97757' },
  systemdesign: { Icon: TbSitemap, color: '#0F172A' },
};

interface TechLogoProps {
  id: TechLogoId;
  className?: string;
}

export function TechLogo({ id, className = 'w-7 h-7' }: TechLogoProps) {
  const { Icon, color } = LOGOS[id];
  return <Icon aria-hidden="true" className={className} style={{ color }} />;
}
