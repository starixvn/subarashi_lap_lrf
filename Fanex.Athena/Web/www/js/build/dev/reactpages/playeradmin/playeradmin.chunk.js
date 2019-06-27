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
/******/ 			if(installedChunks[chunkId]) {
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
/******/ 		"www/js/build/dev/reactpages/playeradmin/playeradmin": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/playeradmin/components/index.jsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/***/ "./www/js/source/reactpages/actions/loaderAction.js":
/*!**********************************************************!*\
  !*** ./www/js/source/reactpages/actions/loaderAction.js ***!
  \**********************************************************/
/*! exports provided: toggleLoader */
=======
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/commonAction.js":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/commonAction.js ***!
  \****************************************************************************************/
/*! exports provided: setSelectedPlayer */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleLoader", function() { return toggleLoader; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var toggleLoader = function toggleLoader(show) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["TOGGLE_LOADER"],
    data: show
=======
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedPlayer", function() { return setSelectedPlayer; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");

var setSelectedPlayer = function setSelectedPlayer(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_PLAYER"],
    data: data
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
  };
};

/***/ }),

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/***/ "./www/js/source/reactpages/actions/types.js":
/*!***************************************************!*\
  !*** ./www/js/source/reactpages/actions/types.js ***!
  \***************************************************/
/*! exports provided: FETCH_DATA, SET_GRID_DATA, SET_SELECTED_PRODUCT, SET_SELECTED_BASECURRENCY, SET_BASECURRENCY_LIST, SET_SELECTED_CURRENCY, TOGGLE_LOADER, CHANGE_IS_EXCLUDE_TEST, USER_GUIDE_CONTENT, SET_DATE_RANGE, GET_DATE_CONSTRAINT, CHANGE_IS_CONVERT_ALL, SET_SELECTED_STATUS, SET_SELECTED_PLATFORM, SET_SELECTED_LIVESTATUS, SET_USERNAME, SET_REQUEST_PARAM, SET_REPORT_TITLE */
=======
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/filterHandlerAction.js":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/filterHandlerAction.js ***!
  \***********************************************************************************************/
/*! exports provided: searchPlayer, setParam, setAdvancedSearch, setCollapseFilter */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
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
var FETCH_DATA = 'FETCH_DATA';
var SET_GRID_DATA = "SET_GRID_DATA";
/* Product */
=======
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchPlayer", function() { return searchPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParam", function() { return setParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAdvancedSearch", function() { return setAdvancedSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCollapseFilter", function() { return setCollapseFilter; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
/* harmony import */ var _lib_playerListService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/playerListService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerListService.js");
/* harmony import */ var _commonAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commonAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/commonAction.js");
/* harmony import */ var _gridHandlerAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gridHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridHandlerAction.js");


>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
var SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";
/* Base Currency */

var SET_SELECTED_BASECURRENCY = "SET_SELECTED_BASECURRENCY";
var SET_BASECURRENCY_LIST = "SET_BASECURRENCY_LIST";
/* Currency */
=======
var searchPlayer = function searchPlayer(param) {
  return function (dispatch) {
    var service = new _lib_playerListService__WEBPACK_IMPORTED_MODULE_1__["default"]();
    service.getPlayerList(param).then(function (result) {
      var playerList = result.playerList;
      dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_3__["setPlayerList"])(playerList));

      if (playerList.length === 0) {
        dispatch(Object(_commonAction__WEBPACK_IMPORTED_MODULE_2__["setSelectedPlayer"])(null));
      } else if (playerList.length === 1) {
        dispatch(Object(_commonAction__WEBPACK_IMPORTED_MODULE_2__["setSelectedPlayer"])(playerList[0]));
      }
    });
  };
};
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

var SET_SELECTED_CURRENCY = "SET_SELECTED_CURRENCY";
/* Loader */

var TOGGLE_LOADER = "TOGGLE_LOADER";
/* Exclude Test Data */
=======
var setParam = function setParam(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_PARAM"],
    data: data
  };
};
var setAdvancedSearch = function setAdvancedSearch(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_ADVANCED_SEARCH"],
    data: data
  };
};
var setCollapseFilter = function setCollapseFilter(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_COLLAPSE_FILTER"],
    data: data
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridHandlerAction.js":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridHandlerAction.js ***!
  \*********************************************************************************************/
/*! exports provided: setDisplayedColumnList, setPlayerList, setCurrentActivePlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDisplayedColumnList", function() { return setDisplayedColumnList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPlayerList", function() { return setPlayerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCurrentActivePlayer", function() { return setCurrentActivePlayer; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");

var setDisplayedColumnList = function setDisplayedColumnList(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_DISPLAYED_COLUMN_LIST"],
    data: data
  };
};
var setPlayerList = function setPlayerList(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_PLAYER_LIST"],
    data: data
  };
};
var setCurrentActivePlayer = function setCurrentActivePlayer(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_CURRENT_ACTIVE_PLAYER"],
    data: data
  };
};
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

var CHANGE_IS_EXCLUDE_TEST = "CHANGE_IS_EXCLUDE_TEST";
/* User mini guide */

var USER_GUIDE_CONTENT = "USER_GUIDE_CONTENT;";
/* Date range */

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
var SET_DATE_RANGE = 'SET_DATE_RANGE';
var GET_DATE_CONSTRAINT = 'GET_DATE_CONSTRAINT';
/* Convert all figures to base currency */
=======
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _filterHandlerAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/filterHandlerAction.js");
/* harmony import */ var _playerDetailHandlerAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerDetailHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/playerDetailHandlerAction.js");
/* harmony import */ var _commonAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commonAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/commonAction.js");
/* harmony import */ var _gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gridHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridHandlerAction.js");
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

var CHANGE_IS_CONVERT_ALL = "CHANGE_IS_CONVERT_ALL";
/* Status */

var SET_SELECTED_STATUS = "SET_SELECTED_STATUS";
/* Platform  */

var SET_SELECTED_PLATFORM = "SET_SELECTED_PLATFORM";
/* Live Status  */

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
var SET_SELECTED_LIVESTATUS = "SET_SELECTED_LIVESTATUS";
var SET_USERNAME = "SET_USERNAME";
var SET_REQUEST_PARAM = "SET_REQUEST_PARAM";
var SET_REPORT_TITLE = "SET_REPORT_TITLE";
=======

var ActionCreators = Object.assign({}, _actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__, _commonAction__WEBPACK_IMPORTED_MODULE_3__, _filterHandlerAction__WEBPACK_IMPORTED_MODULE_1__, _playerDetailHandlerAction__WEBPACK_IMPORTED_MODULE_2__, _gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__);
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

/***/ }),

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/***/ "./www/js/source/reactpages/components/Loader.jsx":
/*!********************************************************!*\
  !*** ./www/js/source/reactpages/components/Loader.jsx ***!
  \********************************************************/
/*! exports provided: default */
=======
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/playerDetailHandlerAction.js":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/playerDetailHandlerAction.js ***!
  \*****************************************************************************************************/
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/*! exports provided: getLink, getTabList */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
/*! exports provided: getLink, getTabList, setSelectedPlayerIdList */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
/*! exports provided: getLink, getTabList, setSelectedPlayerIdList, setSelectedTabName */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
=======
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLink", function() { return getLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTabList", function() { return getTabList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedPlayerIdList", function() { return setSelectedPlayerIdList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedTabName", function() { return setSelectedTabName; });
/* harmony import */ var _lib_playerListService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/playerListService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerListService.js");
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");

>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js


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
var getTabList = function getTabList() {
  return function () {
    var service = new _lib_playerListService__WEBPACK_IMPORTED_MODULE_0__["default"]();
    return service.getTabList();
  };
};
var setSelectedPlayerIdList = function setSelectedPlayerIdList(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["SET_SELECTED_PLAYERID_LIST"],
    data: data
  };
};
var setSelectedTabName = function setSelectedTabName(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["SET_SELECTED_TAB_NAME"],
    data: data
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Loader);

/***/ }),

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/***/ "./www/js/source/reactpages/constants/config.js":
/*!******************************************************!*\
  !*** ./www/js/source/reactpages/constants/config.js ***!
  \******************************************************/
