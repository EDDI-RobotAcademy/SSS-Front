<template>
  <v-container>
    <h2>가장 자주하는 질문 FAQ</h2>
    <router-link :to="{ name: 'QnaBoardRegisterPage' }">
       게시물 작성
    </router-link>
    <qna-board-list :boards="boards"/>
  </v-container>
</template>

<script>

import QnaBoardList from '@/components/Qnaboard/QnaBoardList.vue'
import { mapActions, mapState } from 'vuex'

const qnaModule = 'qnaModule'

export default {
  components: { QnaBoardList },
  name: "QnaBoardListPage",
  computed: {
    ...mapState(qnaModule, [
      'boards'
    ]),
  },
  mounted () {
    this.requestBoardListToSpring()
  },
  methods: {
    ...mapActions(qnaModule, [
      'requestBoardListToSpring'
    ])
  }
}

</script>

<style>

</style>