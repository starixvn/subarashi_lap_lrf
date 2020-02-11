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
/******/ 		"www/js/build/dev/reactpages/playeradmin/betlimit": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/index.jsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/alertAction.js":
/*!*************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/alertAction.js ***!
  \*************************************************************************************/
/*! exports provided: setAlertOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAlertOption", function() { return setAlertOption; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/types.js");

var setAlertOption = function setAlertOption(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_ALERT_OPTION"],
    data: data
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/index.js":
/*!*******************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/index.js ***!
  \*******************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/requestParamAction */ "./www/js/source/reactpages/actions/requestParamAction.js");
/* harmony import */ var _alertAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alertAction */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/alertAction.js");



var ActionCreators = Object.assign({}, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_1__, _alertAction__WEBPACK_IMPORTED_MODULE_2__);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/types.js":
/*!*******************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/types.js ***!
  \*******************************************************************************/
/*! exports provided: SET_ALERT_OPTION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ALERT_OPTION", function() { return SET_ALERT_OPTION; });
var SET_ALERT_OPTION = "SET_ALERT_OPTION";

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/AppContainer.jsx":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/AppContainer.jsx ***!
  \******************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/FormFilter.jsx");
/* harmony import */ var _DataContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataContent */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/DataContent.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _jsroot_components_sweet_alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/sweet-alert */ "./www/js/source/reactpages/components/sweet-alert/index.jsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }








var AppContainer = function AppContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_2__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isLoading: props.isLoading
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataContent__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_sweet_alert__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
    width: 450,
    isHtml: false
  }, props.alertOption)));
};

function mapStateToProps(state) {
  var isLoading = state.isLoading,
      alertOption = state.alertOption;
  return Object.assign({}, {
    isLoading: isLoading,
    alertOption: alertOption
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AppContainer)));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/DataContent.jsx":
/*!*****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/DataContent.jsx ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/constants.js");
/* harmony import */ var _grid_data_contents_SportDataContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grid/data-contents/SportDataContent */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/SportDataContent.jsx");
/* harmony import */ var _grid_data_contents_GameDataContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./grid/data-contents/GameDataContent */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/GameDataContent.jsx");
/* harmony import */ var _grid_data_contents_NGDataContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./grid/data-contents/NGDataContent */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/NGDataContent.jsx");
/* harmony import */ var _grid_data_contents_AGCDataContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./grid/data-contents/AGCDataContent */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/AGCDataContent.jsx");
var _Setting;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Setting = (_Setting = {}, _defineProperty(_Setting, _lib_constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].SB, _grid_data_contents_SportDataContent__WEBPACK_IMPORTED_MODULE_3__["default"]), _defineProperty(_Setting, _lib_constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].VS, _grid_data_contents_SportDataContent__WEBPACK_IMPORTED_MODULE_3__["default"]), _defineProperty(_Setting, _lib_constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].VS2, _grid_data_contents_SportDataContent__WEBPACK_IMPORTED_MODULE_3__["default"]), _defineProperty(_Setting, _lib_constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].LT, _grid_data_contents_GameDataContent__WEBPACK_IMPORTED_MODULE_4__["default"]), _defineProperty(_Setting, _lib_constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].NG, _grid_data_contents_NGDataContent__WEBPACK_IMPORTED_MODULE_5__["default"]), _defineProperty(_Setting, _lib_constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].KN, _grid_data_contents_GameDataContent__WEBPACK_IMPORTED_MODULE_4__["default"]), _defineProperty(_Setting, _lib_constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].AGC, _grid_data_contents_AGCDataContent__WEBPACK_IMPORTED_MODULE_6__["default"]), _Setting);

var DataContent = function DataContent(props) {
  var ProductId = props.requestParam.ProductId;
  var Content = Setting[ProductId];
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Content, null);
};

function mapStateToProps(state) {
  var requestParam = state.requestParam;
  return Object.assign({}, {
    requestParam: requestParam
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(DataContent));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/FormFilter.jsx":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/FormFilter.jsx ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var FormFilter = function FormFilter(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(props.requestParam.ProductId),
      _useState2 = _slicedToArray(_useState, 2),
      productId = _useState2[0],
      setProductId = _useState2[1];

  var productList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].productList;

  var onProductChange = function onProductChange(item) {
    setProductId(item.value);

    if (item.value !== props.requestParam.ProductId) {
      var param = Object.assign({}, props.requestParam, {
        ProductId: item.value
      });
      props.setRequestParam(param);
    }
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-filter"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-4 col-sm-12 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Product')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_6__["default"], {
    instanceId: "ddlProduct",
    value: productId,
    options: productList,
    onChange: onProductChange
  })))));
};

function mapDispatchToProps(dispatch) {
  var setRequestParam = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setRequestParam;
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    setRequestParam: setRequestParam
  }, dispatch);
}

function mapStateToProps(state) {
  var requestParam = state.requestParam;
  return Object.assign({}, {
    requestParam: requestParam
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(FormFilter)));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/base/SettingContent.jsx":
/*!******************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/base/SettingContent.jsx ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../actions/index */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _lib_dataTransfer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../lib/dataTransfer */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/dataTransfer.js");
/* harmony import */ var _lib_utility__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../lib/utility */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/utility.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _jsroot_components_Balloon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/Balloon */ "./www/js/source/reactpages/components/Balloon.jsx");
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












