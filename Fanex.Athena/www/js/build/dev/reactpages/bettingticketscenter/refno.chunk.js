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
/*! exports provided: FETCH_DATA, SET_GRID_DATA, SET_SELECTED_PRODUCT, SET_SELECTED_BASECURRENCY, SET_BASECURRENCY_LIST, SET_SELECTED_CURRENCY, TOGGLE_LOADER, CHANGE_IS_EXCLUDE_TEST, USER_GUIDE_CONTENT, SET_DATE_RANGE, GET_DATE_CONSTRAINT, CHANGE_IS_CONVERT_ALL, SET_SELECTED_STATUS, SET_SELECTED_PLATFORM, SET_SELECTED_LIVESTATUS, SET_USERNAME, SET_REQUEST_PARAM, SET_REPORT_TITLE, SET_SPORT_LIST, SET_PAGING_OPTION, SET_SUBSIDIARY_LIST, SET_SUBSIDIARY_SEARCH, SET_WHITELABEL_TREE_LIST, SET_REASON_LIST, SET_SELECTED_VIP_OPTION, SET_SELECTED_CUSTOMERCLASS, SET_SELECTED_RISKLEVEL, SET_SELECTED_ODDGROUP, CHANGE_VIEW_SABA_COINS */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_WHITELABEL_TREE_LIST", function() { return SET_WHITELABEL_TREE_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REASON_LIST", function() { return SET_REASON_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_VIP_OPTION", function() { return SET_SELECTED_VIP_OPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_CUSTOMERCLASS", function() { return SET_SELECTED_CUSTOMERCLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_RISKLEVEL", function() { return SET_SELECTED_RISKLEVEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_ODDGROUP", function() { return SET_SELECTED_ODDGROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_VIEW_SABA_COINS", function() { return CHANGE_VIEW_SABA_COINS; });
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
const SET_WHITELABEL_TREE_LIST = 'SET_WHITELABEL_TREE_LIST';

/*Reason list*/
const SET_REASON_LIST = "SET_REASON_LIST";

/*Customer class*/
const SET_SELECTED_VIP_OPTION = 'SET_SELECTED_VIP_OPTION';
const SET_SELECTED_CUSTOMERCLASS = "SET_SELECTED_CUSTOMERCLASS";
const SET_SELECTED_RISKLEVEL = "SET_SELECTED_RISKLEVEL";

/*Odd group*/
const SET_SELECTED_ODDGROUP = "SET_SELECTED_ODDGROUP";

/* View Saba Coins */
const CHANGE_VIEW_SABA_COINS = "CHANGE_VIEW_SABA_COINS";

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

/***/ "./www/js/source/reactpages/actions/viewSabaCoinsAction.js":
/*!*****************************************************************!*\
  !*** ./www/js/source/reactpages/actions/viewSabaCoinsAction.js ***!
  \*****************************************************************/
/*! exports provided: changeViewSabaCoins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeViewSabaCoins", function() { return changeViewSabaCoins; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

const changeViewSabaCoins = checked => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["CHANGE_VIEW_SABA_COINS"],
    data: checked
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
const _excluded = ["content", "extendContent", "tag"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


const ReportTitle = _ref => {
  let {
      content,
      extendContent,
      tag
    } = _ref,
    attrs = _objectWithoutProperties(_ref, _excluded);
  const Tag = tag;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "report-title-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
    className: "report-title"
  }, attrs), content, extendContent));
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
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







const DELAY_TIME_MILLISECOND = 300;
class AutoComplete extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    _defineProperty(this, "_handleClickOut", event => {
      if (this.isShowSuggestionList && this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this._clearState();
      }
    });
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
    this.wrapperRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }
  componentDidMount() {
    document.addEventListener("mousedown", this._handleClickOut);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this._handleClickOut);
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ac-container",
      ref: this.wrapperRef
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
      type: "text",
      className: "input-text"
    }, this.props.htmlAttributes, {
      onChange: this.onChange,
      onKeyDown: this._onKeyDown,
      ref: element => this.input = element
    })), this.isShowSuggestionList && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOpening: true,
      onClose: this._clearState
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SuggestionList__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



class BetListDataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    _defineProperty(this, "sortOrderMapper", {
      asc: 1,
      desc: 2
    });
    _defineProperty(this, "sortTypeMapper", {
      transdate: 0,
      stake: 1,
      winloss: 2,
      licenseewl: 3,
      betplaced: 4
    });
    _defineProperty(this, "onSort", (sortType, sortOrder) => {
      var _this$sortOrderMapper, _this$sortTypeMapper$;
      const newSortOrder = (_this$sortOrderMapper = this.sortOrderMapper[sortOrder.toLowerCase()]) !== null && _this$sortOrderMapper !== void 0 ? _this$sortOrderMapper : this.sortOrderMapper.asc;
      const newSortType = (_this$sortTypeMapper$ = this.sortTypeMapper[sortType.toLowerCase()]) !== null && _this$sortTypeMapper$ !== void 0 ? _this$sortTypeMapper$ : this.sortTypeMapper.transdate;
      this.props.onSort && this.props.onSort(newSortType, newSortOrder);
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
    const timestamp = new Date().getTime();
    const {
      columns,
      columnWidths,
      sortableColumns
    } = this.props;
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const isSortable = sortableColumns.indexOf(column) >= 0;
      const headerName = this._getHeaderName(column);
      rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        key: column + timestamp,
        colWidth: columnWidths[i],
        sortBy: isSortable ? column : null
      }, headerName));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
      style: {
        height: 32
      }
    }, rows);
  }
  _buildBody() {
    const {
      columns,
      columnAlignments,
      tooltipColumns,
      data
    } = this.props;
    let rows = [];
    const timestamp = new Date().getTime();
    for (let i = 0; i < data.length; i++) {
      const item = this._mapData(data[i]);
      let cells = [];
      for (let j = 0; j < columns.length; j++) {
        const column = columns[j];
        const hasTooltip = tooltipColumns && tooltipColumns.indexOf(column) !== -1;
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], _extends({
          key: `${column}-${i}-${timestamp}`,
          className: columnAlignments[j]
        }, hasTooltip ? {
          title: item[column]
        } : {}, {
          dangerouslySetInnerHTML: {
            __html: item[column]
          }
        })));
      }
      rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
        key: `${i}-${timestamp}`
      }, cells));
    }
    return rows;
  }
  _buildFooter() {
    if (!this.props.totalColumns || !this.props.totalColumns.length) {
      return false;
    }
    const timestamp = new Date().getTime();
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
    cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
      key: "total",
      className: "right-align",
      colSpan: startTotalIndex
    }, totalText));
    const item = this._mapData(total);
    for (let i = 0; i < totalColumns.length; i++) {
      const column = totalColumns[i];
      const columnIndex = columns.indexOf(column);
      const className = this._getTotalCellClassName(column, item[column]);
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
        key: `Sum-${column}-${timestamp}`,
        className: `${columnAlignments[columnIndex]} ${className}`,
        dangerouslySetInnerHTML: {
          __html: item[column]
        }
      }));
    }
    const blankRows = columns.length - totalColumns.length - startTotalIndex;
    if (blankRows) {
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
        key: `blank-${timestamp}`,
        colSpan: blankRows
      }));
    }
    rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
      className: "fixed-table-grant-total",
      key: `totalRow-${timestamp}`
    }, cells));
    return rows;
  }
  _renderNodata() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "result-content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "betlist-container result-content",
      key: "BetListDataGrid"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Table"], {
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
  isPaging: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  pageOption: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    PageIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    PageSize: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    TotalItem: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    PageList: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number)
  }),
  columns: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string),
  columnWidths: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number),
  mappingDataFunc: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  sortableColumns: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string),
  totalColumns: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string),
  getHeaderNameFunc: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  columnAlignments: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string),
  data: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object),
  total: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
  getTotalCellClassNameFunc: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  totalText: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  onSort: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  onPaging: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  afterLoad: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  adjustedHeight: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  getResourceFunc: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
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
      isCollapsed: props.isInitCollapsed
    };
  }
  render() {
    const {
      stickyFooter,
      iconContainerStyle,
      iconToggle,
      isCustomCollapse
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
    const contendStyle = isCustomCollapse ? {
      display: 'block'
    } : {
      display: this.state.isCollapsed ? 'none' : 'block'
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `${this.props.className}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: contendStyle
    }, this.props.children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "caret-block"
    }, stickyFooter), !!this.props.isCollapseMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  onExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isCollapseMode: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isInitCollapsed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isCustomCollapse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
});
const propTypes = {
  stickyFooter: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  onCollapse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  iconToggle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  isCollapseMode: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isInitCollapsed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isCustomCollapse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
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
  },
  isCollapseMode: true,
  isInitCollapsed: false,
  isCustomCollapse: false
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

/***/ "./www/js/source/reactpages/components/dropdown/DropdownButton.jsx":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/components/dropdown/DropdownButton.jsx ***!
  \*************************************************************************/
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
/* harmony import */ var _DropdownToggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropdownToggle */ "./www/js/source/reactpages/components/dropdown/DropdownToggle.jsx");
/* harmony import */ var _DropdownMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DropdownMenu */ "./www/js/source/reactpages/components/dropdown/DropdownMenu.jsx");
const _excluded = ["className", "children", "toggleButton", "dropdownMenu", "isOpen", "onOpen", "onClose", "onToggle", "buttonLabel"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const DropdownButton = props => {
  const {
      className,
      children,
      toggleButton,
      dropdownMenu,
      isOpen,
      onOpen,
      onClose,
      onToggle,
      buttonLabel
    } = props,
    attrs = _objectWithoutProperties(props, _excluded);
  const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown', className);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
    className: classes
  }, attrs), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DropdownToggle__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, toggleButton, {
    onClick: onToggle
  }), buttonLabel), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DropdownMenu__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, dropdownMenu, {
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onClose
  }), children));
};
const propTypes = {
  buttonLabel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  isOpen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onOpen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onToggle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  toggleButton: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    caret: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
    className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
    onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
    tag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
  }),
  dropdownMenu: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    tag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,
    className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
  })
};
const defaultProps = {
  toggleButton: {
    className: 'toggle-default'
  }
};
DropdownButton.propTypes = propTypes;
DropdownButton.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (DropdownButton);

