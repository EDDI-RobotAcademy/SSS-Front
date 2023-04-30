<template>
  <v-container>
    <table class="empty-reply"
           style=" border-radius: 10px"
           v-if="!replys || (Array.isArray(replys) && replys.length === 0)">
      <div style="padding: 10px">
        <p>댓글을 남겨주세요.</p>
      </div>
    </table>
    <table class="reply"
           style=" border-radius: 10px"
           v-else
           v-for="(reply, index) in replys" :key="reply.replyId">
      <tbody>
      <!--      댓글 리스트-->
      <tr>
        <div class="comment">
          <div class="reply-info">
          <p class="reply-writer">작성자 : {{ reply.replyWriter }}</p>
          <p class="reply-content"> 내용 : {{ reply.replyContent }}</p>
        </div>
        <div class="reply-actions">
          <v-text-field v-model="reply.replyContent" label="댓글 수정" v-show="replyModify === index"></v-text-field>
          <button class="delete-button" v-if="isWriter(reply)" @click="deleteReply(reply)">삭제</button>
          <button class="modify-button" v-if="isWriter(reply) && replyModify !== index" @click="startModify(index)">수정 </button>
          <button class="save-button" v-if="isWriter(reply) && replyModify === index" @click="saveReply(reply)">수정 완료 </button>
        </div>
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
const memberModule = 'memberModule'

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
  computed: {
    ...mapState(memberModule, [
      'memberInfoAboutSignIn'
    ]),
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
        this.$router.go(this.$router.currentRoute)
    },
    isWriter(reply) {
      return this.memberInfoAboutSignIn.userNickName === reply.replyWriter
    }
  },
}
</script>

<style scoped>
.reply {
  border-radius: 10px;
  padding: 10px;
  width: 100%
}

.empty-reply {
  padding: 10px;
}

.comment {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgba(189, 189, 189, 0.5);
  border-radius: 5px;
  background-color: #ffffff;
  margin: 10px auto;
}

.reply-writer {
  margin: 0;
  font-weight: bold;
}

.reply-content {
  margin: 0;
}

.reply-info {
  flex-grow: 1;
}
.reply-actions {
  display: flex;
  align-items: center;
}

.delete-button,
.modify-button,
.save-button {
  padding: 5px 10px;
  margin-left: 5px;
  background-color: #40513B;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 10px;
}

.delete-button:hover,
.modify-button:hover,
.save-button:hover {
  background-color: #728c69;
}

.reply-buttons .save-button {
  background-color: rgb(54, 109, 50);
}
</style>