/*! exports provided: debuggingConfig */
=======
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js ***!
  \*********************************************************************************/
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/*! exports provided: SET_PARAM, SET_PLAYER_LIST, SET_SELECTED_PLAYER */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
/*! exports provided: SET_PARAM, SET_PLAYER_LIST, SET_SELECTED_PLAYER, SET_SELECTED_PLAYERID_LIST */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
/*! exports provided: SET_PARAM, SET_PLAYER_LIST, SET_SELECTED_PLAYER, SET_SELECTED_PLAYERID_LIST, SET_ADVANCED_SEARCH, SET_COLLAPSE_FILTER, SET_DISPLAYED_COLUMN_LIST, SET_CURRENT_ACTIVE_PLAYER, SET_SELECTED_TAB_NAME */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debuggingConfig", function() { return debuggingConfig; });
var debuggingConfig = {
  name: "__lrfConfig__",
  env: "local"
};
=======
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PARAM", function() { return SET_PARAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PLAYER_LIST", function() { return SET_PLAYER_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_PLAYER", function() { return SET_SELECTED_PLAYER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_PLAYERID_LIST", function() { return SET_SELECTED_PLAYERID_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ADVANCED_SEARCH", function() { return SET_ADVANCED_SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_COLLAPSE_FILTER", function() { return SET_COLLAPSE_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_DISPLAYED_COLUMN_LIST", function() { return SET_DISPLAYED_COLUMN_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENT_ACTIVE_PLAYER", function() { return SET_CURRENT_ACTIVE_PLAYER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_TAB_NAME", function() { return SET_SELECTED_TAB_NAME; });
var SET_PARAM = 'PLAYER_ADMIN/SET_PARAM';
var SET_PLAYER_LIST = 'PLAYER_ADMIN/SET_PLAYER_LIST';
var SET_SELECTED_PLAYER = 'PLAYER_ADMIN/SET_SELECTED_PLAYER';
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
var SET_SELECTED_PLAYERID_LIST = 'PLAYER_ADMIN/SET_SELECTED_PLAYERID_LIST';
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
var SET_ADVANCED_SEARCH = 'PLAYER_ADMIN/SET_ADVANCED_SEARCH';
var SET_COLLAPSE_FILTER = 'PLAYER_ADMIN/SET_COLLAPSE_FILTER';
var SET_DISPLAYED_COLUMN_LIST = 'PLAYER_ADMIN/SET_DISPLAYED_COLUMN_LIST';
var SET_CURRENT_ACTIVE_PLAYER = 'PLAYER_ADMIN/SET_CURRENT_ACTIVE_PLAYER';
var SET_SELECTED_TAB_NAME = 'PLAYER_ADMIN/SET_SELECTED_TAB_NAME';
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

/***/ }),

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/***/ "./www/js/source/reactpages/constants/integrationInfo.js":
/*!***************************************************************!*\
  !*** ./www/js/source/reactpages/constants/integrationInfo.js ***!
  \***************************************************************/
/*! exports provided: mode, currentMode, tokenUrlTemplate, apiInfo, systemType, playerMenuList */
=======
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AdvancedSearch.jsx":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AdvancedSearch.jsx ***!
  \**********************************************************************************************/
/*! exports provided: AdvancedSearch, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvancedSearch", function() { return AdvancedSearch; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-multiselect */ "./node_modules/@9softstudio/react-multiselect/dist/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var AdvancedSearch =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AdvancedSearch, _PureComponent);

  function AdvancedSearch(props) {
    var _this;

    _classCallCheck(this, AdvancedSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AdvancedSearch).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (name, value) {
      _this.props.onChange(name, value);
    });

    _this.currencyList = [{
      Id: 'eur',
      Value: 'EUR',
      Status: true
    }, {
      Id: 'usd',
      Value: 'usd',
      Status: true
    }];
    _this.oddsGroupList = [{
      Id: 'A',
      Value: 'A',
      Status: true
    }, {
      Id: 'B',
      Value: 'B',
      Status: true
    }, {
      Id: 'C',
      Value: 'C',
      Status: true
    }];
    _this.specialLevelList = [{
      Id: '1',
      Value: '1',
      Status: true
    }, {
      Id: '2',
      Value: '2',
      Status: true
    }];
    _this.baStatusList = [{
      Id: 'On',
      Value: 'On',
      Status: true
    }, {
      Id: 'Off',
      Value: 'Off',
      Status: true
    }];
    return _this;
  }

  _createClass(AdvancedSearch, [{
    key: "_createSelectData",
    value: function _createSelectData(originalList, selectedItemString) {
      if (selectedItemString === '') {
        return _toConsumableArray(originalList);
      }

      var selectedItemList = selectedItemString.split(',').filter(function (x) {
        return x !== '';
      });
      return originalList.map(function (item) {
        var Id = item.Id,
            Value = item.Value;
        return {
          Id: Id,
          Value: Value,
          Status: selectedItemList.indexOf(Id) !== -1
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$param = this.props.param,
          currency = _this$props$param.currency,
          oddsGroup = _this$props$param.oddsGroup,
          specialLevel = _this$props$param.specialLevel,
          baStatus = _this$props$param.baStatus;

      var currencyList = this._createSelectData(this.currencyList, currency);

      var oddsGroupList = this._createSelectData(this.oddsGroupList, oddsGroup);

      var specialLevelList = this._createSelectData(this.specialLevelList, specialLevel);

      var baStatusList = this._createSelectData(this.baStatusList, baStatus);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, "Currency"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
        id: "currency",
        dataSource: currencyList,
        keyField: "Id",
        valueField: "Value",
        statusField: "Status",
        onChange: function onChange(currentItem, selectedItemsKey) {
          return _this2.handleChange('currency', selectedItemsKey);
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, "Odds Group"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
        id: "oddsGroup",
        dataSource: oddsGroupList,
        keyField: "Id",
        valueField: "Value",
        statusField: "Status",
        onChange: function onChange(currentItem, selectedItemsKey) {
          return _this2.handleChange('oddsGroup', selectedItemsKey);
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, "Special Level"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
        id: "specialLevel",
        dataSource: specialLevelList,
        keyField: "Id",
        valueField: "Value",
        statusField: "Status",
        onChange: function onChange(currentItem, selectedItemsKey) {
          return _this2.handleChange('specialLevel', selectedItemsKey);
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, "BA"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
        id: "baStatus",
        dataSource: baStatusList,
        keyField: "Id",
        valueField: "Value",
        statusField: "Status",
        onChange: function onChange(currentItem, selectedItemsKey) {
          return _this2.handleChange('baStatus', selectedItemsKey);
        }
      }))));
    }
  }]);

  return AdvancedSearch;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
var propTypes = {
  param: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    currency: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
    oddsGroup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
    specialLevel: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
    baStatus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
  }).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};
AdvancedSearch.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (AdvancedSearch);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AppContainer.jsx":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AppContainer.jsx ***!
  \********************************************************************************************/
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/*! exports provided: default */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
/*! exports provided: AppContainer, default */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mode", function() { return mode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentMode", function() { return currentMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenUrlTemplate", function() { return tokenUrlTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiInfo", function() { return apiInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemType", function() { return systemType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerMenuList", function() { return playerMenuList; });
var mode = {
  self: 'Self',
  parasitic: 'Parasitic'
=======
=======
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Content */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/Content.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/FormFilter.jsx");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _layouts_AppLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _PlayerDetail__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PlayerDetail */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/PlayerDetail.jsx");
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }










var AppContainer = function AppContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_7__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
    isLoading: props.isLoading
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PlayerDetail__WEBPACK_IMPORTED_MODULE_8__["default"], null));
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
};
var currentMode = window.__lrf && window.__lrf.modules && window.__lrf.modules.playerAdmin && window.__lrf.modules.playerAdmin.mode;
var pageConfig = window.__pageConfig;
var tokenUrlTemplate = pageConfig && pageConfig.tokenUrl;
var apiInfo = pageConfig && pageConfig.apiInfo;
var systemType = {
  internal: 0,
  lrf: 1,
  affiliate: 2,
  newAdmin: 3
};
var playerMenuList = [{
  Name: 'AccountInfo',
  Text: 'Account Info',
  Action: 'PlayerAccountInfo',
  SystemType: systemType.lrf
}, {
  Name: 'Statement',
  Text: 'Statement',
  Action: 'PlayerStatement',
  SystemType: systemType.lrf
}, {
  Name: 'BetList',
  Text: 'Bet List',
  Action: 'PlayerBetList',
  SystemType: systemType.lrf
}];
=======
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PlayerDetail__WEBPACK_IMPORTED_MODULE_8__["default"], null));
};

function mapDispatchToProps(dispatch) {
  _objectDestructuringEmpty(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"]);

  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  var isLoading = state.isLoading;
  return Object.assign({}, {
    isLoading: isLoading
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AppContainer)));
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

/***/ }),

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/***/ "./www/js/source/reactpages/layouts/AppLayout.jsx":
/*!********************************************************!*\
  !*** ./www/js/source/reactpages/layouts/AppLayout.jsx ***!
  \********************************************************/
/*! exports provided: default */
=======
=======
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AthenaSearch.jsx":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AthenaSearch.jsx ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var AthenaSearch = function AthenaSearch(props) {
  var bankAccountNumber = props.bankAccountNumber,
      email = props.email,
      onChange = props.onChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, "Bank Account Number"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "input-text",
    id: "bankAccountNumber",
    name: "bankAccountNumber",
    type: "text",
    value: bankAccountNumber,
    autoComplete: "off",
    onChange: onChange
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, "Email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "input-text",
    id: "email",
    name: "email",
    type: "text",
    value: email,
    autoComplete: "off",
    onChange: onChange
  }))));
};

var propTypes = {
  bankAccountNumber: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  email: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
AthenaSearch.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AthenaSearch));

/***/ }),

>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/BatchUpdateButton.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/BatchUpdateButton.jsx ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var BatchUpdateButton = function BatchUpdateButton(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var handleToggleDropdown = function handleToggleDropdown() {
    setIsOpen(!isOpen);
  };

  var handleClose = function handleClose() {
    setIsOpen(false);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownButton"], {
    isOpen: isOpen,
    onToggle: handleToggleDropdown,
    buttonLabel: 'Batch Update',
    onClose: handleClose
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], null, "Item1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], null, "Item2"));
};

/* harmony default export */ __webpack_exports__["default"] = (BatchUpdateButton);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/Content.jsx":
/*!***************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/Content.jsx ***!
  \***************************************************************************************/
/*! exports provided: Content, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Content", function() { return Content; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _GridCaption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GridCaption */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/GridCaption.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/DataGrid.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Content =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Content, _React$PureComponent);

  function Content(props) {
    var _this;

    _classCallCheck(this, Content);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Content).call(this, props));
    _this.state = {
      pagingOption: {
        PageIndex: 1,
        PageSize: 50,
        PageList: [50, 100, 200, 500],
        TotalItem: 1000
      }
    };
    return _this;
  }

  _createClass(Content, [{
    key: "render",
    value: function render() {
      var playerList = this.props.playerList;
      var pagingOption = this.state.pagingOption;
      return playerList && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "result-content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Pager"], {
        pageOption: pagingOption
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridCaption__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], null));
    }
  }]);

  return Content;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  var playerList = state.playerList;
  return Object.assign({}, {
    playerList: playerList
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Content));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/ContextMenu.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/ContextMenu.jsx ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _components_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var ContextMenu = function ContextMenu(props) {
  var position = props.position,
      isOpenContextMenu = props.isOpenContextMenu,
      setSelectedPlayer = props.setSelectedPlayer,
      currentActivePlayer = props.currentActivePlayer,
      setSelectedTabName = props.setSelectedTabName,
      getTabList = props.getTabList;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var handleMouseEnter = function handleMouseEnter() {
    setIsOpen(true);
  };

  var handleMouseLeave = function handleMouseLeave() {
    setIsOpen(isOpenContextMenu);
  };

  var handleClickMenu = function handleClickMenu(tabName) {
    setSelectedTabName(tabName);
    setSelectedPlayer(_objectSpread({}, currentActivePlayer));
  };

  var style = position && {
    top: position.y,
    left: position.x - 10
  };
  var tabList = getTabList();
  var activeMenuList = _lib_constants__WEBPACK_IMPORTED_MODULE_5__["contextMenuList"].filter(function (item) {
    return !!tabList.find(function (t) {
      return item.tabName === t.Name;
    });
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown context-menu",
    style: style
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_4__["DropdownMenu"], {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    isOpen: isOpenContextMenu || isOpen
  }, activeMenuList.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_4__["DropdownItem"], {
      key: item.key,
      onClick: function onClick() {
        return handleClickMenu(item.tabName);
      }
    }, item.name);
  })));
};

function mapDispatchToProps(dispatch) {
  var setSelectedPlayer = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setSelectedPlayer,
      setSelectedTabName = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setSelectedTabName,
      getTabList = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].getTabList;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setSelectedPlayer: setSelectedPlayer,
    setSelectedTabName: setSelectedTabName,
    getTabList: getTabList
  }, dispatch);
}

