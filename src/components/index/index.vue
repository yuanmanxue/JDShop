<template>
<div class="index-wrap">
  <!-- 搜索框 -->
  <SearchBar ref="searchBar"
            :fold="bgWhite"
            :storeSortTexts="storeSortTexts"
            :rankType="rankType"
            @change-rank-type="changeRankType">
  </SearchBar>
  <div class="scroll" ref="scrollWrap">
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
        <div class="load-wrap" v-show="!shopData">
          <load></load>
        </div>
        <div ref="shopList">
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
import {mapMutations} from 'vuex'
import {createShop} from 'common/js/shop'

const SCROLLTOP = -115
const SEARCHBARHEIGHT = 56
export default {
  data() {
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
    this._getSlider()
    this._getShop(this.rankType)
  },
  methods: {
    _getSlider() {
      getSlider().then((res) => {
        if (res.code === ERR_OK) {
          this.storeSortTexts = res.result.config.storeSortTexts
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
    _getShop(rankType, page) {
      getShop(rankType, page).then((res) => {
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
    selectShop(shop) {
      this.shopClass.forEach((item) => {
        console.log(item.params.storeId)
        console.log(shop.floorCellData.params.storeId)
        if (item.params.storeId === shop.floorCellData.params.storeId) {
          this.setShop(item)
          this.$router.push({
            path: `/index/${item.params.storeId}`
          })
        }
      })
    },
    _normalizeShop(list) {
      let ret = []
      list.forEach((item) => {
        let {floorCellData} = item
        ret.push(createShop(floorCellData))
      })
      return ret
    },
    scroll(pos) {
      if (pos.y < SCROLLTOP) {
        this.bgWhite = true
      } else {
        this.bgWhite = false
      }
      // 滚动到底部多少距离的时候，动态加载数据
      this.scrollBottom = pos.y
      let flag = -this.$refs.shopList.clientHeight
      if (this.scrollBottom < flag) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    scrollToTop() {
      let h = this.$refs.shopList.offsetTop
      let scrollH = -h + SEARCHBARHEIGHT
      this.$refs.scroll.scrollTo(0, scrollH)
    },
    changeRankType(newData) {
      this.rankType = newData
      this.shopData = []
      this.page = 1
      this._getShop(this.rankType, this.page)
    },
    getMoreData() {
      if (this.flag) {
        console.log(this.page)
        this.page += 1
        this._getShop(this.rankType, this.page)
      }
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
    rankType() {
      this.scrollToTop()
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
