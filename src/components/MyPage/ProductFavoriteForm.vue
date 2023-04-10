<template>
  <!-- (좋아요) 찜 목록 -->
    <v-container>
      <buyer-my-page-top-nav/>
        <h2 style="margin-bottom: 50px;">찜 목록</h2>
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
    </v-container>
</template>

<script>
import BuyerMyPageTopNav from "@/components/buyerMyPage/BuyerMyPageTopNav";


export default {
  name: "ProductFavoriteForm",
  components:{BuyerMyPageTopNav}
}
</script>

<style scoped></style>