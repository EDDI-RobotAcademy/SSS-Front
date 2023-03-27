<template>
    <div class="wrap">
      <my-page-view-form />
      <my-page-nav />
    </div>
  </template>
  <script>
  import MyPageNav from '@/components/Acount/MyPage/MyPageNav.vue';
  import MyPageViewForm from "@/components/Acount/MyPage/MyPageViewForm.vue";

  export default {
    name: "MyPageView",
    components: {
      MyPageNav,
      MyPageViewForm
    },
  };
  </script>
  