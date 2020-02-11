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
/******/ 		"www/js/build/dev/reactpages/report/dailybets": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/dailybets/components/index.jsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./www/js/source/reactpages/actions/pagingOptionAction.js":
/*!****************************************************************!*\
  !*** ./www/js/source/reactpages/actions/pagingOptionAction.js ***!
  \****************************************************************/
/*! exports provided: setPagingOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPagingOption", function() { return setPagingOption; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var setPagingOption = function setPagingOption(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_PAGING_OPTION"],
    data: data
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/reportTitleAction.js":
/*!***************************************************************!*\
  !*** ./www/js/source/reactpages/actions/reportTitleAction.js ***!
  \***************************************************************/
/*! exports provided: setReportTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReportTitle", function() { return setReportTitle; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var setReportTitle = function setReportTitle(title) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_REPORT_TITLE"],
    data: title
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/requestParamAction.js":
/*!****************************************************************!*\
  !*** ./www/js/source/reactpages/actions/requestParamAction.js ***!
  \****************************************************************/
/*! exports provided: setRequestParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRequestParam", function() { return setRequestParam; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var setRequestParam = function setRequestParam(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_REQUEST_PARAM"],
    data: data
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

/***/ "./www/js/source/reactpages/components/NoDataTitle.jsx":
/*!*************************************************************!*\
  !*** ./www/js/source/reactpages/components/NoDataTitle.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");



var NoDataTitle = function NoDataTitle(_ref) {
  var title = _ref.title;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "no-info-row center-align",
    dangerouslySetInnerHTML: {
      __html: title ? title : _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("NoInfo")
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (NoDataTitle);

/***/ }),

/***/ "./www/js/source/reactpages/components/ReportTitle.jsx":
/*!*************************************************************!*\
  !*** ./www/js/source/reactpages/components/ReportTitle.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var ReportTitle = function ReportTitle(_ref) {
  var content = _ref.content,
      tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["content", "tag"]);

  var Tag = tag;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "report-title-container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
    className: "report-title"
  }, attrs), content));
};

var propTypes = {
  tag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  content: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any
};
var defaultProps = {
  tag: 'p'
};
ReportTitle.propTypes = propTypes;
ReportTitle.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ReportTitle);

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

/***/ "./www/js/source/reactpages/lib/numberFormat.js":
/*!******************************************************!*\
  !*** ./www/js/source/reactpages/lib/numberFormat.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NumberFormat; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NumberFormat =
/*#__PURE__*/
function () {
  function NumberFormat() {
    _classCallCheck(this, NumberFormat);
  }

  _createClass(NumberFormat, null, [{
    key: "formatDecimal",
    value: function formatDecimal(value) {
      return this.format(value, 2);
    }
  }, {
    key: "format",
    value: function format(value) {
      var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (typeof value !== "number" || isNaN(value)) {
        return "";
      }

      var roundedValue = this.round(value, digits);
      return roundedValue.toFixed(digits).replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1,");
    }
  }, {
    key: "round",
    value: function round(value, digits) {
      var sign = value < 0 ? -1 : 1;
      var absoluteValue = Math.abs(value);
      var rounded = Number(Math.round(absoluteValue + 'e' + digits) + 'e-' + digits);
      return sign * rounded;
    }
  }, {
    key: "parseToString",
    value: function parseToString(number) {
      return number.toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1,");
    }
  }]);

  return NumberFormat;
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

/***/ "./www/js/source/reactpages/pages/dailybets/actions/dataAction.js":
/*!************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/actions/dataAction.js ***!
  \************************************************************************/
/*! exports provided: getData, exportExcel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportExcel", function() { return exportExcel; });
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _jsroot_actions_pagingOptionAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/pagingOptionAction */ "./www/js/source/reactpages/actions/pagingOptionAction.js");
/* harmony import */ var _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/gridDataAction */ "./www/js/source/reactpages/actions/gridDataAction.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/DataService */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var emptyData = {
  dataList: [],
  total: {}
};
var defaultPaingOption = {
  TotalItem: 0
};

var dispatchResult = function dispatchResult(dispatch, data, pagingOption) {
  dispatch(Object(_jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(data));
  dispatch(Object(_jsroot_actions_pagingOptionAction__WEBPACK_IMPORTED_MODULE_1__["setPagingOption"])(pagingOption));
  dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(false));
};

