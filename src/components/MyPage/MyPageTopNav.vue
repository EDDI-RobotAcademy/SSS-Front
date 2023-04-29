<template>
  <v-container>
    <div style="height: 140px;">
      <div>
      <div align="left" style="font-weight: bold; font-size: 24px;">
        {{ nickname }} 님 환영합니다!
      </div>
      <div align="right">
        <router-link to="/my-info-account" class="ifno-black">
          <span>내 정보 관리</span>
        </router-link>
      </div>    
    </div>
    <v-row>
      <v-col v-for="(item, index) in myPageCategoryItems" :key="index">
        <v-card :to="item.route" class="d-flex" @click="$router.push(item.route)"
        style="justify-content: space-between;"
      >
          <v-card-title class="text-start">
            <v-icon>{{ item.icon }}</v-icon>
            <h4>{{ item.title }}</h4>
          </v-card-title>
          <v-card-title class="text-end">
            <h5 style="font-size: 33px; color: rgb(54, 109, 50)">{{item.count}}</h5>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
      

  </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const ordercartModule = 'ordercartModule'
const productModule = 'productModule'
const qnaModule = 'qnaModule'

export default {
  name: "MyPageTopNav",
  data() {
    return {
      selected: null,
      nickname : this.$store.state.memberModule.memberInfoAboutSignIn.userNickName,
      myPageCategoryItems: [],
    }
  },
  computed:{
    ...mapState(ordercartModule, [
      'cartItems',
    ]),
    ...mapState(productModule, [
      'favoriteList'
    ]),
    ...mapState(productModule, [
      'reviews'
    ]),
    ...mapState(qnaModule, [
      'boards'
    ]),
  },
  methods: {
    ...mapActions(ordercartModule, [
      'requestAddCartListToSpring',
    ]),
    ...mapActions(productModule, [
      'requestFavoriteListToSpring',
    ]),
    ...mapActions(qnaModule, [
      'requestReadMyBoardToSpring'
    ]),
    handleClick(index) {
      this.selected = index;
    }
  },
  async created() {
  await this.requestAddCartListToSpring()
  await this.requestFavoriteListToSpring()
  await this.requestReadMyBoardToSpring()

  console.log(this.boards.length)

    const CategoryItem = new Array
    CategoryItem.push({title: "장바구니", icon: "mdi-cart-variant", route: "/my-info-cart", count: this.cartItems.length})
    CategoryItem.push({title: "주문내역", icon: "mdi-calendar-clock", route: "/my-info-delivery", count: 0})
    CategoryItem.push({title: "구매 리뷰", icon: "mdi-fountain-pen-tip", route: "/my-info-review", count: 0})
    CategoryItem.push({title: "좋아요", icon: "mdi-star-circle", route: "/my-info-favorite", count: this.favoriteList.length})
    CategoryItem.push({title: "내가 쓴 글", icon: "mdi-human-greeting", route: "/my-info-Qna", count: this.boards.length})

    this.myPageCategoryItems = CategoryItem
  }
}
</script>

<style scoped>
  .ifno-black {
    text-decoration: none;
    color: black;
    font-weight: bold
  }
h4, h5{
  margin: 0px;
}
</style>