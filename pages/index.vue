<template lang="pug">
#home
  .home-head
    img.mx-auto(src="~/assets/images/2016/05/derkinzi-back.jpg" :srcset="require('~/assets/images/2016/05/derkinzi-back.jpg').srcSet" sizes="(min-width: 768px) 60vw, 95vw")
  #blogroll
    ul.list-none
      li.mt-10.border-b.border-gray-400.pb-10(class="md:mt-20 md:pb-20" v-for="post in posts" :key="post.attributes.title")
        nuxt-link(:to="post.attributes.slug")
          h2.mx-4(class="md:mx-10 xl:mx-20") {{post.attributes.title}}
          .text-gray-400.mx-4.text-sm.-mt-2(class="md:mx-10 xl:mx-20") {{post.attributes.date}}
          img.lazyload.mt-4.rounded.w-full.h-64.object-cover.shadow-lg(:data-src="'~/assets' + post.attributes.feature" :data-srcset="require('~/assets' + post.attributes.feature).srcSet" sizes="(min-width: 768px) 60vw, 95vw" v-if="post.attributes.feature")
          .mx-4.mt-8.text-gray-700(class="md:mx-10 xl:mx-20") {{post.attributes.short}}
</template>

<script>
import moment from 'moment'
export default {
  async asyncData() {
    const resolve = await require.context('~/content/posts/', true, /\.md$/)
    let imports = resolve.keys().map((key) => resolve(key))
    // filter out page type
    imports = imports.filter((post) => !post.attributes.type)
    // sort by date
    imports.sort((a, b) =>
      moment(b.attributes.date, 'DD/MM/YYYY').diff(
        moment(a.attributes.date, 'DD/MM/YYYY')
      )
    )
    return {
      posts: imports
    }
  }
}
</script>

<style></style>
