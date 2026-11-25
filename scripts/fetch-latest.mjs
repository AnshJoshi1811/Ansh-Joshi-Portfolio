// Fetches the newest public posts from Ansh's platforms and writes src/data/latest.json.
// Runs automatically before `npm run build` (and on demand with `npm run fetch:latest`).
// Any source that fails keeps its previous data, so a flaky network never breaks a build.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'src/data/latest.json');

const GITHUB_USER = 'ANSHJOSHI1811';
const YOUTUBE_CHANNEL_ID = 'UCw7ioh9foToCuwyaWVGtoFQ'; // @CloudNetExplained
const MEDIUM_USER = 'anshjoshii';
const REDDIT_USER = 'Original_Mongoose_74';
const UA = 'Mozilla/5.0 (portfolio build; +https://itsansh.space)';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthYear = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

const decode = (s = '') =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');

const stripTags = (html = '') => decode(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const clip = (text, max) => (text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text);
const tag = (xml, name) => xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? '';

async function get(url, as = 'text') {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return as === 'json' ? res.json() : res.text();
}

async function github() {
  const repos = await get(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=10`, 'json');
  const own = repos.filter((r) => !r.fork);
  const toItem = (r) => ({
    title: r.name,
    url: r.html_url,
    date: monthYear(r.pushed_at),
    excerpt: r.description ?? '',
    meta: r.language ?? '',
  });
  return { featured: toItem(own[0]), more: own.slice(1, 4).map(toItem) };
}

async function youtube() {
  const xml = await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`);
  const entries = xml.split('<entry>').slice(1);
  const toItem = (e) => {
    const id = tag(e, 'yt:videoId');
    const views = e.match(/<media:statistics views="(\d+)"/)?.[1];
    return {
      title: decode(tag(e, 'title')),
      url: `https://www.youtube.com/watch?v=${id}`,
      date: monthYear(tag(e, 'published')),
      excerpt: clip(stripTags(tag(e, 'media:description')), 160),
      image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      meta: views ? `${Number(views).toLocaleString('en-US')} ${views === '1' ? 'view' : 'views'}` : '',
    };
  };
  return { featured: toItem(entries[0]), more: entries.slice(1, 4).map(toItem) };
}

async function medium() {
  const xml = await get(`https://medium.com/feed/@${MEDIUM_USER}`);
  const items = xml.split('<item>').slice(1);
  const toItem = (it) => {
    const html = decode(tag(it, 'content:encoded'));
    const text = stripTags(html);
    return {
      title: decode(tag(it, 'title')),
      url: tag(it, 'link').split('?')[0],
      date: monthYear(tag(it, 'pubDate')),
      excerpt: clip(text, 170),
      image: html.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? '',
      meta: '',
    };
  };
  return { featured: toItem(items[0]), more: items.slice(1, 4).map(toItem) };
}

async function reddit() {
  const json = await get(`https://www.reddit.com/user/${REDDIT_USER}/submitted.json?limit=5&raw_json=1`, 'json');
  const posts = json.data.children.map((c) => c.data);
  const toItem = (p) => ({
    title: p.title,
    url: `https://www.reddit.com${p.permalink}`,
    date: monthYear(p.created_utc * 1000),
    excerpt: clip((p.selftext ?? '').replace(/\s+/g, ' ').trim(), 190),
    image: p.preview?.images?.[0]?.source?.url ?? '',
    meta: `${p.score} upvotes · ${p.num_comments} comments`,
  });
  return { featured: toItem(posts[0]), more: posts.slice(1, 4).map(toItem) };
}

const sources = { github, youtube, medium, reddit };

let previous = {};
try {
  previous = JSON.parse(await readFile(OUT, 'utf8'));
} catch {
  // first run
}

const result = { ...previous };
for (const [name, fetcher] of Object.entries(sources)) {
  try {
    result[name] = await fetcher();
    console.log(`latest: ${name} ✓ ${result[name].featured.title}`);
  } catch (error) {
    console.warn(`latest: ${name} kept previous data (${error.message})`);
  }
}
result.fetchedAt = new Date().toISOString();

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, `${JSON.stringify(result, null, 2)}\n`);
