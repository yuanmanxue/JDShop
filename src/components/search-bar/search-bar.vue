<template>
  <div class="search-bar-wrap">
    <div class="search-bar">
      <div class="position"><i class="iconfont">&#xe613;</i>学府一号学府一号学府一号学府一号</div>
      <div class="search-box"><input type="text" name="" value=""></div>
      <div class="message"><i class="iconfont">&#xe602;</i></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .search-bar{
    height: 56px;
    line-height: 56px;
    padding:0 10px;
    display: flex;
    i{
      font-size:20px;
      padding-right: 4px;
    }
    .position{
      max-width: 30%;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .search-box{
      flex:auto;
      padding-right: 15px;
      input{
        height: 30px;
        display: inline-block;
        border-radius:15px;
        background: rgba(0,0,0,0.35);
      }
    }
  }
</style>
