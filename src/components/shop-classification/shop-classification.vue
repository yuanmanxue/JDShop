<template>
  <div>
    <menuScroll :data="data" @selectMenuParent="selectMenuParent" @selectMenuChild="selectMenuChild"></menuScroll>
    <div class="shop-list" v-if="!childShow">
        <!-- <div class="banner">
          <img :src="item.imgUrl" alt="" v-for="item in banner">
        </div> -->
        <ShopList :data="shopLists"></ShopList>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import menuScroll from 'base/menu-scroll/menu-scroll'
import ShopList from 'components/shop-list/shop-list'
import Scroll from 'base/scroll/scroll'
import {getShopDetail} from 'api/shop-detail.js'
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config.js'
export default {
  data() {
    return {
      childShow: 0,
      iNum: 0,
      jNum: 0,
      catId: '',
      promotLabel: '',
      shopLists: null
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    banner: {
      type: Array,
      default: null
    }
  },
  created() {
    if (!this.shop.params) {
      this.$router.push({path: '/index'})
      return false
    }
    this.probeType = 3
    this.listenScroll = true
  },
  computed: {
    ...mapGetters([
      'shop'
    ])
  },
  methods: {
    _getShopDetail(storeId, promotLable, catId) {
      getShopDetail(storeId, promotLable, catId).then((res) => {
        if (res.code === ERR_OK) {
          this.shopLists = res.result.searchResultVOList
        }
      })
    },
    selectMenuParent(i) {
      this.iNum = i
      if (this.data[this.iNum].childCategoryList.length === 0) {
        this.catId = this.data[this.iNum].catId
        this.promotLabel = this.data[this.iNum].promotLabel
      } else {
        this.catId = this.data[this.iNum].childCategoryList[0].catId
        this.promotLabel = this.data[this.iNum].childCategoryList[0].promotLabel
      }
      this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId)
    },
    selectMenuChild(j) {
      this.jNum = j
      this.catId = this.data[this.iNum].childCategoryList[this.jNum].catId
      this.promotLabel = this.data[this.iNum].childCategoryList[this.jNum].promotLabel
      this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId)
    }
  },
  components: {
    Scroll,
    ShopList,
    menuScroll
  },
  watch: {
    data(newData) {
      this.catId = this.data[this.iNum].catId
      this.promotLabel = this.data[this.iNum].childCategoryList[this.jNum].promotLabel
      this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .shop-list{
    position: fixed;
    bottom:50px;
    top:150px;
    left:84px;
    right:0;
    z-index:100;
    overflow: hidden;
    background-color: #fff;
  }
  .banner {
    padding:10px;
    img {
      width: 100%;
      margin-bottom:5px;
    }
  }
</style>
