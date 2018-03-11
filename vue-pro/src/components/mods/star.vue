<template>
<div class="star star-48">
  <span class="star-item" :class="item" v-for="item in yimao"></span>
</div>
</template>

<script>
export default {
  props: ['score'],
  computed: {
    yimao () {
      let arr = []
      let taiyang = Math.floor(this.score) // 获取整数部分
      let xiaoshu = (this.score - taiyang) >= 0.5 // 获取小数部分是否大于0.5的布尔值
      for (let i = 0; i < taiyang; i++) {
        arr.push('on')
      }
      if (xiaoshu) {
        arr.push('half')
      }
      while (arr.length < 5) {
        arr.push('off')
      }
      return arr
    }
  }
}
</script>

<style scoped>

</style>
