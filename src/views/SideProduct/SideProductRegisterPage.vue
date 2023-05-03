<template>
  <v-container>
    <v-col cols="12" style="margin-bottom:-10px">
      <span style="font-size: 60px; font-weight: bold; margin-top: 30px; font-family:'HSBombaram';">REGISTER</span>
      <div class="line"/>
          <side-product-register-form @submit="onSubmit" />
    </v-col>
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

<style scoped>
.line{
width: 100%;
border-bottom: 7px solid #40513B;
margin-top: -24px;
}
*{
/* color: #40513B; */
color: #40513B;
}
@font-face {
font-family: 'HSBombaram';
src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff') format('woff');
font-weight: normal;
font-style: normal;
}
</style>