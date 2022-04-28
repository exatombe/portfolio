const fs = require("fs");
const matter = require("gray-matter");
const config = require("../config.json");
function readDirAndDisplay(dir) {
    const files = fs.readdirSync(dir);
    return files.map(file => {
      const filePath = `${dir}/${file}`;
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        return readDirAndDisplay(filePath);
      } else {
        return filePath;
      }
    });
  }

    const files = readDirAndDisplay(config.posts.root);

    function getFileContent(file) {
        return fs.readFileSync(file, "utf-8");
    }

let posts = files.map(file => {
    let { data } = matter(getFileContent(file));
    data.link = file.split("/")[3].replace(".md", "");
    return data;
});

// Write a function to build a dynamic sitemap.
let sitemap = [];
    posts.forEach(post => {
        sitemap.push({
            url: `https://jeremysoler.com/${post.link}`,
            changefreq: "daily",
            priority: 0.8
        });
    });

function buildXmlSiteMap(map) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    xml += `
        <url>
            <loc>https://jeremysoler.com</loc>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
            <lastmod>${new Date()}</lastmod>
        </url>`;
    map.forEach(item => {
        xml += `
        <url>
            <loc>${item.url}</loc>
            <changefreq>${item.changefreq}</changefreq>
            <priority>${item.priority}</priority>
        </url>`;
    });

    xml += `
    </urlset>`;
    return xml;
}

fs.writeFileSync("./public/sitemap.xml", buildXmlSiteMap(sitemap));


function buildRssFromPosts(postMap) {
    let rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
        <channel>
            <title>Jeremy Soler</title>
            <link>https://jeremysoler.com/rss.xml</link>
            <description>Blog personnel de Jérémy soler</description>
            <language>fr-FR</language>
            `;
    postMap.forEach(item => {
        rss += `
            <item>
                <title>${item.title}</title>                
                <guid isPermaLink="true">${item.link}</guid>
                <link>https://jeremysoler.com/${item.link}</link>
                <description>${item.description}</description>
                <pubDate>${new Date(item.date)}</pubDate>
                <author>Jeremy Soler</author>
                <tags>${item.tags.map(e =>{
                    return `<tag>${e}</tag>`;
                })}</tags>
                <category>${item.category}</category>
                <media:content url="${item.image}"/>
                    <media:title>${item.title}</media:title>
                </media:content>                    
            </item>`;
    });
    rss += `
        </channel>
    </rss>`;
    return rss;
}

fs.writeFileSync("./public/rss.xml", buildRssFromPosts(posts));