import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import JpaQnaBoardListPage from "@/views/Board/QnaBoard/JpaQnaBoardListPage.vue"
import JpaQnaBoardRegisterPage from "@/views/Board/QnaBoard/JpaQnaBoardRegisterPage.vue"
import JpaQnaBoardReadPage from "@/views/Board/QnaBoard/JpaQnaBoardReadPage.vue"
import JpaQnaBoardModifyPage from "@/views/Board/QnaBoard/JpaQnaBoardModifyPage.vue"


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
    name: 'SignIn',
    component: SignInPage
  },
  {
    path: '/member/sign-up',
    name: 'SignUp',
    component: SignUpPage
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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
