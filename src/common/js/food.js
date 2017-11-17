class Food {
 constructor({realTimePrice, storeId, venderId, skuId, imgUrl, skuName, monthSales, highOpinion, tags, basicPrice, count, promotLabel, catId}) {
   this.realTimePrice = realTimePrice
   this.storeId = storeId
   this.venderId = venderId
   this.skuId = skuId
   this.imgUrl = imgUrl
   this.skuName = skuName
   this.monthSales = monthSales
   this.highOpinion = highOpinion
   this.tags = tags
   this.basicPrice = basicPrice
   this.count = 0
   this.promotLabel = promotLabel
   this.catId = catId
 }
}
export function createFood(data, promotLabel) {
 return new Food({
   realTimePrice: data.realTimePrice,
   storeId: data.storeId,
   venderId: data.venderId,
   skuId: data.skuId,
   imgUrl: data.imgUrl,
   skuName: data.skuName,
   monthSales: data.monthSales,
   highOpinion: data.highOpinion,
   tags: data.tags,
   basicPrice: data.basicPrice,
   count: data.count,
   promotLabel: promotLabel,
   catId: data.catId
 })
}
