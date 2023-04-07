<template>
    <v-container>
      <v-row>
        <h1>Salad</h1>
        <router-link :to="{ name: 'ProductRegisterPage' }">
            상품 등록
        </router-link>
        <product-list-form :products="products"/>
      </v-row>  
    </v-container>
  </template>
  
  <script>

  import ProductListForm from '@/components/Product/ProductListForm.vue'
  import ProductCard from '@/components/Product/ProductCard.vue'
  import { mapActions, mapState } from 'vuex'
  
  export default {
    components: { ProductListForm, ProductCard },
    name: "ProductListPage",
    computed:{
      ...mapState([
        'products'
      ])
    },
    async mounted (){
      await this.requestProductListToSpring()
    },
    methods:{
      ...mapActions([
        'requestProductListToSpring'
      ])
    }
  }
  </script>
  
  <style></style>