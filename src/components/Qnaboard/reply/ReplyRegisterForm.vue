<template>
  <v-container style="margin-top: 30px">
    <form @submit="onSubmit()">
      <p class="reply-title">댓글 등록</p>
      <v-card class="reply-card">
        <v-card-text>
          <v-row>
            <v-col cols="9">

              <p class="reply-writer">
                {{this.$store.state.memberModule.memberInfoAboutSignIn.userNickName}}
              </p>
            </v-col>
                <v-col cols="3" align="right">

                  <v-btn class="reply-button"
                        btn-name="등록하기"
                        type="submit">
                      등록하기
                    </v-btn>
                </v-col>
              </v-row>
                  <v-textarea
                  placeholder="댓글을 입력해주세요."
                      class="custom-text"
                      v-model="replyContent"
                      rows="3">
                    </v-textarea>
   
                
        
      </v-card-text>
      </v-card>
    </form>
  </v-container>
  </template>
  
  <script> 
  
  export default {
    name: "ReplyRegisterForm",
    props: {
      board: {
        type: Array
      },
    },
    data () {
      return {
        replyContent: '',
      }
    },
    methods: { 
      onSubmit() {
        const { replyContent, boardId, replyId } = this
        const replyWriter = this.$store.state.memberModule.memberInfoAboutSignIn.userNickName;
        this.$emit('submit', {replyContent, replyWriter, replyId, boardId})
      }
    },
    
  }
  </script>
  
  <style scoped>  
.reply-card {
  margin: 0 auto;
  border-radius: 10px;
  padding: 10px;
  width: 1000px;
  height: 200px;
}

.reply-title {
  font-size: 22px;
  font-weight: bold;

}

.reply-writer {
  font-weight: bold;
}

.reply-content {
  border-radius: 5px;
  margin: auto
}
.custom-text{
  margin: 0
}
.reply-button {
  background-color: #1EC800;
}

</style>