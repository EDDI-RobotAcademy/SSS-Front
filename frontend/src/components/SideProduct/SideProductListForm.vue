<template>
  <v-container>
    <v-row>
      <v-col v-for="(sideproduct, idx) in sideproducts" :key="idx" cols="3">
        <v-img :src="require(`@/assets/selfSalad/${sideproduct.sideProductImg.editedImg.split('/').pop()}`)" />
        <p class="product-title">{{ sideproduct.title }}</p>
        <p class="product-price">{{ sideproduct.price | numberFormat }} 원</p>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
export default {
  name: "SideProductReadForm",
  props: {
    sideproducts: {
      type: Array
    }
  },
  filters: {
    // 상품 금액 천단위 콤마 찍기
    numberFormat(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
}
</script>
  
<style scoped>

.product-title {
  margin-top: 5px;
  font-weight: bold;
}

.product-price {
  color: green;
}
</style>