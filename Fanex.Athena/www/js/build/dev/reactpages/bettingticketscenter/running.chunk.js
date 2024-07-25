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
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/bettingticketscenter/running/components/index.jsx","lib/common"]);
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
      data
    } = this.props;
    let rows = [];
    const timestamp = new Date().getTime();
    for (let i = 0; i < data.length; i++) {
      const item = this._mapData(data[i]);
      let cells = [];
      for (let j = 0; j < columns.length; j++) {
        const column = columns[j];
        let hasTooltip = columnAlignments[j].indexOf('tooltip') !== -1;
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
_defineProperty(Service, "getSelectedBettype", seletedBetTypeIds => {
  if (seletedBetTypeIds === 0 || seletedBetTypeIds === _constants__WEBPACK_IMPORTED_MODULE_2__["ALL_SELECTED_TEXT"]) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["ALL_SELECTED_TEXT"];
  }
  var bettypeList = seletedBetTypeIds.split(",").map(elem => {
    return elem.substring(0, elem.indexOf("_"));
  });
  return bettypeList.toString();
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js ***!
  \*************************************************************************************/
/*! exports provided: ApiUrl, HeaderText, DefaultPageSize, tabKeys, tabList, ALL_SELECTED_TEXT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiUrl", function() { return ApiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderText", function() { return HeaderText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultPageSize", function() { return DefaultPageSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabKeys", function() { return tabKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabList", function() { return tabList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_SELECTED_TEXT", function() { return ALL_SELECTED_TEXT; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");


const ApiUrl = {
  CUSTOMER_SEARCH_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl("SearchCustomerAPI/SearchCustomer"),
  RUNNING_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenter/GetByRunning'),
  REFNO_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenter/GetByRefNo'),
  SINGLECUSTOMER_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenter/GetBySingleCustomer'),
  ADVANCEDSEARCH_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenterAdvancedSearch/GetData'),
  BOOKEDBET_DATA_URL: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('api/BettingTicketCenter/GetByBookedBet')
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

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/bettypeAction.js":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/actions/bettypeAction.js ***!
  \**********************************************************************************************/
/*! exports provided: setSelectedBettype, setBettypeList, setOrginalBetTypeList, getBetTypeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedBettype", function() { return setSelectedBettype; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBettypeList", function() { return setBettypeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOrginalBetTypeList", function() { return setOrginalBetTypeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBetTypeList", function() { return getBetTypeList; });
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _common_lib_Service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../common/lib/Service */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/Cache */ "./www/js/source/reactpages/lib/Cache.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");






const BETTYPE_CACHE_KEY = "BTC_SINGLEPLAYER_BETTYPE_CACHE_KEY";
const Url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].resolveClientUrl('api/CommonDataApi/GetBetTypeInTreeList');
let currentCancellationTokenSource = null;
const dispatchBettypeList = (dispatch, data) => {
  const selectedSports = _common_lib_Service__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedItemFromTreeListItem(data);
  dispatch(setBettypeList(data));
  dispatch(setSelectedBettype(selectedSports));
};
const setSelectedBettype = betTypeIds => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_5__["SET_SELECTED_BETTYPE"],
    data: betTypeIds
  };
};
const setBettypeList = list => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_5__["SET_BETTYPE_LIST"],
    data: list
  };
};
const setOrginalBetTypeList = list => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_5__["SET_ORIGINAL_BETTYPE_LIST"],
    data: list
  };
};
const getBetTypeList = productCodes => {
  const cacheKey = BETTYPE_CACHE_KEY + productCodes + _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__["default"].licenseeName;
  return async dispatch => {
    var cacheData = _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_3__["default"].get(cacheKey);
    if (cacheData) {
      dispatchBettypeList(dispatch, [...cacheData]);
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
      _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_3__["default"].set(cacheKey, data, 10);
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

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/customerClassAction.js":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/actions/customerClassAction.js ***!
  \****************************************************************************************************/
/*! exports provided: setSelectedCustomerClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedCustomerClass", function() { return setSelectedCustomerClass; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");

const setSelectedCustomerClass = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_CUSTOMER_CLASS"],
    data: value
  };
};

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
/* harmony import */ var _jsroot_actions_subsidiaryAction__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/actions/subsidiaryAction */ "./www/js/source/reactpages/actions/subsidiaryAction.js");
/* harmony import */ var _jsroot_actions_liveStatusAction__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/actions/liveStatusAction */ "./www/js/source/reactpages/actions/liveStatusAction.js");
/* harmony import */ var _sportAction__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./sportAction */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/sportAction.js");
/* harmony import */ var _bettypeAction__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./bettypeAction */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/bettypeAction.js");
/* harmony import */ var _leagueAction__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./leagueAction */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/leagueAction.js");
/* harmony import */ var _matchAction__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./matchAction */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/matchAction.js");
/* harmony import */ var _platformAction__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./platformAction */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/platformAction.js");
/* harmony import */ var _oddsGroupsAction__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./oddsGroupsAction */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/oddsGroupsAction.js");
/* harmony import */ var _customerClassAction__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./customerClassAction */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/customerClassAction.js");
/* harmony import */ var _ipAction_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ipAction.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/ipAction.js");





















const ActionCreators = Object.assign({}, _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_1__, _jsroot_actions_productAction__WEBPACK_IMPORTED_MODULE_2__, _jsroot_actions_currencyAction__WEBPACK_IMPORTED_MODULE_3__, _jsroot_actions_baseCurrencyAction__WEBPACK_IMPORTED_MODULE_4__, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_5__, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_6__, _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_7__, _jsroot_actions_statusAction__WEBPACK_IMPORTED_MODULE_8__, _jsroot_actions_liveStatusAction__WEBPACK_IMPORTED_MODULE_12__, _jsroot_actions_convertAllAction__WEBPACK_IMPORTED_MODULE_9__, _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_10__, _jsroot_actions_subsidiaryAction__WEBPACK_IMPORTED_MODULE_11__, _sportAction__WEBPACK_IMPORTED_MODULE_13__, _bettypeAction__WEBPACK_IMPORTED_MODULE_14__, _leagueAction__WEBPACK_IMPORTED_MODULE_15__, _matchAction__WEBPACK_IMPORTED_MODULE_16__, _platformAction__WEBPACK_IMPORTED_MODULE_17__, _oddsGroupsAction__WEBPACK_IMPORTED_MODULE_18__, _customerClassAction__WEBPACK_IMPORTED_MODULE_19__, _ipAction_js__WEBPACK_IMPORTED_MODULE_20__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/ipAction.js":
/*!*****************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/actions/ipAction.js ***!
  \*****************************************************************************************/
/*! exports provided: setIp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIp", function() { return setIp; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");

const setIp = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_IP"],
    data: value
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/leagueAction.js":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/actions/leagueAction.js ***!
  \*********************************************************************************************/
/*! exports provided: setSelectedLeague, setLeagueList, getLeagueList, setEnableMatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedLeague", function() { return setSelectedLeague; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLeagueList", function() { return setLeagueList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLeagueList", function() { return getLeagueList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEnableMatch", function() { return setEnableMatch; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/Cache */ "./www/js/source/reactpages/lib/Cache.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");





const Url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].resolveClientUrl('api/CommonDataApi/GetLeagues');
const LEAGUE_CACHE_KEY = "LEAGUE_CACHE_KEY";
const setSelectedLeague = leagueid => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_4__["SET_SELECTED_LEAGUE"],
    data: leagueid
  };
};
function dispatchLeagueList(dispatch, data) {
  dispatch(setLeagueList(data));
  dispatch(setSelectedLeague(data.map(l => l.Id).toString()));
}
const setLeagueList = list => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_4__["SET_LEAGUE_LIST"],
    data: list
  };
};
function getLeagueList(sportId) {
  var dateString = moment__WEBPACK_IMPORTED_MODULE_0___default()().format("YYYY-MM-DD");
  const cacheKey = LEAGUE_CACHE_KEY + sportId + "_" + dateString;
  return dispatch => {
    var cacheData = _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_3__["default"].get(cacheKey);
    if (cacheData) {
      dispatchLeagueList(dispatch, cacheData);
      return;
    }
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__["default"].getData(Url, {
      sportId: sportId,
      fromDate: dateString,
      toDate: dateString
    }).then(response => {
      var data = response.data.map(l => ({
        Id: l.value,
        Value: l.label,
        Status: true
      }));
      _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_3__["default"].set(cacheKey, data);
      dispatchLeagueList(dispatch, data);
    });
  };
}
const setEnableMatch = value => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_4__["SET_ENABLE_MATCH"],
    data: value
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/matchAction.js":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/actions/matchAction.js ***!
  \********************************************************************************************/
