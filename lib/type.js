/**
 * Name: type.js
 * Author: Hao Fu
 * Created date: 01/12/2017
 * Updated date: 01/12/2017
 * Description: This module is the helper class checking types
 */

'use strict';

module.exports = (function () {
    return {
        isObject: function (o) {
            return (o !== null) && (typeof o === 'object');
        },
        isArray: function (arr) {
            return Object.prototype.toString.call(arr) === '[object Array]';
        },
        isFunction: function (f) {
            return Object.prototype.toString.call(f) === '[object Function]';
        },
        isString: function (str) {
            return (typeof str === 'string') || (str instanceof String);
        },
        isNumber: function (n) {
            return !isNaN(n);
        }
    };
})();
