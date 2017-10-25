<template>
  <div class="search-bar-wrap">
    <div class="search-bar">
      <div class="position"><i class="iconfont">&#xe613;</i><span>学府一号学府一号学府一号学府一号</span><i class="iconfont">&#xe501;</i></div>
      <div class="search-box"><i class="iconfont search-icon">&#xe612;</i><input type="text" name="" value=""></div>
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
    position: fixed;
    top: 0;
    z-index:999;
    width: 100%;
    height: 56px;
    line-height: 56px;
    padding:0 10px;
    display: flex;
    font-size:$font-size-small;
    background: url(./search-bg.png) no-repeat 0 0 ;
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
      position: relative;
      input{
        text-indent:30px;
        width: 100%;
        height: 30px;
        display: inline-block;
        border-radius:15px;
        background: rgba(255,255,255,0.35);
        color:$color-text-white;
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
      width: 40px;
    }
  }
</style>
