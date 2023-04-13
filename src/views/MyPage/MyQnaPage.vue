<template>
  <v-container>
    <my-page/>
    <my-qna-form/>
  </v-container>
</template>

<script>
import MyQnaForm from "@/components/MyPage/MyQnaForm.vue";
import MyPage from "@/views/MyPage/MyPage.vue";

export default {
  name: "MyInfoQnaPage",
  components: { MyQnaForm, MyPage }
}
</script>

<style scoped></style>