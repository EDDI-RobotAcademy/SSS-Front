<template>
  <v-container>
    <div align="center">
      <p><mark>작성한 게시글을 읽을 수 있으며 삭제 할 수 있는 페이지 입니다. <br>수정페이지로 이동 할 수 있습니다.</mark></p>
      <side-product-read-form :sideProduct="sideProduct" :sideProductId="sideProductId"/>
      <router-link :to="{ name: 'SideProductModifyPage', params: { sideProductId : sideProductId } }">
        <v-btn color="blue" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">수정</v-btn>
      </router-link>
      <v-btn color="red" @click="onDelete" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">삭제</v-btn>
      <router-link :to="{ name: 'SideProductListPage' }">
        <v-btn color="blue">돌아가기</v-btn>
      </router-link><br>
    </div>
  </v-container>
</template>

<script>

import SideProductReadForm from '@/components/SideProduct/SideProductReadForm'
import {mapActions, mapState} from 'vuex'

const sideProductModule = 'sideProductModule'
const memberModule = 'memberModule'

export default {  
  components: { SideProductReadForm },
    name: "SideProductReadPage",
    props: {
      sideProductId: {
            type: String,
            required: true,
        }
    },
    computed: {
      ...mapState(memberModule, [
        'memberInfoAboutSignIn'
      ]),
      ...mapState(sideProductModule, ['sideProduct'])
    },
    methods:{
      ...mapActions(sideProductModule, [
        'requestSideProductToSpring',
        'requestDeleteSideProductToSpring'
      ]),
      async onDelete() {
        await this.requestDeleteSideProductToSpring(this.sideProductId)
        await this.$router.push({name : 'SideProductListPage'})
      }
    },
    created(){
      this.requestSideProductToSpring(this.sideProductId)
    }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

</style>