function mapStateToProps(state) {
  var currentActivePlayer = state.currentActivePlayer;
  return Object.assign({}, {
    currentActivePlayer: currentActivePlayer
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(ContextMenu)));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/DataGrid.jsx":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/DataGrid.jsx ***!
  \****************************************************************************************/
/*! exports provided: DataGrid, default */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
=======
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony import */ var _components_ReportTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _components_Switcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/Switcher */ "./www/js/source/reactpages/components/Switcher.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @9softstudio/react-multiselect */ "./node_modules/@9softstudio/react-multiselect/dist/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _BatchUpdateButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./BatchUpdateButton */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/BatchUpdateButton.jsx");
/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ContextMenu */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/ContextMenu.jsx");
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
/* harmony import */ var _components_Switcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/Switcher */ "./www/js/source/reactpages/components/Switcher.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ContextMenu */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/ContextMenu.jsx");
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ContextMenu */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/ContextMenu.jsx");
/* harmony import */ var _SpecialLevelDropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SpecialLevelDropdown */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/SpecialLevelDropdown.jsx");
/* harmony import */ var _lib_dataReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../lib/dataReducer */ "./www/js/source/reactpages/lib/dataReducer.js");
/* harmony import */ var _lib_gridHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/gridHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridHelper.js");
/* harmony import */ var _OddsGroupDropdown_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./OddsGroupDropdown.jsx */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/OddsGroupDropdown.jsx");
/* harmony import */ var _grid_PlayerRow_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./grid/PlayerRow.jsx */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/PlayerRow.jsx");
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
var AppLayout =
=======







var MAX_WIDTH_PAGE = 1920;
var DataGrid =
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/*#__PURE__*/
function (_Component) {
  _inherits(AppLayout, _Component);

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
  function AppLayout(props) {
    _classCallCheck(this, AppLayout);

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
    return _possibleConstructorReturn(this, _getPrototypeOf(AppLayout).call(this, props));
  }

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
  _createClass(AppLayout, [{
=======
=======
    _defineProperty(_assertThisInitialized(_this), "_handleSelectPlayer", function (event, playerInfo) {
      event.preventDefault();
      var player = {
        custId: playerInfo.CustId,
        userName: playerInfo.UserName,
        currency: playerInfo.Currency
      };

      _this.props.setSelectedPlayer(player);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleCheckPlayer", function (custId) {
      var selectedPlayerIdList = _this.props.selectedPlayerIdList;
      var newIdList = selectedPlayerIdList.includes(custId) ? selectedPlayerIdList.filter(function (item) {
        return item !== custId;
      }) : [].concat(_toConsumableArray(selectedPlayerIdList), [custId]);

      _this.props.setSelectedPlayerIdList(newIdList);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleChangeBaStatus", function (e) {
      console.log(e.target);
    });

=======
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
    _defineProperty(_assertThisInitialized(_this), "handleEnterContextMenu", function (event) {
      var isOpenContextMenu = _this.state.isOpenContextMenu;

      if (!isOpenContextMenu) {
        var rect = event.target.getBoundingClientRect();
        var position = {
          x: rect.left,
          y: rect.top
        };

        _this.setState({
          contextMenuPosition: position,
          isOpenContextMenu: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLeaveContextMenu", function () {
      window.setTimeout(function () {
        if (_this.state.isOpenContextMenu) {
          _this.setState({
            isOpenContextMenu: false
          });
        }
      }, 10);
    });

    _defineProperty(_assertThisInitialized(_this), "handleToggleSpecialLevel", function (event) {
      _this._handlerToggleDropdownLabel(event, 'specialLevelDropdownPosition');
    });

    _defineProperty(_assertThisInitialized(_this), "handleToggleOddsGroup", function (event) {
      _this._handlerToggleDropdownLabel(event, 'oddsGroupDropdownPosition');
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeUpdatePlayerItem", function (custId, value, fieldName) {
      var _this$props = _this.props,
          playerList = _this$props.playerList,
          setPlayerList = _this$props.setPlayerList;
      var itemIndex = playerList.findIndex(function (x) {
        return x.CustId === custId;
      });

      var newPlayerItem = _objectSpread({}, playerList[itemIndex], _defineProperty({}, fieldName, value));

      var newPlayerList = Object(_lib_dataReducer__WEBPACK_IMPORTED_MODULE_7__["updateObjectInArray"])(playerList, itemIndex, newPlayerItem);
      setPlayerList(newPlayerList);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeBaStatus", function (custId, value) {
      _this.handleChangeUpdatePlayerItem(custId, value, 'BaStatus');
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeOddsGroup", function (event, value) {
      event.preventDefault();
      var currentActivePlayer = _this.props.currentActivePlayer;

      if (currentActivePlayer) {
        _this.handleChangeUpdatePlayerItem(currentActivePlayer.custId, value, 'OddsGroup');

        _this.handleToggleOddsGroup();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeSpecialLevel", function (event, value) {
      event.preventDefault();
      var currentActivePlayer = _this.props.currentActivePlayer;

      if (currentActivePlayer) {
        _this.handleChangeUpdatePlayerItem(currentActivePlayer.custId, value, 'SpecialLevel');

        _this.handleToggleSpecialLevel();
      }
    });

    _this.maxWidth = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
    _this.state = {
      isOpenContextMenu: false,
      contextMenuPosition: null,
      specialLevelDropdownPosition: null,
      oddsGroupDropdownPosition: null
    };
    return _this;
  }

  _createClass(DataGrid, [{
    key: "_buildDisplayedColumn",
    value: function _buildDisplayedColumn() {
      var displayedColumnList = this.props.displayedColumnList;
      return displayedColumnList.reduce(function (accumulator, currentItem) {
        accumulator[currentItem.key] = currentItem.show;
        return accumulator;
      }, {});
    }
  }, {
    key: "_renderDataSection",
    value: function _renderDataSection(dataList, displayedColumn) {
      var dataRows = [];

      for (var i = 0; i < dataList.length; i++) {
        var dataItem = dataList[i];
        var isChecked = this.props.selectedPlayerIdList.includes(dataItem.CustId);
        var rowProps = {
          dataItem: dataItem,
          isChecked: isChecked,
          displayedColumn: displayedColumn,
          handleChangeBaStatus: this.handleChangeBaStatus,
          handleEnterContextMenu: this.handleEnterContextMenu,
          handleLeaveContextMenu: this.handleLeaveContextMenu,
          handleToggleOddsGroup: this.handleToggleOddsGroup,
          handleToggleSpecialLevel: this.handleToggleSpecialLevel
        };
        dataRows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grid_PlayerRow_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], _extends({
          key: dataItem.CustId
        }, rowProps)));
      }

      return dataRows;
    }
  }, {
    key: "_handlerToggleDropdownLabel",
    value: function _handlerToggleDropdownLabel(event, stateName) {
      var currentPosition = this.state[stateName];

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn-default btn-link username-link",
        onClick: function onClick(e) {
          return _this2._handleSelectPlayer(e, dataItem);
        }
      }, dataItem.UserName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn-default btn-link btn-icon cell-menu",
        onMouseEnter: this.handleEnterContextMenu,
        onMouseLeave: this.handleLeaveContextMenu
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "material-icons"
      }, "edit")));
    }
  }, {
    key: "_buildOddsGroupCell",
    value: function _buildOddsGroupCell(selectedOddsGroup) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "select-default select-oddsgroup",
        value: selectedOddsGroup,
        onChange: function onChange(e) {
          return console.log(e);
        }
      }, Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["oddsGroupListWithStyle"]).map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: item,
          style: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["oddsGroupListWithStyle"][item]
        }, item);
      }));
    }
  }, {
    key: "_buildSpecialLevelCell",
    value: function _buildSpecialLevelCell(selectedSpecialLevel) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "select-default select-special-level",
        value: selectedSpecialLevel,
        onChange: function onChange(e) {
          return console.log(e);
        }
      }, this.specialLevelList.map(function (item) {
        var style = {
          backgroundColor: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["specialLevelListWithColor"][item.value]
        };
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: item.value,
          style: style
        }, item.label);
      }));
    }
  }, {
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "container",
        className: "container-fluid"
      }, this.props.children);
=======
    key: "_buildReportTitleContent",
    value: function _buildReportTitleContent() {
=======
    key: "_buildDataRow",
    value: function _buildDataRow(dataItem, isChecked) {
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: dataItem.CustId
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        checked: isChecked,
        onChange: function onChange() {
          return _this3._handleCheckPlayer(dataItem.CustId);
        }
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, dataItem.Status), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, this._buildUserNameCell(dataItem)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, dataItem.SystemId), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, dataItem.Currency), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, dataItem.CurrentBalance), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, dataItem.OutstandingBalance), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, this._buildOddsGroupCell(dataItem.OddsGroup)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Switcher__WEBPACK_IMPORTED_MODULE_5__["default"], {
        checked: dataItem.BaStatus,
        onChange: this._handleChangeBaStatus
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, this._buildSpecialLevelCell(dataItem.SpecialLevel)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, dataItem.LastTransaction), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "center-align"
      }, dataItem.Email));
=======
      if (currentPosition) {
        this.setState(_defineProperty({}, stateName, null));
      } else {
        var rect = event.target.getBoundingClientRect();
        var position = {
          x: rect.left,
          y: rect.top
        };
        this.setState(_defineProperty({}, stateName, position));
      }
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          playerList = _this$props2.playerList,
          selectedPlayer = _this$props2.selectedPlayer;
      var _this$state = this.state,
          contextMenuPosition = _this$state.contextMenuPosition,
          isOpenContextMenu = _this$state.isOpenContextMenu,
          specialLevelDropdownPosition = _this$state.specialLevelDropdownPosition,
          oddsGroupDropdownPosition = _this$state.oddsGroupDropdownPosition;
      var dataList = selectedPlayer ? [playerList.find(function (item) {
        return item.CustId === selectedPlayer.custId;
      })] : playerList;

      var displayedColumn = this._buildDisplayedColumn();

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Table"], {
        minWidth: 650,
        autoWidth: true,
        maxWidth: this.maxWidth,
        autoHeight: false,
        bodyHeight: 300,
        adjustedHeight: 32,
        header: _lib_gridHelper__WEBPACK_IMPORTED_MODULE_8__["default"].renderHeader(displayedColumn),
        body: this._renderDataSection(dataList, displayedColumn),
        containerPadding: 30
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ContextMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
        isOpenContextMenu: isOpenContextMenu,
        position: contextMenuPosition
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SpecialLevelDropdown__WEBPACK_IMPORTED_MODULE_6__["default"], {
        position: specialLevelDropdownPosition,
        onClose: this.handleToggleSpecialLevel,
        onChange: this.handleChangeSpecialLevel
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OddsGroupDropdown_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
        position: oddsGroupDropdownPosition,
        onClose: this.handleToggleOddsGroup,
        onChange: this.handleChangeOddsGroup
      }));
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
    }
  }]);

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
  return AppLayout;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

