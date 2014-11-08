/**---------------------------------------------------------------------------------------------------------------------
 * tgi-store-json-file/lib/tgi-store-json-file.spec.js
 */
/**
 * Doc Intro
 */
spec.test('lib/tgi-store-json-file.spec.js', 'JSONFILE', '', function (callback) {
  var coreTests = spec.mute(false);
  spec.heading('JSONFileStore', function () {
    spec.paragraph('The JSONFileStore handles data storage via JSONFILE.');
    spec.paragraph('Core tests run: ' + JSON.stringify(coreTests));
    spec.heading('CONSTRUCTOR', function () {
      spec.heading('Store Constructor tests are applied', function () {
        spec.runnerStoreConstructor(JSONFileStore,true);
      });
      spec.example('objects created should be an instance of JSONFileStore', true, function () {
        return new JSONFileStore() instanceof JSONFileStore;
      });
    });
    spec.heading('Store tests are applied', function () {
      spec.runnerStoreMethods(JSONFileStore,true);
      spec.runnerListStoreIntegration(JSONFileStore);
    });
  });
});
