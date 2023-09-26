import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Main from '../views/Main.vue';
import Mall from '../views/Mall.vue';
import Page1 from '../views/OtherPage1.vue';
import Page2 from '../views/OtherPage2.vue';

Vue.use(VueRouter);

// 1. 定义 (路由) 组件, 或者从import中引入组件
//2、每个路由应该映射一个组件
const routes = [
  //主路由
  {
    path: '/',
    component: Main,
    redirect: '/home', // ‘/’重定向到‘/home’
    children: [
      // 子路由
      { path: 'home', component: Home },
      { path: 'user', component: User },
      { path: 'mall', component: Mall },
      { path: 'page1', component: Page1 },
      { path: 'page2', component: Page2 },
    ],
  },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

// 4. 在main.js中创建和挂载router实例
export default router;
