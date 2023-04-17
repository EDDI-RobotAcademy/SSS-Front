<template>
    <v-container>
      <div align="center">
        <!-- <h2>상품 상세정보</h2> -->
        <product-read-form @saveFavorite="saveFavorite" @addCart="addCart" v-if="product" :product="product" :productImgs="productImgs" :favoriteInfo="favoriteInfo"/>
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
  const ordercartModule = 'ordercartModule'

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
        ...mapActions(ordercartModule, [        
          'requestAddCartToSpring'    
    ]),
          async onDelete () {
            await this.requestDeleteProductToSpring(this.productId)
            await this.$router.push({ name: 'ProductListPage' })
          },
          async saveFavorite(payload) {
            const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId;
            const productId = payload.productId
            await this.requestSaveFavoriteToSpring({memberId, productId})
          },
          // 장바구니에 상품 추가
          async addCart(payload) {
            const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId
            const itemId = payload.productId
            const quantity = payload.quantity
            const category = 'PRODUCT'
            console.log('memberId: '+ memberId )
            console.log('productId: '+ itemId )
            console.log('quantity: '+ quantity )
            console.log('category: '+ category )
            await this.requestAddCartToSpring({memberId, itemId, category, quantity})
          },
        },
        async created () {
          console.log(this.productId)
          await this.requestProductToSpring(this.productId)
          await this.requestProductImageToSpring(this.productId)
        }
      }
    

</script>
  
  <style scoped>
  a {
    text-decoration: none;
  }
  </style>