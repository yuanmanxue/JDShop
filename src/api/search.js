/**
 * @Author: yuanmanxue
 * @Date:   2017-11-30 04:32:51
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2018-01-22 11:08:41
 */

import {commonParams} from './config.js'
import axios from 'axios'
import qs from 'qs'
export function getHotTag (address) {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 15120307333393,
    body: {
      'size': 12,
      'type': 2,
      'cityId': address.citycode,
      'longitude': address.location.lng,
      'latitude': address.location.lat,
      'storeIds': [],
      'channelId': ''
    },
    format: 'json',
    functionId: 'hotWords/list'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getHotTagShopList (address) {
  let n = new Date().getTime()
  n = n + '' + Math.round(Math.random() * 10)
  console.log(n)
  const url = '/api/postSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 151244118655022,
    body: {
      'ref': 'homeCategorySearch/LID:13',
      'longitude': address.location.lng,
      'latitude': address.location.lat,
      'type': 2,
      'key': '牛奶',
      'industryTags': [],
      'catIds': [{
        'categoryId': 20315,
        'level': 3
      }, {
        'categoryId': 20340,
        'level': 3
      }],
      'sortType': 1,
      'page': 1,
      'pageSize': 5,
      'storeIds': [],
      'promotLabels': '',
      'discountRange': '',
      'serviceNo': 1512354148707,
      'areaId': 1158
    },
    format: 'json',
    lng: address.location.lng,
    lat: address.location.lat,
    city_id: address.citycode,
    poi: address.address,
    functionId: 'homeSearch/searchByStorePostV_230',
    jda: '122270672.15026908052541027638351.1502690805.1510189899.1512112974.11'
  })
  console.log(param(data))
  return axios.post(url, param(data)).then((res) => {
    return Promise.resolve(res.data)
  })
}
function param(data) {
  let result = ''
  for (var k in data) {
    if (typeof data[k] === 'object') {
      data[k] = JSON.stringify(data[k])
      // console.log(encodeURIComponent(data[k]))
    }
      result = qs.stringify(data)
  }
  return result
}