var apiUrl = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl('DailyBetsReport/Index');
var getData = function getData(param) {
  return function (dispatch) {
    dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(true));
    _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_4__["default"].postData(apiUrl, param).then(function (response) {
      var _response$data = response.data,
          dataList = _response$data.dataList,
          total = _response$data.total,
          totalRows = _response$data.totalRows;
      var data = {
        dataList: dataList || [],
        total: total || {}
      };
      var newPagingOption = {
        TotalItem: totalRows,
        PageSize: param.pageSize,
        PageIndex: param.pageIndex
      };
      dispatchResult(dispatch, data, newPagingOption);
    })["catch"](function (error) {
      console.log(error.message);
      dispatchResult(dispatch, _objectSpread({}, emptyData), _objectSpread({}, defaultPaingOption));
    });
  };
};
var exportExcel = function exportExcel(param) {
  return function (dispatch) {
    dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(true));
    _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_4__["default"].getFile(apiUrl, param).then(function (response) {
      if (response.data.size === 0) {
        alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("NoInfo"));
      } else {
        _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_3__["default"].downloadFile(response.data, 'DailyBetsReport.zip');
      }

      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(false));
    })["catch"](function (error) {
      console.log(error.message);
      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(false));
    });
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/actions/index.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/actions/index.js ***!
  \*******************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/requestParamAction */ "./www/js/source/reactpages/actions/requestParamAction.js");
/* harmony import */ var _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/reportTitleAction */ "./www/js/source/reactpages/actions/reportTitleAction.js");
/* harmony import */ var _dataAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataAction */ "./www/js/source/reactpages/pages/dailybets/actions/dataAction.js");



var ActionCreators = Object.assign({}, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_1__, _dataAction__WEBPACK_IMPORTED_MODULE_2__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/components/AppContainer.jsx":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/components/AppContainer.jsx ***!
  \******************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/pages/dailybets/components/DataGrid.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/pages/dailybets/components/FormFilter.jsx");
/* harmony import */ var _GridCaption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GridCaption */ "./www/js/source/reactpages/pages/dailybets/components/GridCaption.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");







var AppContainer = function AppContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_6__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isLoading: props.isLoading
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridCaption__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

function mapStateToProps(state) {
  var isLoading = state.isLoading;
  return Object.assign({}, {
    isLoading: isLoading
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AppContainer)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/components/DataGrid.jsx":
/*!**************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/components/DataGrid.jsx ***!
  \**************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/dailybets/actions/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_gridUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/gridUtils */ "./www/js/source/reactpages/pages/dailybets/lib/gridUtils.js");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var DataGrid = function DataGrid(props) {
  var isFirstRun = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(true);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    var getData = props.getData;

    var param = _objectSpread({}, props.requestParam);

    getData(param);
  }, [props.requestParam]);
  var gridData = props.gridData;
  var dataList = gridData.dataList,
      total = gridData.total;

  if (!dataList) {
    return null;
  }

  if (!dataList.length) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_6__["default"], null);
  }

  var pagingOption = props.pagingOption,
      requestParam = props.requestParam;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Table"], {
    minWidth: 650,
    autoWidth: true,
    autoHeight: true,
    header: Object(_lib_gridUtils__WEBPACK_IMPORTED_MODULE_5__["renderHeader"])(),
    body: Object(_lib_gridUtils__WEBPACK_IMPORTED_MODULE_5__["renderDataSection"])(dataList),
    footer: Object(_lib_gridUtils__WEBPACK_IMPORTED_MODULE_5__["renderDataSection"])([total], true),
    containerPadding: 30,
    onSort: function onSort(sortBy, sortOrder) {
      return props.setRequestParam(_objectSpread({}, requestParam, {
        sortBy: sortBy,
        sortOrder: sortOrder
      }));
    },
    isPaging: true,
    pageOption: pagingOption,
    onPaging: function onPaging(pageIndex, pageSize) {
      return props.setRequestParam(_objectSpread({}, requestParam, {
        pageSize: pageSize,
        pageIndex: pageIndex
      }));
    }
  });
};

function mapDispatchToProps(dispatch) {
  var setRequestParam = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setRequestParam,
      getData = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].getData;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setRequestParam: setRequestParam,
    getData: getData
  }, dispatch);
}

