<template>  
  <v-container class="justify-center">
    <v-row>
      <v-col v-if="!products || (Array.isArray(products) && products.length === 0)">
        <p>현재 등록된 상품이 없습니다!</p>
      </v-col> 
      <v-col style="min-width: 300px;" v-for="(product, index) in calData" :key="index" cols="3" v-else>
        <product-card :product="product" @addCart="addCart" :favoriteInfo="favoriteInfo" :favoriteList="favoriteList" @saveFavorite="saveFavorite"/>
      </v-col> 
    </v-row>
    <v-pagination
      v-model="curPageNum"
      :length="numOfPages"
      color="#2c4636"
      class="mt-10"
      flat
    ></v-pagination>
  </v-container>
  </template>
  <script>
  import ProductCard from "@/components/Product/ProductCard.vue";
  import { mapActions,mapState  } from 'vuex'
  const ordercartModule = 'ordercartModule'
  const productModule = 'productModule'
    export default {
        name: "ProductListForm",
        components: {
          ProductCard
        },
        data() {
          return {
            listData: ["products"],
            dataPerPage: 8,
            curPageNum: 1,
          };
        },
        props: {
          products: {
              type: Array
          }
        },
        computed: {
          startOffset() {
            return (this.curPageNum - 1) * this.dataPerPage;
          },
          endOffset() {
            return this.startOffset + this.dataPerPage;
          },
          numOfPages() {
            return Math.ceil(this.products.length / this.dataPerPage);
          },
          calData() {
            return this.products.slice(this.startOffset, this.endOffset);
          },
          ...mapState(productModule, [
            'favoriteInfo',
            'favoriteList'
          ]),
          favoriteInfo: {
            get() {
              return this.$store.state.productModule.favoriteInfo;
            },
            set(value) {
              this.$store.commit('productModule/SET_FAVORITE_INFO', value);
            }
          },
          favoriteList: {
            get() {
              return this.$store.state.productModule.favoriteList;
            },
            set(value) {
              this.$store.commit('productModule/SET_FAVORITE_INFO', value);
            }
          }
        },
      async created (){
        await this.requestFavoriteListToSpring()
      },
      methods: {
        ...mapActions(ordercartModule, [        
          'requestAddCartToSpring'    
        ]),
          async addCart(payload) {
            const itemId = payload.productId
            const quantity = payload.quantity
            const category = 'PRODUCT'
            console.log('productId: '+ itemId )
            console.log('quantity: '+ quantity )
            console.log('category: '+ category )
            await this.requestAddCartToSpring({ itemId, category, quantity})
          },
        ...mapActions(productModule, [
          'requestSaveFavoriteToSpring',
          'requestFavoriteListToSpring'
        ]),
        async saveFavorite(payload) {
          const productId = payload.productId
          await this.requestSaveFavoriteToSpring(productId)
          await this.requestFavoriteListToSpring()
          }
        }
    }
  </script>
  
  <style scoped>
  
  </style>