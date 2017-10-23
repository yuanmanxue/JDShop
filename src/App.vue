<template>
  <div id="app">
    <router-view/>
    <FooterNav></FooterNav>
  </div>
</template>

<script>
import FooterNav from 'base/footer-nav/footer-nav.vue'
export default {
  components: {
    FooterNav
  }
}
</script>

<style>

</style>
