import axios from 'axios'
import fb from './fbSDK'
import store from './store'

const stateCheck = async function(){
	console.log('[檢查登入]開始檢查...')
	let apiId = 'AKfycbzABvxB6N004_lUWsYvAbo0jn-mIfMbl7r4b0kszs3LgpmZ6FE'
	let apiUrl = 'https://script.google.com/macros/s/'+ apiId +'/exec'
	let fbDataObj = await fb.getData()
	if ( fbDataObj === 'unconnected' ) {
		console.log('[檢查登入]FB未登入或其他問題')
	} else {
		console.log('[檢查登入]FB已授權連線')
		let str = new Date()
		let fbDataText = JSON.stringify(fbDataObj)
		console.log('[檢查登入]確認會員資料...')
		axios({
			method: 'POST',
			url: apiUrl,
			params : {
				action: 'loginFromFacbook'
			},
			data: fbDataText
		}).then((res)=>{
			let userData = res.data[fbDataObj.id]
			console.log('[檢查登入]完成確認')
			console.log('歡迎!'+userData.name)
			let end = new Date()
			console.log('[檢查登入]=>時間:'+(end - str)+'ms')
			store.commit('updateUser', userData)
		}).catch((err)=>{
			console.log(err)
		})
	}
}

const login = function(){
	fb.login()
}

const logout = async function(){
	let logout = await fb.logout()
	store.commit('clearUser')
}


export default {
	stateCheck,
	login,
	logout
}