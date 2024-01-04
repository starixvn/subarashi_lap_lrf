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
/******/ 		"www/js/build/dev/reactpages/report/winlossanalysis": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/winlossanalysis/components/index.jsx","lib/common"]);
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

/***/ "./www/js/source/reactpages/actions/customerclassAction.js":
/*!*****************************************************************!*\
  !*** ./www/js/source/reactpages/actions/customerclassAction.js ***!
  \*****************************************************************/
/*! exports provided: setSelectedCustomerClass, setSelectedRiskLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedCustomerClass", function() { return setSelectedCustomerClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedRiskLevel", function() { return setSelectedRiskLevel; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

const setSelectedCustomerClass = selectedCustomerClass => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_CUSTOMERCLASS"],
    data: selectedCustomerClass
  };
};
const setSelectedRiskLevel = selectedRiskLevel => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_RISKLEVEL"],
    data: selectedRiskLevel
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

/***/ "./www/js/source/reactpages/actions/liveStatusAction.js":
/*!**************************************************************!*\
  !*** ./www/js/source/reactpages/actions/liveStatusAction.js ***!
  \**************************************************************/
/*! exports provided: setSelectedLiveStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedLiveStatus", function() { return setSelectedLiveStatus; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

const setSelectedLiveStatus = item => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_LIVESTATUS"],
    data: item
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

/***/ "./www/js/source/reactpages/actions/platformAction.js":
/*!************************************************************!*\
  !*** ./www/js/source/reactpages/actions/platformAction.js ***!
  \************************************************************/
/*! exports provided: setSelectedPlatform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedPlatform", function() { return setSelectedPlatform; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

const setSelectedPlatform = item => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_PLATFORM"],
    data: item
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

const setSelectedStatus = item => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_STATUS"],
    data: item
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/subsidiaryAction.js":
/*!**************************************************************!*\
  !*** ./www/js/source/reactpages/actions/subsidiaryAction.js ***!
  \**************************************************************/
/*! exports provided: setSubsidiaryList, setSubsidiarySearch, setWhiteLabelTreeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSubsidiaryList", function() { return setSubsidiaryList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSubsidiarySearch", function() { return setSubsidiarySearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setWhiteLabelTreeList", function() { return setWhiteLabelTreeList; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

const setSubsidiaryList = subsidiaryList => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SUBSIDIARY_LIST"],
    data: subsidiaryList
  };
};
const setSubsidiarySearch = subsidiarySearch => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SUBSIDIARY_SEARCH"],
    data: subsidiarySearch
  };
};
const setWhiteLabelTreeList = whiteLabelTreeList => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_WHITELABEL_TREE_LIST"],
    data: whiteLabelTreeList
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/types.js":
/*!***************************************************!*\
  !*** ./www/js/source/reactpages/actions/types.js ***!
  \***************************************************/
/*! exports provided: FETCH_DATA, SET_GRID_DATA, SET_SELECTED_PRODUCT, SET_SELECTED_BASECURRENCY, SET_BASECURRENCY_LIST, SET_SELECTED_CURRENCY, TOGGLE_LOADER, CHANGE_IS_EXCLUDE_TEST, USER_GUIDE_CONTENT, SET_DATE_RANGE, GET_DATE_CONSTRAINT, CHANGE_IS_CONVERT_ALL, SET_SELECTED_STATUS, SET_SELECTED_PLATFORM, SET_SELECTED_LIVESTATUS, SET_USERNAME, SET_REQUEST_PARAM, SET_REPORT_TITLE, SET_SPORT_LIST, SET_PAGING_OPTION, SET_SUBSIDIARY_LIST, SET_SUBSIDIARY_SEARCH, SET_WHITELABEL_TREE_LIST, SET_REASON_LIST, SET_SELECTED_VIP_OPTION, SET_SELECTED_CUSTOMERCLASS, SET_SELECTED_RISKLEVEL, SET_SELECTED_ODDGROUP */
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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

/***/ "./www/js/source/reactpages/components/date-range/CalendarList.jsx":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/CalendarList.jsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Calendar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Calendar.js */ "./www/js/source/reactpages/components/date-range/Calendar.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/components/date-range/constants.js");




const CalendarList = props => {
  const {
    format,
    linkedCalendars,
    firstDayOfWeek,
    minDate,
    maxDate,
    classNames,
    onlyClasses,
    specialDays,
    lang,
    disableDaysBeforeToday,
    showMonthArrow,
    range,
    link,
    styles,
    calendarsCount,
    locale,
    linkCB,
    onChange
  } = props;
  const calendars = [];
  for (let i = calendarsCount; i >= 0; i--) {
    const shownDate = i == calendarsCount ? range.startDate : range.endDate;
    calendars.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Calendar_js__WEBPACK_IMPORTED_MODULE_2__["default"], {
      showMonthArrow: showMonthArrow,
      shownDate: shownDate,
      disableDaysBeforeToday: disableDaysBeforeToday,
      lang: lang,
      key: i + shownDate.month().toString() + shownDate.year().toString(),
      link: linkedCalendars && link,
      linkCB: linkCB,
      range: range,
      format: format,
      firstDayOfWeek: firstDayOfWeek,
      theme: styles,
      minDate: minDate,
      maxDate: maxDate,
      onlyClasses: onlyClasses,
      specialDays: specialDays,
      classNames: classNames,
      onChange: onChange,
      locale: locale
    }));
  }
  return calendars;
};
CalendarList.defaultProps = {
  format: _constants__WEBPACK_IMPORTED_MODULE_3__["MomentFormat"].default,
  theme: {},
  showMonthArrow: true,
  disableDaysBeforeToday: false,
  onlyClasses: false,
  classNames: {},
  specialDays: []
};
CalendarList.propTypes = {
  showMonthArrow: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  disableDaysBeforeToday: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  lang: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
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
  link: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    startDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
    endDate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
  }), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool]),
  linkCB: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onlyClasses: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  specialDays: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  locale: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  calendarsCount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};
/* harmony default export */ __webpack_exports__["default"] = (CalendarList);

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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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

/***/ "./www/js/source/reactpages/components/date-range/DateRange.jsx":
/*!**********************************************************************!*\
  !*** ./www/js/source/reactpages/components/date-range/DateRange.jsx ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_parseInput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseInput.js */ "./www/js/source/reactpages/components/date-range/utils/parseInput.js");
/* harmony import */ var _PredefinedRanges_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PredefinedRanges.js */ "./www/js/source/reactpages/components/date-range/PredefinedRanges.js");
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.js */ "./www/js/source/reactpages/components/date-range/styles.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants.js */ "./www/js/source/reactpages/components/date-range/constants.js");
/* harmony import */ var _defaultOptions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./defaultOptions.js */ "./www/js/source/reactpages/components/date-range/defaultOptions.js");
/* harmony import */ var _Overlay_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Overlay.jsx */ "./www/js/source/reactpages/components/Overlay.jsx");
/* harmony import */ var _CalendarList_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CalendarList.jsx */ "./www/js/source/reactpages/components/date-range/CalendarList.jsx");
/* harmony import */ var _popup_index_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../popup/index.jsx */ "./www/js/source/reactpages/components/popup/index.jsx");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
      this.originalRange = _objectSpread({}, range);
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
    const startDate = Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_2__["default"])(props.startDate, format, 'startOf');
    const endDate = Object(_utils_parseInput_js__WEBPACK_IMPORTED_MODULE_2__["default"])(props.endDate, format, 'endOf');
    this.styles = Object(_styles_js__WEBPACK_IMPORTED_MODULE_4__["default"])(theme);
    this.calendarSelectionStep = 0;
    this.locale = _objectSpread(_objectSpread({}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_7__["default"].locale), props.locale);
    this.isValid = true;
    this.originalRange = {
      startDate,
      endDate
    };
    this.ranges = _objectSpread(_objectSpread({}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_7__["default"].ranges(props.today, props.minDate, props.maxDate, props.limitedMonthRange)), props.ranges);
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
      showMonthArrow,
      isMobile
    } = this.props;
    const {
      range,
      link
    } = this.state;
    const {
      styles
    } = this;
    const classes = _objectSpread(_objectSpread({}, _styles_js__WEBPACK_IMPORTED_MODULE_4__["defaultClasses"]), classNames);
    const calendarsCount = Number(calendars) - 1;
    const buttonHandlers = {
      apply: this.handleApply,
      cancel: this.handleCancel
    };
    const calendarList = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CalendarList_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
      showMonthArrow: showMonthArrow,
      calendarsCount: calendarsCount,
      disableDaysBeforeToday: disableDaysBeforeToday,
      lang: lang,
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
    });
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
    })), isMobile ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_popup_index_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
      isShow: this.state.show,
      isShowTitle: false,
      className: 'rdr-mobile-popup',
      height: 'auto',
      width: 'auto',
      key: range.startDate.month().toString() + range.startDate.year().toString() + range.endDate.month().toString() + range.endDate.year().toString()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.dateRange,
      ref: element => this.dateRangeContainer = element
    }, showRange && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PredefinedRanges_js__WEBPACK_IMPORTED_MODULE_3__["default"], {
      format: format,
      ranges: this.ranges,
      range: range,
      theme: styles,
      onSelect: range => this.handlePredefinedRangesSelect(range),
      onlyClasses: onlyClasses,
      classNames: classes,
      locale: this.locale,
      isShowRangeButton: false,
      buttonHandlers: buttonHandlers
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mobile-calender"
    }, calendarList)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "calender-button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: classes.applyButton,
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['RangeApplyButton']), style),
      type: "button",
      onClick: buttonHandlers.apply
    }, this.locale.applyLabel), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: classes.cancelButton,
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['RangeCancelButton']), style),
      onClick: buttonHandlers.cancel,
      type: "button"
    }, this.locale.cancelLabel))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
      isOpening: this.state.show,
      onClose: this.handleCancel,
      key: range.startDate.month().toString() + range.startDate.year().toString() + range.endDate.month().toString() + range.endDate.year().toString()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.dateRange,
      ref: element => this.dateRangeContainer = element
    }, showRange && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PredefinedRanges_js__WEBPACK_IMPORTED_MODULE_3__["default"], {
      format: format,
      ranges: this.ranges,
      range: range,
      theme: styles,
      onSelect: range => this.handlePredefinedRangesSelect(range),
      onlyClasses: onlyClasses,
      classNames: classes,
      locale: this.locale,
      buttonHandlers: buttonHandlers
    }), calendarList)));
  }
}
DateRange.defaultProps = {
  linkedCalendars: false,
  theme: {},
  format: _constants_js__WEBPACK_IMPORTED_MODULE_6__["MomentFormat"].default,
  calendars: 2,
  onlyClasses: true,
  classNames: {},
  specialDays: [],
  twoStepChange: false,
  showRange: true,
  isMobile: false
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
  today: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, dayMoment.date())));
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
      classNames,
      isShowRangeButton
    } = this.props;
    const {
      styles
    } = this;
    const classes = _objectSpread(_objectSpread({}, _styles_js__WEBPACK_IMPORTED_MODULE_5__["defaultClasses"]), classNames);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: onlyClasses ? undefined : _objectSpread(_objectSpread({}, styles['PredefinedRanges']), style),
      className: classes.predefinedRanges
    }, this.renderRangeList(classes), isShowRangeButton && this.renderRangeButtons(classes));
  }
}
PredefinedRanges.defaultProps = {
  onlyClasses: false,
  classNames: {},
  isShowRangeButton: true
};
PredefinedRanges.propTypes = {
  ranges: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  onlyClasses: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  isShowRangeButton: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
/* harmony import */ var _DateRange__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DateRange */ "./www/js/source/reactpages/components/date-range/DateRange.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateRange", function() { return _DateRange__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
/* harmony import */ var _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  months: [_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Jan'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Feb'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Mar'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Apr'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('May2'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Jun'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Jul'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Aug'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Sep'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Oct'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Nov'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Dec')],
  weekdays: [_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Su'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Mo'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Tu'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('We'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Th'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Fr'), _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Sa')]
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

/***/ "./www/js/source/reactpages/components/dropdown/DropdownRadioItem.jsx":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/components/dropdown/DropdownRadioItem.jsx ***!
  \****************************************************************************/
/*! exports provided: DropdownRadioItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropdownRadioItem", function() { return DropdownRadioItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


const DropdownRadioItem = props => {
  const {
    checked,
    text,
    value,
    onChange,
    id
  } = props;
  const _onClick = event => {
    event.preventDefault();
    event.stopPropagation();
    event.value = event.target.value = value;
    onChange(event);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "selection-item",
    onClick: _onClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    id: id,
    name: id,
    type: "radio",
    value: value,
    readOnly: true,
    checked: checked
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: id,
    dangerouslySetInnerHTML: {
      __html: text
    }
  }));
};
const propTypes = {
  checked: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
};
DropdownRadioItem.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(DropdownRadioItem));

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

/***/ "./www/js/source/reactpages/components/dropdown/DrowdownRadioList.jsx":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/components/dropdown/DrowdownRadioList.jsx ***!
  \****************************************************************************/
/*! exports provided: DrowdownRadioList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrowdownRadioList", function() { return DrowdownRadioList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DropdownButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DropdownButton */ "./www/js/source/reactpages/components/dropdown/DropdownButton.jsx");
/* harmony import */ var _DropdownItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DropdownItem */ "./www/js/source/reactpages/components/dropdown/DropdownItem.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
/* harmony import */ var _DropdownRadioItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DropdownRadioItem */ "./www/js/source/reactpages/components/dropdown/DropdownRadioItem.jsx");






const DrowdownRadioList = props => {
  const {
    valueSelector,
    onChange,
    dataSource,
    keySelector,
    selectedValue,
    iconClass,
    className,
    id
  } = props;
  const [isOpen, setIsOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const _handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const _handleClose = () => {
    setIsOpen(false);
  };
  const toggleButton = {
    className: 'toggle-outline toggle-outline-light'
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DropdownButton__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: className,
    isOpen: isOpen,
    toggleButton: toggleButton,
    onToggle: _handleToggleDropdown,
    buttonLabel: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: iconClass
    }, "settings"),
    onClose: _handleClose
  }, dataSource.length > 0 && dataSource.map(item => {
    const value = typeof keySelector == 'function' ? item[Object.keys(item).find(keySelector)] : item[keySelector];
    const text = typeof valueSelector == 'function' ? item[Object.keys(item).find(valueSelector)] : item[valueSelector];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DropdownItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: `${id}-${value}`,
      tag: "div"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DropdownRadioItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      id: `${id}-${value}`,
      checked: selectedValue == value,
      value: value,
      text: text,
      onChange: onChange
    }));
  }));
};
const propTypes = {
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array,
  keySelector: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func]),
  valueSelector: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func]),
  selectedValue: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any,
  iconClass: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  id: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired
};
const defaultProps = {
  dataSource: [],
  keySelector: 'id',
  valueSelector: 'value',
  iconClass: 'material-icons',
  className: '',
  id: Object(uuid__WEBPACK_IMPORTED_MODULE_4__["v4"])()
};
DrowdownRadioList.propTypes = propTypes;
DrowdownRadioList.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(DrowdownRadioList));

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

/***/ "./www/js/source/reactpages/components/radio/Radio.jsx":
/*!*************************************************************!*\
  !*** ./www/js/source/reactpages/components/radio/Radio.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return radio; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


class radio extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "radio",
      value: this.props.value,
      checked: this.props.checked,
      name: this.props.name,
      id: this.props.id,
      onChange: () => this.props.onChange(this.props.value)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: this.props.id
    }, this.props.label));
  }
}
_defineProperty(radio, "propTypes", {
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  checked: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});
_defineProperty(radio, "defaultProps", {
  label: '',
  name: '',
  value: 0,
  checked: false
});

/***/ }),

/***/ "./www/js/source/reactpages/components/radio/RadioGroup.jsx":
/*!******************************************************************!*\
  !*** ./www/js/source/reactpages/components/radio/RadioGroup.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RadioGroup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Radio */ "./www/js/source/reactpages/components/radio/Radio.jsx");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



