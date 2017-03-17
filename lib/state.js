/**
 * Name: state.js
 * Author: Hao Fu
 * Created date: 01/05/2017
 * Updated date: 01/17/2017
 * Description: class definition of STATE
 */

'use strict';

/**
 * internal modules
 */
var message = require('./message.js')();
var type = require('./type.js');
var Rule = require('./rule.js');
var Vector = require('./vector.js');
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
     *   "state": {
     *      "schema": {<template json schema>},
     *      "template": {<template json>},
     *      "rules": [<state rules>]
     *   }
     * }
     */

    //
    // internal variables
    //

    var state = {};         // private state
    var rules = [];         // private rules array

    var global = this;

    //
    // external variables
    //

    this.name = "";
    this.description = "";

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

    this.getState = function () {
        return state;
    };

    /**
     * forcefully override state object
     * @param {Object} s - state object
     */
    this.setState = function (s) {
        state = s;
    };

    this.getRules = function () {
        return rules;
    };

    /**
     *
     * @param {Object} r - rule object
     * @returns {boolean}
     */
    this.addRule = function (r) {
        var rule =  new Rule(r);
        if (rule.valid) {
            rules.push(rule);
        }
        return rule.valid;
    };

    /**
     * remove a rule
     * @param {string} v - vector property of the rule
     * @returns {boolean}
     */
    this.removeRule = function (v) {
        var hits = rules.filter(function (r) {
            return r.vector === v;
        });
        hits.forEach(function (hit) {
            rules.splice(rules.indexOf(hit), 1);
        });
        return hits.length > 0;
    };

    /**
     * update state with rule
     * @param {Object} v - vector object
     */
    this.update = function (v) {
        // parse vector
        var vector = new Vector(v);
        if (vector.valid) {

        } else {
            message.error("invalid vector object", "state.js");
        }
    };

    //
    // private functions
    //

    /**
     * parse configuration JSON object to initialize State
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
                        var rule = new Rule(r);
                        if (rule.valid) {
                            rules.push(rule);
                        }
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

/**
 * Export State class
 * @type {State}
 */
module.exports = State;
