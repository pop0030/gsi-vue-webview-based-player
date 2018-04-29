webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);



var initStatus = localStorage.getItem('init');

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["d" /* default */]);

var state = {
    // init: (!initStatus || init < 0 ),
    init: false,
    mask: false,
    isMenu: false,
    isLoading: false,
    isLogin: false,
    user: {}
};

var getters = {
    init: function init(state) {
        return state.init;
    },
    mask: function mask(state) {
        return state.mask;
    },
    isMenu: function isMenu(state) {
        return state.isMenu;
    },
    isLoading: function isLoading(state) {
        return state.isLoading;
    },
    isLogin: function isLogin(state) {
        return state.isLogin;
    },
    user: function user(state) {
        return state.user;
    }
};

var mutations = {
    clearStorage: function clearStorage(state) {
        localStorage.clear();
        state.init = true;
    },
    startUse: function startUse(state) {
        localStorage.setItem('init', 1);
        state.init = false;
    },
    sideMenu: function sideMenu(state, option) {
        switch (option) {
            case 'on':
                console.log('Menu On');
                state.isMenu = true;
                state.mask = true;
                break;
            case 'off':
                console.log('Menu Off');
                state.isMenu = false;
                state.mask = false;
                break;
            default:
                console.log('no options');
                state.isMenu = false;
                state.mask = false;
                break;
        }
    },
    load: function load(state, option) {
        switch (option) {
            case 'on':
                //console.log('start loading...')
                state.isLoading = true;
                state.mask = true;
                break;
            case 'off':
                //console.log('load done!')
                state.isLoading = false;
                state.mask = false;
                break;
            default:
                //console.log('no options')
                state.isLoading = false;
                state.mask = false;
                break;
        }
    },
    updateUser: function updateUser(state, data) {
        if (data) {
            state.user = data;
            state.isLogin = true;
        }
    },
    clearUser: function clearUser(state) {
        state.user = {};
        state.isLogin = false;
    }
};

var actions = {
    loading: function loading(_ref) {
        var commit = _ref.commit;

        commit('load', 'on');
    },
    loaded: function loaded(_ref2) {
        var state = _ref2.state,
            commit = _ref2.commit;

        if (!state.isMenu) {
            commit('load', 'off');
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["d" /* default */].Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}));

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(14);



var fields = {
    "fields": "name,id,picture,email,cover,age_range,link,gender,locale,timezone,verified"
};

window.fbAsyncInit = function () {
    fbAsyncInit();
};

function fbAsyncInit() {
    console.log('[facebook]=>FB套件建立');
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
    __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].stateCheck();
};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('[狀態檢查]=>檢查中...');
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        console.log('[狀態檢查]=>已連結');
        // Logged into your app and Facebook.
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log('[狀態檢查]=>未授權');
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log('[狀態檢查]=>未登入');
    }
}

function getData() {
    return new Promise(function (resolve, reject) {
        console.log('[資料連線]=>連線中...');
        var str = new Date();
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
            if (response.status === 'connected') {
                FB.api('/me', 'GET', fields, function (res) {
                    console.log('[資料連線]=>取得資料');
                    var end = new Date();
                    console.log('[資料連線]=>時間:' + (end - str) + 'ms');
                    resolve(res);
                });
            } else {
                resolve('unconnected');
            }
        });
    });
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.

function login() {
    console.log('[登入]連線中...');
    FB.login(async function (res) {
        console.log('[登入]連線完成');
        statusChangeCallback(res);
        __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].stateCheck();
    }, { scope: 'public_profile,email' });
    //checkLoginState()
}

function logout() {
    return new Promise(function (resolve, reject) {
        console.log('[登出]連線中...');
        FB.api('/me/permissions', 'DELETE', function (res) {
            console.log('[登出]連線完成');
            statusChangeCallback(res);
            resolve();
        });
    });
}

/* harmony default export */ __webpack_exports__["a"] = ({
    fbAsyncInit: fbAsyncInit,
    logout: logout,
    login: login,
    getData: getData
});

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fbSDK__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(3);




var stateCheck = async function stateCheck() {
	console.log('[檢查登入]開始檢查...');
	var apiId = 'AKfycbzABvxB6N004_lUWsYvAbo0jn-mIfMbl7r4b0kszs3LgpmZ6FE';
	var apiUrl = 'https://script.google.com/macros/s/' + apiId + '/exec';
	var fbDataObj = await __WEBPACK_IMPORTED_MODULE_1__fbSDK__["a" /* default */].getData();
	if (fbDataObj === 'unconnected') {
		console.log('[檢查登入]FB未登入或其他問題');
	} else {
		console.log('[檢查登入]FB已授權連線');
		var str = new Date();
		var fbDataText = JSON.stringify(fbDataObj);
		console.log('[檢查登入]確認會員資料...');
		__WEBPACK_IMPORTED_MODULE_0_axios___default()({
			method: 'POST',
			url: apiUrl,
			params: {
				action: 'loginFromFacbook'
			},
			data: fbDataText
		}).then(function (res) {
			var userData = res.data[fbDataObj.id];
			console.log('[檢查登入]完成確認');
			console.log('歡迎!' + userData.name);
			var end = new Date();
			console.log('[檢查登入]=>時間:' + (end - str) + 'ms');
			__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].commit('updateUser', userData);
		}).catch(function (err) {
			console.log(err);
		});
	}
};

var login = function login() {
	__WEBPACK_IMPORTED_MODULE_1__fbSDK__["a" /* default */].login();
};

var logout = async function logout() {
	var logout = await __WEBPACK_IMPORTED_MODULE_1__fbSDK__["a" /* default */].logout();
	__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].commit('clearUser');
};

/* harmony default export */ __webpack_exports__["a"] = ({
	stateCheck: stateCheck,
	login: login,
	logout: logout
});

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iOTBweCIgaGVpZ2h0PSI5MHB4IiB2aWV3Qm94PSIwIDAgOTAgOTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDkwIDkwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiMzQTU1OUUiIGQ9Ik00Ljk2MSw0Ljk2MXY4MC4wNzhoNDIuNjQ2VjU0LjEwNUgzNy4xODJWNDEuNDc5aDEwLjQyNlYzMC44NzNjMC03LjcxMyw2LjI1Mi0xMy45NjUsMTMuOTY0LTEzLjk2NWgxMC44OTkNCgkJdjExLjM1NWgtNy43OTljLTIuNDUxLDAtNC40MzgsMS45ODYtNC40MzgsNC40Mzh2OC43NzdoMTIuMDRsLTEuNjY1LDEyLjYyN0g2MC4yMzR2MzAuOTM0aDI0LjgwNVY0Ljk2MUg0Ljk2MXogTTQuOTYxLDQuOTYxIi8+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iOTBweCIgaGVpZ2h0PSI5MHB4IiB2aWV3Qm94PSIwIDAgOTAgOTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDkwIDkwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiNEQzRCMzkiIGQ9Ik01LjAyNiw1LjM5NFY4NS40N2g4MC4wNzhWNS4zOTRINS4wMjZ6IE01MS43MDgsNDguOGMtMS4zNjksOC45OTYtOC4wNzYsMTQuMTUyLTE2Ljc1OSwxNC4xNTINCgkJYy05Ljc1NywwLTE3LjY2OS03LjkxLTE3LjY2OS0xNy42NjhjMC05Ljc1NSw3LjkxMi0xNy42NjUsMTcuNjY5LTE3LjY2NWM0LjcyLDAsOC44NTYsMS42ODQsMTEuODY2LDQuNjA4bC01LjA3LDUuMDcNCgkJYy0xLjcxOC0xLjczLTQuMDY4LTIuNjUyLTYuNzk2LTIuNjUyYy01Ljc0MywwLTEwLjM5OSw0Ljg5Ny0xMC4zOTksMTAuNjM5YzAsNS43NDcsNC42NTYsMTAuNTAyLDEwLjM5OSwxMC41MDINCgkJYzQuODEzLDAsOC40Ni0yLjMyNyw5LjUxMS02Ljk4NmgtOS41MTF2LTcuMDk1aDE2LjcxNmMwLjIwMSwxLjE0NCwwLjMwMiwyLjMzOSwwLjMwMiwzLjU3OQ0KCQlDNTEuOTY3LDQ2LjUxNCw1MS44NzgsNDcuNjg1LDUxLjcwOCw0OC44TDUxLjcwOCw0OC44eiBNNzIuOTI1LDQ2LjYwMWgtNi4xOTF2Ni4xODhoLTQuMzk2di02LjE4OGgtNi4xOTF2LTQuNGg2LjE5MXYtNi4xOWg0LjM5Ng0KCQl2Ni4xOWg2LjE5MVY0Ni42MDF6IE03Mi45MjUsNDYuNjAxIi8+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNzcuMDg2cHgiIGhlaWdodD0iNzcuMDg2cHgiIHZpZXdCb3g9IjAgMCA3Ny4wODYgNzcuMDg2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA3Ny4wODYgNzcuMDg2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNTMuOTkzLDM3LjE5TDMyLjczOCwyMi42NTRjLTAuNjYxLTAuNDg3LTIuNDIzLTAuNDg3LTIuNTY0LDEuMzU0djI5LjA3Mw0KCQkJYzAuMTU3LDEuODQsMS45NTEsMS44NzEsMi41NjQsMS4zNTRsMjEuMjU0LTE0LjUzN0M1NC41NDMsMzkuNTY3LDU1LjI5NywzOC4yMTMsNTMuOTkzLDM3LjE5eiBNMzMuNDYyLDQ5Ljk4MVYyNy4xMDYNCgkJCWwxNi42OTEsMTEuNDM4TDMzLjQ2Miw0OS45ODF6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0zOC41NDMsMEMxNy4yOSwwLDAsMTcuMjksMCwzOC41NDRjMCwyMS4yNTMsMTcuMjksMzguNTQyLDM4LjU0MywzOC41NDJzMzguNTQzLTE3LjI4OSwzOC41NDMtMzguNTQyDQoJCQlDNzcuMDg2LDE3LjI5LDU5Ljc5NywwLDM4LjU0MywweiBNMzguNTQzLDczLjc5OWMtMTkuNDQ1LDAtMzUuMjU1LTE1LjgxMS0zNS4yNTUtMzUuMjU1YzAtMTkuNDQ1LDE1LjgxMS0zNS4yNTYsMzUuMjU1LTM1LjI1Ng0KCQkJYzE5LjQ0NSwwLDM1LjI1NiwxNS44MTEsMzUuMjU2LDM1LjI1NkM3My43OTksNTcuOTg5LDU3Ljk4OSw3My43OTksMzguNTQzLDczLjc5OXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


var contentSDK = {};
var nav = navigator.userAgent;
var canDownload = true;

var os = function os() {
	var os = "";
	if (/(Android)/i.test(nav)) {
		//console.log('android')
		os = "android";
	} else if (/(iPhone|iPad|iPod|iOS)/i.test(nav)) {
		//console.log('ios')
		os = "ios";
	} else {
		os = "pc";
	}
	return os;
};

contentSDK.getDeviceId = function () {
	if (os == 'android') {
		//console.log("android")
		window.JSInterface.getDeviceId();
	} else if (os == 'ios') {
		//console.log("ios")
		location.href = 'app:$getDeviceId';
	} else {
		//console.log("pc")
	}
};

