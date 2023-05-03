<template>
  <v-container>
    <form @submit.prevent="onSubmit">
      <v-row style="min-width: 500px;">
        <v-col cols="6" class="d-flex flex-column justify-content-center" style="min-width: 500px;">
          <div class="d-flex justify-content-center">
            <v-col cols="6">
              <div class="d-flex justify-content-center">
                <img style="width: 500px;" :src="imgUrl" :alt="Image" />
              </div>
            </v-col>
          </div>
          <div class="d-flex justify-content-center">
            <v-col cols="12">
              <div class="d-flex justify-content-center">
                <div class="input-group mb-3" style="width: 70%;">
                  <input type="file" class="form-control" id="files" ref="files" @change="handleFileUpload($event)" />
                </div>
              </div>
            </v-col>
          </div>
        </v-col>
        <v-col cols="6" class="justify-end">
          <h2>제품 정보</h2>
          <div class="ingredientInfo">
          <div class="input-group mb-3" style="width: 550px; margin: 10px;">
            <span style="width: 150px;" class="input-group-text" id="inputGroup-sizing-default">상품명</span>
            <input type="text" class="form-control" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default" v-model="title" id="inputGroup-sizing-lg">
          </div>
          <div class="input-group mb-3" style="width: 550px; margin: 10px;">
            <span style="width: 150px;" class="input-group-text" id="inputGroup-sizing-default">가격</span>
            <input type="text" class="form-control" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default" v-model="price" id="inputGroup-sizing-lg">
          </div>

          <div class="input-group mb-3" style="width: 550px; height: 300px; margin: 10px;">
            <span style="width: 150px;" class="input-group-text" id="inputGroup-sizing-default">상세정보</span>
            <input type="text" class="form-control" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default" v-model="content" id="inputGroup-sizing-lg">
          </div>
        </div>
        </v-col>
      </v-row>
      <div class="d-flex justify-content-center" style="margin-top: 50px">
        <v-btn style="background-color: rgb(54, 109, 50); color:white; width: 150px;" type="submit">등록</v-btn>
        <router-link :to="{ name: 'SideProductListPage' }">
          <v-btn style="background-color: red; color:white; width: 150px;">취소</v-btn>
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
.input-group-text {
  background-color: #739E42;
  color: white;
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100px;
  font-weight: bold;
  font-size: 19px;
}

.ingredientInfo {
  margin-top: 20px;
  margin-left: -8px;
  min-width: 800px;
  align-items: center;
}

.foodInfoGroup {
  display: flex;
  margin-top: -20px;
  align-items: center;
}
h2 {
    margin-top: 50px;
    margin-bottom: 30px;
    font-weight: bold;
}
</style>
