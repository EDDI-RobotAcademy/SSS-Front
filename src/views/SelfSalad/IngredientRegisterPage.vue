+<template>
    <v-container>
        <v-col cols="12" style="margin-bottom:-10px">
      <span style="font-size: 70px; font-weight: bold; margin-top: 30px; font-family:'HSBombaram';">REGISTER</span>
      <div class="line"/>
      <ingredient-register-form @submit="onSubmit"/>
    </v-col>
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
    border-bottom: 7px solid #40513B;
    margin-top: -28px;
}
*{
    /* color: #40513B; */
    color: #40513B;
  }
  @font-face {
    font-family: 'HSBombaram';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  </style>