// 获取终端的相关信息
const terminal = {
    // 辨别移动终端类型
    platform: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            // android终端或者uc浏览器
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,

            // 是否为iPhone或者QQHD浏览器
            iPhone: u.indexOf('iPhone') > -1,

            // 是否iPad
            iPad: u.indexOf('iPad') > -1,

            // 是否是通过微信打开的
            weChat: u.indexOf('MicroMessenger') > -1
        };
    }(),
};

export default terminal;
