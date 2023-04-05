<template>
    <div class="productCard">
      <div class="thumbnail">
          <img :src="require(`@/assets/product/${product.productImgs[this.idx].editedImg}`)">
      </div>
      <p class="title">{{ product.title }}</p>
      <p class="price">{{ product.price | comma }}원</p>
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
    .title {
      font-size: 25px;
      text-align: center;
      margin-top: 30px;
      color: black;
      font-weight: bold;

    }
    .price {
      font-size: 20px;
      text-align: center;
      color: green;
    }
</style>