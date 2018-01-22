/**
 * @Author: yuanmanxue
 * @Date:   2017-10-24 09:51:16
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2018-01-22 01:56:43
 */

/**
 * Created by Administrator on 2017/8/25.
 */
// import jsonp from 'common/js/jsonp'
import {commonParams} from './config.js'
import axios from 'axios'
export function getSlider (address) {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    body: {
      'address': address.name,
      'city': address.cityname,
      'longitude': address.location.lng,
      'latitude': address.location.lat,
      'coordType': '2',
      'h5From': '',
      'isglb': '',
      'currentPage': '',
      'storeId': '',
      'activityId': ''
    },
    format: 'json',
    lng: address.location.lng,
    lat: address.location.lat,
    functionId: 'indexh5/getIndex'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
