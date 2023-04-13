<template>
  <v-container>
    <my-page/>
    <my-favorite-form/>
  </v-container>
</template>


<script>

import MyFavoriteForm from "@/components/MyPage/MyFavoriteForm.vue";
import MyPage from "@/views/MyPage/MyPage.vue";


export default {
  name: "MyFavoritePage",
  components: { MyFavoriteForm, MyPage }
}
</script>

    MyInfoForm
<style scoped></style>