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
/******/ 		"www/js/build/dev/reactpages/bettingticketscenter/running": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/bettingticketscenter/running/components/index.jsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/js/source/reactpages/actions/baseCurrencyAction.js":
/*!****************************************************************!*\
  !*** ./www/js/source/reactpages/actions/baseCurrencyAction.js ***!
  \****************************************************************/
/*! exports provided: setSelectedBaseCurrency, setBaseCurrencyList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedBaseCurrency", function() { return setSelectedBaseCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBaseCurrencyList", function() { return setBaseCurrencyList; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var setSelectedBaseCurrency = function setSelectedBaseCurrency(baseCurrency) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_BASECURRENCY"],
    data: baseCurrency
  };
};
var setBaseCurrencyList = function setBaseCurrencyList(baseCurrencyList) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_BASECURRENCY_LIST"],
    data: baseCurrencyList
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/convertAllAction.js":
/*!**************************************************************!*\
  !*** ./www/js/source/reactpages/actions/convertAllAction.js ***!
  \**************************************************************/
/*! exports provided: changeIsConvertAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeIsConvertAll", function() { return changeIsConvertAll; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var changeIsConvertAll = function changeIsConvertAll(checked) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["CHANGE_IS_CONVERT_ALL"],
    data: checked
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/currencyAction.js":
/*!************************************************************!*\
  !*** ./www/js/source/reactpages/actions/currencyAction.js ***!
  \************************************************************/
/*! exports provided: setSelectedCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedCurrency", function() { return setSelectedCurrency; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var setSelectedCurrency = function setSelectedCurrency(item) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_CURRENCY"],
    data: item
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

/***/ "./www/js/source/reactpages/actions/productAction.js":
/*!***********************************************************!*\
  !*** ./www/js/source/reactpages/actions/productAction.js ***!
  \***********************************************************/
/*! exports provided: setSelectedProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedProduct", function() { return setSelectedProduct; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var setSelectedProduct = function setSelectedProduct(product) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_PRODUCT"],
    data: product
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

/***/ "./www/js/source/reactpages/actions/statusAction.js":
/*!**********************************************************!*\
  !*** ./www/js/source/reactpages/actions/statusAction.js ***!
  \**********************************************************/
/*! exports provided: setSelectedStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedStatus", function() { return setSelectedStatus; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var setSelectedStatus = function setSelectedStatus(item) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_STATUS"],
    data: item
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

/***/ "./www/js/source/reactpages/actions/userGuideAction.js":
/*!*************************************************************!*\
  !*** ./www/js/source/reactpages/actions/userGuideAction.js ***!
  \*************************************************************/
/*! exports provided: getUserGuideContent, setUserGuideContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserGuideContent", function() { return getUserGuideContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUserGuideContent", function() { return setUserGuideContent; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/site */ "./www/js/source/reactpages/lib/site.js");




var fetchData = function fetchData(resourceName) {
  var url = _lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].resolveClientUrl('UserGuide/Index?resourcename=' + resourceName) + "&_=" + new Date().getTime();
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
};

function getUserGuideContent(params) {
  return function (dispatch) {
    fetchData(params).then(function (response) {
      dispatch(setUserGuideContent(response.data));
    });
  };
}
var setUserGuideContent = function setUserGuideContent(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["USER_GUIDE_CONTENT"],
    data: data
  };
};

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

/***/ "./www/js/source/reactpages/components/UserGuide.jsx":
/*!***********************************************************!*\
  !*** ./www/js/source/reactpages/components/UserGuide.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserGuide; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _popup_Popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popup/Popup */ "./www/js/source/reactpages/components/popup/Popup.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
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






var UserGuide =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UserGuide, _React$Component);

  function UserGuide(props) {
    var _this;

    _classCallCheck(this, UserGuide);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UserGuide).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onClickHandler", function () {
      _this.setState({
        isShow: true
      });

      _this.props.onClick && _this.props.onClick();
    });

    _defineProperty(_assertThisInitialized(_this), "onCloseHandler", function () {
      _this.setState({
        isShow: false
      });
    });

    _this.state = {
      isShow: false
    };
    return _this;
  }

  _createClass(UserGuide, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          title = _this$props.title,
          content = _this$props.content,
          contentTitle = _this$props.contentTitle;
      var isShow = this.state.isShow && content.length > 0;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: className,
        onClick: this.onClickHandler,
        title: title
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_popup_Popup__WEBPACK_IMPORTED_MODULE_2__["default"], {
        width: 640,
        height: 480,
        isShow: isShow,
        title: contentTitle,
        onClose: this.onCloseHandler,
        isHtml: true
      }, content));
    }
  }]);

  return UserGuide;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

_defineProperty(UserGuide, "propTypes", {
  title: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  content: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  contentTitle: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string
});

_defineProperty(UserGuide, "defaultProps", {
  className: 'icon-book right',
  content: ''
});


;

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

/***/ "./www/js/source/reactpages/components/betlist/BetListDataGrid.jsx":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/components/betlist/BetListDataGrid.jsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_components_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/popup */ "./www/js/source/reactpages/components/popup/index.jsx");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
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







var BetListDataGrid =
/*#__PURE__*/
function (_Component) {
  _inherits(BetListDataGrid, _Component);

  function BetListDataGrid(props) {
    var _this;

    _classCallCheck(this, BetListDataGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BetListDataGrid).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onSort", function (sortBy, sortOrder) {
      _this.props.onSort && _this.props.onSort(sortBy, sortOrder);
    });

    _defineProperty(_assertThisInitialized(_this), "onPaging", function (index, size) {
      _this.props.onPaging && _this.props.onPaging(index, size);
    });

    return _this;
  }

  _createClass(BetListDataGrid, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.data !== prevProps.data) {
        this.props.afterLoad && this.props.afterLoad();
      }
    }
  }, {
    key: "_getResource",
    value: function _getResource(key) {
      return this.props.getResourceFunc ? this.props.getResourceFunc(key) : key;
    }
  }, {
    key: "_getTotalCellClassName",
    value: function _getTotalCellClassName(column, value) {
      if (this.props.getTotalCellClassNameFunc) {
        return this.props.getTotalCellClassNameFunc(column, value);
      }

      return column === 'LicenseeWL' && value.substring(0, 1) === '-' ? 'negative' : '';
    }
  }, {
    key: "_getHeaderName",
    value: function _getHeaderName(column) {
      return this.props.getHeaderNameFunc ? this.props.getHeaderNameFunc(column) : column;
    }
  }, {
    key: "_mapData",
    value: function _mapData(data) {
      return this.props.mappingDataFunc ? this.props.mappingDataFunc(data) : data;
    }
  }, {
    key: "_buildHeader",
    value: function _buildHeader() {
      var rows = [];
      var _this$props = this.props,
          columns = _this$props.columns,
          columnWidths = _this$props.columnWidths,
          sortableColumns = _this$props.sortableColumns;

      for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        var isSortable = sortableColumns.indexOf(column) >= 0;

        var headerName = this._getHeaderName(column);

        rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
          key: column,
          colWidth: columnWidths[i],
          sortBy: isSortable ? column : null
        }, headerName));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
        style: {
          height: 32
        }
      }, rows);
    }
  }, {
    key: "_buildBody",
    value: function _buildBody() {
      var _this$props2 = this.props,
          columns = _this$props2.columns,
          columnAlignments = _this$props2.columnAlignments,
          data = _this$props2.data;
      var rows = [];

      for (var i = 0; i < data.length; i++) {
        var item = this._mapData(data[i]);

        var cells = [];

        for (var j = 0; j < columns.length; j++) {
          var column = columns[j];
          cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
            key: "".concat(column, "-").concat(i),
            className: columnAlignments[j],
            dangerouslySetInnerHTML: {
              __html: item[column]
            }
          }));
        }

        rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          key: i
        }, cells));
      }

      return rows;
    }
  }, {
    key: "_buildFooter",
    value: function _buildFooter() {
      if (!this.props.totalColumns || !this.props.totalColumns.length) {
        return false;
      }

      var _this$props3 = this.props,
          columns = _this$props3.columns,
          totalColumns = _this$props3.totalColumns,
          total = _this$props3.total,
          totalText = _this$props3.totalText,
          columnAlignments = _this$props3.columnAlignments;
      var startTotalIndex = columns.indexOf(totalColumns[0]);
      var rows = [];
      var cells = [];
      cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
        key: "total",
        className: "right-align",
        colSpan: startTotalIndex
      }, totalText));

      var item = this._mapData(total);

      for (var i = 0; i < totalColumns.length; i++) {
        var column = totalColumns[i];
        var columnIndex = columns.indexOf(column);

        var className = this._getTotalCellClassName(column, item[column]);

        cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
          key: "Sum".concat(column),
          className: "".concat(columnAlignments[columnIndex], " ").concat(className),
          dangerouslySetInnerHTML: {
            __html: item[column]
          }
        }));
      }

      var blankRows = columns.length - totalColumns.length - startTotalIndex;

      if (blankRows) {
        cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
          key: "blank",
          colSpan: blankRows
        }));
      }

      rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
        className: "fixed-table-grant-total",
        key: "totalRow"
      }, cells));
      return rows;
    }
  }, {
    key: "_renderNodata",
    value: function _renderNodata() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "result-content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "no-info-row center-align"
      }, this._getResource('NoInfo')));
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.data) {
        return null;
      }

      var data = this.props.data;

      if (!data.length) {
        return this._renderNodata();
      }

      var _this$props4 = this.props,
          isPaging = _this$props4.isPaging,
          pageOption = _this$props4.pageOption,
          adjustedHeight = _this$props4.adjustedHeight;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "betlist-container result-content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Table"], {
        onSort: this.onSort,
        minWidth: 980,
        autoWidth: true,
        bodyHeight: 300,
        header: this._buildHeader(),
        body: this._buildBody(),
        footer: this._buildFooter(),
        isPaging: isPaging,
        pageOption: pageOption,
        onPaging: this.onPaging,
        adjustedHeight: adjustedHeight
      }));
    }
  }]);

  return BetListDataGrid;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

