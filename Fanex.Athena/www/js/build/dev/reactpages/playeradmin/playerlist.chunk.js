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
/******/ 		"www/js/build/dev/reactpages/playeradmin/playerlist": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "www/js/build/dev/reactpages/lib/" + ({"xlsx-style-sparta":"xlsx-style-sparta"}[chunkId]||chunkId) + ".chunk.js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/index.jsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cptable":
/*!**************************!*\
  !*** external "cptable" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = cptable;

/***/ }),

/***/ "./jszip":
/*!************************!*\
  !*** external "jszip" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jszip;

/***/ }),

/***/ "./ods":
/*!**********************!*\
  !*** external "ods" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ods;

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/commonAction.js":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/commonAction.js ***!
  \****************************************************************************************/
/*! exports provided: setSelectedPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedPlayer", function() { return setSelectedPlayer; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");

var setSelectedPlayer = function setSelectedPlayer(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_PLAYER"],
    data: data
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/filterHandlerAction.js":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/filterHandlerAction.js ***!
  \***********************************************************************************************/
/*! exports provided: searchPlayer, getSinglePlayer, setParam, setAdvancedSearch, setCollapseFilter, getSuggestionList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchPlayer", function() { return searchPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSinglePlayer", function() { return getSinglePlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParam", function() { return setParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAdvancedSearch", function() { return setAdvancedSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCollapseFilter", function() { return setCollapseFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSuggestionList", function() { return getSuggestionList; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _lib_services_playerQueryService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/services/playerQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerQueryService.js");
/* harmony import */ var _commonAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commonAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/commonAction.js");
/* harmony import */ var _gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gridHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridHandlerAction.js");
/* harmony import */ var _lib_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/constants.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/helpers/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerDataBuilder.js");
/* harmony import */ var _lib_services_playerSuggestionService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/services/playerSuggestionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerSuggestionService.js");
/* harmony import */ var _playerDetailHandlerAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./playerDetailHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/playerDetailHandlerAction.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var processBeforeGettingData = function processBeforeGettingData(dispatch) {
  dispatch(Object(_commonAction__WEBPACK_IMPORTED_MODULE_3__["setSelectedPlayer"])(null));
  dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setIsFetchingData"])(true));
  dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(true));
  dispatch(Object(_playerDetailHandlerAction__WEBPACK_IMPORTED_MODULE_8__["setSelectedTabName"])(null));
};

var searchPlayer = function searchPlayer(param) {
  return function (dispatch) {
    var service = new _lib_services_playerQueryService__WEBPACK_IMPORTED_MODULE_2__["default"]();
    processBeforeGettingData(dispatch);
    dispatch(setParam(param));
    service.getPlayerList(param).then(function (result) {
      var playerList = result.playerList,
          totalItem = result.totalItem;
      dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setPlayerList"])(playerList));
      dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setIsFetchingData"])(false));

      var pagingOption = _objectSpread({}, _lib_constants_js__WEBPACK_IMPORTED_MODULE_5__["defaultPagingOption"], {
        PageIndex: param.pageIndex,
        PageSize: param.pageSize,
        TotalItem: totalItem
      });

      dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setPagingOption"])(pagingOption));

      if (playerList.length === 1) {
        var selectedPlayer = Object(_lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_6__["buildSelectedPlayer"])(playerList[0]);
        dispatch(Object(_commonAction__WEBPACK_IMPORTED_MODULE_3__["setSelectedPlayer"])(selectedPlayer));
      }

      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(false));
    })["catch"](function () {
      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(false));
    });
  };
};
var getSinglePlayer = function getSinglePlayer(param) {
  return function (dispatch) {
    var service = new _lib_services_playerQueryService__WEBPACK_IMPORTED_MODULE_2__["default"]();
    processBeforeGettingData(dispatch);
    service.getSinglePlayer(param).then(function (result) {
      if (result) {
        dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setPlayerList"])([result]));
        dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setIsFetchingData"])(false));

        var pagingOption = _objectSpread({}, _lib_constants_js__WEBPACK_IMPORTED_MODULE_5__["defaultPagingOption"], {
          TotalItem: 1
        });

        dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setPagingOption"])(pagingOption));
        var selectedPlayer = Object(_lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_6__["buildSelectedPlayer"])(result);
        dispatch(Object(_commonAction__WEBPACK_IMPORTED_MODULE_3__["setSelectedPlayer"])(selectedPlayer));
      }

      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(false));
    })["catch"](function () {
      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(false));
    });
  };
};
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
var getSuggestionList = function getSuggestionList(param) {
  return function () {
    var suggestionService = new _lib_services_playerSuggestionService__WEBPACK_IMPORTED_MODULE_7__["default"]();
    return suggestionService.getSuggestionList(param);
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridBaStatusAction.js":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridBaStatusAction.js ***!
  \**********************************************************************************************/
/*! exports provided: updateBaStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateBaStatus", function() { return updateBaStatus; });
/* harmony import */ var _lib_services_playerCommandService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/services/playerCommandService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerCommandService.js");

var updateBaStatus = function updateBaStatus(param) {
  return function () {
    var commandService = new _lib_services_playerCommandService__WEBPACK_IMPORTED_MODULE_0__["default"]();
    return commandService.updateBaStatus(param);
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridHandlerAction.js":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridHandlerAction.js ***!
  \*********************************************************************************************/
/*! exports provided: setDisplayedColumnList, setPlayerList, setCurrentActivePlayer, setPagingOption, exportExcel, setIsFetchingData, setSweetAlertOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDisplayedColumnList", function() { return setDisplayedColumnList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPlayerList", function() { return setPlayerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCurrentActivePlayer", function() { return setCurrentActivePlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPagingOption", function() { return setPagingOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportExcel", function() { return exportExcel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIsFetchingData", function() { return setIsFetchingData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSweetAlertOption", function() { return setSweetAlertOption; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
/* harmony import */ var _lib_services_playerQueryService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/services/playerQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerQueryService.js");


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
var setPagingOption = function setPagingOption(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_PAGING"],
    data: data
  };
};
var exportExcel = function exportExcel(playerList, param, displayedColumn) {
  return function () {
    var service = new _lib_services_playerQueryService__WEBPACK_IMPORTED_MODULE_1__["default"]();
    service.exportExcel(playerList, param, displayedColumn);
  };
};
var setIsFetchingData = function setIsFetchingData(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_IS_FETCHING_DATA"],
    data: data
  };
};
var setSweetAlertOption = function setSweetAlertOption(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SWEET_ALERT_OPTION"],
    data: data
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridOddsGroupAction.js":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridOddsGroupAction.js ***!
  \***********************************************************************************************/
/*! exports provided: setOddsGroupDropdownPosition, updateOddsGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOddsGroupDropdownPosition", function() { return setOddsGroupDropdownPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateOddsGroup", function() { return updateOddsGroup; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
/* harmony import */ var _lib_services_playerCommandService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/services/playerCommandService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerCommandService.js");


var setOddsGroupDropdownPosition = function setOddsGroupDropdownPosition(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_ODDSGROUP_POSITION"],
    data: data
  };
};
var updateOddsGroup = function updateOddsGroup(param) {
  return function () {
    var commandService = new _lib_services_playerCommandService__WEBPACK_IMPORTED_MODULE_1__["default"]();
    return commandService.updateOddsGroup(param);
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridPlayerStatusAction.js":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridPlayerStatusAction.js ***!
  \**************************************************************************************************/
/*! exports provided: setStatusDropdownPosition, updatePlayerStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStatusDropdownPosition", function() { return setStatusDropdownPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePlayerStatus", function() { return updatePlayerStatus; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
/* harmony import */ var _lib_services_playerCommandService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/services/playerCommandService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerCommandService.js");


var setStatusDropdownPosition = function setStatusDropdownPosition(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_STATUS_POSITION"],
    data: data
  };
};
var updatePlayerStatus = function updatePlayerStatus(param) {
  return function () {
    var commandService = new _lib_services_playerCommandService__WEBPACK_IMPORTED_MODULE_1__["default"]();
    return commandService.updatePlayerStatus(param);
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridSpecialLevelAction.js":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridSpecialLevelAction.js ***!
  \**************************************************************************************************/
/*! exports provided: setSpecialLevelDropdownPosition, updateSpecialLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSpecialLevelDropdownPosition", function() { return setSpecialLevelDropdownPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSpecialLevel", function() { return updateSpecialLevel; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
/* harmony import */ var _lib_services_playerCommandService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/services/playerCommandService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerCommandService.js");


var setSpecialLevelDropdownPosition = function setSpecialLevelDropdownPosition(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SPECIAL_LEVEL_POSITION"],
    data: data
  };
};
var updateSpecialLevel = function updateSpecialLevel(param) {
  return function () {
    var commandService = new _lib_services_playerCommandService__WEBPACK_IMPORTED_MODULE_1__["default"]();
    return commandService.updateSpecialLevel(param);
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridUserNameAction.js":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridUserNameAction.js ***!
  \**********************************************************************************************/
/*! exports provided: setContextMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContextMenu", function() { return setContextMenu; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");

var setContextMenu = function setContextMenu(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_CONTEXT_MENU"],
    data: data
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js ***!
  \*********************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _filterHandlerAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/filterHandlerAction.js");
/* harmony import */ var _playerDetailHandlerAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerDetailHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/playerDetailHandlerAction.js");
/* harmony import */ var _commonAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commonAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/commonAction.js");
/* harmony import */ var _gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gridHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridHandlerAction.js");
/* harmony import */ var _gridBaStatusAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gridBaStatusAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridBaStatusAction.js");
/* harmony import */ var _gridOddsGroupAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gridOddsGroupAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridOddsGroupAction.js");
/* harmony import */ var _gridSpecialLevelAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./gridSpecialLevelAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridSpecialLevelAction.js");
/* harmony import */ var _gridPlayerStatusAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gridPlayerStatusAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridPlayerStatusAction.js");
/* harmony import */ var _gridUserNameAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./gridUserNameAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridUserNameAction.js");
/* harmony import */ var _siteSettingAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./siteSettingAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/siteSettingAction.js");











var ActionCreators = Object.assign({}, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__, _commonAction__WEBPACK_IMPORTED_MODULE_3__, _filterHandlerAction__WEBPACK_IMPORTED_MODULE_1__, _playerDetailHandlerAction__WEBPACK_IMPORTED_MODULE_2__, _gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__, _gridBaStatusAction__WEBPACK_IMPORTED_MODULE_5__, _gridOddsGroupAction__WEBPACK_IMPORTED_MODULE_6__, _gridSpecialLevelAction__WEBPACK_IMPORTED_MODULE_7__, _gridPlayerStatusAction__WEBPACK_IMPORTED_MODULE_8__, _gridUserNameAction__WEBPACK_IMPORTED_MODULE_9__, _siteSettingAction__WEBPACK_IMPORTED_MODULE_10__);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/playerDetailHandlerAction.js":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/playerDetailHandlerAction.js ***!
  \*****************************************************************************************************/
/*! exports provided: getLink, getTabList, setSelectedPlayerIdList, setSelectedTabName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLink", function() { return getLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTabList", function() { return getTabList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedPlayerIdList", function() { return setSelectedPlayerIdList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedTabName", function() { return setSelectedTabName; });
/* harmony import */ var _lib_services_playerQueryService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/services/playerQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerQueryService.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");


var getLink = function getLink(systemType, action) {
  return function () {
    var service = new _lib_services_playerQueryService__WEBPACK_IMPORTED_MODULE_0__["default"]();
    return service.getLink(systemType, action);
  };
};
var getTabList = function getTabList() {
  return function () {
    var service = new _lib_services_playerQueryService__WEBPACK_IMPORTED_MODULE_0__["default"]();
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

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/siteSettingAction.js":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/siteSettingAction.js ***!
  \*********************************************************************************************/
/*! exports provided: getSiteSetting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSiteSetting", function() { return getSiteSetting; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
/* harmony import */ var _gridHandlerAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gridHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridHandlerAction.js");
/* harmony import */ var _lib_helpers_gridColumnBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/helpers/gridColumnBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/gridColumnBuilder.js");
/* harmony import */ var _lib_services_siteSettingService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/services/siteSettingService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/siteSettingService.js");




var getSiteSetting = function getSiteSetting(licType, isSubsidiary) {
  return function (dispatch) {
    var service = new _lib_services_siteSettingService__WEBPACK_IMPORTED_MODULE_3__["default"]();
    service.getSetting().then(function (response) {
      var _response$data = response.data,
          IsAllowedCustomerComm = _response$data.IsAllowedCustomerComm,
          IsAllowedBA = _response$data.IsAllowedBA;
      var isAllowedBA = !isSubsidiary && IsAllowedBA;

      if (isAllowedBA) {
        var columnList = Object(_lib_helpers_gridColumnBuilder__WEBPACK_IMPORTED_MODULE_2__["buildColumnList"])(licType, isAllowedBA);
        dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_1__["setDisplayedColumnList"])(columnList));
      }

      dispatch(setSiteSetting({
        isAllowedCustomerComm: IsAllowedCustomerComm,
        isAllowedBA: isAllowedBA
      }));
    })["catch"](function () {
      dispatch(setSiteSetting({
        isAllowedCustomerComm: false,
        isAllowedBA: false
      }));
    });
  };
};

var setSiteSetting = function setSiteSetting(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SITE_SETTING"],
    data: data
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js ***!
  \*********************************************************************************/
/*! exports provided: SET_PARAM, SET_PLAYER_LIST, SET_SELECTED_PLAYER, SET_SELECTED_PLAYERID_LIST, SET_ADVANCED_SEARCH, SET_COLLAPSE_FILTER, SET_DISPLAYED_COLUMN_LIST, SET_CURRENT_ACTIVE_PLAYER, SET_PAGING, SET_SELECTED_TAB_NAME, SET_IS_FETCHING_DATA, SET_ODDSGROUP_POSITION, SET_SPECIAL_LEVEL_POSITION, SET_STATUS_POSITION, SET_CONTEXT_MENU, SET_SWEET_ALERT_OPTION, SET_SITE_SETTING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PARAM", function() { return SET_PARAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PLAYER_LIST", function() { return SET_PLAYER_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_PLAYER", function() { return SET_SELECTED_PLAYER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_PLAYERID_LIST", function() { return SET_SELECTED_PLAYERID_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ADVANCED_SEARCH", function() { return SET_ADVANCED_SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_COLLAPSE_FILTER", function() { return SET_COLLAPSE_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_DISPLAYED_COLUMN_LIST", function() { return SET_DISPLAYED_COLUMN_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENT_ACTIVE_PLAYER", function() { return SET_CURRENT_ACTIVE_PLAYER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PAGING", function() { return SET_PAGING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_TAB_NAME", function() { return SET_SELECTED_TAB_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_IS_FETCHING_DATA", function() { return SET_IS_FETCHING_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ODDSGROUP_POSITION", function() { return SET_ODDSGROUP_POSITION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SPECIAL_LEVEL_POSITION", function() { return SET_SPECIAL_LEVEL_POSITION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_STATUS_POSITION", function() { return SET_STATUS_POSITION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CONTEXT_MENU", function() { return SET_CONTEXT_MENU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SWEET_ALERT_OPTION", function() { return SET_SWEET_ALERT_OPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SITE_SETTING", function() { return SET_SITE_SETTING; });
var SET_PARAM = 'PLAYER_ADMIN/SET_PARAM';
var SET_PLAYER_LIST = 'PLAYER_ADMIN/SET_PLAYER_LIST';
var SET_SELECTED_PLAYER = 'PLAYER_ADMIN/SET_SELECTED_PLAYER';
var SET_SELECTED_PLAYERID_LIST = 'PLAYER_ADMIN/SET_SELECTED_PLAYERID_LIST';
var SET_ADVANCED_SEARCH = 'PLAYER_ADMIN/SET_ADVANCED_SEARCH';
var SET_COLLAPSE_FILTER = 'PLAYER_ADMIN/SET_COLLAPSE_FILTER';
var SET_DISPLAYED_COLUMN_LIST = 'PLAYER_ADMIN/SET_DISPLAYED_COLUMN_LIST';
var SET_CURRENT_ACTIVE_PLAYER = 'PLAYER_ADMIN/SET_CURRENT_ACTIVE_PLAYER';
var SET_PAGING = 'PLAYER_ADMIN/SET_PAGING';
var SET_SELECTED_TAB_NAME = 'PLAYER_ADMIN/SET_SELECTED_TAB_NAME';
var SET_IS_FETCHING_DATA = 'PLAYER_ADMIN/SET_IS_FETCHING_DATA';
var SET_ODDSGROUP_POSITION = 'PLAYER_ADMIN/SET_ODDSGROUP_POSITION';
var SET_SPECIAL_LEVEL_POSITION = 'PLAYER_ADMIN/SET_SPECIAL_LEVEL_POSITION';
var SET_STATUS_POSITION = 'PLAYER_ADMIN/SET_STATUS_POSITION';
var SET_CONTEXT_MENU = 'PLAYER_ADMIN/SET_CONTEXT_MENU';
var SET_SWEET_ALERT_OPTION = 'PLAYER_ADMIN/SET_SWEET_ALERT_OPTION';
var SET_SITE_SETTING = 'PLAYER_ADMIN/SET_SITE_SETTING';

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AppContainer.jsx":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/AppContainer.jsx ***!
  \********************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Content */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/Content.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/FormFilter.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _PlayerDetail__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PlayerDetail */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/PlayerDetail.jsx");







var AppContainer = function AppContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_5__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isLoading: props.isLoading
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_2__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PlayerDetail__WEBPACK_IMPORTED_MODULE_6__["default"], null));
};

function mapStateToProps(state) {
  var isLoading = state.isLoading;
  return Object.assign({}, {
    isLoading: isLoading
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AppContainer)));

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
/* harmony import */ var _content_header_GridCaption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content-header/GridCaption */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/content-header/GridCaption.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/DataGrid.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Content = function Content(props) {
  var pagingOption = props.pagingOption;

  if (pagingOption.TotalItem === null) {
    return null;
  }

  var handlePaging = function handlePaging(pageIndex, pageSize) {
    var param = props.param,
        searchPlayer = props.searchPlayer;

    var newParam = _objectSpread({}, param, {
      pageIndex: pageIndex,
      pageSize: pageSize
    });

    searchPlayer(newParam);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "result-content"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Pager"], {
    pageOption: pagingOption,
    onPaging: handlePaging
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_content_header_GridCaption__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], null));
};

function mapDispatchToProps(dispatch) {
  var searchPlayer = _actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"].searchPlayer;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    searchPlayer: searchPlayer
  }, dispatch);
}

function mapStateToProps(state) {
  var pagingOption = state.pagingOption,
      param = state.param;
  return Object.assign({}, {
    pagingOption: pagingOption,
    param: param
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Content));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/DataGrid.jsx":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/DataGrid.jsx ***!
  \****************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _grid_ContextMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./grid/ContextMenu */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/ContextMenu.jsx");
/* harmony import */ var _grid_SpecialLevelDropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./grid/SpecialLevelDropdown */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/SpecialLevelDropdown.jsx");
/* harmony import */ var _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/helpers/gridHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/gridHelper.js");
/* harmony import */ var _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/services/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/gridInteractionService.js");
/* harmony import */ var _grid_OddsGroupDropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./grid/OddsGroupDropdown */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/OddsGroupDropdown.jsx");
/* harmony import */ var _grid_PlayerRow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./grid/PlayerRow */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/PlayerRow.jsx");
/* harmony import */ var _grid_StatusDropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./grid/StatusDropdown */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/StatusDropdown.jsx");
/* harmony import */ var _lib_helpers_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _components_sweet_alert__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/sweet-alert */ "./www/js/source/reactpages/components/sweet-alert/index.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















var MAX_WIDTH_PAGE = 1920;
var DataGrid =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DataGrid, _PureComponent);

  function DataGrid(props) {
    var _this;

    _classCallCheck(this, DataGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataGrid).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleSort", function (sortBy, sortOrder) {
      var _this$props = _this.props,
          playerList = _this$props.playerList,
          setPlayerList = _this$props.setPlayerList;
      var sortedPlayerList = _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_8__["default"].sortPlayerList(playerList, sortBy, sortOrder);
      setPlayerList(sortedPlayerList);
    });

    _this.maxWidth = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);
    return _this;
  }

  _createClass(DataGrid, [{
    key: "_renderDataSection",
    value: function _renderDataSection(dataList, displayedColumn) {
      var dataRows = [];

      for (var i = 0; i < dataList.length; i++) {
        var dataItem = dataList[i];
        var rowProps = {
          dataItem: dataItem,
          displayedColumn: displayedColumn
        };
        dataRows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grid_PlayerRow__WEBPACK_IMPORTED_MODULE_10__["default"], _extends({
          key: dataItem.LicenseeCustId
        }, rowProps)));
      }

      return dataRows;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          playerList = _this$props2.playerList,
          selectedPlayer = _this$props2.selectedPlayer,
          isFetchingData = _this$props2.isFetchingData,
          displayedColumnList = _this$props2.displayedColumnList,
          sweetAlertOption = _this$props2.sweetAlertOption;

      if (!playerList) {
        return null;
      }

      if (!playerList.length) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_13__["default"], null);
      }

      var dataList = selectedPlayer ? [playerList.find(function (item) {
        return item.LicenseeCustId === selectedPlayer.licenseeCustId;
      })] : playerList;
      var displayedColumn = Object(_lib_helpers_utils__WEBPACK_IMPORTED_MODULE_12__["buildDisplayedColumnObject"])(displayedColumnList);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Table"], {
        minWidth: 650,
        autoWidth: true,
        maxWidth: this.maxWidth,
        autoHeight: true,
        header: _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_7__["default"].renderHeader(displayedColumn),
        body: this._renderDataSection(dataList, displayedColumn),
        containerPadding: 30,
        shouldResetScrollPosition: isFetchingData,
        onSort: this.handleSort
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grid_ContextMenu__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grid_SpecialLevelDropdown__WEBPACK_IMPORTED_MODULE_6__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grid_OddsGroupDropdown__WEBPACK_IMPORTED_MODULE_9__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grid_StatusDropdown__WEBPACK_IMPORTED_MODULE_11__["default"], null), sweetAlertOption && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_sweet_alert__WEBPACK_IMPORTED_MODULE_14__["default"], sweetAlertOption));
    }
  }]);

  return DataGrid;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapDispatchToProps(dispatch) {
  var setPlayerList = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setPlayerList;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setPlayerList: setPlayerList
  }, dispatch);
}

