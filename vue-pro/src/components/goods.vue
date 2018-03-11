<template>
<div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <!--eslint-disable-next-line-->
      <li class="menu-item" v-for="item in data.goods">
        <span class="text">
          <span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
            {{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul>
      <li v-for="item in data.goods" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item">
            <div class="icon">
              <img :src="food.icon" alt="" width="57px" height="57px">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="description">{{food.description}}</p>
              <div class="sell-info">
                <span class="sellCount">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}</span>
                <div class="price">
                  <span class="newPrice">{{food.price}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcart :deliveryPrice="data.seller.deliveryPrice" :minPrice="data.seller.minPrice"> </shopcart>
  <!--<div class="shopCart">3</div>-->
  <!--<div class="detailWrapper">4</div>{{data.goods}}-->
</div>
</template>

<script>
import icon from './mods/icon.js'
import Scroll from 'better-scroll'
import shopcart from './mods/shopcart.vue'
export default {
  name: 'hall',
  props: ['data'],
  data () {
    return {
      icon: icon,
      goods: this.data.goods
    }
  },
  components: {
    shopcart
  },
  mounted () {
    // dom更新好之后执行的回调函数 相当于 windows.onload
    // dom更新完 => new Scroll() => ajax获取到了数据 => dom
    // this.$nextTick(() => {
    //   /* eslint-disable no-new */
    // })
  },
  methods: {
    scroll () {
      /* eslint-disable no-new */
      new Scroll(this.$refs['foodsWrapper'], {click: true})// 防止点击事件失效，默认false
      new Scroll(this.$refs['menuWrapper'], {click: true})
    }
  }
}
</script>

<style scoped>

</style>
