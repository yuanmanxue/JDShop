<template>
  <div>
    <div class="menu-scroll-wrap">
      <menuScroll :data="data" @selectMenuParent="selectMenuParent" @selectMenuChild="selectMenuChild"></menuScroll>
    </div>
    <div class="shop-list" v-if="!childShow">
        <!-- <div class="banner">
          <img :src="item.imgUrl" alt="" v-for="item in banner">
        </div> -->
        <keep-alive>
          <ShopList ref="shopList"></ShopList>
        </keep-alive>
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
      'shopList',
      'currentShopList'
    ])
  },
  methods: {
    _getShopDetail(storeId, promotLable, catId) {
      getShopDetail(storeId, promotLable, catId).then((res) => {
        if (res.code === ERR_OK) {
          let food = []
          this.shopLists = res.result.searchResultVOList
          this.totalCount = res.result.count
          if (!this.tagTitle) {
            this.tagTitle = this.data[0].childCategoryList[0].title
          }
          // new  food这个类
          food = this._normalizeFood(this.shopLists, this.promotLabel, this.tagTitle, this.totalCount, this.catId)
          // vuex存储shopList
          if (this.shopList.length === 0) {
            this.setShopList(food)
          } else {
            this.connectShopList(food)
          }
          // vuex存储currentShopList
          this.setCurrentShopListFn(food)
        }
      }).then(() => {
        this.setCurrentTagTitle(this.tagTitle)
        this.setTotalCount(this.totalCount)
      })
    },
    _normalizeFood(list, promotLabel, tagTitle, totalCount, catId) {
      let ret = []
      list.forEach((item) => {
        ret.push(createFood(item, promotLabel, tagTitle, totalCount, catId))
      })
      return ret
    },
    ...mapMutations({
      setShopList: 'SET_SHOPLIST',
      setCurrentTagTitle: 'SET_CURRENT_TAGTITLE',
      setTotalCount: 'SET_TOTAL_COUNT'
    }),
    ...mapActions([
      'connectShopList',
      'setCurrentShopListFn'
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
      console.log(this.catId)
      let flag = this.judgeToLoad()
      if (!flag) {
        this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId)
      }
      // this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId)
      this.$refs.shopList.scrollToTop()
    },
    selectMenuChild(j) {
      this.jNum = j
      this.catId = this.data[this.iNum].childCategoryList[this.jNum].catId
      this.promotLabel = this.data[this.iNum].childCategoryList[this.jNum].promotLabel
      this.tagTitle = this.data[this.iNum].childCategoryList[this.jNum].title
      let flag = this.judgeToLoad()
      if (!flag) {
        this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId)
      }
      console.log(this.catId)
      // this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId)
      this.$refs.shopList.scrollToTop()
    },
    // 在vuex里面通过对shopList里面的数据遍历判断是否存在 promotLabel&&catId 相同字段的数据，存在返回true，不存在返回false
    judgeToLoad() {
      let arr = []
      let ret = false
      this.shopList.forEach((item) => {
        if (item.promotLabel === this.promotLabel && item.catId === this.catId && item.storeId === this.shop.params.storeId) {
          arr.push(item)
          ret = true
        }
      })
      if (ret) {
        this.setCurrentShopListFn(arr)
      }
      // 重新设置setCurrentTagTitle和setTotalCount
      this.changeTotalNum()
      return ret
    },
    changeTotalNum() {
      this.setCurrentTagTitle(this.tagTitle)
      this.setTotalCount(this.totalCount)
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
