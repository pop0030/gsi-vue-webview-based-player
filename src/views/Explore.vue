<template>
	<div id="explore">
		<div class="exp-top">
			<div class="bg-layer"><img :src="top.img" alt=""></div>
			<div class="text-layer">
				<img src="../assets/icon-play.svg" alt="">
				<div class="context">
					<span>觀看</span>
					<p>{{top.title}}</p>	
				</div>
			</div>
		</div>
		<div class="exp-items">
			<ul>
				<li v-for="(item, i) in items">
					<div class="exp-item" @click="link(item.url)">
						<div class="bg-layer"><img :src="item.img" alt=""></div>
						<div class="icon-layer">
							<img :src="item.icon" alt="">
							<p>{{item.name}}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'explore',
	data() {
		return {
			items: [
				{ name:'種子盆栽',	icon:require('../assets/exp-icons-01.svg'), img:'./static/exp-bgs-01.jpg', url:'http://210.61.46.3/seedart' },
				{ name:'書法', 		icon:require('../assets/exp-icons-02.svg'), img:'./static/exp-bgs-02.jpg', url:'http://210.61.46.3/shufa' },
				{ name:'繪畫', 		icon:require('../assets/exp-icons-03.svg'), img:'./static/exp-bgs-03.jpg', url:'http://210.61.46.3/hudie' },
				{ name:'更多', 		icon:require('../assets/exp-icons-04.svg'), img:'./static/exp-bgs-04.jpg', url:'http://210.61.46.3/crc' }
			],
			top: { title: '你可能會喜歡的影片', img:'./static/movieclip.jpg', url: '/' }
		}
	},
	methods: {
		link: function( url ) {
			window.open(url)
		}
	}
}
</script>

<style scoped>
#explore{
	background-color: #1A1A1A;
}
.exp-top{
	width: 100%;
	height: 0;
	overflow: hidden;
	padding-top: 56%;
	overflow: hidden;
	position: relative;
}
.bg-layer{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
}
.bg-layer>img{
	height:100%;
	min-width: 100%;
}
.bg-layer:after{
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	top:0;
	left: 0;
	background-image: linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%)
}
.text-layer{
	position: absolute;
	bottom: 0;
	left: 0;
	display: flex;
	align-items:center;
	padding: 1rem;
}
.text-layer>img{
	height: 3rem;
	margin-right: 0.5rem;
}
.text-layer>.context{
	text-align: left;
	color: #FFF;
	line-height: 0.5;
}
.text-layer>.context>span{
	font-size: 0.8rem;
	margin-bottom: 1rem;
	display: block;
}
.text-layer>.context>p{
	font-size: 1.2rem;
	margin: 0;
}
.exp-items{
	width: 100%;
}
.exp-items:after{
	content: '';
	clear: both;
	display: block;
}
.exp-items>ul{
	margin:0;
	padding: 0;
	list-style-type: none;
}
.exp-items>ul>li{
	float: left;
	width: 50%;
	padding: 0.5rem;
	box-sizing: border-box;
}
.exp-item{
	position: relative;
	width: 100%;
	height: 0;
	padding-top: 100%;
	overflow: hidden;
}
.exp-item .bg-layer:after{
	background-color: rgba(0,0,0,0.5);
}
.icon-layer{
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: hidden;
	top: 0;
	left: 0;
	color:#FFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.icon-layer>img{
	width: 50%;
}
.icon-layer>p{
	margin: 0;
}
</style>
