<template>
<div class="amap-page-container map-wrap">
  <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
  <el-amap vid="amapDemo" :center="center" :map-manager="AMapManager" :zoom="zoom" :events="events" class="amap-demo">
    <!-- <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker> -->
  </el-amap>
</div>
</template>

<script type="text/ecmascript-6">
import {AMapManager} from 'vue-amap'
export default {
  data() {
    return {
      zoom: 12,
      center: [121.5463, 29.80923],
      AMapManager,
      markers: [
        [121.59996, 31.197646],
        [121.40018, 31.197622],
        [121.69991, 31.207649]
      ],
      searchOption: {
        city: '宁波',
        citylimit: true
      },
      events: {
        init(o) {
          console.log(o)
          let marker = new AMap.Marker({
            position: [121.5463, 29.80923]
          })
          marker.setMap(o)
        }
      }
    }
  },
  methods: {
    add() {
      let o = AMapManager.getMap()
      let marker = new AMap.Marker({
        position: [121.59996, 31.177646]
      })
      marker.setMap(o)
    },
    addMarker: function() {
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000
      this.markers.push([lng, lat])
    },
    onSearchResult(pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          let {
            lng,
            lat
          } = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
.map-wrap{
  width: 100%;
  height: 500px;
}
</style>
