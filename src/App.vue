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
  },
  created: function() {
    // this.$router.push('index')
  }
}
</script>

<style>

</style>
