<template>  
  <v-container class="justify-center">
    <v-row>
      <v-col v-if="!products || (Array.isArray(products) && products.length === 0)">
        <p>현재 등록된 상품이 없습니다!</p>
      </v-col> 
      <v-col style="min-width: 300px;" v-else v-for="product in products" :key="product.productId" cols="3">
        <product-card :product="product"></product-card>
      </v-col>
    </v-row>
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
  
  </style>