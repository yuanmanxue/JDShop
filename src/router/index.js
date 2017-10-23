import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index.vue'
import Classify from '@/components/classify/classify.vue'
import ShoppingCart from '@/components/shopping-cart/shopping-cart.vue'
import Indent from '@/components/indent/indent.vue'
import Mine from '@/components/mine/mine.vue'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
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
    }
  ]
})
