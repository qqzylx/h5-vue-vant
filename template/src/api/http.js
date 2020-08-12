import axios from "axios";
import qs from "qs";
import {Toast} from 'vant';
import store from '../store';
import router from '../router';
import urls from './urls';

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

const http = axios.create({
    baseURL: "/", // 因为我本地做了反向代理
    timeout: 50000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    processData: false,
    contentType: false,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

//POST传参序列化(添加请求拦截器)
http.interceptors.request.use(
    config => {
        if (store.state.strongLoading || (!config.noLoading && config.url !== urls.getWXConfig)) {
            Toast.loading({
                message: config.loadingText || '加载中...',
                duration: 0,
                forbidClick: true,
                loadingType: 'spinner'
            });
        }
        // 在发送请求之前做某件事
        if (config.method === "post" &&
            config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8') {
            // 序列化
            config.data = qs.stringify(config.data);
        }
        if(config.json){
            config.headers['Content-Type'] = 'application/json;charset=utf-8'
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 返回状态判断(添加响应拦截器)
http.interceptors.response.use(
    res => {
        return new Promise((resolve, reject) => {
            if (!store.state.strongLoading && res.request._url !== urls.getWXConfig) {
                Toast && Toast.clear();
            }

            //对响应数据做些事
            if (res.data && res.data.success !== 1000) {
                if (res.data.success === 2000) {
                    Toast({
                        message: res.data.msg,
                        duration: 2000,
                        forbidClick: true
                    });
                    setTimeout(() => {
                        reject(res.data);
                    }, 2000);
                } else if (res.data.success === 3000) {
                    // Toast("内部错误,请联系平台开发人员")
                    reject(res.data);
                } else if (res.data.success === 6000) {
                    Toast('登录已过期，请重新登录');
                    router.push('/login');
                    reject(res.data);
                } else {
                    reject(res.data);
                }
            } else {
                resolve(res.data);
            }
        });
    },
    error => {
        if (!store.state.strongLoading) {
            Toast && Toast.clear();
        }

        return Promise.reject(error);
    }
);

export default http;
