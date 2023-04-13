<template>
  <nav>
    <v-app-bar class="flex-grow-0" color="white" elevation="0" style="display: flex; justify-content: center;">
      <ul class="menu mt-3">
          <li>
            <router-link :to="{ name: 'IngredientListPage' }">Self Salad</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'IntroductionPage' }">회사 소개</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ProductListPage' }">상품 페이지</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'SideProductListPage' }">사이드 메뉴</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'QnaBoardListPage' }">FAQ</router-link>
          </li>
        </ul>
        <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer"/>
      </v-app-bar>
          <side-nav :navigation_drawer="navigation_drawer"/>
  </nav>
  
</template>

<script>
import SideNav from '@/views/NavigationMenu/SideNav.vue'

export default {
  name: "HeaderTwo",
  components: { SideNav },
  data() {
    return {
      navigation_drawer: false
    }
  }
}
</script>

<style scoped>
  ul.menu li{ display: inline;}
  .menu a:hover {
    color: #3d7e27 !important;
  }
  .menu a {
    color: black;
    font-weight: 600;
    margin-right: 80px;
    transition: all 0.3s ease 0s;
  }
a {
    text-decoration: none;
  }
</style>