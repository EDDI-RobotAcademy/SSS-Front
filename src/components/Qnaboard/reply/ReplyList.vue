<template>
  <v-container>
    <table class="reply"
           style="background-color: #eeeeee; border-radius: 10px"
           v-if="!replys || (Array.isArray(replys) && replys.length === 0)">
      <div style="padding: 10px">
        <p>현재 등록된 댓글이 없습니다!</p>
      </div>
    </table>
    <table class="reply"
           style="background-color: #eeeeee; border-radius: 10px"
           v-else
           v-for="reply in replys" :key="reply.replyContent"
    >
      <tbody>
      <!--      댓글 리스트-->
      <tr>
        <div class="reply">
          <v-row>
            <pre style="font-family: naver2; height: fit-content">{{ replyWriter }}
            </pre>
          </v-row>
          <v-row>
            <pre style="font-family: naver2; height: fit-content">{{ replyContent }}
            </pre>
          </v-row>
          <v-row>
            <p class="mt-2">{{ replyContent.regDate }}</p>
          </v-row>
        </div>
      </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  name: "ReplyList",
  data() {
    return {
      replyContent: this.replyContent
    }
  },
  props: {
  },
  computed: {
    ...mapState(['reply']),
    ...mapState(['replys'])
  },
}
</script>

<style scoped>

table.boards {
  text-align: left;
  line-height: 1.5;
  /*border: 1px solid;*/
  width: 600px;
  table-layout: fixed;
}

table.boards thead {
  background: darkseagreen;
  font-weight: bold;
}

.boards .comment {
  padding-left: 20px;
  padding-top: 15px;
  margin: 10px;

}

.boards .comment .comment-btn {
  padding-left: 15px;
  color: white;
  margin-left: 370px;
}
</style>