<template>
  <v-container>
    <my-page/>
    <my-shopping-cart-form/>
  </v-container>
</template>


<script>
import MyShoppingCartForm from '@/components/MyPage/MyShoppingCartForm.vue'
import MyPage from "@/views/MyPage/MyPage.vue";

import { mapActions, mapState } from 'vuex'

const ordercartModule = 'ordercartModule'

export default {
  name: "MyShoppingCartPage",
  components: { MyShoppingCartForm, MyPage },
  computed:{
    ...mapState(ordercartModule, [
      'cartItems'
    ])
  },
  methods:{
    ...mapActions(ordercartModule, [
      'requestAddCartListToSpring',
    ]),


    }
  },
  async created() {
  const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId
  await this.requestAddCartListToSpring( memberId )
}
}
</script>

<style scoped></style>