var SettingContent = function SettingContent(Grid, DataHandling) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(_temp, _PureComponent);

    function _temp(props) {
      var _this;

      _classCallCheck(this, _temp);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_temp).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "_unRegisterEvents", function () {
        document.removeEventListener('click', _this._handleClickOutSide);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleClickOutSide", function (event) {
        if (_this.state.showError) {
          var isError = _this.errorRef.current && _this.errorRef.current.contains(event.target);

          var isCheckBox = _this.checkBoxRef.current && _this.checkBoxRef.current.contains(event.target);

          var isButton = _this.submitButtonRef.current && _this.submitButtonRef.current.contains(event.target);

          var clickOutside = !isError && !isCheckBox && !isButton;

          if (clickOutside) {
            _this._closeError();
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "setInputRef", function (type, id, element) {
        _this.ref[type] = _this.ref[type] || {};
        _this.ref[type][id] = element;
      });

      _defineProperty(_assertThisInitialized(_this), "onReset", function () {
        if (!_this.state.disabledButton) {
          _this.setState({
            isCopy: false
          }, function () {
            return _this._getData(_this.props.requestParam);
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onChange", function (data) {
        _this.setState({
          data: data
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onSubmit", function () {
        if (!_this.state.showError) {
          var data = _this.state.data;
          var submitData = DataHandling.getSubmitData(data);

          if (!submitData.IsValid) {
            _this._showError(submitData.Data);
          } else {
            _this._showConfirmation(function () {
              return _this._submit(submitData.Data);
            });
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onCheck", function (checked) {
        if (checked) {
          var _this$state = _this.state,
              setting = _this$state.setting,
              errorBalloon = _this$state.errorBalloon,
              showError = _this$state.showError;

          if (showError && errorBalloon.Id === setting.CopyId) {
            return false;
          }

          var data = _this.state.data;
          var copyRow = data.find(function (e) {
            return e.Id === setting.CopyId;
          });
          var copyValue = DataHandling.getSubmitRowData(copyRow);
          var invalidData = DataHandling.validate(copyValue, copyRow);

          if (invalidData !== null) {
            _this._showError(invalidData);
          } else {
            var newData = data.map(function (e) {
              if (e.Id === copyRow.id) {
                return e;
              }

              return Object.assign({}, e, {
                MinBet: copyRow.MinBet,
                MaxBet: copyRow.MaxBet,
                MaxPerMatch: copyRow.MaxPerMatch
              });
            });

            _this.setState({
              isCopy: true,
              data: newData
            });
          }
        } else {
          _this.setState({
            isCopy: false
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onCloseAlert", function () {
        _this.setState({
          disabledButton: false
        }, function () {
          return _this.props.setAlertOption({
            isShow: false
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onRefresh", function () {
        _this._getData(_this.props.requestParam);
      });

      _this.state = {
        data: null,
        setting: {
          Editable: false,
          EnableCopy: false,
          CopyId: 0
        },
        disabledButton: false,
        isCopy: false,
        showError: false,
        errorBalloon: {
          msg: '',
          targetTop: 0,
          targetLeft: 0
        }
      };
      _this.ref = {};
      _this.checkBoxRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
      _this.errorRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
      _this.submitButtonRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
      _this.getHeaderName = DataHandling.getHeaderName;
      return _this;
    }

    _createClass(_temp, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevState.timeStamp !== this.state.timeStamp) {
          this.props.toggleLoader(false);
          this.props.setAlertOption({
            isShow: false
          });
        }

        if (prevProps.requestParam !== this.props.requestParam) {
          this._getData(this.props.requestParam);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this._unRegisterEvents();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this._getData(this.props.requestParam);

        this._registerEvents();
      }
    }, {
      key: "_registerEvents",
      value: function _registerEvents() {
        document.addEventListener('click', this._handleClickOutSide);
      }
    }, {
      key: "_closeError",
      value: function _closeError() {
        this.setState({
          showError: false
        });
      }
    }, {
      key: "_submit",
      value: function _submit(data) {
        this.props.toggleLoader(true);
        var param = Object.assign({}, this.props.requestParam, {
          Setting: data
        });
        _lib_dataTransfer__WEBPACK_IMPORTED_MODULE_6__["default"].updateData(param, this._showSubmitResult.bind(this));
      }
    }, {
      key: "_showConfirmation",
      value: function _showConfirmation(onOK) {
        var _this2 = this;

        var buttons = [{
          text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('OK'),
          onClick: onOK,
          className: 'btn btn-apply'
        }, {
          text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Cancel'),
          onClick: this.onCloseAlert,
          className: 'btn btn-cancel'
        }];
        var msg = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: "center-align"
        }, _lib_utility__WEBPACK_IMPORTED_MODULE_7__["default"].getConfirmationMsg(this.props.requestParam.ProductId));
        this.setState({
          disabledButton: true
        }, function () {
          return _this2.props.setAlertOption({
            isShow: true,
            title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Confirmation'),
            children: msg,
            buttons: buttons,
            icon: '',
            onClose: _this2.onCloseAlert,
            height: 130
          });
        });
      }
    }, {
      key: "_showSubmitResult",
      value: function _showSubmitResult(title, msg, isSuccess) {
        var _this3 = this;

        var content = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: "center-align"
        }, msg);
        var buttons = [{
          text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('OK'),
          onClick: this.onRefresh,
          className: 'btn btn-apply btn-alone'
        }];
        this.setState({
          disabledButton: true
        }, function () {
          _this3.props.setAlertOption({
            isShow: true,
            title: title,
            children: content,
            onClose: _this3.onRefresh,
            icon: isSuccess ? 'success' : 'error',
            height: 225,
            buttons: buttons
          });

          _this3.props.toggleLoader(false);
        });
      }
    }, {
      key: "_showError",
      value: function _showError(invalidData) {
        var invalidInput = this.ref[invalidData.Type][invalidData.Id];

        if (invalidInput) {
          var pos = invalidInput.getBoundingClientRect();
          this.setState({
            showError: true,
            errorBalloon: {
              Id: invalidData.Id,
              msg: invalidData.Message,
              targetTop: pos.top,
              targetLeft: pos.left + pos.width / 2
            }
          }, function () {
            return invalidInput.focus();
          });
        }
      }
    }, {
      key: "_refreshState",
      value: function _refreshState(data, setting) {
        this.setState(function (state) {
          return {
            data: DataHandling.getViewData(data),
            setting: Object.assign({}, state.setting, setting),
            disabledButton: false,
            isCopy: false,
            showError: false,
            timeStamp: new Date().getTime()
          };
        });
      }
    }, {
      key: "_getData",
      value: function _getData(param) {
        this.props.toggleLoader(true);
        _lib_dataTransfer__WEBPACK_IMPORTED_MODULE_6__["default"].getData(param, this._refreshState.bind(this));
      }
    }, {
      key: "render",
      value: function render() {
        var data = this.state.data;

        if (!data || !data.length) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_5__["default"], null);
        }

        var _this$state2 = this.state,
            setting = _this$state2.setting,
            disabledButton = _this$state2.disabledButton,
            showError = _this$state2.showError,
            errorBalloon = _this$state2.errorBalloon,
            isCopy = _this$state2.isCopy;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "pa-betlimit"
        }, setting.EnableCopy && setting.Editable && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_8__["default"], {
          id: "IsCopy",
          checked: isCopy,
          onChange: this.onCheck,
          ref: this.checkBoxRef,
          label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("CopyBetSettingFromSoccer")
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Grid, {
          data: data,
          setting: setting,
          setInputRef: this.setInputRef,
          onChange: this.onChange,
          isCopy: isCopy,
          getHeaderName: this.getHeaderName
        }), setting.Editable && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "pa-betlimit-button"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          type: "button",
          className: "btn btn-cancel",
          disabled: disabledButton,
          onClick: this.onReset
        }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Reset')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          type: "button",
          className: "btn btn-apply",
          disabled: disabledButton,
          onClick: this.onSubmit,
          ref: this.submitButtonRef
        }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Submit'))), setting.Editable && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Balloon__WEBPACK_IMPORTED_MODULE_9__["default"], _extends({
          width: 140,
          isOpen: showError,
          ref: this.errorRef
        }, errorBalloon)));
      }
    }]);

    return _temp;
  }(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]), _temp;
};

