export default class Shop {
  constructor({params, name, imgUrl, title, deliveryFirst, storeStar}) {
    this.params = params
    this.name = name
    this.imgUrl = imgUrl
    this.title = title
    this.deliveryFirst = deliveryFirst
    this.storeStar = storeStar
  }
}
export function createShop(data) {
  return new Shop({
    params: data.params,
    name: data.name,
    imgUrl: data.imgUrl,
    title: data.title,
    deliveryFirst: data.deliveryFirst,
    storeStar: data.storeStar
  })
}
