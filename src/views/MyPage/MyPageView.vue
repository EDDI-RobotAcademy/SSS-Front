<template>
    <div class="wrap">
      <my-page-view-form />
      <my-page-nav />
    </div>
  </template>
  <script>
  import MyPageNav from '@/components/MyPage/MyPageNav.vue';
  import MyPageViewForm from "@/components/MyPage/MyPageViewForm.vue";

  export default {
    name: "MyPageView",
    components: {
      MyPageNav,
      MyPageViewForm
    },
  };
  </script>
  