<template>
  <v-container>
    <div align="center">
      <p><mark>작성한 게시글을 읽을 수 있으며 삭제 할 수 있는 페이지 입니다. <br>수정페이지로 이동 할 수 있습니다.</mark></p>
      <side-product-read-form :sideproduct="sideproduct"/>
      <!-- <router-link :to="{ name: 'ProductModifyPage', params: { productId } }">
        <v-btn color="blue">수정</v-btn>
      </router-link>
      <v-btn color="red" @click="onDelete">삭제</v-btn> -->
      <router-link :to="{ name: 'SideProductListPage' }">
        <v-btn color="blue">돌아가기</v-btn>
      </router-link><br>
    </div>
  </v-container>
</template>

<script>

import SideProductReadForm from '@/components/Board/SideProduct/SideProductReadForm'
import {mapActions, mapState} from 'vuex'

export default {
  components: { SideProductReadForm },
    name: "SideProductReadPage",
    props: {
        productId: {
            type: String,
        }
    },
    computed: {
      ...mapState(['sideproduct'])
    },
    methods:{
      ...mapActions([
        'requestSideProductToSpring'
      ])
    },
    created(){
      this.requestSideProductToSpring(this.productId)
    }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

</style>