import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import QnaBoardListPage from "@/views/QnaBoard/QnaBoardListPage.vue"
import QnaBoardRegisterPage from "@/views/QnaBoard/QnaBoardRegisterPage.vue"
import QnaBoardReadPage from "@/views/QnaBoard/QnaBoardReadPage.vue"
import QnaBoardModifyPage from "@/views/QnaBoard/QnaBoardModifyPage.vue"

import IntroductionPage from "@/views/IntroductionPage.vue"


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
import ProductModifyPage from '@/views/Product/ProductModifyPage.vue'

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
    path: '/qna-board-list-page',
    name: 'QnaBoardListPage',
    component: QnaBoardListPage
  },
  {
    path: '/qna-board-register',
    name: 'QnaBoardRegisterPage',
    component: QnaBoardRegisterPage
  },
  {
    path: '/qna-board-read/:boardId',
    name: 'QnaBoardReadPage',
    components: {
      default: QnaBoardReadPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/qna-board-modify/:boardId',
    name: 'QnaBoardModifyPage',
    components: {
      default: QnaBoardModifyPage
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
  path: '/product-modify',
  name: 'ProductModifyPage',
  components: {
    default: ProductModifyPage
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