function mapStateToProps(state) {
  var playerList = state.playerList,
      selectedPlayer = state.selectedPlayer,
      displayedColumnList = state.displayedColumnList,
      isFetchingData = state.isFetchingData,
      sweetAlertOption = state.sweetAlertOption;
  return Object.assign({}, {
    playerList: playerList,
    selectedPlayer: selectedPlayer,
    displayedColumnList: displayedColumnList,
    isFetchingData: isFetchingData,
    sweetAlertOption: sweetAlertOption
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/FormFilter.jsx":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/FormFilter.jsx ***!
  \******************************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _filter_AdvancedSearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./filter/AdvancedSearch */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/AdvancedSearch.jsx");
/* harmony import */ var _filter_SearchOption__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./filter/SearchOption */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/SearchOption.jsx");
/* harmony import */ var _filter_AthenaSearch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./filter/AthenaSearch */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/AthenaSearch.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/UserGuide */ "./www/js/source/reactpages/components/UserGuide.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _filter_UserNameInput__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./filter/UserNameInput */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/UserNameInput.jsx");
/* harmony import */ var _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/lib/QueryString */ "./www/js/source/reactpages/lib/QueryString.js");
/* harmony import */ var _jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/lib/htmlHelper */ "./www/js/source/reactpages/lib/htmlHelper.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

      _this.searchPlayer();
    });

    _defineProperty(_assertThisInitialized(_this), "handlePressEnter", function (event) {
      if (event.charCode === 13) {
        _this.searchPlayer();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      _this.setState(_defineProperty({}, name, value));
    });

    _defineProperty(_assertThisInitialized(_this), "handleSpecificInputChange", function (name, value) {
      _this.setState(_defineProperty({}, name, value));
    });

    _defineProperty(_assertThisInitialized(_this), "handleUserNameChange", function (value) {
      _this.userNameRef.current.value = value;

      _this.setState({
        isValidUserName: !!value
      });
    });

    _this.allOddsGroupString = Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_8__["oddsGroupListWithStyle"]).join(',');
    _this.allCurrencyString = props.currencyList.map(function (c) {
      return c.Id;
    }).join(',');
    _this.allSpecialLevel = Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_8__["specialLevelListWithColor"]).map(function (item) {
      return item;
    }).join(',');
    _this.userGuide = _this._renderUserGuide();
    _this.userNameRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.state = {
      isValidUserName: false,
      bankAccountNumber: '',
      email: '',
      currencyIdList: _this.allCurrencyString,
      oddsGroup: _this.allOddsGroupString,
      specialLevel: _this.allSpecialLevel,
      baFilter: _lib_constants__WEBPACK_IMPORTED_MODULE_8__["baStatusList"].All,
      searchOption: _lib_constants__WEBPACK_IMPORTED_MODULE_8__["searchOptions"].matchPrefix
    };
    return _this;
  }

  _createClass(FormFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var ibcCustId = Number(_jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_13__["default"].getParam(window.location.href, 'custId'));
      var licenseeCustId = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_13__["default"].getParam(window.location.href, 'licenseeCustId');

      if (ibcCustId || licenseeCustId) {
        var param = {
          ibcCustId: ibcCustId,
          licenseeCustId: licenseeCustId
        };
        this.props.getSinglePlayer(param);
        var userName = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_13__["default"].getParam(window.location.href, 'userName');
        this.userNameRef.current.value = userName;
        this.setState({
          isValidUserName: !!userName
        });
      }

      var _this$props = this.props,
          type = _this$props.type,
          isSubsidiary = _this$props.isSubsidiary;
      this.props.getSiteSetting(type, isSubsidiary);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var isAdvancedSearch = this.props.isAdvancedSearch;

      if (prevProps.isAdvancedSearch !== isAdvancedSearch && !isAdvancedSearch) {
        this.setState({
          currencyIdList: this.allCurrencyString,
          oddsGroup: this.allOddsGroupString,
          specialLevel: this.allSpecialLevel,
          baFilter: _lib_constants__WEBPACK_IMPORTED_MODULE_8__["baStatusList"].All
        });
      }
    }
  }, {
    key: "searchPlayer",
    value: function searchPlayer() {
      var userName = this.userNameRef.current.value;
      var _this$state = this.state,
          bankAccountNumber = _this$state.bankAccountNumber,
          email = _this$state.email;

      if (!userName && !bankAccountNumber && !email) {
        return;
      }

      var emailRegex = new RegExp(_lib_constants__WEBPACK_IMPORTED_MODULE_8__["emailPattern"]);

      if (email && !emailRegex.test(email)) {
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource('InvalidEmail'));
        return;
      }

      var _this$props2 = this.props,
          pagingOption = _this$props2.pagingOption,
          searchPlayer = _this$props2.searchPlayer,
          currencyList = _this$props2.currencyList;

      var _this$state2 = this.state,
          specialLevel = _this$state2.specialLevel,
          currencyIdList = _this$state2.currencyIdList,
          oddsGroup = _this$state2.oddsGroup,
          isValidUserName = _this$state2.isValidUserName,
          restParam = _objectWithoutProperties(_this$state2, ["specialLevel", "currencyIdList", "oddsGroup", "isValidUserName"]);

      var actualSpecialLevel = specialLevel.trim();
      var isSelectAllCurrency = currencyIdList.trim().split(',').length === currencyList.length;
      var isSelectAllOddsGroup = oddsGroup.trim().split(',').length === Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_8__["oddsGroupListWithStyle"]).length;

      var param = _objectSpread({}, restParam, {
        userName: Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_14__["encode"])(userName),
        currencyIdList: isSelectAllCurrency ? '' : currencyIdList,
        oddsGroup: isSelectAllOddsGroup ? '' : oddsGroup,
        specialLevel: actualSpecialLevel === '' ? this.allSpecialLevel : actualSpecialLevel,
        pageSize: pagingOption.PageSize,
        pageIndex: 1
      });

      searchPlayer(param);
    }
  }, {
    key: "showUserGuide",
    value: function showUserGuide() {}
  }, {
    key: "_renderUserGuide",
    value: function _renderUserGuide() {
      var userGuideContent = 'Player Admin User Guide';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_10__["default"], {
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("UserGuide"),
        contentTitle: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("PlayerAdmin"),
        onClick: this.showUserGuide,
        content: userGuideContent
      });
    }
  }, {
    key: "_getUserNameLabel",
    value: function _getUserNameLabel() {
      return this.props.type === _lib_constants__WEBPACK_IMPORTED_MODULE_8__["licenseeType"].nonApi ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("Username") : "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("Username"), "/").concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("VendorMemberID"));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state3 = this.state,
          bankAccountNumber = _this$state3.bankAccountNumber,
          email = _this$state3.email,
          searchOption = _this$state3.searchOption,
          isValidUserName = _this$state3.isValidUserName,
          advancedSearchParam = _objectWithoutProperties(_this$state3, ["bankAccountNumber", "email", "searchOption", "isValidUserName"]);

      var _this$props3 = this.props,
          type = _this$props3.type,
          isAdvancedSearch = _this$props3.isAdvancedSearch,
          isFilterCollapsing = _this$props3.isFilterCollapsing,
          currencyList = _this$props3.currencyList,
          getSuggestionList = _this$props3.getSuggestionList,
          siteSetting = _this$props3.siteSetting;
      var currencyIdList = advancedSearchParam.currencyIdList,
          oddsGroup = advancedSearchParam.oddsGroup,
          specialLevel = advancedSearchParam.specialLevel;
      var isValidParam = (isValidUserName || !!bankAccountNumber || !!email) && !!currencyIdList && !!oddsGroup && !!specialLevel;
      var iconToggle = {
        tag: 'div',
        className: isFilterCollapsing ? 'chevron down' : 'chevron up',
        style: {}
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "page-filter",
        iconToggle: iconToggle,
        stickyFooter: this.userGuide,
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
      }, this._getUserNameLabel(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filter_SearchOption__WEBPACK_IMPORTED_MODULE_6__["default"], {
        value: searchOption,
        onChange: this.handleChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filter_UserNameInput__WEBPACK_IMPORTED_MODULE_12__["default"], {
        ref: this.userNameRef,
        onSelectItem: function onSelectItem(value) {
          return _this2.handleUserNameChange(value);
        },
        minChar: 3,
        getSuggestionList: getSuggestionList,
        searchOption: searchOption,
        onKeyPress: this.handlePressEnter,
        onChange: function onChange(value) {
          return _this2.handleUserNameChange(value);
        }
      }))), type === _lib_constants__WEBPACK_IMPORTED_MODULE_8__["licenseeType"].nonApi && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filter_AthenaSearch__WEBPACK_IMPORTED_MODULE_7__["default"], {
        onChange: this.handleChange,
        bankAccountNumber: bankAccountNumber,
        email: email,
        onKeyPress: this.handlePressEnter
      }), isAdvancedSearch && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filter_AdvancedSearch__WEBPACK_IMPORTED_MODULE_5__["default"], {
        currencyList: currencyList,
        param: advancedSearchParam,
        isAllowedBA: siteSetting.isAllowedBA,
        onChange: this.handleSpecificInputChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "button-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "btn btn-submit",
        disabled: !isValidParam,
        onClick: this.handleSubmit
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("Submit"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_4__["default"], {
        id: "isAdvancedSearch",
        checked: isAdvancedSearch,
        onChange: function onChange(checked) {
          return _this2.props.setAdvancedSearch(checked);
        },
        label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("AdvancedSearch")
      })))));
    }
  }]);

  return FormFilter;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapDispatchToProps(dispatch) {
  var searchPlayer = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].searchPlayer,
      setAdvancedSearch = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setAdvancedSearch,
      setCollapseFilter = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setCollapseFilter,
      getSuggestionList = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].getSuggestionList,
      getSinglePlayer = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].getSinglePlayer,
      getSiteSetting = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].getSiteSetting;
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    searchPlayer: searchPlayer,
    setAdvancedSearch: setAdvancedSearch,
    setCollapseFilter: setCollapseFilter,
    getSuggestionList: getSuggestionList,
    getSinglePlayer: getSinglePlayer,
    getSiteSetting: getSiteSetting
  }, dispatch);
}

function mapStateToProps(state) {
  var type = state.type,
      isAdvancedSearch = state.isAdvancedSearch,
      isFilterCollapsing = state.isFilterCollapsing,
      pagingOption = state.pagingOption,
      currencyList = state.currencyList,
      siteSetting = state.siteSetting,
      isSubsidiary = state.isSubsidiary;
  return Object.assign({}, {
    type: type,
    isAdvancedSearch: isAdvancedSearch,
    isFilterCollapsing: isFilterCollapsing,
    pagingOption: pagingOption,
    currencyList: currencyList,
    siteSetting: siteSetting,
    isSubsidiary: isSubsidiary
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/PlayerDetail.jsx":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/PlayerDetail.jsx ***!
  \********************************************************************************************/
/*! exports provided: PlayerDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerDetail", function() { return PlayerDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
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
    value: function _buildActionUrl(systemType, action, tabName) {
      var selectedPlayer = this.props.selectedPlayer;
      var ibcCustId = selectedPlayer.ibcCustId,
          licenseeCustId = selectedPlayer.licenseeCustId,
          currencyId = selectedPlayer.currencyId,
          currency = selectedPlayer.currency,
          userName = selectedPlayer.userName,
          createdDate = selectedPlayer.createdDate;
      var custIdQueryString = "custId=".concat(ibcCustId, "&licenseeCustId=").concat(licenseeCustId);
      var nameValuePairString = custIdQueryString + "&currencyId=".concat(currencyId, "&currencyName=").concat(currency, "&userName=").concat(userName);
      var queryString = (action.indexOf('?') !== -1 ? '&' : '?') + nameValuePairString;
      var urlByPlayer = action + queryString;

      if (tabName === _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabNames"].playerInfo) {
        urlByPlayer += "&createdDate=".concat(encodeURIComponent(createdDate));
      }

      return this.props.getLink(systemType, urlByPlayer);
    }
  }, {
    key: "_renderTabList",
    value: function _renderTabList(tabList) {
      var _this2 = this;

      var selectedPlayer = this.props.selectedPlayer;

      var selectedTabName = this.props.selectedTabName || this._getDefaultSelectedTab();

      var isDeposit = selectedPlayer.isDeposit,
          isArchived = selectedPlayer.isArchived;
      var renderedTabList = !isDeposit || isArchived ? tabList.filter(function (item) {
        return !_lib_constants__WEBPACK_IMPORTED_MODULE_4__["excludedTabNameWithNonDepositAndArchived"].includes(item.Name);
      }) : tabList;
      return renderedTabList.map(function (item) {
        var actionUrl = _this2._buildActionUrl(item.SystemType, item.Action, item.Name);

        var tabNameBySelectedMenu = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabNameByContextMenu"][selectedTabName];
        var isActive = tabNameBySelectedMenu === item.Name || selectedTabName === item.Name;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "tab",
          key: item.Name
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: isActive ? "active" : "",
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
      var tabNameBySelectedMenu = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabNameByContextMenu"][selectedTabName];
      var tabItem = selectedTabName ? this._tabList.find(function (t) {
        return t.Name === tabNameBySelectedMenu || t.Name === selectedTabName;
      }) : this._tabList[0];
      var action = tabNameBySelectedMenu ? "".concat(tabItem.Action, "?subTab=").concat(selectedTabName) : tabItem.Action;
      return tabItem && this._buildActionUrl(tabItem.SystemType, action, tabItem.Name);
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
        return null;
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

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/content-header/GridCaption.jsx":
/*!**********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/content-header/GridCaption.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: GridCaption, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridCaption", function() { return GridCaption; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @9softstudio/react-multiselect */ "./node_modules/@9softstudio/react-multiselect/dist/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_helpers_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
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









var GridCaption =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GridCaption, _React$Component);

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

    _defineProperty(_assertThisInitialized(_this), "handleExportExcel", function () {
      var _this$props2 = _this.props,
          playerList = _this$props2.playerList,
          param = _this$props2.param,
          displayedColumnList = _this$props2.displayedColumnList,
          exportExcel = _this$props2.exportExcel,
          selectedPlayer = _this$props2.selectedPlayer;

      if (displayedColumnList.filter(function (x) {
        return x.show;
      }).length === 0) {
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("NoInfo"));
        return;
      }

      var displayedColumn = Object(_lib_helpers_utils__WEBPACK_IMPORTED_MODULE_7__["buildDisplayedColumnObject"])(displayedColumnList);
      var dataList = selectedPlayer ? [playerList.find(function (item) {
        return item.LicenseeCustId === selectedPlayer.licenseeCustId;
      })] : playerList;
      exportExcel(dataList, param, displayedColumn);
    });

    return _this;
  }

  _createClass(GridCaption, [{
    key: "_buildDisplayedColumnList",
    value: function _buildDisplayedColumnList() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5___default.a, {
        id: "columnList",
        className: "selection-column",
        language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].currentLanguage,
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

      var selectedPlayer = this.props.selectedPlayer;

      if (selectedPlayer) {
        var userName = selectedPlayer.userName,
            currency = selectedPlayer.currency;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "link",
          onClick: function onClick() {
            return _this2.props.setSelectedPlayer(null);
          }
        }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('PreviousSearchResult')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "chevron right icon-separator"
        }), " ", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('Player'), ": ", userName, " ", currency && "(".concat(currency, ")")));
      } else {
        var playerCount = this.props.playerCount;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          key: "searchResult"
        }, "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('SearchResult'), ": ").concat(playerCount, " ").concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('Player'), "(s)"));
      }
    }
  }, {
    key: "_buildRightPart",
    value: function _buildRightPart() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "caret-block"
      }, this._buildDisplayedColumnList(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon-excel-wrapper",
        onClick: this.handleExportExcel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-excel",
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('ExportToExcel')
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var Content = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this._buildLeftPart(), this._buildRightPart());
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_4__["default"], {
        tag: "div",
        content: Content
      });
    }
  }]);

  return GridCaption;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function mapDispatchToProps(dispatch) {
  var setSelectedPlayer = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setSelectedPlayer,
      setDisplayedColumnList = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setDisplayedColumnList,
      exportExcel = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].exportExcel;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setSelectedPlayer: setSelectedPlayer,
    setDisplayedColumnList: setDisplayedColumnList,
    exportExcel: exportExcel
  }, dispatch);
}

function mapStateToProps(state) {
  var pagingOption = state.pagingOption,
      selectedPlayer = state.selectedPlayer,
      displayedColumnList = state.displayedColumnList,
      param = state.param,
      playerList = state.playerList;
  var playerCount = pagingOption.TotalItem || playerList && playerList.length || 0;
  return Object.assign({}, {
    playerList: playerList,
    playerCount: playerCount,
    selectedPlayer: selectedPlayer,
    displayedColumnList: displayedColumnList,
    param: param
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(GridCaption));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/AdvancedSearch.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/AdvancedSearch.jsx ***!
  \*****************************************************************************************************/
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
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_helpers_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
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








var AdvancedSearch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AdvancedSearch, _React$Component);

  function AdvancedSearch(props) {
    var _this;

    _classCallCheck(this, AdvancedSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AdvancedSearch).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (name, value) {
      _this.props.onChange(name, value);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeSingleDropdown", function (name, item) {
      _this.props.onChange(name, item.value);
    });

    _this.oddsGroupList = Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_4__["oddsGroupListWithStyle"]).map(function (item) {
      return {
        Id: item,
        Value: item,
        Status: true
      };
    });
    _this.specialLevelList = Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_4__["specialLevelListWithColor"]).map(function (item) {
      return {
        Id: item,
        Value: Object(_lib_helpers_utils__WEBPACK_IMPORTED_MODULE_6__["getSpecialLevelText"])(item),
        Status: true
      };
    });
    _this.baStatusList = Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_4__["baStatusList"]).map(function (item) {
      return {
        value: _lib_constants__WEBPACK_IMPORTED_MODULE_4__["baStatusList"][item],
        label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource(item)
      };
    });
    return _this;
  }

  _createClass(AdvancedSearch, [{
    key: "_createSelectData",
    value: function _createSelectData(originalList, selectedItemString) {
      var selectedItemList = selectedItemString.split(',').filter(function (x) {
        return x !== '';
      });
      return originalList.map(function (item) {
        var Id = item.Id,
            Value = item.Value;
        return {
          Id: Id,
          Value: Value,
          Status: selectedItemString === '' || selectedItemList.indexOf(Id) !== -1
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          currencyList = _this$props.currencyList,
          param = _this$props.param,
          isAllowedBA = _this$props.isAllowedBA;
      var currencyIdList = param.currencyIdList,
          oddsGroup = param.oddsGroup,
          specialLevel = param.specialLevel,
          baFilter = param.baFilter;

      var convertedCurrencyList = this._createSelectData(currencyList, currencyIdList);

      var oddsGroupList = this._createSelectData(this.oddsGroupList, oddsGroup);

      var specialLevelList = this._createSelectData(this.specialLevelList, specialLevel);

      var selectedBaStatus = isAllowedBA ? this.baStatusList.find(function (x) {
        return x.value === baFilter;
      }) : null;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("Currency")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
        id: "currency",
        dataSource: convertedCurrencyList,
        keyField: "Id",
        valueField: "Value",
        statusField: "Status",
        onChange: function onChange(currentItem, selectedItemsKey) {
          return _this2.handleChange('currencyIdList', selectedItemsKey);
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("OddsGroup")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
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
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("SpecialLevel")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a, {
        id: "specialLevel",
        dataSource: specialLevelList,
        keyField: "Id",
        valueField: "Value",
        statusField: "Status",
        onChange: function onChange(currentItem, selectedItemsKey) {
          return _this2.handleChange('specialLevel', selectedItemsKey);
        }
      }))), selectedBaStatus !== null && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("BA")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
        instanceId: "ddlBaStatus",
        name: "form-field-name",
        value: selectedBaStatus,
        options: this.baStatusList,
        onChange: function onChange(item) {
          return _this2.handleChangeSingleDropdown('baFilter', item);
        }
      }))));
    }
  }]);

  return AdvancedSearch;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
