<template>
    <v-container>
      <h2>게시물 작성</h2>
      <jpa-qna-board-register-form @submit="onSubmit"/>
    </v-container>
  </template>
  
  <script>
  import JpaQnaBoardRegisterForm from '@/components/Board/Qnaboard/JpaQnaBoardRegisterForm.vue'
  import { mapActions } from 'vuex'
  
  export default {
      components: { JpaQnaBoardRegisterForm },
      name: "JpaQnaBoardRegisterPage",
      methods: {
          ...mapActions ([
              'requestCreateBoardToSpring'
          ]),
          async onSubmit (payload) {
              const board = await this.requestCreateBoardToSpring(payload)
              console.log('board: ' + JSON.stringify(board.data))
              await this.$router.push({
                  name: 'JpaQnaBoardReadPage',
                  params: { boardId: board.data.boardId.toString() }
              })
          }
      }
  }
  
  </script>
  
  <style>
  </style>