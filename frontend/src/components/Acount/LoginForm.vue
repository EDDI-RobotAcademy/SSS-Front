<template>
    <form @submit.prevent="onSubmit">
      <table>
        <tr>
          <td>로그인</td>
          <td>
            <input type="text" v-model="id"/>
          </td>
        </tr>
        <tr>
          <td>패스워드</td>
          <td>
            <input type="text" v-model="password"/>
          </td>
        </tr>
      </table>
      <div>
        <button type="submit">로그인</button>
      </div>
    </form>
  </template>
  
  <script>
  
export default {
    name: "LoginForm",
    data () {
        return {
            id: "",
            password: "",

            //이메일 형식 룰
            email_rule: [
                v => !!v || '이메일을 입력해주세요.',
                v => {
                    const replaceV = v.replace(/(\s*)/g, '')
                    const pattern = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(replaceV) || '이메일 형식을 입력하세요.'
             }
                        ],

            //비밀번호 룰
            password_rule: [
                v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
                v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
                           ],
                }
            },
    methods: {
        //버튼 눌렀을때 전송되는 데이터
        onSubmit () {
        const { email, password } = this
        this.$emit("submit", { email, password })
                    }
             }
}
</script>

<style scoped>

</style>