/***/ }),

/***/ "./www/js/source/reactpages/components/dropdown/DropdownItem.jsx":
/*!***********************************************************************!*\
  !*** ./www/js/source/reactpages/components/dropdown/DropdownItem.jsx ***!
  \***********************************************************************/
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
const _excluded = ["tag", "className", "active"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



class DropdownItem extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleClick", e => {
      e.preventDefault();
      if (this.props.disabled) {
        return;
      }
      this.props.onClick && this.props.onClick(e);
    });
  }
  render() {
    const _this$props = this.props,
      {
        tag,
        className,
        active
      } = _this$props,
      props = _objectWithoutProperties(_this$props, _excluded);
    const Tag = tag;
    const type = Tag === 'button' && props.onClick ? 'button' : undefined;
    const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown-item', className, {
      disabled: props.disabled,
      active
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
      className: classes,
      type: type
    }, props));
  }
}
const propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  active: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  tag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
const defaultProps = {
  tag: 'button',
  disabled: false
};
DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (DropdownItem);

/***/ }),

/***/ "./www/js/source/reactpages/components/dropdown/DropdownMenu.jsx":
/*!***********************************************************************!*\
  !*** ./www/js/source/reactpages/components/dropdown/DropdownMenu.jsx ***!
  \***********************************************************************/
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
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Overlay */ "./www/js/source/reactpages/components/Overlay.jsx");
const _excluded = ["tag", "className", "isOpen", "onOpen", "onClose"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




class DropdownMenu extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }
  render() {
    const _this$props = this.props,
      {
        tag,
        className,
        isOpen,
        onOpen,
        onClose
      } = _this$props,
      attrs = _objectWithoutProperties(_this$props, _excluded);
    const Tag = tag;
    const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown-menu', className);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_3__["default"], {
      isOpening: isOpen,
      onOpen: onOpen,
      onClose: onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
      className: classes
    }, attrs)));
  }
}
const propTypes = {
  tag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  isOpen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onOpen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
const defaultProps = {
  tag: 'div'
};
DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (DropdownMenu);

/***/ }),

/***/ "./www/js/source/reactpages/components/dropdown/DropdownToggle.jsx":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/components/dropdown/DropdownToggle.jsx ***!
  \*************************************************************************/
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
const _excluded = ["className", "tag", "caret"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



const DropdownToggle = props => {
  const {
      className,
      tag,
      caret
    } = props,
    attrs = _objectWithoutProperties(props, _excluded);
  const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown-toggle', className, {
    'site-caret': caret
  });
  const Tag = tag;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
    className: classes
  }, attrs));
};
const propTypes = {
  caret: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  tag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
const defaultProps = {
  caret: true,
  tag: 'button'
};
DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (DropdownToggle);

/***/ }),

/***/ "./www/js/source/reactpages/components/dropdown/index.js":
/*!***************************************************************!*\
  !*** ./www/js/source/reactpages/components/dropdown/index.js ***!
  \***************************************************************/
/*! exports provided: DropdownToggle, DropdownMenu, DropdownItem, DropdownButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DropdownToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DropdownToggle */ "./www/js/source/reactpages/components/dropdown/DropdownToggle.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownToggle", function() { return _DropdownToggle__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _DropdownMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DropdownMenu */ "./www/js/source/reactpages/components/dropdown/DropdownMenu.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownMenu", function() { return _DropdownMenu__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _DropdownItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DropdownItem */ "./www/js/source/reactpages/components/dropdown/DropdownItem.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownItem", function() { return _DropdownItem__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _DropdownButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropdownButton */ "./www/js/source/reactpages/components/dropdown/DropdownButton.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownButton", function() { return _DropdownButton__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "./www/js/source/reactpages/components/mobile-component/CollapseRow.jsx":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/components/mobile-component/CollapseRow.jsx ***!
  \******************************************************************************/
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
/* harmony import */ var _RefRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RefRow */ "./www/js/source/reactpages/components/mobile-component/RefRow.jsx");
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! usehooks-ts */ "./node_modules/usehooks-ts/dist/esm/index.js");





const CollapseRow = props => {
  const {
    isFocus,
    className,
    onFocus,
    index,
    isUseCumtomCollapseRow,
    children
  } = props;
  const [oldIsHover, setOldIsHover] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const isHover = Object(usehooks_ts__WEBPACK_IMPORTED_MODULE_4__["useHover"])(ref);
  if (isHover != oldIsHover) {
    setOldIsHover(isHover);
    onFocus(index, isHover);
  }
  const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(isFocus ? "row-active" : "", className);
  return isUseCumtomCollapseRow ? children : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RefRow__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ref: ref,
    className: classes
  }, children);
};
const propTypes = {
  isFocus: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onBlur: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  index: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  isUseCumtomCollapseRow: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any
};
const defaultProps = {
  isFocus: false,
  index: 0,
  isUseCumtomCollapseRow: false
};
CollapseRow.propTypes = propTypes;
CollapseRow.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (CollapseRow);

/***/ }),

/***/ "./www/js/source/reactpages/components/mobile-component/CompositeRow.jsx":
/*!*******************************************************************************!*\
  !*** ./www/js/source/reactpages/components/mobile-component/CompositeRow.jsx ***!
  \*******************************************************************************/
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
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CollapseRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CollapseRow */ "./www/js/source/reactpages/components/mobile-component/CollapseRow.jsx");
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! usehooks-ts */ "./node_modules/usehooks-ts/dist/esm/index.js");
/* harmony import */ var _RefRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RefRow */ "./www/js/source/reactpages/components/mobile-component/RefRow.jsx");









const CompositeRow = props => {
  const {
    isCollapsible,
    expandRows,
    className,
    isUseCustomCollapseCell,
    children,
    onCollapsed,
    onExpanded,
    refCollapseObject,
    activeClassName,
    isUseCumtomCollapseRow,
    isUseCustomHoverRow,
    hoverRowRef,
    collapaseRowClass
  } = props;
  const [isCollapse, setIsCollapse] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const [childFocusTracker, setChildFocusTracker] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(expandRows.map(() => false));
  const hoverRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(hoverRowRef === null || hoverRowRef === void 0 ? void 0 : hoverRowRef.current);
  const isHover = Object(usehooks_ts__WEBPACK_IMPORTED_MODULE_5__["useHover"])(hoverRef);
  const onClick = () => {
    const nextState = !isCollapse;
    setIsCollapse(nextState);
    if (nextState) {
      onCollapsed && onCollapsed();
    } else {
      onExpanded && onExpanded();
    }
  };
  const iconClass = isCollapse ? 'icon icon-lap-plus' : 'icon icon-lap-minus';
  const onChildFocus = (index, isFocus) => {
    childFocusTracker.splice(index, 1, isFocus);
    setChildFocusTracker([...childFocusTracker]);
  };
  const isFocus = isHover || childFocusTracker.indexOf(true) >= 0;
  const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(isFocus ? activeClassName : "", className);
  if (isUseCustomCollapseCell && isCollapsible && refCollapseObject) {
    refCollapseObject.onclick = onClick;
  }
  const expandRowList = Array.isArray(expandRows) ? expandRows : expandRows.props.children;
  const mainRow = isUseCustomHoverRow ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children, !isUseCustomCollapseCell && isCollapsible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
    onClick: onClick,
    className: "center-align cell-collapse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "icon-collapse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: iconClass
  })))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RefRow__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ref: hoverRef,
    className: classes
  }, children, !isUseCustomCollapseCell && isCollapsible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
    onClick: onClick,
    className: "center-align cell-collapse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "icon-collapse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: iconClass
  }))));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, mainRow, isCollapsible && !isCollapse && (expandRowList === null || expandRowList === void 0 ? void 0 : expandRowList.length) > 0 && expandRows.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CollapseRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: `${index}`,
    isUseCumtomCollapseRow: isUseCumtomCollapseRow,
    className: `collapse-row ${collapaseRowClass}`,
    index: index,
    onFocus: onChildFocus,
    isFocus: isFocus
  }, item)));
};
const propTypes = {
  isCollapsible: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isUseCustomCollapseCell: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isUseCustomHoverRow: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isUseCumtomCollapseRow: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  hoverRowRef: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  refCollapseObject: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  collapsibleCellContent: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  onExpanded: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onCollapsed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  expandRows: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  activeClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  collapaseRowClass: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
const defaultProps = {
  isCollapsible: true,
  isUseCustomCollapseCell: false,
  expandRows: [],
  isFocus: false,
  activeClassName: "row-active",
  isUseCustomHoverRow: false,
  hoverRowRef: null,
  isUseCumtomCollapseRow: false,
  collapaseRowClass: ''
};
CompositeRow.propTypes = propTypes;
CompositeRow.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(CompositeRow));

