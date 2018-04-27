<template>
    <div id="login" class="memberPage">
    	<div class="oauth">
    		<div class="auth-fb">
                <div class="oauth-img"><img src="../assets/icon-btn-fb.svg" alt=""></div>
    			<p>使用Facebook登入</p>
    		</div>
    		<div class="auth-go">
                <div class="oauth-img"><img src="../assets/icon-btn-gp.svg" alt=""></div>
    			<p>使用Google登入</p>
    		</div>
    	</div>
    	<div class="split-text">或</div>
    	<div class="trad-auth">
    		<form action="">
    			<p><input type="email" placeholder="信箱" name="ac"></p>
    			<p><input type="password" placeholder="密碼" name="pw"></p>
    		</form>
    	</div>
        <div class="split-text">
            <p>還沒有帳號？<router-link to="/member/submit" replace>立即註冊</router-link></p>
            <p>|</p>
            <p><router-link to="/member/forget?t=password">忘記密碼？</router-link></p>
        </div>
        <div class="submit"><button type="submit">登入</button></div>
    </div>
</template>

<script>
export default {
    name: 'login',
    mounted:function(){
        let mainHeight = document.querySelector('.mainView').offsetHeight
        let loginHeight = document.querySelector('#login').offsetHeight
        let maxheight = Math.max(mainHeight, loginHeight)
        document.querySelector('#login').setAttribute('style' , 'height:'+maxheight+'px')
    }
}
</script>

<style scoped>
.memberPage{
    background-color: #F4F4F4;
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 3rem;
    padding-bottom: 4rem;
    box-sizing: border-box;
}

.oauth{
    margin-top: 2rem;
}
.oauth>div{
    background-color: #FFF;
    display: flex;
    padding: 0.5rem 2rem;
    box-sizing: border-box;
    margin: 1rem 0;
    justify-content: center;
    align-items: center;
}
.oauth>div>.oauth-img{
    flex:1;
}
.oauth>div>.oauth-img>img{
    width: 80%;
    vertical-align: middle;
    max-width: 5rem;
}
.oauth>div>p{
    flex:4;
    margin:0;
}
.auth-fb>p{
    color:#2B3E8E;
}
.auth-go>p{
    color:#D33427;
}
.trad-auth{
    margin-top: 1rem;
}
.trad-auth>form>p{
    margin: 0.5rem 0;
}
.trad-auth input{
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 2.5rem;
    font-size: 1rem;
    border:0;
}
.trad-auth input:focus{
    outline: 0;
    box-shadow: 0 0 10px 0px rgba(0,0,0,0.2);
}
.trad-auth input::-webkit-input-placeholder{
    color:#000;
}
.split-text{
    color: #555;
    display: flex;
    justify-content: center;
    align-items: center;
}
.split-text a{
    color: #555;
}
.split-text>p{
    margin: 0.5rem;
}
.submit{
    margin-top: 2rem;
}
.submit>button{
    background-color: #FFF;
    border:1px solid #CCC;
    display: block;
    padding: 0.5rem 3rem;
    margin: 0 auto;
    font-size: 1rem;
}
.submit>button:focus{
    outline: 0;
}
.submit>button:active{
    background-color: #CCC;
}
</style>
