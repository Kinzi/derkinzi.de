import path from 'path'
import fs from 'fs'
import glob from 'glob'
import { loadFront } from 'yaml-front-matter'

export default async function(urlFilepathTable) {
  console.log('Create dynamic routes')
  let tags = []

  // Fetch post files and extract tags
  const fetchTags = (url) => {
    return new Promise((resolve, reject) => {
      glob.sync(urlFilepathTable[url], { cwd: 'content' }).map((filepath) => {
        return fs.readFile(
          `${path.resolve(__dirname, '../')}/content/${filepath}`,
          'utf8',
          (err, data) => {
            if (err) throw err
            else {
              const post = loadFront(data)
              if (post.tags) tags = tags.concat(post.tags)
              resolve()
            }
          }
        )
      })
    })
  }
  const getData = () => {
    return Promise.all(
      Object.keys(urlFilepathTable).map((item) => fetchTags(item))
    )
  }
  await getData()

  // Delete duplicate tags
  tags = tags.filter((item, pos) => tags.indexOf(item) === pos)

  // Push tag pages to pages array
  const pages = []
  for (const tag of tags) {
    pages.push('/tag/' + tag)
  }

  // Add pages and post to pages array and return
  return pages.concat(
    ...Object.keys(urlFilepathTable)
      .filter((url) => url !== '/tag')
      .map((url) => {
        return glob
          .sync(urlFilepathTable[url], { cwd: 'content' })
          .map((filepath) => {
            if (url === '/pages') url = ''
            return `${url}/${path.basename(filepath, '.md')}`
          })
      })
  )
}
