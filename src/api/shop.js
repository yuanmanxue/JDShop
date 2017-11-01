import {commonParams} from './config.js'
import axios from 'axios'
export function getShop (rankType, page) {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 15089800793514,
    body: {
      'channelId': '',
      'city': '宁波市',
      'longitude': 121.5463,
      'latitude': 29.80923,
      'currentPage': page,
      'pageSize': 10,
      'arrCode': 1158,
      'coordType': '2',
      'platform': '1',
      'rankType': rankType
    },
    format: 'json',
    lng: 121.5463,
    lat: 29.80923,
    city_id: 1158,
    functionId: 'zone/recommendStoreList'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
