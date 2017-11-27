<template>
  <div>
    <div class="menu-scroll-wrap">
      <menuScroll :data="data" @selectMenuParent="selectMenuParent" @selectMenuChild="selectMenuChild"></menuScroll>
    </div>
    <div class="shop-list" v-if="!childShow" ref="shopListWrap">
        <!-- <div class="banner">
          <img :src="item.imgUrl" alt="" v-for="item in banner">
        </div> -->
        <keep-alive>
          <ShopList
          ref="shopList" :currentList="currentShopList"
          :titleShow="true" @scroll="scrollFn"></ShopList>
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
const CURRENT_TAG_HEIGHT = 30
const GET_MORE_FLAG_NUM = 350
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
      shopLists: null,
      page: 1,
      getMoreFlag: false
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
    // 刷新跳回index页面
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
    // 获取商铺详情信息
    _getShopDetail(storeId, promotLable, catId, page) {
      getShopDetail(storeId, promotLable, catId, page).then((res) => {
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
          if (this.page > 1) {
            let arr = []
            let foodFB = food.concat(this.currentShopList)
            foodFB.forEach((item) => {
              if (item.promotLabel === this.promotLabel && item.catId === this.catId && item.storeId === this.shop.params.storeId) {
                arr.push(item)
                food = arr
              }
            })
          }
          this.setCurrentShopListFn(food)
          this.addCartListFn(this.shop.params.storeId)
        }
      }).then(() => {
          // vuex存储 当前先是列表的tagTitle和totalCount
        this.setCurrentTagTitle(this.tagTitle)
        this.setTotalCount(this.totalCount)
      })
    },
    // 规范化商铺每个商品的信息，每个商品添加catId,tagTitlehe totalCount
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
      'setCurrentShopListFn',
      'addCartListFn'
    ]),
    selectMenuParent(i) {
      this.iNum = i
      this.page = 1
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
        this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId, this.page)
      }
      this.$refs.shopList.scrollToTop()
    },
    selectMenuChild(j) {
      this.jNum = j
      this.page = 1
      this.catId = this.data[this.iNum].childCategoryList[this.jNum].catId
      this.promotLabel = this.data[this.iNum].childCategoryList[this.jNum].promotLabel
      this.tagTitle = this.data[this.iNum].childCategoryList[this.jNum].title
      let flag = this.judgeToLoad()
      if (!flag) {
        this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId, this.page)
      }
      console.log(this.catId)
      this.$refs.shopList.scrollToTop()
    },
    scrollFn(pos, h1) {
      let h = -h1 + this.$refs.shopListWrap.clientHeight - CURRENT_TAG_HEIGHT
      if (pos.y - GET_MORE_FLAG_NUM < h) {
        this.getMoreFlag = true
      } else {
        this.getMoreFlag = false
      }
    },
    // 滚动加载
    getMoreData() {
      if (this.getMoreFlag) {
        this.page += 1
        console.log(this.page)
        this._getShopDetail(this.shop.params.storeId, this.promotLabel, this.catId, this.page)
      }
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
      this.setTotalCount(this.currentShopList[0].totalCount)
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
    },
    getMoreFlag() {
      this.getMoreData()
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