=======
  return DataGrid;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapDispatchToProps(dispatch) {
  var setSelectedPlayerIdList = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setSelectedPlayerIdList,
      setPlayerList = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setPlayerList,
      setCurrentActivePlayer = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setCurrentActivePlayer;
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    setSelectedPlayerIdList: setSelectedPlayerIdList,
    setPlayerList: setPlayerList,
    setCurrentActivePlayer: setCurrentActivePlayer
  }, dispatch);
}

function mapStateToProps(state) {
  var playerList = state.playerList,
      selectedPlayer = state.selectedPlayer,
      selectedPlayerIdList = state.selectedPlayerIdList,
      displayedColumnList = state.displayedColumnList,
      currentActivePlayer = state.currentActivePlayer;
  return Object.assign({}, {
    playerList: playerList,
    selectedPlayer: selectedPlayer,
    selectedPlayerIdList: selectedPlayerIdList,
    displayedColumnList: displayedColumnList,
    currentActivePlayer: currentActivePlayer
  });
}
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js


/***/ }),

/***/ "./www/js/source/reactpages/lib/createReducer.js":
/*!*******************************************************!*\
  !*** ./www/js/source/reactpages/lib/createReducer.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createReducer; });
function createReducer(initialState, handlers) {
  return function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
=======
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _AdvancedSearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AdvancedSearch */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AdvancedSearch.jsx");
/* harmony import */ var _SearchOption__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SearchOption */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/SearchOption.jsx");
/* harmony import */ var _AthenaSearch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AthenaSearch */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AthenaSearch.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/UserGuide */ "./www/js/source/reactpages/components/UserGuide.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

/***/ }),

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/***/ "./www/js/source/reactpages/lib/integrationService.js":
/*!************************************************************!*\
  !*** ./www/js/source/reactpages/lib/integrationService.js ***!
  \************************************************************/
/*! exports provided: isValidMode, getActionLink, getApiActionLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
=======
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidMode", function() { return isValidMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActionLink", function() { return getActionLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApiActionLink", function() { return getApiActionLink; });
/* harmony import */ var _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/integrationInfo */ "./www/js/source/reactpages/constants/integrationInfo.js");
/* harmony import */ var _site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./site */ "./www/js/source/reactpages/lib/site.js");

=======
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

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (event) {
      event.preventDefault();

      _this.props.setSelectedPlayer(null);

      _this.props.searchPlayer(_objectSpread({}, _this.state));

      console.log(_this.state);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      _this.setState(_defineProperty({}, name, value));
    });

    _defineProperty(_assertThisInitialized(_this), "handleAdvancedSearchChange", function (name, value) {
      _this.setState(_defineProperty({}, name, value));
    });

    _this.state = {
      userName: '',
      bankAccountNumber: '',
      email: '',
      currency: '',
      oddsGroup: '',
      specialLevel: '',
      baStatus: ''
    };
    _this.userGuide = _this._renderUserGuide();
    return _this;
  }

  _createClass(FormFilter, [{
    key: "showUserGuide",
    value: function showUserGuide() {}
  }, {
    key: "_renderUserGuide",
    value: function _renderUserGuide() {
      var userGuideContent = '';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_10__["default"], {
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("UserGuide"),
        contentTitle: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource(""),
        onClick: this.showUserGuide,
        content: userGuideContent
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          userName = _this$state.userName,
          bankAccountNumber = _this$state.bankAccountNumber,
          email = _this$state.email,
          advancedSearchParam = _objectWithoutProperties(_this$state, ["userName", "bankAccountNumber", "email"]);

      var _this$props = this.props,
          type = _this$props.type,
          isAdvancedSearch = _this$props.isAdvancedSearch,
          isFilterCollapsing = _this$props.isFilterCollapsing;
      var iconToggle = {
        tag: 'div',
        className: isFilterCollapsing ? 'chevron down' : 'chevron up',
        style: {}
      };
      var iconContainerStyle = {
        height: '15px',
        width: '20px',
        cursor: 'pointer',
        position: 'absolute',
        left: 'calc(50% - 10px)',
        bottom: 0,
        paddingLeft: 5,
        background: '#4c6274'
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "page-filter",
        iconToggle: iconToggle,
        iconContainerStyle: iconContainerStyle,
        onCollapse: function onCollapse() {
          return _this2.props.setCollapseFilter(true);
        },
        onExpand: function onExpand() {
          return _this2.props.setCollapseFilter(false);
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, "UserName ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchOption__WEBPACK_IMPORTED_MODULE_6__["default"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "input-text",
        id: "userName",
        name: "userName",
        type: "text",
        value: userName,
        autoComplete: "off",
        onChange: this.handleChange
      }))), type === _lib_constants__WEBPACK_IMPORTED_MODULE_8__["licenseeType"].nonApi && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AthenaSearch__WEBPACK_IMPORTED_MODULE_7__["default"], {
        onChange: this.handleChange,
        bankAccountNumber: bankAccountNumber,
        email: email
      }), isAdvancedSearch && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AdvancedSearch__WEBPACK_IMPORTED_MODULE_5__["default"], {
        param: advancedSearchParam,
        onChange: this.handleAdvancedSearchChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-2 col-sm-2 col-lg-1 col-xl-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "button-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "btn btn-submit",
        onClick: this.handleSubmit
      }, "Submit")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_4__["default"], {
        id: "isAdvancedSearch",
        checked: isAdvancedSearch,
        onChange: function onChange(checked) {
          return _this2.props.setAdvancedSearch(checked);
        },
        label: "Advanced Search"
      })))));
    }
  }]);
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

var isValidMode = function isValidMode() {
  return _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["currentMode"] === _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["mode"].parasitic && Identity && Identity.ApplyTokenUrl || _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["currentMode"] === _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["mode"].self;
};
var getActionLink = function getActionLink(type, action) {
  return _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["currentMode"] === _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["mode"].self ? _site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(action) : getExternalActionLink(type, action);
};

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
var getExternalActionLink = function getExternalActionLink(type, action) {
  return type === _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].newAdmin ? action : buildExternalActionLink(type, action);
};
=======
function mapDispatchToProps(dispatch) {
  var searchPlayer = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].searchPlayer,
      setSelectedPlayer = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setSelectedPlayer,
      setAdvancedSearch = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setAdvancedSearch,
      setCollapseFilter = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setCollapseFilter;
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    searchPlayer: searchPlayer,
    setSelectedPlayer: setSelectedPlayer,
    setAdvancedSearch: setAdvancedSearch,
    setCollapseFilter: setCollapseFilter
  }, dispatch);
}
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
var buildExternalActionLink = function buildExternalActionLink(type, action) {
  var applyTokenUrl = Identity && Identity.ApplyTokenUrl || '';
  return "".concat(applyTokenUrl, "?ActionLink=").concat(action, "&Type=").concat(type);
};

var getApiActionLink = function getApiActionLink(type, action) {
  return _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["currentMode"] === _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["mode"].self && type === _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].lrf ? _site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(action) : buildExternalApiActionLink(type, action);
};
=======
function mapStateToProps(state) {
  var type = state.type,
      isAdvancedSearch = state.isAdvancedSearch,
      isFilterCollapsing = state.isFilterCollapsing;
  return Object.assign({}, {
    type: type,
    isAdvancedSearch: isAdvancedSearch,
    isFilterCollapsing: isFilterCollapsing
  });
}
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

var buildExternalApiActionLink = function buildExternalApiActionLink(type, action) {
  return type === _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].newAdmin ? action : _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["tokenUrlTemplate"] && _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_0__["tokenUrlTemplate"].replace('{0}', encodeURIComponent(action)).replace('{1}', type);
};

/***/ }),

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/***/ "./www/js/source/reactpages/lib/logger.js":
/*!************************************************!*\
  !*** ./www/js/source/reactpages/lib/logger.js ***!
  \************************************************/
/*! exports provided: default */
=======
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/GridCaption.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/GridCaption.jsx ***!
  \*******************************************************************************************/
/*! exports provided: GridCaption, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridCaption", function() { return GridCaption; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _components_ReportTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @9softstudio/react-multiselect */ "./node_modules/@9softstudio/react-multiselect/dist/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _BatchUpdateButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BatchUpdateButton */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/BatchUpdateButton.jsx");
/* harmony import */ var _lib_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var GridCaption =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(GridCaption, _React$PureComponent);

  function GridCaption(props) {
    var _this;

    _classCallCheck(this, GridCaption);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GridCaption).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleChangeDisplayedColumn", function (currentItem, selectedItemsKey) {
      var _this$props = _this.props,
          displayedColumnList = _this$props.displayedColumnList,
          setDisplayedColumnList = _this$props.setDisplayedColumnList;
      var selectedKeyList = selectedItemsKey.split(',');
      var newColumnList = displayedColumnList.map(function (item) {
        var isShow = selectedKeyList.indexOf(item.key) !== -1;
        return item.show === isShow ? item : _objectSpread({}, item, {
          show: isShow
        });
      });
      setDisplayedColumnList(newColumnList);
    });

    return _this;
  }

  _createClass(GridCaption, [{
    key: "_buildDisplayedColumnList",
    value: function _buildDisplayedColumnList() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5___default.a, {
        id: "columnList",
        className: "selection-column",
        dataSource: this.props.displayedColumnList,
        keyField: "key",
        valueField: "value",
        statusField: "show",
        onChange: this.handleChangeDisplayedColumn
      });
    }
  }, {
    key: "_buildLeftPart",
    value: function _buildLeftPart() {
      var _this2 = this;

      var _this$props2 = this.props,
          selectedPlayer = _this$props2.selectedPlayer,
          selectedPlayerIdList = _this$props2.selectedPlayerIdList;

      if (selectedPlayer) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "link",
          onClick: function onClick() {
            return _this2.props.setSelectedPlayer(null);
          }
        }, "Previous search result"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "chevron right icon-separator"
        }), " Player: ", selectedPlayer.userName, " (", selectedPlayer.currency, ")"));
      } // For Phase 2
      // else if (selectedPlayerIdList.length > 0) {
      //     return (
      //         <>
      //             <BatchUpdateButton />
      //             <button className="btn-outline btn-outline-light" type="button">
      //                 {selectedPlayerIdList.length} Player(s) Selected <span className="close">&times;</span>
      //             </button>
      //         </>
      //     )
      // }
      else {
          var playerList = this.props.playerList;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            key: "searchResult"
          }, "Search Result: ".concat(playerList.length, " Player(s)"));
        }
    }
  }, {
    key: "_buildRightPart",
    value: function _buildRightPart() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "caret-block"
      }, this._buildDisplayedColumnList(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon-excel-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-excel",
        title: _lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource('ExportToExcel')
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var Content = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this._buildLeftPart(), this._buildRightPart());
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ReportTitle__WEBPACK_IMPORTED_MODULE_4__["default"], {
        tag: "div",
        content: Content
      });
    }
  }]);

  return GridCaption;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

