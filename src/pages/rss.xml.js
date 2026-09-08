import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { routeFromId } from '../data/nav';

// 默认语言（英文）RSS 源
export async function GET(context) {
  const docs = await getCollection('docs-en');
  const items = docs
    .filter((e) => e.id !== 'home' && !e.data.draft && e.data.date)
    .map((e) => ({
      title: e.data.title,
      description: e.data.description,
      link: new URL('/' + routeFromId(e.id), context.site).href,
      pubDate: e.data.date,
    }));

  return rss({
    title: 'Self custody · Bitcoin self-custody for humans',
    description:
      'A practical guide to Bitcoin self-custody for non-geeks: BIP39 seed words + passphrase, simple and safe.',
    site: context.site,
    items,
  });
}
