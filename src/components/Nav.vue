<template>
  	<div id="nav">
		<router-link :to="'/'+ page.iconName" v-for="(page, i) in pages" :key="page.iconName">
			<div class="svg-icon">
				<img :src="icon(page.iconName)" alt="">
			</div>
			<span>{{ page.title }}</span>
		</router-link>
  	</div>
</template>

<script>
	export default {
  		name: 'nav',
  		data () {
  			return {
  				pages : [
					{ title : '探索', iconName: 'explore' 	,routeName: ['explore','index'] },
					{ title : '精選', iconName: 'feature' 	,routeName: ['feature'] },
					{ title : '掃描', iconName: 'camera' 	,routeName: ['camera']} ,
					{ title : '書櫃', iconName: 'bookcase'	,routeName: ['bookcase', 'purchase', 'watch'] },
					{ title : '我的', iconName: 'member' 	,routeName: ['member', 'login', 'submit'] }
				]
  			}
  		},
  		methods: {
  			icon: function ( val ) {
  				let name = this.$route.name
          		let Activeobj = this.pages.find((e)=>{return e.routeName.includes(name)})
          		let isActive = Activeobj.iconName == val ? '-active' : ''
          		let url = require('../assets/icon-' + val + isActive + '.svg')
          		return url
  			}
  		}
	}
</script>

<style scope>
#nav{
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	box-sizing: border-box;
	background-color: #333;
	height: 3.5rem;
	display: flex;
	flex-wrap: nowrap;
	z-index: 2;
}
#nav:before{
	content: '';
	width: 4rem;
	height: 4rem;
	border-radius: 100%;
	background-color: #333;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform:translateX(-50%);
}
#nav>a{
	flex-basis: 100%;
	text-decoration: none;
	justify-content: center;
	align-items: center;
	display: flex;
	color:#FFF;
	flex-direction: column;
	padding: 6px 3px;
	position: relative;
}
#nav>a>span{
	font-size: 0.5rem;
	line-height: 1;
	margin-top: 5px;
	flex: 1;
}
#nav>a>.svg-icon{
	flex: 2;
}
</style>
