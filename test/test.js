/**
 * Tests for Rule
 */

var Rule = require("../lib/rule.js");

//var r1 = new Rule();
//var r2 = new Rule({});
//var r3 = new Rule({'vector':'v', 'condition':'c', 'execution':'e'});
//var r4 = new Rule({'vector':'v', 'condition':'c', 'execution':'e', 'schema':{'a':{}}});
//console.log(r4);

/**
 * Tests for State
 */

var State = require("../lib/state.js");

//var s1 = new State();
//var s2 = new State({});
//var s3 = new State({'name':'n', 'description':'d'});
var s4 = new State({'name':'n', 'description':'d', 'state': {}});
console.log(s4);
//var s5 = new State({'name':'n', 'description':'d', 'state': {'template':{}, 'rules':[]}});
//s5.addRule({'vector':'v1', 'condition':'c', 'execution':'e'});
//s5.addRule({'vector':'v2', 'condition':'c', 'execution':'e'});
//s5.removeRule('v2');
//console.log(s5.getRules());

/**
 * Tests for Vector
 */

var Vector = require("../lib/vector.js");

//var v1 = new Vector();
//var v2 = new Vector({});
//var v3 = new Vector({vector: 'v'});
//var v4 = new Vector({data: {}});
//var v5 = new Vector({vector: 'v', data: {}});
//console.log(v5);
