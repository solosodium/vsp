
var vsp = require('./vsp.js')();

var rule1 = {
    'vector': 'vector1',
    'condition': 'true',
    'execution': 'state.ex = vector.a; product.ss = \'nah\';'
};

var rule2 = {

};

var vector1 = {
    'vector': 'vector1',
    'a': 'what !!!'
};


/*
console.log(vsp.getState());

vsp.addRule(rule1);
console.log(vsp.update(vector1));

console.log(vsp.getState());
*/

// trace options test
console.log(vsp.getTraceOptions());
vsp.setTraceOptions({
    captureState: true
});
console.log(vsp.getTraceOptions());
