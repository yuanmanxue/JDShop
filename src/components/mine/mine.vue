<!--
@Author: yuanmanxue
@Date:   2017-10-23 03:06:53
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-18 05:04:22
-->

<template>
  <div :class="$style.mine">
    <div :class="$style.avator">
      <router-link :to="{ name: ''}">
        <em></em>
        <em></em>
      </router-link>
      <router-link :to="{ name: ''}"><img src="//static-o2o.360buyimg.com/daojia/new/images/user/bg_head_new.png" alt=""></router-link>
      <router-link :to="{ name: ''}">登录 / 注册</router-link>
    </div>
    <div :class="$style.wallpay">
      <div>
        <p></p>
        <span>我的钱包</span>
      </div>
      <div>
        <p>--</p>
        <span>优惠券</span>
      </div>
      <div>
        <p>--</p>
        <span>白条</span>
      </div>
      <div>
        <p>--</p>
        <span>鲜豆</span>
      </div>
    </div>
    <div :class="$style.activity">
      <img src="//img30.360buyimg.com/mobilecms/jfs/t13756/219/1153564623/15063/d24dd383/5a1b7aadN8268f0a1.png" alt="">
    </div>
    <ul :class="$style.list">
      <li>
        <router-link :to="{ name: '', params: {} }">
          <img src="https://img30.360buyimg.com/mobilecms/jfs/t9868/270/2511111067/3262/6aadc8d0/59f861f1Naec07388.png" alt="">
          <p>我的关注</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: '', params: {} }">
          <img src="https://img30.360buyimg.com/mobilecms/jfs/t10027/230/2493387830/923/f504dba5/59f861f4Nb4f14ccb.png" alt="">
          <p>我的评价</p>
        </router-link>
      </li>
      <li>
      <router-link :to="{ name: '', params: {} }">
        <img src="https://img30.360buyimg.com/mobilecms/jfs/t9811/293/2478111344/1683/8961ef6f/59f86219Na63aa49b.png" alt="">
        <p>我的地址</p>
      </router-link>
      </li>
      <li>
        <router-link :to="{ name: '', params: {} }">
          <img src="https://img30.360buyimg.com/mobilecms/jfs/t14011/257/2679918788/2273/b6ad577c/5a4b618cN592138dc.png" alt="">
          <p>签到有惊喜</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: '', params: {} }">
          <img src="https://img30.360buyimg.com/mobilecms/jfs/t9754/192/2495883922/1723/1c46efff/59f86201Nbb2b1e3a.png" alt="">
          <p>退款 / 售后</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: '', params: {} }">
          <img src="https://img30.360buyimg.com/mobilecms/jfs/t11974/189/796512777/1121/cde5b0de/59f8622cNa78b328b.png" alt="">
          <p>客服反馈</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: '', params: {} }">
          <img src="https://img30.360buyimg.com/mobilecms/jfs/t10918/293/2513298199/1837/dc976e21/59f8623aN0de96396.png" alt="">
          <p>帮助中心</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: '', params: {} }">
          <img src="https://img30.360buyimg.com/mobilecms/jfs/t10732/343/2511418075/3383/9e14c148/59f8623eNf7d1d2ab.png" alt="">
          <p>办公室超市</p>
        </router-link>
      </li>
      <li>
      <router-link :to="{ name: '', params: {} }">
        <img src="https://img30.360buyimg.com/mobilecms/jfs/t11146/119/789238279/1119/f3ac6d55/59f8625dN1912d473.png" alt="">
        <p>配送员招募</p>
      </router-link>
      </li>
      <li>
      <router-link :to="{ name: '', params: {} }">
        <img src="https://img30.360buyimg.com/mobilecms/jfs/t7294/354/3886152423/1137/b1def6c9/59f86273N0c5a763c.png" alt="">
        <p>关于我们</p>
      </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  components: {

  }
}
</script>
<style lang="stylus" module>
  @import "~common/stylus/variable.styl"
  .mine{
    margin-bottom: 50px;
    .avator{
      width: 100%;
      padding-top: .64rem;
      position: relative;
      height: 2.42666667rem;
      background: #fff url("//static-o2o.360buyimg.com/daojia/new/images/user/my_bgnew.png") no-repeat center top;
      background-size: 100% auto;
      img{
        width: 1.6rem;
        height: 1.6rem;
        margin-left: .26666667rem;
      }
      a{
        font-size: $font-size-small;
        display: inline-block;
        &:nth-child(1){
          position: absolute;
          top: .26666667rem;
          right:.26666667rem;
          height: .66666667rem;
          em{
            display: inline-block;
            width:.66666667rem;
            height: .66666667rem;
            margin-left: .26666667rem;
            &:nth-child(1){
              background:url("//static-o2o.360buyimg.com/daojia/new/images/user/icon_er.png") no-repeat center center;
              background-size: cover;
            }
            &:nth-child(2){
              background:url("//static-o2o.360buyimg.com/daojia/new/images/user/user_message_icon.png") no-repeat center center;
              background-size: cover;
            }
          }
        }
        &:nth-child(2){
          float:left;
          height: 1.6rem;
        }
        &:nth-child(3){
          float:left;
          margin:.4rem 0 0 .2rem;
          width: 2.29333333rem;
          height: 30px;
          line-height: 30px;
          color:#fff;
          background-color: #69c575;
          text-align: center;
          border-radius:5px;
        }
      }
    }
    .wallpay{
      background-color: #ffffff;
      height: 1.86666667rem;
      width: 100%;
      margin-bottom: .26666667rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size:$font-size-small;
      &>div{
        width: 25%;
        text-align: center;
        p{
          margin: 0 auto;
          width: .66666667rem;
          height: .66666667rem;
          line-height: .66666667rem;
        }
        &:nth-child(1){
          p{
              margin: 0 auto;
              width: .66666667rem;
              height: .66666667rem;
              background:url("//static-o2o.360buyimg.com/daojia/new/images/user/icon_packet.png") no-repeat center center;
          }
        }
        span{
          display: inline-block;
          margin-top: .26666667rem;
        }
      }
    }
    .activity{
      img{
        width: 100%;
        height: 2rem;
      }
    }
    .list{
      display: flex;
      flex-wrap:wrap;
      align-items: center;
      background-color: #ffffff;
      li{
        width: 25%;
        text-align: center;
        font-size: $font-size-small;
        padding-bottom: .66666667rem;
        border-bottom: 1px solid #eee;
        img{
          width: 1.25333333rem;
          height: 1.25333333rem;
        }
        p{
          margin-top: .26666667rem;
        }
      }
    }
  }
</style>
