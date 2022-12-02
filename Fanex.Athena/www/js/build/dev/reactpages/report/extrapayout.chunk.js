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
/******/ 		"www/js/build/dev/reactpages/report/extrapayout": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/extrapayout/components/index.jsx","lib/common"]);
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

const setSelectedBaseCurrency = baseCurrency => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_BASECURRENCY"],
    data: baseCurrency
  };
};
const setBaseCurrencyList = baseCurrencyList => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_BASECURRENCY_LIST"],
    data: baseCurrencyList
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

const setSelectedCurrency = item => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_CURRENCY"],
    data: item
  };
};

/***/ }),

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

const setDateRange = dateRange => {
  const range = {
    fromDate: dateRange.startDate,
    toDate: dateRange.endDate
  };
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_DATE_RANGE"],
    data: range
  };
};

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

const toggleLoader = show => {
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

const setSelectedProduct = product => {
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

const setReportTitle = title => {
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

const setRequestParam = data => {
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
/*! exports provided: FETCH_DATA, SET_GRID_DATA, SET_SELECTED_PRODUCT, SET_SELECTED_BASECURRENCY, SET_BASECURRENCY_LIST, SET_SELECTED_CURRENCY, TOGGLE_LOADER, CHANGE_IS_EXCLUDE_TEST, USER_GUIDE_CONTENT, SET_DATE_RANGE, GET_DATE_CONSTRAINT, CHANGE_IS_CONVERT_ALL, SET_SELECTED_STATUS, SET_SELECTED_PLATFORM, SET_SELECTED_LIVESTATUS, SET_USERNAME, SET_REQUEST_PARAM, SET_REPORT_TITLE, SET_SPORT_LIST, SET_PAGING_OPTION, SET_SUBSIDIARY_LIST, SET_SUBSIDIARY_SEARCH */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SPORT_LIST", function() { return SET_SPORT_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PAGING_OPTION", function() { return SET_PAGING_OPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SUBSIDIARY_LIST", function() { return SET_SUBSIDIARY_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SUBSIDIARY_SEARCH", function() { return SET_SUBSIDIARY_SEARCH; });
const FETCH_DATA = 'FETCH_DATA';
const SET_GRID_DATA = "SET_GRID_DATA";

/* Product */
const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";

/* Base Currency */
const SET_SELECTED_BASECURRENCY = "SET_SELECTED_BASECURRENCY";
const SET_BASECURRENCY_LIST = "SET_BASECURRENCY_LIST";

/* Currency */
const SET_SELECTED_CURRENCY = "SET_SELECTED_CURRENCY";

/* Loader */
const TOGGLE_LOADER = "TOGGLE_LOADER";

/* Exclude Test Data */
const CHANGE_IS_EXCLUDE_TEST = "CHANGE_IS_EXCLUDE_TEST";

/* User mini guide */
const USER_GUIDE_CONTENT = "USER_GUIDE_CONTENT;";

/* Date range */
const SET_DATE_RANGE = 'SET_DATE_RANGE';
const GET_DATE_CONSTRAINT = 'GET_DATE_CONSTRAINT';

/* Convert all figures to base currency */
const CHANGE_IS_CONVERT_ALL = "CHANGE_IS_CONVERT_ALL";

/* Status */
const SET_SELECTED_STATUS = "SET_SELECTED_STATUS";

/* Platform  */
const SET_SELECTED_PLATFORM = "SET_SELECTED_PLATFORM";

/* Live Status  */
const SET_SELECTED_LIVESTATUS = "SET_SELECTED_LIVESTATUS";
const SET_USERNAME = "SET_USERNAME";
const SET_REQUEST_PARAM = "SET_REQUEST_PARAM";
const SET_REPORT_TITLE = "SET_REPORT_TITLE";

/*Sport list*/
const SET_SPORT_LIST = "SET_SPORT_LIST";

/* Live Status  */
const SET_PAGING_OPTION = 'SET_PAGING_OPTION';

/* Subsidiary Search  */
const SET_SUBSIDIARY_LIST = 'SET_SUBSIDIARY_LIST';
const SET_SUBSIDIARY_SEARCH = 'SET_SUBSIDIARY_SEARCH';

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



const fetchData = resourceName => {
  const url = _lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].resolveClientUrl('UserGuide/Index?resourcename=' + resourceName) + "&_=" + new Date().getTime();
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
};
function getUserGuideContent(params) {
  return dispatch => {
    fetchData(params).then(response => {
      dispatch(setUserGuideContent(response.data));
    });
  };
}
const setUserGuideContent = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["USER_GUIDE_CONTENT"],
    data: data
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


const CheckBox = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef((props, ref) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox-group",
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "checkbox",
    id: props.id,
    checked: props.checked,
    disabled: props.disabled,
    onChange: () => props.onChange(!props.checked)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
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
  onChange: function () {}
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

const Loader = ({
  isLoading
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "loading-process default",
    style: {
      display: `${isLoading ? 'block' : 'none'}`
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "icon-loading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "loader-inner ball-beat"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null))));
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


const NoDataTitle = ({
  title
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



const wrapperClasses = {
  OVERLAY: "overlay",
  OVERLAY_OPEN: "overlay-open"
};
class Overlay extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    _defineProperty(this, "_unRegisterEvents", () => {
      const {
        closeOnOutsideClick
      } = this.props;
      if (closeOnOutsideClick) {
        document.removeEventListener('click', this._handleClickOutSide);
      }
    });
    _defineProperty(this, "_handleClickOutSide", event => {
      const clickOutside = this.containerElement && !this.containerElement.contains(event.target);
      if (clickOutside && this.state.isOpening) {
        this._close();
      }
    });
    this.containerElement = null;
    this.refHandlers = {
      container: ref => {
        this.containerElement = ref;
      }
    };
    this.state = {
      isOpening: this.props.isOpening
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpening !== prevProps.isOpening) {
      const {
        onOpen
      } = this.props;
      this.props.isOpening && onOpen && onOpen();
      this.setState({
        isOpening: this.props.isOpening
      });
      window.setTimeout(() => {
        if (this.props.isOpening) {
          this._registerEvents();
        } else {
          this._unRegisterEvents();
        }
      }, 0);
    }
  }
  componentWillUnmount() {
    this._unRegisterEvents();
  }
  _registerEvents() {
    const {
      closeOnOutsideClick
    } = this.props;
    if (closeOnOutsideClick) {
      document.addEventListener('click', this._handleClickOutSide);
    }
  }
  _close() {
    const {
      onClose
    } = this.props;
    this.setState({
      isOpening: false
    }, () => onClose && onClose());
  }
  render() {
    const {
      className,
      children
    } = this.props;
    const mergedClassName = classnames__WEBPACK_IMPORTED_MODULE_2___default()(wrapperClasses.OVERLAY, {
      [wrapperClasses.OVERLAY_OPEN]: this.state.isOpening
    }, className);
    const style = {
      display: this.state.isOpening ? "block" : "none"
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: mergedClassName,
      style: style,
      ref: this.refHandlers.container
    }, children);
  }
}
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
const _excluded = ["content", "tag"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


const ReportTitle = _ref => {
  let {
      content,
      tag
    } = _ref,
    attrs = _objectWithoutProperties(_ref, _excluded);
  const Tag = tag;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "report-title-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
    className: "report-title"
  }, attrs), content));
};
const propTypes = {
  tag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  content: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any
};
const defaultProps = {
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




class UserGuide extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "onClickHandler", () => {
      this.setState({
        isShow: true
      });
      this.props.onClick && this.props.onClick();
    });
    _defineProperty(this, "onCloseHandler", () => {
      this.setState({
        isShow: false
      });
    });
    this.state = {
      isShow: false
    };
  }
  render() {
    const {
      className,
      title,
      content,
      contentTitle,
      isHtml
    } = this.props;
    const isShow = this.state.isShow && content && ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(content) || content.length > 0) ? true : false;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: className,
      onClick: this.onClickHandler,
      title: title
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_popup_Popup__WEBPACK_IMPORTED_MODULE_2__["default"], {
      width: 640,
      height: 480,
      isShow: isShow,
      title: contentTitle,
      onClose: this.onCloseHandler,
      isHtml: isHtml
    }, content));
  }
}
_defineProperty(UserGuide, "propTypes", {
  title: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  contentTitle: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  isHtml: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
});
_defineProperty(UserGuide, "defaultProps", {
  className: 'icon-book right',
  isHtml: true
});
;

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
const _excluded = ["tag", "className", "style"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


class CollapsiblePanel extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "onClick", () => {
      const newState = !this.state.isCollapsed;
      const {
        onCollapse,
        onExpand
      } = this.props;
      if (newState) {
        onCollapse && onCollapse();
      }
      this.setState({
        isCollapsed: newState
      }, () => {
        window.dispatchEvent(new Event('resize'));
        if (!newState) {
          onExpand && onExpand();
        }
      });
    });
    this.state = {
      isCollapsed: false
    };
  }
  render() {
    const {
      stickyFooter,
      iconContainerStyle,
      iconToggle
    } = this.props;
    const {
        tag,
        className,
        style
      } = iconToggle,
      attrs = _objectWithoutProperties(iconToggle, _excluded);
    const IconTag = tag;
    const iconStyle = style || {
      transform: this.state.isCollapsed ? null : 'rotate(180deg)',
      color: '#fff',
      textAlign: 'center',
      background: '#4c6274',
      height: "15px",
      width: "20px",
      float: 'left'
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `${this.props.className}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        display: this.state.isCollapsed ? 'none' : 'block'
      }
    }, this.props.children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "caret-block"
    }, stickyFooter), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-handle",
      style: iconContainerStyle,
      onClick: this.onClick
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IconTag, _extends({
      className: className,
      style: iconStyle
    }, attrs))));
  }
}
_defineProperty(CollapsiblePanel, "propTypes", {
  stickyFooter: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  onCollapse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});
const propTypes = {
  stickyFooter: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  onCollapse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  iconToggle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
const defaultProps = {
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
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







const START_OF_MONTH = 0;
const END_OF_MONTH = 11;
const START_DAY_OF_MONTH = 1;
const DEFAULT_YEAR_RANGE = 5;
function checkRange(dayMoment, range) {
  return dayMoment.isBetween(range['startDate'], range['endDate']) || dayMoment.isBetween(range['endDate'], range['startDate']);
}
function checkStartEdge(dayMoment, range) {
  const {
    startDate
  } = range;
  return dayMoment.startOf('day').isSame(startDate.startOf('day'));
}
function checkEndEdge(dayMoment, range) {
  const {
    endDate
  } = range;
  return dayMoment.endOf('day').isSame(endDate.endOf('day'));
}
function isOusideMinMax(dayMoment, minDate, maxDate, format) {
  return minDate && dayMoment.isBefore(Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(minDate, format, 'startOf')) || maxDate && dayMoment.isAfter(Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(maxDate, format, 'endOf'));
}
class Calendar extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props, context) {
    super(props, context);
    const {
      format,
      range,
      theme,
      offset,
      firstDayOfWeek,
      shownDate
    } = props;
    const date = Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(props.date, format, 'startOf');
    let showDate = (shownDate || range && range['endDate'] || date).clone();
    const state = {
      date,
      shownDate: showDate,
      firstDayOfWeek: firstDayOfWeek || moment__WEBPACK_IMPORTED_MODULE_2___default.a.localeData().firstDayOfWeek()
    };
    this.state = state;
    this.styles = Object(_styles_js__WEBPACK_IMPORTED_MODULE_5__["default"])(theme);
  }
  componentDidMount() {
    const {
      onInit
    } = this.props;
    onInit && onInit(this.state.date);
  }
  get limitedDate() {
    const {
      minDate,
      maxDate
    } = this.props;
    const m = moment__WEBPACK_IMPORTED_MODULE_2___default()();
    let startDate, endDate;
    if (minDate) {
      startDate = moment__WEBPACK_IMPORTED_MODULE_2___default.a.isMoment(minDate) ? minDate : moment__WEBPACK_IMPORTED_MODULE_2___default()(minDate, _constants__WEBPACK_IMPORTED_MODULE_6__["MomentFormat"].default);
    } else {
      startDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([m.year() - DEFAULT_YEAR_RANGE, START_OF_MONTH]);
    }
    if (maxDate) {
      endDate = moment__WEBPACK_IMPORTED_MODULE_2___default.a.isMoment(maxDate) ? maxDate : moment__WEBPACK_IMPORTED_MODULE_2___default()(maxDate, _constants__WEBPACK_IMPORTED_MODULE_6__["MomentFormat"].default);
    } else {
      endDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([m.year(), END_OF_MONTH]).endOf("month");
    }
    return {
      startDate,
      endDate
    };
  }
  get disablePrevButton() {
    const range = this.limitedDate;
    const startDate = range.startDate;
    const currentDate = this.state.shownDate;
    let prevMonth = this.state.shownDate.month() - 1;
    if (prevMonth < startDate.month() && currentDate.year() <= startDate.year()) {
      return true;
    }
    return false;
  }
  get disableNextButton() {
    const range = this.limitedDate;
    const endDate = range.endDate;
    const currentDate = this.state.shownDate;
    let nextMonth = this.state.shownDate.month() + 1;
    if (nextMonth > endDate.month() && currentDate.year() >= endDate.year()) {
      return true;
    }
    return false;
  }
  getShownDate() {
    const {
      link
    } = this.props;
    const shownDate = link || this.state.shownDate;
    return shownDate;
  }
  handleSelect(newDate) {
    const {
      link,
      onChange
    } = this.props;
    onChange && onChange(newDate);
    if (!link) {
      this.setState({
        date: newDate
      });
    }
  }
  nextButtonClickHandler(event) {
    event.preventDefault();
    if (!this.disableNextButton) {
      this.changeMonth(this.state.shownDate.month() + 1, event);
    }
  }
  prevButtonClickHandler(event) {
    event.preventDefault();
    if (!this.disablePrevButton) {
      this.changeMonth(this.state.shownDate.month() - 1, event);
    }
  }
  changeMonth(direction, event) {
    event.preventDefault();
    let selectedMonth = Number(direction);
    let year = this.state.shownDate.year();
    if (selectedMonth < START_OF_MONTH) {
      selectedMonth = END_OF_MONTH;
      year -= 1;
    }
    if (selectedMonth > END_OF_MONTH) {
      selectedMonth = START_OF_MONTH;
      year += 1;
    }
    const {
      link,
      linkCB
    } = this.props;
    let newDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([year, selectedMonth, this.state.shownDate.date()]);
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
  changeYear(event) {
    event.preventDefault();
    const selectedYear = Number(event.target.value);
    let newDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([selectedYear, this.state.shownDate.month(), this.state.shownDate.date()]);
    if (!newDate.isValid()) {
      newDate = moment__WEBPACK_IMPORTED_MODULE_2___default()([selectedYear, this.state.shownDate.month(), START_DAY_OF_MONTH]);
    }
    this.setState({
      shownDate: newDate
    });
  }
  renderMonthList(classes) {
    const {
      styles
    } = this;
    const {
      onlyClasses,
      locale
    } = this.props;
    const monthLabels = locale.months;
    let monthOptions = [];
    for (let i = 0; i < 12; i++) {
      const isDisabled = this._isDisabledMonth(i);
      monthOptions.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        disabled: isDisabled,
        key: `month${i}`,
        value: i
      }, monthLabels[i]));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      style: onlyClasses ? undefined : styles["MonthAndYearSelect"],
      className: classes.monthAndYearSelect,
      onChange: e => this.changeMonth(e.target.value, e),
      value: this.state.shownDate.month()
    }, monthOptions);
  }
  _isDisabledMonth(currentMonth) {
    const range = this.limitedDate;
    const currentYear = this.state.shownDate.year();
    return currentMonth < range.startDate.month() && currentYear <= range.startDate.year() || currentMonth > range.endDate.month() && currentYear >= range.endDate.year();
  }
  renderYearList(classes) {
    const {
      styles
    } = this;
    const {
      onlyClasses
    } = this.props;
    const range = this.limitedDate;
    const yearOptions = [];
    for (let i = range.startDate.year(); i <= range.endDate.year(); i++) {
      yearOptions.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: `year${i}`,
        value: i
      }, i));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      style: onlyClasses ? undefined : styles["MonthAndYearSelect"],
      className: classes.monthAndYearSelect,
      onChange: this.changeYear.bind(this),
      value: this.state.shownDate.year()
    }, yearOptions);
  }
  renderMonthAndYear(classes) {
    const shownDate = this.getShownDate();
    const year = shownDate.year();
    const {
      styles
    } = this;
    const {
      minDate,
      maxDate,
      onlyClasses,
      showMonthArrow
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: onlyClasses ? undefined : styles['MonthAndYear'],
      className: classes.monthAndYearWrapper
    }, showMonthArrow ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      disabled: this.disablePrevButton,
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['MonthButton']), {}, {
        float: 'left'
      }),
      className: classes.prevButton,
      onClick: this.prevButtonClickHandler.bind(this)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['MonthArrow']), styles['MonthArrowPrev'])
    })) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: classes.month
    }, this.renderMonthList(classes)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: classes.monthAndYearDivider
    }, "\xA0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: classes.year
    }, this.renderYearList(classes))), showMonthArrow ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      disabled: this.disableNextButton,
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['MonthButton']), {}, {
        float: 'right'
      }),
      className: classes.nextButton,
      onClick: this.nextButtonClickHandler.bind(this)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['MonthArrow']), styles['MonthArrowNext'])
    })) : null);
  }
  renderWeekdays(classes) {
    const dow = this.state.firstDayOfWeek;
    const weekdays = [];
    const {
      styles
    } = this;
    const {
      onlyClasses,
      locale
    } = this.props;
    const weekDays = locale.weekdays;
    const dayLength = 7 + dow;
    for (let i = dow; i < dayLength; i++) {
      const weekDayIndex = i % 7;
      const day = weekDays[weekDayIndex];
      weekdays.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: onlyClasses ? undefined : styles['Weekday'],
        className: classes.weekDay,
        key: i + day
      }, day));
    }
    return weekdays;
  }
  renderDays(classes) {
    // TODO: Split this logic into smaller chunks
    const {
      styles
    } = this;
    const {
      range,
      minDate,
      maxDate,
      format,
      onlyClasses,
      disableDaysBeforeToday,
      specialDays
    } = this.props;
    const shownDate = this.getShownDate();
    const {
      date,
      firstDayOfWeek
    } = this.state;
    const dateUnix = date.unix();
    const monthNumber = shownDate.month();
    const dayCount = shownDate.daysInMonth();
    const startOfMonth = shownDate.clone().startOf('month').isoWeekday();
    const lastMonth = shownDate.clone().month(monthNumber - 1);
    const lastMonthNumber = lastMonth.month();
    const lastMonthDayCount = lastMonth.daysInMonth();
    const nextMonth = shownDate.clone().month(monthNumber + 1);
    const nextMonthNumber = nextMonth.month();
    const days = [];

    // Previous month's days
    const diff = Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7;
    for (let i = diff - 1; i >= 0; i--) {
      const dayMoment = lastMonth.clone().date(lastMonthDayCount - i);
      days.push({
        dayMoment,
        isPassive: true
      });
    }

    // Current month's days
    for (let i = 1; i <= dayCount; i++) {
      const dayMoment = shownDate.clone().date(i);
      // set days before today to isPassive
      var _today = moment__WEBPACK_IMPORTED_MODULE_2___default()();
      if (disableDaysBeforeToday && Number(dayMoment.diff(_today, "days")) <= -1) {
        days.push({
          dayMoment,
          isPassive: true
        });
      } else {
        days.push({
          dayMoment
        });
      }
    }

    // Next month's days
    const remainingCells = 42 - days.length; // 42cells = 7days * 6rows
    for (let i = 1; i <= remainingCells; i++) {
      const dayMoment = nextMonth.clone().date(i);
      days.push({
        dayMoment,
        isPassive: true
      });
    }
    const today = moment__WEBPACK_IMPORTED_MODULE_2___default()().startOf('day');
    return days.map((data, index) => {
      const {
        dayMoment,
        isPassive
      } = data;
      const isSelected = !range && dayMoment.unix() === dateUnix;
      const isInRange = range && checkRange(dayMoment, range);
      const isStartEdge = range && checkStartEdge(dayMoment, range);
      const isEndEdge = range && checkEndEdge(dayMoment, range);
      const isEdge = isStartEdge || isEndEdge;
      const isToday = today.isSame(dayMoment);
      const isSunday = dayMoment.day() === 0;
      const isSpecialDay = specialDays && specialDays.some(specialDay => {
        return dayMoment.endOf('day').isSame(specialDay.date.endOf('day'));
      });
      const isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate, format);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DayCell_js__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({
        onSelect: this.handleSelect.bind(this)
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
  render() {
    const {
      styles
    } = this;
    const {
      onlyClasses,
      classNames
    } = this.props;
    const classes = _objectSpread(_objectSpread({}, _styles_js__WEBPACK_IMPORTED_MODULE_5__["defaultClasses"]), classNames);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['Calendar']), this.props.style),
      className: classes.calendar
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.monthAndYear
    }, this.renderMonthAndYear(classes)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.weekDays
    }, this.renderWeekdays(classes)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.days
    }, this.renderDays(classes)));
  }
}
Calendar.defaultProps = {
  format: _constants__WEBPACK_IMPORTED_MODULE_6__["MomentFormat"].default,
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }










class DatePicker extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    _defineProperty(this, "show", () => {
      this.setState({
        show: true
      });
    });
    const {
      locale,
      date,
      format
    } = props;
    this.locale = _objectSpread(_objectSpread({}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__["default"].locale), locale);
    const selectedDate = Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date, format, 'startOf');
    this.state = {
      selectedDate,
      show: false
    };
  }
  get dateText() {
    const {
      selectedDate
    } = this.state;
    if (selectedDate) {
      return `${selectedDate.format(this.props.format)}`;
    }
    return "";
  }
  handleSelect(date) {
    const {
      onChange
    } = this.props;
    onChange && onChange(date);
    this.setState({
      selectedDate: date,
      show: false
    });
  }
  render() {
    const {
      format,
      firstDayOfWeek,
      minDate,
      maxDate,
      classNames
    } = this.props;
    const classes = _objectSpread(_objectSpread({}, _styles_js__WEBPACK_IMPORTED_MODULE_6__["defaultClasses"]), classNames);
    const {
      show
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "daterange-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "daterange-label",
      onClick: this.show
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      readOnly: true,
      className: "input-text datepicker",
      type: "text",
      autoComplete: "off",
      value: this.dateText
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "icon icon-calendar"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_8__["default"], {
      isOpening: show
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.dateRange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Calendar_js__WEBPACK_IMPORTED_MODULE_9__["default"], {
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
}
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
  format: _constants__WEBPACK_IMPORTED_MODULE_5__["MomentFormat"].default
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }











class DateRange extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "show", () => {
      this.calendarSelectionStep = 0;
      this.setState({
        show: true
      });
    });
    _defineProperty(this, "handleApply", () => {
      const {
        onClickApplyButton,
        onChange
      } = this.props;
      const range = this.state.range;
      this.originalRange = Object.assign({}, range);
      onClickApplyButton && onClickApplyButton(range, this.isValid);
      onChange && onChange(range, this.isValid);
      this.close();
    });
    _defineProperty(this, "handleCancel", () => {
      this.setRange(this.originalRange, false);
    });
    const {
      format,
      linkedCalendars,
      theme
    } = props;
    const startDate = Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(props.startDate, format, 'startOf');
    const endDate = Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_3__["default"])(props.endDate, format, 'endOf');
    this.styles = Object(_styles_js__WEBPACK_IMPORTED_MODULE_6__["default"])(theme);
    this.calendarSelectionStep = 0;
    this.locale = _objectSpread(_objectSpread({}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_9__["default"].locale), props.locale);
    this.ranges = _objectSpread(_objectSpread({}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_9__["default"].ranges(props.today, props.minDate, props.maxDate, props.limitedMonthRange)), props.ranges);
    this.isValid = true;
    this.originalRange = {
      startDate,
      endDate
    };
    this.state = {
      range: {
        startDate,
        endDate
      },
      link: linkedCalendars && endDate,
      show: false
    };
  }
  get dateRangeText() {
    const range = this.state.range;
    if (range.startDate && range.endDate) {
      const {
        format
      } = this.props;
      return `${range.startDate.format(format)} - ${range.endDate.format(format)}`;
    }
    return "";
  }
  close() {
    this.setState({
      show: false
    });
  }
  componentDidMount() {
    const {
      onInit
    } = this.props;
    onInit && onInit(this.state.range);
  }
  orderRange(range) {
    const {
      startDate,
      endDate
    } = range;
    const swap = startDate.isAfter(endDate);
    if (!swap) return range;
    return {
      startDate: endDate,
      endDate: startDate
    };
  }
  setRange(dateRange, show) {
    let range = this.orderRange(dateRange);
    this.isValid = this.isValidMonthRange(range);
    if (this.isValid) {
      const newState = show === undefined ? {
        range
      } : {
        range,
        show
      };
      this.setState(newState);
    } else {
      const {
        onChange
      } = this.props;
      onChange && onChange(range, false);
    }
  }
  handlePredefinedRangesSelect(range) {
    this.setRange(range, false);
    this.originalRange = Object.assign({}, range);
    const {
      onChange
    } = this.props;
    onChange && onChange(range, true);
  }
  handleCalendarSelect(date) {
    const {
      startDate,
      endDate
    } = this.state.range;
    const range = {
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
  isValidMonthRange(date) {
    const {
      limitedMonthRange
    } = this.props;
    if (limitedMonthRange) {
      const startDate = date.startDate;
      const endDate = date.endDate;
      const diffMonth = 12 * (endDate.year() - startDate.year()) + endDate.month() - startDate.month() + 1;
      return diffMonth <= limitedMonthRange;
    }
    return true;
  }
  handleLinkChange(newDate) {
    this.setState({
      link: newDate
    });
  }
  render() {
    const {
      showRange,
      format,
      linkedCalendars,
      calendars,
      firstDayOfWeek,
      minDate,
      maxDate,
      classNames,
      onlyClasses,
      specialDays,
      lang,
      disableDaysBeforeToday,
      showMonthArrow
    } = this.props;
    const {
      range,
      link
    } = this.state;
    const {
      styles
    } = this;
    const classes = _objectSpread(_objectSpread({}, _styles_js__WEBPACK_IMPORTED_MODULE_6__["defaultClasses"]), classNames);
    const calendarsCount = Number(calendars) - 1;
    const buttonHandlers = {
      apply: this.handleApply,
      cancel: this.handleCancel
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "daterange-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "daterange-label",
      onClick: this.show
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      readOnly: true,
      name: "DateRange",
      id: "DateRange",
      className: "input-text datepicker",
      type: "text",
      autoComplete: "off",
      value: this.dateRangeText
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "icon icon-calendar"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_10__["default"], {
      isOpening: this.state.show,
      onClose: this.handleCancel
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.dateRange,
      ref: element => this.dateRangeContainer = element
    }, showRange && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PredefinedRanges_js__WEBPACK_IMPORTED_MODULE_5__["default"], {
      format: format,
      ranges: this.ranges,
      range: range,
      theme: styles,
      onSelect: range => this.handlePredefinedRangesSelect(range),
      onlyClasses: onlyClasses,
      classNames: classes,
      locale: this.locale,
      buttonHandlers: buttonHandlers
    }), (() => {
      const _calendars = [];
      for (var i = calendarsCount; i >= 0; i--) {
        const shownDate = i == calendarsCount ? range.startDate : range.endDate;
        _calendars.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Calendar_js__WEBPACK_IMPORTED_MODULE_4__["default"], {
          showMonthArrow: showMonthArrow,
          shownDate: shownDate,
          disableDaysBeforeToday: disableDaysBeforeToday,
          lang: lang,
          key: i,
          link: linkedCalendars && link,
          linkCB: this.handleLinkChange.bind(this),
          range: range,
          format: format,
          firstDayOfWeek: firstDayOfWeek,
          theme: styles,
          minDate: minDate,
          maxDate: maxDate,
          onlyClasses: onlyClasses,
          specialDays: specialDays,
          classNames: classes,
          onChange: this.handleCalendarSelect.bind(this),
          locale: this.locale
        }));
      }
      return _calendars;
    })())));
  }
}
DateRange.defaultProps = {
  linkedCalendars: false,
  theme: {},
  format: _constants__WEBPACK_IMPORTED_MODULE_8__["MomentFormat"].default,
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




class DayCell extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props, context) {
    super(props, context);
    this.state = {
      hover: false,
      active: false
    };
    this.styles = this.props.theme;
  }
  handleMouseEvent(event) {
    event.preventDefault();
    if (this.props.isPassive) return null;
    const newState = {};
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
  handleSelect(event) {
    event.preventDefault();
    if (this.props.isPassive) return null;
    this.props.onSelect(this.props.dayMoment);
  }
  getStateStyles() {
    const {
      hover,
      active
    } = this.state;
    const {
      isSelected,
      isInRange,
      isPassive,
      isStartEdge,
      isEndEdge,
      dayMoment,
      isToday,
      isSunday,
      isSpecialDay
    } = this.props;
    const {
      styles
    } = this;
    const hoverStyle = hover ? styles['DayHover'] : {};
    const activeStyle = active ? styles['DayActive'] : {};
    const passiveStyle = isPassive ? styles['DayPassive'] : {};
    const startEdgeStyle = isStartEdge ? styles['DayStartEdge'] : {};
    const endEdgeStyle = isEndEdge ? styles['DayEndEdge'] : {};
    const selectedStyle = isSelected ? styles['DaySelected'] : {};
    const inRangeStyle = isInRange ? styles['DayInRange'] : {};
    const todayStyle = isToday ? styles['DayToday'] : {};
    const sundayStyle = isSunday ? styles['DaySunday'] : {};
    const specialDayStyle = isSpecialDay ? styles['DaySpecialDay'] : {};
    return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, todayStyle), sundayStyle), specialDayStyle), inRangeStyle), hoverStyle), passiveStyle), activeStyle), selectedStyle), startEdgeStyle), endEdgeStyle);
  }
  getClassNames(classes) {
    const {
      isSelected,
      isInRange,
      isPassive,
      isStartEdge,
      isEndEdge,
      isToday,
      isSunday,
      isSpecialDay
    } = this.props;
    return classnames__WEBPACK_IMPORTED_MODULE_2___default()({
      [classes.day]: true,
      [classes.dayActive]: isSelected,
      [classes.dayPassive]: isPassive,
      [classes.dayInRange]: isInRange,
      [classes.dayStartEdge]: isStartEdge,
      [classes.dayEndEdge]: isEndEdge,
      [classes.dayToday]: isToday,
      [classes.daySunday]: isSunday,
      [classes.daySpecialDay]: isSpecialDay
    });
  }
  render() {
    const {
      dayMoment,
      onlyClasses,
      classNames
    } = this.props;
    const {
      styles
    } = this;
    const stateStyle = this.getStateStyles();
    const classes = this.getClassNames(classNames);
    const dayWrapperStyles = {
      width: styles['Day'].width,
      height: styles['Day'].height,
      display: styles['Day'].display
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: onlyClasses ? undefined : dayWrapperStyles,
      onClick: this.handleSelect.bind(this)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      onMouseEnter: this.handleMouseEvent.bind(this),
      onMouseLeave: this.handleMouseEvent.bind(this),
      onMouseDown: this.handleMouseEvent.bind(this),
      onMouseUp: this.handleMouseEvent.bind(this),
      className: classes,
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['Day']), stateStyle)
    }, dayMoment.date()));
  }
}
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







class PredefinedRanges extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props, context) {
    super(props, context);
    this.styles = this.props.theme;
    this.selectedItem = this._getSelectedRange();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.range !== prevProps.range) {
      this.selectedItem = this._getSelectedRange();
    }
  }
  _getSelectedRange() {
    const {
      ranges,
      range
    } = this.props;
    return Object.keys(ranges).find(name => {
      const currentRange = ranges[name];
      return range.startDate.isSame(currentRange.startDate, "day") && range.endDate.isSame(currentRange.endDate, "day");
    });
  }
  handleSelect(name, event) {
    event.preventDefault();
    this.selectedItem = name;
    const range = this.props.ranges[name];
    this.props.onSelect({
      startDate: Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_4__["default"])(range['startDate'], null, 'startOf'),
      endDate: Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_4__["default"])(range['endDate'], null, 'endOf')
    });
  }
  clickButton(event, action) {
    event.preventDefault();
    this.props.buttonHandlers[action]();
  }
  renderRangeList(classes) {
    const {
      ranges,
      range,
      onlyClasses
    } = this.props;
    const {
      styles
    } = this;
    let gotActiveRange = false;
    return Object.keys(ranges).map(name => {
      const active = this.selectedItem === name;
      gotActiveRange = !gotActiveRange && active;
      const style = _objectSpread(_objectSpread({}, styles['PredefinedRangesItem']), gotActiveRange ? styles['PredefinedRangesItemActive'] : {});
      const predefinedRangeClass = classnames__WEBPACK_IMPORTED_MODULE_3___default()({
        [classes.predefinedRangesItem]: true,
        [classes.predefinedRangesItemActive]: gotActiveRange
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#",
        key: 'range-' + name,
        className: predefinedRangeClass,
        style: onlyClasses ? undefined : style,
        onClick: e => this.handleSelect(name, e)
      }, name);
    });
  }
  renderRangeButtons(classes) {
    const {
      style,
      onlyClasses,
      locale
    } = this.props;
    const locales = _objectSpread(_objectSpread({}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_6__["default"].locale), locale);
    const {
      styles
    } = this;
    const action = {
      apply: "apply",
      cancel: "cancel"
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _styles_js__WEBPACK_IMPORTED_MODULE_5__["defaultClasses"].rangeButtonGroup
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: classes.applyButton,
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['RangeApplyButton']), style),
      type: "button",
      onClick: e => this.clickButton(e, action.apply)
    }, locales.applyLabel), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: classes.cancelButton,
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['RangeCancelButton']), style),
      onClick: e => this.clickButton(e, action.cancel),
      type: "button"
    }, locales.cancelLabel));
  }
  render() {
    const {
      style,
      onlyClasses,
      classNames
    } = this.props;
    const {
      styles
    } = this;
    const classes = _objectSpread(_objectSpread({}, _styles_js__WEBPACK_IMPORTED_MODULE_5__["defaultClasses"]), classNames);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['PredefinedRanges']), style),
      className: classes.predefinedRanges
    }, this.renderRangeList(classes), this.renderRangeButtons(classes));
  }
}
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
const MomentFormat = {
  default: "MM/DD/YYYY",
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




const addRange = (rangeObj, name, start, end) => {
  rangeObj[_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource(name)] = {
    startDate: start,
    endDate: end
  };
};
const addOneDay = (rangeObj, name, day, min, max) => {
  if (day >= min && day <= max) {
    addRange(rangeObj, name, day, day);
  }
};
const addDistanceDays = (rangeObj, name, start, end, min, max) => {
  if (!(max < start || end < min)) {
    addRange(rangeObj, name, start < min ? min : start, end > max ? max : end);
  }
};
/* harmony default export */ __webpack_exports__["default"] = ({
  ranges: (todayDate, minDate, maxDate, limitMonths) => {
    var today = !todayDate ? moment__WEBPACK_IMPORTED_MODULE_0___default()() : !moment__WEBPACK_IMPORTED_MODULE_0___default.a.isMoment(todayDate) ? moment__WEBPACK_IMPORTED_MODULE_0___default()(todayDate, _constants__WEBPACK_IMPORTED_MODULE_3__["MomentFormat"].default) : todayDate;
    var max = !maxDate ? today : !moment__WEBPACK_IMPORTED_MODULE_0___default.a.isMoment(maxDate) ? moment__WEBPACK_IMPORTED_MODULE_0___default()(maxDate, _constants__WEBPACK_IMPORTED_MODULE_3__["MomentFormat"].default) : maxDate;
    var min = !minDate ? today : !moment__WEBPACK_IMPORTED_MODULE_0___default.a.isMoment(minDate) ? moment__WEBPACK_IMPORTED_MODULE_0___default()(minDate, _constants__WEBPACK_IMPORTED_MODULE_3__["MomentFormat"].default) : minDate;
    const range = {};
    if (today < min) {
      return range;
    }
    addOneDay(range, "Today", today, min, max);
    const yesterday = today.clone().add(-1, 'days');
    addOneDay(range, "Yesterday", yesterday, min, max);
    const startCurrentWeek = today.clone().startOf('week');
    const endCurrentWeek = today;
    addDistanceDays(range, "Currentweek", startCurrentWeek, endCurrentWeek, min, max);
    const startLastWeek = today.clone().subtract(1, 'week').startOf('week');
    const endLastWeek = startLastWeek.clone().add(6, 'days');
    addDistanceDays(range, "Lastweek", startLastWeek, endLastWeek, min, max);
    const startCurrentmonth = today.clone().startOf('month');
    const endCurrentmonth = today;
    addDistanceDays(range, "Currentmonth", startCurrentmonth, endCurrentmonth, min, max);
    const startLastmonth = today.clone().subtract(1, 'month').startOf('month');
    const endLastmonth = startLastmonth.clone().endOf('month');
    addDistanceDays(range, "Lastmonth", startLastmonth, endLastmonth, min, max);
    if (limitMonths && limitMonths > 1) {
      const startSincelastmonth = today.clone().subtract(1, 'month').startOf('month');
      const endSincelastmonth = today;
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const defaultClasses = {
  show: 'rdr-Show',
  hide: 'rdr-Hide',
  calendar: 'rdr-Calendar',
  dateRange: 'rdr-DateRange rdr-DateRange-index',
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
const defaultTheme = {
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
/* harmony default export */ __webpack_exports__["default"] = ((customTheme = {}) => {
  let calendarWidth = defaultTheme.Calendar.width;
  let calendarPadding = defaultTheme.Calendar.padding;
  let cellMargin = defaultTheme.Day.margin || 0;
  if (customTheme.Calendar && customTheme.Calendar.hasOwnProperty('width')) {
    calendarWidth = customTheme.Calendar.width;
  }
  if (customTheme.Calendar && customTheme.Calendar.hasOwnProperty('padding')) {
    calendarPadding = customTheme.Calendar.padding;
  }
  if (customTheme.Day && customTheme.Day.hasOwnProperty('margin')) {
    cellMargin = customTheme.Day.margin;
  }
  const cellSize = (parseInt(calendarWidth, 10) - parseInt(calendarPadding, 10) * 2) / 7 - parseInt(cellMargin, 10) * 2;
  return {
    DateRange: _objectSpread(_objectSpread({}, defaultTheme.DateRange), customTheme.DateRange),
    Calendar: _objectSpread(_objectSpread({}, defaultTheme.Calendar), customTheme.Calendar),
    Day: _objectSpread(_objectSpread({
      width: cellSize,
      height: cellSize,
      lineHeight: cellSize + 'px'
    }, defaultTheme.Day), customTheme.Day),
    DayPassive: _objectSpread(_objectSpread({}, defaultTheme.DayPassive), customTheme.DayPassive),
    DayHover: _objectSpread(_objectSpread({}, defaultTheme.DayHover), customTheme.DayHover),
    DayToday: _objectSpread(_objectSpread({}, defaultTheme.DayToday), customTheme.DayToday),
    DaySunday: _objectSpread(_objectSpread({}, defaultTheme.DaySunday), customTheme.DaySunday),
    DaySpecialDay: _objectSpread(_objectSpread({}, defaultTheme.DaySpecialDay), customTheme.DaySpecialDay),
    DayActive: _objectSpread(_objectSpread({}, defaultTheme.DayActive), customTheme.DayActive),
    DaySelected: _objectSpread(_objectSpread({}, defaultTheme.DaySelected), customTheme.DaySelected),
    DayStartEdge: _objectSpread(_objectSpread({}, defaultTheme.DayStartEdge), customTheme.DayStartEdge),
    DayEndEdge: _objectSpread(_objectSpread({}, defaultTheme.DayEndEdge), customTheme.DayEndEdge),
    DayInRange: _objectSpread(_objectSpread({}, defaultTheme.DayInRange), customTheme.DayInRange),
    Weekday: _objectSpread(_objectSpread({
      width: cellSize,
      height: cellSize / 2,
      lineHeight: cellSize / 2 + 'px'
    }, defaultTheme.Weekday), customTheme.Weekday),
    MonthAndYear: _objectSpread(_objectSpread({}, defaultTheme.MonthAndYear), customTheme.MonthAndYear),
    MonthAndYearSelect: _objectSpread(_objectSpread({}, defaultTheme.MonthAndYearSelect), customTheme.MonthAndYearSelect),
    MonthButton: _objectSpread(_objectSpread({}, defaultTheme.MonthButton), customTheme.MonthButton),
    MonthArrow: _objectSpread(_objectSpread({}, defaultTheme.MonthArrow), customTheme.MonthArrow),
    MonthArrowPrev: _objectSpread(_objectSpread({}, defaultTheme.MonthArrowPrev), customTheme.MonthArrowPrev),
    MonthArrowNext: _objectSpread(_objectSpread({}, defaultTheme.MonthArrowNext), customTheme.MonthArrowNext),
    PredefinedRanges: _objectSpread(_objectSpread({}, defaultTheme.PredefinedRanges), customTheme.PredefinedRanges),
    PredefinedRangesItem: _objectSpread(_objectSpread({}, defaultTheme.PredefinedRangesItem), customTheme.PredefinedRangesItem),
    PredefinedRangesItemActive: _objectSpread(_objectSpread({}, defaultTheme.PredefinedRangesItemActive), customTheme.PredefinedRangesItemActive),
    RangeApplyButton: _objectSpread(_objectSpread(_objectSpread({}, defaultTheme.RangeButton), defaultTheme.RangeApplyButton), customTheme.RangeApplyButton),
    RangeCancelButton: _objectSpread(_objectSpread(_objectSpread({}, defaultTheme.RangeButton), defaultTheme.RangeCancelButton), customTheme.RangeCancelButton)
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
  let output = null;
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



const Popup = props => {
  const {
    title,
    isShow,
    width,
    height,
    isHtml,
    children,
    iframeUrl
  } = props;
  let content;
  if (iframeUrl) {
    content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
      frameBorder: "0",
      src: iframeUrl,
      width: "100%",
      height: "100%"
    });
  } else {
    content = isHtml ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "popup-content",
      dangerouslySetInnerHTML: {
        __html: children
      }
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "popup-content"
    }, children);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: `popup-container ${isShow ? 'show' : 'hide'}`,
    onClick: props.onClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "popup-block-body"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flat-popup",
    style: {
      height: height,
      width: width
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "popup-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "txt-title"
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "popup-close",
    onClick: () => {
      props.onClose && props.onClose();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
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
  iframeUrl: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
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
const DEFAULT_WIDTH = '55%';
const DEFAULT_HEIGHT = '55%';

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

/***/ "./www/js/source/reactpages/constants/config.js":
/*!******************************************************!*\
  !*** ./www/js/source/reactpages/constants/config.js ***!
  \******************************************************/
/*! exports provided: debuggingConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debuggingConfig", function() { return debuggingConfig; });
const debuggingConfig = {
  name: "__lrfConfig__",
  env: "local"
};

/***/ }),

/***/ "./www/js/source/reactpages/constants/report.js":
/*!******************************************************!*\
  !*** ./www/js/source/reactpages/constants/report.js ***!
  \******************************************************/
/*! exports provided: ReportLevel, ReportBy, SubsidiaryViewType, TreeViewOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportLevel", function() { return ReportLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportBy", function() { return ReportBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubsidiaryViewType", function() { return SubsidiaryViewType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeViewOption", function() { return TreeViewOption; });
const ReportLevel = {
  MAIN: 0,
  LICENSEE: 1,
  CUSTOMER: 2
};
const ReportBy = {
  DAILY: 1,
  MONTHLY: 2
};
const SubsidiaryViewType = {
  NOT_MANAGEMENT: 0,
  NORMAL_MANAGEMENT: 1,
  MASTER_MANAGEMENT: 2
};
const TreeViewOption = {
  childrenField: 'Children',
  keyField: 'Value',
  valueField: 'Name',
  statusField: 'Checked',
  indent: 30,
  includeSelectedParentKey: false,
  useOriginalDataSource: false
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

class AppLayout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "container",
      className: "container-fluid"
    }, this.props.children);
  }
}

/***/ }),

/***/ "./www/js/source/reactpages/layouts/BetListPopupLayout.jsx":
/*!*****************************************************************!*\
  !*** ./www/js/source/reactpages/layouts/BetListPopupLayout.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BetListPopupLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


class BetListPopupLayout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      title,
      children
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "popup-content-default betlist-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "caption"
    }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "betlist-content"
    }, children));
  }
}
_defineProperty(BetListPopupLayout, "propTypes", {
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any
});

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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


class DataService {
  static buildProxyUrl(apiKey, apiUrl) {
    const encodeUrl = apiUrl.replace(new RegExp('/', 'g'), '_');
    const proxyUrl = `Proxy/${apiKey}/${encodeUrl}`;
    return proxyUrl;
  }
  static getProxyData(apiKey, apiUrl, params) {
    const proxyUrl = this.buildProxyUrl(apiKey, apiUrl);
    return this.getData(proxyUrl, params);
  }
  static postProxyData(apiKey, apiUrl, params) {
    const proxyUrl = this.buildProxyUrl(apiKey, apiUrl);
    return this.postData(proxyUrl, params);
  }
  static getProxyFile(apiKey, apiUrl, params) {
    const proxyUrl = this.buildProxyUrl(apiKey, apiUrl);
    return this.getFile(proxyUrl, params);
  }
  static getData(url, params) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url, {
      params: params
    });
  }
  static postData(url, params) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, params, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        '__RequestVerificationToken': _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].getXsrfToken()
      }
    });
  }
  static getFile(url, params, options) {
    const defaultOptions = {
      responseType: 'blob',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        '__RequestVerificationToken': _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].getXsrfToken()
      }
    };
    let requestOptions = Object.assign({}, defaultOptions, options);
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, params, requestOptions);
  }
  static postReportData(url, params) {
    return this.postProxyData(this.apiKeys.report, url, params);
  }
  static getReportData(url, params) {
    return this.getProxyData(this.apiKeys.report, url, params);
  }
  static getReportFile(url, params) {
    return this.getProxyFile(this.apiKeys.report, url, params);
  }
  static postBetListData(url, params) {
    return this.postProxyData(this.apiKeys.betlist, url, params);
  }
  static getBetListFile(url, params) {
    return this.getProxyFile(this.apiKeys.betlist, url, params);
  }
}
_defineProperty(DataService, "apiKeys", {
  report: 'Report',
  betlist: 'BetList'
});

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
  return function reducer(state = initialState, action) {
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const DEFAULT_RESOURCE_NAME = "_language_en_US";
const langCode = window.PageLanguage || "en-US";
const resourceName = `_language_${langCode.replace("-", "_")}`;
class LangHelper {
  static get currentLanguage() {
    return langCode;
  }
  static getSingleResource(key) {
    var langHandler = window[resourceName];
    return langHandler && langHandler[key] || window[DEFAULT_RESOURCE_NAME] && window[DEFAULT_RESOURCE_NAME][key] || key;
  }
  static getResources(keys) {
    var langHandler = window[resourceName];
    return keys.map(key => langHandler && langHandler[key] || window[DEFAULT_RESOURCE_NAME] && window[DEFAULT_RESOURCE_NAME][key] || key);
  }
}
_defineProperty(LangHelper, "languageKeys", {
  eng: "en-US",
  zhCN: "zh-CN"
});

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


const isDev = "development" === "development";
const configName = _constants_config__WEBPACK_IMPORTED_MODULE_1__["debuggingConfig"].name;
// middleware that logs actions
const loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_0__["createLogger"])({
  predicate: (getState, action) => isDev || window[configName] && window[configName].env === _constants_config__WEBPACK_IMPORTED_MODULE_1__["debuggingConfig"].env && (!window[configName].actionFilter || window[configName].actionFilter === action.type)
});
class Logger {
  static getLoggerMiddleware() {
    return loggerMiddleware;
  }
}

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
class NumberFormat {
  static formatDecimal(value) {
    return this.format(value, 2);
  }
  static formatInteger(value) {
    if (typeof value !== "number" || isNaN(value)) {
      return "";
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  static format(value, digits = 0) {
    if (typeof value !== "number" || isNaN(value)) {
      return "";
    }
    const roundedValue = this.round(value, digits);
    return roundedValue.toFixed(digits).replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1,");
  }
  static round(value, digits) {
    const sign = value < 0 ? -1 : 1;
    const absoluteValue = Math.abs(value);
    const rounded = Number(Math.round(absoluteValue + 'e' + digits) + 'e-' + digits);
    return sign * rounded;
  }
  static parseToString(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1,");
  }
  static roundDownFormatDecimal(value) {
    return this.roundDownFormat(value, 2);
  }
  static roundDownFormat(value, digits = 0) {
    if (typeof value !== "number" || isNaN(value)) {
      return "";
    }
    const roundedValue = this.roundDown(value, digits);
    return roundedValue.toFixed(digits).replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1,");
  }
  static roundDown(value, digits) {
    const sign = value < 0 ? -1 : 1;
    const absoluteValue = Math.abs(value);
    const rounded = Number(Math.floor(absoluteValue + 'e' + digits) + 'e-' + digits);
    return sign * rounded;
  }
}

/***/ }),

/***/ "./www/js/source/reactpages/lib/report.js":
/*!************************************************!*\
  !*** ./www/js/source/reactpages/lib/report.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Report; });
/* harmony import */ var _constants_report__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/report */ "./www/js/source/reactpages/constants/report.js");
/* harmony import */ var _site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);



const fetchData = (relativeUrl, params) => {
  const url = _site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(relativeUrl);
  return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post(url, params.data, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      '__RequestVerificationToken': _site__WEBPACK_IMPORTED_MODULE_1__["default"].getXsrfToken()
    }
  });
};
class Report {
  static getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate) {
    let fdate = typeof drilldownDate === "string" ? new Date(drilldownDate) : drilldownDate;
    let tdate = fdate;
    if (Number(reportBy) === _constants_report__WEBPACK_IMPORTED_MODULE_0__["ReportBy"].MONTHLY) {
      let fday = 1;
      const month = fdate.getMonth();
      const year = fdate.getFullYear();
      const orignalFDate = new Date(fromDate);
      if (month === orignalFDate.getMonth()) {
        fday = orignalFDate.getDate();
      }
      fdate = new Date(year, month, fday, 0, 0, 0, 0);
      const originalTDate = new Date(toDate);
      if (month === originalTDate.getMonth()) {
        const tday = originalTDate.getDate();
        tdate = new Date(year, month, tday, 0, 0, 0, 0);
      } else {
        tdate = new Date(year, month + 1, 0);
      }
    }
    return {
      fromDate: fdate,
      toDate: tdate
    };
  }
  static fetchGridData(relativeUrl, params) {
    return fetchData(relativeUrl, params);
  }
}

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
const _rootUrl = window.rootUrl || "/";
const _isSelfMode = !!window.isSelfMode;
let _xsrfToken = null;
class Site {
  static getXsrfToken() {
    if (!_xsrfToken) {
      _xsrfToken = document.querySelector("input[name=__RequestVerificationToken]").value;
    }
    return _xsrfToken;
  }
  static resolveClientUrl(relativeUrl) {
    return _rootUrl + relativeUrl;
  }
  static getLrfSubsidiary() {
    try {
      return _isSelfMode && top.getLrfSubsidiarySearch && top.getLrfSubsidiarySearch() || {};
    } catch (e) {
      return {};
    }
  }
  static convertDateToString(date) {
    return typeof date === "string" ? date : date.format("MM/DD/YYYY");
  }
  static isEmptyObject(obj = {}) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }
  static asNull(text) {
    if (text != null) {
      text = text.trim();
      if (text === '') {
        return null;
      }
    }
    return text;
  }
  static downloadFile(data, fileName) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  static readAsJson(blob, callback) {
    const reader = new FileReader();
    reader.onload = function () {
      callback && callback(JSON.parse(reader.result));
    };
    reader.readAsText(blob);
  }
  static getRootUrl() {
    return _rootUrl;
  }
}

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



class Store {
  static createStore(reducer, initialState) {
    const loggerMiddleware = _logger__WEBPACK_IMPORTED_MODULE_2__["default"].getLoggerMiddleware();
    const enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"],
    // lets us dispatch() functions
    loggerMiddleware));
    return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, initialState, enhancer);
  }
}

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/actions/dataAction.js":
/*!**************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/actions/dataAction.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/extrapayout/actions/types.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");



const getReportData = (url, params) => {
  return dispatch => {
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__["default"].postReportData(url, params).then(response => {
      response.data.timestamp = new Date().getTime();
      dispatch(setReportData(response.data));
      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_2__["toggleLoader"])(false));
    }).catch(error => {
      alert("Sorry, an error occurred while processing your request.");
      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_2__["toggleLoader"])(false));
    });
  };
};
const setReportData = data => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_REPORT_DATA"],
    data: data
  };
};
const setReloadReport = data => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_RELOAD_REPORT"],
    data: data
  };
};
/* harmony default export */ __webpack_exports__["default"] = ({
  setReportData,
  getReportData,
  setReloadReport
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/actions/filterAction.js":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/actions/filterAction.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/extrapayout/actions/types.js");

const setReportFilter = data => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_REPORT_FILTER"],
    data: data
  };
};
const setDetailParams = data => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_DETAIL_PARAMS"],
    data: data
  };
};
/* harmony default export */ __webpack_exports__["default"] = ({
  setReportFilter,
  setDetailParams
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/actions/index.js":
/*!*********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/actions/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filterAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filterAction */ "./www/js/source/reactpages/pages/extrapayout/actions/filterAction.js");
/* harmony import */ var _dataAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataAction */ "./www/js/source/reactpages/pages/extrapayout/actions/dataAction.js");
/* harmony import */ var _promotionTypeAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./promotionTypeAction */ "./www/js/source/reactpages/pages/extrapayout/actions/promotionTypeAction.js");
/* harmony import */ var _jsroot_actions_productAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/actions/productAction */ "./www/js/source/reactpages/actions/productAction.js");
/* harmony import */ var _jsroot_actions_currencyAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/actions/currencyAction */ "./www/js/source/reactpages/actions/currencyAction.js");
/* harmony import */ var _jsroot_actions_baseCurrencyAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/actions/baseCurrencyAction */ "./www/js/source/reactpages/actions/baseCurrencyAction.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _jsroot_actions_dateRangeAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/actions/dateRangeAction */ "./www/js/source/reactpages/actions/dateRangeAction.js");
/* harmony import */ var _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/actions/userGuideAction */ "./www/js/source/reactpages/actions/userGuideAction.js");
/* harmony import */ var _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/actions/requestParamAction */ "./www/js/source/reactpages/actions/requestParamAction.js");
/* harmony import */ var _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/actions/reportTitleAction */ "./www/js/source/reactpages/actions/reportTitleAction.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }











/* harmony default export */ __webpack_exports__["default"] = (_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _filterAction__WEBPACK_IMPORTED_MODULE_0__["default"]), _dataAction__WEBPACK_IMPORTED_MODULE_1__["default"]), _promotionTypeAction__WEBPACK_IMPORTED_MODULE_2__["default"]), _jsroot_actions_productAction__WEBPACK_IMPORTED_MODULE_3__), _jsroot_actions_currencyAction__WEBPACK_IMPORTED_MODULE_4__), _jsroot_actions_baseCurrencyAction__WEBPACK_IMPORTED_MODULE_5__), _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_6__), _jsroot_actions_dateRangeAction__WEBPACK_IMPORTED_MODULE_7__), _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_8__), _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_9__), _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_10__));

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/actions/promotionTypeAction.js":
/*!***********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/actions/promotionTypeAction.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/extrapayout/actions/types.js");



const Url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ExtraPayoutReport/GetPromotionTypes');
const setSelectedPromotionTypes = data => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_2__["SET_SELECTED_PROMOTION_TYPES"],
    data: data
  };
};
const setPromotionTypeList = list => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_2__["SET_PROMOTION_TYPE_LIST"],
    data: list
  };
};
const getPromotionTypeList = productCode => {
  return dispatch => {
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__["default"].getData(Url, {
      productCode: productCode
    }).then(response => {
      let data = response.data;
      var promotionTypeList = data.map(item => item.value).join(',');
      dispatch(setPromotionTypeList(data));
      dispatch(setSelectedPromotionTypes(promotionTypeList));
    });
  };
};
/* harmony default export */ __webpack_exports__["default"] = ({
  getPromotionTypeList,
  setPromotionTypeList,
  setSelectedPromotionTypes
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/actions/types.js":
/*!*********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/actions/types.js ***!
  \*********************************************************************/
/*! exports provided: SET_REPORT_DATE, SET_REPORT_FILTER, SET_REPORT_DATA, SET_PROMOTION_TYPE_LIST, SET_SELECTED_PROMOTION_TYPES, SET_RELOAD_REPORT, SET_DETAIL_PARAMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REPORT_DATE", function() { return SET_REPORT_DATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REPORT_FILTER", function() { return SET_REPORT_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REPORT_DATA", function() { return SET_REPORT_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PROMOTION_TYPE_LIST", function() { return SET_PROMOTION_TYPE_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_PROMOTION_TYPES", function() { return SET_SELECTED_PROMOTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_RELOAD_REPORT", function() { return SET_RELOAD_REPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_DETAIL_PARAMS", function() { return SET_DETAIL_PARAMS; });
const SET_REPORT_DATE = 'SET_REPORT_DATE';
const SET_REPORT_FILTER = 'SET_REPORT_FILTER';
const SET_REPORT_DATA = 'SET_REPORT_DATA';
const SET_PROMOTION_TYPE_LIST = 'SET_PROMOTION_TYPE_LIST';
const SET_SELECTED_PROMOTION_TYPES = 'SET_SELECTED_PROMOTION_TYPES';
const SET_RELOAD_REPORT = 'SET_RELOAD_REPORT';
const SET_DETAIL_PARAMS = 'SET_DETAIL_PARAMS';

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/common/constants.js":
/*!************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/common/constants.js ***!
  \************************************************************************/
/*! exports provided: DefaultPageSize, ApiUrl, headerText, BreadcrumbText, ReportLevel, DefaultPagingOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultPageSize", function() { return DefaultPageSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiUrl", function() { return ApiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerText", function() { return headerText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbText", function() { return BreadcrumbText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportLevel", function() { return ReportLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultPagingOption", function() { return DefaultPagingOption; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");

const DefaultPageSize = 50;
const ApiUrl = {
  REPORT_DATA_URL: "Api/ExtraPayout/GetData",
  EXPORT_REPORT_DATA_URL: "Api/ExtraPayout/ExportExcel",
  REPORT_DETAIL_DATA_URL: "Api/ExtraPayout/GetDetailData",
  EXPORT_REPORT_DETAIL_DATA_URL: "Api/ExtraPayout/ExportDetailExcel"
};
const headerText = {
  date: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Date'),
  refno: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('RefNo'),
  externalId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('ExternalId'),
  systemId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('SystemId'),
  currency: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Currency'),
  product: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Product'),
  promotionType: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('PromotionType'),
  turnover: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Turnover'),
  totalTransaction: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('TotalTransaction'),
  customerAmount: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('CustomerAmount'),
  licSharingAmount: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('LicSharingAmount')
};
const BreadcrumbText = {
  main: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Main'),
  customer: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Customer')
};
const ReportLevel = {
  MAIN: 0,
  CUSTOMER: 1
};
const DefaultPagingOption = {
  PageIndex: 1,
  PageSize: 50,
  TotalItem: 0,
  PageList: [50, 100, 200, 300, 400, 500, 1000, 2000]
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/common/gridUtils.js":
/*!************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/common/gridUtils.js ***!
  \************************************************************************/
/*! exports provided: renderHeader, renderDataSection, renderFooter, renderDetailHeader, renderDetailDataSection, renderDetailFooter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderHeader", function() { return renderHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDataSection", function() { return renderDataSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderFooter", function() { return renderFooter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDetailHeader", function() { return renderDetailHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDetailDataSection", function() { return renderDetailDataSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDetailFooter", function() { return renderDetailFooter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/pages/extrapayout/common/constants.js");
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");






const ProductTIP = "TIP";
const renderHeader = drilldownLevel => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
    style: {
      height: 32
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 50
  }, "#"), drilldownLevel === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 100
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].date), drilldownLevel === 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 120
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].externalId), drilldownLevel === 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 120
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].systemId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 70
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].currency), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 150
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].product), drilldownLevel === 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 270
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].promotionType), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 110
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].turnover), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 100
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].totalTransaction), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 110
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].customerAmount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 120
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].licSharingAmount));
};
const renderDataSection = (dataList, drilldownLevel, handleDrilldown, handleDrilldownBetlist, index) => {
  const dataRows = [];
  for (let i = 0; i < dataList.length; i++) {
    dataRows.push(buildDataRow(dataList[i], drilldownLevel, handleDrilldown, handleDrilldownBetlist));
  }
  return {
    bodyData: dataRows,
    index
  };
};
const renderFooter = (data, drilldownLevel) => {
  let totalRows = [];
  const total = data.totalCurrency,
    colSpan = drilldownLevel === 0 ? 2 : 3,
    rowSpan = total.length;
  for (let i = 0; i < rowSpan; i++) {
    const item = total[i];
    const {
      currencyName,
      turnover,
      betCount,
      amount,
      sharingAmount
    } = item;
    totalRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
      key: currencyName,
      className: "fixed-table-total"
    }, i === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
      className: "center-align",
      rowSpan: rowSpan,
      colSpan: colSpan
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Total')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
      title: currencyName,
      className: "center-align",
      colSpan: colSpan
    }, currencyName), buildCommonRow(turnover, betCount, amount, sharingAmount)));
  }
  const dataSummary = data.totalSummary;
  const summaryColSpan = colSpan * 2;
  totalRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    key: `tr-grandtotal`,
    className: "fixed-table-grant-total"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    title: `Total in ${dataSummary.currencyName}`,
    className: "center-align",
    colSpan: summaryColSpan
  }, `${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Totalin')} ${dataSummary.currencyName}`), buildCommonRow(dataSummary.turnover, dataSummary.betCount, dataSummary.amount, dataSummary.sharingAmount)));
  return totalRows;
};
const buildDataRow = (dataItem, drilldownLevel, handleDrilldown, handleDrilldownBetlist) => {
  const {
    index,
    indexRowSpan,
    curencyRowSpan,
    productRowSpan,
    date,
    dateString,
    productName,
    betCount,
    turnover,
    amount,
    sharingAmount,
    custId,
    username,
    nickname,
    promotionName,
    currency,
    currencyName,
    productCode
  } = dataItem;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    key: `row-${Object(uuid__WEBPACK_IMPORTED_MODULE_5__["v4"])()}`
  }, indexRowSpan > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align",
    rowSpan: indexRowSpan
  }, index), indexRowSpan > 0 && drilldownLevel === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align",
    rowSpan: indexRowSpan
  }, dateString), indexRowSpan > 0 && drilldownLevel === 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align",
    rowSpan: indexRowSpan
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    onClick: e => handleDrilldownBetlist(e, custId, nickname, username)
  }, nickname)), indexRowSpan > 0 && drilldownLevel === 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align",
    rowSpan: indexRowSpan
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    onClick: e => handleDrilldownBetlist(e, custId, nickname, username)
  }, username)), curencyRowSpan > 0 && drilldownLevel === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align",
    rowSpan: curencyRowSpan
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    onClick: e => handleDrilldown(e, currency, currencyName, date)
  }, currencyName)), curencyRowSpan > 0 && drilldownLevel === 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align",
    rowSpan: curencyRowSpan
  }, currencyName), productRowSpan > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align",
    rowSpan: productRowSpan
  }, productName), drilldownLevel === 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align"
  }, promotionName), buildCommonRow(turnover, betCount, amount, sharingAmount, productCode));
};
const buildCommonRow = (turnover, betCount, amount, sharingAmount, productCode) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(turnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].format(betCount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${amount < 0 ? "negative" : ""}`
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(amount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${sharingAmount < 0 ? "negative" : ""}`
  }, productCode === ProductTIP ? "-" : _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(sharingAmount)));
};
const renderDetailHeader = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
    style: {
      height: 32
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 60
  }, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 140
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].date), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 230
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].refno), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 220
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].product), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 290
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].promotionType), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 170
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].turnover), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 190
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].customerAmount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 190
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].licSharingAmount));
};
const renderDetailDataSection = dataList => {
  const dataRows = [];
  for (let i = 0; i < dataList.length; i++) {
    dataRows.push(buildDetailDataRow(dataList[i], i));
  }
  return dataRows;
};
const buildDetailDataRow = (dataItem, index) => {
  const {
    dateString,
    productName,
    turnover,
    amount,
    sharingAmount,
    refno,
    promotionName,
    productCode
  } = dataItem;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    key: `row-${Object(uuid__WEBPACK_IMPORTED_MODULE_5__["v4"])()}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, ++index), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, dateString), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, refno), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align"
  }, productName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align"
  }, promotionName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(turnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${amount < 0 ? "negative" : ""}`
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(amount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${sharingAmount < 0 ? "negative" : ""}`
  }, productCode === ProductTIP ? "-" : _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(sharingAmount)));
};
const renderDetailFooter = data => {
  const dataSummary = data.totalSummary;
  const summaryColSpan = 5;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    key: `tr-grandtotal`,
    className: "fixed-table-total"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align",
    colSpan: summaryColSpan
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Total')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(dataSummary.turnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${dataSummary.amount < 0 ? "negative" : ""}`
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(dataSummary.amount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${dataSummary.sharingAmount < 0 ? "negative" : ""}`
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(dataSummary.sharingAmount)));
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/common/service.js":
/*!**********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/common/service.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Service; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_report__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/report */ "./www/js/source/reactpages/lib/report.js");



class Service {
  static getTitle(fromDate, toDate, currency, baseCurrency, ProductCodeList, username) {
    const dateRangeText = fromDate && toDate ? `, ${_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateToString(fromDate)} → ${_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateToString(toDate)}` : '';
    var currencyName = baseCurrency === '' ? currency : baseCurrency;
    const baseCurrencyText = ` - ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Viewin").replace("{0}", currencyName)}`;
    const productText = ` (${ProductCodeList.replaceAll(",", ", ")})`;
    var userNameText = username === '' ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('LicenseeW_L') : `${username},`;
    return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("ExtraPayout") + dateRangeText + baseCurrencyText + ', ' + userNameText + productText;
  }
  static getDetailTitle(fromDate, toDate, currency, baseCurrency, nickname, username) {
    const dateRangeText = fromDate && toDate ? `, ${_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateToString(fromDate)} → ${_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateToString(toDate)}` : '';
    var currencyName = baseCurrency === '' ? currency : baseCurrency;
    const baseCurrencyText = ` - ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Viewin").replace("{0}", currencyName)}`;
    var userNameText = username === '' ? '' : `${nickname}(${username}) `;
    return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("PromotionDetails") + dateRangeText + '- ' + userNameText + baseCurrencyText;
  }
  static getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
  }
  static showErrorMsg() {
    alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('ErrorProcessingMsg'));
  }
  static getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate) {
    return _jsroot_lib_report__WEBPACK_IMPORTED_MODULE_2__["default"].getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate);
  }
}

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/components/AppContainer.jsx":
/*!********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/components/AppContainer.jsx ***!
  \********************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/pages/extrapayout/components/FormFilter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/pages/extrapayout/components/DataGrid.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");






const AppContainer = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "winlossbyleague-report"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isLoading: props.isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};
function mapStateToProps(state) {
  return Object.assign({}, {
    isLoading: state.isLoading
  });
}
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps)(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/components/DataGrid.jsx":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/components/DataGrid.jsx ***!
  \****************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/extrapayout/actions/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_gridUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/gridUtils */ "./www/js/source/reactpages/pages/extrapayout/common/gridUtils.js");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _jsroot_components_popup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/popup */ "./www/js/source/reactpages/components/popup/index.jsx");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/constants */ "./www/js/source/reactpages/pages/extrapayout/common/constants.js");
