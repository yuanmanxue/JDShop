/**
 * @Author: yuanmanxue
 * @Date:   2018-03-07 03:48:55
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2018-03-07 03:51:17
 */
 /**
  * Created by yuanmanxue on 2017/9/7.
  */
 var express = require('express')
 var config = require('./config/index')
 var axios = require('axios')

 var app = express()

 var apiRouter = express.Router()
 apiRouter.get('/getSlider', function (req, res) {
   var url = 'https://daojia.jd.com/client'
   axios.get(url, {
     headers: {
       'Content-Type': 'application/json;charset=utf-8',
       referer: 'https://daojia.jd.com/html/index.html',
       host: 'daojia.jd.com',
       'Cache-Control': 'max-age=0'
     },
     params: req.query
   }).then((response) => {
     res.json(response.data)
   }).catch((e) => {
     console.log(e)
   })
 })
 apiRouter.post('/postSlider', function (req, res) {
   var url = 'https://daojia.jd.com/client'
   axios.post(url, {
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
       referer: 'https://daojia.jd.com/html/index.html',
       host: 'daojia.jd.com',
       'Cache-Control': 'max-age=0',
       'x-requested-with': 'XMLHttpRequest'
     },
     data: req.query
   }).then((response) => {
     res.json(response.data)
   }).catch((e) => {
     console.log(e)
   })
 })
 app.use('/api', apiRouter)

 app.use(express.static('./dist'))

 var port = process.env.PORT || config.build.port

 module.exports = app.listen(port, function(err) {
   if (err) {
     console.log(err)
   }
   console.log('Listening at http://localhost:' + port + '\n')
 })