class RadioGroup extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  onChange(value) {
    if (this.state.value === value) {
      return;
    }
    this.setState({
      value: value
    });
    this.props.onChange(value);
  }
  _renderItem() {
    const {
      options,
      name
    } = this.props;
    let radios = [];
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      const isChecked = item.value === this.state.value;
      const id = `${name}-${item.value}`;
      radios.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Radio__WEBPACK_IMPORTED_MODULE_2__["default"], {
        key: id,
        value: item.value,
        checked: isChecked,
        name: name,
        id: id,
        label: item.label,
        onChange: value => this.onChange(value)
      }));
    }
    return radios;
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `radio-group ${this.props.className}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, this.props.label), this._renderItem());
  }
}
_defineProperty(RadioGroup, "propTypes", {
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  options: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string])
  })).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string])
});
_defineProperty(RadioGroup, "defaultProps", {
  label: '',
  name: '',
  value: 0,
  onChange: function () {}
});

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
  MONTHLY: 2,
  WEEKLY: 3
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

/***/ "./www/js/source/reactpages/customHooks/useBaseCurrencyForMultiSelectCurrency.jsx":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/customHooks/useBaseCurrencyForMultiSelectCurrency.jsx ***!
  \****************************************************************************************/
/*! exports provided: useBaseCurrencyForMultiSelectCurrency, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useBaseCurrencyForMultiSelectCurrency", function() { return useBaseCurrencyForMultiSelectCurrency; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! usehooks-ts */ "./node_modules/usehooks-ts/dist/esm/index.js");




const useBaseCurrencyForMultiSelectCurrency = initSelectedBaseCurrency => {
  const [originalBaseCurrencyList, originalCurrencyList] = [_jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].baseCurrencyList, _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].currencyList];
  const defaultBaseCurrencyRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(initSelectedBaseCurrency);
  const isFirstRender = Object(usehooks_ts__WEBPACK_IMPORTED_MODULE_3__["useIsFirstRender"])();
  const [selectedCurrency, selectedBaseCurrency] = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => [state.selectedCurrency, state.selectedBaseCurrency], react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const [currentBaseCurrencyList, setCurrentBaseCurrencyList] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(originalBaseCurrencyList);
  const [currentBaseCurrency, setCurrenctBaseCurrency] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(selectedBaseCurrency);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (currentBaseCurrency != selectedBaseCurrency) {
      setCurrenctBaseCurrency(selectedBaseCurrency);
    }
  }, [selectedBaseCurrency]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const defaultBaseCurrency = defaultBaseCurrencyRef.current;
    let newBaseCurrency = '';
    let newBaseCurrencyList = currentBaseCurrencyList;
    const _isSingleSelectedCurrency = () => selectedCurrency && selectedCurrency.indexOf(',') < 0;
    if (_isSingleSelectedCurrency()) {
      const currencyName = originalCurrencyList.find(x => x.id == selectedCurrency).value;
      if (!currentBaseCurrencyList.find(x => x.label === currencyName)) {
        newBaseCurrency = '';
        newBaseCurrencyList = originalBaseCurrencyList.slice(0);
        newBaseCurrencyList.push({
          value: newBaseCurrency,
          label: currencyName
        });
      } else {
        newBaseCurrency = currencyName;
        newBaseCurrencyList = currentBaseCurrencyList;
      }
    } else {
      newBaseCurrencyList = originalBaseCurrencyList;
      newBaseCurrency = newBaseCurrencyList.find(x => x.label === selectedBaseCurrency) ? selectedBaseCurrency : defaultBaseCurrency;
    }
    if (newBaseCurrencyList != currentBaseCurrencyList) {
      setCurrentBaseCurrencyList(newBaseCurrencyList);
    }
    if (newBaseCurrency != currentBaseCurrency) {
      setCurrenctBaseCurrency(newBaseCurrency);
    }
  }, [selectedCurrency]);
  if (isFirstRender && !initSelectedBaseCurrency) {
    defaultBaseCurrencyRef.current = selectedBaseCurrency;
  }
  return {
    baseCurrencyList: currentBaseCurrencyList,
    selectedBaseCurrency: currentBaseCurrency
  };
};
/* harmony default export */ __webpack_exports__["default"] = (useBaseCurrencyForMultiSelectCurrency);

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

/***/ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx":
/*!**********************************************************************!*\
  !*** ./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx ***!
  \**********************************************************************/
/*! exports provided: useSubsidiarySearch, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSubsidiarySearch", function() { return useSubsidiarySearch; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/constants/report */ "./www/js/source/reactpages/constants/report.js");



const useSubsidiarySearch = () => {
  const isSubsidiarySearch = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useSelector"])(state => state.subsidiarySearch);
  const defaultSelectedSubsidiary = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_1__["default"].subsidiaryList.join(',');
  const isShowSubsidiaryDropdown = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_1__["default"].subsidiaryViewType !== _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_2__["SubsidiaryViewType"].NOT_MANAGEMENT && _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_1__["default"].subsidiaryList.length > 0;
  const isShowSubsidiarySearchCheckBox = isShowSubsidiaryDropdown && _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_1__["default"].subsidiaryViewType === _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_2__["SubsidiaryViewType"].MASTER_MANAGEMENT;
  const isWhiteLabelView = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_1__["default"].subsidiaryViewType === _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_2__["SubsidiaryViewType"].MASTER_MANAGEMENT && !_jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_1__["default"].isOneworksMaster;
  return {
    isSubsidiarySearch,
    isShowSubsidiaryDropdown,
    isShowSubsidiarySearchCheckBox,
    isWhiteLabelView,
    defaultSelectedSubsidiary
  };
};
/* harmony default export */ __webpack_exports__["default"] = (useSubsidiarySearch);

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

/***/ "./www/js/source/reactpages/lib/Cache.js":
/*!***********************************************!*\
  !*** ./www/js/source/reactpages/lib/Cache.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
  cache.set('foo', 'bar');
  cache.get('foo'); //'bar'
*/

class Cache {
  constructor() {
    this._cache = {};
    this._size = 0;
  }
  _remove(key) {
    this._size--;
    delete this._cache[key];
  }
  size() {
    return this._size;
  }
  get(key, defaultValue = null) {
    const data = this._cache[key];
    if (!data) return defaultValue;
    return data.value;
  }

  // @time: timeout in minute
  set(key, value, time = 1) {
    if (!key || !time || time < 0) {
      throw new Error('Invalid params!');
    }
    var oldData = this._cache[key];
    if (oldData) {
      clearTimeout(oldData.timeout);
    } else {
      this._size++;
    }
    let data = {
      value: value
    };
    data.timeout = setTimeout(() => this._remove(key), time * 60000);
    this._cache[key] = data;
  }
  clear() {
    for (var key in this._cache) {
      clearTimeout(this._cache[key].timeout);
    }
    this._size = 0;
    this._cache = {};
  }
}
/* harmony default export */ __webpack_exports__["default"] = (new Cache());

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

/***/ "./www/js/source/reactpages/lib/htmlHelper.js":
/*!****************************************************!*\
  !*** ./www/js/source/reactpages/lib/htmlHelper.js ***!
  \****************************************************/
/*! exports provided: encode, decode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode", function() { return encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return decode; });
const encode = text => {
  const p = document.createElement("p");
  p.textContent = text;
  return p.innerHTML;
};
const decode = html => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

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
    return roundedValue.toFixed(digits).replace(/^[+-]?\d+/, int => int.replace(/(\d)(?=(\d{3})+$)/g, '$1,'));
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

/***/ "./www/js/source/reactpages/lib/stringHelper.js":
/*!******************************************************!*\
  !*** ./www/js/source/reactpages/lib/stringHelper.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StringHelper; });
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class StringHelper {
  static isEmptyOrWhiteSpace(str) {
    return !str || str.trim().length === 0;
  }
}
_defineProperty(StringHelper, "addSpaceAfterComma", str => {
  return str.split(",").join(", ");
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/actions/bettypeAction.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/actions/bettypeAction.js ***!
  \*********************************************************************************/
/*! exports provided: setSelectedBettype, setBettypeList, setOrginalBetTypeList, getBetTypeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedBettype", function() { return setSelectedBettype; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBettypeList", function() { return setBettypeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOrginalBetTypeList", function() { return setOrginalBetTypeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBetTypeList", function() { return getBetTypeList; });
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _common_Service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Service */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/winlossanalysis/actions/types.js");
/* harmony import */ var _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/Cache */ "./www/js/source/reactpages/lib/Cache.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






const BETTYPE_CACHE_KEY = "WINLOSSANALYSIS_BETTYPE_CACHE_KEY";
const Url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/CommonDataApi/GetBetTypeInTreeList');
let currentCancellationTokenSource = null;
const dispatchBettypeList = (dispatch, data) => {
  const selectedSports = _common_Service__WEBPACK_IMPORTED_MODULE_2__["default"].getSelectedItemFromTreeListItem(data);
  dispatch(setBettypeList(data));
  dispatch(setSelectedBettype(selectedSports));
};
const setSelectedBettype = betTypeIds => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_3__["SET_SELECTED_BETTYPE"],
    data: betTypeIds
  };
};
const setBettypeList = list => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_3__["SET_BETTYPE_LIST"],
    data: list
  };
};
const setOrginalBetTypeList = list => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_3__["SET_ORIGINAL_BETTYPE_LIST"],
    data: list
  };
};
const getBetTypeList = productCodes => {
  const cacheKey = BETTYPE_CACHE_KEY + productCodes + _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].licenseeName;
  return async dispatch => {
    var cacheData = _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_4__["default"].get(cacheKey);
    if (cacheData) {
      dispatchBettypeList(dispatch, cacheData);
      return;
    }
    if (currentCancellationTokenSource) {
      currentCancellationTokenSource.cancel('Operation canceled by the user.');
    }
    currentCancellationTokenSource = _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__["default"].genCancellationToken();
    try {
      const response = await _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__["default"].getData(Url, {
        productCodes: productCodes
      }, currentCancellationTokenSource);
      currentCancellationTokenSource = null;
      const data = response.data;
      _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_4__["default"].set(cacheKey, data, 10);
      dispatchBettypeList(dispatch, data);
    } catch (e) {
      if (_jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__["default"].isCancel(e)) {
        return;
      } else {
        // handle error
      }
    }
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/actions/dataAction.js":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/actions/dataAction.js ***!
  \******************************************************************************/
/*! exports provided: getReportData, setReportData, setReloadReport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReportData", function() { return getReportData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReportData", function() { return setReportData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReloadReport", function() { return setReloadReport; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/types.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _common_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/constants.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");




const getReportData = params => {
  return dispatch => {
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__["default"].postProxyData(_jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__["default"].apiKeys.report, _common_constants_js__WEBPACK_IMPORTED_MODULE_3__["ApiUrl"].GET_DATA_URL, params).then(response => {
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

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/actions/filterAction.js":
/*!********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/actions/filterAction.js ***!
  \********************************************************************************/
/*! exports provided: setSelectedVipOnly, setGroupInOriginalCurrency, setExcludeTestData, setViewCashOutOnly, setSelectedGroupByOption, setSelectedBreakDownByOption, setSelectedOddsGroup, setAppUuid, setSearchMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedVipOnly", function() { return setSelectedVipOnly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGroupInOriginalCurrency", function() { return setGroupInOriginalCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setExcludeTestData", function() { return setExcludeTestData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewCashOutOnly", function() { return setViewCashOutOnly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedGroupByOption", function() { return setSelectedGroupByOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedBreakDownByOption", function() { return setSelectedBreakDownByOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedOddsGroup", function() { return setSelectedOddsGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAppUuid", function() { return setAppUuid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchMode", function() { return setSearchMode; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/types.js");

const setSelectedVipOnly = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_VIPONLY"],
    data: value
  };
};
const setGroupInOriginalCurrency = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_GROUP_IN_ORIGINAL_CURRENCY"],
    data: value
  };
};
const setExcludeTestData = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_EXCLUDE_TEST_DATA"],
    data: value
  };
};
const setViewCashOutOnly = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_VIEW_CASH_OUNT_ONLY"],
    data: value
  };
};
const setSelectedGroupByOption = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_GROUPBYOPTION"],
    data: value
  };
};
const setSelectedBreakDownByOption = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_BREAKBYOPTION"],
    data: value
  };
};
const setSelectedOddsGroup = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_ODDSGROUP"],
    data: value
  };
};
const setAppUuid = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_APP_UUID"],
    data: value
  };
};
const setSearchMode = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_SEARCH_MODE"],
    data: value
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/actions/index.js":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/actions/index.js ***!
  \*************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/gridDataAction */ "./www/js/source/reactpages/actions/gridDataAction.js");
/* harmony import */ var _jsroot_actions_productAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/productAction */ "./www/js/source/reactpages/actions/productAction.js");
/* harmony import */ var _jsroot_actions_currencyAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/currencyAction */ "./www/js/source/reactpages/actions/currencyAction.js");
/* harmony import */ var _jsroot_actions_baseCurrencyAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/actions/baseCurrencyAction */ "./www/js/source/reactpages/actions/baseCurrencyAction.js");
/* harmony import */ var _jsroot_actions_statusAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/actions/statusAction */ "./www/js/source/reactpages/actions/statusAction.js");
/* harmony import */ var _jsroot_actions_liveStatusAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/actions/liveStatusAction */ "./www/js/source/reactpages/actions/liveStatusAction.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _jsroot_actions_dateRangeAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/actions/dateRangeAction */ "./www/js/source/reactpages/actions/dateRangeAction.js");
/* harmony import */ var _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/actions/requestParamAction */ "./www/js/source/reactpages/actions/requestParamAction.js");
/* harmony import */ var _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/actions/reportTitleAction */ "./www/js/source/reactpages/actions/reportTitleAction.js");
/* harmony import */ var _sportAction_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sportAction.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/sportAction.js");
/* harmony import */ var _bettypeAction_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bettypeAction.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/bettypeAction.js");
/* harmony import */ var _filterAction_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./filterAction.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/filterAction.js");
/* harmony import */ var _dataAction_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dataAction.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/dataAction.js");
/* harmony import */ var _jsroot_actions_platformAction__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/actions/platformAction */ "./www/js/source/reactpages/actions/platformAction.js");
/* harmony import */ var _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @jsroot/actions/usernameAction */ "./www/js/source/reactpages/actions/usernameAction.js");
/* harmony import */ var _jsroot_actions_convertAllAction__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @jsroot/actions/convertAllAction */ "./www/js/source/reactpages/actions/convertAllAction.js");
/* harmony import */ var _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @jsroot/actions/userGuideAction */ "./www/js/source/reactpages/actions/userGuideAction.js");
/* harmony import */ var _jsroot_actions_subsidiaryAction__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @jsroot/actions/subsidiaryAction */ "./www/js/source/reactpages/actions/subsidiaryAction.js");
/* harmony import */ var _jsroot_actions_customerclassAction__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @jsroot/actions/customerclassAction */ "./www/js/source/reactpages/actions/customerclassAction.js");




















const ActionCreators = Object.assign({}, _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_productAction__WEBPACK_IMPORTED_MODULE_1__, _jsroot_actions_currencyAction__WEBPACK_IMPORTED_MODULE_2__, _jsroot_actions_baseCurrencyAction__WEBPACK_IMPORTED_MODULE_3__, _jsroot_actions_statusAction__WEBPACK_IMPORTED_MODULE_4__, _jsroot_actions_liveStatusAction__WEBPACK_IMPORTED_MODULE_5__, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_6__, _jsroot_actions_dateRangeAction__WEBPACK_IMPORTED_MODULE_7__, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_8__, _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_9__, _sportAction_js__WEBPACK_IMPORTED_MODULE_10__, _bettypeAction_js__WEBPACK_IMPORTED_MODULE_11__, _filterAction_js__WEBPACK_IMPORTED_MODULE_12__, _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_15__, _jsroot_actions_convertAllAction__WEBPACK_IMPORTED_MODULE_16__, _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_17__, _jsroot_actions_subsidiaryAction__WEBPACK_IMPORTED_MODULE_18__, _jsroot_actions_platformAction__WEBPACK_IMPORTED_MODULE_14__, _jsroot_actions_customerclassAction__WEBPACK_IMPORTED_MODULE_19__, _dataAction_js__WEBPACK_IMPORTED_MODULE_13__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/actions/sportAction.js":
/*!*******************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/actions/sportAction.js ***!
  \*******************************************************************************/
/*! exports provided: setSelectedSport, setSportList, getSportList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedSport", function() { return setSelectedSport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSportList", function() { return setSportList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSportList", function() { return getSportList; });
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _common_Service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Service */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/winlossanalysis/actions/types.js");




const Url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/CommonDataApi/GetSportsForTreeView');
const setSelectedSport = sportId => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_3__["SET_SELECTED_SPORT"],
    data: sportId
  };
};
const setSportList = list => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_3__["SET_SPORT_LIST"],
    data: list
  };
};
function getSportList(productCodes) {
  return async dispatch => {
    const response = await _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__["default"].getData(Url, {
      productCodes: productCodes,
      applyHideSaba: true
    });
    const data = response.data;
    const selectedSports = _common_Service__WEBPACK_IMPORTED_MODULE_2__["default"].getSelectedItemFromTreeListItem(data);
    dispatch(setSportList(data));
    dispatch(setSelectedSport(selectedSports));
  };
}

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/actions/types.js":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/actions/types.js ***!
  \*************************************************************************/
/*! exports provided: SET_SELECTED_SPORT, SET_SPORT_LIST, SET_SELECTED_BETTYPE, SET_BETTYPE_LIST, SET_ORIGINAL_BETTYPE_LIST, SET_SELECTED_VIPONLY, SET_GROUP_IN_ORIGINAL_CURRENCY, SET_EXCLUDE_TEST_DATA, SET_VIEW_CASH_OUNT_ONLY, SET_SELECTED_GROUPBYOPTION, SET_SELECTED_BREAKBYOPTION, SET_REPORT_DATA, SET_RELOAD_REPORT, SET_SELECTED_ODDSGROUP, SET_APP_UUID, SET_SEARCH_MODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_SPORT", function() { return SET_SELECTED_SPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SPORT_LIST", function() { return SET_SPORT_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_BETTYPE", function() { return SET_SELECTED_BETTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_BETTYPE_LIST", function() { return SET_BETTYPE_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ORIGINAL_BETTYPE_LIST", function() { return SET_ORIGINAL_BETTYPE_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_VIPONLY", function() { return SET_SELECTED_VIPONLY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_GROUP_IN_ORIGINAL_CURRENCY", function() { return SET_GROUP_IN_ORIGINAL_CURRENCY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_EXCLUDE_TEST_DATA", function() { return SET_EXCLUDE_TEST_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_VIEW_CASH_OUNT_ONLY", function() { return SET_VIEW_CASH_OUNT_ONLY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_GROUPBYOPTION", function() { return SET_SELECTED_GROUPBYOPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_BREAKBYOPTION", function() { return SET_SELECTED_BREAKBYOPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REPORT_DATA", function() { return SET_REPORT_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_RELOAD_REPORT", function() { return SET_RELOAD_REPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_ODDSGROUP", function() { return SET_SELECTED_ODDSGROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_APP_UUID", function() { return SET_APP_UUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SEARCH_MODE", function() { return SET_SEARCH_MODE; });
const SET_SELECTED_SPORT = "SET_SELECTED_SPORT";
const SET_SPORT_LIST = "SET_SPORT_LIST";
const SET_SELECTED_BETTYPE = "SET_SELECTED_BETTYPE";
const SET_BETTYPE_LIST = "SET_BETTYPE_LIST";
const SET_ORIGINAL_BETTYPE_LIST = "SET_ORIGINAL_BETTYPE_LIST";
const SET_SELECTED_VIPONLY = "SET_SELECTED_VIPONLY";
const SET_GROUP_IN_ORIGINAL_CURRENCY = "SET_GROUP_IN_ORIGINAL_CURRENCY";
const SET_EXCLUDE_TEST_DATA = "SET_EXCLUDE_TEST_DATA";
const SET_VIEW_CASH_OUNT_ONLY = "SET_CASH_OUT_ONLY";
const SET_SELECTED_GROUPBYOPTION = "SET_SELECTED_GROUPBYOPTION";
const SET_SELECTED_BREAKBYOPTION = "SET_SELECTED_BREAKBYOPTION";
const SET_REPORT_DATA = 'SET_REPORT_DATA';
const SET_RELOAD_REPORT = 'SET_RELOAD_REPORT';
const SET_SELECTED_ODDSGROUP = "SET_SELECTED_ODDSGROUP";
const SET_APP_UUID = "SET_APP_UUID";
const SET_SEARCH_MODE = "SET_SEARCH_MODE";

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js":
/*!**************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/common/Service.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Service; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_5__);
var _class;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }








class Service {
  static getSelectedItemFromTreeListItem(items) {
    return items.reduce((accum, elem) => accum.concat(elem.Children), []).map(elem => elem.Value).join(",");
  }
  static getNormalizedSelectedParamValueForMultiSelectFilter(selectedValue, dataList, selectedIdFunc) {
    const allSelected = selectedIdFunc instanceof Function ? dataList.map(selectedIdFunc).join(",") : dataList.map(item => item.id).join(",");
    const listAllSelectId = allSelected.split(",");
    const listSelectedId = selectedValue.split(",");
    return listAllSelectId.every(id => listSelectedId.indexOf(id) >= 0) ? _constants__WEBPACK_IMPORTED_MODULE_3__["ALL_SELECTED_TEXT"] : selectedValue;
  }
  static getNormalizedSelectedParamValueForTreeListFilter(selectedValue, dataList) {
    const allSelected = this.getSelectedItemFromTreeListItem(dataList);
    return selectedValue === allSelected ? _constants__WEBPACK_IMPORTED_MODULE_3__["ALL_SELECTED_TEXT"] : selectedValue;
  }
}
_class = Service;
_defineProperty(Service, "isOneTwoBetLicensee", () => {
  return _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].licenseeName.toLowerCase() === _constants__WEBPACK_IMPORTED_MODULE_3__["OneTwoBetLicenseeName"].toLowerCase();
});
_defineProperty(Service, "isContainProductSportBookOrBa", selectedItemsKey => {
  var listSelectedProduct = selectedItemsKey.split(",");
  return listSelectedProduct.indexOf(_constants__WEBPACK_IMPORTED_MODULE_3__["ProductCode"].SportsBook) >= 0 || listSelectedProduct.indexOf(_constants__WEBPACK_IMPORTED_MODULE_3__["ProductCode"].BA) >= 0;
});
_defineProperty(Service, "buildGroupByOption", () => {
  return _class.isOneTwoBetLicensee() ? _constants__WEBPACK_IMPORTED_MODULE_3__["GroupByList"] : _constants__WEBPACK_IMPORTED_MODULE_3__["GroupByList"].filter(item => item.value !== _constants__WEBPACK_IMPORTED_MODULE_3__["GroupByMode"].Agent);
});
_defineProperty(Service, "buildBreakDownOptionFromGroupByMode", groupByMode => {
  let breakDownByOption = {
    Product: {
      value: _constants__WEBPACK_IMPORTED_MODULE_3__["BreakdownByMode"].Product,
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Product'),
      isDisabled: false
    },
    Currency: {
      value: _constants__WEBPACK_IMPORTED_MODULE_3__["BreakdownByMode"].Currency,
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Currency'),
      isDisabled: false
    },
    Player: {
      value: _constants__WEBPACK_IMPORTED_MODULE_3__["BreakdownByMode"].Player,
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Player'),
      isDisabled: true
    }
  };
  switch (Number(groupByMode)) {
    case _constants__WEBPACK_IMPORTED_MODULE_3__["GroupByMode"].Product:
    case _constants__WEBPACK_IMPORTED_MODULE_3__["GroupByMode"].Sport:
    case _constants__WEBPACK_IMPORTED_MODULE_3__["GroupByMode"].BetType:
      breakDownByOption.Product.isDisabled = true;
      break;
    case _constants__WEBPACK_IMPORTED_MODULE_3__["GroupByMode"].Player:
    case _constants__WEBPACK_IMPORTED_MODULE_3__["GroupByMode"].Currency:
      breakDownByOption.Currency.isDisabled = true;
      break;
    case _constants__WEBPACK_IMPORTED_MODULE_3__["GroupByMode"].Agent:
      breakDownByOption.Currency.isDisabled = true;
      breakDownByOption.Player.isDisabled = false;
      break;
    default:
      break;
  }
  if (!_class.isOneTwoBetLicensee()) {
    delete breakDownByOption.Player;
  }
  return Object.values(breakDownByOption);
});
_defineProperty(Service, "isContainBAProduct", selectedProductCodes => {
  const baProductCode = "BA";
  const listSelectedProductCodes = selectedProductCodes.split(",");
  return listSelectedProductCodes.includes(baProductCode);
});
_defineProperty(Service, "getCurrencyCodes", (currencyListIds, currencyList) => {
  const normalizeText = _class.getNormalizedSelectedParamValueForMultiSelectFilter(currencyListIds, currencyList);
  if (normalizeText === _constants__WEBPACK_IMPORTED_MODULE_3__["ALL_SELECTED_TEXT"]) {
    return _constants__WEBPACK_IMPORTED_MODULE_3__["ALL_SELECTED_TEXT"];
  }
  const currencyCodesText = currencyListIds.split(',').reduce((prev, cur, index) => {
    let code = currencyList.find(c => c.id == cur).value;
    if (index === 0) {
      return code;
    }
    return `${prev},${code}`;
  }, "");
  return currencyCodesText;
});
_defineProperty(Service, "getFile", params => {
  if (!params) {
    return;
  }
  return _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_4__["default"].getProxyFile(_jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_4__["default"].apiKeys.report, _constants__WEBPACK_IMPORTED_MODULE_3__["ApiUrl"].EXPORT_EXCEL_URL, params).then(response => {
    const contentType = response.headers["content-type"];
    if (contentType && contentType.indexOf('application/json') > -1) {
      const RowsExceedLimitErrorCode = 1001;
      _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].readAsJson(response.data, result => {
        if (result.ErrorCode === RowsExceedLimitErrorCode) {
          _class._showExportWarning();
        } else {
          const msg = result.ErrorMsg || _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("ErrorProcessingMsg");
          alert(msg);
        }
      });
    } else {
      const NoContentStatusCode = 204;
      if (response.status === NoContentStatusCode) {
        alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("NoInfo"));
      } else {
        const fileName = params.ExportExcelMode == _constants__WEBPACK_IMPORTED_MODULE_3__["ExportExcelMode"].All ? "WinLossReportGroupByAndBreakdownBy" : "WinLossReportGroupBy";
        const fileNameWithExt = fileName + (response.headers["content-type"] === "application/zip" ? ".zip" : ".xls");
        _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileNameWithExt);
      }
    }
  }).catch(error => {
    alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("ErrorProcessingMsg"));
  });
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/common/constants.js ***!
  \****************************************************************************/
/*! exports provided: ApiUrl, HeaderText, OneTwoBetLicenseeName, GroupByMode, BreakdownByMode, ALL_SELECTED_TEXT, ProductCode, GroupByList, DisplayGroupBreakDownMapping, DefaultPagingOption, SortBy, SortOrder, SearchMode, ExportExcelMode, MobileGroupByHeaderDisplayType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiUrl", function() { return ApiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderText", function() { return HeaderText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneTwoBetLicenseeName", function() { return OneTwoBetLicenseeName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupByMode", function() { return GroupByMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreakdownByMode", function() { return BreakdownByMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_SELECTED_TEXT", function() { return ALL_SELECTED_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCode", function() { return ProductCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupByList", function() { return GroupByList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisplayGroupBreakDownMapping", function() { return DisplayGroupBreakDownMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultPagingOption", function() { return DefaultPagingOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortBy", function() { return SortBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortOrder", function() { return SortOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchMode", function() { return SearchMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportExcelMode", function() { return ExportExcelMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileGroupByHeaderDisplayType", function() { return MobileGroupByHeaderDisplayType; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");


const ApiUrl = {
  GET_DATA_URL: 'api/WinlossAnalysis/GetData',
  EXPORT_EXCEL_URL: 'api/WinlossAnalysis/ExportExcel',
  CUSTOMER_SEARCH_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl("SearchCustomerAPI/SearchCustomer")
};
const HeaderText = {
  Index: "#",
  Platform: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Platform"),
  ExternalId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("ExternalId"),
  BetCount: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BetCount"),
  TurnOver: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Turnover"),
  NetTurnOver: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("NetTurnover"),
  PlayerWL: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("PlayerWL"),
  EffectiveBettingValue: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("EffectiveBettingValue"),
  PlayerComm: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("PlayerComm"),
  LicenseeComm: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("LicenseeComm"),
  AmountDueToBA: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("AmountDueToBA"),
  Margin: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Margin"),
  SystemId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("SystemId"),
  LicenseeWL: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("LicenseeW_L"),
  GroupBy: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("GroupBy")
};
const OneTwoBetLicenseeName = '12Bet';
const GroupByMode = {
  Date: 1,
  Month: 2,
  Product: 3,
  Sport: 4,
  BetType: 5,
  Currency: 6,
  Platform: 7,
  Player: 8,
  Agent: 9
};
const BreakdownByMode = {
  Currency: 1,
  Product: 2,
  Player: 3
};
const ALL_SELECTED_TEXT = 'ALL';
const ProductCode = {
  SportsBook: "SB",
  BA: "BA"
};
const GroupByList = [{
  value: GroupByMode.Player,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Player")
}, {
  value: GroupByMode.Date,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Date")
}, {
  value: GroupByMode.Month,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Month")
}, {
  value: GroupByMode.Product,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Product")
}, {
  value: GroupByMode.Sport,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Sport")
}, {
  value: GroupByMode.BetType,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("BetType")
}, {
  value: GroupByMode.Currency,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Currency")
}, {
  value: GroupByMode.Platform,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Platform")
}, {
  value: GroupByMode.Agent,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Agent")
}];
const DisplayGroupBreakDownMapping = [{
  groupByMode: GroupByMode.Date,
  breakdownMode: BreakdownByMode.Currency,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Date,
  breakdownMode: BreakdownByMode.Product,
  isDisplayBreakDownInCurrency: false
}, {
  groupByMode: GroupByMode.Month,
  breakdownMode: BreakdownByMode.Currency,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Month,
  breakdownMode: BreakdownByMode.Product,
  isDisplayBreakDownInCurrency: false
}, {
  groupByMode: GroupByMode.Product,
  breakdownMode: BreakdownByMode.Currency,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Product,
  breakdownMode: BreakdownByMode.Product,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Sport,
  breakdownMode: BreakdownByMode.Currency,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Sport,
  breakdownMode: BreakdownByMode.Product,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.BetType,
  breakdownMode: BreakdownByMode.Currency,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.BetType,
  breakdownMode: BreakdownByMode.Product,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Currency,
  breakdownMode: BreakdownByMode.Currency,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Currency,
  breakdownMode: BreakdownByMode.Product,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Platform,
  breakdownMode: BreakdownByMode.Currency,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Platform,
  breakdownMode: BreakdownByMode.Product,
  isDisplayBreakDownInCurrency: false
}, {
  groupByMode: GroupByMode.Player,
  breakdownMode: BreakdownByMode.Currency,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Player,
  breakdownMode: BreakdownByMode.Product,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Agent,
  breakdownMode: BreakdownByMode.Currency,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Agent,
  breakdownMode: BreakdownByMode.Product,
  isDisplayBreakDownInCurrency: true
}, {
  groupByMode: GroupByMode.Agent,
  breakdownMode: BreakdownByMode.Player,
  isDisplayBreakDownInCurrency: true
}];
const DefaultPagingOption = {
  PageIndex: 1,
  PageSize: 100,
  TotalItem: 0,
  PageList: [100, 200, 300, 400, 500, 1000, 2000]
};
const SortBy = {
  Default: 0,
  BetCount: 1,
  Turnover: 2,
  NetTurnover: 3,
  MemWinloss: 4,
  MemComm: 5,
  LicWinloss: 6,
  LicComm: 7,
  AmtDueToBA: 8,
  BetEffective: 9,
  Margin: 10
};
const SortOrder = {
  ASC: 0,
  DESC: 1
};
const SearchMode = {
  MatchPrecise: 1,
  MatchCase: 2,
  MatchPrefix: 3
};
const ExportExcelMode = {
  All: 1,
  GroupByLevelOnly: 2
};
const MobileGroupByHeaderDisplayType = {
  ExternalId: 1,
  SystemId: 2
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/common/grid/BreakdownRow.jsx":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/common/grid/BreakdownRow.jsx ***!
  \*************************************************************************************/
/*! exports provided: BreakdownRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreakdownRow", function() { return BreakdownRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");



const BreakdownRow = props => {
  const {
    data,
    option
  } = props;
  const {
    betCount,
    turnover,
    netTurnover,
    playerWinloss,
    playerComm,
    betEffective,
    licWinloss,
    licComm,
    amtDueToBA,
    margin,
    breakBy,
    groupBy,
    breakDownFieldText,
    externalId
  } = data;
  const {
    isGroupByPlayerMode,
    isShowBAField,
    isBreakDownPlayerMode
  } = option;
  const colSpan = isGroupByPlayerMode ? 2 : 1;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "detail-row",
    key: `detail-row-${groupBy}-${breakBy}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align break-by-cell",
    colSpan: colSpan
  }, breakDownFieldText), isBreakDownPlayerMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align"
  }, externalId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].format(betCount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(turnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(netTurnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(playerWinloss)), isGroupByPlayerMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(betEffective)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(playerComm)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${licWinloss < 0 ? "negative" : ""}`
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(licWinloss)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(licComm)), isShowBAField && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(amtDueToBA)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${margin < 0 ? "negative" : ""}`
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(margin * 100), "%"));
};
/* harmony default export */ __webpack_exports__["default"] = (BreakdownRow);

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/common/grid/TreeViewGridRowNode.jsx":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/common/grid/TreeViewGridRowNode.jsx ***!
  \********************************************************************************************/
