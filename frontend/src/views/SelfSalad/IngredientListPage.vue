<template>
  <v-container>
 
    <!-- <router-link :to="{ name : IngredientRegisterPage}"></router-link> -->
    <ingredient-list-form :ingredients="ingredients"/>
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
      // default로 spring에서 가져올 ingredients mount하기
      mounted () {
          this.requestIngredientListToSpring()
      },         
      methods: {
        ...mapActions([
          'requestIngredientListToSpring',
      // 'requestOtherTypeIngredientToSpring',
        ]),
      },
      
      // creted(){
      //   this.requestOtherTypeIngredientToSpring(this.type)
      // }

  //카테고리 변했을 때
  // computed: {
  //   ...mapState([
  //     'requestIngredientListToSpring'
  //   ]),
  // },

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