
#### JSONFileStore
The JSONFileStore handles data storage via JSONFILE.    

Core tests run: {"testsCreated":430}    

#### CONSTRUCTOR
#### Store Constructor tests are applied
&nbsp;<b><i>objects created should be an instance of Store:</i></b>
```javascript
return new SurrogateStore() instanceof Store;
```
<blockquote>returns <strong>true</strong> as expected
</blockquote>
&nbsp;<b><i>should make sure new operator used:</i></b>
```javascript
SurrogateStore(); // jshint ignore:line
```
<blockquote><strong>Error: new operator required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>should make sure properties are valid:</i></b>
```javascript
new SurrogateStore({food: 'twinkies'});
```
<blockquote><strong>Error: error creating Store: invalid property: food</strong> thrown as expected
</blockquote>
&nbsp;<b><i>objects created should be an instance of JSONFileStore:</i></b>
```javascript
return new JSONFileStore() instanceof JSONFileStore;
```
<blockquote>returns <strong>true</strong> as expected
</blockquote>
#### Store tests are applied
#### PROPERTIES
#### name
&nbsp;<b><i>name of store can be set in constructor:</i></b>
```javascript
return new SurrogateStore({name: 'punchedCards'}).name;
```
<blockquote>returns <strong>punchedCards</strong> as expected
</blockquote>
#### storeType
storeType defaults to Store Class Name but can be set to suite the app architecture.    

