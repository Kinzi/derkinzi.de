<template lang="pug">
  #post
    img.rounded.shadow.my-4.w-full.h-128.object-cover(:src="'~/assets/images' + post.feature" :srcset="require('~/assets/images' + post.feature).srcSet" sizes="(min-width: 768px) 60vw, 95vw" v-if="post.feature")
    .post-title.mt-2
      h1 {{post.title}}
    .post-meta.flex.text-gray-500.justify-between.my-4.flex-col(class="md:flex-row" v-if="!post.type")
      .date {{post.date}}
      .tags
        span.mr-2(v-for="tag in post.tags")
          nuxt-link(:to="'/tag/'+tag") \#{{tag}}
    //- .content(v-html="post.body")
    nuxt-content.content(:document="post")
    .border-t.border-gray-500.mt-8.mb-4
    vue-disqus(shortname="derkinzi" :identifier="post.slug" :title="post.title" :url="'https://derkinzi.de' +  post.slug" v-if="!post.type")
</template>

<script>
import Prism from '~/plugins/prism'

export default {
  async asyncData({ $content, params, store, error }) {
    try {
      const post = await $content(`posts/${params.slug}`).fetch()
      return { post }
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }

    // try {
    //   const post = await import(`~/content/posts/${params.slug}.md`)
    //   return { post }
    // } catch (err) {
    //   return false
    // }
  },
  mounted() {
    Prism.highlightAll()
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.short
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://derkinzi.de' + this.post.slug
        }
      ]
    }
  }
}
</script>

<style>
.nuxt-content ol {
  @apply .list-decimal .ml-6;
}

.nuxt-content ul {
  @apply .list-disc .ml-6;
}

.nuxt-content pre code {
  @apply .bg-transparent;
}

.nuxt-content code {
  @apply .bg-gray-300 .px-1 .font-mono .rounded .border .border-gray-400;
}

.nuxt-content hr {
  @apply .my-8;
}

.nuxt-content img {
  @apply .rounded .shadow;
}

.nuxt-content pre {
  @apply .rounded;
}

.nuxt-content pre[class*='language-'] {
  @apply .mb-4 !important;
}

.nuxt-content code[class*='language-'],
.nuxt-content pre[class*='language-'] {
  @apply .font-mono !important .border-none;
  text-shadow: none !important;
}

.nuxt-content code[class*='language-'] {
  @apply .p-0;
}

.nuxt-content blockquote {
  @apply .border-l-4 .border-gray-400 .pl-4 .italic .ml-4 .my-8;
}

.nuxt-content h3 {
  @apply .text-xl .font-mono .text-gray-800 .mb-4;
}

.nuxt-content .crop-post-image {
  object-fit: cover;
  width: 126%;
  height: 100%;
  max-height: 350px;
}
</style>