function mapDispatchToProps(dispatch) {
  var toggleLoader = _actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].toggleLoader,
      setAlertOption = _actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setAlertOption;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    toggleLoader: toggleLoader,
    setAlertOption: setAlertOption
  }, dispatch);
}

function mapStateToProps(state) {
  var requestParam = state.requestParam;
  return Object.assign({}, {
    requestParam: requestParam
  });
}

;
var createSetting = Object(redux__WEBPACK_IMPORTED_MODULE_2__["compose"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps), SettingContent);
/* harmony default export */ __webpack_exports__["default"] = (createSetting);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/base/SettingGrid.jsx":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/base/SettingGrid.jsx ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/utility */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/utility.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var SettingGrid = function SettingGrid(props) {
  var setting = props.setting,
      data = props.data,
      onChange = props.onChange,
      getHeaderName = props.getHeaderName;
  var setInputRef = props.setInputRef;

  var onInputChange = function onInputChange(type, id, value) {
    var newData = data.map(function (e) {
      if (e.Id === id) {
        var newItem = _objectSpread({}, e);

        newItem[type] = value;
        return newItem;
      }

      return e;
    });
    onChange(newData);
  };

  var onInputBlur = function onInputBlur(type, id, value) {
    var newValue = _lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(_lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].getValueAsNumber(value));

    if (newValue !== value) {
      var newData = data.map(function (e) {
        if (e.Id === id) {
          var newItem = _objectSpread({}, e);

          newItem[type] = newValue;
          return newItem;
        }

        return e;
      });
      onChange(newData);
    }
  };

  var buildCell = function buildCell(type, value, disabled) {
    var isChanged = value[type] !== value['Original' + type];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: isChanged ? _lib_constants__WEBPACK_IMPORTED_MODULE_2__["InputClassName"].OnChangedClassName : _lib_constants__WEBPACK_IMPORTED_MODULE_2__["InputClassName"].ClassName,
      type: "text",
      ref: function ref(e) {
        return setInputRef(type, value.Id, e);
      },
      autoComplete: "off",
      maxLength: "14",
      value: value[type],
      onChange: function onChange(e) {
        return onInputChange(type, value.Id, e.target.value);
      },
      onBlur: function onBlur(e) {
        return onInputBlur(type, value.Id, e.target.value);
      },
      disabled: disabled
    });
  };

  var buildBody = function buildBody(editable, data) {
    var rows = [];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var disabled = !editable;
      rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: item.Id
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.BetSettingType), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "pa-betlimit-cell"
      }, buildCell(_lib_constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitType"].MinBet, item, disabled), item.BetValueMin > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, " >= ".concat(_lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(item.BetValueMin)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "pa-betlimit-cell"
      }, buildCell(_lib_constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitType"].MaxBet, item, disabled), item.BetValueMax > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, " <= ".concat(_lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(item.BetValueMax)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "pa-betlimit-cell"
      }, buildCell(_lib_constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitType"].MaxPerMatch, item, disabled), item.MaxPerMatchMax > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, " <= ".concat(_lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(item.MaxPerMatchMax))))));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, rows);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pa-betlimit-grid"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, getHeaderName('Sport')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, getHeaderName('MinBet')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, getHeaderName('MaxBet')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, getHeaderName('MaxPerMatch')))), buildBody(setting.Editable, data)));
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(SettingGrid));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/AGCDataContent.jsx":
/*!***************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/AGCDataContent.jsx ***!
  \***************************************************************************************************************/
/*! exports provided: AGCDataContent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AGCDataContent", function() { return AGCDataContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../actions/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_utility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/utility */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/utility.js");
/* harmony import */ var _lib_dataTransfer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../lib/dataTransfer */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/dataTransfer.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var _sport_settings_AGCSettingGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../sport-settings/AGCSettingGrid */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/sport-settings/AGCSettingGrid.jsx");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
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











