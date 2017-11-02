<template>
<div id="map">
  <input type="text" ref="searchText" id="searchText" placeholder="请输入地址" /><span @click="keyUpSearch">搜索</span>
  <div id="container" style="width:100%; height:88%"></div>
  <div id="panel"></div>
</div>
</template>

<script>
//  var geolocation, markers
var map
//  var poisArrr
var num = []
var numIndex = 0
export default {
  components: {},
  mounted: function() {
    let _this = this
    let promise = new Promise(function(resolve, reject) {
      _this.init()
      resolve()
    })
    promise.then(function() {
    })
  },
  data() {
    return {
      center: [],
      num: num,
      searchData: []
    }
  },
  methods: {
    init: function() {
      map = new AMap.Map('container', {
        center: [121.5463, 29.80923],
        resizeEnable: false,
        zoom: 12
      })
      this.center = map.center
      AMap.plugin(['AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.ToolBar'],
        function() {
          map.addControl(new AMap.ToolBar())
        })
    },
    keyUpSearch() {
      var txt = this.$refs.searchText.value
      AMap.service(['AMap.PlaceSearch'], function() {
        var placeSearch = new AMap.PlaceSearch({ // 构造地点查询类
          pageSize: 5,
          pageIndex: 1,
          city: '010', // 城市
          map: map,
          panel: 'panel'
        })
        console.log(txt)
        console.log(placeSearch)
        // let cpoint = [121.5463, 29.80923]
        placeSearch.search(txt)
      })
    },
    demo: function() {
      numIndex++
      if (numIndex > 4) {
        if (this.num.length > 0) {
          return map.clearMap() // 清除地图覆盖物
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
    height: 300px;
}
#map {
    position: absolute;
    padding: 0;
    width: 100%;
    height: 300px;
    background: #FFFFFF;
}
</style>
