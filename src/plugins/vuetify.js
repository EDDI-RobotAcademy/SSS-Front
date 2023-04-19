import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#40513B', // 원하는 주 색상
            secondary: '#40513B', // 원하는 밑줄 색상
            accent: '#40513B', // 원하는 호버 색상
          },
        },
      },
    });
