/**
 * Name: rule.js
 * Author: Hao Fu
 * Created date: 12/20/2016
 * Updated date: 12/20/2016
 * Description: This module is the class definition of RULE
 */

/**
 * Rule definition (read-only once defined)
 * @constructor
 * @param {string} vector vector this rule is for
 * @param {string} condition condition expression to be evaluated
 * @param {string} execution execution expression to be evaluated
 * @param {{}} schema JSON schema for the vector
 */
function Rule () {
    // parse parameters (all read-only)
    var params = [
        'vector',       // 0
        'condition',    // 1
        'execution',    // 2
        'schema'        // 3
    ];
    for (var i=0; i<arguments.length; i++) {
        var param = '';
        if (i < params.length) {
            param = params[i];
        }
        if (param !== '') {
            Object.defineProperty(this, param, {
                value: arguments[i],
                writable: false,
                enumerable: true,
                configurable: true
            });
        }
    }
}

/**
 * Export Rule class
 * @type {Rule}
 */
module.exports = Rule;
