<template>
    <div class="box">
      <table>
        <tr>
          <th align="center" width="200">No</th>
          <th align="center" width="840">제목</th>
          <th align="center" width="300">작성자</th>
          <th align="center" width="800">등록일자</th>
          <th align="center" width="500">비밀글 확인</th>
        </tr>
        <tr v-if="!boards || (Array.isArray(boards) && boards.length === 0)">
          <td colspan="4">
              현재 등록된 게시물이 없습니다!
          </td>
        </tr>
        <tr v-else v-for="board in boards" :key="board.boardId">
          <td align="center">
            {{ board.boardId }}
          </td>
          <td align="left"  @click="redirectToBoard(board)">
                <p class="title">{{ board.title }}</p>
          </td>
          <td align="center">
            {{ board.writer }}
          </td>
          <td align="center">
            {{ board.regDate }}
          </td>
          <td align="center">
            <span v-if="board.privateCheck === false">일반 게시물</span>
            <span v-else>비밀</span>
          </td>
        </tr>
      </table>
    </div>
  </template>
  
  
  <script>

  export default {
      name: "QnaBoardList",
          data () {
        return {
          privateCheck: false,
        }
      },
      props: {
        boards: {
          type: Array
        }
      },
      methods: {
        // title클릭시 관리자/회원, 비밀글/일반글 을 확인하고 읽기 페이지로 router 해준다
        redirectToBoard(board) {
          const nickname = this.$store.state.memberModule.memberInfoAboutSignIn.userNickName;
          const authorityType = this.$store.state.memberModule.memberInfoAboutSignIn.authorityType;

            console.log("사용자"+nickname)
            console.log("작성자"+board.writer)
            console.log("비밀여부" + board.privateCheck)
            console.log("타입" + authorityType)

        // 관리자 계정이 아닌경우 비밀글 여부를 확인하고, 관리자 계정은 모든 게시물을 열람할 수 있도록 한다.
        if(authorityType !== 'ADMIN'){
          if(board.privateCheck === true) {
            if (board.writer !== nickname){
              alert("비밀글입니다." + board.privateCheck)
              this.$router.push({ name: 'QnaBoardListPage'});
            } else {
              this.$router.push({ name: 'QnaBoardReadPage',
                        params: {boardId: board.boardId.toString()} })
            }
          } else {
              this.$router.push({ name: 'QnaBoardReadPage',
                        params: {boardId: board.boardId.toString()} })
          }
        } else {
            this.$router.push({ name: 'QnaBoardReadPage',
                          params: {boardId: board.boardId.toString()} })
        }
      },
    }
  }
  </script>
  
  <style scoped>
  
   table {
    width: 100%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  td, th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    font-size: 18px;
    font-weight: bold;
  }

  td {
    font-size: 16px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  .box {
    text-align: center;
    margin: 20px auto;  

  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }
  </style>