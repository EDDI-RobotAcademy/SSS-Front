<template>
    <v-container>
      <h2>가장 자주하는 질문 FAQ</h2>
      <router-link :to="{ name: 'JpaQnaBoardRegisterPage' }">
         게시물 작성
      </router-link>
      <jpa-qna-board-list :boards="boards"/>
    </v-container>
  </template>
  
  <script>
  
  import JpaQnaBoardList from '@/components/Board/Qnaboard/JpaQnaBoardList.vue'
  import { mapActions, mapState } from 'vuex'
  
  export default {
    components: { JpaQnaBoardList },
    name: "JpaQnaBoardListPage",
    computed: {
      ...mapState([
        'boards'
      ]),
    },
    mounted () {
      this.requestBoardListToSpring()
    },
    methods: {
      ...mapActions([
        'requestBoardListToSpring'
      ])
    }
  }
  
  </script>
  
  <style>
  
  </style>