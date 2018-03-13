export default {
  // 默认第一个接受的参数是 vuex里所定义的数据
  vxaddCart (state, val) {
    // console.log('到mutations这里了')
    state.vxfood.push(val)
    // console.log(arguments)
  },
  vxdecreaseCart (state, food) {
    // console.log('到mutations这里了')
    state.vxfood.forEach((value, index) => {
      if (value.name === food.name) {
        state.vxfood.splice(index, 1)
      }
    })
  }/**
   * Created by Administrator on 2018/3/12.
   */
}
