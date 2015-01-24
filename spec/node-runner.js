/**---------------------------------------------------------------------------------------------------------------------
 * tgi-store-json-file/spec/node-runner.js
 */
var Spec = require('tgi-spec/dist/tgi.spec.js');
var testSpec = require('../dist/tgi-store-json-file.spec.js');
var TGI = require('../dist/tgi-store-json-file.js');
var _package = require('../package');

if (_package.version != TGI.STORE.JSONFILE().version) {
  console.error('Library version %s does not match package.json %s',TGI.STORE.JSONFILE().version,_package.version);
  process.exit(1);
}

var spec = new Spec();
testSpec(spec, TGI);
var fs = require('fs');
var JSONFileStore = TGI.STORE.JSONFILE().JSONFileStore;
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
        //console.log(msg.log);
      }
    });
  }
}, {vendor: fs, keepConnection: true});

