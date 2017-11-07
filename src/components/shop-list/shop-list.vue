<template>
  <div class="">
    <div class="hello">
      这是分类页
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import Scroll from 'base/scroll/scroll'
export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  created() {

  },
  methods: {
  },
  components: {

  },
  watch: {
    data(newData) {
      // this.data = newData
      // console.log(this.data)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

</style>