/*! exports provided: setSelectedMatch, setMatchList, getMatchList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedMatch", function() { return setSelectedMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMatchList", function() { return setMatchList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatchList", function() { return getMatchList; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/Cache */ "./www/js/source/reactpages/lib/Cache.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");






const Url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].resolveClientUrl('api/CommonDataApi/GetMatches');
const MATCH_CACHE_KEY = "MATCH_CACHE_KEY";
function dispatchMatchList(dispatch, data) {
  if (data.length == 0 || data[0].value != 0) {
    data.unshift({
      value: 0,
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('All')
    });
  }
  dispatch(setMatchList(data));
  dispatch(setSelectedMatch(data[0].value));
}
const setSelectedMatch = matchid => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_5__["SET_SELECTED_MATCH"],
    data: matchid
  };
};
const setMatchList = list => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_5__["SET_MATCH_LIST"],
    data: list
  };
};
function getMatchList(sportId, leagueId) {
  const dateString = moment__WEBPACK_IMPORTED_MODULE_0___default()().format("YYYY-MM-DD");
  const cacheKey = MATCH_CACHE_KEY + sportId + "_" + leagueId + "_" + dateString;
  return dispatch => {
    var cacheData = _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_4__["default"].get(cacheKey);
    if (cacheData) {
      dispatchMatchList(dispatch, cacheData);
      return;
    }
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__["default"].getData(Url, {
      sportId: sportId,
      leagueId: leagueId,
      fromDate: dateString,
      toDate: dateString
    }).then(response => {
      var data = response.data;
      _jsroot_lib_Cache__WEBPACK_IMPORTED_MODULE_4__["default"].set(cacheKey, data);
      dispatchMatchList(dispatch, data);
    });
  };
}

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/oddsGroupsAction.js":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/actions/oddsGroupsAction.js ***!
  \*************************************************************************************************/
/*! exports provided: setSelectedOddsGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedOddsGroup", function() { return setSelectedOddsGroup; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");

const setSelectedOddsGroup = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_OODS_GROUP"],
    data: value
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/platformAction.js":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/actions/platformAction.js ***!
  \***********************************************************************************************/
/*! exports provided: setSelectedPlatform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedPlatform", function() { return setSelectedPlatform; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");

const setSelectedPlatform = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_PLATFORM"],
    data: value
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/sportAction.js":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/actions/sportAction.js ***!
  \********************************************************************************************/
/*! exports provided: setSelectedSport, setSportList, setEnableLeague, getSportList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedSport", function() { return setSelectedSport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSportList", function() { return setSportList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEnableLeague", function() { return setEnableLeague; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSportList", function() { return getSportList; });
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _common_lib_Service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../common/lib/Service */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");




const Url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].resolveClientUrl('api/CommonDataApi/GetSportsForTreeView');
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
const setEnableLeague = value => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_3__["SET_ENABLE_LEAGUE"],
    data: value
  };
};
function getSportList(productCodes) {
  return async dispatch => {
    const response = await _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_0__["default"].getData(Url, {
      productCodes: productCodes
    });
    const data = response.data;
    const selectedSports = _common_lib_Service__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedItemFromTreeListItem(data);
    dispatch(setSportList(data));
    dispatch(setSelectedSport(selectedSports));
  };
}

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js":
/*!**************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js ***!
  \**************************************************************************************/
/*! exports provided: SET_SELECTED_SPORT, SET_SPORT_LIST, SET_ENABLE_LEAGUE, SET_ENABLE_MATCH, SET_SELECTED_BETTYPE, SET_BETTYPE_LIST, SET_SELECTED_LEAGUE, SET_LEAGUE_LIST, SET_SELECTED_MATCH, SET_MATCH_LIST, SET_IP, SET_PLATFORM, SET_OODS_GROUP, SET_CUSTOMER_CLASS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_SPORT", function() { return SET_SELECTED_SPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SPORT_LIST", function() { return SET_SPORT_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ENABLE_LEAGUE", function() { return SET_ENABLE_LEAGUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ENABLE_MATCH", function() { return SET_ENABLE_MATCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_BETTYPE", function() { return SET_SELECTED_BETTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_BETTYPE_LIST", function() { return SET_BETTYPE_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_LEAGUE", function() { return SET_SELECTED_LEAGUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LEAGUE_LIST", function() { return SET_LEAGUE_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_MATCH", function() { return SET_SELECTED_MATCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_MATCH_LIST", function() { return SET_MATCH_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_IP", function() { return SET_IP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PLATFORM", function() { return SET_PLATFORM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_OODS_GROUP", function() { return SET_OODS_GROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CUSTOMER_CLASS", function() { return SET_CUSTOMER_CLASS; });
const SET_SELECTED_SPORT = "SET_SELECTED_SPORT";
const SET_SPORT_LIST = "SET_SPORT_LIST";
const SET_ENABLE_LEAGUE = "SET_ENABLE_LEAGUE";
const SET_ENABLE_MATCH = "SET_ENABLE_MATCH";
const SET_SELECTED_BETTYPE = "SET_SELECTED_BETTYPE";
const SET_BETTYPE_LIST = "SET_BETTYPE_LIST";
const SET_SELECTED_LEAGUE = "SET_SELECTED_LEAGUE";
const SET_LEAGUE_LIST = "SET_LEAGUE_LIST";
const SET_SELECTED_MATCH = "SET_SELECTED_MATCH";
const SET_MATCH_LIST = "SET_MATCH_LIST";
const SET_IP = "SET_IP";
const SET_PLATFORM = "SET_PLATFORM";
const SET_OODS_GROUP = "SET_OODS_GROUP";
const SET_CUSTOMER_CLASS = "SET_CUSTOMER_CLASS";

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
/* harmony import */ var _desktop_DataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./desktop/DataGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/desktop/DataGrid.jsx");
/* harmony import */ var _desktop_FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./desktop/FormFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/desktop/FormFilter.jsx");
/* harmony import */ var _common_components_PageLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/components/PageLayout */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/PageLayout.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _mobile_MobileFormFilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mobile/MobileFormFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/mobile/MobileFormFilter.jsx");
/* harmony import */ var _jsroot_customHooks_useMobileVersion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/customHooks/useMobileVersion */ "./www/js/source/reactpages/customHooks/useMobileVersion.jsx");
/* harmony import */ var _mobile_MobileGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mobile/MobileGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/mobile/MobileGrid.jsx");









