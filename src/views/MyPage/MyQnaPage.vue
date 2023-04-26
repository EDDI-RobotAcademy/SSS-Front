<template>
  <v-container>
    <my-page/>
    <my-qna-form :boards="boardList" :current-page="currentPage"/>
  </v-container>
</template>

<script>
import MyQnaForm from "@/components/MyPage/MyQnaForm.vue";
import MyPage from "@/views/MyPage/MyPage.vue";
import QnaBoardList from '@/components/Qnaboard/QnaBoardList.vue'
import { mapActions, mapState } from 'vuex'

const qnaModule = 'qnaModule'

export default {
  name: "MyInfoQnaPage",
  components: { MyQnaForm, MyPage },
  data () { 
    return {
      searchQuery: '',
      boardList: [],
      searchBy: 'title',
      currentPage: 1,
    }
  },
  computed: {
    ...mapState(qnaModule, ['boards']),
  },
  mounted () {
    this.requestBoardListToSpring()
  },
  methods: {
    ...mapActions(qnaModule, [
      'requestBoardListToSpring'
    ]),
  },
}

</script>

<style scoped>
</style>