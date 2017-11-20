import * as types from './mutation-type'
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
//   return obj
// }
export const addCountFn = function ({commit, state}, food) {
  let list = state.shopList.slice()
  list.forEach((item) => {
    if (food.skuId === item.skuId) {
      if (!item.count) {
        item.count = 1
      } else {
        item.count ++
      }
    }
  })
  commit(types.SET_SHOPLIST, list)
}
export const decrCountFn = function ({commit, state}, food) {
  let list = state.shopList.slice()
  list.forEach((item) => {
    if (food.skuId === item.skuId) {
      if (!item.count) {
        item.count = 0
      } else {
        item.count --
      }
    }
  })
  commit(types.SET_SHOPLIST, list)
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
  let arr = []
  shopList.forEach((item) => {
    if (item.promotLabel === list[0].promotLabel && item.catId === list[0].catId) {
      arr.push(item)
    }
  })
  commit(types.SET_CURRENT_SHOPLIST, arr)
}
// export const setCurrentShopListFn = function ({commit, state}, list) {
//   commit(types.SET_CURRENT_SHOPLIST, list)
// }
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