BetListDataGrid.propTypes = {
  isPaging: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  pageOption: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    PageIndex: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    PageSize: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    TotalItem: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    PageList: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number)
  }),
  columns: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string),
  columnWidths: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number),
  mappingDataFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  sortableColumns: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string),
  totalColumns: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string),
  getHeaderNameFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  columnAlignments: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string),
  data: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object),
  total: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,
  getTotalCellClassNameFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  totalText: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  onSort: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  onPaging: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  afterLoad: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  adjustedHeight: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
  getResourceFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
};
BetListDataGrid.defaultProps = {
  isPaging: false,
  pageOption: {
    PageIndex: 1,
    PageSize: 50,
    TotalItem: 0,
    PageList: [50, 100, 200, 300, 400, 500, 1000, 2000]
  },
  columns: ['Index', 'ExternalId', 'SystemId', 'RefNo', 'TransTime', 'Choice', 'Odds', 'OddsType', 'Stake', 'WinLoss', 'LicenseeWL', 'Status', 'Platform', 'Live'],
  columnWidths: [40, 120, 120, 110, 150, 400, 70, 70, 100, 100, 100, 80, 80, 80],
  sortableColumns: ['Stake', 'WinLoss', 'LicenseeWL'],
  totalColumns: ['Stake', 'WinLoss', 'LicenseeWL'],
  columnAlignments: ['center-align', '', '', 'center-align', 'center-align', 'right-align', 'right-align', 'right-align', 'right-align', 'right-align', 'right-align', 'center-align', 'center-align', 'center-align'],
  data: null,
  total: null,
  totalText: 'Total',
  adjustedHeight: 0
};
/* harmony default export */ __webpack_exports__["default"] = (BetListDataGrid);

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

/***/ "./www/js/source/reactpages/components/popup/Popup.jsx":
/*!*************************************************************!*\
  !*** ./www/js/source/reactpages/components/popup/Popup.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/components/popup/constants.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);




var Popup = function Popup(props) {
  var title = props.title,
      isShow = props.isShow,
      width = props.width,
      height = props.height,
      isHtml = props.isHtml,
      children = props.children,
      iframeUrl = props.iframeUrl;
  var content;

  if (iframeUrl) {
    content = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
      frameBorder: "0",
      src: iframeUrl,
      width: "100%",
      height: "100%"
    });
  } else {
    content = isHtml ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "popup-content",
      dangerouslySetInnerHTML: {
        __html: children
      }
    }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "popup-content"
    }, children);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "popup-container ".concat(isShow ? 'show' : 'hide')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "popup-block-body"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flat-popup",
    style: {
      height: height,
      width: width
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "popup-title"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "txt-title"
  }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "popup-close",
    onClick: function onClick() {
      props.onClose && props.onClose();
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-close"
  }))), content));
};

Popup.propTypes = {
  width: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string]),
  height: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string]),
  title: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  isShow: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  isHtml: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  iframeUrl: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
Popup.defaultProps = {
  width: _constants__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_WIDTH"],
  height: _constants__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_HEIGHT"],
  isShow: false,
  isHtml: false,
  iframeUrl: null
};
/* harmony default export */ __webpack_exports__["default"] = (Popup);

/***/ }),

/***/ "./www/js/source/reactpages/components/popup/constants.js":
/*!****************************************************************!*\
  !*** ./www/js/source/reactpages/components/popup/constants.js ***!
  \****************************************************************/
/*! exports provided: DEFAULT_WIDTH, DEFAULT_HEIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_WIDTH", function() { return DEFAULT_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HEIGHT", function() { return DEFAULT_HEIGHT; });
var DEFAULT_WIDTH = '55%';
var DEFAULT_HEIGHT = '55%';

/***/ }),

/***/ "./www/js/source/reactpages/components/popup/index.jsx":
/*!*************************************************************!*\
  !*** ./www/js/source/reactpages/components/popup/index.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./www/js/source/reactpages/components/popup/Popup.jsx");

/* harmony default export */ __webpack_exports__["default"] = (_Popup__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

/***/ "./www/js/source/reactpages/layouts/betlist/BetListLayout.jsx":
/*!********************************************************************!*\
  !*** ./www/js/source/reactpages/layouts/betlist/BetListLayout.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/DataService */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _lib_BetList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/BetList */ "./www/js/source/reactpages/layouts/betlist/lib/BetList.js");