/* harmony import */ var _common_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/service */ "./www/js/source/reactpages/pages/extrapayout/common/service.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _Detail__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Detail */ "./www/js/source/reactpages/pages/extrapayout/components/Detail.jsx");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _9softstudio_react_breadcrumb__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @9softstudio/react-breadcrumb */ "./node_modules/@9softstudio/react-breadcrumb/dist/index.js");
/* harmony import */ var _9softstudio_react_breadcrumb__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_breadcrumb__WEBPACK_IMPORTED_MODULE_14__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }















const DataGrid = props => {
  const [showBetList, setShowBetList] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [betListData, setBetListData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const [betlistTitle, setBetlistTitle] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [pagingOption, setPagingOption] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_common_constants__WEBPACK_IMPORTED_MODULE_9__["DefaultPagingOption"]);
  const breadcrumbItems = [{
    label: _common_constants__WEBPACK_IMPORTED_MODULE_9__["BreadcrumbText"].main,
    value: _common_constants__WEBPACK_IMPORTED_MODULE_9__["ReportLevel"].MAIN
  }, {
    label: _common_constants__WEBPACK_IMPORTED_MODULE_9__["BreadcrumbText"].customer,
    value: _common_constants__WEBPACK_IMPORTED_MODULE_9__["ReportLevel"].CUSTOMER
  }];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);
  const {
    data,
    totalRows
  } = props.reportData;
  if (!data) {
    return null;
  }
  if (!data.length) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_6__["default"], null);
  }
  const {
    requestParam,
    detailParams
  } = props;
  const _handleDrilldown = (e, currency, currencyName, drilldownDate) => {
    e.preventDefault();
    const selectedDate = new Date(drilldownDate);
    const dateValue = _common_service__WEBPACK_IMPORTED_MODULE_10__["default"].getFormattedDate(selectedDate);
    const drilldownFromDate = requestParam.ReportBy == 1 ? drilldownDate : getDrilldownFromDate(selectedDate, requestParam.FromDate);
    const drilldownFromDateValue = requestParam.ReportBy == 1 ? dateValue : _common_service__WEBPACK_IMPORTED_MODULE_10__["default"].getFormattedDate(drilldownFromDate);
    const drilldownToDate = requestParam.ReportBy == 1 ? drilldownDate : getDrilldownToDate(selectedDate, requestParam.ToDate);
    const drilldownToDateValue = requestParam.ReportBy == 1 ? dateValue : _common_service__WEBPACK_IMPORTED_MODULE_10__["default"].getFormattedDate(drilldownToDate);
    const newRequestParam = _objectSpread(_objectSpread({}, requestParam), {}, {
      CurrencyIdList: currency,
      DrillDownFromDate: drilldownFromDateValue,
      DrillDownToDate: drilldownToDateValue,
      DrillDownLevel: _common_constants__WEBPACK_IMPORTED_MODULE_9__["ReportLevel"].CUSTOMER
    });
    const title = _common_service__WEBPACK_IMPORTED_MODULE_10__["default"].getTitle(drilldownFromDateValue, drilldownToDateValue, currencyName, newRequestParam.BaseCurrencyName, newRequestParam.ProductCodeList, newRequestParam.Username);
    props.setReportTitle(title);
    props.setRequestParam(newRequestParam);
    props.toggleLoader(true);
    props.getReportData(_common_constants__WEBPACK_IMPORTED_MODULE_9__["ApiUrl"].REPORT_DATA_URL, newRequestParam);
  };
  const _handleDrilldownBetlist = (e, custId, nickname, username) => {
    e.preventDefault();
    const detailParams = _objectSpread(_objectSpread({}, requestParam), {}, {
      PageSize: 50,
      PageIndex: 1,
      IsExportExcel: false,
      CustId: custId,
      SystemId: username,
      ExternalId: nickname
    });
    const viewIn = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("Viewin").replace("{0}", requestParam.currencyName ? requestParam.currencyName : requestParam.BaseCurrencyName);
    const fromDate = new Date(requestParam.DrillDownFromDate);
    const fromDateValue = _common_service__WEBPACK_IMPORTED_MODULE_10__["default"].getFormattedDate(fromDate);
    const toDate = new Date(requestParam.DrillDownToDate);
    const toDateValue = _common_service__WEBPACK_IMPORTED_MODULE_10__["default"].getFormattedDate(toDate);
    const betlistTitle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("PromotionDetails"), ", ", fromDateValue, " \u2192 ", toDateValue, " - ", nickname, "(", username, ") -", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "base-currency-title"
    }, viewIn));
    setBetlistTitle(betlistTitle);
    props.setDetailParams(detailParams);
    props.toggleLoader(true);
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_13__["default"].postReportData(_common_constants__WEBPACK_IMPORTED_MODULE_9__["ApiUrl"].REPORT_DETAIL_DATA_URL, detailParams).then(response => {
      setShowBetList(true);
      setBetListData(response.data);
      props.toggleLoader(false);
    }).catch(error => {
      _common_service__WEBPACK_IMPORTED_MODULE_10__["default"].showErrorMsg();
      props.toggleLoader(false);
    });
  };
  const getDrilldownToDate = (selectedDate, toDate) => {
    var paramTodate = new Date(toDate);
    if (selectedDate.getFullYear() === paramTodate.getFullYear() && selectedDate.getMonth() === paramTodate.getMonth()) {
      return new Date(toDate);
    } else {
      return new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    }
  };
  const getDrilldownFromDate = (selectedDate, fromDate) => {
    var paramFromdate = new Date(fromDate);
    if (selectedDate.getFullYear() === paramFromdate.getFullYear() && selectedDate.getMonth() === paramFromdate.getMonth()) {
      return paramFromdate;
    } else {
      return selectedDate;
    }
  };
  const closeBetListPopup = () => {
    setShowBetList(false);
    setBetListData(null);
    props.setDetailParams(null);
  };
  const drillDownData = level => {
    const currentLevel = requestParam.DrillDownLevel;
    if (currentLevel === level || level !== _common_constants__WEBPACK_IMPORTED_MODULE_9__["ReportLevel"].MAIN) {
      return;
    }
    props.toggleLoader(true);
    const newRequestParam = _objectSpread(_objectSpread({}, requestParam), {}, {
      PageSize: 50,
      PageIndex: 1,
      CurrencyIdList: props.selectedCurrency,
      DrillDownLevel: level
    });
    const title = _common_service__WEBPACK_IMPORTED_MODULE_10__["default"].getTitle(newRequestParam.FromDate, newRequestParam.ToDate, newRequestParam.CurrencyName, newRequestParam.BaseCurrencyName, newRequestParam.ProductCodeList, newRequestParam.Username);
    props.setReportTitle(title);
    props.setRequestParam(newRequestParam);
    props.getReportData(_common_constants__WEBPACK_IMPORTED_MODULE_9__["ApiUrl"].REPORT_DATA_URL, newRequestParam);
  };
  const _handePaging = (pageSize, pageIndex, lastIndex) => {
    props.toggleLoader(true);
    const newRequestParam = _objectSpread(_objectSpread({}, requestParam), {}, {
      PageIndex: pageIndex,
      PageSize: pageSize
    });
    setPagingOption(_objectSpread(_objectSpread({}, pagingOption), {}, {
      PageIndex: pageIndex,
      PageSize: pageSize,
      LastIndex: lastIndex
    }));
    props.setRequestParam(newRequestParam);
    props.getReportData(_common_constants__WEBPACK_IMPORTED_MODULE_9__["ApiUrl"].REPORT_DATA_URL, newRequestParam);
  };
  var lastIndex = requestParam.DrillDownLevel === _common_constants__WEBPACK_IMPORTED_MODULE_9__["ReportLevel"].CUSTOMER && pagingOption.PageIndex > 1 ? pagingOption.LastIndex : 0;
  var {
    bodyData,
    index
  } = Object(_common_gridUtils__WEBPACK_IMPORTED_MODULE_5__["renderDataSection"])(data, requestParam.DrillDownLevel, _handleDrilldown, _handleDrilldownBetlist, lastIndex);
  var currenPagingOption = {
    PageIndex: requestParam.PageIndex,
    PageSize: requestParam.PageSize,
    TotalItem: totalRows,
    PageList: pagingOption.PageList
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "result-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_breadcrumb__WEBPACK_IMPORTED_MODULE_14__["Breadcrumb"], {
    items: breadcrumbItems,
    value: requestParam.DrillDownLevel,
    onChange: item => drillDownData(item.value)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_7__["default"], {
    content: props.reportTitle
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Table"], {
    key: `table-${requestParam.DrillDownLevel}-${props.reloadReport}`,
    minWidth: 650,
    autoWidth: true,
    autoHeight: true,
    header: Object(_common_gridUtils__WEBPACK_IMPORTED_MODULE_5__["renderHeader"])(requestParam.DrillDownLevel),
    body: bodyData,
    footer: Object(_common_gridUtils__WEBPACK_IMPORTED_MODULE_5__["renderFooter"])(props.reportData, requestParam.DrillDownLevel),
    containerPadding: 30,
    onSort: (sortBy, sortOrder) => props.setRequestParam(_objectSpread(_objectSpread({}, requestParam), {}, {
      sortBy,
      sortOrder
    })),
    isPaging: requestParam.DrillDownLevel === _common_constants__WEBPACK_IMPORTED_MODULE_9__["ReportLevel"].CUSTOMER,
    pageOption: currenPagingOption,
    shouldResetScrollPosition: true,
    onPaging: (pageIndex, pageSize) => _handePaging(pageSize, pageIndex, index)
  }), requestParam.DrillDownLevel === _common_constants__WEBPACK_IMPORTED_MODULE_9__["ReportLevel"].CUSTOMER && showBetList && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_popup__WEBPACK_IMPORTED_MODULE_8__["default"], {
    isShow: showBetList,
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("PromotionDetails"),
    width: 1050,
    height: 600,
    onClose: closeBetListPopup
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Detail__WEBPACK_IMPORTED_MODULE_12__["default"], {
    data: betListData,
    title: betlistTitle,
    param: detailParams
  })));
};
function mapDispatchToProps(dispatch) {
  const {
    setRequestParam,
    toggleLoader,
    getReportData,
    setReportTitle,
    setDetailParams
  } = _actions__WEBPACK_IMPORTED_MODULE_3__["default"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setRequestParam,
    toggleLoader,
    getReportData,
    setReportTitle,
    setDetailParams
  }, dispatch);
}
function mapStateToProps(state) {
  const {
    requestParam,
    reportData,
    reportTitle,
    reloadReport,
    detailParams,
    selectedCurrency
  } = state;
  return Object.assign({}, {
    requestParam,
    reportData,
    reportTitle,
    reloadReport,
    detailParams,
    selectedCurrency
  });
}
;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/components/Detail.jsx":
/*!**************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/components/Detail.jsx ***!
  \**************************************************************************/
