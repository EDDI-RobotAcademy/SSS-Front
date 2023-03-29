<template>
  <v-container>
      <div align="center">
          <p><mark>상품을 등록하는 페이지 입니다.</mark></p>
          <side-product-register-form @submit="onSubmit" />
      </div>
  </v-container>
</template>

<script>
import SideProductRegisterForm from '@/components/SideProduct/SideProductRegisterForm.vue'
import {mapActions} from 'vuex'

export default {
  components: { SideProductRegisterForm },
  name: "SideProductRegisterPage",
  methods:{
    ...mapActions([
      'requestCreateSideProductToSpring'
    ]),
    async onSubmit (payload){
      console.log("잘넘어오네")
      const sideproduct = await this.requestCreateSideProductToSpring(payload)
      console.log('sideproduct: ' + JSON.stringify(sideproduct.data))
      await this.$router.push({
        name: 'SideProductReadPage',
        params: {productId: sideproduct.data.productId.toString()}
      })
    }
  }


}
</script>

<style></style>