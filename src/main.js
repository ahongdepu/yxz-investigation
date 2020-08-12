import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Layout from '@/components/layout';

import ajax from './utils/ajax';

// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './components/element';

Vue.component('Layout', Layout);

Vue.prototype.$ajax = ajax;
Vue.config.productionTip = false;

// Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// app.$create = create
