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
/******/ 		"www/js/build/dev/reactpages/bettingticketscenter/refno": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/bettingticketscenter/refno/components/index.jsx","lib/common"]);
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

const changeIsConvertAll = checked => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["CHANGE_IS_CONVERT_ALL"],
    data: checked
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
  return dispatch => {
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__["default"].postData(url, params).then(response => {
      response.data.timestamp = new Date().getTime();
      dispatch(setGridData(response.data));
    }).catch(error => {
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

const toggleLoader = show => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["TOGGLE_LOADER"],
    data: show
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
/* Live Status  */

const SET_PAGING_OPTION = 'SET_PAGING_OPTION';

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

const setUsername = value => {
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


const CheckBox = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef((props, ref) => {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox-group",
    ref: ref
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "checkbox",
    id: props.id,
    checked: props.checked,
    disabled: props.disabled,
    onChange: () => props.onChange(!props.checked)
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
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "loading-process default",
    style: {
      display: `${isLoading ? 'block' : 'none'}`
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



const NoDataTitle = ({
  title
}) => {
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




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
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const ReportTitle = (_ref) => {
  let {
    content,
    tag
  } = _ref,
      attrs = _objectWithoutProperties(_ref, ["content", "tag"]);

  const Tag = tag;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "report-title-container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





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
      contentTitle
    } = this.props;
    const isShow = this.state.isShow && content.length > 0;
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

}

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const DELAY_TIME_MILLISECOND = 300;
class AutoComplete extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onKeyDown", event => {
      if (!this.isShowSuggestionList) {
        return;
      }

      const selectedIndex = this.state.selectedIndex;

      switch (event.keyCode) {
        case 38:
          //up
          if (selectedIndex > 0) {
            this.setState({
              selectedIndex: selectedIndex - 1
            });
          }

          break;

        case 40:
          //down
          if (selectedIndex < this.state.suggestions.length - 1) {
            this.setState({
              selectedIndex: selectedIndex + 1
            });
          }

          break;

        case 13:
          //enter
          if (selectedIndex > -1) {
            const selectedItem = this.state.suggestions[selectedIndex];

            this._onSelect(selectedItem);
          }

          break;
      }
    });

    _defineProperty(this, "_clearState", () => {
      this.setState({
        suggestions: null,
        selectedIndex: -1
      });
    });

    _defineProperty(this, "_onSelect", selectedItem => {
      const {
        onSelect
      } = this.props;
      onSelect && onSelect(selectedItem);
      this.input.value = typeof selectedItem === "object" ? selectedItem.value : selectedItem;

      this._clearState();
    });

    _defineProperty(this, "_onChange", event => {
      const value = (this.input.value || "").trim();
      const {
        onInput
      } = this.props;
      onInput && onInput(value);

      if (value.length < 3) {
        this._clearState();

        return;
      }

      const cachedData = this.cacheData[value];

      if (cachedData) {
        this.setState({
          suggestions: cachedData
        });
        return;
      }

      const {
        url
      } = this.props;

      if (url) {
        this._getDataByUrl(url, value);
      }
    });

    this.state = {
      suggestions: null,
      selectedIndex: -1
    };
    this.input = null;
    this.cacheData = {};
    this.onChange = _utils_timer__WEBPACK_IMPORTED_MODULE_6__["default"].debounce(this._onChange, DELAY_TIME_MILLISECOND).bind(this);
  }

  get isShowSuggestionList() {
    return this.state.suggestions && this.state.suggestions.length > 0;
  }

  _setStateWithCaching(value, suggestionList) {
    if (this.props.cache) {
      const cacheKey = value.toLowerCase();
      this.cacheData[cacheKey] = suggestionList;
    }

    this.setState({
      suggestions: suggestionList
    });
  }

  _getDataByUrl(url, value) {
    const {
      responseDataField,
      queryParamName
    } = this.props;
    const apiUrl = `${url}?${queryParamName}=${value}`;
    axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(apiUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => {
      const data = responseDataField ? response.data[responseDataField] : response.data;

      this._setStateWithCaching(value, data);
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ac-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
      type: "text",
      className: "input-text"
    }, this.props.htmlAttributes, {
      onChange: this.onChange,
      onKeyDown: this._onKeyDown,
      ref: element => this.input = element
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

}

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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class SuggestionList extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  onSelect(selectedItem) {
    const {
      onSelect
    } = this.props;
    onSelect && onSelect(selectedItem);
  }

  _renderDataList() {
    return this.props.dataList.map((item, index) => {
      const className = index === this.props.selectedIndex ? "ac-item ac-item-active" : "ac-item";
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: `ac-item-${index}`,
        className: className,
        onClick: this.onSelect.bind(this, item)
      }, item && typeof item === "object" ? item.value : item);
    });
  }

  render() {
    const style = {
      width: this.props.width
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "suggestion-list",
      style: style
    }, this._renderDataList());
  }

}

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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class BetListDataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onSort", (sortBy, sortOrder) => {
      this.props.onSort && this.props.onSort(sortBy, sortOrder);
    });

    _defineProperty(this, "onPaging", (index, size) => {
      this.props.onPaging && this.props.onPaging(index, size);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.props.afterLoad && this.props.afterLoad();
    }
  }

  _getResource(key) {
    return this.props.getResourceFunc ? this.props.getResourceFunc(key) : key;
  }

  _getTotalCellClassName(column, value) {
    if (this.props.getTotalCellClassNameFunc) {
      return this.props.getTotalCellClassNameFunc(column, value);
    }

    return column === 'LicenseeWL' && value.substring(0, 1) === '-' ? 'negative' : '';
  }

  _getHeaderName(column) {
    return this.props.getHeaderNameFunc ? this.props.getHeaderNameFunc(column) : column;
  }

  _mapData(data) {
    return this.props.mappingDataFunc ? this.props.mappingDataFunc(data) : data;
  }

  _buildHeader() {
    let rows = [];
    const {
      columns,
      columnWidths,
      sortableColumns
    } = this.props;

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const isSortable = sortableColumns.indexOf(column) >= 0;

      const headerName = this._getHeaderName(column);

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

  _buildBody() {
    const {
      columns,
      columnAlignments,
      data
    } = this.props;
    let rows = [];

    for (let i = 0; i < data.length; i++) {
      const item = this._mapData(data[i]);

      let cells = [];

      for (let j = 0; j < columns.length; j++) {
        const column = columns[j];
        cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
          key: `${column}-${i}`,
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

  _buildFooter() {
    if (!this.props.totalColumns || !this.props.totalColumns.length) {
      return false;
    }

    const {
      columns,
      totalColumns,
      total,
      totalText,
      columnAlignments
    } = this.props;
    const startTotalIndex = columns.indexOf(totalColumns[0]);
    let rows = [];
    let cells = [];
    cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
      key: "total",
      className: "right-align",
      colSpan: startTotalIndex
    }, totalText));

    const item = this._mapData(total);

    for (let i = 0; i < totalColumns.length; i++) {
      const column = totalColumns[i];
      const columnIndex = columns.indexOf(column);

      const className = this._getTotalCellClassName(column, item[column]);

      cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
        key: `Sum${column}`,
        className: `${columnAlignments[columnIndex]} ${className}`,
        dangerouslySetInnerHTML: {
          __html: item[column]
        }
      }));
    }

    const blankRows = columns.length - totalColumns.length - startTotalIndex;

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

  _renderNodata() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "result-content"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "no-info-row center-align"
    }, this._getResource('NoInfo')));
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    const {
      data
    } = this.props;

    if (!data.length) {
      return this._renderNodata();
    }

    const {
      isPaging,
      pageOption,
      adjustedHeight
    } = this.props;
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

}

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
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




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
          attrs = _objectWithoutProperties(iconToggle, ["tag", "className", "style"]);

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
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `${this.props.className}`
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
    className: `popup-container ${isShow ? 'show' : 'hide'}`
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
    onClick: () => {
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

/***/ "./www/js/source/reactpages/components/utils/timer.js":
/*!************************************************************!*\
  !*** ./www/js/source/reactpages/components/utils/timer.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timer; });
const DEFAULT_TIME_DELAY_MILLISECOND = 500;
class Timer {
  static debounce(func, wait) {
    let timeout;
    return function () {
      const context = this,
            args = arguments;

      const later = () => {
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait || DEFAULT_TIME_DELAY_MILLISECOND);
    };
  }

}

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
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "container",
      className: "container-fluid"
    }, this.props.children);
  }

}

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







class BetListLayout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      isShowPopup: false,
      popupUrl: null,
      popupTitle: null
    };
  }

  componentDidMount() {
    window.onload = () => {
      window.logOpenBetlistEvent && window.logOpenBetlistEvent(this.props.pageName);
    };

    window.ViewResult = (matchid, raceNo, bettype, sporttype, refno, username, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid, transdecs) => {
      const title = this._getResource('Result');

      const defaultPlatform = 'd';
      const rootUrl = this.props.rootUrl;

      if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].RNG_GAME || sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].RNG_MINIGAME || sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].RNG_MOBILE) {
        const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getRngCasinoResultUrl(rootUrl);

        this._showRngCasinoResult(refno, url, title);
      } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].VOIDBRIDGE) {
        const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getVoidbridgeResultUrl(rootUrl, custid, extension2);

        this._showThirdPartyResult(url, title);
      } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].PP) {
        const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getPPResultUrl(rootUrl, custid, extension2);

        this._showThirdPartyResult(url, title);
      } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].CARDCLUB) {
        const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getCardClubResultUrl(rootUrl, custid, bettype, extension2);

        this._showThirdPartyResult(url, title);
      } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].SG) {
        const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSGResultUrl(rootUrl, custid, extension2);

        this._showThirdPartyResult(url, title);
      } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].VRG) {
        const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getVRGResultUrl(rootUrl, refno, defaultPlatform);

        this._showThirdPartyResult(url, title);
      } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].ALLBET) {
        const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getAllBetResultUrl(rootUrl, transdecs, extension2, bettype);

        this._openPopup(url, title);
      } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].GLOBALGAMING) {
        const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getGlobalGamingResultUrl(rootUrl, custid, extension2);

        this._showThirdPartyResult(url, title);
      } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].SXG) {
        const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSexyGamingResultUrl(rootUrl, transdecs, extension2, bettype);

        this._openPopup(url, title);
      } else {
        const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getResultUrl(rootUrl, matchid, raceNo, bettype, sporttype, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid);

        this._openPopup(url, title);
      }
    };

    window.showMP = transId => {
      let divEvent = document.querySelector('#divEvent_' + transId);
      divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket

      this._showMixParlayDetail(transId, divEvent);
    };

    window.showCombMP = (transId, index) => {
      let divEvent = document.querySelector('#divEvent_' + transId + '' + index);
      divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket

      this._showMixParlayDetail(transId, divEvent);
    }; // expand choice content


    window.showNewCombMP = (...args) => {
      this._showNewParlayDetail.apply(this, [this.props.rootUrl, ...args]);
    }; // expand choice content


    window.showSingleMatchParlayDetail = (...args) => {
      this._showSingleMatchParlayDetail.apply(this, [this.props.rootUrl, ...args]);
    }; // show detail popup (in choice column)


    window.showCombMPDetail = (transId, refNo, betId, custId, betTeam) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getParlayDetailUrl(rootUrl, transId, refNo, betId, custId, betTeam, baseCurrency);

      this._openPopup(url, betTeam);
    };

    window.ViewCashOutHistory = (transId, refNo, betType, betdaqId) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const {
        url,
        isCashOut
      } = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getCashOutHistoryPopupSetting(rootUrl, baseCurrency, transId, refNo, betType, betdaqId);

      const title = this._getResource(isCashOut ? 'CashOutDetails' : 'BoughtDetails');

      this._openPopup(url, title);
    };

    window.ShowBonusDetails = (refCode, transId) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getBonusDetailUrl(rootUrl, refCode, transId, baseCurrency);

      const title = this._getResource('TransactionDetail');

      this._openPopup(url, title);
    };

    window.showAGCasinoDetails = (transId, winlostDate, custId, transType) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getAGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

      const title = this._getResource('AGCasino') + ' - ' + this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

      this._openPopup(url, title);
    };

    window.showRnGCasinoDetails = (transId, winlostDate, custId, transType) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getRnGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

      const title = this._getResource('ProductCS') + ' - ' + this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

      this._openPopup(url, title);
    };

    window.showVoidBridgeDetails = (transId, winlostDate, custId, transType) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getVoidBridgeDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

      const title = this._getResource('ProductVB') + ' - ' + this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

      this._openPopup(url, title);
    };

    window.showTodayRunningBetsDetails = (transId, winlostDate, custId, transType) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getAllBetDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

      const title = this._getResource('ProductAB') + ' - ' + this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

      this._openPopup(url, title);
    };

    window.showColossusBetsDetails = (refNo, winlostDate, transId, custId, betCheck) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getColossusBetsDetailUrl(rootUrl, baseCurrency, refNo, winlostDate, transId, custId, betCheck);

      const title = this._getResource('TicketDetailOf').replace('{0}', refNo);

      this._openPopup(url, title);
    };

    window.showGlobalGaming = (transId, winlostDate, custId, transType) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getGlobalGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

      const title = this._getResource('ProductFW') + ' - ' + this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

      this._openPopup(url, title);
    };

    window.showPPDetails = (transId, winlostDate, custId, transType) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getPPDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

      const title = this._getResource('ProductPP') + ' - ' + this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

      this._openPopup(url, title);
    };

    window.showVideoPokerGameDetails = (transId, winlostDate, custId, transType) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getVideoPokerGameDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

      const title = this._getResource('ProductCC') + ' - ' + this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

      this._openPopup(url, title);
    };

    window.showSGDetails = (transId, winlostDate, custId, transType) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSGDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

      const title = this._getResource('ProductSG') + ' - ' + this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

      this._openPopup(url, title);
    };

    window.showSexyGamingBetDetails = (transId, winlostDate, custId, transType) => {
      const {
        rootUrl,
        baseCurrency
      } = this.props;
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSexyGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

      const title = this._getResource('ProductSXG') + ' - ' + this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

      this._openPopup(url, title);
    };
  }

  componentWillUnmount() {
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
    window.showSexyGamingBetDetails = undefined;
  }

  _getResource(key) {
    return this.props.getResourceFunc ? this.props.getResourceFunc(key) : key;
  }

  _formatDateString(dateString) {
    return this.props.formatDateStringFunc ? this.props.formatDateStringFunc(dateString) : dateString;
  }

  _beforeShow() {
    this.props.beforeShowFunc && this.props.beforeShowFunc();
  }

  _afterShow() {
    this.props.afterShowFunc && this.props.afterShowFunc();
  }

  _resolveClientUrl(relativeUrl) {
    return this.props.rootUrl + relativeUrl;
  }

  _showMixParlayDetail(transId, divEvent) {
    if (divEvent.style.display === 'none') {
      const url = this._resolveClientUrl('api/MixParlayBetList/Detail?transId=' + transId);

      this._beforeShow(); // this.props.toggleLoader(true);


      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(result => {
        let choice = '';
        const length = result.data.length;

        for (let i = 0; i < length; i++) {
          choice += result.data[i];

          if (i < length - 1) {
            choice += '<div class="line"></div>';
          }
        }

        divEvent.innerHTML = choice;
        divEvent.style.display = 'block';

        this._afterShow();
      }).catch(error => {
        this._afterShow();

        console.log(error);
      });
    } else {
      divEvent.style.display = 'none';
      divEvent.innerHTML = '';
    }
  }

  _showNewParlayDetail(rootUrl, transId, transIndex, refNo, handicap1, handicap2, betcheck, betteam, custId) {
    let divEvent = document.querySelector('#divEvent_' + transId + '' + transIndex);
    let nameDiv = document.querySelector('#combinationOfferName_' + transId + transIndex);
    divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket

    if (divEvent.style.display == 'none') {
      let url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getChoiceParlayDetailUrl(rootUrl, transId, refNo, handicap1, handicap2, betcheck, betteam, custId);

      this._beforeShow(); //this.props.toggleLoader(true);


      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(result => {
        let choice = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].buildChoiceParlayDetail(result.data);
        divEvent.innerHTML = choice;
        divEvent.style.display = 'block';
        nameDiv.style.display = 'none';

        this._afterShow();
      }).catch(error => {
        this._afterShow();

        console.log(error);
      });
    } else {
      divEvent.style.display = 'none';
      divEvent.innerHTML = '';
      nameDiv.style.display = 'block';
    }
  }

  _showThirdPartyResult(url, title) {
    this._beforeShow(); //this.props.toggleLoader(true);


    _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(result => {
      if (result.data !== '') {
        this._openPopup(result.data, title);
      }

      this._afterShow();
    }).catch(error => {
      this._afterShow();

      console.log(error);
    });
  }

  _showRngCasinoResult(refno, url, title) {
    this._beforeShow();

    _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].postData(url, {
      refno
    }).then(result => {
      if (result.data.Success) {
        if (result.data.Result === '') {
          return;
        }

        this._openPopup(result.data.Result, title);
      } else {
        alert(this._getResource("ErrorProcessingMsg"));
      }

      this._afterShow();
    }).catch(error => {
      this._afterShow();

      console.log(error);
    });
  }

  _showSingleMatchParlayDetail(rootUrl, transId, custId, status, transIndex) {
    const divEvent = document.querySelector('#divEvent_' + transId + '' + transIndex);

    if (divEvent.style.display == 'none') {
      const url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleMatchParlayDetailUrl(rootUrl, transId, custId, status);

      this._beforeShow();

      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(result => {
        const selection = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].buildSingleMatchParlayDetail(result.data);
        divEvent.innerHTML = selection;
        divEvent.style.display = 'block';

        this._afterShow();
      }).catch(function (error) {
        console.log(error);
      });
    } else {
      divEvent.style.display = 'none';
      divEvent.innerHTML = '';
    }
  }

  _openPopup(url, title) {
    this.setState({
      isShowPopup: true,
      popupUrl: url,
      popupTitle: title
    });
  }

  _closePopup() {
    this.setState({
      isShowPopup: false
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "betlist-layout"
    }, this.props.children, this.state.isShowPopup && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_popup__WEBPACK_IMPORTED_MODULE_3__["default"], {
      isShow: true,
      iframeUrl: this.state.popupUrl,
      title: this.state.popupTitle,
      width: 900,
      height: 600,
      onClose: () => this._closePopup()
    }));
  }

}

BetListLayout.propTypes = {
  pageName: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  rootUrl: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  getResourceFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  baseCurrency: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  beforeShowFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  afterShowFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  beforeShowFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  afterShowFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  formatDateStringFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
};
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



class BetList {
  _isFastMarket(bettype) {
    return bettype >= _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MIN_FASTMARKET && bettype <= _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MAX_FASTMARKET;
  }

  _getMixParlayResultUrl(rootUrl, refno, winlostdate, bettype) {
    let url = rootUrl + 'ResultReport/ResultPopup';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refno', refno);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'winlossdate', winlostdate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'bettype', bettype);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'matchid', 1);
    return url;
  }

  _getSportBookResultUrl(rootUrl, matchid, bettype, raceNo, sporttype, league, isOutright, extension1, extension2) {
    let url = rootUrl + 'ResultReport/ResultPopup';
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

  getResultUrl(rootUrl, matchid, raceNo, bettype, sporttype, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid) {
    bettype = Number(bettype);
    let isParlay = bettype === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MIXPARLAY || bettype === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].SYSTEMPARLAY || bettype === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MIXPARLAY_BETRADAR;
    let url = isParlay ? this._getMixParlayResultUrl(rootUrl, refnoMixParlay, winlostdate, bettype) : this._getSportBookResultUrl(rootUrl, matchid, bettype, raceNo, sporttype, league, isOutright, extension1, extension2, custid);
    return url;
  }

  getChoiceParlayDetailUrl(rootUrl, transId, refNo, handicap1, handicap2, betcheck, betteam, custId) {
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

  buildChoiceParlayDetail(response) {
    let choice = '';
    let length = response.Data === null ? 0 : response.Data.length;

    if (length > 0) {
      for (let i = 0; i < response.Texts.length; i++) {
        choice += response.Texts[i];
      }

      choice += '<div class="line"></div>';

      for (let i = 0; i < response.Data.length; i++) {
        let item = response.Data[i];
        choice += item;

        if (i < length - 1) {
          choice += '<div class="line"></div>';
        }
      }
    }

    return choice;
  }

  buildSingleMatchParlayDetail(data) {
    let selection = '';
    let length = data === null ? 0 : data.length;

    if (length > 0) {
      selection = '<div class="single-match-parlay-detail">';

      for (let i = 0; i < data.length; i++) {
        selection += data[i];
      }

      selection += '</div>';
    }

    return selection;
  }

  getParlayDetailUrl(rootUrl, transId, refNo, betId, custId, betTeam, baseCurrency) {
    if (Number(transId) === 0) {
      return;
    }

    var url = rootUrl + 'SystemParlayBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refno', refNo);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betteam', betTeam);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'basecurrency', baseCurrency);
    return url;
  }

  getSingleMatchParlayDetailUrl(rootUrl, transId, custId, status) {
    if (Number(transId) === 0) {
      return;
    }

    var url = rootUrl + 'api/SingleMatchParlayBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, "status", status);
    return url;
  }

  getCashOutHistoryPopupSetting(rootUrl, baseCurrency, transId, refNo, betType, betdaqId) {
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

  getBonusDetailUrl(rootUrl, refCode, transId, baseCurrency) {
    let url = rootUrl + 'BonusBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'RefCode', refCode);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'TransId', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getAGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
    let url = rootUrl + 'AGCasinoBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transid', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getRnGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
    let url = rootUrl + 'RnGCasinoBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getVoidBridgeDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
    let url = rootUrl + 'VoidbridgeBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getAllBetDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
    let url = rootUrl + 'AllBetBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transid', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getColossusBetsDetailUrl(rootUrl, baseCurrency, refNo, winlostDate, transId, custId, betCheck) {
    let url = rootUrl + 'ColossusBetBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refNo', refNo);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transid', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betCheck', betCheck);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getGlobalGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
    let url = rootUrl + 'GlobalGamingBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getPPDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
    let url = rootUrl + 'PragmaticPlayBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getVideoPokerGameDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
    let url = rootUrl + 'CardClubBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getSGDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
    let url = rootUrl + 'SGBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getSexyGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
    let url = rootUrl + 'SexyGamingBetList/Detail';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
    return url;
  }

  getRngCasinoResultUrl(rootUrl) {
    return rootUrl + 'ResultReport/ShowRngCasinoSingleWalletResult';
  }

  getVoidbridgeResultUrl(rootUrl, custid, gamePlayID) {
    let url = rootUrl + 'ResultReport/VoidbridgeResult';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gamePlayID', gamePlayID);
    return url;
  }

  getPPResultUrl(rootUrl, custid, gamePlayId) {
    let url = rootUrl + 'PPResultPopup/Index';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gamePlayId', gamePlayId);
    return url;
  }

  getCardClubResultUrl(rootUrl, custid, gameTypeId, transId3rd) {
    let url = rootUrl + 'CardClubResultPopup/Index';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gameTypeId', gameTypeId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId3rd', transId3rd);
    return url;
  }

  getSGResultUrl(rootUrl, custid, gamePlayId) {
    let url = rootUrl + 'SGResultPopup/Index';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gamePlayId', gamePlayId);
    return url;
  }

  getVRGResultUrl(rootUrl, gamePlayId, platform) {
    let url = rootUrl + 'VirtualGamesResultPopup/Index';
    console.log(gamePlayId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gamePlayId', gamePlayId);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'platform', platform);
    return url;
  }

  getAllBetResultUrl(rootUrl, transdesc, betcheck, bettype) {
    let url = rootUrl + 'ResultReport/AllBetResult';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betcheck', betcheck);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'bettype', bettype);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transdesc', encodeURIComponent(transdesc));
    return url;
  }

  getSexyGamingResultUrl(rootUrl, transdesc, matchCode, bettype) {
    let url = rootUrl + 'ResultReport/SexyGaming';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'matchCode', matchCode);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'bettype', bettype);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transdesc', encodeURIComponent(transdesc));
    return url;
  }

  getGlobalGamingResultUrl(rootUrl, custid, gameId) {
    let url = rootUrl + 'ResultReport/GlobalGamingResult';
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
    url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gameId', gameId);
    return url;
  }

}

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
const BetType = {
  CASHOUT: 911,
  MIXPARLAY: 9,
  SYSTEMPARLAY: 29,
  MIXPARLAY_BETRADAR: 2799,
  MIN_FASTMARKET: 221,
  MAX_FASTMARKET: 227
};
const SportType = {
  RNG_GAME: 208,
  RNG_MINIGAME: 209,
  RNG_MOBILE: 210,
  ALLBET: 211,
  VOIDBRIDGE: 212,
  PP: 248,
  GLOBALGAMING: 219,
  CARDCLUB: 165,
  SG: 247,
  VRG: 245,
  SXG: 243
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


class DataService {
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

  static getFile(url, params) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, params, {
      responseType: 'blob',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        '__RequestVerificationToken': _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].getXsrfToken()
      }
    });
  }

}

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
class QueryString {
  static _parseQueryString(queryString) {
    let args = queryString.split('&');
    let argsList = {};

    for (let i = 0; i < args.length; i++) {
      let arg = unescape(args[i]);

      if (arg.length > 0) {
        if (arg.indexOf('=') === -1) {
          argsList[arg.toLowerCase().trim()] = null;
        } else {
          let keyValuePair = arg.split('=');
          argsList[keyValuePair[0].toLowerCase().trim()] = keyValuePair[1].trim();
        }
      }
    }

    return argsList;
  }

  static _getQueryString(url) {
    var index = url.indexOf("?");
    return index < 0 ? "" : url.substring(index + 1, url.length);
  }

  static _getRawUrl(url) {
    var index = url.indexOf("?");
    return index < 0 ? url : url.substring(0, index);
  }

  static setParam(url, name, value) {
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

  static setParams(url, parameters) {
    for (var property in parameters) {
      if (parameters.hasOwnProperty(property)) {
        url = QueryString.setParam(url, property, parameters[property]);
      }
    }

    return url;
  }

  static getParam(url, name) {
    var queryString = QueryString._getQueryString(url);

    var args = QueryString._parseQueryString(queryString);

    for (var key in args) {
      if (key != null && key.toLowerCase() === name.toLowerCase()) {
        return args[key];
      }
    }

    return null;
  }

}

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
const configName = _constants_config__WEBPACK_IMPORTED_MODULE_1__["debuggingConfig"].name; // middleware that logs actions

const loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_0__["createLogger"])({
  predicate: (getState, action) => isDev || window[configName] && window[configName].env === _constants_config__WEBPACK_IMPORTED_MODULE_1__["debuggingConfig"].env && (!window[configName].actionFilter || window[configName].actionFilter === action.type)
});
class Logger {
  static getLoggerMiddleware() {
    return loggerMiddleware;
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

  static convertDateToString(date) {
    return typeof date === "string" ? date : date.format("MM/DD/YYYY");
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
    const enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"], // lets us dispatch() functions
    loggerMiddleware));
    return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, initialState, enhancer);
  }

}

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

const validateBaseCurrency = (baseCurrency = "", allowEmpty = true) => {
  return allowEmpty && !baseCurrency || !!baseCurrency && _AppData__WEBPACK_IMPORTED_MODULE_0__["default"].baseCurrencyList.find(x => x.value === baseCurrency);
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









const BaseDataGrid = props => {
  const {
    gridData,
    requestParam,
    reportTitle,
    toggleLoader,
    getGridData,
    setRequestParam,
    dataUrl,
    isPaging,
    columns,
    columnWidths,
    columnAlignments,
    totalText,
    totalColumns,
    sortableColumns
  } = props;
  const pageOption = {
    PageIndex: requestParam.PageIndex,
    PageSize: requestParam.PageSize,
    TotalItem: gridData && gridData.TotalRows ? gridData.TotalRows : _lib_constants__WEBPACK_IMPORTED_MODULE_7__["DefaultPageSize"],
    PageList: [_lib_constants__WEBPACK_IMPORTED_MODULE_7__["DefaultPageSize"], 100, 200, 300, 400, 500, 1000, 2000]
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    toggleLoader(false);
  }, [gridData]);

  const getHeaderName = column => {
    if (column === 'LicenseeWL') {
      return `${_lib_constants__WEBPACK_IMPORTED_MODULE_7__["HeaderText"].LicenseeWL}/${_lib_constants__WEBPACK_IMPORTED_MODULE_7__["HeaderText"].Comm}`;
    }

    if (column === 'WinLoss' && _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_8__["default"].isAllowedCustomerComm) {
      return `${_lib_constants__WEBPACK_IMPORTED_MODULE_7__["HeaderText"].WinLoss}/${_lib_constants__WEBPACK_IMPORTED_MODULE_7__["HeaderText"].Comm}`;
    }

    return _lib_constants__WEBPACK_IMPORTED_MODULE_7__["HeaderText"][column];
  };

  const onPaging = (index, size) => {
    const param = Object.assign({}, requestParam, {
      PageIndex: index,
      PageSize: size
    });
    getData(param);
  };

  const afterLoad = () => {
    toggleLoader(false);
  };

  const getData = param => {
    toggleLoader(true);
    getGridData(dataUrl, param);
    setRequestParam(param);
  };

  const onSort = (sortBy, sortOrder) => {
    const param = Object.assign({}, requestParam, {
      SortBy: sortBy === 'WinLoss' ? 'WinLost' : sortBy,
      SortOrder: sortOrder
    });
    getData(param);
  };

  const getResource = key => {
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
  const {
    toggleLoader,
    getGridData,
    setRequestParam
  } = _action_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    toggleLoader,
    getGridData,
    setRequestParam
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    gridData,
    requestParam,
    reportTitle
  } = state;
  return Object.assign({}, {
    gridData,
    requestParam,
    reportTitle
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











const PageLayout = props => {
  const {
    toggleLoader,
    isConvertAll,
    selectedBaseCurrency,
    selectedTabIndex,
    children,
    hasExchange
  } = props;

  const getResource = key => {
    return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource(key);
  };

  const formatDateString = dateString => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${date.getFullYear()}`;
  };

  const beforeShow = () => {
    toggleLoader(true);
  };

  const afterShow = () => {
    toggleLoader(false);
  };

  const activedTabList = _lib_constants__WEBPACK_IMPORTED_MODULE_9__["tabList"].filter(x => _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_10__["default"].tabList.includes(x.key));
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_betlist_BetListLayout__WEBPACK_IMPORTED_MODULE_5__["default"], {
    pageName: "BTC",
    rootUrl: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_8__["default"].getRootUrl(),
    getResourceFunc: getResource,
    formatDateStringFunc: formatDateString,
    baseCurrency: isConvertAll ? selectedBaseCurrency : '',
    beforeShowFunc: beforeShow,
    afterShowFunc: afterShow
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_6__["Tabs"], null, activedTabList.map(item => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_6__["Tab"], {
    isActive: selectedTabIndex == item.displayOrder,
    label: item.label,
    url: item.url
  })), hasExchange && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_6__["Tab"], {
    isActive: selectedTabIndex == 4,
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("Exchange"),
    url: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_8__["default"].resolveClientUrl("ExchangeVoided")
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, children)));
};

function mapDispatchToProps(dispatch) {
  const {
    toggleLoader
  } = _action_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    toggleLoader
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    isConvertAll,
    selectedBaseCurrency,
    hasExchange
  } = state;
  return Object.assign({}, {
    isConvertAll,
    selectedBaseCurrency,
    hasExchange
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



const ActionCreators = Object.assign({}, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_1__, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_2__);

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

const hasExchange = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, {});

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


class Service {
  static getTitle(fromDate, toDate, baseCurrency) {
    const dateRangeText = fromDate && toDate ? `, ${_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateToString(fromDate)} → ${_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateToString(toDate)}` : '';
    const baseCurrencyText = baseCurrency ? `, ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BaseCurrency")}: ${baseCurrency}` : '';
    return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BettingTicketCenter") + dateRangeText + baseCurrencyText;
  }

}

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


const ApiUrl = {
  CUSTOMER_SEARCH_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl("SearchCustomerAPI/SearchCustomer"),
  RUNNING_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenter/GetByRunning'),
  REFNO_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenter/GetByRefNo'),
  SINGLECUSTOMER_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenter/GetBySingleCustomer'),
  ADVANCEDSEARCH_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenterAdvancedSearch/GetData')
};
const HeaderText = {
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
const DefaultPageSize = 50;
const tabKeys = {
  advancedSearch: 'BTC_MultiCustomer',
  singleCustomer: 'BTC_SingleCustomer',
  refNo: 'BTC_RefNo',
  running: 'BTC_Running'
};
const tabList = [{
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

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/filterHandlerAction.js":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/filterHandlerAction.js ***!
  \**************************************************************************************************/
/*! exports provided: setRefno */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRefno", function() { return setRefno; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/types.js");

