/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"www/js/build/dev/reactpages/playersegmentation/main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/customer/player-segmentation/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/js/source/reactpages/actions/dateRangeAction.js":
/*!*************************************************************!*\
  !*** ./www/js/source/reactpages/actions/dateRangeAction.js ***!
  \*************************************************************/
/*! exports provided: setDateRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDateRange", function() { return setDateRange; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var setDateRange = function setDateRange(dateRange) {
  var range = {
    fromDate: dateRange.startDate,
    toDate: dateRange.endDate
  };
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_DATE_RANGE"],
    data: range
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/gridDataAction.js":
/*!************************************************************!*\
  !*** ./www/js/source/reactpages/actions/gridDataAction.js ***!
  \************************************************************/
/*! exports provided: getGridData, setGridData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGridData", function() { return getGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony import */ var _jsroot_actions_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/types.js */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");



function getGridData(url, params) {
  return function (dispatch) {
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__["default"].postData(url, params).then(function (response) {
      response.data.timestamp = new Date().getTime();
      dispatch(setGridData(response.data));
    })["catch"](function (error) {
      alert("Sorry, an error occurred while processing your request.");
      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_2__["toggleLoader"])(false));
    });
  };
}
function setGridData(data) {
  return {
    type: _jsroot_actions_types_js__WEBPACK_IMPORTED_MODULE_0__["SET_GRID_DATA"],
    data: data
  };
}

/***/ }),

/***/ "./www/js/source/reactpages/actions/loaderAction.js":
/*!**********************************************************!*\
  !*** ./www/js/source/reactpages/actions/loaderAction.js ***!
  \**********************************************************/
/*! exports provided: toggleLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleLoader", function() { return toggleLoader; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var toggleLoader = function toggleLoader(show) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["TOGGLE_LOADER"],
    data: show
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/types.js":
/*!***************************************************!*\
  !*** ./www/js/source/reactpages/actions/types.js ***!
  \***************************************************/
/*! exports provided: FETCH_DATA, SET_GRID_DATA, SET_SELECTED_PRODUCT, SET_SELECTED_BASECURRENCY, SET_BASECURRENCY_LIST, SET_SELECTED_CURRENCY, TOGGLE_LOADER, CHANGE_IS_EXCLUDE_TEST, USER_GUIDE_CONTENT, SET_DATE_RANGE, GET_DATE_CONSTRAINT, CHANGE_IS_CONVERT_ALL, SET_SELECTED_STATUS, SET_SELECTED_PLATFORM, SET_SELECTED_LIVESTATUS, SET_USERNAME, SET_REQUEST_PARAM, SET_REPORT_TITLE, SET_PAGING_OPTION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_DATA", function() { return FETCH_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_GRID_DATA", function() { return SET_GRID_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_PRODUCT", function() { return SET_SELECTED_PRODUCT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_BASECURRENCY", function() { return SET_SELECTED_BASECURRENCY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_BASECURRENCY_LIST", function() { return SET_BASECURRENCY_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_CURRENCY", function() { return SET_SELECTED_CURRENCY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOGGLE_LOADER", function() { return TOGGLE_LOADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_IS_EXCLUDE_TEST", function() { return CHANGE_IS_EXCLUDE_TEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_GUIDE_CONTENT", function() { return USER_GUIDE_CONTENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_DATE_RANGE", function() { return SET_DATE_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_DATE_CONSTRAINT", function() { return GET_DATE_CONSTRAINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_IS_CONVERT_ALL", function() { return CHANGE_IS_CONVERT_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_STATUS", function() { return SET_SELECTED_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_PLATFORM", function() { return SET_SELECTED_PLATFORM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_LIVESTATUS", function() { return SET_SELECTED_LIVESTATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_USERNAME", function() { return SET_USERNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REQUEST_PARAM", function() { return SET_REQUEST_PARAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REPORT_TITLE", function() { return SET_REPORT_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PAGING_OPTION", function() { return SET_PAGING_OPTION; });
var FETCH_DATA = 'FETCH_DATA';
var SET_GRID_DATA = "SET_GRID_DATA";
/* Product */

var SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";
/* Base Currency */

var SET_SELECTED_BASECURRENCY = "SET_SELECTED_BASECURRENCY";
var SET_BASECURRENCY_LIST = "SET_BASECURRENCY_LIST";
/* Currency */

var SET_SELECTED_CURRENCY = "SET_SELECTED_CURRENCY";
/* Loader */

var TOGGLE_LOADER = "TOGGLE_LOADER";
/* Exclude Test Data */

var CHANGE_IS_EXCLUDE_TEST = "CHANGE_IS_EXCLUDE_TEST";
/* User mini guide */

var USER_GUIDE_CONTENT = "USER_GUIDE_CONTENT;";
/* Date range */

var SET_DATE_RANGE = 'SET_DATE_RANGE';
var GET_DATE_CONSTRAINT = 'GET_DATE_CONSTRAINT';
/* Convert all figures to base currency */

var CHANGE_IS_CONVERT_ALL = "CHANGE_IS_CONVERT_ALL";
/* Status */

var SET_SELECTED_STATUS = "SET_SELECTED_STATUS";
/* Platform  */

var SET_SELECTED_PLATFORM = "SET_SELECTED_PLATFORM";
/* Live Status  */

var SET_SELECTED_LIVESTATUS = "SET_SELECTED_LIVESTATUS";
var SET_USERNAME = "SET_USERNAME";
var SET_REQUEST_PARAM = "SET_REQUEST_PARAM";
var SET_REPORT_TITLE = "SET_REPORT_TITLE";
/* Live Status  */

var SET_PAGING_OPTION = 'SET_PAGING_OPTION';

/***/ }),

/***/ "./www/js/source/reactpages/actions/usernameAction.js":
/*!************************************************************!*\
  !*** ./www/js/source/reactpages/actions/usernameAction.js ***!
  \************************************************************/
/*! exports provided: setUsername */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUsername", function() { return setUsername; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/actions/types.js");

var setUsername = function setUsername(value) {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_USERNAME"],
    data: value
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/components/CheckBox.jsx":
/*!**********************************************************!*\
  !*** ./www/js/source/reactpages/components/CheckBox.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


var CheckBox = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (props, ref) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox-group",
    ref: ref
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "checkbox",
    id: props.id,
    checked: props.checked,
    disabled: props.disabled,
    onChange: function onChange() {
      return props.onChange(!props.checked);
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: props.id
  }, props.label));
});
CheckBox.propTypes = {
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  checked: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
CheckBox.defaultProps = {
  label: '',
  checked: true,
  disabled: false,
  onChange: function onChange() {}
};
/* harmony default export */ __webpack_exports__["default"] = (CheckBox);

/***/ }),

/***/ "./www/js/source/reactpages/components/Loader.jsx":
/*!********************************************************!*\
  !*** ./www/js/source/reactpages/components/Loader.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var Loader = function Loader(_ref) {
  var isLoading = _ref.isLoading;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "loading-process default",
    style: {
      display: "".concat(isLoading ? 'block' : 'none')
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "icon-loading"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "loader-inner ball-beat"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null))));
};

/* harmony default export */ __webpack_exports__["default"] = (Loader);

/***/ }),

/***/ "./www/js/source/reactpages/components/Overlay.jsx":
/*!*********************************************************!*\
  !*** ./www/js/source/reactpages/components/Overlay.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Overlay; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var wrapperClasses = {
  OVERLAY: "overlay",
  OVERLAY_OPEN: "overlay-open"
};

var Overlay =
/*#__PURE__*/
function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay(props) {
    var _this;

    _classCallCheck(this, Overlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Overlay).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_unRegisterEvents", function () {
      var closeOnOutsideClick = _this.props.closeOnOutsideClick;

      if (closeOnOutsideClick) {
        document.removeEventListener('click', _this._handleClickOutSide);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleClickOutSide", function (event) {
      var clickOutside = _this.containerElement && !_this.containerElement.contains(event.target);

      if (clickOutside && _this.state.isOpening) {
        _this._close();
      }
    });

    _this.containerElement = null;
    _this.refHandlers = {
      container: function container(ref) {
        _this.containerElement = ref;
      }
    };
    _this.state = {
      isOpening: _this.props.isOpening
    };
    return _this;
  }

  _createClass(Overlay, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.props.isOpening !== prevProps.isOpening) {
        var onOpen = this.props.onOpen;
        this.props.isOpening && onOpen && onOpen();
        this.setState({
          isOpening: this.props.isOpening
        });
        window.setTimeout(function () {
          if (_this2.props.isOpening) {
            _this2._registerEvents();
          } else {
            _this2._unRegisterEvents();
          }
        }, 0);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unRegisterEvents();
    }
  }, {
    key: "_registerEvents",
    value: function _registerEvents() {
      var closeOnOutsideClick = this.props.closeOnOutsideClick;

      if (closeOnOutsideClick) {
        document.addEventListener('click', this._handleClickOutSide);
      }
    }
  }, {
    key: "_close",
    value: function _close() {
      var onClose = this.props.onClose;
      this.setState({
        isOpening: false
      }, function () {
        return onClose && onClose();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children;
      var mergedClassName = classnames__WEBPACK_IMPORTED_MODULE_2___default()(wrapperClasses.OVERLAY, _defineProperty({}, wrapperClasses.OVERLAY_OPEN, this.state.isOpening), className);
      var style = {
        display: this.state.isOpening ? "block" : "none"
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: mergedClassName,
        style: style,
        ref: this.refHandlers.container
      }, children);
    }
  }]);

  return Overlay;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(Overlay, "propTypes", {
  closeOnOutsideClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isOpening: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onOpen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(Overlay, "defaultProps", {
  closeOnOutsideClick: true,
  isOpening: false
});



/***/ }),

/***/ "./www/js/source/reactpages/components/auto-complete/AutoComplete.jsx":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/components/auto-complete/AutoComplete.jsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutoComplete; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Overlay */ "./www/js/source/reactpages/components/Overlay.jsx");
/* harmony import */ var _SuggestionList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SuggestionList */ "./www/js/source/reactpages/components/auto-complete/SuggestionList.jsx");
/* harmony import */ var _utils_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/timer */ "./www/js/source/reactpages/components/utils/timer.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var DELAY_TIME_MILLISECOND = 300;

