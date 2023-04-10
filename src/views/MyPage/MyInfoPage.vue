<template>
  <v-container>
  <my-info-form @submit="onSubmit"/>
</v-container>
</template>

<script>

import MyInfoForm from "@/components/MyPage/MyInfoForm";

export default {
  name: "MyInfoPage",
  components: {MyInfoForm}
}
</script>

<style scoped>

</style>