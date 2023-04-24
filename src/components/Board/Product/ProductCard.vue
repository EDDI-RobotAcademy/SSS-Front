<template>
  <div class="productCard">
    <div class="thumbnail">
        <img :src="require(`@/assets/${product.productImgs[this.idx].editedImg}`)">
    </div>
    <p class="product-title">{{ product.title }}</p>
    <p class="product-price">{{ product.price | comma }}원</p>
  </div>
</template>

<script>
export default {
    name: "ProductCard",
    data() {
        return {
            idx: 0
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
    padding:5px;
  }
  .thumbnail img{
    width: 265px;
    height: 300px;
    object-fit: cover;
  }
 .product-title {
    font-size: 20px;
    text-align: center;
    margin-top: 30px;
  }
  .product-price {
    font-size: 15px;
    padding: 10px 0;
    text-align: center;
    margin-top: 10px;
  }
  *{
    color: #40513B;
  }
</style>