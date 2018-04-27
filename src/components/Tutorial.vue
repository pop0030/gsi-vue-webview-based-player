<template>
  	<div id="tutorial">
  		<div class="steps" :class="stepMove" :data-step="stepCount" :style="styleObj" @touchstart="touch" @touchmove="touch" @touchend="touch">
			<div class="step" :style="stepBg(t.img)" v-for="(t, i) in tutorials">
				<div class="text">{{t.text}}</div>
			</div>
		</div>
		<div id="step-nav">
			<span :class="isActive(i)" v-for="(t, i) in tutorials"></span>
		</div>
		<div class="start-btn" v-text="stepbtn" @click="startUse"></div>
  	</div>
</template>

<script>
	export default {
  		name: 'tutorial',
  		data() { return {
  			stepCount: 0,
  			isMove: false,
  			Left: 0,
  			page: {},
  			styleObj: {
  				left:'0px'
  			},
  			tutorials: [
  				{ text: '掃描刮刮卡上的二維條碼', 	img:'./static/tutorial-01.png', btn:'跳過' },
  				{ text: '開通帳號並註冊綁定',    	img:'./static/tutorial-02.png', btn:'跳過' },
  				{ text: '掃描DIY影片二維條碼', 	  img:'./static/tutorial-03.png', btn:'跳過' },
  				{ text: '觀看DIY影片',          	img:'./static/tutorial-04.png', btn:'完成' }
  			]
  		}},
  		computed: {
  			stepMove: function() {
  				return { stepMove : this.isMove }
  			},
  			stepbtn: function() {
  				return this.tutorials[this.stepCount].btn
  			}
  		},
  		methods: {
  			stepNext: function(val){
  				if(val<3){
  					val++
  					this.stepCount = val
  				} else {
  					this.startUse()
  				}
  			},
  			stepBack: function(val){
  				if(val>0){
  					val--
  					this.stepCount = val
  				}
  			},
  			stepBg: function(img){
  				return { 'background-image' : 'url('+img+')' }
  			},
  			touch: function(){
  				let e = event
  				let type = e.type
  				let p = this.page
  				let count = this.stepCount
  				switch(type){
  					case 'touchstart':
  						p.x = e.touches[0].clientX
  						p.y = e.touches[0].clientY
  						this.Left = document.getElementsByClassName('steps')[0].offsetLeft
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
  						let leftVal = this.Left + mx
  						this.styleObj.left = leftVal + 'px'
  						//console.log('Move ['+ dirX +mx + ',' + dirY + my + ']')
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
  						let width = document.getElementById('tutorial').offsetWidth / 2
  						if(fnx>100){
  							if(fnDirX){this.stepNext(count)}else{this.stepBack(count)}
  						}
  						this.styleObj.left = ''
  					break
  				}
  			},
  			startUse: function(){
  				this.$store.commit('startUse')
          this.$router.push('explore')
  			},
  			isActive: function(val){
  				let isAct = false
  				if(this.stepCount == val){
  					isAct = true
  				}
  				return { act : isAct }
  			}
  		}
	}
</script>

<style scope>
	#tutorial{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #FFF;
		top: 0;
		left: 0;
		overflow:hidden;
    z-index: 99;
	}
	.steps{
		height: 100%;
		white-space: nowrap;
		position: relative;
		transition: left 300ms;
		font-size: 0;
	}
	.stepMove{
		transition: left 0ms;
	}
	.steps[data-step='0']{
		left: 0;
	}
	.steps[data-step='1']{
		left: -100%;
	}
	.steps[data-step='2']{
		left: -200%;
	}
	.steps[data-step='3']{
		left: -300%;
	}
	.step{
		width: 100%;
		height: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 1rem;
		background-size: contain;
		background-position: center bottom;
		background-repeat: no-repeat;
	}
	.text{
		position: absolute;
		top:6rem;
		font-weight: bold;
		font-size: 1.2rem;
	}
	#step-nav{
		position: absolute;
		width: 100%;
		top:3rem;
		display: flex;
		justify-content: center;
		font-size: 0;
	}
	#step-nav span{
		width:0.5rem;
		height:0.5rem;
		border-radius: 100%;
		background-color: #FFF;
		border:1px solid #000;
		display: inline-block;
		margin: 0 0.4rem
	}
	#step-nav span.act{
		background-color: #000;
	}
	.start-btn{
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		font-size: 1rem;
		color:#999;
	}
</style>
