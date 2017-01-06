/**
 * Name: message.js
 * Author: Hao Fu
 * Created date: 01/02/2017
 * Updated date: 01/02/2017
 * Description: This module generates messages
 */

/**
 * Generate vsp style message
 * @returns {{log: log, warn: warn, error: error}}
 */
module.exports = function () {

    var prefixes = {
        log: "[log] ",
        warn: "[warning] ",
        error: "[error] "
    };

    var name = "vsp: ";

    return {
        log: function (msg) {
            console.log(prefixes.log + name + msg);
        },
        warn: function (msg) {
            console.warn(prefixes.warn + name + msg);
        },
        error: function (msg) {
            console.error(prefixes.error + name + msg);
        }
    };

};
