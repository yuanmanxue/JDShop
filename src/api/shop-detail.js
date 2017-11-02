import {commonParams} from './config.js'
import axios from 'axios'
export function getShopDetail(storeId) {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 15096005407443,
    body: {
      'storeId': storeId,
      'skuId': '',
      'activityId': '',
      'promotionType': '',
      'longitude': 121.5463,
      'latitude': 29.80923
    },
    format: 'json',
    lng: 121.5463,
    lat: 29.80923,
    city_id: 1158,
    functionId: 'productsearch/search'
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function storeDetail(storeId) {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 15096005407443,
    body: {
      'storeId': storeId,
      'skuId': '',
      'activityId': '',
      'promotionType': '',
      'longitude': 121.5463,
      'latitude': 29.80923
    },
    format: 'json',
    lng: 121.5463,
    lat: 29.80923,
    city_id: 1158,
    functionId: 'store/storeDetailV220'
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
