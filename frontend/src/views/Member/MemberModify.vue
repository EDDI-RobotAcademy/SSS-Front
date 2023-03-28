<template>
  <div>
    <member-modify-form @submit="onSubmit"></member-modify-form>
  </div>
</template>

<script>
import axios from "axios";
import MemberModifyForm from '../../components/Member/MemberModifyForm.vue'
export default {

  name: "MemberModify",
  components: {
    MemberModifyForm
 
  },
  methods: {
      onSubmit (payload) {
        const { nickname, password, phoneNumber,  } = payload;
  
        axios.post("http://localhost:7777/member/member-modify", {
          password, nickname, phoneNumber, address
        })
            .then((res) => {
              alert("변경 완료!")
              this.$router.push("/member/member-modify")
            })
            .catch((res) => {
              alert(res.response.data.message)
            })
            
      }
    }
}
</script>

<style>

</style>