function mapDispatchToProps(dispatch) {
  var setSelectedPlayer = _actions_index_js__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setSelectedPlayer,
      setDisplayedColumnList = _actions_index_js__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setDisplayedColumnList;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setSelectedPlayer: setSelectedPlayer,
    setDisplayedColumnList: setDisplayedColumnList
  }, dispatch);
}

function mapStateToProps(state) {
  var playerList = state.playerList,
      selectedPlayer = state.selectedPlayer,
      selectedPlayerIdList = state.selectedPlayerIdList,
      displayedColumnList = state.displayedColumnList;
  return Object.assign({}, {
    playerList: playerList,
    selectedPlayer: selectedPlayer,
    selectedPlayerIdList: selectedPlayerIdList,
    displayedColumnList: displayedColumnList
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(GridCaption));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/OddsGroupDropdown.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/OddsGroupDropdown.jsx ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");




var SpecialLevelDropdown = function SpecialLevelDropdown(props) {
  var position = props.position,
      onClose = props.onClose,
      onChange = props.onChange;
  var isOpen = position !== null;
  var style = position && {
    top: position.y + 20,
    left: position.x
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown oddsgroup-menu",
    style: style
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownMenu"], {
    isOpen: isOpen,
    onClose: onClose
  }, Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_2__["oddsGroupListWithStyle"]).map(function (item) {
    var style = _lib_constants__WEBPACK_IMPORTED_MODULE_2__["oddsGroupListWithStyle"][item];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], {
      key: item,
      className: "oddsgroup-item",
      style: style,
      onClick: function onClick(e) {
        return onChange(e, item);
      }
    }, item);
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(SpecialLevelDropdown));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/PlayerDetail.jsx":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/PlayerDetail.jsx ***!
  \********************************************************************************************/
/*! exports provided: PlayerDetail, default */
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Logger; });
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/config */ "./www/js/source/reactpages/constants/config.js");
=======
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerDetail", function() { return PlayerDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
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

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
var Logger =
=======

var PlayerDetail =
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/*#__PURE__*/
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
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
=======
function (_PureComponent) {
  _inherits(PlayerDetail, _PureComponent);

  function PlayerDetail(props) {
    var _this;

    _classCallCheck(this, PlayerDetail);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlayerDetail).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleClickMenu", function (event, tabName) {
      event.preventDefault();

      _this.props.setSelectedTabName(tabName);
    });

    _this._tabList = _this.props.getTabList();
    return _this;
  }

  _createClass(PlayerDetail, [{
    key: "_getDefaultSelectedTab",
    value: function _getDefaultSelectedTab() {
      return this._tabList && this._tabList.length && this._tabList[0].Name;
    }
  }, {
    key: "_buildActionUrl",
    value: function _buildActionUrl(systemType, action) {
      var selectedPlayer = this.props.selectedPlayer;
      var queryString = (action.indexOf('?') !== -1 ? '&custId=' : '?custId=') + selectedPlayer.custId;
      var urlByPlayer = action + queryString;
      return this.props.getLink(systemType, urlByPlayer);
    }
  }, {
    key: "_renderTabList",
    value: function _renderTabList(tabList) {
      var _this2 = this;

      var selectedTabName = this.props.selectedTabName || this._getDefaultSelectedTab();

      return tabList.map(function (item) {
        var actionUrl = _this2._buildActionUrl(item.SystemType, item.Action);

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "tab",
          key: item.Name
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: selectedTabName === item.Name ? "active" : "",
          href: actionUrl,
          onClick: function onClick(event) {
            return _this2.handleClickMenu(event, item.Name);
          }
        }, item.Text));
      });
    }
  }, {
    key: "_getFrameHeight",
    value: function _getFrameHeight() {
      var _this$props = this.props,
          isAdvancedSearch = _this$props.isAdvancedSearch,
          isFilterCollapsing = _this$props.isFilterCollapsing;
      var omittedHeight;

      if (isFilterCollapsing) {
        omittedHeight = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["heightSlicing"].whenCollapsing;
      } else {
        var key = isAdvancedSearch ? 'withAdvancedSearch' : 'default';
        omittedHeight = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["heightSlicing"][key];
      }

      return window.innerHeight - omittedHeight;
    }
  }, {
    key: "_getActionUrl",
    value: function _getActionUrl() {
      var selectedTabName = this.props.selectedTabName;
      var tabItem = selectedTabName ? this._tabList.find(function (t) {
        return t.Name === selectedTabName;
      }) : this._tabList[0];
      return tabItem && this._buildActionUrl(tabItem.SystemType, tabItem.Action);
    }
  }, {
    key: "render",
    value: function render() {
      var selectedPlayer = this.props.selectedPlayer;

      if (!selectedPlayer) {
        return null;
      }

      if (this._tabList.length === 0) {
        return null;
      }

      var src = this._getActionUrl();

      if (!src) {
        return;
      }

      var frameHeight = this._getFrameHeight();

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pa-detail-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-filter-tab"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header-tab"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-tab"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "tabs"
      }, this._renderTabList(this._tabList)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tab-panel"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pa-frame-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
        id: "paDetailFrame",
        style: {
          height: frameHeight
        },
        name: "paDetailFrame",
        frameBorder: "0",
        src: src
      })))));
    }
  }]);

  return PlayerDetail;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapDispatchToProps(dispatch) {
  var getLink = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].getLink,
      getTabList = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].getTabList,
      setSelectedTabName = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setSelectedTabName;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    getLink: getLink,
    getTabList: getTabList,
    setSelectedTabName: setSelectedTabName
  }, dispatch);
}

function mapStateToProps(state) {
  var selectedPlayer = state.selectedPlayer,
      isAdvancedSearch = state.isAdvancedSearch,
      isFilterCollapsing = state.isFilterCollapsing,
      selectedTabName = state.selectedTabName;
  return Object.assign({}, {
    selectedPlayer: selectedPlayer,
    isAdvancedSearch: isAdvancedSearch,
    isFilterCollapsing: isFilterCollapsing,
    selectedTabName: selectedTabName
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(PlayerDetail));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/SearchOption.jsx":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/SearchOption.jsx ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var SearchOption = function SearchOption(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var handleToggleDropdown = function handleToggleDropdown() {
    setIsOpen(!isOpen);
  };

  var handleClose = function handleClose() {
    setIsOpen(false);
  };

  var toggleButton = {
    className: 'toggle-outline toggle-outline-light'
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownButton"], {
    className: "search-option",
    isOpen: isOpen,
    toggleButton: toggleButton,
    onToggle: handleToggleDropdown,
    buttonLabel: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "material-icons"
    }, "settings"),
    onClose: handleClose
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], {
    tag: "div"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "selection-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "searchOption",
    defaultChecked: true
  }), "Match prefix e.g. \"", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "keyword"
  }, "test"), "\"ABCD")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], {
    tag: "div"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "selection-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "searchOption"
  }), "Match case e.g. AB\"", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "keyword"
  }, "test"), "\"CD")));
};

/* harmony default export */ __webpack_exports__["default"] = (SearchOption);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/SpecialLevelDropdown.jsx":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/SpecialLevelDropdown.jsx ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");




var SpecialLevelDropdown = function SpecialLevelDropdown(props) {
  var getLabel = function getLabel(level) {
    return level === '0' ? 'None' : level;
  };

  var position = props.position,
      onClose = props.onClose,
      onChange = props.onChange;
  var isOpen = position !== null;
  var style = position && {
    top: position.y + 20,
    left: position.x
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown special-level-menu",
    style: style
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownMenu"], {
    isOpen: isOpen,
    onClose: onClose
  }, Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_2__["specialLevelListWithColor"]).map(function (item) {
    var color = _lib_constants__WEBPACK_IMPORTED_MODULE_2__["specialLevelListWithColor"][item];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], {
      key: item,
      className: "special-level-item",
      style: {
        backgroundColor: color
      },
      onClick: function onClick(e) {
        return onChange(e, item);
      }
    }, getLabel(item));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(SpecialLevelDropdown));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/OddsGroupCell.jsx":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/OddsGroupCell.jsx ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _components_DropdownLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/DropdownLabel */ "./www/js/source/reactpages/components/DropdownLabel.jsx");




var OddsGroupCell = function OddsGroupCell(props) {
  var value = props.value,
      handleToggleOddsGroup = props.handleToggleOddsGroup;
  var style = _lib_constants__WEBPACK_IMPORTED_MODULE_1__["oddsGroupListWithStyle"][value];
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_DropdownLabel__WEBPACK_IMPORTED_MODULE_2__["default"], {
    text: value,
    labelStyle: style,
    onClick: handleToggleOddsGroup
  });
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(OddsGroupCell));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/PlayerRow.jsx":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/PlayerRow.jsx ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Switcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/Switcher */ "./www/js/source/reactpages/components/Switcher.jsx");
/* harmony import */ var _UserNameCell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UserNameCell */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/UserNameCell.jsx");
/* harmony import */ var _OddsGroupCell__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OddsGroupCell */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/OddsGroupCell.jsx");
/* harmony import */ var _SpecialLevelCell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SpecialLevelCell */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/SpecialLevelCell.jsx");







