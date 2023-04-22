<template>
    <v-container>
      <div align="center">
        <!-- <h2>상품 상세정보</h2> -->
        <product-read-form @saveFavorite="saveFavorite" @addCart="addCart" v-if="product" :product="product" :productImgs="productImgs" :favoriteInfo="favoriteInfo"/>
        <p v-else>로딩중 .......... </p>
        <v-btn v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">
          <router-link :to="{ name: 'ProductModifyPage', params: { productId } }">
          게시물 수정
        </router-link></v-btn>
        <v-btn @click="onDelete" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">삭제</v-btn>
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
  const memberModule = 'memberModule'

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
          ]),
          ...mapState(memberModule, [
        'memberInfoAboutSignIn'
      ]),
          favoriteInfo: {
            get() {
              return this.$store.state.productModule.favoriteInfo;
            },
            set(value) {
              this.$store.commit('productModule/SET_FAVORITE_INFO', value);
            }
          }
      },
      methods: {
        ...mapActions(productModule, [
            'requestProductToSpring',
            'requestDeleteProductToSpring',
            'requestProductImageToSpring',
            'requestSaveFavoriteToSpring',
            'viewCntUp',
            'requestGetFavoriteFromSpring',
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
            const isLike = payload.isLike
            await this.requestSaveFavoriteToSpring({memberId, productId})
            this.favoriteInfo.isLike = isLike
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
          const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId
          const productId = this.productId

          await this.requestProductToSpring(productId)
          await this.requestProductImageToSpring(productId)
          await this.viewCntUp({productId, memberId});
                    
          if(memberId) {
            const localLike = localStorage.getItem(`${memberId}_${productId}_like`);
            if (localLike) {
              const {isLike} = JSON.parse(localLike);
              console.log("isLike: " + isLike);
              this.favoriteInfo.isLike = isLike;
            } else {
              const like = await this.requestGetFavoriteFromSpring({ memberId, productId });
              console.log("like: " + like)
              if (like) {
                  // 찜한 상태가 있다면 favoriteInfo를 업데이트하고 로컬 스토리지에 저장
                  this.favoriteInfo.isLike = like;
                  localStorage.setItem(`${memberId}_${productId}_like`, JSON.stringify({ memberId, productId, isLike: like }));
              } else {
                  // 찜한 상태가 없다면 false로 초기화하고 로컬 스토리지에 저장
                  this.favoriteInfo.isLike = false;
                  localStorage.setItem(`${memberId}_${productId}_like`, JSON.stringify({ memberId, productId, isLike: false }));
              }
            }
          }
      },
      mounted() {
        const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId
        const productId = this.productId
        const localLike = localStorage.getItem(`${memberId}_${productId}_like`);
        if(localLike) {
          const {isLike} = JSON.parse(localLike)
          console.log("isLike: " + isLike)
          if (isLike !== null) {
            this.favoriteInfo.isLike = isLike;
          }
        }
      }
  }
  </script>
  
  <style scoped>
  a {
    text-decoration: none;
  }
  </style>