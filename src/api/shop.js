import {commonParams} from './config.js'
import axios from 'axios'
export function getShop () {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 15089144900216,
    body: {
      'channelId': '',
      'city': '杭州市',
      'longitude': 121.5463,
      'latitude': 29.80923,
      'currentPage': 2,
      'pageSize': 10,
      'arrCode': 1158,
      'coordType': '2',
      'platform': '1'
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
