<template>
  <div class="search-bar-wrap">
    <div class="search-bar" ref="searchBar">
      <div class="position" ref="position" @click="goToMap"><i class="iconfont">&#xe613;</i><span>学府一号学府一号学府一号学府一号</span><i class="iconfont">&#xe501;</i></div>
      <div class="search-box" v-show="!this.color"><i class="iconfont search-icon">&#xe612;</i><input type="text" name="" value=""></div>
      <div class="message"><i class="iconfont">&#xe602;</i></div>
      <div class="message messages-search" v-show="this.color"><i class="iconfont">&#xe612;</i></div>
      <div class="message messages-sort" v-show="this.color"><i class="iconfont">&#xe689;</i></div>
      <ul class="rank-type">
        <li>111111111</li>
        <li>222222222</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    color: {
      type: Boolean,
      default: false
    }
  },
  created() {
  },
  methods: {
    goToMap() {
      this.$router.push({path: './map'})
    },
    setSearchBarBg() {
      if (this.color) {
        this.$refs.searchBar.style.background = '#ffffff'
        this.$refs.searchBar.style.color = '#666666'
      } else {
        this.$refs.searchBar.style.background = 'rgba(255,255,255,0)'
        this.$refs.searchBar.style.color = '#fff'
      }
    }
  },
  watch: {
    color(newData) {
      this.color = newData
      this.setSearchBarBg()
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
    border-bottom:1px solid #eee;
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
    top:57px;
    left: 0;
    right:0;
    background-color: #ffffff;
    li{
      width: 95%;
      margin:0 2.5%;
      height: 1rem;
      line-height: 1rem;
    }
  }
</style>
