<template>
    <div class="qna-board-modify-form">
      <form @submit.prevent="onSubmit">
        <table>
          <tr>
              <td>게시물 번호</td>
              <td>
                  <input type="text" :value="board.boardId" disabled/>
              </td>
          </tr>
          <tr>
              <td>제목</td>
              <td>
                  <input type="text" v-model="title"/>
              </td>
          </tr>
          <tr>
              <td>작성자</td>
              <td>
                  <input type="text" :value="board.writer" disabled/>
              </td>
          </tr>
          <tr>
              <td>등록일자</td>
              <td>
                  <input type="text" :value="board.regDate" disabled/>
              </td>
          </tr>
          <tr>
              <td>본문</td>
              <td>
                  <textarea cols="50" rows="20" v-model="content"/>
              </td>
          </tr>
        </table>
  
        
        <div class="buttons">
          <button type="submit" class="submit-button">수정 완료</button>
          <router-link :to="{ name: 'QnaBoardReadPage',
                              params: { boardId: board.boardId.toString() }}" class="cancel-button">
            취소
          </router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  
  export default {
      name: "QnaBoardModifyForm",
      props: {
          board: {
              type: Object,
              required: true,
          }
      },
      data () {
          return {
              title: '',
              content: '',
              writer: '',
              regDate: '',
          }
      },
      created () {
          this.title = this.board.title
          this.writer = this.board.writer
          this.content = this.board.content
          this.regDate = this.board.regDate
      },
      methods: {
          onSubmit () {
              const { title, content, writer } = this
              this.$emit('submit', { title, content, writer })
          }
      }
  }
  
  </script>
  
  <style scoped>
  .qna-board-modify-form {
  margin: 20px auto;
  max-width: 700px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

td {
  padding: 10px 0;
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

input[disabled] {
  background-color: #f2f2f2;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.submit-button {
  background-color: #008000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #006600;
}
  </style>