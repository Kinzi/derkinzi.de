<template lang="pug">
.site
  Header.w-full(class="lg:w-1/5 lg:fixed")
  #content.bg-gray-200.w-full(class="lg:w-4/5")
    .flex.relative.bg-gray-500.px-4.text-center.py-20.bg-local(class="md:px-12 lg:px-20")
      img.absolute.mx-auto.inset-0.object-cover.w-full.z-0.h-full(src="~/assets/images/2016/05/derkinzi-back.jpg" :srcset="require('~/assets/images/2016/05/derkinzi-back.jpg').srcSet" sizes="(min-width: 769px) 75vw, 100vw")
      .z-40.text-center
        img.shadow-lg.rounded-full.border-2.border-teal-500.w-16.mx-auto(class="lg:w-32" src="~/assets/images/derkinzi.jpg" sizes="10vw" :srcset="require('~/assets/images/derkinzi.jpg').srcSet")
        .bg-white50.rounded.shadow.p-4.mt-4
          .text-2xl Hi there!
          .mt-2 My name is Sebastian. I usually venture on the internetz as @derkinzi. I'm a marketer turned developer and founder. Here I share thoughts on building: webprojects, tech hacks, and remote companies.
    nuxt.py-4(class="md:py-12 md:px-12 lg:px-20")
</template>

<script>
import Header from '~/components/header'
export default {
  components: {
    Header
  }
}
</script>

<style>
#header {
  z-index: 50;
  overflow: hidden;
  top: 0;
  left: 0;
  float: left;
  clear: both;
  display: block;
}

#content {
  float: left;
  clear: both;
  margin-top: 4rem;
}

@media (min-width: 1024px) {
  #content {
    margin-left: 20%;
    margin-top: 0;
  }
  #header {
    height: 100%;
    bottom: 0;
    padding: 0;
  }
}
</style>
