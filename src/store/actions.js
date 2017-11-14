import * as types from './mutation-type'
// function findIndex(list, food) {
//   return list.findIndex((item) => {
//     return item.skuId === food.skuId
//   })
// }
export const changeCount = function ({commit, state}, food) {
  // let shopList = state.shopList
  // let i = findIndex(shopList, food[index])
  // shopList[i] = food[index]
  commit(types.SET_SHOPLIST, food)
}
