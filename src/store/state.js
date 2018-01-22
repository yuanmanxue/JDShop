/**
 * @Author: yuanmanxue
 * @Date:   2017-11-02 10:35:21
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2018-01-22 01:06:50
 */

const state = {
  shop: {},
  shopList: [],
  currentTagTitle: '',
  currentShopList: [],
  totalCount: '',
  addCatList: [],
  address: {
    name: '华贸.学府一号（北门）',
    address: '钱湖南路666号',
    cityname: '宁波',
    citycode: '0574',
    location: {
      M: 121.56090899999998,
      O: 29.809225,
      lat: 29.809225,
      lng: 121.560909
    }

  }
}
export default state
// shop 店铺信息
// currentShopList 当前应该加载的列表的数据
// shopList 所有加载过列表的元素
// currentTagTitle 当前列表的标签
// totalCount 当前列表一共有多少数据
// addCatList购物车列表
// address 定位对象
