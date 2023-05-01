+<template>
    <v-container>
      <h2>재료등록 페이지</h2>
      <div class="line"/>
      <ingredient-register-form @submit="onSubmit"/>
    </v-container>
  </template>
  
  <script>
  import IngredientRegisterForm from '@/components/SelfSalad/IngredientRegisterForm.vue'
  import { mapActions } from 'vuex'

  const selfSaladModule = 'selfSaladModule'
  
  export default {
      components: { IngredientRegisterForm },
      name: "IngredientRegisterPage",
      methods: {
          ...mapActions(selfSaladModule, [
              'requestCreateIngredientToSpring'
          ]),
          async onSubmit (payload) {
              await this.requestCreateIngredientToSpring(payload)
              await this.$router.push({
                  name: 'IngredientListPage',
              })
          }
      }
  }
  
  </script>
  
  <style scoped>
  .line{
    width: 100%;
    border-bottom: 2px solid #40513B;
    margin-top: 15px;
}
*{
    /* color: #40513B; */
    color: #40513B;
  }
  </style>