/***/ }),

/***/ "./www/js/source/reactpages/components/mobile-component/RefPager.jsx":
/*!***************************************************************************!*\
  !*** ./www/js/source/reactpages/components/mobile-component/RefPager.jsx ***!
  \***************************************************************************/
/*! exports provided: RefPager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefPager", function() { return RefPager; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);



const RefPager = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function RefPager(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: ref,
    className: "page-wrapper-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Pager"], props));
});

/***/ }),

/***/ "./www/js/source/reactpages/components/mobile-component/RefRow.jsx":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/components/mobile-component/RefRow.jsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


const RefRow = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function RefRow(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", _extends({}, props, {
    ref: ref
  }), props.children);
});
/* harmony default export */ __webpack_exports__["default"] = (RefRow);

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
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);




const Popup = props => {
  const {
    title,
    isShow,
    width,
    height,
    isHtml,
    children,
    iframeUrl,
    isShowTitle,
    className
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
  const classes = classnames__WEBPACK_IMPORTED_MODULE_3___default()('popup-container', isShow ? 'show' : 'hide', className);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes,
    onClick: props.onClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "popup-block-body"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flat-popup",
    style: {
      height: height,
      width: width
    }
  }, isShowTitle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  isShowTitle: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
Popup.defaultProps = {
  width: _constants__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_WIDTH"],
  height: _constants__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_HEIGHT"],
  isShow: false,
  isHtml: false,
  iframeUrl: null,
  isShowTitle: true
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

/***/ "./www/js/source/reactpages/customHooks/useMobileVersion.jsx":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/customHooks/useMobileVersion.jsx ***!
  \*******************************************************************/
/*! exports provided: useMobileVersion, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMobileVersion", function() { return useMobileVersion; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-device-detect */ "./node_modules/react-device-detect/dist/lib.js");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! usehooks-ts */ "./node_modules/usehooks-ts/dist/esm/index.js");



const useMobileVersion = () => {
  const width = window.innerWidth;
  const ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(false);
  const isFirstRender = Object(usehooks_ts__WEBPACK_IMPORTED_MODULE_2__["useIsFirstRender"])();
  if (isFirstRender) {
    if (react_device_detect__WEBPACK_IMPORTED_MODULE_1__["isDesktop"]) {
      ref.current = false;
    } else {
      ref.current = width < 1024;
    }
  }
  return ref.current;
};
/* harmony default export */ __webpack_exports__["default"] = (useMobileVersion);

/***/ }),

/***/ "./www/js/source/reactpages/layouts/AppLayout.jsx":
/*!********************************************************!*\
  !*** ./www/js/source/reactpages/layouts/AppLayout.jsx ***!
  \********************************************************/
/*! exports provided: AppLayout, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppLayout", function() { return AppLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);



const AppLayout = props => {
  const className = classnames__WEBPACK_IMPORTED_MODULE_1___default()(props.className, "container-fluid");
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "container",
    className: className
  }, props.children);
};
const propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
AppLayout.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (AppLayout);

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
/* harmony import */ var _jsroot_components_popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/popup */ "./www/js/source/reactpages/components/popup/index.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);



