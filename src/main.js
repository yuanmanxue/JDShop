import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import AMap from 'vue-amap'
import router from './router'
import Vuelazyload from 'vue-lazyload'
import fastclick from 'fastclick'
import VueResource from 'vue-resource'
import 'common/stylus/index.styl'
import 'common/stylus/iconfont.css'
import 'lib-flexible/flexible'
import store from './store'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueResource)
Vue.use(AMap)
Vue.use(Vuelazyload, {
  loading: require('common/images/newLoading.gif')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '1f648c12a2709a14b0e79551fdc5f791',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MouseTool', 'AMap.Geolocation']
})
