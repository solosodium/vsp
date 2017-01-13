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

var config = JSON.parse((require('fs')).readFileSync("../example/config.json"));
console.log(config);

var s = new State(config);
console.log(s.getState());
