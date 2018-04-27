<template>
	<div id="purchase" @touchstart="touch" @touchmove="touch" @touchend="touch">
		<ul>
			<li v-for="(item, i) in items" class="item">
				<div>
					<div class="cover"><img :src="item.img" :alt="item.name"></div>
					<p class="title">{{item.name}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'purchase',
	data () {
		return {
			items: [
				{ name:'林惠蘭種子藝術盆栽', 
					img:'./static/bkc-pur-01.jpg', date:'', url:'/' 
				},
				{ name:'Linda Lin Art of Seeds Bonzai', 
					img:'./static/bkc-pur-02.jpg', date:'', url:'/' 
				},
				{ name:'Linda Linシード鉢植えアーツ', 
					img:'./static/bkc-pur-03.jpg', date:'', url:'/' 
				},
				{ name:'Linda Lin L’Art De Grains Bonzai', 
					img:'./static/bkc-pur-04.jpg', date:'', url:'/' 
				},
				{ name:'林惠兰种子盆栽艺术', 
					img:'./static/bkc-pur-05.jpg', date:'', url:'/' 
				}
			]
		}
	},
	methods: {
		touch: function() {
			this.$parent.touch(event)
		}
	}
}
</script>

<style scoped>
#purchase ul{
	margin: 0;
	padding: 0;
	list-style-type: none;
	display: flex;
	flex-wrap: wrap;
	padding: 0.5rem;
	box-sizing: border-box;
}
.item{
	width: 33.333%;
	padding: 0.3rem;
	box-sizing: border-box;
}
.cover>img{
	width: 100%;
}
.title{
	font-size: 0.8rem;
	line-height: 1.4;
	margin: 0.2rem 0;
	white-space: nowrap;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
}


</style>