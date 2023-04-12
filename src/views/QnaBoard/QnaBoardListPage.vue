<template>
  <v-container>
    <h2>가장 자주하는 질문 FAQ</h2>
    <router-link :to="{ name: 'QnaBoardRegisterPage' }">
       게시물 작성
    </router-link>
    <div>
      <select v-model="searchBy">
        <option value="title">제목</option>
        <option value="writer">작성자</option>
      </select>
      <input type="text" v-model="searchQuery" placeholder="검색" @keyup.enter="searchBoards">
      <button @click="searchBoards">검색</button>
    </div>
    <qna-board-list :boards="boardList" :current-page="currentPage" />
  </v-container>
</template>

<script>

import QnaBoardList from '@/components/Qnaboard/QnaBoardList.vue'
import { mapActions, mapState } from 'vuex'

const qnaModule = 'qnaModule'

export default {
  components: { QnaBoardList },
  name: "QnaBoardListPage",
  data () { 
    return {
      searchQuery: '',
      boardList: [],
      searchBy: 'title',
      currentPage: 1,
    }
  },
  computed: {
    ...mapState(qnaModule, ['boards']),
  },
  mounted () {
    this.requestBoardListToSpring()
  },
  created() {
    //브라우저 새로고침 해도 게시물 목록 계속 보이게 수정
    if (this.boards && this.boards.length > 0) {
      this.searchBoards();
    }
  },
  watch: {
    boards() {
      //브라우저 새로고침 해도 게시물 목록 계속 보이게 수정
      // 게시물 목록이 변경될 때마다 searchBoards() 호출
      if (this.boards && this.boards.length > 0) {
        this.searchBoards();
      }
    }
  },
  methods: {
    searchBoards() {
      const query = this.searchQuery.toLowerCase();
      if (query === ''){
        this.boardList = this.boards;
      } else {
        if (this.searchBy === 'title') {
          this.boardList = this.boards.filter(board => board.title.toLowerCase().includes(query));
        } else if (this.searchBy === 'writer') {
          this.boardList = this.boards.filter(board=> board.writer.toLowerCase().includes(query));
        }
      }
      this.currentPage = 1;
    },
    ...mapActions(qnaModule, [
      'requestBoardListToSpring'
    ]),
  },
}

</script>

<style>

</style>