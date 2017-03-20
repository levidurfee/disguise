var dsg  = require('./index.js');

var h = new dsg('levi', 'stuffs');
var msg = h.encode('leeevi durfee');
console.log(msg);

var s = dsg.e('levi', 'salty', 'only for your eyes and not anyone else.');
console.log(s);

console.log(h.decode('e94705a75c9af2543932ab0770c8d2e7').replace(/~/g, ''));