const setRefno = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_REFNO"],
    data: value
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/index.js":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/index.js ***!
  \************************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _filterHandlerAction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filterHandlerAction.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/filterHandlerAction.js");
/* harmony import */ var _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/gridDataAction */ "./www/js/source/reactpages/actions/gridDataAction.js");
/* harmony import */ var _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/usernameAction */ "./www/js/source/reactpages/actions/usernameAction.js");
/* harmony import */ var _jsroot_actions_baseCurrencyAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/actions/baseCurrencyAction */ "./www/js/source/reactpages/actions/baseCurrencyAction.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _jsroot_actions_convertAllAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/actions/convertAllAction */ "./www/js/source/reactpages/actions/convertAllAction.js");
/* harmony import */ var _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/actions/requestParamAction */ "./www/js/source/reactpages/actions/requestParamAction.js");
/* harmony import */ var _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/actions/reportTitleAction */ "./www/js/source/reactpages/actions/reportTitleAction.js");
/* harmony import */ var _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/actions/userGuideAction */ "./www/js/source/reactpages/actions/userGuideAction.js");









const ActionCreators = Object.assign({}, _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_1__, _filterHandlerAction_js__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_2__, _jsroot_actions_baseCurrencyAction__WEBPACK_IMPORTED_MODULE_3__, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_4__, _jsroot_actions_convertAllAction__WEBPACK_IMPORTED_MODULE_5__, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_6__, _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_7__, _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_8__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/types.js":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/types.js ***!
  \************************************************************************************/
/*! exports provided: SET_REFNO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REFNO", function() { return SET_REFNO; });
const SET_REFNO = "SET_REFNO";

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/AppContainer.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/AppContainer.jsx ***!
  \***********************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/DataGrid.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/FormFilter.jsx");
/* harmony import */ var _common_components_PageLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/components/PageLayout */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/PageLayout.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");






class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_PageLayout__WEBPACK_IMPORTED_MODULE_4__["default"], {
      selectedTabIndex: "1"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
      isLoading: this.props.isLoading
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  }

}

