import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from '@vue/composition-api'; 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import store from "./store";
import './icons/index.js';
import './router/promit';
import global from '@/utils/global.js';


Vue.use(global)
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
