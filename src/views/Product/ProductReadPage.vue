<template>
    <v-container>
      <div align="center">
        <!-- <h2>상품 상세정보</h2> -->
        <product-read-form @saveFavorite="saveFavorite" v-if="product" :product="product" :productImgs="productImgs" :favoriteInfo="favoriteInfo"/>
        <p v-else>로딩중 .......... </p>
        <v-btn><router-link :to="{ name: 'ProductModifyPage', params: { productId } }">
          게시물 수정
        </router-link></v-btn>
        <v-btn @click="onDelete">삭제</v-btn>
        <v-btn><router-link :to="{ name: 'ProductListPage' }">
          목록
        </router-link></v-btn>
      </div>
    </v-container>
  </template>
  
  <script>
  
  import ProductReadForm from '@/components/Product/ProductReadForm.vue'
  import { mapActions, mapState } from 'vuex'

  const productModule = 'productModule'

  export default {
    components: { ProductReadForm },
      name: "ProductReadPage",
      props: {
          productId: {
              type: String,
              required: true,
          },
      },
      computed: {
          ...mapState(productModule, [
            'product', 'productImgs', 'favoriteInfo'
          ])
      },
      methods: {
          ...mapActions(productModule, [
              'requestProductToSpring',
              'requestDeleteProductToSpring',
              'requestProductImageToSpring',
              'requestSaveFavoriteToSpring',
              'viewCntUp'
          ]),
          async onDelete () {
              await this.requestDeleteProductToSpring(this.productId)
              await this.$router.push({ name: 'ProductListPage' })
          },
          async saveFavorite(payload) {
            const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId;
            const productId = payload.productId
            await this.requestSaveFavoriteToSpring({memberId, productId})
          }
      },
      async created () {
          console.log(this.productId)
          await this.requestProductToSpring(this.productId)
          await this.requestProductImageToSpring(this.productId)
          await this.viewCntUp(this.productId);
      },
    }
   
  </script>
  
  <style scoped>
  a {
    text-decoration: none;
  }
  </style>