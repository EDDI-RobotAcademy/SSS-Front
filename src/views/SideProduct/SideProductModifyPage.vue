<template>
  <v-container>
    <div align="center">
      <P><mark>등록한 상품을 수정하는 페이지 입니다.</mark></P>
      <side-product-modify-form :sideProduct="sideProduct" :sideProductId="sideProductId" @submit="onSubmit" />
    </div>
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
        name: 'SideProductReadPage',
        params: { sideProductId: this.sideProductId.toString() }
      })
    }
  },
  created() {
    this.requestSideProductToSpring(this.sideProductId)
  }

}
</script>

<style></style>