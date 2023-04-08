<template>
  <div>
    <member-modify-form @submit="onSubmit"></member-modify-form>
  </div>
</template>

<script>
import axiosInst from '@/utility/axiosObject'
import MemberModifyForm from '../../components/Member/MemberModifyForm.vue'

export default {

  name: "MemberModify",
  components: {
    MemberModifyForm
 
  },
  methods: {
      onSubmit (payload) {
        const { nickname, password, phoneNumber,  } = payload;
  
        axiosInst.post('/member/member-modify', {
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