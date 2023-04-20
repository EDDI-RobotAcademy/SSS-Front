<template>
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
      <button type="submit">등록</button>
      <router-link to="{ name: 'QnaBoardListPage' }">
        취소
      </router-link>
    </div>
  </form>
</template>

<script>

export default {
    name: "QnaBoardRegisterForm",
    data () {
        return {
          title: '',
          content: '',
          writer: '',
          memberId: '',
          privateCheck: false,
        }
    },
    computed: {
    },
    created() {
      this.writer = this.$store.state.memberModule.memberInfoAboutSignIn.userNickName;
      this.memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId;
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
                const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId;
                this.$emit('submit', { title, writer, content, privateCheck, memberId })
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
table {
  margin: 0 auto;
  border-collapse: collapse;
  border: 1px solid black;
  margin-bottom: 10px;
  background-color: white;
}

td {
  padding: 10px;
  border: 2px solid black;
}

input[type="text"], textarea {
  width: 100%;
  border: none;
  padding: 10px;
  margin-bottom: 0px;
  font-size: 16px;
  background-color: white;
}

.bottom {
  margin-top: 20px;
  text-align: center;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #205C37;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #3D8745;
}

v-checkbox {
  margin-top: 10px;
}

label {
  color: #205C37;
  font-weight: bold;
}

textarea {
  resize: none;
  height: 300px;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  color: #205C37;
}

.alert {
  margin-top: 20px;
  padding: 10px;
  background-color: #f44336;
  color: white;
  text-align: center;
}

.privateCheck {
  color: #205C37;
}



</style>