import path from 'path'
import fs from 'fs'
import glob from 'glob'
import { loadFront } from 'yaml-front-matter'

export default async () => {
  // Create an array of all pages fpr nuxt generate
  const dynamicRoutes = await getDynamicPaths({
    '': 'posts/*.md',
    '/tag': 'posts/*.md'
  })
  return {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
      title: process.env.npm_package_name || '',
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: process.env.npm_package_description || ''
        },
        {
          name: 'msapplication-TileColor',
          content: '#f08d49'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#7ec699'
        }
      ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
      color: '#fff'
    },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/prism', '~/plugins/disqus'],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
      // Doc: https://github.com/nuxt-community/eslint-module
      '@nuxtjs/eslint-module',
      // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
      '@nuxtjs/tailwindcss'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [],
    generate: {
      routes: dynamicRoutes
    },
    purgeCSS: {
      whitelistPatternsChildren: [/token$/]
    },
    /*
     ** Build configuration
     */
    build: {
      /*
       ** You can extend webpack config here
       */
      extend(config, ctx) {
        if (ctx.isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: '/(node_modules)/',
            options: {
              fix: true
            }
          })
        }
        // add frontmatter-markdown-loader
        config.module.rules.push({
          test: /\.md$/,
          include: path.resolve(__dirname, 'content'),
          loader: 'frontmatter-markdown-loader'
        })
      }
    }
  }
}

/* https://github.com/jake-101/bael-template */
async function getDynamicPaths(urlFilepathTable) {
  let tags = []

  // Fetch post files and extract tags
  const fetchTags = (url) => {
    return new Promise((resolve, reject) => {
      glob.sync(urlFilepathTable[url], { cwd: 'content' }).map((filepath) => {
        return fs.readFile(
          `${path.resolve(__dirname)}/content/${filepath}`,
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
          .map((filepath) => `${url}/${path.basename(filepath, '.md')}`)
      })
  )
}
