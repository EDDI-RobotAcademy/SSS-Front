<template>
  <v-container>
    <self-salad-modify-cart-form 
    :ingredients="ingredients"
    :cartItem="cartItem"
    :cartItemId="cartItemId"
    @change="changeCategory"
    @submit="onSubmit"/>
    <v-btn @click="$emit('close')">
      닫기
    </v-btn>
</v-container>
</template>

<script>
import SelfSaladModifyCartForm from '@/components/SelfSalad/SelfSaladModifyCartForm.vue';
import { mapActions, mapState } from 'vuex'

const selfSaladModule = 'selfSaladModule'
const ordercartModule = 'ordercartModule'

  export default {
      components: { SelfSaladModifyCartForm },
      name: "SelfSaladModifyCartPage",
      props: {
        cartItemId: {
      type: Number,
      require: true,
    }
  },
      computed: {
        ...mapState(selfSaladModule, [
          'ingredients'
        ]),
        ...mapState(ordercartModule, [
          'cartItem'
        ])
      },
      // default로 spring에서 가져올 ingredients mount하기
      mounted () {
          this.requestIngredientListToSpring()
      },         
      methods: {
        ...mapActions(selfSaladModule, [
          'requestIngredientListToSpring',
          'requestIngredientCategoryToSpring',
        ]),
        ...mapActions(ordercartModule, [ 
          'requestSelfSaladCartModifyToSpring'
        ]),
        async changeCategory(payload){
          await this.requestIngredientCategoryToSpring(payload) //카테고리 이름
        },
        // 수정 완 벝
        async onSubmit(payload) {
            const itemId = payload.itemId
            await this.requestSelfSaladCartModifyToSpring(payload, itemId);
            window.location.reload(true);
            // this.$emit('close'); // 수정 완료 시 모달창을 닫기.
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