var AutoComplete =
/*#__PURE__*/
function (_Component) {
  _inherits(AutoComplete, _Component);

  function AutoComplete(props) {
    var _this;

    _classCallCheck(this, AutoComplete);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoComplete).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_onKeyDown", function (event) {
      if (!_this.isShowSuggestionList) {
        return;
      }

      var selectedIndex = _this.state.selectedIndex;

      switch (event.keyCode) {
        case 38:
          //up
          if (selectedIndex > 0) {
            _this.setState({
              selectedIndex: selectedIndex - 1
            });
          }

          break;

        case 40:
          //down
          if (selectedIndex < _this.state.suggestions.length - 1) {
            _this.setState({
              selectedIndex: selectedIndex + 1
            });
          }

          break;

        case 13:
          //enter
          if (selectedIndex > -1) {
            var selectedItem = _this.state.suggestions[selectedIndex];

            _this._onSelect(selectedItem);
          }

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_clearState", function () {
      _this.setState({
        suggestions: null,
        selectedIndex: -1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onSelect", function (selectedItem) {
      var onSelect = _this.props.onSelect;
      onSelect && onSelect(selectedItem);
      _this.input.value = _typeof(selectedItem) === "object" ? selectedItem.value : selectedItem;

      _this._clearState();
    });

    _defineProperty(_assertThisInitialized(_this), "_onChange", function (event) {
      var value = (_this.input.value || "").trim();
      var onInput = _this.props.onInput;
      onInput && onInput(value);

      if (value.length < 3) {
        _this._clearState();

        return;
      }

      var cachedData = _this.cacheData[value];

      if (cachedData) {
        _this.setState({
          suggestions: cachedData
        });

        return;
      }

      var url = _this.props.url;

      if (url) {
        _this._getDataByUrl(url, value);
      }
    });

    _this.state = {
      suggestions: null,
      selectedIndex: -1
    };
    _this.input = null;
    _this.cacheData = {};
    _this.onChange = _utils_timer__WEBPACK_IMPORTED_MODULE_6__["default"].debounce(_this._onChange, DELAY_TIME_MILLISECOND).bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AutoComplete, [{
    key: "_setStateWithCaching",
    value: function _setStateWithCaching(value, suggestionList) {
      if (this.props.cache) {
        var cacheKey = value.toLowerCase();
        this.cacheData[cacheKey] = suggestionList;
      }

      this.setState({
        suggestions: suggestionList
      });
    }
  }, {
    key: "_getDataByUrl",
    value: function _getDataByUrl(url, value) {
      var _this2 = this;

      var _this$props = this.props,
          responseDataField = _this$props.responseDataField,
          queryParamName = _this$props.queryParamName;
      var apiUrl = "".concat(url, "?").concat(queryParamName, "=").concat(value);
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(apiUrl, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(function (response) {
        var data = responseDataField ? response.data[responseDataField] : response.data;

        _this2._setStateWithCaching(value, data);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ac-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
        type: "text",
        className: "input-text"
      }, this.props.htmlAttributes, {
        onChange: this.onChange,
        onKeyDown: this._onKeyDown,
        ref: function ref(element) {
          return _this3.input = element;
        }
      })), this.isShowSuggestionList && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_4__["default"], {
        isOpening: true,
        onClose: this._clearState
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SuggestionList__WEBPACK_IMPORTED_MODULE_5__["default"], {
        selectedIndex: this.state.selectedIndex,
        width: this.input.clientWidth,
        dataList: this.state.suggestions,
        onSelect: this._onSelect
      })));
    }
  }, {
    key: "isShowSuggestionList",
    get: function get() {
      return this.state.suggestions && this.state.suggestions.length > 0;
    }
  }]);

  return AutoComplete;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(AutoComplete, "propTypes", {
  url: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  onSelect: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  onInput: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  responseDataField: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  cache: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  queryParamName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  htmlAttributes: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object
});

_defineProperty(AutoComplete, "defaultProps", {
  url: null,
  responseDataField: "suggestions",
  cache: true,
  queryParamName: "query"
});



/***/ }),

/***/ "./www/js/source/reactpages/components/auto-complete/SuggestionList.jsx":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/components/auto-complete/SuggestionList.jsx ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SuggestionList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var SuggestionList =
/*#__PURE__*/
function (_Component) {
  _inherits(SuggestionList, _Component);

  function SuggestionList(props) {
    _classCallCheck(this, SuggestionList);

    return _possibleConstructorReturn(this, _getPrototypeOf(SuggestionList).call(this, props));
  }

  _createClass(SuggestionList, [{
    key: "onSelect",
    value: function onSelect(selectedItem) {
      var onSelect = this.props.onSelect;
      onSelect && onSelect(selectedItem);
    }
  }, {
    key: "_renderDataList",
    value: function _renderDataList() {
      var _this = this;

      return this.props.dataList.map(function (item, index) {
        var className = index === _this.props.selectedIndex ? "ac-item ac-item-active" : "ac-item";
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: "ac-item-".concat(index),
          className: className,
          onClick: _this.onSelect.bind(_this, item)
        }, item && _typeof(item) === "object" ? item.value : item);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        width: this.props.width
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "suggestion-list",
        style: style
      }, this._renderDataList());
    }
  }]);

  return SuggestionList;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(SuggestionList, "propTypes", {
  dataList: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  onSelect: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  width: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  selectedIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number
});



/***/ }),

/***/ "./www/js/source/reactpages/components/auto-complete/index.jsx":
/*!*********************************************************************!*\
  !*** ./www/js/source/reactpages/components/auto-complete/index.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AutoComplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoComplete */ "./www/js/source/reactpages/components/auto-complete/AutoComplete.jsx");

/* harmony default export */ __webpack_exports__["default"] = (_AutoComplete__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./www/js/source/reactpages/components/collapsible-panel/CollapsiblePanel.jsx":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/components/collapsible-panel/CollapsiblePanel.jsx ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var CollapsiblePanel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CollapsiblePanel, _React$Component);

  function CollapsiblePanel(props) {
    var _this;

    _classCallCheck(this, CollapsiblePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CollapsiblePanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var newState = !_this.state.isCollapsed;
      var _this$props = _this.props,
          onCollapse = _this$props.onCollapse,
          onExpand = _this$props.onExpand;

      if (newState) {
        onCollapse && onCollapse();
      }

      _this.setState({
        isCollapsed: newState
      }, function () {
        window.dispatchEvent(new Event('resize'));

        if (!newState) {
          onExpand && onExpand();
        }
      });
    });

    _this.state = {
      isCollapsed: false
    };
    return _this;
  }

  _createClass(CollapsiblePanel, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          stickyFooter = _this$props2.stickyFooter,
          iconContainerStyle = _this$props2.iconContainerStyle,
          iconToggle = _this$props2.iconToggle;

      var tag = iconToggle.tag,
          className = iconToggle.className,
          style = iconToggle.style,
          attrs = _objectWithoutProperties(iconToggle, ["tag", "className", "style"]);

      var IconTag = tag;
      var iconStyle = style || {
        transform: this.state.isCollapsed ? null : 'rotate(180deg)',
        color: '#fff',
        textAlign: 'center',
        background: '#4c6274',
        height: "15px",
        width: "20px",
        "float": 'left'
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "".concat(this.props.className)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: this.state.isCollapsed ? 'none' : 'block'
        }
      }, this.props.children), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "caret-block"
      }, stickyFooter), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "filter-handle",
        style: iconContainerStyle,
        onClick: this.onClick
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IconTag, _extends({
        className: className,
        style: iconStyle
      }, attrs))));
    }
  }]);

  return CollapsiblePanel;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

_defineProperty(CollapsiblePanel, "propTypes", {
  stickyFooter: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  onCollapse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

var propTypes = {
  stickyFooter: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  onCollapse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  iconToggle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
var defaultProps = {
  iconContainerStyle: {
    height: '15px',
    width: '20px',
    cursor: 'pointer',
    position: 'absolute',
    left: 'calc(50% - 10px)',
    bottom: 0,
    background: '#4c6274',
    textAlign: 'center'
  },
  iconToggle: {
    tag: 'i',
    className: 'icon-arrow',
    style: null
  }
};
CollapsiblePanel.propTypes = propTypes;
CollapsiblePanel.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (CollapsiblePanel);

/***/ }),

/***/ "./www/js/source/reactpages/components/collapsible-panel/index.jsx":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/components/collapsible-panel/index.jsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CollapsiblePanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollapsiblePanel */ "./www/js/source/reactpages/components/collapsible-panel/CollapsiblePanel.jsx");

/* harmony default export */ __webpack_exports__["default"] = (_CollapsiblePanel__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/Calendar.js":
/*!********************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/Calendar.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/parseInput.js */ "./www/js/source/reactpages/components/date-range/utils/parseInput.js");
/* harmony import */ var _DayCell_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DayCell.js */ "./www/js/source/reactpages/components/date-range/DayCell.js");
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles.js */ "./www/js/source/reactpages/components/date-range/styles.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/components/date-range/constants.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var START_OF_MONTH = 0;
var END_OF_MONTH = 11;
var START_DAY_OF_MONTH = 1;
var DEFAULT_YEAR_RANGE = 5;

function checkRange(dayMoment, range) {
  return dayMoment.isBetween(range['startDate'], range['endDate']) || dayMoment.isBetween(range['endDate'], range['startDate']);
}

function checkStartEdge(dayMoment, range) {
  var startDate = range.startDate;
  return dayMoment.startOf('day').isSame(startDate.startOf('day'));
}

function checkEndEdge(dayMoment, range) {
  var endDate = range.endDate;
  return dayMoment.endOf('day').isSame(endDate.endOf('day'));
}

function isOusideMinMax(dayMoment, minDate, maxDate, format) {
  return minDate && dayMoment.isBefore(Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(minDate, format, 'startOf')) || maxDate && dayMoment.isAfter(Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(maxDate, format, 'endOf'));
}