/*! exports provided: Detail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Detail", function() { return Detail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _layouts_BetListPopupLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../layouts/BetListPopupLayout */ "./www/js/source/reactpages/layouts/BetListPopupLayout.jsx");
/* harmony import */ var _components_NoDataTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _actions_loaderAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _common_gridUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/gridUtils */ "./www/js/source/reactpages/pages/extrapayout/common/gridUtils.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/constants */ "./www/js/source/reactpages/pages/extrapayout/common/constants.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_12__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }













const Detail = props => {
  const {
    title,
    data,
    param,
    toggleLoader
  } = props;
  const exportDetailExcel = event => {
    event.preventDefault();
    if (!param) {
      return;
    }
    const exportRequestParam = _objectSpread({}, param);
    toggleLoader(true);
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_8__["default"].getReportFile(_common_constants__WEBPACK_IMPORTED_MODULE_11__["ApiUrl"].EXPORT_REPORT_DETAIL_DATA_URL, exportRequestParam).then(response => {
      react_toastify__WEBPACK_IMPORTED_MODULE_12__["toast"].dismiss();
      const NoContentStatusCode = 204;
      if (response.status === NoContentStatusCode) {
        alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getSingleResource("NoInfo"));
      } else {
        const fileName = "PromotionDetails.xls";
        _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_9__["default"].downloadFile(response.data, fileName);
      }
      toggleLoader(false);
    }).catch(error => {
      alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getSingleResource("ErrorProcessingMsg"));
      toggleLoader(false);
    });
  };
  const betlistTitle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, title, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-excel right",
    onClick: exportDetailExcel,
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getSingleResource("ExportToExcel")
  }));
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layouts_BetListPopupLayout__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: betlistTitle
  }, data && data.data.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Table"], {
    autoWidth: false,
    autoHeight: false,
    width: 980,
    bodyHeight: 430,
    header: Object(_common_gridUtils__WEBPACK_IMPORTED_MODULE_7__["renderDetailHeader"])(),
    body: Object(_common_gridUtils__WEBPACK_IMPORTED_MODULE_7__["renderDetailDataSection"])(data.data),
    footer: Object(_common_gridUtils__WEBPACK_IMPORTED_MODULE_7__["renderDetailFooter"])(data)
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
};
function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    toggleLoader: _actions_loaderAction__WEBPACK_IMPORTED_MODULE_6__["toggleLoader"]
  }, dispatch);
}
;
function mapStateToProps(state) {
  return {};
}
;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Detail));

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/components/FormFilter.jsx":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/components/FormFilter.jsx ***!
  \******************************************************************************/
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
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/extrapayout/actions/index.js");
/* harmony import */ var _jsroot_components_date_range__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/date-range */ "./www/js/source/reactpages/components/date-range/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @9softstudio/react-multiselect */ "./node_modules/@9softstudio/react-multiselect/dist/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/components/UserGuide */ "./www/js/source/reactpages/components/UserGuide.jsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../common/constants */ "./www/js/source/reactpages/pages/extrapayout/common/constants.js");
/* harmony import */ var _common_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../common/service */ "./www/js/source/reactpages/pages/extrapayout/common/service.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

















