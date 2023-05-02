<template>
  <div class="qna-board-register-form">
    <form @submit.prevent="onSubmit">
      <table>
        <tr>
          <td>제목</td>
          <td>
            <input placeholder="제목을 입력하세요." type="text" v-model="title"/>
          </td>
        </tr>
        <tr>
          <td>작성자</td>
          <td>
            {{this.$store.state.memberModule.memberInfoAboutSignIn.userNickName}}
          </td>
        </tr>
        <tr>
          <td>본문</td>
          <td>
            <textarea placeholder="내용을 입력하세요." cols="50" rows="20" v-model="content"/>
          </td>
        </tr>
      </table>
      <div align="center">
        <v-checkbox
        @click="click"
          label="비밀글 문의"
          color="#205C37"
          v-model="privateCheck">
        </v-checkbox>
      </div>
      <div class="bottom">
        <button type="submit" class="submit-button">등록</button>
        <router-link to="{ name: 'QnaBoardListPage' }">
          취소
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>

export default {
    name: "QnaBoardRegisterForm",
    data () {
        return {
          title: '',
          content: '',
          writer: '',
          privateCheck: false,
        }
    },
    computed: {
    },
    created() {
      this.writer = this.$store.state.memberModule.memberInfoAboutSignIn.userNickName;
    },
    methods: {
      click(){
        console.log("@@@@@")
        console.log("@@@@@"+this.privateCheck)
      },
        onSubmit () {
            if(this.$store.state.memberModule.isAuthenticated == true) {
                if (this.title=='') {
                alert('제목을 입력해주세요')
              } else if (this.content=='') {
                alert('내용을 작성해주세요')
              } else {
                const { title, content, privateCheck } = this
                const writer = this.$store.state.memberModule.memberInfoAboutSignIn.userNickName;
                this.$emit('submit', { title, writer, content, privateCheck })
              }
            } else {
              alert("로그인이 필요한 기능입니다.")
              this.$router.push('/member/sign-in')
            }
        },
    }
  }
  

</script>

<style scoped>
.qna-board-register-form {
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