function mapStateToProps(state) {
  return Object.assign({}, {
    isLoading: state.isLoading
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/DataGrid.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/DataGrid.jsx ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _common_components_BaseDataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/components/BaseDataGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/BaseDataGrid.jsx");



const Columns = ['Index', 'ExternalId', 'SystemId', 'RefNo', 'TransTime', 'Choice', 'Odds', 'OddsType', 'Stake', 'WinLoss', 'LicenseeWL', 'Status', 'Platform', 'Live'];
const ColumnWidths = [40, 120, 120, 110, 150, 400, 70, 70, 100, 100, 100, 80, 80, 80];
const ColumnAlignments = ['center-align', '', '', 'center-align', 'center-align', 'right-align', 'right-align', 'right-align', 'right-align', 'right-align', 'right-align', 'center-align', 'center-align', 'center-align'];

const DataGrid = props => {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_BaseDataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], {
    dataUrl: _common_lib_constants__WEBPACK_IMPORTED_MODULE_1__["ApiUrl"].REFNO_DATA_URL,
    isPaging: false,
    columns: Columns,
    columnWidths: ColumnWidths,
    columnAlignments: ColumnAlignments,
    totalText: "",
    totalColumns: [],
    sortableColumns: []
  });
};

/* harmony default export */ __webpack_exports__["default"] = (DataGrid);

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/FormFilter.jsx":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/FormFilter.jsx ***!
  \*********************************************************************************************/
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
/* harmony import */ var _jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/auto-complete */ "./www/js/source/reactpages/components/auto-complete/index.jsx");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _common_lib_Service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../common/lib/Service */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js");
/* harmony import */ var _jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/components/UserGuide */ "./www/js/source/reactpages/components/UserGuide.jsx");
/* harmony import */ var _jsroot_lib_validationHelper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @jsroot/lib/validationHelper */ "./www/js/source/reactpages/lib/validationHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















