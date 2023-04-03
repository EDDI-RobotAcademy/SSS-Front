<template>
  <v-container>
    <form @submit="onSubmitRegister()">
      <table>
        <tbody>
        <br>
        <tr>
          <th scope="row">
            {{ replyWriter }}
          </th>
          &nbsp;&nbsp;&nbsp;
          <td>
          <textarea
              class="justify-center"
              style="border: solid thin"
              cols="60" rows="3" v-model="reply"
              placeholder="내용을 입력해 주세요."
              onfocus="this.placeholder=''"
              onblur="this.placeholder='내용을 입력해 주세요.'">
          </textarea>
          </td>
          <td>
            <v-btn class="ml-3" width="100" height="70" rounded type="submit">
              등록하기
            </v-btn>
          </td>
        </tr>
        </tbody>
      </table>
    </form>
  </v-container>
</template>

<script>

export default {
  name: "QuestionRegisterForm",
  data() {
    return {
      reply: '',
      // memberId: this.$store.state.resMember.id, // 변수 지정 -> Request로 보냄
      replyWriter: this.$store.state.reWriter.username
    }
  },
  methods: {
    onSubmitRegister() {
      this.replyWriter = this.$store.state.reWriter.username
      // this.memberId = this.$store.state.resMember.id
        const reply = this
        this.$emit('submit', reply)
    },
  }
}
</script>

<style scoped>

</style>