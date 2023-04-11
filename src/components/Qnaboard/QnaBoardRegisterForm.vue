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
          <input placeholder="작성자 이름을 입력하세요." type="text" v-model="writer"/>
        </td>
      </tr>
      <tr>
        <td>본문</td>
        <td>
          <textarea placeholder="내용을 입력하세요." cols="50" rows="20" v-model="content"/>
        </td>
      </tr>
    </table>
    <div>
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
          writer: '',
          content: '',
        }
    },
    methods: {
        onSubmit () {
            const { title, writer, content } = this
            this.$emit('submit', { title, writer, content })
        }
    }
}

</script>

<style>

</style>