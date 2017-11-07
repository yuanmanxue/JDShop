 class Shop {
  constructor({params, name, imgUrl, title, deliveryFirst, storeStar, freightWords}) {
    this.params = params
    this.name = name
    this.imgUrl = imgUrl
    this.title = title
    this.deliveryFirst = deliveryFirst
    this.storeStar = storeStar
    this.freightWords = freightWords
  }
}
export function createShop(data) {
  return new Shop({
    params: data.params,
    name: data.name,
    imgUrl: data.imgUrl,
    title: data.title,
    deliveryFirst: data.deliveryFirst,
    storeStar: data.storeStar,
    freightWords: data.freightWords
  })
}
