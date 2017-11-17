import * as types from './mutation-type'
// function findIndex(list, food) {
//   return list.findIndex((item) => {
//     return item.skuId === food.skuId
//   })
// }
export const changeCount = function ({commit, state}, food) {
  let shopList = state.shopList.slice()
  shopList.forEach((item) => {
    if (food.skuId === item.skuId) {
      item.count = food.count
    }
  })
  // shopList[i] = food[index]
  commit(types.SET_SHOPLIST, shopList)
}
export const connectShopList = function ({commit, state}, list) {
  // let shopList = state.shopList.slice()
  // let arr = shopList.concat(list)
  commit(types.SET_SHOPLIST, list)
}
