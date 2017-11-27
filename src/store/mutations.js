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
  },
  [types.SET_CURRENT_SHOPLIST](state, currentShopList) {
    state.currentShopList = currentShopList
  },
  [types.SET_ADDCAT_LIST](state, addCatList) {
    state.addCatList = addCatList
  }
}
export default mutations
// function deepClone(initalObj, finalObj) {
//   var obj = finalObj || {}
//   for (var i in initalObj) {
//       var prop = initalObj[i]
//       // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
//       if (prop === obj) {
//           continue
//       }
//       if (typeof prop === 'object') {
//           obj[i] = (prop.constructor === Array) ? [] : Object.create(prop)
//       } else {
//           obj[i] = prop
//       }
//   }
//   console.log(obj === initalObj)
//   return obj
// }
