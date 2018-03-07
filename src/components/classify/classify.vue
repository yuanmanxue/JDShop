<!--
@Author: yuanmanxue
@Date:   2017-10-23 02:57:57
@Last modified by:   yuanmanxue
@Last modified time: 2018-02-23 05:15:47
-->

<template>
  <div class="">
    <div class="search-box-wrap">
      <SearchBox></SearchBox>
    </div>
    <div class="classify-list-wrap">
      <div class="classify-list-menu">
        <menuScroll :data="classifyList" @selectMenuParent="selectMenuParent"></menuScroll>
      </div>
      <div class="classify-scroll" v-if="list">
        <Scroll class="classify-list" :dataObject="list" ref="scrollClassifyList" :probe-type="probeType" :listen-scroll="listenScroll">
          <div>
            <div v-for="item in list.groupList" class="list-group">
              <div class="name">{{item.name}}</div>
              <ul>
                <li v-for="itemChild in item.tabCateList">
                  <img v-lazy="itemChild.imgUrl" alt="">
                  <p>{{itemChild.name}}</p>
                  <!-- <p>{{item.tabCateList}}</p> -->
                </li>
              </ul>
            </div>
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
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config.js'
export default {
  data() {
    return {
      classifyList: [],
      iNum: 0,
      currentList: []
    }
  },
  props: {
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this._getClassifyList(this.address)
    // this.$nextTick(() => {
    //   this.$refs.scrollClassifyList.refresh()
    // })
  },
  computed: {
    ...mapGetters([
      'address'
    ]),
    list() {
      // this.$refs.scrollClassifyList.refresh()
      return this.classifyList[this.iNum]
    }
  },
  methods: {
    _getClassifyList(address) {
      getClassifyList(address).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res);
          this.classifyList = this._normalizeClassifyTag(res.result.firstTabCate)
        }
      })
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
    }
  },
  components: {
    SearchBox,
    menuScroll,
    Scroll
  },
  watch: {
    // list() {
    //   this.$refs.scrollClassifyList.refresh()
    // }
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
    font-size:$font-size-small;
    color:$color-text-nav;
    .name{
      text-indent:20px;
      padding: 10px 0;
    }
    ul{
      display: flex;
      flex-wrap:wrap;
      li{
        width: 33%;
        img{
          display: block;
          margin: 0 auto;
          width: 60%;
        }
        p{
          padding: 10px 0;
          text-align: center;
        }
      }
    }
  }
</style>
