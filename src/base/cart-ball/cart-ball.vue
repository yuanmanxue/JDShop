<template>
<div class="cartcontrol">
  <div class="cart-add" @click="addCount"></div>
  <div class="cart-num" v-show="food.count>0">{{food.count}}</div>
  <transition name="move">
    <div class="cart-decr" v-show="food.count>0" @click="decrcount"></div>
  </transition>
</div>
</template>

<script type="text/ecmascript-6">
// import {mapMutations} from 'vuex'
export default {
  props: {
    food: {
      type: Object,
      default: null
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'shopList'
  //   ])
  // },
  methods: {
    addCount() {
      if (!this.food.count) {
        this.food.count = 1
      } else {
        this.food.count++
      }
      console.log(this.food.count)
      this.$emit('addCount')
    },
    decrcount() {
      if (this.food.count) {
        this.food.count--
      }
      this.$emit('decrcount')
    }
    // ...mapMutations({
    //   setShopCount: 'SET_SHOPLIST'
    // })
  },
  watch: {
    food(newData) {
      this.food = newData
    }
  }
}
</script>

<style>
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
