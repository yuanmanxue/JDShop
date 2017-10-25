<template>
<div class="footer-nav">
  <router-link to="/index" class="footer-item"><i class="iconfont">&#xe650;</i>首页</router-link>
  <router-link to="/classify" class="footer-item"><i class="iconfont">&#xe634;</i>分类</router-link>
  <router-link to="/shoppingcart" class="footer-item"><i class="iconfont">&#xe503;</i>购物车</router-link>
  <router-link to="/indent" class="footer-item"><i class="iconfont">&#xe633;</i>订单</router-link>
  <router-link to="/mine" class="footer-item"><i class="iconfont">&#xe79c;</i>我的</router-link>
</div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .footer-nav{
      position: fixed;
      bottom:0;
      width: 100%;
      height: 50px;
      display: flex;
      border-top: 1px solid #d9d9d9;
      background-color: #ffffff;
      .footer-item{
        position: relative;
        height: 20px;
        line-height: 20px;
        padding-top: 30px;
        flex: auto;
        text-align:center;
        font-size:$font-size-small;
        color:$color-text-theme;
        i{
          position: absolute;
          top: 10px;
          display: block;
          width: 100%;
          text-align:center;
          font-size:$font-size-icon;
        }
      }
      .active{
        color:$color-text-green;
      }
  }

</style>
