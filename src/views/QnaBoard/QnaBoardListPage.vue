<template>
  <v-container>
    <div class="box" style="margin-top: 20px;">
      <h2>자유게시판</h2>
      <p>고객 여러분들의 다양한 이야기를 들려주세요</p>
    </div>
    <div class="center">
      <div class="inner">
        <select v-model="searchBy">
          <option value="title">제목</option>
          <option value="writer">작성자</option>
        </select>
        <input type="text" v-model="searchQuery" placeholder="검색" @keyup.enter="searchBoards">
        <button @click="searchBoards">검색</button>
      </div>
      <router-link :to="{ name: 'QnaBoardRegisterPage' }">
        <p>글쓰기</p>
      </router-link>

    </div>

    <div class="list">
      <qna-board-list :boards="boardList" :current-page="currentPage" />
    </div>
 
    
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

<style scoped>

.box {
  text-align: center;
  margin-bottom: 50px;
}

.center {
  display: flex;
  justify-content: right;
  margin-bottom: 10px;
}

.center p {
  color: #fff;
  background-color: #374627;
  padding: 7px 13px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
}

.inner {
  display: flex;
}

.inner select {
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #739e42;
  margin-right: 10px;
}

.inner input[type='text'] {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #739e42;
  padding-left: 10px;
  margin-right: 10px;
}

.inner button {
  width: 70px;
  height: 35px;
  background-color: #739e42;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-right: 30px;
}

a {
  text-decoration: none;
}
</style>