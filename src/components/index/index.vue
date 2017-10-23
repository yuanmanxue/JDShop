<template>
<div class="footer-nav-wrap">
  <SearchBar></SearchBar>
  <div class="hello">
    这是首页
  </div>

</div>
</template>

<script type="text/ecmascript-6">
import SearchBar from 'components/search-bar/search-bar'
export default {
  components: {
    SearchBar
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

</style>
