<template>
  <form @submit.prevent="onSubmit">
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
                <button type="submit">등록</button>
                <!-- <button-green
                    btn-name="등록하기"
                    @click="registerReply"
                    style="width: 200px; height: 50px; font-size: 16px">
                </button-green> -->
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-card>
  </form>
<!-- 작성자 replyWriter, 댓글 replyContent, 등록-->
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "RegisterQuestionreplyForm",
  data () {
    return {
      questionContent: this.questionBoard.content,
      reply: '',
    }
  },
  methods: {
    ...mapActions([
        'requestQuestionreplyRegisterToSpring'
    ]),
    async registerReply() {
      const {reply} = this
      const memberId = this.resMember.id
      const questionNo = this.questionBoard.questionNo
      await this.requestQuestionreplyRegisterToSpring({reply, memberId, questionNo})
      await this.$router.go(this.$router.currentRoute)
    }
  },
  props: {
    questionBoard: Object,
  },
  computed: {
    ...mapState([
        'resMember'
    ])
  }
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