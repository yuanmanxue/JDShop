<template>
<transition name="slide">
  <div class="shop-detail-wrap">
    <shopHeader></shopHeader>
    <div class="search">
      <SearchBox></SearchBox>
    </div>
    <div class="menu-scroll">
      <ShopMenu :data="cateList" ref="menuScroll"></ShopMenu>
    </div>
    <div class="shop-list">

    </div>
  </div>
  <router-view></router-view>
</transition>
</template>

<script type="text/ecmascript-6">
import ShopMenu from 'base/shop-menu/shop-menu'
import SearchBox from 'base/search-box/search-box'
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
import {getShopDetail, storeDetail} from 'api/shop-detail.js'
import ShopHeader from 'base/shop-detail-header/shop-detail-header'
import {ERR_OK} from 'api/config.js'
export default {
  data() {
    return {
      cateList: [],
      menuShow: false
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
      'shop'
    ])
  },
  methods: {
    _getShopDetail(id, type) {
      getShopDetail(id, type).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
        }
      })
    },
    _storeDetail(id) {
      storeDetail(id).then((res) => {
        if (res.code === ERR_OK) {
          this.cateList = res.result.cateList
        }
      })
    }
  },
  created() {
    this._getShopDetail(this.shop.params.storeId, 3)
    console.log(this.cateList)
    this._storeDetail(this.shop.params.storeId)
  },
  components: {
    Scroll,
    ShopHeader,
    SearchBox,
    ShopMenu
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
    z-index:100;
    background-color: #ffffff;
    .search{
      margin-top:110px;
    }
    .menu-scroll{
      width: 84px;
      position: fixed;
      bottom:50px;
      top:150px;
      overflow: hidden;
      background-color: #f4f4f4;
    }
    .shop-list{
      position: fixed;
      bottom:50px;
      top:150px;
      right:0;
      left:84px;
      overflow: hidden;
      background-color: #fff;
    }
  }

</style>