const AppContainer = () => {
  const isUseMobileVer = Object(_jsroot_customHooks_useMobileVersion__WEBPACK_IMPORTED_MODULE_7__["default"])();
  const isLoading = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.isLoading);
  const destopLayout = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isLoading: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_desktop_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_desktop_DataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  const mobileLayout = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isLoading: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mobile_MobileFormFilter__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mobile_MobileGrid__WEBPACK_IMPORTED_MODULE_8__["default"], null));
  const layout = isUseMobileVer ? mobileLayout : destopLayout;
  const className = isUseMobileVer ? "mobile-container" : "";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_PageLayout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: className,
    selectedTabIndex: "2"
  }, layout);
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/desktop/DataGrid.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/desktop/DataGrid.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _common_components_BaseDataGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/components/BaseDataGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/BaseDataGrid.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






var Columns = ['Index', 'ExternalId', 'SystemId', 'RefNo', 'TransTime', 'Choice', 'Odds', 'OddsType', 'Stake', 'Status', 'Platform', 'Live'];
var ColumnWidths = [40, 120, 120, 160, 150, 400, 70, 70, 110, 110, 80, 80];
var ColumnAlignments = ['center-align', '', '', 'center-align tooltip', 'center-align', 'right-align', 'right-align', 'right-align', 'right-align', 'center-align', 'center-align', 'center-align'];
const SortableColumns = ['Stake'];
const DataGrid = props => {
  if (_jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].isAllowTxIDColumn && !Columns.includes('LicenseeTxId')) {
    Columns.splice(4, 0, 'LicenseeTxId');
    ColumnWidths.splice(4, 0, 110);
    ColumnAlignments.splice(4, 0, 'center-align tooltip');
  }
  const {
    BaseCurrencyName
  } = props.requestParam;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_BaseDataGrid__WEBPACK_IMPORTED_MODULE_3__["default"], {
    dataUrl: _common_lib_constants__WEBPACK_IMPORTED_MODULE_2__["ApiUrl"].RUNNING_DATA_URL,
    isPaging: true,
    columns: Columns,
    columnWidths: ColumnWidths,
    columnAlignments: ColumnAlignments,
    totalText: `${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Totalin')} ${BaseCurrencyName}`,
    totalColumns: SortableColumns,
    sortableColumns: SortableColumns
  });
};
function mapStateToProps(state) {
  const {
    requestParam
  } = state;
  return Object.assign({}, {
    requestParam
  });
}
;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/desktop/FormFilter.jsx":
/*!*******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/desktop/FormFilter.jsx ***!
  \*******************************************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _hooks_useValidParam_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useValidParam.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useValidParam.jsx");
/* harmony import */ var _filters_SubsidiaryDropDown_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../filters/SubsidiaryDropDown.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SubsidiaryDropDown.jsx");
/* harmony import */ var _filters_ProductFilter_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../filters/ProductFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/ProductFilter.jsx");
/* harmony import */ var _filters_UserNameFilter_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../filters/UserNameFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/UserNameFilter.jsx");
/* harmony import */ var _filters_CurrecyFilter_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../filters/CurrecyFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/CurrecyFilter.jsx");
/* harmony import */ var _filters_BaseCurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../filters/BaseCurrencyFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/BaseCurrencyFilter.jsx");
/* harmony import */ var _filters_ConvertAllCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../filters/ConvertAllCheckBoxFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/ConvertAllCheckBoxFilter.jsx");
/* harmony import */ var _filters_StatusFilter_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../filters/StatusFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/StatusFilter.jsx");
/* harmony import */ var _filters_SubsidiaryCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../filters/SubsidiaryCheckBoxFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SubsidiaryCheckBoxFilter.jsx");
/* harmony import */ var _filters_StickyIcon_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../filters/StickyIcon.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/StickyIcon.jsx");
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");
/* harmony import */ var _hooks_useFilterAction_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../hooks/useFilterAction.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useFilterAction.jsx");
/* harmony import */ var _filters_SportFilter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../filters/SportFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SportFilter.jsx");
/* harmony import */ var _filters_BetTypeFilter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../filters/BetTypeFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/BetTypeFilter.jsx");
/* harmony import */ var _filters_LeagueFilter__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../filters/LeagueFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/LeagueFilter.jsx");
/* harmony import */ var _filters_MatchFilter__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../filters/MatchFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/MatchFilter.jsx");
/* harmony import */ var _filters_LiveStatusFilter__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../filters/LiveStatusFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/LiveStatusFilter.jsx");
/* harmony import */ var _filters_CustomerClassFilter__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../filters/CustomerClassFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/CustomerClassFilter.jsx");
/* harmony import */ var _filters_OddsGroupFilter__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../filters/OddsGroupFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/OddsGroupFilter.jsx");
/* harmony import */ var _filters_PlatformFilter__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../filters/PlatformFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/PlatformFilter.jsx");
/* harmony import */ var _filters_IpFilter__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../filters/IpFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/IpFilter.jsx");
























const FormFilter = () => {
  const isValidModel = Object(_hooks_useValidParam_jsx__WEBPACK_IMPORTED_MODULE_3__["useValidParam"])();
  const {
    isShowSubsidiaryDropdown,
    isSubsidiarySearch,
    isShowSubsidiarySearchCheckBox
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_13__["default"])();
  const {
    submit
  } = Object(_hooks_useFilterAction_jsx__WEBPACK_IMPORTED_MODULE_14__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "page-filter",
    stickyFooter: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_StickyIcon_jsx__WEBPACK_IMPORTED_MODULE_12__["default"], null)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, isShowSubsidiaryDropdown && isSubsidiarySearch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-4 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SubsidiaryDropDown_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ProductFilter_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SportFilter__WEBPACK_IMPORTED_MODULE_15__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BetTypeFilter__WEBPACK_IMPORTED_MODULE_16__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_LeagueFilter__WEBPACK_IMPORTED_MODULE_17__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_MatchFilter__WEBPACK_IMPORTED_MODULE_18__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_PlatformFilter__WEBPACK_IMPORTED_MODULE_22__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_UserNameFilter_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_IpFilter__WEBPACK_IMPORTED_MODULE_23__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_StatusFilter_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_LiveStatusFilter__WEBPACK_IMPORTED_MODULE_19__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_CustomerClassFilter__WEBPACK_IMPORTED_MODULE_20__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_OddsGroupFilter__WEBPACK_IMPORTED_MODULE_21__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_CurrecyFilter_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BaseCurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ConvertAllCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    disabled: !isValidModel,
    type: "button",
    className: "btn btn-submit",
    onClick: submit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("Submit"))))), isShowSubsidiarySearchCheckBox && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-3 col-md-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SubsidiaryCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], null))));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/BaseCurrencyFilter.jsx":
/*!***************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/BaseCurrencyFilter.jsx ***!
  \***************************************************************************************************************/
/*! exports provided: BaseCurrencyFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseCurrencyFilter", function() { return BaseCurrencyFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_customHooks_useBaseCurrencyForMultiSelectCurrency__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency */ "./www/js/source/reactpages/customHooks/useBaseCurrencyForMultiSelectCurrency.jsx");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");






