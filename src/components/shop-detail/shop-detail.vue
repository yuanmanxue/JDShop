<!--
@Author: yuanmanxue
@Date:   2017-11-02 11:14:58
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-22 01:20:03
-->

<template>
<transition name="slide">
  <div class="shop-detail-wrap">
    <shopHeader :data="shopInfo" v-if="shopInfo"></shopHeader>
    <div class="search">
      <SearchBox></SearchBox>
    </div>
    <div class="shopClassification">
      <ShopClassification :data="cateList" ref="menuScroll" :banner="banner"></ShopClassification>
    </div>
  </div>
  <router-view></router-view>
</transition>
</template>

<script type="text/ecmascript-6">
import ShopClassification from 'components/shop-classification/shop-classification'
import SearchBox from 'base/search-box/search-box'
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
import {storeDetail} from 'api/shop-detail.js'
import ShopHeader from 'base/shop-detail-header/shop-detail-header'
import {ERR_OK} from 'api/config.js'
export default {
  data() {
    return {
      shopInfo: {},
      cateList: [],
      menuShow: false,
      banner: []
    }
  },
  props: {
    data: {
      type: [],
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'shop',
      'address'
    ])
  },
  methods: {
    _storeDetail(id, address) {
      storeDetail(id, address).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res);
          this.shopInfo = res.result
          this.cateList = res.result.cateList
          this.banner = res.result.storeActPageList
        }
      })
    }
  },
  created() {
    if (!this.shop.params) {
      this.$router.push({path: '/index'})
      return false
    }
    this._storeDetail(this.shop.params.storeId, this.address)
  },
  components: {
    Scroll,
    ShopHeader,
    SearchBox,
    ShopClassification
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .slide-enter-active, .slide-leave-active{
    transition: all .3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
  .shop-detail-wrap{
    position: fixed;
    width: 100%;
    top: 0;
    bottom:0;
    z-index:200;
    background-color: #ffffff;
    .search{
      margin-top:110px;
    }
  }

</style>
