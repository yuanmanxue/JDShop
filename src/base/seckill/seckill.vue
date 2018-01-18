<!--
@Author: yuanmanxue
@Date:   2017-10-24 05:06:00
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-18 02:29:11
-->

<template>
  <div class="slider-wrap" v-if="recommend.length>0">
    <div class="seckill-more">
      <router-link :to="{ name: '' }">更多 ></router-link>
    </div>
    <swiper :options="options">
      <swiper-slide v-for="(items, index) in recommend" class="seckill" :key="items.title">
        <router-link :to="{ name: ''}">
          <p class="desc">{{items.grabSku.storeName}}</p>
          <img :src="items.grabSku.imageurl" alt="">
          <p class="now-price">￥{{items.grabSku.miaoShaPrice}}</p>
          <p class="price">￥{{items.grabSku.price}}</p>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      seckill: [],
      recommend: []
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    options: {
      type: Object,
      default() {
        return {
          slidesPerView:4.5,
          spaceBetween: 5,
          freeMode:true
        }
      }
    }
  },
  methods: {
    _getData() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].dataObj) {
          this.seckill = this.data[i].dataObj
        } else {
          this.recommend.push(this.data[i].floorCellData)
        }
      }
      console.log(this.recommend);
    }
  },
  created() {
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {
    data: function(newData, oldData) {
      this.data = newData
      this._getData()
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  @import "~swiper/dist/css/swiper.css";
  .slider-wrap{
    background-color: #ffffff;padding-bottom: .53333333rem;
    .seckill-more{
        height: 1.06666667rem;
        line-height: 40px;
        background: url("//static-o2o.360buyimg.com/daojia/new/images/index/seckill-title.png") no-repeat 20px center;
        background-size: auto 60%;
        a{
          float: right;
          margin-right:.53333333rem;
          font-size: $font-size-small;
          color:$color-text-red;
        }
    }
  }
  .swiper-container{
    box-sizing:border-content;
    padding:0 10px;
  }
  .seckill{
    a{
        position: static;
        height: 100px;
    }
    img{
      width: 1.94666667rem;
      height: 1.94666667rem;
    }
    .title{
      text-align:center;
      padding:5px 0;
      font-size:$font-size-small;
      font-weight:bold;
    }
    .desc{
      width: 100%;
      margin: 0 auto;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size:$font-size-small-s;
      color:#fff;
      background-color: rgba(255,87,87,0.6);
      border-radius:5px;
      height: 10px;
      line-height: 10px;
      text-align:center;
      padding:4px 0;
      position: relative;
      z-index:100;
      top: 2.05333333rem;
    }
    .price{
      font-size:$font-size-small;
      text-decoration:line-through;
      text-align: center;
      color:$color-text-gray;
    }
    .now-price{
      text-align: center;
      font-size:$font-size-title;
      font-weight:bold;
      color:$color-text-red;
    }
  }
</style>