function mapStateToProps(state) {
  var requestParam = state.requestParam,
      pagingOption = state.pagingOption,
      gridData = state.gridData;
  return Object.assign({}, {
    requestParam: requestParam,
    pagingOption: pagingOption,
    gridData: gridData
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/components/FormFilter.jsx":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/components/FormFilter.jsx ***!
  \****************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/dailybets/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @9softstudio/react-datepicker */ "./node_modules/@9softstudio/react-datepicker/dist/index.js");
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/utils */ "./www/js/source/reactpages/pages/dailybets/lib/utils.js");
/* harmony import */ var _lib_formFilterUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/formFilterUtils */ "./www/js/source/reactpages/pages/dailybets/lib/formFilterUtils.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var FormFilter = function FormFilter(props) {
  var requestParam = props.requestParam;
  var productCodeList = requestParam.productCodeList,
      currencyIdList = requestParam.currencyIdList,
      date = requestParam.date,
      pageSize = requestParam.pageSize,
      sortBy = requestParam.sortBy,
      sortOrder = requestParam.sortOrder;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(productCodeList),
      _useState2 = _slicedToArray(_useState, 2),
      selectedProduct = _useState2[0],
      setSelectedProduct = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(currencyIdList),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedCurrency = _useState4[0],
      setSelectedCurrency = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(date),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedDate = _useState6[0],
      setSelectedDate = _useState6[1];

  var handleChangeProduct = function handleChangeProduct(currentItem, selectedItemsKey) {
    return setSelectedProduct(selectedItemsKey);
  };

  var handleChangeCurrency = function handleChangeCurrency(currentItem, selectedItemsKey) {
    return setSelectedCurrency(selectedItemsKey);
  };

  var buildParam = function buildParam() {
    return {
      pageSize: pageSize,
      pageIndex: 1,
      sortBy: sortBy,
      sortOrder: sortOrder,
      currencyIdList: selectedCurrency,
      productCodeList: selectedProduct,
      date: selectedDate
    };
  };

  var submit = function submit(event) {
    event.preventDefault();
    var params = buildParam();
    props.setRequestParam(params);
  };

  var exportExcel = function exportExcel(event) {
    event.preventDefault();
    var params = buildParam();
    params.isExportExcel = true;
    props.exportExcel(params);
  };

  var productOptions = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].productOptions,
      currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].currencyList;
  var dateConstraint = props.dateConstraint;
  var dateString = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_7__["getFormattedDate"])(selectedDate);
  var isValidParam = !!selectedProduct && !!selectedCurrency;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-filter"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Date")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_6__["DatePicker"], {
    format: "DD/MM/YYYY",
    minDate: dateConstraint.minDate,
    maxDate: dateConstraint.maxDate,
    date: dateString,
    onChange: function onChange(momentDate) {
      return setSelectedDate(momentDate.format("MM/DD/YYYY"));
    }
  }))), productOptions && productOptions.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Product")), Object(_lib_formFilterUtils__WEBPACK_IMPORTED_MODULE_8__["renderProductSelectList"])(productOptions, handleChangeProduct))) : null, currencyList && currencyList.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Currency")), Object(_lib_formFilterUtils__WEBPACK_IMPORTED_MODULE_8__["renderCurrencySelectList"])(currencyList, handleChangeCurrency))) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn btn-submit",
    disabled: !isValidParam,
    onClick: submit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Submit"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "caret-block"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-excel right",
    onClick: exportExcel,
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('ExportToExcel')
  }))));
};

function mapDispatchToProps(dispatch) {
  var setRequestParam = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setRequestParam,
      exportExcel = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].exportExcel;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setRequestParam: setRequestParam,
    exportExcel: exportExcel
  }, dispatch);
}

