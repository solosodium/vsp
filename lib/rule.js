/**
 * Name: rule.js
 * Author: Hao Fu
 * Created date: 12/20/2016
 * Updated date: 01/17/2017
 * Description: class definition of RULE
 */

'use strict';

/**
 * external modules
 */
var Ajv = require('ajv');

/**
 * internal modules
 */
var message = require('./message.js')();
var type = require('./type');

/**
 * Rule definition (immutable)
 * @constructor
 * @param {Object} param - refer to example
 */
function Rule (param) {

    /**
     * param example
     * {
     *   vector: '<name of the vector>',
     *   condition: '<condition expression>',
     *   execution: '<execution expression>',
     *   schema: {<JSON schema>},
     *   priority: <number for priority>,
     *   valid: <boolean indicator if vector is valid>
     * }
     */

    //
    // internal variables
    //

    var self = this;

    //
    // initialize routine
    //

    if (type.isObject(param)) {
        parseParam(param);
    } else {
        message.error("rule requires param object", "rule.js");
    }

    //
    // private functions
    //

    function parseParam (param) {
        // valid tag
        var valid = true;
        // check param is JSON
        if (type.isObject(param)) {
            // parse strings
            var strings = [
                'vector',
                'condition',
                'execution'
            ];
            strings.forEach(function (s) {
                if (param.hasOwnProperty(s) && type.isString(param[s])) {
                    addImmutableProperty(self, s, param[s]);
                } else {
                    message.error("param missing param." + s, "rule.js");
                    valid = false;
                }
            });
            // parse schema
            if (param.hasOwnProperty('schema')) {
                if (type.isObject(param.schema)) {
                    if ((new Ajv()).validateSchema(param.schema)) {
                        addImmutableProperty(self, 'schema', param.schema);
                    } else {
                        message.error("schema is not valid JSON schema object", "rule.js");
                        valid = false;
                    }
                } else {
                    message.error("schema is not valid JSON object", "rule.js");
                    valid = false;
                }
            } else {
                message.warn("rule without schema is not secured", "rule.js");
            }
            // parse priority
            if (param.hasOwnProperty('priority') && type.isNumber(param.priority)) {
                addImmutableProperty(self, 'priority', param.priority);
            } else {
                addImmutableProperty(self, 'priority', 0);
            }
        } else {
            message.error("invalid param", "rule.js");
            valid = false;
        }
        // add valid
        addImmutableProperty(self, 'valid', valid);
    }

    /**
     * Add immutable property to object
     * @param object
     * @param key
     * @param value
     */
    function addImmutableProperty (object, key, value) {
        // add a valid tag
        Object.defineProperty(object, key, {
            value: value,
            writable: false,
            enumerable: true,
            configurable: true
        });
    }

}

/**
 * Export Rule class
 * @type {Rule}
 */
module.exports = Rule;
