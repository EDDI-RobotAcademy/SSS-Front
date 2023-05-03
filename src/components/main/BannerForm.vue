<template>
  <v-container>

    <p class="saladPageName">To Make Self Salad </p> 
    <div align="right" style="margin-right: 194px;">
      <router-link to="/selfsalad/ingredient-list-page">
        <span>Let's go make</span>
      </router-link>
    </div>  
    <div class="line"></div>
    <div class="row">
      <div class="col-2"></div>
        <img src="@/assets/popup/SSS.jpeg" class="col-3" >
      <div class="col-6">
        <h4>SELF</h4>
        <p><sapn>자신만의 개성있는 샐러드를 만들어보세요.</sapn> <br><br>
          SelfSalad로 새로운 맛과 영양소를 담은 개성 넘치는 샐러드를 즐겨보세요. <br>
          샐러드의 이름을 직접 지정할 수도 있으니, 당신의 창의력만 있으면 됩니다.</p>
      </div>
    </div>
    <div class="line"></div>
    <div class="row">
      <div class="col-2"></div>
        <img src="@/assets/Introduction/Kcal.jpg" class="col-3" >
      <div class="col-6">
        <h4>CALORIE</h4>
        <p><sapn>재료 선택할 때마다 해당 재료의 칼로리 정보를 함께 제공합니다.</sapn> <br> <br>
          건강한 식습관을 유지하면서도 영양소를 충분히 섭취할 수 있는 방법을 제공하기 <br> 
          때문에 당신이 선택한 재료의 칼로리 정보를 확인하고 적절한 양을 조절하여 건강한 <br>
          샐러드를 만들어보세요.
          </p>
      </div>
    </div>
    <div class="line"></div>
    <div class="row">
      <div class="col-2"></div>
      <img src="@/assets/Introduction/Category1.jpg" class="col-3" >
      <div class="col-6">
        <h4>CATEGORY</h4>
          <p><sapn>당신만의 샐러드를 만들기 위해 필요한 다양한 신선한 재료들을 준비했습니다.</sapn><br><br>
              시즌에 따라 변화하는 계절 채소부터 신선한 과일, 고단백 식재료까지 다양한 옵션을 <br>
              제공하기 때문에 원하는 토핑을 얹어 샐러드를 만들어 보세요.
        </p>
      </div>
    </div>
    <div class="line"></div>


    

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
.saladPageName{
  font-size: 70px;
  text-align: center;
  color: #40513B; 
  margin: 70px 70px;
}
.line{
  width: 70%;
  border-bottom: 3px solid #40513B;
  margin: 20px auto;
}
img {
  max-width: 300px;
  height: auto;
}

</style>