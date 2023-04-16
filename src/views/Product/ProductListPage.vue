<template>
    <v-container>
        <h1>Salad</h1>
        <router-link :to="{ name: 'ProductRegisterPage' }">
            상품 등록
        </router-link>

          <v-col cols="12">
            <div class="search-bar">
              <select v-model="searchBy">
                <option value="title">제품명</option>
              </select>
              <input type="text" v-model="searchQuery" placeholder="검색" @keyup.enter="searchProducts">
              <button @click="searchProducts">검색</button>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="sort-bar">
              <div class="total">
                총 {{ dpitems.length }}개
              </div>
              <sort-product class="sort"/>
            </div>
          </v-col>


          <product-list-form :products="dpitems" :current-page="currentPage" /> 

    </v-container>
  </template>
  
  <script>

  import ProductListForm from '@/components/Product/ProductListForm.vue'
  import ProductCard from '@/components/Product/ProductCard.vue'
  import SortProduct from '@/components/Product/SortProduct.vue'
  import { mapActions, mapState } from 'vuex'

  const productModule = 'productModule'
  
  export default {
    name: "ProductListPage",
    components: { ProductListForm, ProductCard, SortProduct },
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
  
  <style scoped>
.search-bar, .sort-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.search-bar select,
.search-bar input[type="text"],
.search-bar button,
.sort-bar .sort {
  width: auto;
  margin-right: 10px;
  font-size: 14px;
  padding: 5px;
}

.sort-bar .total {
  margin-right: auto;
  margin-left: 20px;
}

.total {
  font-size: 20px;
  font-weight: bold;
}
  </style>