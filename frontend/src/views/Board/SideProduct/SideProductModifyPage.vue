<template>
  <v-container>
    <div align="center">
    <P><mark>등록한 상품을 수정하는 페이지 입니다.</mark></P>
    <side-product-modify-form :sideproduct="sideproduct" @submit="onSubmit"/>
    </div>
  </v-container>
  
</template>

<script>
import SideProductModifyForm from '@/components/Board/SideProduct/SideProductModifyForm.vue'
import {mapActions, mapState} from 'vuex'
export default {
  components:{SideProductModifyForm},
  name: "SideProductModifyPage",
  props:{
    productId:{
      type: String,
      requires: true,
    }
  },
computed: {
  ...mapState(['sideproduct'])
},
methods:{
  ...mapActions([
    'requestSideProductToSpring',
    'requestSideProductModifyToSpring'
  ]),
  async onSubmit(payload){
    console.log("submit")
    const { title, content, price } = payload
    const productId = this.productId
    await this.requestSideProductModifyToSpring({productId, title, content, price})
    await this.$router.push({
      name: 'SideProductReadPage',
      params: { productId: this.productId.toString() }
    })
  }
},
created(){
  this.requestSideProductToSpring(this.productId)
}
  
}
</script>

<style>

</style>