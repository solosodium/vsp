/**
 * Name: state.js
 * Author: Hao Fu
 * Created date: 01/05/2017
 * Updated date: 01/06/2017
 * Description: This module is the class definition of STATE
 */

/**
 * State definition
 * @constructor
 */
function State () {

    // candidate arguments as parameters
    var params = [
        'template',     // 0
        'options',      // 1
        'rules'         // 2
    ];

    // variables

    this.state = {};

    this.options = {

    };

    this.rules = {

    };

    this.traces = {

    };



}

/**
 * Add immutable property to object
 * @param key
 * @param value
 */
State.prototype.addImmutableProperty = function (key, value) {
    // add a valid tag
    Object.defineProperty(this, key, {
        value: value,
        writable: false,
        enumerable: true,
        configurable: true
    });
};

/**
 * Export State class
 * @type {State}
 */
module.exports = State;
