/**---------------------------------------------------------------------------------------------------------------------
 * tgi-store-json-file/lib/tgi-store-json-file.source.js
 */

// Constructor
var JSONFileStore = function (args) {
  if (false === (this instanceof JSONFileStore)) throw new Error('new operator required');
  args = args || {};
  this.storeType = args.storeType || "JSONFileStore";
  this.name = args.name || 'a ' + this.storeType;

  this.storeProperty = {
    isReady: true,
    canGetModel: true,
    canPutModel: true,
    canDeleteModel: true,
    canGetList: true
  };
  this.data = [];// Each ele is an array of model types and contents (which is an array of IDs and Model Value Store)
  this.idCounter = 0;
  var unusedProperties = getInvalidProperties(args, ['name', 'storeType']);
  var errorList = [];
  for (var i = 0; i < unusedProperties.length; i++) errorList.push('invalid property: ' + unusedProperties[i]);
  if (errorList.length > 1) throw new Error('error creating Store: multiple errors');
  if (errorList.length) throw new Error('error creating Store: ' + errorList[0]);
  //if (JSONFileStore._connection) {
  //  this.storeProperty.isReady = true;
  //  this.storeProperty.canGetModel = true;
  //  this.storeProperty.canPutModel = true;
  //  this.storeProperty.canDeleteModel = true;
  //  this.mongoServer = JSONFileStore._connection.mongoServer;
  //  this.mongoDatabase = JSONFileStore._connection.mongoDatabase;
  //}
};
JSONFileStore.prototype = Object.create(Store.prototype);
// Methods
JSONFileStore.prototype.onConnect = function (location, callBack, options) {
  if (typeof location != 'string') throw new Error('argument must a url string');
  if (typeof callBack != 'function') throw new Error('argument must a callback');
  if (options && options.fs)
    JSONFileStore.fs = options.fs;
  callBack(this, undefined);
};
JSONFileStore.prototype.putModel = function (model, callBack) {
  if (!(model instanceof Model)) throw new Error('argument must be a Model');
  if (model.getObjectStateErrors().length) throw new Error('model has validation errors');
  if (typeof callBack != "function") throw new Error('callBack required');
  var id = model.get('ID');
  var pathName = 'json-file-store/' + model.modelType;
  var fileName = pathName + '/' + id + '.JSON';
  var firstTry = true;
  // If no id then make one
  if (!id) {
    id = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 20; i++)
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    model.set('ID', id);
    fileName = pathName + '/' + id + '.JSON';
    _WriteFile();
  } else {
    // if id given make sure exists already
    JSONFileStore.fs.exists(fileName, function (exists) {
      if (exists)
        _WriteFile();
      else
        callBack(model, new Error('model not found in store'));
    });
  }
  function _WriteFile() {
    // copy values from model
    model.set('id', id)
    var modelValues = {};
    for (var i = 0; i < model.attributes.length; i++) {
      modelValues[model.attributes[i].name] = model.attributes[i].value;
    }
    JSONFileStore.fs.writeFile(fileName, JSON.stringify(modelValues, null, 2), function (err) {
      if (err) {
        // Try making model folder if it failed
        if (firstTry) {
          firstTry = false;
          JSONFileStore.fs.mkdir(pathName, undefined, function (err) {
            if (err) {
              if (err.code == 'EEXIST')
                _WriteFile(); // Race condition means it got created so we good
              else
                callBack(model, err);
            } else {
              _WriteFile();
            }
          });
        } else {
          callBack(model, err);
        }
      } else {
        callBack(model);
      }
    });
  }
};
JSONFileStore.prototype.getModel = function (model, callBack) {
  if (!(model instanceof Model)) throw new Error('argument must be a Model');
  if (model.getObjectStateErrors().length) throw new Error('model has validation errors');
  if (!model.attributes[0].value) throw new Error('ID not set');
  if (typeof callBack != "function") throw new Error('callBack required');
  var id = model.get('ID');
  var pathName = 'json-file-store/' + model.modelType;
  var fileName = pathName + '/' + id + '.JSON';
  JSONFileStore.fs.readFile(fileName, function (err, data) {
    if (err) {
      callBack(model, new Error('model not found in store'));
    } else {
      try {
        var dataJSON = JSON.parse(data);
        for (var name in dataJSON) {
          if (dataJSON.hasOwnProperty(name)) {
            var value = dataJSON[name];
            model.set(name, value);
          }
        }
        callBack(model);
      } catch (err) {
        callBack(model, new Error('JSON.parse ' + err));
      }
    }
  });
};
JSONFileStore.prototype.deleteModel = function (model, callBack) {
  if (!(model instanceof Model)) throw new Error('argument must be a Model');
  if (model.getObjectStateErrors().length) throw new Error('model has validation errors');
  if (typeof callBack != "function") throw new Error('callBack required');
  var id = model.get('ID');
  var pathName = 'json-file-store/' + model.modelType;
  var fileName = pathName + '/' + id + '.JSON';
  JSONFileStore.fs.exists(fileName, function (exists) {
    if (exists) {
      JSONFileStore.fs.unlink(fileName, function (err) {
        if (err) {
          callBack(model, err);
        } else {
          model.set('id', undefined);
          callBack(model, undefined);
        }
      });
    } else
      callBack(model, new Error('model not found in store'));
  });
};
JSONFileStore.prototype.getList = function (list, filter, arg3, arg4) {
  var callBack, order;
  if (typeof(arg4) == 'function') {
    callBack = arg4;
    order = arg3;
  } else {
    callBack = arg3;
  }
  if (!(list instanceof List)) throw new Error('argument must be a List');
  if (!(filter instanceof Object)) throw new Error('filter argument must be Object');
  if (typeof callBack != "function") throw new Error('callBack required');
  var pathName = 'json-file-store/' + list.model.modelType + '/';
  list.clear();
  JSONFileStore.fs.readdir(pathName, function (err, files) {
    if (err) {
      list.clear();
      callBack(list);
      return;
    }
    // Prepare for getting async file reads
    var storedPair = [];
    for (var f in files) {
      if (files.hasOwnProperty(f)) {
        var file = files[f];
        var id = file.split('.')[0];
        var fileName = pathName + '/' + id + '.JSON';
        var ele = [id, {}, fileName];
        storedPair.push(ele);
      }
    }

    // Count files read / launch first
    var filesRead = 0;
    _ReadEle(filesRead);

    // function reads file and invokes self for next one
    function _ReadEle(ele) {
      JSONFileStore.fs.readFile(storedPair[ele][2], function (err, data) {
        filesRead++;
        if (err) {
          console.log('error read ' + err);
          callBack(list);
        } else {
          try {
            var dataJSON = JSON.parse(data);
            for (var name in dataJSON) {
              if (dataJSON.hasOwnProperty(name)) {
                var value = dataJSON[name];
                storedPair[ele][1][name] = value;
              }
            }
            //storedPair[ele][1] = data;
            storedPair[ele].pop(); // file name was temp not part of list structure
            if (filesRead < storedPair.length) {
              _ReadEle(filesRead);
            } else {
              _Cleanup();
            }
          } catch (err) {
            console.log('error catch ' + err);
            callBack(list);
          }
        }
      });
    }

    // When last file processed ...
    function _Cleanup() {
      for (var i = 0; i < storedPair.length; i++) {
        var doIt = true;
        for (var prop in filter) {
          if (filter.hasOwnProperty(prop)) {
            if (filter[prop] instanceof RegExp) {
              if (!filter[prop].test(storedPair[i][1][prop])) doIt = false;
            } else {
              if (filter[prop] != storedPair[i][1][prop]) doIt = false;
            }
          }
        }
        if (doIt) {
          var dataPart = [];
          for (var j in storedPair[i][1]) {
            dataPart.push(storedPair[i][1][j]);
          }
          list._items.push(dataPart);
        }
      }
      list._itemIndex = list._items.length - 1;
      if (order) {
        list.sort(order);
      }
      callBack(list);
    }
  });
};