class FormFilter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "submit", event => {
      event.preventDefault();

      const params = this._getParams();

      if (!params) {
        return;
      }

      this.props.setReportTitle(_common_lib_Service__WEBPACK_IMPORTED_MODULE_13__["default"].getTitle(null, null, params.BaseCurrency));
      this.props.setRequestParam(params);
      this.props.toggleLoader(true);
      this.props.getGridData(_common_lib_constants__WEBPACK_IMPORTED_MODULE_12__["ApiUrl"].REFNO_DATA_URL, params);
    });

    _defineProperty(this, "exportExcel", event => {
      event.preventDefault();

      const params = this._getParams();

      if (!params) {
        return;
      }

      params.IsExport = true;
      this.props.toggleLoader(true);
      _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_11__["default"].getFile(_common_lib_constants__WEBPACK_IMPORTED_MODULE_12__["ApiUrl"].REFNO_DATA_URL, params).then(response => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
          alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("NoInfo"));
        } else {
          _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_9__["default"].downloadFile(response.data, 'BettingTicketsCenter_RefNo.xls');
        }

        this.props.toggleLoader(false);
      });
    });

    _defineProperty(this, "showUserGuide", () => {
      const userGuideContent = this.props.userGuideContent;

      if (!userGuideContent || userGuideContent.length === 0) {
        this.props.getUserGuideContent('BettingTicketCenterRefno');
      }
    });
  }

  get isValidModel() {
    return this.props.refno !== "" && Object(_jsroot_lib_validationHelper__WEBPACK_IMPORTED_MODULE_15__["validateBaseCurrency"])(this.props.selectedBaseCurrency);
  }

  _getParams() {
    if (!this.isValidModel) {
      return null;
    }

    const {
      PageSize,
      SortBy,
      SortOrder
    } = this.props.requestParam;
    return {
      PageSize: PageSize,
      PageIndex: 1,
      Refno: this.props.refno,
      Username: this.props.username,
      BaseCurrency: this.props.isConvertAll ? this.props.selectedBaseCurrency : '',
      IsConvertAll: this.props.isConvertAll,
      SortBy: SortBy,
      SortOrder: SortOrder
    };
  }

  _renderUserGuide() {
    const userGuideContent = this.props.userGuideContent;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_14__["default"], {
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("UserGuide"),
      contentTitle: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("BettingTicketCenter"),
      onClick: this.showUserGuide,
      content: userGuideContent
    });
  }

  _renderBaseCurrencySelectList() {
    const selectedBaseCurrency = this.props.selectedBaseCurrency;
    const baseCurrencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_10__["default"].baseCurrencyList;
    return baseCurrencyList && baseCurrencyList.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
      instanceId: "ddlBased",
      value: selectedBaseCurrency,
      options: baseCurrencyList,
      onChange: item => this.props.setSelectedBaseCurrency(item.value)
    });
  }

  render() {
    const excelButton = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "icon-excel right",
      onClick: this.exportExcel,
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("ExportToExcel")
    }), this._renderUserGuide());
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_6__["default"], {
      className: "page-filter",
      stickyFooter: excelButton
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("RefNo"), " *"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: "input-text",
      id: "RefNo",
      name: "RefNo",
      type: "number",
      value: this.props.refno,
      placeholder: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("RefNo"),
      onChange: event => this.props.setRefno(event.target.value)
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("Username")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_4__["default"], {
      url: _common_lib_constants__WEBPACK_IMPORTED_MODULE_12__["ApiUrl"].CUSTOMER_SEARCH_URL,
      onSelect: value => this.props.setUsername(value),
      onInput: value => this.props.setUsername(value),
      htmlAttributes: {
        placeholder: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("ExternalIdOrSystemId")
      }
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("BaseCurrency")), this._renderBaseCurrencySelectList())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-4 col-sm-4 col-lg-2 col-xl-2"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_5__["default"], {
      id: "IsConvertAll",
      checked: this.props.isConvertAll,
      onChange: checked => this.props.changeIsConvertAll(checked),
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("ConvertAllFiguresToBaseCurrency")
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "button-group"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      disabled: !this.isValidModel,
      className: "btn btn-submit",
      onClick: this.submit
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource("Submit")))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-1",
      style: {
        flex: "0 0 4%"
      }
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource('Note'), ":"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-9"
    }, "* ", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource('BettingTicketCenter_RefnoTabNote1'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "* ", _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_10__["default"].productsRequireUseNameNote)));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index_js__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"], dispatch);
}

