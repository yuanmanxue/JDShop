<!--
@Author: yuanmanxue
@Date:   2017-11-13 04:39:28
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-22 04:39:38
-->

<template>
<div class="cartcontrol">
  <div class="cart-add" @click="addCount"></div>
  <div class="cart-num" v-show="food.count>0">{{food.count}}</div>
  <transition name="move">
    <div class="cart-decr" v-show="food.count>0" @click="decrCount"></div>
  </transition>
  <transition name="drop">
    <div class="ball-wrap">
      <div class="ball" v-for="ball in balls" name="drop" ref="ball">
        <div class="inner" v-show="ball.show"
         ref="innerBall"></div>
      </div>
    </div>
  </transition>
</div>
</template>

<script type="text/ecmascript-6">
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      balls: [
        {
          show: true,
          x: 0,
          y: 0
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      currentFood: {}
    }
  },
  props: {
    food: {
      type: Object,
      default: null
    }
  },
  computed: {
  },
  methods: {
    addCount() {
      // this.balls[0].show = true
      this.drop()
      this.$emit('addCount')
    },
    decrCount() {
      this.$emit('decrCount')
    },
    ...mapActions([
      'addCountFn',
      'decrCountFn'
    ]),
    drop() {
      let inner = this.$refs.innerBall[0]
      let w = inner.clientWidth
      // console.log(inner)
      // console.log(w)
    //   let ball = this.$refs.ball[0]
    //   console.log(ball)
      let rect = inner.getBoundingClientRect()
      this.balls[0].x = rect.left
      this.balls[0].y = -(window.innerHeight - rect.top - w / 2)
      // console.log(this.balls[0].x)
      // console.log(this.balls[0].y)
    //   ball.style.webkitTransform = `translate3d(0, ${y}px, 0)`
    //   ball.style.transform = `translate3d(0,${y}px,0)`
    //   inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
    //   inner.style.transform = `translate3d(${x}px, 0, 0)`
    //   console.log(x)
    //   console.log(y)
    //
    //     // 设置过渡进入之前的组件状态
  },
  beforeEnter: function(el) {
    // ...
    // let inner = this.$refs.innerBall[0]
    // inner.style.transform = `translate3d(${this.balls[0].x}px, 0, 0)`
    // inner.style.transform = `translate3d(0,${this.balls[0].y}px,0)`
  },
  // 设置过渡进入完成时的组件状态
  enter: function(el, done) {
    // ...
    done()
  },
  // 设置过渡进入完成之后的组件状态
  afterEnter: function(el) {
    // ...
  }
    // ...mapMutations({
    //   setShopCount: 'SET_SHOPLIST'
    // })
  },
  watch: {
    // food(newData) {
    //   this.food = newData
    // }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
.cartcontrol {
  width: 2.4rem;
  height:.8rem;
}
.cartcontrol .cart-decr,
.cartcontrol .cart-num,
.cartcontrol .cart-add {
  display: inline-block;
  background-size: .8rem .8rem;
  width: .8rem;
  height:.8rem;
  float: left;
  background-repeat: no-repeat;
}
.cartcontrol .cart-decr {
  background-image: url(desc.png);
  background-color: #ffffff;
}
.cartcontrol .cart-add {
  background-image: url(add.png);
    background-color: #ffffff;
}
.cartcontrol .cart-num {
  font-size: 12px;
  line-height: .8rem;
  text-align: center;
  font-size: 12px;
}
.move-enter-active {
  transform: translate3d(0px, 0, 0);
  opacity: 1;
}
.move-enter {
  transform: translate3d(-20px, 0, 0);
  opacity: 0;
}
.move-leave {
  opacity: 1;
  transform: translate3d(0px, 0, 0);
}
.move-leave-active {
  transform: translate3d(-10px, 0, 0);
  opacity: 0;
}
.move-enter-active,
.move-leave-active {
  transition: all 0.1s;
}
// 点击加入购物车的小球
.ball-wrap{
  position: absolute;
  left: 0.1rem;
  top: 0.1rem;
  width: .6rem;
  height: .6rem;
  border-radius:50%;
  z-index: -1;
  .ball{
    // position: fixed;
    // bottom:20px;
    // left:20px;
    // z-index:110;
  }
  .inner{
    display: block;
    width: .6rem;
    height: .6rem;
    border-radius:50%;
    background-color:$color-background-green;
  }
}

</style>
