<template lang="pug">
  #posts
    h1 ~/projects
    .flex.flex-wrap.mt-10
      a.relative.text-center.p-2.w-full(class="md:w-1/2" :href="post.url" v-for="post in posts" :key="post.title" target="_blank")
        .absolute.inset-0.flex.items-center.justify-center.m-auto.w-full(class="hover:bg-white50")
          h2.font-sans.mb-0 {{post.title}}
        img.lazyload.w-full.rounded(:src="post.image" v-if="post.image")


</template>
<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content('projects').fetch()
    posts.sort((a, b) => a.sort - b.sort)
    return {
      posts
    }
  },
  head() {
    return {
      title: 'Projects',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "All the projects I'm working on at the moment. On some of them more actively then on others. :)"
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://derkinzi.de/projects'
        }
      ]
    }
  }
}
</script>
