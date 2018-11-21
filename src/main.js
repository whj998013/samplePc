import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import bus from "./bus.js";
import Util from './libs/util';
import App from './app.vue';
import dd from './libs/ddapi.js';
import loginApi from "./libs/loginApi.js";
import 'iview/dist/styles/iview.css';

Vue.prototype.$bus = bus;
Vue.prototype.$Auth = bus.Auth;
Vue.prototype.$util = Util;
Vue.prototype.$dd = dd;
Vue.use(VueRouter);
Vue.use(iView);

bus.getUserBycookie();
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if (to.matched.some(record => record.meta.requireAuth) && !bus.isLogin) { // 判断该路由是否需要登录权限
        console.log('No login');
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    } else {
        next();
    }

});

router.afterEach(() => {
    iView.LoadingBar.finish();
    // LoadingBar.finish();

    window.scrollTo(0, 0);
});
var v = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});