var AGCDataContent =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AGCDataContent, _PureComponent);

  function AGCDataContent(props) {
    var _this;

    _classCallCheck(this, AGCDataContent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AGCDataContent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onGroupChange", function (item) {
      if (_this.state.selectedGroup !== item.value) {
        var data = _this.state.data;

        var disabledButton = _this._isDisabledButton(data, item.value);

        _this.setState({
          selectedGroup: item.value,
          disabledButton: disabledButton
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onReset", function () {
      _this._getData(_this.props.requestParam);
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function () {
      var _this$state = _this.state,
          selectedGroup = _this$state.selectedGroup,
          data = _this$state.data,
          setting = _this$state.setting;

      var invalid = _this._isDisabledButton(data, selectedGroup);

      if (invalid) {
        _this.setState({
          disabledButton: true
        });
      } else {
        _this._showConfirmation(function () {
          return _this._submit(selectedGroup, setting.BetSetting.AgGroup);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCloseAlert", function () {
      _this.setState({
        disabledButton: false
      }, function () {
        return _this.props.setAlertOption({
          isShow: false
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRefresh", function () {
      _this._getData(_this.props.requestParam);
    });

    _this.state = {
      data: null,
      setting: {},
      groups: [],
      selectedGroup: '',
      disabledButton: false
    };
    return _this;
  }

  _createClass(AGCDataContent, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.data !== this.state.data) {
        this.props.toggleLoader(false);
        this.props.setAlertOption({
          isShow: false
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._getData(this.props.requestParam);
    }
  }, {
    key: "_isDisabledButton",
    value: function _isDisabledButton(data, selectedGroup) {
      if (!selectedGroup) {
        return true;
      }

      var gamesHaveGroup = data.filter(function (x) {
        return x.Groups.find(function (g) {
          return g.GroupType === selectedGroup;
        });
      });
      return !gamesHaveGroup || gamesHaveGroup.length !== data.length;
    }
  }, {
    key: "_updateState",
    value: function _updateState(data, setting) {
      if (setting.BetSetting) {
        var groups = setting.BetSetting ? setting.BetSetting.CheckedGroups.map(function (x) {
          return {
            value: x,
            label: x
          };
        }) : [];

        var disabledButton = this._isDisabledButton(data, setting.BetSetting.AgGroup);

        this.setState({
          data: data,
          setting: setting,
          groups: groups,
          selectedGroup: setting.BetSetting.AgGroup,
          disabledButton: disabledButton
        });
      }
    }
  }, {
    key: "_getData",
    value: function _getData(param) {
      this.props.toggleLoader(true);
      _lib_dataTransfer__WEBPACK_IMPORTED_MODULE_6__["default"].getData(param, this._updateState.bind(this));
    }
  }, {
    key: "_submit",
    value: function _submit(group, oldGroup) {
      this.props.toggleLoader(true);
      var param = Object.assign({}, this.props.requestParam, {
        Setting: {
          group: group,
          oldGroup: oldGroup
        }
      });
      _lib_dataTransfer__WEBPACK_IMPORTED_MODULE_6__["default"].updateData(param, this._showSubmitResult.bind(this));
    }
  }, {
    key: "_showConfirmation",
    value: function _showConfirmation(onOK) {
      var _this2 = this;

      var onClose = function onClose() {
        return _this2.onCloseAlert(false);
      };

      var buttons = [{
        text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('OK'),
        onClick: onOK,
        className: 'btn btn-apply'
      }, {
        text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Cancel'),
        onClick: onClose,
        className: 'btn btn-cancel'
      }];
      var msg = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "center-align"
      }, _lib_utility__WEBPACK_IMPORTED_MODULE_5__["default"].getConfirmationMsg(this.props.requestParam.ProductId));
      this.setState({
        disabledButton: true
      }, function () {
        return _this2.props.setAlertOption({
          isShow: true,
          title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Confirmation'),
          children: msg,
          buttons: buttons,
          icon: '',
          onClose: onClose,
          height: 130
        });
      });
    }
  }, {
    key: "_showSubmitResult",
    value: function _showSubmitResult(title, msg, isSuccess) {
      var _this3 = this;

      var content = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "center-align"
      }, msg);
      var buttons = [{
        text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('OK'),
        onClick: this.onRefresh,
        className: 'btn btn-apply btn-alone'
      }];
      this.setState({
        disabledButton: true
      }, function () {
        _this3.props.setAlertOption({
          isShow: true,
          title: title,
          children: content,
          onClose: _this3.onRefresh,
          icon: isSuccess ? 'success' : 'error',
          height: 225,
          buttons: buttons
        });

        _this3.props.toggleLoader(false);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          data = _this$state2.data,
          setting = _this$state2.setting;

      if (setting.BetSetting && !setting.BetSetting.IsLineEnabled) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_9__["default"], {
          title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('AGCasinoNotOfferCurrency')
        });
      }

      if (data === null) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_9__["default"], null);
      }

      var _this$state3 = this.state,
          groups = _this$state3.groups,
          selectedGroup = _this$state3.selectedGroup,
          disabledButton = _this$state3.disabledButton;
      var hasData = data.length > 0;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pa-betlimit"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pa-betlimit-group row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 col-md-4 col-sm-12 col-lg-3 col-xl-2"
      }, setting.BetSetting.IsEnabled && hasData ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('BetSettingGroups')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_7__["default"], {
        instanceId: "ddlGroup",
        value: selectedGroup,
        options: groups,
        onChange: this.onGroupChange
      })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('BetSettingGroups'), " :"), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "disabled-text"
      }, setting.BetSetting.AgGroup)))), hasData ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sport_settings_AGCSettingGrid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        data: data,
        isEnabled: setting.BetSetting.IsEnabled,
        group: selectedGroup
      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_9__["default"], {
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('ProblemDisplayBetSetting')
      }), setting.Editable && hasData && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pa-betlimit-button"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "btn btn-cancel",
        disabled: disabledButton,
        onClick: this.onReset
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Reset')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "btn btn-apply",
        disabled: disabledButton,
        onClick: this.onSubmit
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Submit'))));
    }
  }]);

  return AGCDataContent;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapDispatchToProps(dispatch) {
  var toggleLoader = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].toggleLoader,
      setAlertOption = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setAlertOption;
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    toggleLoader: toggleLoader,
    setAlertOption: setAlertOption
  }, dispatch);
}

function mapStateToProps(state) {
  var requestParam = state.requestParam;
  return Object.assign({}, {
    requestParam: requestParam
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AGCDataContent));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/GameDataContent.jsx":
/*!****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/GameDataContent.jsx ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gameSettingDataHandling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gameSettingDataHandling */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/gameSettingDataHandling.js");
/* harmony import */ var _base_SettingContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/SettingContent */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/base/SettingContent.jsx");
/* harmony import */ var _base_SettingGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/SettingGrid */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/base/SettingGrid.jsx");




var Content = Object(_base_SettingContent__WEBPACK_IMPORTED_MODULE_2__["default"])(_base_SettingGrid__WEBPACK_IMPORTED_MODULE_3__["default"], new _lib_gameSettingDataHandling__WEBPACK_IMPORTED_MODULE_1__["default"]());

var GameDataContent = function GameDataContent() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Content, null);
};

/* harmony default export */ __webpack_exports__["default"] = (GameDataContent);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/NGDataContent.jsx":
/*!**************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/NGDataContent.jsx ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_ngDataHandling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/ngDataHandling */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/ngDataHandling.js");
/* harmony import */ var _base_SettingContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/SettingContent */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/base/SettingContent.jsx");
/* harmony import */ var _sport_settings_NGSettingGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sport-settings/NGSettingGrid */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/sport-settings/NGSettingGrid.jsx");




