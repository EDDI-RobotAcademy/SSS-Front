<template>
    <v-container>
      <v-col cols="12" style="margin-bottom:-10px">
      <span style="font-size: 60px; font-weight: bold; margin-top: 30px; font-family:'HSBombaram';">REGISTER</span>
      <div class="line"/>
        <div>
            <ingredient-info-modify-form :id="id" v-if="ingredientInfo" :ingredientInfo="ingredientInfo" @submit="onSubmit"/>         
        <p v-else>로딩중 .......</p>
      </div>
    </v-col>
    </v-container>
  </template>
  
  <script>
  
import { mapActions, mapState } from 'vuex'
import IngredientInfoModifyForm from '@/components/SelfSalad/IngredientInfoModifyForm.vue'

const selfSaladModule = 'selfSaladModule'
  
  export default {
      components: { IngredientInfoModifyForm },
      name: "IngredientInfoModifyPage",
      props: {
        id: {
          type: String,
          required: true
        },
      },
      computed: {
        ...mapState(selfSaladModule, [
          'ingredientInfo'
        ])
      },
      methods: {
          ...mapActions(selfSaladModule, [
              'requestIngredientInfoToSpring',
              'requestIngredientInfoModifyToSpring',
          ]),
          async onSubmit (payload) {
              const formData = payload
              const ingredientId = this.id
  
              await this.requestIngredientInfoModifyToSpring({ ingredientId, formData })
              await this.$router.push({
                  name: 'IngredientListPage',
              })
          }
      },
      created(){
        console.log("id 확인"+ this.id);
        this.requestIngredientInfoToSpring(this.id)
      }
  }
  
  </script>
  
  <style scoped>
    .line{
    width: 100%;
    border-bottom: 7px solid #40513B;
    margin-top: -24px;
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