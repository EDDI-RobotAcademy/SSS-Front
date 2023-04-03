<template>
    <v-container>
      <div align="center">
        <h2>" {{ ingredientImg.name }} " 이미지 수정</h2>
        <div>
            <ingredient-img-modify-form :id="id" v-if="ingredientImg" :ingredientImg="ingredientImg" @submit="onSubmit"/>         
        <p v-else>로딩중 .......</p>
      </div>
      </div>
    </v-container>
  </template>
  
  <script>
  
import { mapActions, mapState } from 'vuex'
import IngredientImgModifyForm from '@/components/SelfSalad/IngredientImgModifyForm.vue'
  
  export default {
      components: { IngredientImgModifyForm },
      name: "IngredientImgModifyPage",
      props: {
        id: {
          type: String,
          required: true
        },
      },
      computed: {
        ...mapState(['ingredientImg'])
      },
      methods: {
          ...mapActions([
              'requestIngredientImgToSpring',
              'requestIngredientImgModifyToSpring',
          ]),
          async onSubmit (payload) {
              const imageFile = payload
              const ingredientId = this.id
  
              await this.requestIngredientImgModifyToSpring({ ingredientId, imageFile })
              await this.$router.push({
                  name: 'IngredientListPage',
              })
          }
      },
      created(){
        console.log("id 확인"+ this.id);
        this.requestIngredientImgToSpring(this.id)
      }
  }
  
  </script>
  
  <style>
  
  </style>