var propTypes = {
  param: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    currencyIdList: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
    oddsGroup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
    specialLevel: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
    baFilter: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired
  }).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};
AdvancedSearch.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (AdvancedSearch);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/AthenaSearch.jsx":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/AthenaSearch.jsx ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");




var AthenaSearch = function AthenaSearch(props) {
  var bankAccountNumber = props.bankAccountNumber,
      email = props.email,
      onChange = props.onChange,
      onKeyPress = props.onKeyPress;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("BankAccountNumber")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "input-text",
    id: "bankAccountNumber",
    name: "bankAccountNumber",
    type: "text",
    value: bankAccountNumber,
    autoComplete: "off",
    onChange: onChange,
    onKeyPress: onKeyPress,
    placeholder: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('PlaceholderBankAccount')
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource("Email")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "input-text",
    id: "email",
    name: "email",
    type: "text",
    value: email,
    autoComplete: "off",
    onChange: onChange,
    onKeyPress: onKeyPress,
    placeholder: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('PlaceholderEmail')
  }))));
};

var propTypes = {
  bankAccountNumber: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  email: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onKeyPress: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
AthenaSearch.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AthenaSearch));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/SearchOption.jsx":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/SearchOption.jsx ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var SearchOption = function SearchOption(props) {
  var value = props.value,
      onChange = props.onChange;

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
  var selectedValue = value || _lib_constants__WEBPACK_IMPORTED_MODULE_2__["searchOptions"].matchPrefix;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownButton"], {
    className: "search-option",
    isOpen: isOpen,
    toggleButton: toggleButton,
    onToggle: handleToggleDropdown,
    buttonLabel: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "material-icons"
    }, "settings"),
    onClose: handleClose
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], {
    tag: "div"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "selection-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "searchOption",
    value: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["searchOptions"].matchPrefix,
    checked: selectedValue === _lib_constants__WEBPACK_IMPORTED_MODULE_2__["searchOptions"].matchPrefix,
    onChange: onChange
  }), _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('MatchPrefix'), " \"", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "keyword"
  }, "test"), "\"ABCD")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], {
    tag: "div"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "selection-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "searchOption",
    value: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["searchOptions"].matchCase,
    checked: selectedValue === _lib_constants__WEBPACK_IMPORTED_MODULE_2__["searchOptions"].matchCase,
    onChange: onChange
  }), _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('MatchCase'), " AB\"", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "keyword"
  }, "test"), "\"CD")));
};

/* harmony default export */ __webpack_exports__["default"] = (SearchOption);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/UserNameInput.jsx":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/filter/UserNameInput.jsx ***!
  \****************************************************************************************************/
/*! exports provided: UserNameInput, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserNameInput", function() { return UserNameInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
/* harmony import */ var _jsroot_components_utils_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/utils/timer */ "./www/js/source/reactpages/components/utils/timer.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var UserNameInput = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (props, userNameRef) {
  var onSelectItem = props.onSelectItem,
      minChar = props.minChar,
      getSuggestionList = props.getSuggestionList,
      searchOption = props.searchOption,
      onChange = props.onChange,
      inputAttributes = _objectWithoutProperties(props, ["onSelectItem", "minChar", "getSuggestionList", "searchOption", "onChange"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpenSuggestion = _useState2[0],
      setIsOpenSuggestion = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      suggestionList = _useState4[0],
      setSuggestionList = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      _useState6 = _slicedToArray(_useState5, 2),
      dropdownStyle = _useState6[0],
      setDropdownStyle = _useState6[1];

  var cachedDataRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({});

  var handleChange = function handleChange() {
    var element = userNameRef.current;

    if (!element) {
      return;
    }

    var rect = element.getBoundingClientRect();
    var style = {
      left: rect.left,
      top: rect.top + rect.height,
      width: rect.width,
      position: 'fixed'
    };

    var handleSuggestionResult = function handleSuggestionResult(resultData) {
      setDropdownStyle(style);
      setSuggestionList(resultData);
      var hasData = resultData && resultData.length;
      setIsOpenSuggestion(!!hasData);
    };

    var value = element.value;

    if (value.length >= minChar) {
      var cachedData = cachedDataRef.current;
      var cacheKey = value + '_' + searchOption;

      if (cachedData[cacheKey]) {
        var result = cachedData[cacheKey];
        handleSuggestionResult(result);
      } else {
        var param = {
          keyword: value,
          searchType: searchOption
        };
        getSuggestionList(param).then(function (response) {
          var result = response.data || [];
          handleSuggestionResult(result);
          cachedData[cacheKey] = result;
        });
      }
    } else {
      setIsOpenSuggestion(false);
      setSuggestionList([]);
    }

    onChange && onChange(value);
  };

  var debounceChange = _jsroot_components_utils_timer__WEBPACK_IMPORTED_MODULE_2__["default"].debounce(handleChange, 300);

  var handleSelectSuggestionItem = function handleSelectSuggestionItem(value) {
    onSelectItem && onSelectItem(value);
    handleCloseDropdown();
  };

  var handleCloseDropdown = function handleCloseDropdown() {
    setIsOpenSuggestion(false);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pa-username"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
    className: "input-text",
    id: "userName",
    name: "userName",
    type: "text",
    ref: userNameRef,
    autoComplete: "off",
    onChange: debounceChange
  }, inputAttributes)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownMenu"], {
    isOpen: isOpenSuggestion,
    style: dropdownStyle
  }, suggestionList.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], {
      key: item,
      onClick: function onClick() {
        return handleSelectSuggestionItem(item);
      }
    }, item);
  }))));
});
/* harmony default export */ __webpack_exports__["default"] = (UserNameInput);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/BaStatusCell.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/BaStatusCell.jsx ***!
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
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jsroot_components_Switcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/Switcher */ "./www/js/source/reactpages/components/Switcher.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/services/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/gridInteractionService.js");
/* harmony import */ var _lib_helpers_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
/* harmony import */ var _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../lib/sweetAlert */ "./www/js/source/reactpages/lib/sweetAlert.js");











var BaStatusCell = function BaStatusCell(props) {
  var dataItem = props.dataItem,
      setPlayerList = props.setPlayerList,
      toggleLoader = props.toggleLoader,
      updateBaStatus = props.updateBaStatus,
      setSweetAlertOption = props.setSweetAlertOption,
      playerList = props.playerList,
      hasBaPermission = props.hasBaPermission;
  var IbcCustId = dataItem.IbcCustId,
      BaStatus = dataItem.BaStatus,
      OddsGroup = dataItem.OddsGroup,
      IsArchived = dataItem.IsArchived,
      LicenseeCustId = dataItem.LicenseeCustId;

  var handleChangeBaStatus = function handleChangeBaStatus(event) {
    event.preventDefault();

    if (!hasBaPermission) {
      return;
    }

    var handleCloseAlert = function handleCloseAlert() {
      setSweetAlertOption(null);
    };

    var isBa = event.target.checked;
    var resourceName = isBa ? 'AlertTurnOnBAMsg' : 'AlertTurnOffBAMsg';
    var confirmMessage = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(resourceName);
    var cancelProps = {
      onClick: handleCloseAlert
    };
    var confirmProps = {
      onClick: function onClick() {
        var param = {
          custId: IbcCustId,
          isBa: isBa,
          LicenseeCustId: LicenseeCustId
        };
        toggleLoader(true);
        updateBaStatus(param).then(function (response) {
          var _response$data = response.data,
              Success = _response$data.Success,
              Message = _response$data.Message,
              ErrorMessage = _response$data.ErrorMessage,
              ExtendedData = _response$data.ExtendedData;

          if (Success) {
            var oddsGroup = ExtendedData || OddsGroup;
            var newPlayerList = _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_7__["default"].updatePlayerWithBaStatus(playerList, IbcCustId, isBa, oddsGroup);
            setPlayerList(newPlayerList);
          }

          var resultMessage = Success ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('UpdateSuccess') : Message || _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(ErrorMessage);
          var displayIcon = Success ? _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].success : _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].error;
          var alertOpt = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultAlertOption"])(resultMessage, handleCloseAlert, null, displayIcon);
          setSweetAlertOption(alertOpt);
          toggleLoader(false);
        })["catch"](function (error) {
          console.log(error.message);
          var message = Object(_lib_helpers_utils__WEBPACK_IMPORTED_MODULE_8__["getErrorMessageForUpdating"])(error);
          var alertOpt = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultAlertOption"])(message, handleCloseAlert, null, _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].error);
          setSweetAlertOption(alertOpt);
          toggleLoader(false);
        });
      }
    };
    var confirmOption = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultConfirmOption"])(confirmMessage, handleCloseAlert, confirmProps, cancelProps);
    setSweetAlertOption(confirmOption);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
    className: "center-align" + "".concat(!hasBaPermission ? ' ba-disabled' : '')
  }, !IsArchived && BaStatus !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Switcher__WEBPACK_IMPORTED_MODULE_5__["default"], {
    disabled: !hasBaPermission,
    checked: BaStatus,
    onChange: handleChangeBaStatus
  }));
};

function mapDispatchToProps(dispatch) {
  var setPlayerList = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setPlayerList,
      toggleLoader = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].toggleLoader,
      updateBaStatus = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].updateBaStatus,
      setSweetAlertOption = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setSweetAlertOption;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setPlayerList: setPlayerList,
    toggleLoader: toggleLoader,
    updateBaStatus: updateBaStatus,
    setSweetAlertOption: setSweetAlertOption
  }, dispatch);
}

function mapStateToProps(state) {
  var playerList = state.playerList,
      hasBaPermission = state.hasBaPermission;
  return Object.assign({}, {
    playerList: playerList,
    hasBaPermission: hasBaPermission
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(BaStatusCell));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/ContextMenu.jsx":
/*!************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/ContextMenu.jsx ***!
  \************************************************************************************************/
/*! exports provided: ContextMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextMenu", function() { return ContextMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
/* harmony import */ var _lib_helpers_contextMenuHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/helpers/contextMenuHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/contextMenuHelper.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var ContextMenu = function ContextMenu(props) {
  var setSelectedPlayer = props.setSelectedPlayer,
      currentActivePlayer = props.currentActivePlayer,
      setSelectedTabName = props.setSelectedTabName,
      getTabList = props.getTabList,
      contextMenu = props.contextMenu,
      type = props.type;
  var position = contextMenu.position,
      isOpenContextMenu = contextMenu.isOpen;

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
    var ibcCustId = currentActivePlayer.ibcCustId,
        userName = currentActivePlayer.userName,
        currency = currentActivePlayer.currency,
        isDeposit = currentActivePlayer.isDeposit,
        isArchived = currentActivePlayer.isArchived,
        licenseeCustId = currentActivePlayer.licenseeCustId,
        currencyId = currentActivePlayer.currencyId,
        createdDate = currentActivePlayer.createdDate;
    var selectedPlayer = {
      ibcCustId: ibcCustId,
      userName: userName,
      currency: currency,
      isDeposit: isDeposit,
      isArchived: isArchived,
      licenseeCustId: licenseeCustId,
      currencyId: currencyId,
      createdDate: createdDate
    };
    setSelectedPlayer(selectedPlayer);
  };

  var style = position && {
    top: position.y,
    left: position.x
  };
  var activeMenuList = [];

  if (currentActivePlayer) {
    var tabList = getTabList();
    activeMenuList = Object(_lib_helpers_contextMenuHelper__WEBPACK_IMPORTED_MODULE_5__["getActiveTabList"])(currentActivePlayer, tabList, type);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown context-menu",
    style: style
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_4__["DropdownMenu"], {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    isOpen: isOpenContextMenu || isOpen
  }, activeMenuList.map(function (item) {
    var subTabName = item.subTabName;
    var selectedTabName = subTabName || item.tabName;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_4__["DropdownItem"], {
      key: item.key,
      onClick: function onClick() {
        return handleClickMenu(selectedTabName);
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
  var currentActivePlayer = state.currentActivePlayer,
      contextMenu = state.contextMenu,
      type = state.type;
  return Object.assign({}, {
    currentActivePlayer: currentActivePlayer,
    contextMenu: contextMenu,
    type: type
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(ContextMenu));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/OddsGroupCell.jsx":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/OddsGroupCell.jsx ***!
  \**************************************************************************************************/
/*! exports provided: OddsGroupCell, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OddsGroupCell", function() { return OddsGroupCell; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _jsroot_components_DropdownLabel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/DropdownLabel */ "./www/js/source/reactpages/components/DropdownLabel.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/services/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/gridInteractionService.js");
/* harmony import */ var _lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/helpers/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerDataBuilder.js");








var OddsGroupCell = function OddsGroupCell(props) {
  var dataItem = props.dataItem,
      oddsGroupDropdownPosition = props.oddsGroupDropdownPosition,
      setCurrentActivePlayer = props.setCurrentActivePlayer,
      setOddsGroupDropdownPosition = props.setOddsGroupDropdownPosition,
      hasOddsGroupPermission = props.hasOddsGroupPermission;
  var value = dataItem.OddsGroup;
  var style = _lib_constants__WEBPACK_IMPORTED_MODULE_3__["oddsGroupListWithStyle"][value];
  var canUpdate = hasOddsGroupPermission && !dataItem.BaStatus;

  var handleToggleOddsGroup = function handleToggleOddsGroup(event) {
    if (!canUpdate) {
      return;
    }

    var currentActivePlayer = Object(_lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_7__["buildCurrentActivePlayer"])(dataItem);
    setCurrentActivePlayer(currentActivePlayer);
    var dropdownName = 'oddsGroupDropdown';
    var newPosition = _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_6__["default"].getNextDropdownPosition(event.target, oddsGroupDropdownPosition, dropdownName);
    setOddsGroupDropdownPosition(newPosition);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_DropdownLabel__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: canUpdate ? '' : 'disabled',
    text: value,
    labelStyle: style,
    onClick: handleToggleOddsGroup
  });
};

function mapDispatchToProps(dispatch) {
  var setCurrentActivePlayer = _actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"].setCurrentActivePlayer,
      setOddsGroupDropdownPosition = _actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"].setOddsGroupDropdownPosition;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setCurrentActivePlayer: setCurrentActivePlayer,
    setOddsGroupDropdownPosition: setOddsGroupDropdownPosition
  }, dispatch);
}

function mapStateToProps(state) {
  var oddsGroupDropdownPosition = state.oddsGroupDropdownPosition,
      hasOddsGroupPermission = state.hasOddsGroupPermission;
  return Object.assign({}, {
    oddsGroupDropdownPosition: oddsGroupDropdownPosition,
    hasOddsGroupPermission: hasOddsGroupPermission
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(OddsGroupCell));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/OddsGroupDropdown.jsx":
/*!******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/OddsGroupDropdown.jsx ***!
  \******************************************************************************************************/
/*! exports provided: OddsGroupDropdown, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OddsGroupDropdown", function() { return OddsGroupDropdown; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/services/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/gridInteractionService.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_helpers_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
/* harmony import */ var _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../lib/sweetAlert */ "./www/js/source/reactpages/lib/sweetAlert.js");










var OddsGroupDropdown = function OddsGroupDropdown(props) {
  var oddsGroupDropdownPosition = props.oddsGroupDropdownPosition,
      setOddsGroupDropdownPosition = props.setOddsGroupDropdownPosition;
  var isOpen = oddsGroupDropdownPosition !== null;
  var style = oddsGroupDropdownPosition && {
    top: oddsGroupDropdownPosition.y,
    left: oddsGroupDropdownPosition.x
  };

  var handleClose = function handleClose() {
    setOddsGroupDropdownPosition(null);
  };

  var currentActivePlayer = props.currentActivePlayer,
      updateOddsGroup = props.updateOddsGroup,
      playerList = props.playerList,
      setPlayerList = props.setPlayerList,
      toggleLoader = props.toggleLoader,
      setSweetAlertOption = props.setSweetAlertOption;

  var handleCloseAlert = function handleCloseAlert() {
    setSweetAlertOption(null);
  };

  var cancelProps = {
    onClick: handleCloseAlert
  };

  var handleChangeOddsGroup = function handleChangeOddsGroup(event, value) {
    event.preventDefault();
    var confirmMessage = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('AlertSetOddsGroupForCustomerMsg').replace('{0}', value);
    var confirmProps = {
      onClick: function onClick() {
        if (currentActivePlayer && value !== currentActivePlayer.oddsGroup) {
          var ibcCustId = currentActivePlayer.ibcCustId,
              licenseeCustId = currentActivePlayer.licenseeCustId,
              oddsGroup = currentActivePlayer.oddsGroup;
          var param = {
            custId: ibcCustId,
            oddsGroup: value,
            oldValue: oddsGroup,
            licenseeCustId: licenseeCustId
          };
          toggleLoader(true);
          updateOddsGroup(param).then(function (response) {
            var _response$data = response.data,
                Success = _response$data.Success,
                Message = _response$data.Message,
                ErrorMessage = _response$data.ErrorMessage;

            if (Success) {
              var newPlayerList = _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__["default"].updatePlayerItem(playerList, ibcCustId, value, 'OddsGroup');
              setPlayerList(newPlayerList);
            }

            var resultMessage = Success ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('UpdateSuccess') : Message || _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(ErrorMessage);
            var displayIcon = Success ? _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].success : _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].error;
            var alertOpt = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultAlertOption"])(resultMessage, handleCloseAlert, null, displayIcon);
            setSweetAlertOption(alertOpt);
            toggleLoader(false);
          })["catch"](function (error) {
            console.log(error.message);
            var message = Object(_lib_helpers_utils__WEBPACK_IMPORTED_MODULE_8__["getErrorMessageForUpdating"])(error);
            var alertOpt = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultAlertOption"])(message, handleCloseAlert, null, _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].error);
            setSweetAlertOption(alertOpt);
            toggleLoader(false);
          });
        } else {
          handleCloseAlert();
        }

        handleClose();
      }
    };
    var confirmOption = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultConfirmOption"])(confirmMessage, handleCloseAlert, confirmProps, cancelProps);
    setSweetAlertOption(confirmOption);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown oddsgroup-menu",
    style: style
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_3__["DropdownMenu"], {
    isOpen: isOpen,
    onClose: handleClose
  }, Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_4__["oddsGroupListWithStyle"]).map(function (item) {
    var style = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["oddsGroupListWithStyle"][item];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_3__["DropdownItem"], {
      key: item,
      className: "oddsgroup-item",
      style: style,
      onClick: function onClick(e) {
        return handleChangeOddsGroup(e, item);
      }
    }, item);
  })));
};

function mapDispatchToProps(dispatch) {
  var setOddsGroupDropdownPosition = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].setOddsGroupDropdownPosition,
      updateOddsGroup = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].updateOddsGroup,
      setPlayerList = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].setPlayerList,
      toggleLoader = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].toggleLoader,
      setSweetAlertOption = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].setSweetAlertOption;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setOddsGroupDropdownPosition: setOddsGroupDropdownPosition,
    updateOddsGroup: updateOddsGroup,
    setPlayerList: setPlayerList,
    toggleLoader: toggleLoader,
    setSweetAlertOption: setSweetAlertOption
  }, dispatch);
}

