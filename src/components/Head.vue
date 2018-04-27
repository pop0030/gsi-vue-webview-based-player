<template>
  	<div id="head">
  		<div id="menuBtn" @click="btnClick">
  			<div class="svg-icon">
  				<img :src="iconMenu" alt="">
  			</div>
  		</div>
		<router-link to="/"><div>{{ title }}</div></router-link>
  	</div>
</template>

<script>
    let menuBtn = require('../assets/menuBtn.svg')
    let backBtn = require('../assets/leftBtn.svg')
	export default {
  		name: 'head',
  		data() {
  			return {
                
          	}
  		},
  		methods: {
            btnClick() {
                if(this.$route.meta.showMenu){
                    this.toggleMenu()
                } else {
                    this.back()
                }
            },
  			toggleMenu() {
  				this.$store.commit('sideMenu', 'on')
  			},
            back() {
                this.$router.go(-1)
            }
  		},
  		computed: {
  			title: function(){
  				return this.$route.meta.cname || '未知'
  			},
            iconMenu: function(){
                return this.$route.meta.showMenu?menuBtn:backBtn
            }
  		}
	}
</script>

<style scope>
#head{
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	background-color: #1A1A1A;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	color:#FFF;
  z-index: 2;
}

#head>a{
	text-decoration: none;
	color:#FFF;
}
#menuBtn{
	position: absolute;
	left: 1rem;
	top: 1rem;
	width: 1rem;
}
#menuBtn>.svg-icon{
	padding: 50% 0;
}
</style>
