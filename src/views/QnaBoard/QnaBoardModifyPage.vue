<template>
    <v-container>
      <div align="center">
        <h2>게시물 수정</h2>
        <qna-board-modify-form v-if="board" :board="board" @submit="onSubmit"/>
        <p v-else>로딩중 .......</p>
      </div>
    </v-container>
  </template>
  
  <script>
  
  import QnaBoardModifyForm from '@/components/Qnaboard/QnaBoardModifyForm.vue'
  import { mapActions, mapState } from 'vuex'

  const qnaModule = 'qnaModule'
  
  export default {
      components: { QnaBoardModifyForm },
      name: "QnaBoardModifyPage",
      props: {
          boardId: {
              type: String,
              required: true,
          }
      },
      computed: {
          ...mapState(qnaModule, [
            'board'
        ])
      },
      methods: {
          ...mapActions(qnaModule, [
              'requestBoardToSpring',
              'requestBoardModifyToSpring',
          ]),
          async onSubmit (payload) {
              const { title, content, writer } = payload
              const boardId = this.boardId
  
              await this.requestBoardModifyToSpring({ boardId, title, content, writer })
              await this.$router.push({
                  name: 'QnaBoardReadPage',
                  params: { boardId: this.boardId }
              })
          }
      },
      created () {
          this.requestBoardToSpring(this.boardId)
      }
  }
  
  </script>
  
  <style>
  
  </style>