function mapStateToProps(state) {
  var oddsGroupDropdownPosition = state.oddsGroupDropdownPosition,
      currentActivePlayer = state.currentActivePlayer,
      playerList = state.playerList;
  return Object.assign({}, {
    oddsGroupDropdownPosition: oddsGroupDropdownPosition,
    currentActivePlayer: currentActivePlayer,
    playerList: playerList
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(OddsGroupDropdown));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/PlayerRow.jsx":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/PlayerRow.jsx ***!
  \**********************************************************************************************/
/*! exports provided: PlayerRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerRow", function() { return PlayerRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
/* harmony import */ var _UserNameCell__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UserNameCell */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/UserNameCell.jsx");
/* harmony import */ var _OddsGroupCell__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./OddsGroupCell */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/OddsGroupCell.jsx");
/* harmony import */ var _SpecialLevelCell__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SpecialLevelCell */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/SpecialLevelCell.jsx");
/* harmony import */ var _StatusCell__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./StatusCell */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/StatusCell.jsx");
/* harmony import */ var _BaStatusCell__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./BaStatusCell */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/BaStatusCell.jsx");












var PlayerRow = function PlayerRow(props) {
  var dataItem = props.dataItem,
      displayedColumn = props.displayedColumn;
  var LicenseeCustId = dataItem.LicenseeCustId,
      SystemId = dataItem.SystemId,
      RealName = dataItem.RealName,
      Currency = dataItem.Currency,
      CurrentBalance = dataItem.CurrentBalance,
      OutstandingBalance = dataItem.OutstandingBalance,
      LastTransaction = dataItem.LastTransaction,
      Email = dataItem.Email,
      OddsGroup = dataItem.OddsGroup,
      SpecialLevel = dataItem.SpecialLevel,
      IsDeposit = dataItem.IsDeposit,
      IsArchived = dataItem.IsArchived;
  var canShowMainColumn = IsDeposit && !IsArchived;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Row"], {
    key: LicenseeCustId
  }, displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].Status] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_StatusCell__WEBPACK_IMPORTED_MODULE_10__["default"], {
    dataItem: dataItem
  })), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].UserName] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserNameCell__WEBPACK_IMPORTED_MODULE_7__["default"], {
    dataItem: dataItem
  })), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].SystemId] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, SystemId), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].RealName] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, RealName), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].Currency] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, Currency), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].CurrentBalance] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "right-align"
  }, canShowMainColumn && _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].formatDecimal(CurrentBalance)), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].OutstandingBalance] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "right-align"
  }, canShowMainColumn && _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].formatDecimal(OutstandingBalance)), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].OddsGroup] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, canShowMainColumn && OddsGroup !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OddsGroupCell__WEBPACK_IMPORTED_MODULE_8__["default"], {
    dataItem: dataItem
  })), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].BaStatus] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BaStatusCell__WEBPACK_IMPORTED_MODULE_11__["default"], {
    dataItem: dataItem
  }), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].SpecialLevel] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, canShowMainColumn && SpecialLevel !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SpecialLevelCell__WEBPACK_IMPORTED_MODULE_9__["default"], {
    dataItem: dataItem
  })), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].LastTransaction] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, LastTransaction), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].Email] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, Email));
};

function mapDispatchToProps(dispatch) {
  var setSelectedPlayer = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setSelectedPlayer;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setSelectedPlayer: setSelectedPlayer
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(PlayerRow));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/SpecialLevelCell.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/SpecialLevelCell.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: SpecialLevelCell, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpecialLevelCell", function() { return SpecialLevelCell; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _jsroot_components_DropdownLabel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/DropdownLabel */ "./www/js/source/reactpages/components/DropdownLabel.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/services/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/gridInteractionService.js");
/* harmony import */ var _lib_helpers_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
/* harmony import */ var _lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/helpers/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerDataBuilder.js");









var SpecialLevelCell = function SpecialLevelCell(props) {
  var dataItem = props.dataItem,
      specialLevelDropdownPosition = props.specialLevelDropdownPosition,
      setCurrentActivePlayer = props.setCurrentActivePlayer,
      setSpecialLevelDropdownPosition = props.setSpecialLevelDropdownPosition,
      hasSpecialLevelPermission = props.hasSpecialLevelPermission;
  var value = dataItem.SpecialLevel;
  var style = {
    backgroundColor: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["specialLevelListWithColor"][value]
  };

  var handleToggleSpecialLevel = function handleToggleSpecialLevel(event) {
    if (!hasSpecialLevelPermission) {
      return;
    }

    var currentActivePlayer = Object(_lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_8__["buildCurrentActivePlayer"])(dataItem);
    setCurrentActivePlayer(currentActivePlayer);
    var dropdownName = 'specialLevelDropdown';
    var newPosition = _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_6__["default"].getNextDropdownPosition(event.target, specialLevelDropdownPosition, dropdownName);
    setSpecialLevelDropdownPosition(newPosition);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_DropdownLabel__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: hasSpecialLevelPermission ? '' : 'disabled',
    text: Object(_lib_helpers_utils__WEBPACK_IMPORTED_MODULE_7__["getSpecialLevelText"])(value),
    labelStyle: style,
    onClick: handleToggleSpecialLevel
  });
};

function mapDispatchToProps(dispatch) {
  var setCurrentActivePlayer = _actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"].setCurrentActivePlayer,
      setSpecialLevelDropdownPosition = _actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"].setSpecialLevelDropdownPosition;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setCurrentActivePlayer: setCurrentActivePlayer,
    setSpecialLevelDropdownPosition: setSpecialLevelDropdownPosition
  }, dispatch);
}

function mapStateToProps(state) {
  var specialLevelDropdownPosition = state.specialLevelDropdownPosition,
      hasSpecialLevelPermission = state.hasSpecialLevelPermission;
  return Object.assign({}, {
    specialLevelDropdownPosition: specialLevelDropdownPosition,
    hasSpecialLevelPermission: hasSpecialLevelPermission
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(SpecialLevelCell));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/SpecialLevelDropdown.jsx":
/*!*********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/SpecialLevelDropdown.jsx ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/services/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/gridInteractionService.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_helpers_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
/* harmony import */ var _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../lib/sweetAlert */ "./www/js/source/reactpages/lib/sweetAlert.js");











var SpecialLevelDropdown = function SpecialLevelDropdown(props) {
  var specialLevelDropdownPosition = props.specialLevelDropdownPosition,
      setSpecialLevelDropdownPosition = props.setSpecialLevelDropdownPosition;
  var isOpen = specialLevelDropdownPosition !== null;
  var style = specialLevelDropdownPosition && {
    top: specialLevelDropdownPosition.y,
    left: specialLevelDropdownPosition.x
  };

  var handleClose = function handleClose() {
    setSpecialLevelDropdownPosition(null);
  };

  var currentActivePlayer = props.currentActivePlayer,
      updateSpecialLevel = props.updateSpecialLevel,
      playerList = props.playerList,
      setPlayerList = props.setPlayerList,
      toggleLoader = props.toggleLoader,
      setSweetAlertOption = props.setSweetAlertOption;

  var handleCloseAlert = function handleCloseAlert() {
    setSweetAlertOption(null);
  };

  var cancelProps = {
    onClick: handleCloseAlert
  };

  var handleChangeOddsGroup = function handleChangeOddsGroup(event, value) {
    event.preventDefault();
    var resourceName = Number(value) === 0 ? 'AlertRemoveSpecialLevelForCustomerMsg' : 'AlertSetSpecialLevelForCustomerMsg';
    var confirmMessage = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(resourceName);
    var confirmProps = {
      onClick: function onClick() {
        if (currentActivePlayer && value !== currentActivePlayer.specialLevel) {
          var ibcCustId = currentActivePlayer.ibcCustId,
              licenseeCustId = currentActivePlayer.licenseeCustId,
              specialLevel = currentActivePlayer.specialLevel;
          var param = {
            custId: ibcCustId,
            specialLevel: value,
            oldValue: specialLevel,
            licenseeCustId: licenseeCustId
          };
          toggleLoader(true);
          updateSpecialLevel(param).then(function (response) {
            var _response$data = response.data,
                Success = _response$data.Success,
                Message = _response$data.Message,
                ErrorMessage = _response$data.ErrorMessage;

            if (Success) {
              var newPlayerList = _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__["default"].updatePlayerItem(playerList, ibcCustId, value, 'SpecialLevel');
              setPlayerList(newPlayerList);
            }

            var resultMessage = Success ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('UpdateSuccess') : Message || _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(ErrorMessage);
            var displayIcon = Success ? _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].success : _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].error;
            var alertOpt = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultAlertOption"])(resultMessage, handleCloseAlert, null, displayIcon);
            setSweetAlertOption(alertOpt);
            toggleLoader(false);
          })["catch"](function (error) {
            console.log(error.message);
            var message = Object(_lib_helpers_utils__WEBPACK_IMPORTED_MODULE_8__["getErrorMessageForUpdating"])(error);
            var alertOpt = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultAlertOption"])(message, handleCloseAlert, null, _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].error);
            setSweetAlertOption(alertOpt);
            toggleLoader(false);
          });
        } else {
          handleCloseAlert();
        }

        handleClose();
      }
    };
    var confirmOption = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultConfirmOption"])(confirmMessage, handleCloseAlert, confirmProps, cancelProps);
    setSweetAlertOption(confirmOption);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown special-level-menu",
    style: style
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_3__["DropdownMenu"], {
    isOpen: isOpen,
    onClose: handleClose
  }, Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_4__["specialLevelListWithColor"]).map(function (item) {
    var color = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["specialLevelListWithColor"][item];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_3__["DropdownItem"], {
      key: item,
      className: "special-level-item",
      style: {
        backgroundColor: color
      },
      onClick: function onClick(e) {
        return handleChangeOddsGroup(e, item);
      }
    }, Object(_lib_helpers_utils__WEBPACK_IMPORTED_MODULE_8__["getSpecialLevelText"])(item));
  })));
};

function mapDispatchToProps(dispatch) {
  var setSpecialLevelDropdownPosition = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].setSpecialLevelDropdownPosition,
      updateSpecialLevel = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].updateSpecialLevel,
      setPlayerList = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].setPlayerList,
      toggleLoader = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].toggleLoader,
      setSweetAlertOption = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].setSweetAlertOption;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setSpecialLevelDropdownPosition: setSpecialLevelDropdownPosition,
    updateSpecialLevel: updateSpecialLevel,
    setPlayerList: setPlayerList,
    toggleLoader: toggleLoader,
    setSweetAlertOption: setSweetAlertOption
  }, dispatch);
}

function mapStateToProps(state) {
  var specialLevelDropdownPosition = state.specialLevelDropdownPosition,
      currentActivePlayer = state.currentActivePlayer,
      playerList = state.playerList;
  return Object.assign({}, {
    specialLevelDropdownPosition: specialLevelDropdownPosition,
    currentActivePlayer: currentActivePlayer,
    playerList: playerList
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(SpecialLevelDropdown));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/StatusCell.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/StatusCell.jsx ***!
  \***********************************************************************************************/
/*! exports provided: StatusCell, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusCell", function() { return StatusCell; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/services/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/gridInteractionService.js");
/* harmony import */ var _lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/helpers/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerDataBuilder.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");








var StatusCell = function StatusCell(props) {
  var dataItem = props.dataItem,
      statusDropdownPosition = props.statusDropdownPosition,
      setCurrentActivePlayer = props.setCurrentActivePlayer,
      setStatusDropdownPosition = props.setStatusDropdownPosition,
      type = props.type;
  var Status = dataItem.Status,
      IsOnline = dataItem.IsOnline,
      IsDeposit = dataItem.IsDeposit,
      IsArchived = dataItem.IsArchived;
  var statusName = _lib_constants__WEBPACK_IMPORTED_MODULE_3__["playerStatus"][Status];
  var classname = 'status-text status-' + Status;
  var canUpdate = type === _lib_constants__WEBPACK_IMPORTED_MODULE_3__["licenseeType"].nonApi && !IsArchived && Status !== _lib_constants__WEBPACK_IMPORTED_MODULE_3__["playerStatusByName"].Closed;

  var handleToggleStatus = function handleToggleStatus(event) {
    var currentActivePlayer = Object(_lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_6__["buildCurrentActivePlayer"])(dataItem);
    setCurrentActivePlayer(currentActivePlayer);
    var dropdownName = 'statusDropdown';
    var newPosition = _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__["default"].getNextDropdownPosition(event.target, statusDropdownPosition, dropdownName);
    setStatusDropdownPosition(newPosition);
  };

  var shouldShowOnlineStatus = IsDeposit && Status === _lib_constants__WEBPACK_IMPORTED_MODULE_3__["playerStatusByName"].Active;
  var onlineText = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource('Online');
  var offlineText = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource('Offline');
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "status-cell"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: classname
  }, statusName || _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource('Unknown')), shouldShowOnlineStatus && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "status-text"
  }, IsOnline ? "(".concat(onlineText, ")") : "(".concat(offlineText, ")")), statusName && canUpdate && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn-outline btn-status-menu",
    onClick: handleToggleStatus
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "site-caret"
  })));
};

function mapDispatchToProps(dispatch) {
  var setCurrentActivePlayer = _actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"].setCurrentActivePlayer,
      setStatusDropdownPosition = _actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"].setStatusDropdownPosition;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setCurrentActivePlayer: setCurrentActivePlayer,
    setStatusDropdownPosition: setStatusDropdownPosition
  }, dispatch);
}

function mapStateToProps(state) {
  var statusDropdownPosition = state.statusDropdownPosition,
      type = state.type;
  return Object.assign({}, {
    statusDropdownPosition: statusDropdownPosition,
    type: type
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(StatusCell));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/StatusDropdown.jsx":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/StatusDropdown.jsx ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/dropdown */ "./www/js/source/reactpages/components/dropdown/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/services/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/gridInteractionService.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_helpers_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
/* harmony import */ var _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../lib/sweetAlert */ "./www/js/source/reactpages/lib/sweetAlert.js");











var StatusDropdown = function StatusDropdown(props) {
  var statusDropdownPosition = props.statusDropdownPosition,
      setStatusDropdownPosition = props.setStatusDropdownPosition;
  var isOpen = statusDropdownPosition !== null;
  var style = statusDropdownPosition && {
    top: statusDropdownPosition.y,
    left: statusDropdownPosition.x
  };

  var handleClose = function handleClose() {
    setStatusDropdownPosition(null);
  };

  var currentActivePlayer = props.currentActivePlayer,
      playerList = props.playerList,
      setPlayerList = props.setPlayerList,
      toggleLoader = props.toggleLoader,
      updatePlayerStatus = props.updatePlayerStatus,
      setSweetAlertOption = props.setSweetAlertOption;

  var handleCloseAlert = function handleCloseAlert() {
    setSweetAlertOption(null);
  };

  var cancelProps = {
    onClick: handleCloseAlert
  };

  var handleChangeOddsGroup = function handleChangeOddsGroup(event, value) {
    event.preventDefault();
    var messageList = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["messageUpdateState"][value] || [];
    var confirmMessage = messageList.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, messageList[0], react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "warning"
    }, messageList[1])) : null;
    var confirmProps = {
      onClick: function onClick() {
        if (currentActivePlayer) {
          var licenseeCustId = currentActivePlayer.licenseeCustId;
          var param = {
            custId: licenseeCustId,
            status: value
          };
          toggleLoader(true);
          updatePlayerStatus(param).then(function (response) {
            var IsSuccessful = response.data.IsSuccessful;

            if (IsSuccessful) {
              var ibcCustId = currentActivePlayer.ibcCustId;
              var playerId = ibcCustId || licenseeCustId;
              var newPlayerList = _lib_services_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__["default"].updatePlayerItem(playerList, playerId, value, 'Status');
              setPlayerList(newPlayerList);
            }

            var resultMessage = IsSuccessful ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource('UpdateSuccess') : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource('PlayerAdminUpdateFailedMsg');
            var displayIcon = IsSuccessful ? _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].success : _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].error;
            var alertOpt = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultAlertOption"])(resultMessage, handleCloseAlert, null, displayIcon);
            setSweetAlertOption(alertOpt);
            toggleLoader(false);
          })["catch"](function (error) {
            console.log(error.message);
            var message = Object(_lib_helpers_utils__WEBPACK_IMPORTED_MODULE_8__["getErrorMessageForUpdating"])(error);
            ;
            var alertOpt = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultAlertOption"])(message, handleCloseAlert, null, _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].error);
            setSweetAlertOption(alertOpt);
            toggleLoader(false);
          });
        }

        handleClose();
      }
    };
    var customAlertOption = {
      width: 480,
      height: 220
    };
    var confirmOption = Object(_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["generateDefaultConfirmOption"])(confirmMessage, handleCloseAlert, confirmProps, cancelProps, _lib_sweetAlert__WEBPACK_IMPORTED_MODULE_9__["predefinedIcons"].warning, customAlertOption);
    setSweetAlertOption(confirmOption);
  };

  var displayedStatusList = currentActivePlayer && _lib_constants__WEBPACK_IMPORTED_MODULE_4__["displayedPlayerStatusList"][currentActivePlayer.status];

  if (!displayedStatusList) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown status-menu",
    style: style
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_3__["DropdownMenu"], {
    isOpen: isOpen,
    onClose: handleClose
  }, displayedStatusList.map(function (item) {
    var statusName = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["playerStatus"][item];
    var classname = 'status-item ' + statusName;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_3__["DropdownItem"], {
      key: item,
      className: classname,
      onClick: function onClick(e) {
        return handleChangeOddsGroup(e, item);
      }
    }, statusName);
  })));
};

function mapDispatchToProps(dispatch) {
  var setStatusDropdownPosition = _actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"].setStatusDropdownPosition,
      setPlayerList = _actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"].setPlayerList,
      toggleLoader = _actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"].toggleLoader,
      updatePlayerStatus = _actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"].updatePlayerStatus,
      setSweetAlertOption = _actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"].setSweetAlertOption;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setStatusDropdownPosition: setStatusDropdownPosition,
    setPlayerList: setPlayerList,
    toggleLoader: toggleLoader,
    updatePlayerStatus: updatePlayerStatus,
    setSweetAlertOption: setSweetAlertOption
  }, dispatch);
}

function mapStateToProps(state) {
  var statusDropdownPosition = state.statusDropdownPosition,
      currentActivePlayer = state.currentActivePlayer,
      playerList = state.playerList;
  return Object.assign({}, {
    statusDropdownPosition: statusDropdownPosition,
    currentActivePlayer: currentActivePlayer,
    playerList: playerList
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(StatusDropdown));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/UserNameCell.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/UserNameCell.jsx ***!
  \*************************************************************************************************/
/*! exports provided: UserNameCell, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserNameCell", function() { return UserNameCell; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/helpers/gridHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/gridHelper.js");
/* harmony import */ var _lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/helpers/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerDataBuilder.js");
/* harmony import */ var _lib_helpers_contextMenuHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/helpers/contextMenuHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/contextMenuHelper.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var itemContextMenuHeight = 28;
var UserNameCell = function UserNameCell(props) {
  var dataItem = props.dataItem,
      setSelectedPlayer = props.setSelectedPlayer,
      setCurrentActivePlayer = props.setCurrentActivePlayer,
      setContextMenu = props.setContextMenu,
      contextMenu = props.contextMenu,
      setSelectedTabName = props.setSelectedTabName,
      getTabList = props.getTabList,
      type = props.type;

  var handleSelectPlayer = function handleSelectPlayer(event) {
    event.preventDefault();
    var newSelectedPlayer = Object(_lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_5__["buildSelectedPlayer"])(dataItem);
    setSelectedPlayer(newSelectedPlayer);
    setSelectedTabName(null);
  };

  var handleEnterContextMenu = function handleEnterContextMenu(event) {
    event.preventDefault();
    var isOpen = contextMenu.isOpen;

    if (!isOpen) {
      var currentActivePlayer = Object(_lib_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_5__["buildCurrentActivePlayer"])(dataItem);
      var tabList = getTabList();
      var activeMenuList = Object(_lib_helpers_contextMenuHelper__WEBPACK_IMPORTED_MODULE_6__["getActiveTabList"])(currentActivePlayer, tabList, type);
      var contextMenuHeight = itemContextMenuHeight * activeMenuList.length;
      var rect = event.target.getBoundingClientRect();
      var position = {
        x: rect.left - 10,
        y: _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_4__["default"].calculateTopPosition(contextMenuHeight, rect.top)
      };
      setContextMenu({
        position: position,
        isOpen: true
      });
      setCurrentActivePlayer(currentActivePlayer);
    }
  };

  var handleLeaveContextMenu = function handleLeaveContextMenu(event) {
    event.preventDefault();

    if (contextMenu.isOpen) {
      setContextMenu(_objectSpread({}, contextMenu, {
        isOpen: false
      }));
    }
  };

  var Status = dataItem.Status;
  var isClosedOrArchived = Status === _lib_constants__WEBPACK_IMPORTED_MODULE_7__["playerStatusByName"].Closed || Status === _lib_constants__WEBPACK_IMPORTED_MODULE_7__["playerStatusByName"].Archived;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "username-cell"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn-default btn-link username-link",
    onClick: handleSelectPlayer
  }, dataItem.UserName), !isClosedOrArchived && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn-default btn-link btn-icon cell-menu",
    onMouseEnter: handleEnterContextMenu,
    onMouseLeave: handleLeaveContextMenu
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "material-icons"
  }, "edit")));
};

