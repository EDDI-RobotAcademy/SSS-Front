<template>
  <v-container>
  <v-card flat style="width: 100%">
    <v-card-text>
      <div class="box">
        <table>
          <tr>
            <th align="center" width="200">No</th>
            <th align="center" width="840">제목</th>
            <th align="center" width="300">작성자</th>
            <th align="center" width="800">등록일자</th>
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
          </tr>
        </table>
      </div>

    </v-card-text>
    </v-card>
    </v-container>
</template>

<script>

export default {
  name: "MyQnaForm",
  data () {
        return {
          privateCheck: false,
        }
      },
      props: {
        boards: {
          type: Array
        }
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