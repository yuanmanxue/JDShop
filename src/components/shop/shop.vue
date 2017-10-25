<template>
  <div class="">
    <ul class="shop-wrap" v-if='data.length'>
      <li class="shop" v-for="items in data">
          <div class="shop-avator">
            <img :src="items.floorCellData.imgUrl"  v-if='items.floorCellData.imgUrl'>
            <img src="./newLoading.gif" alt=""  v-if='!items.floorCellData.imgUrl'>
          </div>
          <div class="info">
            <p class="name">{{items.floorCellData.name}}</p>
            <p class="delivery-time">达达专送 - {{items.floorCellData.deliveryFirst}}</p>
            <p class="month-sever">
              <span class="store-star"><i></i></span> |
              <span>{{items.floorCellData.monthSale}}</span>
            </p>
            <p class="delivery">{{items.floorCellData.freightWords}}</p>
            <ul v-if="items.floorCellData.tags">
              <li v-for="tags in items.floorCellData.tags">
                <span>{{tags.name}}</span>
                <span>{{matchStr(tags.words)}}</span>
              </li>
            </ul>
          </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
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
    matchStr(str) {
      let reg = new RegExp(/[^%&',;=?$#\x22]+/g)
      let newStr = str.match(reg).join(',')
      return newStr
    }
  },
  watch: {
    data: function(newData, oldData) {
      this.data = newData
      console.log(this.data)
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
      .shop-avator{
        margin-right:10px;
        img{
          width: 1.7rem;
          border:1px solid #eee;
          border-radius:5px;
        }
      }
      .info{
        flex:1 auto;
        p,span{
          margin:.2rem .2rem;
          margin-top: 0;
          overflow: hidden;
        }
        .name{
          font-size:$font-size-large;
          color:$color-text-theme;
          font-weight:bold;
          padding:.26666667rem 0;
          padding-bottom: 0;
        }
        .delivery-time{
          display: inline-block;
          color:$color-text-blue;
          border: 1px solid $color-text-blue;
          padding:.06666667rem;
        }
        .month-sever{
          height: 20px;
          line-height:20px;
          .store-star{
            display: inline-block;
            margin: 0;
            margin-right: .2rem;
            float:left;
            i{
              display: inline-block;
              width:15px;
              height:15px;
              margin-top:2px;
              background:url('newStar.png') 0 0 no-repeat;
              background-size: auto 15px;
            }
          }
        }
      }
    }
  }
</style>
