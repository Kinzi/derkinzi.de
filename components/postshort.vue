<template lang="pug">
.post
  nuxt-link(:to="`/${post.slug}`")
    img.lazyload.mt-4.rounded.w-full.h-64.object-cover.shadow-lg(:src="post.feature" v-if="post.feature" loading="lazy")
    h2.mx-4(class="md:mx-10 xl:mx-20") {{post.title}}
    .text-gray-400.mx-4.text-sm.-mt-2(class="md:mx-10 xl:mx-20") {{post.date}}
    .mx-4.mt-8.text-gray-700(class="md:mx-10 xl:mx-20") {{post.short}}
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
