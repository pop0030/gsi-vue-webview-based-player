import Vue      from 'vue'
import Router   from 'vue-router'
import store    from './store';

/* View */
import Main     from '@/views/Main'
import Explore  from '@/views/Explore'
import Feature  from '@/views/Feature'
import Bookcase from '@/views/Bookcase'
import Member   from '@/views/Member'
import Purchase from '@/views/Purchase'
import Watch    from '@/views/Watch'
import Login    from '@/views/Login'
import Submit   from '@/views/Submit'

/* Component */
import Item     from '@/components/Item'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Explore,
        meta: {
            cname: '探索',
            showMenu: true
        }
    },
    {
        path: '/camera',
        name: 'camera',
        component: Main,
        meta: {
            cname: '掃描',
            showMenu: false
        }
    },
    {
        path: '/explore',
        name: 'explore',
        component: Explore,
        meta: {
            cname: '探索',
            showMenu: true
        }
    },
    {
        path: '/feature',
        name: 'feature',
        component: Feature,
        meta: {
            cname: '精選',
            showMenu: true
        }
    },
    {
        path: '/bookcase',
        component: Bookcase,
        children: [
            {
                name: 'purchase',
                path: '',
                component: Purchase,
                meta: {
                    cname: '書櫃',
                    showMenu: true
                }
            },
            {
                name: 'watch',
                path: 'watch',
                component: Watch,
                meta: {
                    cname: '書櫃',
                    showMenu: true
                }
            }
        ]
    },
    {
        path: '/member',
        name: 'member',
        component: Member,
        meta: {
            cname: '我的',
            showMenu: true
        },
        children: [
            {
                name: 'login',
                path: 'login',
                component: Login,
                meta: {
                    cname: '登入',
                    showMenu: false
                }
            },
            {
                name: 'submit',
                path: 'submit',
                component: Submit,
                meta: {
                    cname: '註冊',
                    showMenu: false
                }
            }
        ]
    },
    {
        path: '/feature/:id',
        name: 'item',
        component: Item,
    }
]

const router = new Router({
    routes: routes
})

router.beforeEach((to, from, next) => {
    window.scroll(0,0)
    store.dispatch('loading')
    next()
})

export default router
