<template>
  <v-container>
  <my-info-form @submit="onSubmit"/>
</v-container>
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
    </v-container>
  </div>
</template>

<script>

import MyInfoForm from "@/components/MyPage/MyInfoForm";
import MyShoppingCartForm from "@/components/MyPage/MyShoppingCartForm";
import MyReviewForm from "@/components/MyPage/MyReviewForm";


export default {
  components: {MyInfoForm}
  name: "MyPage",
  components: { MyInfoForm, 
                MyShoppingCartForm,
                MyReviewForm
              }
}
</script>

<style scoped>

</style>