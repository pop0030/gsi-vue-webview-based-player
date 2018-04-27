<template>
	<div id="watch" @touchstart="touch" @touchmove="touch" @touchend="touch">
		<ul>
			<li v-for="(item, i) in items" class="item">
				<div>
					<div class="cover"><img :src="item.img" alt=""><span>{{item.time}}</span></div>
					<div class="title">
						<p>{{item.name}}</p>
						<span>{{item.parent}}</span>
						<div class="more">
							<div class="moreBtn" @click="moreOptionMenu(i)"></div>
							<div class="moreMask" v-show="item.isOpen" @click.self="clickBody"></div>
							<ul :class="{ active:item.isOpen }">
								<li>繼續觀看</li>
								<li>影片介紹</li>
								<li>回報</li>
							</ul>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'watch',
	data () {
		return {
			items: [
				{ name:'花生DIY', parent:'林惠蘭種子藝術盆栽', img:'./static/movieClip-01.jpg',isOpen: false, url:'/', time:'08:32'},
				{ name:'春不老DIY', parent:'林惠蘭種子藝術盆栽', img:'./static/movieClip-02.jpg',isOpen: false, url:'/', time:'10:20' },
				{ name:'搶救高麗菜', parent:'林惠蘭種子藝術盆栽', img:'./static/movieClip-03.jpg',isOpen: false, url:'/', time:'03:24' },
			]
		}
	},
	methods: {
		touch: function() {
			this.$parent.touch(event)
		},
		moreOptionMenu: function(index) {
			let arr = this.items
			for (let i = 0; i < arr.length; i++) {
				arr[i].isOpen = false
			}
			arr[index].isOpen = true
		},
		clickBody: function() {
			let arr = this.items
			for (let i = 0; i < arr.length; i++) {
				arr[i].isOpen = false
			}
		}
	}
}
</script>

<style scoped>
#watch>ul{
	margin: 0;
	padding: 0;
	list-style-type: none;
	display: flex;
	flex-wrap: wrap;
	padding: 1rem;
	box-sizing: border-box;
}
.cover{
	position: relative;
}
.cover>img{
	width: 100%;
}
.cover>span{
	position: absolute;
	right: 0.5rem;
	bottom: 1rem;
	color:#FFF;
	background-color: rgba(0,0,0,0.5);
	padding: 0.2rem 0.5rem;
}
.item{
	padding: 0.5rem 0;
	border-bottom:1px solid #CCC;
	margin-bottom: 0.5rem;
}
.title{
	text-align: left;
	position: relative;
}
.title>p{
	margin:0;
	white-space: nowrap;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
}
.title>span{
	font-size: 0.8rem;
}
.more{
	position: absolute;
	right: 0;
	top: 0;
}
.moreBtn{
	content: '';
	display: block;
	background-image: url('../assets/icon-dotMenu.svg');
	background-size: cover;
	width: 1rem;
	height: 1rem;
}
.more>ul{
	position: absolute;
	right: 0;
	top: 0;
	background-color: #FFF;
	box-shadow: 0 0 5px 0px rgba(0,0,0,0.2);
	padding: 0.25rem 0;
	margin: 0;
	list-style-type: none;
	width: auto;
	height: auto;
	overflow: hidden;
	transform: scale(0);
	transform-origin: top right;
	transition: all 200ms ease;
}
.more>ul.active{
	z-index: 1;
	transform: scale(1);
	transition: all 200ms ease;
}
.more>ul>li{
	display: block;
	font-size: 1rem;
	white-space: nowrap;
	padding: 0.25rem 0.75rem;
}
.moreMask{
	position: fixed;
	width: 100%;
	height: 100%;
	top:0;
	left: 0;
	z-index: 1;
}
</style>