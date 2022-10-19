import { Post } from "../models/Post";

const generateSiteMap = (data: any) => {

  const posts: Post[] = [];

  for (const i in data) {
    posts.push(data[i]);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://yourdomain.com</loc>
    </url>
    ${posts && posts.map(item => {
    return `<url>
        <loc>
          https://yourdomain.com/posts/${item.id}
        </loc>
      </url>`;
  }).join('')}
  </urlset>
  `;
};

function SiteMap() { }

export const getServerSideProps = async ({ res }: any) => {
  const request = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await request.json();

  const sitemap = generateSiteMap(data);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;