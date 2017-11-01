<template>
  <div class="search-bar-wrap">
    <div class="search-bar" ref="searchBar">
      <div class="position" ref="position" @click="goToMap"><i class="iconfont">&#xe613;</i><span>学府一号学府一号学府一号学府一号</span><i class="iconfont">&#xe501;</i></div>
      <div class="search-box" v-show="!this.fold"><i class="iconfont search-icon">&#xe612;</i><input type="text" name="" value=""></div>
      <div class="message"><i class="iconfont">&#xe602;</i></div>
      <div class="message messages-search" v-show="this.fold"><i class="iconfont">&#xe612;</i></div>
      <div class="message messages-sort" v-show="this.fold" @click="toggleRankType"><i class="iconfont">&#xe689;</i></div>
      <ul class="rank-type" v-show="this.rankShow && this.fold">
        <li v-for="(items,index) in storeSortTexts" :class="rankType===index ? 'active' : ''" @click="selectRankType(index)">{{items.text}}</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data() {
    return {
      rankShow: false,
      myRankType: this.rankType
    }
  },
  props: {
    fold: {
      type: Boolean,
      default: false
    },
    storeSortTexts: {
      type: Array,
      default: null
    },
    rankType: {
      type: Number,
      defalut: 0
    }
  },
  created() {
  },
  methods: {
    goToMap() {
      this.$router.push({path: './map'})
    },
    // 当页面像上面滚动到一定距离的时候，改变搜索框的样式
    setSearchBarBg() {
      if (this.fold) {
        this.$refs.searchBar.style.backgroundColor = '#ffffff'
        this.$refs.searchBar.style.color = '#666666'
      } else {
        this.$refs.searchBar.style.backgroundColor = 'rgba(255,255,255,0)'
        this.$refs.searchBar.style.color = '#fff'
      }
    },
    toggleRankType() {
      if (!this.fold) {
        this.rankShow = false
      }
      this.rankShow = !this.rankShow
    },
    selectRankType(index) {
      this.myRankType = index
      this.rankShow = !this.rankShow
    }
  },
  watch: {
    fold(newData) {
      this.fold = newData
      if (!this.fold) {
        this.rankShow = false
      }
      this.setSearchBarBg()
    },
    storeSortTexts(newData) {
      this.storeSortTexts = newData
      console.log(this.storeSortTexts)
    },
    myRankType(newData) {
      this.$emit('change-rank-type', newData)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .search-bar{
    position: fixed;
    top: 0;
    z-index:999;
    width: 100%;
    height: 56px;
    line-height: 56px;
    padding:0 10px;
    display: flex;
    font-size:$font-size-small;
    // background: url(./search-bg.png) no-repeat 0 0 ;
    background-size: 100%;
    color:$color-text-white;
    i{
      font-size:$font-size-icon;
      padding-right: 4px;
    }
    .position{
      max-width: 130px;
      display: flex;
      span{
        display: inline-block;
        flex:auto;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .search-box{
      flex:auto;
      padding-right: 15px;
      margin-right:40px;
      position: relative;
      input{
        text-indent:30px;
        width: 100%;
        height: 30px;
        display: inline-block;
        border-radius:15px;
        background: rgba(255,255,255,0.35);
      }
      .search-icon{
        position: absolute;
        left: 5px;
        top: 0;
        width: 20px;
        height: 30px;
        font-size:$font-size-icon;
      }
    }
    .message{
      position: absolute;
      right:20px;
      padding:0 10px;
    }
    .messages-search{
      position: absolute;
      right:60px;
      padding:0 10px;
    }
    .messages-sort{
      position: absolute;
      right:100px;
      padding:0 10px;
    }
  }
  .rank-type{
    width: 100%;
    position: absolute;
    top:56px;
    left: 0;
    right:0;
    padding-top:5px;
    border-top:1px solid #eee;
    background-color: #ffffff;
    li{
      width: 95%;
      margin:0 2.5%;
      height: 1rem;
      line-height: 1rem;
      border-bottom:1px solid #eee;
    }
    li.active{
      color:$color-background-green-s
    }
    li:last-child{
      border-bottom:none;
    }
  }
</style>
