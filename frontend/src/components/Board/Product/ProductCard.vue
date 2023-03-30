<template>
  <div class="productCard">
    <div class="thumbnail">
        <img :src="require(`@/assets/${product.productImgs[this.idx].editedImg}`)">
    </div>
    <p class="title">{{ product.title }}</p>
    <p class="price">{{ product.price }}</p>
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
  }
  .thumbnail img{
    width: 100%;
    height: 250px;
  }
  .title {
    font-size: 25px;
    padding: 10px 0;
    text-align: center;
    margin-top: 30px;
  }
  .price {
    font-size: 20px;
    padding: 10px 0;
    text-align: center;
    margin-top: 10px;
  }
</style>