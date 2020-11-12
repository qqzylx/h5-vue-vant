function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function parseOptionByVal(arr, val) {
    try {
        let options = arr;
        let value = val;
        if (isArray(val) && !isArray(arr)) {
            options = val;
            value = arr;
        }
        return options.filter(d => d.value == value)[0].label;
    } catch (e) {
        return "";
    }
}

function getUrlQuery(key) {
    var url = window.location.href;
    var parameter = url.substring(url.indexOf('?') + 1);
    parameter = parameter.split('&');
    var reg = new RegExp(`${key}=`,"g");
    var menuCode = "";
    for (var i = 0; i < parameter.length; i++) {
        reg.lastIndex = 0;
        if (reg.test(parameter[i])) {
            menuCode = parameter[i].replace(`${key}=`, "");
            break;
        }
    }
    return menuCode;
}

export default function install(Vue) {
    /* eslint-disable no-param-reassign */
    Vue.prototype.isArray = isArray;
    /* eslint-disable no-param-reassign */
    Vue.prototype.deepCopy = deepCopy;
    /* eslint-disable no-param-reassign */
    Vue.prototype.parseOptionByVal = parseOptionByVal;
    /* eslint-disable no-param-reassign */
    Vue.prototype.getUrlQuery = getUrlQuery;
}