class BetListLayout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      isShowPopup: false,
      popupUrl: null,
      popupTitle: null
    };
    window.openPopup = this._openPopup.bind(this);
    window.getResource = null; //use resource from BetTicket site
    window.formatDateString = this._formatDateString.bind(this);
    window.beforeShow = this._beforeShow.bind(this);
    window.afterShow = this._afterShow.bind(this);
    window.getBaseCurrency = this._getBaseCurrency.bind(this);
    window.getAccessToken = this._getAccessToken.bind(this);
    window.getLanguage = this._getLanguage.bind(this);
  }
  componentDidMount() {
    window.onload = () => {
      window.logOpenBetlistEvent && window.logOpenBetlistEvent(this.props.pageName);
    };
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
  _getBaseCurrency() {
    return this.props.baseCurrency;
  }
  _getAccessToken() {
    return window.topSameOriginWindow.lrf && window.topSameOriginWindow.lrf.access_token;
  }
  _getLanguage() {
    return window.PageLanguage;
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "betlist-layout"
    }, this.props.children, this.state.isShowPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isShow: true,
      iframeUrl: this.state.popupUrl,
      title: this.state.popupTitle,
      width: 900,
      height: 600,
      onClose: () => this._closePopup(),
      className: "betlist-popup"
    }));
  }
}
BetListLayout.propTypes = {
  pageName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  rootUrl: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  getResourceFunc: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  baseCurrency: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  beforeShowFunc: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  afterShowFunc: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  formatDateStringFunc: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
};
BetListLayout.defaultProps = {
  rootUrl: '/',
  baseCurrency: ''
};
/* harmony default export */ __webpack_exports__["default"] = (BetListLayout);

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
  static getData(url, params, cancellationTokenSource) {
    const token = cancellationTokenSource ? cancellationTokenSource.token : this.genCancellationToken().token;
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url, {
      params: params,
      cancelToken: token
    });
  }
  static genCancellationToken() {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.CancelToken.source();
  }
  static isCancel(thrown) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.isCancel(thrown);
  }
  static postData(url, params, cancellationTokenSource) {
    const token = cancellationTokenSource ? cancellationTokenSource.token : this.genCancellationToken().token;
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, params, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        '__RequestVerificationToken': _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].getXsrfToken()
      },
      cancelToken: token
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
  static getSingleResource(key, hideSaba = false) {
    var langHandler = window[resourceName];
    var newKey = hideSaba ? key + "_HideSaba" : key;
    return langHandler && langHandler[newKey] || window[DEFAULT_RESOURCE_NAME] && window[DEFAULT_RESOURCE_NAME][newKey] || newKey;
  }
  static getResources(keys) {
    var langHandler = window[resourceName];
    return keys.map(key => langHandler && langHandler[key] || window[DEFAULT_RESOURCE_NAME] && window[DEFAULT_RESOURCE_NAME][key] || key);
  }
}
_defineProperty(LangHelper, "languageKeys", {
  eng: "en-US",
  zhCN: "zh-CN",
  viVN: "vi-VN"
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
  static downloadFile(data, fileName, option) {
    const url = window.URL.createObjectURL(new Blob([data], option));
    const link = document.createElement('a');
    link.href = url;
    link.target = "_self";
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
  static setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  static getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
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

/***/ "./www/js/source/reactpages/lib/validationHelper.js":
/*!**********************************************************!*\
  !*** ./www/js/source/reactpages/lib/validationHelper.js ***!
  \**********************************************************/
/*! exports provided: validateBaseCurrency, validateEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateBaseCurrency", function() { return validateBaseCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEmail", function() { return validateEmail; });
/* harmony import */ var _AppData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppData */ "./www/js/source/reactpages/lib/AppData.js");

const emailPattern = '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$';
const validateBaseCurrency = (baseCurrency = "", allowEmpty = true) => {
  return allowEmpty && !baseCurrency || !!baseCurrency && _AppData__WEBPACK_IMPORTED_MODULE_0__["default"].baseCurrencyList.find(x => x.value === baseCurrency);
};
const validateEmail = email => email && new RegExp(emailPattern).test(email);

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
/* harmony import */ var _lib_Service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/Service.js */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js");
const _excluded = ["PageIndex", "SortBy", "SortOrder"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









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
    sortableColumns,
    tooltipColumns
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
      SortType: sortBy,
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
  const {
      PageIndex,
      SortBy,
      SortOrder
    } = requestParam,
    otherRequestParam = _objectWithoutProperties(requestParam, _excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "betlist-container result-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_5__["default"], {
    content: reportTitle
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_betlist_BetListDataGrid__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: JSON.stringify(otherRequestParam),
    isPaging: isPaging,
    pageOption: pageOption,
    onPaging: onPaging,
    getHeaderNameFunc: _lib_Service_js__WEBPACK_IMPORTED_MODULE_8__["default"].getHeaderName,
    columns: columns,
    columnWidths: columnWidths,
    sortableColumns: sortableColumns,
    totalColumns: totalColumns,
    columnAlignments: columnAlignments,
    tooltipColumns: tooltipColumns,
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
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(BaseDataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/BaseMobileDataGrid.jsx":
/*!******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/components/BaseMobileDataGrid.jsx ***!
  \******************************************************************************************************/
/*! exports provided: BaseMobileDataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseMobileDataGrid", function() { return BaseMobileDataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _lib_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/constants.js */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _action_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./action.js */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/action.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @legion-lib/react-grid */ "./node_modules/@legion-lib/react-grid/dist/index.js");
/* harmony import */ var _legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lib_Service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/Service.js */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! usehooks-ts */ "./node_modules/usehooks-ts/dist/esm/index.js");
/* harmony import */ var _jsroot_components_mobile_component_RefPager_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/mobile-component/RefPager.jsx */ "./www/js/source/reactpages/components/mobile-component/RefPager.jsx");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }












const VerySmallColumnWidths = [53, 16, 22, 13];
const SmallColumnWidths = [159, 66, 90, 28];
const LargeColumnWidths = ['53%', '18%', '22%', '7%'];
const BaseMobileDataGrid = props => {
  const {
    dataUrl,
    isPaging,
    body,
    footer,
    columns,
    sortableColumns
  } = props;
  const [gridData, requestParam, reportTitle, reloadReport] = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(state => [state.gridData, state.requestParam, state.reportTitle, state.reloadReport], react_redux__WEBPACK_IMPORTED_MODULE_4__["shallowEqual"]);
  const ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();
  const [id, setId] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(`${Object(uuid__WEBPACK_IMPORTED_MODULE_11__["v4"])()}`);
  const [pagerRef, pagerSize] = Object(usehooks_ts__WEBPACK_IMPORTED_MODULE_9__["useElementSize"])();
  const {
    width
  } = Object(usehooks_ts__WEBPACK_IMPORTED_MODULE_9__["useWindowSize"])();
  const collumnWidths = width > 500 ? LargeColumnWidths : width > 370 ? SmallColumnWidths : VerySmallColumnWidths;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    dispatch(toggleLoader(false));
    setId(`${Object(uuid__WEBPACK_IMPORTED_MODULE_11__["v4"])()}`);
  }, [gridData]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var _ref$current;
    const style = `bottom: ${pagerSize.height - 1}px`;
    (_ref$current = ref.current) === null || _ref$current === void 0 || (_ref$current = _ref$current.getElementsByClassName('footer-content')[0]) === null || _ref$current === void 0 || _ref$current.setAttribute('style', style);
  }, [pagerSize === null || pagerSize === void 0 ? void 0 : pagerSize.height, id]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var _ref$current2;
    (_ref$current2 = ref.current) === null || _ref$current2 === void 0 || _ref$current2.scrollIntoView();
  }, [id]);
  const {
    toggleLoader,
    getGridData,
    setRequestParam
  } = _action_js__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"];
  const pageOption = {
    PageIndex: requestParam.PageIndex,
    PageSize: requestParam.PageSize,
    TotalItem: gridData !== null && gridData !== void 0 && gridData.TotalRows ? gridData.TotalRows : _lib_constants_js__WEBPACK_IMPORTED_MODULE_2__["DefaultPageSize"],
    PageList: [_lib_constants_js__WEBPACK_IMPORTED_MODULE_2__["DefaultPageSize"], 100, 200, 300, 400, 500, 1000, 2000]
  };
  const onPaging = (index, size) => {
    const param = _objectSpread(_objectSpread({}, requestParam), {}, {
      PageIndex: index,
      PageSize: size
    });
    getData(param);
  };
  const onSort = (sortBy, sortOrder) => {
    const param = _objectSpread(_objectSpread({}, requestParam), {}, {
      SortBy: sortBy === 'WinLoss' ? 'WinLost' : sortBy,
      SortOrder: sortOrder
    });
    getData(param);
  };
  const getData = param => {
    dispatch(toggleLoader(true));
    dispatch(getGridData(dataUrl, param));
    dispatch(setRequestParam(param));
  };
  const buildHeader = () => {
    let rows = [];
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const isSortable = sortableColumns.indexOf(column) >= 0;
      const headerName = _lib_Service_js__WEBPACK_IMPORTED_MODULE_7__["default"].getHeaderName(column);
      rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_6__["HeaderCell"], {
        key: column,
        colWidth: collumnWidths[i],
        sortBy: isSortable ? column : null
      }, headerName));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_6__["HeaderRow"], {
      style: {
        height: 32
      }
    }, rows);
  };
  const header = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => buildHeader(), [width]);
  const bodyWrapper = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    key: id
  }, body), [id]);
  if (!(gridData !== null && gridData !== void 0 && gridData.Data) || gridData.Data.length == 0) {
    if (!(gridData !== null && gridData !== void 0 && gridData.Data)) {
      return null;
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_8__["default"], null);
  }
  const isShowPagingInfo = pagerSize.width > 400;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mobile-betlist-container betlist-container result-content mobile-table",
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_1__["default"], {
    content: reportTitle
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_6__["Table"], {
    key: "betlist-mobile-table",
    autoWidth: true,
    autoHeight: false,
    header: header,
    body: bodyWrapper,
    footer: footer,
    isPaging: false,
    pageOption: pageOption,
    shouldResetScrollPosition: reloadReport,
    bodyHeight: "100%",
    containerPadding: 2,
    isIncludeScrollWidth: false,
    onSort: onSort
  }), isPaging && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_mobile_component_RefPager_jsx__WEBPACK_IMPORTED_MODULE_10__["RefPager"], {
    ref: pagerRef,
    onPaging: onPaging,
    pageOption: pageOption,
    isShowPagingInfo: isShowPagingInfo
  }));
};
const propTypes = {
  dataUrl: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,
  isPaging: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,
  header: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array, prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object]),
  body: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array, prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object]),
  footer: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array, prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object]),
  columns: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string),
  sortableColumns: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string)
};
const defaultProps = {
  isPaging: false,
  sortableColumns: []
};
BaseMobileDataGrid.propTypes = propTypes;
BaseMobileDataGrid.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(BaseMobileDataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/MobileBetlistContent.jsx":
/*!********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/components/MobileBetlistContent.jsx ***!
  \********************************************************************************************************/
/*! exports provided: MobileBetlistContent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileBetlistContent", function() { return MobileBetlistContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


const MobileBetlistContent = props => {
  const {
    item
  } = props;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, [item]);
  const spaceSpan = '<span>&nbsp;</span>';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell-index"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "index"
  }, "#", item.Index), " - ", item.TransTime), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell-external-id"
  }, item.ExternalId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.RefNo), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell-choice",
    dangerouslySetInnerHTML: {
      __html: item.Choice
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell-odd",
    dangerouslySetInnerHTML: {
      __html: `@${item.Odds} ${spaceSpan} ${item.OddsType}`
    }
  }));
};
const propTypes = {
  item: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
MobileBetlistContent.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileBetlistContent));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/MobileWinLossCellContent.jsx":
/*!************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/components/MobileWinLossCellContent.jsx ***!
  \************************************************************************************************************/
/*! exports provided: MobileWinLossCellContent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileWinLossCellContent", function() { return MobileWinLossCellContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


const MobileWinLossCellContent = props => {
  const {
    item
  } = props;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, [item]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: item.WinLoss
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: item.Status
    }
  }));
};
const propTypes = {
  item: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
MobileWinLossCellContent.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileWinLossCellContent));

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
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _jsroot_layouts_betlist_BetListLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/layouts/betlist/BetListLayout */ "./www/js/source/reactpages/layouts/betlist/BetListLayout.jsx");
/* harmony import */ var _9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @9softstudio/react-simple-tab */ "./node_modules/@9softstudio/react-simple-tab/dist/index.js");
/* harmony import */ var _9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");










