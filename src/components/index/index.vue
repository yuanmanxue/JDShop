<!--
@Author: yuanmanxue
@Date:   2017-10-23 02:51:44
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-22 01:45:01
-->

<template>
<div class="index-wrap">
  <!-- 搜索框 -->
  <SearchBar ref="searchBar"
            :fold="bgWhite"
            :storeSortTexts="storeSortTexts"
            :rankType="rankType"
            :address="address"
            @change-rank-type="changeRankType"
            @selectRankType="selectRankType">
  </SearchBar>
  <div class="scroll" ref="scrollWrap">
    <scroll class="scroll-wrap" :data="shopData" ref="scroll" @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll">
      <div>
        <!-- 轮播图 -->
        <div class="slider-wrapper" v-if="slider.length>0">
          <Slider>
            <div v-for='item in slider'>
              <a href="#">
                <img :src="item.floorCellData.imgUrl"/>
              </a>
            </div>
          </Slider>
        </div>
        <!-- 球形图案的分类 -->
        <div class="ball-wrap" v-if="ball.length>0">
          <div class="ball" v-for="item in ball">
            <a href="#">
              <img :src="item.floorCellData.imgUrl" alt="">
              <span>{{item.floorCellData.title}}</span>
            </a>
          </div>
        </div>
        <!-- footerBanner1 -->
        <div class="footer-slider" v-if="footerSlider.length>0">
          <div class="slider-wrapper">
            <Slider :autoPlay='false' :loop="false">
              <div v-for="item in footerSlider[0]">
                <a href="#">
                  <img :src="item.floorCellData.imgUrl"/>
                </a>
              </div>
            </Slider>
          </div>
        </div>
        <!-- footerBanner2 -->
        <div class="footer-slider" v-if="footerSlider.length>0">
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
        <div class="footer-slider" v-if="footerSlider.length>0">
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
        <!-- 商铺列表 -->
        <div ref="shopList">
          <!-- 正在加载 -->
          <div class="load-wrap" v-show="!shopData.length">
            <load></load>
          </div>
          <Shop :data="shopData" :footerTitle="shopTitle" @select-shop="selectShop"></Shop>
        </div>
      </div>
    </scroll>
  </div>
  <router-view></router-view>
</div>
</template>

<script type="text/ecmascript-6">
import SearchBar from 'components/search-bar/search-bar'
import Shop from 'components/shop/shop'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Seckill from 'base/seckill/seckill'
import Load from 'base/load/load'
import {getSlider} from 'api/slider.js'
import {getShop} from 'api/shop.js'
import {ERR_OK} from 'api/config.js'
import {mapMutations, mapGetters} from 'vuex'
import {createShop} from 'common/js/shop'

const SCROLLTOP = -115
const SEARCHBARHEIGHT = 56
const GETMOREDATA = 300
export default {
  data(){
    return {
      slider: [],
      ball: [],
      seckill: [],
      footerSlider: [],
      shopData: [],
      shopClass: [],
      storeSortTexts: [],
      rankType: 0,
      shopTitle: {},
      scrollBottom: 0,
      flag: false,
      page: 1,
      bgWhite: false
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this._getSlider(this.address)
    this._getShop(this.rankType, this.page, this.address)
  },
  computed:{
    ...mapGetters([
      'address'
    ])
  },
  mounted(){},
  methods: {
    // 获取轮播数据
    _getSlider(address) {
      getSlider(address).then((res) => {
        if (res.code === ERR_OK) {
          this.storeSortTexts = res.result.config.storeSortTexts
          console.log(res.result);
          for (let i = 0; i < res.result.data.length; i++) {
            if (res.result.data[i].floorStyle === 'banner') {
              this.slider = res.result.data[i].data
            } else if (res.result.data[i].floorStyle === 'ball') {
              this.ball = res.result.data[i].data
            } else if (res.result.data[i].floorStyle === 'seckill') {
              this.seckill = res.result.data[i].data
            } else {
              this.footerSlider.push(res.result.data[i].data)
            }
          }
        }
      })
    },
    // 获取商铺信息数据
    _getShop(rankType, page, address) {
      getShop(rankType, page, address).then((res) => {
        if (res.code === ERR_OK) {
          let concatArr = res.result.data.data
          this.shopData = this.shopData.concat(concatArr)
          this.shopClass = this._normalizeShop(this.shopData)
          this.shopTitle = res.result.data.floorTitle
        }
      })
      // this.$http.get('/api/getShop').then((res) => {
      //   res = res.body
      //   this.shopData = res.data.result.data.data
      //   this.shopTitle = res.data.result.data.floorTitle
      // })
    },
    // 每个商店动态路由跳转
    selectShop(shop) {
      this.shopClass.forEach((item) => {
        if (item.params.storeId === shop.floorCellData.params.storeId) {
          this.setShop(item)
          this.$router.push({
            path: `/index/${item.params.storeId}`
          })
        }
      })
    },
    // 规范化商铺列表数据
    _normalizeShop(list) {
      let ret = []
      list.forEach((item) => {
        let {floorCellData} = item
        ret.push(createShop(floorCellData))
      })
      return ret
    },
    // 监听scroll是否滚动
    scroll(pos) {
      if (pos.y < SCROLLTOP) {
        this.bgWhite = true
      } else {
        this.bgWhite = false
      }
      // 滚动到底部多少距离的时候，动态加载数据
      this.scrollBottom = pos.y
      let num = -this.$refs.shopList.clientHeight
      if (this.scrollBottom < num + GETMOREDATA) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    // 点击rankType 还在不同的商铺并且商铺列表滚到头部
    scrollToTop() {
      let h = this.$refs.shopList.offsetTop
      let scrollH = -h + SEARCHBARHEIGHT
      this.$refs.scroll.scrollTo(0, scrollH)
    },
    // rankType改变，重新请求接口信息
    changeRankType(newData) {
      this.rankType = newData
      this.shopData = []
      this.page = 1
      this._getShop(this.rankType, this.page, this.address)
    },
    // 滚动加载
    getMoreData() {
      if (this.flag) {
        console.log(this.page)
        this.page += 1
        this._getShop(this.rankType, this.page, this.address)
      }
    },
    // 监听子组件点击事件
    selectRankType() {
      this.scrollToTop()
    },
    ...mapMutations({
      setShop: 'SET_SHOP'
    })
  },
  components: {
    SearchBar,
    Slider,
    Seckill,
    Scroll,
    Shop,
    Load
  },
  watch: {
    rankType(newData) {
      this.rankType = newData
    },
    flag() {
      this.getMoreData()
    }
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
      width: 100%;
      display:block;
      font-size:$font-size-small-s;
      padding-top: 8px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.load-wrap{
  margin-top:30px;
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
