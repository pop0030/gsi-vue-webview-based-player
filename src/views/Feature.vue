<template>
	<div id="feature">
		<ul class="fea-items">
			<li class="fea-item" v-for="(item, i) in items" @click="link(item.url)">
				<img :src="item.img" :alt="item.name">
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'feature',
	data() {
		return {
			items: [
				{ name: '', img: './static/feature-img-01.jpg', url: 'https://artmaster.com.tw', state: '', type: ''},
				{ name: '', img: './static/feature-img-02.jpg', url: 'fb://page/1723515127969265', state: '', type: ''},
				{ name: '', img: './static/feature-img-03.jpg', url: 'http://210.61.46.3/seedart', state: '', type: ''}
			]
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
#feature{
	background-color: #1A1A1A;
}
ul.fea-items{
	margin:0;
	padding: 0;
	list-style-type: none;
	width: 100%;
}
.fea-item{
	width: 100%;
	position: relative;
	height: 0;
	padding-top: 53.33%;
	border-bottom: 1px solid #FFF;
}
.fea-item>img{
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
}
</style>
