(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-polyfill'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-polyfill'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.babelPolyfill);
    global.search = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
      var endpoint = _ref2.endpoint,
          source = _ref2.source,
          accessToken = _ref2.accessToken,
          _ref2$proximity = _ref2.proximity,
          proximity = _ref2$proximity === undefined ? '' : _ref2$proximity,
          _ref2$bbox = _ref2.bbox,
          bbox = _ref2$bbox === undefined ? '' : _ref2$bbox,
          _ref2$types = _ref2.types,
          types = _ref2$types === undefined ? '' : _ref2$types,
          query = _ref2.query,
          onResult = _ref2.onResult;
      var searchTime, uri, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              searchTime = new Date();
              uri = endpoint + '/geocoding/v5/' + source + '/' + encodeURIComponent(query) + '.json?access_token=' + accessToken + (proximity ? '&proximity=' + proximity : '') + (bbox ? '&bbox=' + bbox : '') + (types ? '&types=' + encodeURIComponent(types) : '');
              _context.next = 4;
              return fetch(uri);

            case 4:
              _context.next = 6;
              return _context.sent.json();

            case 6:
              data = _context.sent;


              onResult(data, searchTime);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function search(_x) {
      return _ref.apply(this, arguments);
    }

    return search;
  }();
});
//# sourceMappingURL=search.js.map