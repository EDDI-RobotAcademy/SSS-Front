<template>
  <div>
    <my-member-info-modify-form @submit="onSubmit"/>
  </div>
</template>

<script>
import MyMemberInfoModifyForm from "@/components/MyPage/MyMemberInfoModifyForm.vue";
import { mapActions } from "vuex";

const memberModule = 'memberModule'

export default {

  name: "MyMemberInfoModifyPage",
  components: {
    MyMemberInfoModifyForm
    },
 
  methods: {
          ...mapActions(memberModule, [
        'requestUpdateMemberInfoFromSpring'
      ]),
      onSubmit(payload) {
        console.log(payload);
      this.requestUpdateMemberInfoFromSpring(payload);
      this.$router.push("/my-info-account");  
      console.log(payload);
}
}
}
</script>

<style>

</style>