const BaseCurrencyFilter = () => {
  const selectedBaseCurrency = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.selectedBaseCurrency);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    setSelectedBaseCurrency
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const {
    baseCurrencyList,
    selectedBaseCurrency: newBaseCurrency
  } = Object(_jsroot_customHooks_useBaseCurrencyForMultiSelectCurrency__WEBPACK_IMPORTED_MODULE_4__["default"])(selectedBaseCurrency);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    dispatch(setSelectedBaseCurrency(newBaseCurrency));
  }, [newBaseCurrency]);
  const _renderBaseCurrencySelectList = () => {
    return (baseCurrencyList === null || baseCurrencyList === void 0 ? void 0 : baseCurrencyList.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_5__["default"], {
      instanceId: "ddlBased",
      value: selectedBaseCurrency,
      options: baseCurrencyList,
      onChange: item => dispatch(setSelectedBaseCurrency(item.value))
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("BaseCurrency")), _renderBaseCurrencySelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(BaseCurrencyFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/BetTypeFilter.jsx":
/*!**********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/BetTypeFilter.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: BetTypeFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BetTypeFilter", function() { return BetTypeFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/constants/report */ "./www/js/source/reactpages/constants/report.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");






const BetTypeFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const [selectedBettype, bettypeList] = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => [state.selectedBettype, state.bettypeList], react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const {
    setSelectedBettype
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const _betTypeChangeHandler = (currentItem, selectedItemsKey) => dispatch(setSelectedBettype(selectedItemsKey));
  const _renderBettypeSelectList = () => {
    if (!bettypeList || !bettypeList.length) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4__["TreeViewSelect"], {
        language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].currentLanguage,
        id: "BetTypeList",
        dataSource: [],
        keyField: "Value",
        valueField: "Name",
        statusField: "Checked",
        texts: {
          All: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("N_A")
        },
        isAllTextShown: true,
        hasSearchBox: true,
        treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_3__["TreeViewOption"],
        isValid: false
      });
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4__["TreeViewSelect"], {
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].currentLanguage,
      id: "BetTypeList",
      dataSource: bettypeList,
      keyField: "Value",
      valueField: "Name",
      statusField: "Checked",
      isAllTextShown: true,
      hasSearchBox: true,
      treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_3__["TreeViewOption"],
      onChange: _betTypeChangeHandler,
      isValid: !!selectedBettype
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("BetType")), _renderBettypeSelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(BetTypeFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/ConvertAllCheckBoxFilter.jsx":
/*!*********************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/ConvertAllCheckBoxFilter.jsx ***!
  \*********************************************************************************************************************/
/*! exports provided: ConvertAllCheckBoxFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConvertAllCheckBoxFilter", function() { return ConvertAllCheckBoxFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");





const ConvertAllCheckBoxFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    changeIsConvertAll
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const isConvertAll = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.isConvertAll);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_4__["default"], {
    id: "IsConvertAll",
    checked: isConvertAll,
    onChange: checked => dispatch(changeIsConvertAll(checked)),
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("ConvertAllFiguresToBaseCurrency")
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(ConvertAllCheckBoxFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/CurrecyFilter.jsx":
/*!**********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/CurrecyFilter.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: CurrecyFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrecyFilter", function() { return CurrecyFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






const CurrecyFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    setSelectedCurrency
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"];
  const _onChangeCurrency = currencyIdList => {
    dispatch(setSelectedCurrency(currencyIdList));
  };
  const _renderCurrencySelectList = () => {
    const currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].currencyList;
    return currencyList && currencyList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default.a, {
      id: "ddlCurrency",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].currentLanguage,
      dataSource: currencyList,
      keyField: "id",
      valueField: "value",
      statusField: "status",
      onChange: (currentItem, selectedItemsKey) => _onChangeCurrency(selectedItemsKey)
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Currency")), _renderCurrencySelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(CurrecyFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/CustomerClassFilter.jsx":
/*!****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/CustomerClassFilter.jsx ***!
  \****************************************************************************************************************/
/*! exports provided: CustomerClassFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerClassFilter", function() { return CustomerClassFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






const CustomerClassFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    setSelectedCustomerClass
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const _customerClassChangeHandler = (currentItem, selectedItemsKey) => {
    const customerClass = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].riskLevels.filter(r => selectedItemsKey.includes(r.id)).map(r => r.customerClassList).join(',');
    dispatch(setSelectedCustomerClass(customerClass));
  };
  const _renderCustomerClassSelectList = () => {
    const riskLevels = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].riskLevels;
    return (riskLevels === null || riskLevels === void 0 ? void 0 : riskLevels.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3___default.a, {
      key: "riskLevels",
      id: "RiskLevels",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].currentLanguage,
      dataSource: riskLevels,
      keyField: "id",
      valueField: "value",
      statusField: "status",
      onChange: _customerClassChangeHandler
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("RiskLevel")), _renderCustomerClassSelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(CustomerClassFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/IpFilter.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/IpFilter.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: IpFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IpFilter", function() { return IpFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");




const IpFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    setIp
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const ip = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.ip);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("IP")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "input-text",
    id: "ip",
    name: "ip",
    type: "text",
    value: ip,
    onChange: event => dispatch(setIp(event.target.value))
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(IpFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/LeagueFilter.jsx":
/*!*********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/LeagueFilter.jsx ***!
  \*********************************************************************************************************/
/*! exports provided: LeagueFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeagueFilter", function() { return LeagueFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");





const LeagueFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const [selectedLeague, selectedSport, leagueList] = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => [state.selectedLeague, state.selectedSport, state.leagueList], react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const {
    setSelectedLeague,
    getMatchList,
    setMatchList
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getMatchByLeague(selectedSport, selectedLeague);
  }, [selectedSport]);
  const _leagueChangeHandler = (currentItem, selectedItemsKey) => {
    dispatch(setSelectedLeague(selectedItemsKey));
    getMatchByLeague(selectedSport, selectedItemsKey);
  };
  const getMatchByLeague = (selectedSport, selectedLeague) => {
    const isSingleLeague = !leagueList || leagueList.length > 0 && !!selectedLeague && selectedLeague.split(",").length === 1;
    if (isSingleLeague) {
      dispatch(getMatchList(selectedSport, selectedLeague));
    } else {
      dispatch(setMatchList([]));
    }
  };
  const _renderLeagueSelectList = () => {
    if (!leagueList || !leagueList.length) {
      var dataSource = [{
        Id: 0,
        Value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('All'),
        Status: true
      }];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3___default.a, {
        id: "StatusListAll",
        language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].currentLanguage,
        dataSource: dataSource,
        keyField: "Id",
        valueField: "Value",
        statusField: "Status",
        onChange: _leagueChangeHandler,
        disabled: true
      });
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3___default.a, {
      id: "LeagueList",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].currentLanguage,
      dataSource: leagueList,
      keyField: "Id",
      valueField: "Value",
      statusField: "Status",
      onChange: _leagueChangeHandler
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("League")), _renderLeagueSelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(LeagueFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/LiveStatusFilter.jsx":
/*!*************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/LiveStatusFilter.jsx ***!
  \*************************************************************************************************************/
/*! exports provided: LiveStatusFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveStatusFilter", function() { return LiveStatusFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






const LiveStatusFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    setSelectedLiveStatus
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"];
  const _renderLiveStatusSelectList = () => {
    const liveStatusList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].liveStatusList;
    return (liveStatusList === null || liveStatusList === void 0 ? void 0 : liveStatusList.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default.a, {
      id: "LiveStatusList",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].currentLanguage,
      dataSource: liveStatusList,
      keyField: "Id",
      valueField: "Value",
      statusField: "Status",
      onChange: (currentItem, selectedItemsKey) => dispatch(setSelectedLiveStatus(selectedItemsKey))
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Live")), _renderLiveStatusSelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(LiveStatusFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/MatchFilter.jsx":
/*!********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/MatchFilter.jsx ***!
  \********************************************************************************************************/
/*! exports provided: MatchFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchFilter", function() { return MatchFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");





const MatchFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const [selectedMatch, matchList] = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => [state.selectedMatch, state.matchList], react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const {
    setSelectedMatch
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const _renderMatchSelectList = () => {
    if (!matchList || !matchList.length) {
      var dataSource = [{
        value: 0,
        label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('All')
      }];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
        disabled: true,
        value: 0,
        options: dataSource,
        instanceId: "MatchListAll"
      });
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
      value: selectedMatch,
      options: matchList,
      onChange: item => dispatch(setSelectedMatch(item.value)),
      instanceId: "MatchList"
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Match")), _renderMatchSelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MatchFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/OddsGroupFilter.jsx":
/*!************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/OddsGroupFilter.jsx ***!
  \************************************************************************************************************/
/*! exports provided: OddsGroupFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OddsGroupFilter", function() { return OddsGroupFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






const OddsGroupFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    setSelectedOddsGroup
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const _renderOddsGroupsSelectList = () => {
    const oddsGroups = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].oddsGroups;
    return (oddsGroups === null || oddsGroups === void 0 ? void 0 : oddsGroups.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_3___default.a, {
      key: "oddsGroup",
      id: "OddsGroup",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].currentLanguage,
      dataSource: oddsGroups,
      keyField: "Id",
      valueField: "Value",
      statusField: "Status",
      onChange: (currentItem, selectedItemsKey) => dispatch(setSelectedOddsGroup(selectedItemsKey))
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("OddsGroup")), _renderOddsGroupsSelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(OddsGroupFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/PlatformFilter.jsx":
/*!***********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/PlatformFilter.jsx ***!
  \***********************************************************************************************************/
/*! exports provided: ProductFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductFilter", function() { return ProductFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






const ProductFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    setSelectedPlatform
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"];
  const selectedPlatform = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.selectedPlatform);
  const _renderPlatformSelectList = () => {
    const platformList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].platformList;
    return (platformList === null || platformList === void 0 ? void 0 : platformList.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default.a, {
      id: "PlatformList",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].currentLanguage,
      value: selectedPlatform,
      dataSource: platformList,
      keyField: "Id",
      valueField: "Value",
      statusField: "Status",
      onChange: (currentItem, selectedItemsKey) => dispatch(setSelectedPlatform(selectedItemsKey))
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Platform")), _renderPlatformSelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(ProductFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/ProductFilter.jsx":
/*!**********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/ProductFilter.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: ProductFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductFilter", function() { return ProductFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






const ProductFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const selectedProduct = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.selectedProduct);
  const {
    setSelectedProduct,
    getSportList,
    getBetTypeList
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getSportAndBettypeListByProduct(selectedProduct);
  }, []);
  const _productChangeHandler = (currentItem, selectedItemsKey) => {
    Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["batch"])(() => {
      dispatch(setSelectedProduct(selectedItemsKey));
      getSportAndBettypeListByProduct(selectedItemsKey);
    });
  };
  const getSportAndBettypeListByProduct = selectedProduct => {
    dispatch(getSportList(selectedProduct));
    dispatch(getBetTypeList(selectedProduct));
  };
  const _renderProductSelectList = () => {
    const productOptions = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].productOptions;
    return productOptions !== null && productOptions !== void 0 && productOptions.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default.a, {
      id: "ProductList",
      hasSearchBox: true,
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].currentLanguage,
      dataSource: productOptions,
      keyField: "Code",
      valueField: "Name",
      statusField: "Status",
      onChange: _productChangeHandler
    }) : null;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Product")), _renderProductSelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(ProductFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SportFilter.jsx":
/*!********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SportFilter.jsx ***!
  \********************************************************************************************************/
/*! exports provided: SportFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SportFilter", function() { return SportFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/constants/report */ "./www/js/source/reactpages/constants/report.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");






const SportFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const [selectedProduct, selectedSport, sportList] = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => [state.selectedProduct, state.selectedSport, state.sportList], react_redux__WEBPACK_IMPORTED_MODULE_1__["shallowEqual"]);
  const {
    setSelectedSport,
    getLeagueList,
    setLeagueList
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getLeagueListByProductAndSport(selectedProduct, selectedSport);
  }, [selectedProduct]);
  const _sportChangeHandler = (currentItem, selectedItemsKey) => {
    dispatch(setSelectedSport(selectedItemsKey));
    getLeagueListByProductAndSport(selectedProduct, selectedItemsKey);
  };
  const getLeagueListByProductAndSport = (selectedProduct, selectedSport) => {
    const isSingleSport = !!selectedSport && selectedSport.split(",").length === 1;
    const isEnableLeague = (selectedProduct === 'SB' || selectedProduct === 'BA') && isSingleSport;
    if (isEnableLeague) {
      dispatch(getLeagueList(selectedSport));
    } else {
      dispatch(setLeagueList([]));
    }
  };
  const _renderSportSelectList = () => {
    if (!sportList || !sportList.length) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__["TreeViewSelect"], {
        language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].currentLanguage,
        id: "SportList",
        dataSource: [],
        keyField: "Value",
        valueField: "Name",
        statusField: "Checked",
        texts: {
          All: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("N_A")
        },
        isAllTextShown: true,
        hasSearchBox: true,
        treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_3__["TreeViewOption"],
        isValid: false
      });
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__["TreeViewSelect"], {
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].currentLanguage,
      id: "SportList",
      dataSource: sportList,
      keyField: "Value",
      valueField: "Name",
      statusField: "Checked",
      isAllTextShown: true,
      hasSearchBox: true,
      treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_3__["TreeViewOption"],
      onChange: _sportChangeHandler,
      isValid: !!selectedSport
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("Sport")), _renderSportSelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(SportFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/StatusFilter.jsx":
/*!*********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/StatusFilter.jsx ***!
  \*********************************************************************************************************/
/*! exports provided: StatusFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusFilter", function() { return StatusFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");






const StatusFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    setSelectedStatus
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"];
  const _renderStatusSelectList = () => {
    const statusList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].statusList;
    return statusList && statusList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default.a, {
      id: "StatusList",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].currentLanguage,
      dataSource: statusList,
      keyField: "Id",
      valueField: "Value",
      statusField: "Status",
      onChange: (currentItem, selectedItemsKey) => dispatch(setSelectedStatus(selectedItemsKey))
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Status")), _renderStatusSelectList());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(StatusFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/StickyIcon.jsx":
/*!*******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/StickyIcon.jsx ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/UserGuide */ "./www/js/source/reactpages/components/UserGuide.jsx");
/* harmony import */ var _hooks_useFilterAction_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/useFilterAction.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useFilterAction.jsx");






