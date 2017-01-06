/**
 * Name: rule.js
 * Author: Hao Fu
 * Created date: 12/20/2016
 * Updated date: 01/02/2017
 * Description: This module is the class definition of RULE
 */

/**
 * external modules
 */
var Ajv = require('ajv');

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

    /**
     * Rule example
     * {
     *   vector: '<name of the vector>',
     *   condition: '<condition expression>',
     *   execution: '<execution expression>',
     *   schema: {<JSON schema>},
     *   valid: {boolean}
     * }
     */

    // candidate arguments as parameters
    var params = [
        'vector',       // 0 (required)
        'condition',    // 1 (required)
        'execution',    // 2 (required)
        'schema'        // 3 (optional)
    ];

    // define a valid tag to indicate the validity of the rule
    var valid = true;

    // parse arguments
    for (var i=0; i<arguments.length; i++) {
        if (i < params.length) {
            // get argument and current parameter
            var argument = arguments[i];
            var param = params[i];
            // parse argument to value
            var value = null;
            if (i == 3) {
                // schema has to be valid JSON schema
                if (this.isSchemaValid(argument)) {
                    value = this.parseSchema(argument);
                } else {
                    valid = false;
                }
            } else {
                // others are treated as string
                if (!this.isStringValid(argument)) {
                    valid = false;
                }
                value = argument;
            }
            // add value if it is valid
            if (value !== null) {
                this.addReadonlyProperty(param, value);
            }
        }
    }

    // error if missing parameters
    if (arguments.length < params.length - 1) {
        message.error("missing arguments, Rule requires vector, condition, execution and schema");
        valid = false;
    }
    else {
        // warn if no schema is presented
        if (arguments.length < params.length) {
            message.warn("Rule without JSON schema is not secured");
        }
        valid = false;
    }

    // add a valid tag
    this.addReadonlyProperty('valid', valid);

}

/**
 * Check if string type
 * @param str {string} input string
 * @returns {boolean}
 */
Rule.prototype.isStringValid = function (str) {
    if (typeof str === 'string') {
        return true;
    } else {
        message.error("Rule vector, condition and execution should all be string");
        return false;
    }
};

/**
 * Check if a string or object is a valid JSON schema
 * @param {string} schema candidate
 * @returns {boolean} result
 */
Rule.prototype.isSchemaValid = function (schema) {
    // check if schema is an object
    if (typeof schema === 'object') {
        if (!(new Ajv()).validateSchema(schema)) {
            message.error("Rule schema is not valid JSON schema object");
            return false;
        } else {
            return true;
        }
    }
    // check schema string
    try {
        var json = JSON.parse(schema);
        if (!(new Ajv()).validateSchema(json)) {
            message.error("Rule schema is not valid JSON schema string");
            return false;
        } else {
            return true;
        }
    } catch (e) {
        // generate error message
        message.error("Rule schema is not valid JSON string");
        return false;
    }
};

/**
 * Parse a string or object to JSON schema
 * @param {string} schema candidate
 * @returns {{}} JSON schema
 */
Rule.prototype.parseSchema = function (schema) {
    // return if schema is an object
    if (typeof schema === 'object') {
        return schema;
    }
    // parse schema string
    return JSON.parse(schema);
};

/**
 * Add read-only property to object
 * @param key
 * @param value
 */
Rule.prototype.addReadonlyProperty = function (key, value) {
    // add a valid tag
    Object.defineProperty(this, key, {
        value: value,
        writable: false,
        enumerable: true,
        configurable: true
    });
};

/**
 * Export Rule class
 * @type {Rule}
 */
module.exports = Rule;
