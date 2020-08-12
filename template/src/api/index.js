import http from './http';
import urls from "./urls";
import headers from './headers';


// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function(Vue, Option) {
        Object.defineProperty(Vue.prototype, "$api", { value: http });
        Object.defineProperty(Vue.prototype, "$urls", { value: urls });
        Object.defineProperty(Vue.prototype, "$headers", { value: headers });
    }
};
