import originJSONP from 'jsonp'
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  console.log(url)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        console.log('success')
        resolve(data)
      } else {
        console.log('error')
        reject(err)
      }
    })
  })
}
function param(data) {
  let url = ' '
  for (var k in data) {
    if (typeof data[k] === 'object') {
      data[k] = param(data[k])
    }
    let value = data[k] !== undefined ? data[k] : ' '
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ' '
}