var Content = Object(_base_SettingContent__WEBPACK_IMPORTED_MODULE_2__["default"])(_sport_settings_NGSettingGrid__WEBPACK_IMPORTED_MODULE_3__["default"], new _lib_ngDataHandling__WEBPACK_IMPORTED_MODULE_1__["default"]());

var NGDataContent = function NGDataContent() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Content, null);
};

/* harmony default export */ __webpack_exports__["default"] = (NGDataContent);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/SportDataContent.jsx":
/*!*****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/data-contents/SportDataContent.jsx ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_dataHandling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/dataHandling */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/dataHandling.js");
/* harmony import */ var _base_SettingContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/SettingContent */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/base/SettingContent.jsx");
/* harmony import */ var _base_SettingGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/SettingGrid */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/base/SettingGrid.jsx");




var Content = Object(_base_SettingContent__WEBPACK_IMPORTED_MODULE_2__["default"])(_base_SettingGrid__WEBPACK_IMPORTED_MODULE_3__["default"], new _lib_dataHandling__WEBPACK_IMPORTED_MODULE_1__["default"]());

var SportDataContent = function SportDataContent() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Content, null);
};

/* harmony default export */ __webpack_exports__["default"] = (SportDataContent);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/sport-settings/AGCSettingGrid.jsx":
/*!****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/sport-settings/AGCSettingGrid.jsx ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/utility */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/utility.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");




var AGCSettingGrid = function AGCSettingGrid(props) {
  var data = props.data,
      isEnabled = props.isEnabled,
      group = props.group;

  var buildBody = function buildBody() {
    var rows = [];

    for (var i = 0; i < data.length; i++) {
      var game = data[i];
      var gameGroup = game.Groups.find(function (x) {
        return x.GroupType === group;
      });
      rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: game.GameType
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, game.Name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: isEnabled ? '' : 'disabled-text'
      }, gameGroup ? _lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(gameGroup.Min) : ''), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: isEnabled ? '' : 'disabled-text'
      }, gameGroup ? _lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(gameGroup.Max) : '')));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, rows);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pa-betlimit-grid"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('GameType')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('MinBet')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('MaxBet')))), buildBody()));
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AGCSettingGrid));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/sport-settings/NGSettingGrid.jsx":
/*!***************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/grid/sport-settings/NGSettingGrid.jsx ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/utility */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/utility.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var NGSettingGrid = function NGSettingGrid(props) {
  var setting = props.setting,
      data = props.data,
      onChange = props.onChange;
  var setInputRef = props.setInputRef;

  var onInputChange = function onInputChange(type, id, value) {
    var newData = data.map(function (e) {
      if (e.Id === id) {
        var newItem = _objectSpread({}, e);

        newItem[type] = value;
        return newItem;
      }

      return e;
    });
    onChange(newData);
  };

  var onInputBlur = function onInputBlur(type, id, value) {
    var newValue = _lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(_lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].getValueAsNumber(value));

    if (newValue !== value) {
      var newData = data.map(function (e) {
        if (e.Id === id) {
          var newItem = _objectSpread({}, e);

          newItem[type] = newValue;
          return newItem;
        }

        return e;
      });
      onChange(newData);
    }
  };

  var buildCell = function buildCell(type, value, disabled) {
    var isChanged = value[type] !== value['Original' + type];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: isChanged ? _lib_constants__WEBPACK_IMPORTED_MODULE_3__["InputClassName"].OnChangedClassName : _lib_constants__WEBPACK_IMPORTED_MODULE_3__["InputClassName"].ClassName,
      type: "text",
      ref: function ref(e) {
        return setInputRef(type, value.Id, e);
      },
      autoComplete: "off",
      maxLength: "14",
      value: value[type],
      onChange: function onChange(e) {
        return onInputChange(type, value.Id, e.target.value);
      },
      onBlur: function onBlur(e) {
        return onInputBlur(type, value.Id, e.target.value);
      },
      disabled: disabled
    });
  };

  var buildBody = function buildBody(editable, data) {
    var rows = [];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var disabled = !editable;
      rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: item.Id
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.BetSettingType), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "pa-betlimit-cell"
      }, buildCell(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitType"].MinBet, item, disabled), item.BetValueMin > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, " >= ".concat(_lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(item.BetValueMin)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "pa-betlimit-cell"
      }, buildCell(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitType"].MaxBet, item, disabled), item.BetValueMax > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, " <= ".concat(_lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(item.BetValueMax)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "pa-betlimit-cell"
      }, buildCell(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitType"].MaxPerMatch, item, disabled), item.MaxPerMatchMax > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, " <= ".concat(_lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(item.MaxPerMatchMax)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "pa-betlimit-cell"
      }, buildCell(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitType"].MaxPerBall, item, disabled), item.MaxPerBallMax > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, " <= ".concat(_lib_utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(item.MaxPerBallMax))))));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, rows);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pa-betlimit-grid"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('Sport')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('MinBet')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('MaxBet')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('MaxPerMatch')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('MaxPerBall')))), buildBody(setting.Editable, data)));
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(NGSettingGrid));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/index.jsx":
/*!***********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/index.jsx ***!
  \***********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/reducers/index.js");
/* harmony import */ var _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/store */ "./www/js/source/reactpages/lib/store.js");






var defaultState = Object.assign({}, window.initialState, {
  isLoading: false
});
var store = _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers_index_js__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);
var App = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
});
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/constants.js":
/*!*******************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/constants.js ***!
  \*******************************************************************************/
