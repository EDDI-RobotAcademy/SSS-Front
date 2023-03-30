<template>
<<<<<<< HEAD:frontend/src/views/QnaBoard/QnaBoardReadPage.vue
  <v-container>
    <div align="center">
      <h2>게시판 읽기</h2>
      <qna-board-read v-if="board" :board="board"/>
      <p v-else>로딩중 ......... </p>
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

export default {
  components: { QnaBoardRead, ReplyRegisterForm },
    name: "QnaBoardReadPage",
    props: {
        boardId: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState(['board']),
        ...mapState(['reply'])
    },
    methods: {
        ...mapActions([
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
=======
    <v-container>
      <div align="center">
        <h2>게시판 읽기</h2>
        <jpa-qna-board-read v-if="board" :board="board"/>
        <p v-else>로딩중 ......... </p>
        <reply-register-form @submit="onSubmit" :reply="reply"/>
        <router-link :to="{ name: 'JpaQnaBoardModifyPage', params: { boardId } }">
          게시물 수정
        </router-link>
        <button @click="onDelete">삭제</button>
        <router-link :to="{ name: 'JpaQnaBoardListPage' }">
          돌아가기
        </router-link>
      </div>
    </v-container>
  </template>
  
  <script>
  
  import JpaQnaBoardRead from '@/components/Board/Qnaboard/JpaQnaBoardRead.vue'
  import { mapActions, mapState } from 'vuex'
  import ReplyRegisterForm from '@/components/Board/Qnaboard/reply/ReplyRegisterForm.vue'
  
  export default {
    components: { JpaQnaBoardRead, ReplyRegisterForm },
      name: "JpaQnaBoardReadPage",
      props: {
          boardId: {
              type: String,
              required: true,
          },
      },
      computed: {
          ...mapState(['board']),
          ...mapState(['reply'])
      },
      methods: {
          ...mapActions([
              'requestBoardToSpring',
              'requestDeleteBoardToSpring',
              'requestCreateReplyToSpring',
          ]),
          async onDelete () {
              await this.requestDeleteBoardToSpring(this.boardId)
              await this.$router.push({ name: 'JpaQnaBoardListPage' })
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
>>>>>>> main:frontend/src/views/Board/QnaBoard/JpaQnaBoardReadPage.vue
