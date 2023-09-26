import Vue from 'vue';
import App from './App.vue';
//import { Button, Dialog } from "element-ui";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'; //默认读取index.js
import store from './store'; //默认读取index.js
import './api/mockApi';

Vue.config.productionTip = false;

//全局注入
Vue.use(ElementUI);

//按需引用
//Vue.component(Button);
//Vue.component(Dialog);

//挂载
const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