/* harmony import */ var _jsroot_components_popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/popup */ "./www/js/source/reactpages/components/popup/index.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/constants */ "./www/js/source/reactpages/layouts/betlist/lib/constants.js");
var _BetListLayout$propTy;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var BetListLayout =
/*#__PURE__*/
function (_Component) {
  _inherits(BetListLayout, _Component);

  function BetListLayout(props) {
    var _this;

    _classCallCheck(this, BetListLayout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BetListLayout).call(this, props));
    _this.state = {
      isShowPopup: false,
      popupUrl: null,
      popupTitle: null
    };
    return _this;
  }

  _createClass(BetListLayout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.onload = function () {
        window.logOpenBetlistEvent && window.logOpenBetlistEvent(_this2.props.pageName);
      };

      window.ViewResult = function (matchid, raceNo, bettype, sporttype, refno, username, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid, transdecs) {
        var title = _this2._getResource('Result');

        var rootUrl = _this2.props.rootUrl;

        if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].RNG_GAME || sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].RNG_MINIGAME || sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].RNG_MOBILE) {
          var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getRngCasinoResultUrl(rootUrl);

          _this2._showRngCasinoResult(refno, url, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].VOIDBRIDGE) {
          var _url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getVoidbridgeResultUrl(rootUrl, custid, extension2);

          _this2._showThirdPartyResult(_url, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].PP) {
          var _url2 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getPPResultUrl(rootUrl, custid, extension2);

          _this2._showThirdPartyResult(_url2, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].CARDCLUB) {
          var _url3 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getCardClubResultUrl(rootUrl, custid, bettype, extension2);

          _this2._showThirdPartyResult(_url3, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].SG) {
          var _url4 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSGResultUrl(rootUrl, custid, extension2);

          _this2._showThirdPartyResult(_url4, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].ALLBET) {
          var _url5 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getAllBetResultUrl(rootUrl, transdecs, extension2, bettype);

          _this2._openPopup(_url5, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].GLOBALGAMING) {
          var _url6 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getGlobalGamingResultUrl(rootUrl, custid, extension2);

          _this2._showThirdPartyResult(_url6, title);
        } else {
          var _url7 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getResultUrl(rootUrl, matchid, raceNo, bettype, sporttype, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid);

          _this2._openPopup(_url7, title);
        }
      };

      window.showMP = function (transId) {
        var divEvent = document.querySelector('#divEvent_' + transId);
        divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket

        _this2._showMixParlayDetail(transId, divEvent);
      };

      window.showCombMP = function (transId, index) {
        var divEvent = document.querySelector('#divEvent_' + transId + '' + index);
        divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket

        _this2._showMixParlayDetail(transId, divEvent);
      }; // expand choice content


      window.showNewCombMP = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this2._showNewParlayDetail.apply(_this2, [_this2.props.rootUrl].concat(args));
      }; // expand choice content


      window.showSingleMatchParlayDetail = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        _this2._showSingleMatchParlayDetail.apply(_this2, [_this2.props.rootUrl].concat(args));
      }; // show detail popup (in choice column)


      window.showCombMPDetail = function (transId, refNo, betId, custId, betTeam) {
        var _this2$props = _this2.props,
            rootUrl = _this2$props.rootUrl,
            baseCurrency = _this2$props.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getParlayDetailUrl(rootUrl, transId, refNo, betId, custId, betTeam, baseCurrency);

        _this2._openPopup(url, betTeam);
      };

      window.ViewCashOutHistory = function (transId, refNo, betType, betdaqId) {
        var _this2$props2 = _this2.props,
            rootUrl = _this2$props2.rootUrl,
            baseCurrency = _this2$props2.baseCurrency;

        var _BetList$getCashOutHi = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getCashOutHistoryPopupSetting(rootUrl, baseCurrency, transId, refNo, betType, betdaqId),
            url = _BetList$getCashOutHi.url,
            isCashOut = _BetList$getCashOutHi.isCashOut;

        var title = _this2._getResource(isCashOut ? 'CashOutDetails' : 'BoughtDetails');

        _this2._openPopup(url, title);
      };

      window.ShowBonusDetails = function (refCode, transId) {
        var _this2$props3 = _this2.props,
            rootUrl = _this2$props3.rootUrl,
            baseCurrency = _this2$props3.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getBonusDetailUrl(rootUrl, refCode, transId, baseCurrency);

        var title = _this2._getResource('TransactionDetail');

        _this2._openPopup(url, title);
      };

      window.showAGCasinoDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props4 = _this2.props,
            rootUrl = _this2$props4.rootUrl,
            baseCurrency = _this2$props4.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getAGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('AGCasino') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showRnGCasinoDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props5 = _this2.props,
            rootUrl = _this2$props5.rootUrl,
            baseCurrency = _this2$props5.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getRnGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductCS') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showVoidBridgeDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props6 = _this2.props,
            rootUrl = _this2$props6.rootUrl,
            baseCurrency = _this2$props6.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getVoidBridgeDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductVB') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showTodayRunningBetsDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props7 = _this2.props,
            rootUrl = _this2$props7.rootUrl,
            baseCurrency = _this2$props7.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getAllBetDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductAB') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showColossusBetsDetails = function (refNo, winlostDate, transId, custId, betCheck) {
        var _this2$props8 = _this2.props,
            rootUrl = _this2$props8.rootUrl,
            baseCurrency = _this2$props8.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getColossusBetsDetailUrl(rootUrl, baseCurrency, refNo, winlostDate, transId, custId, betCheck);

        var title = _this2._getResource('TicketDetailOf').replace('{0}', refNo);

        _this2._openPopup(url, title);
      };

      window.showGlobalGaming = function (transId, winlostDate, custId, transType) {
        var _this2$props9 = _this2.props,
            rootUrl = _this2$props9.rootUrl,
            baseCurrency = _this2$props9.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getGlobalGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductFW') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showPPDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props10 = _this2.props,
            rootUrl = _this2$props10.rootUrl,
            baseCurrency = _this2$props10.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getPPDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductPP') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showVideoPokerGameDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props11 = _this2.props,
            rootUrl = _this2$props11.rootUrl,
            baseCurrency = _this2$props11.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getVideoPokerGameDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductCC') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showSGDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props12 = _this2.props,
            rootUrl = _this2$props12.rootUrl,
            baseCurrency = _this2$props12.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSGDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductSG') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.showMP = undefined;
      window.showCombMP = undefined;
      window.ViewResult = undefined;
      window.showNewCombMP = undefined;
      window.showCombMPDetail = undefined;
      window.ViewCashOutHistory = undefined;
      window.ShowBonusDetails = undefined;
      window.showAGCasinoDetails = undefined;
      window.showRnGCasinoDetails = undefined;
      window.showVoidBridgeDetails = undefined;
      window.showTodayRunningBetsDetails = undefined;
      window.showColossusBetsDetails = undefined;
      window.showGlobalGaming = undefined;
      window.showPPDetails = undefined;
      window.showSingleMatchParlayDetail = undefined;
      window.showSGDetails = undefined;
    }
  }, {
    key: "_getResource",
    value: function _getResource(key) {
      return this.props.getResourceFunc ? this.props.getResourceFunc(key) : key;
    }
  }, {
    key: "_formatDateString",
    value: function _formatDateString(dateString) {
      return this.props.formatDateStringFunc ? this.props.formatDateStringFunc(dateString) : dateString;
    }
  }, {
    key: "_beforeShow",
    value: function _beforeShow() {
      this.props.beforeShowFunc && this.props.beforeShowFunc();
    }
  }, {
    key: "_afterShow",
    value: function _afterShow() {
      this.props.afterShowFunc && this.props.afterShowFunc();
    }
  }, {
    key: "_resolveClientUrl",
    value: function _resolveClientUrl(relativeUrl) {
      return this.props.rootUrl + relativeUrl;
    }
  }, {
    key: "_showMixParlayDetail",
    value: function _showMixParlayDetail(transId, divEvent) {
      var _this3 = this;

      if (divEvent.style.display === 'none') {
        var url = this._resolveClientUrl('api/MixParlayBetList/Detail?transId=' + transId);

        this._beforeShow(); // this.props.toggleLoader(true);


        _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(function (result) {
          var choice = '';
          var length = result.data.length;

          for (var i = 0; i < length; i++) {
            choice += result.data[i];

            if (i < length - 1) {
              choice += '<div class="line"></div>';
            }
          }

          divEvent.innerHTML = choice;
          divEvent.style.display = 'block';

          _this3._afterShow();
        })["catch"](function (error) {
          _this3._afterShow();

          console.log(error);
        });
      } else {
        divEvent.style.display = 'none';
        divEvent.innerHTML = '';
      }
    }
  }, {
    key: "_showNewParlayDetail",
    value: function _showNewParlayDetail(rootUrl, transId, transIndex, refNo, handicap1, handicap2, betcheck, betteam, custId) {
      var _this4 = this;

      var divEvent = document.querySelector('#divEvent_' + transId + '' + transIndex);
      var nameDiv = document.querySelector('#combinationOfferName_' + transId + transIndex);
      divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket

      if (divEvent.style.display == 'none') {
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getChoiceParlayDetailUrl(rootUrl, transId, refNo, handicap1, handicap2, betcheck, betteam, custId);

        this._beforeShow(); //this.props.toggleLoader(true);


        _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(function (result) {
          var choice = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].buildChoiceParlayDetail(result.data);
          divEvent.innerHTML = choice;
          divEvent.style.display = 'block';
          nameDiv.style.display = 'none';

          _this4._afterShow();
        })["catch"](function (error) {
          _this4._afterShow();

          console.log(error);
        });
      } else {
        divEvent.style.display = 'none';
        divEvent.innerHTML = '';
        nameDiv.style.display = 'block';
      }
    }
  }, {
    key: "_showThirdPartyResult",
    value: function _showThirdPartyResult(url, title) {
      var _this5 = this;

      this._beforeShow(); //this.props.toggleLoader(true);


      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(function (result) {
        if (result.data !== '') {
          _this5._openPopup(result.data, title);
        }

        _this5._afterShow();
      })["catch"](function (error) {
        _this5._afterShow();

        console.log(error);
      });
    }
  }, {
    key: "_showRngCasinoResult",
    value: function _showRngCasinoResult(refno, url, title) {
      var _this6 = this;

      this._beforeShow();

      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].postData(url, {
        refno: refno
      }).then(function (result) {
        if (result.data.Success) {
          if (result.data.Result === '') {
            return;
          }

          _this6._openPopup(result.data.Result, title);
        } else {
          alert(_this6._getResource("ErrorProcessingMsg"));
        }

        _this6._afterShow();
      })["catch"](function (error) {
        _this6._afterShow();

        console.log(error);
      });
    }
  }, {
    key: "_showSingleMatchParlayDetail",
    value: function _showSingleMatchParlayDetail(rootUrl, transId, custId, status, transIndex) {
      var _this7 = this;

      var divEvent = document.querySelector('#divEvent_' + transId + '' + transIndex);

      if (divEvent.style.display == 'none') {
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleMatchParlayDetailUrl(rootUrl, transId, custId, status);

        this._beforeShow();

        _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(function (result) {
          var selection = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].buildSingleMatchParlayDetail(result.data);
          divEvent.innerHTML = selection;
          divEvent.style.display = 'block';

          _this7._afterShow();
        })["catch"](function (error) {
          console.log(error);
        });
      } else {
        divEvent.style.display = 'none';
        divEvent.innerHTML = '';
      }
    }
  }, {
    key: "_openPopup",
    value: function _openPopup(url, title) {
      this.setState({
        isShowPopup: true,
        popupUrl: url,
        popupTitle: title
      });
    }
  }, {
    key: "_closePopup",
    value: function _closePopup() {
      this.setState({
        isShowPopup: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "betlist-layout"
      }, this.props.children, this.state.isShowPopup && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_popup__WEBPACK_IMPORTED_MODULE_3__["default"], {
        isShow: true,
        iframeUrl: this.state.popupUrl,
        title: this.state.popupTitle,
        width: 900,
        height: 600,
        onClose: function onClose() {
          return _this8._closePopup();
        }
      }));
    }
  }]);

  return BetListLayout;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

