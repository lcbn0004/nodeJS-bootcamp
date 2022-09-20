// Each JavaScript file is traeted as a separate module
// Node.js uses the CommonJS module system: require(), exports or module.exports;
// ES module system is used in browsers: import/export;
// There have been attempts to bring ES modules to node.js(.mjs)
//
// resolving & loading --> wrapping --> execution --> returning exports --> caching
//
// core modules         =   require('http')
// developer modules    =   require('./lib/controller)
// 3rd-party modules    =   require('express')
//
///////////////////////////////////////////////////////////////////////////////////
// resolving & loading
//
// Path resolving: how node decides whichi module to load
// 1. Start with core modules
// 2. If begins with './' or '../', try to load developer module
// 3. If no file bound, try to find folder with index.js in it
// 4. Else, go to ./node_modules and try to find module there.
//
///////////////////////////////////////////////////////////////////////////////////
// wrapping
//
// (function(exports, require, module, __filename, __dirname) {
//    Module code lives here..
// })
//
// require: function to require modules
// module: reference to the current module
// exports: a reference to module.exports, used to export object from a module
// __filename: absolute path of the current module's file
// __dirname: directory name of the current module
//
///////////////////////////////////////////////////////////////////////////////////
// execution
//
//
///////////////////////////////////////////////////////////////////////////////////
// returning exports
//
// require function returns exports of the required module
// module.exports is the returned object (important!)
// use module.exports to export one single variable, e.g. one
// class or one function (module.exports = Calculator)
// use exports to export multiple named variables
// (exports.add = (a, b) => a + b)
// This is how we import data from one module into another
//
///////////////////////////////////////////////////////////////////////////////////
// caching
//

// module.exports
console.log('////////////////////////////////////////');
console.log('// arguments');
console.log(arguments);
console.log('\n////////////////////////////////////////');
console.log(`// require('module').wrapper`);
console.log(require('module').wrapper);

console.log('\n////////////////////////////////////////');
console.log('// test-module-1.add(2, 5)');
const C = require('./2-how-node-works/final/test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
console.log('\n////////////////////////////////////////');
console.log('// test-module-2.add(2, 5)');
const calc2 = require('./2-how-node-works/final/test-module-2');
console.log(calc2.add(2, 5));

console.log('\n////////////////////////////////////////');
console.log('// test-module-2.multiply(2, 5)');
console.log(calc2.multiply(2, 5));

console.log('\n////////////////////////////////////////');
console.log('// test-module-2.add(2, 5)');
const { add, multiply, divide } = require('./part5-test-module-2');
console.log(add(2, 5));

console.log('\n////////////////////////////////////////');
console.log('// test-module-2.multiply(2, 5)');
console.log(multiply(2, 5));

// caching
// 'Hello from the module' is loaded once ==> cached
// 'Log this beautiful text' is loaded three times ==> function is called w more time from the cached module
console.log('\n////////////////////////////////////////');
console.log('// test-module-3 caching');
require('./2-how-node-works/final/test-module-3')()
require('./2-how-node-works/final/test-module-3')()
require('./2-how-node-works/final/test-module-3')()