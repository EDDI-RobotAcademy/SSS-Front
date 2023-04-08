<template>
  <v-container>
      <div align="center">
          <p><mark>게시글 목록이 보여지는 페이지 입니다.</mark></p>
          <router-link :to="{ name: 'SideProductRegisterPage' }">
              게시글 작성 하러 가기
          </router-link>
      </div>
      <side-product-list-form :sideProducts="sideProducts"/>
  </v-container>
</template>

<script>
import SideProductListForm from '@/components/SideProduct/SideProductListForm.vue'
import { mapActions, mapState } from 'vuex'


export default {
  components: { SideProductListForm },
  name: "SideProductListPage",
  computed:{
    ...mapState([
      'sideproducts'
    ])
  },
  mounted (){
    this.requestSideProductListToSpring()
    console.log("ddddd")
  },
  methods:{
    ...mapActions([
      'requestSideProductListToSpring'
    ])
  }

}
</script>

<style></style>