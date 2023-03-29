<template>
    <div class="profile-section">
        <!--마이페이지 css설정을 위한 div name 지정 my-page-box-->
        <p>{{ memberInfoAboutSignIn.userNickName }}님 환영합니다</p>
    <div class="my-page-box">
        <!--아이디와 이메일주소 누구누구님환영합니다 비슷한거!-->
        <div>
            <p class="name head-text"></p>
            <p class="email"></p>
        </div>
        <!--기본목록-->
        
    </div>
</div>
</template>


<script>
import { mapState } from 'vuex'

export default {
    props: {
    nickname: String
  },

  computed: {
    ...mapState(['memberInfoAboutSignIn']) 
    
  }

}
</script>

<style>

</style>