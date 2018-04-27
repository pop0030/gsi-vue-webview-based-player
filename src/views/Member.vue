<template>
	<div id="member">
	    <div class="member-header">
	    	<div class="avater"><img :src="avater" alt=""></div>
	    	<div class="content islogin" v-if="isLogin">
	    		<span class="userName">{{ user.name }}</span>
	    		<div @click="logout">登出</div>
	    	</div>
	    	<div class="content unlogin" v-else>
	    		<router-link to="/member/submit">註冊</router-link>
	    		<router-link to="/member/login">登入</router-link>
	    	</div>
	    </div>
	    <div class="member-settings">
	    	<ul>
	    		<li v-for="(s, i) in settings" :class="{sperated:s.sperated}"><router-link :to="s.url">
	    			<span class="icon"><img :src="s.icon" :alt="s.name"></span>
	    			<span class="title">{{s.name}}</span>
	    		</router-link></li>
	    		<li @click="clearStorage">清除資料</li>
	    	</ul>
	    </div>
	    <transition name="slide">
	    	<router-view></router-view>
	    </transition>
	</div>
</template>

<script>
import auth from '../js/auth'
import { mapMutations, mapGetters } from 'vuex'
export default {
	name: 'member',
	data () {
		return {
			settings:[
				{ name:'通知', icon:require('../assets/member-icons-01.svg'), url:'', sperated: false },
				{ name:'設定', icon:require('../assets/member-icons-02.svg'), url:'', sperated: true },
				{ name:'意見反饋', icon:require('../assets/member-icons-03.svg'), url:'', sperated: false },
				{ name:'推薦超樂藝術家給朋友', icon:require('../assets/member-icons-04.svg'), url:'', sperated: false },
				{ name:'條款與隱私權政策', icon:require('../assets/member-icons-05.svg'), url:'', sperated: false },
				{ name:'說明', icon:require('../assets/member-icons-06.svg'), url:'', sperated: false }
			]
		}
	},
	methods: {
		...mapMutations(['clearStorage']),
		login: function() {
			auth.login()
		},
		logout: function() {
			auth.logout()
		}
	},
	computed: {
		avater: function(){
			return this.user.picture?this.user.picture:'./static/default-user.svg'
		},
		...mapGetters(['isLogin','user'])
	}
}
</script>

<style scoped>
#member{
	background-color: #F4F4F4;
}
.member-header{
	background-color: #1A1A1A;
	padding: 1rem;
}
.avater{
	width: 100%;
	overflow: hidden;
	position: relative;
	text-align: center;
}
.avater>img{
	width: 20%;
	max-width: 5rem;
	min-width: 2rem;
	border-radius: 5rem;
	margin-bottom: 0.5rem;
}
.content{
	box-sizing: border-box;
	padding: 1rem;
}
.unlogin>a{
	background-color: #FFF;
	color:#1A1A1A;
	text-decoration: none;
	padding: 0.3rem 2rem;
	border-radius: 2px;
	display: inline-block;
	margin: 0 0.1rem;
}
.member-settings{
	width: 100%;
}
.member-settings>ul{
	margin: 0;
	padding: 0;
	list-style-type: none;
	text-align: left;
}
.member-settings>ul>li{
	display: flex;
	flex-direction: row;
}
.member-settings>ul>li.sperated{
	border-bottom: 1px solid #DDD;
}
.member-settings>ul>li>a{
	width: 100%;
	padding: 1.2rem 1.5rem;
	color:#1A1A1A;
	text-decoration: none;
	font-size: 1rem;
	display: flex;
	align-items: center;
}
.member-settings .icon{
	width: 1rem;
	margin-right: 0.5rem;
	display: flex;
}

.member-settings .icon>img{
	width: 1rem;
}

.userName {
	color: #FFF;
}

#member .slide-enter-active,
#member .slide-leave-active {
	left: 0;
  	transition: left 600ms ease;
}
#member .slide-enter, 
#member .slide-leave-active {
  	left: 100%;
}
</style>
