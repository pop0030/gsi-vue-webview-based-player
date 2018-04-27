import axios from 'axios'

const contentSDK = {}
const nav = navigator.userAgent
let canDownload = true

const os = function() {
	var os = ""
	if (/(Android)/i.test(nav)) {
		//console.log('android')
		os = "android"
	} else if (/(iPhone|iPad|iPod|iOS)/i.test(nav)) {
		//console.log('ios')
		os = "ios"
	} else {
		os = "pc"
	}
	return os
}

contentSDK.getDeviceId = function() {
	if (os == 'android') {
		//console.log("android")
		window.JSInterface.getDeviceId()
	} else if (os == 'ios') {
		//console.log("ios")
		location.href = 'app:$getDeviceId'
	} else {
		//console.log("pc")
	}
}

contentSDK.genToken = async function(deviceId, userId, getJWTTokenURL) {
	let jsonData = JSON.stringify({ "iss": "ubn.com", "company": "ubn", "awesome": true, "account": "u7481722", "deviceId": deviceId, "userId": userId })
	let strTime = new Date()
	let res = await axios({
		url: getJWTTokenURL,
		method: 'POST',
		responseType: "json",
		header: {
			'Content-Type': 'application/json',
		},
		data: jsonData
	})
	let endTime = new Date()
	let transTime = endTime - strTime
	//console.log(transTime+ 'ms')
	contentSDK.saveToken(res.returnToken)
	return res.data
}



contentSDK.sendAllContentId = function(strIds) {
	console.log(strIds)

	if (os == 'android') {
		//console.log("android")
		window.JSInterface.checkBookDownload(strIds)
	} else if (os == 'ios') {
		//console.log("ios")
		location.href = 'app:$checkBookDownload:$strIds=' + strIds
	} else {
		//console.log("pc")
	}

}

contentSDK.saveToken = function(token) {
	//console.log("os=" + os + "saveToken=" + token)

	if (os == 'android') {
		window.JSInterface.saveToken(token)
	} else if (os == 'ios') {
		location.href = 'app:$saveToken:$token=' + token
	}

}



contentSDK.checkBookDownload = function(strIds) {

}



contentSDK.downloadBookFile = function(contentId, token, cdn_url, imagePath) {
	//console.log('contentId==>' + contentId)
	//console.log('token==>' + token)
	//console.log('cdn_url==>' + cdn_url)
	//console.log('imagePath==>' + imagePath)
	if (canDownload) {
		if (os == 'android') {
			window.JSInterface.downloadBookFile(contentId, token, cdn_url, imagePath)
		} else if (os == 'ios') {
			location.href = 'app:$downloadBookFile:$contentId=' + contentId + '&token=' + token + '&cdn_url=' + encodeURI(cdn_url) + '&image_url=' + encodeURI(imagePath)
		}
		canDownload = false
	} else {
		alert('檔案尚在下載中，請稍後')
		return
	}
}



contentSDK.bindDownloadChanged = function(contentId, percent) {
	//console.log("percent=" + percent)
	if (percent == 100) {
		canDownload = true
	}
	bindDownloadChanged(contentId, percent)
}



contentSDK.openEPUB = function(contentId) {
	//console.log('open epub contentId=' + contentId)
	if (os == 'android') {
		window.JSInterface.openEPUB(contentId)
	} else if (os == 'ios') {
		location.href = 'app:$openEPUB:$contentId=' + contentId
	}

}



contentSDK.deleteBookFile = function(contentId) {

	if (os == 'android') {
		window.JSInterface.deleteBookFile(contentId)
	} else if (os == 'ios') {
		location.href = 'app:$deleteBookFile:$contentId=' + contentId
	}

}

contentSDK.deletedContentId = function(contentId) {

}

contentSDK.playMovie = function(contentPath) {
	if (os == 'android') {
		window.JSInterface.playMovie(contentPath)
	} else if (os == 'ios') {
		location.href = 'app:$playMovie:$contentPath=' + contentPath
	}
}

contentSDK.errorCallback = function(errCode) {
	//console.log('JS errorCallback:' + errCode)
	canDownload = true
	errorCallback(errCode)
}

contentSDK.openQRCode = function() {
	//console.log('JS openQRCode.....')
	if (os == 'android') {
		window.JSInterface.openQRCode()
	} else if (os == 'ios') {

	}
}

export default contentSDK
