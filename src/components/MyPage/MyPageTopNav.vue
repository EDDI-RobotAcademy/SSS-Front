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
        :class="{ 'selected': selected === index }"
      >
          <v-card-title class="text-start">
            <v-icon>{{ item.icon }}</v-icon>
            <h4>{{ item.title }}</h4>
          </v-card-title>
          <v-card-title class="text-end">
            <h5 style="font-size: 33px; color: #e8d7c1">{{item.count}}</h5>
            <span>개</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
      

  </div>
  </v-container>
</template>

<script>

export default {
  name: "MyPageTopNav",
  data() {
    return {
      selected: null,
      nickname : this.$store.state.memberModule.memberInfoAboutSignIn.userNickName,
      myPageCategoryItems: [
        {
          title: "장바구니",
          icon: "mdi-cart-variant",
          route: "/my-info-cart",
          count: 8
        },
        {
          title: "찜찜",
          icon: "mdi-star-circle",
          route: "/my-info-favorite",
          count: 15
        },
        {
          title: "리뷰",
          icon: "mdi-fountain-pen-tip",
          route: "/my-info-review",
          count: 2
        },
        {
          title: "문의 사항",
          icon: "mdi-human-greeting",
          route: "/my-info-Qna",
          count: 1
        }
      ]
    }
  },
  methods: {
    handleClick(index) {
      this.selected = index;
    }
  }
}
</script>

<style scoped>
  .ifno-black {
    text-decoration: none;
    color: black;
    font-weight: bold
  }
.selected {
  border: 2px solid #e8d7c1;
  background-color: #e8d7c1;
  color: #fff;
}
</style>