var Calendar =
/*#__PURE__*/
function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props, context) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, props, context));
    var format = props.format,
        range = props.range,
        theme = props.theme,
        offset = props.offset,
        firstDayOfWeek = props.firstDayOfWeek,
        shownDate = props.shownDate;
    var date = Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(props.date, format, 'startOf');
    var showDate = (shownDate || range && range['endDate'] || date).clone();
    var state = {
      date: date,
      shownDate: showDate,
      firstDayOfWeek: firstDayOfWeek || moment__WEBPACK_IMPORTED_MODULE_2___default.a.localeData().firstDayOfWeek()
    };
    _this.state = state;
    _this.styles = Object(_styles_js__WEBPACK_IMPORTED_MODULE_5__["default"])(theme);
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var onInit = this.props.onInit;
      onInit && onInit(this.state.date);
    }
  }, {
    key: "getShownDate",
    value: function getShownDate() {
      var link = this.props.link;
      var shownDate = link || this.state.shownDate;
      return shownDate;
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(newDate) {
      var _this$props = this.props,
          link = _this$props.link,
          onChange = _this$props.onChange;
      onChange && onChange(newDate);

      if (!link) {
        this.setState({
          date: newDate
        });
      }
    }
  }, {
    key: "nextButtonClickHandler",
    value: function nextButtonClickHandler(event) {
      event.preventDefault();

      if (!this.disableNextButton) {
        this.changeMonth(this.state.shownDate.month() + 1, event);
      }
    }
  }, {
    key: "prevButtonClickHandler",
    value: function prevButtonClickHandler(event) {
      event.preventDefault();

      if (!this.disablePrevButton) {
        this.changeMonth(this.state.shownDate.month() - 1, event);
      }
    }
  }, {
    key: "changeMonth",
    value: function changeMonth(direction, event) {
      event.preventDefault();
      var selectedMonth = Number(direction);
      var year = this.state.shownDate.year();

      if (selectedMonth < START_OF_MONTH) {
        selectedMonth = END_OF_MONTH;
        year -= 1;
      }

      if (selectedMonth > END_OF_MONTH) {
        selectedMonth = START_OF_MONTH;
        year += 1;
      }

      var _this$props2 = this.props,
          link = _this$props2.link,
          linkCB = _this$props2.linkCB;
      var newDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([year, selectedMonth, this.state.shownDate.date()]);

      if (!newDate.isValid()) {
        newDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([year, selectedMonth, START_DAY_OF_MONTH]);
      }

      if (link && linkCB) {
        return linkCB(newDate);
      }

      this.setState({
        shownDate: newDate
      });
    }
  }, {
    key: "changeYear",
    value: function changeYear(event) {
      event.preventDefault();
      var selectedYear = Number(event.target.value);
      var newDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([selectedYear, this.state.shownDate.month(), this.state.shownDate.date()]);

      if (!newDate.isValid()) {
        newDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([selectedYear, this.state.shownDate.month(), START_DAY_OF_MONTH]);
      }

      this.setState({
        shownDate: newDate
      });
    }
  }, {
    key: "renderMonthList",
    value: function renderMonthList(classes) {
      var _this2 = this;

      var styles = this.styles;
      var _this$props3 = this.props,
          onlyClasses = _this$props3.onlyClasses,
          locale = _this$props3.locale;
      var monthLabels = locale.months;
      var monthOptions = [];

      for (var i = 0; i < 12; i++) {
        var isDisabled = this._isDisabledMonth(i);

        monthOptions.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          disabled: isDisabled,
          key: "month".concat(i),
          value: i
        }, monthLabels[i]));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        style: onlyClasses ? undefined : styles["MonthAndYearSelect"],
        className: classes.monthAndYearSelect,
        onChange: function onChange(e) {
          return _this2.changeMonth(e.target.value, e);
        },
        value: this.state.shownDate.month()
      }, monthOptions);
    }
  }, {
    key: "_isDisabledMonth",
    value: function _isDisabledMonth(currentMonth) {
      var range = this.limitedDate;
      var currentYear = this.state.shownDate.year();
      return currentMonth < range.startDate.month() && currentYear <= range.startDate.year() || currentMonth > range.endDate.month() && currentYear >= range.endDate.year();
    }
  }, {
    key: "renderYearList",
    value: function renderYearList(classes) {
      var styles = this.styles;
      var onlyClasses = this.props.onlyClasses;
      var range = this.limitedDate;
      var yearOptions = [];

      for (var i = range.startDate.year(); i <= range.endDate.year(); i++) {
        yearOptions.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: "year".concat(i),
          value: i
        }, i));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        style: onlyClasses ? undefined : styles["MonthAndYearSelect"],
        className: classes.monthAndYearSelect,
        onChange: this.changeYear.bind(this),
        value: this.state.shownDate.year()
      }, yearOptions);
    }
  }, {
    key: "renderMonthAndYear",
    value: function renderMonthAndYear(classes) {
      var shownDate = this.getShownDate();
      var year = shownDate.year();
      var styles = this.styles;
      var _this$props4 = this.props,
          minDate = _this$props4.minDate,
          maxDate = _this$props4.maxDate,
          onlyClasses = _this$props4.onlyClasses,
          showMonthArrow = _this$props4.showMonthArrow;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: onlyClasses ? undefined : styles['MonthAndYear'],
        className: classes.monthAndYearWrapper
      }, showMonthArrow ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        disabled: this.disablePrevButton,
        style: onlyClasses ? undefined : _objectSpread({}, styles['MonthButton'], {
          "float": 'left'
        }),
        className: classes.prevButton,
        onClick: this.prevButtonClickHandler.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        style: onlyClasses ? undefined : _objectSpread({}, styles['MonthArrow'], {}, styles['MonthArrowPrev'])
      })) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: classes.month
      }, this.renderMonthList(classes)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: classes.monthAndYearDivider
      }, "\xA0"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: classes.year
      }, this.renderYearList(classes))), showMonthArrow ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        disabled: this.disableNextButton,
        style: onlyClasses ? undefined : _objectSpread({}, styles['MonthButton'], {
          "float": 'right'
        }),
        className: classes.nextButton,
        onClick: this.nextButtonClickHandler.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        style: onlyClasses ? undefined : _objectSpread({}, styles['MonthArrow'], {}, styles['MonthArrowNext'])
      })) : null);
    }
  }, {
    key: "renderWeekdays",
    value: function renderWeekdays(classes) {
      var dow = this.state.firstDayOfWeek;
      var weekdays = [];
      var styles = this.styles;
      var _this$props5 = this.props,
          onlyClasses = _this$props5.onlyClasses,
          locale = _this$props5.locale;
      var weekDays = locale.weekdays;
      var dayLength = 7 + dow;

      for (var i = dow; i < dayLength; i++) {
        var weekDayIndex = i % 7;
        var day = weekDays[weekDayIndex];
        weekdays.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: onlyClasses ? undefined : styles['Weekday'],
          className: classes.weekDay,
          key: i + day
        }, day));
      }

      return weekdays;
    }
  }, {
    key: "renderDays",
    value: function renderDays(classes) {
      var _this3 = this;

      // TODO: Split this logic into smaller chunks
      var styles = this.styles;
      var _this$props6 = this.props,
          range = _this$props6.range,
          minDate = _this$props6.minDate,
          maxDate = _this$props6.maxDate,
          format = _this$props6.format,
          onlyClasses = _this$props6.onlyClasses,
          disableDaysBeforeToday = _this$props6.disableDaysBeforeToday,
          specialDays = _this$props6.specialDays;
      var shownDate = this.getShownDate();
      var _this$state = this.state,
          date = _this$state.date,
          firstDayOfWeek = _this$state.firstDayOfWeek;
      var dateUnix = date.unix();
      var monthNumber = shownDate.month();
      var dayCount = shownDate.daysInMonth();
      var startOfMonth = shownDate.clone().startOf('month').isoWeekday();
      var lastMonth = shownDate.clone().month(monthNumber - 1);
      var lastMonthNumber = lastMonth.month();
      var lastMonthDayCount = lastMonth.daysInMonth();
      var nextMonth = shownDate.clone().month(monthNumber + 1);
      var nextMonthNumber = nextMonth.month();
      var days = []; // Previous month's days

      var diff = Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7;

      for (var i = diff - 1; i >= 0; i--) {
        var dayMoment = lastMonth.clone().date(lastMonthDayCount - i);
        days.push({
          dayMoment: dayMoment,
          isPassive: true
        });
      } // Current month's days


      for (var _i = 1; _i <= dayCount; _i++) {
        var _dayMoment = shownDate.clone().date(_i); // set days before today to isPassive


        var _today = moment__WEBPACK_IMPORTED_MODULE_2___default()();

        if (disableDaysBeforeToday && Number(_dayMoment.diff(_today, "days")) <= -1) {
          days.push({
            dayMoment: _dayMoment,
            isPassive: true
          });
        } else {
          days.push({
            dayMoment: _dayMoment
          });
        }
      } // Next month's days


      var remainingCells = 42 - days.length; // 42cells = 7days * 6rows

      for (var _i2 = 1; _i2 <= remainingCells; _i2++) {
        var _dayMoment2 = nextMonth.clone().date(_i2);

        days.push({
          dayMoment: _dayMoment2,
          isPassive: true
        });
      }

      var today = moment__WEBPACK_IMPORTED_MODULE_2___default()().startOf('day');
      return days.map(function (data, index) {
        var dayMoment = data.dayMoment,
            isPassive = data.isPassive;
        var isSelected = !range && dayMoment.unix() === dateUnix;
        var isInRange = range && checkRange(dayMoment, range);
        var isStartEdge = range && checkStartEdge(dayMoment, range);
        var isEndEdge = range && checkEndEdge(dayMoment, range);
        var isEdge = isStartEdge || isEndEdge;
        var isToday = today.isSame(dayMoment);
        var isSunday = dayMoment.day() === 0;
        var isSpecialDay = specialDays && specialDays.some(function (specialDay) {
          return dayMoment.endOf('day').isSame(specialDay.date.endOf('day'));
        });
        var isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate, format);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DayCell_js__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({
          onSelect: _this3.handleSelect.bind(_this3)
        }, data, {
          theme: styles,
          isStartEdge: isStartEdge,
          isEndEdge: isEndEdge,
          isSelected: isSelected || isEdge,
          isInRange: isInRange,
          isSunday: isSunday,
          isSpecialDay: isSpecialDay,
          isToday: isToday,
          key: index,
          isPassive: isPassive || isOutsideMinMax,
          onlyClasses: onlyClasses,
          classNames: classes
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var styles = this.styles;
      var _this$props7 = this.props,
          onlyClasses = _this$props7.onlyClasses,
          classNames = _this$props7.classNames;

      var classes = _objectSpread({}, _styles_js__WEBPACK_IMPORTED_MODULE_5__["defaultClasses"], {}, classNames);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: onlyClasses ? undefined : _objectSpread({}, styles['Calendar'], {}, this.props.style),
        className: classes.calendar
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.monthAndYear
      }, this.renderMonthAndYear(classes)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.weekDays
      }, this.renderWeekdays(classes)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.days
      }, this.renderDays(classes)));
    }
  }, {
    key: "limitedDate",
    get: function get() {
      var _this$props8 = this.props,
          minDate = _this$props8.minDate,
          maxDate = _this$props8.maxDate;
      var m = moment__WEBPACK_IMPORTED_MODULE_2___default()();
      var startDate, endDate;

      if (minDate) {
        startDate = moment__WEBPACK_IMPORTED_MODULE_2___default.a.isMoment(minDate) ? minDate : moment__WEBPACK_IMPORTED_MODULE_2___default()(minDate, _constants__WEBPACK_IMPORTED_MODULE_6__["MomentFormat"]["default"]);
      } else {
        startDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([m.year() - DEFAULT_YEAR_RANGE, START_OF_MONTH]);
      }

      if (maxDate) {
        endDate = moment__WEBPACK_IMPORTED_MODULE_2___default.a.isMoment(maxDate) ? maxDate : moment__WEBPACK_IMPORTED_MODULE_2___default()(maxDate, _constants__WEBPACK_IMPORTED_MODULE_6__["MomentFormat"]["default"]);
      } else {
        endDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([m.year(), END_OF_MONTH]).endOf("month");
      }

      return {
        startDate: startDate,
        endDate: endDate
      };
    }
  }, {
    key: "disablePrevButton",
    get: function get() {
      var range = this.limitedDate;
      var startDate = range.startDate;
      var currentDate = this.state.shownDate;
      var prevMonth = this.state.shownDate.month() - 1;

      if (prevMonth < startDate.month() && currentDate.year() <= startDate.year()) {
        return true;
      }

      return false;
    }
  }, {
    key: "disableNextButton",
    get: function get() {
      var range = this.limitedDate;
      var endDate = range.endDate;
      var currentDate = this.state.shownDate;
      var nextMonth = this.state.shownDate.month() + 1;

      if (nextMonth > endDate.month() && currentDate.year() >= endDate.year()) {
        return true;
      }

      return false;
    }
  }]);

  return Calendar;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

Calendar.defaultProps = {
  format: _constants__WEBPACK_IMPORTED_MODULE_6__["MomentFormat"]["default"],
  theme: {},
  showMonthArrow: true,
  disableDaysBeforeToday: false,
  onlyClasses: false,
  classNames: {},
  specialDays: []
};
Calendar.propTypes = {
  showMonthArrow: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  disableDaysBeforeToday: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  lang: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  sets: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  range: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    startDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
    endDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
  }),
  minDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  maxDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  date: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func]),
  format: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  firstDayOfWeek: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onInit: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  link: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    startDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
    endDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
  }), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool]),
  linkCB: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  theme: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  onlyClasses: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  specialDays: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  locale: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (Calendar);

/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/DatePicker.jsx":
/*!***********************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/DatePicker.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DatePicker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/parseInput.js */ "./www/js/source/reactpages/components/date-range/utils/parseInput.js");
/* harmony import */ var _defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaultOptions.js */ "./www/js/source/reactpages/components/date-range/defaultOptions.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/components/date-range/constants.js");
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles.js */ "./www/js/source/reactpages/components/date-range/styles.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Overlay */ "./www/js/source/reactpages/components/Overlay.jsx");
/* harmony import */ var _Calendar_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Calendar.js */ "./www/js/source/reactpages/components/date-range/Calendar.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












var DatePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "show", function () {
      _this.setState({
        show: true
      });
    });

    var locale = props.locale,
        date = props.date,
        format = props.format;
    _this.locale = _objectSpread({}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__["default"].locale, {}, locale);
    var selectedDate = Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date, format, 'startOf');
    _this.state = {
      selectedDate: selectedDate,
      show: false
    };
    return _this;
  }

  _createClass(DatePicker, [{
    key: "handleSelect",
    value: function handleSelect(date) {
      var onChange = this.props.onChange;
      onChange && onChange(date);
      this.setState({
        selectedDate: date,
        show: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          format = _this$props.format,
          firstDayOfWeek = _this$props.firstDayOfWeek,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate,
          classNames = _this$props.classNames;

      var classes = _objectSpread({}, _styles_js__WEBPACK_IMPORTED_MODULE_6__["defaultClasses"], {}, classNames);

      var show = this.state.show;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "daterange-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "daterange-label",
        onClick: this.show
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        readOnly: true,
        className: "input-text datepicker",
        type: "text",
        autoComplete: "off",
        value: this.dateText
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon icon-calendar"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isOpening: show
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.dateRange
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Calendar_js__WEBPACK_IMPORTED_MODULE_9__["default"], {
        shownDate: this.state.selectedDate,
        format: format,
        firstDayOfWeek: firstDayOfWeek,
        minDate: minDate,
        maxDate: maxDate,
        classNames: classNames,
        onChange: this.handleSelect.bind(this),
        locale: this.locale
      }))));
    }
  }, {
    key: "dateText",
    get: function get() {
      var selectedDate = this.state.selectedDate;

      if (selectedDate) {
        return "".concat(selectedDate.format(this.props.format));
      }

      return "";
    }
  }]);

  return DatePicker;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(DatePicker, "propTypes", {
  format: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  firstDayOfWeek: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  minDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  maxDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onInit: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  locale: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  date: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string])
});

_defineProperty(DatePicker, "defaultProps", {
  format: _constants__WEBPACK_IMPORTED_MODULE_5__["MomentFormat"]["default"]
});



/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/DateRange.js":
/*!*********************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/DateRange.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/parseInput.js */ "./www/js/source/reactpages/components/date-range/utils/parseInput.js");
/* harmony import */ var _Calendar_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Calendar.js */ "./www/js/source/reactpages/components/date-range/Calendar.js");
/* harmony import */ var _PredefinedRanges_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PredefinedRanges.js */ "./www/js/source/reactpages/components/date-range/PredefinedRanges.js");
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles.js */ "./www/js/source/reactpages/components/date-range/styles.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/components/date-range/constants.js");
/* harmony import */ var _defaultOptions_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./defaultOptions.js */ "./www/js/source/reactpages/components/date-range/defaultOptions.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Overlay */ "./www/js/source/reactpages/components/Overlay.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













var DateRange =
/*#__PURE__*/
function (_Component) {
  _inherits(DateRange, _Component);

  function DateRange(props, context) {
    var _this;

    _classCallCheck(this, DateRange);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateRange).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "show", function () {
      _this.calendarSelectionStep = 0;

      _this.setState({
        show: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleApply", function () {
      var _this$props = _this.props,
          onClickApplyButton = _this$props.onClickApplyButton,
          onChange = _this$props.onChange;
      var range = _this.state.range;
      _this.originalRange = Object.assign({}, range);
      onClickApplyButton && onClickApplyButton(range, _this.isValid);
      onChange && onChange(range, _this.isValid);

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.setRange(_this.originalRange, false);
    });

    var format = props.format,
        linkedCalendars = props.linkedCalendars,
        theme = props.theme;
    var startDate = Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(props.startDate, format, 'startOf');
    var endDate = Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(props.endDate, format, 'endOf');
    _this.styles = Object(_styles_js__WEBPACK_IMPORTED_MODULE_6__["default"])(theme);
    _this.calendarSelectionStep = 0;
    _this.locale = _objectSpread({}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_9__["default"].locale, {}, props.locale);
    _this.ranges = _objectSpread({}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_9__["default"].ranges(props.today, props.minDate, props.maxDate, props.limitedMonthRange), {}, props.ranges);
    _this.isValid = true;
    _this.originalRange = {
      startDate: startDate,
      endDate: endDate
    };
    _this.state = {
      range: {
        startDate: startDate,
        endDate: endDate
      },
      link: linkedCalendars && endDate,
      show: false
    };
    return _this;
  }

  _createClass(DateRange, [{
    key: "close",
    value: function close() {
      this.setState({
        show: false
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var onInit = this.props.onInit;
      onInit && onInit(this.state.range);
    }
  }, {
    key: "orderRange",
    value: function orderRange(range) {
      var startDate = range.startDate,
          endDate = range.endDate;
      var swap = startDate.isAfter(endDate);
      if (!swap) return range;
      return {
        startDate: endDate,
        endDate: startDate
      };
    }
  }, {
    key: "setRange",
    value: function setRange(dateRange, show) {
      var range = this.orderRange(dateRange);
      this.isValid = this.isValidMonthRange(range);

      if (this.isValid) {
        var newState = show === undefined ? {
          range: range
        } : {
          range: range,
          show: show
        };
        this.setState(newState);
      } else {
        var onChange = this.props.onChange;
        onChange && onChange(range, false);
      }
    }
  }, {
    key: "handlePredefinedRangesSelect",
    value: function handlePredefinedRangesSelect(range) {
      this.setRange(range, false);
      this.originalRange = Object.assign({}, range);
      var onChange = this.props.onChange;
      onChange && onChange(range, true);
    }
  }, {
    key: "handleCalendarSelect",
    value: function handleCalendarSelect(date) {
      var _this$state$range = this.state.range,
          startDate = _this$state$range.startDate,
          endDate = _this$state$range.endDate;
      var range = {
        startDate: startDate,
        endDate: endDate
      };

      switch (this.calendarSelectionStep) {
        case 0:
          range['startDate'] = date;
          range['endDate'] = date;
          this.calendarSelectionStep = 1;
          break;

        case 1:
          range['endDate'] = date;
          this.calendarSelectionStep = 0;
          break;
      }

      this.setRange(range);
    }
  }, {
    key: "isValidMonthRange",
    value: function isValidMonthRange(date) {
      var limitedMonthRange = this.props.limitedMonthRange;

      if (limitedMonthRange) {
        var startDate = date.startDate;
        var endDate = date.endDate;
        var diffMonth = 12 * (endDate.year() - startDate.year()) + endDate.month() - startDate.month() + 1;
        return diffMonth <= limitedMonthRange;
      }

      return true;
    }
  }, {
    key: "handleLinkChange",
    value: function handleLinkChange(newDate) {
      this.setState({
        link: newDate
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          showRange = _this$props2.showRange,
          format = _this$props2.format,
          linkedCalendars = _this$props2.linkedCalendars,
          calendars = _this$props2.calendars,
          firstDayOfWeek = _this$props2.firstDayOfWeek,
          minDate = _this$props2.minDate,
          maxDate = _this$props2.maxDate,
          classNames = _this$props2.classNames,
          onlyClasses = _this$props2.onlyClasses,
          specialDays = _this$props2.specialDays,
          lang = _this$props2.lang,
          disableDaysBeforeToday = _this$props2.disableDaysBeforeToday,
          showMonthArrow = _this$props2.showMonthArrow;
      var _this$state = this.state,
          range = _this$state.range,
          link = _this$state.link;
      var styles = this.styles;

      var classes = _objectSpread({}, _styles_js__WEBPACK_IMPORTED_MODULE_6__["defaultClasses"], {}, classNames);

      var calendarsCount = Number(calendars) - 1;
      var buttonHandlers = {
        apply: this.handleApply,
        cancel: this.handleCancel
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "daterange-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "daterange-label",
        onClick: this.show
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        readOnly: true,
        name: "DateRange",
        id: "DateRange",
        className: "input-text datepicker",
        type: "text",
        autoComplete: "off",
        value: this.dateRangeText
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon icon-calendar"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_10__["default"], {
        isOpening: this.state.show,
        onClose: this.handleCancel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.dateRange,
        ref: function ref(element) {
          return _this2.dateRangeContainer = element;
        }
      }, showRange && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PredefinedRanges_js__WEBPACK_IMPORTED_MODULE_5__["default"], {
        format: format,
        ranges: this.ranges,
        range: range,
        theme: styles,
        onSelect: function onSelect(range) {
          return _this2.handlePredefinedRangesSelect(range);
        },
        onlyClasses: onlyClasses,
        classNames: classes,
        locale: this.locale,
        buttonHandlers: buttonHandlers
      }), function () {
        var _calendars = [];

        for (var i = calendarsCount; i >= 0; i--) {
          var shownDate = i == calendarsCount ? range.startDate : range.endDate;

          _calendars.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Calendar_js__WEBPACK_IMPORTED_MODULE_4__["default"], {
            showMonthArrow: showMonthArrow,
            shownDate: shownDate,
            disableDaysBeforeToday: disableDaysBeforeToday,
            lang: lang,
            key: i,
            link: linkedCalendars && link,
            linkCB: _this2.handleLinkChange.bind(_this2),
            range: range,
            format: format,
            firstDayOfWeek: firstDayOfWeek,
            theme: styles,
            minDate: minDate,
            maxDate: maxDate,
            onlyClasses: onlyClasses,
            specialDays: specialDays,
            classNames: classes,
            onChange: _this2.handleCalendarSelect.bind(_this2),
            locale: _this2.locale
          }));
        }

        return _calendars;
      }())));
    }
  }, {
    key: "dateRangeText",
    get: function get() {
      var range = this.state.range;

      if (range.startDate && range.endDate) {
        var format = this.props.format;
        return "".concat(range.startDate.format(format), " - ").concat(range.endDate.format(format));
      }

      return "";
    }
  }]);

  return DateRange;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

DateRange.defaultProps = {
  linkedCalendars: false,
  theme: {},
  format: _constants__WEBPACK_IMPORTED_MODULE_8__["MomentFormat"]["default"],
  calendars: 2,
  onlyClasses: true,
  classNames: {},
  specialDays: [],
  twoStepChange: false,
  showRange: true
};
DateRange.propTypes = {
  format: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  firstDayOfWeek: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  calendars: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number]),
  startDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  endDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  minDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  maxDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  dateLimit: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  ranges: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  linkedCalendars: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  twoStepChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  theme: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  onInit: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onlyClasses: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  specialDays: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  onClickApplyButton: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  showRange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  limitedMonthRange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  today: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string])
};
/* harmony default export */ __webpack_exports__["default"] = (DateRange);