/*! exports provided: TreeViewGridRowNode, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeViewGridRowNode", function() { return TreeViewGridRowNode; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
/* harmony import */ var _BreakdownRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BreakdownRow */ "./www/js/source/reactpages/pages/winlossanalysis/common/grid/BreakdownRow.jsx");




const TreeViewGridRowNode = props => {
  const [isBreakdown, setIsBreakDown] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    data,
    option
  } = props;
  const {
    isGroupByPlayerMode,
    isShowBAField,
    isBreakDownPlayerMode
  } = option;
  if (!data) {
    return null;
  }
  const _onclick = () => {
    setIsBreakDown(!isBreakdown);
  };
  const renderDrillDownCell = text => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
      className: "left-align drill-down-cell",
      colSpan: groupByColumnColSpan
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex w100",
      onClick: _onclick,
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "w100 main-text",
      title: text
    }, text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `arrow-icon ${arrowClass}`
    })));
  };
  const parentData = data.keyItem;
  const children = data.children;
  const {
    rowIndex,
    displayRowIndex,
    groupBy,
    groupByFieldText,
    betCount,
    turnover,
    netTurnover,
    playerWinloss,
    playerComm,
    betEffective,
    licWinloss,
    licComm,
    amtDueToBA,
    margin,
    externalId
  } = parentData;
  const arrowClass = isBreakdown ? 'down-arrow' : 'right-arrow';
  const groupByColumnColSpan = isBreakDownPlayerMode ? 2 : 1;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "group-row",
    key: `row-${rowIndex}-${groupBy}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, displayRowIndex), !isGroupByPlayerMode && renderDrillDownCell(groupByFieldText), isGroupByPlayerMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align"
  }, groupByFieldText), renderDrillDownCell(externalId)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].format(betCount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(turnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(netTurnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(playerWinloss)), isGroupByPlayerMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(betEffective)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(playerComm)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${licWinloss < 0 ? "negative" : ""}`
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(licWinloss)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(licComm)), isShowBAField && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(amtDueToBA)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${margin < 0 ? "negative" : ""}`
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(margin * 100), "%")), isBreakdown && (children === null || children === void 0 ? void 0 : children.length) && children.length > 0 && children.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BreakdownRow__WEBPACK_IMPORTED_MODULE_3__["default"], {
    key: `break-down-row-${item.groupBy}-${item.breakBy}`,
    data: item,
    option: option
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (TreeViewGridRowNode);

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/common/gridUtils.js":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/common/gridUtils.js ***!
  \****************************************************************************/
/*! exports provided: renderHeader, renderDataSection, renderFooter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderHeader", function() { return renderHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDataSection", function() { return renderDataSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderFooter", function() { return renderFooter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
/* harmony import */ var _grid_TreeViewGridRowNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./grid/TreeViewGridRowNode */ "./www/js/source/reactpages/pages/winlossanalysis/common/grid/TreeViewGridRowNode.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");






const renderHeader = option => {
  const {
    isGroupByPlayerMode,
    isShowBAField,
    isBreakDownPlayerMode
  } = option;
  const _renderDefaultHeader = () => {
    const prefixKey = 'hearder-default';
    let headerCells = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      className: "border-left-0",
      key: `${prefixKey}-#`,
      colWidth: 30
    }, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].GroupBy}`,
      colWidth: 200
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].GroupBy), ...getCommonHeaderCells(1, prefixKey)];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], null, headerCells.map(elem => elem));
  };
  const _renderGroupByPlayerModeHeaderCell = () => {
    const prefixKey = 'hearder-player';
    let headerCells = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-#`,
      className: "border-left-0",
      rowSpan: 2,
      colWidth: 30
    }, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].GroupBy}`,
      rowSpan: 1,
      colSpan: 2,
      colWidth: 200
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].GroupBy), ...getCommonHeaderCells(2)];
    return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
      key: 'header-row-1'
    }, headerCells.map(elem => elem)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
      key: 'header-row-2'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].SystemId}`,
      colWidth: 120
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].SystemId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].ExternalId}`,
      colWidth: 120
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].ExternalId))];
  };
  const getCommonHeaderCells = (rowSpan, prefixKey) => {
    let firstGroup = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].BetCount}`,
      sortBy: _constants__WEBPACK_IMPORTED_MODULE_2__["SortBy"].BetCount,
      rowSpan: rowSpan,
      colWidth: 80
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].BetCount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].TurnOver}`,
      sortBy: _constants__WEBPACK_IMPORTED_MODULE_2__["SortBy"].Turnover,
      rowSpan: rowSpan,
      colWidth: 110
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].TurnOver), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].NetTurnOver}`,
      sortBy: _constants__WEBPACK_IMPORTED_MODULE_2__["SortBy"].NetTurnover,
      rowSpan: rowSpan,
      colWidth: 110
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].NetTurnOver), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].PlayerWL}`,
      sortBy: _constants__WEBPACK_IMPORTED_MODULE_2__["SortBy"].MemWinloss,
      rowSpan: rowSpan,
      colWidth: 110
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].PlayerWL)];
    let secondGroup = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].PlayerComm}`,
      sortBy: _constants__WEBPACK_IMPORTED_MODULE_2__["SortBy"].MemComm,
      rowSpan: rowSpan,
      colWidth: 110
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].PlayerComm), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].LicenseeWL}`,
      sortBy: _constants__WEBPACK_IMPORTED_MODULE_2__["SortBy"].LicWinloss,
      rowSpan: rowSpan,
      colWidth: 110
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].LicenseeWL), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].LicenseeComm}`,
      sortBy: _constants__WEBPACK_IMPORTED_MODULE_2__["SortBy"].LicComm,
      rowSpan: rowSpan,
      colWidth: 110
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].LicenseeComm), isShowBAField && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].AmountDueToBA}`,
      sortBy: _constants__WEBPACK_IMPORTED_MODULE_2__["SortBy"].AmtDueToBA,
      rowSpan: rowSpan,
      colWidth: 110
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].AmountDueToBA), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].Margin}`,
      sortBy: _constants__WEBPACK_IMPORTED_MODULE_2__["SortBy"].Margin,
      rowSpan: rowSpan,
      colWidth: 110
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].Margin)];
    let effectiveBetCell = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      key: `${prefixKey}-${_constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].EffectiveBettingValue}`,
      sortBy: _constants__WEBPACK_IMPORTED_MODULE_2__["SortBy"].BetEffective,
      rowSpan: rowSpan,
      colWidth: 110
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["HeaderText"].EffectiveBettingValue);
    return isGroupByPlayerMode ? [...firstGroup, effectiveBetCell, ...secondGroup] : [...firstGroup, ...secondGroup];
  };
  return isGroupByPlayerMode || isBreakDownPlayerMode ? _renderGroupByPlayerModeHeaderCell() : _renderDefaultHeader();
};
const renderDataSection = (dataList, option) => {
  let dataRows = [];
  dataRows = dataList === null || dataList === void 0 ? void 0 : dataList.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grid_TreeViewGridRowNode__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: `row-groupby-${item.keyItem.rowIndex}-${item.keyItem.groupBy}`,
    data: item,
    option: option
  }));
  return dataRows;
};
const renderFooter = (dataItem, option) => {
  if (!dataItem) {
    return null;
  }
  const {
    isGroupByPlayerMode,
    isShowBAField,
    isBreakDownPlayerMode
  } = option;
  const {
    betCount,
    turnover,
    netTurnover,
    playerWinloss,
    playerComm,
    betEffective,
    licWinloss,
    licComm,
    amtDueToBA,
    margin
  } = dataItem;
  const totalCellColSpan = isGroupByPlayerMode || isBreakDownPlayerMode ? 3 : 2;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "grant-total-row",
    key: "grantTotal-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align",
    colSpan: totalCellColSpan
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("Total")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].format(betCount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(turnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(netTurnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(playerWinloss)), isGroupByPlayerMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(betEffective)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(playerComm)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${licWinloss < 0 ? "negative" : ""}`
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(licWinloss)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(licComm)), isShowBAField && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(amtDueToBA)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: `right-align ${margin < 0 ? "negative" : ""}`
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(margin * 100), "%"));
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/AppContainer.jsx":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/AppContainer.jsx ***!
  \************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _desktop_DataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./desktop/DataGrid */ "./www/js/source/reactpages/pages/winlossanalysis/components/desktop/DataGrid.jsx");
/* harmony import */ var _desktop_FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./desktop/FormFilter */ "./www/js/source/reactpages/pages/winlossanalysis/components/desktop/FormFilter.jsx");
/* harmony import */ var _mobile_MobileDataGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mobile/MobileDataGrid */ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileDataGrid.jsx");
/* harmony import */ var _mobile_MobileFormFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mobile/MobileFormFilter */ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileFormFilter.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _jsroot_customHooks_useMobileVersion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/customHooks/useMobileVersion */ "./www/js/source/reactpages/customHooks/useMobileVersion.jsx");









const AppContainer = () => {
  const isLoading = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.isLoading);
  const isUseMobileVer = Object(_jsroot_customHooks_useMobileVersion__WEBPACK_IMPORTED_MODULE_8__["default"])();
  const desktopLayout = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
    isLoading: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_desktop_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_desktop_DataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  const mobileLayout = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mobile-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
    isLoading: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mobile_MobileFormFilter__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mobile_MobileDataGrid__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  return isUseMobileVer ? mobileLayout : desktopLayout;
};
/* harmony default export */ __webpack_exports__["default"] = (AppContainer);

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/ExcelPopUp.jsx":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/ExcelPopUp.jsx ***!
  \**********************************************************************************/
/*! exports provided: ExcelPopUp, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelPopUp", function() { return ExcelPopUp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/index.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");
/* harmony import */ var _common_Service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Service */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var _jsroot_components_popup_Popup_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/popup/Popup.jsx */ "./www/js/source/reactpages/components/popup/Popup.jsx");
/* harmony import */ var _jsroot_components_radio_RadioGroup_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/radio/RadioGroup.jsx */ "./www/js/source/reactpages/components/radio/RadioGroup.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/lib/htmlHelper */ "./www/js/source/reactpages/lib/htmlHelper.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }











const ExcelPopUp = () => {
  const [isShow, setIsShow] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const requestParam = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.requestParam);
  const {
    toggleLoader
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const [exportExcelMode, setExportExcelMode] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_common_constants__WEBPACK_IMPORTED_MODULE_3__["ExportExcelMode"].All);
  const options = [{
    label: Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_8__["decode"])(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("BothGroupByAndBreakdownLevelOption")),
    value: _common_constants__WEBPACK_IMPORTED_MODULE_3__["ExportExcelMode"].All
  }, {
    label: Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_8__["decode"])(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("GroupByLevelOnlyOption")),
    value: _common_constants__WEBPACK_IMPORTED_MODULE_3__["ExportExcelMode"].GroupByLevelOnly
  }];
  const _onclickHandler = () => {
    setIsShow(true);
  };
  const _onCloseHandler = () => {
    setIsShow(false);
    setExportExcelMode(_common_constants__WEBPACK_IMPORTED_MODULE_3__["ExportExcelMode"].All);
  };
  const _onChangeExcelModeHandler = value => {
    setExportExcelMode(value);
  };
  const _onExportExcelHandler = event => {
    event.preventDefault();
    const params = _objectSpread(_objectSpread({}, requestParam), {}, {
      ExportExcelMode: exportExcelMode,
      PageSize: 0,
      PageIndex: 0
    });
    dispatch(toggleLoader(true));
    _common_Service__WEBPACK_IMPORTED_MODULE_4__["default"].getFile(params).then(() => {
      _onCloseHandler();
      dispatch(toggleLoader(false));
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "flex-initial icon icon-excel-white",
    onClick: _onclickHandler
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_popup_Popup_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
    width: 400,
    height: 200,
    isShow: isShow,
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("Confirmation"),
    onClose: _onCloseHandler,
    isHtml: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "excel-popup-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_radio_RadioGroup_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
    key: `${Object(uuid__WEBPACK_IMPORTED_MODULE_9__["v4"])()}`,
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("ChooseDataDisplayInExcelMsg"),
    className: "excel-option",
    name: "excel-option",
    options: options,
    value: exportExcelMode,
    onChange: _onChangeExcelModeHandler
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group right-align"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn btn-submit",
    onClick: _onExportExcelHandler
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("OK")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn btn-cancel",
    onClick: _onCloseHandler
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("Cancel"))))));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(ExcelPopUp));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/desktop/DataGrid.jsx":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/desktop/DataGrid.jsx ***!
  \****************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/index.js");
/* harmony import */ var _legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @legion-lib/react-grid */ "./node_modules/@legion-lib/react-grid/dist/index.js");
/* harmony import */ var _legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_gridUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/gridUtils */ "./www/js/source/reactpages/pages/winlossanalysis/common/gridUtils.js");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _common_constants_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/constants.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");
/* harmony import */ var _common_Service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common/Service.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var _ExcelPopUp_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ExcelPopUp.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/ExcelPopUp.jsx");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }










const DataGrid = () => {
  const [requestParam, reportData, reportTitle, reloadReport, selectedProduct] = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => [state.requestParam, state.reportData, state.reportTitle, state.reloadReport, state.selectedProduct], react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const {
    setRequestParam,
    toggleLoader,
    getReportData
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    data,
    sumTotal,
    totalRow
  } = reportData;
  const renderOption = {
    isShowBAField: _common_Service_js__WEBPACK_IMPORTED_MODULE_8__["default"].isContainBAProduct(selectedProduct),
    isGroupByPlayerMode: requestParam.GroupMode == _common_constants_js__WEBPACK_IMPORTED_MODULE_7__["GroupByMode"].Player,
    isBreakDownPlayerMode: requestParam.BreakdownMode == _common_constants_js__WEBPACK_IMPORTED_MODULE_7__["BreakdownByMode"].Player
  };
  const header = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(_common_gridUtils__WEBPACK_IMPORTED_MODULE_4__["renderHeader"])(renderOption), [requestParam]);
  const body = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(_common_gridUtils__WEBPACK_IMPORTED_MODULE_4__["renderDataSection"])(data, renderOption), [data]);
  const footer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(_common_gridUtils__WEBPACK_IMPORTED_MODULE_4__["renderFooter"])(sumTotal, renderOption), [sumTotal]);
  const currenPagingOption = {
    PageIndex: requestParam.PageIndex,
    PageSize: requestParam.PageSize,
    TotalItem: totalRow,
    PageList: _common_constants_js__WEBPACK_IMPORTED_MODULE_7__["DefaultPagingOption"].PageList
  };
  const submitRequest = params => {
    dispatch(setRequestParam(params));
    dispatch(toggleLoader(true));
    dispatch(getReportData(params));
  };
  const onSort = (sortBy, sortOrder) => {
    const requestSortOrder = sortOrder == "asc" ? _common_constants_js__WEBPACK_IMPORTED_MODULE_7__["SortOrder"].ASC : _common_constants_js__WEBPACK_IMPORTED_MODULE_7__["SortOrder"].DESC;
    const params = _objectSpread(_objectSpread({}, requestParam), {}, {
      SortBy: sortBy,
      SortOrder: requestSortOrder
    });
    submitRequest(params);
  };
  const onPaging = (pageIndex, pageSize) => {
    const params = _objectSpread(_objectSpread({}, requestParam), {}, {
      PageSize: pageSize,
      PageIndex: pageIndex
    });
    submitRequest(params);
  };
  const reportTitleContent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "flex-auto"
  }, reportTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ExcelPopUp_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null));
  if (!data) {
    return null;
  }
  if (!data.length) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_5__["default"], null);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "result-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_6__["default"], {
    content: reportTitleContent,
    tag: "div"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_3__["Table"], {
    key: `table-winloss-ananlysis-${requestParam.SubmitTime}`,
    minWidth: 650,
    autoWidth: true,
    autoHeight: true,
    header: header,
    body: body,
    footer: footer,
    containerPadding: 30,
    onSort: onSort,
    isPaging: true,
    pageOption: currenPagingOption,
    shouldResetScrollPosition: reloadReport,
    onPaging: onPaging
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/desktop/FormFilter.jsx":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/desktop/FormFilter.jsx ***!
  \******************************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _MainFilter_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/desktop/MainFilter.jsx");
/* harmony import */ var _GroupByFilter_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GroupByFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/desktop/GroupByFilter.jsx");





const FormFilter = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "aggregate-filter"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MainFilter_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GroupByFilter_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/desktop/GroupByFilter.jsx":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/desktop/GroupByFilter.jsx ***!
  \*********************************************************************************************/
/*! exports provided: GroupByFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupByFilter", function() { return GroupByFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _hooks_useValidParam_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useValidParam.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useValidParam.jsx");
/* harmony import */ var _hooks_useFilterAction_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useFilterAction.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useFilterAction.jsx");
/* harmony import */ var _filters_GroupByOptionsFilter_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../filters/GroupByOptionsFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/GroupByOptionsFilter.jsx");
/* harmony import */ var _filters_BreakDownOptionFilter_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../filters/BreakDownOptionFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/BreakDownOptionFilter.jsx");







const GroupByFilter = () => {
  const isValidModel = Object(_hooks_useValidParam_jsx__WEBPACK_IMPORTED_MODULE_3__["useValidParam"])();
  const {
    submit,
    onClickClearFilter
  } = Object(_hooks_useFilterAction_jsx__WEBPACK_IMPORTED_MODULE_4__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "page-filter",
    isCollapseMode: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row flex w100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_GroupByOptionsFilter_jsx__WEBPACK_IMPORTED_MODULE_5__["GroupByOptionFilter"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BreakDownOptionFilter_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    disabled: !isValidModel,
    className: "btn btn-submit",
    onClick: submit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("Submit")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn btn-outline-secondary",
    onClick: onClickClearFilter
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("ClearAllFilters")))))));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(GroupByFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/desktop/MainFilter.jsx":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/desktop/MainFilter.jsx ***!
  \******************************************************************************************/
/*! exports provided: MainFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainFilter", function() { return MainFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_customHooks_useBaseCurrencyForMultiSelectCurrency__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency */ "./www/js/source/reactpages/customHooks/useBaseCurrencyForMultiSelectCurrency.jsx");
/* harmony import */ var _hooks_useFilterHandler_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks/useFilterHandler.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useFilterHandler.jsx");
/* harmony import */ var _hooks_useIsDisabledGroupInOriginalCurrency__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../hooks/useIsDisabledGroupInOriginalCurrency */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useIsDisabledGroupInOriginalCurrency.jsx");
/* harmony import */ var _filters_SubsidiaryDropDownFilter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../filters/SubsidiaryDropDownFilter */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SubsidiaryDropDownFilter.jsx");
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");
/* harmony import */ var _filters_DateRangeFilter_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../filters/DateRangeFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/DateRangeFilter.jsx");
/* harmony import */ var _common_Service_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common/Service.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var _filters_ProductFilter_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../filters/ProductFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/ProductFilter.jsx");
/* harmony import */ var _filters_SportFilter_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../filters/SportFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SportFilter.jsx");
/* harmony import */ var _filters_BetTypeFilter_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../filters/BetTypeFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/BetTypeFilter.jsx");
/* harmony import */ var _filters_PlatformFilter_jsx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../filters/PlatformFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/PlatformFilter.jsx");
/* harmony import */ var _filters_StatusFilter_jsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../filters/StatusFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/StatusFilter.jsx");
/* harmony import */ var _filters_LiveStatusFilter_jsx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../filters/LiveStatusFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/LiveStatusFilter.jsx");
/* harmony import */ var _filters_BaseCurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../filters/BaseCurrencyFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/BaseCurrencyFilter.jsx");
/* harmony import */ var _filters_VipOnlyFilter_jsx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../filters/VipOnlyFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/VipOnlyFilter.jsx");
/* harmony import */ var _filters_RiskLevelFilter_jsx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../filters/RiskLevelFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/RiskLevelFilter.jsx");
/* harmony import */ var _filters_OddsGroupFilter_jsx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../filters/OddsGroupFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/OddsGroupFilter.jsx");
/* harmony import */ var _filters_UserNameFilter_jsx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../filters/UserNameFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/UserNameFilter.jsx");
/* harmony import */ var _filters_GroupInOriginalCurrencyCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../filters/GroupInOriginalCurrencyCheckBoxFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/GroupInOriginalCurrencyCheckBoxFilter.jsx");
/* harmony import */ var _filters_ExcludeTestDataCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../filters/ExcludeTestDataCheckBoxFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/ExcludeTestDataCheckBoxFilter.jsx");
/* harmony import */ var _filters_ViewCashOutOnlyFilter_jsx__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../filters/ViewCashOutOnlyFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/ViewCashOutOnlyFilter.jsx");
/* harmony import */ var _filters_SubsidiaryCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../filters/SubsidiaryCheckBoxFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SubsidiaryCheckBoxFilter.jsx");
/* harmony import */ var _filters_StickyIcon_jsx__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../filters/StickyIcon.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/StickyIcon.jsx");
/* harmony import */ var _filters_CurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../filters/CurrencyFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/CurrencyFilter.jsx");





























const MainFilter = () => {
  const {
    appUuid,
    dateRange,
    selectedProduct,
    selectedSport,
    sportList,
    selectedBettype,
    bettypeList,
    selectedPlatform,
    selectedStatus,
    selectedLiveStatus,
    selectedBaseCurrency,
    selectedVipOnly,
    selectedCustomerClass,
    selectedOddsGroup,
    searchMode,
    isGroupInOriginalCurrency,
    isExcludeTestData,
    isViewCashOutOnly,
    selectedCurrency
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state, react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const {
    isShowSubsidiaryDropdown,
    isSubsidiarySearch,
    isShowSubsidiarySearchCheckBox
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_9__["default"])();
  const {
    baseCurrencyList,
    selectedBaseCurrency: newBaseCurrency
  } = Object(_jsroot_customHooks_useBaseCurrencyForMultiSelectCurrency__WEBPACK_IMPORTED_MODULE_5__["default"])(selectedBaseCurrency);
  const {
    onSubsidiaryDropDownChangeHandler,
    onDateRangeChangeHandler,
    onProductChangeHandler,
    onSportChangeHandler,
    onBetTypeChangeHandler,
    onPlatformChangeHandler,
    onStatusChangeHandler,
    onLiveStatusChangeHandler,
    onBaseCurrencyChangeHandler,
    onVipOnlyChangeHandler,
    onRiskLevelChangeHandler,
    onOddsGroupChangeHandler,
    onSearchModeChangeHandler,
    onUserNameInputHandler,
    onGroupInOriginalCurrencyChangeHandler,
    onExcludeTextDataChangeHandler,
    onCashOutOnlyChangeHandler,
    onSubsidiaryCheckBoxChangeHandler,
    onCurrencyChangeHandler
  } = Object(_hooks_useFilterHandler_jsx__WEBPACK_IMPORTED_MODULE_6__["useFilterHandler"])();
  const {
    isOfferCashOutProduct,
    isHasPermissionViewVip
  } = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__["default"];
  const isEnableCashOutFilter = _common_Service_js__WEBPACK_IMPORTED_MODULE_11__["default"].isContainProductSportBookOrBa(selectedProduct);
  const isDisabledGroupInOriginalCurrency = Object(_hooks_useIsDisabledGroupInOriginalCurrency__WEBPACK_IMPORTED_MODULE_7__["default"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    onProductChangeHandler(null, selectedProduct);
  }, [appUuid]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    onBaseCurrencyChangeHandler({
      value: newBaseCurrency
    });
  }, [newBaseCurrency]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    onSubsidiaryCheckBoxChangeHandler(!isShowSubsidiarySearchCheckBox && isShowSubsidiaryDropdown);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "page-filter",
    isCollapseMode: false,
    stickyFooter: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_StickyIcon_jsx__WEBPACK_IMPORTED_MODULE_27__["default"], null)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_2__["ToastContainer"], {
    autoClose: 10000,
    pauseOnFocusLoss: false,
    style: {
      width: "500px"
    },
    transition: react_toastify__WEBPACK_IMPORTED_MODULE_2__["Flip"]
  }), isShowSubsidiaryDropdown && isSubsidiarySearch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-4 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SubsidiaryDropDownFilter__WEBPACK_IMPORTED_MODULE_8__["default"], {
    key: `subsidiary-${appUuid}`,
    onChange: onSubsidiaryDropDownChangeHandler
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_DateRangeFilter_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
    key: `date-${appUuid}`,
    onChange: onDateRangeChangeHandler,
    dateRange: dateRange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ProductFilter_jsx__WEBPACK_IMPORTED_MODULE_12__["default"], {
    key: `product-${appUuid}`,
    onChange: onProductChangeHandler,
    isValid: !!selectedProduct,
    value: selectedProduct
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SportFilter_jsx__WEBPACK_IMPORTED_MODULE_13__["default"], {
    key: `sport-${appUuid}`,
    onChange: onSportChangeHandler,
    isValid: !!selectedSport,
    dataSource: sportList
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BetTypeFilter_jsx__WEBPACK_IMPORTED_MODULE_14__["default"], {
    key: `bettype-${appUuid}`,
    onChange: onBetTypeChangeHandler,
    isValid: !!selectedBettype,
    dataSource: bettypeList
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_PlatformFilter_jsx__WEBPACK_IMPORTED_MODULE_15__["default"], {
    key: `platform-${appUuid}`,
    onChange: onPlatformChangeHandler,
    isValid: !!selectedPlatform
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_StatusFilter_jsx__WEBPACK_IMPORTED_MODULE_16__["default"], {
    key: `status-${appUuid}`,
    onChange: onStatusChangeHandler,
    isValid: !!selectedStatus
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_LiveStatusFilter_jsx__WEBPACK_IMPORTED_MODULE_17__["default"], {
    key: `live-status-${appUuid}`,
    onChange: onLiveStatusChangeHandler,
    isValid: !!selectedLiveStatus
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_CurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_28__["default"], {
    key: `currency-${appUuid}`,
    isValid: !!selectedCurrency,
    onChange: onCurrencyChangeHandler
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BaseCurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_18__["default"], {
    key: `base-currency-${appUuid}`,
    onChange: onBaseCurrencyChangeHandler,
    options: baseCurrencyList,
    value: selectedBaseCurrency
  })), isHasPermissionViewVip && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_VipOnlyFilter_jsx__WEBPACK_IMPORTED_MODULE_19__["default"], {
    key: `vip-only-${appUuid}`,
    onChange: onVipOnlyChangeHandler,
    value: selectedVipOnly
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_RiskLevelFilter_jsx__WEBPACK_IMPORTED_MODULE_20__["default"], {
    key: `risk-level-${appUuid}`,
    onChange: onRiskLevelChangeHandler,
    isValid: !!selectedCustomerClass
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_OddsGroupFilter_jsx__WEBPACK_IMPORTED_MODULE_21__["default"], {
    key: `odds-group-${appUuid}`,
    onChange: onOddsGroupChangeHandler,
    isValid: !!selectedOddsGroup
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_UserNameFilter_jsx__WEBPACK_IMPORTED_MODULE_22__["default"], {
    key: `username-${appUuid}`,
    onChangeSearchMode: onSearchModeChangeHandler,
    onChangeUserName: onUserNameInputHandler,
    searchMode: searchMode
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_GroupInOriginalCurrencyCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_23__["default"], {
    disabled: isDisabledGroupInOriginalCurrency,
    checked: isGroupInOriginalCurrency,
    onChange: onGroupInOriginalCurrencyChangeHandler
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ExcludeTestDataCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_24__["default"], {
    checked: isExcludeTestData,
    onChange: onExcludeTextDataChangeHandler
  })), isOfferCashOutProduct && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ViewCashOutOnlyFilter_jsx__WEBPACK_IMPORTED_MODULE_25__["default"], {
    onChange: onCashOutOnlyChangeHandler,
    disabled: !isEnableCashOutFilter,
    checked: isViewCashOutOnly
  })), isShowSubsidiarySearchCheckBox && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SubsidiaryCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_26__["default"], {
    value: isSubsidiarySearch,
    onChange: onSubsidiaryCheckBoxChangeHandler
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MainFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/BaseCurrencyFilter.jsx":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/BaseCurrencyFilter.jsx ***!
  \**************************************************************************************************/
/*! exports provided: BaseCurrencyFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseCurrencyFilter", function() { return BaseCurrencyFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);





const BaseCurrencyFilter = props => {
  const {
    onChange,
    value,
    options
  } = props;
  console.log('%c Render BaseCurrencyFilter', 'color: red');
  const _renderBaseCurrencySelectList = () => {
    const baseCurrencyList = options;
    return (baseCurrencyList === null || baseCurrencyList === void 0 ? void 0 : baseCurrencyList.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_2__["default"], {
      instanceId: "ddlBased",
      value: value,
      options: options,
      onChange: onChange
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("BaseCurrency")), _renderBaseCurrencySelectList());
};
const propTypes = {
  value: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  options: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array
};
BaseCurrencyFilter.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(BaseCurrencyFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/BetTypeFilter.jsx":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/BetTypeFilter.jsx ***!
  \*********************************************************************************************/
/*! exports provided: BetTypeFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BetTypeFilter", function() { return BetTypeFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/constants/report */ "./www/js/source/reactpages/constants/report.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);






const BetTypeFilter = props => {
  const {
    dataSource,
    onChange,
    isValid
  } = props;
  const _renderBettypeSelectList = () => {
    if (!dataSource || !dataSource.length) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__["TreeViewSelect"], {
        language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].currentLanguage,
        id: "BetTypeList",
        dataSource: [],
        keyField: "Value",
        valueField: "Name",
        statusField: "Checked",
        texts: {
          All: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("N_A")
        },
        isAllTextShown: true,
        hasSearchBox: true,
        treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_1__["TreeViewOption"],
        isValid: false
      });
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__["TreeViewSelect"], {
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].currentLanguage,
      id: "BetTypeList",
      dataSource: dataSource,
      keyField: "Value",
      valueField: "Name",
      statusField: "Checked",
      isAllTextShown: true,
      hasSearchBox: true,
      treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_1__["TreeViewOption"],
      onChange: onChange,
      isValid: isValid
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("BetType")), _renderBettypeSelectList());
};
const propTypes = {
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.array
};
const defaultProps = {
  isValid: true,
  dataSource: []
};
BetTypeFilter.propTypes = propTypes;
BetTypeFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(BetTypeFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/BreakDownOptionFilter.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/BreakDownOptionFilter.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: BreakDownOptionFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreakDownOptionFilter", function() { return BreakDownOptionFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _common_Service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/Service.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _hooks_useGroupFilterHandler_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useGroupFilterHandler.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useGroupFilterHandler.jsx");





const BreakDownOptionFilter = () => {
  const [selectedGroupByOption, selectedBreakDownByOption] = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(state => [state.selectedGroupByOption, state.selectedBreakDownByOption], react_redux__WEBPACK_IMPORTED_MODULE_3__["shallowEqual"]);
  const {
    onChangeBreakByOption
  } = Object(_hooks_useGroupFilterHandler_jsx__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const breakDownList = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => _common_Service_js__WEBPACK_IMPORTED_MODULE_2__["default"].buildBreakDownOptionFromGroupByMode(selectedGroupByOption), [selectedGroupByOption]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group radio-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BreakdownBy'), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio-list"
  }, breakDownList.map((option, i) => {
    const key = 'BreakBy' + i;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      key: `BreakBy${key}`,
      className: "filter-radio-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      disabled: option.isDisabled,
      type: "radio",
      value: option.value,
      checked: selectedBreakDownByOption == option.value,
      id: key,
      onChange: onChangeBreakByOption
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: key
    }, option.label));
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(BreakDownOptionFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/CurrencyFilter.jsx":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/CurrencyFilter.jsx ***!
  \**********************************************************************************************/
/*! exports provided: CurrencyFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyFilter", function() { return CurrencyFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);






const CurrencyFilter = props => {
  const {
    onChange,
    isValid
  } = props;
  const _renderCurrencySelectList = () => {
    const currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].currencyList;
    return currencyList && currencyList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
      id: "ddlCurrency",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].currentLanguage,
      dataSource: currencyList,
      keyField: "id",
      valueField: "value",
      statusField: "status",
      onChange: onChange,
      isValid: isValid
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("Currency")), _renderCurrencySelectList());
};
const propTypes = {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool
};
CurrencyFilter.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(CurrencyFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/DateRangeFilter.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/DateRangeFilter.jsx ***!
  \***********************************************************************************************/
/*! exports provided: DateRangeFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateRangeFilter", function() { return DateRangeFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_components_date_range_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/date-range/index */ "./www/js/source/reactpages/components/date-range/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);





const DateRangeFilter = props => {
  const {
    onChange,
    isMobile,
    dateRange
  } = props;
  const _renderDateRange = () => {
    const dateConstraint = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].dateConstraint;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_range_index__WEBPACK_IMPORTED_MODULE_3__["DateRange"], {
      startDate: dateRange.fromDate,
      endDate: dateRange.toDate,
      minDate: dateConstraint.minDate,
      maxDate: dateConstraint.maxDate,
      today: dateConstraint.maxDate,
      limitedMonthRange: dateConstraint.limitedMonthRange,
      onChange: onChange,
      isMobile: isMobile
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Date")), _renderDateRange());
};
const propTypes = {
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  dateRange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    fromDate: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    toDate: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string
  })
};
const defaultProps = {
  isMobile: false
};
DateRangeFilter.propTypes = propTypes;
DateRangeFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(DateRangeFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/ExcludeTestDataCheckBoxFilter.jsx":
/*!*************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/ExcludeTestDataCheckBoxFilter.jsx ***!
  \*************************************************************************************************************/
/*! exports provided: ExcludeTestDataCheckBoxFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcludeTestDataCheckBoxFilter", function() { return ExcludeTestDataCheckBoxFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




const ExcludeTestDataCheckBoxFilter = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
    id: "IsExcludeTestData"
  }, props, {
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("ExcludeTestData")
  })));
};
const propTypes = {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  checked: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};
ExcludeTestDataCheckBoxFilter.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(ExcludeTestDataCheckBoxFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/GroupByOptionsFilter.jsx":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/GroupByOptionsFilter.jsx ***!
  \****************************************************************************************************/
/*! exports provided: GroupByOptionFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupByOptionFilter", function() { return GroupByOptionFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _common_Service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/Service.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _hooks_useGroupFilterHandler_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/useGroupFilterHandler.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useGroupFilterHandler.jsx");






const GroupByOptionFilter = () => {
  const selectedGroupByOption = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(state => state.selectedGroupByOption);
  const groupByList = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => _common_Service_js__WEBPACK_IMPORTED_MODULE_2__["default"].buildGroupByOption(), [_jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].licenseeName]);
  const {
    onChangeGroupByOption
  } = Object(_hooks_useGroupFilterHandler_jsx__WEBPACK_IMPORTED_MODULE_5__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group radio-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('GroupBy'), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio-list"
  }, groupByList.map((option, i) => {
    const key = 'GroupBy' + i;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      key: `GroupBy${key}`,
      className: "filter-radio-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "radio",
      value: option.value,
      checked: selectedGroupByOption == option.value,
      id: key,
      onChange: onChangeGroupByOption
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: key
    }, option.label));
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(GroupByOptionFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/GroupInOriginalCurrencyCheckBoxFilter.jsx":
/*!*********************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/GroupInOriginalCurrencyCheckBoxFilter.jsx ***!
  \*********************************************************************************************************************/
/*! exports provided: GroupInOriginalCurrencyCheckBoxFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupInOriginalCurrencyCheckBoxFilter", function() { return GroupInOriginalCurrencyCheckBoxFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





const GroupInOriginalCurrencyCheckBoxFilter = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
    id: "IsGroupInOriginalCurrency"
  }, props, {
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("IsGroupInOriginalCurrency")
  })));
};
const propTypes = {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  checked: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};
GroupInOriginalCurrencyCheckBoxFilter.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(GroupInOriginalCurrencyCheckBoxFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/LiveStatusFilter.jsx":
/*!************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/LiveStatusFilter.jsx ***!
  \************************************************************************************************/
/*! exports provided: LiveStatusFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveStatusFilter", function() { return LiveStatusFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);






const LiveStatusFilter = props => {
  const {
    onChange,
    isValid
  } = props;
  const _renderLiveStatusSelectList = () => {
    const liveStatusList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].liveStatusList;
    return liveStatusList && liveStatusList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
      id: "LiveStatusList",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].currentLanguage,
      dataSource: liveStatusList,
      keyField: "id",
      valueField: "value",
      statusField: "status",
      onChange: onChange,
      isValid: isValid
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("LiveStatus")), _renderLiveStatusSelectList());
};
const propTypes = {
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
};
const defaultProps = {
  isValid: true
};
LiveStatusFilter.propTypes = propTypes;
LiveStatusFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(LiveStatusFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/OddsGroupFilter.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/OddsGroupFilter.jsx ***!
  \***********************************************************************************************/
/*! exports provided: OddsGroupFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OddsGroupFilter", function() { return OddsGroupFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);






const OddsGroupFilter = props => {
  const {
    onChange,
    isValid
  } = props;
  const _renderOddsGroupsSelectList = () => {
    const oddsGroupList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].oddsGroupList;
    return (oddsGroupList === null || oddsGroupList === void 0 ? void 0 : oddsGroupList.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
      id: "ddlOddGroup",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].currentLanguage,
      dataSource: oddsGroupList,
      keyField: "id",
      valueField: "value",
      statusField: "status",
      onChange: onChange,
      isValid: isValid
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("OddsGroup")), _renderOddsGroupsSelectList());
};
const propTypes = {
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
};
const defaultProps = {
  isValid: true
};
OddsGroupFilter.propTypes = propTypes;
OddsGroupFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(OddsGroupFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/PlatformFilter.jsx":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/PlatformFilter.jsx ***!
  \**********************************************************************************************/
/*! exports provided: PlatformFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformFilter", function() { return PlatformFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);






const PlatformFilter = props => {
  const {
    onChange,
    isValid
  } = props;
  const _renderPlatformSelectList = () => {
    const platformList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].platformList;
    return platformList && platformList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
      id: "PlatformList",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].currentLanguage,
      dataSource: platformList,
      valueField: "value",
      keyField: "id",
      statusField: "status",
      onChange: onChange,
      isValid: isValid
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("Platform")), _renderPlatformSelectList());
};
const propTypes = {
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
};
const defaultProps = {
  isValid: true
};
PlatformFilter.propTypes = propTypes;
PlatformFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(PlatformFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/ProductFilter.jsx":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/ProductFilter.jsx ***!
  \*********************************************************************************************/
/*! exports provided: ProductFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductFilter", function() { return ProductFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);






const ProductFilter = props => {
  const {
    value,
    onChange,
    isValid
  } = props;
  const _renderProductSelectList = () => {
    const productList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].productList;
    return productList && productList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
      id: "ProductList",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].currentLanguage,
      value: value,
      hasSearchBox: true,
      dataSource: productList,
      valueField: "value",
      keyField: "id",
      statusField: "status",
      onChange: onChange,
      isValid: isValid
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("Product")), _renderProductSelectList());
};
const propTypes = {
  value: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool
};
const defaultProps = {
  isValid: true
};
ProductFilter.propTypes = propTypes;
ProductFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(ProductFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/RiskLevelFilter.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/RiskLevelFilter.jsx ***!
  \***********************************************************************************************/
/*! exports provided: RiskLevelFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RiskLevelFilter", function() { return RiskLevelFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);






const RiskLevelFilter = props => {
  const {
    onChange,
    isValid
  } = props;
  const _renderCustomerClassSelectList = () => {
    const riskLevelList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].riskLevelList;
    return (riskLevelList === null || riskLevelList === void 0 ? void 0 : riskLevelList.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
      id: "ddlRiskLevel",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].currentLanguage,
      dataSource: riskLevelList,
      keyField: "id",
      valueField: "value",
      statusField: "status",
      onChange: onChange,
      isValid: isValid
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("RiskLevel")), _renderCustomerClassSelectList());
};
const propTypes = {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool
};
const defaultProps = {
  isValid: true
};
RiskLevelFilter.propTypes = propTypes;
RiskLevelFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(RiskLevelFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SearchOption.jsx":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/SearchOption.jsx ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_dropdown_DrowdownRadioList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/dropdown/DrowdownRadioList */ "./www/js/source/reactpages/components/dropdown/DrowdownRadioList.jsx");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);





const SearchOption = props => {
  const {
    value,
    onChange
  } = props;
  const dataSource = [{
    id: _common_constants__WEBPACK_IMPORTED_MODULE_2__["SearchMode"].MatchPrecise,
    text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('MatchPrecise')
  }, {
    id: _common_constants__WEBPACK_IMPORTED_MODULE_2__["SearchMode"].MatchPrefix,
    text: `${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('MatchPrefix')} "<span class='keyword'>test</span>"ABCD`
  }, {
    id: _common_constants__WEBPACK_IMPORTED_MODULE_2__["SearchMode"].MatchCase,
    text: `${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('MatchCase')} AB"<span class='keyword'>test</span>"CD`
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown_DrowdownRadioList__WEBPACK_IMPORTED_MODULE_1__["default"], {
    id: "search-user-name",
    dataSource: dataSource,
    selectedValue: value,
    onChange: onChange,
    className: "search-option",
    keySelector: "id",
    valueSelector: "text"
  });
};
const propTypes = {
  value: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number]),
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
};
SearchOption.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(SearchOption));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SportFilter.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/SportFilter.jsx ***!
  \*******************************************************************************************/
/*! exports provided: SportFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SportFilter", function() { return SportFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/constants/report */ "./www/js/source/reactpages/constants/report.js");






const SportFilter = props => {
  const {
    dataSource,
    onChange,
    isValid
  } = props;
  const _renderSportSelectList = () => {
    if (!dataSource || !dataSource.length) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__["TreeViewSelect"], {
        language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].currentLanguage,
        id: "SportList",
        dataSource: [],
        keyField: "Value",
        valueField: "Name",
        statusField: "Checked",
        texts: {
          All: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("N_A")
        },
        isAllTextShown: true,
        hasSearchBox: true,
        treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_4__["TreeViewOption"],
        isValid: false
      });
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__["TreeViewSelect"], {
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].currentLanguage,
      id: "SportList",
      dataSource: dataSource,
      keyField: "Value",
      valueField: "Name",
      statusField: "Checked",
      isAllTextShown: true,
      hasSearchBox: true,
      treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_4__["TreeViewOption"],
      onChange: onChange,
      isValid: isValid
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("Sport")), _renderSportSelectList());
};
const propTypes = {
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array
};
const defaultProps = {
  isValid: true,
  dataSource: []
};
SportFilter.propTypes = propTypes;
SportFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(SportFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/StatusFilter.jsx":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/StatusFilter.jsx ***!
  \********************************************************************************************/
/*! exports provided: StatusFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusFilter", function() { return StatusFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);






const StatusFilter = props => {
  const {
    onChange,
    isValid
  } = props;
  const _renderStatusSelectList = () => {
    const statusList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"].statusList;
    return statusList && statusList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
      id: "StatusList",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].currentLanguage,
      dataSource: statusList,
      keyField: "id",
      valueField: "value",
      statusField: "status",
      onChange: onChange,
      isValid: isValid
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("Status")), _renderStatusSelectList());
};
const propTypes = {
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
};
const defaultProps = {
  isValid: true
};
StatusFilter.propTypes = propTypes;
StatusFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(StatusFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/StickyIcon.jsx":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/StickyIcon.jsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/UserGuide */ "./www/js/source/reactpages/components/UserGuide.jsx");






const StickyIcon = () => {
  const userGuideContent = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.userGuideContent);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    getUserGuideContent
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const _showUserGuide = () => {
    if (!userGuideContent || userGuideContent.length === 0) {
      dispatch(getUserGuideContent('WinlossAnalysis'));
    }
  };
  const _renderUserGuide = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_4__["default"], {
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("UserGuide"),
      contentTitle: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("WinlossAnalysis"),
      onClick: _showUserGuide,
      content: userGuideContent
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _renderUserGuide());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(StickyIcon));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SubsidiaryCheckBoxFilter.jsx":
/*!********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/SubsidiaryCheckBoxFilter.jsx ***!
  \********************************************************************************************************/
/*! exports provided: SubsidiaryCheckBoxFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubsidiaryCheckBoxFilter", function() { return SubsidiaryCheckBoxFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);





const SubsidiaryCheckBoxFilter = props => {
  const {
    value,
    onChange
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__["default"], {
    id: "SubsidiarySearch",
    checked: value,
    onChange: onChange,
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("SubsidiarySearch")
  }));
};
const propTypes = {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  value: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};
SubsidiaryCheckBoxFilter.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(SubsidiaryCheckBoxFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SubsidiaryDropDownFilter.jsx":
/*!********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/SubsidiaryDropDownFilter.jsx ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/constants/report */ "./www/js/source/reactpages/constants/report.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);








const SubsidiaryDropDownFilter = props => {
  const {
    onChange
  } = props;
  const {
    isWhiteLabelView
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const _renderSubsidiaryTreeView = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4__["TreeViewSelect"], {
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].currentLanguage,
      id: "SubsidiaryTreeView",
      dataSource: _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].whitelabelList,
      keyField: "Value",
      valueField: "Name",
      statusField: "Checked",
      isAllTextShown: false,
      hasSearchBox: false,
      treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_3__["TreeViewOption"],
      onChange: onChange
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, isWhiteLabelView ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("WhiteLabel") : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Subsidiary")), _renderSubsidiaryTreeView());
};
const propTypes = {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func
};
SubsidiaryDropDownFilter.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(SubsidiaryDropDownFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/UserNameFilter.jsx":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/UserNameFilter.jsx ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/auto-complete */ "./www/js/source/reactpages/components/auto-complete/index.jsx");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SearchOption__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SearchOption */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SearchOption.jsx");







const UserNameFilter = props => {
  const {
    onChangeSearchMode,
    onChangeUserName,
    searchMode
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Username")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "search-option-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchOption__WEBPACK_IMPORTED_MODULE_5__["default"], {
    value: searchMode,
    onChange: onChangeSearchMode
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_2__["default"], {
    url: _common_constants__WEBPACK_IMPORTED_MODULE_3__["ApiUrl"].CUSTOMER_SEARCH_URL,
    onSelect: onChangeUserName,
    onInput: onChangeUserName,
    htmlAttributes: {
      placeholder: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("ExternalIdOrSystemId")
    }
  }));
};
const propTypes = {
  onChangeSearchMode: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  onChangeUserName: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  searchMode: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string])
};
UserNameFilter.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(UserNameFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/ViewCashOutOnlyFilter.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/ViewCashOutOnlyFilter.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: ViewCashOutOnlyFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewCashOutOnlyFilter", function() { return ViewCashOutOnlyFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





const ViewCashOutOnlyFilter = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
    id: "IsViewCashOutOnly"
  }, props, {
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("ViewCashOutOnly")
  })));
};
const propTypes = {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  checked: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};
ViewCashOutOnlyFilter.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(ViewCashOutOnlyFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/VipOnlyFilter.jsx":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/filters/VipOnlyFilter.jsx ***!
  \*********************************************************************************************/
/*! exports provided: VipOnlyFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VipOnlyFilter", function() { return VipOnlyFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






const VipOnlyFilter = props => {
  const {
    onChange,
    value
  } = props;
  const _renderVipOnlySelectedList = () => {
    const vipOnlyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__["default"].vipOnlyList;
    return vipOnlyList && vipOnlyList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_2__["default"], {
      instanceId: "IsVipOnly",
      value: value,
      options: vipOnlyList,
      onChange: onChange
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group",
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("VIPPlayerTooltipMsg")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("VIPPlayerOnly")), _renderVipOnlySelectedList());
};
const propTypes = {
  value: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number]),
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func
};
VipOnlyFilter.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(VipOnlyFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useFilterAction.jsx":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useFilterAction.jsx ***!
  \*********************************************************************************************/
/*! exports provided: useFilterAction, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFilterAction", function() { return useFilterAction; });
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_customHooks_useBaseCurrencyForMultiSelectCurrency__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency */ "./www/js/source/reactpages/customHooks/useBaseCurrencyForMultiSelectCurrency.jsx");
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");
/* harmony import */ var _common_Service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/Service.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var _useValidParam__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useValidParam */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useValidParam.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _jsroot_lib_stringHelper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/lib/stringHelper.js */ "./www/js/source/reactpages/lib/stringHelper.js");
/* harmony import */ var _common_constants_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common/constants.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");














const useFilterAction = () => {
  const isValidModel = Object(_useValidParam__WEBPACK_IMPORTED_MODULE_7__["useValidParam"])();
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["useDispatch"])();
  const {
    requestParam,
    username,
    selectedBaseCurrency,
    selectedProduct,
    selectedStatus,
    dateRange,
    selectedLiveStatus,
    selectedPlatform,
    selectedCurrency,
    selectedSport,
    selectedBettype,
    selectedSubsidiary,
    selectedOddsGroup,
    selectedCustomerClass,
    searchMode,
    sportList,
    bettypeList,
    selectedVipOnly,
    isGroupInOriginalCurrency,
    isExcludeTestData,
    isViewCashOutOnly,
    selectedGroupByOption,
    selectedBreakDownByOption
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["useSelector"])(state => state, react_redux__WEBPACK_IMPORTED_MODULE_8__["shallowEqual"]);
  const {
    baseCurrencyList
  } = Object(_jsroot_customHooks_useBaseCurrencyForMultiSelectCurrency__WEBPACK_IMPORTED_MODULE_4__["default"])(selectedBaseCurrency);
  const {
    isSubsidiarySearch
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const {
    setReportTitle,
    setRequestParam,
    toggleLoader,
    getReportData,
    setDateRange,
    setSelectedProduct,
    setSelectedCurrency,
    setSelectedPlatform,
    setSelectedStatus,
    setSelectedLiveStatus,
    setSelectedBaseCurrency,
    setSelectedVipOnly,
    setSelectedCustomerClass,
    setSelectedOddsGroup,
    setUsername,
    setSearchMode,
    setGroupInOriginalCurrency,
    setViewCashOutOnly,
    setExcludeTestData,
    setSelectedGroupByOption,
    setSelectedBreakDownByOption,
    setSubsidiarySearch,
    setSubsidiaryList,
    setAppUuid
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_0__["ActionCreators"];
  const _buildTitle = params => {
    const {
      FromDate,
      ToDate,
      ProductCodes,
      SearchUserName,
      CurrencyCodes,
      BaseCurrencyName
    } = params;
    const dateRangeText = `, ${_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].convertDateToString(FromDate)} → ${_jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].convertDateToString(ToDate)}`;
    const currencyText = `, ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Currency")}: ${CurrencyCodes}, ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("BaseCurrency")}: ${BaseCurrencyName}`;
    const productText = `, ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("LicenseeW_L")} (${ProductCodes})`;
    const userText = !!SearchUserName ? `, ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Username")}: ${SearchUserName}` : "";
    return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("WinlossAnalysis") + dateRangeText + currencyText + productText + userText;
  };
  const _getParams = () => {
    if (!isValidModel) {
      return null;
    }
    const {
      fromDate,
      toDate
    } = dateRange;
    const {
      PageSize
    } = requestParam;
    const {
      oddsGroupList,
      riskLevelList,
      liveStatusList,
      statusList,
      platformList,
      currencyList
    } = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_3__["default"];
    const baseCurrency = baseCurrencyList.find(x => x.value === selectedBaseCurrency);
    const subsidiary = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].getLrfSubsidiary();
    let {
      SubsidiarySearch,
      SubsidiaryList
    } = subsidiary;
    if (!subsidiary || Object.keys(subsidiary).length === 0) {
      SubsidiarySearch = isSubsidiarySearch;
      SubsidiaryList = selectedSubsidiary;
    }
    const selectedCurrencyCode = _common_Service_js__WEBPACK_IMPORTED_MODULE_6__["default"].getCurrencyCodes(selectedCurrency, currencyList);
    const seletedCurrencyText = selectedCurrencyCode == _common_constants_js__WEBPACK_IMPORTED_MODULE_11__["ALL_SELECTED_TEXT"] ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("All") : _jsroot_lib_stringHelper_js__WEBPACK_IMPORTED_MODULE_10__["default"].addSpaceAfterComma(selectedCurrencyCode);
    return {
      PageSize: PageSize,
      PageIndex: 1,
      FromDate: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].convertDateToString(fromDate),
      ToDate: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].convertDateToString(toDate),
      ProductCodes: selectedProduct,
      SearchUserName: username,
      SearchMode: searchMode,
      CurrencyIdList: selectedCurrency,
      CurrencyCodes: seletedCurrencyText,
      BaseCurrency: selectedBaseCurrency,
      StatusIds: _common_Service_js__WEBPACK_IMPORTED_MODULE_6__["default"].getNormalizedSelectedParamValueForMultiSelectFilter(selectedStatus, statusList),
      SportIds: _common_Service_js__WEBPACK_IMPORTED_MODULE_6__["default"].getNormalizedSelectedParamValueForTreeListFilter(selectedSport, sportList),
      BetTypeIds: _common_Service_js__WEBPACK_IMPORTED_MODULE_6__["default"].getNormalizedSelectedParamValueForTreeListFilter(selectedBettype, bettypeList),
      PlatformIds: _common_Service_js__WEBPACK_IMPORTED_MODULE_6__["default"].getNormalizedSelectedParamValueForMultiSelectFilter(selectedPlatform, platformList),
      LiveStatusIds: _common_Service_js__WEBPACK_IMPORTED_MODULE_6__["default"].getNormalizedSelectedParamValueForMultiSelectFilter(selectedLiveStatus, liveStatusList),
      IsVipOnly: selectedVipOnly,
      CustomerClass: _common_Service_js__WEBPACK_IMPORTED_MODULE_6__["default"].getNormalizedSelectedParamValueForMultiSelectFilter(selectedCustomerClass, riskLevelList, r => r.customerClassList),
      OddsGroup: _common_Service_js__WEBPACK_IMPORTED_MODULE_6__["default"].getNormalizedSelectedParamValueForMultiSelectFilter(selectedOddsGroup, oddsGroupList),
      IsShowInOrginalCurrency: isGroupInOriginalCurrency,
      IsExcludedTestData: isExcludeTestData,
      IsViewCashOutOnly: isViewCashOutOnly,
      GroupMode: selectedGroupByOption,
      BreakdownMode: selectedBreakDownByOption,
      BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
      SortBy: _common_constants_js__WEBPACK_IMPORTED_MODULE_11__["SortBy"].Default,
      SortOrder: _common_constants_js__WEBPACK_IMPORTED_MODULE_11__["SortOrder"].ASC,
      SubsidiaryList,
      SubsidiarySearch,
      SubmitTime: new Date().getTime()
    };
  };
  const submit = event => {
    event.preventDefault();
    const params = _getParams();
    if (!params) {
      return;
    }
    react_toastify__WEBPACK_IMPORTED_MODULE_9__["toast"].dismiss();
    const title = _buildTitle(params);
    Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["batch"])(() => {
      dispatch(setReportTitle(title));
      dispatch(setRequestParam(params));
      dispatch(toggleLoader(true));
      dispatch(getReportData(params));
    });
  };
  const onClickClearFilter = Object(react__WEBPACK_IMPORTED_MODULE_12__["useCallback"])(() => {
    let defaultState = window.initialState;
    Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["batch"])(() => {
      dispatch(setDateRange({
        startDate: defaultState.dateRange.fromDate,
        endDate: defaultState.dateRange.toDate
      }));
      dispatch(setSelectedProduct(defaultState.selectedProduct));
      dispatch(setSelectedCurrency(defaultState.selectedCurrency));
      dispatch(setSelectedPlatform(defaultState.selectedPlatform));
      dispatch(setSelectedStatus(defaultState.selectedStatus));
      dispatch(setSelectedLiveStatus(defaultState.selectedLiveStatus));
      dispatch(setSelectedBaseCurrency(defaultState.selectedBaseCurrency));
      dispatch(setSelectedVipOnly(defaultState.selectedVipOnly));
      dispatch(setSelectedCustomerClass(defaultState.selectedCustomerClass));
      dispatch(setSelectedOddsGroup(defaultState.selectedOddsGroup));
      dispatch(setUsername(''));
      dispatch(setSearchMode(_common_constants_js__WEBPACK_IMPORTED_MODULE_11__["SearchMode"].MatchPrecise));
      dispatch(setGroupInOriginalCurrency(defaultState.isGroupInOriginalCurrency));
      dispatch(setViewCashOutOnly(defaultState.isViewCashOutOnly));
      dispatch(setExcludeTestData(defaultState.isExcludeTestData));
      dispatch(setSelectedGroupByOption(defaultState.selectedGroupByOption));
      dispatch(setSelectedBreakDownByOption(defaultState.selectedBreakDownByOption));
      dispatch(setSubsidiarySearch(false));
      dispatch(setSubsidiaryList(""));
      dispatch(setAppUuid(`${Object(uuid__WEBPACK_IMPORTED_MODULE_13__["v4"])()}`));
    });
  });
  return {
    submit,
    onClickClearFilter
  };
};
/* harmony default export */ __webpack_exports__["default"] = (useFilterAction);

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useFilterHandler.jsx":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useFilterHandler.jsx ***!
  \**********************************************************************************************/
