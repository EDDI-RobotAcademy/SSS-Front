<template>
  <v-container>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data" method="post">
        <v-row>
        <v-col cols="6">
          <table>
            <tr>
              <td>게시물 번호</td>
              <td>
                <input type="text" :value="sideproduct.sideproductId" disabled/>
              </td>
            </tr>
            <tr>
              <td>메뉴무엇?</td>
              <td>
                <input type="text" v-model="title" />
              </td>
            </tr>
            <tr>
              <td>얼마야</td>
              <td>
                <input type="text" v-model.number="price" />
              </td>
            </tr>
            <tr>
              <td>본문</td>
              <td>
                <textarea cols="50" rows="20" v-model="content" />
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
          <v-img :src="require(`@/assets/selfSalad/${sideproduct.sideProductImg.editedImg}`)" />

          <v-img v-if="fileSelected" :src="require(`@/assets/selfSalad/${sideproduct.sideProductImg.editedImg}`)" />
          <v-img v-else :src="imgUrl" :alt="'Image'"></v-img>
        </v-col>
        <div>
          <v-btn type="submit" color="blue">수정 완료</v-btn>
          <router-link :to="{
            name: 'SideProductReadPage',
            params: { sideProductId: sideproduct.sideProductId }
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
      title: this.sideproduct.title,
      content: this.sideproduct.content,
      price: this.sideproduct.price,
      imgUrl: "",
      fileSelected: false,
    }
  },
  props: {
    sideproduct: {
      type: Object,
      required: true,
    }
  },
  methods: {
    onSubmit() {
      let formData = new FormData()
      formData.append("fileList", this.files[0]);
      const { sideProductId, title, content, price } = this
      let productInfo = {
        title: title,
        content: content,
        price: price,
      }
      formData.append(
                  "productInfo",
                  new Blob([JSON.stringify(productInfo)], { type: "application/json" })
              )
              for(let value of formData.values()){
                console.log(value)
              }
              console.log(this.formData)
              console.log(productInfo)

              this.$emit('submit', { sideProductId, formData })
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