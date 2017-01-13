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

    var name = "vsp";

    return {
        log: function (msg, tag) {
            tag = tag == null ? "" : " " + tag;
            console.log(prefixes.log + name + tag + ": " + msg);
        },
        warn: function (msg, tag) {
            tag = tag == null ? "" : " " + tag;
            console.warn(prefixes.warn + name + tag + ": " + msg);
        },
        error: function (msg, tag) {
            tag = tag == null ? "" : " " + tag;
            console.error(prefixes.error + name + tag + ": " + msg);
        }
    };

};
