<template>
    <v-container>
      <my-address-modify-form @submit="onSubmit"/>
    </v-container>
  </template>
  
  <script>
  import MyAddressModifyForm from "@/components/MyPage/MyAddressModifyForm.vue";
  import { mapActions } from "vuex";
  
  const memberModule = 'memberModule'
  
  export default {
  
    name: "MyMemberInfoModifyPage",
    components: {
        MyAddressModifyForm
      },
   
    methods: {
            ...mapActions(memberModule, [
          'requestUpdateAddressFromSpring'
        ]),
        onSubmit(payload) {
          const{zipcode, city, street, addressDetail}= payload
          console.log('payload=' + zipcode, city, street, addressDetail);
        this.requestUpdateAddressFromSpring(payload);
        this.$emit('close');
        //console.log(zipcode, city, street, addressDetail);
  },
  }
  }
  </script>
  
  <style>
  
  </style>