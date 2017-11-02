<template>
  <div class="header-wrap">
    <div class="header">
      <div class="header-info">
        <img :src="shop.imgUrl" alt="">
        <div class="info">
          <p>{{shop.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    console.log(this.shop)
  },
  computed: {
    ...mapGetters([
      'shop'
    ])
  },
  methods: {
  },
  components: {

  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .header-wrap{
    height: 110px;
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    width: 100%;
    background:url(./header-bg.jpg) no-repeat;
    background-size: cover;
    z-index:99;
  }
</style>
