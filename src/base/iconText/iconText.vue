<template>
      <i :class="tagClass" class="tagsText">{{this.tagsText}}</i>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    tagsText: {
      type: String,
      default: ''
    },
    tagsType: {
      type: Number,
      default: null
    }
  },
  computed: {
    tagClass() {
      // console.log(this.tagsType)
      // let classMap = [4, 20]
      switch (this.tagsType) {
        case 1:return 'bg-zj'
        case 4:return 'bg-yf'
        case 6:return 'bg-mj'
        case 7:return 'bg-sd'
        case 9:return 'bg-ms'
        case 13:return 'bg-rx'
        case 15:return 'bg-mj'
        case 16:return 'bg-mz'
        case 20:return 'bg-lq'
      }
      return 'bg-other'
    }
  },
  methods: {
  },
  created() {
  },
  components: {

  },
  watch: {
    tags: function(newData, oldData) {
      this.tags = newData
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
    .tagsText{
      color:$color-text-white;
      font-size:$font-size-small-s;
      font-style:normal;
      padding:2px 3px;
      border-radius:3px;
    }
    .bg-yf{
      background-color: $color-background-bule;
    }
    .bg-mj{
      background-color: $color-background-green;
    }
    .bg-lq{
      background-color: $color-background-red;
    }
    .bg-rx{
      background-color: $color-background-hot;
    }
    .bg-sd{
      background-color: $color-background-orange;
    }
    .bg-mz{
      background-color: $color-background-green-s;
    }
    .bg-fq{
      background-color: $color-background-orange-s;
    }
    .bg-other{
      background-color: $color-background-other;
    }
    .bg-zj{
      background-color: #FFCE0B;
    }
    .bg-ms{
      background-color: #FF5959;
    }
</style>