function mapDispatchToProps(dispatch) {
  var setSelectedPlayer = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setSelectedPlayer,
      setCurrentActivePlayer = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setCurrentActivePlayer,
      setContextMenu = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setContextMenu,
      setSelectedTabName = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setSelectedTabName,
      getTabList = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].getTabList;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setSelectedPlayer: setSelectedPlayer,
    setCurrentActivePlayer: setCurrentActivePlayer,
    setContextMenu: setContextMenu,
    setSelectedTabName: setSelectedTabName,
    getTabList: getTabList
  }, dispatch);
}

function mapStateToProps(state) {
  var contextMenu = state.contextMenu,
      type = state.type;
  return Object.assign({}, {
    contextMenu: contextMenu,
    type: type
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(UserNameCell));

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
/* harmony import */ var _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _lib_helpers_gridColumnBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/helpers/gridColumnBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/gridColumnBuilder.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var type = window.initialState.type;
var hasBaPermission = window._pConfig.hasBaPermission === 1;
var hasOddsGroupPermission = window._pConfig.hasOddsGroupPermission === 1;
var hasSpecialLevelPermission = window._pConfig.hasSpecialLevelPermission === 1;
var displayedColumnList = Object(_lib_helpers_gridColumnBuilder__WEBPACK_IMPORTED_MODULE_6__["buildDefaultColumnList"])(type);
var siteSetting = {
  isAllowedCustomerComm: false,
  isAllowedBA: false
};

var defaultState = _objectSpread({}, window.initialState, {
  displayedColumnList: displayedColumnList,
  hasBaPermission: hasBaPermission,
  siteSetting: siteSetting,
  hasOddsGroupPermission: hasOddsGroupPermission,
  hasSpecialLevelPermission: hasSpecialLevelPermission
});

var store = _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);

var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js ***!
  \*********************************************************************************/
/*! exports provided: specialLevelListWithColor, oddsGroupListWithStyle, licenseeType, fields, columnList, contextMenuKeys, tabNames, tabNameByContextMenu, excludedTabNameWithNonDepositAndArchived, contextMenuList, heightSlicing, searchOptions, defaultPagingOption, playerStatus, playerStatusByName, displayedPlayerStatusList, messageUpdateState, baStatusList, headerText, gridItemDropdownHeight, stringTypeFields, apiInfo, apiUpdateInfo, apiSiteSetting, apiSuggestion, excludedContextMenuWithNonDeposit, excludedContextMenuWithClosed, excludedContextMenuWithArchived, excludedContextMenuWithApiLicensee, playerTypes, emailPattern */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "specialLevelListWithColor", function() { return specialLevelListWithColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oddsGroupListWithStyle", function() { return oddsGroupListWithStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "licenseeType", function() { return licenseeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnList", function() { return columnList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contextMenuKeys", function() { return contextMenuKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabNames", function() { return tabNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabNameByContextMenu", function() { return tabNameByContextMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "excludedTabNameWithNonDepositAndArchived", function() { return excludedTabNameWithNonDepositAndArchived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contextMenuList", function() { return contextMenuList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "heightSlicing", function() { return heightSlicing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchOptions", function() { return searchOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultPagingOption", function() { return defaultPagingOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerStatus", function() { return playerStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerStatusByName", function() { return playerStatusByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayedPlayerStatusList", function() { return displayedPlayerStatusList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messageUpdateState", function() { return messageUpdateState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baStatusList", function() { return baStatusList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerText", function() { return headerText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gridItemDropdownHeight", function() { return gridItemDropdownHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringTypeFields", function() { return stringTypeFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiInfo", function() { return apiInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiUpdateInfo", function() { return apiUpdateInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiSiteSetting", function() { return apiSiteSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiSuggestion", function() { return apiSuggestion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "excludedContextMenuWithNonDeposit", function() { return excludedContextMenuWithNonDeposit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "excludedContextMenuWithClosed", function() { return excludedContextMenuWithClosed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "excludedContextMenuWithArchived", function() { return excludedContextMenuWithArchived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "excludedContextMenuWithApiLicensee", function() { return excludedContextMenuWithApiLicensee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerTypes", function() { return playerTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailPattern", function() { return emailPattern; });
/* harmony import */ var _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/configInfo */ "./www/js/source/reactpages/Module/constants/configInfo.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
var _displayedPlayerStatu, _messageUpdateState;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var specialLevelListWithColor = {
  0: '#fcfcfc',
  1: '#00ff00',
  2: '#008000',
  3: '#8b4513',
  4: '#daa520',
  5: '#006699',
  6: '#666633',
  7: '#a52a2a',
  8: '#0099ff',
  9: '#cc6600',
  10: '#ff0000'
};
var oddsGroupListWithStyle = {
  A: {
    backgroundColor: '#006400',
    color: '#fff'
  },
  B: {
    backgroundColor: '#0099ff',
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
var fields = {
  Status: 'Status',
  UserName: 'UserName',
  SystemId: 'SystemId',
  RealName: 'RealName',
  Currency: 'Currency',
  CurrentBalance: 'CurrentBalance',
  OutstandingBalance: 'OutstandingBalance',
  OddsGroup: 'OddsGroup',
  BaStatus: 'BaStatus',
  SpecialLevel: 'SpecialLevel',
  LastTransaction: 'LastTransaction',
  Email: 'Email'
};
var columnList = [{
  key: fields.Status,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Status'),
  show: true
}, {
  key: fields.UserName,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Username'),
  show: true
}, {
  key: fields.SystemId,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('SystemId'),
  show: true
}, {
  key: fields.RealName,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('RealName'),
  show: true
}, {
  key: fields.Currency,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Currency'),
  show: true
}, {
  key: fields.CurrentBalance,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('CurrentBalance'),
  show: true
}, {
  key: fields.OutstandingBalance,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('OutstandingBalance'),
  show: true
}, {
  key: fields.OddsGroup,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('OddsGroup'),
  show: true
}, {
  key: fields.BaStatus,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BAStatus'),
  show: true
}, {
  key: fields.SpecialLevel,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('SpecialLevel'),
  show: true
}, {
  key: fields.LastTransaction,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('LastTransfer'),
  show: true
}, {
  key: fields.Email,
  value: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Email'),
  show: true
}];
var contextMenuKeys = {
  bankInformation: 'bankInformation',
  note: 'note',
  password: 'password',
  fundtransferLimit: 'fundtransferLimit',
  betLimit: 'betLimit',
  statement: 'statement',
  personalMessage: 'personalMessage'
};
var tabNames = {
  playerInfo: 'lblPlayerAdminPlayerInfo',
  statement: 'lblPlayerAdminPlayerStatement',
  betlist: 'lblPlayerAdminBetList',
  betLimit: 'lblPlayerAdminBetLimit'
};
var tabNameByContextMenu = _defineProperty({}, contextMenuKeys.bankInformation, tabNames.playerInfo);
var excludedTabNameWithNonDepositAndArchived = [tabNames.statement, tabNames.betlist, tabNames.betLimit];
var contextMenuList = [{
  key: contextMenuKeys.note,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Note'),
  tabName: 'lblPlayerAdminNote'
}, {
  key: contextMenuKeys.password,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Password'),
  tabName: 'lblPlayerAdminSetting'
}, {
  key: contextMenuKeys.bankInformation,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BankInformation'),
  tabName: 'lblPlayerAdminPlayerInfo',
  subTabName: contextMenuKeys.bankInformation
}, {
  key: contextMenuKeys.fundtransferLimit,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('FundtransferLimit'),
  tabName: 'lblPlayerAdminFundTransfer'
}, {
  key: contextMenuKeys.betLimit,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BetLimit'),
  tabName: tabNames.betLimit
}, {
  key: contextMenuKeys.statement,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Statement'),
  tabName: tabNames.statement
}, {
  key: contextMenuKeys.personalMessage,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('PersonalMessage'),
  tabName: 'lblPlayerAdminMessage'
}];
var heightSlicing = {
  "default": 300,
  withAdvancedSearch: 357,
  whenCollapsing: 235
};
var searchOptions = {
  matchPrefix: '1',
  matchCase: '2',
  matchWholeWord: '3'
};
var defaultPagingOption = {
  PageIndex: 1,
  PageSize: 50,
  PageList: [50],
  TotalItem: null
};
var playerStatus = {
  '0': _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Active'),
  '1': _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Locked'),
  '2': _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Closed'),
  '3': _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Archived')
};
var playerStatusByName = {
  'Active': 0,
  'Locked': 1,
  'Closed': 2,
  'Archived': 3
};
var displayedPlayerStatusList = (_displayedPlayerStatu = {}, _defineProperty(_displayedPlayerStatu, playerStatusByName.Active, [playerStatusByName.Closed, playerStatusByName.Locked]), _defineProperty(_displayedPlayerStatu, playerStatusByName.Locked, [playerStatusByName.Active, playerStatusByName.Closed]), _displayedPlayerStatu);
var messageUpdateState = (_messageUpdateState = {}, _defineProperty(_messageUpdateState, playerStatusByName.Locked, [_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('UpdateToLockedConfirmMsg'), _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('WarningToLockedMsg')]), _defineProperty(_messageUpdateState, playerStatusByName.Closed, [_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('UpdateToClosedConfirmMsg'), _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('WarningToClosedMsg')]), _defineProperty(_messageUpdateState, playerStatusByName.Active, [_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('UpdateToActiveConfirmMsg'), _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('WarningToActiveMsg')]), _messageUpdateState);
var baStatusList = {
  'All': 0,
  'On': 1,
  'Off': 2
};
var headerText = {
  Status: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Status'),
  UserName: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Username'),
  SystemId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('SystemId'),
  RealName: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('RealName'),
  Currency: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Currency'),
  CurrentBalance: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('CurrentBalance'),
  OutstandingBalance: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('OutstandingBalance'),
  OddsGroup: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('OddsGroup'),
  BaStatus: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BAStatus'),
  SpecialLevel: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('SpecialLevel'),
  LastTransaction: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('LastTransfer'),
  Email: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Email')
};
var gridItemDropdownHeight = {
  'specialLevelDropdown': 231,
  'oddsGroupDropdown': 126,
  'statusDropdown': 56
};
var stringTypeFields = [fields.UserName, fields.RealName, fields.Currency, fields.OddsGroup];
var apiInfo = {
  lrfSearch: {
    action: 'api/PlayerList/Search',
    type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].lrf
  },
  lrfDataById: {
    action: 'api/PlayerList/GetPlayerListById',
    type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].lrf
  },
  lapSearch: {
    action: 'PlayerAdminContainer/Search',
    type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].newAdmin
  },
  lapDataById: {
    action: 'PlayerAdminContainer/GetPlayerListById',
    type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].newAdmin
  },
  lapGetPlayerByLicenseeId: {
    action: 'PlayerAdminContainer/GetPlayerById',
    type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].newAdmin
  }
};
var apiUpdateInfo = {
  updateBaStatus: {
    action: 'api/PlayerBaStatus/Update',
    type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].lrf
  },
  updateOddsGroup: {
    action: 'api/PlayerOddsGroup/Update',
    type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].lrf
  },
  updateSpecialLevel: {
    action: 'api/PlayerSpecialLevel/Update',
    type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].lrf
  },
  updatePlayerStatus: {
    action: 'PlayerAdminContainer/UpdatePlayerStatus',
    type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].newAdmin
  }
};
var apiSiteSetting = {
  action: 'api/SiteSetting/GetSetting',
  type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].lrf
};
var apiSuggestion = {
  action: 'PlayerAdminContainer/GetSuggestionList',
  type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_0__["systemType"].newAdmin
};
var excludedContextMenuWithNonDeposit = [contextMenuKeys.betLimit, contextMenuKeys.statement];
var excludedContextMenuWithClosed = [contextMenuKeys.password];
var excludedContextMenuWithArchived = [contextMenuKeys.password, contextMenuKeys.betLimit, contextMenuKeys.statement];
var excludedContextMenuWithApiLicensee = [contextMenuKeys.password, contextMenuKeys.bankInformation, contextMenuKeys.personalMessage];
var playerTypes = {
  nonDeposit: 1,
  deposit: 2
};
var emailPattern = '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$';

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/contextMenuHelper.js":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/contextMenuHelper.js ***!
  \*************************************************************************************************/
/*! exports provided: isShowContextMenuItem, getActiveTabList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isShowContextMenuItem", function() { return isShowContextMenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActiveTabList", function() { return getActiveTabList; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");

var isShowContextMenuItem = function isShowContextMenuItem(item, isDeposit, isArchived, isClosed) {
  if (!isDeposit) {
    return !_constants__WEBPACK_IMPORTED_MODULE_0__["excludedContextMenuWithNonDeposit"].includes(item.key);
  }

  if (isClosed) {
    return !_constants__WEBPACK_IMPORTED_MODULE_0__["excludedContextMenuWithClosed"].includes(item.key);
  }

  if (isArchived) {
    return !_constants__WEBPACK_IMPORTED_MODULE_0__["excludedContextMenuWithArchived"].includes(item.key);
  }

  return true;
};
var getActiveTabList = function getActiveTabList(player, tabList, licType) {
  var isDeposit = player.isDeposit,
      isArchived = player.isArchived,
      status = player.status;
  return _constants__WEBPACK_IMPORTED_MODULE_0__["contextMenuList"].filter(function (item) {
    if (licType === _constants__WEBPACK_IMPORTED_MODULE_0__["licenseeType"].api && _constants__WEBPACK_IMPORTED_MODULE_0__["excludedContextMenuWithApiLicensee"].includes(item.key)) {
      return false;
    }

    var isClosedPlayer = status === _constants__WEBPACK_IMPORTED_MODULE_0__["playerStatusByName"].Closed;
    return !!tabList.find(function (t) {
      return item.tabName === t.Name;
    }) && isShowContextMenuItem(item, isDeposit, isArchived, isClosedPlayer);
  });
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/gridColumnBuilder.js":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/gridColumnBuilder.js ***!
  \*************************************************************************************************/
/*! exports provided: buildDefaultColumnList, buildColumnList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildDefaultColumnList", function() { return buildDefaultColumnList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildColumnList", function() { return buildColumnList; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var excludedKeyForApiType = [_constants__WEBPACK_IMPORTED_MODULE_0__["fields"].RealName, _constants__WEBPACK_IMPORTED_MODULE_0__["fields"].Email, _constants__WEBPACK_IMPORTED_MODULE_0__["fields"].LastTransaction];
var buildDefaultColumnList = function buildDefaultColumnList(licType) {
  var isApiType = licType === _constants__WEBPACK_IMPORTED_MODULE_0__["licenseeType"].api;
  return _constants__WEBPACK_IMPORTED_MODULE_0__["columnList"].filter(function (item) {
    return item.key !== _constants__WEBPACK_IMPORTED_MODULE_0__["fields"].BaStatus && (!isApiType || !excludedKeyForApiType.includes(item.key));
  }).map(function (item) {
    return _objectSpread({}, item);
  });
};
var buildColumnList = function buildColumnList(licType, isAllowedBA) {
  var isApiType = licType === _constants__WEBPACK_IMPORTED_MODULE_0__["licenseeType"].api;
  return _constants__WEBPACK_IMPORTED_MODULE_0__["columnList"].filter(function (item) {
    if (item.key === _constants__WEBPACK_IMPORTED_MODULE_0__["fields"].BaStatus) {
      return isAllowedBA;
    } else if (isApiType) {
      return !excludedKeyForApiType.includes(item.key);
    } else {
      return true;
    }
  }).map(function (item) {
    return _objectSpread({}, item);
  });
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/gridHelper.js":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/gridHelper.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GridHelper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
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
      var Status = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Status,
          UserName = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].UserName,
          SystemId = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].SystemId,
          RealName = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].RealName,
          Currency = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Currency,
          CurrentBalance = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].CurrentBalance,
          OutstandingBalance = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].OutstandingBalance,
          OddsGroup = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].OddsGroup,
          BaStatus = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].BaStatus,
          SpecialLevel = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].SpecialLevel,
          LastTransaction = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].LastTransaction,
          Email = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Email;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
        style: {
          height: 32
        }
      }, displayedColumn[Status] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 80,
        sortBy: Status
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].Status), displayedColumn[UserName] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 160,
        sortBy: UserName
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].UserName), displayedColumn[SystemId] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 100
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].SystemId), displayedColumn[RealName] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 80,
        sortBy: RealName
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].RealName), displayedColumn[Currency] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 60,
        sortBy: Currency
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].Currency), displayedColumn[CurrentBalance] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 80,
        sortBy: CurrentBalance
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].CurrentBalance), displayedColumn[OutstandingBalance] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 80,
        sortBy: OutstandingBalance
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].OutstandingBalance), displayedColumn[OddsGroup] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 50,
        sortBy: OddsGroup
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].OddsGroup), displayedColumn[BaStatus] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 50,
        sortBy: BaStatus
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].BaStatus), displayedColumn[SpecialLevel] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 50,
        sortBy: SpecialLevel
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].SpecialLevel), displayedColumn[LastTransaction] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 60,
        sortBy: LastTransaction
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].LastTransaction), displayedColumn[Email] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 100
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].Email));
    }
  }, {
    key: "calculateTopPosition",
    value: function calculateTopPosition() {
      var dropdownHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var currentTop = arguments.length > 1 ? arguments[1] : undefined;
      var innerHeight = window.innerHeight;
      var expectedHeight = dropdownHeight + currentTop + 20;
      return expectedHeight > innerHeight ? currentTop - dropdownHeight : currentTop;
    }
  }]);

  return GridHelper;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerDataBuilder.js":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerDataBuilder.js ***!
  \*************************************************************************************************/
/*! exports provided: buildSelectedPlayer, buildLapPlayerList, buildCurrentActivePlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildSelectedPlayer", function() { return buildSelectedPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildLapPlayerList", function() { return buildLapPlayerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildCurrentActivePlayer", function() { return buildCurrentActivePlayer; });
var buildSelectedPlayer = function buildSelectedPlayer(dataItem) {
  var IbcCustId = dataItem.IbcCustId,
      UserName = dataItem.UserName,
      Currency = dataItem.Currency,
      IsDeposit = dataItem.IsDeposit,
      IsArchived = dataItem.IsArchived,
      LicenseeCustId = dataItem.LicenseeCustId,
      CurrencyId = dataItem.CurrencyId,
      CreatedDate = dataItem.CreatedDate;
  return {
    ibcCustId: IbcCustId,
    licenseeCustId: LicenseeCustId,
    userName: UserName,
    currency: Currency,
    isDeposit: IsDeposit,
    isArchived: IsArchived,
    currencyId: CurrencyId,
    createdDate: CreatedDate
  };
};
var buildLapPlayerList = function buildLapPlayerList(playerList) {
  if (!playerList) {
    return [];
  }

  return playerList.map(function (item) {
    var CustId = item.CustId,
        UserName = item.UserName,
        CurrentBalance = item.CurrentBalance,
        Currency = item.Currency,
        Status = item.Status,
        RealName = item.RealName,
        email = item.email,
        isOnline = item.isOnline,
        IBCCustId = item.IBCCustId,
        isArchived = item.isArchived,
        LastTransaction = item.LastTransaction,
        CurrencyCode = item.CurrencyCode,
        OutBalance = item.OutBalance,
        IBCUserName = item.IBCUserName,
        CreatedDateString = item.CreatedDateString;
    return {
      IbcCustId: IBCCustId,
      LicenseeCustId: CustId,
      UserName: UserName,
      SystemId: IBCUserName,
      Currency: CurrencyCode,
      CurrentBalance: CurrentBalance,
      OutstandingBalance: OutBalance,
      Status: Status,
      RealName: RealName,
      LastTransaction: LastTransaction,
      Email: email,
      IsOnline: isOnline,
      IsDeposit: IBCCustId > 0,
      IsArchived: !!isArchived,
      CurrencyId: Currency,
      CreatedDate: CreatedDateString
    };
  });
};
var buildCurrentActivePlayer = function buildCurrentActivePlayer(dataItem) {
  var IbcCustId = dataItem.IbcCustId,
      UserName = dataItem.UserName,
      Currency = dataItem.Currency,
      Status = dataItem.Status,
      OddsGroup = dataItem.OddsGroup,
      SpecialLevel = dataItem.SpecialLevel,
      IsDeposit = dataItem.IsDeposit,
      IsArchived = dataItem.IsArchived,
      LicenseeCustId = dataItem.LicenseeCustId,
      CurrencyId = dataItem.CurrencyId,
      CreatedDate = dataItem.CreatedDate;
  return {
    ibcCustId: IbcCustId,
    licenseeCustId: LicenseeCustId,
    userName: UserName,
    currency: Currency,
    status: Status,
    oddsGroup: OddsGroup,
    specialLevel: SpecialLevel,
    isDeposit: IsDeposit,
    isArchived: IsArchived,
    currencyId: CurrencyId,
    createdDate: CreatedDate
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerListDataHelper.js":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerListDataHelper.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerListDataHelper; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PlayerListDataHelper =
/*#__PURE__*/
function () {
  function PlayerListDataHelper() {
    _classCallCheck(this, PlayerListDataHelper);
  }

  _createClass(PlayerListDataHelper, null, [{
    key: "mergePlayerList",
    value: function mergePlayerList(lrfList, lapList) {
      var _this = this;

      if (!lrfList || !lapList) {
        return [];
      }

      return lapList.reduce(function (result, lapItem) {
        var lrfItem = lrfList.find(function (x) {
          return x.IbcCustId === lapItem.IBCCustId;
        }) || {};

        var playerItem = _this.mergePlayerItem(lrfItem, lapItem);

        result.push(playerItem);
        return result;
      }, []);
    }
  }, {
    key: "mergePlayerItem",
    value: function mergePlayerItem(lrfItem, lapItem) {
      var OddsGroup = lrfItem.OddsGroup,
          BaStatus = lrfItem.BaStatus,
          SpecialLevel = lrfItem.SpecialLevel;
      var Status = lapItem.Status,
          RealName = lapItem.RealName,
          email = lapItem.email,
          isOnline = lapItem.isOnline,
          IBCCustId = lapItem.IBCCustId,
          isArchived = lapItem.isArchived,
          LastTransaction = lapItem.LastTransaction,
          CurrencyCode = lapItem.CurrencyCode,
          OutBalance = lapItem.OutBalance,
          IBCUserName = lapItem.IBCUserName,
          CreatedDateString = lapItem.CreatedDateString;
      return {
        IbcCustId: IBCCustId,
        LicenseeCustId: lapItem.CustId,
        UserName: lapItem.UserName,
        SystemId: IBCUserName,
        Currency: CurrencyCode,
        CurrentBalance: lapItem.CurrentBalance,
        OutstandingBalance: OutBalance,
        OddsGroup: OddsGroup,
        BaStatus: BaStatus,
        SpecialLevel: SpecialLevel,
        Status: Status,
        RealName: RealName,
        LastTransaction: LastTransaction,
        Email: email,
        IsOnline: isOnline,
        IsDeposit: IBCCustId > 0,
        IsArchived: !!isArchived,
        CurrencyId: lapItem.Currency,
        CreatedDate: CreatedDateString
      };
    }
  }, {
    key: "getDataObject",
    value: function getDataObject(targetList, listToMatch) {
      var _this2 = this;

      return targetList.reduce(function (accumulator, currentItem) {
        var isExist = listToMatch.findIndex(function (p) {
          return _this2._isMatchIbcCustId(currentItem, p);
        }) !== -1;

        if (isExist) {
          accumulator.commonList.push(currentItem);
        } else {
          accumulator.differenceList.push(currentItem);
        }

        return accumulator;
      }, {
        commonList: [],
        differenceList: []
      });
    }
  }, {
    key: "_isMatchIbcCustId",
    value: function _isMatchIbcCustId(source, destination) {
      return (!!destination.IbcCustId || !!source.IBCCustId) && destination.IbcCustId === source.IBCCustId || (!!destination.IBCCustId || !!source.IbcCustId) && destination.IBCCustId === source.IbcCustId;
    }
  }, {
    key: "createEmptyResult",
    value: function createEmptyResult() {
      return {
        playerList: [],
        totalItem: 0
      };
    }
  }]);

  return PlayerListDataHelper;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js ***!
  \*************************************************************************************/
/*! exports provided: getSpecialLevelText, getBaStatusText, getPlayerStatus, buildDisplayedColumnObject, isNonDepositOrArchived, getCustIdListFromLapData, getErrorMessageForUpdating */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSpecialLevelText", function() { return getSpecialLevelText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaStatusText", function() { return getBaStatusText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPlayerStatus", function() { return getPlayerStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildDisplayedColumnObject", function() { return buildDisplayedColumnObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNonDepositOrArchived", function() { return isNonDepositOrArchived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCustIdListFromLapData", function() { return getCustIdListFromLapData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getErrorMessageForUpdating", function() { return getErrorMessageForUpdating; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/htmlHelper */ "./www/js/source/reactpages/lib/htmlHelper.js");



var getSpecialLevelText = function getSpecialLevelText(value) {
  return value === undefined || value === null ? '' : Number(value) === 0 ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('None') : value;
};
var getBaStatusText = function getBaStatusText(value) {
  return value ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('On') : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Off');
};
var getPlayerStatus = function getPlayerStatus(value) {
  var displayedValue = _constants__WEBPACK_IMPORTED_MODULE_0__["playerStatus"][value];
  return displayedValue || '';
};
var buildDisplayedColumnObject = function buildDisplayedColumnObject(displayedColumnList) {
  return displayedColumnList.reduce(function (accumulator, currentItem) {
    accumulator[currentItem.key] = currentItem.show;
    return accumulator;
  }, {});
};
var isNonDepositOrArchived = function isNonDepositOrArchived(lapItem) {
  return lapItem.IBCCustId === 0 || lapItem.isArchived;
};
var getCustIdListFromLapData = function getCustIdListFromLapData(lapPlayerList) {
  return lapPlayerList.reduce(function (result, item) {
    if (!isNonDepositOrArchived(item)) {
      result.push(item.IBCCustId);
    }

    return result;
  }, []);
};
var getErrorMessageForUpdating = function getErrorMessageForUpdating(errorInfo) {
  var defaultKey = 'HttpError_Default';

  if (!errorInfo) {
    return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource(defaultKey);
  }

  var resourceKey = isUnauthorizedResponse(errorInfo) ? 'FunctionDeniedMsg' : defaultKey;
  return Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_2__["decode"])(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource(resourceKey));
};

var isUnauthorizedResponse = function isUnauthorizedResponse(errorInfo) {
  if (!errorInfo.response) {
    return false;
  }

  var status = errorInfo.response.status;
  return status === 403 || status === 401;
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/reportExcel.js":
/*!***********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/reportExcel.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReportExcel; });
/* harmony import */ var _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/excel */ "./www/js/source/reactpages/lib/excel.js");
/* harmony import */ var _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/constants/excelStyle */ "./www/js/source/reactpages/constants/excelStyle.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
var _displayedTextByField;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var HEADER_ROW_INDEX = 0;
var DATA_ROW_INDEX = 1;
var MAIN_SECTION_STYLE = 'mainSectionStyle';
var displayedTextByField = (_displayedTextByField = {}, _defineProperty(_displayedTextByField, _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].SpecialLevel, function (value) {
  return Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_3__["getSpecialLevelText"])(value);
}), _defineProperty(_displayedTextByField, _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].BaStatus, function (value) {
  return Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_3__["getBaStatusText"])(value);
}), _defineProperty(_displayedTextByField, _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Status, function (value) {
  return Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_3__["getPlayerStatus"])(value);
}), _displayedTextByField);
var fieldListWithEmptyValueByStatus = [_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].CurrentBalance, _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].OutstandingBalance, _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].OddsGroup, _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].BaStatus, _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].SpecialLevel];

var ReportExcel =
/*#__PURE__*/
function () {
  function ReportExcel(data, displayedColumn, title) {
    _classCallCheck(this, ReportExcel);

    this.data = data;
    this.title = title;
    this.displayedColumn = displayedColumn;
    this.worksheet = {};
    this.currentRowIndex = DATA_ROW_INDEX;
    this.columnConfigs = this._getcolumnConfigs();
  }

  _createClass(ReportExcel, [{
    key: "export",
    value: function _export(onFinished) {
      var _this = this;

      _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].process(function () {
        _this._createHeader();

        _this._createBodyData();

        _this._createExcelConfig();

        _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"]["export"](_this.worksheet, _this.title);
        onFinished && onFinished();
      });
    }
  }, {
    key: "_createHeader",
    value: function _createHeader() {
      var totalColumn = this.columnConfigs.length;

      for (var i = 0; i < totalColumn; i++) {
        var field = this.columnConfigs[i].field;
        var address = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
          c: i,
          r: HEADER_ROW_INDEX
        });
        this.worksheet[address] = {
          t: "s",
          v: _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"][field] || '',
          s: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["headerCellStyle"]
        };
      }
    }
  }, {
    key: "_createBodyData",
    value: function _createBodyData() {
      var totalColumn = this.columnConfigs.length;

      for (var i = 0; i < this.data.length; i++) {
        var item = this.data[i];

        for (var j = 0; j < totalColumn; j++) {
          var address = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
            c: j,
            r: this.currentRowIndex
          });
          this.worksheet[address] = this._buildDataRow(item, j);
        }

        this.currentRowIndex++;
      }
    }
  }, {
    key: "_buildDataRow",
    value: function _buildDataRow(item, colIndex) {
      var columnConfig = this.columnConfigs[colIndex];
      var shouldHideValue = !item.IsDeposit || item.IsArchived;

      if (shouldHideValue && fieldListWithEmptyValueByStatus.indexOf(columnConfig.field) !== -1) {
        return {
          t: 's',
          v: '',
          s: columnConfig[MAIN_SECTION_STYLE]
        };
      }

      var value = item[columnConfig.field];
      var displayedTextFunc = displayedTextByField[columnConfig.field];
      var displayedValue = this._shouldSetEmpty(value) ? '' : displayedTextFunc ? displayedTextFunc(value) : value;
      return {
        t: _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellType(displayedValue),
        v: displayedValue,
        s: columnConfig[MAIN_SECTION_STYLE]
      };
    }
  }, {
    key: "_shouldSetEmpty",
    value: function _shouldSetEmpty(value) {
      return value === undefined || value === null;
    }
  }, {
    key: "_createExcelConfig",
    value: function _createExcelConfig() {
      var cellStart = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
        r: 0,
        c: 0
      });
      var cellEnd = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
        r: this.currentRowIndex,
        c: this.columnConfigs.length
      });
      this.worksheet["!ref"] = "".concat(cellStart, ":").concat(cellEnd);
      this.worksheet['!cols'] = this.columnConfigs.map(function (x) {
        return {
          wpx: x.width
        };
      });
    }
  }, {
    key: "_getcolumnConfigs",
    value: function _getcolumnConfigs() {
      var _ref,
          _ref2,
          _ref3,
          _ref4,
          _ref5,
          _ref6,
          _ref7,
          _ref8,
          _ref9,
          _ref10,
          _ref11,
          _ref12,
          _this2 = this;

      return [(_ref = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Status
      }, _defineProperty(_ref, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].left), _defineProperty(_ref, "width", 60), _ref), (_ref2 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].UserName
      }, _defineProperty(_ref2, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].left), _defineProperty(_ref2, "width", 200), _ref2), (_ref3 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].SystemId
      }, _defineProperty(_ref3, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].left), _defineProperty(_ref3, "width", 200), _ref3), (_ref4 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].RealName
      }, _defineProperty(_ref4, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].left), _defineProperty(_ref4, "width", 150), _ref4), (_ref5 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Currency
      }, _defineProperty(_ref5, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref5, "width", 80), _ref5), (_ref6 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].CurrentBalance
      }, _defineProperty(_ref6, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_ref6, "width", 130), _ref6), (_ref7 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].OutstandingBalance
      }, _defineProperty(_ref7, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_ref7, "width", 130), _ref7), (_ref8 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].OddsGroup
      }, _defineProperty(_ref8, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref8, "width", 70), _ref8), (_ref9 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].BaStatus
      }, _defineProperty(_ref9, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref9, "width", 70), _ref9), (_ref10 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].SpecialLevel
      }, _defineProperty(_ref10, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref10, "width", 70), _ref10), (_ref11 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].LastTransaction
      }, _defineProperty(_ref11, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].left), _defineProperty(_ref11, "width", 150), _ref11), (_ref12 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Email
      }, _defineProperty(_ref12, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].left), _defineProperty(_ref12, "width", 200), _ref12)].filter(function (x) {
        return !!_this2.displayedColumn[x.field];
      });
    }
  }]);

  return ReportExcel;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/gridInteractionService.js":
