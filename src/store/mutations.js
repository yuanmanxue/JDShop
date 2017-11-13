import * as types from './mutation-type'

const mutations = {
  [types.SET_SHOP](state, shop) {
    state.shop = shop
  },
  [types.SET_SHOPCOUNT](state, shopCount) {
    state.shopCount = shopCount
  }
}
export default mutations
