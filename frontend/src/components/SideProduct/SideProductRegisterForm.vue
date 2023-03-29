<template>
  <v-container>
    <form @submit.prevent="onSubmit">
      <div class="div">
        <table>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" v-model="title" />
            </td>
          </tr>
          <tr>
            <td>얼마야</td>
            <td>
              <input type="number" v-model="price" />
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <textarea cols="50" rows="10" v-model="content" />
            </td>
          </tr>
          <tr>
            <td>사진 추가</td>
            <td>
              <input type="file" id="files" ref="files"
                multiple @change="handleFileUpload"/>
            </td>
          </tr>
        </table>
      </div>
      <div>
          <v-btn type="submit" color="blue">등록</v-btn>
      </div>
    </form>
  </v-container>
</template>

<script>
export default {
  name: "SideProductRegisterForm",
  data () {
      return {
          title: '제목을 입력하세요.',
          content: '내용을 입력하세요.',
          price: 0,
      }
  },
  methods: {
        onSubmit () {
            let formData = new FormData()
            for (let idx = 0; idx < this.files.length; idx++) {
                formData.append('fileList', this.files[idx])
            }
            const { title, content, price } = this
            let productInfo = {
                title: title,
                content: content,
                price: price,
            }
            console.log('productInfo: ' + JSON.stringify(productInfo))
            formData.append(
                "productInfo",
                new Blob([JSON.stringify(productInfo)], { type: "application/json" })
            )
            console.log('formData: ' + JSON.stringify(formData))
            this.$emit('submit', formData)
        },
        handleFileUpload () {
            this.files = this.$refs.files.files
        },
    }
}



</script>
<style scoped>
a {
  text-decoration: none;
}

.div {
  display: flex;
  justify-content: center;
}

table {
  border-collapse: collapse;
  border: 2px solid black;
  margin-bottom: 5px;
}

td {
  padding: 5px;
  border: 2px solid black;
}
</style>