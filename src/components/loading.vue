<template>
  	<div id="loading">
		<div class="spinner">
			<div class="rect1"></div>
			<div class="rect2"></div>
			<div class="rect3"></div>
			<div class="rect4"></div>
			<div class="rect5"></div>
		</div>
  	</div>
</template>

<script>
	export default {
  		name: 'loading'
	}
</script>

<style scope>
#loading{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
  z-index: 4;
}
.spinner {
  width: 100%;
  height: 8%;
  text-align: center;
  font-size: 1rem;
}

.spinner > div {
  background-color: #FFF;
  height: 100%;
  width: 0.6rem;
  display: inline-block;
  
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% { 
    transform: scaleY(0.5);
  }  20% { 
    transform: scaleY(1.2);
  }
}
</style>