const PageLayout = props => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    toggleLoader
  } = _action_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const [isConvertAll, selectedBaseCurrency, hasExchange] = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => [state.isConvertAll, state.selectedBaseCurrency, state.hasExchange]);
  const {
    selectedTabIndex,
    children
  } = props;
  const getResource = key => {
    return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(key);
  };
  const formatDateString = dateString => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${date.getFullYear()}`;
  };
  const beforeShow = () => {
    dispatch(toggleLoader(true));
  };
  const afterShow = () => {
    dispatch(toggleLoader(false));
  };
  const activedTabList = _lib_constants__WEBPACK_IMPORTED_MODULE_8__["tabList"].filter(x => _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_9__["default"].tabList.includes(x.key));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: props.className
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_betlist_BetListLayout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    pageName: "BTC",
    rootUrl: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__["default"].getRootUrl(),
    getResourceFunc: getResource,
    formatDateStringFunc: formatDateString,
    baseCurrency: isConvertAll ? selectedBaseCurrency : '',
    beforeShowFunc: beforeShow,
    afterShowFunc: afterShow
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_5__["Tabs"], null, activedTabList.map(item => item.displayOrder < 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_5__["Tab"], {
    key: item.url,
    isActive: selectedTabIndex == item.displayOrder,
    label: item.label,
    url: item.url
  })), hasExchange && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_5__["Tab"], {
    key: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__["default"].resolveClientUrl("ExchangeVoided"),
    isActive: selectedTabIndex == 4,
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("Exchange"),
    url: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__["default"].resolveClientUrl("ExchangeVoided")
  }), activedTabList.map(item => item.displayOrder > 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_5__["Tab"], {
    key: item.url,
    isActive: selectedTabIndex == item.displayOrder,
    label: item.label,
    url: item.url
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, children))));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(PageLayout));

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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _class;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





class Service {
  static getTitle(fromDate, toDate, baseCurrency, viewSabaCoins = false) {
    if (viewSabaCoins) {
      return `${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BettingTicketCenter")}, ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Viewin").replace("{0}", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("SabaCoins"))}`;
    }
    const dateRangeText = fromDate && toDate ? `, ${_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateToString(fromDate)} → ${_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateToString(toDate)}` : '';
    const baseCurrencyText = baseCurrency ? `, ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BaseCurrency")}: ${baseCurrency}` : '';
    return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BettingTicketCenter") + dateRangeText + baseCurrencyText;
  }
  static getSelectedItemFromTreeListItem(items) {
    return items.reduce((accum, elem) => accum.concat(elem.Children), []).map(elem => elem.Value).join(",");
  }
  static getNormalizedSelectedParamValueForTreeListFilter(selectedValue, dataList) {
    const allSelected = this.getSelectedItemFromTreeListItem(dataList);
    return selectedValue === allSelected ? _constants__WEBPACK_IMPORTED_MODULE_2__["ALL_SELECTED_TEXT"] : selectedValue;
  }
}
_class = Service;
_defineProperty(Service, "getHeaderName", column => {
  if (column === 'LicenseeWL') {
    return `${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].LicenseeWL}/${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].Comm}`;
  }
  if (column === 'WinLoss' && _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].isAllowedCustomerComm) {
    return `${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].WinLoss}/${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].Comm}`;
  }
  if (column === "") {
    return "";
  }
  return _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"][column];
});
_defineProperty(Service, "isSingleDate", dateRange => {
  if (!dateRange) {
    return false;
  }
  const {
    fromDate,
    toDate
  } = dateRange;
  return moment__WEBPACK_IMPORTED_MODULE_4___default()(fromDate, "MM/DD/YYYY", true).isSame(moment__WEBPACK_IMPORTED_MODULE_4___default()(toDate, "MM/DD/YYYY", true), 'day');
});
_defineProperty(Service, "getSelectedBettype", (selectedValue, dataList) => {
  if (!selectedValue || selectedValue === _constants__WEBPACK_IMPORTED_MODULE_2__["ALL_SELECTED_TEXT"] || selectedValue === _class.getSelectedItemFromTreeListItem(dataList)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["ALL_SELECTED_TEXT"];
  }
  let betTypeList = selectedValue.split(",").map(elem => ({
    BetType: elem.substring(0, elem.indexOf("_")),
    ProductPrefix: elem.substring(elem.indexOf("_") + 1)
  }));
  let betTypeGroupByProduct = Map.groupBy(betTypeList, elem => elem.ProductPrefix);

  // build XML
  let xmlDoc = document.implementation.createDocument(null, "ROOT");
  const keys = [...betTypeGroupByProduct.keys()];
  keys.forEach(key => {
    let node = xmlDoc.createElement("BetType");
    let betTypes = betTypeGroupByProduct.get(key).map(x => x.BetType).join(",");
    node.setAttribute('ProductPrefix', key);
    node.setAttribute('BetTypes', betTypes);
    xmlDoc.documentElement.appendChild(node);
  });
  return new XMLSerializer().serializeToString(xmlDoc);
});
_defineProperty(Service, "isContainProductSportBook", selectedItemsKey => {
  var listSelectedProduct = selectedItemsKey.split(",");
  return listSelectedProduct.indexOf(_constants__WEBPACK_IMPORTED_MODULE_2__["ProductCode"].SportsBook) >= 0;
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js ***!
  \*************************************************************************************/
/*! exports provided: ApiUrl, HeaderText, DefaultPageSize, tabKeys, tabList, ALL_SELECTED_TEXT, CashOutMode, ProductCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiUrl", function() { return ApiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderText", function() { return HeaderText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultPageSize", function() { return DefaultPageSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabKeys", function() { return tabKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabList", function() { return tabList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_SELECTED_TEXT", function() { return ALL_SELECTED_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CashOutMode", function() { return CashOutMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCode", function() { return ProductCode; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/DataService */ "./www/js/source/reactpages/lib/DataService.js");



const ApiUrl = {
  CUSTOMER_SEARCH_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl("SearchCustomerAPI/SearchCustomer"),
  RUNNING_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].buildProxyUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].apiKeys.betlist, 'api/BettingTicketCenter/GetByRunning')),
  REFNO_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].buildProxyUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].apiKeys.betlist, 'api/BettingTicketCenter/GetByRefNo')),
  SINGLECUSTOMER_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].buildProxyUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].apiKeys.betlist, 'api/BettingTicketCenter/GetBySingleCustomer')),
  ADVANCEDSEARCH_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].buildProxyUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].apiKeys.betlist, 'api/BettingTicketCenterAdvancedSearch/GetData')),
  BOOKEDBET_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].buildProxyUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].apiKeys.betlist, 'api/BettingTicketCenter/GetByBookedBet')),
  ADVANCEDSEARCH_EXPORTSTATUS_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].buildProxyUrl(_jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].apiKeys.betlist, 'api/BettingTicketCenterAdvancedSearch/GetExportStatus'))
};
const HeaderText = {
  Index: "#",
  Platform: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Platform"),
  ExternalId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("ExternalId"),
  SystemId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("SystemId"),
  RefNo: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("RefNo"),
  TransTime: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("TransTime"),
  LicenseeTxId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("LicenseeTxId"),
  Choice: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Choice"),
  Odds: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Odds"),
  OddsType: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("OddsType"),
  Stake: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Stake"),
  WinLoss: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("WinLoss"),
  LicenseeWL: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("LicenseeWL"),
  Comm: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Comm"),
  Status: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Status"),
  Live: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Live"),
  Details: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Details"),
  BookedId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BookedId"),
  BookedTime: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BookedTime"),
  OddsLower: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("OddsLower"),
  OddsUpper: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("OddsUpper"),
  Icon: ""
};
const DefaultPageSize = 50;
const tabKeys = {
  advancedSearch: 'BTC_MultiCustomer',
  singleCustomer: 'BTC_SingleCustomer',
  refNo: 'BTC_RefNo',
  running: 'BTC_Running',
  bookedBet: 'BTC_BookedBet'
};
const tabList = [{
  key: tabKeys.singleCustomer,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("SinglePlayer"),
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
}, {
  key: tabKeys.bookedBet,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BookedBet"),
  url: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl("BettingTicketCenter/BookedBet"),
  displayOrder: 5
}];
const ALL_SELECTED_TEXT = 'ALL';
const CashOutMode = {
  IncludeCOFromSB: 0,
  ExcludeCOFromSB: 1,
  ViewCOOnly: 2
};
const ProductCode = {
  SportsBook: "SB",
  BA: "BA"
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/filterHandlerAction.js":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/filterHandlerAction.js ***!
  \**************************************************************************************************/
/*! exports provided: setSearchingId, setSearchingIdOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchingId", function() { return setSearchingId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchingIdOption", function() { return setSearchingIdOption; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/types.js");

const setSearchingId = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_SEARCHING_ID"],
    data: value
  };
};
const setSearchingIdOption = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_SEARCHING_ID_OPTION"],
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
/* harmony import */ var _jsroot_actions_viewSabaCoinsAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/actions/viewSabaCoinsAction */ "./www/js/source/reactpages/actions/viewSabaCoinsAction.js");










const ActionCreators = Object.assign({}, _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_1__, _filterHandlerAction_js__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_2__, _jsroot_actions_baseCurrencyAction__WEBPACK_IMPORTED_MODULE_3__, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_4__, _jsroot_actions_convertAllAction__WEBPACK_IMPORTED_MODULE_5__, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_6__, _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_7__, _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_8__, _jsroot_actions_viewSabaCoinsAction__WEBPACK_IMPORTED_MODULE_9__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/types.js":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/types.js ***!
  \************************************************************************************/
/*! exports provided: SET_SEARCHING_ID, SET_SEARCHING_ID_OPTION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SEARCHING_ID", function() { return SET_SEARCHING_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SEARCHING_ID_OPTION", function() { return SET_SEARCHING_ID_OPTION; });
const SET_SEARCHING_ID = "SET_SEARCHING_ID";
const SET_SEARCHING_ID_OPTION = "SET_SEARCHING_ID_OPTION";

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
/* harmony import */ var _desktop_DataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./desktop/DataGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/desktop/DataGrid.jsx");
/* harmony import */ var _desktop_FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./desktop/FormFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/desktop/FormFilter.jsx");
/* harmony import */ var _common_components_PageLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/components/PageLayout */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/PageLayout.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _mobile_MobileFormFilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mobile/MobileFormFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/mobile/MobileFormFilter.jsx");
/* harmony import */ var _mobile_MobileGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mobile/MobileGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/mobile/MobileGrid.jsx");
/* harmony import */ var _jsroot_customHooks_useMobileVersion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/customHooks/useMobileVersion */ "./www/js/source/reactpages/customHooks/useMobileVersion.jsx");









const AppContainer = () => {
  const isUseMobileVer = Object(_jsroot_customHooks_useMobileVersion__WEBPACK_IMPORTED_MODULE_8__["default"])();
  const isLoading = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.isLoading);
  const destopLayout = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isLoading: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_desktop_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_desktop_DataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  const mobileLayout = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isLoading: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mobile_MobileFormFilter__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mobile_MobileGrid__WEBPACK_IMPORTED_MODULE_7__["default"], null));
  const layout = isUseMobileVer ? mobileLayout : destopLayout;
  const className = isUseMobileVer ? "mobile-container" : "";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_PageLayout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: className,
    selectedTabIndex: "1"
  }, layout);
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/SearchingIdOption.jsx":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/SearchingIdOption.jsx ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/constants.js");