/*! exports provided: useFilterHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFilterHandler", function() { return useFilterHandler; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/index.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");
/* harmony import */ var _common_Service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/Service */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);







const useFilterHandler = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useDispatch"])();
  const {
    defaultSelectedSubsidiary
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const {
    setUsername,
    setSubsidiaryList,
    setSelectedStatus,
    setSelectedProduct,
    getSportList,
    getBetTypeList,
    setSelectedSport,
    setSelectedBettype,
    setDateRange,
    setViewCashOutOnly,
    setSelectedLiveStatus,
    setSelectedCustomerClass,
    setSelectedOddsGroup,
    setSelectedPlatform,
    setSelectedCurrency,
    setSelectedBaseCurrency,
    changeIsConvertAll,
    setSubsidiarySearch,
    setSelectedVipOnly,
    setSearchMode,
    setGroupInOriginalCurrency,
    setExcludeTestData
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_1__["ActionCreators"];
  const onUserNameInputHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(value => dispatch(setUsername(value)), []);
  const onSubsidiaryDropDownChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((currentItem, selectedItemsKey) => dispatch(setSubsidiaryList(selectedItemsKey)), []);
  const onDateRangeChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((date, isValidMonthRange = true) => {
    if (isValidMonthRange) {
      dispatch(setDateRange(date));
    } else {
      const message = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("DateRangeExceedMsg").replace("{0}", _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].dateConstraint.limitedMonthRange);
      alert(message);
    }
  }, []);
  const onStatusChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((currentItem, selectedItemsKey) => dispatch(setSelectedStatus(selectedItemsKey)), []);
  const onLiveStatusChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((currentItem, selectedItemsKey) => dispatch(setSelectedLiveStatus(selectedItemsKey)), []);
  const onProductChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((currentItem, selectedItemsKey) => {
    Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["batch"])(() => {
      dispatch(setSelectedProduct(selectedItemsKey));
      if (!_common_Service__WEBPACK_IMPORTED_MODULE_5__["default"].isContainProductSportBookOrBa(selectedItemsKey)) {
        dispatch(setViewCashOutOnly(false));
      }
      dispatch(getSportList(selectedItemsKey));
      dispatch(getBetTypeList(selectedItemsKey));
    });
  }, []);
  const onSportChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((currentItem, selectedItemsKey) => dispatch(setSelectedSport(selectedItemsKey)), []);
  const onBetTypeChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((currentItem, selectedItemsKey) => dispatch(setSelectedBettype(selectedItemsKey)), []);
  const onRiskLevelChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((currentItem, selectedItemsKey) => {
    const customerClass = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].riskLevelList.filter(r => selectedItemsKey.includes(r.id)).map(r => r.customerClassList).join(',');
    dispatch(setSelectedCustomerClass(customerClass));
  }, []);
  const onOddsGroupChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((currentItem, selectedItemsKey) => dispatch(setSelectedOddsGroup(selectedItemsKey)), []);
  const onPlatformChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((currentItem, selectedItemsKey) => dispatch(setSelectedPlatform(selectedItemsKey)), []);
  const onCurrencyChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])((currentItem, selectedItemsKey) => dispatch(setSelectedCurrency(selectedItemsKey)), []);
  const onBaseCurrencyChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(item => dispatch(setSelectedBaseCurrency(item.value)), []);
  const onConverAllChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(checked => dispatch(changeIsConvertAll(checked)), []);
  const onVipOnlyChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(item => dispatch(setSelectedVipOnly(item.value)), []);
  const onGroupInOriginalCurrencyChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(checked => dispatch(setGroupInOriginalCurrency(checked)), []);
  const onExcludeTextDataChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(checked => dispatch(setExcludeTestData(checked)), []);
  const onCashOutOnlyChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(checked => dispatch(setViewCashOutOnly(checked)), []);
  const onSearchModeChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(event => {
    const {
      value
    } = event.target;
    dispatch(setSearchMode(value));
  }, []);
  const onSubsidiaryCheckBoxChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(checked => {
    dispatch(setSubsidiarySearch(checked));
    checked && dispatch(setSubsidiaryList(defaultSelectedSubsidiary));
  }, []);
  return {
    onUserNameInputHandler,
    onSubsidiaryDropDownChangeHandler,
    onStatusChangeHandler,
    onProductChangeHandler,
    onSportChangeHandler,
    onBetTypeChangeHandler,
    onLiveStatusChangeHandler,
    onDateRangeChangeHandler,
    onRiskLevelChangeHandler,
    onOddsGroupChangeHandler,
    onPlatformChangeHandler,
    onVipOnlyChangeHandler,
    onCurrencyChangeHandler,
    onBaseCurrencyChangeHandler,
    onConverAllChangeHandler,
    onSubsidiaryCheckBoxChangeHandler,
    onSearchModeChangeHandler,
    onGroupInOriginalCurrencyChangeHandler,
    onExcludeTextDataChangeHandler,
    onCashOutOnlyChangeHandler
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useGroupFilterHandler.jsx":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useGroupFilterHandler.jsx ***!
  \***************************************************************************************************/
/*! exports provided: useGroupFilterHandler, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGroupFilterHandler", function() { return useGroupFilterHandler; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/index.js");
/* harmony import */ var _common_Service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/Service */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");





const useGroupFilterHandler = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useDispatch"])();
  const selectedGroupByOption = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useSelector"])(state => state.selectedGroupByOption);
  const {
    setSelectedGroupByOption,
    setSelectedBreakDownByOption,
    setGroupInOriginalCurrency
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_1__["ActionCreators"];
  const _setValueForIsDisplayInOriginalCurrencyFilter = (groupByMode, breakdownByMode) => {
    const currentMapping = _common_constants__WEBPACK_IMPORTED_MODULE_4__["DisplayGroupBreakDownMapping"].find(item => item.groupByMode == groupByMode && item.breakdownMode == breakdownByMode);
    if (!currentMapping.isDisplayBreakDownInCurrency) {
      dispatch(setGroupInOriginalCurrency(currentMapping.isDisplayBreakDownInCurrency));
    }
  };
  const onChangeGroupByOption = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(event => {
    const groupMode = event.target.value;
    const breakDownOption = _common_Service__WEBPACK_IMPORTED_MODULE_2__["default"].buildBreakDownOptionFromGroupByMode(groupMode);
    const firstEnabledSelectBreakDown = breakDownOption.find(item => !item.isDisabled);
    Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["batch"])(() => {
      dispatch(setSelectedGroupByOption(groupMode));
      dispatch(setSelectedBreakDownByOption(firstEnabledSelectBreakDown.value));
    });
    _setValueForIsDisplayInOriginalCurrencyFilter(groupMode, firstEnabledSelectBreakDown.value);
  }, []);
  const onChangeBreakByOption = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(event => {
    const mode = event.target.value;
    dispatch(setSelectedBreakDownByOption(mode));
    _setValueForIsDisplayInOriginalCurrencyFilter(selectedGroupByOption, mode);
  }, [selectedGroupByOption]);
  return {
    onChangeGroupByOption,
    onChangeBreakByOption
  };
};
/* harmony default export */ __webpack_exports__["default"] = (useGroupFilterHandler);

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useIsDisabledGroupInOriginalCurrency.jsx":
/*!******************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useIsDisabledGroupInOriginalCurrency.jsx ***!
  \******************************************************************************************************************/