/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/DayCell.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/DayCell.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.js */ "./www/js/source/reactpages/components/date-range/styles.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DayCell =
/*#__PURE__*/
function (_Component) {
  _inherits(DayCell, _Component);

  function DayCell(props, context) {
    var _this;

    _classCallCheck(this, DayCell);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DayCell).call(this, props, context));
    _this.state = {
      hover: false,
      active: false
    };
    _this.styles = _this.props.theme;
    return _this;
  }

  _createClass(DayCell, [{
    key: "handleMouseEvent",
    value: function handleMouseEvent(event) {
      event.preventDefault();
      if (this.props.isPassive) return null;
      var newState = {};

      switch (event.type) {
        case 'mouseenter':
          newState['hover'] = true;
          break;

        case 'mouseup':
        case 'mouseleave':
          newState['hover'] = false;
          newState['active'] = false;
          break;

        case 'mousedown':
          newState['active'] = true;
          break;
      }

      this.setState(newState);
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(event) {
      event.preventDefault();
      if (this.props.isPassive) return null;
      this.props.onSelect(this.props.dayMoment);
    }
  }, {
    key: "getStateStyles",
    value: function getStateStyles() {
      var _this$state = this.state,
          hover = _this$state.hover,
          active = _this$state.active;
      var _this$props = this.props,
          isSelected = _this$props.isSelected,
          isInRange = _this$props.isInRange,
          isPassive = _this$props.isPassive,
          isStartEdge = _this$props.isStartEdge,
          isEndEdge = _this$props.isEndEdge,
          dayMoment = _this$props.dayMoment,
          isToday = _this$props.isToday,
          isSunday = _this$props.isSunday,
          isSpecialDay = _this$props.isSpecialDay;
      var styles = this.styles;
      var hoverStyle = hover ? styles['DayHover'] : {};
      var activeStyle = active ? styles['DayActive'] : {};
      var passiveStyle = isPassive ? styles['DayPassive'] : {};
      var startEdgeStyle = isStartEdge ? styles['DayStartEdge'] : {};
      var endEdgeStyle = isEndEdge ? styles['DayEndEdge'] : {};
      var selectedStyle = isSelected ? styles['DaySelected'] : {};
      var inRangeStyle = isInRange ? styles['DayInRange'] : {};
      var todayStyle = isToday ? styles['DayToday'] : {};
      var sundayStyle = isSunday ? styles['DaySunday'] : {};
      var specialDayStyle = isSpecialDay ? styles['DaySpecialDay'] : {};
      return _objectSpread({}, todayStyle, {}, sundayStyle, {}, specialDayStyle, {}, inRangeStyle, {}, hoverStyle, {}, passiveStyle, {}, activeStyle, {}, selectedStyle, {}, startEdgeStyle, {}, endEdgeStyle);
    }
  }, {
    key: "getClassNames",
    value: function getClassNames(classes) {
      var _classnames;

      var _this$props2 = this.props,
          isSelected = _this$props2.isSelected,
          isInRange = _this$props2.isInRange,
          isPassive = _this$props2.isPassive,
          isStartEdge = _this$props2.isStartEdge,
          isEndEdge = _this$props2.isEndEdge,
          isToday = _this$props2.isToday,
          isSunday = _this$props2.isSunday,
          isSpecialDay = _this$props2.isSpecialDay;
      return classnames__WEBPACK_IMPORTED_MODULE_2___default()((_classnames = {}, _defineProperty(_classnames, classes.day, true), _defineProperty(_classnames, classes.dayActive, isSelected), _defineProperty(_classnames, classes.dayPassive, isPassive), _defineProperty(_classnames, classes.dayInRange, isInRange), _defineProperty(_classnames, classes.dayStartEdge, isStartEdge), _defineProperty(_classnames, classes.dayEndEdge, isEndEdge), _defineProperty(_classnames, classes.dayToday, isToday), _defineProperty(_classnames, classes.daySunday, isSunday), _defineProperty(_classnames, classes.daySpecialDay, isSpecialDay), _classnames));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          dayMoment = _this$props3.dayMoment,
          onlyClasses = _this$props3.onlyClasses,
          classNames = _this$props3.classNames;
      var styles = this.styles;
      var stateStyle = this.getStateStyles();
      var classes = this.getClassNames(classNames);
      var dayWrapperStyles = {
        width: styles['Day'].width,
        height: styles['Day'].height,
        display: styles['Day'].display
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: onlyClasses ? undefined : dayWrapperStyles,
        onClick: this.handleSelect.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onMouseEnter: this.handleMouseEvent.bind(this),
        onMouseLeave: this.handleMouseEvent.bind(this),
        onMouseDown: this.handleMouseEvent.bind(this),
        onMouseUp: this.handleMouseEvent.bind(this),
        className: classes,
        style: onlyClasses ? undefined : _objectSpread({}, styles['Day'], {}, stateStyle)
      }, dayMoment.date()));
    }
  }]);

  return DayCell;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

DayCell.defaultProps = {
  theme: {
    'Day': {}
  },
  onlyClasses: false
};
DayCell.propTypes = {
  dayMoment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  onSelect: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isSelected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isInRange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isPassive: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  theme: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    Day: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
  }).isRequired,
  onlyClasses: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isSpecialDay: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (DayCell);

/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/PredefinedRanges.js":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/PredefinedRanges.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_parseInput_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/parseInput.js */ "./www/js/source/reactpages/components/date-range/utils/parseInput.js");
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles.js */ "./www/js/source/reactpages/components/date-range/styles.js");
/* harmony import */ var _defaultOptions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./defaultOptions.js */ "./www/js/source/reactpages/components/date-range/defaultOptions.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var PredefinedRanges =
/*#__PURE__*/
function (_Component) {
  _inherits(PredefinedRanges, _Component);

  function PredefinedRanges(props, context) {
    var _this;

    _classCallCheck(this, PredefinedRanges);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PredefinedRanges).call(this, props, context));
    _this.styles = _this.props.theme;
    _this.selectedItem = _this._getSelectedRange();
    return _this;
  }

  _createClass(PredefinedRanges, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.range !== prevProps.range) {
        this.selectedItem = this._getSelectedRange();
      }
    }
  }, {
    key: "_getSelectedRange",
    value: function _getSelectedRange() {
      var _this$props = this.props,
          ranges = _this$props.ranges,
          range = _this$props.range;
      return Object.keys(ranges).find(function (name) {
        var currentRange = ranges[name];
        return range.startDate.isSame(currentRange.startDate, "day") && range.endDate.isSame(currentRange.endDate, "day");
      });
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(name, event) {
      event.preventDefault();
      this.selectedItem = name;
      var range = this.props.ranges[name];
      this.props.onSelect({
        startDate: Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_4__["default"])(range['startDate'], null, 'startOf'),
        endDate: Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_4__["default"])(range['endDate'], null, 'endOf')
      });
    }
  }, {
    key: "clickButton",
    value: function clickButton(event, action) {
      event.preventDefault();
      this.props.buttonHandlers[action]();
    }
  }, {
    key: "renderRangeList",
    value: function renderRangeList(classes) {
      var _this2 = this;

      var _this$props2 = this.props,
          ranges = _this$props2.ranges,
          range = _this$props2.range,
          onlyClasses = _this$props2.onlyClasses;
      var styles = this.styles;
      var gotActiveRange = false;
      return Object.keys(ranges).map(function (name) {
        var _classnames;

        var active = _this2.selectedItem === name;
        gotActiveRange = !gotActiveRange && active;

        var style = _objectSpread({}, styles['PredefinedRangesItem'], {}, gotActiveRange ? styles['PredefinedRangesItemActive'] : {});

        var predefinedRangeClass = classnames__WEBPACK_IMPORTED_MODULE_3___default()((_classnames = {}, _defineProperty(_classnames, classes.predefinedRangesItem, true), _defineProperty(_classnames, classes.predefinedRangesItemActive, gotActiveRange), _classnames));
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          key: 'range-' + name,
          className: predefinedRangeClass,
          style: onlyClasses ? undefined : style,
          onClick: function onClick(e) {
            return _this2.handleSelect(name, e);
          }
        }, name);
      });
    }
  }, {
    key: "renderRangeButtons",
    value: function renderRangeButtons(classes) {
      var _this3 = this;

      var _this$props3 = this.props,
          style = _this$props3.style,
          onlyClasses = _this$props3.onlyClasses,
          locale = _this$props3.locale;

      var locales = _objectSpread({}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_6__["default"].locale, {}, locale);

      var styles = this.styles;
      var action = {
        apply: "apply",
        cancel: "cancel"
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _styles_js__WEBPACK_IMPORTED_MODULE_5__["defaultClasses"].rangeButtonGroup
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: classes.applyButton,
        style: onlyClasses ? undefined : _objectSpread({}, styles['RangeApplyButton'], {}, style),
        type: "button",
        onClick: function onClick(e) {
          return _this3.clickButton(e, action.apply);
        }
      }, locales.applyLabel), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: classes.cancelButton,
        style: onlyClasses ? undefined : _objectSpread({}, styles['RangeCancelButton'], {}, style),
        onClick: function onClick(e) {
          return _this3.clickButton(e, action.cancel);
        },
        type: "button"
      }, locales.cancelLabel));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          style = _this$props4.style,
          onlyClasses = _this$props4.onlyClasses,
          classNames = _this$props4.classNames;
      var styles = this.styles;

      var classes = _objectSpread({}, _styles_js__WEBPACK_IMPORTED_MODULE_5__["defaultClasses"], {}, classNames);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: onlyClasses ? undefined : _objectSpread({}, styles['PredefinedRanges'], {}, style),
        className: classes.predefinedRanges
      }, this.renderRangeList(classes), this.renderRangeButtons(classes));
    }
  }]);

  return PredefinedRanges;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

PredefinedRanges.defaultProps = {
  onlyClasses: false,
  classNames: {}
};
PredefinedRanges.propTypes = {
  ranges: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  onlyClasses: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (PredefinedRanges);

/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/constants.js":
/*!*********************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/constants.js ***!
  \*********************************************************************/
/*! exports provided: MomentFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MomentFormat", function() { return MomentFormat; });
var MomentFormat = {
  "default": "MM/DD/YYYY",
  monthSelect: "MMM"
};

/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/defaultOptions.js":
/*!**************************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/defaultOptions.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _utils_locale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/locale */ "./www/js/source/reactpages/components/date-range/utils/locale.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/components/date-range/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var addRange = function addRange(rangeObj, name, start, end) {
  rangeObj[_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource(name)] = {
    startDate: start,
    endDate: end
  };
};

var addOneDay = function addOneDay(rangeObj, name, day, min, max) {
  if (day >= min && day <= max) {
    addRange(rangeObj, name, day, day);
  }
};

var addDistanceDays = function addDistanceDays(rangeObj, name, start, end, min, max) {
  if (!(max < start || end < min)) {
    addRange(rangeObj, name, start < min ? min : start, end > max ? max : end);
  }
};

/* harmony default export */ __webpack_exports__["default"] = ({
  ranges: function ranges(todayDate, minDate, maxDate, limitMonths) {
    var today = !todayDate ? moment__WEBPACK_IMPORTED_MODULE_0___default()() : !moment__WEBPACK_IMPORTED_MODULE_0___default.a.isMoment(todayDate) ? moment__WEBPACK_IMPORTED_MODULE_0___default()(todayDate, _constants__WEBPACK_IMPORTED_MODULE_3__["MomentFormat"]["default"]) : todayDate;
    var max = !maxDate ? today : !moment__WEBPACK_IMPORTED_MODULE_0___default.a.isMoment(maxDate) ? moment__WEBPACK_IMPORTED_MODULE_0___default()(maxDate, _constants__WEBPACK_IMPORTED_MODULE_3__["MomentFormat"]["default"]) : maxDate;
    var min = !minDate ? today : !moment__WEBPACK_IMPORTED_MODULE_0___default.a.isMoment(minDate) ? moment__WEBPACK_IMPORTED_MODULE_0___default()(minDate, _constants__WEBPACK_IMPORTED_MODULE_3__["MomentFormat"]["default"]) : minDate;
    var range = {};

    if (today < min) {
      return range;
    }

    addOneDay(range, "Today", today, min, max);
    var yesterday = today.clone().add(-1, 'days');
    addOneDay(range, "Yesterday", yesterday, min, max);
    var startCurrentWeek = today.clone().startOf('week');
    var endCurrentWeek = today;
    addDistanceDays(range, "Currentweek", startCurrentWeek, endCurrentWeek, min, max);
    var startLastWeek = today.clone().subtract(1, 'week').startOf('week');
    var endLastWeek = startLastWeek.clone().add(6, 'days');
    addDistanceDays(range, "Lastweek", startLastWeek, endLastWeek, min, max);
    var startCurrentmonth = today.clone().startOf('month');
    var endCurrentmonth = today;
    addDistanceDays(range, "Currentmonth", startCurrentmonth, endCurrentmonth, min, max);
    var startLastmonth = today.clone().subtract(1, 'month').startOf('month');
    var endLastmonth = startLastmonth.clone().endOf('month');
    addDistanceDays(range, "Lastmonth", startLastmonth, endLastmonth, min, max);

    if (limitMonths && limitMonths > 1) {
      var startSincelastmonth = today.clone().subtract(1, 'month').startOf('month');
      var endSincelastmonth = today;
      addDistanceDays(range, "Sincelastmonth", startSincelastmonth, endSincelastmonth, min, max);
    }

    return range;
  },
  locale: _objectSpread({
    applyLabel: _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("OK"),
    cancelLabel: _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Cancel")
  }, _utils_locale__WEBPACK_IMPORTED_MODULE_2__["default"])
});

