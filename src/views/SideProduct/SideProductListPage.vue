<template>
  <v-container>
      <div align="center">
          <p><mark>게시글 목록이 보여지는 페이지 입니다.</mark></p>
          <router-link :to="{ name: 'SideProductRegisterPage' }" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">
              게시글 작성 하러 가기
          </router-link>
      </div>
      <div>
        <select v-model="searchBy">
          <option value="title">제품명</option>
        </select>
        <input type="text" v-model="searchQuery" placeholder="검색" @keyup.enter="searchMenus">
        <button @click="searchMenus">검색</button>
      </div>
      <side-product-list-form :sideProducts="sideList" :current-page="currentPage"/>
  </v-container>
</template>

<script>
import SideProductListForm from '@/components/SideProduct/SideProductListForm.vue'
import { mapActions, mapState } from 'vuex'

const sideProductModule = 'sideProductModule'
const memberModule = 'memberModule'

export default {
  components: { SideProductListForm },
  name: "SideProductListPage",
  data () {
    return {
      searchQuery: '',  
      sideList: [],
      searchBy: 'title',
      currentPage: 1,
    }
  },
  computed:{
    ...mapState(memberModule, [
        'memberInfoAboutSignIn'
      ]),

    ...mapState(sideProductModule,['sideProducts']),
  },
  mounted (){
    this.requestSideProductListToSpring()
  },
  methods:{
    ...mapActions(sideProductModule, ['requestSideProductListToSpring']),
    searchMenus() {
      const query = this.searchQuery.toLowerCase();
      if (query === ''){
        this.sideList = this.sideProducts;
      } else {
        if (this.searchBy === 'title') {
          this.sideList = this.sideProducts.filter(sideProduct => sideProduct.title.toLowerCase().includes(query));
        } 
      }
      this.currentPage = 1;
    }
  },
  created() {
    if (this.sideProducts && this.sideProducts.length > 0) {
      this.searchMenus();
    }
  },
  watch: {
    sideProducts() {
      if (this.sideProducts && this.sideProducts.length > 0) {
        this.searchMenus();
      }
    }
  },
}
</script>

<style></style>