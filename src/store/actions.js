/**
 * @Author: yuanmanxue
 * @Date:   2017-11-02 10:34:17
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2018-01-19 02:34:40
 */

import * as types from './mutation-type'
// 添加商品
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
    if (food.skuId === item.skuId && item.catId === food.catId) {
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
// 减少商品
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
// 连接商品列表，缓存商品数据
export const connectShopList = function ({commit, state}, list) {
  let shopList = deepClone(state.shopList.slice().concat(list))
  let addList = []
  shopList.forEach((item) => {
    if (item.count > 0) {
      addList.push(item)
    }
  })
  let res = shopList.map((i) => {
    return JSON.stringify(i)
  })
  let result = unique(res)
  shopList = result.map((i) => {
    return JSON.parse(i)
  })
  console.log(addList);
  shopList.forEach((item) => {
    addList.forEach((_item) => {
      if (item.skuId === _item.skuId) {
        item.count = _item.count
      }
    })
  })
  let res2 = shopList.map((i) => {
    return JSON.stringify(i)
  })
  let result2 = unique(res2)
  shopList = result2.map((i) => {
    return JSON.parse(i)
  })
  commit(types.SET_SHOPLIST, shopList)
}
// 当前页面中展示的商品数据
export const setCurrentShopListFn = function({commit, state}, list) {
  let arr = []
  let shopList = deepClone(state.shopList)
  // let currentList = state.currentShopList.slice()
  let res = shopList.map((i) => {
    return JSON.stringify(i)
  })
  let result = unique(res)
  shopList = result.map((i) => {
    return JSON.parse(i)
  })
  shopList.forEach((item) => {
    list.forEach((listItem) => {
      if (item.skuId === listItem.skuId && item.catId === listItem.catId) {
        arr.push(item)
      }
    })
  })
  let res2 = arr.map((i) => {
    return JSON.stringify(i)
  })
  let result2 = unique(res2)
  arr = result2.map((i) => {
    return JSON.parse(i)
  })
  commit(types.SET_CURRENT_SHOPLIST, arr)
}
// 购物车中的商品
export const addCartListFn = function({commit, state}, storeId) {
  let list = state.shopList.slice()
  console.log(storeId)
  let ret = []
  list.forEach((item) => {
    if (item.count > 0) {
      if (item.storeId === storeId) {
        ret.push(item)
      }
    }
  })
  commit(types.SET_ADDCAT_LIST, ret)
}
// 清空购物车
export const delectCartListFn = function({commit, state, shop}) {
  let list = state.addCatList.slice()
  let shopList = deepClone(state.shopList)
  let currentList = deepClone(state.currentShopList)
  console.log(currentList);
  let _shop = Object.assign({}, state.shop)
  shopList.forEach((item) => {
    if (item.count > 0) {
      if (item.storeId === _shop.params.storeId) {
        item.count = 0
      }
    }
  })
  commit(types.SET_SHOPLIST, shopList)
  currentList.forEach((item) => {
    if (item.count > 0) {
      if (item.storeId === _shop.params.storeId) {
        item.count = 0
      }
    }
  })
  commit(types.SET_CURRENT_SHOPLIST, currentList)
  list.forEach((item) => {
    if (item.count > 0) {
      if (item.storeId === _shop.params.storeId) {
        list.splice(item)
      }
    }
  })
  commit(types.SET_ADDCAT_LIST, list)
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
// 深拷贝数组
function deepClone (array) {
  var temp = array instanceof Array ? [] : {};
  for (var k in array) {
    if (typeof array[k] === 'object'){
      temp[k] = deepClone(array[k])
    } else {
        temp[k] = array[k];
    }
  }
  return temp;
}
