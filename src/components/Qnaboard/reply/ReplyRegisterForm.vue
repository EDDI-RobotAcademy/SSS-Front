<template>
    <form @submt.prevent="onSubmit">
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
                  <p>댓글작성</p>
                </v-col>
                <v-col cols="10">
                  <v-textarea
                      color="black"
                      height="200px"
                      v-model="replyContent"
                      outlined>
                  </v-textarea>
                </v-col>
            </v-row>
            <v-row align="center">
              <v-col>
                <div align="center" class="mb-10">
                  <button
                      btn-name="등록하기"
                      @click="onSubmit"
                      style="width: 200px; height: 50px; font-size: 15px">
                    등록하기
                  </button>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </form>
  </template>
  
  <script> 
  import {mapActions, mapState} from "vuex";
  
  export default {
    name: "ReplyRegisterForm",
    data () {
      return {
        reply: '',
        replyId: this.replyId,
        replyWriter: this.replyWriter,
        replyContent: this.replyContent,
      }
    },
    methods: {
      ...mapActions([
          'requestCreateReplyToSpring'
      ]),
      async onSubmit() {
        const reply = await this.requestCreateReplyToSpring(payload)
        console.log('reply: ' + JSON.stringify(reply.data))
        await this.$router.push({
          name: 'JpaQnaBoardReadPage',
          params: { replyId: reply.data.replyId.toString() }
        })
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
    margin-top: 40px;
    text-align: right;
    padding-right: 50px;
    width: 1000px;
  }
  
  .board-items p {
    margin-top: 10px;
    margin-right: 50px;
  }
  
  </style>