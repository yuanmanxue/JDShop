<!--
@Author: yuanmanxue
@Date:   2017-11-14 03:35:49
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-22 05:08:01
-->

<template>
    <div class="">
      <div class="mask" v-show="addCatList.length > 0 && showList" @click="showListFn"></div>
      <div>
        <div class="shop-cart">
          <div class="left-ball" @click="showListFn">
            <i class="cart iconfont" :class="{'active': totalCount > 0}">&#xe503;</i>
            <i class="num" :class="{'active': totalCount > 0}">{{totalCount}}</i>
            <span class="txt" :class="{'active': totalCount > 0}">{{totalPrice}}</span>
          </div>
          <div class="right" :class="{'active': totalCount > 0}">去结算</div>
        </div>
        <!-- 购物车中商品的内容 -->
          <Scroll :data="addCatList" class="add-cart-list" v-show="showList" :probe-type="probeType" :listen-scroll="listenScroll" ref="addCartListScroll">
            <div class="shop-list" v-show="addCatList.length>0">
              <div class="all-select">
                <input
                  type="checkbox"
                  name=""
                  value=""
                  class="check-box iconfont icon-Pigeon"
                  id="allSelect"
                  v-model="checkAll"
                  @click="changeState"
               >
                <label for="allSelect">全选</label>
                <span @click="delectShopFn">清空购物车</span>
              </div>
              <ul>
                  <li v-for="(item, index) in addCatList" ref="shopListItem">
                    <input
                    type="checkbox"
                    name="" :value="item.skuId"
                    v-model="checkModel"
                    class="check-box iconfont icon-Pigeon"
                    >
                    <img v-lazy="item.imgUrl" v-if="item.imgUrl" class="left">
                    <div class="right">
                      <p class="name">{{item.skuName}}</p>
                      <p class="month-sales"><span>月售{{item.monthSales}}件</span><span v-if="item.highOpinion"> | {{item.highOpinion}}</span></p>
                      <div class="icon-text-wrap" v-if="item.tags.length > 0">
                        <iconText :tagsText="item.tags[0].iconText" :tagsType="item.tags[0].type"></iconText>
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
            </div>
          </Scroll>
          <confirm @confirm="confirmFn()" @cancel="cancelFn()" ref="confirm" text="全部清除商品吗？"></confirm>
          <div class="mask" v-show="showList2"></div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import iconText from 'base/iconText/iconText'
