/**
 * Name: vsp.js (vector, state, product)
 * Author: Hao Fu
 * Created date: 11/23/2016
 * Updated date: 12/20/2016
 * Description: This module maintains an internal STATE and a list of RULEs.
 * Once the state is initialized and rules are defined, it accepts incoming
 * VECTORs (events) that match the definition of the rules, and updates the
 * state. During the update, PRODUCT (returned result) is also generated as
 * defined by the rules. One rule uniquely defines a vector.
 */

'use strict';

/**
 * JSON schema parser dependency
 */
var ajv = require('ajv');

/**
 * internal modules
 */
var message = require('./message.js')();
var Rule = require('./rule.js');

/**
 * Module definition
 * @returns {{
 *  getState: getState,
 *  setState: setState,
 *  getRules: getRules,
 *  addRule: addRule,
 *  removeRule: removeRule,
 *  update: update,
 *  setTraceOptions: setTraceOptions
 * }}
 */
module.exports = function () {

    /**
     * STATE (object)
     * needs to be initialized and will be updated by vectors
     */
    var state = {};

    /**
     * Options for rules
     * @type {{useSchema: boolean}}
     */
    var ruleOptions = {
        useSchema: false
    };

    /**
     * RULES (objected hashed by vector attribute)
     * determines how VECTOR updates state and how vector produce PRODUCT
     * vector and rule have one-to-one correspondence
     * Required parameters:
     * {
     *     'vector': '<name of the vector it applies to>',
     *     'condition': '<expression with vector and state evaluates to a boolean>',
     *     'execution': '<expression with vector, state and product>',
     *     'schema': <optional JSON schema object to validate vector>
     * }
     * Flow: Given the vector, the exact rule that matches the vector is applied.
     * For the rule, condition is evaluated first to make sure this rules applies.
     * If the condition is evaluated to true, then execution is evaluated to update
     * state and produce product.
     * @type {object}
     */
    var rules = {};

    /**
     * Options for trace recording
     * @type {{
     *  enabled: boolean,
     *  captureVector: boolean,
     *  captureState: boolean,
     *  captureProduct: boolean
     * }}
     */
    var traceOptions = {
        enabled: false,
        captureVector: true,
        captureState: false,
        captureProduct: false
    };

    /**
     * Traces of all the incoming vectors (serve as in module logging)
     * {
     *      'vector': <vector object>,
     *      'state': <state snapshot>,
     *      'product': <product object>,
     *      'ts': <timestamp as epoch>
     * }
     * @type {Array}
     */
    var traces = [];

    /**
     * returned functions
     */
    return {

        //
        // STATE
        //

        /**
         * get current state
         * @returns {{}} state
         */
        getState: function () {
            return state;
        },

        /**
         * manually set state (use this for initialize)
         * @param s state
         */
        setState: function (s) {
            state = s;
        },

        //
        // RULES
        //

        /**
         * Get rule options
         * @returns {{*}}
         */
        getRuleOptions: function () {
            return ruleOptions;
        },

        /**
         * Set rule options
         * @param opts should match ruleOptions definition
         */
        setRuleOptions: function (opts) {
            for (var key in ruleOptions) {
                if (opts.hasOwnProperty(key) && (typeof opts[key] === typeof ruleOptions[key])) {
                    traceOptions[key] = opts[key];
                }
            }
        },

        /**
         * get current rules
         * @returns {{}}
         */
        getRules: function () {
            return rules;
        },

        /**
         * add rule to rules hash table
         * @param r rule object
         * @returns {boolean} add successful
         */
        addRule: function (r) {
            // check rule validity
            if (!r.hasOwnProperty('vector') ||
                !r.hasOwnProperty('condition') ||
                !r.hasOwnProperty('execution')) {
                return false;
            }
            else {
                rules[r.vector] = r;
                return true;
            }
        },

        /**
         * remove rule from rules hash table
         * @param r rule object (only needs vector attribute)
         * @returns {boolean} remove successful
         */
        removeRule: function (r) {
            // check rule validity
            if (!r.hasOwnProperty('vector')) {
                return false;
            }
            // check rules contains rule
            if (!rules.hasOwnProperty(r.vector)) {
                return false;
            }
            delete rules[r.vector];
            return true;
        },

        //
        // VECTORS
        //

        /**
         * update state with vector
         * vector format
         * {
         *     'vector': 'name of the vector',
         *     <additional key-value paira>
         * }
         * @param v vector
         * @returns {{valid: boolean, product: {}}}
         */
        update: function (v) {
            // returned result
            var result = {
                valid: false,
                product: {}
            };
            // check vector validity
            if (v.hasOwnProperty('vector') && rules.hasOwnProperty(v.vector)) {
                // prepare
                var vector = v;
                var product = {};
                var rule = rules[v.vector];
                // update
                try {
                    if (eval(rule.condition)) {
                        eval(rule.execution);
                    }
                    result.valid = true;
                    result.product = product;
                    // add trace
                    if (traceOptions.enabled) {
                        // build trace
                        var trace = {};
                        trace.ts = Date.now();
                        trace.vector = traceOptions.captureVector ? vector : {};
                        trace.state = traceOptions.captureState ? state : {};
                        trace.product = traceOptions.captureProduct ? product : {};
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            // return
            return result;
        },

        //
        // traces
        //

        /**
         * Get traces
         * @returns {Array}
         */
        getTraces: function () {
            return traces;
        },

        /**
         * Get trace options
         * @returns {{}}
         */
        getTraceOptions: function () {
            return traceOptions;
        },

        /**
         * Set trace options
         * @param opts should match traceOptions definition
         */
        setTraceOptions: function (opts) {
            for (var key in traceOptions) {
                if (opts.hasOwnProperty(key) && (typeof opts[key] === typeof traceOptions[key])) {
                    traceOptions[key] = opts[key];
                }
            }
        }

    };

};
