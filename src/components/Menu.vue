<template>
  	<div id="menu">
		<div class="area" :class="{'active': sideMenu}">
			<ul>
				<li>A</li>
				<li>A</li>
				<li>A</li>
				<li>A</li>
				<li>A</li>
			</ul>
		</div>
  	</div>
</template>

<script>
	export default {
  		name: 'menu',
  		data() {
  			return {
  				isleave: true,
  			}
  		},
  		methods: {
  		},
  		computed: {
  			isLeave: function() {
  				return { 'leave' : !this.$store.state.isMenu }
  			},
  			sideMenu: function() {
  				return this.$store.state.isMenu
  			}
  		}
	}
</script>

<style scope>
#menu{
}

.area{
	width: 75%;
	height: 100%;
	position: fixed;
	background-color: #FFF;
	top: 0;
	left: -75%;
	transition: left 200ms ease;
  z-index: 3;
}
.area.active{
	left: 0;
}
</style>
