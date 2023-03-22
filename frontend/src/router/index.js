import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import JpaQnaBoardListPage from "@/views/lecture/board/JpaQnaBoardListPage.vue"
import JpaQnaBoardRegisterPage from "@/views/lecture/board/JpaQnaBoardRegisterPage.vue"
import JpaQnaBoardReadPage from "@/views/lecture/board/JpaQnaBoardReadPage.vue"
import JpaQnaBoardModifyPage from "@/views/lecture/board/JpaQnaBoardModifyPage.vue"

import SignUpPage from "@/views/Member/SignUpPage";

import LoginPage from '../views/Acount/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/member/sign-up',
    name: 'sign-up',
    component: SignUpPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