/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/index.js":
/*!*****************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/index.js ***!
  \*****************************************************************/
/*! exports provided: DateRange, Calendar, DatePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DateRange_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DateRange.js */ "./www/js/source/reactpages/components/date-range/DateRange.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateRange", function() { return _DateRange_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Calendar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Calendar.js */ "./www/js/source/reactpages/components/date-range/Calendar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Calendar", function() { return _Calendar_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _DatePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DatePicker */ "./www/js/source/reactpages/components/date-range/DatePicker.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatePicker", function() { return _DatePicker__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/styles.js":
/*!******************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/styles.js ***!
  \******************************************************************/
/*! exports provided: defaultClasses, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultClasses", function() { return defaultClasses; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultClasses = {
  show: 'rdr-Show',
  hide: 'rdr-Hide',
  calendar: 'rdr-Calendar',
  dateRange: 'rdr-DateRange',
  predefinedRanges: 'rdr-PredefinedRanges',
  predefinedRangesItem: 'rdr-PredefinedRangesItem',
  predefinedRangesItemActive: 'rdr-PredefinedRangesItemActive',
  monthAndYear: 'rdr-MonthAndYear',
  monthAndYearSelect: 'rdr-MonthAndYearSelect',
  weekDays: 'rdr-WeekDays',
  weekDay: 'rdr-WeekDay',
  days: 'rdr-Days',
  day: 'rdr-Day',
  dayActive: 'is-selected',
  dayPassive: 'is-passive',
  dayInRange: 'is-inRange',
  monthAndYearWrapper: 'rdr-MonthAndYear-innerWrapper',
  prevButton: 'rdr-MonthAndYear-button prev',
  nextButton: 'rdr-MonthAndYear-button next',
  month: 'rdr-MonthAndYear-month',
  monthAndYearDivider: 'rdr-MonthAndYear-divider',
  year: 'rdr-MonthAndYear-year',
  daySunday: 'rdr-Sunday',
  daySpecialDay: 'rdr-SpecialDay',
  rangeButtonGroup: 'range-button-group',
  applyButton: 'rdr-Button rdr-ApplyButton',
  cancelButton: 'rdr-Button rdr-CancelButton'
};
var defaultTheme = {
  DateRange: {
    display: 'none',
    boxSizing: 'border-box',
    background: '#ffffff',
    borderRadius: '2px',
    position: "absolute",
    width: 735,
    zIndex: 1,
    top: 60
  },
  Calendar: {
    width: 280,
    padding: 10,
    background: '#ffffff',
    borderRadius: '2px',
    display: 'inline-block',
    boxSizing: 'border-box',
    letterSpacing: 0,
    color: '#000000'
  },
  Day: {
    boxSizing: 'border-box',
    display: 'inline-block',
    letterSpacing: 'initial',
    textAlign: 'center',
    fontSize: 12,
    cursor: 'pointer',
    transition: 'transform .1s ease'
  },
  DayPassive: {
    opacity: 0.4,
    cursor: 'normal'
  },
  DayHover: {
    background: 'rgba(78, 184, 94, 0.4)'
  },
  DayToday: {},
  DaySunday: {},
  DaySpecialDay: {},
  DayActive: {
    background: '#95a5a6',
    color: '#ffffff',
    transform: 'scale(0.9)'
  },
  DaySelected: {
    background: '#4eb85e',
    color: '#ffffff'
  },
  DayStartEdge: {},
  DayEndEdge: {},
  DayInRange: {
    background: 'rgba(78, 184, 94, 0.2)',
    color: '#95a5a6'
  },
  Weekday: {
    boxSizing: 'border-box',
    display: 'inline-block',
    letterSpacing: 'initial',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 1
  },
  MonthAndYear: {
    textAlign: 'center',
    boxSizing: 'border-box',
    fontSize: 12,
    padding: '5px 0',
    height: 40,
    lineHeight: '18px'
  },
  MonthButton: {
    display: 'block',
    boxSizing: 'border-box',
    height: 25,
    width: 25,
    padding: 0,
    margin: '0 10px',
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
    background: '#fff',
    cursor: 'pointer'
  },
  MonthArrow: {
    display: 'block',
    width: 0,
    height: 0,
    padding: 0,
    margin: 0,
    border: '5px solid transparent',
    textAlign: 'center'
  },
  MonthArrowPrev: {
    borderRightWidth: '7px',
    borderRightColor: '#34495e',
    marginLeft: 3
  },
  MonthArrowNext: {
    borderLeftWidth: '7px',
    borderLeftColor: '#34495e',
    marginLeft: 10
  },
  MonthAndYearSelect: {
    height: 25,
    width: 65
  },
  PredefinedRanges: {
    width: 160,
    display: 'inline-block',
    verticalAlign: 'top',
    marginLeft: 10,
    marginTop: 10
  },
  PredefinedRangesItem: {
    display: 'block',
    fontSize: 12,
    color: '#2c3e50',
    padding: '10px 14px',
    borderRadius: '4px',
    textDecoration: 'none',
    marginBottom: 3
  },
  PredefinedRangesItemActive: {
    background: '#4c6375',
    color: '#fff'
  },
  RangeButton: {
    border: 'none',
    borderRadius: '2px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
    height: 25,
    lineHeight: '25px',
    textAlign: 'center',
    letterSpacing: '0.5px',
    display: 'inline-block',
    outline: 0,
    verticalAlign: 'middle',
    width: '48%',
    color: '#fff'
  },
  RangeApplyButton: {
    marginRight: 'calc(4%)',
    backgroundColor: '#f05b1f'
  },
  RangeCancelButton: {
    backgroundColor: '#757985'
  }
};
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var customTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var calendarWidth = defaultTheme.Calendar.width;
  var calendarPadding = defaultTheme.Calendar.padding;
  var cellMargin = defaultTheme.Day.margin || 0;

  if (customTheme.Calendar && customTheme.Calendar.hasOwnProperty('width')) {
    calendarWidth = customTheme.Calendar.width;
  }

  if (customTheme.Calendar && customTheme.Calendar.hasOwnProperty('padding')) {
    calendarPadding = customTheme.Calendar.padding;
  }

  if (customTheme.Day && customTheme.Day.hasOwnProperty('margin')) {
    cellMargin = customTheme.Day.margin;
  }

  var cellSize = (parseInt(calendarWidth, 10) - parseInt(calendarPadding, 10) * 2) / 7 - parseInt(cellMargin, 10) * 2;
  return {
    DateRange: _objectSpread({}, defaultTheme.DateRange, {}, customTheme.DateRange),
    Calendar: _objectSpread({}, defaultTheme.Calendar, {}, customTheme.Calendar),
    Day: _objectSpread({
      width: cellSize,
      height: cellSize,
      lineHeight: cellSize + 'px'
    }, defaultTheme.Day, {}, customTheme.Day),
    DayPassive: _objectSpread({}, defaultTheme.DayPassive, {}, customTheme.DayPassive),
    DayHover: _objectSpread({}, defaultTheme.DayHover, {}, customTheme.DayHover),
    DayToday: _objectSpread({}, defaultTheme.DayToday, {}, customTheme.DayToday),
    DaySunday: _objectSpread({}, defaultTheme.DaySunday, {}, customTheme.DaySunday),
    DaySpecialDay: _objectSpread({}, defaultTheme.DaySpecialDay, {}, customTheme.DaySpecialDay),
    DayActive: _objectSpread({}, defaultTheme.DayActive, {}, customTheme.DayActive),
    DaySelected: _objectSpread({}, defaultTheme.DaySelected, {}, customTheme.DaySelected),
    DayStartEdge: _objectSpread({}, defaultTheme.DayStartEdge, {}, customTheme.DayStartEdge),
    DayEndEdge: _objectSpread({}, defaultTheme.DayEndEdge, {}, customTheme.DayEndEdge),
    DayInRange: _objectSpread({}, defaultTheme.DayInRange, {}, customTheme.DayInRange),
    Weekday: _objectSpread({
      width: cellSize,
      height: cellSize / 2,
      lineHeight: cellSize / 2 + 'px'
    }, defaultTheme.Weekday, {}, customTheme.Weekday),
    MonthAndYear: _objectSpread({}, defaultTheme.MonthAndYear, {}, customTheme.MonthAndYear),
    MonthAndYearSelect: _objectSpread({}, defaultTheme.MonthAndYearSelect, {}, customTheme.MonthAndYearSelect),
    MonthButton: _objectSpread({}, defaultTheme.MonthButton, {}, customTheme.MonthButton),
    MonthArrow: _objectSpread({}, defaultTheme.MonthArrow, {}, customTheme.MonthArrow),
    MonthArrowPrev: _objectSpread({}, defaultTheme.MonthArrowPrev, {}, customTheme.MonthArrowPrev),
    MonthArrowNext: _objectSpread({}, defaultTheme.MonthArrowNext, {}, customTheme.MonthArrowNext),
    PredefinedRanges: _objectSpread({}, defaultTheme.PredefinedRanges, {}, customTheme.PredefinedRanges),
    PredefinedRangesItem: _objectSpread({}, defaultTheme.PredefinedRangesItem, {}, customTheme.PredefinedRangesItem),
    PredefinedRangesItemActive: _objectSpread({}, defaultTheme.PredefinedRangesItemActive, {}, customTheme.PredefinedRangesItemActive),
    RangeApplyButton: _objectSpread({}, defaultTheme.RangeButton, {}, defaultTheme.RangeApplyButton, {}, customTheme.RangeApplyButton),
    RangeCancelButton: _objectSpread({}, defaultTheme.RangeButton, {}, defaultTheme.RangeCancelButton, {}, customTheme.RangeCancelButton)
  };
});

/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/utils/locale.js":
/*!************************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/utils/locale.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  months: [_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Jan'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Feb'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Mar'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Apr'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('May'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Jun'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Jul'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Aug'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Sep'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Oct'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Nov'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Dec')],
  weekdays: [_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Su'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Mo'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Tu'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('We'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Th'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Fr'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Sa')]
});

/***/ }),

/***/ "./www/js/source/reactpages/components/date-range/utils/parseInput.js":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/utils/parseInput.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseInput; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

function parseInput(input, format, timeOfDay) {
  var output = null;

  if (typeof input === 'undefined' || typeof input === 'null' || !input || input === '') {
    output = moment__WEBPACK_IMPORTED_MODULE_0___default()()[timeOfDay]('day');
  } else if (typeof input === 'string') {
    output = moment__WEBPACK_IMPORTED_MODULE_0___default()(input, format)[timeOfDay]('day');
  } else if (typeof input === 'function') {
    output = parseInput(input(moment__WEBPACK_IMPORTED_MODULE_0___default()()[timeOfDay]('day')), format, timeOfDay);
  } else if (input._isAMomentObject) {
    output = input[timeOfDay]('day').clone();
  }

  return output;
}

/***/ }),

