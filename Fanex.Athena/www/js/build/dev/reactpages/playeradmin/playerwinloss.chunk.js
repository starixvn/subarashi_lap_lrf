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
/******/ 		"www/js/build/dev/reactpages/playeradmin/playerwinloss": 0
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
/******/ 				var head = document.getElementsByTagName('head')[0];
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
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
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
/******/ 				head.appendChild(script);
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/index.jsx","common"]);
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

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/actions/index.js":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/actions/index.js ***!
  \************************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/actions/types.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/DataService */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _lib_reportExcel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/reportExcel */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/reportExcel.js");






var getData = function getData(param) {
  return function (dispatch) {
    var url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl('PlayerWinLoss/Index');
    dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(true));
    _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].postData(url, param).then(function (response) {
      dispatch(setGridData(response.data.Data));
      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(false));
    }).catch(function (error) {
      console.log(error.message);
      dispatch(setGridData([]));
      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(false));
    });
  };
};

var setGridData = function setGridData(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_GRID_DATA"],
    data: data
  };
};

var exportExcel = function exportExcel(data, hasCustomerComm, isAllowedBA, title) {
  return function () {
    var reportExcel = new _lib_reportExcel__WEBPACK_IMPORTED_MODULE_4__["default"](data, hasCustomerComm, isAllowedBA, title);
    reportExcel.export();
  };
};

var ActionCreators = Object.assign({}, {
  getData: getData,
  exportExcel: exportExcel
});

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/actions/types.js":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/actions/types.js ***!
  \************************************************************************************/
/*! exports provided: SET_GRID_DATA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_GRID_DATA", function() { return SET_GRID_DATA; });
var SET_GRID_DATA = 'PLAYER_WINLOSS/SET_GRID_DATA';

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/AppContainer.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/AppContainer.jsx ***!
  \***********************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/DataGrid.jsx");
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Title */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/Title.jsx");






var AppContainer = function AppContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_2__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isLoading: props.isLoading
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Title__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_4__["default"], null));
};

function mapStateToProps(state) {
  return Object.assign({}, {
    isLoading: state.isLoading
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/DataGrid.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/DataGrid.jsx ***!
  \*******************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/actions/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_gridHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/gridHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/gridHelper.js");
/* harmony import */ var _GridRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GridRow */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/GridRow.jsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var DataGrid = function DataGrid(props) {
  var requestParam = props.requestParam,
      gridData = props.gridData,
      getData = props.getData,
      hasCustomerComm = props.hasCustomerComm,
      isAllowedBA = props.isAllowedBA;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var param = _objectSpread({}, requestParam);

    getData(param);
  }, []);

  if (!gridData) {
    return null;
  }

  var renderBodyData = function renderBodyData() {
    var dataRows = [];

    for (var i = 0; i < gridData.length; i++) {
      var dataRow = gridData[i];
      var rowProps = {
        index: i + 1,
        dataRow: dataRow,
        hasCustomerComm: hasCustomerComm,
        isAllowedBA: isAllowedBA
      };
      dataRows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridRow__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
        key: i
      }, rowProps)));
    }

    return dataRows;
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Table"], {
    minWidth: 650,
    autoWidth: true,
    autoHeight: true,
    header: Object(_lib_gridHelper__WEBPACK_IMPORTED_MODULE_5__["buildHeader"])(hasCustomerComm, isAllowedBA),
    body: renderBodyData(),
    containerPadding: 30
  });
};

function mapDispatchToProps(dispatch) {
  var getData = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].getData;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    getData: getData
  }, dispatch);
}

