<!--
@Author: yuanmanxue
@Date:   2017-11-03 05:11:42
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-19 04:33:22
-->

<template>
<div>
  <!-- 正在加载 -->
  <div class="load-wrap"><load v-show="!currentShopList.length"></load></div>
  <!-- 标签数量 -->
  <div class="shop-title" v-show="totalCount">{{currentTagTitle}} ({{totalCount}})</div>
  <!-- 商品列表 -->
  <Scroll class="shop-list-wrap" :data="currentShopList" ref="scrollShopList" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
    <div class="shop-list" ref="shopList">
      <ul>
        <li v-for="(item, index) in currentShopList" ref="shopListItem">
          <img v-lazy="item.imgUrl" v-if="item.imgUrl" class="left">
          <div class="right">
            <p class="name">{{item.skuName}}</p>
            <p class="month-sales"><span>月售{{item.monthSales}}件</span><span v-if="item.highOpinion"> | {{item.highOpinion}}</span></p>
            <div class="icon-text-wrap">
              <div v-if="item.tags.length > 0">
                <iconText :tagsText="item.tags[0].iconText" :tagsType="item.tags[0].type"></iconText>
              </div>
            </div>
            <div class="ball-wrap">
              <cartBall
               :food="item"
               @addCount="addCount(item)"
               @decrCount="decrCount(item)"
               ></cartBall>
            </div>
            <p><span class="real-price">￥{{item.realTimePrice}}</span><span v-if="item.basicPrice" class="old-price">￥{{item.basicPrice}}</span></p>
          </div>
        </li>
      </ul>
      <div class="no-more" v-show="noMore && currentShopList.length > 0">—— 去看看其他分类吧 ——</div>
    </div>
  </Scroll>
</div>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import load from 'base/load/load'
import iconText from 'base/iconText/iconText'
import cartBall from 'base/cart-ball/cart-ball'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  data() {
    return {
      food: [],
      currentFood: []
    }
  },
  props: {
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'currentTagTitle',
      'totalCount',
      'currentShopList'
    ]),
    noMore() {
      console.log(this.currentShopList.length)
        if (this.currentShopList.length === this.totalCount || this.currentShopList.length < 10) {
          return true
        } else {
          return false
        }
      }
  },
  methods: {
    scrollToTop() {
      this.$refs.scrollShopList.scrollTo(0, 0)
    },
    addCount(food) {
      let obj = Object.assign({}, food)
      this.addCountFn(obj)
      this.addCartListFn(obj.storeId)
    },
    decrCount(food) {
      let obj = Object.assign({}, food)
      this.decrCountFn(obj)
      this.addCartListFn(obj.storeId)
    },
    // 监听scroll是否滚动
    scroll(pos) {
      let h1 = this.$refs.shopList.clientHeight
      this.$emit('scroll', pos, h1)
    },
    ...mapMutations({
      setShopList: 'SET_SHOPLIST'
    }),
    ...mapActions([
      'addCountFn',
      'decrCountFn',
      'addCartListFn'
    ])
  },
  components: {
    Scroll,
    iconText,
    cartBall,
    load
  },
  watch: {
    shopList(newData) {
      this.food = newData
      // this.scrollToTop()
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .load-wrap{
    margin-top: 30px;
    height: 30px;
    line-height: 30px;
  }
  .shop-list-wrap{
    position: fixed;
    left: 85px;
    right:0;
    top:180px;
    bottom:50px;
    z-index:100;
    overflow: hidden;
  }
  .shop-title{
    position: absolute;
    left:0;
    right:0;
    top:0px;
    height: 30px;
    line-height: 30px;
    font-size:$font-size-small-s;
    text-indent:10px;
    background-color:#f4f4f4;
    border-top: 1px solid #ddd;
    color:$color-text-nav;
    z-index:110;
  }
  .shop-list{
    li{
      margin:0 .26666667rem;
      display: flex;
      padding:.26666667rem 0;
      border-bottom:1px solid #eee;
    }
    .left{
      width:1.43333333rem;
      height:1.43333333rem;
      margin-right: .26666667rem;
      margin-top: .26666667rem;
    }
    .right{
      width: 5.6rem;
      font-size:$font-size-small;
      padding-top:.13333333rem;
      position: relative;
      p{
        padding:.10333333rem 0;
      }
      .name{
        font-size:$font-size-small;
        line-height: .6rem;
      }
      .month-sales{
        font-size:$font-size-small-s;
        color:$color-text-gray;
      }
      .icon-text-wrap{
        height:20px;
        padding:.2rem 0;
      }
      .ball-wrap{
        bottom:.1rem;
        right:0;
        position: absolute;
      }
      .real-price{
        color:$color-text-red;
        font-size:$font-size-title;
        font-weight:bold;
      }
      .old-price{
        text-decoration:line-through;
        color:$color-text-gray;
      }
    }
  }
  .no-more{
    height: 30px;
    line-height: 30px;
    font-size:$font-size-small-s;
    color:#999;
    text-align: center;
  }
</style>
