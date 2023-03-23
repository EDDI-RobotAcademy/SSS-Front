<template>
	<div>
	<div id="mainTopCarousel" class="carousel slide" data-bs-ride="carousel">
		<div class="carousel-inner">
			<div class="carousel-item active">
				<div class="main-top-promotion">
					<video class="main-top-promotion-video" autoplay="autoplay" loop="loop" muted="muted">
            <source src="@/assets/carousel/SSS.mp4" type="video/mp4">
					</video>
					<div class="container">
						<div class="row align-items-center">
							<div class="col-sm-12 col-md-6 text-md-start"/>
							<div class="col-sm-12 col-md-6 text-md-start">
								<div class="py-5" style="text-align: right;">
									<h1 class="text-white fw-bold">
										Welcome to <br>Self Salade Sell
									</h1>
									<p class="text-white mb-4 fs-5">
										당신의 샐러드로 건강한 하루를 시작하세요.
									</p>
                  <router-link :to="{name:'home'}" class="btn btn-success text-white">Choose my salad</router-link>
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
					<div class="container">
						<div class="row align-items-center">
							<div class="col-sm-12 col-md-6 text-md-start"/>
							<div class="col-sm-12 col-md-6 text-md-start">
								<div class="py-5" style="text-align: right;">
									<h1 class="text-white fw-bold">
										Welcome to <br>Self Salade Sell
									</h1>
									<p class="text-white mb-4 fs-5">
										당신의 샐러드로 건강한 하루를 시작하세요.
									</p>
                  <router-link :to="{name:'home'}" class="btn btn-success text-white">Choose my salad</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="carousel-indicators">
			<button type="button" data-bs-target="#mainTopCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
			<button type="button" data-bs-target="#mainTopCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
		</div>
		<button class="carousel-control-prev" type="button" data-bs-target="#mainTopCarousel" data-bs-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next" type="button" data-bs-target="#mainTopCarousel" data-bs-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
		</div>
		</div>
</template>


<script>
export default {
	name: 'CarouselForm',
};
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

.main-top-promotion>.container {
	position: relative;
	
}

.carousel-control-next,
.carousel-control-prev {
	width: 7% !important;
}
</style>