const SearchingIdOption = props => {
  const {
    value,
    onChange
  } = props;
  const [isOpen, setIsOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const toggleButton = {
    className: 'toggle-outline toggle-outline-light'
  };
  const selectedValue = value || _lib_constants__WEBPACK_IMPORTED_MODULE_3__["SearchingIdOptions"].refNo;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_2__["DropdownButton"], {
    className: "search-option",
    isOpen: isOpen,
    toggleButton: toggleButton,
    onToggle: handleToggleDropdown,
    buttonLabel: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "material-icons"
    }, "settings"),
    onClose: handleClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_2__["DropdownItem"], {
    tag: "div"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "selection-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "searchOption",
    value: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["SearchingIdOptions"].refNo,
    checked: selectedValue === _lib_constants__WEBPACK_IMPORTED_MODULE_3__["SearchingIdOptions"].refNo,
    onChange: onChange
  }), "\xA0\xA0", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('RefNo'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_2__["DropdownItem"], {
    tag: "div"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "selection-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "searchOption",
    value: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["SearchingIdOptions"].txID,
    checked: selectedValue === _lib_constants__WEBPACK_IMPORTED_MODULE_3__["SearchingIdOptions"].txID,
    onChange: onChange
  }), "\xA0\xA0", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('LicenseeTxId'))));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(SearchingIdOption));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/desktop/DataGrid.jsx":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/desktop/DataGrid.jsx ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _common_components_BaseDataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/components/BaseDataGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/BaseDataGrid.jsx");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");






const defaultColumns = ['Index', 'ExternalId', 'SystemId', 'RefNo', 'TransTime', 'Choice', 'Odds', 'OddsType', 'Stake', 'WinLoss', 'LicenseeWL', 'Status', 'Platform', 'Live'];
const defaultColumnWidths = [40, 120, 120, 160, 140, 370, 70, 70, 100, 100, 100, 110, 80, 80];
const defaultColumnAlignments = ['center-align', '', 'center-align', 'center-align', 'center-align', 'right-align', 'right-align', 'right-align', 'right-align', 'right-align', 'right-align', 'center-align', 'center-align', 'center-align'];
const TooltipColumns = ['SystemId', 'RefNo', 'LicenseeTxId'];
const DataGrid = props => {
  const requestParam = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(state => state.requestParam);
  var Columns = [...defaultColumns];
  var ColumnWidths = [...defaultColumnWidths];
  var ColumnAlignments = [...defaultColumnAlignments];
  if (_jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].isAllowSabaCoins && requestParam.ViewSabaCoins && Columns.includes('LicenseeWL')) {
    Columns.splice(10, 1);
    ColumnWidths.splice(10, 1);
    ColumnAlignments.splice(10, 1);
  }
  if (_jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].isAllowTxIDColumn && !Columns.includes('LicenseeTxId')) {
    Columns.splice(4, 0, 'LicenseeTxId');
    ColumnWidths.splice(4, 0, 110);
    ColumnAlignments.splice(4, 0, 'center-align');
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_BaseDataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], {
    key: `refno_data_${Object(uuid__WEBPACK_IMPORTED_MODULE_5__["v4"])()}`,
    dataUrl: _common_lib_constants__WEBPACK_IMPORTED_MODULE_1__["ApiUrl"].REFNO_DATA_URL,
    isPaging: false,
    columns: Columns,
    columnWidths: ColumnWidths,
    columnAlignments: ColumnAlignments,
    tooltipColumns: TooltipColumns,
    totalText: "",
    totalColumns: [],
    sortableColumns: []
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/desktop/FormFilter.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/desktop/FormFilter.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _filters_BaseCurrencySelectList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../filters/BaseCurrencySelectList */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/BaseCurrencySelectList.jsx");
/* harmony import */ var _hooks_useFilterAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/useFilterAction */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/hooks/useFilterAction.jsx");
/* harmony import */ var _hooks_useValidParam__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks/useValidParam */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/hooks/useValidParam.jsx");
/* harmony import */ var _filters_StickyIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../filters/StickyIcon */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/StickyIcon.jsx");
/* harmony import */ var _filters_RefNoFilter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../filters/RefNoFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/RefNoFilter.jsx");
/* harmony import */ var _filters_UserNameFilter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../filters/UserNameFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/UserNameFilter.jsx");
/* harmony import */ var _filters_ConvertAllCheckBox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../filters/ConvertAllCheckBox */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/ConvertAllCheckBox.jsx");
/* harmony import */ var _filters_ViewSabaCoinsCheckBox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../filters/ViewSabaCoinsCheckBox */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/ViewSabaCoinsCheckBox.jsx");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _filters_Note__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../filters/Note */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/Note.jsx");














const FormFilter = () => {
  const viewSabaCoins = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.viewSabaCoins);
  const isValidModel = Object(_hooks_useValidParam__WEBPACK_IMPORTED_MODULE_6__["useValidParam"])();
  const {
    submit
  } = Object(_hooks_useFilterAction__WEBPACK_IMPORTED_MODULE_5__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "mobile-mode page-filter",
    stickyFooter: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_StickyIcon__WEBPACK_IMPORTED_MODULE_7__["default"], null)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_RefNoFilter__WEBPACK_IMPORTED_MODULE_8__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_UserNameFilter__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BaseCurrencySelectList__WEBPACK_IMPORTED_MODULE_4__["default"], {
    disabled: viewSabaCoins
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-4 col-sm-4 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ConvertAllCheckBox__WEBPACK_IMPORTED_MODULE_10__["default"], {
    disabled: viewSabaCoins
  })), _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"].isAllowSabaCoins && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-4 col-sm-4 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ViewSabaCoinsCheckBox__WEBPACK_IMPORTED_MODULE_11__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    disabled: !isValidModel,
    className: "btn btn-submit",
    onClick: submit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("Submit")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_Note__WEBPACK_IMPORTED_MODULE_13__["default"], null)));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/BaseCurrencySelectList.jsx":
/*!*****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/BaseCurrencySelectList.jsx ***!
  \*****************************************************************************************************************/
/*! exports provided: BaseCurrencySelectList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseCurrencySelectList", function() { return BaseCurrencySelectList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/index.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






const BaseCurrencySelectList = props => {
  const selectedBaseCurrency = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(state => state.selectedBaseCurrency);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();
  const {
    setSelectedBaseCurrency
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"];
  let baseCurrencyList = [];
  if (props.disabled) {
    baseCurrencyList = [{
      value: "All",
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("All")
    }];
  } else {
    baseCurrencyList = [..._jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_1__["default"].baseCurrencyList];
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("BaseCurrency")), baseCurrencyList && baseCurrencyList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
    instanceId: "ddlBased",
    key: `ddlBased_${props.disabled}`,
    value: selectedBaseCurrency,
    options: baseCurrencyList,
    onChange: item => dispatch(setSelectedBaseCurrency(item.value))
  }, props)));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(BaseCurrencySelectList));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/ConvertAllCheckBox.jsx":
/*!*************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/ConvertAllCheckBox.jsx ***!
  \*************************************************************************************************************/
/*! exports provided: ConvertAllCheckBox, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConvertAllCheckBox", function() { return ConvertAllCheckBox; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/index.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





const ConvertAllCheckBox = props => {
  const isConvertAll = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.isConvertAll, react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    changeIsConvertAll
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
    id: "IsConvertAll",
    key: `IsConvertAll_${props.disabled}`,
    checked: isConvertAll,
    onChange: checked => dispatch(changeIsConvertAll(checked)),
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("ConvertAllFiguresToBaseCurrency")
  }, props)));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(ConvertAllCheckBox));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/FilterUserGuide.jsx":
/*!**********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/FilterUserGuide.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: FilterUserGuide, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterUserGuide", function() { return FilterUserGuide; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/UserGuide */ "./www/js/source/reactpages/components/UserGuide.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/index.js");






