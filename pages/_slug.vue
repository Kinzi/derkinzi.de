<template lang="pug">
  #post
    .post-title
      h1 {{post.attributes.title}}
    .post-meta.flex.text-gray-500.justify-between.my-4(v-if="!post.attributes.type")
      .date {{post.attributes.date}}
      .tags
        span.mr-2(v-for="tag in post.attributes.tags") \#{{tag}}
    img.my-4.w-full.h-128.object-cover(:src="post.attributes.feature" v-if="post.attributes.feature")
    .content(v-html="post.html")
    vue-disqus(shortname="derkinzi" :identifier="post.attributes.slug" :url="$route.fullPath")
</template>

<script>
import Prism from '~/plugins/prism'

export default {
  async asyncData({ params }) {
    try {
      const post = await import(`~/content/posts/${params.slug}.md`)
      return { post }
    } catch (err) {
      return false
    }
  },
  mounted() {
    Prism.highlightAll()
  },
  head() {
    return {
      title: this.post.attributes.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.attributes.short
        }
      ]
    }
  }
}
</script>

<style scoped>
.content >>> ol {
  @apply .list-decimal .ml-6;
}

.content >>> ul {
  @apply .list-disc .ml-6;
}

.content >>> pre code {
  @apply .bg-transparent;
}

.content >>> code {
  @apply .bg-gray-300 .py-1 .px-2 .font-mono;
}

.content >>> hr {
  @apply .my-8;
}

.content >>> img {
  @apply .rounded .shadow;
}

.content >>> pre {
  @apply .rounded;
}

.content >>> pre[class*='language-'] {
  @apply .mb-4 !important;
}

.content >>> code[class*='language-'],
.content >>> pre[class*='language-'] {
  @apply .font-mono !important;
}

.content >>> blockquote {
  @apply .border-l-4 .border-gray-400 .pl-4 .italic .ml-4 .my-8;
}

.content >>> h3 {
  @apply .text-xl .font-mono .text-gray-800 .mb-4;
}
</style>
