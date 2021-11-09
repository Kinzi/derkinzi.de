---
title: How to use optimized, responsive and lazyloading images in a nuxt project
slug: /optimized-responsive-lazyloading-images-with-nuxt
short: How to build a SEO optimized, static file blog with nuxtjs and markdown files. Including a sitemap.xml and category or tag pages.
date: 16/11/2019
feature: /img/optimize-images-nuxtjs.jpg
tags:
  - code
  - nuxt
  - JAM
  - frontend
---
<span>Photo by <a href="https://unsplash.com/@chuttersnap?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" rel="nofollow">chuttersnap</a> on <a href="/s/photos/speed?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" rel="nofollow">Unsplash</a></span>

So the goal was to get this blog super fast by using static pages and hosting it on netlify to make use of their CDN. So after getting Nuxt to work with markdown and render all pages as described [here](/nuxt-jam-stack) I uploaded the files to netlify - eager to see the site's speed.

Imagine my face when I saw a big red, devastating <span style="color:red;font-weight:600">**22%**</span> on GT-Metrix.

<div class="mx-auto">
<iframe class="mx-auto" src="https://giphy.com/embed/aWPGuTlDqq2yc" width="480" height="252" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
<p class="text-center"><a href="https://giphy.com/gifs/celebrity-reshuffle-aWPGuTlDqq2yc" class="text-sm">via GIPHY</a></p>
</div>

On closer inspection I found out that the website was actually well up in the high 90ies for every aspect but for images. The rating was brought down exclusively by these two factors:

- Serve scaled images
- Optimize images

## Lazyloading and optimization to the rescue

So obviously I had to do something. In other projects I tend to use a service like [imgx](https://www.imgix.com/) for ease of image handling but this seemed overkill to implement in a simple blog like this. Also CDN already comes with netlify. I wanted a way to kinda automatically use a `srcset` to serve optimized images and also lazy load images on the page. So I dived into the vast world of webpack/nuxt/npm packages to find something that would solve my issue.

## Lazyloading images in nuxt

Lazyloading was actually fairly easy to implement. The package I found working best is [lazysizes](https://github.com/aFarkas/lazysizes). Simply install it with you package manager of choice:

```bash
npm install lazysizes
// or
yarn add lazysizes
```

Then create a nuxt plugin for it in the `/plugins` folder. Make sure to add `.client.js` to the filename to make sure it's run on the client side:

```javascript
// lazysizes.client.js
import lazySizes from 'lazysizes'
export default lazySizes
```

Now simply include this in the plugins sections of your `nuxt.config.js` and make sure `data-src` attributes get handled on build:

```javascript
plugins: [
  '~/plugins/lazysizes.client.js'
],
build: {
  extend (config, { isDev, isClient, loaders: { vue } }) {
    if (isClient) {
      vue.transformAssetUrls.img = ['data-src', 'src']
      vue.transformAssetUrls.source = ['data-srcset', 'srcset']
    }
  }
}
```

That's it. If you now simply add the `.lazyload` class to any image tag it should work out of the box! (If you store your images in the assets folder)

```html
<template>
  <img data-src="~assets/images/awesomeimage.jpg" class="lazyload">
</template>
```

Just lazyloading shot up the GT-Metrix rating into the orange area of around 70-80% I think. But the "Optimize images" section was still very poor. So let's tackle this next.

## Automatically serve optimized, responsive images with nuxt

This part was a lot trickier and I had to try a few packages before I got it to work smoothly. Of course one can always make a big difference with carefully pre-optimizing the images and converting them to a certain size. But responsiveness will always be tricky with this and also this blog is supposed to be easy to use so I wanted to automate this as much as possible. The package that worked for me in the end is [nuxt-responsive-loader](https://www.npmjs.com/package/nuxt-responsive-loader)

Let's start off by installing it:

```bash
npm install nuxt-responsive-loader
// or
yarn add nuxt-responsive-loader
```

Then include the module in your `nuxt.config.js`:

```javascript
modules: ['nuxt-responsive-loader']
```

This should be enough to make it work. Try it in the markup by using:

```html
<template>
  <img :data-src="'~/assets/images/awesomeimage.jpg" :data-srcset="require('~/assets/images/awesomeimage.jpg).srcSet" class="lazyload">
</template>
```

See how it combines well with the `data` prefix and class of the lazyloading above. Use normal `:src`and `srcset` if you don't want/have that.

While this should work out of the box I had a few issues with the setup:

- Image sizes did not really fit my needs
- Image names where random hashes which is not cool for SEO
- building the project took long and sometimes felt like it's clogging up
- Browser was picking up the wrong image sizes
- images in the blog content where not effected

### Optimize image sizes and names

Luckily the first two points where easy to adjust in the plugins settings in `nuxt.config.js`:

```javascript
...
responsiveLoader: {
  name: 'images/[name]-[width].[ext]', // use [name] to keep the original filename
  sizes: [320, 640, 768, 960, 1024, 1280, 1600, 1920], // array of image sizes - adjust to your layout needs
  quality: 85 // 85 is default. Tweak this if you need to
...
```

### Make nuxt build process faster

As for the building speed `nuxt-responsive-loader` allows the use of two image processers. By default it uses `jimp`. If you feel like this makes your build too slow I highly recommend trying the other one `sharp`. Simply `npm i sharp` and set it in the config file:

```javascript
...
responsiveLoader: {
  adapter: require('responsive-loader/sharp'),
...
```

It is still slower than without the optimization but bareable. If anybody knows how to skip the optimization in development let me know! ;)

### Make browser use the right image sizes

The next challenge I had was mainly due to my layout: because of the sidebar menu browsers would pick up the wrong size of the srcset images. They always use the full window width. After some googling around I found the answer: the [sizes attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for the `<img/>` tag.

Here is how it works in my case for the featured image:

```html
<img sizes="(min-width: 768px) 60vw, 95vw"/>
````

Basically you can give it some css formats. In my case the sidebar only appears for screens bigger than 768px. So for everything bigger than that this tells the image to use `60vw` to pick the image size else default to `95vw`. Pretty straight forward - however it took some trial and error to find the correct values I needed.

### Apply lazyloading and optimization to images in markdown content

I still haven't solved this part. There are a few ideas: 

- parse the html to replace attributes, links and classes, 
- use tailwindcss `@apply`to apply the `.lazyload` class to all images in the content
- or custommize somthing with the markdownIt setting of `frontmatter-markdown-loader``

I'll update here as soon as I've cracked it!

## The result

I'm quite happy with what I got out of these two improvements:

![GT Metrix derkinzi.de](/images/2019/gt-metrix-derkinzi.jpg)

There is always something more to optimize but for now this gets me in the range where I want to be.
