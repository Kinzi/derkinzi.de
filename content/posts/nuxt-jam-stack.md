---
title: Building a SEO optimized blog with a Nuxt JAM stack and Markdown files 
slug: /nuxt-jam-stack
short: How to build a SEO optimized, static file blog with nuxtjs and markdown files. Including a sitemap.xml and category or tag pages.
date: 07/11/2019
feature: /img/jam-stack-nuxt.jpg
tags:
  - code
  - nuxt
  - JAM
---
<a style="float:right;background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@foodfaithfit?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="nofollow noopener noreferrer" title="Download free do whatever you want high-resolution photos from Taylor Kiser"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Taylor Kiser</span></a>

## The quest

This blog keeps evolving with me. It started as a flash(!) website about 12 years back, briefly resided in WordPress and has been a ghost installation for the past few years. Even though I don't write very regularly, every once in a while I rebuild it with some new system. Mainly to test some new development in web tech.

This time I wanted to create a JAM stack without a CMS in the back for ease of maintenance. [JAM](https://jamstack.wtf/) stands for Javascript, API and Markup. All pages are pre-build and ready html files on the server. In my case I wanted the content with markdown files right in my code repository. So technically I'm skipping the A - does that make this a JM stack? Or better a JMM stack for markdown? Who knows - who cares? ¯&#92;\_(ツ)\_/¯

> Hint: this was a pain to write in markdown with all the escapes: `¯&#92;\_(ツ)\_/¯`)

I was intrigued by the JAM stack for several reasons:

- it's easier and faster to build and maintain a custom site
- I love writing in markdown
- It can be hosted server less which means less setup, maintainance and money

### Why I wanted to switch from Ghost

I was using ghost for the previous version of this blog. I love the simplicity and usability of the backend a lot. Why did I want to switch? For one, I never really liked working with handlebars in the theme files. But more importantly I used to host it on a little dokku server that I use for small apps. For some reason this installation broke a few weeks back.

It has always been a hassle for me to get ghost going on a non-dedicated server. The CLI unfortunately didn't help too much for me. Worst is the upgrading though. I've skipped the jump to the 1.0 version a few year back and that made it almost impossible for me to upgrade my broken blog to an update running version. I was trying for 4 hours just to get an export of my old content to be able to import it in a newer version. Upgrading to a new version is often better done by a completely new installation on a new server. 

The last time it broke I set up a new VPS for it as this was quicker than befriending dokku and ghost again. Since this is really just a personal blog an own server and all this maintenance hassle seemed like overkill. So JAM to the rescue!

## The plan, setup and challenge

Here is what I had in mind for the blog:

