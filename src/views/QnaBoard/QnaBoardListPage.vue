<template>
  <v-container>
    <h2>가장 자주하는 질문 FAQ</h2>
    <router-link :to="{ name: 'QnaBoardRegisterPage' }">
       게시물 작성
    </router-link>
    <qna-board-list :boards="boards"/>
    <!-- <div>
      <select>
        <option value="title">제목</option>
        <option value="writer">작성자</option>
      </select>
      <input type="text" v-model="serachQuery" placeholder="검색" @keyup.enter="searchBoard">
      <button @click="searchBoard">검색</button>
    </div> -->
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
    ]),
    // searchBoard() {
    //   const query = this.serachQuery.toLowerCase();
    //   if (query === ''){
    //     this.boardList = this.boardList;
    //   } else {
    //     if (this.searchBy === 'title') {
    //       this.boardList = this.boards.filter(board => board.title.toLowerCase().includes(query));
    //     } else if (this.searchBy === 'writer') {
    //       this.boardList = this.boards.filter(board=> board.writer.toLowerCase().includes(query));
    //     }
    //   }
    // }
  },
  // data () { 
  //   return {
  //     searchQuery: '',
  //     boardList: [],
  //     searchBy: 'title',
  //   }
  // }
}

</script>

<style>

</style>