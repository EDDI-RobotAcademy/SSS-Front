<template>
  <v-container>
    <v-col cols="12">
      
        <div>
          <div class="search-bar">
        <p class="saladPageName">Side</p> 
        <div>
          <router-link :to="{ name: 'SideProductRegisterPage' }" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">
              <v-btn color="#40513B" style="width:150px; height:40px; font-size:20px; color:white;">상품 등록</v-btn>
          </router-link>
      </div>
      <div class="search-bar">
        <select v-model="searchBy" style="padding-right: 10px;">
          <option value="title">제품명</option>
        </select>
        <v-text-field v-model="searchQuery" style="width: 300px; margin-right: 20px;" type="text" placeholder="찾고싶은 제품을 입력하세요"/>
              <v-btn style="background-color: #609966; color: white;" type="submit" @click="searchMenus">
              검색
            </v-btn>
      </div>
    </div>
    <div class="longline"/>
  </div>
  <div class="total">
    총 {{sideList.length}}개
  </div>
      </v-col>
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

<style scoped>
.saladPageName{
    font-size: 70px;
    font-weight: bold;
    text-align: left;
    color: #40513B;
    font-family: 'HSBombaram';
    margin-bottom:-4px;
  }
  .search-bar {
  font-size: 20px; /* 폰트 크기를 20px로 설정 */
}

.search-bar select,
.search-bar input[type="text"],
.search-bar button{
font-size: 20px;
}


.longline{
    width: 100%;
    border-bottom: 7px solid #40513B;
    margin: 10px 0;
    margin-top: -25px;
}
.search-bar {
  display: flex;
  justify-content: space-between; /* 요소들을 양쪽 끝으로 정렬 */
  align-items: center;
}

*{
    color: #40513B;
  }
.total {
  font-size: 20px;
  font-weight: bold;
  margin-top: 59px;
  margin-left: 20px;
}
@font-face {
    font-family: 'HSBombaram';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>