/***/ "./www/js/source/reactpages/components/utils/timer.js":
/*!************************************************************!*\
  !*** ./www/js/source/reactpages/components/utils/timer.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timer; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_TIME_DELAY_MILLISECOND = 500;

var Timer =
/*#__PURE__*/
function () {
  function Timer() {
    _classCallCheck(this, Timer);
  }

  _createClass(Timer, null, [{
    key: "debounce",
    value: function debounce(func, wait) {
      var timeout;
      return function () {
        var context = this,
            args = arguments;

        var later = function later() {
          func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait || DEFAULT_TIME_DELAY_MILLISECOND);
      };
    }
  }]);

  return Timer;
}();



/***/ }),

/***/ "./www/js/source/reactpages/constants/config.js":
/*!******************************************************!*\
  !*** ./www/js/source/reactpages/constants/config.js ***!
  \******************************************************/
/*! exports provided: debuggingConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debuggingConfig", function() { return debuggingConfig; });
var debuggingConfig = {
  name: "__lrfConfig__",
  env: "local"
};

/***/ }),

/***/ "./www/js/source/reactpages/layouts/AppLayout.jsx":
/*!********************************************************!*\
  !*** ./www/js/source/reactpages/layouts/AppLayout.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var AppLayout =
/*#__PURE__*/
function (_Component) {
  _inherits(AppLayout, _Component);

  function AppLayout(props) {
    _classCallCheck(this, AppLayout);

    return _possibleConstructorReturn(this, _getPrototypeOf(AppLayout).call(this, props));
  }

  _createClass(AppLayout, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "container",
        className: "container-fluid"
      }, this.props.children);
    }
  }]);

  return AppLayout;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./www/js/source/reactpages/lib/AppData.js":
/*!*************************************************!*\
  !*** ./www/js/source/reactpages/lib/AppData.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (window._AppData || {});

/***/ }),

/***/ "./www/js/source/reactpages/lib/DataService.js":
/*!*****************************************************!*\
  !*** ./www/js/source/reactpages/lib/DataService.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataService; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var DataService =
/*#__PURE__*/
function () {
  function DataService() {
    _classCallCheck(this, DataService);
  }

  _createClass(DataService, null, [{
    key: "getData",
    value: function getData(url, params) {
      return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url, {
        params: params
      });
    }
  }, {
    key: "postData",
    value: function postData(url, params) {
      return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, params, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          '__RequestVerificationToken': _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].getXsrfToken()
        }
      });
    }
  }, {
    key: "getFile",
    value: function getFile(url, params) {
      return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, params, {
        responseType: 'blob',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          '__RequestVerificationToken': _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].getXsrfToken()
        }
      });
    }
  }]);

  return DataService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/lib/createReducer.js":
/*!*******************************************************!*\
  !*** ./www/js/source/reactpages/lib/createReducer.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createReducer; });
function createReducer(initialState, handlers) {
  return function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

/***/ }),

/***/ "./www/js/source/reactpages/lib/langHelper.js":
/*!****************************************************!*\
  !*** ./www/js/source/reactpages/lib/langHelper.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LangHelper; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_RESOURCE_NAME = "_language_en_US";
var langCode = window.PageLanguage || "en-US";
var resourceName = "_language_".concat(langCode.replace("-", "_"));

var LangHelper =
/*#__PURE__*/
function () {
  function LangHelper() {
    _classCallCheck(this, LangHelper);
  }

  _createClass(LangHelper, null, [{
    key: "getSingleResource",
    value: function getSingleResource(key) {
      var langHandler = window[resourceName];
      return langHandler && langHandler[key] || window[DEFAULT_RESOURCE_NAME] && window[DEFAULT_RESOURCE_NAME][key] || key;
    }
  }, {
    key: "getResources",
    value: function getResources(keys) {
      var langHandler = window[resourceName];
      return keys.map(function (key) {
        return langHandler && langHandler[key] || window[DEFAULT_RESOURCE_NAME] && window[DEFAULT_RESOURCE_NAME][key] || key;
      });
    }
  }, {
    key: "currentLanguage",
    get: function get() {
      return langCode;
    }
  }]);

  return LangHelper;
}();



/***/ }),

/***/ "./www/js/source/reactpages/lib/logger.js":
/*!************************************************!*\
  !*** ./www/js/source/reactpages/lib/logger.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Logger; });
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/config */ "./www/js/source/reactpages/constants/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var isDev = "development" === "development";
var configName = _constants_config__WEBPACK_IMPORTED_MODULE_1__["debuggingConfig"].name; // middleware that logs actions

var loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_0__["createLogger"])({
  predicate: function predicate(getState, action) {
    return isDev || window[configName] && window[configName].env === _constants_config__WEBPACK_IMPORTED_MODULE_1__["debuggingConfig"].env && (!window[configName].actionFilter || window[configName].actionFilter === action.type);
  }
});

var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, null, [{
    key: "getLoggerMiddleware",
    value: function getLoggerMiddleware() {
      return loggerMiddleware;
    }
  }]);

  return Logger;
}();



/***/ }),

/***/ "./www/js/source/reactpages/lib/site.js":
/*!**********************************************!*\
  !*** ./www/js/source/reactpages/lib/site.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Site; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _rootUrl = window.rootUrl || "/";

var _xsrfToken = null;

var Site =
/*#__PURE__*/
function () {
  function Site() {
    _classCallCheck(this, Site);
  }

  _createClass(Site, null, [{
    key: "getXsrfToken",
    value: function getXsrfToken() {
      if (!_xsrfToken) {
        _xsrfToken = document.querySelector("input[name=__RequestVerificationToken]").value;
      }

      return _xsrfToken;
    }
  }, {
    key: "resolveClientUrl",
    value: function resolveClientUrl(relativeUrl) {
      return _rootUrl + relativeUrl;
    }
  }, {
    key: "convertDateToString",
    value: function convertDateToString(date) {
      return typeof date === "string" ? date : date.format("MM/DD/YYYY");
    }
  }, {
    key: "asNull",
    value: function asNull(text) {
      if (text != null) {
        text = text.trim();

        if (text === '') {
          return null;
        }
      }

      return text;
    }
  }, {
    key: "downloadFile",
    value: function downloadFile(data, fileName) {
      var url = window.URL.createObjectURL(new Blob([data]));
      var link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }, {
    key: "readAsJson",
    value: function readAsJson(blob, callback) {
      var reader = new FileReader();

      reader.onload = function () {
        callback && callback(JSON.parse(reader.result));
      };

      reader.readAsText(blob);
    }
  }, {
    key: "getRootUrl",
    value: function getRootUrl() {
      return _rootUrl;
    }
  }]);

  return Site;
}();



/***/ }),

/***/ "./www/js/source/reactpages/lib/store.js":
/*!***********************************************!*\
  !*** ./www/js/source/reactpages/lib/store.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./www/js/source/reactpages/lib/logger.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Store =
/*#__PURE__*/
function () {
  function Store() {
    _classCallCheck(this, Store);
  }

  _createClass(Store, null, [{
    key: "createStore",
    value: function createStore(reducer, initialState) {
      var loggerMiddleware = _logger__WEBPACK_IMPORTED_MODULE_2__["default"].getLoggerMiddleware();
      var enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"], // lets us dispatch() functions
      loggerMiddleware));
      return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, initialState, enhancer);
    }
  }]);

  return Store;
}();



/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/index.js":
/*!**************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/actions/index.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tabHandlerAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabHandlerAction */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/tabHandlerAction.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ __webpack_exports__["default"] = (_objectSpread({}, _tabHandlerAction__WEBPACK_IMPORTED_MODULE_0__));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/tabHandlerAction.js":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/actions/tabHandlerAction.js ***!
  \*************************************************************************************************/
/*! exports provided: setSelectedTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedTab", function() { return setSelectedTab; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/types.js");

var setSelectedTab = function setSelectedTab(selectedTabKey) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_TAB"],
    data: selectedTabKey
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/types.js":
/*!**************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/actions/types.js ***!
  \**************************************************************************************/
/*! exports provided: SET_SELECTED_TAB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_TAB", function() { return SET_SELECTED_TAB; });
var SET_SELECTED_TAB = 'SET_SELECTED_TAB';

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/components/AppContainer.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/components/AppContainer.jsx ***!
  \*************************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/index.js");
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _components_tabMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/tabMenu */ "./www/js/source/reactpages/pages/customer/player-segmentation/components/tabMenu.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/constants.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var AppContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppContainer, _React$Component);

  function AppContainer(props) {
    var _this;

    _classCallCheck(this, AppContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppContainer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_renderSelectedTab", function () {
      var selectedTab = _lib_constants__WEBPACK_IMPORTED_MODULE_6__["tabMenuList"].find(function (_) {
        return _.key === selectedTabKey;
      });
      var Component = selectedTab.Component;
      return Component;
    });

    _defineProperty(_assertThisInitialized(_this), "_onClickTabMenu", function (tabKey) {
      var setSelectedTab = _this.props.setSelectedTab;
      setSelectedTab && setSelectedTab(tabKey);
    });

    return _this;
  }

  _createClass(AppContainer, [{
    key: "render",
    value: function render() {
      var selectedTabKey = this.props.selectedTabKey;
      var selectedTab = _lib_constants__WEBPACK_IMPORTED_MODULE_6__["tabMenuList"].find(function (_) {
        return _.key === selectedTabKey;
      });
      var Component = selectedTab.component;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "player-segmentation"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_tabMenu__WEBPACK_IMPORTED_MODULE_5__["TabMenu"], {
        selectedTabMenu: selectedTabKey,
        onClickTabMenu: this._onClickTabMenu,
        tabMenuList: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["tabMenuList"]
      }), Component && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, null)));
    }
  }]);

  return AppContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function mapStateToProps(state) {
  var selectedTabKey = state.selectedTabKey;
  return Object.assign({}, {
    selectedTabKey: selectedTabKey
  });
}

function mapDispatchToProps(dispatch) {
  var setSelectedTab = _actions__WEBPACK_IMPORTED_MODULE_3__["default"].setSelectedTab;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setSelectedTab: setSelectedTab
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/components/TabMenuItem.jsx":
/*!************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/components/TabMenuItem.jsx ***!
  \************************************************************************************************/
/*! exports provided: TabMenuItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabMenuItem", function() { return TabMenuItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var TabMenuItem = function TabMenuItem(props) {
  var item = props.item,
      isActive = props.isActive,
      onClickTabMenu = props.onClickTabMenu;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: item.key
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: isActive ? 'active' : '',
    onClick: function onClick() {
      return onClickTabMenu(item.key);
    }
  }, item.name));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(TabMenuItem));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/components/tabMenu.jsx":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/components/tabMenu.jsx ***!
  \********************************************************************************************/
/*! exports provided: TabMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabMenu", function() { return TabMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TabMenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TabMenuItem */ "./www/js/source/reactpages/pages/customer/player-segmentation/components/TabMenuItem.jsx");


var TabMenu = function TabMenu(props) {
  var selectedTabMenu = props.selectedTabMenu,
      onClickTabMenu = props.onClickTabMenu,
      tabMenuList = props.tabMenuList;
  var selectedTabMenuItem = tabMenuList.find(function (p) {
    return p.key === selectedTabMenu;
  });

  var isActiveTabMenu = function isActiveTabMenu(selectedTabMenu, tabMenuItem) {
    return selectedTabMenu && selectedTabMenu.key === tabMenuItem.key;
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "tab-menu"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, tabMenuList.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TabMenuItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: item.key,
      item: item,
      isActive: isActiveTabMenu(selectedTabMenuItem, item),
      onClickTabMenu: onClickTabMenu
    });
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(TabMenu));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/index.js":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/index.js ***!
  \******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/AppContainer.jsx */ "./www/js/source/reactpages/pages/customer/player-segmentation/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reducers */ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/constants */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/constants.js");







