/**
 * Name: rule.js
 * Author: Hao Fu
 * Created date: 12/20/2016
 * Updated date: 01/02/2017
 * Description: This module is the class definition of RULE
 */

/**
 * internal modules
 */
var message = require('./message.js')();

/**
 * Rule definition (read-only once defined)
 * @constructor
 * @param {string} vector vector this rule is for
 * @param {string} condition condition expression to be evaluated
 * @param {string} execution execution expression to be evaluated
 * @param {{}} schema JSON schema for the vector
 */
function Rule () {

    // candidate arguments as parameters
    var params = [
        'vector',       // 0
        'condition',    // 1
        'execution',    // 2
        'schema'        // 3
    ];

    // parse arguments
    for (var i=0; i<arguments.length; i++) {
        if (i < params.length) {
            // get argument and current parameter
            var argument = arguments[i];
            var param = params[i];
            // parse argument to value
            var value = null;
            if (i == 3) {
                // schema has to be JSON object
                if (isJson(argument)) {
                    value = JSON.parse(argument);
                }
            } else {
                // others are treated as string
                value = argument;
            }
            // add value if it is valid
            if (value !== null) {
                Object.defineProperty(this, param, {
                    value: value,
                    writable: false,
                    enumerable: true,
                    configurable: true
                });
            }
        }
    }

    // warn if no schema is presented
    if (arguments.length < params.length) {
        message.warn("rule without JSON schema is not secured");
    }
}

/**
 * Check if a string is a valid JSON object
 * @param {string} str test string
 * @returns {boolean} result
 */
function isJson (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        // generate warning error message
        message.error("invalid JSON schema for rule");
        return false;
    }
    return true;
}

/**
 * Export Rule class
 * @type {Rule}
 */
module.exports = Rule;
