import * as types from './mutation-type'

const mutations = {
  [types.SET_SHOP](state, shop) {
    state.shop = shop
  },
  [types.SET_SHOPLIST](state, shopList) {
    state.shopList = shopList
  }
}
export default mutations