/*! exports provided: useIsDisabledGroupInOriginalCurrency, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useIsDisabledGroupInOriginalCurrency", function() { return useIsDisabledGroupInOriginalCurrency; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");


const useIsDisabledGroupInOriginalCurrency = () => {
  const [selectedGroupByOption, selectedBreakDownByOption] = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useSelector"])(state => [state.selectedGroupByOption, state.selectedBreakDownByOption], react_redux__WEBPACK_IMPORTED_MODULE_0__["shallowEqual"]);
  const currentMapping = _common_constants__WEBPACK_IMPORTED_MODULE_1__["DisplayGroupBreakDownMapping"].find(item => item.groupByMode == selectedGroupByOption && item.breakdownMode == selectedBreakDownByOption);
  return !currentMapping.isDisplayBreakDownInCurrency;
};
/* harmony default export */ __webpack_exports__["default"] = (useIsDisabledGroupInOriginalCurrency);

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useRenderRowOption.jsx":
/*!************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useRenderRowOption.jsx ***!
  \************************************************************************************************/
/*! exports provided: useRenderRowOption, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRenderRowOption", function() { return useRenderRowOption; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _common_Service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/Service.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var _common_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/constants.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");



const useRenderRowOption = () => {
  const [requestParam, selectedProduct] = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useSelector"])(state => [state.requestParam, state.selectedProduct]);
  const isShowBAField = _common_Service_js__WEBPACK_IMPORTED_MODULE_1__["default"].isContainBAProduct(selectedProduct);
  const isGroupByPlayerMode = requestParam.GroupMode == _common_constants_js__WEBPACK_IMPORTED_MODULE_2__["GroupByMode"].Player;
  const isShowBetEffectiveField = isGroupByPlayerMode;
  const isBreakDownPlayerMode = requestParam.BreakdownMode == _common_constants_js__WEBPACK_IMPORTED_MODULE_2__["BreakdownByMode"].Player;
  return {
    isShowBAField,
    isGroupByPlayerMode,
    isBreakDownPlayerMode,
    isShowBetEffectiveField
  };
};
/* harmony default export */ __webpack_exports__["default"] = (useRenderRowOption);

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useValidParam.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useValidParam.jsx ***!
  \*******************************************************************************************/
