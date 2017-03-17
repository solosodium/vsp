/**
 * Name: vsp.js (vector, state, product)
 * Author: Hao Fu
 * Created date: 11/23/2016
 * Updated date: 01/15/2017
 * Description: This module is the wrapper for vsp.
 */

'use strict';

/**
 * internal modules
 */
//var message = require('./lib/message.js')();
var Rule = require('./lib/rule.js');
var State = require('./lib/state.js');

/**
 * Module definition
 * @return {{
 *   Rule: Rule,
 *   State: State
 * }}
 */
module.exports = function () {
    return {
        'Rule': Rule,       // Rule class
        'State': State      // State class
    };
};
