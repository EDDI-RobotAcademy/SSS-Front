import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import IntroductionPage from "@/views/IntroductionPage.vue"

import JpaQnaBoardListPage from "@/views/Board/QnaBoard/JpaQnaBoardListPage.vue"
import JpaQnaBoardRegisterPage from "@/views/Board/QnaBoard/JpaQnaBoardRegisterPage.vue"
import JpaQnaBoardReadPage from "@/views/Board/QnaBoard/JpaQnaBoardReadPage.vue"
import JpaQnaBoardModifyPage from "@/views/Board/QnaBoard/JpaQnaBoardModifyPage.vue"

import SideProductReadPage from "@/views/SideProduct/SideProductReadPage.vue"
import SideProductRegisterPage from "@/views/SideProduct/SideProductRegisterPage.vue"
import SideProductListPage from "@/views/SideProduct/SideProductListPage.vue"
import SideProductModifyPage from "@/views/SideProduct/SideProductModifyPage.vue"

import SignUpPage from "@/views/Member/SignUpPage.vue";
import SignInPage from '@/views/Member/SignInPage.vue';
import MyPageView from "@/views/MyPage/MyPageView.vue"
import MemberModify from "@/views/Member/MemberModify.vue"

import IngredientListPage from "@/views/SelfSalad/IngredientListPage.vue"
import IngredientRegisterPage from "@/views/SelfSalad/IngredientRegisterPage.vue"

import ProductListPage from '@/views/Product/ProductListPage.vue'
import ProductRegisterPage from '@/views/Product/ProductRegisterPage.vue'
import ProductReadPage from '@/views/Product/ProductReadPage.vue'

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
    path: '/member/member-modify',
    name: 'MemberModify',
    component: MemberModify
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
  path: '/product-read/:productId',
  name: 'ProductReadPage',
  components: {
    default: ProductReadPage
  },
  props: {
    default: true
  }
},
{
  path: '/selfsalad/ingredient-list-page',
  name: 'IngredientListPage',
  component: IngredientListPage
},
{
  path: '/selfsalad/ingredient-register-page',
  name: 'IngredientRegisterPage',
  component: IngredientRegisterPage
},

//회사소개
{
  path: '/introduction-page',
  name: 'IntroductionPage',
  component: IntroductionPage
},

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router