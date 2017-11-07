<template>
  <div class="header-wrap">
    <div class="header" v-if="data">
      <div class="header-info">
        <div class="shop-avator">
          <img :src="data.logoUrl" alt="">
        </div>
        <div class="info">
          <p class="title">{{data.storeInfo.storeName}}</p>
          <p>达达专送 | {{data.storeInfo.deliveryFirst}}</p>
          <p>{{data.freightWords}}</p>
        </div>
      </div>
      <div class="activity">
        <div class="heart"></div>
        <div class="packet"></div>
      </div>
    </div>
    <div class="activity">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  data() {
    return {}
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'shop'
    ])
  },
  methods: {

  },
  components: {
  },
  watch: {
    data(newData) {
      this.data = newData
      console.log(this.data)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .header-wrap{
    height: 110px;
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    width: 100%;
    background:url(./header-bg.jpg) no-repeat;
    background-size: cover;
    z-index:99;
    .header{
      clear: both;
      overflow: hidden;
      .header-info{
        width: 75%;
        padding:2.5%;
        float:left;
        font-size:$font-size-small-s;
        color:$color-text-white;
        .shop-avator{
          width: 1.6rem;
          height: 1.6rem;
          padding:3px;
          border-radius:3px;
          background-color: #ffffff;
          margin-right:.26666667rem;
          float:left;
          img{
            width: 1.6rem;
            height: 1.6rem;
            border-radious:.13333333rem;
          }
        }
        .info{
          float:left;
          .title{
            font-size:$font-size-large;
            padding:.13333333rem 0;
          }
          p{
            padding-bottom: .13333333rem;
          }
        }
      }
      .activity{
        width:20%;
        height: 78px;
        float:left;
        .heart,.packet{
          width: 100%;
          height: 50%;
        }
        .packet{
          background: url(./yhq.png) no-repeat center;
          background-size: 60%;
        }
      }
    }
    .activity{
    }
  }
</style>
