const OWNER = 'Oviszh';

export interface ToolRelease {
  repo: string;
  asset: string;
}

export async function fetchLatestToolRelease({ repo, asset }: ToolRelease): Promise<string> {
  const url = `https://github.com/${OWNER}/${repo}/releases/latest/download/${asset}`;
  let lastError = '';

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(20_000),
      });

      if (!response.ok) {
        lastError = `HTTP ${response.status}`;
        continue;
      }

      const html = await response.text();
      if (!/^\s*<!doctype html>/i.test(html) || !/<html[\s>]/i.test(html)) {
        lastError = 'downloaded asset is not a complete HTML document';
        continue;
      }

      return html;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  throw new Error(
    `Build failed: could not download ${repo}/${asset} from its latest GitHub Release (${lastError}). ` +
      'Confirm that the repository has a published, non-prerelease Release with an asset of that exact name.',
  );
}

export function stripToolDoctype(html: string): string {
  return html.replace(/^\s*<!doctype[^>]*>/i, '');
}
