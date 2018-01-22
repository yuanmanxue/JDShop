/**
 * @Author: yuanmanxue
 * @Date:   2017-11-02 01:23:14
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2018-01-22 01:03:17
 */

import {commonParams} from './config.js'
import axios from 'axios'
export function getShopDetail(storeId, promotLable, catId, page, address) {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 150969839421253,
    body: {
      'ref': 'index/LID:7',
      'key': '',
      'catId': catId,
      'storeId': storeId,
      'sortType': 1,
      'page': page,
      'pageSize': 10,
      'promotLable': promotLable,
      'cartUuid': ''
    },
    format: 'json',
    lng: address.location.lng,
    lat: address.location.lat,
    city_id: address.citycode,
    functionId: 'productsearch/search'
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function storeDetail(storeId, address) {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 15096005407443,
    body: {
      'storeId': storeId,
      'skuId': '',
      'activityId': '',
      'promotionType': '',
      'longitude': address.location.lng,
      'latitude': address.location.lat
    },
    format: 'json',
    lng: address.location.lng,
    lat: address.location.lat,
    city_id: address.citycode,
    functionId: 'store/storeDetailV220'
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
