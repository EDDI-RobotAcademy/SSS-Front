import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import JpaQnaBoardListPage from "@/views/Board/QnaBoard/JpaQnaBoardListPage.vue"
import JpaQnaBoardRegisterPage from "@/views/Board/QnaBoard/JpaQnaBoardRegisterPage.vue"
import JpaQnaBoardReadPage from "@/views/Board/QnaBoard/JpaQnaBoardReadPage.vue"
import JpaQnaBoardModifyPage from "@/views/Board/QnaBoard/JpaQnaBoardModifyPage.vue"
import IntroductionBoardPage from "@/views/Board/introductionBoard/IntroductionBoardPage.vue"

import SideProductReadPage from "@/views/Board/SideProduct/SideProductReadPage.vue"
import SideProductRegisterPage from "@/views/Board/SideProduct/SideProductRegisterPage.vue"
import SideProductListPage from "@/views/Board/SideProduct/SideProductListPage.vue"
import SideProductModifyPage from "@/views/Board/SideProduct/SideProductModifyPage.vue"

import SignUpPage from "@/views/Acount/Member/SignUpPage.vue";
import SignInPage from '@/views/Acount/Member/SignInPage.vue';
import MyPageView from "@/views/MyPage/MyPageView.vue"

import IngredientListPage from "@/views/SelfSalad/IngredientListPage.vue"
import IngredientRegisterPage from "@/views/SelfSalad/IngredientRegisterPage.vue"

import ProductListPage from '@/views/Board/Product/ProductListPage.vue'
import ProductRegisterPage from '@/views/Board/Product/ProductRegisterPage.vue'
import ProductReadPage from '@/views/Board/Product/ProductReadPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/member/sign-in',
    name: 'SignIn',
    component: SignInPage
  },
  {
    path: '/member/sign-up',
    name: 'SignUp',
    component: SignUpPage
  },
  {
    path: '/my-page',
    name: 'MyPageView',
    component: MyPageView
  },
  {
    path: '/qnaboard/jpa-qna-board-list-page',
    name: 'JpaQnaBoardListPage',
    component: JpaQnaBoardListPage
  },
  {
    path: '/qnaboard/jpa-qna-board-register',
    name: 'JpaQnaBoardRegisterPage',
    component: JpaQnaBoardRegisterPage
  },
  {
    path: '/qnaboard/jpa-qna-board-read/:boardId',
    name: 'JpaQnaBoardReadPage',
    components: {
      default: JpaQnaBoardReadPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/qnaboard/jpa-qna-board-modify/:boardId',
    name: 'JpaQnaBoardModifyPage',
    components: {
      default: JpaQnaBoardModifyPage
    },
    props: {
      default: true
    }
  },
  //사이드메뉴
  {
  path: '/side-Product-read/:productId',
  name: 'SideProductReadPage',
  components: {
    default: SideProductReadPage
  },
  props: {
    default: true
  }
  },
  {
  path: '/side-Product-register',
  name: 'SideProductRegisterPage',
  component: SideProductRegisterPage
  },
  {
  path: '/side-Product-list',
  name: 'SideProductListPage',
  component: SideProductListPage
  },
  {
  path: '/side-Product-modify',
  name: 'SideProductModifyPage',
  components: {
    default: SideProductModifyPage
  },
  props: {
    default: true
  }
},
//회사소개
{
  path: '/introduction-board/introduction-board-page',
  name: 'IntroductionBoardPage',
  component: IntroductionBoardPage
},
//완제품
{
  path: '/product-list',
  name: 'ProductListPage',
  component: ProductListPage
},
{
  path: '/product-register',
  name: 'ProductRegisterPage',
  component: ProductRegisterPage
},
{
<<<<<<< HEAD
  path: '/product-read/:productId',
  name: 'ProductReadPage',
  components: {
    default: ProductReadPage
  },
  props: {
    default: true
  }
  },
=======
  path: '/selfsalad/ingredient-list-page',
  name: 'IngredientListPage',
  component: IngredientListPage
},
{
  path: '/selfsalad/ingredient-register-page',
  name: 'IngredientRegisterPage',
  component: IngredientRegisterPage
},



>>>>>>> main
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router