/*!*******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/gridInteractionService.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GridInteractionService; });
/* harmony import */ var _helpers_gridHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/gridHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/gridHelper.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _jsroot_lib_dataReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/dataReducer */ "./www/js/source/reactpages/lib/dataReducer.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var GridInteractionService =
/*#__PURE__*/
function () {
  function GridInteractionService() {
    _classCallCheck(this, GridInteractionService);
  }

  _createClass(GridInteractionService, null, [{
    key: "getNextDropdownPosition",
    value: function getNextDropdownPosition(element, currentPosition, dropdownItemName) {
      if (!element || currentPosition) {
        return null;
      }

      var dropdownHeight = _constants__WEBPACK_IMPORTED_MODULE_1__["gridItemDropdownHeight"][dropdownItemName];
      var rect = element.getBoundingClientRect();
      return {
        x: rect.left,
        y: _helpers_gridHelper__WEBPACK_IMPORTED_MODULE_0__["default"].calculateTopPosition(dropdownHeight, rect.top + 20)
      };
    }
  }, {
    key: "updatePlayerItem",
    value: function updatePlayerItem(playerList, custId, value, fieldName) {
      var itemIndex = playerList.findIndex(function (x) {
        return x.IbcCustId === custId;
      });

      if (itemIndex === -1) {
        itemIndex = playerList.findIndex(function (x) {
          return x.LicenseeCustId === custId;
        });
      }

      if (itemIndex !== -1) {
        var newPlayerItem = _objectSpread({}, playerList[itemIndex], _defineProperty({}, fieldName, value));

        return Object(_jsroot_lib_dataReducer__WEBPACK_IMPORTED_MODULE_2__["updateObjectInArray"])(playerList, itemIndex, newPlayerItem);
      }

      return _toConsumableArray(playerList);
    }
  }, {
    key: "updatePlayerWithBaStatus",
    value: function updatePlayerWithBaStatus(playerList, ibcCustId, isBa, oddsGroup) {
      var itemIndex = playerList.findIndex(function (x) {
        return x.IbcCustId === ibcCustId;
      });

      var newPlayerItem = _objectSpread({}, playerList[itemIndex], {
        BaStatus: isBa,
        OddsGroup: oddsGroup
      });

      return Object(_jsroot_lib_dataReducer__WEBPACK_IMPORTED_MODULE_2__["updateObjectInArray"])(playerList, itemIndex, newPlayerItem);
    }
  }, {
    key: "sortPlayerList",
    value: function sortPlayerList(dataList, sortBy, sortOrder) {
      var _this = this;

      if (!dataList || dataList.length === 0) {
        return [];
      }

      var isSortAscending = sortOrder.toLowerCase() === 'asc';

      var newDataList = _toConsumableArray(dataList);

      var isTringType = _constants__WEBPACK_IMPORTED_MODULE_1__["stringTypeFields"].includes(sortBy);
      var isDateTimeField = sortBy === _constants__WEBPACK_IMPORTED_MODULE_1__["fields"].LastTransaction;
      newDataList.sort(function (currentItem, nextItem) {
        var currentValue = currentItem[sortBy];
        var nextValue = nextItem[sortBy];

        if (isTringType) {
          return _this.sortStringValue(currentValue || '', nextValue || '', isSortAscending);
        } else if (isDateTimeField) {
          var currentItemDate = currentValue ? new Date(currentValue) : 0;
          var nextItemDate = nextValue ? new Date(nextValue) : 0;
          var comparingResult = (_this.isValidDate(currentItemDate) ? currentItemDate : 0) - (_this.isValidDate(nextItemDate) ? nextItemDate : 0);
          return isSortAscending ? comparingResult : -comparingResult;
        }

        return isSortAscending ? currentValue - nextValue : -(currentValue - nextValue);
      });
      return newDataList;
    }
  }, {
    key: "sortStringValue",
    value: function sortStringValue(current, next, isSortAscending) {
      var currentUpperCase = current.toUpperCase();
      var nextUpperCase = next.toUpperCase();
      var sortResult = currentUpperCase > nextUpperCase ? 1 : currentUpperCase < nextUpperCase ? -1 : 0;
      return isSortAscending ? sortResult : -sortResult;
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(d) {
      return d instanceof Date && !isNaN(d);
    }
  }]);

  return GridInteractionService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/lapPlayerQueryService.js":
/*!******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/lapPlayerQueryService.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LapPlayerQueryService; });
/* harmony import */ var _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/playerListDataHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerListDataHelper.js");
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
/* harmony import */ var _helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerDataBuilder.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var LapPlayerQueryService =
/*#__PURE__*/
function () {
  function LapPlayerQueryService() {
    _classCallCheck(this, LapPlayerQueryService);
  }

  _createClass(LapPlayerQueryService, null, [{
    key: "fetchData",
    value: function fetchData(param, commonService, apiInfo) {
      var _this = this;

      var lrfDataById = apiInfo.lrfDataById,
          lapSearch = apiInfo.lapSearch;
      return commonService.fetchData(lapSearch.type, lapSearch.action, _objectSpread({}, param)).then(function (lapResponse) {
        var _lapResponse$data = lapResponse.data,
            _lapResponse$data$Pla = _lapResponse$data.PlayerList,
            lapPlayerList = _lapResponse$data$Pla === void 0 ? [] : _lapResponse$data$Pla,
            _lapResponse$data$Tot = _lapResponse$data.TotalItem,
            lapTotalItem = _lapResponse$data$Tot === void 0 ? 0 : _lapResponse$data$Tot;

        if (!lapPlayerList || !lapPlayerList.length) {
          return _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
        }

        return _this._fetchFromLrf(param, lrfDataById, lapPlayerList, commonService, lapTotalItem);
      })["catch"](function () {
        return _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
      });
    }
  }, {
    key: "_fetchFromLrf",
    value: function _fetchFromLrf(param, lrfDataById, lapPlayerList, commonService, lapTotalItem) {
      var idList = Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_1__["getCustIdListFromLapData"])(lapPlayerList);
      var nonDepositOrArchivedList = lapPlayerList.filter(function (x) {
        return Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_1__["isNonDepositOrArchived"])(x);
      });

      if (idList.length === 0) {
        return {
          playerList: Object(_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLapPlayerList"])(nonDepositOrArchivedList),
          totalItem: lapTotalItem
        };
      }

      var lrfParam = {
        currencyIdList: param.currencyIdList,
        idList: idList.join(','),
        specialLevel: param.specialLevel,
        oddsGroup: param.oddsGroup,
        baFilter: param.baFilter,
        pageSize: param.pageSize,
        pageIndex: 1
      };
      return commonService.fetchData(lrfDataById.type, lrfDataById.action, lrfParam).then(function (lrfResponse) {
        var lrfPlayerList = lrfResponse.data.DataList;
        var filteredLapPlayerList = lapPlayerList.filter(function (x) {
          return x.IBCCustId === 0 || lrfPlayerList.findIndex(function (p) {
            return p.IbcCustId === x.IBCCustId;
          }) !== -1;
        });
        var filteredItemCount = lapPlayerList.length - filteredLapPlayerList.length;
        var totalItem = lapTotalItem - filteredItemCount;

        if (!lrfPlayerList || !lrfPlayerList.length) {
          return {
            playerList: Object(_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLapPlayerList"])(filteredLapPlayerList),
            totalItem: totalItem
          };
        }

        var playerList = _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(lrfPlayerList, filteredLapPlayerList);
        return {
          playerList: playerList,
          totalItem: totalItem
        };
      })["catch"](function () {
        return {
          playerList: Object(_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLapPlayerList"])(nonDepositOrArchivedList),
          totalItem: nonDepositOrArchivedList.length
        };
      });
    }
  }]);

  return LapPlayerQueryService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/lrfPlayerQueryService.js":
/*!******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/lrfPlayerQueryService.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LrfPlayerQueryService; });
/* harmony import */ var _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/playerListDataHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerListDataHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var LrfPlayerQueryService =
/*#__PURE__*/
function () {
  function LrfPlayerQueryService() {
    _classCallCheck(this, LrfPlayerQueryService);
  }

  _createClass(LrfPlayerQueryService, null, [{
    key: "fetchData",
    value: function fetchData(param, commonService, apiInfo) {
      var _this = this;

      var lrfSearch = apiInfo.lrfSearch,
          lapDataById = apiInfo.lapDataById;
      return commonService.fetchData(lrfSearch.type, lrfSearch.action, _objectSpread({}, param)).then(function (lrfResponse) {
        var _lrfResponse$data = lrfResponse.data,
            lrfPlayerList = _lrfResponse$data.DataList,
            TotalItem = _lrfResponse$data.TotalItem;

        if (!lrfPlayerList || !lrfPlayerList.length) {
          return _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
        }

        return _this._fetchFromLap(lrfPlayerList, lapDataById, commonService, TotalItem);
      })["catch"](function () {
        return _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
      });
    }
  }, {
    key: "_fetchFromLap",
    value: function _fetchFromLap(lrfPlayerList, lapDataById, commonService, lrfTotalItem) {
      var lapParam = {
        idList: lrfPlayerList.map(function (x) {
          return x.IbcCustId;
        })
      };
      return commonService.fetchData(lapDataById.type, lapDataById.action, lapParam).then(function (lapResponse) {
        var lapPlayerList = lapResponse.data.PlayerList;

        if (!lapPlayerList || !lapPlayerList.length) {
          return _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
        }

        var playerList = _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(lrfPlayerList, lapPlayerList);
        return {
          playerList: playerList,
          totalItem: lrfTotalItem
        };
      })["catch"](function () {
        return _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
      });
    }
  }]);

  return LrfPlayerQueryService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerCommandService.js":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerCommandService.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerCommandService; });
/* harmony import */ var _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/factoryCommonService */ "./www/js/source/reactpages/Module/lib/factoryCommonService.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var PlayerCommandService =
/*#__PURE__*/
function () {
  function PlayerCommandService() {
    _classCallCheck(this, PlayerCommandService);

    this.commonService = _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__["default"].createInstance();
  }

  _createClass(PlayerCommandService, [{
    key: "updateBaStatus",
    value: function updateBaStatus(param) {
      var updateBaStatus = _constants__WEBPACK_IMPORTED_MODULE_1__["apiUpdateInfo"].updateBaStatus;
      return this.commonService.fetchData(updateBaStatus.type, updateBaStatus.action, _objectSpread({}, param));
    }
  }, {
    key: "updateOddsGroup",
    value: function updateOddsGroup(param) {
      var updateOddsGroup = _constants__WEBPACK_IMPORTED_MODULE_1__["apiUpdateInfo"].updateOddsGroup;
      return this.commonService.fetchData(updateOddsGroup.type, updateOddsGroup.action, _objectSpread({}, param));
    }
  }, {
    key: "updateSpecialLevel",
    value: function updateSpecialLevel(param) {
      var updateSpecialLevel = _constants__WEBPACK_IMPORTED_MODULE_1__["apiUpdateInfo"].updateSpecialLevel;
      return this.commonService.fetchData(updateSpecialLevel.type, updateSpecialLevel.action, _objectSpread({}, param));
    }
  }, {
    key: "updatePlayerStatus",
    value: function updatePlayerStatus(param) {
      var updatePlayerStatus = _constants__WEBPACK_IMPORTED_MODULE_1__["apiUpdateInfo"].updatePlayerStatus;
      return this.commonService.fetchData(updatePlayerStatus.type, updatePlayerStatus.action, _objectSpread({}, param));
    }
  }]);

  return PlayerCommandService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerItemQueryService.js":
/*!*******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerItemQueryService.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerItemQueryService; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/playerListDataHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerListDataHelper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var PlayerItemQueryService =
/*#__PURE__*/
function () {
  function PlayerItemQueryService() {
    _classCallCheck(this, PlayerItemQueryService);
  }

  _createClass(PlayerItemQueryService, null, [{
    key: "getPlayerById",
    value: function getPlayerById(param, commonService, apiInfo) {
      var lrfDataById = apiInfo.lrfDataById,
          lapGetPlayerByLicenseeId = apiInfo.lapGetPlayerByLicenseeId;
      var ibcCustId = param.ibcCustId,
          licenseeCustId = param.licenseeCustId;
      var lrfParam = {
        idList: ibcCustId,
        specialLevel: Object.keys(_constants__WEBPACK_IMPORTED_MODULE_0__["specialLevelListWithColor"]).map(function (item) {
          return item;
        }).join(','),
        pageSize: _constants__WEBPACK_IMPORTED_MODULE_0__["defaultPagingOption"].PageSize,
        pageIndex: 1
      };
      var lapParam = {
        custId: licenseeCustId
      };
      var lrfPromise = ibcCustId > 0 ? commonService.fetchData(lrfDataById.type, lrfDataById.action, lrfParam) : null;
      var lapPromise = commonService.fetchData(lapGetPlayerByLicenseeId.type, lapGetPlayerByLicenseeId.action, lapParam);
      return this._getResult(lrfPromise, lapPromise, commonService);
    }
  }, {
    key: "_getResult",
    value: function _getResult(lrfPromise, lapPromise, commonService) {
      return commonService.fetchMultiple([lrfPromise, lapPromise], function (lrfResponse, lapResponse) {
        var _ref = lrfResponse && lrfResponse.data || {},
            _ref$DataList = _ref.DataList,
            lrfPlayerList = _ref$DataList === void 0 ? [] : _ref$DataList;

        var Player = lapResponse.data.Player;
        var lapPlayerList = Player ? [Player] : [];
        var playerList = _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_1__["default"].mergePlayerList(lrfPlayerList, lapPlayerList);
        return playerList.length ? playerList[0] : null;
      })["catch"](function (error) {
        console.log(error.message);
        return null;
      });
    }
  }]);

  return PlayerItemQueryService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerMultipleQueryService.js":
/*!***********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerMultipleQueryService.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerMultipleQueryService; });
/* harmony import */ var _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/playerListDataHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerListDataHelper.js");
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/utils.js");
/* harmony import */ var _helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/helpers/playerDataBuilder.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var PlayerMultipleQueryService =
/*#__PURE__*/
function () {
  function PlayerMultipleQueryService() {
    _classCallCheck(this, PlayerMultipleQueryService);
  }

  _createClass(PlayerMultipleQueryService, null, [{
    key: "fetchData",
    value: function fetchData(param, commonService, apiInfo) {
      var lrfSearch = apiInfo.lrfSearch,
          lapSearch = apiInfo.lapSearch;
      var lrfPromise = commonService.fetchData(lrfSearch.type, lrfSearch.action, _objectSpread({}, param))["catch"](function (error) {
        console.log(error.message);
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('HttpError_Default'));
        return {
          data: {
            DataList: [],
            TotalItem: 0
          }
        };
      });
      var lapPromise = commonService.fetchData(lapSearch.type, lapSearch.action, _objectSpread({}, param))["catch"](function (error) {
        console.log(error.message);
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('HttpError_Default'));
        return {
          data: {
            PlayerList: [],
            TotalItem: 0
          }
        };
      });
      return this._getResult(param, lrfPromise, lapPromise, commonService, apiInfo);
    }
  }, {
    key: "_getResult",
    value: function _getResult(param, lrfPromise, lapPromise, commonService, apiInfo) {
      var _this = this;

      return commonService.fetchMultiple([lrfPromise, lapPromise], function (lrfResponse, lapResponse) {
        var lrfPlayerList = lrfResponse.data.DataList;
        var _lapResponse$data = lapResponse.data,
            lapPlayerList = _lapResponse$data.PlayerList,
            lapTotalItem = _lapResponse$data.TotalItem;
        var lrfDataObject = _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getDataObject(lrfPlayerList, lapPlayerList);
        var lapDataObject = _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getDataObject(lapPlayerList, lrfPlayerList);
        var playerList = _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(lrfDataObject.commonList, lapDataObject.commonList);
        var idListNotInLrf = Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_1__["getCustIdListFromLapData"])(lapDataObject.differenceList);

        if (idListNotInLrf.length === 0) {
          var nonDepositPlayerList = Object(_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLapPlayerList"])(lapDataObject.differenceList);
          var finalPlayerList = playerList.length > 0 ? playerList.concat(nonDepositPlayerList) : nonDepositPlayerList;
          return {
            playerList: finalPlayerList,
            totalItem: lapTotalItem
          };
        }

        var lrfParam = {
          currencyIdList: param.currencyIdList,
          idList: idListNotInLrf.join(','),
          specialLevel: param.specialLevel,
          oddsGroup: param.oddsGroup,
          baFilter: param.baFilter,
          pageSize: param.pageSize,
          pageIndex: 1
        };
        return _this._refetchFromLrf(lrfParam, lapDataObject, commonService, apiInfo).then(function (response) {
          var nextPlayerList = response.playerList;
          var filteredItemCount = lapDataObject.differenceList.length - nextPlayerList.length;
          var totalItem = lapTotalItem - filteredItemCount;
          return {
            playerList: playerList.concat(nextPlayerList),
            totalItem: totalItem
          };
        });
      })["catch"](function (error) {
        console.log(error.message);
        return _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
      });
    }
  }, {
    key: "_refetchFromLrf",
    value: function _refetchFromLrf(lrfParam, lapDataObject, commonService, apiInfo) {
      var lrfDataById = apiInfo.lrfDataById;
      var differenceList = lapDataObject.differenceList;
      return commonService.fetchData(lrfDataById.type, lrfDataById.action, _objectSpread({}, lrfParam)).then(function (nextLrfResponse) {
        var nextLrfPlayerList = nextLrfResponse.data.DataList;
        var filteredLapPlayerList = differenceList.filter(function (x) {
          return Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_1__["isNonDepositOrArchived"])(x) || nextLrfPlayerList.findIndex(function (p) {
            return p.IbcCustId === x.IBCCustId;
          }) !== -1;
        });

        if (!nextLrfPlayerList || !nextLrfPlayerList.length) {
          return {
            playerList: Object(_helpers_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLapPlayerList"])(filteredLapPlayerList)
          };
        }

        var playerList = _helpers_playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(nextLrfPlayerList, filteredLapPlayerList);
        return {
          playerList: playerList
        };
      })["catch"](function (error) {
        console.log(error.message);
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('HttpError_Default'));
        return {
          playerList: []
        };
      });
    }
  }]);

  return PlayerMultipleQueryService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerQueryService.js":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerQueryService.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerQueryService; });
/* harmony import */ var _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/factoryCommonService */ "./www/js/source/reactpages/Module/lib/factoryCommonService.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _reportExcel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reportExcel */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/reportExcel.js");
/* harmony import */ var _queryServiceFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queryServiceFactory */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/queryServiceFactory.js");
/* harmony import */ var _playerItemQueryService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./playerItemQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerItemQueryService.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var PlayerQueryService =
/*#__PURE__*/
function () {
  function PlayerQueryService() {
    _classCallCheck(this, PlayerQueryService);

    this.commonService = _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__["default"].createInstance();
  }

  _createClass(PlayerQueryService, [{
    key: "getTabList",
    value: function getTabList() {
      return this.commonService.getTabList();
    }
  }, {
    key: "getPlayerList",
    value: function getPlayerList(param) {
      var playerListService = _queryServiceFactory__WEBPACK_IMPORTED_MODULE_3__["default"].getPlayerListService(param, this.commonService);
      return playerListService.fetchData(param, this.commonService, _constants__WEBPACK_IMPORTED_MODULE_1__["apiInfo"]);
    }
  }, {
    key: "getSinglePlayer",
    value: function getSinglePlayer(param) {
      return _playerItemQueryService__WEBPACK_IMPORTED_MODULE_4__["default"].getPlayerById(param, this.commonService, _constants__WEBPACK_IMPORTED_MODULE_1__["apiInfo"]);
    }
  }, {
    key: "getLink",
    value: function getLink(systemType, action) {
      return this.commonService.getLink(systemType, action);
    }
  }, {
    key: "exportExcel",
    value: function exportExcel(playerList, param, displayedColumn) {
      var fileName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'PlayerList';
      var reportExcel = new _reportExcel__WEBPACK_IMPORTED_MODULE_2__["default"](playerList, displayedColumn, fileName);
      reportExcel["export"]();
    }
  }]);

  return PlayerQueryService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerSuggestionService.js":
/*!********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerSuggestionService.js ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerSuggestionService; });
/* harmony import */ var _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/factoryCommonService */ "./www/js/source/reactpages/Module/lib/factoryCommonService.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var PlayerSuggestionService =
/*#__PURE__*/
function () {
  function PlayerSuggestionService() {
    _classCallCheck(this, PlayerSuggestionService);

    this.commonService = _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__["default"].createInstance();
  }

  _createClass(PlayerSuggestionService, [{
    key: "getSuggestionList",
    value: function getSuggestionList(param) {
      var configOption = {
        method: 'get'
      };
      return this.commonService.fetchData(_constants__WEBPACK_IMPORTED_MODULE_1__["apiSuggestion"].type, _constants__WEBPACK_IMPORTED_MODULE_1__["apiSuggestion"].action, _objectSpread({}, param), configOption);
    }
  }]);

  return PlayerSuggestionService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/queryServiceFactory.js":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/queryServiceFactory.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QueryServiceFactory; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _lapPlayerQueryService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lapPlayerQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/lapPlayerQueryService.js");
/* harmony import */ var _playerMultipleQueryService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerMultipleQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/playerMultipleQueryService.js");
/* harmony import */ var _lrfPlayerQueryService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lrfPlayerQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/lrfPlayerQueryService.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var QueryServiceFactory =
/*#__PURE__*/
function () {
  function QueryServiceFactory() {
    _classCallCheck(this, QueryServiceFactory);
  }

  _createClass(QueryServiceFactory, null, [{
    key: "getPlayerListService",
    value: function getPlayerListService(param) {
      var bankAccountNumber = param.bankAccountNumber,
          email = param.email;

      if (bankAccountNumber || email) {
        return _lapPlayerQueryService__WEBPACK_IMPORTED_MODULE_1__["default"];
      } else if (this._isChangeAdvancedSearch(param)) {
        return _lrfPlayerQueryService__WEBPACK_IMPORTED_MODULE_3__["default"];
      } else {
        return _playerMultipleQueryService__WEBPACK_IMPORTED_MODULE_2__["default"];
      }
    }
  }, {
    key: "_isChangeAdvancedSearch",
    value: function _isChangeAdvancedSearch(param) {
      var baFilter = param.baFilter,
          currencyIdList = param.currencyIdList,
          oddsGroup = param.oddsGroup,
          specialLevel = param.specialLevel;
      return Number(baFilter) !== 0 || currencyIdList !== '' || oddsGroup !== '' || Object.keys(_constants__WEBPACK_IMPORTED_MODULE_0__["specialLevelListWithColor"]).length !== specialLevel.split(',').length;
    }
  }]);

  return QueryServiceFactory;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/siteSettingService.js":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/services/siteSettingService.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SiteSettingService; });
/* harmony import */ var _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/factoryCommonService */ "./www/js/source/reactpages/Module/lib/factoryCommonService.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var SiteSettingService =
/*#__PURE__*/
function () {
  function SiteSettingService() {
    _classCallCheck(this, SiteSettingService);

    this.commonService = _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__["default"].createInstance();
  }

  _createClass(SiteSettingService, [{
    key: "getSetting",
    value: function getSetting() {
      return this.commonService.fetchData(_constants__WEBPACK_IMPORTED_MODULE_1__["apiSiteSetting"].type, _constants__WEBPACK_IMPORTED_MODULE_1__["apiSiteSetting"].action, {});
    }
  }]);

  return SiteSettingService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/filterHandlerReducer.js":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/filterHandlerReducer.js ***!
  \*************************************************************************************************/
/*! exports provided: param, playerList, type, currencyList, hasBaPermission, hasOddsGroupPermission, hasSpecialLevelPermission, isSubsidiary, isAdvancedSearch, isFilterCollapsing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "param", function() { return param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerList", function() { return playerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyList", function() { return currencyList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasBaPermission", function() { return hasBaPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasOddsGroupPermission", function() { return hasOddsGroupPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasSpecialLevelPermission", function() { return hasSpecialLevelPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSubsidiary", function() { return isSubsidiary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAdvancedSearch", function() { return isAdvancedSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFilterCollapsing", function() { return isFilterCollapsing; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var param = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_PARAM"], function (preState, action) {
  return _objectSpread({}, action.data);
}));
var playerList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_PLAYER_LIST"], function (preState, action) {
  return action.data && _toConsumableArray(action.data);
}));
var type = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {});
var currencyList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])([], {});
var hasBaPermission = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, {});
var hasOddsGroupPermission = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, {});
var hasSpecialLevelPermission = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, {});
var isSubsidiary = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, {});
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
/*! exports provided: displayedColumnList, currentActivePlayer, pagingOption, isFetchingData, sweetAlertOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayedColumnList", function() { return displayedColumnList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentActivePlayer", function() { return currentActivePlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagingOption", function() { return pagingOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFetchingData", function() { return isFetchingData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sweetAlertOption", function() { return sweetAlertOption; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
/* harmony import */ var _lib_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/constants.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var pagingOption = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_lib_constants_js__WEBPACK_IMPORTED_MODULE_2__["defaultPagingOption"], _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_1__["SET_PAGING"], function (preState, action) {
  return _objectSpread({}, action.data);
}));
var isFetchingData = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_1__["SET_IS_FETCHING_DATA"], function (preState, action) {
  return action.data;
}));
var sweetAlertOption = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_1__["SET_SWEET_ALERT_OPTION"], function (preState, action) {
  return action.data && _objectSpread({}, action.data);
}));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridOddsGroupReducer.js":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridOddsGroupReducer.js ***!
  \*************************************************************************************************/
/*! exports provided: oddsGroupDropdownPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oddsGroupDropdownPosition", function() { return oddsGroupDropdownPosition; });
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var oddsGroupDropdownPosition = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_ODDSGROUP_POSITION"], function (preState, action) {
  return action.data && _objectSpread({}, action.data);
}));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridPlayerStatusReducer.js":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridPlayerStatusReducer.js ***!
  \****************************************************************************************************/
/*! exports provided: statusDropdownPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statusDropdownPosition", function() { return statusDropdownPosition; });
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var statusDropdownPosition = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_STATUS_POSITION"], function (preState, action) {
  return action.data && _objectSpread({}, action.data);
}));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridSpecialLevelReducer.js":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridSpecialLevelReducer.js ***!
  \****************************************************************************************************/
/*! exports provided: specialLevelDropdownPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "specialLevelDropdownPosition", function() { return specialLevelDropdownPosition; });
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var specialLevelDropdownPosition = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SPECIAL_LEVEL_POSITION"], function (preState, action) {
  return action.data && _objectSpread({}, action.data);
}));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridUserNameReducer.js":
/*!************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridUserNameReducer.js ***!
  \************************************************************************************************/
/*! exports provided: contextMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contextMenu", function() { return contextMenu; });
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var contextMenu = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_CONTEXT_MENU"], function (preState, action) {
  return _objectSpread({}, action.data);
}));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/index.js":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/index.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterHandlerReducer.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/filterHandlerReducer.js");
/* harmony import */ var _playerDetailHandlerReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerDetailHandlerReducer */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/playerDetailHandlerReducer.js");
/* harmony import */ var _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _gridHandlerReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gridHandlerReducer */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridHandlerReducer.js");
/* harmony import */ var _gridOddsGroupReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gridOddsGroupReducer */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridOddsGroupReducer.js");
/* harmony import */ var _gridSpecialLevelReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gridSpecialLevelReducer */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridSpecialLevelReducer.js");
/* harmony import */ var _gridPlayerStatusReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./gridPlayerStatusReducer */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridPlayerStatusReducer.js");
/* harmony import */ var _gridUserNameReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gridUserNameReducer */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/gridUserNameReducer.js");
/* harmony import */ var _siteSettingReducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./siteSettingReducer */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/siteSettingReducer.js");










/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign({}, _filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_1__, _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_3__, _playerDetailHandlerReducer__WEBPACK_IMPORTED_MODULE_2__, _gridHandlerReducer__WEBPACK_IMPORTED_MODULE_4__, _gridOddsGroupReducer__WEBPACK_IMPORTED_MODULE_5__, _gridSpecialLevelReducer__WEBPACK_IMPORTED_MODULE_6__, _gridPlayerStatusReducer__WEBPACK_IMPORTED_MODULE_7__, _gridUserNameReducer__WEBPACK_IMPORTED_MODULE_8__, _siteSettingReducer__WEBPACK_IMPORTED_MODULE_9__)));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/playerDetailHandlerReducer.js":
/*!*******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/playerDetailHandlerReducer.js ***!
  \*******************************************************************************************************/
