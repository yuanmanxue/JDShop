<template>
  <scroll :data="data" class="menu-scroll" ref="menuScroll" :probe-type="probeType" :listen-scroll="listenScroll">
    <div class="shop-detail">
      <div class="menu-wrap">
        <ul class="menu" v-for="(item, index) in data">
          <li>
            <p @click="toggleMenuChild(index)" :class="{active: index === active}">{{item.title}}</p>
              <ul :class="{open: index === childShow}" class="off" v-show="item.childCategoryList">
                <li v-for="(child, cindex) in item.childCategoryList" :class="{active: cindex === childActive}" @click="toggleMenuChildActive(cindex)">{{child.title}}</li>
              </ul>
          </li>
        </ul>
      </div>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
export default {
  data() {
    return {
      childShow: 0,
      active: 0,
      childActive: 0,
      type: [],
      iNum: 0,
      jNum: 0
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    toggleMenuChild(index) {
      this.childActive = 0
      if (this.childShow === index) {
        this.childShow = ''
      } else if (this.childShow !== index) {
        this.childShow = index
      }
      if (this.active !== index) {
        this.active = index
      }
      this.iNum = index
      this.$nextTick(() => {
        this.$refs.menuScroll.refresh()
      })
      console.log(this.iNum)
      this.$emit('selectMenuParent', this.iNum)
    },
    toggleMenuChildActive(index) {
      if (this.childActive !== index) {
        this.childActive = index
      }
      this.jNum = index
      console.log(this.jNum)
      this.$emit('selectMenuChild', this.jNum)
    }
  },
  components: {
    Scroll
  },
  watch: {
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  // 左侧的菜单
  .menu-scroll{
    width:84px;
    position: fixed;
    bottom:50px;
    top:150px;
    overflow: hidden;
    z-index:100;
    background-color: #f4f4f4;
    .shop-detail{
      background-color: #ffffff;
      .menu-wrap{
        background-color: #f4f4f4;
      }
      .menu{
          color:$color-text-theme;
          font-size:$font-size-small;
         p{
          padding:15px 0;
          text-align:center;
          border:1px solid #ddd;
          &.active{
            border-left:3px solid $color-background-green;
            background-color: #ffffff;
            color:$color-text-green
          }
        }
        ul{
          display: none;
          &.open {
            display: block;
          }
          li{
            font-size:$font-size-small-s;
            border-right:1px solid #ddd;
            border-left:1px solid #ddd;
            padding:15px 5px;
            &.active{
              border-left:3px solid $color-background-green;
              background-color: #ffffff;
              color:$color-text-green
            }
           //  border-left:2px solid $color-background-green;
         }
        }
      }
    }
  }
</style>