contentSDK.genToken = async function (deviceId, userId, getJWTTokenURL) {
	var jsonData = JSON.stringify({ "iss": "ubn.com", "company": "ubn", "awesome": true, "account": "u7481722", "deviceId": deviceId, "userId": userId });
	var strTime = new Date();
	var res = await __WEBPACK_IMPORTED_MODULE_0_axios___default()({
		url: getJWTTokenURL,
		method: 'POST',
		responseType: "json",
		header: {
			'Content-Type': 'application/json'
		},
		data: jsonData
	});
	var endTime = new Date();
	var transTime = endTime - strTime;
	//console.log(transTime+ 'ms')
	contentSDK.saveToken(res.returnToken);
	return res.data;
};

contentSDK.sendAllContentId = function (strIds) {
	console.log(strIds);

	if (os == 'android') {
		//console.log("android")
		window.JSInterface.checkBookDownload(strIds);
	} else if (os == 'ios') {
		//console.log("ios")
		location.href = 'app:$checkBookDownload:$strIds=' + strIds;
	} else {
		//console.log("pc")
	}
};

contentSDK.saveToken = function (token) {
	//console.log("os=" + os + "saveToken=" + token)

	if (os == 'android') {
		window.JSInterface.saveToken(token);
	} else if (os == 'ios') {
		location.href = 'app:$saveToken:$token=' + token;
	}
};

contentSDK.checkBookDownload = function (strIds) {};

contentSDK.downloadBookFile = function (contentId, token, cdn_url, imagePath) {
	//console.log('contentId==>' + contentId)
	//console.log('token==>' + token)
	//console.log('cdn_url==>' + cdn_url)
	//console.log('imagePath==>' + imagePath)
	if (canDownload) {
		if (os == 'android') {
			window.JSInterface.downloadBookFile(contentId, token, cdn_url, imagePath);
		} else if (os == 'ios') {
			location.href = 'app:$downloadBookFile:$contentId=' + contentId + '&token=' + token + '&cdn_url=' + encodeURI(cdn_url) + '&image_url=' + encodeURI(imagePath);
		}
		canDownload = false;
	} else {
		alert('檔案尚在下載中，請稍後');
		return;
	}
};

contentSDK.bindDownloadChanged = function (contentId, percent) {
	//console.log("percent=" + percent)
	if (percent == 100) {
		canDownload = true;
	}
	bindDownloadChanged(contentId, percent);
};

contentSDK.openEPUB = function (contentId) {
	//console.log('open epub contentId=' + contentId)
	if (os == 'android') {
		window.JSInterface.openEPUB(contentId);
	} else if (os == 'ios') {
		location.href = 'app:$openEPUB:$contentId=' + contentId;
	}
};

contentSDK.deleteBookFile = function (contentId) {

	if (os == 'android') {
		window.JSInterface.deleteBookFile(contentId);
	} else if (os == 'ios') {
		location.href = 'app:$deleteBookFile:$contentId=' + contentId;
	}
};

contentSDK.deletedContentId = function (contentId) {};

contentSDK.playMovie = function (contentPath) {
	if (os == 'android') {
		window.JSInterface.playMovie(contentPath);
	} else if (os == 'ios') {
		location.href = 'app:$playMovie:$contentPath=' + contentPath;
	}
};

contentSDK.errorCallback = function (errCode) {
	//console.log('JS errorCallback:' + errCode)
	canDownload = true;
	errorCallback(errCode);
};

contentSDK.openQRCode = function () {
	//console.log('JS openQRCode.....')
	if (os == 'android') {
		window.JSInterface.openQRCode();
	} else if (os == 'ios') {}
};

/* unused harmony default export */ var _unused_webpack_default_export = (contentSDK);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_Main__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_Main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__views_Main__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_Explore__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_Explore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__views_Explore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_Feature__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_Feature___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__views_Feature__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_Bookcase__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_Bookcase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__views_Bookcase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_Member__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_Member___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__views_Member__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_Purchase__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_Purchase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__views_Purchase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_Watch__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_Watch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__views_Watch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__views_Login__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__views_Login___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__views_Login__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__views_Submit__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__views_Submit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__views_Submit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_Item__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_Item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_Item__);




/* View */










/* Component */


__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

var routes = [{
    path: '/',
    name: 'index',
    component: __WEBPACK_IMPORTED_MODULE_4__views_Explore___default.a,
    meta: {
        cname: '探索',
        showMenu: true
    }
}, {
    path: '/camera',
    name: 'camera',
    component: __WEBPACK_IMPORTED_MODULE_3__views_Main___default.a,
    meta: {
        cname: '掃描',
        showMenu: false
    }
}, {
    path: '/explore',
    name: 'explore',
    component: __WEBPACK_IMPORTED_MODULE_4__views_Explore___default.a,
    meta: {
        cname: '探索',
        showMenu: true
    }
}, {
    path: '/feature',
    name: 'feature',
    component: __WEBPACK_IMPORTED_MODULE_5__views_Feature___default.a,
    meta: {
        cname: '精選',
        showMenu: true
    }
}, {
    path: '/bookcase',
    component: __WEBPACK_IMPORTED_MODULE_6__views_Bookcase___default.a,
    children: [{
        name: 'purchase',
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_8__views_Purchase___default.a,
        meta: {
            cname: '書櫃',
            showMenu: true
        }
    }, {
        name: 'watch',
        path: 'watch',
        component: __WEBPACK_IMPORTED_MODULE_9__views_Watch___default.a,
        meta: {
            cname: '書櫃',
            showMenu: true
        }
    }]
}, {
    path: '/member',
    name: 'member',
    component: __WEBPACK_IMPORTED_MODULE_7__views_Member___default.a,
    meta: {
        cname: '我的',
        showMenu: true
    },
    children: [{
        name: 'login',
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_10__views_Login___default.a,
        meta: {
            cname: '登入',
            showMenu: false
        }
    }, {
        name: 'submit',
        path: 'submit',
        component: __WEBPACK_IMPORTED_MODULE_11__views_Submit___default.a,
        meta: {
            cname: '註冊',
            showMenu: false
        }
    }]
}, {
    path: '/feature/:id',
    name: 'item',
    component: __WEBPACK_IMPORTED_MODULE_12__components_Item___default.a
}];

var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
    routes: routes
});

router.beforeEach(function (to, from, next) {
    window.scroll(0, 0);
    __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].dispatch('loading');
    next();
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(64)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(39),
  /* template */
  __webpack_require__(120),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_head__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_head__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_nav__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_nav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_nav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Tutorial__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Tutorial___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Tutorial__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Menu__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Menu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Menu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_loading__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_loading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_loading__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  components: {
    topHead: __WEBPACK_IMPORTED_MODULE_0__components_head___default.a,
    bottomNav: __WEBPACK_IMPORTED_MODULE_1__components_nav___default.a,
    Tutorial: __WEBPACK_IMPORTED_MODULE_2__components_Tutorial___default.a,
    sideMenu: __WEBPACK_IMPORTED_MODULE_3__components_Menu___default.a,
    loading: __WEBPACK_IMPORTED_MODULE_4__components_loading___default.a
  },
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_vuex__["a" /* mapGetters */])(['init', 'sideMenu', 'isLoading', 'mask'])),
  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_vuex__["b" /* mapMutations */])({
    clickMask: 'sideMenu'
  }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_vuex__["c" /* mapActions */])(['loaded', 'loading']), {
    fetchData: async function fetchData() {
      function fetch() {
        return new Promise(function (res, rej) {
          setTimeout(function () {
            res();
          }, 600);
        });
      }
      var f = await fetch();
      this.loaded();
    }
  }),
  created: function created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  }
});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'item'
});

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'menu',
  data: function data() {
    return {
      isleave: true
    };
  },

  methods: {},
  computed: {
    isLeave: function isLeave() {
      return { 'leave': !this.$store.state.isMenu };
    },
    sideMenu: function sideMenu() {
      return this.$store.state.isMenu;
    }
  }
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'tutorial',
  data: function data() {
    return {
      stepCount: 0,
      isMove: false,
      Left: 0,
      page: {},
      styleObj: {
        left: '0px'
      },
      tutorials: [{ text: '掃描刮刮卡上的二維條碼', img: './static/tutorial-01.png', btn: '跳過' }, { text: '開通帳號並註冊綁定', img: './static/tutorial-02.png', btn: '跳過' }, { text: '掃描DIY影片二維條碼', img: './static/tutorial-03.png', btn: '跳過' }, { text: '觀看DIY影片', img: './static/tutorial-04.png', btn: '完成' }]
    };
  },

  computed: {
    stepMove: function stepMove() {
      return { stepMove: this.isMove };
    },
    stepbtn: function stepbtn() {
      return this.tutorials[this.stepCount].btn;
    }
  },
  methods: {
    stepNext: function stepNext(val) {
      if (val < 3) {
        val++;
        this.stepCount = val;
      } else {
        this.startUse();
      }
    },
    stepBack: function stepBack(val) {
      if (val > 0) {
        val--;
        this.stepCount = val;
      }
    },
    stepBg: function stepBg(img) {
      return { 'background-image': 'url(' + img + ')' };
    },
    touch: function touch() {
      var e = event;
      var type = e.type;
      var p = this.page;
      var count = this.stepCount;
      switch (type) {
        case 'touchstart':
          p.x = e.touches[0].clientX;
          p.y = e.touches[0].clientY;
          this.Left = document.getElementsByClassName('steps')[0].offsetLeft;
          break;
        case 'touchmove':
          this.isMove = true;
          var move = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
          };
          var mx = move.x - p.x;
          var my = move.y - p.y;
          var dirX = mx > 0 ? '往右' : '往左';
          var dirY = my > 0 ? '往下' : '往上';
          var leftVal = this.Left + mx;
          this.styleObj.left = leftVal + 'px';
          //console.log('Move ['+ dirX +mx + ',' + dirY + my + ']')
          break;
        case 'touchend':
          this.isMove = false;
          var end = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
          };
          var fnx = end.x - p.x;
          var fnDirX = fnx < 0 ? true : false;
          var fny = end.y - p.y;
          fnx = Math.abs(fnx);
          var width = document.getElementById('tutorial').offsetWidth / 2;
          if (fnx > 100) {
            if (fnDirX) {
              this.stepNext(count);
            } else {
              this.stepBack(count);
            }
          }
          this.styleObj.left = '';
          break;
      }
    },
    startUse: function startUse() {
      this.$store.commit('startUse');
      this.$router.push('explore');
    },
    isActive: function isActive(val) {
      var isAct = false;
      if (this.stepCount == val) {
        isAct = true;
      }
      return { act: isAct };
    }
  }
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

