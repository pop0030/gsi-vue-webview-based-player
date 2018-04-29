import Vue from 'vue'
import Vuex from 'vuex'

const initStatus = localStorage.getItem('init');

Vue.use(Vuex)

const state = {
    // init: (!initStatus || init < 0 ),
    init: false,
    mask: false,
    isMenu: false,
    isLoading: false,
    isLogin: false,
    user: {}
}

const getters = {
    init: state => {
        return state.init
    },
    mask: state => {
        return state.mask
    },
    isMenu: state => {
        return state.isMenu
    },
    isLoading: state => {
        return state.isLoading
    },
    isLogin: state => {
        return state.isLogin
    },
    user: state => {
        return state.user
    }
}

const mutations = {
    clearStorage(state) {
        localStorage.clear()
        state.init = true
    },
    startUse(state) {
        localStorage.setItem('init', 1)
        state.init = false
    },
    sideMenu(state, option) {
        switch (option) {
            case 'on':
                console.log('Menu On')
                state.isMenu = true
                state.mask = true
                break
            case 'off':
                console.log('Menu Off')
                state.isMenu = false
                state.mask = false
                break
            default:
                console.log('no options')
                state.isMenu = false
                state.mask = false
                break
        }
    },
    load(state, option) {
        switch (option) {
            case 'on':
                //console.log('start loading...')
                state.isLoading = true
                state.mask = true
                break
            case 'off':
                //console.log('load done!')
                state.isLoading = false
                state.mask = false
                break
            default:
                //console.log('no options')
                state.isLoading = false
                state.mask = false
                break
        }
    },
    updateUser(state, data) {
        if (data) {
            state.user = data
            state.isLogin = true
        }
    },
    clearUser(state) {
        state.user = {}
        state.isLogin = false
    }
}

const actions = {
    loading({
        commit
    }) {
        commit('load', 'on')
    },
    loaded({
        state,
        commit
    }) {
        if (!state.isMenu) {
            commit('load', 'off')
        }
    }
}


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})