BetListLayout.propTypes = (_BetListLayout$propTy = {
  pageName: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  rootUrl: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  getResourceFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  baseCurrency: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  beforeShowFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  afterShowFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
}, _defineProperty(_BetListLayout$propTy, "beforeShowFunc", prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func), _defineProperty(_BetListLayout$propTy, "afterShowFunc", prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func), _defineProperty(_BetListLayout$propTy, "formatDateStringFunc", prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func), _BetListLayout$propTy);
BetListLayout.defaultProps = {
  rootUrl: '/',
  baseCurrency: ''
};
/* harmony default export */ __webpack_exports__["default"] = (BetListLayout);

/***/ }),

/***/ "./www/js/source/reactpages/layouts/betlist/lib/BetList.js":
/*!*****************************************************************!*\
  !*** ./www/js/source/reactpages/layouts/betlist/lib/BetList.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/QueryString */ "./www/js/source/reactpages/lib/QueryString.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/layouts/betlist/lib/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var BetList =
/*#__PURE__*/
function () {
  function BetList() {
    _classCallCheck(this, BetList);
  }

  _createClass(BetList, [{
    key: "_isFastMarket",
    value: function _isFastMarket(bettype) {
      return bettype >= _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MIN_FASTMARKET && bettype <= _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MAX_FASTMARKET;
    }
  }, {
    key: "_getMixParlayResultUrl",
    value: function _getMixParlayResultUrl(rootUrl, refno, winlostdate, bettype) {
      var url = rootUrl + 'ResultReport/ResultPopup';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refno', refno);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'winlossdate', winlostdate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'bettype', bettype);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'matchid', 1);
      return url;
    }
  }, {
    key: "_getSportBookResultUrl",
    value: function _getSportBookResultUrl(rootUrl, matchid, bettype, raceNo, sporttype, league, isOutright, extension1, extension2) {
      var url = rootUrl + 'ResultReport/ResultPopup';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'matchid', matchid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'bettype', bettype);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'raceno', raceNo);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'sporttype', sporttype);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'isoutright', isOutright);

      if (this._isFastMarket(bettype)) {
        url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'handicap1', extension1);
        url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'handicap2', extension2);
      } else {
        url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betid', extension1);
      }

      return url;
    }
  }, {
    key: "getResultUrl",
    value: function getResultUrl(rootUrl, matchid, raceNo, bettype, sporttype, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid) {
      bettype = Number(bettype);
      var isParlay = bettype === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MIXPARLAY || bettype === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].SYSTEMPARLAY || bettype === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MIXPARLAY_BETRADAR;
      var url = isParlay ? this._getMixParlayResultUrl(rootUrl, refnoMixParlay, winlostdate, bettype) : this._getSportBookResultUrl(rootUrl, matchid, bettype, raceNo, sporttype, league, isOutright, extension1, extension2, custid);
      return url;
    }
  }, {
    key: "getChoiceParlayDetailUrl",
    value: function getChoiceParlayDetailUrl(rootUrl, transId, refNo, handicap1, handicap2, betcheck, betteam, custId) {
      var url = rootUrl + 'api/MixParlayBetList/NewParlayDetail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refNo', refNo);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'handicap1', handicap1);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'handicap2', handicap2);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betcheck', betcheck);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betteam', betteam);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      return url;
    }
  }, {
    key: "buildChoiceParlayDetail",
    value: function buildChoiceParlayDetail(response) {
      var choice = '';
      var length = response.Data === null ? 0 : response.Data.length;

      if (length > 0) {
        for (var i = 0; i < response.Texts.length; i++) {
          choice += response.Texts[i];
        }

        choice += '<div class="line"></div>';

        for (var _i = 0; _i < response.Data.length; _i++) {
          var item = response.Data[_i];
          choice += item;

          if (_i < length - 1) {
            choice += '<div class="line"></div>';
          }
        }
      }

      return choice;
    }
  }, {
    key: "buildSingleMatchParlayDetail",
    value: function buildSingleMatchParlayDetail(data) {
      var selection = '';
      var length = data === null ? 0 : data.length;

      if (length > 0) {
        selection = '<div class="single-match-parlay-detail">';

        for (var i = 0; i < data.length; i++) {
          selection += data[i];
        }

        selection += '</div>';
      }

      return selection;
    }
  }, {
    key: "getParlayDetailUrl",
    value: function getParlayDetailUrl(rootUrl, transId, refNo, betId, custId, betTeam, baseCurrency) {
      if (Number(transId) === 0) {
        return;
      }

      var url = rootUrl + 'SystemParlayBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refno', refNo);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betteam', betTeam);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'basecurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getSingleMatchParlayDetailUrl",
    value: function getSingleMatchParlayDetailUrl(rootUrl, transId, custId, status) {
      if (Number(transId) === 0) {
        return;
      }

      var url = rootUrl + 'api/SingleMatchParlayBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, "status", status);
      return url;
    }
  }, {
    key: "getCashOutHistoryPopupSetting",
    value: function getCashOutHistoryPopupSetting(rootUrl, baseCurrency, transId, refNo, betType, betdaqId) {
      var isCashOut = betdaqId < 1 || betType === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].CASHOUT;
      var url = rootUrl + 'CashOutBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refNo', refNo);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betType', betType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betdaqId', betdaqId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'isCashout', isCashOut);
      return {
        url: url,
        isCashOut: isCashOut
      };
    }
  }, {
    key: "getBonusDetailUrl",
    value: function getBonusDetailUrl(rootUrl, refCode, transId, baseCurrency) {
      var url = rootUrl + 'BonusBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'RefCode', refCode);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'TransId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getAGCasinoDetailUrl",
    value: function getAGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'AGCasinoBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transid', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getRnGCasinoDetailUrl",
    value: function getRnGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'RnGCasinoBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getVoidBridgeDetailUrl",
    value: function getVoidBridgeDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'VoidbridgeBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getAllBetDetailUrl",
    value: function getAllBetDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'AllBetBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transid', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getColossusBetsDetailUrl",
    value: function getColossusBetsDetailUrl(rootUrl, baseCurrency, refNo, winlostDate, transId, custId, betCheck) {
      var url = rootUrl + 'ColossusBetBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refNo', refNo);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transid', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betCheck', betCheck);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getGlobalGamingDetailUrl",
    value: function getGlobalGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'GlobalGamingBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getPPDetailUrl",
    value: function getPPDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'PragmaticPlayBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getVideoPokerGameDetailUrl",
    value: function getVideoPokerGameDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'CardClubBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getSGDetailUrl",
    value: function getSGDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'SGBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getRngCasinoResultUrl",
    value: function getRngCasinoResultUrl(rootUrl) {
      return rootUrl + 'ResultReport/ShowRngCasinoSingleWalletResult';
    }
  }, {
    key: "getVoidbridgeResultUrl",
    value: function getVoidbridgeResultUrl(rootUrl, custid, gamePlayID) {
      var url = rootUrl + 'ResultReport/VoidbridgeResult';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gamePlayID', gamePlayID);
      return url;
    }
  }, {
    key: "getPPResultUrl",
    value: function getPPResultUrl(rootUrl, custid, gamePlayId) {
      var url = rootUrl + 'PPResultPopup/Index';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gamePlayId', gamePlayId);
      return url;
    }
  }, {
    key: "getCardClubResultUrl",
    value: function getCardClubResultUrl(rootUrl, custid, gameTypeId, transId3rd) {
      var url = rootUrl + 'CardClubResultPopup/Index';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gameTypeId', gameTypeId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId3rd', transId3rd);
      return url;
    }
  }, {
    key: "getSGResultUrl",
    value: function getSGResultUrl(rootUrl, custid, gamePlayId) {
      var url = rootUrl + 'SGResultPopup/Index';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gamePlayId', gamePlayId);
      return url;
    }
  }, {
    key: "getAllBetResultUrl",
    value: function getAllBetResultUrl(rootUrl, transdesc, betcheck, bettype) {
      var url = rootUrl + 'ResultReport/AllBetResult';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betcheck', betcheck);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'bettype', bettype);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transdesc', encodeURIComponent(transdesc));
      return url;
    }
  }, {
    key: "getGlobalGamingResultUrl",
    value: function getGlobalGamingResultUrl(rootUrl, custid, gameId) {
      var url = rootUrl + 'ResultReport/GlobalGamingResult';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gameId', gameId);
      return url;
    }
  }]);

  return BetList;
}();