var PlayerRow = function PlayerRow(props) {
  var dataItem = props.dataItem,
      isChecked = props.isChecked,
      displayedColumn = props.displayedColumn,
      handleChangeBaStatus = props.handleChangeBaStatus,
      handleEnterContextMenu = props.handleEnterContextMenu,
      handleLeaveContextMenu = props.handleLeaveContextMenu,
      _handleToggleOddsGroup = props.handleToggleOddsGroup,
      _handleToggleSpecialLevel = props.handleToggleSpecialLevel,
      setCurrentActivePlayer = props.setCurrentActivePlayer;
  var userNameProps = {
    dataItem: dataItem,
    handleEnterContextMenu: handleEnterContextMenu,
    handleLeaveContextMenu: handleLeaveContextMenu
  };
  var oddsGroupProps = {
    value: dataItem.OddsGroup,
    handleToggleOddsGroup: function handleToggleOddsGroup(e) {
      _handleToggleOddsGroup(e);

      setCurrentActivePlayer({
        custId: dataItem.CustId
      });
    }
  };
  var specialProps = {
    value: dataItem.SpecialLevel,
    handleToggleSpecialLevel: function handleToggleSpecialLevel(e) {
      _handleToggleSpecialLevel(e);

      setCurrentActivePlayer({
        custId: dataItem.CustId
      });
    } // handleCheckPlayer = (custId) => {
    //     const { selectedPlayerIdList } = this.props;
    //     const newIdList = selectedPlayerIdList.includes(custId) ?
    //         selectedPlayerIdList.filter(item => item !== custId) : [...selectedPlayerIdList, custId];
    //     this.props.setSelectedPlayerIdList(newIdList);
    // }

  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    key: dataItem.CustId
  }, displayedColumn['Status'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, dataItem.Status), displayedColumn['Username'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserNameCell__WEBPACK_IMPORTED_MODULE_3__["default"], userNameProps)), displayedColumn['SystemID'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, dataItem.SystemId), displayedColumn['RealName'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, dataItem.RealName), displayedColumn['Currency'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, dataItem.Currency), displayedColumn['CurrentBalance'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, dataItem.CurrentBalance), displayedColumn['OutstandingBalance'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, dataItem.OutstandingBalance), displayedColumn['OddsGroup'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OddsGroupCell__WEBPACK_IMPORTED_MODULE_4__["default"], oddsGroupProps)), displayedColumn['BAStatus'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Switcher__WEBPACK_IMPORTED_MODULE_2__["default"], {
    checked: dataItem.BaStatus,
    onChange: function onChange(e) {
      return handleChangeBaStatus(dataItem.CustId, e.target.checked);
    }
  })), displayedColumn['SpecialLevel'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SpecialLevelCell__WEBPACK_IMPORTED_MODULE_5__["default"], specialProps)), displayedColumn['LastLoginIp'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, dataItem.LastLoginIp), displayedColumn['LastTransaction'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, dataItem.LastTransaction), displayedColumn['Email'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, dataItem.Email));
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(PlayerRow));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/SpecialLevelCell.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/SpecialLevelCell.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _components_DropdownLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/DropdownLabel */ "./www/js/source/reactpages/components/DropdownLabel.jsx");




var SpecialLevelCell = function SpecialLevelCell(props) {
  var value = props.value,
      handleToggleSpecialLevel = props.handleToggleSpecialLevel;
  var style = {
    backgroundColor: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["specialLevelListWithColor"][value]
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_DropdownLabel__WEBPACK_IMPORTED_MODULE_2__["default"], {
    text: value === '0' ? 'None' : value,
    labelStyle: style,
    onClick: handleToggleSpecialLevel
  });
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(SpecialLevelCell));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/UserNameCell.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/UserNameCell.jsx ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");





var UserNameCell = function UserNameCell(props) {
  var dataItem = props.dataItem,
      setSelectedPlayer = props.setSelectedPlayer,
      handleEnterContextMenu = props.handleEnterContextMenu,
      handleLeaveContextMenu = props.handleLeaveContextMenu,
      setCurrentActivePlayer = props.setCurrentActivePlayer;

  var handleSelectPlayer = function handleSelectPlayer(event) {
    event.preventDefault();
    var player = {
      custId: dataItem.CustId,
      userName: dataItem.UserName,
      currency: dataItem.Currency
    };
    setSelectedPlayer(player);
  };

  var handleMouseEnter = function handleMouseEnter(event) {
    event.preventDefault();
    handleEnterContextMenu(event);
    var currentActivePlayer = {
      custId: dataItem.CustId,
      userName: dataItem.UserName,
      currency: dataItem.Currency
    };
    setCurrentActivePlayer(currentActivePlayer);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "username-cell"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn-default btn-link username-link",
    onClick: handleSelectPlayer
  }, dataItem.UserName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn-default btn-link btn-icon cell-menu",
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleLeaveContextMenu
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "material-icons"
  }, "edit")));
};

function mapDispatchToProps(dispatch) {
  var setSelectedPlayer = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setSelectedPlayer,
      setCurrentActivePlayer = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setCurrentActivePlayer;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setSelectedPlayer: setSelectedPlayer,
    setCurrentActivePlayer: setCurrentActivePlayer
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(UserNameCell)));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/index.jsx":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/index.jsx ***!
  \*************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/index.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js

=======
var type = window.initialState.type;
var displayedColumnList = Object(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["columnList"])(type).map(function (item) {
  return _objectSpread({}, item);
});

var defaultState = _objectSpread({}, window.initialState, {
  displayedColumnList: displayedColumnList
});

var store = _lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);
var App = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
});
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

/***/ }),

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/***/ "./www/js/source/reactpages/lib/site.js":
/*!**********************************************!*\
  !*** ./www/js/source/reactpages/lib/site.js ***!
  \**********************************************/
=======
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js ***!
  \*********************************************************************************/
/*! exports provided: specialLevelListWithColor, oddsGroupListWithStyle, licenseeType, columnList, contextMenuList, heightSlicing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "specialLevelListWithColor", function() { return specialLevelListWithColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oddsGroupListWithStyle", function() { return oddsGroupListWithStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "licenseeType", function() { return licenseeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnList", function() { return columnList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contextMenuList", function() { return contextMenuList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "heightSlicing", function() { return heightSlicing; });
var specialLevelListWithColor = {
  0: '#fcfcfc',
  1: '#98b516',
  2: '#007d00',
  3: '#b87856',
  4: '#fcc50f',
  5: '#418a86',
  6: '#969036',
  7: '#944937',
  8: '#3297fc',
  9: '#c98402',
  10: '#fc0000'
};
var oddsGroupListWithStyle = {
  A: {
    backgroundColor: '#007C00',
    color: '#fff'
  },
  B: {
    backgroundColor: '#3298FD',
    color: '#fff'
  },
  C: null,
  D: null,
  E: null,
  F: null
};
var licenseeType = {
  api: 0,
  nonApi: 1
};
var columnList = function columnList(licType) {
  return [{
    key: 'Status',
    value: 'Status',
    show: true
  }, {
    key: 'Username',
    value: 'Username',
    show: true
  }, {
    key: 'SystemID',
    value: 'SystemID',
    show: true
  }, licType === licenseeType.nonApi ? {
    key: 'RealName',
    value: 'Real Name',
    show: true
  } : null, {
    key: 'Currency',
    value: 'Currency',
    show: true
  }, {
    key: 'CurrentBalance',
    value: 'Current Balance',
    show: true
  }, {
    key: 'OutstandingBalance',
    value: 'Outstanding Balance',
    show: true
  }, {
    key: 'OddsGroup',
    value: 'Odds Group',
    show: true
  }, {
    key: 'BAStatus',
    value: 'BA Status',
    show: true
  }, {
    key: 'SpecialLevel',
    value: 'Special Level',
    show: true
  }, licType === licenseeType.nonApi ? {
    key: 'LastLoginIp',
    value: 'Last Login IP',
    show: true
  } : null, {
    key: 'LastTransaction',
    value: 'Last Transaction',
    show: true
  }, licType === licenseeType.nonApi ? {
    key: 'Email',
    value: 'Email',
    show: true
  } : null].filter(function (x) {
    return !!x;
  });
};
var contextMenuList = [{
  key: 'note',
  name: 'Note',
  tabName: 'Note'
}, {
  key: 'password',
  name: 'Password',
  tabName: 'Setting'
}, {
  key: 'fundtransferLimit',
  name: 'Fundtransfer Limit',
  tabName: 'TransferFund'
}, {
  key: 'betLimit',
  name: 'Bet Limit',
  tabName: 'BetLimit'
}, {
  key: 'statement',
  name: 'Statement',
  tabName: 'Statement'
}, {
  key: 'personalMessage',
  name: 'Personal Message',
  tabName: 'Message'
}];
var heightSlicing = {
  default: 300,
  withAdvancedSearch: 357,
  whenCollapsing: 235
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridHelper.js":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridHelper.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GridHelper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var GridHelper =
/*#__PURE__*/
function () {
  function GridHelper() {
    _classCallCheck(this, GridHelper);
  }

  _createClass(GridHelper, null, [{
    key: "renderHeader",
    value: function renderHeader(displayedColumn) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
        style: {
          height: 32
        }
      }, displayedColumn['Status'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 80
      }, "Status"), displayedColumn['Username'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 80
      }, "Username"), displayedColumn['SystemID'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 100
      }, "SystemId"), displayedColumn['RealName'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 80
      }, "Real Name"), displayedColumn['Currency'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 60
      }, "Currency"), displayedColumn['CurrentBalance'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 80
      }, "Current Balance"), displayedColumn['OutstandingBalance'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 80
      }, "Outstanding Balance"), displayedColumn['OddsGroup'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 50
      }, "Odds Group"), displayedColumn['BAStatus'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 50
      }, "BA Status"), displayedColumn['SpecialLevel'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 50
      }, "Special Level"), displayedColumn['LastLoginIp'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 60
      }, "Last Login IP"), displayedColumn['LastTransaction'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 100
      }, "Last Transaction"), displayedColumn['Email'] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 100
      }, "Email"));
    }
  }]);

  return GridHelper;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerListService.js":
