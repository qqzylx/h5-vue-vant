// 正则检验身份证号
function isIdNum(obj) {
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return reg.test(obj);
}

// 验证身份证号校验位是否正确
function checkCode(val) {
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let idArr = val.split('');
    let sum = 0;
    for (let i = 0; i < factor.length; i++) {
        sum += parseInt(idArr[i]) * factor[i];
    }
    if (idArr[17] === 'X' || idArr[17] === 'x') {
        sum += 10;
    } else {
        sum += parseInt(idArr[17]);
    }
    return sum % 11 === 1;
}

// 严格模式验证：包含正则检验和校验位检验
function isStrictIdNum(val) {
    return isIdNum(val) && checkCode(val);
}

module.exports = {
    isIdNum: isIdNum,
    isStrictIdNum: isStrictIdNum
};
