/*
 * @Author: whj 
 * @Date: 2018-11-05 17:18:33 
 * @Last Modified by: whj
 * @Last Modified time: 2018-11-05 17:36:52
 */
// 通用js
module.exports = {
    // 时间戳转换
    formatDateTime(str) {
        let date = str ? new Date(parseInt(str)) : new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        // console.log(new Date(str));

        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;
        h = h < 10 ? ('0' + h) : h;
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;

        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second

    }
}