import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Register from '@/components/register'
import Login from '@/components/login'
import Good from '@/components/common/goods'
import categoryList from '@/components/common/categoryList'
import Cart from '@/components/common/cart'
import Main from '@/components/main'
import User from '@/components/common/user'
import Search from '@/components/common/search'

Vue.use(Router)

export default new Router({
       routes:[
         {
             path:'/',
             name:'Main',
             component:Main,
             children:[
                 {path:'/',name:'Index',component:Index},
                 {path:'/categorylist',name:'categoryList',component:categoryList},
                 {path:'/cart',name:'Cart',component:Cart},
                 {path:'/user',name:'User',component:User},
             ]
         },
         {
            path:'/register',
            name:'Register',
            component:Register
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        },
        {
            path:'/goods',
            name:'Good',
            component:Good
        },
        {path:'/search',name:'Search',component:Search}
     ]
})