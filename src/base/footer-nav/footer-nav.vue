<!--
@Author: yuanmanxue
@Date:   2017-10-23 03:13:45
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-19 09:56:51
-->

<template>
<div class="footerNav">
  <router-link to="/index"><i class="iconfont">&#xe650;</i>首页</router-link>
  <router-link to="/classify"><i class="iconfont">&#xe634;</i>分类</router-link>
  <router-link to="/shoppingcart"><i class="iconfont">&#xe503;</i>购物车</router-link>
  <router-link to="/indent"><i class="iconfont">&#xe633;</i>订单</router-link>
  <router-link to="/mine"><i class="iconfont">&#xe79c;</i>我的</router-link>
</div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .footerNav{
      position: fixed;
      bottom:0;
      width: 100%;
      height: 50px;
      display: flex;
      border-top: 1px solid #d9d9d9;
      background-color: #ffffff;
      a{
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
     .router-link-exact-active.active{
        color:green;
      }
  }
</style>
