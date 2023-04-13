<template>
  <v-container>
    <my-page/>
    <my-review-form/>
  </v-container>
</template>

<script>
import MyReviewForm from '@/components/MyPage/MyReviewForm.vue'
import MyPage from "@/views/MyPage/MyPage.vue";

export default {
  name: "MyReviewPage",
  components: { MyReviewForm, MyPage }
}
</script>

<style scoped></style>