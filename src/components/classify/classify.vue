<template>
  <div class="">
    <div class="search-box-wrap">
      <SearchBox></SearchBox>
    </div>
    <div class="classify-list-wrap">
      <div class="classify-list-menu">
        <menuScroll :data="classifyList" @selectMenuParent="selectMenuParent"></menuScroll>
      </div>
      <div class="classify-scroll">
        <Scroll class="classify-list" v-if="list" :data="classifyList" ref="scrollClassifyList" :probe-type="probeType" :listen-scroll="listenScroll">
          <div v-for="item in list.groupList" class="list-group">
            <div>{{item.name}}</div>
            <ul>
              <li v-for="itemChild in item.tabCateList">
                <img v-lazy="itemChild.imgUrl" alt="">
                <p>{{itemChild.name}}</p>
                <!-- <p>{{item.tabCateList}}</p> -->
              </li>
            </ul>
          </div>
        </Scroll>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchBox from 'base/search-box/search-box'
import Scroll from 'base/scroll/scroll'
import menuScroll from 'base/menu-scroll/menu-scroll'
import {getClassifyList} from 'api/classify.js'
import {createClassifyTag} from 'common/js/classify.js'
import {ERR_OK} from 'api/config.js'
export default {
  data() {
    return {
      classifyList: [],
      iNum: 0
    }
  },
  props: {
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this._getClassifyList()
    // this.$nextTick(() => {
    //   this.$refs.scrollClassifyList.refresh()
    // })
  },
  computed: {
    list() {
      return this.classifyList[this.iNum]
      // return this.classifyList[this.iNum].groupList
    }
  },
  methods: {
    _getClassifyList() {
      getClassifyList().then((res) => {
        if (res.code === ERR_OK) {
          this.classifyList = this._normalizeClassifyTag(res.result.firstTabCate)
        }
      })
      // .then(() => {
      //   this.$nextTick(() => {
      //     this.$refs.scrollClassifyList.refresh()
      //   })
      // })
    },
    _normalizeClassifyTag(list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createClassifyTag(item))
      })
      return ret
    },
    scrollToTop() {
      this.$refs.scrollClassifyList.scrollTo(0, 0)
    },
    selectMenuParent(i) {
      this.iNum = i
      this.$nextTick(() => {
        this.$refs.scrollClassifyList.refresh()
        this.scrollToTop()
      })
      console.log(i)
    }
  },
  components: {
    SearchBox,
    menuScroll,
    Scroll
  },
  watch: {
    classifyList() {
      // this.$nextTick(() => {
      //   this.$refs.scrollClassifyList.refresh()
      // })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .search-box-wrap{
    position: fixed;
    top:0;
    left:0;
    right:0;
  }
  .classify-list-wrap{
    position: fixed;
    top:40px;
    bottom:51px;
    left:0;
    right:0;
    background-color: #ffffff;
    border-top: 1px solid #ddd;
    z-index:120;
  }
  .classify-list{
    position: absolute;
    top:0px;
    bottom:0px;
    left:84px;
    right:0;
    overflow: hidden;
  }
</style>
