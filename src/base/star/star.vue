<template>
<div class="star">
  <i v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></i>
</div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF_S = 'half_s'
const CLS_HALF = 'half'
const CLS_HALF_L = 'half_l'
const CLS_OFF = 'off'
export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClasses() {
      let result = []
      let score = this.score
      let integer = Math.floor(score)
      let hasDecimal = parseFloat(score - integer).toFixed(2) * 100
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        if (hasDecimal < 50) {
          result.push(CLS_HALF_S)
        } else if (hasDecimal === 50) {
          result.push(CLS_HALF)
        } else if (hasDecimal > 50) {
          result.push(CLS_HALF_L)
        }
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }

  }
}
</script>

<style>
.star {
  display: inline-block;
}
.star .star-item {
  display: inline-block;
  background-repeat: no-repeat;
}
.star .star-item:last-child {
  margin-right: 0;
}
.star .star-item {
  width: 10px;
  height: 10px;
}
.star .on {
  background: url('newStar.png') 0 0;
  background-size: auto 10px;
}
.star .half {
  background: url('newStar.png') -20px 0;
  background-size: auto 10px;
}
.star .off {
  background: url('newStar.png') -40px 0;
  background-size: auto 10px;
}
.star .half_s {
  background: url('newStar.png') -3.0px 0;
  background-size: auto 10px;
}
.star .half_l {
  background: url('newStar.png') -10px 0;
  background-size: auto 10px;
}
</style>
