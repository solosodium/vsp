/**
 * Name: vector.js
 * Author: Hao Fu
 * Created date: 01/16/2017
 * Updated date: 01/16/2017
 * Description: This module is the class definition of VECTOR
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
 */
function Vector () {

    /**
     * Vector example
     * {
     *   vector: '<name of the vector>',
     *   data: <data object>
     * }
     */

    //
    // internal variables
    //

    var global = this;

    //
    // initialize routine
    //

    if (arguments.length > 0) {
        var param = arguments[0];
        parseParam(param);
    } else {
        message.error("vector requires param object", "vector.js");
    }

    //
    // private functions
    //

    function parseParam (param) {
        var valid = true;
        if (param.hasOwnProperty('vector') && type.isString(param['vector'])) {
            global.vector = param.vector;
        } else {
            message.error("invalid 'vector' property", "vector.js");
            valid = false;
        }
        if (param.hasOwnProperty('data') && type.isObject(param['data'])) {
            global.data = param.data;
        } else {
            message.error("invalid 'data' property", "vector.js");
            valid = false;
        }
        global.valid = valid;
    }

}
