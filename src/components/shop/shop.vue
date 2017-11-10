<template>
<div>
  <div class="shop-title-wrap">——<span class="shop-title">{{footerTitle.floorName}}</span>——</div>
  <ul class="shop-wrap" v-if='data.length'>
    <li class="shop" v-for="item in data" @click="selectShop(item)">
      <div class="shop-avator">
        <img v-lazy="item.floorCellData.imgUrl" v-if='item.floorCellData.imgUrl'>
        <img src="./newLoading.gif" alt="" v-if='!item.floorCellData.imgUrl'>
      </div>
      <div class="info">
        <p class="name">{{item.floorCellData.name}}</p>
        <p class="delivery-time">达达专送 - {{item.floorCellData.deliveryFirst}}</p>
        <p class="month-sever">
          <Star :score="item.floorCellData.storeStar" class="star"></Star>{{item.floorCellData.storeStar}} |
          <span>{{item.floorCellData.monthSale}}</span>
        </p>
        <p class="delivery">{{item.floorCellData.freightWords}}</p>
        <ShopTags :tags="item.floorCellData.tags" :show="show" @on-toggle-show="onToggleShow"></ShopTags>
      </div>
    </li>
  </ul>
</div>
</template>

<script type="text/ecmascript-6">
import Star from 'base/star/star'
import ShopTags from 'base/shop-tags/shop-tags'
// import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    data: {
      type: Array,
      defaule: null
    },
    footerTitle: {
      type: Object,
      defalut: null
    }
  },
  created() {
    // console.log(this.data)
  },
  computed: {
  },
  methods: {
    onToggleShow(newData) {
      this.show = newData
    },
    // ...mapMutations({
    //   setShop: 'SET_SHOP'
    // }),
    selectShop(item) {
      this.$emit('select-shop', item)
    }
  },
  components: {
    Star,
    ShopTags
  },
  watch: {
    data: function(newData, oldData) {
      this.data = newData
    },
    footerTitle: function(newData) {
      this.footerTitle = newData
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .shop-title-wrap{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size:$font-size-large;
    font-weight:normal;
    border-bottom:1px solid #eee;
    border-top:1px solid #eee;
    background-color: #fff;
    .shop-title{
      font-weight:bold;
    }
  }
  .shop-wrap{
    background-color: #fff;
    font-size:$font-size-small-s;
    color:$color-text-gray;
    .shop{
      padding:.26666667rem .22666667rem;
      display: flex;
      overflow: hidden;
      border-bottom:1px solid #eee;
      .shop-avator{
        margin-right:10px;
        img{
          width: 1.7rem;
          border:1px solid #eee;
          border-radius:5px;
        }
      }
      .info{
        flex-grow: 1;
        margin:.2rem .2rem;
        margin-top: 0;
        overflow: hidden;
        p{
          padding-bottom: 10px;
        }
        .name{
          font-size:$font-size-large;
          color:$color-text-theme;
          font-weight:bold;
          padding:.26666667rem 0;
          padding-bottom: 10px;
        }
        .delivery{
          border-bottom: 1px dashed  #ddd;
        }
        .delivery-time{
          display: inline-block;
          color:$color-text-blue;
          border: 1px solid $color-text-blue;
          padding:.06666667rem;
          margin:.13333333rem 0;
        }
        .month-sever{
          height: 20px;
          line-height: 20px;
          .star{
            float: left;
            margin-right:8px;
          }
        }
        .activity-list{
          padding-top: 5px;
        }
      }
    }
  }
</style>
