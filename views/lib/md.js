(function (global) {
  //factories cache
  var factories = {};
  //modules cache
  var modules = {};
  //defined cache
  var defined = {};

  var PREFIX = 'components/';
  var PREFIX_LENGHT = PREFIX.length;

  /**
   * define(id, factory), define(factory)
   *
   * @param {String|Function} id
   * @param {Function|undefined} factory
   */
  global.define = function (id, factory) {
    switch (typeof id) {
      case 'string':
        if (defined.hasOwnProperty(id)) {
          throw new Error('cannot redeclare module [' + id + ']');
        } else {
          if (typeof factory === 'function') {
            factories[id] = factory;
          } else {
            modules[id] = factory;
          }
        }
        defined[id] = true;
        break;
      case 'function':
        id(require);
        break;
    }
  };

  /**
   * require(id)
   *
   * @param {String} id
   * @returns {*}
   */
  var require = global.require = function (id) {
    if(id.indexOf('.') === -1){
      var last = id.split('/').pop();
      id = id + '/' + last + '.js';
    }
    if(id.substring(0, PREFIX_LENGHT) !== PREFIX){
      id = 'components/' + id;
    }
    if (modules.hasOwnProperty(id)) {    //if cached
      return modules[id];
    } else if (factories.hasOwnProperty(id)) {    //has factory
      var module = {exports: {}},
        factory = factories[id],
        exports = modules[id]
          = module.exports;
      exports = factory(require, exports, module);
      if (typeof exports === 'undefined') {
        modules[id] = exports = module.exports;
      } else {
        modules[id] = exports;
      }
      return exports;
    } else {    //undefined module
      throw new Error('undefined module [' + id + ']');
    }
  };
})(window);
