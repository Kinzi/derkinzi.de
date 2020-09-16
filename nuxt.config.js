import path from 'path'
import getDynamicPaths from './server/fetchRoutes'
import createSitemap from './server/sitemap'

// TODO: disqus

export default async () => {
  // Create an array of all dynamic pages for nuxt generate
  // tags will be handled differently
  const dynamicRoutes = await getDynamicPaths({
    '': 'posts/*.md',
    '/pages': 'pages/*.md',
    '/tag': 'posts/*.md'
  })
  await createSitemap(dynamicRoutes)
  return {
    /*
     ** Headers of the page
     */
    head: {
      title: 'derkinzi | personal blog',
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
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=UA-49352822-2',
          async: true,
          defer: false
        },
        {
          type: 'text/javascript',
          innerHTML:
            "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-49352822-2');"
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
    plugins: [
      '~/plugins/prism',
      '~/plugins/disqus',
      '~/plugins/lazysizes.client.js'
    ],
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
    modules: ['@nuxt/content', 'nuxt-responsive-loader'],
    content: {
      // Options
    },
    responsiveLoader: {
      name: 'images/[name]-[width].[ext]',
      sizes: [320, 640, 768, 960, 1024, 1280, 1600, 1920],
      adapter: require('responsive-loader/sharp'),
      quality: 85
    },
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
          ctx.loaders.vue.transformAssetUrls.img = ['data-src', 'src']
          ctx.loaders.vue.transformAssetUrls.source = ['data-srcset', 'srcset']
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
