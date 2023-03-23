<template>
  <v-container>

    <div class="py-5">
      <div class="container">
        <p>이달의 샐러드 </p>
        <!-- 반복문 돌려서 예시로 틀 잡아뒀습니다. -->
        <v-row>
          <v-col v-for="(boardItem, idx) in boardList" :key="idx" cols="3">
            <router-link :to="{ name: 'home' }">
              <v-img :src="boardItem.img" aspect-ratio="1" class="light gray-2">
                <template v-slot:placeholder>
                  <v-progress-circular indeterminate color="lighten-5-grey" />
                </template>
              </v-img>
            </router-link>
            <p class="product-brand">{{ boardItem.title }}</p>
            <p class="product-name">{{ boardItem.name }}</p>
            <p class="product-price">{{ boardItem.price }} won</p>
          </v-col>
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
      <p>이미지 슬라이드 샐러드 메뉴</p>
      <div id="mainTopCarousel" class=" container carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="main-top-promotion row row-cols-1 row-cols-sm-2 row-cols-md-3">
              <div class="col">
                <v-img src="@/assets/popup/SSS.jpeg" />
              </div>
              <div class="col">
                <v-img src="@/assets/popup/SSS.jpeg" />
              </div>
              <div class="col">
                <v-img src="@/assets/popup/SSS.jpeg" />
              </div>
            </div>
          </div>
          <div class="carousel-item ">
            <div class="main-top-promotion row row-cols-1 row-cols-sm-2 row-cols-md-3">
              <div class="col">
                <v-img src="@/assets/popup/SSS.jpeg" />
              </div>
              <div class="col">
                <v-img src="@/assets/popup/SSS.jpeg" />
              </div>
              <div class="col">
                <v-img src="@/assets/popup/SSS.jpeg" />
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#mainTopCarousel" data-bs-slide-to="0" class="active" aria-current="true"
            aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#mainTopCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#mainTopCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#mainTopCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'BannerForm',
  data() {
    return {
      // 백엔드에서 리스트 받을 꺼 생각하고 예시로 만듬
      boardList: [
        { title: 'title', name: '살안찌는 샐러드', img: require('@/assets/popup/SSS.jpeg'), price: '11000' },
        { title: 'title', name: '살안찌는 샐러드', img: require('@/assets/popup/SSS.jpeg'), price: '11000' },
        { title: 'title', name: '살안찌는 샐러드', img: require('@/assets/popup/SSS.jpeg'), price: '11000' },
        { title: 'title', name: '살안찌는 샐러드', img: require('@/assets/popup/SSS.jpeg'), price: '11000' },
      ]
    }
  }

}
</script>

<style></style>