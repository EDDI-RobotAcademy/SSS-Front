<template>
  <v-container>
    <table class="reply"
           style="background-color: #eeeeee; border-radius: 10px"
           v-if="!replys || (Array.isArray(replys) && replys.length === 0)">
      <div style="padding: 10px">
        <p>현재 등록된 댓글이 없습니다!</p>
      </div>
    </table>
    <table class="reply"
           style="background-color: #eeeeee; border-radius: 10px"
           v-else
           v-for="(reply, index) in replys" :key="reply.replyId">
      <tbody>
      <!--      댓글 리스트-->
      <tr>
        <div class="comment">
          <p>작성자 : {{ reply.replyWriter }}</p>      
          <p> 내용 : {{ reply.replyContent }}</p>
          <v-text-field v-model="reply.replyContent" label="댓글 수정" v-show="replyModify === index"></v-text-field>
          <button v-if="reply.replyWriter" @click="deleteReply(reply)">삭제</button>
          <button v-if="reply.replyWriter && replyModify !== index" @click="startModify(index)">수정 | </button>
          <button v-if="reply.replyWriter && replyModify === index" @click="saveReply(reply)">수정 완료 | </button>
        </div>
      </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>

import axios from "axios";
import {mapActions, mapState} from "vuex";

const qnaModule = 'qnaModule'

export default {
  name: "ReplyList",
  data() {
    return {
      replyModify: null,
    }
  },
  props: {
    replys: {
        type: Array
    },
    reply: {
        type: Object
    },
  },
  methods: {
    ...mapActions(qnaModule, [
      'requestReplyDeleteToSpring',
    ]),
    startModify(index) {
      this.replyModify = index;
    },
    saveReply(payload) {
      this.replyModify = null;
      const { replyId, replyContent } = payload;
      
      return axios.put(`http://localhost:7777/reply/${replyId}`,
          {replyContent})
          .then((res) => {
              alert("질문 게시글의 댓글 " + replyId + "번 -> " + replyContent  +"로 수정 성공", res.data)
          })
          .catch(() => {
              alert("질문 게시글의 댓글 " + replyId + "번 수정 실패")
          })
        },
    async deleteReply(payload) {
        const { replyId } = payload
        console.log(replyId + "33333")
        await this.requestReplyDeleteToSpring({replyId})
        await this.$router.go(this.$router.currentRoute)
    },
  },
}
</script>

<style scoped>

table.reply {
  text-align: left;
  line-height: 1.5;
  border: 1px solid rgba(189, 189, 189, 0.5);
  border-left-color: white;
  border-right-color: white;
  width: 80%;
  table-layout: fixed;
}

.reply .comment {
  padding-left: 20px;
  padding-top: 15px;
  margin: 10px;
}

.reply .comment button {
  float: right;
  margin-left: 1px;
  padding-right: 10px;
}
</style>