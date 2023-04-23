<template>
  <v-container>
      <div class="longline" style="margin-bottom: 45px;"/>
        <v-row justify="center">
      <div class="row">
        <header style="text-align: center;">
            <v-col>
                <img src="@/assets/logo/3sss-ko.jpg" style="max-width: 600px; min-width: 300px; width: 100%;">
                <div style="font-size: 35px; padding: 10px;"> 당신의 건강한 하루를 지금 바로 시작하세요.</div>
            </v-col>
            </header>
            <div class="longline"/>
        <!-- 좌측 회사 소개 내용 -->
        <div class="col-md-6">
          <div class="company-info">
            <div class="logo">
              <img src="@/assets/Introduction/SSSIntroduction2.jpg" style="height: inherit;: 500px;" alt="company-logo">
            </div>
            <div class="description" style="min-width: 330px;">
                
              <p>샐러드는 건강한 식습관을 추구하는 사람들을 위해 만들어졌습니다. SSS는 최상의 품질과 맛을 추구하며,
                항상 신선한 재료와 정성으로 만든 메뉴를 제공합니다. 고객의 니즈에 따라 맞춤형 샐러드를 제공하고, 
                항상 건강한 식습관을 유지할 수 있도록 노력합니다.</p>
           
            </div>
          </div>
        </div>
        <!-- 우측 이미지 -->
        <div class="col-md-6">
          <div class="image">
            <img src="@/assets/Introduction/SSSIntroduction1.jpg" alt="company-image">
          </div>
        </div>
      </div>
      <div>
        <v-row justify="center">
      <v-col cols="3" class="text-center">
        <v-icon class="icon" color="primary">mdi-food-apple</v-icon>
        <div class="icon-title">샐러드 원료</div>
        <div class="icon-text">우리는 항상 신선하고 건강한 채소와 과일을 고르며, 최상의 품질을 유지합니다. 샐러드를 먹는 첫 단계는 원료의 선택부터입니다.</div>
      </v-col>
      <v-col cols="3" class="text-center">
        <v-icon class="icon" color="primary">mdi-seed</v-icon>
        <div class="icon-title">신선한 재료</div>
        <div class="icon-text">샐러드는 신선한 재료에서 비롯됩니다. 우리는 매일 아침 신선한 채소와 과일을 공급받으며, 신선함을 유지하기 위해 노력합니다.</div>
      </v-col>
      <v-col cols="3" class="text-center">
        <v-icon class="icon" color="primary">mdi-knife</v-icon>
        <div class="icon-title">정성 가공</div>
        <div class="icon-text">우리는 손질과 가공에서도 최상의 품질을 유지합니다. 모든 채소와 과일은 신선한 상태에서 손질되며, 정성스럽게 가공됩니다.</div>
      </v-col>
      <v-col cols="3" class="text-center">
        <v-icon class="icon" color="primary">mdi-bowl-mix</v-icon>
        <div class="icon-title">고객 맞춤형</div>
        <div class="icon-text">샐러드는 고객의 니즈에 맞춤형으로 제공됩니다. 우리는 고객의 취향에 맞춰 다양한 종류의 채소와 과일, 그리고 드레싱을 제공합니다.</div>
      </v-col>
    </v-row>

  </div>
  
      <div class="col-md-12">
        <div class="directions">
          <h3 class="title">오시는 길</h3>
          <div class="line"/>
          <div class="map-container">
            <div id="map"></div>
          </div>
          <div class="address">
            <p class="title">주소</p>
            <div class="line"/>
            <p>서울특별시 강남구 테헤란로 14길 6 남도빌딩 2F, 3F, 4F, 5F, 6F</p>
          </div>
          <div class="bus">
            <p class="title">버스</p>
            <div class="line"/>
            <ul>
              <li>역삼역.포스코P&amp;S타워 정류장</li>
              <li>지선 146 / 740 / 341 / 360</li>
              <li>간선 1100 / 1700 / 2000 / 7007 / 8001</li>
            </ul>
          </div>
          <div class="subway">
            <p class="title">지하철</p>
            <div class="line"/>
            <p>지하철 2호선 역삼역 3번출구 100m</p>
          </div>
        </div>
      </div>
    </v-row>
    </v-container>
  </template>
<script>

export default {
	name: 'KakaoMap',
	data() {
		return { map: null };
	},
	setup() {},
	created() {},
	mounted() {
		if (window.kakao && window.kakao.maps) {
			this.loadMap();
		} else {
			this.loadScript();
		}
	},
	unmounted() {},
	// http://localhost:8080 현재 8080포트에서만 볼 수 있음 -> 나중에 배포시 url 등록해줘야함.
	/* https://developers.kakao.com/
	   이 사이트로 들어가서 > 내 애플리케이션 > test account > 플랫폼 > 웹 > 사이트 도메인에 등록된 주소만 api를 끌고 올 수 있음 */

	methods: {
		//api불러오기

		loadScript() {
			const script = document.createElement('script');
			script.src =
				'//dapi.kakao.com/v2/maps/sdk.js?appkey=dc032795fc538f0aedf2d06df9b50bae&autoload=false';
			script.onload = () => window.kakao.maps.load(this.loadMap);

			document.head.appendChild(script);
		},
		// 위치 http://map.esran.com/ 에서 검색가능 ( 위도 : 37.6, 경도 : 127.001 )
		
        
        //맵 생성하기
		loadMap() {
			const container = document.getElementById('map');
			const options = {
                //맵위치
				center: new window.kakao.maps.LatLng(
					37.49961541283147,
					127.03454870159703,
				),
				level: 3,
			};
			this.map = new window.kakao.maps.Map(container, options);
			this.loadMaker();
		},
        //지도에 핀 위치찍는것
		loadMaker() {
			    //핀위치
            const markerPosition = new window.kakao.maps.LatLng(
				37.49961541283147,
				127.03454870159703,
			);

			const marker = new window.kakao.maps.Marker({
				position: markerPosition,
			});
			marker.setMap(this.map);
		},
	},
};

</script>
  
  
<style scoped>
  .company-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
  .company-info .logo img {
    width: 350px;
    height: 120px;
    margin-bottom: 40px;
  }
  .company-info .description h2 {
    margin-top: 0;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }
  .company-info .description p {
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 20px;
    text-align: center;
  }
  .image img {
    width: 100%;
    height: auto;
  }

  .icon {
  font-size: 70px;
  margin: 0 10px;
  cursor: pointer;
}

@media (min-width: 600px) {
  .icon {
    font-size: 90px;
  }
}

@media (min-width: 960px) {
  .icon {
    font-size: 150px;
  }

}


  .map-container {
    position: relative;
    width: 100%;
     /* 지도의 높이를 설정할 수 있습니다 */
  }
  #map {
    width: auto;
    height: 400px;
  }
  .address, .bus, .subway {
    margin-top: 20px;
  }
  .title {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .titlemain {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  * {
    margin-bottom: 8px;
    font-size: 15px;
    color: #40513B;
    }



    .material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

.line {
    width: 33.3%;
    border-bottom: 3px solid #40513B;
    margin: 10px 0;
}
.longline{
    width: 100%;
    border-bottom: 3px solid #40513B;
    margin: 10px 0;
}

</style>