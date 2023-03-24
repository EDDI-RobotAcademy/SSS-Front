<template>
    <container>
      <my-page-form @submit="onSubmit"/>
    </container>
</template>

<script>
  import MyPageForm from "@/components/Acount/MyPage/MyPageForm.vue";
  
export default {
    name: "MyPage",
    components: {
      MyPageForm
    },
    methods: {
      }
    }


</script>

<style>

</style>