/*! exports provided: useValidParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useValidParam", function() { return useValidParam; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

const useValidParam = () => {
  const [selectedProduct, selectedStatus, selectedPlatform, selectedLiveStatus, selectedCurrency, selectedCustomerClass, selectedOddsGroup, selectedBettype, selectedSport] = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useSelector"])(state => [state.selectedProduct, state.selectedStatus, state.selectedPlatform, state.selectedLiveStatus, state.selectedCurrency, state.selectedCustomerClass, state.selectedOddsGroup, state.selectedBettype, state.selectedSport], react_redux__WEBPACK_IMPORTED_MODULE_0__["shallowEqual"]);
  return !!selectedProduct && !!selectedStatus && !!selectedLiveStatus && !!selectedCurrency && !!selectedBettype && !!selectedSport && !!selectedPlatform && !!selectedCustomerClass && !!selectedOddsGroup;
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/index.jsx":
/*!*****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/index.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/index.js */ "./www/js/source/reactpages/pages/winlossanalysis/reducers/index.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");







const defaultState = Object.assign({}, window.initialState, {
  userGuideContent: '',
  requestParam: {
    PageSize: _common_constants__WEBPACK_IMPORTED_MODULE_6__["DefaultPagingOption"].PageSize
  }
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

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileBreakdownRow.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileBreakdownRow.jsx ***!
  \*************************************************************************************************/
/*! exports provided: MobileBreakdownRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileBreakdownRow", function() { return MobileBreakdownRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MobileExpandRowContent */ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileExpandRowContent.jsx");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
/* harmony import */ var _hooks_useRenderRowOption__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/useRenderRowOption */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useRenderRowOption.jsx");
/* harmony import */ var _jsroot_components_mobile_component_CompositeRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/mobile-component/CompositeRow */ "./www/js/source/reactpages/components/mobile-component/CompositeRow.jsx");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7__);








