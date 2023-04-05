<template>
    <v-container>
        <div align="center">
            <h2>상품 등록</h2>
            <product-register-form @submit="onSubmit"/>
        </div>
    </v-container>
  </template>
  
  <script>
  import ProductRegisterForm from '@/components/Product/ProductRegisterForm.vue';
  import { mapActions } from 'vuex';
  
  export default {
      components: { ProductRegisterForm },
      name: "ProductRegisterPage",
      methods: {
          ...mapActions ([
              'requestCreateProductToSpring'
          ]), 
          async onSubmit (payload) {  
              await this.requestCreateProductToSpring(payload)
              await this.$router.push({ 
                  name: 'ProductListPage'
              })
          }
      }
  }
  </script>
  
  <style>
  
  </style>