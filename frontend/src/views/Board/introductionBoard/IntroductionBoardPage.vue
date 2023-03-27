<template>
    <container>
        <div class="img-text">
            <!--로고 이미지-->
            <header>
                <h1 style="text-align: center;"><img src="@/assets/logo/3sss-ko.jpg" width="500"></h1>
            </header>
            <!--글 내용-->
            <body>
                <div>
                <h3 style="text-align: center; margin-block:30px;"> 당신의 건강한 하루를 지금 바로 시작하세요.</h3>

                <h1 class="mainImage" style="text-align: center;">
                    <video class="rounded-3" autoplay="autoplay" loop="loop" muted="muted" style="height: 800px;">
                    <source src="@/assets/Introduction/SSS3.mp4" type="video/mp4">
                    </video>
                </h1>
            </div>
            </body>
        </div>

        <!--회사 소개의 글-->
        <div style="text-align: center; margin-block:30px;">
            <h1>Self Salad Sell</h1>
            <p>저희는 신선하고 좋은 상품만 취급합니다.<br>
            SSS는 시중에서 쉽게 접할 수 없는 멀티리프 계열의 유럽형 채소를 직접 재배함으로써 메뉴의 맛과 식감을 극대화하고 있습니다.<br>
            특히 최근 도입한 수경재배방식(NFT)은 공급의 안정성은 물론 원물의 신선도를 한층 높이는데 기여하고 있습니다.</p>
        </div>

        <div style="text-align: center; margin-block:30px;">
            <span><img class="border-bottom rounded-3" src="@/assets/popup/SSS.jpeg" style="max-width: 300px; max-height: 300px; margin: 10px;"></span>
            <span><img class="border-bottom rounded-3" src="@/assets/popup/SSS.jpeg" style="max-width: 300px; max-height: 300px; margin: 10px;"></span>
            <span><img class="border-bottom rounded-3" src="@/assets/popup/SSS.jpeg" style="max-width: 300px; max-height: 300px; margin: 10px;"></span>    
        </div>

        <div style="background-color: #f6f6f6; padding: 10px;">   
            <h3 style="text-align: center; margin-block:30px;"> 찾아오시는 길</h3>
        <!-- 중앙정렬 div태그 안에 만들어서 넣어줄 것 -->
        <div style= "display: flex; justify-content: center; align-items: center;">
            <!-- 지도의 크기 -->
            <div class="rounded-3" id="map" style ="width:800px; height:400px;"></div>
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


.mainImage {
    filter: blur(1px);
}

#content .conTit:after {
    display: block;
    content: '';
    width: 30px;
    height: 3px;
    background: #333;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -15px;
}
</style>