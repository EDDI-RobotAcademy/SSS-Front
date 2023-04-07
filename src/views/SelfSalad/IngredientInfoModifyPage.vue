<template>
    <v-container>
      <div align="center">
        <h2>재료정보 수정</h2>
        <div>
            <ingredient-info-modify-form :id="id" v-if="ingredientInfo" :ingredientInfo="ingredientInfo" @submit="onSubmit"/>         
        <p v-else>로딩중 .......</p>
      </div>
      </div>
    </v-container>
  </template>
  
  <script>
  
import { mapActions, mapState } from 'vuex'
import IngredientInfoModifyForm from '@/components/SelfSalad/IngredientInfoModifyForm.vue'
  
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
        ...mapState(['ingredientInfo'])
      },
      methods: {
          ...mapActions([
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
  
  <style>
  
  </style>