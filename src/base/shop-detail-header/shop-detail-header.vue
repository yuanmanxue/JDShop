<template>
  <!-- <Scroll> -->
  <div class="shop-header-wrap" ref="shopHearderWrap">
    <div class="header-wrap" ref="headerWrap"></div>
    <div class="header">
        <div class="header-info" v-if="data.storeInfo">
          <div class="shop-avator">
            <img :src="data.storeInfo.logoUrl" alt="">
          </div>
          <div class="info">
            <p class="title">{{data.storeInfo.storeName}}</p>
            <p>达达专送 | {{data.storeInfo.deliveryFirst}}</p>
            <p>{{data.storeInfo.freightWords}}</p>
          </div>
        </div>
        <div class="activity">
          <div class="heart"></div>
          <div class="packet" v-show="flag" @click="toggleShowMore"></div>
        </div>
      </div>
    <Scroll ref="listScroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="data.cateList" class="list-wrap">
      <div>
        <div class="activity-list" v-if="data.storeInfo">
          <ShopTags :tags="data.storeInfo.tags" :indexNum="indexNum"></ShopTags>
          <i class="more iconfont" v-if="data.storeInfo.tags" @click="toggleShowMore" v-show="flag">{{data.storeInfo.tags.length}}个活动 &#xe501;</i>
        </div>
        <div class="shop-wrapper" v-show="!flag" v-if="data.storeInfo">
          <!-- 店铺公告 -->
          <div class="shop-notices" v-for="item in data.storeInfo.expectArrivedTips">
            <i>公告</i>
            <p>{{item.msg}}</p>
          </div>
          <!-- 店铺优惠券 -->
          <div class="shop-coupons" v-if="data.coupons">
            <div class="title">———— 店铺优惠券 ————</div>
            <div class="coupons" v-for="(item, index) in data.coupons" v-show="index <1">
              <div class="left">
                <span class="weight">{{item.amount}}</span>
                <span>{{item.amountUnit}}</span>
              </div>
              <div class="middle">
                <p class="tit">{{item.detail}}</p>
                <p>{{item.limitRule}}</p>
                <p>{{item.avilableDate}}</p>
              </div>
              <div class="right"><span>领券</span></div>
            </div>
          </div>
          <!-- 店铺评价 -->
          <div class="shop-comment" v-if="data.storeCommentVO">
            <div class="title">———— 店铺评价 ————</div>
            <div class="comment">
              <div class="comment-top">
                <div class="left">
                  <span class="num">{{data.storeCommentVO.scoreAvg}}</span>
                  <span>综合评分</span>
                </div>
                <div class="right">
                  <span class="num">{{data.storeCommentVO.totalCount}}</span>
                  <span>评论数</span>
                </div>
              </div>
              <div class="comment-middle">
                <div class="avator"></div>
                <div class="info">
                  <span class="name">{{data.storeCommentVO.buyerShowName}}</span>
                  <span class="time">{{data.storeCommentVO.createTime}}</span>
                </div>
                <div class="star-wrap">
                  <Star :score="data.storeCommentVO.score4"></Star>
                </div>
              </div>
              <div class="comment-bottom">查看用户全部评价 &gt;</div>
            </div>
          </div>
          <!-- 店铺信息 -->
          <div class="shop-info" v-if="data.storeInfo">
            <div class="title">———— 店铺信息 ————</div>
            <div class="info-wrap">
              <a class="tag-icon" v-for="(item,index) in data.tagList" :href="item.tagDescUrl">
                <img :src="item.tagLogoUrl" alt="">
                <p>{{item.tagName}} &gt;</p>
              </a>
              <p>商品数量：{{data.storeInfo.inSaleNum}} 件</p>
              <p>月销单量：{{data.storeInfo.monthSaleNum}} 单</p>
              <p>关注人数：{{data.storeInfo.followNo}} 人</p>
              <p>门店地址：{{data.storeInfo.storeAddress}}</p>
              <p>门店电话：{{data.storeInfo.storeTel}}</p>
              <div class="txt">商家资质</div>
              <div class="txt">举报商家</div>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
    <!-- 上拉按钮 -->
    <div class="push-btn" v-show="!flag" @click="toggleShowMore">点击上拉继续购物</div>
   </div>
  <!-- </Scroll> -->
