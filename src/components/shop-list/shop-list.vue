<template>
<div class="">
  <Scroll class="shop-list-wrap" :data="data">
    <div class="shop-list">
      <ul>
        <li v-for="(item, index) in food" ref="shopListItem">
          <img :src="item.imgUrl" alt="" class="left">
          <div class="right">
            <p class="name">{{item.skuName}}</p>
            <p class="month-sales"><span>月售{{item.monthSales}}件</span><span v-if="item.highOpinion"> | {{item.highOpinion}}</span></p>
            <div class="icon-text-wrap" v-if="item.tags.length > 0">
              <iconText :tagsText="item.tags[0].iconText" :tagsType="item.tags[0].type"></iconText>
            </div>
            <div class="ball-wrap">
              <cartBall :food="item" @addCount="addCountFn(item)" @decrcount="decrcountFn(item)"></cartBall>
            </div>
            <p><span class="real-price">￥{{item.realTimePrice}}</span><span v-if="item.basicPrice" class="old-price">￥{{item.basicPrice}}</span></p>
          </div>
        </li>
      </ul>
    </div>
  </Scroll>
  <div class="shop-cart-wrap">
    <shopCart :food="currentFood"></shopCart>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import iconText from 'base/iconText/iconText'
import cartBall from 'base/cart-ball/cart-ball'
import shopCart from 'base/shop-cart/shop-cart'
import {createFood} from 'common/js/food.js'
import {mapMutations, mapActions} from 'vuex'
export default {
  data() {
    return {
      food: [],
      currentFood: []
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    addCountFn(item) {
      this.currentFood.push(item)
    },
    decrcountFn(item) {
      // this.currentFood.splice(item, 1)
    },
    _normalizeFood(list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createFood(item))
      })
      return ret
    },
    ...mapMutations({
      setShopList: 'SET_SHOPLIST'
    }),
    ...mapActions([
      'changeCount'
    ])
  },
  components: {
    Scroll,
    iconText,
    cartBall,
    shopCart
  },
  watch: {
    data(newData) {
      this.data = newData
      this.food = this._normalizeFood(this.data)
      // this.setShopList(this.food)
      // this.changeCount(this.food, 0)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .shop-list-wrap{
    position: fixed;
    left: 85px;
    right:0;
    top:150px;
    bottom:50px;
    overflow: hidden;
  }
  .shop-list{
    li{
      margin:0 .26666667rem;
      display: flex;
      padding:.26666667rem 0;
      border-bottom:1px solid #eee;
    }
    .left{
      width:1.73333333rem;
      height:1.73333333rem;
      padding:0 .26666667rem;
    }
    .right{
      flex:auto;
      font-size:$font-size-small;
      padding-top:.13333333rem;
      position: relative;
      p{
        padding:.10333333rem 0;
      }
      .name{
        font-size:$font-size-title;
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
  .shop-cart-wrap{
    position: fixed;
    height: 49px;
    left:0;
    right:0;
    bottom:0;
    z-index:110;
    border-top: 1px solid #d9d9d9;
    background-color: #fff;
  }
</style>
