/**
 * @Author: yuanmanxue
 * @Date:   2017-10-25 02:53:24
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2018-01-22 01:50:49
 */

import {commonParams} from './config.js'
import axios from 'axios'
export function getShop (rankType, page, address) {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 15089800793514,
    body: {
      'channelId': '',
      'city': address.cityname,
      'longitude': address.location.lng,
      'latitude': address.location.lat,
      'currentPage': page,
      'pageSize': 10,
      'areaCode': address.citycode,
      'coordType': '2',
      'platform': '1',
      'rankType': rankType
    },
    format: 'json',
    lng: address.location.lng,
    lat: address.location.lat,
    city_id: address.citycode,
    poi: address.name,
    functionId: 'zone/recommendStoreList'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
