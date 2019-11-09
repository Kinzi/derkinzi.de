<template lang="pug">
  #posts
    h1 ~/projects
    .flex.flex-wrap.mt-10
      a.relative.text-center.p-2.w-full(class="md:w-1/2" :href="post.attributes.url" v-for="post in posts" :key="post.attributes.title" target="_blank")
        .absolute.inset-0.flex.items-center.justify-center.m-auto.w-full(class="hover:bg-white50")
          h2.font-sans.mb-0 {{post.attributes.title}}
        img.lazyload.w-full.rounded(:data-src="post.attributes.image" v-if="post.attributes.image")


</template>
<script>
export default {
  async asyncData() {
    const resolve = await require.context('~/content/projects/', true, /\.md$/)
    const imports = resolve.keys().map((key) => resolve(key))
    imports.sort((a, b) => a.attributes.sort - b.attributes.sort)
    return {
      posts: imports
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
