<template>
    <container>
        <div class="img-text">
            <!--로고 이미지-->
            <header>
                <h1 style="text-align: center;"><img src="@/assets/logo/3sss-ko.jpg" width="500"></h1>
            </header>
            <!--글 내용-->
            <body>
                <h2 style="text-align: center;"> 당신의 건강한 하루를 시작하세요.</h2>
                <h3 style="text-align: center;"> 찾아오시는 길</h3>
            </body>
        </div>
        <!-- 중앙정렬 div태그 안에 만들어서 넣어줄 것 -->
        <div style= "display: flex; justify-content: center; align-items: center;">
            <!-- 지도의 크기 -->
            <div id="map" style ="width:800px; height:400px;"></div>
        </div>
        <div style= "display: flex; justify-content: center; align-items: center;">
            <div>
                <hr>
                <table class="table">
                <table class="table table-striped table-bordered table-hover">
                <t-body>
                    <tr>
                        <td>주소</td>
                        <td>
                            서울특별시 강남구 테헤란로 14길 6 남도빌딩 2F, 3F, 4F, 5F, 6F (T: 1544-9970 / F: 02-562-2378)
                        </td>
                    </tr>
                    <tr>
                        <td>버스</td>
                        <td>
                             역삼역.포스코P&S타워 정류장
                            지선 146 / 740 / 341 / 360         간선 1100 / 1700 / 2000 / 7007 / 8001
                        </td>
                    </tr>
                    <tr>
                        <td>지하철</td>
                        <td>
                            지하철 2호선 역삼역 3번출구 100m
                        </td>
                    </tr>
                </t-body>
                </table>
            </table>
            </div>
        </div>
    </container>
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
  
  
<style>
.img-text {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.map {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>