class ClassifyTag {
 constructor({catId, cateActivityList, groupList, title, user_action}) {
   this.catId = catId
   this.cateActivityList = cateActivityList
   this.groupList = groupList
   this.title = title
 }
}
export function createClassifyTag(data) {
 return new ClassifyTag({
   params: data.catId,
   cateActivityList: data.cateActivityList,
   groupList: data.groupList,
   title: data.name,
   user_action: data.user_action
 })
}
