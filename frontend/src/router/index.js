import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import CompanyIntroductionBoardPage from "@/views/lecture/companyIntroductionBoard/companyIntroductionBoardPage.vue"

import JpaQnaBoardListPage from "@/views/lecture/board/JpaQnaBoardListPage.vue"
import JpaQnaBoardRegisterPage from "@/views/lecture/board/JpaQnaBoardRegisterPage.vue"
import JpaQnaBoardReadPage from "@/views/lecture/board/JpaQnaBoardReadPage.vue"
import JpaQnaBoardModifyPage from "@/views/lecture/board/JpaQnaBoardModifyPage.vue"


import SignUpPage from "@/views/Acount/Member/SignUpPage.vue";
import SignInPage from '@/views/Acount/Member/SignInPage.vue';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/member/sign-in',
    name: 'SignInPage',
    component: SignInPage
  },
  {
    path: '/member/sign-up',
    name: 'SignUpPage',
    component: SignUpPage
  },

  //회사소개
  {
    path: '/companyintroduction-board/company-introduction-board-page',
    name: 'CompanyIntroductionBoardPage',
    component: CompanyIntroductionBoardPage
  },

  {
    path: '/board-list-page',
    name: 'JpaQnaBoardListPage',
    component: JpaQnaBoardListPage
  },
  {
    path: '/board-register',
    name: 'JpaQnaBoardRegisterPage',
    component: JpaQnaBoardRegisterPage
  },
  {
    path: '/board-read/:boardId',
    name: 'JpaQnaBoardReadPage',
    components: {
      default: JpaQnaBoardReadPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/board-modify/:boardId',
    name: 'JpaQnaBoardModifyPage',
    components: {
      default: JpaQnaBoardModifyPage
    },
    props: {
      default: true
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
