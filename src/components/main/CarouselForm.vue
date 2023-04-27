
<template>
	<div>
	<div id="mainTopCarousel" class="carousel slide" data-bs-ride="carousel">
		<div class="carousel-inner">
			<div class="carousel-item active">
				<div class="main-top-promotion">
					<video class="main-top-promotion-video" autoplay="autoplay" loop="loop" muted="muted">
            <source src="@/assets/carousel/SSS.mp4" type="video/mp4">
					</video>
					<div class="carousel-text">
						<div class="d-flex justify-end">
							<div class="col-sm-12 col-md-6 text-md-start">
								<div class="py-5" style="text-align: right; margin-right: 25px; min-width: 700px;" >
									<h1 style="font-size: 80px;" class="text-white fw-bold">
										Welcome to <br>Self Salade Sell
									</h1>
									<p  class="text-white mb-4 fs-2">
										당신의 샐러드로 건강한 하루를 시작하세요.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="carousel-item">
				<div class="main-top-promotion">
					<video class="main-top-promotion-video" autoplay="autoplay" loop="loop" muted="muted">
            <source src="@/assets/carousel/SSS2.mp4" type="video/mp4">
					</video>
					<div class="carousel-text">
						<div class="d-flex justify-end">
							<div class="col-sm-12 col-md-6 text-md-start">
								<div class="py-5" style="text-align: right; margin-right: 25px;">
									<h1 style="font-size: 80px;" class="text-white fw-bold">
										Welcome to <br>Self Salade Sell	
									</h1>
									<p class="text-white mb-4 fs-2">
										당신의 샐러드로 건강한 하루를 시작하세요.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		</div>
</template>


<script>
export default {
	name: 'CarouselForm',
}
</script>

<style>
.main-top-promotion {
	position: relative;
	width: 100%;
	height: 700px;
}

.main-top-promotion-video {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
}

.carousel-text{
	position: relative;
	
}

.carousel-control-next,
.carousel-control-prev {
	width: 7% !important;
}

</style>