function mapStateToProps(state) {
  var requestParam = state.requestParam,
      gridData = state.gridData,
      hasCustomerComm = state.hasCustomerComm,
      isAllowedBA = state.isAllowedBA;
  return Object.assign({}, {
    requestParam: requestParam,
    gridData: gridData,
    hasCustomerComm: hasCustomerComm,
    isAllowedBA: isAllowedBA
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/GridRow.jsx":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/GridRow.jsx ***!
  \******************************************************************************************/
/*! exports provided: GridRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridRow", function() { return GridRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");



var GridRow = function GridRow(props) {
  var dataRow = props.dataRow,
      index = props.index,
      hasCustomerComm = props.hasCustomerComm,
      isAllowedBA = props.isAllowedBA;

  var _ref = dataRow || {},
      Turnover = _ref.Turnover,
      TotalTransaction = _ref.TotalTransaction,
      WinLoss = _ref.WinLoss,
      Comm = _ref.Comm,
      Total = _ref.Total,
      BetEffective = _ref.BetEffective,
      LicenseeWL = _ref.LicenseeWL,
      BAComm = _ref.BAComm,
      AmtDueToBA = _ref.AmtDueToBA;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, index), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(Turnover)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].format(TotalTransaction)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(WinLoss)), hasCustomerComm && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(Comm)), hasCustomerComm && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(Total)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(BetEffective)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(LicenseeWL)), isAllowedBA && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(BAComm)), isAllowedBA && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(AmtDueToBA)));
};
/* harmony default export */ __webpack_exports__["default"] = (GridRow);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/Title.jsx":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/Title.jsx ***!
  \****************************************************************************************/
/*! exports provided: Title, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return Title; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/actions/index.js");
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");







var Title = function Title(props) {
  var handleExportExcel = function handleExportExcel() {
    var gridData = props.gridData,
        hasCustomerComm = props.hasCustomerComm,
        isAllowedBA = props.isAllowedBA,
        exportExcel = props.exportExcel;
    exportExcel(gridData, hasCustomerComm, isAllowedBA, _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].reportTitle);
  };

  var content = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "caret-block"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "icon-excel-wrapper",
    onClick: handleExportExcel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-excel",
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('ExportToExcel')
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].reportTitle));
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_4__["default"], {
    tag: "div",
    content: content
  });
};

function mapStateToProps(state) {
  var gridData = state.gridData,
      hasCustomerComm = state.hasCustomerComm,
      isAllowedBA = state.isAllowedBA;
  return Object.assign({}, {
    gridData: gridData,
    hasCustomerComm: hasCustomerComm,
    isAllowedBA: isAllowedBA
  });
}

;

function mapDispatchToProps(dispatch) {
  var exportExcel = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].exportExcel;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    exportExcel: exportExcel
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Title));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/index.jsx":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/index.jsx ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/reducers/index.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _AppContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AppContainer */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/components/AppContainer.jsx");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var defaultState = _objectSpread({}, window.initialState);

var store = _lib_store__WEBPACK_IMPORTED_MODULE_3__["default"].createStore(_reducers_index_js__WEBPACK_IMPORTED_MODULE_2__["default"], defaultState);

var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer__WEBPACK_IMPORTED_MODULE_5__["default"], null));
};

