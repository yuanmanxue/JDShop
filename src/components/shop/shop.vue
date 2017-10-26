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
        <ul v-if="tag" class="activity-list">
          <li v-for="tags in tag" class="activity">
            <span class="activity-tag" :class="tagClass">{{tags.iconText}}</span><span>{{matchStr(tags.words)}}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>
</template>

<script type="text/ecmascript-6">
import Star from 'base/star/star'
export default {
  data() {
    return {
      tag: []
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
    tagClass() {
      for (var k in this.data) {
        let tagName = this.data[k].floorCellData.tags.iconText
        if (tagName === '领券') {
          return 'bg-lq'
        }
      }
    }
  },
  methods: {
    matchStr(str) {
      let reg = new RegExp(/[^%&',;=?$#\x22]+/g)
      let newStr = str.match(reg).join(',')
      return newStr
    }
  },
  components: {
    Star
  },
  watch: {
    data: function(newData, oldData) {
      this.data = newData
    },
    tag: function(newData, oldData) {
      for (var k in this.data) {
        this.tag = this.data[k].floorCellData.tags
      }
      console.log(this.tag)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .shop-wrap{
    background-color: #ffffff;
    font-size:$font-size-small-s;
    color:$color-text-gray;
    .shop{
      padding:.26666667rem .22666667rem;
      display: flex;
      overflow: hidden;
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
          .activity{
            height: 15px;
            line-height: 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding:5px 0;
            .activity-tag{
              // color:$color-text-white
              padding:5px;
              font-size:$font-size-small
              margin-right:10px;
            }
            .bg-yf{
              background-color: $color-background-bule;
            }
            .bg-mj{
              background-color: $color-background-green;
            }
            .bg-lq{
              background-color: $color-background-red;
            }
            .bg-rx{
              background-color: $color-background-hot;
            }
            .bg-sd{
              background-color: $color-background-orange;
            }
            .bg-mz{
              background-color: $color-background-green-s;
            }
            .bg-fq{
              background-color: $color-background-orange-s;
            }
            .bg-other{
              background-color: $color-background-other;
            }
          }
        }
      }
    }
  }
</style>