const StickyIcon = () => {
  const {
    exportExcel
  } = Object(_hooks_useFilterAction_jsx__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const userGuideContent = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.userGuideContent);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    getUserGuideContent
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const _showUserGuide = () => {
    if (!userGuideContent || userGuideContent.length === 0) {
      dispatch(getUserGuideContent('BettingTicketCenterRunning'));
    }
  };
  const _renderUserGuide = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_4__["default"], {
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("UserGuide"),
      contentTitle: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("BettingTicketCenter"),
      onClick: _showUserGuide,
      content: userGuideContent
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-excel right",
    onClick: exportExcel,
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("ExportToExcel")
  }), _renderUserGuide());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(StickyIcon));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SubsidiaryCheckBoxFilter.jsx":
/*!*********************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SubsidiaryCheckBoxFilter.jsx ***!
  \*********************************************************************************************************************/
/*! exports provided: SubsidiaryCheckBoxFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubsidiaryCheckBoxFilter", function() { return SubsidiaryCheckBoxFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! usehooks-ts */ "./node_modules/usehooks-ts/dist/esm/index.js");







const SubsidiaryCheckBoxFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const isFirstRender = Object(usehooks_ts__WEBPACK_IMPORTED_MODULE_6__["useIsFirstRender"])();
  const {
    setSubsidiaryList,
    setSubsidiarySearch
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const {
    defaultSelectedSubsidiary,
    isSubsidiarySearch,
    isShowSubsidiarySearchCheckBox,
    isShowSubsidiaryDropdown
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_5__["default"])();
  if (isFirstRender) {
    dispatch(setSubsidiarySearch(!isShowSubsidiarySearchCheckBox && isShowSubsidiaryDropdown));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_4__["default"], {
    id: "SubsidiarySearch",
    checked: isSubsidiarySearch,
    onChange: checked => {
      dispatch(setSubsidiarySearch(checked));
      checked && dispatch(setSubsidiaryList(defaultSelectedSubsidiary));
    },
    label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("SubsidiarySearch")
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(SubsidiaryCheckBoxFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SubsidiaryDropDown.jsx":
/*!***************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SubsidiaryDropDown.jsx ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/constants/report */ "./www/js/source/reactpages/constants/report.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");








const SubsidiaryDropDown = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    setSubsidiaryList
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  const {
    isWhiteLabelView
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_7__["default"])();
  const _renderSubsidiaryTreeView = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_6__["TreeViewSelect"], {
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].currentLanguage,
      id: "SubsidiaryTreeView",
      dataSource: _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__["default"].whitelabelList,
      keyField: "Value",
      valueField: "Name",
      statusField: "Checked",
      texts: {
        SelectOptions: "Please select",
        All: "All",
        SelectedItemCount: "# selected"
      },
      isAllTextShown: false,
      hasSearchBox: false,
      treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_5__["TreeViewOption"],
      onChange: (currentItem, selectedItemsKey, treeViewList) => dispatch(setSubsidiaryList(selectedItemsKey))
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, isWhiteLabelView ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("WhiteLabel") : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("Subsidiary")), _renderSubsidiaryTreeView());
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(SubsidiaryDropDown));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/UserNameFilter.jsx":
/*!***********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/UserNameFilter.jsx ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/auto-complete */ "./www/js/source/reactpages/components/auto-complete/index.jsx");
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");






