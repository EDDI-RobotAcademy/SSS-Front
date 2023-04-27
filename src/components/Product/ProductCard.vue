<template>
  <v-container class="text-center">
    <v-row>
    <div class="productCard">
      <div class="thumbnail-wrapper">
        <router-link :to="{ name: 'ProductReadPage',
              params: { productId: product.productId.toString() }}">
        <img class="thumbnail" :src="require(`@/assets/product/${product.productImgList[0].editedImg}`)">
        <div class="buttonContainer" >
          <v-btn class="cartButton" @click="clickAddCart"><v-icon >mdi-cart-variant</v-icon></v-btn>
        </div>
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
              idx: 0,
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
      },
      methods: {
        clickAddCart(event) {
          event.preventDefault();
        const productId = this.product.productId
        const quantity = 1
        console.log('addCart event emitted with payload:', {productId, quantity});
        this.$emit('addCart', {productId, quantity})
    },
      }
  }
</script>
  
<style scoped>
 .productCard{
  align-items: center;
  justify-content: center;
  flex-direction: column;
 }

  .thumbnail {
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

  .thumbnail-wrapper {
  position: relative;
}
.buttonContainer {
  position: absolute;
  top: 80%;
  left: 70%;
  transform: translate(-20%, -30%);
  opacity: 0.7;
  pointer-events: auto;
}

.cartButton {
  background-color: transparent;
  color: #40513B;
}

</style>