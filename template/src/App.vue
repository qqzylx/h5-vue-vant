<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import terminal from './utils/terminal';
    export default {
        name: 'App',
        data() {
            return {
                transitionName: '',
                url: '',
                code: ''
            }
        },
        created() {
            //在页面加载时读取sessionStorage里的状态信息
            if (sessionStorage.getItem("store")) {
                this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
            }

            //在页面刷新时将vuex里的信息保存到sessionStorage里
            if (terminal.platform.iPhone) {
                // iOS已经废弃beforeunload，使用pagehide代替
                window.addEventListener("pagehide", () => {
                    sessionStorage.setItem("store", JSON.stringify(this.$store.state))
                })
            } else {
                window.addEventListener("beforeunload", () => {
                    sessionStorage.setItem("store", JSON.stringify(this.$store.state))
                })
            }
        },
        watch: {//使用watch 监听$router的变化
            $route(to, from) {
                //如果to索引大于from索引,判断为前进状态,反之则为后退状态
                if (from.path === '/') {
                    this.transitionName = '';
                } else if (to.meta.index > from.meta.index) {
                    //设置动画名称
                    this.transitionName = 'slide-left';
                } else {
                    this.transitionName = 'slide-right';
                }
                //这是Android平台下浏览器
                if (/android/i.test(navigator.userAgent)) {
                    // 安卓平台下路由改变时，重新配置微信分享
                    // this.getConfig();
                }
            }
        }
    }
</script>

<style>
    /*@import "../static/css/main.css";*/
    /*@import "../static/css/sprite.css";*/
</style>
