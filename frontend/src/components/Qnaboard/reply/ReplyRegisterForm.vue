<template>
  <form @submit="registerReply()">
    <v-card>
      <v-card-title></v-card-title>
      <div class="reply-title">
        <p style="font-size: 22px; font-weight: bold">답변등록</p>
      </div>
      <v-divider style="border-color: black; border-width: 1px"></v-divider>
      <div class="reply-container">
        <div class="reply-items">
          <v-row>
              <v-col cols="2">
                <p>문의내용</p>
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
          <v-row>
            <v-col cols="2" align="right">
              <p>답변</p>
            </v-col>
            <v-col cols="10">
              <v-textarea
                  color="black"
                  height="200px"
                  placeholder="답변을 작성해주세요"
                  v-model="reply"
                  outlined>
              </v-textarea>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col>
              <div align="center" class="mb-10">
                <button
                    btn-name="등록하기"
                    tpye="submit"
                    style="width: 200px; height: 50px; font-size: 16px">
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
      replyContent: this.replyContent,
      reply: '',
    }
  },
  methods: {
    ...mapActions([
        'requestReplyRegisterToSpring'
    ]),
    async registerReply() {
      const reply = this
      // const memberId = this.resMember.id
      // const questionNo = this.questionBoard.questionNo
      // await this.requestQuestionreplyRegisterToSpring({reply, memberId, questionNo})
      await this.requestReplyRegisterToSpring({ reply })
      await this.$router.go(this.$router.currentRoute)
    }
  },
  // props: {
  //   reply: Object,
  // },
  // computed: {
  //   ...mapState([
  //       'resMember'
  //   ])
  // }
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