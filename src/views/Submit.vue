<template>
    <div id="submit" class="memberPage">
    	<form id="submitForm">
            <div class="ctx">
                <div>
                    <p>電子郵件</p>
                    <p><input type="email" name="account" placeholder="email@address" required></p>
                </div>
                <div>
                    <p>密碼</p>
                    <p><input type="password" name="password" placeholder="password" minlength="8" required></p>
                </div>
                <div>
                    <p>確認密碼</p>
                    <p><input type="password" name="password_confirm" placeholder="confirm password" required></p>
                </div>
                <div>
                    <p>姓名</p>
                    <p><input type="name" name="name" placeholder="name" required></p>
                </div>
                <div>
                    <p>聯絡電話</p>
                    <p><input type="tel" name="tel" placeholder="phone" required></p>
                </div>
            </div>
            <div class="ctrl">
                <input type="submit" value="確認">
                <input type="reset" value="取消" @click="back">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'submit',
    methods: {
        back : function(){
            this.$router.go(-1)
        }
    },
    mounted:function(){
        let mainHeight = document.querySelector('.mainView').offsetHeight
        let loginHeight = document.querySelector('#submit').offsetHeight
        let maxheight = Math.max(mainHeight, loginHeight)
        document.querySelector('#submit').setAttribute('style' , 'height:'+maxheight+'px')
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

#submitForm{
    padding: 0 1rem;
    box-sizing: border-box;
}
#submitForm .ctx>div{
    margin:1rem 0 1.5rem 0;
}
#submitForm .ctx p{
    text-align: left;
    width: 100%;
    margin: 0;
    font-size: 0.8rem;
}

#submitForm .ctx input{
    padding: 0.5rem 0;
    font-size: 1rem;
    background-color: transparent;
    border-width: 0 0 1px 0;
    border-color: #000;
    outline: 0;
    width: 100%;
    box-sizing: border-box;
    transition: all 300ms ease;
}
#submitForm .ctx input:required:focus{
    padding: 1rem 0;
    font-size: 1rem;
    border-color: #48ABFF;
}
#submitForm .ctx input:required:invalid{
    border-color: #000;
}
#submitForm .ctx input:required:valid{
    border-color: #30BD73;
}
#submitForm .ctrl{
    display: flex;
    justify-content: center;
}
#submitForm .ctrl>input{
    display: block;
    margin: 0 1rem;
    color: #FFF;
    background-color: #262626;
    padding: 0.5rem 3rem;
    border:0px solid #CCC;
}

</style>
