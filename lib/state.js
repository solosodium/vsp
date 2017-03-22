/**
 * Name: state.js
 * Author: Hao Fu
 * Created date: 01/05/2017
 * Updated date: 03/22/2017
 * Description: class definition of STATE
 */

'use strict';

/**
 * internal modules
 */
var message = require('./message.js')();
var type = require('./type.js');
var sandbox = require('./sandbox.js');

/**
 * State definition
 * @constructor
 * @param {Object} param - refer to example
 */
function State (param) {

    /**
     * param example
     * {
     *   "name": "<state name>",
     *   "description": "<state description>",
     *   "template": {<template json>},     // optional (if "state" exists)
     *   "state": {<current state json>}    // optional (if "template" exists)
     * }
     */

    //
    // internal variables
    //

    var state = {};

    var self = this;

    //
    // external variables
    //

    this.name = "";
    this.description = "";
    this.template = {};

    //
    // initialize routine
    //

    // it only takes one configuration JSON object
    if (type.isObject(param)) {
        var config = param;
        parseConfig(config);
    } else {
        message.error("state requires configuration object", "state.js");
    }

    //
    // public functions
    //

    /**
     * Get current state
     * @return {{}}
     */
    this.getState = function () {
        return state;
    };

    /**
     * Update state with rules and a vector
     * @param {Array} rules
     * @param {{}} vector
     */
    this.update = function (rules, vector) {
        for (var i=0; i<rules.length; i++) {
            if (rules[i].validate(vector)) {
                var result = sandbox(self.state, rules[i], vector);
                state = result.state;
                return result.product;
            }
        }
        message.warn("invalid vector for the rules", "state.js");
        return null;
    };

    //
    // private functions
    //

    /**
     * Parse configuration JSON object to initialize State
     * @param config configuration JSON object
     */
    function parseConfig (config) {
        // check config is JSON
        if (type.isObject(config)) {
            // parse meta data strings
            var strings = [
                'name',
                'description'
            ];
            strings.forEach(function (s) {
                if (config.hasOwnProperty(s)) {
                    self[s] = config[s];
                }
            });
            // initialize state
            if (config.hasOwnProperty('state') && type.isObject(config.state)) {
                state = config.state;
            } else {
                if (config.hasOwnProperty('template') && type.isObject(config.template)) {
                    state = config.template;
                } else {
                    message.error("invalid template without state", "state.js");
                }
            }
        } else {
            message.error("invalid config", "state.js");
        }
    }

}

/**
 * Export State class
 * @type {State}
 */
module.exports = State;