import cartBall from 'base/cart-ball/cart-ball'
import Confirm from 'base/confirm.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
      showList: false,
      showList2:false,
      foo: false,
      checkModel: [],
      checkAll: true
    }
  },
  props: {
    food: {
      type: Array,
      default: null
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'addCatList'
    ]),
    totalCount() {
      let count = 0
      this.addCatList.forEach((item) => {
        count += item.count
      })
      return count
    },
    totalPrice() {
      let total = 0
      this.addCatList.forEach((item) => {
        total += item.realTimePrice * item.count
      })
      if (!total) {
        return `购物车为空`
      }
      return `￥${total.toFixed(2)}`
    }
  },
  methods: {
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
    showListFn() {
      this.showList = !this.showList
      this.$nextTick(() => {
        this.$refs.addCartListScroll.refresh()
      })
      this.$refs.confirm.hide()
    },
    changeBox() {
      this.showCheckBox = !this.showCheckBox
    },
    delectShopFn(){
      console.log('清空购物车列表')
      this.$refs.confirm.show()
      this.showList2 = true
    },
    confirmFn(){
      this.delectCartListFn()
      this.showListFn()
      this.cancelFn()
    },
    cancelFn(){
      this.showList2 = false
    },
    changeState(){
      this.checkModel = []
      this.checkAll = !this.checkAll
      if (this.checkAll === true) {
        this.addCatList.forEach((item, index) => {
          this.checkModel.push(item.skuId)
        })
      } else {
        this.checkModel = []
      }
    },
    pushCheckModel() {
      this.addCatList.forEach((item, index) => {
        this.checkModel.push(item.skuId)
      })
      console.log(this.checkModel);
    },
    ...mapActions([
      'addCountFn',
      'decrCountFn',
      'addCartListFn',
      'delectCartListFn'
    ])
  },
  components: {
    Scroll,
    iconText,
    cartBall,
    Confirm
  },
  watch: {
    addCatList() {
      this.$nextTick(() => {
        this.$refs.addCartListScroll.refresh()
        this.pushCheckModel()
      })
    },
    checkModel() {
        if (this.checkModel.length === this.addCatList.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .add-cart-list{
    position:fixed;
    left:0;
    right:0;
    bottom:48px;
    // top:500px;
    z-index:101;
    max-height:70%;
    overflow:hidden;
    background-color:#fff;
    // .total-count-txt{
    //   position:absolute;
    //   top:0;
    //   left:0;
    //   right:0;
    //   padding:.26666667rem;
    //   font-size:$font-size-small;
    // }
  }
  .shop-list{
    border-top:1px solid #eee;
    .all-select{
      padding:0 .26666667rem;
      height: 1.06666667rem;
      border-bottom: 1px solid #ddd;
      font-size: $font-size-title;
      color:$color-text-theme;
      .check-box{
        &:after{
          margin-top: -.36666667rem;
        }
        &:before{
          margin-top: -.36666667rem;
        }
      }
      label{
        display: inline-block;
        height: 1.06666667rem;
        line-height: 1.06666667rem;
      }
      span{
        display: inline-block;
        float: right;
        height: 1.06666667rem;
        line-height: 1.06666667rem;
        font-size: $font-size-small;
        text-indent:.53333333rem;
        background:url("//static-o2o.360buyimg.com/daojia/new/images/minicart/delete.png") no-repeat left center;
        background-size: .4rem auto;
      }
    }
    li{
      display: flex;
      padding:.26666667rem .26666667rem;
      border-bottom:1px solid #eee;
      background-color:#fbfbfb;
    }
    & .check-box{
      display: inline-block;
      width: .8rem;
      height: 0;
      position: relative;
      &:after{
        box-sizing: border-box;
        position: absolute;
        top:0;
        content:'';
        display: inline-block;
        width: .5rem;
        height: .5rem;
        margin-right:.26666667rem;
        margin-top:.53333333rem;
        background-color: #ffffff;
        border:1px solid #ddd;
        border-radius:50%;
        text-align: center;
        color:#fff;
      }
      &:before{
        position: absolute;
        top:0;
        display: inline-block;
        width: .5rem;
        height: .5rem;
        margin-right:.26666667rem;
        margin-top:.53333333rem;
        text-align: center;
        color:#fff;
        z-index:999;
      }
      &[type=checkbox]:checked:after{
        background-color: $color-background-green;
        border-color: $color-background-green;
      }
      &[type=checkbox]:checked:before{
        color:#fff;
      }
    }
    & .left{
      width:1.33333333rem;
      height:1.33333333rem;
      padding:.16666667rem;
      margin-right: .2rem;
      border: 1px solid #eee;
    }
    .right{
      width: 6.66666667rem;
      font-size:$font-size-small-s;
      padding-top:.13333333rem;
      position: relative;
      p{
        padding:.050333333rem 0;
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
        font-size:$font-size-small;
        font-weight:bold;
      }
      .old-price{
        text-decoration:line-through;
        color:$color-text-gray;
      }
    }
  }
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
    .left-ball{
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
        position: fixed;
        display: inline-block;
        padding:0 6px;
        height: 16px;
        border-radius:8px;
        line-height: 16px;
        left:40px;
        bottom:40px;
        z-index:151;
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
        position: fixed;
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
        z-index: 150;
        &.active{
          width:50px;
          height: 50px;
          font-size:25px;
          border-radius:25px;
          line-height: 50px;
          bottom:4px;
          left:8px;
          background-color: $color-background-green;
        }
      }
    }
  }
  .mask{
    position:fixed;
    width:100%;
    top:0;
    left:0;
    right:0;
    bottom:48px;
    z-index:101;
    background:rgba(0,0,0,0.5)
  }

</style>
