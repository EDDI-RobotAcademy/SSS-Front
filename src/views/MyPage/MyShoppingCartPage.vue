<template>
  <v-container>
    <my-page/>
    <my-shopping-cart-form/>
  </v-container>
</template>


<script>
import MyShoppingCartForm from '@/components/MyPage/MyShoppingCartForm.vue'
import MyPage from "@/views/MyPage/MyPage.vue";

export default {
  name: "MyShoppingCartPage",
  components: { MyShoppingCartForm, MyPage }

}
</script>

<style scoped></style>