/*! exports provided: BetLimitProduct, BetLimitType, InputClassName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BetLimitProduct", function() { return BetLimitProduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BetLimitType", function() { return BetLimitType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputClassName", function() { return InputClassName; });
var BetLimitProduct = {
  SB: 0,
  VS: 5,
  VS2: 27,
  LT: 28,
  NG: 2,
  KN: 8,
  AGC: 10
};
var BetLimitType = {
  MinBet: 'MinBet',
  MaxBet: 'MaxBet',
  MaxPerMatch: 'MaxPerMatch',
  MaxPerBall: 'MaxPerBall'
};
var InputClassName = {
  ClassName: 'input-text right-align',
  OnChangedClassName: 'input-text right-align input-changed'
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/dataHandling.js":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/dataHandling.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataHandling; });
/* harmony import */ var _validatation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validatation */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/validatation.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/utility.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var DataHandling =
/*#__PURE__*/
function () {
  function DataHandling() {
    _classCallCheck(this, DataHandling);
  }

  _createClass(DataHandling, [{
    key: "getViewData",
    value: function getViewData(rawData) {
      var _this = this;

      return rawData.map(function (rawRow) {
        return _this.getViewRowData(rawRow);
      });
    }
  }, {
    key: "getViewRowData",
    value: function getViewRowData(rawData) {
      var row = {
        Id: rawData.Id,
        BetType: rawData.BetType,
        BetSettingType: rawData.BetSettingType,
        MinBet: _utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(rawData.MinBet),
        MaxBet: _utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(rawData.MaxBet),
        MaxPerMatch: _utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(rawData.MaxPerMatch),
        BetValueMin: rawData.BetValueMin,
        BetValueMax: rawData.BetValueMax,
        MaxPerMatchMin: rawData.MaxPerMatchMin,
        MaxPerMatchMax: rawData.MaxPerMatchMax,
        OldMinBet: rawData.MinBet,
        OldMaxBet: rawData.MaxBet,
        OldMaxPerMatch: rawData.MaxPerMatch
      };
      row.OriginalMinBet = row.MinBet;
      row.OriginalMaxBet = row.MaxBet;
      row.OriginalMaxPerMatch = row.MaxPerMatch;
      return row;
    }
  }, {
    key: "getSubmitRowData",
    value: function getSubmitRowData(row) {
      return {
        Id: row.Id,
        BetType: row.BetType,
        BetSettingType: row.BetSettingType,
        MinBet: _utility__WEBPACK_IMPORTED_MODULE_1__["default"].getValueAsNumber(row.MinBet),
        MaxBet: _utility__WEBPACK_IMPORTED_MODULE_1__["default"].getValueAsNumber(row.MaxBet),
        MaxPerMatch: _utility__WEBPACK_IMPORTED_MODULE_1__["default"].getValueAsNumber(row.MaxPerMatch),
        OldMinBet: row.OldMinBet,
        OldMaxBet: row.OldMaxBet,
        OldMaxPerMatch: row.OldMaxPerMatch,
        IsUpdated: row.MinBet !== row.OriginalMinBet || row.MaxBet !== row.OriginalMaxBet || row.MaxPerMatch !== row.OriginalMaxPerMatch
      };
    }
  }, {
    key: "getSubmitData",
    value: function getSubmitData(rows) {
      var submitData = [];

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var currentValue = this.getSubmitRowData(row);
        var invalidData = this.validate(currentValue, row);

        if (invalidData !== null) {
          return {
            IsValid: false,
            Data: invalidData
          };
        }

        submitData.push(currentValue);
      }

      return {
        IsValid: true,
        Data: submitData
      };
    }
  }, {
    key: "validate",
    value: function validate(currentValue, row) {
      if (!currentValue.IsUpdated) {
        return null;
      }

      var validateMinMaxBet = _validatation__WEBPACK_IMPORTED_MODULE_0__["default"].validateMinMaxBet(currentValue, row);

      if (validateMinMaxBet !== null) {
        return validateMinMaxBet;
      }

      return _validatation__WEBPACK_IMPORTED_MODULE_0__["default"].validateMaxPerMatch(currentValue, row);
    }
  }, {
    key: "getHeaderName",
    value: function getHeaderName(header) {
      return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource(header);
    }
  }]);

  return DataHandling;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/dataTransfer.js":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/dataTransfer.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataTransfer; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/DataService */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/constants.js");
var _Url;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Url = (_Url = {}, _defineProperty(_Url, _constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitProduct"].SB, 'SportsBookBetLimit'), _defineProperty(_Url, _constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitProduct"].VS, 'DcsBetLimit'), _defineProperty(_Url, _constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitProduct"].VS2, 'DcsBetLimit'), _defineProperty(_Url, _constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitProduct"].LT, 'DcsBetLimit'), _defineProperty(_Url, _constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitProduct"].NG, 'NumberGameBetLimit'), _defineProperty(_Url, _constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitProduct"].KN, 'RngKenoBetLimit'), _defineProperty(_Url, _constants__WEBPACK_IMPORTED_MODULE_3__["BetLimitProduct"].AGC, 'AGCasinoBetLimit'), _Url);

var DataTransfer =
/*#__PURE__*/
function () {
  function DataTransfer() {
    _classCallCheck(this, DataTransfer);
  }

  _createClass(DataTransfer, null, [{
    key: "getData",
    value: function getData(param, callBack) {
      var url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].resolveClientUrl(Url[param.ProductId] + '/GetSetting');
      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].postData(url, param).then(function (response) {
        var _response$data = response.data,
            Data = _response$data.Data,
            setting = _objectWithoutProperties(_response$data, ["Data"]);

        callBack && callBack(Data, setting);
      })["catch"](function (error) {
        console.log(error.message);
        callBack && callBack([], {});
      });
    }
  }, {
    key: "updateData",
    value: function updateData(param, callBack) {
      var url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].resolveClientUrl(Url[param.ProductId] + '/UpdateSetting');
      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].postData(url, param).then(function (response) {
        var result = response.data;
        var isSuccess = Number(result.Code) === 0;
        var title = isSuccess ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MessageSuccess') : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Fail');
        callBack && callBack(title, result.Message, isSuccess);
      })["catch"](function (error) {
        console.log(error.message);
        callBack(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Error'), _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('ErrorProcessingMsg'), false);
      });
    }
  }]);

  return DataTransfer;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/gameSettingDataHandling.js":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/gameSettingDataHandling.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameSettingDataHandling; });