/*!*****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerListService.js ***!
  \*****************************************************************************************/
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
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

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
  _createClass(Site, null, [{
    key: "getXsrfToken",
    value: function getXsrfToken() {
      if (!_xsrfToken) {
        _xsrfToken = document.querySelector("input[name=__RequestVerificationToken]").value;
      }
=======
  _createClass(PlayerListService, [{
    key: "getTabList",
    value: function getTabList() {
      return this.commonService.getTabList();
    }
  }, {
    key: "_mergePlayerList",
    value: function _mergePlayerList(lrfList, lapList) {
      var result = [];
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

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

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
        if (text === '') {
          return null;
=======
        if (lrfItem && lapItem) {
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
          result.push(_objectSpread({}, lapItem, lrfItem));
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
          var CustId = lrfItem.CustId,
              UserName = lrfItem.UserName,
              SystemId = lrfItem.SystemId,
              Currency = lrfItem.Currency,
              CurrentBalance = lrfItem.CurrentBalance,
              OutstandingBalance = lrfItem.OutstandingBalance,
              OddsGroup = lrfItem.OddsGroup,
              BaStatus = lrfItem.BaStatus,
              SpecialLevel = lrfItem.SpecialLevel;
          var Status = lapItem.Status,
              RealName = lapItem.RealName,
              IP = lapItem.IP,
              email = lapItem.email;
          result.push({
            CustId: CustId || lapItem.CustId,
            UserName: UserName || lapItem.UserName,
            SystemId: SystemId,
            Currency: Currency,
            CurrentBalance: CurrentBalance,
            OutstandingBalance: OutstandingBalance,
            OddsGroup: OddsGroup,
            BaStatus: BaStatus,
            SpecialLevel: SpecialLevel,
            Status: Status,
            RealName: RealName,
            LastLoginIp: IP,
            Email: email
          });
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
        }
      }

      return text;
    }
  }, {
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
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
=======
    key: "getPlayerList",
    value: function getPlayerList(param) {
      var _this = this;

      var lrfPlayerList = apiInfo.lrfPlayerList,
          lapPlayerList = apiInfo.lapPlayerList;
      var lrfPromise = this.commonService.fetchData(lrfPlayerList.type, lrfPlayerList.action, _objectSpread({}, param));
      var lapPromise = this.commonService.fetchData(lapPlayerList.type, lapPlayerList.action, _objectSpread({}, param));
      return this.commonService.fetchMultiple([lrfPromise, lapPromise], function (lrfResponse, lapResponse) {
        var lrfPlayerList = lrfResponse.data.MainData;
        var lapResponseData = lapResponse.data;

        var playerList = _this._mergePlayerList(lrfPlayerList, lapResponseData.PlayerList);

        return {
          playerList: playerList
        };
      });
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
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
  }]);

  return Site;
}();



/***/ }),

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/***/ "./www/js/source/reactpages/lib/store.js":
/*!***********************************************!*\
  !*** ./www/js/source/reactpages/lib/store.js ***!
  \***********************************************/
=======
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/filterHandlerReducer.js":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/filterHandlerReducer.js ***!
  \*************************************************************************************************/
/*! exports provided: param, playerList, type, isAdvancedSearch, isFilterCollapsing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "param", function() { return param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerList", function() { return playerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAdvancedSearch", function() { return isAdvancedSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFilterCollapsing", function() { return isFilterCollapsing; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var param = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_PARAM"], function (preState, action) {
  return _objectSpread({}, action.data);
}));
var playerList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_PLAYER_LIST"], function (preState, action) {
  return _toConsumableArray(action.data);
}));
var type = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {});
var isAdvancedSearch = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_ADVANCED_SEARCH"], function (preState, action) {
  return action.data;
}));
var isFilterCollapsing = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_COLLAPSE_FILTER"], function (preState, action) {
  return action.data;
}));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridHandlerReducer.js":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridHandlerReducer.js ***!
  \***********************************************************************************************/
/*! exports provided: displayedColumnList, currentActivePlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayedColumnList", function() { return displayedColumnList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentActivePlayer", function() { return currentActivePlayer; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



var displayedColumnList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])([], _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_1__["SET_DISPLAYED_COLUMN_LIST"], function (preState, action) {
  return _toConsumableArray(action.data);
}));
var currentActivePlayer = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_1__["SET_CURRENT_ACTIVE_PLAYER"], function (preState, action) {
  return action.data && _objectSpread({}, action.data);
}));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/index.js":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/index.js ***!
  \**********************************************************************************/
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/lib/index.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./www/js/source/reactpages/lib/logger.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
=======
/* harmony import */ var _filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterHandlerReducer.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/filterHandlerReducer.js");
/* harmony import */ var _playerDetailHandlerReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerDetailHandlerReducer */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/playerDetailHandlerReducer.js");
/* harmony import */ var _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _gridHandlerReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gridHandlerReducer */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridHandlerReducer.js");

>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
=======
/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign({}, _filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_1__, _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_3__, _playerDetailHandlerReducer__WEBPACK_IMPORTED_MODULE_2__, _gridHandlerReducer__WEBPACK_IMPORTED_MODULE_4__)));
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js


<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
=======
/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/playerDetailHandlerReducer.js":
/*!*******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/playerDetailHandlerReducer.js ***!
  \*******************************************************************************************************/
/*! exports provided: selectedPlayer, selectedPlayerIdList, selectedTabName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
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
      var enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a, // lets us dispatch() functions
      loggerMiddleware));
      return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, initialState, enhancer);
    }
  }]);
=======
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedPlayer", function() { return selectedPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedPlayerIdList", function() { return selectedPlayerIdList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedTabName", function() { return selectedTabName; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

  return Store;
}();


<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
=======
var selectedPlayer = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SELECTED_PLAYER"], function (preState, action) {
  return action.data && _objectSpread({}, action.data);
}));
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
var selectedPlayerIdList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])([], _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SELECTED_PLAYERID_LIST"], function (preState, action) {
  return _toConsumableArray(action.data);
}));
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
=======
var selectedTabName = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])('', _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SELECTED_TAB_NAME"], function (preState, action) {
  return action.data;
}));
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

/***/ }),

/***/ "./www/js/source/reactpages/pages/playeradmin/actions/filterHandlerAction.js":
/*!***********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/playeradmin/actions/filterHandlerAction.js ***!
  \***********************************************************************************/
/*! exports provided: setParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParam", function() { return setParam; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/playeradmin/actions/types.js");

var setParam = function setParam(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_PARAM"],
    data: data
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/playeradmin/actions/index.js":
/*!*********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/playeradmin/actions/index.js ***!
  \*********************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _filterHandlerAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterHandlerAction */ "./www/js/source/reactpages/pages/playeradmin/actions/filterHandlerAction.js");
=======
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseCommonService =
/*#__PURE__*/
function () {
  function BaseCommonService() {
    _classCallCheck(this, BaseCommonService);

    if (this.constructor == BaseCommonService) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  _createClass(BaseCommonService, [{
    key: "getTabList",
    value: function getTabList() {
      throw new Error("Method 'getTabList()' must be implemented.");
    }
  }, {
    key: "getLink",
    value: function getLink(sysType, action) {
      throw new Error("Method 'getLink()' must be implemented.");
    }
  }, {
    key: "fetchData",
    value: function fetchData(sType, action, params) {
      var configOption = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      throw new Error("Method 'fetchData()' must be implemented.");
    }
  }, {
    key: "fetchMultiple",
    value: function fetchMultiple(promiseList, callback) {
      throw new Error("Method 'fetchMultiple()' must be implemented.");
    }
  }]);
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js


var ActionCreators = Object.assign({}, _actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__, _filterHandlerAction__WEBPACK_IMPORTED_MODULE_1__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/playeradmin/actions/types.js":
/*!*********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/playeradmin/actions/types.js ***!
  \*********************************************************************/
/*! exports provided: SET_PARAM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PARAM", function() { return SET_PARAM; });
var SET_PARAM = 'PLAYER_ADMIN/SET_PARAM';

/***/ }),

/***/ "./www/js/source/reactpages/pages/playeradmin/components/AppContainer.jsx":
/*!********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/playeradmin/components/AppContainer.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index */ "./www/js/source/reactpages/pages/playeradmin/actions/index.js");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/pages/playeradmin/components/DataGrid.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/pages/playeradmin/components/FormFilter.jsx");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _layouts_AppLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _PlayerDetail__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PlayerDetail */ "./www/js/source/reactpages/pages/playeradmin/components/PlayerDetail.jsx");




<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
=======
      var applyApiTokenUrl = pageConfig.applyApiTokenUrl,
          tabList = pageConfig.tabList;
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js


<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js

=======
      if (!window.Identity) {
        throw new Error("Missing Identity object");
      }

      var _window$Identity = window.Identity,
          RootUrl = _window$Identity.RootUrl,
          ApplyTokenUrl = _window$Identity.ApplyTokenUrl;
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js



<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
var AppContainer = function AppContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_7__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
    isLoading: props.isLoading
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "result-content"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_4__["default"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PlayerDetail__WEBPACK_IMPORTED_MODULE_8__["default"], null));
};
=======
      var initialConfig = {
        tabList: tabList,
        baseUrl: RootUrl,
        applyApiTokenUrl: applyApiTokenUrl,
        applyLinkTokenUrl: ApplyTokenUrl
      };
      return new _lapCommonService__WEBPACK_IMPORTED_MODULE_0__["default"](initialConfig);
    }
  }]);
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

function mapDispatchToProps(dispatch) {
  var setParams = _actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setParams;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setParams: setParams
  }, dispatch);
}

function mapStateToProps(state) {
  var isLoading = state.isLoading;
  return Object.assign({}, {
    isLoading: isLoading
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AppContainer)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/playeradmin/components/DataGrid.jsx":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/playeradmin/components/DataGrid.jsx ***!
  \****************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/pages/playeradmin/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
=======
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var DataGrid =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DataGrid, _PureComponent);

  function DataGrid(props) {
    var _this;

    _classCallCheck(this, DataGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataGrid).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "submit", function (event) {
      event.preventDefault();
    });

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
    return _this;
  }

  _createClass(DataGrid, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var param = this.props.param;
=======
    _this = _possibleConstructorReturn(this, _getPrototypeOf(LapCommonService).call(this));
    var baseUrl = initialConfig.baseUrl,
        applyLinkTokenUrl = initialConfig.applyLinkTokenUrl,
        applyApiTokenUrl = initialConfig.applyApiTokenUrl,
        tabList = initialConfig.tabList;
    _this._applyLinkTokenUrl = applyLinkTokenUrl;
    _this._applyApiTokenUrl = applyApiTokenUrl;
    _this._baseUrl = baseUrl;
    _this._tabList = tabList || [];
    return _this;
  }

  _createClass(LapCommonService, [{
    key: "getTabList",
    value: function getTabList() {
      return _toConsumableArray(this._tabList);
    }
  }, {
    key: "_buildApplyTokenQueryString",
    value: function _buildApplyTokenQueryString(sysType, action) {
      return "ActionLink=".concat(encodeURIComponent(action), "&Type=").concat(sysType);
    }
  }, {
    key: "getLink",
    value: function getLink(sysType, action) {
      return sysType === _constants_configInfo__WEBPACK_IMPORTED_MODULE_1__["systemType"].newAdmin ? this._baseUrl + action : "".concat(this._applyLinkTokenUrl, "?").concat(this._buildApplyTokenQueryString(sysType, action));
    }
  }, {
    key: "_buildCommonAjaxConfig",
    value: function _buildCommonAjaxConfig(configOption, apiActionUrl, params) {
      var commonConfig = _objectSpread({}, configOption, {
        url: apiActionUrl
      });

      var configWithParam = this._getConfigParam(commonConfig, params);
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

      if (param !== prevProps.param) {
        this._fetchData();
      }
    }
  }, {
    key: "_fetchData",
    value: function _fetchData() {}
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Data Grid");
    }
  }]);

  return DataGrid;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  var param = state.param;
  return Object.assign({}, {
    param: param
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/playeradmin/components/FormFilter.jsx":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/playeradmin/components/FormFilter.jsx ***!
  \******************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/pages/playeradmin/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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





<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
var FormFilter =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(FormFilter, _PureComponent);
=======
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



var CheckBox = function CheckBox(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox-group"
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
};

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

/***/ "./www/js/source/reactpages/components/DropdownLabel.jsx":
/*!***************************************************************!*\
  !*** ./www/js/source/reactpages/components/DropdownLabel.jsx ***!
  \***************************************************************/
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
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var DropdownLabel = function DropdownLabel(props) {
  var className = props.className,
      text = props.text,
      iconElement = props.iconElement,
      labelStyle = props.labelStyle,
      attrs = _objectWithoutProperties(props, ["className", "text", "iconElement", "labelStyle"]);

  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown-label-container', className, {
    disabled: props.disabled
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
    className: classes
  }, attrs), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-label",
    style: labelStyle
  }, text), iconElement);
};

var propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  iconElement: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  labelStyle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
var defaultProps = {
  disabled: false,
  iconElement: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "dropdown-label-icon chevron down"
  })
};
DropdownLabel.propTypes = propTypes;
DropdownLabel.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(DropdownLabel));
;

/***/ }),

/***/ "./www/js/source/reactpages/components/Loader.jsx":
/*!********************************************************!*\
  !*** ./www/js/source/reactpages/components/Loader.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

  function FormFilter(props) {
    var _this;

    _classCallCheck(this, FormFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormFilter).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (event) {
      event.preventDefault();

      _this.props.setParam({
        userName: _this.state.Username
      });
    });

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;
=======
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

/***/ "./www/js/source/reactpages/components/Switcher.jsx":
/*!**********************************************************!*\
  !*** ./www/js/source/reactpages/components/Switcher.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var Switcher = function Switcher(props) {
  var attributes = _extends({}, props);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "switch"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({}, attributes, {
    type: "checkbox"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "lever"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Switcher);

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
        float: 'left'
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
    height: "15px",
    width: "20px",
    cursor: 'pointer',
    position: 'absolute',
    left: 'calc(50% - 10px)',
    bottom: 0,
    padding: '1px 5px'
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
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var DropdownButton = function DropdownButton(props) {
  var className = props.className,
      children = props.children,
      toggleButton = props.toggleButton,
      dropdownMenu = props.dropdownMenu,
      isOpen = props.isOpen,
      onOpen = props.onOpen,
      onClose = props.onClose,
      onToggle = props.onToggle,
      buttonLabel = props.buttonLabel,
      attrs = _objectWithoutProperties(props, ["className", "children", "toggleButton", "dropdownMenu", "isOpen", "onOpen", "onClose", "onToggle", "buttonLabel"]);

  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown', className);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
    className: classes
  }, attrs), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DropdownToggle__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, toggleButton, {
    onClick: onToggle
  }), buttonLabel), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DropdownMenu__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, dropdownMenu, {
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onClose
  }), children));
};

var propTypes = {
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
var defaultProps = {
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





var DropdownItem =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownItem, _Component);

  function DropdownItem(props) {
    var _this;

    _classCallCheck(this, DropdownItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropdownItem).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      e.preventDefault();

      if (_this.props.disabled) {
        return;
      }

      _this.props.onClick && _this.props.onClick(e);
    });

    return _this;
  }

  _createClass(DropdownItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tag = _this$props.tag,
          className = _this$props.className,
          active = _this$props.active,
          props = _objectWithoutProperties(_this$props, ["tag", "className", "active"]);

      var Tag = tag;
      var type = Tag === 'button' && props.onClick ? 'button' : undefined;
      var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown-item', className, {
        disabled: props.disabled,
        active: active
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
        className: classes,
        type: type
      }, props));
    }
  }]);

  return DropdownItem;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  active: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  tag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
var defaultProps = {
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DropdownMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropdownMenu).call(this, props));
  }

  _createClass(DropdownMenu, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tag = _this$props.tag,
          className = _this$props.className,
          isOpen = _this$props.isOpen,
          onOpen = _this$props.onOpen,
          onClose = _this$props.onClose,
          attrs = _objectWithoutProperties(_this$props, ["tag", "className", "isOpen", "onOpen", "onClose"]);

      var Tag = tag;
      var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown-menu', className);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_3__["default"], {
        isOpening: isOpen,
        onOpen: onOpen,
        onClose: onClose
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
        className: classes
      }, attrs)));
    }
  }]);

  return DropdownMenu;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var propTypes = {
  tag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  isOpen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onOpen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
var defaultProps = {
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
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var DropdownToggle = function DropdownToggle(props) {
  var className = props.className,
      tag = props.tag,
      caret = props.caret,
      attrs = _objectWithoutProperties(props, ["className", "tag", "caret"]);

  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown-toggle', className, {
    caret: caret
  });
  var Tag = tag;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
    className: classes
  }, attrs));
};

var propTypes = {
  caret: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  tag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
var defaultProps = {
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
    href: "javascript:;",
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

/***/ "./www/js/source/reactpages/constants/config.js":
/*!******************************************************!*\
  !*** ./www/js/source/reactpages/constants/config.js ***!
  \******************************************************/
/*! exports provided: debuggingConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

      _this.setState(_defineProperty({}, name, value));
    });

    _this.state = {
      Username: ''
    };
    return _this;
  }

  _createClass(FormFilter, [{
    key: "render",
    value: function render() {
      var Username = this.state.Username;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-filter"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, "Username *"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "input-text",
        id: "Username",
        name: "Username",
        type: "text",
        value: Username,
        onChange: this.handleChange
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "button-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "btn btn-submit",
        onClick: this.handleSubmit
      }, "Submit")))));
    }
  }]);

  return FormFilter;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);
}

function mapStateToProps(state) {
  var isLoading = state.isLoading,
      rest = _objectWithoutProperties(state, ["isLoading"]);

  return Object.assign({}, rest);
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/playeradmin/components/PlayerDetail.jsx":
/*!********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/playeradmin/components/PlayerDetail.jsx ***!
  \********************************************************************************/
/*! exports provided: PlayerDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerDetail", function() { return PlayerDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @9softstudio/react-simple-tab */ "./node_modules/@9softstudio/react-simple-tab/dist/index.js");
/* harmony import */ var _9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_simple_tab__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_integrationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/integrationService */ "./www/js/source/reactpages/lib/integrationService.js");
/* harmony import */ var _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants/integrationInfo */ "./www/js/source/reactpages/constants/integrationInfo.js");
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






var PlayerDetail =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PlayerDetail, _PureComponent);

  function PlayerDetail(props) {
    var _this;

    _classCallCheck(this, PlayerDetail);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlayerDetail).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleClickMenu", function (event, actionLink, tabIndex) {
      event.preventDefault();

      _this.setState({
        targetUrl: actionLink,
        selectedTabIndex: tabIndex
      });
    });

    _this.state = {
      selectedTabIndex: 0,
      targetUrl: ''
    };
    return _this;
  }

  _createClass(PlayerDetail, [{
    key: "_renderTabList",
    value: function _renderTabList(renderingMenuList) {
      var _this2 = this;

      var selectedTabIndex = this.state.selectedTabIndex;
      return renderingMenuList.map(function (item, index) {
        var actionLink = Object(_lib_integrationService__WEBPACK_IMPORTED_MODULE_3__["getActionLink"])(item.SystemType, item.Action);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "tab",
          key: item.Name
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: selectedTabIndex === index ? "active" : "",
          href: actionLink,
          onClick: function onClick(event) {
            return _this2.handleClickMenu(event, actionLink, index);
          }
        }, item.Text));
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!Object(_lib_integrationService__WEBPACK_IMPORTED_MODULE_3__["isValidMode"])()) {
        return null;
      }

      var targetUrl = this.state.targetUrl;
      var menuList = this.props.menuList;
      var renderingMenuList = menuList && menuList.length ? menuList : _constants_integrationInfo__WEBPACK_IMPORTED_MODULE_4__["playerMenuList"];
      var src = targetUrl || Object(_lib_integrationService__WEBPACK_IMPORTED_MODULE_3__["getActionLink"])(renderingMenuList[0].SystemType, renderingMenuList[0].Action);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pa-detail-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-filter-tab"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header-tab"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-tab"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "tabs"
      }, this._renderTabList(renderingMenuList)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tab-panel"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pa-frame-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
        id: "paDetailFrame",
        style: {
          height: 500
        },
        name: "paDetailFrame",
        frameBorder: "0",
        src: src
      })))));
    }
  }]);

  return PlayerDetail;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]); // function mapDispatchToProps(dispatch) {
//     return bindActionCreators({}, dispatch);
// }

function mapStateToProps(state) {
  var menuList = state.menuList;
  return Object.assign({}, {
    menuList: menuList
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, null)(PlayerDetail));

/***/ }),

/***/ "./www/js/source/reactpages/pages/playeradmin/components/index.jsx":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/playeradmin/components/index.jsx ***!
  \*************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/pages/playeradmin/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/index.js */ "./www/js/source/reactpages/pages/playeradmin/reducers/index.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/store */ "./www/js/source/reactpages/lib/store.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
=======
=======
/***/ "./www/js/source/reactpages/lib/dataReducer.js":
/*!*****************************************************!*\
  !*** ./www/js/source/reactpages/lib/dataReducer.js ***!
  \*****************************************************/
/*! exports provided: updateObjectInArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateObjectInArray", function() { return updateObjectInArray; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updateObjectInArray = function updateObjectInArray(array, indexItem, updatedItem) {
  return array.map(function (item, index) {
    if (index !== indexItem) {
      return item;
    }

    return _objectSpread({}, item, updatedItem);
  });
};

/***/ }),

>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js
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
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js






var defaultState = _objectSpread({}, window.initialState);

var store = _lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers_index_js__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);
var App = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
});
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));

/***/ }),

/***/ "./www/js/source/reactpages/pages/playeradmin/reducers/filterHandlerReducer.js":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/playeradmin/reducers/filterHandlerReducer.js ***!
  \*************************************************************************************/
/*! exports provided: param, menuList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "param", function() { return param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "menuList", function() { return menuList; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/pages/playeradmin/actions/types.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
=======
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./www/js/source/reactpages/lib/logger.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var param = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_PARAM"], function (preState, action) {
  return _objectSpread({}, action.data);
}));
var menuList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])([], {});

/***/ }),

/***/ "./www/js/source/reactpages/pages/playeradmin/reducers/index.js":
/*!**********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/playeradmin/reducers/index.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

<<<<<<< HEAD:Fanex.Athena/Web/www/js/build/dev/reactpages/playeradmin/playeradmin.chunk.js
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterHandlerReducer.js */ "./www/js/source/reactpages/pages/playeradmin/reducers/filterHandlerReducer.js");
/* harmony import */ var _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
=======
  _createClass(Store, null, [{
    key: "createStore",
    value: function createStore(reducer, initialState) {
      var loggerMiddleware = _logger__WEBPACK_IMPORTED_MODULE_2__["default"].getLoggerMiddleware();
      var enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"], // lets us dispatch() functions
      loggerMiddleware));
      return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, initialState, enhancer);
    }
  }]);
>>>>>>> 112658 - Build front-end:Fanex.Athena/www/js/build/dev/reactpages/playeradmin/playerlist.chunk.js



/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_1__, _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_2__)));

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
//# sourceMappingURL=playeradmin.chunk.js.map