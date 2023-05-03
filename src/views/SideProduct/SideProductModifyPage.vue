<template>
  <v-container>
    <v-col cols="12" style="margin-bottom:-10px">
      <span style="font-size: 60px; font-weight: bold; margin-top: 30px; font-family:'HSBombaram';">REGISTER</span>
      <div class="line"/>
      <side-product-modify-form :sideProduct="sideProduct" :sideProductId="sideProductId" @submit="onSubmit" />
    </v-col>
  </v-container>
</template>

<script>
import SideProductModifyForm from '@/components/SideProduct/SideProductModifyForm.vue'
import { mapActions, mapState } from 'vuex'

const sideProductModule = 'sideProductModule'

export default {
  components: { SideProductModifyForm },
  name: "SideProductModifyPage",
  props: {
    sideProductId: {
      type: String,
      required: true,
    }
  },
  computed: {
    ...mapState(sideProductModule, ['sideProduct'])
  },
  methods: {
    ...mapActions(sideProductModule, [
      'requestSideProductToSpring',
      'requestSideProductModifyToSpring',
    ]),
    async onSubmit(payload) {
      const sideProductId = this.sideProductId
      const formData  = payload
      console.log("넘어오네"+sideProductId, payload)
      await this.requestSideProductModifyToSpring({ sideProductId, formData })
      await this.$router.push({
        name: 'SideProductListPage',
      })
    }
  },
  created() {
    this.requestSideProductToSpring(this.sideProductId)
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