<template>
  <!-- (좋아요) 찜 목록 -->
  <v-card flat style="width: 100%">
    <v-card-text>
      <h2 style="margin-left: 50px">찜 목록</h2>
      <v-divider style="margin-top: 30px"></v-divider>
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
              <div class="col" style="padding:100px 100px; border:solid 1px black; background-color:white;">
                찜 상품
              </div>
              <div class="col" style="padding:100px 100px; border:solid 1px black; background-color:white;">
                찜 상품
              </div>
              <div class="col" style="padding:100px 100px; border:solid 1px black; background-color:white;">
                찜 상품
              </div>
              <div class="col" style="padding:100px 100px; border:solid 1px black; background-color:white;">
                찜 상품
              </div>
            </div>
          </div>
    </v-card-text>
    </v-card>
</template>

<script>


export default {
  name: "MytFavoriteForm"
}
</script>

<style scoped></style>