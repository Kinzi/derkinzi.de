<template lang="pug">
  #posts
    h1 /tag {{$route.params.slug}}
    .border-t.border-gray-400.mt-2
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
  async asyncData({ params }) {
    const resolve = await require.context('~/content/posts/', true, /\.md$/)
    let imports = resolve.keys().map((key) => resolve(key))
    // filter out page type
    imports = imports.filter((post) => !post.attributes.type)
    imports = imports.filter(
      (post) => post.attributes.tags.filter((tag) => tag === params.slug).length
    )
    // sort by date
    imports.sort((a, b) =>
      moment(b.attributes.date, 'DD/MM/YYYY').diff(
        moment(a.attributes.date, 'DD/MM/YYYY')
      )
    )
    return {
      posts: imports
    }
  },
  head() {
    return {
      title: 'Posts tagged ' + this.$route.params.slug,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `All posts tagged ${this.$route.params.slug} on derkinzi.de`
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `https://derkinzi.de/tag/${this.$route.params.slug}`
        }
      ]
    }
  }
}
</script>
