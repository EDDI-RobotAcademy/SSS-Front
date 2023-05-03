<template>
  <v-container>

    <div class="py-5">
      <div class="container">
        <p>이달의 샐러드 </p>
        <!-- 반복문 돌려서 예시로 틀 잡아뒀습니다. -->
        <v-row>
          <div class="main-top-promotion row">
          <v-col v-for="(boardItem, idx) in boardList" :key="idx">
            <router-link :to="{ name: 'home' }">
              <v-img :src="boardItem.img" aspect-ratio="1" class="light gray-2">
                <template v-slot:placeholder>
                  <v-progress-circular indeterminate color="lighten-5-grey" />
                </template>
              </v-img>
            </router-link>
            <p class="product-title">{{ boardItem.name }}</p>
            <p class="product-price">{{ boardItem.price  }} 원</p>
          </v-col>
        </div>
        </v-row>
      </div>
    </div>


    <div class="py-5">
      <div>
        <div align="left" style="font-weight: bold; font-size: 24px;">
          <h4>지금 가장 핫한 샐러드</h4>
        </div>
        <div align="right">
          <router-link to="/product-list" class="ifno-black">
            <span>더보기</span>
          </router-link>
        </div>    
      </div>
      <div id="mainTopCarousel-1" class=" container carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <v-row>
              <v-col v-for="product in products.slice(0, 4)" :key="product.productId">
                <product-card :product="product" @addCart="addCart" :favoriteInfo="favoriteInfo" :favoriteList="favoriteList" @saveFavorite="saveFavorite"/>
              </v-col>
            </v-row>
              </div>
          <div class="carousel-item">
            <v-row>
              <v-col v-for="product in products.slice(4,8)" :key="product.productId">
                <product-card :product="product" @addCart="addCart" :favoriteInfo="favoriteInfo" :favoriteList="favoriteList" @saveFavorite="saveFavorite"/>
              </v-col>
            </v-row>
          </div>
        </div>
          <span class="carousel-control-prev-icon carousel-control-prev" aria-hidden="true" data-bs-target="#mainTopCarousel-1" data-bs-slide="prev"></span>
          <span class="visually-hidden">Previous</span>
          <span class="carousel-control-next-icon carousel-control-next" aria-hidden="true" data-bs-target="#mainTopCarousel-1" data-bs-slide="next"></span>
          <span class="visually-hidden">Next</span>
      </div>
    </div>

    <div class="py-5">
      <div>
        <div align="left" style="font-weight: bold; font-size: 24px;">
          <h4>샐러드와 든든함을 더해봐요</h4>
        </div>
        <div align="right">
          <router-link to="/side-Product-list" class="ifno-black">
            <span>더보기</span>
          </router-link>
        </div>    
      </div>
      <div id="mainTopCarousel-1" class=" container carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <v-row>
              <v-col v-for="sideProduct in sideProducts.slice(0, 4)" :key="sideProduct.sideProductId">
                <side-product-card :sideProduct="sideProduct"/>
              </v-col>
            </v-row>
              </div>
        </div>
      </div>
    </div>
    
  </v-container>
</template>

<script>

import ProductCard from '@/components/Product/ProductCard.vue'
import SideProductCard from '@/components/SideProduct/SideProductCard.vue';
import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'
const sideProductModule = 'sideProductModule'
const ordercartModule = 'ordercartModule'

export default {
  components: {ProductCard, SideProductCard},
  name: 'BannerForm',
  computed:{
    ...mapState(productModule, [
      'products'
    ]),
    ...mapState(sideProductModule, [
      'sideProducts'
    ]),
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
  async mounted (){
    await this.requestProductListToSpring()
    await this.requestSideProductListToSpring()
    await this.requestSortFavoriteToSpring()
  },
  methods:{
    ...mapActions(productModule, [
      'requestProductListToSpring',
      'requestSortFavoriteToSpring'
    ]),
    ...mapActions(sideProductModule, [
      'requestSideProductListToSpring'
    ]),
    ...mapActions(productModule, [
      'requestSaveFavoriteToSpring',
      'requestFavoriteListToSpring'
    ]),
    async saveFavorite(payload) {
      const productId = payload.productId
      await this.requestSaveFavoriteToSpring(productId)
      await this.requestFavoriteListToSpring()
    },
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
  }
}
</script>

<style scoped>


.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1) sepia(1) hue-rotate(180deg); 
}
.carousel-control-prev-icon{
  margin-left: -100px;
  margin-top: 190px;
}
.carousel-control-next-icon {
  margin-right: -70px;
  margin-top: 190px;
}
.product-title {
  margin-top: 5px;
  font-weight: bold;
}

.product-price {
  color: green;
} 
</style>