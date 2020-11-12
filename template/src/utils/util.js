/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func, wait, immediate) {
    let timeout;
    /* eslint-disable func-names */
    return function() {
        const context = this;
        /* eslint-disable prefer-rest-params */
        const args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args);
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
    };
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait, type = 1) {
    let previous;
    let timeout;
    if (type === 1) {
        previous = 0;
    }
    /* eslint-disable func-names */
    return function() {
        const context = this;
        /* eslint-disable prefer-rest-params */
        const args = arguments;
        if (type === 1) {
            const now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        } else if (type === 2) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args);
                }, wait);
            }
        }
    };
}

module.exports = {
    debounce,
    throttle,
};
