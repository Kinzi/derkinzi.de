<template lang="pug">
  #post
    img.rounded.shadow.my-4.w-full.h-128.object-cover(:src="'~/assets' + post.attributes.feature" :srcset="require('~/assets' + post.attributes.feature).srcSet" sizes="(min-width: 768px) 60vw, 95vw" v-if="post.attributes.feature")
    .post-title.mt-2
      h1 {{post.attributes.title}}
    .post-meta.flex.text-gray-500.justify-between.my-4.flex-col(class="md:flex-row" v-if="!post.attributes.type")
      .date {{post.attributes.date}}
      .tags
        span.mr-2(v-for="tag in post.attributes.tags")
          nuxt-link(:to="'/tag/'+tag") \#{{tag}}
    .content(v-html="post.html")
    vue-disqus(shortname="derkinzi" :identifier="post.attributes.slug" :url="$route.fullPath" v-if="!post.attributes.type")
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
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://derkinzi.de' + this.post.attributes.slug
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
  @apply .bg-gray-300 .px-1 .font-mono .rounded .border .border-gray-400;
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
  @apply .font-mono !important .border-none;
}

.content >>> code[class*='language-'] {
  @apply .p-0;
}

.content >>> blockquote {
  @apply .border-l-4 .border-gray-400 .pl-4 .italic .ml-4 .my-8;
}

.content >>> h3 {
  @apply .text-xl .font-mono .text-gray-800 .mb-4;
}

.content >>> .crop-post-image {
  object-fit: cover;
  width: 126%;
  height: 100%;
  max-height: 350px;
}
</style>
