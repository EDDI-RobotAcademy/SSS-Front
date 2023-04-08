+<template>
    <v-container>
      <h2>재료 작성</h2>
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
  
  <style>
  </style>