/**
 * @Author: yuanmanxue
 * @Date:   2017-11-17 03:46:05
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2017-12-07 08:52:59
 */

import {commonParams} from './config.js'
import axios from 'axios'
export function getClassifyList () {
  const url = '/api/getSlider'
  const data = Object.assign({}, commonParams, {
    _djrandom: 15109046177372,
    body: {
      'cityId': '1158',
      'longitude': 121.5463,
      'latitude': 29.80923
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
