<template>
  <div id="app">
    <vheader :seller="datas.seller"> </vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :data="datas" ref="abc"> </router-view>
  </div>
</template>

<script>
import vheader from './components/mods/header'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      datas: {
        seller: {}, // 商户信息
        goods: [], // 商品数据
        ratings: [] // 评论
      }
    }
  },
  mounted () {
    axios.get('/static/data.json').then(res => {
      console.log(res)
      this.datas.seller = res.data.seller
      this.datas.goods = res.data.goods
      this.datas.ratings = res.data.ratings
      // console.log(this.$refs.abc)
      this.$nextTick(() => {
        this.$refs.abc.scroll()
      })
    })
  },
  components: {
    vheader
  }
}
// 当style部分写上scoped，当前这个模板和当前模板下使用的子模板应用当前样式
</script>

<style scoped>
.tab .tab-item a.router-link-exact-active{
  color: red
}
</style>
