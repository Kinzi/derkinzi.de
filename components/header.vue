<template lang="pug">
header#header.fixed
  .h-full.bg-center.shadow-inner.bg-gray-800.flex.justify-between.px-4.items-center.h-16(class="lg:flex-col lg:justify-around lg:px-0")
    .p-2
      a.flex.content-center.items-center(class="lg:flex-col" href="/")
        img.shadow-lg.rounded-full.border-2.border-teal-500.w-12(class="lg:w-32 lg:mx-auto" src="~/assets/images/derkinzi.jpg" :srcset="require('~/assets/images/derkinzi.jpg').srcSet")
        .font-mono.text-orange-500.ml-2(class="lg:text-2xl lg:text-center lg:mt-4 lg:inline-block lg:ml-0") [derkinzi]

    button.block.text-teal-500(@click='isOpen = !isOpen' type='button' class='lg:hidden hover:text-white focus:text-white focus:outline-none')
      svg.h-6.w-6.fill-current(viewbox='0 0 24 24')
        path(v-if='isOpen' fill-rule='evenodd' d='M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z')
        path(v-if='!isOpen' fill-rule='evenodd' d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z')

    ul.text-center.px-10.text-teal-500.font-mono.w-full.hidden(class="lg:inline-block")
      li.border-gray-500.p-2(v-for="item in menu" :key="item.name")
        a(:href="item.slug") {{item.name}}

    .social-links.flex.mt-8.px-8.justify-center.hidden(class="lg:flex")
      a.h-8.w-8.rounded-full.p-2.border.border-teal-500.m-1(href='https://instagram.com/derkinzi' target='_blank')
        img(src="/images/instagram.svg")
      a.h-8.w-8.rounded-full.p-2.border.border-teal-500.m-1(href='https://twitter.com/derkinzi' target='_blank')
        img(src="/images/twitter.svg")
      a.h-8.w-8.rounded-full.p-2.border.border-teal-500.m-1(href='https://github.com/kinzi' target='_blank')
        img(src="/images/github.svg")
      a.h-8.w-8.rounded-full.p-2.border.border-teal-500.m-1(href='https://www.linkedin.com/in/sebastian-kinzlinger-23b86a2b/?originalSubdomain=de' target='_blank')
        img(src="/images/linkedin.svg")

  .mobile-menu.bg-gray-700.z-50.py-4(:class="{'hidden': !isOpen}")
    ul.text-center.px-10.text-teal-500.font-mono.w-full.mb-0(class="lg:inline-block" :class="{'hidden': !isOpen}")
      li.border-gray-500.p-2(v-for="item in menu" :key="item.name")
        a(:href="item.slug") {{item.name}}

    .social-links.flex.mt-4.px-8.justify-center(class="lg:flex")
      a.h-8.w-8.rounded-full.p-2.border.border-teal-500.m-1(href='https://instagram.com/derkinzi' target='_blank')
        img(src="/images/instagram.svg")
      a.h-8.w-8.rounded-full.p-2.border.border-teal-500.m-1(href='https://twitter.com/derkinzi' target='_blank')
        img(src="/images/twitter.svg")
      a.h-8.w-8.rounded-full.p-2.border.border-teal-500.m-1(href='https://github.com/kinzi' target='_blank')
        img(src="/images/github.svg")
      a.h-8.w-8.rounded-full.p-2.border.border-teal-500.m-1(href='https://www.linkedin.com/in/sebastian-kinzlinger-23b86a2b/?originalSubdomain=de' target='_blank')
        img(src="/images/linkedin.svg")


</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    menu() {
      return this.$store.state.menu
    }
  }
}
</script>
