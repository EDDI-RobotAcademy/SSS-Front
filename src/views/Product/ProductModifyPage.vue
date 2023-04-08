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

  const productModule = 'productModule'
  
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
          ...mapState(productModule, [
            'product', 'productImgs'
        ])
      },
      methods: {
          ...mapActions(productModule, [
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
          //    this.$router.go(0)  // 새로고침 해야지만 수정 사항 반영되서 추가했는데 로딩이 좀 이상하게 됨,,
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