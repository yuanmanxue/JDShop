<!--
@Author: yuanmanxue
@Date:   2018-01-19 10:20:22
@Last modified by:   yuanmanxue
@Last modified time: 2018-01-19 03:22:36
-->

<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      cancel() {
        this.hide()
        this.$emit('cancel')
      },
      confirm() {
        this.hide()
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .confirm
    position: fixed
    left: 20%
    right: 20%
    top:50%
    height: 100px;
    margin-top: -50px;
    z-index: 9999
    background-color: #fff;
    border:1px solid $color-background-green;
    background-color:#fff;
    border-radius:20px;
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .confirm-content
        animation: confirm-zoom 0.3s
    .confirm-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 9999
      .confirm-content
        width: 160px
        border-radius: 13px
        .text
          padding: 19px 15px
          line-height: 22px
          text-align: center
          font-size: $font-size-title
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: $font-size-small
          .operate-btn
            flex: 1
            line-height: 22px
            padding: 3px 0
            margin-right: 10px;
            background: #ffffff;
            border-radius:5px;
            border: 1px solid $color-background-green;
            color: $color-text-d
            &.left
              margin-right: 10px;
              margin-left: 0px;

  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
