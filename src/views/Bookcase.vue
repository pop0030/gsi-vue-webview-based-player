<template>
	<div id="bookcase">
		<div class="bkc-nav" :data-name="bkcName">
			<router-link to="/bookcase">購買記錄</router-link>
			<router-link to="/bookcase/watch">觀看記錄</router-link>
		</div>
		<router-view class="bkc-view"></router-view>
	</div>
</template>

<script>
export default {
	name: 'bookcase',
	data () { 
		return {
			isMove: false,
			page: {},
			Left: 0,
			styleObj: {
  				left:'0px'
  			}
		}
	},
	computed: {
		bkcName: function () {
			return this.$route.name
		}
	},
	methods: {
		touch: function(){
			let e = event
			let type = e.type
			let p = this.page
			switch(type){
				case 'touchstart':
					p.x = e.touches[0].clientX
					p.y = e.touches[0].clientY
				break
				case 'touchmove':
					this.isMove = true
					let move = {
						x : e.changedTouches[0].clientX,
						y : e.changedTouches[0].clientY
					}
					let mx = move.x - p.x
					let my = move.y - p.y
					let dirX = mx>0?'往右':'往左'
					let dirY = my>0?'往下':'往上'
				break
				case 'touchend':
					this.isMove = false
					let end = {
						x : e.changedTouches[0].clientX,
						y : e.changedTouches[0].clientY
					}
					let fnx = end.x - p.x
					let fnDirX = fnx<0?true:false
					let fny = end.y - p.y
					fnx = Math.abs(fnx)
					if(fnx>100){
						if(fnDirX){this.moveNext()}else{this.moveBack()}
					}
				break
			}
		},
		moveNext: function(){
			this.$router.push('/bookcase/watch')
		},
		moveBack: function(){
			this.$router.push('/bookcase')
		}
	}
}
</script>

<style scoped>
	#bookcase{
		background-color: #E5E5E5;
	}
	.bkc-nav{
		background-color: #FFF;
		top: 3rem;
		left: 0;
		width: 100%;
		line-height: 3;
		text-align: left;
	}
	.bkc-nav:after{
		content: '';		
		width: 4rem;
		height: 4px;
		background-color: #39B44A;
		position: absolute;
		left: 1rem;
		bottom: 0;
		transition: left 300ms ease;
	}
	.bkc-nav[data-name='purchase']:after{
		left: 1rem;
	}
	.bkc-nav[data-name='watch']:after{
		left: 6.3rem;
	}
	.bkc-nav>a{
		text-decoration: none;
		color: #000;
		font-size: 1rem;
		margin-left: 1rem;
	}
	.bkc-view{
		width: 100%;
		min-height: 100%;
		position: relative;
		top: 3rem;
		left: 0;
		box-sizing: border-box;
		padding-bottom: 5rem;
	}
	
</style>