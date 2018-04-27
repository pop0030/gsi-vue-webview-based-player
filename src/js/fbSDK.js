import axios from 'axios'
import auth from './auth'

const fields = {
    "fields": "name,id,picture,email,cover,age_range,link,gender,locale,timezone,verified"
}

window.fbAsyncInit = ()=>{ 
    fbAsyncInit()
}

function fbAsyncInit() {
    console.log('[facebook]=>FB套件建立')
    FB.init({
        appId: '1925894757644354',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });
    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    auth.stateCheck()
};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('[狀態檢查]=>檢查中...')
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        console.log('[狀態檢查]=>已連結')
        // Logged into your app and Facebook.
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log('[狀態檢查]=>未授權')
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log('[狀態檢查]=>未登入')
    }
}

function getData() {
    return new Promise(function(resolve, reject) {
        console.log('[資料連線]=>連線中...')
        let str = new Date()
        FB.getLoginStatus(function(response){
            statusChangeCallback(response);
            if (response.status === 'connected') {
                FB.api('/me', 'GET', fields, function(res) {
                    console.log('[資料連線]=>取得資料')
                    let end = new Date()
                    console.log('[資料連線]=>時間:'+(end-str)+'ms')
                    resolve(res)
                })
            } else {
                resolve('unconnected')
            }
        })
    })
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.

function login() {
    console.log('[登入]連線中...')
    FB.login(async function(res){
        console.log('[登入]連線完成')
        statusChangeCallback(res)
        auth.stateCheck()
    }, {scope: 'public_profile,email'})
    //checkLoginState()
}

function logout() {
    return new Promise((resolve,reject)=>{
        console.log('[登出]連線中...')
        FB.api('/me/permissions', 'DELETE', function(res) {
            console.log('[登出]連線完成')
            statusChangeCallback(res)
            resolve()
        })
    })
}

export default {
    fbAsyncInit,
    logout,
    login,
    getData
}