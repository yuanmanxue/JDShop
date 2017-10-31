<template>
<div class="index-wrap">
  <!-- 搜索框 -->
  <SearchBar ref="searchBar" :color="bgWhite"></SearchBar>
  <div class="scroll">
    <scroll class="scroll-wrap" :data="shopData" ref="scroll" @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll">
      <div>
        <!-- 轮播图 -->
        <div class="slider-wrapper" v-if="slider.length">
          <Slider>
            <div v-for='item in slider'>
              <a href="#">
                <img :src="item.floorCellData.imgUrl"/>
              </a>
            </div>
          </Slider>
        </div>
        <!-- 球形图案的分类 -->
        <div class="ball-wrap">
          <div class="ball" v-for="item in ball">
            <a href="#">
              <img :src="item.floorCellData.imgUrl" alt="">
              <span>{{item.floorCellData.title}}</span>
            </a>
          </div>
        </div>
        <!-- footerBanner1 -->
        <div class="footer-slider" v-if="footerSlider.length">
          <div class="slider-wrapper">
            <Slider :autoPlay='false'>
              <div v-for="item in footerSlider[0]">
                <a href="#">
                  <img :src="item.floorCellData.imgUrl"/>
                </a>
              </div>
            </Slider>
          </div>
        </div>
        <!-- footerBanner2 -->
        <div class="footer-slider" v-if="footerSlider.length">
          <div class="slider-wrapper">
            <Slider :autoPlay='false'>
              <div v-for="item in footerSlider[1]">
                <a href="#">
                  <img :src="item.floorCellData.imgUrl"/>
                </a>
              </div>
            </Slider>
          </div>
        </div>
        <!-- 秒杀区 -->
        <Seckill :data='seckill'></Seckill>
        <!-- footerBanner3 -->
        <div class="footer-slider" v-if="footerSlider.length">
          <div class="slider-wrapper">
            <Slider :autoPlay='false'>
              <div v-for="item in footerSlider[2]">
                <a href="#">
                  <img :src="item.floorCellData.imgUrl"/>
                </a>
              </div>
            </Slider>
          </div>
        </div>
        <Shop :data="shopData"></Shop>
      </div>
    </scroll>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import SearchBar from 'components/search-bar/search-bar'
import Shop from 'components/shop/shop'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Seckill from 'base/seckill/seckill'
import {getSlider} from 'api/slider.js'
import {getShop} from 'api/shop.js'
import {ERR_OK} from 'api/config.js'

const scrollTop = -115
export default {
  data() {
    return {
      slider: [],
      ball: [],
      seckill: [],
      footerSlider: [],
      shopData: [],
      bgWhite: false
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this._getSlider()
    this._getShop()
  },
  methods: {
    _getSlider() {
      getSlider().then((res) => {
        if (res.code === ERR_OK) {
          for (let i = 0; i < res.result.data.length; i++) {
            if (res.result.data[i].floorStyle === 'banner') {
              this.slider = res.result.data[i].data
            } else if (res.result.data[i].floorStyle === 'ball') {
              this.ball = res.result.data[i].data
            } else if (res.result.data[i].floorStyle === 'act5') {
              this.seckill = res.result.data[i].data
            } else {
              this.footerSlider.push(res.result.data[i].data)
            }
          }
        }
      })
    },
    _getShop() {
      getShop().then((res) => {
        if (res.code === ERR_OK) {
          this.shopData = res.result.data.data
        }
      })
    },
    scroll(pos) {
      if (pos.y < scrollTop) {
        this.bgWhite = true
      } else {
        this.bgWhite = false
      }
    }
  },
  components: {
    SearchBar,
    Slider,
    Seckill,
    Scroll,
    Shop
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .scroll{
    position: fixed;
    top: 0;
    bottom:51px;
    width: 100%;
  }
  .scroll-wrap{
    height: 100%;
    overflow:hidden;
  }
  .slider-wrapper{
    background-color: #fff;
  }
.ball-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  padding:10px;
  min-height:90px;
  overflow:hidden;
  background-color: #ffffff;
  .ball{
    flex:1;
    text-align:center;
    img{
      width: 80%;
    }
    span{
      display:block;
      font-size:$font-size-small-s;
      padding-top: 8px;
    }
  }
}
.footer-slider{
  .slider-wrapper{
    margin: 10px 0;
  }
}
.index-wrap{
  margin-bottom: 56px;
}
</style>