/* harmony default export */ __webpack_exports__["default"] = (new BetList());

/***/ }),

/***/ "./www/js/source/reactpages/layouts/betlist/lib/constants.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/layouts/betlist/lib/constants.js ***!
  \*******************************************************************/
/*! exports provided: BetType, SportType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BetType", function() { return BetType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SportType", function() { return SportType; });
var BetType = {
  CASHOUT: 911,
  MIXPARLAY: 9,
  SYSTEMPARLAY: 29,
  MIXPARLAY_BETRADAR: 2799,
  MIN_FASTMARKET: 221,
  MAX_FASTMARKET: 227
};
var SportType = {
  RNG_GAME: 208,
  RNG_MINIGAME: 209,
  RNG_MOBILE: 210,
  ALLBET: 211,
  VOIDBRIDGE: 212,
  PP: 248,
  GLOBALGAMING: 219,
  CARDCLUB: 165,
  SG: 247
};

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

/***/ "./www/js/source/reactpages/lib/QueryString.js":
/*!*****************************************************!*\
  !*** ./www/js/source/reactpages/lib/QueryString.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QueryString; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QueryString =
/*#__PURE__*/
function () {
  function QueryString() {
    _classCallCheck(this, QueryString);
  }

  _createClass(QueryString, null, [{
    key: "_parseQueryString",
    value: function _parseQueryString(queryString) {
      var args = queryString.split('&');
      var argsList = {};

      for (var i = 0; i < args.length; i++) {
        var arg = unescape(args[i]);

        if (arg.length > 0) {
          if (arg.indexOf('=') === -1) {
            argsList[arg.toLowerCase().trim()] = null;
          } else {
            var keyValuePair = arg.split('=');
            argsList[keyValuePair[0].toLowerCase().trim()] = keyValuePair[1].trim();
          }
        }
      }

      return argsList;
    }
  }, {
    key: "_getQueryString",
    value: function _getQueryString(url) {
      var index = url.indexOf("?");
      return index < 0 ? "" : url.substring(index + 1, url.length);
    }
  }, {
    key: "_getRawUrl",
    value: function _getRawUrl(url) {
      var index = url.indexOf("?");
      return index < 0 ? url : url.substring(0, index);
    }
  }, {
    key: "setParam",
    value: function setParam(url, name, value) {
      var rawUrl = QueryString._getRawUrl(url);

      var queryString = QueryString._getQueryString(url);

      var args = QueryString._parseQueryString(queryString);

      if (!name) {
        return url;
      } // Update value


      var found = false;

      for (var key in args) {
        if (key && key.toLowerCase() === name.toLowerCase()) {
          // Does not update data if value = undefined
          if (value !== undefined) {
            args[key] = value;
          }

          found = true;
        }
      }

      if (!found) {
        args[name.toLowerCase()] = value;
      }

      var queryArray = []; // Rebuild query string, ignore null value

      for (var key1 in args) {
        if (args[key1] != null && args[key1] !== undefined) {
          queryArray.push(key1.toLowerCase() + "=" + args[key1]);
        }
      }

      return rawUrl + "?" + queryArray.join("&");
    }
  }, {
    key: "setParams",
    value: function setParams(url, parameters) {
      for (var property in parameters) {
        if (parameters.hasOwnProperty(property)) {
          url = QueryString.setParam(url, property, parameters[property]);
        }
      }

      return url;
    }
  }, {
    key: "getParam",
    value: function getParam(url, name) {
      var queryString = QueryString._getQueryString(url);

      var args = QueryString._parseQueryString(queryString);

      for (var key in args) {
        if (key != null && key.toLowerCase() === name.toLowerCase()) {
          return args[key];
        }
      }

      return null;
    }
  }]);

  return QueryString;
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

/***/ "./www/js/source/reactpages/lib/validationHelper.js":
/*!**********************************************************!*\
  !*** ./www/js/source/reactpages/lib/validationHelper.js ***!
  \**********************************************************/
/*! exports provided: validateBaseCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateBaseCurrency", function() { return validateBaseCurrency; });
/* harmony import */ var _AppData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppData */ "./www/js/source/reactpages/lib/AppData.js");

var validateBaseCurrency = function validateBaseCurrency() {
  var baseCurrency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var allowEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return allowEmpty && !baseCurrency || !!baseCurrency && _AppData__WEBPACK_IMPORTED_MODULE_0__["default"].baseCurrencyList.find(function (x) {
    return x.value === baseCurrency;
  });
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/BaseDataGrid.jsx":
/*!************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/components/BaseDataGrid.jsx ***!
  \************************************************************************************************/
/*! exports provided: BaseDataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseDataGrid", function() { return BaseDataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _action_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action.js */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/action.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_betlist_BetListDataGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/betlist/BetListDataGrid */ "./www/js/source/reactpages/components/betlist/BetListDataGrid.jsx");
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");









var BaseDataGrid = function BaseDataGrid(props) {
  var gridData = props.gridData,
      requestParam = props.requestParam,
      reportTitle = props.reportTitle,
      toggleLoader = props.toggleLoader,
      getGridData = props.getGridData,
      setRequestParam = props.setRequestParam,
      dataUrl = props.dataUrl,
      isPaging = props.isPaging,
      columns = props.columns,
      columnWidths = props.columnWidths,
      columnAlignments = props.columnAlignments,
      totalText = props.totalText,
      totalColumns = props.totalColumns,
      sortableColumns = props.sortableColumns;
  var pageOption = {
    PageIndex: requestParam.PageIndex,
    PageSize: requestParam.PageSize,
    TotalItem: gridData && gridData.TotalRows ? gridData.TotalRows : _lib_constants__WEBPACK_IMPORTED_MODULE_7__["DefaultPageSize"],
    PageList: [_lib_constants__WEBPACK_IMPORTED_MODULE_7__["DefaultPageSize"], 100, 200, 300, 400, 500, 1000, 2000]
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    toggleLoader(false);
  }, [gridData]);

  var getHeaderName = function getHeaderName(column) {
    if (column === 'LicenseeWL') {
      return "".concat(_lib_constants__WEBPACK_IMPORTED_MODULE_7__["HeaderText"].LicenseeWL, "/").concat(_lib_constants__WEBPACK_IMPORTED_MODULE_7__["HeaderText"].Comm);
    }

    if (column === 'WinLoss' && _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_8__["default"].isAllowedCustomerComm) {
      return "".concat(_lib_constants__WEBPACK_IMPORTED_MODULE_7__["HeaderText"].WinLoss, "/").concat(_lib_constants__WEBPACK_IMPORTED_MODULE_7__["HeaderText"].Comm);
    }

    return _lib_constants__WEBPACK_IMPORTED_MODULE_7__["HeaderText"][column];
  };

  var onPaging = function onPaging(index, size) {
    var param = Object.assign({}, requestParam, {
      PageIndex: index,
      PageSize: size
    });
    getData(param);
  };

  var afterLoad = function afterLoad() {
    toggleLoader(false);
  };

  var getData = function getData(param) {
    toggleLoader(true);
    getGridData(dataUrl, param);
    setRequestParam(param);
  };

  var onSort = function onSort(sortBy, sortOrder) {
    var param = Object.assign({}, requestParam, {
      SortBy: sortBy === 'WinLoss' ? 'WinLost' : sortBy,
      SortOrder: sortOrder
    });
    getData(param);
  };

  var getResource = function getResource(key) {
    return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(key);
  };

  if (!gridData || !gridData.Data) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "betlist-container result-content"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_5__["default"], {
    content: reportTitle
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_betlist_BetListDataGrid__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isPaging: isPaging,
    pageOption: pageOption,
    onPaging: onPaging,
    getHeaderNameFunc: getHeaderName,
    columns: columns,
    columnWidths: columnWidths,
    sortableColumns: sortableColumns,
    totalColumns: totalColumns,
    columnAlignments: columnAlignments,
    data: gridData.Data,
    total: gridData.Total,
    totalText: totalText,
    afterLoad: afterLoad,
    onSort: onSort,
    getResourceFunc: getResource,
    adjustedHeight: -20
  }));
};

