import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueResource from 'vue-resource'
import 'common/stylus/index.styl'
import 'common/stylus/iconfont.css'
import 'lib-flexible/flexible'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
let createMap = () => {
  const promise = new Promise(function (resolve, reject) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://webapi.amap.com/maps?v=1.3&key=1f648c12a2709a14b0e79551fdc5f791'   // 高德地图
    document.body.appendChild(script)
    if (script.nodeName === 'SCRIPT') {
      resolve()
    } else {
      reject(new Error('Could not script image at ' + script.src))
    }
  })
  return promise
}
createMap().then(function () {
  console.log('读取高德地图成功')
  // 加載當前的ip定位
}).catch(function (error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error)
})