const UserNameFilter = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    setUsername
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("Username")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_4__["default"], {
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

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useFilterAction.jsx":
/*!**********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useFilterAction.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: useFilterAction, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFilterAction", function() { return useFilterAction; });
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/index.js */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_customHooks_useBaseCurrencyForMultiSelectCurrency__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency */ "./www/js/source/reactpages/customHooks/useBaseCurrencyForMultiSelectCurrency.jsx");
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _common_lib_Service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../common/lib/Service */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/Service.js");
/* harmony import */ var _useValidParam_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useValidParam.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useValidParam.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _hooks_useIsEnableLeagueMatch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../hooks/useIsEnableLeagueMatch */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useIsEnableLeagueMatch.jsx");












const useFilterAction = () => {
  const isValidModel = Object(_useValidParam_jsx__WEBPACK_IMPORTED_MODULE_8__["useValidParam"])();
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["useDispatch"])();
  const {
    requestParam,
    username,
    isConvertAll,
    selectedBaseCurrency,
    selectedProduct,
    selectedCurrency,
    selectedStatus,
    selectedSubsidiary,
    selectedLiveStatus,
    selectedPlatform,
    selectedSport,
    selectedBettype,
    selectedLeague,
    selectedMatch,
    ip,
    selectedOddsGroup,
    selectedCustomerClass,
    sportList
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["useSelector"])(state => state, react_redux__WEBPACK_IMPORTED_MODULE_9__["shallowEqual"]);
  const {
    isSubsidiarySearch
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const {
    baseCurrencyList
  } = Object(_jsroot_customHooks_useBaseCurrencyForMultiSelectCurrency__WEBPACK_IMPORTED_MODULE_4__["default"])(selectedBaseCurrency);
  const {
    setReportTitle,
    setRequestParam,
    toggleLoader,
    getGridData
  } = _actions_index_js__WEBPACK_IMPORTED_MODULE_0__["ActionCreators"];
  const isEnableLeague = Object(_hooks_useIsEnableLeagueMatch__WEBPACK_IMPORTED_MODULE_11__["useIsEnableLeague"])();
  const isEnableMatch = Object(_hooks_useIsEnableLeagueMatch__WEBPACK_IMPORTED_MODULE_11__["useIsEnableMatch"])();
  const _getParams = () => {
    if (!isValidModel) {
      return null;
    }
    const {
      PageSize,
      SortBy,
      SortOrder
    } = requestParam;
    const baseCurrency = baseCurrencyList.find(x => x.value === selectedBaseCurrency);
    return {
      PageSize: PageSize,
      PageIndex: 1,
      ProductCodeList: selectedProduct,
      Username: username,
      CurrencyIdList: selectedCurrency,
      BaseCurrency: selectedBaseCurrency,
      Status: selectedStatus,
      LiveStatus: selectedLiveStatus,
      SportIds: _common_lib_Service__WEBPACK_IMPORTED_MODULE_7__["default"].getNormalizedSelectedParamValueForTreeListFilter(selectedSport, sportList),
      BetTypeIds: _common_lib_Service__WEBPACK_IMPORTED_MODULE_7__["default"].getSelectedBettype(selectedBettype),
      LeagueIds: isEnableLeague ? selectedLeague : 0,
      MatchId: isEnableMatch ? selectedMatch : 0,
      Ip: ip,
      Platform: selectedPlatform,
      OddsGroup: selectedOddsGroup,
      CustomerClass: selectedCustomerClass,
      SortBy: SortBy,
      SortOrder: SortOrder,
      IsConvertAll: isConvertAll,
      BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
      SubsidiarySearch: isSubsidiarySearch,
      SubsidiaryList: isSubsidiarySearch ? selectedSubsidiary : ""
    };
  };
  const submit = event => {
    event.preventDefault();
    const params = _getParams();
    if (!params) {
      return;
    }
    dispatch(setReportTitle(_common_lib_Service__WEBPACK_IMPORTED_MODULE_7__["default"].getTitle(null, null, params.IsConvertAll ? params.BaseCurrencyName : '')));
    dispatch(setRequestParam(params));
    dispatch(toggleLoader(true));
    dispatch(getGridData(_common_lib_constants__WEBPACK_IMPORTED_MODULE_6__["ApiUrl"].RUNNING_DATA_URL, params));
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
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_3__["default"].getFile(_common_lib_constants__WEBPACK_IMPORTED_MODULE_6__["ApiUrl"].RUNNING_DATA_URL, params).then(response => {
      const NoContentStatusCode = 204;
      if (response.status === NoContentStatusCode) {
        alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("NoInfo"));
      } else {
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel"
        });
        Object(file_saver__WEBPACK_IMPORTED_MODULE_10__["saveAs"])(blob, 'BettingTicketsCenter_Running.xls');
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

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useIsEnableLeagueMatch.jsx":
/*!*****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useIsEnableLeagueMatch.jsx ***!
  \*****************************************************************************************************************/
/*! exports provided: useIsEnableLeague, useIsEnableMatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useIsEnableLeague", function() { return useIsEnableLeague; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useIsEnableMatch", function() { return useIsEnableMatch; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

const useIsEnableLeague = () => {
  const [selectedProduct, selectedSport] = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useSelector"])(state => [state.selectedProduct, state.selectedSport], react_redux__WEBPACK_IMPORTED_MODULE_0__["shallowEqual"]);
  const isSingleSport = !!selectedSport && selectedSport.split(",").length === 1;
  return (selectedProduct === 'SB' || selectedProduct === 'BA') && isSingleSport;
};
const useIsEnableMatch = () => {
  const [selectedLeague] = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useSelector"])(state => [state.selectedLeague, state.isEnableLeague], react_redux__WEBPACK_IMPORTED_MODULE_0__["shallowEqual"]);
  const isEnableLeague = useIsEnableLeague();
  const isSingleLeague = !!selectedLeague && selectedLeague.split(",").length === 1;
  return isEnableLeague && isSingleLeague;
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useValidParam.jsx":
/*!********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useValidParam.jsx ***!
  \********************************************************************************************************/
/*! exports provided: useValidParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useValidParam", function() { return useValidParam; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_lib_validationHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/validationHelper */ "./www/js/source/reactpages/lib/validationHelper.js");
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");
/* harmony import */ var _hooks_useIsEnableLeagueMatch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useIsEnableLeagueMatch */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useIsEnableLeagueMatch.jsx");




const useValidParam = () => {
  const [selectedProduct, selectedStatus, selectedCurrency, selectedBaseCurrency, selectedSubsidiary, selectedPlatform, selectedLiveStatus, selectedCustomerClass, selectedOddsGroup, selectedBettype, selectedSport, selectedLeague] = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useSelector"])(state => [state.selectedProduct, state.selectedStatus, state.selectedCurrency, state.selectedBaseCurrency, state.selectedSubsidiary, state.selectedPlatform, state.selectedLiveStatus, state.selectedCustomerClass, state.selectedOddsGroup, state.selectedBettype, state.selectedSport, state.selectedLeague], react_redux__WEBPACK_IMPORTED_MODULE_0__["shallowEqual"]);
  const {
    isSubsidiarySearch
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const isEnableLeague = Object(_hooks_useIsEnableLeagueMatch__WEBPACK_IMPORTED_MODULE_3__["useIsEnableLeague"])();
  return !!selectedProduct && !!selectedStatus && !!selectedCurrency && !!selectedLiveStatus && !!selectedCustomerClass && !!selectedOddsGroup && !!selectedPlatform && !!selectedBettype && !!selectedSport && Object(_jsroot_lib_validationHelper__WEBPACK_IMPORTED_MODULE_1__["validateBaseCurrency"])(selectedBaseCurrency) && (!isSubsidiarySearch || selectedSubsidiary) && (!isEnableLeague || selectedLeague);
};

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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  }
}
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById('app-container'));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/mobile/MobileFormFilter.jsx":
/*!************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/mobile/MobileFormFilter.jsx ***!
  \************************************************************************************************************/
