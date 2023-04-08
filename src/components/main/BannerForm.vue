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
      <p>promotion </p>
      <div class="container">
        <div class="row">
          <div class="col" style="padding:200px; border:solid 1px black; background-color:white;">
            promotion
          </div>
        </div>
      </div>
    </div>

    <div class="py-5">
      <p>수동 이미지 슬라이드 샐러드 메뉴</p>
      <div id="mainTopCarousel-1" class=" container carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="main-top-promotion row">
              <v-col v-for="product in products.slice(0, 4)" :key="product.productId">
                <product-card :product="product"/>
              </v-col>
            </div>
          </div>
          <div class="carousel-item">
            <div class="main-top-promotion row">
              <v-col v-for="product in products.slice(4,8)" :key="product.productId">
                <product-card :product="product"/>
              </v-col>
            </div>
          </div>
        </div>
          <span class="carousel-control-prev-icon carousel-control-prev" aria-hidden="true" data-bs-target="#mainTopCarousel-1" data-bs-slide="prev"></span>
          <span class="visually-hidden">Previous</span>
          <span class="carousel-control-next-icon carousel-control-next" aria-hidden="true" data-bs-target="#mainTopCarousel-1" data-bs-slide="next"></span>
          <span class="visually-hidden">Next</span>
      </div>
    </div>
    
  </v-container>
</template>

<script>

import ProductCard from '@/components/Product/ProductCard.vue'
import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'

export default {
  components: {ProductCard},
  name: 'BannerForm',
  data() {
    return {
      // 백엔드에서 리스트 받을 꺼 생각하고 예시로 만듬
      boardList: [
        { title: 'title1', name: '살안찌는 샐러드', img: require('@/assets/popup/SSS.jpeg'), price: '11000' },
        { title: 'title2', name: '살안찌는 샐러드', img: require('@/assets/popup/SSS.jpeg'), price: '11000' },
        { title: 'title3', name: '살안찌는 샐러드', img: require('@/assets/popup/SSS.jpeg'), price: '11000' },
      ]
    }
  },
  computed:{
    ...mapState(productModule, [
      'products'
    ])
  },
  async mounted (){
    await this.requestProductListToSpring()
  },
  methods:{
    ...mapActions(productModule, [
      'requestProductListToSpring'
    ])
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