<template>
  <v-container>
    <form @submit="onSubmit()">
      <v-card>
        <v-card-title></v-card-title>
        <div class="reply-title">
          <p style="font-size: 22px; font-weight: bold">댓글등록</p>
        </div>
        <v-divider style="border-color: black; border-width: 1px"></v-divider>
        <div class="reply-container">
          <div class="reply-items">
            <v-row>
              <v-col cols="2">
                <p>작성자</p>
              </v-col>
              <v-col cols="2">
                <v-textarea
                    color="black"
                    height="5px"
                    v-model="replyWriter"
                    outlined>
                </v-textarea>
              </v-col>
          </v-row>
            <v-row>
                <v-col cols="2">
                  <p>댓글작성</p>
                </v-col>
                <v-col cols="10">
                  <v-textarea
                      color="black"
                      height="50px"
                      v-model="replyContent"
                      outlined>
                  </v-textarea>
                </v-col>
            </v-row>
            <v-row align="center">
              <v-col>
                <div align="center" class="mb-10">
                  <v-btn
                      btn-name="등록하기"
                      type="submit"
                      style="width: 200px; height: 50px; font-size: 15px">
                    등록하기
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </form>
  </v-container>
  </template>
  
  <script> 
  import {mapActions, mapState} from "vuex";
  
  export default {
    name: "ReplyRegisterForm",
    props: {
      board: {
        type: Array
      },
    },
    data () {
      return {
        replyContent: '',
        replyWriter: '',
      }
    },
    methods: {
      onSubmit() {
        const {replyContent, replyWriter} = this
        this.$emit('submit', {replyContent, replyWriter})
      }
    },
    
  }
  </script>
  
  <style scoped>
  
  .reply-title {
    margin-left: 30px;
  }
  
  .reply-container {
    display: flex;
    justify-content: center;
  }
  
  .reply-items {
    margin-top: 10px;
    text-align: right;
    padding-right: 50px;
    width: 1000px;
  }
  
  .board-items p {
    margin-top: 10px;
    margin-right: 50px;
  }
  
  </style>