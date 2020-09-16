<template lang="pug">
  #posts
    h1 /blog posts
    .border-t.border-gray-400.mt-2
    ul.list-none
      li.mt-10.border-b.border-gray-400.pb-10(class="md:mt-20 md:pb-20 last:border-b-0" v-for="post in posts" :key="post.title")
        PostShort(:post="post")
</template>
<script>
import moment from 'moment'
import PostShort from '~/components/postshort'

export default {
  components: {
    PostShort
  },
  async asyncData({ $content }) {
    const posts = await $content('posts').fetch()
    // sort by date
    posts.sort((a, b) =>
      moment(b.date, 'DD/MM/YYYY').diff(moment(a.date, 'DD/MM/YYYY'))
    )
    return {
      posts
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
