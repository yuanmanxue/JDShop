import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index.vue'
import Classify from '@/components/classify/classify.vue'
import ShoppingCart from '@/components/shopping-cart/shopping-cart.vue'
import Indent from '@/components/indent/indent.vue'
import ShopDetail from '@/components/shop-detail/shop-detail.vue'
import Mine from '@/components/mine/mine.vue'
import Map from 'base/map/map'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [{
        path: ':id',
        component: ShopDetail
      }]
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/shoppingcart',
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/indent',
      name: 'Indent',
      component: Indent
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    }
  ]
})