/*! exports provided: MobileFormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileFormFilter", function() { return MobileFormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _hooks_useValidParam_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useValidParam.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useValidParam.jsx");
/* harmony import */ var _filters_SubsidiaryDropDown_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../filters/SubsidiaryDropDown.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SubsidiaryDropDown.jsx");
/* harmony import */ var _filters_ProductFilter_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../filters/ProductFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/ProductFilter.jsx");
/* harmony import */ var _filters_UserNameFilter_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../filters/UserNameFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/UserNameFilter.jsx");
/* harmony import */ var _filters_CurrecyFilter_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../filters/CurrecyFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/CurrecyFilter.jsx");
/* harmony import */ var _filters_BaseCurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../filters/BaseCurrencyFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/BaseCurrencyFilter.jsx");
/* harmony import */ var _filters_ConvertAllCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../filters/ConvertAllCheckBoxFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/ConvertAllCheckBoxFilter.jsx");
/* harmony import */ var _filters_StatusFilter_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../filters/StatusFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/StatusFilter.jsx");
/* harmony import */ var _filters_SubsidiaryCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../filters/SubsidiaryCheckBoxFilter.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SubsidiaryCheckBoxFilter.jsx");
/* harmony import */ var _filters_StickyIcon_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../filters/StickyIcon.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/StickyIcon.jsx");
/* harmony import */ var _jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/customHooks/useSubsidiarySearch */ "./www/js/source/reactpages/customHooks/useSubsidiarySearch.jsx");
/* harmony import */ var _hooks_useFilterAction_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../hooks/useFilterAction.jsx */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/hooks/useFilterAction.jsx");
/* harmony import */ var _filters_SportFilter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../filters/SportFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/SportFilter.jsx");
/* harmony import */ var _filters_BetTypeFilter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../filters/BetTypeFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/BetTypeFilter.jsx");
/* harmony import */ var _filters_LeagueFilter__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../filters/LeagueFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/LeagueFilter.jsx");
/* harmony import */ var _filters_MatchFilter__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../filters/MatchFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/MatchFilter.jsx");
/* harmony import */ var _filters_LiveStatusFilter__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../filters/LiveStatusFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/LiveStatusFilter.jsx");
/* harmony import */ var _filters_CustomerClassFilter__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../filters/CustomerClassFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/CustomerClassFilter.jsx");
/* harmony import */ var _filters_OddsGroupFilter__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../filters/OddsGroupFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/OddsGroupFilter.jsx");
/* harmony import */ var _filters_PlatformFilter__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../filters/PlatformFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/PlatformFilter.jsx");
/* harmony import */ var _filters_IpFilter__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../filters/IpFilter */ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/filters/IpFilter.jsx");
























const MobileFormFilter = () => {
  const isValidModel = Object(_hooks_useValidParam_jsx__WEBPACK_IMPORTED_MODULE_3__["useValidParam"])();
  const {
    isShowSubsidiaryDropdown,
    isSubsidiarySearch,
    isShowSubsidiarySearchCheckBox
  } = Object(_jsroot_customHooks_useSubsidiarySearch__WEBPACK_IMPORTED_MODULE_13__["default"])();
  const {
    submit
  } = Object(_hooks_useFilterAction_jsx__WEBPACK_IMPORTED_MODULE_14__["default"])();
  const [isCollapsed, setIsCollapse] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
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
  }, isShowSubsidiaryDropdown && isSubsidiarySearch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SubsidiaryDropDown_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ProductFilter_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SportFilter__WEBPACK_IMPORTED_MODULE_15__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BetTypeFilter__WEBPACK_IMPORTED_MODULE_16__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_LeagueFilter__WEBPACK_IMPORTED_MODULE_17__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_MatchFilter__WEBPACK_IMPORTED_MODULE_18__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_PlatformFilter__WEBPACK_IMPORTED_MODULE_22__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_UserNameFilter_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_IpFilter__WEBPACK_IMPORTED_MODULE_23__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_StatusFilter_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_LiveStatusFilter__WEBPACK_IMPORTED_MODULE_19__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_CustomerClassFilter__WEBPACK_IMPORTED_MODULE_20__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_OddsGroupFilter__WEBPACK_IMPORTED_MODULE_21__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_CurrecyFilter_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_BaseCurrencyFilter_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_ConvertAllCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null)), isShowSubsidiarySearchCheckBox && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-xs-6",
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_SubsidiaryCheckBoxFilter_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filters_StickyIcon_jsx__WEBPACK_IMPORTED_MODULE_12__["default"], null)))));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileFormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/components/mobile/MobileGrid.jsx":
/*!******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/components/mobile/MobileGrid.jsx ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/lib/constants */ "./www/js/source/reactpages/pages/bettingticketscenter/common/lib/constants.js");
/* harmony import */ var _common_components_BaseMobileDataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/components/BaseMobileDataGrid */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/BaseMobileDataGrid.jsx");
/* harmony import */ var _components_mobile_component_CompositeRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../components/mobile-component/CompositeRow */ "./www/js/source/reactpages/components/mobile-component/CompositeRow.jsx");
/* harmony import */ var _common_components_MobileBetlistContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../common/components/MobileBetlistContent */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/MobileBetlistContent.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");









