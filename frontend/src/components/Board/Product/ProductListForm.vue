<template>
    <v-container>
    <h3>상품 목록</h3>
    <div class="div">
      <table>
        <tr>
          <th align="center" width="100">No</th>  
          <th align="center" width="640">샐러드</th>
          <th align="center" width="150">가격</th>
        </tr>
        <tr v-if="!products || (Array.isArray(products) && products.length === 0)">
          <td colspan="4">
              현재 등록된 상품이 없습니다!
          </td>
        </tr>
        <tr v-else v-for="product in products" :key="product.productId">
          <td>
            {{ product.productId }}
          </td>
          <td>
            <router-link :to="{ name: 'ProductReadPage',
                              params: { productId: product.productId.toString() }}">
              {{ product.title }}
            </router-link>
          </td>
          <td>
            {{ product.price }}
          </td>
        </tr>
      </table>
    </div>
  </v-container>
  </template>
  
    <script>
    export default {
        name: "ProductReadForm",
        props: {
          products: {
              type: Array
          }
      
        }
    }
    </script>
  
    <style>
    </style>