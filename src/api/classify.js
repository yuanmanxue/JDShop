/**
 * @Author: yuanmanxue
 * @Date:   2017-11-17 03:46:05
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2018-01-22 01:57:24
 */

import {commonParams} from './config.js'
import axios from 'axios'
export function getClassifyList (address) {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 15109046177372,
    body: {
      'cityId': 1158,
      'longitude': address.location.lng,
      'latitude': address.location.lat
    },
    format: 'json',
    functionId: 'homeSearch/tabCateList'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