Object(react_dom__WEBPACK_IMPORTED_MODULE_4__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/constants.js":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/constants.js ***!
  \************************************************************************************/
/*! exports provided: headerText, winLossText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerText", function() { return headerText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "winLossText", function() { return winLossText; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");

var headerText = {
  Index: '#',
  Turnover: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Turnover'),
  TotalTransaction: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('TotalTransaction'),
  WinLoss: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('CustomerW_L'),
  Comm: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Comm'),
  Total: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Total'),
  BetEffective: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('EffectiveBettingValue'),
  LicenseeWL: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('LicenseeW_L'),
  BAComm: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('BACommission'),
  AmtDueToBA: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('AmtDueToBA'),
  CustomerWinLoss: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('CustomerW_L')
};
var winLossText = "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Win'), "/").concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Loss'));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/gridHelper.js":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/gridHelper.js ***!
  \*************************************************************************************/
/*! exports provided: buildHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildHeader", function() { return buildHeader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/utils.js");



var buildHeader = function buildHeader(hasCustomerComm, isAllowedBA) {
  var rowSpan = hasCustomerComm ? 2 : 1;
  var colSpan = hasCustomerComm ? 3 : 1;
  var headerText = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_2__["generateHeaderText"])(hasCustomerComm);
  var gridHeader = [react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
    key: "thead1",
    style: {
      height: 32
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    rowSpan: rowSpan,
    colWidth: 30
  }, headerText.Index), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    rowSpan: rowSpan,
    colWidth: 150
  }, headerText.Turnover), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    rowSpan: rowSpan,
    colWidth: 80
  }, headerText.TotalTransaction), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colSpan: colSpan
  }, headerText.CustomerWinLoss), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    rowSpan: rowSpan,
    colWidth: 80
  }, headerText.BetEffective), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    rowSpan: rowSpan,
    colWidth: 80
  }, headerText.LicenseeWL), isAllowedBA && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    rowSpan: rowSpan,
    colWidth: 80
  }, headerText.BAComm), isAllowedBA && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    rowSpan: rowSpan,
    colWidth: 80
  }, headerText.AmtDueToBA))];

  if (hasCustomerComm) {
    gridHeader.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
      key: "thead2",
      style: {
        height: 32
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      colWidth: 80
    }, headerText.WinLoss), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      colWidth: 80
    }, headerText.Comm), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      colWidth: 80
    }, headerText.Total)));
  }

  return gridHeader;
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/reportExcel.js":
/*!**************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/reportExcel.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReportExcel; });
/* harmony import */ var _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/excel */ "./www/js/source/reactpages/lib/excel.js");
/* harmony import */ var _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/constants/excelStyle */ "./www/js/source/reactpages/constants/excelStyle.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/utils.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var TITLE_ROW_INDEX = 0;
var HEADER_ROW_INDEX = 1;
var MAIN_SECTION_STYLE = 'mainSectionStyle';
var MERGING_CUSTWL_COLUMN_COUNT = 3;
var INDEX_CUSTWL_COLUMN = 3;
var fields = {
  Index: 'Index',
  Turnover: 'Turnover',
  TotalTransaction: 'TotalTransaction',
  WinLoss: 'WinLoss',
  Comm: 'Comm',
  Total: 'Total',
  BetEffective: 'BetEffective',
  LicenseeWL: 'LicenseeWL',
  BAComm: 'BAComm',
  AmtDueToBA: 'AmtDueToBA'
};

