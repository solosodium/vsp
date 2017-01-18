/**
 * Name: vector.js
 * Author: Hao Fu
 * Created date: 01/16/2017
 * Updated date: 01/17/2017
 * Description: class definition of VECTOR
 */

'use strict';

/**
 * internal modules
 */
var message = require('./message.js')();
var type = require('./type');

/**
 * Vector definition
 * @constructor
 * @param {Object} param - refer to example
 */
function Vector (param) {

    /**
     * param example
     * {
     *   vector: '<name of the vector>',
     *   data: <data object>
     * }
     */

    //
    // initialize routine
    //

    if (type.isObject(param)) {
        // parse parameter
        var valid = true;
        if (param.hasOwnProperty('vector') && type.isString(param['vector'])) {
            this.vector = param.vector;
        } else {
            message.error("invalid 'vector' property", "vector.js");
            valid = false;
        }
        if (param.hasOwnProperty('data') && type.isObject(param['data'])) {
            this.data = param.data;
        } else {
            message.error("invalid 'data' property", "vector.js");
            valid = false;
        }
        this.valid = valid;
    } else {
        message.error("vector requires param object", "vector.js");
        this.valid = false;
    }

}

/**
 * Export Vector class
 * @type {Vector}
 */
module.exports = Vector;
