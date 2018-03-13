<template>
    <div class="cartcontrol">
      <transition name="fadeRotate">
        <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart($event)">
          <span class="icon-remove_circle_outline inner"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add" @click.stop="addCart($event)">
        <i class="icon-add_circle"></i>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapMutations, mapState} from 'vuex'
export default{
  name: 'cartcontrol',
  props: ['food'],
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations([
      'vxaddCart',
      'vxdecreaseCart'
    ]),
    addCart (event) {
      // _constructed 是滚动插件所添加的一个属性
      // 没有这个值的点击事件是pc端自带的
      // 滚动插件的作用是为手机端添加点击事件，但会冒泡到PC端
      if (!event._constructed) {
        return false
      }
      if (typeof this.food.count === 'undefined') {
        Vue.set(this.food, 'count', 0)
        Vue.set(this.food, 'active', true)
        // 局部方式必须传值过来，for循环添加;此时局部方式更方便
        // Vue.set 可以直接往data里或接收的数据中添加
        // this.$set需要执行函数的时候传值过来 然后往传递的值里添加
        // this.food.count = 0
      }
      this.food.count++
      console.log(this.food.count)
      // 初次点击时默认为true，点击后改为false
      if (this.food.active) {
        this.vxaddCart(this.food)
        this.food.active = false
      }
      console.log(this.vxfood)
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return false
      }
      this.food.count--
      console.log(this.food.count)
      if (this.food.count === 0) {
        this.vxdecreaseCart(this.food)
      }
      console.log(this.vxfood)
    }
  },
  computed: {
    ...mapState([
      'vxfood'
    ])
  }
}
</script>
