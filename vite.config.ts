import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

/**
 * Injects the Umami Cloud analytics script into index.html at build time.
 * Skipped in dev (`vite`), and when the website ID is an empty string.
 * UMAMI_DOMAINS limits tracking to the production hostnames, so Vercel preview
 * deploys don't count as visits.
 */
function umamiAnalytics(websiteId: string | undefined, domains: string): Plugin {
  return {
    name: 'umami-analytics',
    apply: 'build',
    transformIndexHtml() {
      const id = websiteId?.trim();
      if (!id) return [];
      if (!/^[0-9a-f-]{36}$/i.test(id)) {
        throw new Error(`UMAMI_WEBSITE_ID must be a UUID, got "${id}"`);
      }
      const attrs: Record<string, string | boolean> = {
        defer: true,
        src: 'https://cloud.umami.is/script.js',
        'data-website-id': id,
      };
      if (domains.trim()) attrs['data-domains'] = domains.replace(/[^a-z0-9.,-]/gi, '');
      return [{tag: 'script', attrs, injectTo: 'head'}];
    },
  };
}

// Umami Cloud website ID for itsansh.space. It is public (it ships in the page
// HTML anyway). Override with the UMAMI_WEBSITE_ID env var; set it to an empty
// string to build without analytics.
const UMAMI_WEBSITE_ID = '99885e3e-7db7-47d7-9bb7-c744c82a04d4';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      umamiAnalytics(
        env.UMAMI_WEBSITE_ID ?? UMAMI_WEBSITE_ID,
        env.UMAMI_DOMAINS ?? 'itsansh.space,www.itsansh.space',
      ),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
