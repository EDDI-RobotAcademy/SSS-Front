<template>
  <v-container>
    <form @submit.prevent="onSubmit">
      <v-row>
        <v-col cols="6">
          <table>
            <tr>
              <td>게시물 번호</td>
              <td>
                <input type="text" :value="sideProductId" disabled />
              </td>
            </tr>
            <tr>
              <td>메뉴무엇?</td>
              <td>
                <input type="text" v-model="sideProduct.title" />
              </td>
            </tr>
            <tr>
              <td>얼마야</td>
              <td>
                <input type="text" v-model="sideProduct.price" />
              </td>
            </tr>
            <tr>
              <td>본문</td>
              <td>
                <textarea cols="50" rows="20" v-model="sideProduct.content" />
              </td>
            </tr>
            <tr>
              <td>사진 변경</td>
              <td>
                <input type="file" id="files" ref="files" @change="handleFileUpload($event)" />
              </td>
            </tr>
          </table>
        </v-col>
        <v-col cols="6">
          <v-img :src="require(`@/assets/selfSalad/${sideProduct.sideProductImg.editedImg}`)" />

          <v-img v-if="fileSelected" :src="require(`@/assets/selfSalad/${sideProduct.sideProductImg.editedImg}`)" />
          <v-img v-else :src="imgUrl" :alt="'Image'"></v-img>
        </v-col>
        <div>
          <v-btn type="submit" color="blue">수정 완료</v-btn>
          <router-link :to="{
            name: 'SideProductReadPage',
            params: { sideProductId: sideProduct.sideProductId }
          }">
            <v-btn color="red">취소</v-btn>
          </router-link>
        </div>
      </v-row>
    </form>
  </v-container>
</template>

<script>
export default {
  name: "SideProductModifyForm",
  data() {
    return {
      title: this.sideProduct.title,
      content: this.sideProduct.content,
      price: this.sideProduct.price,
      imgUrl: "",
      fileSelected: false,
    }
  },
  props: {
    sideProduct: {
      type: Object,
      required: true
    },
      sideProductId: {
        type: String,
        required: true,
      }
    },
  methods: {
    onSubmit() {
      let formData = new FormData()
      formData.append("fileList", this.files[0]);
      console.log('fileList: '+ JSON.stringify(formData))
      const title =  this.sideProduct.title
      const content = this.sideProduct.content
      const price = this.sideProduct.price
      
      let productInfo = { title, content, price }
      console.log("데이터 확인 : "+title, content, price)
      formData.append(
                  "productInfo",
                  new Blob([JSON.stringify(productInfo)], { type: "application/json" })
              )
      console.log('formData: ' + JSON.stringify(formData))

              this.$emit('submit', formData )
    },
    handleFileUpload(event) {
      this.files = event.target.files;
      this.imgUrl = URL.createObjectURL(this.files[0]);
    }
  }
}
</script>

<style scoped>
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