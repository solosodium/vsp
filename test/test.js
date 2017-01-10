/**
 * test for Rule class
 */

/*
var Rule = require("../lib/rule.js");

var r = new Rule('a', 'b', 3);
console.log(r);
r.vector = 'xx';
r. condition = "aa";
console.log(r);
*/

/**
 * test State class
 */

var State = require("../lib/state.js");

var s = new State("hello");
console.log(s);
console.log(s.getState());

