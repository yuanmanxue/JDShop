<template>
  <Scroll class="shop-list-wrap" :data="data">
    <div class="shop-list">
      <ul>
        <li v-for="(item, index) in data">
          <img :src="item.imgUrl" alt="" class="left">
          <div class="right">
            <p class="name">{{item.skuName}}</p>
            <p class="month-sales"><span>月售{{item.monthSales}}件</span><span v-if="item.highOpinion"> | {{item.highOpinion}}</span></p>
            <div class="icon-text-wrap" v-if="item.tags.length > 0">
              <iconText :tagsText="item.tags[0].iconText" :tagsType="item.tags[0].type"></iconText>
              <div class="ball-wrap">
                <cartBall :food="5" @parentAdd="parentAdd"></cartBall>
              </div>
            </div>
            <p><span class="real-price">￥{{item.realTimePrice}}</span><span v-if="item.basicPrice" class="old-price">￥{{item.basicPrice}}</span></p>
          </div>
        </li>
      </ul>
    </div>
  </Scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import iconText from 'base/iconText/iconText'
import cartBall from 'base/cart-ball/cart-ball'
export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  created() {
  },
  methods: {
    parentAdd(e) {
      console.log(e)
    }
  },
  components: {
    Scroll,
    iconText,
    cartBall
  },
  watch: {
    data(newData) {
      this.data = newData
      // console.log(this.data)
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
      p{
        padding:.13333333rem 0;
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
        position: relative;
        height:20px;
        padding:.2rem 0;
        .ball-wrap{
          top:.06666667rem;
          right:0;
          position: absolute;
        }
      }
      .real-price{
        color:$color-text-red;
        font-size:$font-size-title;
        font-weight:bold;
        padding-right:10px;
      }
      .old-price{
        text-decoration:line-through;
        color:$color-text-gray;
      }
    }
  }
</style>
