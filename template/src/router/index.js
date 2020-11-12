import Vue from "vue";
import Router from "vue-router";
import { buildPath } from "../config";

Vue.use(Router);

const router = new Router({
    base: process.env.NODE_ENV === "production" ? buildPath : "",
    mode: process.env.NODE_ENV === "production" ? "history" : "",
    routes: [
        {
            path: "/",
            redirect: "/index",
        },
        {
            path: "/index",
            name: "index",
            component: resolve => require(["@/pages/index/Index.vue"], resolve),
            meta: { title: "首页", index: 1 },
        },
    ],
});

/* eslint-disable consistent-return */
router.onError((error) => {
    try {
        const pattern = /Loading chunk (\d)+ failed/g;
        const isChunkLoadFailed = error.message.match(pattern);
        const targetPath = router.history.pending.fullPath;
        if (isChunkLoadFailed) {
            const LoadingChunk = window.sessionStorage.getItem("LoadingChunk");
            if (LoadingChunk) {
                window.sessionStorage.setItem("LoadingChunk", LoadingChunk + 1);
            } else {
                window.sessionStorage.setItem("LoadingChunk", "1");
            }
            if (LoadingChunk > 1) {
                // 防止 死循环
                return false;
            }
            router.replace(targetPath);
        }
    } catch (e) {
        console.log(e);
    }
});

// router.beforeEach((to, from, next) => {
//     next();
// });

export default router;
