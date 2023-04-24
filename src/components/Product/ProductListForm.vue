<template>  
  <v-container class="justify-center">
    <v-row>
      <v-col v-if="!products || (Array.isArray(products) && products.length === 0)">
        <p>현재 등록된 상품이 없습니다!</p>
      </v-col> 
      <v-col style="min-width: 300px;" v-else v-for="(product, index) in calData" :key="index" cols="3">
        <product-card :product="product"></product-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="curPageNum"
      :length="numOfPages"
      color="#2c4636"
      class="mt-10"
      flat
    ></v-pagination>
  </v-container>
  </template>
  <script>
  import ProductCard from "@/components/Product/ProductCard.vue";

    export default {
        name: "ProductListForm",
        components: {
          ProductCard
        },
        data() {
          return {
            listData: ["products"],
            dataPerPage: 8,
            curPageNum: 1,
          };
        },
        props: {
          products: {
              type: Array
          }
        },
        computed: {
          startOffset() {
            return (this.curPageNum - 1) * this.dataPerPage;
          },
          endOffset() {
            return this.startOffset + this.dataPerPage;
          },
          numOfPages() {
            return Math.ceil(this.products.length / this.dataPerPage);
          },
          calData() {
            return this.products.slice(this.startOffset, this.endOffset);
          },
        },
    }
  </script>
  
  <style scoped>
  
  </style>