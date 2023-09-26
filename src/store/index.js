import Vue from 'vue';
import Vuex from 'vuex';
import Tab from './tab.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Tab,
  },
});
export default store;