const MobileBreakdownRow = props => {
  const {
    data,
    selectedDisplayTypeId
  } = props;
  const {
    isShowBAField,
    isShowBetEffectiveField,
    isBreakDownPlayerMode
  } = Object(_hooks_useRenderRowOption__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const {
    betCount,
    turnover,
    netTurnover,
    playerWinloss,
    playerComm,
    betEffective,
    licWinloss,
    licComm,
    amtDueToBA,
    margin,
    groupBy,
    breakBy,
    externalId,
    systemId,
    breakDownFieldText
  } = data;
  const expandRows = [];
  expandRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].BetCount,
    value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].format(betCount)
  }));
  expandRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].NetTurnOver,
    value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(netTurnover)
  }));
  {
    isShowBetEffectiveField && expandRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
      text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].EffectiveBettingValue,
      value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(betEffective)
    }));
  }
  expandRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].PlayerComm,
    value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(playerComm)
  }));
  expandRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].LicenseeWL,
    value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(licWinloss),
    valueClass: licWinloss < 0 ? "negative" : ""
  }));
  expandRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].LicenseeComm,
    value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(licComm)
  }));
  {
    isShowBAField && expandRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
      text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].AmountDueToBA,
      value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(amtDueToBA)
    }));
  }
  expandRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].Margin,
    value: `${_jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(margin * 100)}%`,
    valueClass: margin < 0 ? "negative" : ""
  }));
  const idColumnText = selectedDisplayTypeId == _common_constants__WEBPACK_IMPORTED_MODULE_3__["MobileGroupByHeaderDisplayType"].ExternalId ? externalId : systemId;
  const displayColumnName = isBreakDownPlayerMode ? idColumnText : breakDownFieldText;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_mobile_component_CompositeRow__WEBPACK_IMPORTED_MODULE_6__["default"], {
    key: `breakdown-row-${groupBy}-${breakBy}`,
    expandRows: expandRows,
    className: "detail-row parent-row",
    collapaseRowClass: "detail-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7__["Cell"], null, displayColumnName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(turnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(playerWinloss)));
};
const propTypes = {
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  selectedDisplayTypeId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string])
};
const defaultProps = {
  data: []
};
MobileBreakdownRow.propTypes = propTypes;
MobileBreakdownRow.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileBreakdownRow));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileDataGrid.jsx":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileDataGrid.jsx ***!
  \*********************************************************************************************/
/*! exports provided: MobileDataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileDataGrid", function() { return MobileDataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/index.js");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _common_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/constants.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");
/* harmony import */ var _jsroot_components_mobile_component_RefPager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/mobile-component/RefPager */ "./www/js/source/reactpages/components/mobile-component/RefPager.jsx");
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! usehooks-ts */ "./node_modules/usehooks-ts/dist/esm/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
/* harmony import */ var _legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @legion-lib/react-grid */ "./node_modules/@legion-lib/react-grid/dist/index.js");
/* harmony import */ var _legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _jsroot_components_dropdown_DrowdownRadioList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/dropdown/DrowdownRadioList */ "./www/js/source/reactpages/components/dropdown/DrowdownRadioList.jsx");
/* harmony import */ var _MobileGroupByRowList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./MobileGroupByRowList */ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileGroupByRowList.jsx");
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _hooks_useRenderRowOption_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../hooks/useRenderRowOption.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useRenderRowOption.jsx");
/* harmony import */ var _ReportTitleContent_jsx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ReportTitleContent.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/ReportTitleContent.jsx");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
















const VerySmallColumnWidths = [32, 32, 32, 13];
const SmallColumnWidths = [125, 105, 110, 26];
const LargeColumnWidths = ['31%', '31%', '31%', '7%'];
const MobileDataGrid = () => {
  const [requestParam, reportData, reloadReport] = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => [state.requestParam, state.reportData, state.reportTitle, state.reloadReport, state.selectedProduct], react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const [pagerRef, pagerSize] = Object(usehooks_ts__WEBPACK_IMPORTED_MODULE_7__["useElementSize"])();
  const [id, setId] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(`${Object(uuid__WEBPACK_IMPORTED_MODULE_8__["v4"])()}`);
  const [headerDisplayType, setHeaderDisplayType] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_common_constants_js__WEBPACK_IMPORTED_MODULE_5__["MobileGroupByHeaderDisplayType"].ExternalId);
  const {
    setRequestParam,
    toggleLoader,
    getReportData
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    width
  } = Object(usehooks_ts__WEBPACK_IMPORTED_MODULE_7__["useWindowSize"])();
  const {
    data,
    sumTotal,
    totalRow
  } = reportData;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    dispatch(toggleLoader(false));
    setId(`${Object(uuid__WEBPACK_IMPORTED_MODULE_8__["v4"])()}`);
  }, [reportData]);
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
    isBreakDownPlayerMode,
    isGroupByPlayerMode
  } = Object(_hooks_useRenderRowOption_jsx__WEBPACK_IMPORTED_MODULE_14__["default"])();
  const isDisplayHeaderDropdownOption = isBreakDownPlayerMode || isGroupByPlayerMode;
  const dataSource = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => [{
    id: _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["MobileGroupByHeaderDisplayType"].ExternalId,
    text: _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["HeaderText"].ExternalId
  }, {
    id: _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["MobileGroupByHeaderDisplayType"].SystemId,
    text: _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["HeaderText"].SystemId
  }], []);
  const onChangeIdDisplayType = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(event => {
    const {
      value
    } = event.target;
    setHeaderDisplayType(value);
  }, [setHeaderDisplayType]);
  const collumnWidths = width > 500 ? LargeColumnWidths : width > 370 ? SmallColumnWidths : VerySmallColumnWidths;
  const _renderHeader = () => {
    const className = isDisplayHeaderDropdownOption ? 'cell-dropdown' : '';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__["HeaderRow"], {
      key: id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__["HeaderCell"], {
      colWidth: collumnWidths[0],
      className: className
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w100 cell-header-groupby"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["HeaderText"].GroupBy), isDisplayHeaderDropdownOption && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown_DrowdownRadioList__WEBPACK_IMPORTED_MODULE_10__["default"], {
      id: "dropdown-header",
      key: "dropdown-header",
      className: "search-option",
      dataSource: dataSource,
      selectedValue: headerDisplayType,
      onChange: onChangeIdDisplayType,
      keySelector: "id",
      valueSelector: "text"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__["HeaderCell"], {
      colWidth: collumnWidths[1],
      sortBy: _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["SortBy"].Turnover
    }, _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["HeaderText"].TurnOver), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__["HeaderCell"], {
      colWidth: collumnWidths[2],
      sortBy: _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["SortBy"].MemWinloss
    }, _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["HeaderText"].PlayerWL), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__["HeaderCell"], {
      colWidth: collumnWidths[3]
    }));
  };
  const _renderFooter = () => {
    if (!sumTotal) {
      return;
    }
    const {
      turnover,
      playerWinloss
    } = sumTotal;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__["Row"], {
      className: "fixed-table-grant-total"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__["Cell"], {
      colSpan: "2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell-total"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "total-text flex-initial"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_13__["default"].getSingleResource('Total')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex-auto right-align"
    }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_12__["default"].formatDecimal(turnover)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__["Cell"], {
      className: "right-align cell-total-winloss border-r-0"
    }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_12__["default"].formatDecimal(playerWinloss)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__["Cell"], {
      className: "border-l-0"
    }));
  };
  const header = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => _renderHeader(), [isDisplayHeaderDropdownOption, headerDisplayType, onChangeIdDisplayType, id]);
  const body = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileGroupByRowList__WEBPACK_IMPORTED_MODULE_11__["default"], {
    key: id,
    dataList: data,
    selectedDisplayTypeId: headerDisplayType
  }), [data, headerDisplayType, id]);
  const footer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => _renderFooter(), [sumTotal]);
  const currenPagingOption = {
    PageIndex: requestParam.PageIndex,
    PageSize: requestParam.PageSize,
    TotalItem: totalRow,
    PageList: _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["DefaultPagingOption"].PageList
  };
  const submitRequest = params => {
    dispatch(setRequestParam(params));
    dispatch(toggleLoader(true));
    dispatch(getReportData(params));
  };
  const onSort = (sortBy, sortOrder) => {
    const requestSortOrder = sortOrder == "asc" ? _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["SortOrder"].ASC : _common_constants_js__WEBPACK_IMPORTED_MODULE_5__["SortOrder"].DESC;
    const params = _objectSpread(_objectSpread({}, requestParam), {}, {
      SortBy: sortBy,
      SortOrder: requestSortOrder
    });
    submitRequest(params);
  };
  const onPaging = (pageIndex, pageSize) => {
    const params = _objectSpread(_objectSpread({}, requestParam), {}, {
      PageSize: pageSize,
      PageIndex: pageIndex
    });
    submitRequest(params);
  };
  if (!data) {
    return null;
  }
  if (!data.length) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  }
  const isShowPagingInfo = pagerSize.width > 400;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mobile-table result-content",
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_4__["default"], {
    content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReportTitleContent_jsx__WEBPACK_IMPORTED_MODULE_15__["default"], null),
    tag: "div"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_grid__WEBPACK_IMPORTED_MODULE_9__["Table"], {
    key: `table-winloss-analysis-${requestParam.SubmitTime}`,
    autoWidth: true,
    autoHeight: false,
    header: header,
    body: body,
    footer: footer,
    isPaging: false,
    pageOption: currenPagingOption,
    shouldResetScrollPosition: reloadReport,
    bodyHeight: "100%",
    containerPadding: 2,
    isIncludeScrollWidth: false,
    onSort: onSort
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_mobile_component_RefPager__WEBPACK_IMPORTED_MODULE_6__["RefPager"], {
    ref: pagerRef,
    onPaging: onPaging,
    pageOption: currenPagingOption,
    isShowPagingInfo: isShowPagingInfo
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileDataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileExpandRowContent.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileExpandRowContent.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: MobileExpandRowContent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileExpandRowContent", function() { return MobileExpandRowContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_2__);



const MobileExpandRowContent = props => {
  const {
    text,
    value,
    className,
    valueClass
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_2__["Cell"], {
    className: className,
    colSpan: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex detail-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text w100"
  }, text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: `w100 right-align ${valueClass}`
  }, value)));
};
const propTypes = {
  text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  valueClass: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
const defaultProps = {
  className: '',
  valueClass: ''
};
MobileExpandRowContent.propTypes = propTypes;
MobileExpandRowContent.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileExpandRowContent));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileFormFilter.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileFormFilter.jsx ***!
  \***********************************************************************************************/
/*! exports provided: MobileFormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileFormFilter", function() { return MobileFormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _MobileMainFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MobileMainFilter */ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileMainFilter.jsx");
/* harmony import */ var _MobileGroupByFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MobileGroupByFilter */ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileGroupByFilter.jsx");




const MobileFormFilter = () => {
  const [isCollapsed, setIsCollapsed] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const onCollapse = () => {
    setIsCollapsed(true);
  };
  const onExpand = () => {
    setIsCollapsed(false);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "mobile-mode aggregate-filter",
    onCollapse: onCollapse,
    onExpand: onExpand,
    isInitCollapsed: true,
    isCustomCollapse: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileMainFilter__WEBPACK_IMPORTED_MODULE_2__["default"], {
    isCollapsed: isCollapsed
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileGroupByFilter__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isCollapsed: isCollapsed
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileFormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileGroupByFilter.jsx":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileGroupByFilter.jsx ***!
  \**************************************************************************************************/
/*! exports provided: MobileGroupByFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileGroupByFilter", function() { return MobileGroupByFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _hooks_useValidParam__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useValidParam */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useValidParam.jsx");
/* harmony import */ var _hooks_useFilterAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useFilterAction */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useFilterAction.jsx");
/* harmony import */ var _filters_GroupByOptionsFilter_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../filters/GroupByOptionsFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/GroupByOptionsFilter.jsx");
/* harmony import */ var _filters_BreakDownOptionFilter_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../filters/BreakDownOptionFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/BreakDownOptionFilter.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _filters_StickyIcon_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../filters/StickyIcon.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/StickyIcon.jsx");









const MobileGroupByFilter = props => {
  const {
    isCollapsed
  } = props;
  const isValidModel = Object(_hooks_useValidParam__WEBPACK_IMPORTED_MODULE_3__["useValidParam"])();
  const {
    submit,
    onClickClearFilter
  } = Object(_hooks_useFilterAction__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const collapsedStyle = isCollapsed ? {
    display: "none"
  } : {};
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "page-filter",
    isCollapseMode: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row flex w100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w100",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_GroupByOptionsFilter_jsx__WEBPACK_IMPORTED_MODULE_5__["GroupByOptionFilter"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BreakDownOptionFilter_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-center w100 flex-wrap"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group flex-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    disabled: !isValidModel,
    className: "btn btn-submit",
    onClick: submit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("Submit")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn btn-outline-secondary",
    onClick: onClickClearFilter
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("ClearAllFilters")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-initial"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_StickyIcon_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], null)))));
};
const propTypes = {
  isCollapsed: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool
};
const defaultProps = {
  isCollapsed: true
};
MobileGroupByFilter.propTypes = propTypes;
MobileGroupByFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileGroupByFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileGroupByRow.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileGroupByRow.jsx ***!
  \***********************************************************************************************/
/*! exports provided: MobileGroupByRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileGroupByRow", function() { return MobileGroupByRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MobileExpandRowContent */ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileExpandRowContent.jsx");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
/* harmony import */ var _hooks_useRenderRowOption__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/useRenderRowOption */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useRenderRowOption.jsx");
/* harmony import */ var _components_mobile_component_CompositeRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/mobile-component/CompositeRow */ "./www/js/source/reactpages/components/mobile-component/CompositeRow.jsx");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _MobileBreakdownRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MobileBreakdownRow */ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileBreakdownRow.jsx");









const MobileGroupByRow = props => {
  const {
    data,
    selectedDisplayTypeId
  } = props;
  const {
    isShowBAField,
    isShowBetEffectiveField,
    isGroupByPlayerMode
  } = Object(_hooks_useRenderRowOption__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const [isBreakdown, setIsBreakdown] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [collapseRef, setCollapseRef] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const parentData = data.keyItem;
  const children = data.children;
  const {
    groupByFieldText,
    betCount,
    turnover,
    netTurnover,
    playerWinloss,
    playerComm,
    betEffective,
    licWinloss,
    licComm,
    amtDueToBA,
    margin,
    externalId,
    systemId
  } = parentData;
  const _onCollapsed = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    setIsBreakdown(false);
  }, []);
  const _onExpanded = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    setIsBreakdown(true);
  }, []);
  const _getDetailRows = () => {
    const detailRows = [];
    detailRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
      text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].BetCount,
      value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].format(betCount)
    }));
    detailRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
      text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].NetTurnOver,
      value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(netTurnover)
    }));
    {
      isShowBetEffectiveField && detailRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
        text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].EffectiveBettingValue,
        value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(betEffective)
      }));
    }
    detailRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
      text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].PlayerComm,
      value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(playerComm)
    }));
    detailRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
      text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].LicenseeWL,
      value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(licWinloss),
      valueClass: licWinloss < 0 ? "negative" : ""
    }));
    detailRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
      text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].LicenseeComm,
      value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(licComm)
    }));
    {
      isShowBAField && detailRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
        text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].AmountDueToBA,
        value: _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(amtDueToBA)
      }));
    }
    detailRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileExpandRowContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
      text: _common_constants__WEBPACK_IMPORTED_MODULE_3__["HeaderText"].Margin,
      value: `${_jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(margin * 100)}%`,
      valueClass: margin < 0 ? "negative" : ""
    }));
    return detailRows;
  };
  const detailRows = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => _getDetailRows(), [parentData, isShowBetEffectiveField, isShowBAField]);
  const breakDownRowList = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => children.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileBreakdownRow__WEBPACK_IMPORTED_MODULE_8__["default"], {
    key: `${item.groupBy}-${item.breakBy}`,
    data: item,
    selectedDisplayTypeId: selectedDisplayTypeId
  })), [children, selectedDisplayTypeId]);
  const idColumnText = selectedDisplayTypeId == _common_constants__WEBPACK_IMPORTED_MODULE_3__["MobileGroupByHeaderDisplayType"].ExternalId ? externalId : systemId;
  const displayColumnName = isGroupByPlayerMode ? idColumnText : groupByFieldText;
  const arrowClass = isBreakdown ? 'down-arrow' : 'right-arrow';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_mobile_component_CompositeRow__WEBPACK_IMPORTED_MODULE_6__["default"], {
    expandRows: breakDownRowList,
    isUseCustomHoverRow: true,
    isUseCustomCollapseCell: true,
    refCollapseObject: collapseRef,
    isUseCumtomCollapseRow: true,
    onCollapsed: _onCollapsed,
    onExpanded: _onExpanded
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_mobile_component_CompositeRow__WEBPACK_IMPORTED_MODULE_6__["default"], {
    expandRows: detailRows,
    collapaseRowClass: "main-collapse-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
    className: "left-align"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: setCollapseRef,
    className: "flex w100 flex-center",
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "w100 main-text",
    title: displayColumnName
  }, displayColumnName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: `arrow-icon ${arrowClass}`
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(turnover)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatDecimal(playerWinloss))));
};
const propTypes = {
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  groupByFieldName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  selectedDisplayTypeId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string])
};
const defaultProps = {
  groupByFieldName: 'breakDownFieldText'
};
MobileGroupByRow.propTypes = propTypes;
MobileGroupByRow.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileGroupByRow));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileGroupByRowList.jsx":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileGroupByRowList.jsx ***!
  \***************************************************************************************************/
/*! exports provided: MobileGroupByRowList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileGroupByRowList", function() { return MobileGroupByRowList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MobileGroupByRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MobileGroupByRow */ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileGroupByRow.jsx");



const MobileGroupByRowList = props => {
  const {
    dataList,
    selectedDisplayTypeId
  } = props;
  return dataList.map(item => {
    const parentData = item.keyItem;
    const {
      rowIndex,
      groupBy
    } = parentData;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileGroupByRow__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: `row-${rowIndex}-${groupBy}`,
      data: item,
      selectedDisplayTypeId: selectedDisplayTypeId
    });
  });
};
const propTypes = {
  dataList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  selectedDisplayTypeId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number])
};
MobileGroupByRowList.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileGroupByRowList));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileMainFilter.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/mobile/MobileMainFilter.jsx ***!
  \***********************************************************************************************/
/*! exports provided: MobileMainFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileMainFilter", function() { return MobileMainFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_customHooks_useBaseCurrencyForMultiSelectCurrency__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency */ "./www/js/source/reactpages/customHooks/useBaseCurrencyForMultiSelectCurrency.jsx");
/* harmony import */ var _hooks_useFilterHandler_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks/useFilterHandler.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useFilterHandler.jsx");
/* harmony import */ var _hooks_useIsDisabledGroupInOriginalCurrency_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../hooks/useIsDisabledGroupInOriginalCurrency.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/hooks/useIsDisabledGroupInOriginalCurrency.jsx");
/* harmony import */ var _filters_SubsidiaryDropDownFilter_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../filters/SubsidiaryDropDownFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SubsidiaryDropDownFilter.jsx");
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");
/* harmony import */ var _filters_DateRangeFilter_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../filters/DateRangeFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/DateRangeFilter.jsx");
/* harmony import */ var _common_Service_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common/Service.js */ "./www/js/source/reactpages/pages/winlossanalysis/common/Service.js");
/* harmony import */ var _filters_ProductFilter_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../filters/ProductFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/ProductFilter.jsx");
/* harmony import */ var _filters_SportFilter_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../filters/SportFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SportFilter.jsx");
/* harmony import */ var _filters_BetTypeFilter_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../filters/BetTypeFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/BetTypeFilter.jsx");
/* harmony import */ var _filters_PlatformFilter_jsx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../filters/PlatformFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/PlatformFilter.jsx");
/* harmony import */ var _filters_StatusFilter_jsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../filters/StatusFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/StatusFilter.jsx");
/* harmony import */ var _filters_LiveStatusFilter_jsx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../filters/LiveStatusFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/LiveStatusFilter.jsx");
/* harmony import */ var _filters_BaseCurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../filters/BaseCurrencyFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/BaseCurrencyFilter.jsx");
/* harmony import */ var _filters_VipOnlyFilter_jsx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../filters/VipOnlyFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/VipOnlyFilter.jsx");
/* harmony import */ var _filters_RiskLevelFilter_jsx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../filters/RiskLevelFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/RiskLevelFilter.jsx");
/* harmony import */ var _filters_OddsGroupFilter_jsx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../filters/OddsGroupFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/OddsGroupFilter.jsx");
/* harmony import */ var _filters_UserNameFilter_jsx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../filters/UserNameFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/UserNameFilter.jsx");
/* harmony import */ var _filters_GroupInOriginalCurrencyCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../filters/GroupInOriginalCurrencyCheckBoxFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/GroupInOriginalCurrencyCheckBoxFilter.jsx");
/* harmony import */ var _filters_ExcludeTestDataCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../filters/ExcludeTestDataCheckBoxFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/ExcludeTestDataCheckBoxFilter.jsx");
/* harmony import */ var _filters_ViewCashOutOnlyFilter_jsx__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../filters/ViewCashOutOnlyFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/ViewCashOutOnlyFilter.jsx");
/* harmony import */ var _filters_SubsidiaryCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../filters/SubsidiaryCheckBoxFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/SubsidiaryCheckBoxFilter.jsx");
/* harmony import */ var _filters_CurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../filters/CurrencyFilter.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/filters/CurrencyFilter.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_28__);





