</template>

<script type="text/ecmascript-6">
import Star from 'base/star/star'
import Scroll from 'base/scroll/scroll'
import ShopTags from 'base/shop-tags/shop-tags'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      indexNum: 0,
      flag: true
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  computed: {
    ...mapGetters([
      'shop'
    ])
  },
  mounted() {
    // this.$refs.listScroll.refresh()
  },
  methods: {
    toggleShowMore() {
      if (this.flag) {
        this.indexNum = 10
        this.$refs.headerWrap.style.height = '750px'
        this.$refs.shopHearderWrap.style.zIndex = '110'
      } else {
        this.indexNum = 0
        this.$refs.headerWrap.style.height = '110px'
        this.$refs.shopHearderWrap.style.zIndex = '88'
      }
      this.flag = !this.flag
      this.$nextTick(() => {
        this.$refs.listScroll.refresh()
      })
    }
  },
  components: {
    ShopTags,
    Scroll,
    Star
  },
  watch: {
    data(newData) {
      this.data = newData
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .shop-header-wrap{
    position: fixed;
    bottom:0;
    top:0;
    left:0;
    right:0;
    z-index:88;
  }
  .header-wrap{
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    height: 110px;
    // bottom:0;
    width: 100%;
    background:url(./header-bg.jpg) no-repeat;
    background-size: cover;
    z-index:99;
  }
  // .list-wrap{
    .header{
      width: 100%;
      position: fixed;
      top: 0;
      height:90px;
      clear: both;
      overflow: hidden;
      z-index:101;
      .header-info{
        width: 75%;
        padding:2.5%;
        float:left;
        font-size:$font-size-small-s;
        color:$color-text-white;
        .shop-avator{
          width: 1.6rem;
          height: 1.6rem;
          padding:1px;
          border-radius:3px;
          background-color: #ffffff;
          margin-right:.26666667rem;
          float:left;
          img{
            width: 1.6rem;
            height: 1.6rem;
            border-radius:.13333333rem;
          }
        }
        .info{
          max-width:5.33333333rem;
          float:left;
          .title{
            font-size:$font-size-title;
            padding:.13333333rem 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
          }
          p{
            padding-bottom: .13333333rem;
          }
        }
      }
      .activity{
        width:20%;
        height: 78px;
        float:left;
        .heart,.packet{
          width: 100%;
          height: 50%;
        }
        .packet{
          background: url(./yhq.png) no-repeat center;
          background-size: 60%;
        }
      }
    }
    .activity-list{
        padding:0 2.5%;
        position: relative;
        font-size:$font-size-small;
        color:$color-text-white;
        overflow: auto;
        .more{
          padding:5px 0;
          position: absolute;
          right:.33333333rem;
          font-size:$font-size-small-s;
          font-style:normal;
          top:0;
        }
    }
    .title{
      height: .8rem;
      line-height: .8rem;
      text-align:center;
      color:$color-text-white;
      font-size:$font-size-title;
    }
    .list-wrap{
      width: 100%;
      position: fixed;
      top: 85px;
      left:0;
      right:0;
      bottom:1.06666667rem;
      z-index:100;
      overflow: hidden;
    }
    // 公告
    .shop-notices{
      position: relative;
      width: 95%;
      margin:2.5%;
      font-size:$font-size-small;
      color:$color-text-white;
      i{
        width:.8rem;
        position: absolute;
        left:0;
        font-style:normal;
        top:0;
        padding:.1rem;
        text-align:center;
        background-color: $color-text-gray;
        border-radius:.13333333rem;
        font-size:$font-size-small-s;
      }
      p{
        margin-left:1.33333333rem;
        height: .53333333rem;
        line-height:.53333333rem;
      }
    }
    // 店铺优惠券
    .shop-coupons{
      font-size:$font-size-small;
      .coupons{
        box-sizing:border-box;
        color:$color-text-theme;
        width: 85%;
        height:2rem;
        line-height: 2rem;
        margin:.53333333rem 7.5%;
        border-radius:5px;
        border:1px solid #ff5757;
        border-left-width:3px;
        background-color: #ffffff;
        display: flex;
        text-align:center;
        overflow: hidden;
        .left{
          width: 1.6rem;
          font-size:$font-size-title;
          color:#ff5757;
          font-weight:bold;
          .weight{
            font-size:$font-size-icon;
          }
        }
        .middle{
          position: relative;
          flex:auto;
          height: 1.8rem;
          padding:.13333333rem .53333333rem;
          text-align:left;
          line-height:.4rem;
          border-right:1px dashed #ff5757;
          background-position: 0px 0px;
          .tit{
            font-size:$font-size-small;
            color:$color-text-theme;
          }
          p{
            padding:.06666667rem 0;
            font-size:$font-size-small-s;
            color:$color-text-gray;
          }
        }
        .right{
          width:2rem;
          span{
            padding:.13333333rem .33333333rem;
            background-color: #ff5757;
            border-radius:.33333333rem;
            color:$color-text-white;
          }
        }
      }
    }
    //店铺评价
    .comment{
      width: 90%;
      margin:2.5%;
      padding:2.5%;
      border-radius:.13333333rem;
      background-color:rgba(255,255,255,0.1);
      .comment-top{
        display: flex;
        border-bottom:1px dashed rgba(255,255,255,0.4);
        .left{
          border-right:1px solid rgba(255,255,255,0.4);
        }
        div{
          width: 50%;
          margin:.26666667rem 0;
          text-align:center;
          font-size:$font-size-small-s;
          color:$color-text-white;
          span{
            display: block;
            width: 100%;
            margin-bottom:.2rem;
          }
          .num{
            font-weight:bold;
            font-size:.66666667rem;
          }
        }

      }
      .comment-middle{
        position: relative;
        height: 1.06666667rem;
        padding:.4rem;
        font-size:$font-size-small;
        color:$color-text-white;
        border-bottom:1px dashed rgba(255,255,255,0.4);
        .avator{
          position: absolute;
          left:0;
          top:.4rem;
          width: 1.06666667rem;
          height: 1.06666667rem;
          border-radius:50%;
          background:url(./avator.jpg) no-repeat;
          background-size: cover;
        }
        .info{
          margin-left:1.06666667rem;
          .time{
            float:right
          }
        }
        .star-wrap{
           margin-left:1.06666667rem;
           margin-top:.26666667rem;
        }
      }
      .comment-bottom{
        padding-top:.53333333rem;
        padding-bottom:.26666667rem;
        text-align:center;
        font-size:$font-size-small-s;
        color:$color-text-white;
      }
    }
    .info-wrap{
      width: 90%;
      margin:2.5%;
      padding:2.5%;
      border-radius:.13333333rem;
      background-color:rgba(255,255,255,0.1);
      font-size:$font-size-small;
      color:$color-text-white;
      .tag-icon{
        display: block;
        padding-bottom: .13333333rem;
        margin-bottom:.26666667rem;
        img{
          display: block;
          width: .93333333rem;
          margin:0 auto;
        }
        p{
          text-align:center;
          color:$color-text-white;
        }
        p:last-child{
          padding-bottom:.4rem;
          border-bottom:1px dashed rgba(255,255,255,0.4);
        }
      }
      p{
        padding:.13333333rem 0;
      }
      .txt{
        overflow: hidden;
        padding:.26666667rem 0;
        font-size:$font-size-large;
        border-top:1px dashed rgba(255,255,255,0.4);
        matgin-top:.26666667rem;
      }
    }
    .push-btn{
      width: 100%;
      position: fixed;
      z-index:1000;
      bottom:0;
      height: 1.06666667rem;
      background-color: #ffffff;
      color:$colot-text-theme;
      text-align:center;
      line-height: 1.06666667rem;
      font-size:$font-size-small;
      border-top:1px solid #eee;
    }
  // }

</style>