var menuBtn = __webpack_require__(96);
var backBtn = __webpack_require__(89);
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'head',
    data: function data() {
        return {};
    },

    methods: {
        btnClick: function btnClick() {
            if (this.$route.meta.showMenu) {
                // this.toggleMenu()
            } else {
                    // this.back()
                }
        },
        toggleMenu: function toggleMenu() {
            this.$store.commit('sideMenu', 'on');
        },
        back: function back() {
            this.$router.go(-1);
        }
    },
    computed: {
        title: function title() {
            return this.$route.meta.cname || '未知';
        },
        iconMenu: function iconMenu() {
            return this.$route.meta.showMenu ? menuBtn : backBtn;
        }
    }
});

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'loading'
});

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'nav',
  data: function data() {
    return {
      pages: [{ title: '探索', iconName: 'explore', routeName: ['explore', 'index'] }, { title: '精選', iconName: 'feature', routeName: ['feature'] }, { title: '掃描', iconName: 'camera', routeName: ['camera'] }, { title: '書櫃', iconName: 'bookcase', routeName: ['bookcase', 'purchase', 'watch'] }, { title: '我的', iconName: 'member', routeName: ['member', 'login', 'submit'] }]
    };
  },

  methods: {
    icon: function icon(val) {
      var name = this.$route.name;
      var Activeobj = this.pages.find(function (e) {
        return e.routeName.includes(name);
      });
      var isActive = Activeobj.iconName == val ? '-active' : '';
      var url = __webpack_require__(130)("./icon-" + val + isActive + '.svg');
      return url;
    }
  }
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'bookcase',
	data: function data() {
		return {
			isMove: false,
			page: {},
			Left: 0,
			styleObj: {
				left: '0px'
			}
		};
	},

	computed: {
		bkcName: function bkcName() {
			return this.$route.name;
		}
	},
	methods: {
		touch: function touch() {
			var e = event;
			var type = e.type;
			var p = this.page;
			switch (type) {
				case 'touchstart':
					p.x = e.touches[0].clientX;
					p.y = e.touches[0].clientY;
					break;
				case 'touchmove':
					this.isMove = true;
					var move = {
						x: e.changedTouches[0].clientX,
						y: e.changedTouches[0].clientY
					};
					var mx = move.x - p.x;
					var my = move.y - p.y;
					var dirX = mx > 0 ? '往右' : '往左';
					var dirY = my > 0 ? '往下' : '往上';
					break;
				case 'touchend':
					this.isMove = false;
					var end = {
						x: e.changedTouches[0].clientX,
						y: e.changedTouches[0].clientY
					};
					var fnx = end.x - p.x;
					var fnDirX = fnx < 0 ? true : false;
					var fny = end.y - p.y;
					fnx = Math.abs(fnx);
					if (fnx > 100) {
						if (fnDirX) {
							this.moveNext();
						} else {
							this.moveBack();
						}
					}
					break;
			}
		},
		moveNext: function moveNext() {
			this.$router.push('/bookcase/watch');
		},
		moveBack: function moveBack() {
			this.$router.push('/bookcase');
		}
	}
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'explore',
	data: function data() {
		return {
			items: [{ name: '種子盆栽', icon: __webpack_require__(74), img: './static/exp-bgs-01.jpg', url: 'http://210.61.46.3/seedart' }, { name: '書法', icon: __webpack_require__(75), img: './static/exp-bgs-02.jpg', url: 'http://210.61.46.3/shufa' }, { name: '繪畫', icon: __webpack_require__(76), img: './static/exp-bgs-03.jpg', url: 'http://210.61.46.3/hudie' }, { name: '更多', icon: __webpack_require__(77), img: './static/exp-bgs-04.jpg', url: 'http://210.61.46.3/crc' }],
			top: { title: '你可能會喜歡的影片', img: './static/movieclip.jpg', url: '/' }
		};
	},

	methods: {
		link: function link(url) {
			window.open(url);
		}
	}
});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'feature',
	data: function data() {
		return {
			items: [{ name: '', img: './static/feature-img-01.jpg', url: 'https://artmaster.com.tw', state: '', type: '' }, { name: '', img: './static/feature-img-02.jpg', url: 'fb://page/1723515127969265', state: '', type: '' }, { name: '', img: './static/feature-img-03.jpg', url: 'http://210.61.46.3/seedart', state: '', type: '' }]
		};
	},

	methods: {
		link: function link(url) {
			window.open(url);
		}
	}
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'login',
    mounted: function mounted() {
        var mainHeight = document.querySelector('.mainView').offsetHeight;
        var loginHeight = document.querySelector('#login').offsetHeight;
        var maxheight = Math.max(mainHeight, loginHeight);
        document.querySelector('#login').setAttribute('style', 'height:' + maxheight + 'px');
    }
});

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'main'
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_auth__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'member',
	data: function data() {
		return {
			settings: [{ name: '通知', icon: __webpack_require__(90), url: '', sperated: false }, { name: '設定', icon: __webpack_require__(91), url: '', sperated: true }, { name: '意見反饋', icon: __webpack_require__(92), url: '', sperated: false }, { name: '推薦超樂藝術家給朋友', icon: __webpack_require__(93), url: '', sperated: false }, { name: '條款與隱私權政策', icon: __webpack_require__(94), url: '', sperated: false }, { name: '說明', icon: __webpack_require__(95), url: '', sperated: false }]
		};
	},

	methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapMutations */])(['clearStorage']), {
		login: function login() {
			__WEBPACK_IMPORTED_MODULE_0__js_auth__["a" /* default */].login();
		},
		logout: function logout() {
			__WEBPACK_IMPORTED_MODULE_0__js_auth__["a" /* default */].logout();
		}
	}),
	computed: _extends({
		avater: function avater() {
			return this.user.picture ? this.user.picture : './static/default-user.svg';
		}
	}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['isLogin', 'user']))
});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'purchase',
	data: function data() {
		return {
			items: [{ name: '林惠蘭種子藝術盆栽',
				img: './static/bkc-pur-01.jpg', date: '', url: '/'
			}, { name: 'Linda Lin Art of Seeds Bonzai',
				img: './static/bkc-pur-02.jpg', date: '', url: '/'
			}, { name: 'Linda Linシード鉢植えアーツ',
				img: './static/bkc-pur-03.jpg', date: '', url: '/'
			}, { name: 'Linda Lin L’Art De Grains Bonzai',
				img: './static/bkc-pur-04.jpg', date: '', url: '/'
			}, { name: '林惠兰种子盆栽艺术',
				img: './static/bkc-pur-05.jpg', date: '', url: '/'
			}]
		};
	},

	methods: {
		touch: function touch() {
			this.$parent.touch(event);
		}
	}
});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'submit',
    methods: {
        back: function back() {
            this.$router.go(-1);
        }
    },
    mounted: function mounted() {
        var mainHeight = document.querySelector('.mainView').offsetHeight;
        var loginHeight = document.querySelector('#submit').offsetHeight;
        var maxheight = Math.max(mainHeight, loginHeight);
        document.querySelector('#submit').setAttribute('style', 'height:' + maxheight + 'px');
    }
});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'watch',
	data: function data() {
		return {
			items: [{ name: '花生DIY', parent: '林惠蘭種子藝術盆栽', img: './static/movieClip-01.jpg', isOpen: false, url: '/', time: '08:32' }, { name: '春不老DIY', parent: '林惠蘭種子藝術盆栽', img: './static/movieClip-02.jpg', isOpen: false, url: '/', time: '10:20' }, { name: '搶救高麗菜', parent: '林惠蘭種子藝術盆栽', img: './static/movieClip-03.jpg', isOpen: false, url: '/', time: '03:24' }]
		};
	},

	methods: {
		touch: function touch() {
			this.$parent.touch(event);
		},
		moreOptionMenu: function moreOptionMenu(index) {
			var arr = this.items;
			for (var i = 0; i < arr.length; i++) {
				arr[i].isOpen = false;
			}
			arr[index].isOpen = true;
		},
		clickBody: function clickBody() {
			var arr = this.items;
			for (var i = 0; i < arr.length; i++) {
				arr[i].isOpen = false;
			}
		}
	}
});

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_router__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_store__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__js_contentSDK__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__js_fbSDK__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__App__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__App__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.










__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    el: '#app',
    store: __WEBPACK_IMPORTED_MODULE_3__js_store__["a" /* default */],
    router: __WEBPACK_IMPORTED_MODULE_2__js_router__["a" /* default */],
    render: function render(h) {
        return h(__WEBPACK_IMPORTED_MODULE_6__App___default.a);
    }
});

