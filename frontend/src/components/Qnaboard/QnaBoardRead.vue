<template>
<<<<<<< HEAD:frontend/src/components/Qnaboard/QnaBoardRead.vue
  <div>
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
    </table>
  </div>
</template>
=======
    <div>
      <!-- <form @submit.prevent="onSubmit"> -->
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
          <!-- <tr>
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
        </table>
        <div>
          <button type="submit">등록</button>
          <router-link to="{ name: 'JpaQnaBoardReadPage' }">
            취소
          </router-link> -->
        <!-- </div> -->
      <!-- </form> -->
      </table>
    </div>
  </template>
  
  <script>
  export default {
      name: "JpaQnaBoardRead",
      props: {
          board: {
              type: Object,
              required: true,
          },
          reply: {
              type: Object,
              required: false,
          },
      },
      // data () {
      //     return {
      //         replywriter: '댓글 작성자 이름 입력',
      //         replyContent: '내용을 입력하세요.'
      //     }
      // },
      // methods: {
      //     onSubmit () {
      //         const { replywriter, replyContent } = this
      //         this.$emit('submit', {replywriter, replyContent })
      //     }
      // }
>>>>>>> main:frontend/src/components/Board/Qnaboard/JpaQnaBoardRead.vue

<script>
export default {
    name: "QnaBoardRead",
    props: {
        board: {
            type: Object,
            required: true,
        },
        // reply: {
        //     type: Object,
        //     required: false,
        // },
    },
}
</script>

<style>
</style>