const FilterUserGuide = () => {
  const userGuideContent = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(state => state.userGuideContent);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, [userGuideContent]);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
  const {
    getUserGuideContent
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"];
  const _showUserGuide = () => {
    if (!userGuideContent || userGuideContent.length === 0) {
      dispatch(getUserGuideContent('BettingTicketCenterRefno'));
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("UserGuide"),
    contentTitle: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("BettingTicketCenter"),
    onClick: _showUserGuide,
    content: userGuideContent
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(FilterUserGuide));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/Note.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/Note.jsx ***!
  \***********************************************************************************************/
/*! exports provided: Note, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Note", function() { return Note; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);




const Note = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 note"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Note'), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: props.contentClass
  }, _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].isAllowTxIDColumn && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "* ", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BettingTicketCenter_RefnoTabNote_TxIDSearch').replace('{0}', _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].balanceupDay), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "* ", _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].productsRequireTxIdNote, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].productsRequireUseNameNote && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "* ", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BettingTicketCenter_RefnoTabNote2').replace('{0}', _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].productsRequireUseNameNote).replace('{1}', _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].balanceupDay), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), "* ", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BettingTicketCenter_RefnoTabNote3').replace('{0}', _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].balanceupDay)));
};
const propTypes = {
  contentClass: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string
};
const defaultProps = {
  contentClass: "col-9"
};
Note.propTypes = propTypes;
Note.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(Note));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/RefNoFilter.jsx":
/*!******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/RefNoFilter.jsx ***!
  \******************************************************************************************************/
/*! exports provided: RefNoFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefNoFilter", function() { return RefNoFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/index.js");
/* harmony import */ var _SearchingIdOption_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SearchingIdOption.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/SearchingIdOption.jsx");
/* harmony import */ var _lib_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/constants.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/constants.js");
/* harmony import */ var _lib_helper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/helper.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/helper.js");







const RefNoFilter = () => {
  const [searchingIdOption, searchingId] = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => [state.searchingIdOption, state.searchingId], react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const searchingIdText = _lib_helper_js__WEBPACK_IMPORTED_MODULE_6__["default"].getSearchingIdText(searchingIdOption);
  const {
    setSearchingId,
    setSearchingIdOption
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, searchingIdText, _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].isAllowTxIDColumn && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchingIdOption_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: searchingIdOption,
    onChange: event => {
      dispatch(setSearchingIdOption(event.target.value));
      dispatch(setSearchingId(''));
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "input-text",
    id: "SearchingId",
    name: "SearchingId",
    type: searchingIdOption === _lib_constants_js__WEBPACK_IMPORTED_MODULE_5__["SearchingIdOptions"].refNo ? "number" : "text",
    value: searchingId,
    placeholder: searchingIdText,
    onChange: event => dispatch(setSearchingId(event.target.value))
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(RefNoFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/StickyIcon.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/StickyIcon.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: StickyIcon, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StickyIcon", function() { return StickyIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _FilterUserGuide_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FilterUserGuide.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/FilterUserGuide.jsx");
/* harmony import */ var _hooks_useFilterAction_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useFilterAction.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/hooks/useFilterAction.jsx");




const StickyIcon = () => {
  const {
    exportExcel
  } = Object(_hooks_useFilterAction_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-excel right",
    onClick: exportExcel,
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("ExportToExcel")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FilterUserGuide_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(StickyIcon));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/UserNameFilter.jsx":
/*!*********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/UserNameFilter.jsx ***!
  \*********************************************************************************************************/
/*! exports provided: UserNameFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserNameFilter", function() { return UserNameFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/auto-complete */ "./www/js/source/reactpages/components/auto-complete/index.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/index.js");
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _lib_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/helper */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/helper.js");







const UserNameFilter = () => {
  const searchingIdOption = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.searchingIdOption, react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const userNameText = _lib_helper__WEBPACK_IMPORTED_MODULE_6__["default"].getUserNameText(searchingIdOption);
  const {
    setUsername
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, userNameText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_2__["default"], {
    url: _common_lib_constants__WEBPACK_IMPORTED_MODULE_5__["ApiUrl"].CUSTOMER_SEARCH_URL,
    onSelect: value => dispatch(setUsername(value)),
    onInput: value => dispatch(setUsername(value)),
    htmlAttributes: {
      placeholder: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("ExternalIdOrSystemId")
    }
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(UserNameFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/ViewSabaCoinsCheckBox.jsx":
/*!****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/ViewSabaCoinsCheckBox.jsx ***!
  \****************************************************************************************************************/
/*! exports provided: ViewSabaCoinsCheckBox, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewSabaCoinsCheckBox", function() { return ViewSabaCoinsCheckBox; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/index.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






const ViewSabaCoinsCheckBox = () => {
  const viewSabaCoins = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.viewSabaCoins);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    changeViewSabaCoins,
    changeIsConvertAll,
    setSelectedBaseCurrency
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"];
  const onViewSabaCoinsChane = value => {
    if (value) {
      dispatch(changeIsConvertAll(false));
      dispatch(setSelectedBaseCurrency("All"));
    } else {
      dispatch(changeIsConvertAll(true));
      dispatch(setSelectedBaseCurrency(_jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].defaultSelectedBaseCurrency));
    }
    dispatch(changeViewSabaCoins(value));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__["default"], {
    id: "ViewSabaCoins",
    checked: viewSabaCoins,
    onChange: checked => onViewSabaCoinsChane(checked),
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("ViewSabaCoins")
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(ViewSabaCoinsCheckBox));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/hooks/useFilterAction.jsx":
/*!********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/hooks/useFilterAction.jsx ***!
  \********************************************************************************************************/
/*! exports provided: useFilterAction, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFilterAction", function() { return useFilterAction; });
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _common_lib_Service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/lib/Service */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/constants.js");
/* harmony import */ var _useValidParam_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useValidParam.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/hooks/useValidParam.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_9__);










const useFilterAction = () => {
  const isValidModel = Object(_useValidParam_jsx__WEBPACK_IMPORTED_MODULE_7__["useValidParam"])();
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["useDispatch"])();
  const {
    requestParam,
    searchingIdOption,
    searchingId,
    username,
    isConvertAll,
    selectedBaseCurrency,
    viewSabaCoins
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["useSelector"])(state => state, react_redux__WEBPACK_IMPORTED_MODULE_8__["shallowEqual"]);
  const {
    setReportTitle,
    setRequestParam,
    toggleLoader,
    getGridData
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_0__["ActionCreators"];
  const _getParams = () => {
    if (!isValidModel) {
      return null;
    }
    const {
      PageSize,
      SortBy,
      SortOrder
    } = requestParam;
    return {
      PageSize: PageSize,
      PageIndex: 1,
      Refno: searchingIdOption === _lib_constants__WEBPACK_IMPORTED_MODULE_6__["SearchingIdOptions"].refNo ? searchingId : '',
      TxId: searchingIdOption === _lib_constants__WEBPACK_IMPORTED_MODULE_6__["SearchingIdOptions"].txID ? searchingId : '',
      Username: username,
      BaseCurrency: isConvertAll ? selectedBaseCurrency : '',
      IsConvertAll: isConvertAll,
      SortBy: SortBy,
      SortOrder: SortOrder,
      ViewSabaCoins: viewSabaCoins
    };
  };
  const submit = event => {
    event.preventDefault();
    const params = _getParams();
    if (!params) {
      return;
    }
    dispatch(setReportTitle(_common_lib_Service__WEBPACK_IMPORTED_MODULE_5__["default"].getTitle(null, null, params.BaseCurrency, params.ViewSabaCoins)));
    dispatch(setRequestParam(params));
    dispatch(toggleLoader(true));
    dispatch(getGridData(_common_lib_constants__WEBPACK_IMPORTED_MODULE_4__["ApiUrl"].REFNO_DATA_URL, params));
  };
  const exportExcel = event => {
    event.preventDefault();
    const params = _getParams();
    if (!params) {
      return;
    }
    if (_jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].isAllowTxIDColumn) {
      params.IsAllowTxIDColumn = true;
    }
    params.IsExport = true;
    dispatch(toggleLoader(true));
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_3__["default"].getFile(_common_lib_constants__WEBPACK_IMPORTED_MODULE_4__["ApiUrl"].REFNO_DATA_URL, params).then(response => {
      const NoContentStatusCode = 204;
      if (response.status === NoContentStatusCode) {
        alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("NoInfo"));
      } else {
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel"
        });
        Object(file_saver__WEBPACK_IMPORTED_MODULE_9__["saveAs"])(blob, 'BettingTicketsCenter_RefNo.xls');
      }
      dispatch(toggleLoader(false));
    });
  };
  return {
    submit,
    exportExcel
  };
};
/* harmony default export */ __webpack_exports__["default"] = (useFilterAction);

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/hooks/useValidParam.jsx":
/*!******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/hooks/useValidParam.jsx ***!
  \******************************************************************************************************/
/*! exports provided: useValidParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useValidParam", function() { return useValidParam; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_lib_validationHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/validationHelper */ "./www/js/source/reactpages/lib/validationHelper.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/constants.js");



const useValidParam = () => {
  const {
    searchingId,
    selectedBaseCurrency,
    username,
    searchingIdOption,
    viewSabaCoins
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useSelector"])(state => state, react_redux__WEBPACK_IMPORTED_MODULE_0__["shallowEqual"]);
  return searchingId && (viewSabaCoins || Object(_jsroot_lib_validationHelper__WEBPACK_IMPORTED_MODULE_1__["validateBaseCurrency"])(selectedBaseCurrency)) && (username || searchingIdOption === _lib_constants__WEBPACK_IMPORTED_MODULE_2__["SearchingIdOptions"].refNo);
};

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
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/constants.js");








const defaultState = Object.assign({}, window.initialState, {
  userGuideContent: '',
  requestParam: {
    PageSize: _common_lib_constants__WEBPACK_IMPORTED_MODULE_6__["DefaultPageSize"]
  },
  searchingIdOption: _lib_constants__WEBPACK_IMPORTED_MODULE_7__["SearchingIdOptions"].refNo
});
const store = _lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers_index_js__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);
class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  }
}
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById('app-container'));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/mobile/MobileFormFilter.jsx":
/*!**********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/mobile/MobileFormFilter.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: MobileFormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileFormFilter", function() { return MobileFormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _filters_BaseCurrencySelectList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../filters/BaseCurrencySelectList */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/BaseCurrencySelectList.jsx");
/* harmony import */ var _hooks_useFilterAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useFilterAction */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/hooks/useFilterAction.jsx");
/* harmony import */ var _hooks_useValidParam__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/useValidParam */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/hooks/useValidParam.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _filters_StickyIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../filters/StickyIcon */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/StickyIcon.jsx");
/* harmony import */ var _filters_RefNoFilter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../filters/RefNoFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/RefNoFilter.jsx");
/* harmony import */ var _filters_UserNameFilter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../filters/UserNameFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/UserNameFilter.jsx");
/* harmony import */ var _filters_ConvertAllCheckBox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../filters/ConvertAllCheckBox */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/ConvertAllCheckBox.jsx");
/* harmony import */ var _filters_ViewSabaCoinsCheckBox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../filters/ViewSabaCoinsCheckBox */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/ViewSabaCoinsCheckBox.jsx");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _filters_Note__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../filters/Note */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/filters/Note.jsx");














