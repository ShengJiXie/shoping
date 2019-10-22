// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import global from './global.js'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;
Vue.prototype.global = global
Vue.use(VueRouter)
import Home from './components/Home.vue';
import Classification from './components/Classification.vue';
import News from './components/News.vue';
import ChatHeader from './components/Chat/Home.vue';
import Login from './components/Login/Login.vue';
import Register from './components/Login/Register.vue';
import Shoping from './components/details/Shoping.vue';
import Personal from './components/Personal/Personal.vue';
import Cart from './components/Cart.vue';
import Details from './components/Details.vue';
import Catalogue from './components/Catalogue.vue';
import AddressEdit from './components/Personal/AddressEdit.vue';
import AddressList from './components/Personal/AddressList.vue';
import Setup from './components/SetUp/Setup.vue';
import Phone from './components/SetUp/Phone.vue';
import Phone_new from './components/SetUp/Phone_new.vue';
import Pwd from './components/SetUp/Pwd.vue';
import Payment from './components/SetUp/Payment.vue';
import Email from './components/SetUp/Email.vue';
import Wallet from './components/Personal/Wallet.vue';
import Help from './components/Personal/Help.vue';
import Orders from './components/Personal/Orders.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home   //首页
  },
  {
    path: '/classification',
    name: 'classification',
    component: Classification    //分类
    },
  {
    path: '/news',
    name: 'news',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: News  //消息
  },
  {
    path: '/Phone_new',   
    name: 'Phone_new',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Phone_new  //新手机号
  },
  {
    path: '/Help',   
    name: 'Help',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Help  //帮助
  },
  {
    path: '/Orders',   
    name: 'Orders',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Orders  //总订单
  },
  {
    path: '/Pwd',
    name: 'Pwd',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Pwd  //更改密码
  },
  {
    path: '/Payment',
    name: 'Payment',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Payment  //更改支付密码
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login  //登陆
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register  //注册
  },
  {
    path: '/Personal',
    name: 'Personal',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Personal  //个人中心
  },
  {
    path: '/Cart',
    name: 'Cart',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }, component: Cart   // 购物车
  },
  {
    path: '/Catalogue',
    name: 'Catalogue',
    component: Catalogue   //子分类
  },
  {
    path: '/AddressList',
    name: 'AddressList',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }, 
    component: AddressList  //地址管理
  },
  {
    path: '/AddressEdit',
    name: 'AddressEdit',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }, 
    component: AddressEdit  //添加地址
  },
  {
    path: '/Phone',
    name: 'Phone',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }, 
    component: Phone  //更改手机号
  },
  {
    path: '/Email',
    name: 'Email',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }, 
    component: Email  //邮箱
  },
  {
    path: '/Setup',
    name: 'Setup',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }, 
    component: Setup  //设置
  },
  
  {
    path: '/Wallet',
    name: 'Wallet',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }, 
    component: Wallet  //钱包
  },
  {
    path: '/Details',
    name: 'Details',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }, 
    component: Details  //订单详情
  },
  {
    path: '/Chat/:id',
    name: 'Cartid',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }, component: ChatHeader   //聊天
  },
  {
    path: '/Shoping/:id',
    name: 'Shopingid',
    component: Shoping  //商品详情
  },
  {
    path: '*', redirect: '/home'  
  }   /*默认跳转路由*/
]
const router = new VueRouter({
  mode: 'history',
  routes // （缩写）相当于 routes: routes
})

// 导航守卫
var originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {   //如果需要跳转 ，往下走（1）
    if (sessionStorage.getItem('token')){   //判断是否登录过，如果有登陆过，说明有token,或者token未过期，可以跳过登录（2）
      axios.post(global.ip+'/tokens',"token="+sessionStorage.getItem('token')).then(token=>{
        if(token.data==false){
          sessionStorage.removeItem('token');
          router.push('login')
        }
      }).catch(error=>{
        sessionStorage.removeItem('token');
        router.push('login')
      });
      if (to.path === '/login') { //判断下一个路由是否为要验证的路由（3）
        next('/home');   // 如果是直接跳到首页，
      } else {    //如果该路由不需要验证，那么直接往后走
        next();   // 如果是直接跳到首页，
      }
    } else {
      sessionStorage.clear();
      next('/login');
    }
  } else {       //不需要跳转，直接往下走
    next();
  }
});
export default router;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