const FormFilter = props => {
  const [isConvertAllToBaseCurrency, setConvertAllToBaseCurrency] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const [isExcludeTest, setExcludeTest] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const [username, setUsername] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [baseCurrencyList, setBaseCurrencyList] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].baseCurrencyList);
  const [reportBy, setReportBy] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(1);
  const {} = props;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    onChangeProduct(props.selectedProduct);
  }, []);
  const _onChangeDateRange = (range, isValid = true) => {
    if (isValid) {
      props.setDateRange(range);
    } else {
      const message = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("DateRangeExceedMsg").replace("{0}", _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].dateConstraint.limitedMonthRange);
      alert(message);
    }
  };
  const _renderDateFilter = () => {
    const dateConstraint = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].dateConstraint;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_range__WEBPACK_IMPORTED_MODULE_9__["DateRange"], {
      startDate: props.dateRange.fromDate,
      endDate: props.dateRange.toDate,
      minDate: dateConstraint.minDate,
      maxDate: dateConstraint.maxDate,
      today: props.dateRange.toDate,
      limitedMonthRange: dateConstraint.limitedMonthRange,
      onChange: _onChangeDateRange
    });
  };
  const _renderBaseCurrencySelectList = () => {
    const selectedBaseCurrency = props.selectedBaseCurrency;
    return baseCurrencyList && baseCurrencyList.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
      instanceId: "baseCurrency",
      value: selectedBaseCurrency,
      options: baseCurrencyList,
      onChange: item => props.setSelectedBaseCurrency(item.value)
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);
  };
  const _renderProductSelectList = () => {
    const productOptions = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].productOptions;
    return productOptions && productOptions.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_10___default.a, {
      id: "ProductList",
      hasSearchBox: true,
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].currentLanguage,
      dataSource: productOptions,
      keyField: "Code",
      valueField: "Name",
      statusField: "Status",
      onChange: (currentItem, selectedItemsKey) => onChangeProduct(selectedItemsKey)
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);
  };
  const _renderPromotionTypeList = () => {
    const promotionTypeList = props.promotionTypeList;
    return promotionTypeList && promotionTypeList.length >= 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_10___default.a, {
      id: "PromotionTypeList",
      hasSearchBox: true,
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].currentLanguage,
      dataSource: promotionTypeList,
      keyField: "value",
      valueField: "label",
      statusField: "status",
      onChange: (currentItem, selectedItemsKey) => props.setSelectedPromotionTypes(selectedItemsKey)
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);
  };
  const onChangeProduct = productCode => {
    props.setSelectedProduct(productCode);
    props.getPromotionTypeList(productCode);
  };
  const _renderCurrencySelectList = () => {
    const currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].currencyList;
    return currencyList && currencyList.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_10___default.a, {
      id: "CurrencyList",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].currentLanguage,
      dataSource: currencyList,
      keyField: "Id",
      valueField: "Value",
      statusField: "Status",
      onChange: (currentItem, selectedItemsKey) => onChangeCurrency(selectedItemsKey)
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);
  };
  const onChangeCurrency = currencyIdList => {
    let baseCurrency = "";
    let newBaseCurrencyList;
    if (!currencyIdList || currencyIdList.indexOf(',') > 0) {
      // none or multi currencies
      newBaseCurrencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].baseCurrencyList;
      baseCurrency = newBaseCurrencyList.find(x => x.label === props.selectedBaseCurrency) ? props.selectedBaseCurrency : _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].defaultBaseCurrency;
      setBaseCurrencyList(newBaseCurrencyList);
    } else {
      const currencyName = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].currencyList.find(x => x.Id == currencyIdList).Value;
      baseCurrency = currencyName;
      if (!baseCurrencyList.find(x => x.label === currencyName)) {
        newBaseCurrencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].baseCurrencyList.slice(0);
        newBaseCurrencyList.push({
          value: baseCurrency,
          label: currencyName
        });
        setBaseCurrencyList(newBaseCurrencyList);
      } else {
        baseCurrency = currencyName;
      }
    }
    props.setSelectedCurrency(currencyIdList);
    props.setSelectedBaseCurrency(baseCurrency);
  };
  const showUserGuide = () => {
    const userGuideContent = props.userGuideContent;
    if (!userGuideContent || userGuideContent.length === 0) {
      props.getUserGuideContent('ExtraPayout');
    }
  };
  const _renderUserGuide = () => {
    const userGuideContent = props.userGuideContent;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_12__["default"], {
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("UserGuide"),
      contentTitle: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("ExtraPayout"),
      onClick: showUserGuide,
      content: userGuideContent
    });
  };
  const onSubmit = event => {
    event.preventDefault();
    const params = getParams();
    if (!params) {
      return;
    }
    react_toastify__WEBPACK_IMPORTED_MODULE_13__["toast"].dismiss();
    const title = _common_service__WEBPACK_IMPORTED_MODULE_15__["default"].getTitle(params.FromDate, params.ToDate, params.CurrencyName, params.BaseCurrencyName, params.ProductCodeList, params.Username);
    props.setReportTitle(title);
    props.setRequestParam(params);
    props.toggleLoader(true);
    props.getReportData(_common_constants__WEBPACK_IMPORTED_MODULE_14__["ApiUrl"].REPORT_DATA_URL, params);
  };
  const getParams = () => {
    if (!isValidModel()) {
      return null;
    }
    const {
      fromDate,
      toDate
    } = props.dateRange;
    const {
      PageSize,
      SortBy,
      SortOrder
    } = props.requestParam;
    const selectedCurrencyArray = props.selectedCurrency.split(',');
    const currencyText = selectedCurrencyArray.length === _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].currencyList.length ? 'All' : _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].currencyList.filter(item => selectedCurrencyArray.includes(item.Id.toString())).map(item => item.Value).join(',');
    const baseCurrency = baseCurrencyList.find(x => x.value === props.selectedBaseCurrency);
    return {
      PageSize: 50,
      PageIndex: 1,
      FromDate: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__["default"].convertDateToString(fromDate),
      ToDate: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__["default"].convertDateToString(toDate),
      ProductCodeList: props.selectedProduct,
      CurrencyIdList: props.selectedCurrency,
      BaseCurrency: props.selectedBaseCurrency,
      ReportBy: reportBy,
      PromotionTypeIdList: props.selectedPromotionTypes,
      Username: username,
      SortBy: SortBy,
      SortOrder: SortOrder,
      IsConvertAllToBaseCurrency: isConvertAllToBaseCurrency,
      BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
      CurrencyName: currencyText ? currencyText : '',
      DrillDownLevel: _common_constants__WEBPACK_IMPORTED_MODULE_14__["ReportLevel"].MAIN,
      IsExcludedTestData: isExcludeTest
    };
  };
  const isValidModel = () => {
    const result = !!props.selectedProduct && !!props.selectedCurrency && !!props.selectedPromotionTypes && !!props.selectedBaseCurrency;
    return result;
  };
  const exportExcel = event => {
    event.preventDefault();
    let exportParam = props.requestParam;
    if (!exportParam || _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__["default"].isEmptyObject(exportParam)) {
      exportParam = getParams();
    }
    const exportRequestParam = _objectSpread({}, exportParam);
    props.toggleLoader(true);
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_16__["default"].getReportFile(_common_constants__WEBPACK_IMPORTED_MODULE_14__["ApiUrl"].EXPORT_REPORT_DATA_URL, exportRequestParam).then(response => {
      react_toastify__WEBPACK_IMPORTED_MODULE_13__["toast"].dismiss();
      const NoContentStatusCode = 204;
      if (response.status === NoContentStatusCode) {
        alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("NoInfo"));
      } else {
        const fileName = "ExtraPayout.xls";
        _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__["default"].downloadFile(response.data, fileName);
      }
      props.toggleLoader(false);
    }).catch(error => {
      alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("ErrorProcessingMsg"));
      props.toggleLoader(false);
    });
  };
  const excelButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-excel right",
    onClick: exportExcel,
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("ExportToExcel")
  }), _renderUserGuide());
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "page-filter",
    stickyFooter: excelButton
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_13__["ToastContainer"], {
    autoClose: 10000,
    pauseOnFocusLoss: false,
    style: {
      width: "500px"
    },
    transition: react_toastify__WEBPACK_IMPORTED_MODULE_13__["Flip"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("Date")), _renderDateFilter())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("Product"), " *"), _renderProductSelectList())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-4 col-xl-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("PromotionType")), _renderPromotionTypeList())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("Currency")), _renderCurrencySelectList())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("BaseCurrency")), _renderBaseCurrencySelectList()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("Username")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "input-text",
    id: "Username",
    name: "Username",
    type: "text",
    value: username,
    placeholder: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("ExternalIdOrSystemId"),
    onChange: event => setUsername(event.target.value)
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("ReportBy")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    value: 1,
    checked: reportBy == 1,
    name: "ReportBy",
    id: "reportbydaily",
    onChange: () => setReportBy(1)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "reportbydaily"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("Daily")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    value: 2,
    name: "ReportBy",
    id: "reportbymonthly",
    checked: reportBy == 2,
    onChange: () => setReportBy(2)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "reportbymonthly"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("Monthly")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_11__["default"], {
    id: "ConvertAllFiguresToBaseCurrency",
    checked: isConvertAllToBaseCurrency,
    onChange: checked => setConvertAllToBaseCurrency(checked),
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("ConvertAllFiguresToBaseCurrency")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_11__["default"], {
    id: "ExcludeTest",
    checked: isExcludeTest,
    onChange: checked => setExcludeTest(checked),
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("ExcludeTestData")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    disabled: !isValidModel(),
    className: "btn btn-submit",
    onClick: onSubmit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("Submit"))))))));
};
function mapStateToProps(state) {
  const {
    requestParam,
    dateRange,
    selectedProduct,
    promotionTypeList,
    selectedPromotionTypes,
    selectedCurrency,
    baseCurrencyList,
    selectedBaseCurrency,
    selectedStatus,
    userGuideContent
  } = state;
  return Object.assign({}, {
    requestParam,
    dateRange,
    selectedProduct,
    promotionTypeList,
    selectedPromotionTypes,
    selectedCurrency,
    baseCurrencyList,
    selectedBaseCurrency,
    selectedStatus,
    userGuideContent
  });
}
function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_8__["default"], dispatch);
}
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/components/index.jsx":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/components/index.jsx ***!
  \*************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/pages/extrapayout/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/index.js */ "./www/js/source/reactpages/pages/extrapayout/reducers/index.js");
