<template>
    <v-container>
      <div align="center">
        <h2>게시판 읽기</h2>
        <jpa-qna-board-read v-if="board" :board="board"/>
        <p v-else>로딩중 ......... </p>
        <reply-register-form @submit="onSubmit" :board="board"/>
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
          }
      },
      computed: {
          ...mapState(['board'])
      },
      methods: {
          ...mapActions([
              'requestBoardToSpring',
              'requestDeleteBoardToSpring'
          ]),
          async onDelete () {
              await this.requestDeleteBoardToSpring(this.boardId)
              await this.$router.push({ name: 'JpaQnaBoardListPage' })
          },
          async onSubmit (payload) {
              const board = await this.requestCreateBoardToSpring(payload)
              console.log('board: ' + JSON.stringify(board.data))
              await this.$router.push({
                  name: 'JpaQnaBoardReadPage',
                  params: { boardId: board.data.boardId.toString() }
              })
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