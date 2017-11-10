<template>
  <Scroll class="tag-scroll">
    <div class="tagWrap">
      <ul class="activity">
        <li v-for="(item, index) in tags"  v-if="index <= (show?index:indexNum)"><IconText class="activity-tag" :tagsText="item.iconText" :tagsType="item.type" @click="toggleShow($event)"></IconText><span class="activity-text">{{matchStr(item.words)}}</span></li>
      </ul>
    </div>
  </Scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import IconText from 'base/iconText/iconText'
export default {
  data() {
    return {
      myShow: this.show
    }
  },
  props: {
    tags: {
      type: Array,
      default: null
    },
    show: {
      type: Boolean,
      default: null
    },
    indexNum: {
      type: Number,
      default: 1
    }
  },
  computed: {

  },
  methods: {
    matchStr(str) {
      let reg = new RegExp(/[^%&',;=?$#\x22]+/g)
      let newStr = str.match(reg).join(',')
      return newStr
    },
    toggleShow(e) {
      // let event = e || window.e
      this.myShow = !this.myShow
    }
  },
  created() {

  },
  components: {
    IconText,
    Scroll
  },
  watch: {
    tags: function(newData, oldData) {
      this.tags = newData
    },
    show: function(newData, oldData) {
      this.show = newData
    },
    myShow: function(newData, oldData) {
      this.$emit('on-toggle-show', newData)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .tagWrap{
      // margin-top: .2rem;
  }
  .activity{
    line-height: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size:$font-size-small-s
    li{
      overflow: hidden;
      height: 25px;
    }
    .activity-tag{
      float:left;
      border-radius:5px;
      color:$color-text-white
      font-style:normal;
      padding:2px 4px;
      margin-right:10px;
    }
    .activity-text{
      float:left;
      width: 80%;
      height: 20px;
      line-height: 20px;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
