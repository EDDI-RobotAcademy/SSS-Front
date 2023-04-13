<template>
  <v-container style="width: 1400px; height: 300px; margin-right: 100px;">
    <v-card style="height: 150px; margin-top: 80px;" elevation="0" tile fla>
      <v-row>
      <v-col v-for="(item, index) in myPageCategoryItems"
             :key="index">
          <v-hover
              v-slot="{ hover } "
          >
              <v-card class="cardStyle"
                      :elevation="hover ? 20 : 0"
                      :class="{'on-hover' : hover}"
                      tile
                      flat
              >
                <v-card-title class="justify-center">
                  <h5>{{ item.name }}</h5>
                </v-card-title>

                <v-card-title class="justify-sm-end" style="margin-right: 10px">
                    <h5 style="font-size: 33px; color: #FAEBD7">{{item.count}}</h5>
                  <span style="margin-top: 7px">
                  개
                </span>
                </v-card-title>
              </v-card>
          </v-hover>
      </v-col>
    </v-row>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: "MyPageTopNav",
  data() {
    return {
      //예시
      myPageCategoryItems: [
        { name: "장바구니", count: 0 },
        { name: "찜", count: 33 },  
        { name: "나의 후기", count: 4 },
        { name: "나의 문의", count: 12 },
      ]
    }
  }
}
</script>

<style scoped>
.cardStyle {
  height: 150px;
  width: 215px;
  padding: 10px 10px;
  background-color: #80a84f;
  color: white;
  border-right: 1px solid white;
  border-left: 1px solid white;
}
</style>