/**
 * Tests for Rule
 */

var Rule = require("../lib/rule.js");

//var r1 = new Rule();
//var r2 = new Rule({});
//var r3 = new Rule({'vector':'v', 'condition':'c', 'execution':'e'});
//var r4 = new Rule({'vector':'v', 'condition':'c', 'execution':'e', 'schema':{'a':{}}});

/**
 * Tests for State
 */

var State = require("../lib/state.js");

//var s1 = new State();
//var s2 = new State({});
//var s3 = new State({'name':'n', 'description':'d'});
//var s4 = new State({'name':'n', 'description':'d', 'state': {}});
var s5 = new State({'name':'n', 'description':'d', 'state': {'template':{}, 'rules':[]}});

console.log(s5);