const MobileMainFilter = props => {
  const {
    isCollapsed
  } = props;
  const {
    appUuid,
    dateRange,
    selectedProduct,
    selectedSport,
    sportList,
    selectedBettype,
    bettypeList,
    selectedPlatform,
    selectedStatus,
    selectedLiveStatus,
    selectedBaseCurrency,
    selectedVipOnly,
    selectedCustomerClass,
    selectedOddsGroup,
    searchMode,
    isGroupInOriginalCurrency,
    isExcludeTestData,
    isViewCashOutOnly,
    selectedCurrency
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state, react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const {
    isShowSubsidiaryDropdown,
    isSubsidiarySearch,
    isShowSubsidiarySearchCheckBox
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_9__["default"])();
  const {
    baseCurrencyList,
    selectedBaseCurrency: newBaseCurrency
  } = Object(_jsroot_customHooks_useBaseCurrencyForMultiSelectCurrency__WEBPACK_IMPORTED_MODULE_5__["default"])(selectedBaseCurrency);
  const {
    onSubsidiaryDropDownChangeHandler,
    onDateRangeChangeHandler,
    onProductChangeHandler,
    onSportChangeHandler,
    onBetTypeChangeHandler,
    onPlatformChangeHandler,
    onStatusChangeHandler,
    onLiveStatusChangeHandler,
    onBaseCurrencyChangeHandler,
    onVipOnlyChangeHandler,
    onRiskLevelChangeHandler,
    onOddsGroupChangeHandler,
    onSearchModeChangeHandler,
    onUserNameInputHandler,
    onGroupInOriginalCurrencyChangeHandler,
    onExcludeTextDataChangeHandler,
    onCashOutOnlyChangeHandler,
    onSubsidiaryCheckBoxChangeHandler,
    onCurrencyChangeHandler
  } = Object(_hooks_useFilterHandler_jsx__WEBPACK_IMPORTED_MODULE_6__["useFilterHandler"])();
  const {
    isOfferCashOutProduct,
    isHasPermissionViewVip
  } = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__["default"];
  const isEnableCashOutFilter = _common_Service_js__WEBPACK_IMPORTED_MODULE_11__["default"].isContainProductSportBookOrBa(selectedProduct);
  const isDisabledGroupInOriginalCurrency = Object(_hooks_useIsDisabledGroupInOriginalCurrency_jsx__WEBPACK_IMPORTED_MODULE_7__["default"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    onProductChangeHandler(null, selectedProduct);
  }, [appUuid]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    onBaseCurrencyChangeHandler({
      value: newBaseCurrency
    });
  }, [newBaseCurrency]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    onSubsidiaryCheckBoxChangeHandler(!isShowSubsidiarySearchCheckBox && isShowSubsidiaryDropdown);
  }, []);
  const collapsedStyle = isCollapsed ? {
    display: "none"
  } : {};
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "page-filter",
    isCollapseMode: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_2__["ToastContainer"], {
    autoClose: 10000,
    pauseOnFocusLoss: false,
    style: {
      width: "500px"
    },
    transition: react_toastify__WEBPACK_IMPORTED_MODULE_2__["Flip"]
  }), isShowSubsidiaryDropdown && isSubsidiarySearch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SubsidiaryDropDownFilter_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
    key: `subsidiary-${appUuid}`,
    onChange: onSubsidiaryDropDownChangeHandler
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_DateRangeFilter_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
    key: `date-${appUuid}`,
    onChange: onDateRangeChangeHandler,
    dateRange: dateRange,
    isMobile: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ProductFilter_jsx__WEBPACK_IMPORTED_MODULE_12__["default"], {
    key: `product-${appUuid}`,
    onChange: onProductChangeHandler,
    isValid: !!selectedProduct,
    value: selectedProduct
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SportFilter_jsx__WEBPACK_IMPORTED_MODULE_13__["default"], {
    key: `sport-${appUuid}`,
    onChange: onSportChangeHandler,
    isValid: !!selectedSport,
    dataSource: sportList
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BetTypeFilter_jsx__WEBPACK_IMPORTED_MODULE_14__["default"], {
    key: `bettype-${appUuid}`,
    onChange: onBetTypeChangeHandler,
    isValid: !!selectedBettype,
    dataSource: bettypeList
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_PlatformFilter_jsx__WEBPACK_IMPORTED_MODULE_15__["default"], {
    key: `platform-${appUuid}`,
    onChange: onPlatformChangeHandler,
    isValid: !!selectedPlatform
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_StatusFilter_jsx__WEBPACK_IMPORTED_MODULE_16__["default"], {
    key: `status-${appUuid}`,
    onChange: onStatusChangeHandler,
    isValid: !!selectedStatus
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_LiveStatusFilter_jsx__WEBPACK_IMPORTED_MODULE_17__["default"], {
    key: `live-status-${appUuid}`,
    onChange: onLiveStatusChangeHandler,
    isValid: !!selectedLiveStatus
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_CurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_27__["default"], {
    key: `currency-${appUuid}`,
    isValid: !!selectedCurrency,
    onChange: onCurrencyChangeHandler
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BaseCurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_18__["default"], {
    key: `base-currency-${appUuid}`,
    onChange: onBaseCurrencyChangeHandler,
    options: baseCurrencyList,
    value: selectedBaseCurrency
  })), isHasPermissionViewVip && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_VipOnlyFilter_jsx__WEBPACK_IMPORTED_MODULE_19__["default"], {
    key: `vip-only-${appUuid}`,
    onChange: onVipOnlyChangeHandler,
    value: selectedVipOnly
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_RiskLevelFilter_jsx__WEBPACK_IMPORTED_MODULE_20__["default"], {
    key: `risk-level-${appUuid}`,
    onChange: onRiskLevelChangeHandler,
    isValid: !!selectedCustomerClass
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_OddsGroupFilter_jsx__WEBPACK_IMPORTED_MODULE_21__["default"], {
    key: `odds-group-${appUuid}`,
    onChange: onOddsGroupChangeHandler,
    isValid: !!selectedOddsGroup
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_UserNameFilter_jsx__WEBPACK_IMPORTED_MODULE_22__["default"], {
    key: `username-${appUuid}`,
    onChangeSearchMode: onSearchModeChangeHandler,
    onChangeUserName: onUserNameInputHandler,
    searchMode: searchMode
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-12 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_GroupInOriginalCurrencyCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_23__["default"], {
    disabled: isDisabledGroupInOriginalCurrency,
    checked: isGroupInOriginalCurrency,
    onChange: onGroupInOriginalCurrencyChangeHandler
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ExcludeTestDataCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_24__["default"], {
    checked: isExcludeTestData,
    onChange: onExcludeTextDataChangeHandler
  })), isOfferCashOutProduct && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ViewCashOutOnlyFilter_jsx__WEBPACK_IMPORTED_MODULE_25__["default"], {
    onChange: onCashOutOnlyChangeHandler,
    disabled: !isEnableCashOutFilter,
    checked: isViewCashOutOnly
  })), isShowSubsidiarySearchCheckBox && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6 col-md-3",
    style: collapsedStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SubsidiaryCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_26__["default"], {
    value: isSubsidiarySearch,
    onChange: onSubsidiaryCheckBoxChangeHandler
  }))));
};
const propTypes = {
  isCollapsed: prop_types__WEBPACK_IMPORTED_MODULE_28___default.a.bool
};
const defaultProps = {
  isCollapsed: true
};
MobileMainFilter.propTypes = propTypes;
MobileMainFilter.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileMainFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/components/mobile/ReportTitleContent.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/components/mobile/ReportTitleContent.jsx ***!
  \*************************************************************************************************/
/*! exports provided: ReportTitleContent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportTitleContent", function() { return ReportTitleContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ExcelPopUp_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ExcelPopUp.jsx */ "./www/js/source/reactpages/pages/winlossanalysis/components/ExcelPopUp.jsx");
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! usehooks-ts */ "./node_modules/usehooks-ts/dist/esm/index.js");
/* harmony import */ var _jsroot_components_Overlay_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/Overlay.jsx */ "./www/js/source/reactpages/components/Overlay.jsx");





const ReportTitleContent = () => {
  const reportTitle = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.reportTitle);
  const [isShowTooltipIcon, setIsShowTooltipIcon] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [isShowTooltip, setIsShowTooltip] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [setRef, {
    width
  }] = Object(usehooks_ts__WEBPACK_IMPORTED_MODULE_3__["useElementSize"])();
  const titleRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var _titleRef$current;
    if (width < ((_titleRef$current = titleRef.current) === null || _titleRef$current === void 0 ? void 0 : _titleRef$current.scrollWidth)) {
      setIsShowTooltipIcon(true);
    } else {
      setIsShowTooltipIcon(false);
    }
  }, [width]);
  const _onClick = () => {
    setIsShowTooltip(!isShowTooltip);
  };
  const _setRef = elem => {
    titleRef.current = elem;
    setRef(elem);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex w100 flex-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    ref: _setRef,
    className: "flex-auto report-title-text"
  }, reportTitle), isShowTooltipIcon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "icon icon-lap-notification flex-initial",
    onClick: _onClick
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Overlay_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isOpening: isShowTooltip
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "overlay-title"
  }, reportTitle))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ExcelPopUp_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};
/* harmony default export */ __webpack_exports__["default"] = (ReportTitleContent);

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/reducers/bettypeReducer.js":
/*!***********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/reducers/bettypeReducer.js ***!
  \***********************************************************************************/
/*! exports provided: selectedBettype, bettypeList, originalBetTypeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedBettype", function() { return selectedBettype; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bettypeList", function() { return bettypeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "originalBetTypeList", function() { return originalBetTypeList; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/winlossanalysis/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedBettype = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_BETTYPE"]](state, action) {
    return action.data;
  }
});
const bettypeList = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_BETTYPE_LIST"]](state, action) {
    return action.data;
  }
});
const originalBetTypeList = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_ORIGINAL_BETTYPE_LIST"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/reducers/dataReducer.js":
/*!********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/reducers/dataReducer.js ***!
  \********************************************************************************/
/*! exports provided: reportData, reloadReport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportData", function() { return reportData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reloadReport", function() { return reloadReport; });
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/pages/winlossanalysis/actions/types.js");
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

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/reducers/filterReducer.js":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/reducers/filterReducer.js ***!
  \**********************************************************************************/
/*! exports provided: selectedVipOnly, isGroupInOriginalCurrency, isExcludeTestData, isViewCashOutOnly, selectedGroupByOption, selectedBreakDownByOption, selectedOddsGroup, appUuid, searchMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedVipOnly", function() { return selectedVipOnly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGroupInOriginalCurrency", function() { return isGroupInOriginalCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isExcludeTestData", function() { return isExcludeTestData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewCashOutOnly", function() { return isViewCashOutOnly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedGroupByOption", function() { return selectedGroupByOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedBreakDownByOption", function() { return selectedBreakDownByOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedOddsGroup", function() { return selectedOddsGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appUuid", function() { return appUuid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchMode", function() { return searchMode; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/winlossanalysis/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/constants */ "./www/js/source/reactpages/pages/winlossanalysis/common/constants.js");



const selectedVipOnly = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_VIPONLY"]](state, action) {
    return action.data;
  }
});
const isGroupInOriginalCurrency = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(true, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_GROUP_IN_ORIGINAL_CURRENCY"]](state, action) {
    return action.data;
  }
});
const isExcludeTestData = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(true, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_EXCLUDE_TEST_DATA"]](state, action) {
    return action.data;
  }
});
const isViewCashOutOnly = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(false, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_VIEW_CASH_OUNT_ONLY"]](state, action) {
    return action.data;
  }
});
const selectedGroupByOption = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_common_constants__WEBPACK_IMPORTED_MODULE_2__["GroupByMode"].Player, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_GROUPBYOPTION"]](state, action) {
    return action.data;
  }
});
const selectedBreakDownByOption = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_common_constants__WEBPACK_IMPORTED_MODULE_2__["BreakdownByMode"].Product, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_BREAKBYOPTION"]](state, action) {
    return action.data;
  }
});
const selectedOddsGroup = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_ODDSGROUP"]](state, action) {
    return action.data;
  }
});
const appUuid = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])("", {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_APP_UUID"]](state, action) {
    return action.data;
  }
});
const searchMode = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_common_constants__WEBPACK_IMPORTED_MODULE_2__["SearchMode"].MatchPrecise, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SEARCH_MODE"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/reducers/index.js":
/*!**************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/reducers/index.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_gridDataReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/gridDataReducer.js */ "./www/js/source/reactpages/reducers/gridDataReducer.js");
/* harmony import */ var _jsroot_reducers_productReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/reducers/productReducer */ "./www/js/source/reactpages/reducers/productReducer.js");
/* harmony import */ var _jsroot_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/reducers/currencyReducer */ "./www/js/source/reactpages/reducers/currencyReducer.js");
/* harmony import */ var _jsroot_reducers_baseCurrencyReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/reducers/baseCurrencyReducer */ "./www/js/source/reactpages/reducers/baseCurrencyReducer.js");
/* harmony import */ var _jsroot_reducers_statusReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/reducers/statusReducer */ "./www/js/source/reactpages/reducers/statusReducer.js");
/* harmony import */ var _jsroot_reducers_liveStatusReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/reducers/liveStatusReducer */ "./www/js/source/reactpages/reducers/liveStatusReducer.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _jsroot_reducers_dateRangeReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/reducers/dateRangeReducer */ "./www/js/source/reactpages/reducers/dateRangeReducer.js");
/* harmony import */ var _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/reducers/requestParamReducer */ "./www/js/source/reactpages/reducers/requestParamReducer.js");
/* harmony import */ var _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/reducers/reportTitleReducer */ "./www/js/source/reactpages/reducers/reportTitleReducer.js");
/* harmony import */ var _sportReducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sportReducer */ "./www/js/source/reactpages/pages/winlossanalysis/reducers/sportReducer.js");
/* harmony import */ var _bettypeReducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./bettypeReducer */ "./www/js/source/reactpages/pages/winlossanalysis/reducers/bettypeReducer.js");
/* harmony import */ var _jsroot_reducers_usernameReducer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/reducers/usernameReducer */ "./www/js/source/reactpages/reducers/usernameReducer.js");
/* harmony import */ var _jsroot_reducers_convertAllReducer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/reducers/convertAllReducer */ "./www/js/source/reactpages/reducers/convertAllReducer.js");
/* harmony import */ var _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @jsroot/reducers/userGuideReducer */ "./www/js/source/reactpages/reducers/userGuideReducer.js");
/* harmony import */ var _jsroot_reducers_subsidiaryReducer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @jsroot/reducers/subsidiaryReducer */ "./www/js/source/reactpages/reducers/subsidiaryReducer.js");
/* harmony import */ var _jsroot_reducers_platformReducer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @jsroot/reducers/platformReducer */ "./www/js/source/reactpages/reducers/platformReducer.js");
/* harmony import */ var _jsroot_reducers_customerClassReducer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @jsroot/reducers/customerClassReducer */ "./www/js/source/reactpages/reducers/customerClassReducer.js");
/* harmony import */ var _filterReducer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./filterReducer */ "./www/js/source/reactpages/pages/winlossanalysis/reducers/filterReducer.js");
/* harmony import */ var _dataReducer__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./dataReducer */ "./www/js/source/reactpages/pages/winlossanalysis/reducers/dataReducer.js");





















/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_jsroot_reducers_gridDataReducer_js__WEBPACK_IMPORTED_MODULE_1__, _jsroot_reducers_productReducer__WEBPACK_IMPORTED_MODULE_2__, _jsroot_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_3__, _jsroot_reducers_baseCurrencyReducer__WEBPACK_IMPORTED_MODULE_4__, _jsroot_reducers_statusReducer__WEBPACK_IMPORTED_MODULE_5__, _jsroot_reducers_liveStatusReducer__WEBPACK_IMPORTED_MODULE_6__, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_7__, _jsroot_reducers_dateRangeReducer__WEBPACK_IMPORTED_MODULE_8__, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_9__, _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_10__, _sportReducer__WEBPACK_IMPORTED_MODULE_11__, _bettypeReducer__WEBPACK_IMPORTED_MODULE_12__, _jsroot_reducers_usernameReducer__WEBPACK_IMPORTED_MODULE_13__, _jsroot_reducers_convertAllReducer__WEBPACK_IMPORTED_MODULE_14__, _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_15__, _jsroot_reducers_subsidiaryReducer__WEBPACK_IMPORTED_MODULE_16__, _jsroot_reducers_platformReducer__WEBPACK_IMPORTED_MODULE_17__, _filterReducer__WEBPACK_IMPORTED_MODULE_19__, _jsroot_reducers_customerClassReducer__WEBPACK_IMPORTED_MODULE_18__, _dataReducer__WEBPACK_IMPORTED_MODULE_20__)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/winlossanalysis/reducers/sportReducer.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/winlossanalysis/reducers/sportReducer.js ***!
  \*********************************************************************************/
/*! exports provided: selectedSport, sportList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedSport", function() { return selectedSport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sportList", function() { return sportList; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/winlossanalysis/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedSport = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_SPORT"]](state, action) {
    return action.data;
  }
});
const sportList = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SPORT_LIST"]](state, action) {
    return action.data;
  }
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

/***/ "./www/js/source/reactpages/reducers/customerClassReducer.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/customerClassReducer.js ***!
  \*******************************************************************/
/*! exports provided: selectedCustomerClass, selectedRiskLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedCustomerClass", function() { return selectedCustomerClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedRiskLevel", function() { return selectedRiskLevel; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedCustomerClass = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_CUSTOMERCLASS"]](state, action) {
    return action.data;
  }
});
const selectedRiskLevel = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_RISKLEVEL"]](state, action) {
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

/***/ "./www/js/source/reactpages/reducers/liveStatusReducer.js":
/*!****************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/liveStatusReducer.js ***!
  \****************************************************************/
/*! exports provided: selectedLiveStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedLiveStatus", function() { return selectedLiveStatus; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedLiveStatus = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_LIVESTATUS"]](state, action) {
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

/***/ "./www/js/source/reactpages/reducers/platformReducer.js":
/*!**************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/platformReducer.js ***!
  \**************************************************************/
/*! exports provided: selectedPlatform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedPlatform", function() { return selectedPlatform; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedPlatform = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_PLATFORM"]](state, action) {
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


const selectedStatus = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_STATUS"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/reducers/subsidiaryReducer.js":
/*!****************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/subsidiaryReducer.js ***!
  \****************************************************************/
/*! exports provided: selectedSubsidiary, subsidiarySearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedSubsidiary", function() { return selectedSubsidiary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subsidiarySearch", function() { return subsidiarySearch; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");


const selectedSubsidiary = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["SET_SUBSIDIARY_LIST"]](prevState, action) {
    return action.data;
  }
});
const subsidiarySearch = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["SET_SUBSIDIARY_SEARCH"]](prevState, action) {
    return action.data;
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

/***/ })

/******/ });
//# sourceMappingURL=winlossanalysis.chunk.js.map