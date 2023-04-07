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
      currentTab: "MemberModify",
      navi: [
        { menu: "회원정보 변경", tab: "MemberModify" },
      ],
    };
  },
  computed: {
    componentLoader() {
      const tab = this.currentTab;
      return () => import(`@/components/MyPage/${tab}`);
    },
  },
};
</script>

<style>

</style>