&nbsp;<b><i>storeType can be set in constructor:</i></b>
```javascript
return new SurrogateStore({storeType: 'legacyStorage'}).storeType;
```
<blockquote>returns <strong>legacyStorage</strong> as expected
</blockquote>
#### METHODS
&nbsp;<b><i>getServices() returns an object with interface for the Store.:</i></b>
```javascript
this.log(JSON.stringify(services));
this.shouldBeTrue(services instanceof Object);
this.shouldBeTrue(typeof services['isReady'] == 'boolean'); // don't use until
this.shouldBeTrue(typeof services['canGetModel'] == 'boolean'); // define all allowed methods...
this.shouldBeTrue(typeof services['canPutModel'] == 'boolean');
this.shouldBeTrue(typeof services['canDeleteModel'] == 'boolean');
this.shouldBeTrue(typeof services['canGetList'] == 'boolean');
```
<blockquote><strong>log: </strong>{"isReady":true,"canGetModel":true,"canPutModel":true,"canDeleteModel":true,"canGetList":true}<br></blockquote>
#### toString()
&nbsp;<b><i>should return a description of the Store:</i></b>
```javascript
var cStore = new SurrogateStore();
this.log(cStore.toString());
cStore.name = '7-Eleven';
cStore.storeType = 'ConvenienceStore';
this.log(cStore.toString());
return cStore.toString();
```
<blockquote><strong>log: </strong>ConvenienceStore: 7-Eleven<br><strong>log: </strong>a JSONFileStore<br>returns <strong>ConvenienceStore: 7-Eleven</strong> as expected
</blockquote>
#### onConnect()
&nbsp;<b><i>must pass url string:</i></b>
```javascript
new SurrogateStore().onConnect();
```
<blockquote><strong>Error: argument must a url string</strong> thrown as expected
</blockquote>
&nbsp;<b><i>must pass callback function:</i></b>
```javascript
new SurrogateStore().onConnect("");
```
<blockquote><strong>Error: argument must a callback</strong> thrown as expected
</blockquote>
&nbsp;<b><i>return store and undefined error upon successful connection to remote store.:</i></b>
```javascript
new SurrogateStore().onConnect('', function (store, err) {
  if (err) {
    callback(err);
  } else {
    callback(store instanceof Store);
  }
});
```
<blockquote>returns <strong>true</strong> as expected
</blockquote>
#### getModel()
&nbsp;<b><i>must pass valid model:</i></b>
```javascript
new SurrogateStore().getModel();
```
<blockquote><strong>Error: argument must be a Model</strong> thrown as expected
</blockquote>
&nbsp;<b><i>model must have no validation errors:</i></b>
```javascript
var m = new Model();
m.attributes = null;
new SurrogateStore().getModel(m);
```
<blockquote><strong>Error: model has validation errors</strong> thrown as expected
</blockquote>
&nbsp;<b><i>ID attribute must have truthy value:</i></b>
```javascript
new SurrogateStore().getModel(new Model());
```
<blockquote><strong>Error: ID not set</strong> thrown as expected
</blockquote>
&nbsp;<b><i>callback function required:</i></b>
```javascript
var m = new Model();
m.attributes[0].value = 1;
new SurrogateStore().getModel(m);
```
<blockquote><strong>Error: callBack required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>returns error when model not found:</i></b>
```javascript
var m = new Model();
m.attributes[0].value = 1;
new SurrogateStore().getModel(m, function (mod, err) {
  if (err) {
    callback(err);
  } else {
    callback(mod);
  }
});
```
<blockquote>returns <strong>Error: model not found in store</strong> as expected
</blockquote>
#### putModel(model)
&nbsp;<b><i>must pass valid model:</i></b>
```javascript
new SurrogateStore().putModel();
```
<blockquote><strong>Error: argument must be a Model</strong> thrown as expected
</blockquote>
&nbsp;<b><i>model must have no validation errors:</i></b>
```javascript
var m = new Model();
m.attributes = null;
new SurrogateStore().putModel(m);
```
<blockquote><strong>Error: model has validation errors</strong> thrown as expected
</blockquote>
&nbsp;<b><i>callback function required:</i></b>
```javascript
var m = new Model();
m.attributes[0].value = 1;
new SurrogateStore().putModel(m);
```
<blockquote><strong>Error: callBack required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>returns error when model not found:</i></b>
```javascript
var m = new Model();
m.attributes[0].value = 1;
new SurrogateStore().putModel(m, function (mod, err) {
  if (err) {
    callback(err);
  } else {
    callback(mod);
  }
});
```
<blockquote>returns <strong>Error: model not found in store</strong> as expected
</blockquote>
&nbsp;<b><i>creates new model when ID is not set:</i></b>
```javascript
// This works but pollutes store with crap
var m = new Model();
new SurrogateStore().putModel(m, function (mod, err) {
  if (err) {
    callback(err);
  } else {
    callback(mod.get('id') ? true : false);
  }
});
```
<blockquote>returns <strong>true</strong> as expected
</blockquote>
#### deleteModel(model)
&nbsp;<b><i>must pass valid model:</i></b>
```javascript
new SurrogateStore().deleteModel();
```
<blockquote><strong>Error: argument must be a Model</strong> thrown as expected
</blockquote>
&nbsp;<b><i>model must have no validation errors:</i></b>
```javascript
var m = new Model();
m.attributes = null;
new SurrogateStore().deleteModel(m);
```
<blockquote><strong>Error: model has validation errors</strong> thrown as expected
</blockquote>
&nbsp;<b><i>callback function required:</i></b>
```javascript
var m = new Model();
m.attributes[0].value = 1;
new SurrogateStore().deleteModel(m);
```
<blockquote><strong>Error: callBack required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>returns error when model not found:</i></b>
```javascript
var m = new Model();
m.modelType = 'PeopleAreString!';
m.attributes[0].value = 90210;
new SurrogateStore().deleteModel(m, function (mod, err) {
  if (err) {
    callback(err);
  } else {
    callback(mod);
  }
});
```
<blockquote>returns <strong>Error: model not found in store</strong> as expected
</blockquote>
#### getList(model, filter, order)
This method will clear and populate the list with collection from store.  The **filter** property can be used to query the store.  The **order** property can specify the sort order of the list.  _See integration test for more info._    

