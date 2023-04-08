<template>
    <v-container>
      <h2>게시물 작성</h2>
      <qna-board-register-form @submit="onSubmit"/>
    </v-container>
  </template>
  
  <script>
  import QnaBoardRegisterForm from '@/components/Qnaboard/QnaBoardRegisterForm.vue'
  import { mapActions } from 'vuex'

  const qnaModule = 'qnaModule'
  
  export default {
      components: { QnaBoardRegisterForm },
      name: "QnaBoardRegisterPage",
      methods: {
          ...mapActions (qnaModule, [
              'requestCreateBoardToSpring'
          ]),
          async onSubmit (payload) {
              const board = await this.requestCreateBoardToSpring(payload)
              console.log('board: ' + JSON.stringify(board.data))
              await this.$router.push({
                  name: 'QnaBoardReadPage',
                  params: { boardId: board.data.boardId.toString() }
              })
          }
      }
  }
  
  </script>
  
  <style>
  </style>