- super fast rendering
- SEO optimized
- simple, clean design with [tailwindcss](https://tailwindcss.com/)
- [nuxt](https://nuxtjs.org/) at the core
- markdown for content
- server less hosting on [netlify](https://www.netlify.com/)
- comments handled by disqus

In short this blog is now based on nuxt, tailwindcss and hosted on netlify. The main challenge was to get classic dynamic elements like tags or categories and some SEO specific stuff like creating a sitemap to work smoothly in the background.

### Why nuxt?

If been using vuejs and nuxt in most of my recent projects and I LIKE IT A LOT. I think I've found that one framework that works best for me. For bigger projects like [viabam](https://viabam.com "Tours and Transfers") I usually throw in a nodejs server for a nice fullstack Javascript evironment.

More commonly used JAM stack options are [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/) and [Gatsby](https://www.gatsbyjs.org/).

## The whole installation and configuration process

### Nuxt Installation

The nuxt installation with the new CLI is most awesome and swift (including tailwindcss used to be such a hassle!). I skipped the server framework and since I wanted to use markdown files right in my repository I did not install axios. Choose the package manager, linting and test options to your preference and select `Universal (SSR)` for your rendering mode. Done!

### Add front end matter

To get markdown files going we need to install some npm module. I used `frontmatter-markdown-loader``

```bash
npm install frontmatter-markdown-loader
# or
yarn add frontmatter-markdown-loader
```

Then enable it in the build part of your `config.nuxt.js`:

```javascript
build: {
  extend(config, ctx) {   
    // ... other code ...
    // add frontmatter-markdown-loader
    config.module.rules.push(
      {
        test: /\.md$/,
        include: path.resolve(__dirname, "content"),
        loader: "frontmatter-markdown-loader",
      }
    );
  }
}
```

### First piece of content

Create a `/content/posts/` folder in the root of your project and add your first markdown file. Here is some example content:

```markdown
---
title: Building a SEO optimized blog with a Nuxt JAM stack
slug: /nuxt-jam-stack
short: How to build a SEO optimized, static file blog with nuxtjs and markdown files. Including a sitemap.xml and catagory or tag pages.
date: 07/11/2019
image: /images/my-featured-image.jpg
tags:
  - code
  - nuxt
  - markdown
---

## My blog post

The normal **markdown** content.
```

As you can see there is a header section following the YAML syntax for some meta information for this particular piece of content. `title` and `short` can later be used for dedicated h1s, meta title and description as well as your blog post list page. For the tags we'll create "dynamic" pages for better inter linking and navigation throughout the site. To be consistent name the files exactly like the slug. WE'll see why in a bit.

### The url structure of the blog

If you are familiar with nuxt you'll know that the url structure for nuxt project is automatically created based on the folders and files in the `/pages` folder. In my case I wanted as much as possible to sit right on my root domain without any subfolders. Here is the structure:

```html
derkinzi.de                 //homepage
derkinzi.de/my-blog-article //single post
derkinzi.de/blog            //view all posts
derkinzi.de/tag/mytag       //for all posts related to tag
```

This translates to the following file structure. Files starting with and `_slug` catch all routes in this folder and pass on the slug as `params.slug` to the file:

```html
pages/index.vue       //homepage
pages/_slug.vue       //single post
pages/blog.vue        //view all posts
pages/tag/_slug.vue   //for all posts related to tag
```

### The single post file

This is a simplified, unstyled content single post page for `pages/_slug.vue`. It's fetching the featured image, tags and title from the markdown meta information. For SEO we create a canonical tag as well as the meta information in the `head()` section:

```html
<template>
  <div>
    <div class="post-head">
      <h1>{{post.attributes.title}}</h1>
      <img :src="post.attributes.image" v-if="post.attributes.image">
      <div>
        <div class="date">{{post.attributes.date}}</div>
        <div class="tags">
          <span v-for="tag in post.attributes.tags">
            <nuxt-link :to="'/tag/'+tag">\#{{tag}}</nuxt-link>
          </span>
        </div>
      </div>
    </div>
    <div class="content" v-html="post.html"></div>
  </div>
</template>
<script>
  export default {
    async asyncData({ params }) {
      let post = await import(`~/content/posts/${params.slug}.md`);
      return { post }
    },
    head() {
      return {
        title: this.post.attributes.title,
        meta: [{
          hid: 'description',
          name: 'description',
          content: this.post.attributes.short
        }],
        link: [{
          rel: 'canonical',
          href: 'https://derkinzi.de' + this.post.attributes.slug
        }]
      }
    }
  }
</script>
```

With this in place you should be able to see your demo blog post at `http://localhost:8080/my-blog-article`.

### Post listing page

To see all pages (`/pages/blog.vue`) we need to fetch the content a little different. Here is again the simplified version:

```html
<template>
    <div>
        <h1>My blog posts:</h1>
        <ul>
            <li v-for="post in posts" :key="post.attributes.title">
                <nuxt-link to="#">{{post.attributes.title}}</nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
  export default {
    async asyncData() {
      const resolve = await require.context('~/content/posts/', true, /\.md$/)
      let imports = resolve.keys().map((key) => resolve(key))
      // sort by date
      imports.sort((a, b) =>
        moment(b.attributes.date, 'DD/MM/YYYY').diff(moment(a.attributes.date, 'DD/MM/YYYY'))
      )
      return { posts: imports }
    }
  }
</script>
```

See how I sort the posts using `momentjs` and their data attribute from the meta section of the markdown file. You can easily extend the display in the `v-for` loop with more information like featured image and excerpt.

### The tags or category page

The template is basically identical to the above. I simply filter out the posts using the tag in `asyncData()` with

```javascript
imports = imports.filter(
  (post) => post.attributes.tags.filter((tag) => tag === params.slug).length
)
```

## Generate all "dynamic" pages and create a sitemap

### Create an array of all pages so nuxt knows what to generate

By default nuxt will only generate the pages it can see in the pages folder. This means it does not generate our posts as they are only represented by the dynamic file `_slug.vue`. In order for nuxt to create all the pages we want we need to make sure it has a full list of them in `nuxt.config.js`. We can make sure of this with a little helper function:

```javascript
// nuxt.config.js
export default async () => {
  const dynamicRoutes = await getDynamicPaths({
    '': 'posts/*.md',
    '/tag': 'posts/*.md'
  })
  return {
    ...
    generate: {
      routes: dynamicRoutes
    }
    ...
  }
}
```

As you can see I changed the nuxt.config.js slightly. It's now an async function returning it's usual contents. I needed to do this to be able to create the dynamic routes(and the sitemap) before the actual `nuxt generate` command runs.

Here is a simple version that will create the routes for the posts but NOT for the tags pages:

```javascript
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.md')}`);
    })
  );
}
```

For a more complicated version of this that will also create pages for all the tags/categories used on our posts please check the [original file on github](https://github.com/Kinzi/derkinzi.de/blob/master/server/fetchRoutes.js)

### Create the sitemap

Based on above array of our pages we can also create the sitemap. Bascically all we need is a properly formated .xml file written to the `/static` folder of our nuxt project. I wrote a little script for it.It's to long to post here so [check it on github](https://github.com/Kinzi/derkinzi.de/blob/master/server/sitemap.js). I run it right after creating the `dynamicRoutes` array and before the `return` in the nuxt.config.js:

```javascript
await createSitemap(dynamicRoutes)
```


## Ideas for future developments

Here is what I want to tweak further for this blog:

Done:

- [Highlight code with PrismJs in Nuxt](/prismjs-nuxtjs-static-pages)
- [Optimize Images in Nuxt](/optimized-responsive-lazyloading-images-with-nuxt)

To do:

- Link to other related posts in the bottom
- Automatic table of contents
- Parse actual markdown content to create optimized image src-sets in content
- Open Graph
- automatic tweet new posts