/* harmony import */ var _validatation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validatation */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/validatation.js");
/* harmony import */ var _dataHandling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataHandling */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/dataHandling.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var GameSettingDataHandling =
/*#__PURE__*/
function (_DataHandling) {
  _inherits(GameSettingDataHandling, _DataHandling);

  function GameSettingDataHandling() {
    _classCallCheck(this, GameSettingDataHandling);

    return _possibleConstructorReturn(this, _getPrototypeOf(GameSettingDataHandling).apply(this, arguments));
  }

  _createClass(GameSettingDataHandling, [{
    key: "validate",
    value: function validate(currentValue, row) {
      if (!currentValue.IsUpdated) {
        return null;
      }

      var validateMinMaxBet = _validatation__WEBPACK_IMPORTED_MODULE_0__["default"].validateMinMaxBet(currentValue, row);

      if (validateMinMaxBet !== null) {
        return validateMinMaxBet;
      }

      return _validatation__WEBPACK_IMPORTED_MODULE_0__["default"].validateMaxBetPerDraw(currentValue, row);
    }
  }, {
    key: "getHeaderName",
    value: function getHeaderName(header) {
      if (header === 'Sport') {
        return _get(_getPrototypeOf(GameSettingDataHandling.prototype), "getHeaderName", this).call(this, 'GameType');
      }

      if (header === 'MaxPerMatch') {
        return _get(_getPrototypeOf(GameSettingDataHandling.prototype), "getHeaderName", this).call(this, 'MaxBetPerDraw');
      }

      return _get(_getPrototypeOf(GameSettingDataHandling.prototype), "getHeaderName", this).call(this, header);
    }
  }]);

  return GameSettingDataHandling;
}(_dataHandling__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/ngDataHandling.js":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/ngDataHandling.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NGDataHandling; });
/* harmony import */ var _validatation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validatation */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/validatation.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/utility.js");
/* harmony import */ var _dataHandling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataHandling */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/dataHandling.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var NGDataHandling =
/*#__PURE__*/
function (_DataHandling) {
  _inherits(NGDataHandling, _DataHandling);

  function NGDataHandling() {
    _classCallCheck(this, NGDataHandling);

    return _possibleConstructorReturn(this, _getPrototypeOf(NGDataHandling).apply(this, arguments));
  }

  _createClass(NGDataHandling, [{
    key: "getViewRowData",
    value: function getViewRowData(rawData) {
      var row = _get(_getPrototypeOf(NGDataHandling.prototype), "getViewRowData", this).call(this, rawData);

      row.MaxPerBall = _utility__WEBPACK_IMPORTED_MODULE_1__["default"].formatValue(rawData.MaxPerBall);
      row.OldMaxPerBall = rawData.MaxPerBall;
      row.MaxPerBallMax = rawData.MaxPerBallMax;
      row.OriginalMaxPerBall = row.MaxPerBall;
      return row;
    }
  }, {
    key: "getSubmitRowData",
    value: function getSubmitRowData(row) {
      var data = _get(_getPrototypeOf(NGDataHandling.prototype), "getSubmitRowData", this).call(this, row);

      data.MaxPerBall = _utility__WEBPACK_IMPORTED_MODULE_1__["default"].getValueAsNumber(row.MaxPerBall);
      data.OldMaxPerBall = row.OldMaxPerBall;
      data.IsUpdated = data.IsUpdated || row.MaxPerBall !== row.OriginalMaxPerBall;
      return data;
    }
  }, {
    key: "getSubmitData",
    value: function getSubmitData(rows) {
      var submitData = [];

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var currentValue = this.getSubmitRowData(row);
        var invalidData = this.validate(currentValue, row);

        if (invalidData !== null) {
          return {
            IsValid: false,
            Data: invalidData
          };
        }

        submitData.push(currentValue);
      }

      return {
        IsValid: true,
        Data: submitData
      };
    }
  }, {
    key: "validate",
    value: function validate(currentValue, row) {
      var validatationResult = _get(_getPrototypeOf(NGDataHandling.prototype), "validate", this).call(this, currentValue, row);

      if (validatationResult !== null) {
        return validatationResult;
      }

      return _validatation__WEBPACK_IMPORTED_MODULE_0__["default"].validateMaxPerBall(currentValue, row);
    }
  }]);

  return NGDataHandling;
}(_dataHandling__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/utility.js":
/*!*****************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/utility.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Utility; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/constants.js");
var _ConfirmationMsg;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var ConfirmationMsg = (_ConfirmationMsg = {}, _defineProperty(_ConfirmationMsg, _constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].SB, {
  Msg: 'UpdateSportsbookBetSettings'
}), _defineProperty(_ConfirmationMsg, _constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].VS, {
  Msg: 'UpdateProductBetSettings',
  Product: 'ProductVS'
}), _defineProperty(_ConfirmationMsg, _constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].VS2, {
  Msg: 'UpdateProductBetSettings',
  Product: 'ProductVS2'
}), _defineProperty(_ConfirmationMsg, _constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].LT, {
  Msg: 'UpdateProductBetSettings',
  Product: 'ProductLT'
}), _defineProperty(_ConfirmationMsg, _constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].NG, {
  Msg: 'UpdateNumberGameBetSettings'
}), _defineProperty(_ConfirmationMsg, _constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].KN, {
  Msg: 'UpdateProductBetSettings',
  Product: 'ProductKN'
}), _defineProperty(_ConfirmationMsg, _constants__WEBPACK_IMPORTED_MODULE_2__["BetLimitProduct"].AGC, {
  Msg: 'UpdateAgCasinoBetSettings'
}), _ConfirmationMsg);

var Utility =
/*#__PURE__*/
function () {
  function Utility() {
    _classCallCheck(this, Utility);
  }

  _createClass(Utility, null, [{
    key: "getConfirmationMsg",
    value: function getConfirmationMsg(productId) {
      var message = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource(ConfirmationMsg[productId].Msg);

      if (!ConfirmationMsg[productId].Product) {
        return message;
      }

      return message.replace('{0}', _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource(ConfirmationMsg[productId].Product));
    }
  }, {
    key: "formatValue",
    value: function formatValue(number) {
      return _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_1__["default"].parseToString(number);
    }
  }, {
    key: "getValueAsNumber",
    value: function getValueAsNumber(text) {
      var number = parseFloat(text.replace(/,/g, ''));
      return !isNaN(number) && isFinite(number) ? _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_1__["default"].round(number, 2) : NaN;
    }
  }]);

  return Utility;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/validatation.js":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/validatation.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Validatation; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/lib/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Validatation =
/*#__PURE__*/
function () {
  function Validatation() {
    _classCallCheck(this, Validatation);
  }

  _createClass(Validatation, null, [{
    key: "validateMinMaxBet",
    value: function validateMinMaxBet(current, limitData) {
      var MinBet = current.MinBet,
          MaxBet = current.MaxBet,
          MaxPerMatch = current.MaxPerMatch,
          Id = current.Id;

      if (isNaN(MinBet)) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MinBet,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('IncorrectMinBet')
        };
      }

      if (isNaN(MaxBet)) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxBet,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('IncorrectMaxBet')
        };
      }

      if (limitData.BetValueMin > 0 && MinBet < limitData.BetValueMin) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MinBet,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MinBetGreaterThanOrEqual') + ' ' + limitData.BetValueMin
        };
      }

      if (limitData.BetValueMax > 0 && MaxBet > limitData.BetValueMax) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxBet,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MaxBetLessThanOrEqual') + ' ' + limitData.BetValueMax
        };
      }

      if (MinBet > MaxBet) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MinBet,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MinBetCanNotGreaterThanMaxBet') + ' ' + MaxBet
        };
      }

      return null;
    }
  }, {
    key: "validateMaxPerMatch",
    value: function validateMaxPerMatch(current, limitData) {
      var MaxBet = current.MaxBet,
          MaxPerMatch = current.MaxPerMatch,
          Id = current.Id;

      if (isNaN(MaxPerMatch)) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxPerMatch,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('IncorrectMaxPerMatch')
        };
      }

      if (limitData.MaxPerMatchMax > 0 && MaxPerMatch > limitData.MaxPerMatchMax) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxPerMatch,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MaxBetMatchMoreThanOrEqual') + ' ' + limitData.MaxPerMatchMax
        };
      }

      if (limitData.MaxPerMatchMin > 0 && MaxPerMatch < limitData.MaxPerMatchMin) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxPerMatch,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MaxBetMatchLessThanOrEqual') + ' ' + limitData.MaxPerMatchMin
        };
      }

      if (MaxBet > MaxPerMatch) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxBet,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MaxBetCanNotGreaterThanMaxPerMatch') + ' ' + MaxPerMatch
        };
      }

      return null;
    }
  }, {
    key: "validateMaxBetPerDraw",
    value: function validateMaxBetPerDraw(current, limitData) {
      var MaxBet = current.MaxBet,
          MaxPerMatch = current.MaxPerMatch,
          Id = current.Id;

      if (isNaN(MaxPerMatch)) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxPerMatch,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('IncorrectMaxBetPerDraw')
        };
      }

      if (limitData.MaxPerMatchMax > 0 && MaxPerMatch > limitData.MaxPerMatchMax) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxPerMatch,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MaxBetPerDrawMoreThanOrEqual') + ' ' + limitData.MaxPerMatchMax
        };
      }

      if (limitData.MaxPerMatchMin > 0 && MaxPerMatch < limitData.MaxPerMatchMin) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxPerMatch,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MaxBetPerDrawLessThanOrEqual') + ' ' + limitData.MaxPerMatchMin
        };
      }

      if (MaxBet > MaxPerMatch) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxBet,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MaxBetCanNotGreaterThanMaxBetPerDraw') + ' ' + MaxPerMatch
        };
      }

      return null;
    }
  }, {
    key: "validateMaxPerBall",
    value: function validateMaxPerBall(current, limitData) {
      var MaxPerBall = current.MaxPerBall,
          Id = current.Id;

      if (isNaN(MaxPerBall)) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxPerBall,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('IncorrectMaxPerBall')
        };
      }

      if (limitData.MaxPerBallMax > 0 && MaxPerBall > limitData.MaxPerBallMax) {
        return {
          Id: Id,
          Type: _constants__WEBPACK_IMPORTED_MODULE_1__["BetLimitType"].MaxPerBall,
          Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('MaxPerBallLessThanOrEqual') + ' ' + limitData.MaxPerBallMax
        };
      }

      return null;
    }
  }]);

  return Validatation;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/reducers/alertReducer.js":
