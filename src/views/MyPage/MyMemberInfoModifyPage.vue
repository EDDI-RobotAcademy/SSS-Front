<template>
  <v-container>
    <my-member-info-modify-form @submit="onSubmit"/>
    <v-btn @click="$emit('close')" >닫기</v-btn>
  </v-container>
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
      this.$emit('close');
      console.log(payload);
      
}
}
}
</script>

<style>

</style>