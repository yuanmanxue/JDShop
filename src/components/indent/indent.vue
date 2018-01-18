<!--
@Author: yuanmanxue
@Date:   2017-10-23 03:04:56
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-18 02:50:05
-->

<template>
  <div :class="$style.cart">
    <div>
      登录后才能查看订单哦
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
      border: 1px solid $color-background-green;
      color:$color-background-green;
      margin-top: .43333333rem;
      border-radius:.22666667rem;
    }
  }
}
</style>
