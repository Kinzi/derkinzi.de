---
title: Getting Prismjs working with Nuxt
slug: /prismjs-nuxtjs-static-pages
short: How to get prismjs to play nicely on a static website rendered with nuxt.
date: 07/11/2019
feature: /images/2019/prismjs-nuxt.jpg
tags:
  - code
  - nuxt
  - prism
---

It took me some time to figure it out but it's actually fairly straight forward. Just make sure you call `Prism.highlightAll()` in your page's mounted function. If you are using purgeCSS make sure to whitelist the `.token` children in your config:

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

If you want to use more than just the standard languages for the code highlighting simply import the respective library in the plugin file like so:

```javascript
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-json'
export default Prism
```