const Columns = ['Details', 'Stake', 'Status', 'Icon'];
const SortableColumns = ["Stake"];
const MobileGrid = () => {
  const data = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.gridData.Data);
  const totalData = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.gridData.Total);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {}, [data]);
  const isDisplayTxIdColumn = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].isAllowTxIDColumn;
  const getRows = () => {
    if (!data) {
      return null;
    }
    return data.map(item => renderCompositeRow(item));
  };
  const renderCompositeRow = item => {
    const expandRows = getExpandRows(item);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_mobile_component_CompositeRow__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: item.RefNo,
      expandRows: expandRows
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_MobileBetlistContent__WEBPACK_IMPORTED_MODULE_7__["default"], {
      item: item
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "right-align",
      dangerouslySetInnerHTML: {
        __html: item.Stake
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "right-align",
      dangerouslySetInnerHTML: {
        __html: item.Status
      }
    }));
  };
  const getExpandRows = item => {
    let rows = [];
    if (isDisplayTxIdColumn) {
      rows.push(renderExpandRow(_common_lib_constants__WEBPACK_IMPORTED_MODULE_4__["HeaderText"].LicenseeTxId, item.LicenseeTxId));
    }
    rows.push(renderExpandRow(_common_lib_constants__WEBPACK_IMPORTED_MODULE_4__["HeaderText"].SystemId, item.SystemId));
    rows.push(renderExpandRow(_common_lib_constants__WEBPACK_IMPORTED_MODULE_4__["HeaderText"].Platform, item.Platform));
    rows.push(renderExpandRow(_common_lib_constants__WEBPACK_IMPORTED_MODULE_4__["HeaderText"].Live, item.Live));
    return rows;
  };
  const renderExpandRow = (key, value) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "right-align"
    }, key), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      colSpan: 3,
      className: "left-align",
      dangerouslySetInnerHTML: {
        __html: value
      }
    }));
  };
  const renderFooter = () => {
    if (!totalData) {
      return null;
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Row"], {
      className: "fixed-table-grant-total"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      colSpan: "2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell-total"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "total-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSingleResource('Total')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "total-stake"
    }, totalData.Stake))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      colSpan: "2"
    }));
  };
  const body = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => getRows(), [data]);
  const footer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => renderFooter(), [totalData]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_BaseMobileDataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], {
    dataUrl: _common_lib_constants__WEBPACK_IMPORTED_MODULE_4__["ApiUrl"].RUNNING_DATA_URL,
    isPaging: true,
    columns: Columns,
    body: body,
    footer: footer,
    sortableColumns: SortableColumns
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(MobileGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/bettypeReducer.js":
/*!************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/bettypeReducer.js ***!
  \************************************************************************************************/
/*! exports provided: selectedBettype, bettypeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedBettype", function() { return selectedBettype; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bettypeList", function() { return bettypeList; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");
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

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/customerClassReducer.js":
/*!******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/customerClassReducer.js ***!
  \******************************************************************************************************/
/*! exports provided: selectedCustomerClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedCustomerClass", function() { return selectedCustomerClass; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedCustomerClass = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_CUSTOMER_CLASS"]](state, action) {
    return action.data;
  }
});

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
/* harmony import */ var _jsroot_reducers_liveStatusReducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/reducers/liveStatusReducer */ "./www/js/source/reactpages/reducers/liveStatusReducer.js");
/* harmony import */ var _jsroot_reducers_convertAllReducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/reducers/convertAllReducer */ "./www/js/source/reactpages/reducers/convertAllReducer.js");
/* harmony import */ var _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/reducers/userGuideReducer */ "./www/js/source/reactpages/reducers/userGuideReducer.js");
/* harmony import */ var _common_components_reducer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../common/components/reducer */ "./www/js/source/reactpages/pages/bettingticketscenter/common/components/reducer.js");
/* harmony import */ var _jsroot_reducers_subsidiaryReducer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/reducers/subsidiaryReducer */ "./www/js/source/reactpages/reducers/subsidiaryReducer.js");
/* harmony import */ var _sportReducer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./sportReducer */ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/sportReducer.js");
/* harmony import */ var _bettypeReducer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./bettypeReducer */ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/bettypeReducer.js");
/* harmony import */ var _leagueReducer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./leagueReducer */ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/leagueReducer.js");
/* harmony import */ var _matchReducer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./matchReducer */ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/matchReducer.js");
/* harmony import */ var _ipReducer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./ipReducer */ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/ipReducer.js");
/* harmony import */ var _platformReducer__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./platformReducer */ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/platformReducer.js");
/* harmony import */ var _oddsGroupsReducer__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./oddsGroupsReducer */ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/oddsGroupsReducer.js");
/* harmony import */ var _customerClassReducer__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./customerClassReducer */ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/customerClassReducer.js");























/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_jsroot_reducers_gridDataReducer_js__WEBPACK_IMPORTED_MODULE_1__, _jsroot_reducers_usernameReducer__WEBPACK_IMPORTED_MODULE_2__, _jsroot_reducers_productReducer__WEBPACK_IMPORTED_MODULE_3__, _jsroot_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_4__, _jsroot_reducers_baseCurrencyReducer__WEBPACK_IMPORTED_MODULE_5__, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_6__, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_7__, _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_8__, _jsroot_reducers_statusReducer__WEBPACK_IMPORTED_MODULE_9__, _jsroot_reducers_liveStatusReducer__WEBPACK_IMPORTED_MODULE_10__, _jsroot_reducers_convertAllReducer__WEBPACK_IMPORTED_MODULE_11__, _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_12__, _common_components_reducer__WEBPACK_IMPORTED_MODULE_13__, _jsroot_reducers_subsidiaryReducer__WEBPACK_IMPORTED_MODULE_14__, _sportReducer__WEBPACK_IMPORTED_MODULE_15__, _bettypeReducer__WEBPACK_IMPORTED_MODULE_16__, _leagueReducer__WEBPACK_IMPORTED_MODULE_17__, _matchReducer__WEBPACK_IMPORTED_MODULE_18__, _ipReducer__WEBPACK_IMPORTED_MODULE_19__, _platformReducer__WEBPACK_IMPORTED_MODULE_20__, _oddsGroupsReducer__WEBPACK_IMPORTED_MODULE_21__, _customerClassReducer__WEBPACK_IMPORTED_MODULE_22__)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/ipReducer.js":
/*!*******************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/ipReducer.js ***!
  \*******************************************************************************************/
/*! exports provided: ip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ip", function() { return ip; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const ip = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])("", {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_IP"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/leagueReducer.js":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/leagueReducer.js ***!
  \***********************************************************************************************/
/*! exports provided: selectedLeague, leagueList, isEnableMatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedLeague", function() { return selectedLeague; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leagueList", function() { return leagueList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnableMatch", function() { return isEnableMatch; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedLeague = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_LEAGUE"]](state, action) {
    return action.data;
  }
});
const leagueList = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_LEAGUE_LIST"]](state, action) {
    return action.data;
  }
});
const isEnableMatch = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_ENABLE_MATCH"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/matchReducer.js":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/matchReducer.js ***!
  \**********************************************************************************************/
/*! exports provided: selectedMatch, matchList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedMatch", function() { return selectedMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchList", function() { return matchList; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedMatch = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_MATCH"]](state, action) {
    return action.data;
  }
});
const matchList = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_MATCH_LIST"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/oddsGroupsReducer.js":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/oddsGroupsReducer.js ***!
  \***************************************************************************************************/
/*! exports provided: selectedOddsGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedOddsGroup", function() { return selectedOddsGroup; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedOddsGroup = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_OODS_GROUP"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/platformReducer.js":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/platformReducer.js ***!
  \*************************************************************************************************/
/*! exports provided: selectedPlatform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedPlatform", function() { return selectedPlatform; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const selectedPlatform = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_PLATFORM"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/sportReducer.js":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/bettingticketscenter/running/reducers/sportReducer.js ***!
  \**********************************************************************************************/
/*! exports provided: selectedSport, sportList, isEnableLeague */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedSport", function() { return selectedSport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sportList", function() { return sportList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnableLeague", function() { return isEnableLeague; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/bettingticketscenter/running/actions/types.js");
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
const isEnableLeague = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_ENABLE_LEAGUE"]](state, action) {
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
//# sourceMappingURL=running.chunk.js.map