<template>
  <div class="detail">
      <table>
        <!-- <tr>
          <td>게시물 번호</td>
          <td>
            <input type="text" :value="board.boardId" readonly/>
          </td>
        </tr> -->
        <tr class="longline"/>
        <tr>
          <th>제목</th>
          <td>
            <input type="text" :value="board.title" readonly/>
          </td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>
            <input type="text" :value="board.writer" readonly/>
          </td>
        </tr>
        <tr>
          <th>작성일</th>
          <td>
            <input type="text" :value="board.regDate" readonly/>
          </td>
        </tr>
        <tr class="spacer-row">
          <td colspan="2"></td>
        </tr>
        <tr>
          <td colspan="2" class="content">
            <!-- <textarea cols="12" :value="board.content" readonly/> -->
            {{ board.content }}
          </td>         
        </tr>
      </table>
  </div>
</template>


<script>
export default {
    name: "QnaBoardRead",
    props: {
        board: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped>
.longline{
    border-bottom: 4px solid #40513B;
}
.detail {
  margin-top: 50px;
  font-size: 1.2em;
  color: #333;
}

.detail table {
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 1em;
}

.detail th,
.detail td {
  padding: 0.3em;
  text-align: left;
}
.detail th {
  width: 20%;
  font-weight: bold;
  font-size: 17px;
  background-color: #9DC08B;
}
.detail input[type="text"],
.detail textarea {
  width: 120%; /* Increase the width of the input fields */
  padding: 0.3em;
}

.detail textarea {
  height: 150px; /* Adjust the height of the textarea if necessary */
}
.content {
  width: 100%;
}

.spacer-row {
  height: 20px; /* Adjust the height to create the desired space */
}
</style>