/***/ }),
/* 56 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 57 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 58 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 59 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 60 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 61 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 62 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 63 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 64 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 65 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 66 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 67 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 68 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 69 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 70 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 71 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 72 */,
/* 73 */,
/* 74 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjAwcHgiIGhlaWdodD0iMjAwcHgiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAgMjAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMzQuNjUsMTM1LjA3OGMwLDAtMi44NTQtNC4xOTUtMTQuOTM2LTQuNTMzYzAsMC00MC43NzgtMS4zNC02OC40NjgtMTUuMzUzYzAsMC0zLjQ0LTEuNTk2LTIuMDk5LTQuNTMzDQoJYzAsMCwwLjUwMy00LjExMyw5LjMxMi0xLjAwNmMwLDAsMjYuNjc4LDcuMDQ5LDQxLjg2Myw0LjAyOGMwLDAtMTguMTE5LTYuNTAzLTE1Ljc2OS05LjQ0YzAsMC0xLjkzMi00LjcwOCwyNC4wMDEsMi4yNjYNCgljMCwwLDIuNzcxLDAuOTczLDYuNjcyLDEuMDcyYy0wLjgxOC00Ljk3LTYuMTk3LTMxLjQ5MS0yOS40MTMtNDMuNDAyYzAsMCwyNS41OTksOC4zNDUsMzIuMDQ4LDQzLjMyMw0KCWMyLjE0My0wLjE3OSw0LjQ3My0wLjY2NSw2Ljc5OS0xLjcwNGMwLDAsNy40NjctMi40MzUsMTIuNjcyLTAuNTg4YzUuNzA3LDIuMDI2LDExLjQxMiw1LjQ3LDE5LjkzNCwxNi4wODQNCgljMi40NjUtNi42MywzLjgxOC0xMy44MDIsMy44MTgtMjEuMjkyYzAtMzMuNzM2LTI3LjM1LTYxLjA4Ny02MS4wODYtNjEuMDg3Yy0zMy43MzcsMC02MS4wODcsMjcuMzUxLTYxLjA4Nyw2MS4wODcNCgljMCwzMy43MzksMjcuMzUsNjEuMDg3LDYxLjA4Nyw2MS4wODdjMTYuNzI3LDAsMzEuODc3LTYuNzI4LDQyLjkwOC0xNy42MThMMTM0LjY1LDEzNS4wNzh6IE0xMjIuMTg5LDY3LjU1NA0KCWMyLjM5MywyMi42NzUtNy45MjgsMjMuMDk4LTcuOTI4LDIzLjA5OEMxMTAuMDQ1LDcxLjMzMSwxMjIuMTg5LDY3LjU1NCwxMjIuMTg5LDY3LjU1NHogTTEwNy41OSw0OS4xNzcNCgljMCwwLDYuNTQzLDEzLjIxNi03LjExMSwyMS45MDJDMTAwLjQ3OSw3MS4wNzksOTguNjUzLDU0LjMzOSwxMDcuNTksNDkuMTc3eiBNMTA4LjU1NSw5Mi4zNzFjLTExLjI0NCw5LjIyOS0yMi43MzksMC0yMi43NDEsMA0KCUMxMDAuMDc3LDgzLjMwOCwxMDguNTU1LDkyLjM3MSwxMDguNTU1LDkyLjM3MXogTTk2LjgwOCw3NS43NTdjMCwwLTcuNzIxLDEwLjQ4Ny0yMy4wNzUsMi4wOTcNCglDNzMuNzMyLDc3Ljg1NCw4NC41MjEsNjcuMjg1LDk2LjgwOCw3NS43NTd6Ii8+DQo8L3N2Zz4NCg=="

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjAwcHgiIGhlaWdodD0iMjAwcHgiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAgMjAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNOTUuNjcyLDU0Ljk2MWMzMS4wNzYsMCw1Ni4yNjgsMjUuMTkzLDU2LjI2OCw1Ni4yNzENCgkJYzAsMzEuMDcyLTI1LjE5MSw1Ni4yNjgtNTYuMjY4LDU2LjI2OHMtNTYuMjctMjUuMTk1LTU2LjI3LTU2LjI2OEMzOS40MDIsODAuMTU0LDY0LjU5Niw1NC45NjEsOTUuNjcyLDU0Ljk2MXoiLz4NCgk8Y2lyY2xlIGZpbGw9IiNGRkZGRkYiIGN4PSIxNjAuNzYiIGN5PSI0OC41MTQiIHI9IjE2LjAxNSIvPg0KCTxjaXJjbGUgZmlsbD0iI0ZGRkZGRiIgY3g9IjU4LjY2NiIgY3k9Ijc3Ljg1OSIgcj0iMzUuNDQyIi8+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjAwcHgiIGhlaWdodD0iMjAwcHgiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAgMjAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMzQuODUxLDQ1LjAwM2MxNi4xMTUsMTEuNTIxLDI2LjYyMywzMC4zODUsMjYuNjIzLDUxLjcwM2MwLDM1LjA3Mi0yOC40MzIsNjMuNTAyLTYzLjUwNiw2My41MDINCgkJYy0zNC40NDIsMC02Mi40NzUtMjcuNDE2LTYzLjQ3My02MS42MTljLTAuMDE4LDAuNjQxLTAuMDMxLDEuMjc3LTAuMDMxLDEuOTJjMCwzNi4xOTMsMjkuMzQsNjUuNTM3LDY1LjUzNyw2NS41MzcNCgkJYzM2LjE5MywwLDY1LjUzNS0yOS4zNDQsNjUuNTM1LTY1LjUzN0MxNjUuNTM2LDc3LjEyNiwxNTMuMjg0LDU2LjYwNCwxMzQuODUxLDQ1LjAwM3oiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTI1LjczLDExMi4wMjFjMCwwLTEzLjQ1Mi0wLjI3MS0yNC4yMDgtOC43MjNjLTE3LjU4NCw3Ljk5Ni0yMy4xMTMsMzIuNDc5LTIzLjExMywzMi40NzkNCgkJYy0yLjAzMSwxMC4wMiwyMC44NTQsNi45NTksMjAuODU0LDYuOTU5YzIuOTY0LTAuNzMsNS43MjUtMS41NjgsOC4zMDgtMi40NzFDMTA2LjA0NywxMzEuNDQ4LDEwNy44LDExOS4xMjgsMTI1LjczLDExMi4wMjF6Ii8+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTE0MS45MjMsMTEwLjMxM2MxOS43MDUtNTIuNzkzLTQxLjcxNS03Ni4zNTktNDEuNzE1LTc2LjM1OWMzLjUyMSwyLjg0NCw1LjY4OCw2LjkwNCw1LjY4OCw2LjkwNA0KCQljNS42ODcsNi45MDYsMC4xMzUsMTUuNTcyLDAuMTM1LDE1LjU3MmMtMC4zMTcsMC42MzMtMC41NzcsMS4yNzEtMC44MSwxLjkxMmMxLjczOSwyLjM5MywzLjU1Miw0LjczLDUuNDc0LDYuOTgyDQoJCUMxMjIuNDkyLDc5LjE2MywxNDYuNDYzLDg5LjUxMywxNDEuOTIzLDExMC4zMTN6Ii8+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEzNi40OTcsMTIxLjkyOWMwLDAtOC43MzgsMTEuMjg1LTI4LjkyNywxOC4zMzZjMS4wMzgsNi4wMDgsMy41OTYsMTAuMzkxLDMuNTk2LDEwLjM5MQ0KCQljMy42MDUtNy43OTcsMTQuNjAxLTE2LjY0MywxNC42MDMtMTYuNjQzYzYuMjM2LTUuMDIsMTEuNTg5LTExLjI5MSwxNC42MjctMTguNzgxYzAuNjkxLTEuNzA3LDEuMTgzLTMuMzQsMS41MjctNC45MTgNCgkJQzE0MC41MzEsMTE0LjA0LDEzOC43NDcsMTE3LjkwNywxMzYuNDk3LDEyMS45Mjl6Ii8+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEyMi45NTgsMTAyLjE5OGMwLDAtMC42NzctNC40NjktMTAuOTAxLTE3LjYwNGMwLDAtMTEuNDY1LTEzLjUwNi02LjgzNS0yNi4yNTINCgkJYy0zLjEzNy00LjMxNC02LjAyOC04LjgwOS04Ljg0NS0xMy4zMzZjLTQuMDc3LDQuNjI1LTYuMTUxLDEyLjMzNi02LjE1MSwxMi4zMzZjLTUuNCwyNS4wMjEsMS45MjYsMzguNTkyLDExLjI5Nyw0NS45NTUNCgkJQzEwNy4yOTMsMTAwLjY3MywxMTQuMzU5LDk5LjgyMSwxMjIuOTU4LDEwMi4xOTh6Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjAwcHgiIGhlaWdodD0iMjAwcHgiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAgMjAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik03MC4wMzEsMTE5LjcwNWM3Ljc3OS0xLjEwMiwxMS4yNzMsMS4yNTQsMTEuMjczLDEuMjU0YzAtMC4wMTgsMC0wLjcwMywwLTAuNzAzVjcwLjExMw0KCQljMC01Ljg0LDQuNzMyLTExLjkzMiwxMC41NzItMTMuNTk3bDMyLjM5Ni05LjkxMWMtNy40LTMuMzY5LTE1LjYxMy01LjI2Mi0yNC4yNzMtNS4yNjJjLTMyLjM5NSwwLTU4LjY1NiwyNi4yNjItNTguNjU2LDU4LjY1Ng0KCQljMCwxMS45NjcsMy41OTIsMjMuMDkxLDkuNzQ0LDMyLjM2OUM1NC4yODcsMTI2LjA0NSw2MS41NjEsMTIwLjkwOCw3MC4wMzEsMTE5LjcwNXoiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTUwLjY1NCw3MC40Mzd2NDkuODg1YzAsOS4yMDItOS4yNjQsMTcuNzg0LTIwLjY5NSwxOS4xNjljLTExLjQyNCwxLjM4OC0yMC42ODgtNC40MzUtMjAuNjg4LTEzLjYzNw0KCQljMC05LjE5NCw5LjI2NC0xNy43OCwyMC42ODgtMTkuMTY0YzcuNzc5LTAuOTQ2LDEyLjEyMSwxLjU1MywxMi4xMjEsMS41NTNjMC0wLjAxOCwwLTAuMDI2LDAtMC4wMjZzMC0zMC40NzksMC0zNC44NDQNCgkJYzAtNC4zNjUtNC43MTUtMi43ODEtNC43MTUtMi43ODFMOTQuNzQ2LDgzLjk1YzAsMC00LjkwNCwxLjc0OC00LjkwNCw1LjgyNmMwLDQuMDc5LDAsNDMuNDE0LDAsNDMuNDE0DQoJCWMwLDguNDQ1LTcuMDY0LDE2LjI4Mi0xNy4wNjIsMTguNzY1YzguMTM3LDQuMjcxLDE3LjM5Myw2LjcwMSwyNy4yMjEsNi43MDFjMzIuMzk1LDAsNTguNjU2LTI2LjI2Miw1OC42NTYtNTguNjU2DQoJCUMxNTguNjU2LDg5LjIxNiwxNTUuNzMyLDc5LjExOSwxNTAuNjU0LDcwLjQzN3oiLz4NCjwvZz4NCjwvc3ZnPg0K"

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxyZWN0IHg9IjEuMzMzIiB5PSI1LjYyIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMTEuNjY2IiBoZWlnaHQ9IjM4LjMzMyIvPg0KCTxyZWN0IHg9IjE2Ljc0OSIgeT0iMTUuMDM2IiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iOS43NSIgaGVpZ2h0PSIyOC45MTciLz4NCgk8cmVjdCB4PSIzMC44MzIiIHk9IjkuMzciIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSI0Ljg3NiIgaGVpZ2h0PSIzNC41ODMiLz4NCgkNCgkJPHJlY3QgeD0iNDEuNTQiIHk9IjE3Ljk1NCIgdHJhbnNmb3JtPSJtYXRyaXgoMC45Mzc1IC0wLjM0OCAwLjM0OCAwLjkzNzUgLTcuOTUyIDE3LjYyNzkpIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iNy4xMjYiIGhlaWdodD0iMjYiLz4NCjwvZz4NCjwvc3ZnPg0K"

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCQ0KCQk8cmVjdCB4PSIxLjMzMyIgeT0iNS44MzMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjExLjY2NyIgaGVpZ2h0PSIzOC4zMzMiLz4NCgk8cmVjdCB4PSIxNi43NSIgeT0iMTUuMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjkuNzUiIGhlaWdodD0iMjguOTE3Ii8+DQoJDQoJCTxyZWN0IHg9IjMwLjgzMyIgeT0iOS41ODMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjQuODc2IiBoZWlnaHQ9IjM0LjU4MyIvPg0KCTxyZWN0IHg9IjQxLjU0MSIgeT0iMTguMTY3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSI3LjEyNiIgaGVpZ2h0PSIyNiIvPg0KPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iNS40NzMsNS40NzcgMTMuMjI4LDUuNDc3IA0KCQkJMTMuMjI4LDQuMjQyIDQuMjM0LDQuMjQyIDQuMjM0LDEzLjIzNCA1LjQ3MywxMy4yMzQgCQkiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNS40NzMsNS40NzciLz4NCgkJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjM2Ljc4Myw0LjI0MiAzNi43ODMsNS40NzcgDQoJCQk0NC41NDEsNS40NzcgNDQuNTQxLDEzLjIzNCA0NS43NzcsMTMuMjM0IDQ1Ljc3Nyw0LjI0MiAJCSIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0zNi43ODMsNC4yNDIiLz4NCgkJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjUuNDU5LDM2Ljc2IDQuMjIyLDM2Ljc2IA0KCQkJNC4yMjIsNDUuNzU4IDEzLjIxNyw0NS43NTggMTMuMjE3LDQ0LjUyMSA1LjQ1OSw0NC41MjEgCQkiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNS40NTksMzYuNzYiLz4NCgkJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjQ0LjUyOSw0NC41MjEgMzYuNzcxLDQ0LjUyMSANCgkJCTM2Ljc3MSw0NS43NTggNDUuNzY2LDQ1Ljc1OCA0NS43NjYsMzYuNzYgNDQuNTI5LDM2Ljc2IAkJIi8+DQoJPC9nPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNy4yOTEsMjcuMTUzbDMuODg0LDMuNDk2YzguMjM0LDcuNDEsMjAuNzMsNy40MSwyOC45NjQsMC4wMDFsMy44ODUtMy40OTdjMC43Ni0wLjY4NCwwLjc2LTEuODc1LDAtMi41NTkNCgkJCWwtMy44ODUtMy40OTZjLTguMjM0LTcuNDA5LTIwLjczLTcuNDA5LTI4Ljk2MywwbC0zLjg4NSwzLjQ5NkM2LjUzMSwyNS4yNzgsNi41MzEsMjYuNDcsNy4yOTEsMjcuMTUzeiBNMjUuNjU2LDE4Ljk4OA0KCQkJYzEuOTAyLDAsMy40NDMsMS41NDIsMy40NDMsMy40NDNzLTEuNTQxLDMuNDQyLTMuNDQzLDMuNDQyYy0xLjkwMSwwLTMuNDQyLTEuNTQxLTMuNDQyLTMuNDQyDQoJCQlDMjIuMjE0LDIwLjUyOSwyMy43NTUsMTguOTg4LDI1LjY1NiwxOC45ODh6IE0xMy4yMjgsMjIuMjU0YzEuNzA3LTEuNTM2LDQuMTA2LTIuMjIxLDYuMTQzLTNjLTAuMjQzLDAuNzA1LTAuNiwyLjM5MS0wLjYsMy4xNzgNCgkJCWMwLDMuODAzLDMuMDgzLDYuODg2LDYuODg1LDYuODg2YzMuODAzLDAsNi44ODctMy4wODMsNi44ODctNi44ODZjMC0wLjc4Ny0wLjMwNS0yLjMxNy0wLjU0Ny0zLjAyMQ0KCQkJYzIuMDM3LDAuNzc4LDQuNDc5LDEuNzU1LDYuMTg4LDMuMjkxbDMuOTM4LDMuNDI0bC0zLjUzMSwzLjM0OGMtNi45MjQsNi4yMzEtMTguOTE5LDYuMjYzLTI1Ljg0NCwwLjAzMWwtMy44NzUtMy42Mw0KCQkJTDEzLjIyOCwyMi4yNTR6Ii8+DQoJCTxjaXJjbGUgZmlsbD0iI0ZGRkZGRiIgY3g9IjI1LjYzIiBjeT0iMjIuNzAxIiByPSI0Ljc1OSIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K"

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSI1LjQ3Myw1LjQ3NyAxMy4yMjgsNS40NzcgDQoJCTEzLjIyOCw0LjI0MiA0LjIzNCw0LjI0MiA0LjIzNCwxMy4yMzQgNS40NzMsMTMuMjM0IAkiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik01LjQ3Myw1LjQ3NyIvPg0KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIzNi43ODMsNC4yNDIgMzYuNzgzLDUuNDc3IA0KCQk0NC41NDEsNS40NzcgNDQuNTQxLDEzLjIzNCA0NS43NzcsMTMuMjM0IDQ1Ljc3Nyw0LjI0MiAJIi8+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMzYuNzgzLDQuMjQyIi8+DQoJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjUuNDU5LDM2Ljc2IDQuMjIyLDM2Ljc2IA0KCQk0LjIyMiw0NS43NTggMTMuMjE3LDQ1Ljc1OCAxMy4yMTcsNDQuNTIxIDUuNDU5LDQ0LjUyMSAJIi8+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNS40NTksMzYuNzYiLz4NCgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iNDQuNTI5LDQ0LjUyMSAzNi43NzEsNDQuNTIxIA0KCQkzNi43NzEsNDUuNzU4IDQ1Ljc2Niw0NS43NTggNDUuNzY2LDM2Ljc2IDQ0LjUyOSwzNi43NiAJIi8+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxjaXJjbGUgZmlsbD0iIzY2NjY2NiIgY3g9IjE1IiBjeT0iNC45MTUiIHI9IjIuMzM0Ii8+DQoJPGNpcmNsZSBmaWxsPSIjNjY2NjY2IiBjeD0iMTUiIGN5PSIxNS4yMTEiIHI9IjIuMzM0Ii8+DQoJPGNpcmNsZSBmaWxsPSIjNjY2NjY2IiBjeD0iMTUiIGN5PSIyNS4wODYiIHI9IjIuMzM0Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik00Mi44MTUsMjguNDM0aC0xNWMtMC42OSwwLTEuMjUsMC41NTktMS4yNSwxLjI1djE1YzAsMC42OTEsMC41NiwxLjI1LDEuMjUsMS4yNWgxNQ0KCQljMC42OTEsMCwxLjI1LTAuNTU5LDEuMjUtMS4yNXYtMTVDNDQuMDY1LDI4Ljk5Miw0My41MDcsMjguNDM0LDQyLjgxNSwyOC40MzR6Ii8+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTM5LjkyNSw0LjEyMUwyNS41ODMsOC41MTRjLTAuNjYxLDAuMjAyLTEuMDMxLDAuOS0wLjgyOSwxLjU2Mmw0LjM5MiwxNC4zNDINCgkJYzAuMjAzLDAuNjYyLDAuOTAxLDEuMDMyLDEuNTYxLDAuODI5bDE0LjM0NC00LjM5M2MwLjY2LTAuMjAxLDEuMDMtMC44OTksMC44MjgtMS41Nkw0MS40ODUsNC45NDkNCgkJQzQxLjI4Myw0LjI4OSw0MC41ODYsMy45MTksMzkuOTI1LDQuMTIxeiIvPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yMC4zMTYsNS45MzRoLTE1Yy0wLjY5LDAtMS4yNSwwLjU1OS0xLjI1LDEuMjV2MTVjMCwwLjY5MSwwLjU2LDEuMjUsMS4yNSwxLjI1aDE1DQoJCWMwLjY5LDAsMS4yNS0wLjU1OSwxLjI1LTEuMjV2LTE1QzIxLjU2Niw2LjQ5MiwyMS4wMDYsNS45MzQsMjAuMzE2LDUuOTM0eiIvPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yMC4zMTYsMjguNDM0aC0xNWMtMC42OSwwLTEuMjUsMC41NTktMS4yNSwxLjI1djE1YzAsMC42OTEsMC41NiwxLjI1LDEuMjUsMS4yNWgxNQ0KCQljMC42OSwwLDEuMjUtMC41NTksMS4yNS0xLjI1di0xNUMyMS41NjYsMjguOTkyLDIxLjAwNiwyOC40MzQsMjAuMzE2LDI4LjQzNHoiLz4NCjwvZz4NCjwvc3ZnPg0K"

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTQzLjc1LDI3LjVoLTE1Yy0wLjY5MSwwLTEuMjUsMC41NTktMS4yNSwxLjI1DQoJCXYxNWMwLDAuNjkxLDAuNTU5LDEuMjUsMS4yNSwxLjI1aDE1YzAuNjkxLDAsMS4yNS0wLjU1OSwxLjI1LTEuMjV2LTE1QzQ1LDI4LjA1OSw0NC40NDEsMjcuNSw0My43NSwyNy41eiBNNDMuNzUsNWgtMTUNCgkJYy0wLjY5MSwwLTEuMjUsMC41NTktMS4yNSwxLjI1djE1YzAsMC42OTEsMC41NTksMS4yNSwxLjI1LDEuMjVoMTVjMC42OTEsMCwxLjI1LTAuNTU5LDEuMjUtMS4yNXYtMTVDNDUsNS41NTksNDQuNDQxLDUsNDMuNzUsNXoNCgkJIE0yMS4yNSw1aC0xNUM1LjU2LDUsNSw1LjU1OSw1LDYuMjV2MTVjMCwwLjY5MSwwLjU2MSwxLjI1LDEuMjUsMS4yNWgxNWMwLjY4OSwwLDEuMjUtMC41NTksMS4yNS0xLjI1di0xNQ0KCQlDMjIuNSw1LjU1OSwyMS45MzksNSwyMS4yNSw1eiBNMjEuMjUsMjcuNWgtMTVDNS41NiwyNy41LDUsMjguMDU5LDUsMjguNzV2MTVDNSw0NC40NDEsNS41Niw0NSw2LjI1LDQ1aDE1DQoJCWMwLjY4OSwwLDEuMjUtMC41NTksMS4yNS0xLjI1di0xNUMyMi41LDI4LjA1OSwyMS45MzksMjcuNSwyMS4yNSwyNy41eiIvPg0KPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0zOC4yMDUsNDYuMDcxYy0wLjExOSwwLTAuMjM5LTAuMDI4LTAuMzQ5LTAuMDg2TDI1LDM5LjIyOGwtMTIuODU2LDYuNzU4DQoJCWMtMC4xMSwwLjA1OC0wLjIyOSwwLjA4Ni0wLjM0OSwwLjA4NmMtMC4xNTUsMC0wLjMxLTAuMDQ4LTAuNDQxLTAuMTQ0Yy0wLjIzMS0wLjE2OC0wLjM0Ny0wLjQ1Mi0wLjI5OC0wLjczM2wyLjQ1Ni0xNC4zMTQNCgkJTDMuMTEsMjAuNzQxYy0wLjIwNS0wLjE5OS0wLjI3OC0wLjQ5OC0wLjE5LTAuNzY5YzAuMDg4LTAuMjcxLDAuMzIzLTAuNDY5LDAuNjA1LTAuNTFsMTQuMzc0LTIuMDlsNi40MjgtMTMuMDI1DQoJCUMyNC40NTMsNC4wOTEsMjQuNzE0LDMuOTI5LDI1LDMuOTI5czAuNTQ2LDAuMTYyLDAuNjcyLDAuNDE4bDYuNDMsMTMuMDI1bDE0LjM3NCwyLjA5YzAuMjgyLDAuMDQxLDAuNTE3LDAuMjM5LDAuNjA0LDAuNTENCgkJYzAuMDg5LDAuMjcxLDAuMDE1LDAuNTctMC4xODksMC43NjlMMzYuNDg5LDMwLjg4bDIuNDU1LDE0LjMxNGMwLjA0OCwwLjI4MS0wLjA2NywwLjU2NS0wLjI5OSwwLjczMw0KCQlDMzguNTE2LDQ2LjAyMywzOC4zNiw0Ni4wNzEsMzguMjA1LDQ2LjA3MXoiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjUsNC42NzlsNi42MDQsMTMuMzc5bDE0Ljc2NCwyLjE0NkwzNS42ODQsMzAuNjE4bDIuNTIxLDE0LjcwM0wyNSwzOC4zOGwtMTMuMjA1LDYuOTQxbDIuNTIyLTE0LjcwMw0KCQlMMy42MzMsMjAuMjA0bDE0Ljc2NC0yLjE0NkwyNSw0LjY3OSBNMjUsMy4xNzlMMjUsMy4xNzljLTAuNTcxLDAtMS4wOTIsMC4zMjQtMS4zNDUsMC44MzZsLTYuMjUzLDEyLjY3MkwzLjQxNywxOC43Mg0KCQljLTAuNTY1LDAuMDgyLTEuMDM0LDAuNDc4LTEuMjExLDEuMDIxYy0wLjE3NiwwLjU0My0wLjAyOSwxLjEzOSwwLjM4LDEuNTM4bDEwLjExOCw5Ljg2M2wtMi4zODksMTMuOTI2DQoJCWMtMC4wOTYsMC41NjMsMC4xMzUsMS4xMzIsMC41OTcsMS40NjhjMC4yNjEsMC4xODksMC41NzEsMC4yODYsMC44ODIsMC4yODZjMC4yMzksMCwwLjQ3OS0wLjA1NywwLjY5OC0wLjE3MkwyNSw0MC4wNzQNCgkJbDEyLjUwNyw2LjU3NWMwLjIyLDAuMTE1LDAuNDU5LDAuMTcyLDAuNjk4LDAuMTcyYzAuMzExLDAsMC42Mi0wLjA5NywwLjg4Mi0wLjI4NmMwLjQ2Mi0wLjMzNiwwLjY5My0wLjkwNCwwLjU5Ny0xLjQ2OA0KCQlsLTIuMzg5LTEzLjkyNmwxMC4xMTktOS44NjNjMC40MDktMC4zOTgsMC41NTYtMC45OTUsMC4zOC0xLjUzOGMtMC4xNzctMC41NDMtMC42NDYtMC45MzktMS4yMTEtMS4wMjFMMzIuNiwxNi42ODdMMjYuMzQ1LDQuMDE1DQoJCUMyNi4wOTIsMy41MDMsMjUuNTcsMy4xNzksMjUsMy4xNzlMMjUsMy4xNzl6Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yNSw0LjY3OWw2LjYwMywxMy4zNzlsMTQuNzY0LDIuMTQ2TDM1LjY4NCwzMC42MThsMi41MjIsMTQuNzAzTDI1LDM4LjM4bC0xMy4yMDUsNi45NDFsMi41MjEtMTQuNzAzDQoJCUwzLjYzNCwyMC4yMDRsMTQuNzY0LTIuMTQ2TDI1LDQuNjc5IE0yNSwzLjE3OWMtMC41NzEsMC0xLjA5MiwwLjMyNC0xLjM0NSwwLjgzNmwtNi4yNTMsMTIuNjcyTDMuNDE4LDE4LjcyDQoJCWMtMC41NjUsMC4wODItMS4wMzQsMC40NzgtMS4yMTEsMS4wMjFjLTAuMTc2LDAuNTQzLTAuMDI5LDEuMTM5LDAuMzgsMS41MzhsMTAuMTE4LDkuODYzbC0yLjM4OCwxMy45MjYNCgkJYy0wLjA5NiwwLjU2MywwLjEzNSwxLjEzMiwwLjU5NywxLjQ2OGMwLjI2MSwwLjE4OSwwLjU3MSwwLjI4NiwwLjg4MiwwLjI4NmMwLjIzOSwwLDAuNDc5LTAuMDU3LDAuNjk4LTAuMTcyTDI1LDQwLjA3NA0KCQlsMTIuNTA4LDYuNTc1YzAuMjIsMC4xMTUsMC40NTksMC4xNzIsMC42OTgsMC4xNzJjMC4zMTEsMCwwLjYyLTAuMDk3LDAuODgyLTAuMjg2YzAuNDYyLTAuMzM2LDAuNjkzLTAuOTA0LDAuNTk3LTEuNDY4DQoJCWwtMi4zOS0xMy45MjZsMTAuMTE4LTkuODYzYzAuNDA5LTAuMzk4LDAuNTU2LTAuOTk1LDAuMzgtMS41MzhjLTAuMTc3LTAuNTQzLTAuNjQ2LTAuOTM5LTEuMjExLTEuMDIxbC0xMy45ODMtMi4wMzNMMjYuMzQ1LDQuMDE1DQoJCUMyNi4wOTMsMy41MDMsMjUuNTcxLDMuMTc5LDI1LDMuMTc5TDI1LDMuMTc5eiIvPg0KPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxjaXJjbGUgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBjeD0iMjQuODgxIiBjeT0iMTUuOTU3IiByPSI5LjU4Ii8+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNS4wODMsNDMuNjIxYzAsMCwxLjkxOC0xMi41ODQsMTEuOTE4LTEyLjU4NA0KCQloMTYuMTY2YzAsMCwxMC44MzQsMCwxMS43NSwxMi41ODRINS4wODN6Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBjeD0iMjQuODgxIiBjeT0iMTUuOTU3IiByPSI5LjU4Ii8+DQoJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNS4wODMsNDMuNjIxYzAsMCwxLjkxNy0xMi41ODQsMTEuOTE3LTEyLjU4NA0KCQloMTYuMTY3YzAsMCwxMC44MzQsMCwxMS43NSwxMi41ODRINS4wODN6Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTAwcHgiIGhlaWdodD0iMTAwcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0zMi41NDcsODMuNzc5YzEuMzU1LDEuNDA0LDMuNjEyLDEuNDA0LDUuMDE2LDBjMS4zNTUtMS4zNTUsMS4zNTUtMy42MTIsMC00Ljk2NkwxMi4xMzcsNTMuMzkxaDgzLjkwMQ0KCWMxLjk1Ni0wLjAwNiwzLjUxMS0xLjU2MSwzLjUxMS0zLjUxNGMwLTEuOTU3LTEuNTU1LTMuNTYyLTMuNTExLTMuNTYySDEyLjEzN2wyNS40MjYtMjUuMzc4YzEuMzU1LTEuNDAzLDEuMzU1LTMuNjYyLDAtNS4wMTMNCgljLTEuNDA0LTEuNDA0LTMuNjYxLTEuNDA0LTUuMDE2LDBMMS4xMDEsNDcuMzY4Yy0xLjQwMiwxLjM1NS0xLjQwMiwzLjYxMSwwLDQuOTY0TDMyLjU0Nyw4My43Nzl6Ii8+DQo8L3N2Zz4NCg=="

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8Zz4NCgkJCTxwYXRoIGQ9Ik0xMS40NTIsMjYuMzkyYzAsMC4wMDYsMCwwLjAxNSwwLDAuMDIyYzAsMS45NTgsMS41ODgsMy41NDgsMy41NDgsMy41NDhjMS45NTksMCwzLjU0OC0xLjU5LDMuNTQ4LTMuNTQ4DQoJCQkJYzAtMC4wMDgsMC0wLjAxNywwLTAuMDIySDExLjQ1MnoiLz4NCgkJCTxwYXRoIGQ9Ik0yNi4zMjcsMjEuOTU1bC0zLjE5Mi00LjY5YzAtMS40MzYsMC00Ljk0NCwwLTUuODUyYzAtMy45NDYtMi44MTItNy4yMzYtNi41NC03Ljk3OFYxLjYzMw0KCQkJCWMwLTAuODgxLTAuNzEzLTEuNTk1LTEuNTk1LTEuNTk1cy0xLjU5NSwwLjcxNC0xLjU5NSwxLjU5NXYxLjgwMmMtMy43MjksMC43NDItNi41NCw0LjAzMS02LjU0LDcuOTc4YzAsMS41NDUsMCw0Ljk1NiwwLDUuODUyDQoJCQkJbC0zLjE5Myw0LjY5QzMuMzM1LDIyLjQ0OSwzLjMsMjMuMDksMy41OCwyMy42MTdjMC4yNzksMC41MjgsMC44MjgsMC44NTksMS40MjYsMC44NTloMTkuOTg5YzAuNTk4LDAsMS4xNDYtMC4zMzEsMS40MjYtMC44NTkNCgkJCQlDMjYuNywyMy4wODksMjYuNjY0LDIyLjQ0OSwyNi4zMjcsMjEuOTU1eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGlkPSJzZXR0aW5nc18xXyIgZD0iTTI4LjUwOSwxMi44NzdsLTIuODg3LTAuNDgxYy0wLjIxMS0wLjg1OC0wLjUxOC0xLjY3OC0wLjkxNi0yLjQ0M2wxLjg1LTIuMjkyDQoJCWMwLjM5My0wLjQ4NCwwLjM3NS0xLjE4MS0wLjAzOS0xLjY0OGwtMS4xNDgtMS4yOTJjLTAuNDE2LTAuNDY3LTEuMTA3LTAuNTY2LTEuNjMzLTAuMjMzbC0yLjQ3MSwxLjU1Mw0KCQljLTEuMDg2LTAuNzU5LTIuMzE2LTEuMzE5LTMuNjQ1LTEuNjQ1bC0wLjQ4Mi0yLjkwM2MtMC4xMDItMC42MTUtMC42MzMtMS4wNjYtMS4yNTgtMS4wNjZoLTEuNzNjLTAuNjIzLDAtMS4xNTYsMC40NTEtMS4yNTYsMS4wNjYNCgkJbC0wLjQ4NiwyLjkwNGMtMS4wOTgsMC4yNjktMi4xMjUsMC43MDItMy4wNjQsMS4yNzRsLTIuMzUtMS42NzZDNi40ODcsMy42Myw1Ljc5MiwzLjY4Nyw1LjM1MSw0LjEyOEw0LjEyOCw1LjM1Mg0KCQlDMy42ODcsNS43OTMsMy42Myw2LjQ4OCwzLjk5Myw2Ljk5NWwxLjY4LDIuMzUzYy0wLjU2NCwwLjkzMi0wLjk5NCwxLjk1NS0xLjI2NCwzLjA0MmwtMi45MiwwLjQ4Nw0KCQljLTAuNjEzLDAuMTAyLTEuMDY0LDAuNjM0LTEuMDY0LDEuMjU4djEuNzI5YzAsMC42MjUsMC40NTEsMS4xNTcsMS4wNjQsMS4yNTlsMi45MiwwLjQ4N2MwLjIyMSwwLjg5NSwwLjU0MSwxLjc1LDAuOTY3LDIuNTQzDQoJCWwtMS44NCwyLjI3OWMtMC4zOTMsMC40ODMtMC4zNzUsMS4xODEsMC4wMzksMS42NDhsMS4xNDYsMS4yOTJjMC40MTgsMC40NjgsMS4xMDcsMC41NjUsMS42MzUsMC4yMzNsMi41MDYtMS41NzQNCgkJYzEuMDU5LDAuNzI1LDIuMjU4LDEuMjU4LDMuNTQ1LDEuNTc0bDAuNDg2LDIuOTAzYzAuMSwwLjYxNCwwLjYzMywxLjA2NSwxLjI1NiwxLjA2NWgxLjczYzAuNjI1LDAsMS4xNTYtMC40NTEsMS4yNTgtMS4wNjUNCgkJbDAuNDg0LTIuOTAzYzEuMDg0LTAuMjY2LDIuMS0wLjY5MSwzLjAyOS0xLjI1M2wyLjQ0NywxLjc0N2MwLjUwNiwwLjM2MywxLjIwMSwwLjMwNywxLjY0My0wLjEzNmwxLjIyMy0xLjIyNA0KCQljMC40MzktMC40NCwwLjUtMS4xMzUsMC4xMzUtMS42NDNsLTEuNzQyLTIuNDQxYzAuNTY4LTAuOTM2LDAuOTk4LTEuOTYsMS4yNjYtMy4wNTNsMi44ODktMC40ODINCgkJYzAuNjE1LTAuMTAxLDEuMDY0LTAuNjMzLDEuMDY0LTEuMjU4di0xLjcyOUMyOS41NzUsMTMuNTExLDI5LjEyNCwxMi45NzksMjguNTA5LDEyLjg3N3ogTTE1LjA0NiwyMC40NjYNCgkJYy0zLjAxOCwwLTUuNDY3LTIuNDQ4LTUuNDY3LTUuNDY1YzAtMy4wMTksMi40NDktNS40NjcsNS40NjctNS40NjdzNS40NjUsMi40NDgsNS40NjUsNS40NjcNCgkJQzIwLjUxMSwxOC4wMTgsMTguMDYzLDIwLjQ2NiwxNS4wNDYsMjAuNDY2eiIvPg0KPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjUuNDMsNC41N2MtNS43NTktNS43Ni0xNS4xLTUuNzYxLTIwLjg2LDBjLTUuNzYsNS43Ni01Ljc2LDE1LjA5OSwwLDIwLjg1OWM1Ljc2LDUuNzYsMTUuMSw1Ljc2MSwyMC44NiwwDQoJCQlTMzEuMTg4LDEwLjMzLDI1LjQzLDQuNTd6IE0xNi45MjQsMjEuNDEzYzAsMS4wNjItMC44NjIsMS45MjQtMS45MjUsMS45MjRzLTEuOTI0LTAuODYyLTEuOTI0LTEuOTI0di03LjY5Ng0KCQkJYzAtMS4wNjIsMC44NjEtMS45MjQsMS45MjQtMS45MjRzMS45MjUsMC44NjIsMS45MjUsMS45MjRWMjEuNDEzeiBNMTQuOTY1LDEwLjQyOWMtMS4xMDgsMC0xLjg0Ny0wLjc4NC0xLjgyMy0xLjc1NA0KCQkJYy0wLjAyMy0xLjAxNywwLjcxNS0xLjc3NywxLjg0Ni0xLjc3N2MxLjEzMywwLDEuODQ4LDAuNzYzLDEuODcxLDEuNzc3QzE2Ljg1Nyw5LjY0NSwxNi4xMiwxMC40MjksMTQuOTY1LDEwLjQyOXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGQ9Ik0yOS43OTUsMS4yOGMtMC4xMzQtMC4xMTgtMC4zMjMtMC4xNDUtMC40ODQtMC4wN0wwLjMxMiwxNC42ODNjLTAuMTU1LDAuMDczLTAuMjU2LDAuMjI4LTAuMjU3LDAuNA0KCWMtMC4wMDIsMC4xNzIsMC4wOTQsMC4zMywwLjI1LDAuNDA2bDguMjA1LDQuMDI2YzAuMTUsMC4wNzMsMC4zMywwLjA1NywwLjQ2Ni0wLjA0M2w3Ljk3OS01Ljk2M2wtNi4yNjYsNi40NDMNCgljLTAuMDg5LDAuMDkyLTAuMTMzLDAuMjE4LTAuMTI0LDAuMzQ1bDAuNjIzLDguMTIyYzAuMDE1LDAuMTgxLDAuMTM2LDAuMzM0LDAuMzA3LDAuMzkxYzAuMDQ2LDAuMDE1LDAuMDkzLDAuMDIyLDAuMTM5LDAuMDIyDQoJYzAuMTI4LDAsMC4yNTItMC4wNTUsMC4zNC0wLjE1NWw0LjM1NC01LjA0N2w1LjM4NiwyLjU3MmMwLjExNywwLjA1NiwwLjI1LDAuMDU5LDAuMzcxLDAuMDA4YzAuMTE2LTAuMDUzLDAuMjA4LTAuMTUzLDAuMjQ2LTAuMjc2DQoJbDcuNTk0LTI0LjE4NUMyOS45NzksMS41OCwyOS45MjcsMS4zOTYsMjkuNzk1LDEuMjh6Ii8+DQo8L3N2Zz4NCg=="

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0yNC42MjYsMTIuMTkyaC0wLjU2N1Y5LjUzYzAtNC45MjQtMy45MDgtOS4wMzYtOC43OTItOS4xMjRjLTAuMTMzLTAuMDAyLTAuMzk5LTAuMDAyLTAuNTMzLDANCgkJYy00Ljg4MywwLjA4OC04Ljc5MSw0LjItOC43OTEsOS4xMjR2Mi42NjJINS4zNzRjLTAuODc3LDAtMS41OTIsMC45MDUtMS41OTIsMi4wMjJ2MTMuMzUxYzAsMS4xMTYsMC43MTUsMi4wMjksMS41OTIsMi4wMjloMTkuMjUyDQoJCWMwLjg3NywwLDEuNTkyLTAuOTEzLDEuNTkyLTIuMDI5VjE0LjIxNUMyNi4yMTgsMTMuMDk4LDI1LjUwMywxMi4xOTIsMjQuNjI2LDEyLjE5MnogTTE2LjgwNCwyMC44Nzd2NC4wMzQNCgkJYzAsMC40NjItMC4zODcsMC44NTMtMC44NSwwLjg1M2gtMS45MDhjLTAuNDYzLDAtMC44NS0wLjM5MS0wLjg1LTAuODUzdi00LjAzNGMtMC40NDgtMC40NDItMC43MDktMS4wNTItMC43MDktMS43MjgNCgkJYzAtMS4yNzksMC45ODgtMi4zNzksMi4yNDYtMi40M2MwLjEzNC0wLjAwNSwwLjQtMC4wMDUsMC41MzMsMGMxLjI1OCwwLjA1MSwyLjI0NiwxLjE1LDIuMjQ2LDIuNDMNCgkJQzE3LjUxMywxOS44MjUsMTcuMjUyLDIwLjQzNSwxNi44MDQsMjAuODc3eiBNMjAuMzEsMTIuMTkyaC01LjA0M2gtMC41MzNIOS42OTFWOS41M2MwLTIuOTMzLDIuMzgzLTUuMzU3LDUuMzA5LTUuMzU3DQoJCWMyLjkyNSwwLDUuMzEsMi40MjUsNS4zMSw1LjM1N1YxMi4xOTJMMjAuMzEsMTIuMTkyeiIvPg0KPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiMwMzAxMDQiIGQ9Ik0xNC44MTEsMC44MjlDNi45ODQsMC45MzQsMC43MjUsNy4zNjQsMC44MjksMTUuMTljMC4xMDQsNy44MjMsNi41MzUsMTQuMDg0LDE0LjM2LDEzLjk4DQoJCWM3LjgyNS0wLjEwNSwxNC4wODUtNi41MzUsMTMuOTgxLTE0LjM2MkMyOS4wNjYsNi45ODUsMjIuNjM2LDAuNzI1LDE0LjgxMSwwLjgyOXogTTE0Ljc2OSwyMy42MjZsLTAuMDc4LTAuMDAxDQoJCWMtMS4yMDUtMC4wMzYtMi4wNTUtMC45MjQtMi4wMjEtMi4xMTFjMC4wMzMtMS4xNjcsMC45MDMtMi4wMTQsMi4wNjktMi4wMTRsMC4wNywwLjAwMWMxLjIzOCwwLjAzNiwyLjA3OCwwLjkxNiwyLjA0NCwyLjEzNw0KCQlDMTYuODE5LDIyLjgwOSwxNS45NjIsMjMuNjI2LDE0Ljc2OSwyMy42MjZ6IE0xOS44MzksMTMuNTY0Yy0wLjI4NCwwLjQwMy0wLjkwNywwLjkwMy0xLjY5MiwxLjUxNWwtMC44NjUsMC41OTgNCgkJYy0wLjQ3NSwwLjM2OC0wLjc2MSwwLjcxNS0wLjg2OCwxLjA1OGMtMC4wODUsMC4yNjktMC4xMjcsMC4zNDEtMC4xMzUsMC44ODh2MC4xMzloLTMuMzAzbDAuMDEtMC4yNzkNCgkJYzAuMDQtMS4xNDgsMC4wNjgtMS44MjUsMC41NDUtMi4zODNjMC43NDYtMC44NzcsMi4zOTUtMS45MzgsMi40NjUtMS45ODJjMC4yMzQtMC4xNzksMC40MzQtMC4zODEsMC41ODItMC41OTcNCgkJYzAuMzQ2LTAuNDc5LDAuNS0wLjg1NCwwLjUtMS4yMjRjMC0wLjUxNC0wLjE1Mi0wLjk4Ny0wLjQ1My0xLjQxYy0wLjI4OS0wLjQwNy0wLjg0LTAuNjEzLTEuNjM0LTAuNjEzDQoJCWMtMC43ODgsMC0xLjMyNywwLjI1LTEuNjUxLDAuNzYzYy0wLjMzMiwwLjUyNy0wLjUsMS4wODItMC41LDEuNjQ4djAuMTQySDkuNDM1bDAuMDA2LTAuMTQ3YzAuMDg5LTIuMDg2LDAuODMyLTMuNTg4LDIuMjExLTQuNDY0DQoJCWMwLjg2Ny0wLjU1OCwxLjk0NS0wLjg0MSwzLjIwNC0wLjg0MWMxLjY0NiwwLDMuMDM3LDAuNCw0LjEzMiwxLjE5YzEuMTA5LDAuOCwxLjY3MiwxLjk5NywxLjY3MiwzLjU2DQoJCUMyMC42NTksMTEuOTk3LDIwLjM4MywxMi44MTgsMTkuODM5LDEzLjU2NHoiLz4NCjwvZz4NCjwvc3ZnPg0K"

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTAwcHgiIGhlaWdodD0iMTAwcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxyZWN0IHg9IjAuMDM1IiB5PSIxMi42MTMiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSI3OC42MTciIGhlaWdodD0iNy41NiIvPg0KCTxyZWN0IHg9IjIxLjI0MSIgeT0iNDcuMjEiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSI3OC42MTgiIGhlaWdodD0iNy41NjMiLz4NCgk8cmVjdCB4PSIwLjAzNSIgeT0iODEuODExIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iNzguNjE3IiBoZWlnaHQ9IjcuNTYzIi8+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(71)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(40),
  /* template */
  __webpack_require__(127),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(59)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(41),
  /* template */
  __webpack_require__(115),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(62)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(42),
  /* template */
  __webpack_require__(118),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(58)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(43),
  /* template */
  __webpack_require__(114),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(60)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(44),
  /* template */
  __webpack_require__(116),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(63)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(45),
  /* template */
  __webpack_require__(119),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(66)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(46),
  /* template */
  __webpack_require__(122),
  /* scopeId */
  "data-v-751e3f67",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(68)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(47),
  /* template */
  __webpack_require__(124),
  /* scopeId */
  "data-v-7a551596",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(57)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(48),
  /* template */
  __webpack_require__(113),
  /* scopeId */
  "data-v-02b30c18",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(65)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(49),
  /* template */
  __webpack_require__(121),
  /* scopeId */
  "data-v-5b69e98b",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(67)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(50),
  /* template */
  __webpack_require__(123),
  /* scopeId */
  "data-v-78c132f2",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(61)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(51),
  /* template */
  __webpack_require__(117),
  /* scopeId */
  "data-v-2cadbd68",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(70)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(52),
  /* template */
  __webpack_require__(126),
  /* scopeId */
  "data-v-bf5f9262",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(56)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(53),
  /* template */
  __webpack_require__(112),
  /* scopeId */
  "data-v-00d483e6",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(69)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(125),
  /* scopeId */
  "data-v-9dacc81e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "memberPage",
    attrs: {
      "id": "submit"
    }
  }, [_c('form', {
    attrs: {
      "id": "submitForm"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "ctrl"
  }, [_c('input', {
    attrs: {
      "type": "submit",
      "value": "確認"
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "reset",
      "value": "取消"
    },
    on: {
      "click": _vm.back
    }
  })])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ctx"
  }, [_c('div', [_c('p', [_vm._v("電子郵件")]), _vm._v(" "), _c('p', [_c('input', {
    attrs: {
      "type": "email",
      "name": "account",
      "placeholder": "email@address",
      "required": ""
    }
  })])]), _vm._v(" "), _c('div', [_c('p', [_vm._v("密碼")]), _vm._v(" "), _c('p', [_c('input', {
    attrs: {
      "type": "password",
      "name": "password",
      "placeholder": "password",
      "minlength": "8",
      "required": ""
    }
  })])]), _vm._v(" "), _c('div', [_c('p', [_vm._v("確認密碼")]), _vm._v(" "), _c('p', [_c('input', {
    attrs: {
      "type": "password",
      "name": "password_confirm",
      "placeholder": "confirm password",
      "required": ""
    }
  })])]), _vm._v(" "), _c('div', [_c('p', [_vm._v("姓名")]), _vm._v(" "), _c('p', [_c('input', {
    attrs: {
      "type": "name",
      "name": "name",
      "placeholder": "name",
      "required": ""
    }
  })])]), _vm._v(" "), _c('div', [_c('p', [_vm._v("聯絡電話")]), _vm._v(" "), _c('p', [_c('input', {
    attrs: {
      "type": "tel",
      "name": "tel",
      "placeholder": "phone",
      "required": ""
    }
  })])])])
}]}

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "feature"
    }
  }, [_c('ul', {
    staticClass: "fea-items"
  }, _vm._l((_vm.items), function(item, i) {
    return _c('li', {
      staticClass: "fea-item",
      on: {
        "click": function($event) {
          _vm.link(item.url)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": item.img,
        "alt": item.name
      }
    })])
  }))])
},staticRenderFns: []}

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "head"
    }
  }, [_c('div', {
    attrs: {
      "id": "menuBtn"
    },
    on: {
      "click": _vm.btnClick
    }
  }, [_c('div', {
    staticClass: "svg-icon"
  }, [_c('img', {
    attrs: {
      "src": _vm.iconMenu,
      "alt": ""
    }
  })])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_c('div', [_vm._v(_vm._s(_vm.title))])])], 1)
},staticRenderFns: []}

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "menu"
    }
  }, [_c('div', {
    staticClass: "area",
    class: {
      'active': _vm.sideMenu
    }
  }, [_vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', [_c('li', [_vm._v("A")]), _vm._v(" "), _c('li', [_vm._v("A")]), _vm._v(" "), _c('li', [_vm._v("A")]), _vm._v(" "), _c('li', [_vm._v("A")]), _vm._v(" "), _c('li', [_vm._v("A")])])
}]}

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "loading"
    }
  }, [_c('div', {
    staticClass: "spinner"
  }, [_c('div', {
    staticClass: "rect1"
  }), _vm._v(" "), _c('div', {
    staticClass: "rect2"
  }), _vm._v(" "), _c('div', {
    staticClass: "rect3"
  }), _vm._v(" "), _c('div', {
    staticClass: "rect4"
  }), _vm._v(" "), _c('div', {
    staticClass: "rect5"
  })])])
}]}

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "member"
    }
  }, [_c('div', {
    staticClass: "member-header"
  }, [_c('div', {
    staticClass: "avater"
  }, [_c('img', {
    attrs: {
      "src": _vm.avater,
      "alt": ""
    }
  })]), _vm._v(" "), (_vm.isLogin) ? _c('div', {
    staticClass: "content islogin"
  }, [_c('span', {
    staticClass: "userName"
  }, [_vm._v(_vm._s(_vm.user.name))]), _vm._v(" "), _c('div', {
    on: {
      "click": _vm.logout
    }
  }, [_vm._v("登出")])]) : _c('div', {
    staticClass: "content unlogin"
  }, [_c('router-link', {
    attrs: {
      "to": "/member/submit"
    }
  }, [_vm._v("註冊")]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/member/login"
    }
  }, [_vm._v("登入")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "member-settings"
  }, [_c('ul', [_vm._l((_vm.settings), function(s, i) {
    return _c('li', {
      class: {
        sperated: s.sperated
      }
    }, [_c('router-link', {
      attrs: {
        "to": s.url
      }
    }, [_c('span', {
      staticClass: "icon"
    }, [_c('img', {
      attrs: {
        "src": s.icon,
        "alt": s.name
      }
    })]), _vm._v(" "), _c('span', {
      staticClass: "title"
    }, [_vm._v(_vm._s(s.name))])])], 1)
  }), _vm._v(" "), _c('li', {
    on: {
      "click": _vm.clearStorage
    }
  }, [_vm._v("清除資料")])], 2)]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide"
    }
  }, [_c('router-view')], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "tutorial"
    }
  }, [_c('div', {
    staticClass: "steps",
    class: _vm.stepMove,
    style: (_vm.styleObj),
    attrs: {
      "data-step": _vm.stepCount
    },
    on: {
      "touchstart": _vm.touch,
      "touchmove": _vm.touch,
      "touchend": _vm.touch
    }
  }, _vm._l((_vm.tutorials), function(t, i) {
    return _c('div', {
      staticClass: "step",
      style: (_vm.stepBg(t.img))
    }, [_c('div', {
      staticClass: "text"
    }, [_vm._v(_vm._s(t.text))])])
  })), _vm._v(" "), _c('div', {
    attrs: {
      "id": "step-nav"
    }
  }, _vm._l((_vm.tutorials), function(t, i) {
    return _c('span', {
      class: _vm.isActive(i)
    })
  })), _vm._v(" "), _c('div', {
    staticClass: "start-btn",
    domProps: {
      "textContent": _vm._s(_vm.stepbtn)
    },
    on: {
      "click": _vm.startUse
    }
  })])
},staticRenderFns: []}

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "nav"
    }
  }, _vm._l((_vm.pages), function(page, i) {
    return _c('router-link', {
      key: page.iconName,
      attrs: {
        "to": '/' + page.iconName
      }
    }, [_c('div', {
      staticClass: "svg-icon"
    }, [_c('img', {
      attrs: {
        "src": _vm.icon(page.iconName),
        "alt": ""
      }
    })]), _vm._v(" "), _c('span', [_vm._v(_vm._s(page.title))])])
  }))
},staticRenderFns: []}

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('topHead'), _vm._v(" "), _c('div', {
    attrs: {
      "id": "main"
    }
  }, [_c('router-view', {
    staticClass: "mainView"
  })], 1), _vm._v(" "), _c('bottomNav'), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "mask"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.mask),
      expression: "mask"
    }],
    staticClass: "mask",
    on: {
      "click": function($event) {
        _vm.clickMask('off')
      }
    }
  })]), _vm._v(" "), _c('sideMenu'), _vm._v(" "), (_vm.isLoading) ? _c('loading') : _vm._e(), _vm._v(" "), (_vm.init) ? _c('Tutorial') : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "memberPage",
    attrs: {
      "id": "login"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "split-text"
  }, [_vm._v("或")]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "split-text"
  }, [_c('p', [_vm._v("還沒有帳號？"), _c('router-link', {
    attrs: {
      "to": "/member/submit",
      "replace": ""
    }
  }, [_vm._v("立即註冊")])], 1), _vm._v(" "), _c('p', [_vm._v("|")]), _vm._v(" "), _c('p', [_c('router-link', {
    attrs: {
      "to": "/member/forget?t=password"
    }
  }, [_vm._v("忘記密碼？")])], 1)]), _vm._v(" "), _vm._m(2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "oauth"
  }, [_c('div', {
    staticClass: "auth-fb"
  }, [_c('div', {
    staticClass: "oauth-img"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(16),
      "alt": ""
    }
  })]), _vm._v(" "), _c('p', [_vm._v("使用Facebook登入")])]), _vm._v(" "), _c('div', {
    staticClass: "auth-go"
  }, [_c('div', {
    staticClass: "oauth-img"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(17),
      "alt": ""
    }
  })]), _vm._v(" "), _c('p', [_vm._v("使用Google登入")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "trad-auth"
  }, [_c('form', {
    attrs: {
      "action": ""
    }
  }, [_c('p', [_c('input', {
    attrs: {
      "type": "email",
      "placeholder": "信箱",
      "name": "ac"
    }
  })]), _vm._v(" "), _c('p', [_c('input', {
    attrs: {
      "type": "password",
      "placeholder": "密碼",
      "name": "pw"
    }
  })])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "submit"
  }, [_c('button', {
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("登入")])])
}]}

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "bookcase"
    }
  }, [_c('div', {
    staticClass: "bkc-nav",
    attrs: {
      "data-name": _vm.bkcName
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/bookcase"
    }
  }, [_vm._v("購買記錄")]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/bookcase/watch"
    }
  }, [_vm._v("觀看記錄")])], 1), _vm._v(" "), _c('router-view', {
    staticClass: "bkc-view"
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "main"
    }
  })
},staticRenderFns: []}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "explore"
    }
  }, [_c('div', {
    staticClass: "exp-top"
  }, [_c('div', {
    staticClass: "bg-layer"
  }, [_c('img', {
    attrs: {
      "src": _vm.top.img,
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "text-layer"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(18),
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "context"
  }, [_c('span', [_vm._v("觀看")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.top.title))])])])]), _vm._v(" "), _c('div', {
    staticClass: "exp-items"
  }, [_c('ul', _vm._l((_vm.items), function(item, i) {
    return _c('li', [_c('div', {
      staticClass: "exp-item",
      on: {
        "click": function($event) {
          _vm.link(item.url)
        }
      }
    }, [_c('div', {
      staticClass: "bg-layer"
    }, [_c('img', {
      attrs: {
        "src": item.img,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "icon-layer"
    }, [_c('img', {
      attrs: {
        "src": item.icon,
        "alt": ""
      }
    }), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.name))])])])])
  }))])])
},staticRenderFns: []}

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "watch"
    },
    on: {
      "touchstart": _vm.touch,
      "touchmove": _vm.touch,
      "touchend": _vm.touch
    }
  }, [_c('ul', _vm._l((_vm.items), function(item, i) {
    return _c('li', {
      staticClass: "item"
    }, [_c('div', [_c('div', {
      staticClass: "cover"
    }, [_c('img', {
      attrs: {
        "src": item.img,
        "alt": ""
      }
    }), _c('span', [_vm._v(_vm._s(item.time))])]), _vm._v(" "), _c('div', {
      staticClass: "title"
    }, [_c('p', [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.parent))]), _vm._v(" "), _c('div', {
      staticClass: "more"
    }, [_c('div', {
      staticClass: "moreBtn",
      on: {
        "click": function($event) {
          _vm.moreOptionMenu(i)
        }
      }
    }), _vm._v(" "), _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item.isOpen),
        expression: "item.isOpen"
      }],
      staticClass: "moreMask",
      on: {
        "click": function($event) {
          if ($event.target !== $event.currentTarget) { return null; }
          return _vm.clickBody($event)
        }
      }
    }), _vm._v(" "), _c('ul', {
      class: {
        active: item.isOpen
      }
    }, [_c('li', [_vm._v("繼續觀看")]), _vm._v(" "), _c('li', [_vm._v("影片介紹")]), _vm._v(" "), _c('li', [_vm._v("回報")])])])])])])
  }))])
},staticRenderFns: []}

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "purchase"
    },
    on: {
      "touchstart": _vm.touch,
      "touchmove": _vm.touch,
      "touchend": _vm.touch
    }
  }, [_c('ul', _vm._l((_vm.items), function(item, i) {
    return _c('li', {
      staticClass: "item"
    }, [_c('div', [_c('div', {
      staticClass: "cover"
    }, [_c('img', {
      attrs: {
        "src": item.img,
        "alt": item.name
      }
    })]), _vm._v(" "), _c('p', {
      staticClass: "title"
    }, [_vm._v(_vm._s(item.name))])])])
  }))])
},staticRenderFns: []}

/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "item"
    }
  }, [_c('h2', [_vm._v(_vm._s(_vm.$route.params.id))])])
},staticRenderFns: []}

/***/ }),
/* 128 */,
/* 129 */,
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./icon-bookcase-active.svg": 78,
	"./icon-bookcase.svg": 79,
	"./icon-btn-fb.svg": 16,
	"./icon-btn-gp.svg": 17,
	"./icon-camera-active.svg": 80,
	"./icon-camera.svg": 81,
	"./icon-dotMenu.svg": 82,
	"./icon-explore-active.svg": 83,
	"./icon-explore.svg": 84,
	"./icon-feature-active.svg": 85,
	"./icon-feature.svg": 86,
	"./icon-member-active.svg": 87,
	"./icon-member.svg": 88,
	"./icon-play.svg": 18
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 130;

/***/ })
],[55]);
//# sourceMappingURL=app.5f7df6474811ac53e781.js.map