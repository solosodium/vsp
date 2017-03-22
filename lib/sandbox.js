/**
 * Name: sandbox.js
 * Author: Hao Fu
 * Created date: 01/16/2017
 * Updated date: 03/22/2017
 * Description: This module is the is sandbox for STATE update
 */

'use strict';

/**
 * Sandbox contains potential malicious codes
 * @param {Object} state
 * @param {Object} rule
 * @param {Object} vector
 */
module.exports = function (state, rule, vector) {

    //
    // initialize reserved variables
    //

    var v = vector.data;
    var s = state;
    var p = {};

    //
    // update
    //

    if (eval(rule.condition)) {
        eval(rule.execution);
    }

    //
    // return
    //

    return {
        'state': s,
        'product': p
    };

};
