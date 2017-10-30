<template>
<div class="">
  <ul class="shop-wrap" v-if='data.length'>
    <li class="shop" v-for="items in data">
      <div class="shop-avator">
        <img :src="items.floorCellData.imgUrl" v-if='items.floorCellData.imgUrl'>
        <img src="./newLoading.gif" alt="" v-if='!items.floorCellData.imgUrl'>
      </div>
      <div class="info">
        <p class="name">{{items.floorCellData.name}}</p>
        <p class="delivery-time">达达专送 - {{items.floorCellData.deliveryFirst}}</p>
        <p class="month-sever">
          <Star :score="items.floorCellData.storeStar" class="star"></Star>{{items.floorCellData.storeStar}} |
          <span>{{items.floorCellData.monthSale}}</span>
        </p>
        <p class="delivery">{{items.floorCellData.freightWords}}</p>
        <ShopTags :tags="items.floorCellData.tags" :show="show" @on-toggle-show="onToggleShow"></ShopTags>
      </div>
    </li>
  </ul>
</div>
</template>

<script type="text/ecmascript-6">
import Star from 'base/star/star'
import ShopTags from 'base/shopTags/shopTags'
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
    }
  },
  created() {
    // console.log(this.data)
  },
  computed: {
  },
  methods: {
    onToggleShow(newData) {
      console.log(this.show)
      this.show = newData
    }
  },
  components: {
    Star,
    ShopTags
  },
  watch: {
    data: function(newData, oldData) {
      this.data = newData
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
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
