
/**
 * Created by Administrator on 2017/8/25.
 */
// import jsonp from 'common/js/jsonp'
import {commonParams} from './config.js'
import axios from 'axios'
export function getSlider () {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    body: {
      'address': '学府一号',
      'city': '杭州市',
      'longitude': 121.5463,
      'latitude': 29.80923,
      'coordType': '2',
      'h5From': '',
      'isglb': '',
      'currentPage': '',
      'storeId': '',
      'activityId': ''
    },
    format: 'json',
    lng: 121.5463,
    lat: 29.80923,
    city_id: 1158,
    functionId: 'indexh5/getIndex'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
