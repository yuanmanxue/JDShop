<template>
<div class="cartcontrol">
  <div class="cart-add" @click="addCount"></div>
  <div class="cart-num" v-show="food.count>0">{{food.count}}</div>
  <transition name="move">
    <div class="cart-decr" v-show="food.count>0" @click="decrCount"></div>
  </transition>
  <div class="ball-wrap">
    <div class="ball" v-for="ball in balls" name="drop" ref="ball">
      <div class="inner" v-show="ball.show" ref="innerBall"></div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      balls: [
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
      this.$emit('addCount')
    },
    decrCount() {
      this.$emit('decrCount')
    },
    ...mapActions([
      'addCountFn',
      'decrCountFn'
    ])
    // drop() {
    //   let inner = this.$refs.innerBall[0]
    //   console.log(inner)
    //   let ball = this.$refs.ball[0]
    //   console.log(ball)
    //   let rect = inner.getBoundingClientRect()
    //   let x = rect.left - 32
    //   let y = -(window.innerHeight - rect.top - 22)
    //   ball.style.webkitTransform = `translate3d(0, ${y}px, 0)`
    //   ball.style.transform = `translate3d(0,${y}px,0)`
    //   inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
    //   inner.style.transform = `translate3d(${x}px, 0, 0)`
    //   console.log(x)
    //   console.log(y)
    // }
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
  width: 75px;
  height: 25px;
}
.cartcontrol .cart-decr,
.cartcontrol .cart-num,
.cartcontrol .cart-add {
  display: inline-block;
  background-size: 25px 25px;
  width: 25px;
  height: 25px;
  float: left;
  background-repeat: no-repeat;
}
.cartcontrol .cart-decr {
  background-image: url(desc.png);
}
.cartcontrol .cart-add {
  background-image: url(add.png);
}
.cartcontrol .cart-num {
  font-size: 12px;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
}
.move-enter-active {
  transform: translate3d(0px, 0, 0) rotate(180deg);
  opacity: 1;
}
.move-enter {
  transform: translate3d(-20px, 0, 0) rotate(0deg);
  opacity: 0;
}
.move-leave {
  opacity: 1;
  transform: translate3d(0px, 0, 0) rotate(0deg);
}
.move-leave-active {
  transform: translate3d(-10px, 0, 0) rotate(180deg);
  opacity: 0;
}
.move-enter-active,
.move-leave-active {
  transition: all 0.2s;
}
.ball-wrap{
  .ball{
    position: fixed;
    bottom:20px;
    left:20px;
    z-index:110;
  }
  .inner{
    display: block;
    width: 25px;
    height: 25px;
    border-radius:50%;
    background-color:$color-background-green;
    transition: all 0.4s;
  }
}
@media only screen and (max-width: 321px) {
  .cartcontrol {
    width: 60px;
    height: 20px;
  }
  .cartcontrol .cart-decr,
  .cartcontrol .cart-num,
  .cartcontrol .cart-add {
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
  }
  .cartcontrol .cart-num {
    line-height: 20px;
  }
}
</style>