var ReportExcel =
/*#__PURE__*/
function () {
  function ReportExcel(data, hasCustomerComm, isAllowedBA, title) {
    _classCallCheck(this, ReportExcel);

    this.data = data;
    this.hasCustomerComm = hasCustomerComm;
    this.isAllowedBA = isAllowedBA;
    this.title = title;
    this.worksheet = {};
    this.currentRowIndex = hasCustomerComm ? 3 : 2;
    this.mergeConfig = [];
    this.columnConfigs = this._getcolumnConfigs(hasCustomerComm, isAllowedBA);
    this.headerText = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_2__["generateHeaderText"])(hasCustomerComm);
  }

  _createClass(ReportExcel, [{
    key: "export",
    value: function _export() {
      var _this = this;

      _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].process(function () {
        _this._createTitle();

        _this._createHeader();

        _this._createBodyData();

        _this._createExcelConfig();

        _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].export(_this.worksheet, "CustomerWinLoss");
      });
    }
  }, {
    key: "_createTitle",
    value: function _createTitle() {
      var address = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
        c: 0,
        r: TITLE_ROW_INDEX
      });
      this.worksheet[address] = {
        t: "s",
        v: this.title,
        s: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["titleCellStyle"]
      };
      this.mergeConfig.push({
        s: {
          r: TITLE_ROW_INDEX,
          c: 0
        },
        e: {
          r: TITLE_ROW_INDEX,
          c: this.columnConfigs.length - 1
        }
      });
    }
  }, {
    key: "_createHeader",
    value: function _createHeader() {
      var length = this.hasCustomerComm ? this.columnConfigs.length - MERGING_CUSTWL_COLUMN_COUNT + 1 : this.columnConfigs.length;

      for (var i = 0; i < length; i++) {
        if (this.hasCustomerComm) {
          this._buildHeaderWithGroupingColumn(i);
        } else {
          var fieldName = this.columnConfigs[i].field;
          var address = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
            c: i,
            r: HEADER_ROW_INDEX
          });
          this.worksheet[address] = {
            t: "s",
            v: this.headerText[fieldName],
            s: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["headerCellStyle"]
          };
        }
      }
    }
  }, {
    key: "_buildHeaderWithGroupingColumn",
    value: function _buildHeaderWithGroupingColumn(colIndex) {
      var dataColIndex = colIndex > INDEX_CUSTWL_COLUMN ? colIndex + MERGING_CUSTWL_COLUMN_COUNT - 1 : colIndex;
      var fieldName = this.columnConfigs[dataColIndex].field;
      var text = this.headerText[fieldName];

      if (fieldName === fields.WinLoss) {
        this._buildColSpanColumn(HEADER_ROW_INDEX, dataColIndex, MERGING_CUSTWL_COLUMN_COUNT, this.headerText.CustomerWinLoss);
      } else {
        var address = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
          c: dataColIndex,
          r: HEADER_ROW_INDEX
        });
        this.worksheet[address] = {
          t: "s",
          v: text,
          s: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["headerCellStyle"]
        };
        this.mergeConfig.push({
          s: {
            r: HEADER_ROW_INDEX,
            c: dataColIndex
          },
          e: {
            r: HEADER_ROW_INDEX + 1,
            c: dataColIndex
          }
        });
      }
    }
  }, {
    key: "_buildColSpanColumn",
    value: function _buildColSpanColumn(rowIndex, colIndex, colSpan, colSpanheaderText) {
      var colSpanCellAddress = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
        c: colIndex,
        r: rowIndex
      });
      this.worksheet[colSpanCellAddress] = {
        t: "s",
        v: colSpanheaderText,
        s: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["headerCellStyle"]
      };
      var totalColumn = colIndex + colSpan;
      this.mergeConfig.push({
        s: {
          r: rowIndex,
          c: colIndex
        },
        e: {
          r: rowIndex,
          c: totalColumn - 1
        }
      });

      for (var i = colIndex; i < totalColumn; i++) {
        var address = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
          c: i,
          r: rowIndex + 1
        });
        var fieldName = this.columnConfigs[i].field;
        this.worksheet[address] = {
          t: "s",
          v: this.headerText[fieldName] || '',
          s: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["headerCellStyle"]
        };
      }
    }
  }, {
    key: "_createBodyData",
    value: function _createBodyData() {
      for (var i = 0; i < this.data.length; i++) {
        var item = this.data[i];

        for (var j = 0; j < this.columnConfigs.length; j++) {
          var address = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
            c: j,
            r: this.currentRowIndex
          });
          this.worksheet[address] = this._buildDataRow(item, MAIN_SECTION_STYLE, i, j);
        }

        this.currentRowIndex++;
      }
    }
  }, {
    key: "_buildDataRow",
    value: function _buildDataRow(item, sectionStyleName, rowIndex, colIndex) {
      var columnConfig = this.columnConfigs[colIndex];
      var fieldName = columnConfig.field;
      var value = colIndex === 0 ? rowIndex + 1 : item[fieldName];
      return {
        t: _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellType(value),
        v: value,
        s: columnConfig[sectionStyleName]
      };
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
      this.worksheet["!merges"] = this.mergeConfig;
    }
  }, {
    key: "_getcolumnConfigs",
    value: function _getcolumnConfigs(hasCustomerComm, isAllowedBA) {
      var _ref, _ref2, _ref3, _ref4, _columnConfig$push3, _columnConfig$push4;

      var columnConfig = [(_ref = {
        field: fields.Index
      }, _defineProperty(_ref, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref, "width", 50), _ref), (_ref2 = {
        field: fields.Turnover
      }, _defineProperty(_ref2, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_ref2, "width", 150), _ref2), (_ref3 = {
        field: fields.TotalTransaction
      }, _defineProperty(_ref3, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_ref3, "width", 150), _ref3), (_ref4 = {
        field: fields.WinLoss
      }, _defineProperty(_ref4, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_ref4, "width", 150), _ref4)];

      if (hasCustomerComm) {
        var _columnConfig$push, _columnConfig$push2;

        columnConfig.push((_columnConfig$push = {
          field: fields.Comm
        }, _defineProperty(_columnConfig$push, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_columnConfig$push, "width", 120), _columnConfig$push), (_columnConfig$push2 = {
          field: fields.Total
        }, _defineProperty(_columnConfig$push2, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_columnConfig$push2, "width", 150), _columnConfig$push2));
      }

      columnConfig.push((_columnConfig$push3 = {
        field: fields.BetEffective
      }, _defineProperty(_columnConfig$push3, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_columnConfig$push3, "width", 150), _columnConfig$push3), (_columnConfig$push4 = {
        field: fields.LicenseeWL
      }, _defineProperty(_columnConfig$push4, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_columnConfig$push4, "width", 150), _columnConfig$push4));

      if (isAllowedBA) {
        var _columnConfig$push5, _columnConfig$push6;

        columnConfig.push((_columnConfig$push5 = {
          field: fields.BAComm
        }, _defineProperty(_columnConfig$push5, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_columnConfig$push5, "width", 120), _columnConfig$push5), (_columnConfig$push6 = {
          field: fields.AmtDueToBA
        }, _defineProperty(_columnConfig$push6, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_columnConfig$push6, "width", 120), _columnConfig$push6));
      }

      return columnConfig;
    }
  }]);

  return ReportExcel;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/utils.js":
