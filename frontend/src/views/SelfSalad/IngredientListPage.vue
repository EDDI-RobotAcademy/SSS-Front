<template>
  <v-container>
 
    <!-- <router-link :to="{ name : IngredientRegisterPage}"></router-link> -->
    <ingredient-list-form :ingredients="ingredients" @change="changeCategory" />
    <!-- @change="onChange" -->
    
  </v-container>
</template>

<script>
import IngredientListForm from '@/components/SelfSalad/IngredientListForm.vue';
import { mapActions, mapState } from 'vuex'
  export default {
      components: { IngredientListForm },
      name: "IngredientListPage",

      computed: {
        ...mapState([
          'ingredients'
        ]),
      },
      mounted () {
          this.requestIngredientListToSpring()
      },         
      methods: {
        ...mapActions([
          'requestIngredientListToSpring',
          'requestIngredientCategoryToSpring'
        ]),
        async changeCategory(payload){
          await this.requestIngredientCategoryToSpring(payload) //카테고리 이름
        },
      },
  // async onSubmit (payload) {
  //     await this.requestIngredientListToSpring(payload)
  //     await this.$router.push({
  //         name: 'IngredientListPage',
  //     })
  //   }
}

</script>

<style>

</style>