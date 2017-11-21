import * as types from './mutation-type'
export const addCountFn = function ({commit, state}, food) {
  let list = state.shopList.slice()
  let res = list.map((i) => {
    return JSON.stringify(i)
  })
  let result = unique(res)
  list = result.map((i) => {
    return JSON.parse(i)
  })
  list.forEach((item) => {
    if (food.skuId === item.skuId) {
      if (!food.count) {
        food.count = 1
      } else {
        food.count ++
      }
      item = Object.assign(item, food)
    } else {
      return false
    }
  })
  commit(types.SET_SHOPLIST, list)
  let arr = []
  list.forEach((item) => {
    if (item.promotLabel === food.promotLabel && item.catId === food.catId && item.storeId === food.storeId) {
      arr.push(item)
    }
  })
  commit(types.SET_CURRENT_SHOPLIST, arr)
}
export const decrCountFn = function ({commit, state}, food) {
  let list = state.shopList.slice().concat(food)
  let res = list.map((i) => {
    return JSON.stringify(i)
  })
  let result = unique(res)
  list = result.map((i) => {
    return JSON.parse(i)
  })
  list.forEach((item) => {
    if (food.skuId === item.skuId) {
      if (!food.count) {
        food.count = 0
      } else {
        food.count --
      }
      item = Object.assign(item, food)
    } else {
      return false
    }
  })
  commit(types.SET_SHOPLIST, list)
  let arr = []
  list.forEach((item) => {
    if (item.promotLabel === food.promotLabel && item.catId === food.catId && item.storeId === food.storeId) {
      arr.push(item)
    }
  })
  commit(types.SET_CURRENT_SHOPLIST, arr)
}
export const connectShopList = function ({commit, state}, list) {
  let shopList = state.shopList.slice().concat(list)
  let res = shopList.map((i) => {
    return JSON.stringify(i)
  })
  let result = unique(res)
  shopList = result.map((i) => {
    return JSON.parse(i)
  })
  commit(types.SET_SHOPLIST, shopList)
}
export const setCurrentShopListFn = function({commit, state}, list) {
  let arr = []
  let shopList = state.shopList.slice()
  let res = shopList.map((i) => {
    return JSON.stringify(i)
  })
  let result = unique(res)
  shopList = result.map((i) => {
    return JSON.parse(i)
  })
  shopList.forEach((item) => {
    list.forEach((listItem) => {
      if (item.skuId === listItem.skuId) {
        arr.push(item)
      }
    })
  })
  // for (let i = 0; i < arr.length; i++) {
  //       for (let j = i + 1; j < arr.length; j++) {
  //         console.table(arr)
  //           if (arr[i].skuId === arr[j].skuId) {
  //               arr.splice(j, 1)
  //               i--
  //           }
  //       }
  //   }
  commit(types.SET_CURRENT_SHOPLIST, arr)
}
// json数组对象去重
function unique(arr) {
    var ret = []
    for (var i = 0, j = arr.length; i < j; i++) {
        if (ret.indexOf(arr[i]) === -1) {
            ret.push(arr[i])
        }
    }
    return ret
}