/*! exports provided: selectedPlayer, selectedPlayerIdList, selectedTabName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var selectedPlayer = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SELECTED_PLAYER"], function (preState, action) {
  return action.data && _objectSpread({}, action.data);
}));
var selectedPlayerIdList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])([], _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SELECTED_PLAYERID_LIST"], function (preState, action) {
  return _toConsumableArray(action.data);
}));
var selectedTabName = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])('', _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SELECTED_TAB_NAME"], function (preState, action) {
  return action.data;
}));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/siteSettingReducer.js":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/siteSettingReducer.js ***!
  \***********************************************************************************************/
/*! exports provided: siteSetting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "siteSetting", function() { return siteSetting; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var defaultSiteSetting = {
  isAllowedBA: false,
  isAllowedCustomerComm: false
};
var siteSetting = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(defaultSiteSetting, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SITE_SETTING"], function (preState, action) {
  return _objectSpread({}, action.data);
}));

/***/ }),

/***/ "./www/js/source/reactpages/Module/constants/configInfo.js":
/*!*****************************************************************!*\
  !*** ./www/js/source/reactpages/Module/constants/configInfo.js ***!
  \*****************************************************************/
/*! exports provided: tokenUrlTemplate, systemType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenUrlTemplate", function() { return tokenUrlTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemType", function() { return systemType; });
var pageConfig = window._pConfig;
var tokenUrlTemplate = pageConfig && pageConfig.tokenUrl;
var systemType = {
  internal: 0,
  lrf: 1,
  affiliate: 2,
  newAdmin: 3
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/lib/baseCommonService.js":
/*!******************************************************************!*\
  !*** ./www/js/source/reactpages/Module/lib/baseCommonService.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

  return BaseCommonService;
}();

/* harmony default export */ __webpack_exports__["default"] = (BaseCommonService);

