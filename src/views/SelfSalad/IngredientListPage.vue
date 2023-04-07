<template>
  <v-container>
    <ingredient-list-form :ingredients="ingredients" @change="changeCategory" />
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
      // default로 spring에서 가져올 ingredients mount하기
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
      beforeRouteLeave(to, from, next) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('option')) {
            localStorage.removeItem(key);
          }
        }
        next(); 
      },
}

</script>

<style>

</style>