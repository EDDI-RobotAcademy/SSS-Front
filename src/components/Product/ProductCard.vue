<template>
  <v-container class="text-center">
    <v-row>
    <div class="productCard">
      <div class="thumbnail">
        <router-link :to="{ name: 'ProductReadPage',
              params: { productId: product.productId.toString() }}">
        <img :src="require(`@/assets/product/${product.productImgList[0].editedImg}`)">
      </router-link>

      </div>
      <p style="text-align: center;" class="product-title">{{ product.title }}</p>
      <p style="text-align: center;" class="product-price">{{ product.price | comma }}원</p>
    </div>
  </v-row>
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
 .productCard{
  align-items: center;
  justify-content: center;
  flex-direction: column;
 }

  .thumbnail img{
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
 .product-title {
    font-size: 25px;
    text-align: center;
    margin-top: 30px;
  }
  .product-price {
    font-size: 20px;
    padding: 10px 0;
    text-align: center;
    margin-top: 10px;
  }
  
  *{
    color: #40513B;
  }
</style>