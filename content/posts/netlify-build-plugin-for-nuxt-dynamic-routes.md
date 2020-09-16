---
title: Use a netlify build plugin to generate your nuxt routes  
slug: /netlify-build-plugin-for-nuxt-dynamic-routes
short: When you get content from a headless CMS, sometimes you need to define a routes file for your nuxt build and sitemap file to work properly. Here I show you how to do that with netlify.
date: 08/08/2020
feature: /img/netlify-build-plugin.jpg
tags:
  - code
  - nuxt
  - JAM
---
<a style="float:right;background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@mattartz?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="nofollow noopener noreferrer" title="Download free do whatever you want high-resolution photos from Matt Artz">
<span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Matt Artz</span>
</a>

## The Problem

I use [Directus](https://github.com/directus/directus) as my headless CMS of choice for several projects now. I recently added a blog to my agencies nuxt website: [webmarken](https://webmarken.com). Since several people are supposed to write content eventually I set it up with Directus as the CMS. Directus has a very convenient webhook feature so triggering the deploy at netlify whenever an article is changed or created was easy to set up.

The problem: even though I create the routes file on each nuxt build, netlify would always use the one in the git repository. Hence new blog posts did not show up in the sitemap. You could navigate to them one the website, but directl loading them caused a 404.

After several fruitless attempts to fix it with nuxt settings and build hooks I discovered netlify build plugins - and that solved the issue for me in about 30 min. Here is the brief rundown.

## Setting up the build webhooks between Directus and netlify

With the new directus this really is easy as. Just go to Settings > Webhooks and create two new webhooks for your collection: create and update. Both webhooks should POST to your Netlify build webhook address. 

You can easily create one here: `https://app.netlify.com/sites/YOURSITE/settings/deploys#build-hooks`

![old site speed](/img/directus-webhook.png)

## The Netlify Build Plugin for dynamic Nuxt Routes

Netlify Plugins are pretty straight forward. All you need is a folder in your project root - for example `./build-plugins/routes` - with two files:
- `index.js`
- `manifest.yml`

You can find out more about Netlify Build Plugins in their [Documentation](https://docs.netlify.com/configure-builds/build-plugins/create-plugins/)

The manifest simply contains the name of your plugin:

```bash
name: netlify-create-routes
```

The `index.js` file exports a function in nodejs style. For this case we use the `onPreBuild` hook:

```javascript
module.exports = {
  onPreBuild: async () => {
    ...
  },
}
```

The logic I'm using couldn't be simpler. I'm basically reusing what I already have in my `this.nuxt.hook('build:before', async (builder) => {}`. Of course you'd need to define your own API fetch and route array generation to your needs:

```javascript
const fetchData = require('../../server/fetchData')
const createRoutes = require('../../server/createRoutes')

module.exports = {
  onPreBuild: async () => {
    console.log('/----------ROUTES--------/')

    // Fetch all posts data from Directus API
    const { posts } = await fetchData()
    console.log('Fetched Content')

    // Create routes array from dynamic pages from posts
    // Store array in ./static/routes.json
    await createRoutes(posts)
    console.log('New Routes created & saved')

    console.log('/---------/ROUTES--------/')
  },
}
```
## Tell Netlify to use the plugin

The last step to make this work is to tell Netlify to use your Plugin while building the project. For this either create or simply add the following to your `netlify.toml` file in your root directory:

```bash
[[plugins]]
  package = "/build-plugins/routes"
```

## Use the routes file in nuxt

You can then go ahead and simply use the routes file in `nuxt.config.js` like so to get everything running and generation smoothly:

```javascript
const routes = require('./static/routes.json')
module.exports = {
  ...
  generate: {
    routes
  },
  sitemap: {
    routes
  }
  ...
}
```
