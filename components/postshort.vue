<template lang="pug">
nuxt-link(:to="post.attributes.slug")
  img.lazyload.mt-4.rounded.w-full.h-64.object-cover.shadow-lg(:data-src="'~/assets' + post.attributes.feature" :data-srcset="require('~/assets' + post.attributes.feature).srcSet" sizes="(min-width: 768px) 60vw, 95vw" v-if="post.attributes.feature")
  h2.mx-4(class="md:mx-10 xl:mx-20") {{post.attributes.title}}
  .text-gray-400.mx-4.text-sm.-mt-2(class="md:mx-10 xl:mx-20") {{post.attributes.date}}
  .mx-4.mt-8.text-gray-700(class="md:mx-10 xl:mx-20") {{post.attributes.short}}
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
