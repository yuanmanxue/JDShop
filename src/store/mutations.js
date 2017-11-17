import * as types from './mutation-type'

const mutations = {
  [types.SET_SHOP](state, shop) {
    state.shop = shop
  },
  [types.SET_SHOPLIST](state, shopList) {
    state.shopList = shopList
  },
  [types.SET_CURRENT_TAGTITLE](state, currentTagTitle) {
    state.currentTagTitle = currentTagTitle
  },
  [types.SET_TOTAL_COUNT](state, totalCount) {
    state.totalCount = totalCount
  }
}
export default mutations
