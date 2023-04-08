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

const sideProductModule = 'sideProductModule'

export default {
  components: { SideProductRegisterForm },
  name: "SideProductRegisterPage",
  methods:{
    ...mapActions(sideProductModule, [
      'requestCreateSideProductToSpring'
    ]),
    async onSubmit (payload) {
            await this.requestCreateSideProductToSpring(payload)
            await this.$router.push({
                name: 'SideProductListPage'
      })
    }
  }


}
</script>

<style></style>