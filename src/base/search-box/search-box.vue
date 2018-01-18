<!--
@Author: yuanmanxue
@Date:   2017-11-03 02:16:31
@Last modified by:   yuanmanxue
@Last modified time: 2017-12-07 02:21:06
-->

<template>
  <div class="search-box-wrap">
    <input type="text" ref="searchText" id="input" placeholder="搜索附近的商品和门店" @focus="goToSearch" @blur="changeValue"/>
    <i class="iconfont search-icon">&#xe612;</i>
    <div>{{val}}</div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {}
  },
  props: {
    val: {
      type: String,
      defalut: '默认值'
    }
  },
  methods: {
    goToSearch() {
      this.$router.push('./searchdetail')
    },
    changeValue() {
      let newVal = this.$refs.searchText.value;
      this.$emit('updata:val', newVal)
    }
  },
  components: {
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .search-box-wrap{
    position: relative;
    height: 40px;
    width: 100%;
    z-index:88;
    background-color: #eee;
    border-bottom: 1px solid #ddd;
    input{
      width: 95%;
      height: 30px;
      line-height: 30px;
      margin: 5px;
      border-radius: 5px;
      background-color: #fff;
      font-size:$font-size-small;
      text-indent:35px;
      border:1px solid #ddd;
    }
    .search-icon{
      position: absolute;
      left:3%;
      width: 28px;
      height: 28px;
      font-size:22px;
      line-height: 28px;
      top:7px;
      text-align:center;
      color:$color-text-gray;
    }
    span{
      width: 15%;
      text-align:center;
      float:right;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      font-size:$font-size-title;
      color:$color-background-bule;
    }
  }
</style>
