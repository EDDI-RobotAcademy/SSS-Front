<template>
  <v-container>
    <div class="py-5">
      <div class="container">
        <p>이달의 샐러드 </p>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          <div class="col" style="padding:100px 100px; border:solid 1px black; background-color:white;">
            이달의 샐러드
          </div>
          <div class="col" style="padding:100px 100px; border:solid 1px black; background-color:white;">
            이달의 샐러드
          </div>
          <div class="col" style="padding:100px 100px; border:solid 1px black; background-color:white;">
            이달의 샐러드
          </div>
        </div>
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
      <div id="mainTopCarousel" class=" container carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="main-top-promotion row row-cols-1 row-cols-sm-2 row-cols-md-3">
            <div class="col" style="padding:100px 200px; background-color:gray;">
              <img src="" alt="샐러드 메뉴1">
            </div>
            <div class="col" style="padding:100px 200px; background-color:green;">
              샐러드 메뉴2
            </div>
            <div class="col" style="padding:100px 200px; background-color:gray;">
              샐러드 메뉴3
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#mainTopCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
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
};
</script>

<style></style>