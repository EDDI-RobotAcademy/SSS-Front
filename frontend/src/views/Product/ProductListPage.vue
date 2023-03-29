<template>
    <v-container>
        <h2>상품 목록 페이지</h2>
        <router-link :to="{ name: 'ProductRegisterPage' }">
            상품 등록
        </router-link>
        <product-list-form :products="products"/>
    </v-container>
  </template>
  
  <script>
<<<<<<< HEAD:frontend/src/views/Board/Product/ProductListPage.vue
  import ProductListForm from '@/components/Board/Product/ProductListForm.vue'
  import ProductCard from '@/components/Board/Product/ProductCard.vue'
=======
  import ProductListForm from '@/components/Product/ProductListForm.vue'
>>>>>>> main:frontend/src/views/Product/ProductListPage.vue
  import { mapActions, mapState } from 'vuex'
  
  export default {
    components: { ProductListForm, ProductCard },
    name: "ProductListPage",
    computed:{
      ...mapState([
        'products'
      ])
    },
    mounted (){
      this.requestProductListToSpring()
    },
    methods:{
      ...mapActions([
        'requestProductListToSpring'
      ])
    }
  }
  </script>
  
  <style></style>