function mapDispatchToProps(dispatch) {
  var toggleLoader = _action_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].toggleLoader,
      getGridData = _action_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].getGridData,
      setRequestParam = _action_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setRequestParam;
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    toggleLoader: toggleLoader,
    getGridData: getGridData,
    setRequestParam: setRequestParam
  }, dispatch);
}

function mapStateToProps(state) {
  var gridData = state.gridData,
      requestParam = state.requestParam,
      reportTitle = state.reportTitle;
  return Object.assign({}, {
    gridData: gridData,
    requestParam: requestParam,
    reportTitle: reportTitle
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(BaseDataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/PageLayout.jsx":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/components/PageLayout.jsx ***!
  \**********************************************************************************************/
/*! exports provided: PageLayout, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageLayout", function() { return PageLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _action_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action.js */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/action.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _jsroot_layouts_betlist_BetListLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/layouts/betlist/BetListLayout */ "./www/js/source/reactpages/layouts/betlist/BetListLayout.jsx");
/* harmony import */ var _9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @9softstudio/react-simple-tab */ "./node_modules/@9softstudio/react-simple-tab/dist/index.js");
/* harmony import */ var _9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");











var PageLayout = function PageLayout(props) {
  var toggleLoader = props.toggleLoader,
      isConvertAll = props.isConvertAll,
      selectedBaseCurrency = props.selectedBaseCurrency,
      selectedTabIndex = props.selectedTabIndex,
      children = props.children,
      hasExchange = props.hasExchange;

  var getResource = function getResource(key) {
    return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource(key);
  };

  var formatDateString = function formatDateString(dateString) {
    var date = new Date(dateString);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return "".concat(month < 10 ? '0' + month : month, "/").concat(day < 10 ? '0' + day : day, "/").concat(date.getFullYear());
  };

  var beforeShow = function beforeShow() {
    toggleLoader(true);
  };

  var afterShow = function afterShow() {
    toggleLoader(false);
  };

  var activedTabList = _lib_constants__WEBPACK_IMPORTED_MODULE_9__["tabList"].filter(function (x) {
    return _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_10__["default"].tabList.includes(x.key);
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_betlist_BetListLayout__WEBPACK_IMPORTED_MODULE_5__["default"], {
    pageName: "BTC",
    rootUrl: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_8__["default"].getRootUrl(),
    getResourceFunc: getResource,
    formatDateStringFunc: formatDateString,
    baseCurrency: isConvertAll ? selectedBaseCurrency : '',
    beforeShowFunc: beforeShow,
    afterShowFunc: afterShow
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_6__["Tabs"], null, activedTabList.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_6__["Tab"], {
      isActive: selectedTabIndex == item.displayOrder,
      label: item.label,
      url: item.url
    });
  }), hasExchange && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_6__["Tab"], {
    isActive: selectedTabIndex == 4,
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("Exchange"),
    url: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_8__["default"].resolveClientUrl("ExchangeVoided")
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, children)));
};

function mapDispatchToProps(dispatch) {
  var toggleLoader = _action_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].toggleLoader;
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    toggleLoader: toggleLoader
  }, dispatch);
}

function mapStateToProps(state) {
  var isConvertAll = state.isConvertAll,
      selectedBaseCurrency = state.selectedBaseCurrency,
      hasExchange = state.hasExchange;
  return Object.assign({}, {
    isConvertAll: isConvertAll,
    selectedBaseCurrency: selectedBaseCurrency,
    hasExchange: hasExchange
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(PageLayout));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/action.js":
/*!*****************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/components/action.js ***!
  \*****************************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/gridDataAction */ "./www/js/source/reactpages/actions/gridDataAction.js");
/* harmony import */ var _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/requestParamAction */ "./www/js/source/reactpages/actions/requestParamAction.js");



var ActionCreators = Object.assign({}, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_1__, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_2__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/reducer.js":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/components/reducer.js ***!
  \******************************************************************************************/
/*! exports provided: hasExchange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasExchange", function() { return hasExchange; });
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");

var hasExchange = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, {});

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js":
/*!***********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Service; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Service =
/*#__PURE__*/
function () {
  function Service() {
    _classCallCheck(this, Service);
  }

  _createClass(Service, null, [{
    key: "getTitle",
    value: function getTitle(fromDate, toDate, baseCurrency) {
      var dateRangeText = fromDate && toDate ? ", ".concat(_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateToString(fromDate), " \u2192 ").concat(_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateToString(toDate)) : '';
      var baseCurrencyText = baseCurrency ? ", ".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BaseCurrency"), ": ").concat(baseCurrency) : '';
      return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BettingTicketCenter") + dateRangeText + baseCurrencyText;
    }
  }]);

  return Service;
}();



/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js ***!
  \*************************************************************************************/
/*! exports provided: ApiUrl, HeaderText, DefaultPageSize, tabKeys, tabList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiUrl", function() { return ApiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderText", function() { return HeaderText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultPageSize", function() { return DefaultPageSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabKeys", function() { return tabKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabList", function() { return tabList; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");


var ApiUrl = {
  CUSTOMER_SEARCH_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl("SearchCustomerAPI/SearchCustomer"),
  RUNNING_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenter/GetByRunning'),
  REFNO_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenter/GetByRefNo'),
  SINGLECUSTOMER_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenter/GetBySingleCustomer'),
  ADVANCEDSEARCH_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenterAdvancedSearch/GetData')
};
var HeaderText = {
  Index: "#",
  Platform: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Platform"),
  ExternalId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("ExternalId"),
  SystemId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("SystemId"),
  RefNo: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("RefNo"),
  TransTime: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("TransTime"),
  Choice: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Choice"),
  Odds: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Odds"),
  OddsType: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("OddsType"),
  Stake: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Stake"),
  WinLoss: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("WinLoss"),
  LicenseeWL: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("LicenseeWL"),
  Comm: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Comm"),
  Status: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Status"),
  Live: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Live")
};
var DefaultPageSize = 50;
var tabKeys = {
  advancedSearch: 'BTC_MultiCustomer',
  singleCustomer: 'BTC_SingleCustomer',
  refNo: 'BTC_RefNo',
  running: 'BTC_Running'
};
var tabList = [{
  key: tabKeys.singleCustomer,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("SingleCustomer"),
  url: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl("BettingTicketCenter/SingleCustomer"),
  displayOrder: 0
}, {
  key: tabKeys.refNo,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("RefNo"),
  url: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl("BettingTicketCenter/RefNo"),
  displayOrder: 1
}, {
  key: tabKeys.running,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Running"),
  url: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl("BettingTicketCenter/Running"),
  displayOrder: 2
}, {
  key: tabKeys.advancedSearch,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("AdvancedSearch"),
  url: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl("BettingTicketCenter/AdvancedSearch"),
  displayOrder: 3
}];

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js":
/*!**************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js ***!
  \**************************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/gridDataAction */ "./www/js/source/reactpages/actions/gridDataAction.js");
/* harmony import */ var _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/usernameAction */ "./www/js/source/reactpages/actions/usernameAction.js");
/* harmony import */ var _jsroot_actions_productAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/productAction */ "./www/js/source/reactpages/actions/productAction.js");
/* harmony import */ var _jsroot_actions_currencyAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/actions/currencyAction */ "./www/js/source/reactpages/actions/currencyAction.js");
/* harmony import */ var _jsroot_actions_baseCurrencyAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/actions/baseCurrencyAction */ "./www/js/source/reactpages/actions/baseCurrencyAction.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/actions/requestParamAction */ "./www/js/source/reactpages/actions/requestParamAction.js");
/* harmony import */ var _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/actions/reportTitleAction */ "./www/js/source/reactpages/actions/reportTitleAction.js");
/* harmony import */ var _jsroot_actions_statusAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/actions/statusAction */ "./www/js/source/reactpages/actions/statusAction.js");
/* harmony import */ var _jsroot_actions_convertAllAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/actions/convertAllAction */ "./www/js/source/reactpages/actions/convertAllAction.js");
/* harmony import */ var _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/actions/userGuideAction */ "./www/js/source/reactpages/actions/userGuideAction.js");