/*!********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/utils.js ***!
  \********************************************************************************/
/*! exports provided: generateHeaderText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateHeaderText", function() { return generateHeaderText; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/lib/constants.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var generateHeaderText = function generateHeaderText(hasCustomerComm) {
  var winLossColumn = hasCustomerComm ? _constants__WEBPACK_IMPORTED_MODULE_0__["winLossText"] : _constants__WEBPACK_IMPORTED_MODULE_0__["headerText"].CustomerWinLoss;
  return _objectSpread({}, _constants__WEBPACK_IMPORTED_MODULE_0__["headerText"], {
    WinLoss: winLossColumn
  });
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/reducers/index.js":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/reducers/index.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerwinloss/actions/types.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }





var gridData = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])([], _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_2__["SET_GRID_DATA"], function (preState, action) {
  return _toConsumableArray(action.data);
}));
var requestParam = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {});
var hasCustomerComm = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, {});
var isAllowedBA = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, {});
/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_1__["combineReducers"])(Object.assign({}, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_3__, {
  gridData: gridData,
  requestParam: requestParam,
  hasCustomerComm: hasCustomerComm,
  isAllowedBA: isAllowedBA
})));

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
/*! exports provided: FETCH_DATA, SET_GRID_DATA, SET_SELECTED_PRODUCT, SET_SELECTED_BASECURRENCY, SET_BASECURRENCY_LIST, SET_SELECTED_CURRENCY, TOGGLE_LOADER, CHANGE_IS_EXCLUDE_TEST, USER_GUIDE_CONTENT, SET_DATE_RANGE, GET_DATE_CONSTRAINT, CHANGE_IS_CONVERT_ALL, SET_SELECTED_STATUS, SET_SELECTED_PLATFORM, SET_SELECTED_LIVESTATUS, SET_USERNAME, SET_REQUEST_PARAM, SET_REPORT_TITLE */
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
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
  default: totalTextStyle,
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
  default: grandTotalTextStyle,
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
//# sourceMappingURL=playerwinloss.chunk.js.map