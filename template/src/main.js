{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
import 'lib-flexible/flexible'
import store from './store';

import api from './api';
Vue.use(api);

import urls from './api/urls';
Vue.use(urls);

import base from './utils/base.js';
Vue.use(base);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    {{#router}}
    router,
    {{/router}}
    {{#if_eq build "runtime"}}
    render: h => h(App)
    {{/if_eq}}
    {{#if_eq build "standalone"}}
    components: { App },
    template: '<App/>'
    {{/if_eq}}
})