var ActionCreators = Object.assign({}, _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_1__, _jsroot_actions_productAction__WEBPACK_IMPORTED_MODULE_2__, _jsroot_actions_currencyAction__WEBPACK_IMPORTED_MODULE_3__, _jsroot_actions_baseCurrencyAction__WEBPACK_IMPORTED_MODULE_4__, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_5__, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_6__, _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_7__, _jsroot_actions_statusAction__WEBPACK_IMPORTED_MODULE_8__, _jsroot_actions_convertAllAction__WEBPACK_IMPORTED_MODULE_9__, _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_10__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/AppContainer.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/AppContainer.jsx ***!
  \*************************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/DataGrid.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/FormFilter.jsx");
/* harmony import */ var _common_components_PageLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/components/PageLayout */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/PageLayout.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var AppContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(AppContainer, _Component);

  function AppContainer(props) {
    _classCallCheck(this, AppContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(AppContainer).call(this, props));
  }

  _createClass(AppContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_PageLayout__WEBPACK_IMPORTED_MODULE_4__["default"], {
        selectedTabIndex: "2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
        isLoading: this.props.isLoading
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], null));
    }
  }]);

  return AppContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return Object.assign({}, {
    isLoading: state.isLoading
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/DataGrid.jsx":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/DataGrid.jsx ***!
  \*********************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _common_components_BaseDataGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/components/BaseDataGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/BaseDataGrid.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");





var Columns = ['Index', 'ExternalId', 'SystemId', 'RefNo', 'TransTime', 'Choice', 'Odds', 'OddsType', 'Stake', 'Status', 'Platform', 'Live'];
var ColumnWidths = [40, 120, 120, 110, 150, 400, 70, 70, 100, 80, 80, 80];
var ColumnAlignments = ['center-align', '', '', 'center-align', 'center-align', 'right-align', 'right-align', 'right-align', 'right-align', 'center-align', 'center-align', 'center-align'];
var SortableColumns = ['Stake'];
var DataGrid = function DataGrid(props) {
  var BaseCurrencyName = props.requestParam.BaseCurrencyName;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_BaseDataGrid__WEBPACK_IMPORTED_MODULE_3__["default"], {
    dataUrl: _common_lib_constants__WEBPACK_IMPORTED_MODULE_2__["ApiUrl"].RUNNING_DATA_URL,
    isPaging: true,
    columns: Columns,
    columnWidths: ColumnWidths,
    columnAlignments: ColumnAlignments,
    totalText: "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Totalin'), " ").concat(BaseCurrencyName),
    totalColumns: SortableColumns,
    sortableColumns: SortableColumns
  });
};

function mapStateToProps(state) {
  var requestParam = state.requestParam;
  return Object.assign({}, {
    requestParam: requestParam
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/FormFilter.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/FormFilter.jsx ***!
  \***********************************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @9softstudio/react-multiselect */ "./node_modules/@9softstudio/react-multiselect/dist/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/auto-complete */ "./www/js/source/reactpages/components/auto-complete/index.jsx");
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _common_lib_Service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../common/lib/Service */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js");
/* harmony import */ var _jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @jsroot/components/UserGuide */ "./www/js/source/reactpages/components/UserGuide.jsx");
/* harmony import */ var _jsroot_lib_validationHelper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @jsroot/lib/validationHelper */ "./www/js/source/reactpages/lib/validationHelper.js");
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
function (_Component) {
  _inherits(FormFilter, _Component);

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

      _this.props.setReportTitle(_common_lib_Service__WEBPACK_IMPORTED_MODULE_14__["default"].getTitle(null, null, params.IsConvertAll ? params.BaseCurrencyName : ''));

      _this.props.setRequestParam(params);

      _this.props.toggleLoader(true);

      _this.props.getGridData(_common_lib_constants__WEBPACK_IMPORTED_MODULE_13__["ApiUrl"].RUNNING_DATA_URL, params);
    });

    _defineProperty(_assertThisInitialized(_this), "productChangeHandler", function (currentItem, selectedItemsKey) {
      _this.props.setSelectedProduct(selectedItemsKey);
    });

    _defineProperty(_assertThisInitialized(_this), "exportExcel", function (event) {
      event.preventDefault();

      var params = _this._getParams();

      if (!params) {
        return;
      }

      params.IsExport = true;

      _this.props.toggleLoader(true);

      _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_12__["default"].getFile(_common_lib_constants__WEBPACK_IMPORTED_MODULE_13__["ApiUrl"].RUNNING_DATA_URL, params).then(function (response) {
        var NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
          alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("NoInfo"));
        } else {
          _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_10__["default"].downloadFile(response.data, 'BettingTicketsCenter_Running.xls');
        }

        _this.props.toggleLoader(false);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "showUserGuide", function () {
      var userGuideContent = _this.props.userGuideContent;

      if (!userGuideContent || userGuideContent.length === 0) {
        _this.props.getUserGuideContent('BettingTicketCenterRunning');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onChangeCurrency", function (currencyIdList) {
      var baseCurrency = "";

      if (!currencyIdList || currencyIdList.indexOf(',') > 0) {
        // none or multi currencies
        _this.baseCurrencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_11__["default"].baseCurrencyList;
        baseCurrency = _this.baseCurrencyList.find(function (x) {
          return x.label === _this.props.selectedBaseCurrency;
        }) ? _this.props.selectedBaseCurrency : _this.defaultBaseCurrency;
      } else {
        var currencyName = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_11__["default"].currencyList.find(function (x) {
          return x.Id == currencyIdList;
        }).Value;

        if (!_this.baseCurrencyList.find(function (x) {
          return x.label === currencyName;
        })) {
          baseCurrency = '';
          _this.baseCurrencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_11__["default"].baseCurrencyList.slice(0);

          _this.baseCurrencyList.push({
            value: baseCurrency,
            label: currencyName
          });
        } else {
          baseCurrency = currencyName;
        }
      }

      _this.props.setSelectedCurrency(currencyIdList);

      _this.props.setSelectedBaseCurrency(baseCurrency);
    });

    _this.baseCurrencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_11__["default"].baseCurrencyList;
    _this.defaultBaseCurrency = props.selectedBaseCurrency;
    return _this;
  }

  _createClass(FormFilter, [{
    key: "_getParams",
    value: function _getParams() {
      var _this2 = this;

      if (!this.isValidModel) {
        return null;
      }

      var _this$props$requestPa = this.props.requestParam,
          PageSize = _this$props$requestPa.PageSize,
          SortBy = _this$props$requestPa.SortBy,
          SortOrder = _this$props$requestPa.SortOrder;
      var baseCurrency = this.baseCurrencyList.find(function (x) {
        return x.value === _this2.props.selectedBaseCurrency;
      });
      return {
        PageSize: PageSize,
        PageIndex: 1,
        ProductCodeList: this.props.selectedProduct,
        Username: this.props.username,
        CurrencyIdList: this.props.selectedCurrency,
        BaseCurrency: this.props.selectedBaseCurrency,
        Status: this.props.selectedStatus,
        SortBy: SortBy,
        SortOrder: SortOrder,
        IsConvertAll: this.props.isConvertAll,
        BaseCurrencyName: baseCurrency ? baseCurrency.label : ''
      };
    }
  }, {
    key: "_renderUserGuide",
    value: function _renderUserGuide() {
      var userGuideContent = this.props.userGuideContent;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_15__["default"], {
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("UserGuide"),
        contentTitle: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("BettingTicketCenter"),
        onClick: this.showUserGuide,
        content: userGuideContent
      });
    }
  }, {
    key: "_renderProductSelectList",
    value: function _renderProductSelectList() {
      var productOptions = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_11__["default"].productOptions;
      return productOptions && productOptions.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_4___default.a, {
        id: "ProductList",
        language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].currentLanguage,
        dataSource: productOptions,
        keyField: "Code",
        valueField: "Name",
        statusField: "Status",
        onChange: this.productChangeHandler
      }) : null;
    }
  }, {
    key: "_renderCurrencySelectList",
    value: function _renderCurrencySelectList() {
      var _this3 = this;

      var currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_11__["default"].currencyList;
      return currencyList && currencyList.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_4___default.a, {
        id: "ddlCurrency",
        language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].currentLanguage,
        dataSource: currencyList,
        keyField: "Id",
        valueField: "Value",
        statusField: "Status",
        onChange: function onChange(currentItem, selectedItemsKey) {
          return _this3._onChangeCurrency(selectedItemsKey);
        }
      });
    }
  }, {
    key: "_renderBaseCurrencySelectList",
    value: function _renderBaseCurrencySelectList() {
      var _this4 = this;

      var baseCurrencyList = this.baseCurrencyList;
      return baseCurrencyList && baseCurrencyList.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
        instanceId: "ddlBased",
        value: this.props.selectedBaseCurrency,
        options: baseCurrencyList,
        onChange: function onChange(item) {
          return _this4.props.setSelectedBaseCurrency(item.value);
        }
      });
    }
  }, {
    key: "_renderStatusSelectList",
    value: function _renderStatusSelectList() {
      var _this5 = this;

      var statusList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_11__["default"].statusList;
      return statusList && statusList.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_4___default.a, {
        id: "StatusList",
        language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].currentLanguage,
        dataSource: statusList,
        keyField: "Id",
        valueField: "Value",
        statusField: "Status",
        onChange: function onChange(currentItem, selectedItemsKey) {
          return _this5.props.setSelectedStatus(selectedItemsKey);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var excelButton = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-excel right",
        onClick: this.exportExcel,
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("ExportToExcel")
      }), this._renderUserGuide());
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_6__["default"], {
        className: "page-filter",
        stickyFooter: excelButton
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Product")), this._renderProductSelectList())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Username")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_5__["default"], {
        url: _common_lib_constants__WEBPACK_IMPORTED_MODULE_13__["ApiUrl"].CUSTOMER_SEARCH_URL,
        onSelect: function onSelect(value) {
          return _this6.props.setUsername(value);
        },
        onInput: function onInput(value) {
          return _this6.props.setUsername(value);
        },
        htmlAttributes: {
          placeholder: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("ExternalIdOrSystemId")
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Currency")), this._renderCurrencySelectList())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("BaseCurrency")), this._renderBaseCurrencySelectList())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_7__["default"], {
        id: "IsConvertAll",
        checked: this.props.isConvertAll,
        onChange: function onChange(checked) {
          return _this6.props.changeIsConvertAll(checked);
        },
        label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("ConvertAllFiguresToBaseCurrency")
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Status")), this._renderStatusSelectList())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "button-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        disabled: !this.isValidModel,
        type: "button",
        className: "btn btn-submit",
        onClick: this.submit
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Submit")))))));
    }
  }, {
    key: "isValidModel",
    get: function get() {
      return !!this.props.selectedProduct && !!this.props.selectedStatus && !!this.props.selectedCurrency && Object(_jsroot_lib_validationHelper__WEBPACK_IMPORTED_MODULE_16__["validateBaseCurrency"])(this.props.selectedBaseCurrency);
    }
  }]);

  return FormFilter;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index_js__WEBPACK_IMPORTED_MODULE_8__["ActionCreators"], dispatch);
}

