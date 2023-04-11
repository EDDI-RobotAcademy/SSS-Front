<template>
  <v-container>
    <div align="center">
      <h2>게시판 읽기</h2>
      <qna-board-read v-if="board" :board="board"/>
      <p v-else>로딩중 ......... </p>
      <router-link :to="{ name: 'QnaBoardModifyPage', params: { boardId } }">
        게시물 수정
      </router-link>
      <button @click="onDelete">삭제</button>
      <router-link :to="{ name: 'QnaBoardListPage' }">
        돌아가기
      </router-link>
    <table>
      <tr>
        <div>
          <h1>댓글</h1>
        </div>
        <div>
          <reply-list :replys="replys"/>
        </div>
          <reply-register-form @submit="onSubmit"/>
      </tr>
    </table>
    </div>
  </v-container>
</template>

<script>

import QnaBoardRead from '@/components/Qnaboard/QnaBoardRead.vue'
import { mapActions, mapState } from 'vuex'
import ReplyRegisterForm from '@/components/Qnaboard/reply/ReplyRegisterForm.vue'
import ReplyList from '@/components/Qnaboard/reply/ReplyList.vue'

const qnaModule = 'qnaModule'

export default {
  components: { QnaBoardRead, ReplyRegisterForm, ReplyList },
    name: "QnaBoardReadPage",
    props: {
        boardId: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState(qnaModule, [
          'board', 'replys'
        ]),
    },
    methods: {
        ...mapActions(qnaModule,[
            'requestBoardToSpring',
            'requestDeleteBoardToSpring',
            'requestCreateReplyToSpring',
            'requestReplyListFromSpring',
            ]),
        async onDelete () {
            console.log('boardId' + this.boardId)
            await this.requestDeleteBoardToSpring(this.boardId)
            await this.$router.push({ name: 'QnaBoardListPage' })
        },
        async onSubmit (payload) {
            const { replyContent, replyWriter, replyId } = payload
            const boardId = this.boardId
            console.log('댓글: ' + this.boardId)
            await this.requestCreateReplyToSpring( { replyContent, replyWriter, boardId, replyId })
            await this.$router.push({
              name: 'QnaBoardReadPage',
              params: { boardId: board.data.boardId.toString() }
            })
        }
    },
    created () {
        console.log('boardId: ' + this.boardId)
        this.requestBoardToSpring(this.boardId)
        this.requestReplyListFromSpring(this.boardId)
    }
}

</script>

<style>

</style>
