<template>
  <div class="search-box-wrap">
    <input type="text" ref="searchText" id="input" placeholder="搜索附近的商品和门店" @focus="goToSearch" :value="msg"/>
    <i class="iconfont search-icon">&#xe612;</i>
    <div class="">{{msg}}</div>
    <!-- <span>搜索</span> -->
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {
      msg: 'default'
    }
  },
  methods: {
    goToSearch() {
      this.$router.push('./searchdetail')
    }
  },
  components: {
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .search-box-wrap{
    position: relative;
    height: 40px;
    width: 100%;
    z-index:88;
    background-color: #eee;
    border-bottom: 1px solid #ddd;
    input{
      width: 95%;
      height: 30px;
      line-height: 30px;
      margin: 5px;
      border-radius: 5px;
      background-color: #fff;
      font-size:$font-size-small;
      text-indent:35px;
      border:1px solid #ddd;
    }
    .search-icon{
      position: absolute;
      left:3%;
      width: 28px;
      height: 28px;
      font-size:22px;
      line-height: 28px;
      top:7px;
      text-align:center;
      color:$color-text-gray;
    }
    span{
      width: 15%;
      text-align:center;
      float:right;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      font-size:$font-size-title;
      color:$color-background-bule;
    }
  }
</style>
