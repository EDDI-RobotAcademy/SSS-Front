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

import IngredientListPage from "@/views/SelfSalad/IngredientListPage.vue"
import IngredientRegisterPage from "@/views/SelfSalad/IngredientRegisterPage.vue"
import IngredientInfoModifyPage from "@/views/SelfSalad/IngredientInfoModifyPage.vue"
import IngredientAmountModifyPage from "@/views/SelfSalad/IngredientAmountModifyPage.vue"

import ProductListPage from '@/views/Product/ProductListPage.vue'
import ProductRegisterPage from '@/views/Product/ProductRegisterPage.vue'
import ProductReadPage from '@/views/Product/ProductReadPage.vue'
import ProductModifyPage from '@/views/Product/ProductModifyPage.vue'

import MyPage from "@/views/MyPage/MyPage"
import MyFavoritePage from "@/views/MyPage/MyFavoritePage"
import MyShoppingCartPage from "@/views/MyPage/MyShoppingCartPage"
import MyReviewPage from "@/views/MyPage/MyReviewPage"
import MyAccountPage from "@/views/MyPage/MyAccountPage"
import MyQnaPage from "@/views/MyPage/MyQnaPage"
import MyDeliveryPage from "@/views/MyPage/MyDeliveryPage"

import MyAddressPasswordCheckPage from "@/views/MyPage/MyAddressPasswordCheckPage.vue"
import MyInfoPasswordCheckPage from "@/views/MyPage/MyInfoPasswordCheckPage.vue"

import PaymentInfoPage from '@/views/MyPage/PaymentInfoPage.vue'
import PurchaseCompletePage from "@/views/MyPage/PurchaseCompletePage.vue"

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
    path: '/side-Product-read/:sideProductId',
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
  path: '/side-Product-modify/:sideProductId',
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


{
  path: '/selfsalad/ingredient-list-page/:categoryName',
  name: 'IngredientListPage',
  components: {
    default: IngredientListPage
  },
  props: {
    default: true
  }
},
{
  path: '/ingredinet-info-modify-page/:id',
  name: 'IngredientInfoModifyPage',
  components: {
    default: IngredientInfoModifyPage
  },
  props: {
    default: true,
  }
},
{
  path: '/ingredinet-amount-modify-page/:id',
  name: 'IngredientAmountModifyPage',
  components: {
    default: IngredientAmountModifyPage
  },
  props: {
    default: true,
  }
},
//마이 페이지
{
  path: '/my-info',
  name: 'MyPage',
  component: MyPage 
},
//찜(좋아요) 페이지
{
  path: '/my-info-favorite',
  name: 'MyFavoritePage',
  component: MyFavoritePage 
},
//장바구니
{
  path: '/my-info-cart',
  name: 'MyShoppingCartPage',
  component: MyShoppingCartPage 
},
//등록 한 리뷰
{
  path: '/my-info-review',
  name: 'MyReviewPage',
  component: MyReviewPage 
},
//내정보 수정
{
  path: '/my-info-account',
  name: 'MyInfoAccountPage',
  component: MyAccountPage 
},
//작성한 문의 내용
{
  path: '/my-info-Qna',
  name: 'MyInfoQnaPage',
  component: MyQnaPage 
},
{
  path: '/my-info-delivery',
  name: 'MyDeliveryPage',
  component: MyDeliveryPage 
},
{
  path: '/my-info-password-check-page',
  name: 'MyInfoPasswordCheckPage',
  component: MyInfoPasswordCheckPage
},

{
  path: '/my-address-password-check-page',
  name: 'MyAddressPasswordCheckPage',
  component: MyAddressPasswordCheckPage
},
// 결제페이지
{
  path: '/payment-info-page',
  name: 'PaymentInfoPage',
  components: {
    default: PaymentInfoPage
  },
  props: {
    default: true,
  }
},{
  path: '/purchase-complete',
  name: 'PurchaseCompletePage',
  components: PurchaseCompletePage
},


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router