/* harmony import */ var _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/constants */ "./www/js/source/reactpages/pages/extrapayout/common/constants.js");







const defaultState = Object.assign({}, window.initialState, {
  userGuideContent: '',
  reportFilter: {
    PageSize: _common_constants__WEBPACK_IMPORTED_MODULE_6__["DefaultPageSize"]
  }
});
const store = _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers_index_js__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);
const App = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};
Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/reducers/dataReducer.js":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/reducers/dataReducer.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/pages/extrapayout/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const reportData = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_0__["SET_REPORT_DATA"]](state, action) {
    return action.data;
  }
});
const reloadReport = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_0__["SET_RELOAD_REPORT"]](state, action) {
    return action.data;
  }
});
/* harmony default export */ __webpack_exports__["default"] = ({
  reportData,
  reloadReport
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/reducers/filterReducer.js":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/reducers/filterReducer.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/extrapayout/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const reportFilter = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(null, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_REPORT_FILTER"]](state, action) {
    return action.data;
  }
});
const detailParams = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(null, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_DETAIL_PARAMS"]](state, action) {
    return action.data;
  }
});
/* harmony default export */ __webpack_exports__["default"] = ({
  reportFilter,
  detailParams
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/reducers/index.js":
/*!**********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/reducers/index.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _filterReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterReducer */ "./www/js/source/reactpages/pages/extrapayout/reducers/filterReducer.js");
/* harmony import */ var _dataReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataReducer */ "./www/js/source/reactpages/pages/extrapayout/reducers/dataReducer.js");
/* harmony import */ var _promotionTypeReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./promotionTypeReducer */ "./www/js/source/reactpages/pages/extrapayout/reducers/promotionTypeReducer.js");
/* harmony import */ var _jsroot_reducers_productReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/reducers/productReducer */ "./www/js/source/reactpages/reducers/productReducer.js");
/* harmony import */ var _jsroot_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/reducers/currencyReducer */ "./www/js/source/reactpages/reducers/currencyReducer.js");
/* harmony import */ var _jsroot_reducers_baseCurrencyReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/reducers/baseCurrencyReducer */ "./www/js/source/reactpages/reducers/baseCurrencyReducer.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/reducers/userGuideReducer */ "./www/js/source/reactpages/reducers/userGuideReducer.js");
/* harmony import */ var _jsroot_reducers_dateRangeReducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/reducers/dateRangeReducer */ "./www/js/source/reactpages/reducers/dateRangeReducer.js");
/* harmony import */ var _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/reducers/requestParamReducer */ "./www/js/source/reactpages/reducers/requestParamReducer.js");
/* harmony import */ var _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/reducers/reportTitleReducer */ "./www/js/source/reactpages/reducers/reportTitleReducer.js");