/***/ }),

/***/ "./www/js/source/reactpages/Module/lib/factoryCommonService.js":
/*!*********************************************************************!*\
  !*** ./www/js/source/reactpages/Module/lib/factoryCommonService.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FactoryCommonService; });
/* harmony import */ var _lapCommonService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lapCommonService */ "./www/js/source/reactpages/Module/lib/lapCommonService.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var FactoryCommonService =
/*#__PURE__*/
function () {
  function FactoryCommonService() {
    _classCallCheck(this, FactoryCommonService);
  }

  _createClass(FactoryCommonService, null, [{
    key: "createInstance",
    value: function createInstance() {
      var pageConfig = window._pConfig;

      if (!pageConfig) {
        throw new Error("Missing _pConfig in window");
      }

      var applyApiTokenUrl = pageConfig.applyApiTokenUrl,
          tabList = pageConfig.tabList;

      if (!applyApiTokenUrl) {
        throw new Error("Missing applyApiTokenUrl in window._pConfig");
      }

      if (!window.Identity) {
        throw new Error("Missing Identity object");
      }

      var _window$Identity = window.Identity,
          RootUrl = _window$Identity.RootUrl,
          ApplyTokenUrl = _window$Identity.ApplyTokenUrl;

      if (!RootUrl) {
        throw new Error("Missing Identity.RootUrl");
      }

      if (!ApplyTokenUrl) {
        throw new Error("Missing Identity.ApplyTokenUrl");
      }

      var initialConfig = {
        tabList: tabList,
        baseUrl: RootUrl,
        applyApiTokenUrl: applyApiTokenUrl,
        applyLinkTokenUrl: ApplyTokenUrl
      };
      return new _lapCommonService__WEBPACK_IMPORTED_MODULE_0__["default"](initialConfig);
    }
  }]);

  return FactoryCommonService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/lib/lapCommonService.js":
/*!*****************************************************************!*\
  !*** ./www/js/source/reactpages/Module/lib/lapCommonService.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseCommonService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseCommonService */ "./www/js/source/reactpages/Module/lib/baseCommonService.js");
/* harmony import */ var _constants_configInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/configInfo */ "./www/js/source/reactpages/Module/constants/configInfo.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var defaultAjaxConfig = {
  method: 'post',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'content-type': 'application/x-www-form-urlencoded'
  },
  withCredentials: false,
  responseType: 'json',
  cancelToken: new axios__WEBPACK_IMPORTED_MODULE_2___default.a.CancelToken(function (cancel) {})
};

var LapCommonService =
/*#__PURE__*/
function (_BaseCommonService) {
  _inherits(LapCommonService, _BaseCommonService);

  function LapCommonService(initialConfig) {
    var _this;

    _classCallCheck(this, LapCommonService);

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

      return configWithParam;
    }
  }, {
    key: "_getConfigParam",
    value: function _getConfigParam(config, params) {
      var isGetMethod = config.method.toLowerCase() === 'get';
      var paramConfig = isGetMethod ? {
        params: params
      } : {
        data: qs__WEBPACK_IMPORTED_MODULE_3___default.a.stringify(params)
      };
      return _objectSpread({}, config, {}, paramConfig);
    }
  }, {
    key: "_fetchDataWithToken",
    value: function _fetchDataWithToken(sysType, action, params, configOption) {
      var _this2 = this;

      var apiToken = "".concat(this._applyApiTokenUrl, "?").concat(this._buildApplyTokenQueryString(sysType, action));
      return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(apiToken).then(function (response) {
        var _response$data = response.data,
            Token = _response$data.Token,
            ApiUrl = _response$data.ApiUrl;
        var apiActionUrl = "".concat(ApiUrl, "/").concat(action);

        var commonAjaxConfig = _this2._buildCommonAjaxConfig(configOption, apiActionUrl, params);

        var headerConfig = _objectSpread({}, configOption.headers, {
          'X-Auth-Token': Token
        });

        var configWithXToken = _objectSpread({}, commonAjaxConfig, {
          headers: _objectSpread({}, headerConfig)
        });

        return axios__WEBPACK_IMPORTED_MODULE_2___default()(configWithXToken);
      });
    }
  }, {
    key: "fetchData",
    value: function fetchData(sysType, action, params) {
      var configOption = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultAjaxConfig;

      var config = _objectSpread({}, defaultAjaxConfig, {}, configOption);

      if (sysType === _constants_configInfo__WEBPACK_IMPORTED_MODULE_1__["systemType"].newAdmin) {
        var relativeUrl = this._baseUrl + action;

        var ajaxConfig = this._buildCommonAjaxConfig(config, relativeUrl, params);

        return axios__WEBPACK_IMPORTED_MODULE_2___default()(ajaxConfig);
      } else {
        return this._fetchDataWithToken(sysType, action, params, config);
      }
    }
  }, {
    key: "fetchMultiple",
    value: function fetchMultiple(promiseList, callback) {
      if (promiseList && promiseList.length) {
        return axios__WEBPACK_IMPORTED_MODULE_2___default.a.all(promiseList).then(axios__WEBPACK_IMPORTED_MODULE_2___default.a.spread(callback));
      }
    }
  }]);

  return LapCommonService;
}(_baseCommonService__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (LapCommonService);

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
    'site-caret': caret
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

/***/ "./www/js/source/reactpages/components/sweet-alert/icon.js":
/*!*****************************************************************!*\
  !*** ./www/js/source/reactpages/components/sweet-alert/icon.js ***!
  \*****************************************************************/
/*! exports provided: ICON, errorIconMarkup, warningIconMarkup, successIconMarkup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ICON", function() { return ICON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorIconMarkup", function() { return errorIconMarkup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warningIconMarkup", function() { return warningIconMarkup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "successIconMarkup", function() { return successIconMarkup; });
var ICON = 'swal-icon';
var errorIconMarkup = function errorIconMarkup() {
  var icon = "".concat(ICON, "--error");
  var line = "".concat(icon, "__line");
  var markup = "\n    <div class=\"".concat(icon, "__x-mark\">\n      <span class=\"").concat(line, " ").concat(line, "--left\"></span>\n      <span class=\"").concat(line, " ").concat(line, "--right\"></span>\n    </div>\n  ");
  return markup;
};
var warningIconMarkup = function warningIconMarkup() {
  var icon = "".concat(ICON, "--warning");
  return "\n    <span class=\"".concat(icon, "__body\">\n      <span class=\"").concat(icon, "__dot\"></span>\n    </span>\n  ");
};
var successIconMarkup = function successIconMarkup() {
  var icon = "".concat(ICON, "--success");
  return "\n    <span class=\"".concat(icon, "__line ").concat(icon, "__line--long\"></span>\n    <span class=\"").concat(icon, "__line ").concat(icon, "__line--tip\"></span>\n\n    <div class=\"").concat(icon, "__ring\"></div>\n    <div class=\"").concat(icon, "__hide-corners\"></div>\n  ");
};

/***/ }),

/***/ "./www/js/source/reactpages/components/sweet-alert/index.jsx":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/components/sweet-alert/index.jsx ***!
  \*******************************************************************/
/*! exports provided: SweetAlert, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SweetAlert", function() { return SweetAlert; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../popup */ "./www/js/source/reactpages/components/popup/index.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon */ "./www/js/source/reactpages/components/sweet-alert/icon.js");
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





var PREDEFINED_ICONS = ["error", "warning", "success", "info"];
var ICON_CONTENTS = {
  error: Object(_icon__WEBPACK_IMPORTED_MODULE_3__["errorIconMarkup"])(),
  warning: Object(_icon__WEBPACK_IMPORTED_MODULE_3__["warningIconMarkup"])(),
  success: Object(_icon__WEBPACK_IMPORTED_MODULE_3__["successIconMarkup"])()
};
var SweetAlert =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SweetAlert, _React$Component);

  function SweetAlert(props) {
    _classCallCheck(this, SweetAlert);

    return _possibleConstructorReturn(this, _getPrototypeOf(SweetAlert).call(this, props));
  }

  _createClass(SweetAlert, [{
    key: "_buildButtonGroup",
    value: function _buildButtonGroup(buttons) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "al-button-container"
      }, buttons.map(function (btnItem, index) {
        var text = btnItem.text,
            attrs = _objectWithoutProperties(btnItem, ["text"]);

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", _extends({
          key: index,
          type: "button"
        }, attrs), text);
      }));
    }
  }, {
    key: "_buildIcon",
    value: function _buildIcon() {
      var icon = this.props.icon;
      var className = "".concat(_icon__WEBPACK_IMPORTED_MODULE_3__["ICON"], " ").concat(_icon__WEBPACK_IMPORTED_MODULE_3__["ICON"], "--").concat(icon);

      if (PREDEFINED_ICONS.includes(icon)) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: className,
          dangerouslySetInnerHTML: {
            __html: ICON_CONTENTS[icon]
          }
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          buttons = _this$props.buttons,
          children = _this$props.children,
          props = _objectWithoutProperties(_this$props, ["buttons", "children"]);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "sweet-alert"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_popup__WEBPACK_IMPORTED_MODULE_1__["default"], props, this._buildIcon(), children, this._buildButtonGroup(buttons)));
    }
  }]);

  return SweetAlert;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
SweetAlert.propTypes = {
  width: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string]),
  height: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string]),
  title: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  isShow: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  isHtml: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  buttons: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object)
};
SweetAlert.defaultProps = {
  width: 400,
  height: 200,
  isShow: false,
  isHtml: false,
  title: '',
  buttons: []
};
/* harmony default export */ __webpack_exports__["default"] = (SweetAlert);

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

/***/ "./www/js/source/reactpages/constants/excelStyle.js":
/*!**********************************************************!*\
  !*** ./www/js/source/reactpages/constants/excelStyle.js ***!
  \**********************************************************/
/*! exports provided: titleCellStyle, headerCellStyle, bodyCellStyle, totalCellStyle, grandTotalCellStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleCellStyle", function() { return titleCellStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerCellStyle", function() { return headerCellStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bodyCellStyle", function() { return bodyCellStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "totalCellStyle", function() { return totalCellStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grandTotalCellStyle", function() { return grandTotalCellStyle; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var titleCellStyle = {
  font: {
    color: {
      rgb: "FFFFFF"
    }
  },
  fill: {
    patternType: "solid",
    fgColor: {
      rgb: "4C6375"
    }
  }
};
var headerCellStyle = {
  font: {
    bold: true,
    color: {
      rgb: "2C2C2C"
    },
    sz: "12"
  },
  alignment: {
    horizontal: "center",
    vertical: "center"
  },
  fill: {
    patternType: "solid",
    fgColor: {
      rgb: "9EB4C3"
    }
  },
  border: {
    left: {
      style: "thin",
      color: {
        rgb: "D6D6D6"
      }
    },
    bottom: {
      style: "thin",
      color: {
        rgb: "D6D6D6"
      }
    }
  }
};
var bodyTextStyle = {
  alignment: {
    vertical: "center"
  }
};
var bodyDecimalStyle = {
  numFmt: "#,##0.00"
};
var bodyCellStyle = {
  rowspan: bodyTextStyle,
  center: {
    alignment: _objectSpread({}, bodyTextStyle.alignment, {
      horizontal: "center"
    })
  },
  left: {
    alignment: _objectSpread({}, bodyTextStyle.alignment, {
      horizontal: "left"
    })
  },
  number: {
    numFmt: "#,##0"
  },
  decimal: bodyDecimalStyle,
  negativeDecimal: _objectSpread({}, bodyDecimalStyle, {
    font: {
      color: {
        rgb: "FF0000"
      }
    }
  }),
  percent: {
    numFmt: '#,##0.00%'
  }
};
var totalTextStyle = {
  font: {
    bold: true
  }
};

var totalDecimalStyle = _objectSpread({}, totalTextStyle, {
  numFmt: "#,##0.00"
});

var totalCellStyle = {
  "default": totalTextStyle,
  rowspan: _objectSpread({}, totalTextStyle, {
    alignment: {
      horizontal: "center",
      vertical: "center"
    }
  }),
  center: _objectSpread({}, totalTextStyle, {
    alignment: {
      vertical: "center",
      horizontal: "center"
    }
  }),
  number: _objectSpread({}, totalTextStyle, {
    numFmt: "#,##0"
  }),
  decimal: totalDecimalStyle,
  negativeDecimal: _objectSpread({}, totalDecimalStyle, {
    font: {
      bold: true,
      color: {
        rgb: "FF0000"
      }
    }
  })
};
var grandTotalTextStyle = {
  font: {
    bold: true
  },
  fill: {
    patternType: "solid",
    fgColor: {
      rgb: "B8C3C9"
    }
  },
  border: {
    left: {
      style: "thin",
      color: {
        rgb: "D6D6D6"
      }
    }
  }
};

var decimalGrandTotalStyle = _objectSpread({}, grandTotalTextStyle, {
  numFmt: "#,##0.00"
});

var grandTotalCellStyle = {
  "default": grandTotalTextStyle,
  rowspan: _objectSpread({}, grandTotalTextStyle, {
    alignment: {
      horizontal: "center",
      vertical: "center"
    }
  }),
  center: _objectSpread({}, grandTotalTextStyle, {
    alignment: {
      horizontal: "center"
    }
  }),
  number: _objectSpread({}, grandTotalTextStyle, {
    numFmt: "#,##0"
  }),
  decimal: decimalGrandTotalStyle,
  negativeDecimal: _objectSpread({}, decimalGrandTotalStyle, {
    font: {
      bold: true,
      color: {
        rgb: "FF0000"
      }
    }
  }),
  percent: _objectSpread({}, grandTotalTextStyle, {
    numFmt: "#,##0.00%"
  })
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

/***/ "./www/js/source/reactpages/lib/dataReducer.js":
/*!*****************************************************!*\
  !*** ./www/js/source/reactpages/lib/dataReducer.js ***!
  \*****************************************************/
/*! exports provided: updateObjectInArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateObjectInArray", function() { return updateObjectInArray; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updateObjectInArray = function updateObjectInArray(array, indexItem, updatedItem) {
  return array.map(function (item, index) {
    if (index !== indexItem) {
      return item;
    }

    return _objectSpread({}, item, {}, updatedItem);
  });
};

/***/ }),

/***/ "./www/js/source/reactpages/lib/excel.js":
/*!***********************************************!*\
  !*** ./www/js/source/reactpages/lib/excel.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Excel; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EXCEL_TYPE = "xlsx";
var MapExcelType = {
  "number": "n",
  "string": "s",
  "boolean": "b",
  "object": "d"
};
var _XLSX = null;

var Excel =
/*#__PURE__*/
function () {
  function Excel() {
    _classCallCheck(this, Excel);
  }

  _createClass(Excel, null, [{
    key: "process",
    value: function process(callback) {
      if (window.XLSX) {
        _XLSX = window.XLSX;
        callback && callback();
      } else {
        Promise.all(/*! import() | xlsx-style-sparta */[__webpack_require__.e("common"), __webpack_require__.e("xlsx-style-sparta")]).then(__webpack_require__.t.bind(null, /*! xlsx-style-sparta */ "./node_modules/xlsx-style-sparta/xlsx.js", 7)).then(function (XLSX) {
          _XLSX = XLSX;
          callback && callback();
        });
      }
    }
  }, {
    key: "export",
    value: function _export(worksheet, fileName) {
      var option = {
        bookType: EXCEL_TYPE,
        bookSST: false,
        type: 'binary'
      };
      var workbook = {
        SheetNames: [fileName],
        Sheets: {},
        Props: {}
      };
      workbook.Sheets[fileName] = worksheet;

      var workbookOutput = _XLSX.write(workbook, option);

      this.download(workbookOutput, fileName);
    }
  }, {
    key: "getCellType",
    value: function getCellType(value) {
      return MapExcelType[_typeof(value)];
    }
  }, {
    key: "getCellAddress",
    value: function getCellAddress(cellObject) {
      return _XLSX.utils.encode_cell(cellObject);
    }
  }, {
    key: "download",
    value: function download(workbookOut, fileName) {
      var blob = new Blob([this.sheetToArrayBuffer(workbookOut)], {
        type: "application/octet-stream"
      });
      this.downloadFromBolb(blob, fileName);
    }
  }, {
    key: "downloadFromBolb",
    value: function downloadFromBolb(blob, fileName) {
      var fileNameDownload = "".concat(fileName, ".").concat(EXCEL_TYPE); // IE 10+

      if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, fileNameDownload);
      } else {
        var element = window.document.createElement('a');
        element.href = window.URL.createObjectURL(blob);
        element.download = fileNameDownload;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }
  }, {
    key: "sheetToArrayBuffer",
    value: function sheetToArrayBuffer(s) {
      var buffer = new ArrayBuffer(s.length);
      var view = new Uint8Array(buffer);

      for (var i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }

      return buffer;
    }
  }]);

  return Excel;
}();



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
var encode = function encode(text) {
  var p = document.createElement("p");
  p.textContent = text;
  return p.innerHTML;
};
var decode = function decode(html) {
  var txt = document.createElement('textarea');
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

/***/ "./www/js/source/reactpages/lib/sweetAlert.js":
/*!****************************************************!*\
  !*** ./www/js/source/reactpages/lib/sweetAlert.js ***!
  \****************************************************/
/*! exports provided: predefinedIcons, defaultSubmitButton, defaultCancelButton, defaultOkButton, generateDefaultConfirmOption, generateDefaultAlertOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "predefinedIcons", function() { return predefinedIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultSubmitButton", function() { return defaultSubmitButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultCancelButton", function() { return defaultCancelButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOkButton", function() { return defaultOkButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateDefaultConfirmOption", function() { return generateDefaultConfirmOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateDefaultAlertOption", function() { return generateDefaultAlertOption; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var predefinedIcons = {
  error: 'error',
  warning: 'warning',
  success: 'success'
};
var defaultSubmitButton = {
  text: _langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Submit'),
  className: 'btn btn-apply'
};
var defaultCancelButton = {
  text: _langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Cancel'),
  className: 'btn'
};
var defaultOkButton = {
  text: _langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('OK'),
  className: 'btn btn-apply'
};
var generateDefaultConfirmOption = function generateDefaultConfirmOption(content, onClose, submitProps, cancelProps) {
  var icon = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : predefinedIcons.warning;
  var customOption = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  return _objectSpread({
    buttons: [_objectSpread({}, defaultSubmitButton, {}, submitProps), _objectSpread({}, defaultCancelButton, {}, cancelProps)],
    icon: icon,
    isShow: true,
    children: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "center-align"
    }, content),
    onClose: onClose
  }, customOption);
};
var generateDefaultAlertOption = function generateDefaultAlertOption(content, onClose, onClick) {
  var icon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : predefinedIcons.success;
  return {
    buttons: [{
      text: _langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('OK'),
      className: 'btn btn-apply',
      onClick: onClick || onClose
    }],
    icon: icon,
    isShow: true,
    children: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "center-align"
    }, content),
    onClose: onClose
  };
};

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
//# sourceMappingURL=playerlist.chunk.js.map