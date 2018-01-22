<!--
@Author: yuanmanxue
@Date:   2017-11-30 03:37:15
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-22 11:08:03
-->

<template>
  <div class="search-detail-wrap">
    <!-- 搜索框 -->
    <div class="search-wrap">
      <div class="go-back" @click="goBack"><i class="iconfont">&#xe50d;</i></div>
      <div class="search-detail">
        <SearchBox @updata:val="newVal => ss = newVal"></SearchBox>
      </div>
    </div>
    <ul class="hot-words-wrap">
      <li v-for="item in hotWords">{{item.hotWords}}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import SearchBox from 'base/search-box/search-box'
import {getHotTag, getHotTagShopList} from 'api/search.js'
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config.js'
export default {
  data() {
    return {
      hotWords: []
    }
  },
  created() {
    this._getHotTag(this.address)
    this._getHotTagShopList(this.address)
  },
  computed:{
    ...mapGetters([
      'address'
    ])
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    _getHotTag(address) {
      getHotTag(address).then((res) => {
        if (res.code === ERR_OK) {
          this.hotWords = res.result.hotWordVOList
        }
      })
    },
    _getHotTagShopList(address) {
      getHotTagShopList(address).then((res) => {
        console.log(res)
      })
    }
  },
  components: {
    SearchBox
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .search-detail-wrap{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    z-index:100;
  }
  .search-wrap{
      display: flex;
      height: 41px;
      .go-back{
        width: .8rem;
        line-height: 41px;
        background-color: #eee;
        border-bottom: 1px solid #ddd;
        i{
          display: inline-block;
          width: .8rem;
          text-align: center;
          height:41px;
          position: absolute;
          top:0;
          left:0;
          font-size:$font-size-large;
        }
      }
      .search-detail{
        flex:auto;
      }
    }
  .hot-words-wrap{
    display: flex;
    flex-wrap:wrap;
    padding:.13333333rem .53333333rem;
    li{
      box-sizing:border-box;
      width: 22.5%;
      font-size:$font-size-title;
      text-align: center;
      padding:.15333333rem 0;
      margin:.26666667rem 1.25%;
      margin-bottom: 0;
      border:1px solid #eee;
      border-radius:5px;
    }
  }
</style>
