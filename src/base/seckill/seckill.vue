<template>
  <div class="seckill-wrap">
    <div class="seckill">
      <div class="seckill-left">
        <i class="icon-qiang"></i>
        <div class="seckill-text"></div>
        <p class='desc'>{{this.seckill.adwords}}</p>
        <img :src="this.seckill.imgUrl" alt="">
      </div>
      <ul class="seckill-right">
        <li v-for="(items, index) in this.recommend" class="seckill-right-items">
          <p class='title'>{{items.title}}</p>
          <p class="desc">{{items.words}}</p>
            <img :src="items.imgUrl" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {
      seckill: [],
      recommend: []
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  methods: {
    _getData() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].dataObj) {
          this.seckill = this.data[i].dataObj
        } else {
          this.recommend.push(this.data[i].floorCellData)
        }
      }
      console.log(this.recommend)
    }
  },
  created() {
  },
  watch: {
    data: function(newData, oldData) {
      this.data = newData
      this._getData()
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .seckill{
    width: 100%;
    display: flex;
    background-color: #ffffff;
    .title{
      text-align:center;
      padding:5px 0;
      font-size:$font-size-small;
      font-weight:bold;
    }
    .desc{
      font-size:$font-size-small-s;
      color:$color-text-gray;
      text-align:center;
      padding:4px 0;
    }
    .seckill-left{
      width:5.73333333rem;
      position: relative;
      .icon-qiang{
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
        right:0;
        top:0;
        background:url('icon_qiang.png') no-repeat center;
        background-size: cover;
      }
      .seckill-text{
        width: 100%;
        margin-top:1rem;
        margin-bottom: .2rem;
        height: 0.8rem;
        background:url('icon_miaosha.png') no-repeat center;
        background-size: 60%;
      }
    }
    .seckill-right{
      flex:1 1 auto;
      display: flex;
      flex-wrap:wrap;
      align-items: center;
      .seckill-right-items{
        padding:10px 0;
        width: 50%;
        img {
          display:block;
          width: 60%;
          margin: 0 20%;
        }
      }
    }
  }
</style>