function mapStateToProps(state) {
  var requestParam = state.requestParam,
      selectedProduct = state.selectedProduct,
      selectedCurrency = state.selectedCurrency,
      selectedBaseCurrency = state.selectedBaseCurrency,
      username = state.username,
      selectedStatus = state.selectedStatus,
      isConvertAll = state.isConvertAll,
      userGuideContent = state.userGuideContent;
  return Object.assign({}, {
    requestParam: requestParam,
    selectedProduct: selectedProduct,
    selectedCurrency: selectedCurrency,
    selectedBaseCurrency: selectedBaseCurrency,
    username: username,
    selectedStatus: selectedStatus,
    isConvertAll: isConvertAll,
    userGuideContent: userGuideContent
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/index.jsx":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/index.jsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/index.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var defaultState = Object.assign({}, window.initialState, {
  userGuideContent: '',
  requestParam: {
    PageSize: _common_lib_constants__WEBPACK_IMPORTED_MODULE_6__["DefaultPageSize"]
  }
});
var store = _lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers_index_js__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
        store: store
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById('app-container'));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/index.js":
/*!***************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/index.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_gridDataReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/gridDataReducer.js */ "./www/js/source/reactpages/reducers/gridDataReducer.js");
/* harmony import */ var _jsroot_reducers_usernameReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/reducers/usernameReducer */ "./www/js/source/reactpages/reducers/usernameReducer.js");
/* harmony import */ var _jsroot_reducers_productReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/reducers/productReducer */ "./www/js/source/reactpages/reducers/productReducer.js");
/* harmony import */ var _jsroot_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/reducers/currencyReducer */ "./www/js/source/reactpages/reducers/currencyReducer.js");
/* harmony import */ var _jsroot_reducers_baseCurrencyReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/reducers/baseCurrencyReducer */ "./www/js/source/reactpages/reducers/baseCurrencyReducer.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/reducers/requestParamReducer */ "./www/js/source/reactpages/reducers/requestParamReducer.js");
/* harmony import */ var _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/reducers/reportTitleReducer */ "./www/js/source/reactpages/reducers/reportTitleReducer.js");
/* harmony import */ var _jsroot_reducers_statusReducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/reducers/statusReducer */ "./www/js/source/reactpages/reducers/statusReducer.js");
/* harmony import */ var _jsroot_reducers_convertAllReducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/reducers/convertAllReducer */ "./www/js/source/reactpages/reducers/convertAllReducer.js");
/* harmony import */ var _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/reducers/userGuideReducer */ "./www/js/source/reactpages/reducers/userGuideReducer.js");
/* harmony import */ var _common_components_reducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../common/components/reducer */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/reducer.js");













/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_jsroot_reducers_gridDataReducer_js__WEBPACK_IMPORTED_MODULE_1__, _jsroot_reducers_usernameReducer__WEBPACK_IMPORTED_MODULE_2__, _jsroot_reducers_productReducer__WEBPACK_IMPORTED_MODULE_3__, _jsroot_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_4__, _jsroot_reducers_baseCurrencyReducer__WEBPACK_IMPORTED_MODULE_5__, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_6__, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_7__, _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_8__, _jsroot_reducers_statusReducer__WEBPACK_IMPORTED_MODULE_9__, _jsroot_reducers_convertAllReducer__WEBPACK_IMPORTED_MODULE_10__, _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_11__, _common_components_reducer__WEBPACK_IMPORTED_MODULE_12__)));

/***/ }),

/***/ "./www/js/source/reactpages/reducers/baseCurrencyReducer.js":
/*!******************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/baseCurrencyReducer.js ***!
  \******************************************************************/
/*! exports provided: selectedBaseCurrency, baseCurrencyList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedBaseCurrency", function() { return selectedBaseCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseCurrencyList", function() { return baseCurrencyList; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var selectedBaseCurrency = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_BASECURRENCY"], function (state, action) {
  return action.data;
}));
var baseCurrencyList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_BASECURRENCY_LIST"], function (state, action) {
  return action.data;
}));

/***/ }),

/***/ "./www/js/source/reactpages/reducers/convertAllReducer.js":
/*!****************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/convertAllReducer.js ***!
  \****************************************************************/
/*! exports provided: isConvertAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConvertAll", function() { return isConvertAll; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var isConvertAll = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["CHANGE_IS_CONVERT_ALL"], function (state, action) {
  return action.data;
}));

/***/ }),

/***/ "./www/js/source/reactpages/reducers/currencyReducer.js":
/*!**************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/currencyReducer.js ***!
  \**************************************************************/
/*! exports provided: selectedCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedCurrency", function() { return selectedCurrency; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var selectedCurrency = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_CURRENCY"], function (state, action) {
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

/***/ }),

/***/ "./www/js/source/reactpages/reducers/productReducer.js":
/*!*************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/productReducer.js ***!
  \*************************************************************/
/*! exports provided: selectedProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedProduct", function() { return selectedProduct; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var selectedProduct = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_PRODUCT"], function (state, action) {
  return action.data;
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

/***/ }),

/***/ "./www/js/source/reactpages/reducers/statusReducer.js":
/*!************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/statusReducer.js ***!
  \************************************************************/
/*! exports provided: selectedStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedStatus", function() { return selectedStatus; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var selectedStatus = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_STATUS"], function (state, action) {
  return action.data;
}));

/***/ }),

/***/ "./www/js/source/reactpages/reducers/userGuideReducer.js":
/*!***************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/userGuideReducer.js ***!
  \***************************************************************/
/*! exports provided: userGuideContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userGuideContent", function() { return userGuideContent; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var userGuideContent = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["USER_GUIDE_CONTENT"], function (state, action) {
  return action.data;
}));

/***/ }),

/***/ "./www/js/source/reactpages/reducers/usernameReducer.js":
/*!**************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/usernameReducer.js ***!
  \**************************************************************/
/*! exports provided: username */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "username", function() { return username; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var username = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_USERNAME"], function (state, action) {
  return action.data;
}));

/***/ })

/******/ });
//# sourceMappingURL=running.chunk.js.map