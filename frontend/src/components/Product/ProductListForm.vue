<template>
  <v-container>
    <div class="div">
      <table>
        <tr class="cardSession">
          <td v-if="!products || (Array.isArray(products) && products.length === 0)">
            <p colspan="4">
                현재 등록된 상품이 없습니다!
            </p>
          </td>  
          <td class="card" v-else v-for="product in products" :key="product.productId">
            <router-link :to="{ name: 'ProductReadPage',
                              params: { productId: product.productId.toString() }}">
            <product-card :product="product"></product-card>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
  </v-container>
  </template>
  
  <script>
  import ProductCard from "@/components/Product/ProductCard.vue";

    export default {
        name: "ProductListForm",
        components: {
          ProductCard
        },
        props: {
          products: {
              type: Array
          }
        }
    }
  </script>
  
  <style scoped>
    .cardSession{
    width: 100%;
    background-color: rgb(216, 238, 224);
    margin-bottom: 50px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .cardSession .card{
    width: 21%;
    height: 400px;
  }
  .cardSession .card:nth-child(4n){
    margin-bottom: 60px;
  }
  a { text-decoration: none;}
  </style>