const MobileFormFilter = () => {
  const isValidModel = Object(_hooks_useValidParam__WEBPACK_IMPORTED_MODULE_5__["useValidParam"])();
  const {
    submit
  } = Object(_hooks_useFilterAction__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const [isCollapsed, setIsCollapse] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const viewSabaCoins = Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["useSelector"])(state => state.viewSabaCoins);
  const onCollapse = () => {
    setIsCollapse(true);
  };
  const onExpand = () => {
    setIsCollapse(false);
  };
  const style = isCollapsed ? {
    display: "none"
  } : {};
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "mobile-mode page-filter",
    onCollapse: onCollapse,
    onExpand: onExpand,
    isInitCollapsed: true,
    isCustomCollapse: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_RefNoFilter__WEBPACK_IMPORTED_MODULE_8__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_UserNameFilter__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BaseCurrencySelectList__WEBPACK_IMPORTED_MODULE_3__["default"], {
    disabled: viewSabaCoins
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ConvertAllCheckBox__WEBPACK_IMPORTED_MODULE_10__["default"], {
    disabled: viewSabaCoins
  })), _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"].isAllowSabaCoins && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ViewSabaCoinsCheckBox__WEBPACK_IMPORTED_MODULE_11__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    disabled: !isValidModel,
    className: "btn btn-submit",
    onClick: submit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("Submit")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "caret-block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_StickyIcon__WEBPACK_IMPORTED_MODULE_7__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row filter-note",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_Note__WEBPACK_IMPORTED_MODULE_13__["default"], {
    contentClass: "col-12"
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileFormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/mobile/MobileGrid.jsx":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/components/mobile/MobileGrid.jsx ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _common_components_BaseMobileDataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/components/BaseMobileDataGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/BaseMobileDataGrid.jsx");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_mobile_component_CompositeRow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../components/mobile-component/CompositeRow */ "./www/js/source/reactpages/components/mobile-component/CompositeRow.jsx");
/* harmony import */ var _common_lib_Service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/lib/Service */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js");
/* harmony import */ var _common_components_MobileBetlistContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../common/components/MobileBetlistContent */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/MobileBetlistContent.jsx");
/* harmony import */ var _common_components_MobileWinLossCellContent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../common/components/MobileWinLossCellContent */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/MobileWinLossCellContent.jsx");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_9__);










const Columns = ['Details', 'Stake', 'WinLoss', 'Icon'];
const MobileGrid = () => {
  const [data, requestParam] = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(state => [state.gridData.Data, state.requestParam], react_redux__WEBPACK_IMPORTED_MODULE_4__["shallowEqual"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, [data]);
  const isDisplayTxIdColumn = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].isAllowTxIDColumn;
  const isDisplayLicenseeWLColumn = !(_jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].isAllowSabaCoins && requestParam.ViewSabaCoins);
  const getRows = () => {
    if (!data) {
      return null;
    }
    return data.map(item => renderCompositeRow(item));
  };
  const renderCompositeRow = item => {
    const expandRows = getExpandRows(item);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_mobile_component_CompositeRow__WEBPACK_IMPORTED_MODULE_5__["default"], {
      key: item.RefNo,
      expandRows: expandRows
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_9__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_MobileBetlistContent__WEBPACK_IMPORTED_MODULE_7__["default"], {
      item: item
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_9__["Cell"], {
      className: "right-align cell-stake",
      dangerouslySetInnerHTML: {
        __html: item.Stake
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_9__["Cell"], {
      className: "right-align cell-winloss"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_MobileWinLossCellContent__WEBPACK_IMPORTED_MODULE_8__["default"], {
      item: item
    })));
  };
  const getExpandRows = item => {
    let rows = [];
    if (isDisplayTxIdColumn) {
      rows.push(renderExpandRow(_common_lib_constants__WEBPACK_IMPORTED_MODULE_1__["HeaderText"].LicenseeTxId, item.LicenseeTxId));
    }
    rows.push(renderExpandRow(_common_lib_constants__WEBPACK_IMPORTED_MODULE_1__["HeaderText"].SystemId, item.SystemId));
    if (isDisplayLicenseeWLColumn) {
      rows.push(renderExpandRow(_common_lib_Service__WEBPACK_IMPORTED_MODULE_6__["default"].getHeaderName('LicenseeWL'), item.LicenseeWL));
    }
    rows.push(renderExpandRow(_common_lib_constants__WEBPACK_IMPORTED_MODULE_1__["HeaderText"].Platform, item.Platform));
    rows.push(renderExpandRow(_common_lib_constants__WEBPACK_IMPORTED_MODULE_1__["HeaderText"].Live, item.Live));
    return rows;
  };
  const renderExpandRow = (key, value) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_9__["Cell"], {
      className: "right-align"
    }, key), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_9__["Cell"], {
      colSpan: 3,
      className: "left-align",
      dangerouslySetInnerHTML: {
        __html: value
      }
    }));
  };
  const body = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => getRows(), [data]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_BaseMobileDataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], {
    dataUrl: _common_lib_constants__WEBPACK_IMPORTED_MODULE_1__["ApiUrl"].REFNO_DATA_URL,
    isPaging: false,
    columns: Columns,
    body: body
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/constants.js":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/constants.js ***!
  \************************************************************************************/
/*! exports provided: SearchingIdOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchingIdOptions", function() { return SearchingIdOptions; });
const SearchingIdOptions = {
  refNo: '1',
  txID: '2'
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/helper.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/helper.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Helper; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/lib/constants.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


class Helper {}
_defineProperty(Helper, "getSearchingIdText", searchingIdOption => {
  return searchingIdOption === _lib_constants__WEBPACK_IMPORTED_MODULE_1__["SearchingIdOptions"].refNo ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("RefNo") : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("LicenseeTxId");
});
_defineProperty(Helper, "getUserNameText", searchingIdOption => {
  return searchingIdOption === _lib_constants__WEBPACK_IMPORTED_MODULE_1__["SearchingIdOptions"].txID ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Username") + " *" : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Username");
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/refno/reducers/filterHandlerReducer.js":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/refno/reducers/filterHandlerReducer.js ***!
  \****************************************************************************************************/
/*! exports provided: searchingId, searchingIdOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchingId", function() { return searchingId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchingIdOption", function() { return searchingIdOption; });
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/pages/bettingticketscenter/refno/actions/types.js");


const searchingId = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SEARCHING_ID"]](state, action) {
    return action.data;
  }
});
const searchingIdOption = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SEARCHING_ID_OPTION"]](state, action) {
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
/* harmony import */ var _jsroot_reducers_viewSabaCoinsReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/reducers/viewSabaCoinsReducer */ "./www/js/source/reactpages/reducers/viewSabaCoinsReducer.js");
/* harmony import */ var _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/reducers/requestParamReducer */ "./www/js/source/reactpages/reducers/requestParamReducer.js");
/* harmony import */ var _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/reducers/reportTitleReducer */ "./www/js/source/reactpages/reducers/reportTitleReducer.js");
/* harmony import */ var _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/reducers/userGuideReducer */ "./www/js/source/reactpages/reducers/userGuideReducer.js");
/* harmony import */ var _common_components_reducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common/components/reducer */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/reducer.js");












/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_jsroot_reducers_gridDataReducer_js__WEBPACK_IMPORTED_MODULE_1__, _filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_2__, _jsroot_reducers_usernameReducer__WEBPACK_IMPORTED_MODULE_3__, _jsroot_reducers_baseCurrencyReducer__WEBPACK_IMPORTED_MODULE_4__, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_5__, _jsroot_reducers_convertAllReducer__WEBPACK_IMPORTED_MODULE_6__, _jsroot_reducers_viewSabaCoinsReducer__WEBPACK_IMPORTED_MODULE_7__, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_8__, _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_9__, _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_10__, _common_components_reducer__WEBPACK_IMPORTED_MODULE_11__)));

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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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


const username = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(null, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_USERNAME"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/reducers/viewSabaCoinsReducer.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/viewSabaCoinsReducer.js ***!
  \*******************************************************************/
/*! exports provided: viewSabaCoins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewSabaCoins", function() { return viewSabaCoins; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const viewSabaCoins = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["CHANGE_VIEW_SABA_COINS"]](state, action) {
    return action.data;
  }
});

/***/ })

/******/ });
//# sourceMappingURL=refno.chunk.js.map