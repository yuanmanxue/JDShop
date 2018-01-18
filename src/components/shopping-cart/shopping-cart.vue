<!--
@Author: yuanmanxue
@Date:   2017-10-23 03:02:24
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-18 02:47:06
-->

<template>
  <div :class="$style.cart">
    <div>
      购物车还空空如也哦~</br>登录后将同步购物车中商品
      <router-link :to="{ name: ''}" :class="$style.btn">立即登录</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  components: {

  }
}
</script>
<style module lang="stylus">
  @import "~common/stylus/variable.styl"
.cart{
  position: absolute;
  top: 0;
  bottom:50px;
  left: 0;
  right:0;
  background-color: #ffffff;
  div{
    position: absolute;
    width: 100%;
    padding:100px 0 ;
    height: 100px;
    top:50%;
    margin-top:-150px;
    font-size: $font-size-small;
    text-align: center;
    line-height: .58666667rem;
    background:url("//static-o2o.360buyimg.com/daojia/new/images/icon/unlogin.png") no-repeat center 0;
    background-size: 2.4rem auto;
    .btn{
      display: block;
      width: 2.13333333rem;
      height: .93333333rem;
      margin: 0 auto;
      line-height: .93333333rem;
      background-color: $color-background-green;
      color:#fff;
      margin-top: .43333333rem;
      border-radius:.22666667rem;
    }
  }
}
</style>
