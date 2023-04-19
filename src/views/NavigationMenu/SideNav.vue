<template>
  <v-container style="width: 1400px">
    <v-navigation-drawer v-if="showNav" width="250px" app  color="#80a84f">
      <v-list-item style="height: 10%">
        <v-list-item-content>
          <v-list-item-title class="mb-5" style="margin-top: 250px">
            <div align="center">
              <router-link to="/my-info">
              </router-link>
            </div>
          </v-list-item-title>

          <v-list-item-subtitle class="white--text justify-center mt-8" style="font-size: 16px">
            <div align="center">
              {{ nickname }} 님 환영합니다!
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider style="border-color: white; margin-top: 150px"></v-divider>


      <v-list dense nav class="mt-3">
        <v-list-item clas="tile" v-for="item in items" :key="item.title" :to="item.route" link class="mt-5 mb-5 ml-5">
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="height: 100%">
            <v-list-item-title class="white--text">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "BuyerNav",
  data() {
    return {
      nickname: 'sss',
      items: [
        {
          title: "장바구니",
          icon: "mdi-cart-variant",
          route: "/my-info-cart"
        },
        {
          title: "찜",
          icon: "mdi-star-circle",
          route: "/my-info-favorite"
        },
        {
          title: "리뷰",
          icon: "mdi-fountain-pen-tip",
          route: "/my-info-review"
        },
        {
          title: "문의 사항",
          icon: "mdi-human-greeting",
          route: "/my-info-Qna"
        },
        {
          title: "내 정보 관리",
          icon: "mdi-card-account-details-star-outline",
          route: "/my-info-account"
        },
      ],
      //특정 페이지에서만 nav사용 하기위해 기본값으로 false설정
      showNav: false,
      // specificPages: ['/my-info', '/my-info-cart', '/my-info-favorite','/my-info-review', '/my-info-account', '/my-info-Qna']
    }
  },
  props: {
    navigation_drawer: {
      type: Boolean
    }
  },
  // mounted() {
  //   if (this.specificPages.includes(this.$route.path)) {
  //     this.showNav = true;
  //   }
  // },
  // watch: {
  //   '$route'(to, from) {
  //     if (this.specificPages.includes(to.path)) {
  //       this.showNav = true;
  //     } else {
  //       this.showNav = false;
  //     }
  //   }
  // }
}
</script>

<style scoped></style>