<template>
    <div class="shop-cart">
      <div class="left">
        <i class="cart iconfont" :class="{'active': totalCount > 0}">&#xe503;</i>
        <i class="num" :class="{'active': totalCount > 0}">{{totalCount}}</i>
        <span class="txt" :class="{'active': totalCount > 0}">{{totalPrice}}</span>
      </div>
      <div class="right" :class="{'active': totalCount > 0}">去结算</div>
    </div>
</template>

<script type="text/ecmascript-6">
// import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      count: {}
    }
  },
  props: {
    food: {
      type: Array,
      default: null
    }
  },
  computed: {
    // ...mapGetters([
    //   'shopList'
    // ])
    totalCount() {
      let count = 0
      this.food.forEach((item) => {
        count += item.count
      })
      return count
    },
    totalPrice() {
      let total = 0
      this.food.forEach((item) => {
        total += item.realTimePrice * item.count
      })
      if (!total) {
        return `购物车为空`
      }
      return `￥${total}`
    }
  },
  methods: {
  },
  components: {
  },
  watch: {
    food(newData) {
      this.food = newData
      console.log(this.food)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .shop-cart{
    width: 100%;
    height:100%;
    display: flex;
    line-height: 48px;
    font-size:$font-size-small;
    .right{
      width: 115px;
      background-color: #bebebe;
      color:#fff;
      font-size:$font-size-small;
      text-align: center;
      &.active{
        background-color: $color-background-green;
      }
    }
    .left{
      flex:auto;
      position: relative;
      .txt{
        display: inline-block;
        text-indent:70px;
        color:#999;
        &.active{
          font-size:$font-size-title;
          color:$color-background-red;
        }
      }
      .num{
        position: absolute;
        display: inline-block;
        padding:0 6px;
        height: 16px;
        border-radius:8px;
        line-height: 16px;
        left:40px;
        top:-10px;
        background-color: $color-background-orange;
        font-style:normal;
        font-size:$font-size-small-s;
        color:#fff;
        display: none;
        &.active{
          display: inline-block;
        }
      }
      .cart{
        position: absolute;
        left:15px;
        bottom:4px;
        display: inline-block;
        width: 40px;
        height: 40px;
        text-align: center;
        font-size:20px;
        color:#fff;
        background-color: #bebebe;
        border-radius:20px;
        line-height: 40px;
        &.active{
          width:50px;
          height: 50px;
          font-size:25px;
          border-radius:25px;
          line-height: 50px;
          bottom:8px;
          left:8px;
          background-color: $color-background-green;
        }
      }
    }
  }
</style>
