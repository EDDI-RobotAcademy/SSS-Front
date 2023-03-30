<template>
    <v-container>
      <div align="center">
        <h2>게시물 수정</h2>
        <product-modify-form v-if="product" :productId="productId"
                                 :product="product" :productImgs="productImgs" @submit="onSubmit"/>
        <p v-else>로딩중 ........</p>
      </div>
    </v-container>
  </template>
  
  <script>
  
  import ProductModifyForm from '@/components/Product/ProductModifyForm.vue'
  import { mapActions, mapState } from 'vuex'
  
  export default {
      components: { ProductModifyForm },
      name: "ProductModifyPage",
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
              'requestProductModifyToSpring',
              'requestProductImageToSpring',
          ]),
          async onSubmit (payload) {
              console.log('payload: ' + JSON.stringify(payload))
  
              await this.requestProductModifyToSpring(payload)
              await this.$router.push({
                  name: 'ProductReadPage',
                  params: { productId: this.productId, productImgs: this.productImgs }
              })
          }
      },
      async created () {
          await this.requestProductToSpring(this.productId)
          await this.requestProductImageToSpring(this.productId)
      }
  }
  
  </script>
  
  <style>
  
  </style>