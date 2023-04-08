<template>
  <v-container>
    <div class="productCard">
      <div class="thumbnail">
        <router-link :to="{ name: 'ProductReadPage',
              params: { productId: product.productId.toString() }}">
        <img :src="require(`@/assets/product/${product.productImgs[this.idx].editedImg}`)">
      </router-link>

      </div>
      <p class="product-title">{{ product.title }}</p>
      <p class="product-price">{{ product.price | comma }}원</p>
    </div>
  </v-container>
</template>
  
<script>
  export default {
      name: "ProductCard",
      data() {
          return {
              idx: 0
          }
      },
      filters: {
        comma(val) {
          return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
      },
      props: {
          product: {
              type: Object,
              required: true,
          }
      }
  }
</script>
  
<style scoped>
    .productCard, .thumbnail, .thumbnail img {
      width: 100%;
    }
    .thumbnail img{
      width: 100%;
      height: 250px;
    }
.product-title {
  margin-top: 5px;
  font-weight: bold;
}

.product-price {
  color: green;
}
</style>