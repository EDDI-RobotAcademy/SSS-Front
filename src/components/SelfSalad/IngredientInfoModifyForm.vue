<template>
  <v-container>
    <v-row>
      <form @submit.prevent="onSubmit">
        <v-row>
          <v-col>
            <h2>재료 정보</h2>
            <div class="input-group input-group-lg" style="width: 500px; margin: 10px; margin-left:0px;">
              <span style="width: 150px; 
            display: inline-block; 
            text-align: center; 
            font-weight: bold; 
            font-size: 23px;" class="input-group-text" id="inputGroup-sizing-lg">재료명</span>
              <input type="text" class="form-control" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg" v-model="ingredientInfo.name" id="inputGroup-sizing-lg">
            </div>
            <div class="line"></div>
            <h2>재료 유형</h2>
            <div id="categoryButton">
              <v-btn class="categoryButton" :class="{ active: ingredientInfo.categoryType === 'VEGETABLE' }"
                @click.prevent="ingredientInfo.categoryType = 'VEGETABLE'">채소</v-btn>
              <v-btn class="categoryButton" :class="{ active: ingredientInfo.categoryType === 'MEAT' }"
                @click.prevent="ingredientInfo.categoryType = 'MEAT'">육류</v-btn>
              <v-btn class="categoryButton" :class="{ active: ingredientInfo.categoryType === 'TOPPING' }"
                @click.prevent="ingredientInfo.categoryType = 'TOPPING'">토핑</v-btn>
            </div>
            <div class="line" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <span class="ingredientImage">기존 제품사진</span>
            <div class="d-flex justify-content-center">
              <img style="width: 500px; height: 500px;"
                :src="require(`../../assets/selfSalad/${this.ingredientInfo.editedImg}`)" />
            </div>
          </v-col>
          <v-col cols="6">
            <span class="ingredientImage">변경 될 제품사진</span>
            <div class="d-flex justify-content-center">
              <img style="width: 500px; height: 500px" v-if="thumbnail" :src="thumbnail" :alt="'Image ' + index" />
            </div>
            <v-col>
              <div class="d-flex justify-content-center">
                <v-col cols="12">
                  <div class="d-flex justify-content-center">
                    <div class="input-group mb-3" style="width: 70%;">
                      <input type="file" class="form-control" id="files" ref="files" multiple @change="handleFileUpload"
                        aria-describedby="inputGroupFileAddon01">
                    </div>
                  </div>
                </v-col>
              </div>
            </v-col>
          </v-col>
        </v-row>
        <div class="d-flex justify-content-center" style="margin-top: 50px">
          <v-btn style="background-color: rgb(54, 109, 50); color:white; width: 150px;" type="submit">등록</v-btn>
          <router-link :to="{ name: 'IngredientListPage' }">
            <v-btn style="background-color: red; color:white; width: 150px;">취소</v-btn>
          </router-link>
        </div>
      </form>
    </v-row>
  </v-container>
</template>  
<script>

export default {
  name: "IngredientInfoModifyPage",
  data() {
    return {
      name: '기본이름',
      categoryType: '',
      files: '',
      thumbnail: null,
    }
  },
  props: {
    ingredientInfo: {
      type: Object,
      required: true,
    }
  },
  methods: {
    onSubmit() {
      let formData = new FormData()
      if (this.files.length === 1) {
        formData.append('imageFile', this.files[0])
      } else if (this.files.length === 0) {
        formData.append('imageFile', new File([], 'empty'));
      }
      console.log('imageFile: ' + JSON.stringify(formData))

      const categoryType = this.ingredientInfo.categoryType
      const name = this.ingredientInfo.name
      console.log("재료명 : " + name)
      console.log("카테고리 : " + categoryType)

      let ingredientInfo = { name, categoryType }
      formData.append(
        "ingredientInfo",
        new Blob([JSON.stringify(ingredientInfo)], { type: "application/json" })
      )
      console.log('formData: ' + JSON.stringify(formData))

      this.$emit('submit', formData)
    },

    handleFileUpload(event) {
      this.files = this.$refs.files.files;
      if (this.files && this.files.length == 1) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.thumbnail = event.target.result;
        };
        reader.readAsDataURL(this.files[0]);
      } else if (this.files.length > 1) {
        alert('이미지를 1개만 선택해주세요.')
        event.target.value = ''
        return

      }
    },
  },

}

</script>
  
<style scoped>
.thumbnail {
  width: 200px;
  height: auto;
}

.input-group-text {
  background-color: #739E42;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
}

* {
  /* color: #40513B; */
  color: #40513B;
}

#categoryButton {
  margin-left: -6px;
}

#categoryButton .categoryButton {
  background-color: #3a5719;
  border-radius: 5px;
  color: lightgray;
  text-align: center;
  font-size: 23px;
  margin: 5px;
  width: 16%;
  min-width: 200px;
  height: 50px;
  font-weight: bold;
}

#categoryButton .categoryButton.active {
  background-color: #739E42;
  color: white;
}

.ingredientImage {
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
}

h2 {
  margin-top: 50px;
  margin-bottom: 30px;
  font-weight: bold;
}

.line {
  width: 100%;
  border-bottom: 4px solid #40513B;
  margin-top: 30px;
}
</style>