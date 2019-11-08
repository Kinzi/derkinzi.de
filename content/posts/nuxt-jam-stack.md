---
title: Nuxt JAM stack
slug: /nuxt-jam-stack
short: A blog post about nothing again. It just keeps coming. A blog post about nothing again. It just keeps coming. A blog post about nothing again. It just keeps coming. A blog post about nothing again. It just keeps coming.
date: 07/11/2019
tags:
  - code
  - nuxt
  - JAM
---

## The quest

This blog keeps evolving with me. It started as a flash site about 10 years back, briefly resided in WordPress and has been a ghost isntallation for the past few years. Even though I don't write much, every once in a while I just rebuild it with some new system. This time it's a JAM stack with Nuxt at it's core. JAM stands for Javascript, API and Markup. The difference to other blogs systems is that it's static. All pages are pre-build and ready html files on the server. The content is provided with markdown files. Famous options are Jekyll, Hugo and Gatsby. fudsfhd

I was intrigued by this for several reasons:

- it's easier and faster to build and maintain a custom site
- I love writing in markdown
- It can be hosted server less which means less work and money

I was using ghost for the previous version of this blog. I love the simplicity and usability of the backend a lot. Why did I switch? For one, I never really liked working with handlebars in the theme files. But more importantly I used to host it on a little dokku server that I use for small apps. For some reason this installation broke a few weeks back.

It has always been a hassle for me to get ghost going on a non-dedicated server. The CLI unfortunately didn't help much. The last time it broke I set up a new VPS for it as this was quicker than befriending dokku and ghost again. Since this is really just a personal blog an own server and all this maintainance seemed like overkill. So JAM to the rescue!

## The plan

Here is what I had in mind for the blog:

- simple clean design with tailwindcss
- nuxt for markup
- markdown for content
- serverless hosting on netlify
- comments handled by disqus
- prism for code highlighting

## Why nuxt?

If been using vuejs and nuxt in most of my recent projects and I LIKE IT A LOT. I think I've found that one framework that works best for me. For bigger projects like [viabam](https://viabam.com "Tours and Transfers") I usually throw in nodejs for a fullstack Javascript evironment.

## Other considerations

## The setup

### Nuxt Installation

### Add front end matter

### Getting Prismjs working with Nuxt

It took me some time to figure it out bu it's actually fairly straight forward. Just make sure you call `Prism.highlightAll()`in your page's mounted function. If you are using purgeCSS make sure to whitelist the `.token` children:

```javascript
// app/plugins/prism.js
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css' // or whatever theme you like
export default Prism

// nuxt.config.js
// if you use prugeCSS include prism classes:
purgeCSS: {
    whitelistPatternsChildren: [/token$/]
},
plugins: [
  '~/plugins/prism'
],

// app/pages/_slug.vue
import Prism from '~/plugins/prism'
export default {
  ...
  mounted() {
    Prism.highlightAll()
  },
  ...
}
```

*italic* **stronger** ***strongeritalic***

> Dorothy followed her through many of the beautiful rooms in her castle.

>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

- First item
- Second item
- Third item
- Fourth item

1. First item
2. Second item
3. Third item
4. Fourth item

My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").

<https://www.markdownguide.org>
<fake@example.com>

In a hole in the ground there `lived a hobbit`. Not a nasty, dirty, wet hole, filled with the ends
of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to
eat: it was a [hobbit-hole][1], and that means comfort.

In a hole in the ground there `lived a hobbit`. Not a nasty, dirty, wet hole, filled with the ends
of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to
eat: it was a [hobbit-hole](https://en.wikipedia.org/wiki/Hobbit#Lifestyle), and that means comfort.

![Kirgis Things](/images/2016/05/kirgis.jpg)

In a hole in the ground there `lived a hobbit`. Not a nasty, dirty, wet hole, filled with the ends
of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to
eat: it was a [hobbit-hole][1], and that means comfort.

[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"