function mapStateToProps(state) {
  const {
    requestParam,
    refno,
    username,
    selectedBaseCurrency,
    isConvertAll,
    userGuideContent
  } = state;
  return Object.assign({}, {
    requestParam,
    refno,
    username,
    selectedBaseCurrency,
    isConvertAll,
    userGuideContent
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/index.jsx":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/index.jsx ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/reducers/index.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");







const defaultState = Object.assign({}, window.initialState, {
  userGuideContent: '',
  requestParam: {
    PageSize: _common_lib_constants__WEBPACK_IMPORTED_MODULE_6__["DefaultPageSize"]
  }
});
const store = _lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers_index_js__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);
class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
      store: store
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  }

}
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById('app-container'));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/reducers/filterHandlerReducer.js":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/reducers/filterHandlerReducer.js ***!
  \****************************************************************************************************/
/*! exports provided: refno */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refno", function() { return refno; });
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/types.js");


const refno = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_REFNO"]](state, action) {
    return action.data;
  }

});

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/reducers/index.js":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/reducers/index.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_gridDataReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/gridDataReducer.js */ "./www/js/source/reactpages/reducers/gridDataReducer.js");
/* harmony import */ var _filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filterHandlerReducer.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/reducers/filterHandlerReducer.js");
/* harmony import */ var _jsroot_reducers_usernameReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/reducers/usernameReducer */ "./www/js/source/reactpages/reducers/usernameReducer.js");
/* harmony import */ var _jsroot_reducers_baseCurrencyReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/reducers/baseCurrencyReducer */ "./www/js/source/reactpages/reducers/baseCurrencyReducer.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _jsroot_reducers_convertAllReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/reducers/convertAllReducer */ "./www/js/source/reactpages/reducers/convertAllReducer.js");
/* harmony import */ var _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/reducers/requestParamReducer */ "./www/js/source/reactpages/reducers/requestParamReducer.js");
/* harmony import */ var _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/reducers/reportTitleReducer */ "./www/js/source/reactpages/reducers/reportTitleReducer.js");
/* harmony import */ var _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/reducers/userGuideReducer */ "./www/js/source/reactpages/reducers/userGuideReducer.js");
/* harmony import */ var _common_components_reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../common/components/reducer */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/reducer.js");











/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_jsroot_reducers_gridDataReducer_js__WEBPACK_IMPORTED_MODULE_1__, _filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_2__, _jsroot_reducers_usernameReducer__WEBPACK_IMPORTED_MODULE_3__, _jsroot_reducers_baseCurrencyReducer__WEBPACK_IMPORTED_MODULE_4__, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_5__, _jsroot_reducers_convertAllReducer__WEBPACK_IMPORTED_MODULE_6__, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_7__, _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_8__, _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_9__, _common_components_reducer__WEBPACK_IMPORTED_MODULE_10__)));

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


const isConvertAll = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["CHANGE_IS_CONVERT_ALL"]](state, action) {
    return action.data;
  }

});

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


const gridData = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_GRID_DATA"]](state, action) {
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



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


const username = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_USERNAME"]](state, action) {
    return action.data;
  }

});

/***/ })

/******/ });
//# sourceMappingURL=refno.chunk.js.map