function mapStateToProps(state) {
  var requestParam = state.requestParam,
      dateConstraint = state.dateConstraint;
  return Object.assign({}, {
    requestParam: requestParam,
    dateConstraint: dateConstraint
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/components/GridCaption.jsx":
/*!*****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/components/GridCaption.jsx ***!
  \*****************************************************************************/
/*! exports provided: GridCaption, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridCaption", function() { return GridCaption; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/utils */ "./www/js/source/reactpages/pages/dailybets/lib/utils.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var buildCurrencytext = function buildCurrencytext(selectedCurrency) {
  var currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__["default"].currencyList;
  var selectedCurrencyList = selectedCurrency.split(',');
  var isSelectAllCurrency = currencyList.map(function (x) {
    return x.Key;
  }).length === selectedCurrencyList.length;

  if (!isSelectAllCurrency) {
    var selectedCurrencyText = currencyList.reduce(function (result, currentItem) {
      if (selectedCurrencyList.findIndex(function (x) {
        return Number(x) === currentItem.Key;
      }) !== -1) {
        result.push(currentItem.Value);
      }

      return result;
    }, []).join(', ');
    var resourceKey = selectedCurrencyList.length > 1 ? 'Currencies' : 'Currency';
    return "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource(resourceKey), ": ") + selectedCurrencyText;
  }

  return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource('AllCurrencies');
};

var GridCaption = function GridCaption(props) {
  var isFirstRun = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(true);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      content = _useState2[0],
      setContent = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    var requestParam = props.requestParam,
        pagingOption = props.pagingOption;
    var date = requestParam.date,
        currencyIdList = requestParam.currencyIdList;
    var dateString = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["getFormattedDate"])(date);
    var currencyText = buildCurrencytext(currencyIdList);
    var totalTicketText = "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource('TotalTickets'), ": ").concat(_jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].format(pagingOption.TotalItem));
    var content = "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource('DailyBets'), ", ").concat(dateString, " - ").concat(currencyText, " - ").concat(totalTicketText);
    setContent(content);
  }, [props.requestParam, props.pagingOption]);

  if (!content) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: content
  });
};

function mapStateToProps(state) {
  var requestParam = state.requestParam,
      pagingOption = state.pagingOption;
  return Object.assign({}, {
    requestParam: requestParam,
    pagingOption: pagingOption
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(GridCaption));

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/components/index.jsx":
/*!***********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/components/index.jsx ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/pages/dailybets/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers */ "./www/js/source/reactpages/pages/dailybets/reducers/index.js");
/* harmony import */ var _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var productOptions = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].productOptions,
    currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].currencyList;
var selectedProduct = productOptions.map(function (x) {
  return x.Code;
}).join(',');
var selectedCurrency = currencyList.map(function (x) {
  return x.Key;
}).join(',');

var _window$initialState = window.initialState,
    today = _window$initialState.today,
    initialState = _objectWithoutProperties(_window$initialState, ["today"]);

var requestParam = {
  pageSize: 50,
  pageIndex: 1,
  sortBy: '',
  sortOrder: '',
  productCodeList: selectedProduct,
  currencyIdList: selectedCurrency,
  date: today
};

var defaultState = _objectSpread({}, initialState, {
  requestParam: requestParam
});

var store = _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);

var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/lib/constants.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/lib/constants.js ***!
  \*******************************************************************/
/*! exports provided: headerText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerText", function() { return headerText; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");

var headerText = {
  playerName: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('PlayerName'),
  currency: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Currency'),
  refNo: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('RefNo'),
  transTime: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('TransTime'),
  product: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Product'),
  betType: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('BetType'),
  turnover: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Turnover'),
  winloss: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('WinLoss'),
  status: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Status')
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/lib/formFilterUtils.js":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/lib/formFilterUtils.js ***!
  \*************************************************************************/
/*! exports provided: renderProductSelectList, renderCurrencySelectList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderProductSelectList", function() { return renderProductSelectList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderCurrencySelectList", function() { return renderCurrencySelectList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @9softstudio/react-multiselect */ "./node_modules/@9softstudio/react-multiselect/dist/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_2__);



var renderProductSelectList = function renderProductSelectList(dataSource, onChangeHandler) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default.a, {
    id: "ProductList",
    language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].currentLanguage,
    dataSource: dataSource,
    keyField: "Code",
    valueField: "Name",
    statusField: "Status",
    onChange: onChangeHandler
  });
};
var renderCurrencySelectList = function renderCurrencySelectList(dataSource, onChangeHandler) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default.a, {
    id: "ddlCurrency",
    language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].currentLanguage,
    dataSource: dataSource,
    keyField: "Key",
    valueField: "Value",
    statusField: "Status",
    onChange: onChangeHandler
  });
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/lib/gridUtils.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/lib/gridUtils.js ***!
  \*******************************************************************/
