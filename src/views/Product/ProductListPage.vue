<template>
    <v-container>
      <v-row>
        <h1>Salad</h1>
        <router-link :to="{ name: 'ProductRegisterPage' }">
            상품 등록
        </router-link>
        <div>
          <select v-model="searchBy">
            <option value="title">제품명</option>
          </select>
          <input type="text" v-model="searchQuery" placeholder="검색" @keyup.enter="searchProducts">
          <button @click="searchProducts">검색</button>
        </div>
        <product-list-form :products="dpitems" :current-page="currentPage" />
      </v-row>  
    </v-container>
  </template>
  
  <script>

  import ProductListForm from '@/components/Product/ProductListForm.vue'
  import ProductCard from '@/components/Product/ProductCard.vue'
  import { mapActions, mapState } from 'vuex'

  const productModule = 'productModule'
  
  export default {
    components: { ProductListForm, ProductCard },
    name: "ProductListPage",
    data () { 
      return {
        searchQuery: '',
        dpitems: [],
        searchBy: 'title',
        currentPage: 1,
      }
    },
    computed:{
      ...mapState(productModule, [
        'products'
      ]),
    },
    async mounted () {
      await this.requestProductListToSpring()
    },
    methods:{
      ...mapActions(productModule, [
        'requestProductListToSpring'
      ]),
      searchProducts(){
        const query = this.searchQuery.toLowerCase();
        if (query === '') {
          this.dpitems = this.products;
        } else {
          if (this.searchBy === 'title') { 
            this.dpitems = this.products.filter(product => product.title.toLowerCase().includes(query));
          }
        }
        this.currentPage = 1;
      }
    },
    created () {
      if (this.products && this.products.length > 0) {
        this.searchProducts();
      }
    },
    watch: {
      products() {
        if (this.products && this.products.length > 0) {
          this.searchProducts();
        }
      },
    }
  }
  </script>
  
  <style></style>