<template>
  <v-container>
    <form @submit.prevent="onSubmit">
      <v-row>
        <v-col cols="6">
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
            <input type="file" id="files" ref="files" @change="handleFileUpload($event)" />
          </td>
        </tr>
      </table>
    </v-col>
      <v-col cols="6">
        <v-img :src="imgUrl" :alt="'Image'"></v-img>
      </v-col>
    </v-row>
      <div>
        <v-btn type="submit" color="blue">등록</v-btn>
        <router-link :to="{ name: 'SideProductListPage' }">
          <v-btn color="red">취소</v-btn>
      </router-link>
      </div>
    </form>
  </v-container>
</template>

<script>
export default {
  name: "SideProductRegisterForm",
  data() {
    return {
      title: "제목을 입력하세요.",
      content: "내용을 입력하세요.",
      price: 0,
      imgUrl: "",
    }
  },
  methods: {
    onSubmit() {
      let formData = new FormData();
      formData.append("fileList", this.files[0]);
      const { title, content, price } = this;
      let productInfo = {
        title: title,
        content: content,
        price: price,
      };
      formData.append(
        "productInfo",
        new Blob([JSON.stringify(productInfo)], { type: "application/json" })
      );
      this.$emit("submit", formData);
    },
    handleFileUpload(event) {
      this.files = event.target.files;
      this.imgUrl = URL.createObjectURL(this.files[0]);
      console.log(this.imgUrl)
    },
  }
};
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
