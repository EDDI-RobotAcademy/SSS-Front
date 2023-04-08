<template>
  <v-container>
    <div align="center">
      <h2>게시판 읽기</h2>
      <qna-board-read v-if="board" :board="board"/>
      <p v-else>로딩중 ......... </p>
      <reply-list :reply="reply"/>
      <reply-register-form @submit="onSubmit" :reply="reply"/>
      <router-link :to="{ name: 'QnaBoardModifyPage', params: { boardId } }">
        게시물 수정
      </router-link>
      <button @click="onDelete">삭제</button>
      <router-link :to="{ name: 'QnaBoardListPage' }">
        돌아가기
      </router-link>
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
        ]),
        async onDelete () {
            await this.requestDeleteBoardToSpring(this.boardId)
            await this.$router.push({ name: 'QnaBoardListPage' })
        },
        async onSubmit (payload) {
            const reply = await this.requestCreateReplyToSpring(payload)
            console.log('reply: ' + JSON.stringify(reply.data))
        }
    },
    created () {
        console.log('boardId: ' + this.boardId)
        this.requestBoardToSpring(this.boardId)
    }
}

</script>

<style>

</style>