/*! exports provided: renderHeader, renderDataSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderHeader", function() { return renderHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDataSection", function() { return renderDataSection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/pages/dailybets/lib/constants.js");
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");




var renderHeader = function renderHeader() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
    style: {
      height: 32
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 40
  }, "#"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 100
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].playerName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 50
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].currency), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 100
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].refNo), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 100
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].transTime), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 80
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].product), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 150
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].betType), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 80,
    sortBy: 'turnover'
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].turnover), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 80,
    sortBy: 'winLoss'
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].winloss), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 50
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].status));
};
var renderDataSection = function renderDataSection(dataList, isTotalRow) {
  if (isTotalRow) {
    return buildTotalRow(dataList[0]);
  }

  var dataRows = [];

  for (var i = 0; i < dataList.length; i++) {
    dataRows.push(buildDataRow(dataList[i]));
  }

  return dataRows;
};

var buildDataRow = function buildDataRow(dataItem) {
  var index = dataItem.index,
      playerName = dataItem.playerName,
      currencyName = dataItem.currencyName,
      refNo = dataItem.refNo,
      transTimeString = dataItem.transTimeString,
      productName = dataItem.productName,
      betType = dataItem.betType,
      turnover = dataItem.turnover,
      winLoss = dataItem.winLoss,
      status = dataItem.status;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    key: index
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, index), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, playerName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, currencyName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, refNo), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, transTimeString), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, productName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, betType), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(turnover)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(winLoss)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, status));
};

var buildTotalRow = function buildTotalRow(dataItem) {
  var turnover = dataItem.turnover,
      winLoss = dataItem.winLoss;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    key: "totalRowUSD"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align",
    colSpan: "7"
  }, "Total In USD"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(turnover)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(winLoss)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], null));
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/lib/utils.js":
/*!***************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/lib/utils.js ***!
  \***************************************************************/
/*! exports provided: getFormattedDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormattedDate", function() { return getFormattedDate; });
var getFormattedDate = function getFormattedDate(dateString) {
  var dateParts = dateString.split('/');
  return "".concat(dateParts[1], "/").concat(dateParts[0], "/").concat(dateParts[2]);
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/reducers/index.js":
/*!********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/reducers/index.js ***!
  \********************************************************************/
/*! exports provided: dateConstraint, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateConstraint", function() { return dateConstraint; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/reducers/requestParamReducer */ "./www/js/source/reactpages/reducers/requestParamReducer.js");
/* harmony import */ var _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/reducers/reportTitleReducer */ "./www/js/source/reactpages/reducers/reportTitleReducer.js");
/* harmony import */ var _jsroot_reducers_pagingOptionReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/reducers/pagingOptionReducer */ "./www/js/source/reactpages/reducers/pagingOptionReducer.js");
/* harmony import */ var _jsroot_reducers_gridDataReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/reducers/gridDataReducer */ "./www/js/source/reactpages/reducers/gridDataReducer.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");







var dateConstraint = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, {});
/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_1__, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_2__, _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_3__, _jsroot_reducers_pagingOptionReducer__WEBPACK_IMPORTED_MODULE_4__, _jsroot_reducers_gridDataReducer__WEBPACK_IMPORTED_MODULE_5__, {
  dateConstraint: dateConstraint
})));

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

/***/ }),

/***/ "./www/js/source/reactpages/reducers/pagingOptionReducer.js":
/*!******************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/pagingOptionReducer.js ***!
  \******************************************************************/
/*! exports provided: pagingOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagingOption", function() { return pagingOption; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var defaultPagingOption = {
  PageIndex: 1,
  PageSize: 50,
  TotalItem: 0,
  PageList: [50, 100, 200, 500]
};
var pagingOption = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(defaultPagingOption, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_PAGING_OPTION"], function (prevState, action) {
  return _objectSpread({}, prevState, {}, action.data);
}));

/***/ }),

/***/ "./www/js/source/reactpages/reducers/reportTitleReducer.js":
/*!*****************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/reportTitleReducer.js ***!
  \*****************************************************************/
/*! exports provided: reportTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportTitle", function() { return reportTitle; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var reportTitle = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_REPORT_TITLE"], function (state, action) {
  return action.data;
}));

/***/ }),

/***/ "./www/js/source/reactpages/reducers/requestParamReducer.js":
/*!******************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/requestParamReducer.js ***!
  \******************************************************************/
/*! exports provided: requestParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestParam", function() { return requestParam; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var requestParam = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_REQUEST_PARAM"], function (state, action) {
  return _objectSpread({}, action.data);
}));

/***/ })

/******/ });
//# sourceMappingURL=dailybets.chunk.js.map