<!--
@Author: yuanmanxue
@Date:   2017-10-30 04:53:11
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-22 04:34:40
-->

<template>
<transition name="slide">
  <div class="map-wrap">
    <div id="map">
      <div class="map-search">
        <input type="text" ref="searchText" id="input" placeholder="请输入地址" @keyup="keyUpSearch" /><span @click="keyUpSearch">搜索</span>
        <!-- <el-amap-search-box class="search-box" :on-search-result="onSearchResult"></el-amap-search-box>
        <el-amap vid="amapDemo" :center="center" class="amap-demo">
          <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker>
        </el-amap> -->
      </div>
      <div id="container" style="width:100%; height:88%"></div>
      <Scroll ref="scroll" class="map-scroll" :data="searchData">
        <div id="panel"></div>
      </Scroll>
    </div>
  </div>
</transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
// import AMap from 'AMap'
import {lazyAMapApiLoaderInstance} from 'vue-amap'
import {mapMutations} from 'vuex'
var map, geolocation
var num = []
export default {
  mounted() {
    // null
    // console.log(lazyAMapApiLoaderInstance);
    // if (!map) {
    //   this.$router.go(-1)
    // }
    lazyAMapApiLoaderInstance.load().then(() => {
      // console.log(this);
      let self = this
      // console.log(self);
      self.init()
    })
  },
  data() {
    return {
      center: [],
      num: num,
      searchData: [],
      page: 10,
      show: false,
      txt: '',
      address: {}
    }
  },
  created() {},
  methods: {
    init: function() {
      let self = this
      map = new AMap.Map('container', {
        mapStyle: 'amap://styles/macaron',
        center: [121.5463, 29.80923],
        resizeEnable: true,
        zoom: 12
      })
      self.center = map.center
      map.addControl(new AMap.ToolBar())
      map.addControl(new AMap.Scale())
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        buttonOffset: new AMap.Pixel(10, 50),
        zoomToAccuracy: true
      })
      map.addControl(geolocation)
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', function() {
        console.log('success')
      })
      AMap.event.addListener(geolocation, 'error', function() {
        console.log('error')
      })
    },
    ...mapMutations({
      setAddress: 'SET_ADDRESS'
    }),
    keyUpSearch() {
      this._keyUpSearch()
    },
    _keyUpSearch() {
      let self = this
      var txt = this.$refs.searchText.value
      self.txt = txt
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
        var autoOptions = {
          city: txt, // 城市，默认全国
          input: 'input' // 使用联想输入的input的id
        }
        var autocomplete = new AMap.Autocomplete(autoOptions)
        var placeSearch = new AMap.PlaceSearch({
          city: txt,
          panel: 'panel',
          pageSize: 5,
          map: map
        })
        console.log(self.txt);
        AMap.event.addListener(autocomplete, 'select', function(e) {
          placeSearch.setCity(e.poi.adcode)
          // 搜索地区
          placeSearch.search(e.poi.name, function(status, result) {
            if (result.info === 'OK' && status === 'complete') {
              console.log(result)
            }
          })
        })
        AMap.event.addListener(placeSearch, 'selectChanged', function(results) {
          // 获取当前选中的结果数据
          self.address = results.selected.data
          self.goBack()
        });
      })
    },
    goBack() {
      // 在vuex里面设置定位信息
      this.setAddress(this.address)
      this.$router.go(-1)
    },
    throttle(fn, delay, text) {
      clearTimeout(fn.timeoutId);
      fn.timeoutId = setTimeout(function() {
        fn.call(text);
      }, delay);
    }
    // onSearchResult(pois) {
    //   let latSum = 0;
    //   let lngSum = 0;
    //   if (pois.length > 0) {
    //     pois.forEach(poi => {
    //       let {
    //         lng,
    //         lat
    //       } = poi;
    //       lngSum += lng;
    //       latSum += lat;
    //       this.markers.push([poi.lng, poi.lat]);
    //     });
    //     let center = {
    //       lng: lngSum / pois.length,
    //       lat: latSum / pois.length
    //     };
    //     this.mapCenter = [center.lng, center.lat];
    //   }
    // }
  },
  components: {
    Scroll
  },
  watch: {
    searchData(newData) {
      this.searchData = newData
    }
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable.styl"
.slide-enter-active, .slide-leave-active{
  transition: all .3s
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0)
}
.map-wrap{
  position: fixed;
  top: 0;
  bottom:0;
  left: 0;
  right:0;
  z-index:99;
  background-color: #ffffff;
}
#app {
    height: 50%;
}
#map {
    position: absolute;
    padding: 0;
    width: 100%;
    height: 50%;
    background: #FFFFFF;
    z-index:10;
}
.map-scroll{
  position: fixed;
  bottom:0;
  left: 0;
  right:0;
  height: 49%;
  z-index:999;
  overflow: hidden;
  background-color: #ffffff;
}
.map-search{
  height: 46px;
  width: 100%;
  border-bottom: 1px solid #eee;
  input{
    width: 80%;
    height: 30px;
    margin: 8px 2.5%;
    border-radius: 5px;
    background-color: #eee;
    font-size:$font-size-title;
    text-indent:10px;
  }
  span{
    width: 15%;
    text-align:center;
    float:right;
    height: 46px;
    line-height: 46px;
    display: inline-block;
    font-size:$font-size-title;
    color:$color-background-bule;
  }
}
.auto-item{
  padding:10px;
}
</style>
