/**
 * Name: state.js
 * Author: Hao Fu
 * Created date: 01/05/2017
 * Updated date: 01/08/2017
 * Description: This module is the class definition of STATE
 */

'use strict'

/**
 * internal modules
 */
var message = require('./message.js')();
var Rule = require('./rule.js');

/**
 * State definition
 * @constructor
 */
function State () {

    //
    // internal variables
    //

    // private state (default empty)
    var state = {};

    // private rules array
    var rules = [];

    //
    // external variables
    //

    this.name = "";
    this.description = "";

    //
    // get functions
    //

    this.getState = function () {
        return state;
    };

    this.getRules = function () {
        return rules;
    };

    //
    // initialize routine
    //

    // it only takes one configuration JSON object
    if (arguments.length > 0) {
        var config = arguments[0];
        parseConfig(config);
    }

    //
    // private utility functions
    //

    /**
     * parse configuration JSON object to initialize State
     * @param config configuration JSON object
     */
    function parseConfig (config) {
        // check config is JSON
        if (typeof config !== 'object') {
            message.error("State initialization needs an object");
        } else {
            // parse strings
            var strings = ['name', 'description'];
            for (var s in strings) {
               if (config.hasOwnProperty(s)) {
                   this[s] = config[s];
               }
            }
            // parse state
            if (config.hasOwnProperty('template') && typeof config.template === 'object') {
                this.state = config.template;
            } else {
                message.warn("State ")
            }
            // parse rules
            if (config.hasOwnProperty('rules') && config.rules instanceof Array) {

            } else {

            }
        }
    }

}

//
// public functions
//



/**
 * Export State class
 * @type {State}
 */
module.exports = State;
