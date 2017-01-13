/**
 * Name: state.js
 * Author: Hao Fu
 * Created date: 01/05/2017
 * Updated date: 01/12/2017
 * Description: This module is the class definition of STATE
 */

'use strict';

/**
 * internal modules
 */
var message = require('./message.js')();
var type = require('./type.js');
var Rule = require('./rule.js');

/**
 * State definition
 * @constructor
 */
function State () {

    //
    // internal variables
    //

    var state = {};         // private state
    var rules = [];         // private rules array

    //
    // external variables
    //

    this.name = "";
    this.description = "";

    //
    // initialize routine
    //

    // it only takes one configuration JSON object
    if (arguments.length > 0) {
        var config = arguments[0];
        parseConfig(config);
    }

    //
    // public functions
    //

    this.getState = function () {
        return state;
    };

    this.setState = function (s) {
        state = s;
    };

    this.getRules = function () {
        return rules;
    };

    //
    // private utility functions
    //

    /**
     * parse configuration JSON object to initialize State
     * @param config configuration JSON object
     */
    function parseConfig (config) {
        // check config is JSON
        if (type.isObject(config)) {
            // parse meta data strings
            var strings = ['name', 'description'];
            strings.forEach(function (s) {
                if (config.hasOwnProperty(s)) {
                    global[s] = config[s];
                }
            });
            // parse state
            if (config.hasOwnProperty('state') && type.isObject(config.state)) {
                // parse template
                if (config.state.hasOwnProperty('template') && type.isObject(config.state.template)) {
                    state = config.state.template;
                } else {
                    message.warn("invalid template in config.state", "state.js");
                }
                // parse rules
                if (config.state.hasOwnProperty('rules') && type.isArray(config.state.rules)) {
                    config.state.rules.forEach(function (r) {
                        rules.push(new Rule(r));
                    });
                } else {
                    message.warn("invalid rules in config.state", "state.js");
                }
            } else {
                message.warn("invalid state in config", "state.js");
            }
        } else {
            message.error("invalid config", "state.js");
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