/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_filterReducer__WEBPACK_IMPORTED_MODULE_1__["default"], _dataReducer__WEBPACK_IMPORTED_MODULE_2__["default"], _jsroot_reducers_productReducer__WEBPACK_IMPORTED_MODULE_4__, _jsroot_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_5__, _jsroot_reducers_baseCurrencyReducer__WEBPACK_IMPORTED_MODULE_6__, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_7__, _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_8__, _promotionTypeReducer__WEBPACK_IMPORTED_MODULE_3__["default"], _jsroot_reducers_dateRangeReducer__WEBPACK_IMPORTED_MODULE_9__, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_10__, _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_11__)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/extrapayout/reducers/promotionTypeReducer.js":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/extrapayout/reducers/promotionTypeReducer.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/extrapayout/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedPromotionTypes = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_PROMOTION_TYPES"]](state, action) {
    return action.data;
  }
});
const promotionTypeList = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_PROMOTION_TYPE_LIST"]](state, action) {
    return action.data;
  }
});
/* harmony default export */ __webpack_exports__["default"] = ({
  promotionTypeList,
  selectedPromotionTypes
});

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


const selectedBaseCurrency = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_BASECURRENCY"]](state, action) {
    return action.data;
  }
});
const baseCurrencyList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_BASECURRENCY_LIST"]](state, action) {
    return action.data;
  }
});

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


const selectedCurrency = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_CURRENCY"]](state, action) {
    return action.data;
  }
});

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


const dateRange = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_DATE_RANGE"]](state, action) {
    return action.data;
  }
});

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


const isLoading = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["TOGGLE_LOADER"]](state, action) {
    return action.data;
  }
});

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


const selectedProduct = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_PRODUCT"]](state, action) {
    return action.data;
  }
});

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


const reportTitle = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_REPORT_TITLE"]](state, action) {
    return action.data;
  }
});

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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


const requestParam = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_REQUEST_PARAM"]](state, action) {
    return _objectSpread({}, action.data);
  }
});

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


const userGuideContent = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["USER_GUIDE_CONTENT"]](state, action) {
    return action.data;
  }
});

/***/ })

/******/ });
//# sourceMappingURL=extrapayout.chunk.js.map