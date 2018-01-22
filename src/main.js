/**
 * @Author: yuanmanxue
 * @Date:   2017-10-20 04:58:18
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2018-01-22 03:16:41
 */

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
// import AMap from 'vue-amap'
import AMap from 'vue-amap'
import router from './router'
import Vuelazyload from 'vue-lazyload'
import fastclick from 'fastclick'
import VueResource from 'vue-resource'
import 'common/stylus/index.styl'
import 'common/stylus/iconfont.css'
import 'lib-flexible/flexible'
import store from './store'
// import Element  from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueResource)
Vue.use(AMap)
// Vue.use(Element, { size: 'small' })
// Vue.prototype.$ELEMENT = { size: 'small' }
// Vue.use(Element)
// Vue.use(Select)
// Vue.use(Checkbox)
Vue.use(Vuelazyload, {
  loading: require('common/images/newLoading.gif')
})
Vue.use(VueAwesomeSwiper)
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
