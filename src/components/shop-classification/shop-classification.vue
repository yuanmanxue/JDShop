<template>
  <div>
    <div class="menu-scroll-wrap">
      <menuScroll :data="data" @selectMenuParent="selectMenuParent" @selectMenuChild="selectMenuChild"></menuScroll>
    </div>
    <div class="shop-list" v-if="!childShow">
        <!-- <div class="banner">
          <img :src="item.imgUrl" alt="" v-for="item in banner">
        </div> -->
        <ShopList></ShopList>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import menuScroll from 'base/menu-scroll/menu-scroll'
import ShopList from 'components/shop-list/shop-list'
import Scroll from 'base/scroll/scroll'
import {createFood} from 'common/js/food.js'
import {getShopDetail} from 'api/shop-detail.js'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {ERR_OK} from 'api/config.js'
export default {
  data() {
    return {
      childShow: 0,
      iNum: 0,
      jNum: 0,
      catId: '',
      promotLabel: '',
      tagTitle: '',
      totalCount: '',
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
      'shop',
      'shopList'
    ])
  },
  methods: {
    _getShopDetail(storeId, promotLable, catId) {
      getShopDetail(storeId, promotLable, catId).then((res) => {
        if (res.code === ERR_OK) {
          let food = []
          this.shopLists = res.result.searchResultVOList
          this.totalCount = res.result.count
          // new  food这个类
          food = this._normalizeFood(this.shopLists, this.promotLabel)
          // vuex存储
          this.connectShopList(food)
        }
      }).then(() => {
        if (!this.tagTitle) {
          this.tagTitle = this.data[0].childCategoryList[0].title
        }
        this.setCurrentTagTitle(this.tagTitle)
        this.setTotalCount(this.totalCount)
      })
    },
    _normalizeFood(list, promotLabel) {
      let ret = []
      list.forEach((item) => {
        ret.push(createFood(item, promotLabel))
      })
      return ret
    },
    ...mapMutations({
      setShopList: 'SET_SHOPLIST',
      setCurrentTagTitle: 'SET_CURRENT_TAGTITLE',
      setTotalCount: 'SET_TOTAL_COUNT'
    }),
    ...mapActions([
      'connectShopList'
    ]),
    selectMenuParent(i) {
      this.iNum = i
      if (this.data[this.iNum].childCategoryList.length === 0) {
        this.catId = this.data[this.iNum].catId
        this.promotLabel = this.data[this.iNum].promotLabel
        this.tagTitle = this.data[this.iNum].title
      } else {
        this.catId = this.data[this.iNum].childCategoryList[0].catId
        this.promotLabel = this.data[this.iNum].childCategoryList[0].promotLabel
        this.tagTitle = this.data[this.iNum].childCategoryList[0].title
      }
      this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId)
    },
    selectMenuChild(j) {
      this.jNum = j
      this.catId = this.data[this.iNum].childCategoryList[this.jNum].catId
      this.promotLabel = this.data[this.iNum].childCategoryList[this.jNum].promotLabel
      this.tagTitle = this.data[this.iNum].childCategoryList[this.jNum].title
      this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId)
    },
    judgeShopList() {
      let ret = []
      this.shopList.forEach((item) => {
        if (item.promotLabel === this.promotLabel && item.catId === this.catId && item.storeId === this.shop.params.storeId) {
          ret.push(item)
        }
      })
      return ret
    }
  },
  components: {
    Scroll,
    ShopList,
    menuScroll
  },
  watch: {
    data(newData) {
      if (this.data[this.iNum].childCategoryList.length === 0) {
        this.catId = this.data[this.iNum].catId
        this.promotLabel = this.data[this.iNum].promotLabel
        this.tagTitle = this.data[this.iNum].title
      } else {
        this.catId = this.data[this.iNum].catId
        this.promotLabel = this.data[this.iNum].childCategoryList[this.jNum].promotLabel
        this.tagTitle = this.data[this.iNum].childCategoryList[this.jNum].title
      }
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
  .menu-scroll-wrap{
    width:84px;
    position: fixed;
    bottom:50px;
    top:150px;
    overflow: hidden;
    z-index:100;
    background-color: #f4f4f4;
  }
  .banner {
    padding:10px;
    img {
      width: 100%;
      margin-bottom:5px;
    }
  }
</style>
