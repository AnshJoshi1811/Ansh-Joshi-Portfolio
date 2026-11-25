import { useEffect, useState } from 'react';
import snapshot from '../data/latest.json';
import type { SocialPlatformId } from './portfolioStructure';

export interface FeedItem {
  title: string;
  url: string;
  date: string;
  excerpt?: string;
  image?: string;
  meta?: string;
}

export interface PlatformFeed {
  featured: FeedItem;
  more: FeedItem[];
}

export type LatestFeed = Record<SocialPlatformId, PlatformFeed>;

/** LinkedIn and Instagram don't allow fetching, so these are kept by hand. */
const MANUAL: Pick<LatestFeed, 'linkedin' | 'instagram'> = {
  linkedin: {
    featured: {
      title: 'Development Engineer in Cloud at Calsoft',
      url: 'https://linkedin.com/in/anshjoshi1811',
      date: 'Latest activity',
      excerpt: 'Updates on Kubernetes, Terraform and CI/CD work.',
      meta: 'Calsoft · Pune',
    },
    more: [
      { title: 'Star Employee of the Month', url: 'https://linkedin.com/in/anshjoshi1811', date: 'Calsoft' },
      {
        title: 'AWS Certified Solutions Architect – Associate',
        url: 'https://linkedin.com/in/anshjoshi1811',
        date: 'AWS',
      },
    ],
  },
  instagram: {
    featured: {
      title: 'Latest reel on @its_unsh',
      url: 'https://www.instagram.com/reel/DgCeOgKhprQ/',
      date: 'Reel',
      excerpt: 'Road trips, dev events and life away from the keyboard.',
      meta: '@its_unsh',
    },
    more: [{ title: 'All posts and reels', url: 'https://www.instagram.com/its_unsh/', date: 'Profile' }],
  },
};

const SNAPSHOT = snapshot as Partial<LatestFeed>;
const EMPTY: PlatformFeed = { featured: { title: '', url: '', date: '' }, more: [] };

const BUILT_FEED: LatestFeed = {
  github: SNAPSHOT.github ?? EMPTY,
  youtube: SNAPSHOT.youtube ?? EMPTY,
  medium: SNAPSHOT.medium ?? EMPTY,
  reddit: SNAPSHOT.reddit ?? EMPTY,
  ...MANUAL,
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let liveGithub: Promise<PlatformFeed | null> | null = null;

/** GitHub's API allows browser requests, so refresh it live on top of the build-time snapshot. */
function fetchLiveGithub() {
  liveGithub ??= fetch('https://api.github.com/users/ANSHJOSHI1811/repos?sort=pushed&per_page=10')
    .then((res) => (res.ok ? res.json() : null))
    .then((repos: Array<Record<string, unknown>> | null) => {
      const own = repos?.filter((r) => !r.fork) ?? [];
      if (own.length === 0) return null;
      const toItem = (r: Record<string, unknown>): FeedItem => {
        const pushed = new Date(String(r.pushed_at));
        return {
          title: String(r.name),
          url: String(r.html_url),
          date: `${MONTHS[pushed.getUTCMonth()]} ${pushed.getUTCFullYear()}`,
          excerpt: (r.description as string | null) ?? '',
          meta: (r.language as string | null) ?? '',
        };
      };
      return { featured: toItem(own[0]), more: own.slice(1, 4).map(toItem) };
    })
    .catch(() => null);
  return liveGithub;
}

/** Latest items per platform: build-time snapshot first, then live GitHub when it arrives. */
export function useLatestFeed(): LatestFeed {
  const [feed, setFeed] = useState(BUILT_FEED);
  useEffect(() => {
    let active = true;
    fetchLiveGithub().then((github) => {
      if (active && github) setFeed((prev) => ({ ...prev, github }));
    });
    return () => {
      active = false;
    };
  }, []);
  return feed;
}
