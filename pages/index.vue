<template lang="pug">
#home
  #blogroll
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
  layout: 'intro',
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
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
  }
}
</script>

<style></style>
