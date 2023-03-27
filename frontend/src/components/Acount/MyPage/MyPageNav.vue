<template>
  <div style="padding-top: 30px; display: flex; justify-content: center;">
  <div>
    <div>
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="(item, index) in navi" :key="index">
        <a
          class="nav-link"
          :class="{'active': currentTab === item.tab, 'hover': currentTab !== item.tab}"
          @click.prevent="currentTab = item.tab"
          href="javascript:void(0)">
          {{ item.menu }}
        </a>
      </li>
    </ul>
    <component :is="componentLoader"></component>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: "MyPageNav",
  data() {
    return {
      currentTab: "MyPageOrderManagement",
      navi: [
        { menu: "주문 관리", tab: "MyPageOrderManagement" },
        { menu: "장바구니", tab: "MyPageFavoriteList" },
        { menu: "1:1 문의", tab: "MyPageQna" },
        { menu: "회원정보 변경", tab: "MyPageInfoModifyForm" },
      ],
    };
  },
  computed: {
    componentLoader() {
      const tab = this.currentTab;
      return () => import(`@/components/acount/mypage/${tab}`);
    },
  },
};
</script>

<style>

</style>