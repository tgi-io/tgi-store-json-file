/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/spec/node-runner.js
 */
var Spec = require('tgi-spec/dist/tgi.spec.js');
var testSpec = require('../dist/tgi-store-json-file.spec.js');
var spec = new Spec();
var UTILITY = require('tgi-utility/dist/tgi.utility');
var CORE = require('../dist/tgi-store-json-file.js');

(function () {
  UTILITY().injectMethods(this);
  console.log('eat');
  CORE().injectMethods(this);
  console.log('more');
  testSpec(spec, CORE);
  var fs = require('fs');
  var myJSONFileStore = new JSONFileStore({name: 'Host Test Store'});
  myJSONFileStore.onConnect('http://localhost', function (store, err) {
    if (err) {
      console.log('JSONFileStore unavailable (' + err + ')');
      process.exit(1);
    } else {
      console.log('JSONFileStore connected');
      spec.runTests(function (msg) {
        if (msg.error) {
          console.log('UT OH: ' + msg.error);
          process.exit(1);
        } else if (msg.done) {
          console.log('Testing completed with  ...');
          console.log('testsCreated = ' + msg.testsCreated);
          console.log('testsPending = ' + msg.testsPending);
          console.log('testsFailed = ' + msg.testsFailed);
          if (msg.testsFailed || msg.testsPending)
            process.exit(1);
          else
            process.exit(0);
        } else if (msg.log) {
          console.log(msg.log);
        }
      });
    }
    console.log(myJSONFileStore.name + ' ' + myJSONFileStore.storeType);
  }, {vendor: fs, keepConnection: true});
}());
