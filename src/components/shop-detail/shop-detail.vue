<template>
<transition name="slide">
  <div class="shop-detail-wrap">
    <shopHeader></shopHeader>
    <scroll :data="cateList" class="menu-scroll" ref="menuScroll">
        <div class="shop-detail">
          <div class="menu-wrap">
            <ul class="menu" v-for="item in cateList" @click="toggleMenuChild()">
              <li>
                <p>{{item.title}}</p>
                <ul v-for="child in item.childCategoryList" v-show="menuShow">
                  <li>{{child.title}}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
    </scroll>
  </div>
  <router-view></router-view>
</transition>
</template>

<script type="text/ecmascript-6">
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
    _getShopDetail(id) {
      getShopDetail(id).then((res) => {
        if (res.code === ERR_OK) {
        }
      })
    },
    _storeDetail(id) {
      storeDetail(id).then((res) => {
        if (res.code === ERR_OK) {
          this.cateList = res.result.cateList
        }
      })
    },
    toggleMenuChild(e) {
      let event = e || window.event
      console.log(event.target)
    }
  },
  created() {
    this._getShopDetail(this.shop.params.storeId)
    this._storeDetail(this.shop.params.storeId)
  },
  components: {
    Scroll,
    ShopHeader
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
    .menu-scroll{
      width: 84px;
      position: fixed;
      bottom:50px;
      top:150px;
    }
    // 左侧的菜单
    .shop-detail{
      background-color: #ffffff;
      .menu-wrap{
        background-color: #f4f4f4;
      }
      .menu{
          color:$color-text-theme;
          font-size:$font-size-small;
         p{
          padding:15px 0;
          text-align:center;
          border:1px solid #ddd;
        }
         ul li{
           font-size:$font-size-small-s;
           border-right:1px solid #ddd;
           border-left:1px solid #ddd;
           padding:15px 5px;
          //  border-left:2px solid $color-background-green;
        }
      }
    }
  }

</style>
