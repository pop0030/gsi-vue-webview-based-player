<template>
  	<div id="app">
		<router-view class="mainView"></router-view>
  		<topHead></topHead>
		<bottomNav></bottomNav>
		<transition name="mask">
			<div v-show="mask" class="mask" @click="clickMask('off')"></div>
		</transition>
		<sideMenu></sideMenu>
		<loading v-if="isLoading"></loading>
		<Tutorial v-if="init"></Tutorial>
  	</div>
</template>

<script>
	import Head from './components/head'
	import Nav from './components/nav'
	import Tutorial from './components/Tutorial'
	import Menu from './components/Menu'
	import loading from './components/loading'
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	export default {
  		name: 'app',
  		components:{
  			topHead: Head,
  			bottomNav: Nav,
  			Tutorial: Tutorial,
  			sideMenu: Menu,
  			loading: loading
  		},
  		computed: {
  			...mapGetters([ 'init', 'sideMenu', 'isLoading', 'mask' ])
  		},
  		methods: {
  			...mapMutations({
  				clickMask: 'sideMenu'
  			}),
  			...mapActions(['loaded','loading']),
  			fetchData: async function(){
  				function fetch(){
  					return new Promise((res,rej)=>{
	  					setTimeout(()=>{res()},600)
	  				})
  				}
  				let f = await fetch()
  				this.loaded()
  			}
  		},
  		created: function(){
  			this.fetchData()
  		},
  		watch:{
  			'$route':'fetchData'
  		}
	}
</script>

<style>
body{
	margin: 0;
	min-height: 100%;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
	background-color: #2b2b2b;
	max-width: 414px;
	margin: 0 auto;
}
.mainView{
	padding-top: 3rem;
	padding-bottom: 4rem;
	width: 100%;
	min-height: 100vh;
	box-sizing: border-box;
}
.svg-icon{
	width: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 0;
	width: 100%;
}
.svg-icon>img{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
.mask{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.5);
	position: fixed;
	left: 0;
	top: 0;
	opacity: 100;
	z-index: 3;
}
.mask-enter,.mask-leave-active{
	opacity: 0
}
.mask-enter-active,.mask-leave-active{
	transition: opacity 300ms ease;
}
</style>
