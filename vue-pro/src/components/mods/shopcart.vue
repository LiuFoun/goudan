<template>
<div class="shopCart">
  shopcart
  <div class="content">
    <div class="content-left">
      <div class="logo-wrapper">
        <div class="logo active">
          <i class="icon-shopping_cart"></i>
        </div>
        <div class="badge">1</div>
      </div>
      <div class="price">总价</div>
      <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
    </div>
    <div class="content-right">
      <div class="pay">还差起步费{{minPrice}}元</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'shopcart',
  props: ['deliveryPrice', 'minPrice']
}
</script>

<style scoped>

</style>
