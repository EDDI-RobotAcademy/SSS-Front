<template>
    <div class="center-container">
      <v-container class="center-form" style="width: 500px">
        <v-card-text>
          <v-form @submit.prevent="onSubmit">
            <table style="width: 100%; table-layout: fixed; border-collapse: collapse;">
    <tr>
      <td style="text-align: center; height: 100%; vertical-align: middle;">
        <div style="font-size: larger; font-weight: bold; color: #40513B; margin-bottom: 20px;">
          비밀번호를 입력하세요
        </div>
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
          <v-layout align-center style="width: 400px;">
            <v-text-field style="width: 100%; margin-right: 20px; font-family: Arial;" type="password" v-model="password" label="비밀번호"/>
            
            <v-btn style="background-color: #609966; color: white;" type="submit">
              확인
            </v-btn>
          </v-layout>
        </div>
      </td>
    </tr>
  </table>
  <v-dialog v-model="showModal" min-width="550px" max-width="1000px">
    <my-address-modify-page @close="closeModal">
    </my-address-modify-page>
  </v-dialog>
          </v-form>
        </v-card-text>
      </v-container>
    </div>
  </template>
  
  
  <script>
  import MyAddressModifyPage from "@/views/MyPage/MyAddressModifyPage.vue";
  import { mapActions } from "vuex";
  
  const memberModule = "memberModule";
  
  export default {
    name: "MyAddressPasswordCheckPage",
    components: {
      MyAddressModifyPage,
    },
    data() {
      return {
        password: "",
        showModal:false,
        
      };
    },
    methods: {
      ...mapActions(memberModule, ["requestCheckPasswordToSpring"]),
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
      onSubmit() {
        
        const password = this.password;
        if (!password) {
          alert("비밀번호를 입력하세요.");
          return;
        }
      
        this.requestCheckPasswordToSpring(password)
            .then((res) => {
              if (res === false) {
                this.showModal = false;
              } else {
                this.showModal = true;
              }
            });
          },
          
    },
  };
      
  </script>
  
  <style scoped>
  .th-style {
    width: 200px;
    border: 1px;
    text-align: left;
    padding: 12px 10px;
    height: 48px;
  }
  
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 600px); /* 64px는 Vuetify의 툴바 높이 */
  }
  
  .center-form {
    background-color: #FFFFFF; /* 폼 배경색상 추가 */
    padding: 20px; /* 폼 패딩 추가 */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  
  }
  
  
  </style>