&nbsp;<b><i>returns a List populated from store:</i></b>
```javascript
this.shouldThrowError(Error('argument must be a List'), function () {
  new SurrogateStore().getList();
});
this.shouldThrowError(Error('filter argument must be Object'), function () {
  new SurrogateStore().getList(new List(new Model()));
});
this.shouldThrowError(Error('callBack required'), function () {
  new SurrogateStore().getList(new List(new Model()), []);
});
// See integration tests for examples of usage
```
#### Store Integration
#### CRUD (Create Read Update Delete)
&nbsp;<b><i>Exercise all store function for one store.:</i></b>
```javascript
var self = this;
spec.integrationStore = new SurrogateStore();
var storeBeingTested = spec.integrationStore.name + ' ' + spec.integrationStore.storeType;
self.log(storeBeingTested);
// If store is not ready then get out...
if (!spec.integrationStore.getServices().isReady) {
  self.log('Store is not ready.');
  callback(true);
  return;
}
// setup stooge class
self.Stooge = function (args) {
  Model.call(this, args);
  this.modelType = "_tempTest_Stooge";
  this.attributes.push(new Attribute('name'));
};
self.Stooge.prototype = inheritPrototype(Model.prototype);
// create initial stooges
self.moe = new self.Stooge();
self.moe.set('name', 'Moe');
self.larry = new self.Stooge();
self.larry.set('name', 'Larry');
self.shemp = new self.Stooge();
self.shemp.set('name', 'Shemp');
// IDs after stored will be here
self.stoogeIDsStored = [];
self.stoogesRetrieved = [];
self.oldStoogesFound = 0;
self.oldStoogesKilled = 0;
// Make sure store starts in known state.  Stores such as JSONFileStore will retain test values.
// So... use getList to get all stooges then delete them from the Store
var useListToCleanStart = spec.integrationStore.getServices().canGetList;
if (useListToCleanStart) {
  var list = new List(new self.Stooge());
  try {
    self.killhim = new self.Stooge();
    spec.integrationStore.getList(list, [], function (list, error) {
      if (typeof error != 'undefined') {
        callback(error);
        return;
      }
      if (list._items.length < 1)
        storeStooges();
      else
        self.oldStoogesFound = list._items.length;
      for (var i = 0; i < list._items.length; i++) {
        self.killhim.set('id', list._items[i][0]);
        /* jshint ignore:start */
        spec.integrationStore.deleteModel(self.killhim, function (model, error) {
          if (++self.oldStoogesKilled >= self.oldStoogesFound) {
            storeStooges();
          }
        })
        /* jshint ignore:end */
      }
    });
  }
  catch (err) {
    callback(err);
  }
} else {
  storeStooges();
}
// Callback to store new stooges
function storeStooges() {
  self.log(self.oldStoogesFound);
  self.log(self.oldStoogesKilled);
  spec.integrationStore.putModel(self.moe, stoogeStored);
  spec.integrationStore.putModel(self.larry, stoogeStored);
  spec.integrationStore.putModel(self.shemp, stoogeStored);
}
// callback after storing stooges
function stoogeStored(model, error) {
  if (typeof error != 'undefined') {
    callback(error);
    return;
  }
  try {
    self.stoogeIDsStored.push(model.get('id'));
    if (self.stoogeIDsStored.length == 3) {
      self.shouldBeTrue(true,'here');
      // Now that first 3 stooges are stored lets retrieve and verify
      var actors = [];
      for (var i = 0; i < 3; i++) {
        actors.push(new self.Stooge());
        actors[i].set('id', self.stoogeIDsStored[i]);
        spec.integrationStore.getModel(actors[i], stoogeRetrieved);
      }
    }
  }
  catch (err) {
    callback(err);
  }
}
// callback after retrieving stored stooges
function stoogeRetrieved(model, error) {
  if (typeof error != 'undefined') {
    callback(error);
    return;
  }
  self.stoogesRetrieved.push(model);
  if (self.stoogesRetrieved.length == 3) {
    self.shouldBeTrue(true,'here');
    // Now we have stored and retrieved (via IDs into new objects).  So verify the stooges made it
    self.shouldBeTrue(self.stoogesRetrieved[0] !== self.moe && // Make sure not a reference but a copy
    self.stoogesRetrieved[0] !== self.larry && self.stoogesRetrieved[0] !== self.shemp,'copy');
    var s = []; // get list of names to see if all stooges made it
    for (var i = 0; i < 3; i++) s.push(self.stoogesRetrieved[i].get('name'));
    self.log(s);
    self.shouldBeTrue(contains(s, 'Moe') && contains(s, 'Larry') && contains(s, 'Shemp'));
    // Replace Shemp with Curly
    var didPutCurly = false;
    for (i = 0; i < 3; i++) {
      if (self.stoogesRetrieved[i].get('name') == 'Shemp') {
        didPutCurly = true;
        self.stoogesRetrieved[i].set('name', 'Curly');
        try {
          spec.integrationStore.putModel(self.stoogesRetrieved[i], stoogeChanged);
        }
        catch (err) {
          callback(err);
        }
      }
    }
    if (!didPutCurly) {
      callback(Error("Can't find Shemp!"));
    }
  }
}
// callback after storing changed stooge
function stoogeChanged(model, error) {
  if (typeof error != 'undefined') {
    callback(error);
    return;
  }
  self.shouldBeTrue(model.get('name') == 'Curly','Curly');
  var curly = new self.Stooge();
  curly.set('id', model.get('id'));
  try {
    spec.integrationStore.getModel(curly, storeChangedShempToCurly);
  }
  catch (err) {
    callback(err);
  }
}
// callback after retrieving changed stooge
function storeChangedShempToCurly(model, error) {
  if (typeof error != 'undefined') {
    callback(error);
    return;
  }
  self.shouldBeTrue(model.get('name') == 'Curly','Curly');
  // Now test delete
  self.deletedModelId = model.get('id'); // Remember this
  spec.integrationStore.deleteModel(model, stoogeDeleted);
}
// callback when Curly is deleted
function stoogeDeleted(model, error) {
  if (typeof error != 'undefined') {
    callback(error);
    return;
  }
  // model parameter is what was deleted
  self.shouldBeTrue(model.get('id') === null,'no id'); // ID is removed
  self.shouldBeTrue(model.get('name') == 'Curly'); // the rest remains
  // Is it really dead?
  var curly = new self.Stooge();
  curly.set('id', self.deletedModelId);
  spec.integrationStore.getModel(curly, hesDeadJim);
}
// callback after lookup of dead stooge
function hesDeadJim(model, error) {
  if (typeof error != 'undefined') {
    if ((error != 'Error: id not found in store') && (error != 'Error: model not found in store')) {
      callback(error);
      return;
    }
  } else {
    callback(Error('no error deleting stooge when expected'));
    return;
  }
  // Skip List test if subclass can't do
  if (!spec.integrationStore.getServices().canGetList) {
    callback(true);
  } else {
    // Now create a list from the stooge store
    var list = new List(new self.Stooge());
    try {
      spec.integrationStore.getList(list, {}, {name:1}, listReady);
    }
    catch (err) {
      callback(err);
    }
  }
}
// callback after list created from store
function listReady(list, error) {
//          list.sort({name:1});
  if (typeof error != 'undefined') {
    callback(error);
    return;
  }
  self.shouldBeTrue(list instanceof List,'is list');
  self.shouldBeTrue(list.length() == 2,'is 2');
  list.moveFirst();
  self.shouldBeTrue(list.get('name') == 'Larry','larry');
  list.moveNext();
  self.shouldBeTrue(list.get('name') == 'Moe','moe');
//          self.shouldBeTrue(false,'WHAT'); // temp
//          self.shouldBeTrue(true,'THE'); // temp
//          self.shouldBeTrue(false,'FUCK'); // temp
  callback(true);
}
```
<blockquote><strong>log: </strong>Moe,Shemp,Larry<br><strong>log: </strong>2<br><strong>log: </strong>2<br><strong>log: </strong>a JSONFileStore JSONFileStore<br>returns <strong>true</strong> as expected
<br>Assertion(s) failed
</blockquote>
&nbsp;<b><i>Test variations on getList method.:</i></b>
```javascript
var test = this;
var storeBeingTested = new SurrogateStore();
test.log(storeBeingTested);
// Create list of actors
test.actorsInfo = [
  // Actor Born Male Oscards
  ['Jack Nicholson', new Date("01/01/1937"), true, 3],
  ['Meryl Streep', new Date("01/01/1949"), false, 3],
  ['Marlon Brando', new Date("01/01/1924"), true, 2],
  ['Cate Blanchett', new Date("01/01/1969"), false, 1],
  ['Robert De Niro', new Date("01/01/1943"), true, 2],
  ['Judi Dench', new Date("01/01/1934"), false, 1],
  ['Al Pacino', new Date("01/01/1940"), true, 1],
  ['Nicole Kidman', new Date("01/01/1967"), false, null],
  ['Daniel Day-Lewis', new Date("01/01/1957"), true, null],
  ['Shirley MacLaine', new Date("01/01/1934"), false, null],
  ['Dustin Hoffman', new Date("01/01/1937"), true, null],
  ['Jodie Foster', new Date("01/01/1962"), false, null],
  ['Tom Hanks', new Date("01/01/1956"), true, null],
  ['Kate Winslet', new Date("01/01/1975"), false, null],
  ['Anthony Hopkins', new Date("01/01/1937"), true, null],
  ['Angelina Jolie', new Date("01/01/1975"), false, null],
  ['Paul Newman', new Date("01/01/1925"), true, null],
  ['Sandra Bullock', new Date("01/01/1964"), false, null],
  ['Denzel Washington', new Date("01/01/1954"), true, null],
  ['Renée Zellweger', new Date("01/01/1969"), false, null]
];
// Create actor class
test.Actor = function (args) {
  Model.call(this, args);
  this.modelType = "Actor";
  this.attributes.push(new Attribute('name'));
  this.attributes.push(new Attribute('born', 'Date'));
  this.attributes.push(new Attribute('isMale', 'Boolean'));
  this.attributes.push(new Attribute('oscarWs', 'Number'));
};
test.Actor.prototype = inheritPrototype(Model.prototype);
test.actor = new test.Actor(); // instance to use for stuff
// Make sure store starts in known state.  Stores such as JSONFileStore will retain test values.
// So... use getList to get all Actors then delete them from the Store
test.list = new List(new test.Actor());
test.oldActorsKilled = 0;
test.oldActorsFound = 0;
try {
  test.killhim = new test.Actor();
  storeBeingTested.getList(test.list, [], function (list, error) {
    if (typeof error != 'undefined') {
      callback(error);
      return;
    }
    if (list._items.length < 1)
      storeActors();
    else {
      test.oldActorsFound = list._items.length;
      for (var i = 0; i < list._items.length; i++) {
        test.killhim.set('id', list._items[i][0]);
        // jshint ignore:start
        storeBeingTested.deleteModel(test.killhim, function (model, error) {
          if (++test.oldActorsKilled >= test.oldActorsFound) {
            storeActors();
          }
        })
        // jshint ignore:end
      }
    }
  });
}
catch (err) {
  callback(err);
  return;
}
// Callback after model cleaned
// now, build List and add to store
function storeActors() {
  test.actorsStored = 0;
  for (var i=0; i<test.actorsInfo.length; i++) {
    test.actor.set('ID', null);
    test.actor.set('name', test.actorsInfo[i][0]);
    test.actor.set('born', test.actorsInfo[i][1]);
    test.actor.set('isMale', test.actorsInfo[i][2]);
    storeBeingTested.putModel(test.actor, actorStored);
  }
}
// Callback after actor stored
function actorStored(model, error) {
  if (typeof error != 'undefined') {
    callback(error);
    return;
  }
  if (++test.actorsStored >= test.actorsInfo.length) {
    getAllActors();
  }
}
// test getting all 20
function getAllActors() {
  try {
    storeBeingTested.getList(test.list, {}, function (list, error) {
      if (typeof error != 'undefined') {
        callback(error);
        return;
      }
      test.shouldBeTrue(list._items.length == 20,'20');
      getTomHanks();
    });
  }
  catch (err) {
    callback(err);
    return;
  }
}
// only one Tom Hanks
function getTomHanks() {
  try {
    storeBeingTested.getList(test.list, {name: "Tom Hanks"}, function (list, error) {
      if (typeof error != 'undefined') {
        callback(error);
        return;
      }
      test.shouldBeTrue(list._items.length == 1,('1 not ' + list._items.length));
      getD();
    });
  }
  catch (err) {
    callback(err);
    return;
  }
}
// 3 names begin with D
// test RegExp
function getD() {
  try {
    storeBeingTested.getList(test.list, {name: /^D/}, function (list, error) {
      if (typeof error != 'undefined') {
        callback(error);
        return;
      }
      test.shouldBeTrue(list._items.length == 3,('3 not ' + list._items.length));
      getRZ();
    });
  }
  catch (err) {
    callback(err);
    return;
  }
}
// Renée Zellweger only female starting name with 'R'
// test filter 2 properties (logical AND)
function getRZ() {
  try {
    storeBeingTested.getList(test.list, {name: /^R/, isMale: false}, function (list, error) {
      if (typeof error != 'undefined') {
        callback(error);
        return;
      }
      test.shouldBeTrue(list._items.length == 1,('1 not ' + list._items.length));
      //list._items.length && test.shouldBeTrue(list.get('name') == 'Renée Zellweger','rz');
      getAlphabetical();
    });
  }
  catch (err) {
    callback(err);
    return;
  }
}
// Retrieve list alphabetically by name
// test order parameter
function getAlphabetical() {
  try {
    storeBeingTested.getList(test.list, {}, { name: 1 }, function (list, error) {
      if (typeof error != 'undefined') {
        callback(error);
        return;
      }
      // Verify each move returns true when move succeeds
      test.shouldBeTrue(list.moveFirst(),'moveFirst');
      test.shouldBeTrue(!list.movePrevious(),'movePrevious');
      test.shouldBeTrue(list.get('name') == 'Al Pacino','AP');
      test.shouldBeTrue(list.moveLast(),'moveLast');
      test.shouldBeTrue(!list.moveNext(),'moveNext');
      test.shouldBeTrue(list.get('name') == 'Tom Hanks','TH');
      callback(true);
    });
  }
  catch (err) {
    callback(err);
    return;
  }
}
```
<blockquote><strong>log: </strong>a JSONFileStore<br>returns <strong>true</strong> as expected
</blockquote>
## [&#9664;](#-jsonfile)&nbsp;[&#8984;](#table-of-contents) &nbsp;Summary
This documentation generated with https://github.com/tgicloud/tgi-spec.<br>TODO put testin stats here.    
