import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';

import App from './App.vue';
import { routes } from './routes';
import store from './store/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add([faBars, faDownload, faUpload]);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.use(VueRouter);
// Vue.use(VueResource);

// Vue.http.options.root = "https://josephmoore.herokuapp.com/";

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
