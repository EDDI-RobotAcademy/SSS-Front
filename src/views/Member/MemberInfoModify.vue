<template>
  <div>
    <member-info-modify-form @submit="onSubmit"></member-info-modify-form>
  </div>
</template>

<script>
import MemberInfoModifyForm from '../../components/Member/MemberInfoModifyForm.vue'
import { mapActions } from "vuex";

const memberModule = 'memberModule'

export default {

  name: "MemberInfoModify",
  components: {
    MemberInfoModifyForm
  },
 
  methods: {
          ...mapActions(memberModule, [
        'reqUpdateMemberInfoFromSpring'
      ]),
      onSubmit(payload) {
        console.log(payload);
      this.reqUpdateMemberInfoFromSpring(payload);
      this.$router.push("/");  
      console.log(payload);
}
}
}
</script>

<style>

</style>