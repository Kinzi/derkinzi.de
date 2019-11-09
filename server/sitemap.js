import fs from 'fs'
import glob from 'glob'

function createUrl(domain, slug, frequency, priority) {
  let xml = '<url>'
  xml += `<loc>${domain}${slug}</loc>`
  xml += '<changefreq>' + frequency + '</changefreq>'
  xml += '<priority>' + priority + '</priority>'
  xml += '</url>'
  return xml
}

function saveSitemap(sitemap) {
  fs.writeFile('static/sitemap.xml', sitemap, (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('sitemap.xml was saved successfully!')
  })
}

function fetchStaticPages() {
  // Fetch all files from pages dir but dynamic one starting with '_'
  return glob
    .sync('[!_]*.vue', {
      cwd: 'pages'
    })
    .map((filepath) => `/${filepath.slice(0, -4)}`)
}

export default async function(pages) {
  console.log('Create sitemap.xml')
  const priority = 0.5
  const freq = 'monthly'
  const staticPages = await fetchStaticPages()
  pages = pages.concat(staticPages)
  try {
    // XML sitemap generation starts here
    let xml =
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    // Add static pages
    for (const slug of pages) {
      xml += createUrl('https://derkinzi.de', slug, freq, priority)
    }
    xml += '</urlset>'

    // Store Sitemap
    saveSitemap(xml)
  } catch (e) {
    console.log(e)
  }
}
