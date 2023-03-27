<template>
    <v-container>
        <div>
            <form @submit.prevent="onSubmit">
                <div class="div">
                    <table>
                        <tr>
                            <td>게시물 번호</td>
                            <td>
                                <input type="text" :value="sideproduct.productId" disabled />
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
                                <input type="text" v-model="price"/>
                            </td>
                        </tr>
                        <tr>
                            <td>본문</td>
                            <td>
                                <textarea cols="50" rows="20" v-model="content" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <v-btn type="submit" color="blue">수정 완료</v-btn>
                    <router-link :to="{
                        name: 'SideProductReadPage',
                        params: { productId: sideproduct.productId.toString() }
                    }">
                        <v-btn color="red">취소</v-btn>
                    </router-link>
                </div>
            </form>
        </div>
    </v-container>
</template>

<script>
export default {
  name:"SideProductModifyForm",
  data(){
    return{
      title:"",
      content:"",
      price:0
    }
  },
  props:{
    sideproduct:{
      type: Object,
      required: true,
    }
  },
  created() {
    this.title = this.sideproduct.title
    this.content = this.sideproduct.content
    this.price = this.sideproduct.price
  },
  methods:{
    onSubmit(){
      const {title, content, price} = this
      this.$emit('submit', {title, content, price})
    }
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