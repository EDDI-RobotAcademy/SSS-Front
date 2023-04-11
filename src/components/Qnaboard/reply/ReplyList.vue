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
        <div class="reply">
          <v-row>
            <pre style="font-family: naver2; height: fit-content">{{ reply.replyWriter }}
            </pre>
          </v-row>
          <v-row>
            <pre v-show="replyModify !== index" style="font-family: naver2; height: fit-content">
              {{ reply.replyContent }}
            </pre>
          </v-row>
          <v-text-field v-model="reply.replyContent" label="댓글 수정" v-show="replyModify === index"></v-text-field>
          <button v-if="reply.replyWriter && replyModify !== index" @click="startModify(index)">수정 | </button>
          <button v-if="reply.replyWriter && replyModify === index" @click="saveReply(reply)">수정 완료 | </button>
          <button v-if="reply.replyWriter" @click="deleteReply(reply)">삭제</button>
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
        await this.requestReplyDeleteToSpring({replyId})
        await this.$router.go(this.$router.currentRoute)
    },
  },
}
</script>

<style scoped>

table.boards {
  text-align: left;
  line-height: 1.5;
  /*border: 1px solid;*/
  width: 600px;
  table-layout: fixed;
}

table.boards thead {
  background: darkseagreen;
  font-weight: bold;
}

.boards .comment {
  padding-left: 20px;
  padding-top: 15px;
  margin: 10px;

}

.boards .comment .comment-btn {
  padding-left: 15px;
  color: white;
  margin-left: 370px;
}
</style>