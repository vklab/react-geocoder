(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './search', './styles', 'babel-polyfill'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./search'), require('./styles'), require('babel-polyfill'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.search, global.styles, global.babelPolyfill);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _search, _styles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _search2 = _interopRequireDefault(_search);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Geocoder = function (_Component) {
    _inherits(Geocoder, _Component);

    function Geocoder() {
      _classCallCheck(this, Geocoder);

      var _this = _possibleConstructorReturn(this, (Geocoder.__proto__ || Object.getPrototypeOf(Geocoder)).call(this));

      _this.state = {
        results: [],
        focus: null,
        loading: false,
        searchTime: new Date(),
        value: ''
      };

      _this.onInput = _this.onInput.bind(_this);
      _this.onKeyDown = _this.onKeyDown.bind(_this);
      _this.clickOption = _this.clickOption.bind(_this);
      _this.onResult = _this.onResult.bind(_this);
      _this.onChange = _this.onChange.bind(_this);
      _this.onSelect = _this.onSelect.bind(_this);
      return _this;
    }

    _createClass(Geocoder, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var focusOnMount = this.props.focusOnMount;

        if (focusOnMount) this.input.focus();
      }
    }, {
      key: 'onChange',
      value: function onChange(_ref) {
        var target = _ref.target;

        this.setState({
          value: target.value
        });
      }
    }, {
      key: 'onInput',
      value: function onInput(e) {
        this.setState({ loading: true });
        var value = e.target.value;

        if (value === '') {
          this.setState({
            results: [],
            focus: null,
            loading: false
          });
        } else {
          var _props = this.props,
              endpoint = _props.endpoint,
              source = _props.source,
              accessToken = _props.accessToken,
              proximity = _props.proximity,
              bbox = _props.bbox,
              types = _props.types;


          (0, _search2.default)({
            endpoint: endpoint,
            source: source,
            accessToken: accessToken,
            proximity: proximity,
            bbox: bbox,
            types: types,
            query: value,
            onResult: this.onResult
          });
        }
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(e) {
        var _state = this.state,
            results = _state.results,
            focus = _state.focus;

        switch (e.which) {
          // up
          case 38:
            e.preventDefault();
            this.moveFocus(-1);
            break;
          // down
          case 40:
            this.moveFocus(1);
            break;
          // accept
          case 13:
            if (results.length > 0 && focus == null) {
              this.clickOption(results[0], 0);
            }
            this.acceptFocus();
            break;
          default:
            break;
        }
      }
    }, {
      key: 'onResult',
      value: function onResult(body, searchTime) {
        var _state2 = this.state,
            oldSearchTime = _state2.searchTime,
            results = _state2.results;
        var onSuggest = this.props.onSuggest;


        // searchTime is compared with the last search to set the state
        // to ensure that a slow xhr response does not scramble the
        // sequence of autocomplete display.
        if (body && body.features && oldSearchTime <= searchTime) {
          this.setState({
            searchTime: searchTime,
            loading: false,
            results: body.features,
            focus: null
          });
          onSuggest(results);
        }
      }
    }, {
      key: 'onSelect',
      value: function onSelect(place) {
        var onSelect = this.props.onSelect;


        this.setState({
          value: '',
          results: []
        });

        onSelect(place);
      }
    }, {
      key: 'setInput',
      value: function setInput(text) {
        this.setState({
          value: text
        });
      }
    }, {
      key: 'moveFocus',
      value: function moveFocus(dir) {
        var _state3 = this.state,
            loading = _state3.loading,
            focus = _state3.focus,
            results = _state3.results;

        if (loading) return;
        this.setState({
          focus: focus === null ? 0 : Math.max(0, Math.min(results.length - 1, focus + dir))
        });
      }
    }, {
      key: 'acceptFocus',
      value: function acceptFocus() {
        var _state4 = this.state,
            focus = _state4.focus,
            results = _state4.results;
        var onSelect = this.props.onSelect;


        if (focus !== null) {
          this.onSelect(results[focus]);
        }
      }
    }, {
      key: 'clickOption',
      value: function clickOption(place, listLocation) {
        var onSelect = this.props.onSelect;


        this.onSelect(place);
        this.setState({ focus: listLocation });

        // focus on the input after click to maintain key traversal
        // this line doesn't work
        // this.input.focus();
        return false;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props2 = this.props,
            inputClass = _props2.inputClass,
            inputPlaceholder = _props2.inputPlaceholder,
            inputPosition = _props2.inputPosition,
            showLoader = _props2.showLoader,
            resultsClass = _props2.resultsClass,
            resultClass = _props2.resultClass,
            resultFocusClass = _props2.resultFocusClass,
            CustomResultList = _props2.ResultList,
            CustomResult = _props2.Result,
            CustomResultLink = _props2.ResultLink,
            CustomInputWrapper = _props2.InputWrapper,
            CustomSearchIcon = _props2.SeachIcon,
            CustomInput = _props2.Input,
            CustomWrapper = _props2.Wraapper;
        var _state5 = this.state,
            results = _state5.results,
            loading = _state5.loading,
            focus = _state5.focus,
            value = _state5.value;


        var Components = {
          ResultList: CustomResultList || _styles.ResultList,
          Result: CustomResult || _styles.Result,
          ResultLink: CustomResultLink || _styles.ResultLink,
          InputWrapper: CustomInputWrapper || _styles.InputWrapper,
          SearchIcon: CustomSearchIcon || _styles.SearchIcon,
          Input: CustomInput || _styles.Input,
          Wrapper: CustomWrapper || _styles.Wrapper
        };

        var input = _react2.default.createElement(
          Components.InputWrapper,
          null,
          _react2.default.createElement(Components.SearchIcon, null),
          _react2.default.createElement(Components.Input, {
            innerRef: function innerRef(ref) {
              _this2.input = ref;
            },
            className: inputClass,
            onInput: this.onInput,
            onKeyDown: this.onKeyDown,
            onChange: this.onChange,
            placeholder: inputPlaceholder,
            type: 'text',
            value: value
          })
        );

        return _react2.default.createElement(
          Components.Wrapper,
          null,
          inputPosition === 'top' && input,
          _react2.default.createElement(
            Components.ResultList,
            { className: '\n              ' + (showLoader && loading ? 'loading' : '') + '\n              ' + resultsClass
            },
            results.length > 0 && results.map(function (result, i) {
              return _react2.default.createElement(
                Components.Result,
                { key: result.id },
                _react2.default.createElement(
                  Components.ResultLink,
                  {
                    type: 'button',
                    onClick: function onClick() {
                      return _this2.clickOption(result, i);
                    },
                    className: resultClass + ' ' + (i === focus ? resultFocusClass : ''),
                    key: result.id
                  },
                  result.place_name
                )
              );
            })
          ),
          inputPosition === 'bottom' && input
        );
      }
    }]);

    return Geocoder;
  }(_react.Component);

  exports.default = Geocoder;


  Geocoder.propTypes = {
    endpoint: _propTypes2.default.string,
    source: _propTypes2.default.string,
    accessToken: _propTypes2.default.string.isRequired,

    inputClass: _propTypes2.default.string,
    resultClass: _propTypes2.default.string,
    resultsClass: _propTypes2.default.string,
    resultFocusClass: _propTypes2.default.string,

    ResultList: _propTypes2.default.element,
    Result: _propTypes2.default.element,
    ResultLink: _propTypes2.default.element,
    InputWrapper: _propTypes2.default.element,
    SeachIcon: _propTypes2.default.element,
    Input: _propTypes2.default.element,
    Wraapper: _propTypes2.default.element,

    showLoader: _propTypes2.default.bool,
    focusOnMount: _propTypes2.default.bool,

    inputPosition: _propTypes2.default.string,
    inputPlaceholder: _propTypes2.default.string,

    onSelect: _propTypes2.default.func.isRequired,
    onSuggest: _propTypes2.default.func,

    proximity: _propTypes2.default.string,
    bbox: _propTypes2.default.arrayOf(_propTypes2.default.number),

    types: _propTypes2.default.string
  };

  Geocoder.defaultProps = {
    endpoint: 'https://api.tiles.mapbox.com',

    inputClass: '',
    resultClass: '',
    resultsClass: '',
    resultFocusClass: 'strong',

    ResultList: null,
    Result: null,
    ResultLink: null,
    InputWrapper: null,
    SeachIcon: null,
    Input: null,
    Wraapper: null,

    inputPosition: 'top',

    inputPlaceholder: 'Search',

    showLoader: false,

    source: 'mapbox.places',
    proximity: '',

    bbox: [],
    types: '',

    onSuggest: function onSuggest() {
      return null;
    },
    focusOnMount: true
  };
});
//# sourceMappingURL=index.js.map