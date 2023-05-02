<template>
  <v-container>
    <v-row>
      <form @submit.prevent="onSubmit">
        <v-col cols="12" class="d-flex flex-column justify-content-center">
          <h2>제품 정보</h2>
          <div class="ingredientInfo">
            <div class="input-group mb-3" style="width: 550px; margin: 10px;">
              <span style="width: 150px;" class="input-group-text" id="inputGroup-sizing-default">상품번호</span>
              <input type="text" class="form-control" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default" :value="sideProductId" id="inputGroup-sizing-lg" disabled>
            </div>
            <div class="input-group mb-3" style="width: 550px; margin: 10px;">
              <span style="width: 150px;" class="input-group-text" id="inputGroup-sizing-default">상품명</span>
              <input type="text" class="form-control" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default" v-model="sideProduct.title" id="inputGroup-sizing-lg">
            </div>
            <div class="input-group mb-3" style="width: 550px; margin: 10px;">
              <span style="width: 150px;" class="input-group-text" id="inputGroup-sizing-default">가격</span>
              <input type="text" class="form-control" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default" v-model="sideProduct.price" id="inputGroup-sizing-lg">
            </div>
            <div class="input-group mb-3" style="width: 550px; height: 300px; margin: 10px;">
              <span style="width: 150px;" class="input-group-text" id="inputGroup-sizing-default">상세정보</span>
              <input type="text" class="form-control" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default" v-model="sideProduct.content" id="inputGroup-sizing-lg">
            </div>
          </div>
        </v-col>
        <div class="line" />
        <v-row>
          <v-col cols="6">
            <span class="ingredientImage">기존 제품사진</span>
            <div class="d-flex justify-content-center" style="padding:12px;">
              <img style="width: 500px; height: 500px"
                :src="require(`@/assets/product/${sideProduct.sideProductImg.editedImg}`)" />
              <img style="width: 500px; height: 500px" v-if="fileSelected"
                :src="require(`@/assets/product/${sideProduct.sideProductImg.editedImg}`)" />
            </div>
          </v-col>
          <v-col cols="6">
            <span class="ingredientImage">변경 될 제품사진</span>
            <v-col v-for="(url, index) in imageUrls" :key="index" class="d-flex justify-content-center">
              <img style="width: 500px; height: 500px" :src="url" :alt="Image"></img>
            </v-col>
            <div class="d-flex justify-content-center">
              <div class="input-group mb-3" style="width: 70%;">
                <input type="file" class="form-control" id="files" ref="files" @change="handleFileUpload"
                  aria-describedby="inputGroupFileAddon01">
              </div>
            </div>
          </v-col>
        </v-row>
        <div class="d-flex justify-content-center" style="margin-top: 50px">
          <v-btn style="background-color: rgb(54, 109, 50); color:white; width: 150px;" type="submit">등록</v-btn>
          <router-link :to="{
              name: 'SideProductListPage',
            }">
            <v-btn style="background-color: red; color:white; width: 150px;">취소</v-btn>
          </router-link>
        </div>
      </form>
    </v-row>
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
      imageUrls: [],
      fileSelected: false,
      files: '',
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
      console.log('fileList: ' + JSON.stringify(formData))
      const title = this.sideProduct.title
      const content = this.sideProduct.content
      const price = this.sideProduct.price

      let productInfo = { title, content, price }
      console.log("데이터 확인 : " + title, content, price)
      formData.append(
        "productInfo",
        new Blob([JSON.stringify(productInfo)], { type: "application/json" })
      )
      console.log('formData: ' + JSON.stringify(formData))

      this.$emit('submit', formData)
    },
    handleFileUpload(event) {
      this.files = event.target.files
      this.imageUrls = Array.from(this.files).map((file) => URL.createObjectURL(file))
    },
  }
}
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
  margin-left: -11px;
  min-width: 500px;
  align-items: center;
}

.ingredientImage {
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 500px;
  margin-top: 40px;
  margin-bottom: 30px;
}

.line {
  width: 100%;
  border-bottom: 4px solid #40513B;
  margin-top: 30px;
}

h2 {
  margin-top: 50px;
  margin-bottom: 10px;
  font-weight: bold;
}

* {
  /* color: #40513B; */
  color: #40513B;
}</style>