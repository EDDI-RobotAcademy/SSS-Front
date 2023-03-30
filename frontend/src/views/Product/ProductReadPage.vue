<template>
    <v-container>
      <div align="center">
        <!-- <h2>상품 상세정보</h2> -->
        <product-read-form v-if="product" :product="product" :productImgs="productImgs"/>
        <p v-else>로딩중 .......... </p>
        <router-link :to="{ name: 'ProductModifyPage', params: { productId } }">
          게시물 수정
        </router-link>
        <button @click="onDelete">삭제</button>
        <router-link :to="{ name: 'ProductListPage' }">
          돌아가기
        </router-link>
      </div>
    </v-container>
  </template>
  
  <script>
  
  import ProductReadForm from '@/components/Product/ProductReadForm.vue'
  import { mapActions, mapState } from 'vuex'
  
  export default {
    components: { ProductReadForm },
      name: "ProductReadPage",
      props: {
          productId: {
              type: String,
              required: true,
          }
      },
      computed: {
          ...mapState(['product', 'productImgs'])
      },
      methods: {
          ...mapActions([
              'requestProductToSpring',
              'requestDeleteProductToSpring',
              'requestProductImageToSpring',
          ]),
          async onDelete () {
              await this.requestDeleteProductToSpring(this.productId)
              await this.$router.push({ name: 'ProductListPage' })
          }
      },
      async created () {
          console.log(this.productId)
          await this.requestProductToSpring(this.productId)
          await this.requestProductImageToSpring(this.productId)
      }
  }
  
  </script>
  
  <style>
  
  </style>