/*!***************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/reducers/alertReducer.js ***!
  \***************************************************************************************/
/*! exports provided: alertOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alertOption", function() { return alertOption; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var alertOption = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_ALERT_OPTION"], function (state, action) {
  return Object.assign({}, state, action.data);
}));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/reducers/index.js":
/*!********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/betlimit/reducers/index.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/requestParamReducer */ "./www/js/source/reactpages/reducers/requestParamReducer.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _alertReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alertReducer */ "./www/js/source/reactpages/Module/PlayerAdmin/betlimit/reducers/alertReducer.js");




/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign({}, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_2__, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_1__, _alertReducer__WEBPACK_IMPORTED_MODULE_3__)));

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

/***/ "./www/js/source/reactpages/components/Balloon.jsx":
/*!*********************************************************!*\
  !*** ./www/js/source/reactpages/components/Balloon.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Overlay */ "./www/js/source/reactpages/components/Overlay.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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





var Balloon =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Balloon, _PureComponent);

  function Balloon(props) {
    var _this;

    _classCallCheck(this, Balloon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Balloon).call(this, props));
    _this.box = props.forwardedRef;
    _this.state = {
      top: 0,
      left: 0
    };
    return _this;
  }

  _createClass(Balloon, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          targetTop = _this$props.targetTop,
          targetLeft = _this$props.targetLeft,
          width = _this$props.width;

      if (!prevProps.isOpen && this.props.isOpen && (prevProps.targetTop !== targetTop || prevProps.targetLeft !== targetLeft || prevProps.msg !== this.props.msg)) {
        this.setState({
          left: targetLeft - width / 2,
          top: targetTop - (this.box.current ? this.box.current.clientHeight : 0) - 20
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          msg = _this$props2.msg,
          targetTop = _this$props2.targetTop,
          targetLeft = _this$props2.targetLeft,
          width = _this$props2.width,
          isOpen = _this$props2.isOpen;
      var _this$state = this.state,
          top = _this$state.top,
          left = _this$state.left;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "balloon",
        style: {
          top: top,
          left: left,
          display: isOpen ? 'block' : 'none'
        },
        ref: this.box
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "balloon-msg",
        style: {
          width: width
        }
      }, msg), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "balloon-arrow-border",
        style: {
          left: (width - 10) / 2
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "balloon-arrow",
        style: {
          left: (width - 10) / 2
        }
      }));
    }
  }]);

  return Balloon;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

_defineProperty(Balloon, "propTypes", {
  isOpen: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  msg: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  targetTop: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  targetLeft: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  width: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number
});

_defineProperty(Balloon, "defaultProps", {
  isOpen: false,
  msg: '',
  targetTop: 0,
  targetLeft: 0,
  width: 0
});

var balloonWithRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (props, ref) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Balloon, _extends({}, props, {
    forwardedRef: ref
  }));
});
/* harmony default export */ __webpack_exports__["default"] = (balloonWithRef);

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
//# sourceMappingURL=betlimit.chunk.js.map