<template>
    <div>
      <form @submit.prevent="onSubmit">
        <table>
          <tr>
            <td>게시물 번호</td>
            <td>
              <input type="text" :value="board.boardId" readonly/>
            </td>
          </tr>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" :value="board.title" readonly/>
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <input type="text" :value="board.writer" readonly/>
            </td>
          </tr>
          <tr>
            <td>등록일자</td>
            <td>
              <input type="text" :value="board.regDate" readonly/>
            </td>
          </tr>
          <tr>
            <td>본문</td>
            <td>
              <textarea cols="50" rows="10" :value="board.content" readonly/>
            </td>
          </tr>
          <tr>
            <p></p><td>댓글달기</td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <input type="text" v-model="replywriter"/>
            </td>
          </tr>
          <tr>
            <td>댓글작성</td>
            <td>
              <textarea cols="50" row="20" v-model="replyContent">
                댓글작성
              </textarea>
            </td>
          </tr>
          <tr>
          <button type="submit">작성</button>
          </tr>
        </table>
      </form>
    </div>
  </template>
  
  <script>
  export default {
      name: "JpaQnaBoardRead",
      props: {
          board: {
              type: Object,
              required: true,
          }
      },
      data () {
          return {
              replywriter: '댓글 작성자 이름 입력',
              replyContent: '내용을 입력하세요.'
          }
      },
      methods: {
          onSubmit () {
              const { replywriter, replyContent } = this
              this.$emit('submit', {replywriter, replyContent })
          }
      }

  }
  </script>
  
  <style>
  </style>