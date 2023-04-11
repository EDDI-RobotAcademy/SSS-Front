<template>
  <div>
    <v-container style="width: 1400px">
      <h2>마이 페이지</h2>
      <v-divider style="margin-top: 40px"></v-divider>

      <div style="margin-top: 80px">
        <v-tabs vertical>
          <v-tab style="margin-bottom: 30px; font-weight: bold">
            회원 정보 관리
          </v-tab>
          <v-tab-item>
            <my-info-form />
          </v-tab-item>
          <v-tab style="margin-bottom: 30px; font-weight: bold">
            장바구니
          </v-tab>
          <v-tab-item>
            <my-shopping-cart-form/>
          </v-tab-item>
          <v-tab style="margin-bottom: 30px; font-weight: bold">
            나의 리뷰
          </v-tab>
          <v-tab-item>
            <my-review-form/>
          </v-tab-item>
          <v-tab style="margin-bottom: 30px; font-weight: bold">
            찜 상품
          </v-tab>
          <v-tab-item>
            <my-favorite-form />
          </v-tab-item>
          <v-tab style="margin-bottom: 30px; font-weight: bold">
            회원 탈퇴
          </v-tab>
          <v-tab-item>
            <my-account-drop-form />
          </v-tab-item>
    </v-container>
  </div>
</template>

<script>

import MyInfoForm from "@/components/MyPage/MyInfoForm";
import MyAccountDropForm from "@/components/MyPage/MyAccountDropForm";
import MyFavoriteForm from "@/components/MyPage/MyFavoriteForm";
import MyShoppingCartForm from "@/components/MyPage/MyShoppingCartForm";
import MyReviewForm from "@/components/MyPage/MyReviewForm";


export default {
  name: "MyPage",
  components: { MyInfoForm, 
                MyAccountDropForm, 
                MyFavoriteForm, 
                MyShoppingCartForm,
                MyReviewForm
              }
}
</script>

<style scoped>

</style>