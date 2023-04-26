<template>
    <v-container>
      <v-col cols="12">
        <div>
          <div class="search-bar">
        <p class="saladPageName">Salad</p> 
        <div>
          <router-link :to="{ name: 'ProductRegisterPage' }" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">
            상품 등록
        </router-link>
        </div>
        <div class="search-bar">
              <select v-model="searchBy" style="padding-right: 10px;">
                <option value="title">제품명</option>
              </select>
              <v-text-field v-model="searchQuery" style="width: 300px; margin-right: 20px;" type="text" placeholder="찾고싶은 제품을 입력하세요"/>
              <v-btn style="background-color: #609966; color: white;" type="submit" @click="searchProducts">
              검색
            </v-btn>
            </div>
            </div>
            <div class="longline"/>
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

  const memberModule = 'memberModule'
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
      ...mapState(memberModule, [
        'memberInfoAboutSignIn'
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
  .saladPageName{
    font-size: 60px;
    text-align: left;
    color: #40513B;
    
  }
  .search-bar {
  font-size: 20px; /* 폰트 크기를 20px로 설정 */
}
.search-bar, .sort-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.search-bar select,
.search-bar input[type="text"],
.search-bar button{
font-size: 20px;
}
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

.longline{
    width: 100%;
    border-bottom: 3px solid #40513B;
    margin: 10px 0;
}
.search-bar {
  display: flex;
  justify-content: space-between; /* 요소들을 양쪽 끝으로 정렬 */
  align-items: center;
}

.sort-bar {
  display: flex;
  justify-content: flex-end; /* 요소들을 오른쪽 끝으로 정렬 */
  align-items: center;
}
*{
    color: #40513B;
  }

  </style>