<template lang="pug">
.site
  Header.w-full(class="lg:w-1/5 lg:fixed")
  #content.bg-gray-200.w-full.px-4(class="lg:w-4/5 md:px-12 lg:px-20")
    nuxt.py-4(class="md:py-12")
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
  overflow: auto;
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

@media (min-width: 769px) and (min-height: 767px) {
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
