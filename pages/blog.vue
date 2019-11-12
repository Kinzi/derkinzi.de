<template lang="pug">
  #posts
    h1 /blog posts
    .border-t.border-gray-400.mt-2
    ul.list-none
      li.mt-10.border-b.border-gray-400.pb-10(class="md:mt-20 md:pb-20" v-for="post in posts" :key="post.attributes.title")
        PostShort(:post="post")
</template>
<script>
import moment from 'moment'
import PostShort from '~/components/postshort'

export default {
  components: {
    PostShort
  },
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
  },
  head() {
    return {
      title: 'Blog posts',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'All blog posts on derkinzi.de'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://derkinzi.de/blog'
        }
      ]
    }
  }
}
</script>