var defaultState = {
  selectedTabKey: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["tabMenuList"][0].key
};
var store = _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_4__["default"].createStore(_reducers__WEBPACK_IMPORTED_MODULE_5__["default"], defaultState);

var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/constants.js":
/*!**************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/lib/constants.js ***!
  \**************************************************************************************/
/*! exports provided: tabMenuList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenuList", function() { return tabMenuList; });
/* harmony import */ var _tabs_problem_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tabs/problem-player */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/index.js");

var tabMenuList = [{
  key: 'problemPlayer',
  name: 'Problem Player',
  component: _tabs_problem_player__WEBPACK_IMPORTED_MODULE_0__["default"]
}, {
  key: 'vipPlayerManagement',
  name: 'Vip Player Management',
  component: null
}];

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/index.js":
/*!***************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/reducers/index.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _tabHandlerReducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabHandlerReducers */ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/tabHandlerReducers.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(_objectSpread({}, _tabHandlerReducers__WEBPACK_IMPORTED_MODULE_1__)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/tabHandlerReducers.js":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/reducers/tabHandlerReducers.js ***!
  \****************************************************************************************************/
/*! exports provided: selectedTabKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedTabKey", function() { return selectedTabKey; });
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/types.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var selectedTabKey = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SELECTED_TAB"], function (prevState, action) {
  return action.data;
}));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/actions/filterAction.js":
/*!*****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/actions/filterAction.js ***!
  \*****************************************************************************************************************/
/*! exports provided: changeIsGetAll, setDateRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeIsGetAll", function() { return changeIsGetAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDateRange", function() { return setDateRange; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/actions/types.js");
/* harmony import */ var _jsroot_actions_dateRangeAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/dateRangeAction */ "./www/js/source/reactpages/actions/dateRangeAction.js");


var changeIsGetAll = function changeIsGetAll(isGetAll) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_IS_GET_ALL"],
    data: isGetAll
  };
};
var setDateRange = _jsroot_actions_dateRangeAction__WEBPACK_IMPORTED_MODULE_1__["setDateRange"];

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/actions/index.js":
/*!**********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/actions/index.js ***!
  \**********************************************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/gridDataAction */ "./www/js/source/reactpages/actions/gridDataAction.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _filterAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filterAction */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/actions/filterAction.js");
/* harmony import */ var _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/actions/usernameAction */ "./www/js/source/reactpages/actions/usernameAction.js");




var ActionCreators = Object.assign({}, _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__, _filterAction__WEBPACK_IMPORTED_MODULE_2__, _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_3__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/actions/types.js":
/*!**********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/actions/types.js ***!
  \**********************************************************************************************************/
/*! exports provided: SET_IS_GET_ALL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_IS_GET_ALL", function() { return SET_IS_GET_ALL; });
var SET_IS_GET_ALL = 'SET_IS_GET_ALL';

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/components/AppContainer.jsx":
/*!*********************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/components/AppContainer.jsx ***!
  \*********************************************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/components/FormFilter.jsx");




var AppContainer = function AppContainer(props) {
  var isLoading = props.isLoading;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "problem-player"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
    isLoading: isLoading
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

function mapStateToProps(state) {
  var isLoading = state.isLoading;
  return Object.assign({
    isLoading: isLoading
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/components/FormFilter.jsx":
/*!*******************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/components/FormFilter.jsx ***!
  \*******************************************************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @9softstudio/react-multiselect */ "./node_modules/@9softstudio/react-multiselect/dist/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/auto-complete */ "./www/js/source/reactpages/components/auto-complete/index.jsx");
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _jsroot_components_date_range__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/date-range */ "./www/js/source/reactpages/components/date-range/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














var FormFilter =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(FormFilter, _PureComponent);

  function FormFilter(props) {
    var _this;

    _classCallCheck(this, FormFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormFilter).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "submit", function (event) {
      event.preventDefault();

      var params = _this._getParams();

      if (!params) {
        return;
      }

      _this.props.setReportTitle(Service.getTitle(null, null, params.IsConvertAll ? params.BaseCurrencyName : ''));

      _this.props.setRequestParam(params);

      _this.props.toggleLoader(true);

      _this.props.getGridData(ApiUrl.RUNNING_DATA_URL, params);
    });

    _defineProperty(_assertThisInitialized(_this), "exportExcel", function (event) {
      event.preventDefault();

      var params = _this._getParams();

      if (!params) {
        return;
      }

      params.IsExport = true;

      _this.props.toggleLoader(true);

      _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_12__["default"].getFile(ApiUrl.RUNNING_DATA_URL, params).then(function (response) {
        var NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
          alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("NoInfo"));
        } else {
          _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_10__["default"].downloadFile(response.data, 'BettingTicketsCenter_Running.xls');
        }

        _this.props.toggleLoader(false);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onChangeDateRange", function (date) {
      var isValidMonthRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (isValidMonthRange) {
        _this.props.setDateRange(date);
      } else {
        var message = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("DateRangeExceedMsg").replace("{0}", 1);
        alert(message);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onChangeCurrency", function (currencyIdList) {
      _this.props.setSelectedCurrency(currencyIdList);
    });

    return _this;
  }

  _createClass(FormFilter, [{
    key: "_getParams",
    value: function _getParams() {
      var _this$props$requestPa = this.props.requestParam,
          PageSize = _this$props$requestPa.PageSize,
          SortBy = _this$props$requestPa.SortBy,
          SortOrder = _this$props$requestPa.SortOrder;
      return {
        PageSize: PageSize,
        PageIndex: 1,
        Username: this.props.username,
        CurrencyIdList: this.props.selectedCurrency,
        SortBy: SortBy,
        SortOrder: SortOrder
      };
    }
  }, {
    key: "_renderDateRange",
    value: function _renderDateRange() {
      var dateRange = this.props.dateRange;
      var dateConstraint = {
        mindDate: '01/01/2019',
        maxDate: '02/16/2020',
        limitedMonthRange: 1
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_range__WEBPACK_IMPORTED_MODULE_7__["DateRange"], {
        startDate: dateRange.fromDate,
        endDate: dateRange.toDate,
        minDate: dateConstraint.minDate,
        maxDate: dateConstraint.maxDate,
        today: dateRange.toDate,
        limitedMonthRange: dateConstraint.limitedMonthRange,
        onChange: this._onChangeDateRange
      });
    }
  }, {
    key: "_renderCurrencySelectList",
    value: function _renderCurrencySelectList() {
      var _this2 = this;

      var currencyList = [{
        Key: 1,
        Value: 'USD',
        Status: true
      }, {
        Key: 2,
        Value: 'VND',
        Status: true
      }];
      return currencyList && currencyList.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_3___default.a, {
        id: "ddlCurrency",
        language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].currentLanguage,
        dataSource: currencyList,
        keyField: "Id",
        valueField: "Value",
        statusField: "Status",
        onChange: function onChange(currentItem, selectedItemsKey) {
          return _this2._onChangeCurrency(selectedItemsKey);
        }
      });
    }
  }, {
    key: "_renderExcelIcon",
    value: function _renderExcelIcon() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-excel right",
        onClick: this.exportExcel,
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("ExportToExcel")
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "page-filter",
        stickyFooter: this._renderExcelIcon()
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-4 col-sm-3 col-lg-4 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Date")), this._renderDateRange())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_6__["default"], {
        id: "IsGetAll",
        checked: this.props.isGetAll,
        onChange: function onChange(checked) {
          return _this3.props.changeIsGetAll(checked);
        },
        label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("IsGetAll")
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-4 col-sm-3 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Username")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onSelect: function onSelect(value) {
          return _this3.props.setUsername(value);
        },
        onInput: function onInput(value) {
          return _this3.props.setUsername(value);
        },
        htmlAttributes: {
          placeholder: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("ExternalIdOrSystemId")
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-4 col-sm-3 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Currency")), this._renderCurrencySelectList())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-4 col-sm-3 col-lg-2 col-xl-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "button-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "btn btn-submit",
        onClick: this.submit
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Submit")))))));
    }
  }]);

  return FormFilter;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapDispatchToProps(dispatch) {
  var setDateRange = _actions_index_js__WEBPACK_IMPORTED_MODULE_8__["ActionCreators"].setDateRange,
      changeIsGetAll = _actions_index_js__WEBPACK_IMPORTED_MODULE_8__["ActionCreators"].changeIsGetAll,
      setUsername = _actions_index_js__WEBPACK_IMPORTED_MODULE_8__["ActionCreators"].setUsername,
      setSelectedCurrency = _actions_index_js__WEBPACK_IMPORTED_MODULE_8__["ActionCreators"].setSelectedCurrency;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(Object.assign({}, {
    setDateRange: setDateRange,
    changeIsGetAll: changeIsGetAll,
    setUsername: setUsername,
    setSelectedCurrency: setSelectedCurrency
  }), dispatch);
}

function mapStateToProps(state) {
  var dateRange = state.dateRange,
      isGetAll = state.isGetAll,
      selectedCurrency = state.selectedCurrency,
      requestParam = state.requestParam,
      username = state.username;
  return Object.assign({}, {
    dateRange: dateRange,
    isGetAll: isGetAll,
    selectedCurrency: selectedCurrency,
    username: username,
    requestParam: requestParam
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/index.js":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/index.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/AppContainer.jsx */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/reducers/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var defaultState = {
  isLoading: false,
  isGetAll: true
};
var store = _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_3__["default"].createStore(_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);

var _default =
/*#__PURE__*/
function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default(props) {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, props));
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
        store: store
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null));
    }
  }]);

  return _default;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/reducers/filterReducer.js":
/*!*******************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/reducers/filterReducer.js ***!
  \*******************************************************************************************************************/
/*! exports provided: isGetAll, dateRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGetAll", function() { return isGetAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateRange", function() { return dateRange; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _jsroot_reducers_dateRangeReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/reducers/dateRangeReducer */ "./www/js/source/reactpages/reducers/dateRangeReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var isGetAll = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_IS_GET_ALL"], function (state, action) {
  return action.data;
}));
var dateRange = _jsroot_reducers_dateRangeReducer__WEBPACK_IMPORTED_MODULE_2__["dateRange"];

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/reducers/index.js":
/*!***********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/reducers/index.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_gridDataReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/gridDataReducer.js */ "./www/js/source/reactpages/reducers/gridDataReducer.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _filterReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filterReducer */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/reducers/filterReducer.js");




/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_jsroot_reducers_gridDataReducer_js__WEBPACK_IMPORTED_MODULE_1__, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_2__, _filterReducer__WEBPACK_IMPORTED_MODULE_3__)));

/***/ }),

/***/ "./www/js/source/reactpages/reducers/dateRangeReducer.js":
/*!***************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/dateRangeReducer.js ***!
  \***************************************************************/
/*! exports provided: dateRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateRange", function() { return dateRange; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var dateRange = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_DATE_RANGE"], function (state, action) {
  return action.data;
}));

/***/ }),

/***/ "./www/js/source/reactpages/reducers/gridDataReducer.js":
/*!**************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/gridDataReducer.js ***!
  \**************************************************************/
/*! exports provided: gridData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gridData", function() { return gridData; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/actions/types.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var gridData = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_GRID_DATA"], function (state, action) {
  return action.data;
}));

/***/ }),

/***/ "./www/js/source/reactpages/reducers/loaderReducer.js":
/*!************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/loaderReducer.js ***!
  \************************************************************/
/*! exports provided: isLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLoading", function() { return isLoading; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var isLoading = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["TOGGLE_LOADER"], function (state, action) {
  return action.data;
}));

/***/ })

/******/ });
//# sourceMappingURL=main.chunk.js.map