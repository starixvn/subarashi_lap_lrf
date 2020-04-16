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
/******/ 		"www/js/build/dev/reactpages/report/speciallicenseewl": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "www/js/build/dev/reactpages/" + ({"lib/xlsx-style-sparta":"lib/xlsx-style-sparta"}[chunkId]||chunkId) + ".chunk.js"
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/speciallicenseewl/components/index.jsx","lib/common"]);
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

/***/ "./www/js/source/reactpages/components/month-picker/Day.jsx":
/*!******************************************************************!*\
  !*** ./www/js/source/reactpages/components/month-picker/Day.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Overlay */ "./www/js/source/reactpages/components/Overlay.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class Day extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showDateDrop: false
    };
  }

  _renderOption(min, max, value) {
    let options = [];

    for (let i = min; i <= max; i++) {
      options.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: i,
        onClick: () => this._onChange(i)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "javascript:;"
      }, i)));
    }

    return options;
  }

  _onChange(value) {
    this.props.onChange(parseInt(value, 10));
    this.setState({
      showDateDrop: false
    });
  }

  render() {
    const value = this.props.value;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "date"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, this.props.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "date-content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "date-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "date-picked",
      onClick: () => this.setState({
        showDateDrop: true
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "date-label"
    }, value), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "javascript:;"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "arrow-icon down-arrow"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isOpening: this.state.showDateDrop,
      onClose: () => this.setState({
        showDateDrop: false
      })
    }, this.state.showDateDrop && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "date-selection-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, this._renderOption(this.props.min, this.props.max, value)))))));
  }

}

_defineProperty(Day, "propTypes", {
  label: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  min: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  max: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
});

_defineProperty(Day, "defaultProps", {
  onChange: function () {}
});

/* harmony default export */ __webpack_exports__["default"] = (Day);

/***/ }),

/***/ "./www/js/source/reactpages/components/month-picker/Month.jsx":
/*!********************************************************************!*\
  !*** ./www/js/source/reactpages/components/month-picker/Month.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Overlay */ "./www/js/source/reactpages/components/Overlay.jsx");
/* harmony import */ var _lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class Month extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props, context) {
    super(props, context);
    const shortMonths = _lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResources(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    const fullMonths = _lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResources(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    this.shortMonths = shortMonths;
    this.fullMonths = fullMonths;
    this.state = {
      expandYear: props.value.year,
      showMonthDrop: false
    };
  }

  _onChange(value) {
    this.props.onChange(value);
    this.setState({
      showMonthDrop: false
    });
  }

  _formatString(month, year) {
    return this.shortMonths[month] + ' ' + year;
  }

  _renderOption(min, max, value) {
    let options = [];

    for (let i = min.year; i <= max.year; i++) {
      if (i === this.state.expandYear) {
        options.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: i,
          className: "year",
          style: {
            fontWeight: 'bold'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "javascript:;"
        }, i)));
        const minMonth = i === min.year ? min.month : 0;
        const maxMonth = i === max.year ? max.month : 11;

        for (let j = minMonth; j <= maxMonth; j++) {
          const isSelected = i === value.year && j === value.month;
          const valueItem = {
            year: i,
            month: j
          };
          options.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
            key: `${j}${i}`,
            className: "month-option",
            onClick: () => this._onChange(valueItem)
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            href: "javascript:;",
            className: `${isSelected ? 'selected' : ''}`
          }, this.fullMonths[j])));
        }
      } else {
        options.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: i,
          className: "year",
          onClick: () => this.setState({
            expandYear: i
          })
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "javascript:;"
        }, i)));
      }
    }

    return options;
  }

  _getNextMonth() {
    let month = this.props.value.month + 1;
    let year = this.props.value.year;

    if (month > 11) {
      month = 0;
      year += 1;
    }

    return {
      year: year,
      month: month
    };
  }

  _getPrevMonth() {
    let month = this.props.value.month - 1;
    let year = this.props.value.year;

    if (month < 0) {
      month = 11;
      year -= 1;
    }

    return {
      year: year,
      month: month
    };
  }

  _checkValidMonth(month, year) {
    const {
      min,
      max
    } = this.props;
    return year > min.year && year < max.year || year === min.year && month >= min.month || year === max.year && month <= max.month;
  }

  _goToMonth(e, value) {
    e.preventDefault();

    if (value.year !== this.state.expandYear) {
      this.setState({
        expandYear: value.year
      });
    }

    this.props.onChange(value);
  }

  render() {
    const nexMonth = this._getNextMonth();

    const preMonth = this._getPrevMonth();

    const validNexMonth = this._checkValidMonth(nexMonth.month, nexMonth.year);

    const validPreMonth = this._checkValidMonth(preMonth.month, preMonth.year);

    const value = this.props.value;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, this.props.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month-content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month-picked"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "javascript:;",
      className: "prev",
      onClick: e => validPreMonth && this._goToMonth(e, preMonth)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `arrow-icon left-arrow ${validPreMonth ? '' : 'disable'}`
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "month-label",
      onClick: () => this.setState({
        showMonthDrop: true
      })
    }, this._formatString(value.month, value.year)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "javascript:;",
      className: "next",
      onClick: e => validNexMonth && this._goToMonth(e, nexMonth)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `arrow-icon right-arrow ${validNexMonth ? '' : 'disable'}`
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isOpening: this.state.showMonthDrop,
      onClose: () => this.setState({
        showMonthDrop: false
      })
    }, this.state.showMonthDrop && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month-selection-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "month-selection"
    }, this._renderOption(this.props.min, this.props.max, value)))))));
  }

}

_defineProperty(Month, "propTypes", {
  label: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  value: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  min: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  max: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func
});

_defineProperty(Month, "defaultProps", {
  label: 'View data in month',
  onChange: function () {}
});

/* harmony default export */ __webpack_exports__["default"] = (Month);

/***/ }),

/***/ "./www/js/source/reactpages/components/month-picker/MonthPicker.jsx":
/*!**************************************************************************!*\
  !*** ./www/js/source/reactpages/components/month-picker/MonthPicker.jsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Month__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Month */ "./www/js/source/reactpages/components/month-picker/Month.jsx");
/* harmony import */ var _Day__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Day */ "./www/js/source/reactpages/components/month-picker/Day.jsx");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class MonthPicker extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onMonthChange", value => {
      const minDate = value.year === this.min.year && value.month === this.min.month ? this.min.date : 1;
      const maxDate = value.year === this.max.year && value.month === this.max.month ? this.max.date : moment__WEBPACK_IMPORTED_MODULE_3___default()({
        year: value.year,
        month: value.month
      }).daysInMonth();
      this.setState({
        month: value,
        minDate: minDate,
        maxDate: maxDate,
        from: minDate,
        to: maxDate
      });
      this.props.onChange({
        fromDate: this._formatDate(minDate, value.month, value.year),
        toDate: this._formatDate(maxDate, value.month, value.year)
      });
    });

    _defineProperty(this, "_onFromDateChange", value => {
      this.setState({
        from: value
      });
      this.props.onChange({
        fromDate: this._formatDate(value, this.state.month.month, this.state.month.year),
        toDate: this._formatDate(this.state.to, this.state.month.month, this.state.month.year)
      });
    });

    _defineProperty(this, "_onToDateChange", value => {
      this.setState({
        to: value
      });
      this.props.onChange({
        fromDate: this._formatDate(this.state.from, this.state.month.month, this.state.month.year),
        toDate: this._formatDate(value, this.state.month.month, this.state.month.year)
      });
    });

    const format = 'MM/DD/YYYY';

    const _minDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(props.minDate, format);

    const _maxDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(props.maxDate, format);

    const min = {
      year: _minDate.year(),
      month: _minDate.month(),
      date: _minDate.date()
    };
    const max = {
      year: _maxDate.year(),
      month: _maxDate.month(),
      date: _maxDate.date()
    };
    this.min = min;
    this.max = max;
    const fromDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(props.fromDate, format);
    const toDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(props.toDate, format);
    const currentMonth = {
      year: fromDate.year(),
      month: fromDate.month()
    };
    this.state = {
      month: currentMonth,
      from: fromDate.date(),
      to: toDate.date()
    };
  }

  _formatDate(date, month, year) {
    return `${month < 9 ? '0' + (month + 1) : month + 1}/${date < 10 ? '0' + date : date}/${year}`;
  }

  render() {
    const {
      month,
      from,
      to
    } = this.state;
    const daysInMonth = moment__WEBPACK_IMPORTED_MODULE_3___default()({
      year: month.year,
      month: month.month
    }).daysInMonth();
    const startDate = month.year === this.min.year && month.month === this.min.month ? this.min.date : 1;
    const endDate = month.year === this.max.year && month.month === this.max.month ? this.max.date : daysInMonth;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `month-picker ${this.props.showDate ? '' : 'month-only'}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Month__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
      min: this.min,
      max: this.max,
      value: month
    }, this.props.monthOption, {
      onChange: this._onMonthChange
    })), this.props.showDate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Day__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
      min: startDate,
      max: endDate > to ? to : endDate,
      value: from
    }, this.props.fromDateOption, {
      onChange: this._onFromDateChange
    })), this.props.showDate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Day__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
      min: startDate < from ? from : startDate,
      max: endDate,
      value: to
    }, this.props.toDateOption, {
      onChange: this._onToDateChange
    })));
  }

}

_defineProperty(MonthPicker, "propTypes", {
  monthOption: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  minDate: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  maxDate: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  fromDate: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  toDate: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  showDate: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool
});

_defineProperty(MonthPicker, "defaultProps", {
  label: 'View data in month',
  onChange: function () {},
  fromDateOption: {
    label: 'From'
  },
  toDateOption: {
    label: 'To'
  },
  showDate: true
});

/* harmony default export */ __webpack_exports__["default"] = (MonthPicker);

/***/ }),

/***/ "./www/js/source/reactpages/components/month-picker/index.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/components/month-picker/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MonthPicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MonthPicker */ "./www/js/source/reactpages/components/month-picker/MonthPicker.jsx");

/* harmony default export */ __webpack_exports__["default"] = (_MonthPicker__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

const titleCellStyle = {
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
const headerCellStyle = {
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
const bodyTextStyle = {
  alignment: {
    vertical: "center"
  }
};
const bodyDecimalStyle = {
  numFmt: "#,##0.00"
};
const bodyCellStyle = {
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
  right: {
    alignment: _objectSpread({}, bodyTextStyle.alignment, {
      horizontal: "right"
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
const totalTextStyle = {
  font: {
    bold: true
  }
};

const totalDecimalStyle = _objectSpread({}, totalTextStyle, {
  numFmt: "#,##0.00"
});

const totalCellStyle = {
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
const grandTotalTextStyle = {
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

const decimalGrandTotalStyle = _objectSpread({}, grandTotalTextStyle, {
  numFmt: "#,##0.00"
});

const grandTotalCellStyle = {
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

/***/ "./www/js/source/reactpages/constants/report.js":
/*!******************************************************!*\
  !*** ./www/js/source/reactpages/constants/report.js ***!
  \******************************************************/
/*! exports provided: ReportLevel, ReportBy, SubsidiaryViewType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportLevel", function() { return ReportLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportBy", function() { return ReportBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubsidiaryViewType", function() { return SubsidiaryViewType; });
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

/***/ "./www/js/source/reactpages/lib/excel.js":
/*!***********************************************!*\
  !*** ./www/js/source/reactpages/lib/excel.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Excel; });
const EXCEL_TYPE = "xlsx";
const MapExcelType = {
  "number": "n",
  "string": "s",
  "boolean": "b",
  "object": "d"
};
let _XLSX = null;
class Excel {
  static process(callback) {
    if (window.XLSX) {
      _XLSX = window.XLSX;
      callback && callback();
    } else {
      Promise.all(/*! import() | lib/xlsx-style-sparta */[__webpack_require__.e("lib/common"), __webpack_require__.e("lib/xlsx-style-sparta")]).then(__webpack_require__.t.bind(null, /*! xlsx-style-sparta */ "./node_modules/xlsx-style-sparta/xlsx.js", 7)).then(XLSX => {
        _XLSX = XLSX;
        callback && callback();
      });
    }
  }

  static read(file, sheetIndex, callBack) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = e.target.result;

      const workbook = _XLSX.read(data, {
        type: 'binary'
      });

      const sheetName = workbook.SheetNames[sheetIndex];
      const worksheet = workbook.Sheets[sheetName];

      const json = _XLSX.utils.sheet_to_json(worksheet);

      callBack && callBack(json);
    };

    reader.readAsBinaryString(file);
  }

  static export(worksheet, fileName) {
    const option = {
      bookType: EXCEL_TYPE,
      bookSST: false,
      type: 'binary'
    };
    const workbook = {
      SheetNames: [fileName],
      Sheets: {},
      Props: {}
    };
    workbook.Sheets[fileName] = worksheet;

    var workbookOutput = _XLSX.write(workbook, option);

    this.download(workbookOutput, fileName);
  }

  static getCellType(value) {
    return MapExcelType[typeof value];
  }

  static getCellAddress(cellObject) {
    return _XLSX.utils.encode_cell(cellObject);
  }

  static download(workbookOut, fileName) {
    const blob = new Blob([this.sheetToArrayBuffer(workbookOut)], {
      type: "application/octet-stream"
    });
    this.downloadFromBolb(blob, fileName);
  }

  static downloadFromBolb(blob, fileName) {
    const fileNameDownload = `${fileName}.${EXCEL_TYPE}`; // IE 10+

    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, fileNameDownload);
    } else {
      const element = window.document.createElement('a');
      element.href = window.URL.createObjectURL(blob);
      element.download = fileNameDownload;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }

  static sheetToArrayBuffer(s) {
    const buffer = new ArrayBuffer(s.length);
    const view = new Uint8Array(buffer);

    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;

    return buffer;
  }

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

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/actions/filterHandlerAction.js":
/*!*****************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/actions/filterHandlerAction.js ***!
  \*****************************************************************************************/
/*! exports provided: setSelectedReportBy, setDateRange, setParams, setReportTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedReportBy", function() { return setSelectedReportBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDateRange", function() { return setDateRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParams", function() { return setParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReportTitle", function() { return setReportTitle; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/pages/speciallicenseewl/actions/types.js");

const setSelectedReportBy = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_REPORTBY"],
    data: value
  };
};
const setDateRange = dateRange => {
  const range = {
    fromDate: dateRange.fromDate,
    toDate: dateRange.toDate
  };
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_DATE_RANGE"],
    data: range
  };
};
const setParams = params => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_PARAMS"],
    data: params
  };
};
const setReportTitle = title => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_REPORT_TITLE"],
    data: title
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/actions/index.js":
/*!***************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/actions/index.js ***!
  \***************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _filterHandlerAction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filterHandlerAction.js */ "./www/js/source/reactpages/pages/speciallicenseewl/actions/filterHandlerAction.js");
/* harmony import */ var _actions_productAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../actions/productAction */ "./www/js/source/reactpages/actions/productAction.js");
/* harmony import */ var _actions_currencyAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../actions/currencyAction */ "./www/js/source/reactpages/actions/currencyAction.js");
/* harmony import */ var _actions_loaderAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");




const ActionCreators = Object.assign({}, _filterHandlerAction_js__WEBPACK_IMPORTED_MODULE_0__, _actions_productAction__WEBPACK_IMPORTED_MODULE_1__, _actions_currencyAction__WEBPACK_IMPORTED_MODULE_2__, _actions_loaderAction__WEBPACK_IMPORTED_MODULE_3__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/actions/types.js":
/*!***************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/actions/types.js ***!
  \***************************************************************************/
/*! exports provided: SET_GRID_DATA, GET_REPORTBY, SET_REPORTBY, SET_DATE_RANGE, GET_DATE_CONSTRAINT, GET_XSRF_TOKEN, SET_PARAMS, SET_REPORT_TITLE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_GRID_DATA", function() { return SET_GRID_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_REPORTBY", function() { return GET_REPORTBY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REPORTBY", function() { return SET_REPORTBY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_DATE_RANGE", function() { return SET_DATE_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_DATE_CONSTRAINT", function() { return GET_DATE_CONSTRAINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_XSRF_TOKEN", function() { return GET_XSRF_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PARAMS", function() { return SET_PARAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REPORT_TITLE", function() { return SET_REPORT_TITLE; });
const SET_GRID_DATA = 'SET_GRID_DATA';
const GET_REPORTBY = 'GET_REPORTBY';
const SET_REPORTBY = 'SET_REPORTBY';
const SET_DATE_RANGE = 'SET_DATE_RANGE';
const GET_DATE_CONSTRAINT = 'GET_DATE_CONSTRAINT';
const GET_XSRF_TOKEN = 'GET_XSRF_TOKEN';
const SET_PARAMS = 'SET_PARAMS';
const SET_REPORT_TITLE = 'SET_REPORT_TITLE';

/***/ }),

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/components/AppContainer.jsx":
/*!**************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/components/AppContainer.jsx ***!
  \**************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index */ "./www/js/source/reactpages/pages/speciallicenseewl/actions/index.js");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/pages/speciallicenseewl/components/FormFilter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/pages/speciallicenseewl/components/DataGrid.jsx");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _layouts_AppLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _components_ReportTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");









class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
      isLoading: this.props.isLoading
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "result-content"
    }, this.props.reportTitle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ReportTitle__WEBPACK_IMPORTED_MODULE_8__["default"], {
      content: this.props.reportTitle
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);
}

function mapStateToProps(state) {
  return Object.assign({}, {
    isLoading: state.isLoading,
    reportTitle: state.reportTitle
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/components/DataGrid.jsx":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/components/DataGrid.jsx ***!
  \**********************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/pages/speciallicenseewl/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
/* harmony import */ var _components_NoDataTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _lib_report__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../lib/report */ "./www/js/source/reactpages/lib/report.js");
/* harmony import */ var _constants_report__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../constants/report */ "./www/js/source/reactpages/constants/report.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/pages/speciallicenseewl/lib/service.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class DataGrid extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "_sort", (sortBy, sortOrder) => {
      this.props.toggleLoader(true);
      const param = Object.assign({}, this.props.params, {
        SortOrder: sortOrder,
        SortBy: sortBy
      });
      const mainData = this.state.gridData.Data;

      if (mainData && mainData.length > 1) {
        _lib_service__WEBPACK_IMPORTED_MODULE_10__["Service"].sort(mainData, param.SortBy, param.SortOrder);
        const sortedResult = Object.assign({}, this.state.gridData, {
          Data: mainData
        });
        this.setState({
          gridData: sortedResult
        });
      }

      this.props.setParams(param);
      this.props.toggleLoader(false);
    });

    this.state = {
      expandTurnover: false,
      expandLicensee: false,
      gridData: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.Timestamp !== this.props.params.Timestamp) {
      this._getGridData();
    }
  }

  _getGridData() {
    this.props.toggleLoader(true);
    _lib_report__WEBPACK_IMPORTED_MODULE_8__["default"].fetchGridData(_lib_service__WEBPACK_IMPORTED_MODULE_10__["Url"], {
      xsrfToken: this.props.xsrfToken,
      data: this.props.params
    }).then(response => {
      const result = response.data;
      const mainData = result.Data;

      if (mainData && mainData.length > 1) {
        _lib_service__WEBPACK_IMPORTED_MODULE_10__["Service"].sort(mainData, this.props.params.SortBy, this.props.params.SortOrder);
        const sortedResult = Object.assign({}, result, {
          Data: mainData
        });
        this.setState({
          gridData: sortedResult
        });
      } else {
        this.setState({
          gridData: result
        });
      }

      this.props.setReportTitle(_lib_service__WEBPACK_IMPORTED_MODULE_10__["Service"].getReportTitle(this.props.params.FromDate, this.props.params.ToDate, this.props.params.CurrencyId, this.props.params.CurrencyName, this.props.params.BaseCurrency));
      this.props.toggleLoader(false);
    }).catch(error => {
      _lib_service__WEBPACK_IMPORTED_MODULE_10__["Service"].showErrorMsg();
      this.props.toggleLoader(false);
    });
  }

  _onExpandTurnOverColumn(e) {
    e.stopPropagation();
    this.setState(prevState => ({
      expandTurnover: !prevState.expandTurnover
    }));
  }

  _onExpandLicenseeColumn(e) {
    e.stopPropagation();
    this.setState(prevState => ({
      expandLicensee: !prevState.expandLicensee
    }));
  }

  _buildHeader(selectedProductList) {
    const productsCount = selectedProductList.length;
    const {
      expandLicensee,
      expandTurnover
    } = this.state;
    const rowSpan = productsCount > 1 && (expandLicensee || expandTurnover) ? 2 : 1;
    let rows = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], {
      key: "header1",
      style: {
        height: 32
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
      colWidth: 50,
      rowSpan: rowSpan
    }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].index), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
      colWidth: 150,
      rowSpan: rowSpan,
      sortBy: 'Date'
    }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].date), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
      colWidth: 100,
      rowSpan: rowSpan,
      sortBy: 'CurrencyName'
    }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].currency), productsCount > 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
      colWidth: 200 * (productsCount * expandTurnover + 1) - productsCount,
      rowSpan: expandTurnover ? 1 : rowSpan,
      colSpan: productsCount * expandTurnover + 1,
      sortBy: !expandTurnover ? 'TotalTurnOver' : ''
    }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].turnover, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      className: `header-button btn ${expandTurnover ? 'btnCollapse' : ''}`,
      onClick: e => this._onExpandTurnOverColumn(e)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
      className: "btn-icon icon-arrow"
    }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
      colWidth: 200,
      rowSpan: rowSpan,
      sortBy: 'TotalTurnOver'
    }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].turnover), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
      colWidth: 130,
      rowSpan: rowSpan,
      sortBy: 'TotalTransaction'
    }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].totalTransaction), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
      colWidth: 200,
      rowSpan: rowSpan,
      sortBy: 'CustomerWinLoss'
    }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].customer), productsCount > 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
      colWidth: 200 * (productsCount * expandLicensee + 1) - productsCount,
      rowSpan: expandLicensee ? 1 : rowSpan,
      colSpan: productsCount * expandLicensee + 1,
      sortBy: !expandLicensee ? 'TotalLicenseeWL' : ''
    }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].licenseeWL, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      className: `header-button btn ${expandLicensee ? 'btnCollapse' : ''}`,
      onClick: e => this._onExpandLicenseeColumn(e)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
      className: "btn-icon icon-arrow"
    }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
      colWidth: 200,
      rowSpan: rowSpan,
      sortBy: 'TotalLicenseeWL'
    }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].licenseeWL))];

    if (rowSpan > 1) {
      let cols = [];

      if (this.state.expandTurnover) {
        for (let i = 0; i < productsCount; i++) {
          const code = selectedProductList[i];
          const colName = `TurnOver${code}`;
          cols.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
            key: colName,
            colWidth: 200,
            sortBy: colName
          }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"][code]));
        }

        cols.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
          key: "turnover-total",
          colWidth: 200,
          sortBy: 'TotalTurnOver'
        }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].total));
      }

      if (this.state.expandLicensee) {
        for (let i = 0; i < productsCount; i++) {
          const code = selectedProductList[i];
          const colName = `LicenseeWL${code}`;
          cols.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
            key: colName,
            colWidth: 200,
            sortBy: colName
          }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"][code]));
        }

        cols.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
          key: "licenseeWL-total",
          colWidth: 200,
          sortBy: 'TotalLicenseeWL'
        }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["HeaderText"].total));
      }

      rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], {
        key: "header2",
        style: {
          height: 32
        }
      }, cols));
    }

    return rows;
  }

  _buildBody(reportBy, selectedProductList) {
    const data = this.state.gridData.Data,
          formatDate = reportBy === _constants_report__WEBPACK_IMPORTED_MODULE_9__["ReportBy"].DAILY.toString() ? 'MM/DD/YYYY' : 'MM/YYYY';
    let rows = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const reportBy = moment__WEBPACK_IMPORTED_MODULE_0___default()(item.Date).format(formatDate);
      rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `${item.Ticks}-${item.CurrencyId}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        title: i + 1,
        className: "center-align"
      }, i + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        title: reportBy,
        className: "center-align"
      }, reportBy), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        title: item.CurrencyName,
        className: "center-align"
      }, item.CurrencyName), this._buildCell(item, selectedProductList)));
    }

    return rows;
  }

  _buildFooter(selectedProductList) {
    let totalRows = [];
    const total = this.state.gridData.Total,
          colSpan = 2,
          rowSpan = total.length;

    for (let i = 0; i < rowSpan; i++) {
      const item = total[i];
      totalRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: item.CurrencyName,
        className: "fixed-table-total"
      }, i === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        title: _lib_service__WEBPACK_IMPORTED_MODULE_10__["TotalText"].total,
        className: "center-align",
        rowSpan: rowSpan,
        colSpan: colSpan
      }, _lib_service__WEBPACK_IMPORTED_MODULE_10__["TotalText"].total), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        title: item.CurrencyName,
        className: "center-align"
      }, item.CurrencyName), this._buildCell(item, selectedProductList)));
    }

    const dataSummary = this.state.gridData.SummaryTotal,
          baseCurrencyList = Object.keys(dataSummary),
          colSummarySpan = colSpan + 1;

    for (let i = baseCurrencyList.length - 1; i >= 0; i--) {
      const currency = baseCurrencyList[i],
            item = dataSummary[currency];
      totalRows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `tr-grandtotal${i}`,
        className: "fixed-table-grant-total"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        title: `${_lib_service__WEBPACK_IMPORTED_MODULE_10__["TotalText"].totalIn} ${currency}`,
        className: "center-align",
        colSpan: colSummarySpan
      }, `${_lib_service__WEBPACK_IMPORTED_MODULE_10__["TotalText"].totalIn} ${currency}`), this._buildCell(item, selectedProductList)));
    }

    return totalRows;
  }

  _buildCell(item, selectedProductList) {
    const turnover = _lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].formatDecimal(item.TotalTurnOver),
          customerWl = _lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].formatDecimal(item.CustomerWinLoss),
          licenseeWL = _lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].formatDecimal(item.TotalLicenseeWL),
          totalTransaction = _lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].format(item.TotalTransaction, 0);
    const productsCount = selectedProductList.length;

    if (productsCount === 1) {
      const rows = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        key: "turnover",
        title: turnover,
        className: "right-align"
      }, turnover), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        key: "totalTransaction",
        title: totalTransaction,
        className: "right-align"
      }, totalTransaction), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        key: "customerWl",
        title: customerWl,
        className: "right-align"
      }, customerWl), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        key: "licenseeWL",
        title: licenseeWL,
        className: `right-align ${item.TotalLicenseeWL < 0 ? 'negative' : ''}`
      }, licenseeWL)];
      return rows;
    }

    let rows = [];

    if (this.state.expandTurnover) {
      for (let i = 0; i < productsCount; i++) {
        const column = 'TurnOver' + selectedProductList[i];
        const turnoverByProduct = _lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].formatDecimal(item[column]);
        rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          key: column,
          title: turnoverByProduct,
          className: "right-align"
        }, turnoverByProduct));
      }
    }

    rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
      key: "turnover",
      title: turnover,
      className: "right-align"
    }, turnover), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
      key: "totalTransaction",
      title: totalTransaction,
      className: "right-align"
    }, totalTransaction), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
      key: "customerWl",
      title: customerWl,
      className: "right-align"
    }, customerWl));

    if (this.state.expandLicensee) {
      for (let i = 0; i < productsCount; i++) {
        const column = 'LicenseeWL' + selectedProductList[i];
        const licenseeWLByProduct = _lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].formatDecimal(item[column]);
        rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          key: column,
          title: licenseeWLByProduct,
          className: `right-align ${item[column] < 0 ? 'negative' : ''}`
        }, licenseeWLByProduct));
      }
    }

    rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
      key: "licenseeWL",
      title: licenseeWL,
      className: `right-align ${item.TotalLicenseeWL < 0 ? 'negative' : ''}`
    }, licenseeWL));
    return rows;
  }

  render() {
    const data = this.state.gridData.Data;

    if (!data) {
      return null;
    }

    const params = this.props.params;

    if (!data.length) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_7__["default"], null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      minWidth: 800,
      autoWidth: true,
      bodyHeight: 300,
      header: this._buildHeader(params.ProductCodeList),
      body: this._buildBody(params.ReportBy, params.ProductCodeList),
      footer: this._buildFooter(params.ProductCodeList),
      onSort: this._sort
    });
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_index_js__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);
}

function mapStateToProps(state) {
  const {
    params,
    xsrfToken
  } = state;
  return Object.assign({}, {
    params,
    xsrfToken
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/components/FormFilter.jsx":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/components/FormFilter.jsx ***!
  \************************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/pages/speciallicenseewl/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @9softstudio/react-multiselect */ "./node_modules/@9softstudio/react-multiselect/dist/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_report__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/lib/report */ "./www/js/source/reactpages/lib/report.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/pages/speciallicenseewl/lib/service.js");
/* harmony import */ var _lib_reportExcel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/reportExcel */ "./www/js/source/reactpages/pages/speciallicenseewl/lib/reportExcel.js");
/* harmony import */ var _jsroot_components_month_picker_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/month-picker/index */ "./www/js/source/reactpages/components/month-picker/index.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class FormFilter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "submit", event => {
      event.preventDefault();

      if (!this.isValidModel) {
        return;
      }

      const params = this._getParams();

      if (!params) {
        return;
      }

      this.props.setParams(params);
    });

    _defineProperty(this, "exportExcel", event => {
      event.preventDefault();

      let params = this._getParams();

      if (!params) {
        return;
      }

      this.props.toggleLoader(true);
      _jsroot_lib_report__WEBPACK_IMPORTED_MODULE_8__["default"].fetchGridData(_lib_service__WEBPACK_IMPORTED_MODULE_9__["Url"], {
        xsrfToken: this.props.xsrfToken,
        data: params
      }).then(response => {
        this._doExportExcel(params, response.data);
      }).catch(error => {
        _lib_service__WEBPACK_IMPORTED_MODULE_9__["Service"].showErrorMsg();
        this.props.toggleLoader(false);
      });
    });

    _defineProperty(this, "productChangeHandler", (currentItem, selectedItemsKey) => {
      this.props.setSelectedProduct(selectedItemsKey);
    });

    _defineProperty(this, "_monthPickerHandle", dateRange => {
      this.props.setDateRange(dateRange);
    });
  }

  get isValidModel() {
    return this.props.selectedProduct !== "";
  }

  _doExportExcel(params, gridData) {
    if (!gridData.Data || !gridData.Data.length) {
      this.props.toggleLoader(false);
      alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("NoInfo"));
      return;
    }

    if (gridData.Data.length > 1) {
      _lib_service__WEBPACK_IMPORTED_MODULE_9__["Service"].sort(gridData.Data, params.SortBy, params.SortOrder);
    }

    const title = _lib_service__WEBPACK_IMPORTED_MODULE_9__["Service"].getReportTitle(params.FromDate, params.ToDate, params.CurrencyId, params.CurrencyName, params.BaseCurrency);
    const excel = new _lib_reportExcel__WEBPACK_IMPORTED_MODULE_10__["default"](gridData, title, parseInt(params.ReportBy, 10), params.ProductCodeList);
    excel.export(() => {
      this.props.toggleLoader(false);
    });
  }

  _getParams() {
    if (!this.props.xsrfToken) {
      return null;
    }

    const {
      fromDate,
      toDate
    } = this.props.dateRange;
    return {
      FromDate: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__["default"].convertDateToString(fromDate),
      ToDate: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_7__["default"].convertDateToString(toDate),
      CurrencyName: this.props.selectedCurrency.label,
      CurrencyId: this.props.selectedCurrency.value,
      BaseCurrency: this.props.selectedCurrency.baseCurrency,
      ProductCodeList: this.props.selectedProduct.split(','),
      ReportBy: this.props.selectedReportBy,
      SortBy: this.props.params.SortBy,
      SortOrder: this.props.params.SortOrder,
      Timestamp: new Date().getTime()
    };
  }

  _renderReportByOption() {
    const {
      reportByList,
      selectedReportBy
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('ReportBy')), reportByList.map((option, i) => {
      const key = 'ReportBy' + i;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        key: `Group${key}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "radio",
        value: option.value,
        checked: selectedReportBy === option.value,
        id: key,
        onChange: event => this.props.setSelectedReportBy(event.target.value)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: key
      }, option.label));
    }));
  }

  _renderProductSelectList() {
    const productOptions = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"].productOptions;
    return productOptions && productOptions.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_5___default.a, {
      id: "ProductList",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].currentLanguage,
      dataSource: productOptions,
      keyField: "Code",
      valueField: "Name",
      statusField: "Status",
      onChange: this.productChangeHandler
    });
  }

  _renderCurrencySelectList() {
    const {
      selectedCurrency
    } = this.props;
    const currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"].currencyList;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_4__["default"], {
      instanceId: "ddlCurrency",
      value: selectedCurrency.value,
      options: currencyList,
      onChange: item => this.props.setSelectedCurrency(item)
    });
  }

  _renderMonthPicker() {
    const {
      dateRange
    } = this.props;
    const dateConstraint = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"].dateConstraint;
    const monthOption = {
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('ViewDataInMonth')
    };
    const fromDateOption = {
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('From'),
      id: 'FromDateInput'
    };
    const toDateOption = {
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('To'),
      id: 'ToDateInput'
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_month_picker_index__WEBPACK_IMPORTED_MODULE_11__["default"], {
      minDate: dateConstraint.minDate,
      maxDate: dateConstraint.maxDate,
      fromDate: dateRange.fromDate,
      toDate: dateRange.toDate,
      onChange: this._monthPickerHandle,
      monthOption: monthOption,
      fromDateOption: fromDateOption,
      toDateOption: toDateOption
    });
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "page-filter"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-5 col-sm-12 col-lg-5 col-xl-5"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, this._renderMonthPicker())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-3 col-sm-12 col-lg-2 col-xl-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("Currency")), this._renderCurrencySelectList())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-4 col-sm-12 col-lg-3 col-xl-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("Product")), this._renderProductSelectList())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-5 col-sm-12 col-lg-2 col-xl-3"
    }, this._renderReportByOption()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-3 col-sm-12 col-lg-2 col-xl-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "button-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      disabled: !this.isValidModel,
      type: "button",
      className: "btn btn-submit",
      onClick: this.submit
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("Submit")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "caret-block"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "icon-excel right",
      onClick: this.exportExcel,
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("ExportToExcel")
    }))));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);
}

function mapStateToProps(state) {
  const {
    gridData,
    reportTitle,
    isLoading
  } = state,
        rest = _objectWithoutProperties(state, ["gridData", "reportTitle", "isLoading"]);

  return Object.assign({}, rest);
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/components/index.jsx":
/*!*******************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/components/index.jsx ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/pages/speciallicenseewl/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/index.js */ "./www/js/source/reactpages/pages/speciallicenseewl/reducers/index.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/store */ "./www/js/source/reactpages/lib/store.js");






const defaultState = Object.assign({}, window.initialState, {
  reportTitle: ''
}, {
  params: {
    SortBy: 'Date',
    SortOrder: 'asc'
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
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));

/***/ }),

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/lib/reportExcel.js":
/*!*****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/lib/reportExcel.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReportExcel; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_excel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/excel */ "./www/js/source/reactpages/lib/excel.js");
/* harmony import */ var _lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/excelStyle */ "./www/js/source/reactpages/constants/excelStyle.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/pages/speciallicenseewl/lib/service.js");
/* harmony import */ var _constants_report__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants/report */ "./www/js/source/reactpages/constants/report.js");






const TITLE_ROW_INDEX = 0;
const HEADER_ROW_INDEX = 1;
const MIN_COLUMN = 7;
const MAIN_SECTION = 'main';
const TOTAL_SECTION = 'total';
const SUMMARYTOTAL_SECTION = 'summary';
const HEADER_SECTION = 'header';
class ReportExcel {
  constructor(gridData = {}, title, reportBy, productCodes) {
    this.worksheet = {};
    this.title = title;
    this.fileName = "LicenseeWinLoss";
    this.gridData = gridData;
    this.reportBy = reportBy;
    this.productCodes = productCodes;
    this.productCount = productCodes.length;
    this.currentRowIndex = HEADER_ROW_INDEX + (this.productCount > 1 ? 2 : 1);
    this.totalColumn = MIN_COLUMN + this.productCount * 2;
    this.configColumn = this._getConfigColumn(reportBy);
    this.colSpanConfig = this._getColSpanConfig();
    this.mergeConfig = [];
  }

  export(onFinished) {
    if (!this.gridData.Data || !this.gridData.Data.length) {
      onFinished && onFinished();
      return;
    }

    _lib_excel__WEBPACK_IMPORTED_MODULE_1__["default"].process(() => {
      this._createHeader();

      this._createSheetData();

      this._createExcelConfig();

      _lib_excel__WEBPACK_IMPORTED_MODULE_1__["default"].export(this.worksheet, this.fileName);
      onFinished && onFinished();
    });
  }

  _getColSpanConfig() {
    return {
      [TOTAL_SECTION]: {
        colSpan: 2,
        text: _lib_service__WEBPACK_IMPORTED_MODULE_4__["TotalText"].total,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].rowspan
      },
      [SUMMARYTOTAL_SECTION]: {
        colSpan: 3,
        text: _lib_service__WEBPACK_IMPORTED_MODULE_4__["TotalText"].totalIn,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].rowspan
      }
    };
  }

  _getConfigColumn(reportBy) {
    const rowSpan = this.productCount > 1 ? 2 : 1;
    let rows = [{
      field: 'Index',
      type: 's',
      [HEADER_SECTION]: {
        title: 'index',
        isShow: true,
        rowSpan: rowSpan,
        index_r: HEADER_ROW_INDEX
      },
      [MAIN_SECTION]: {
        isShow: true,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].center,
        width: 50
      },
      [TOTAL_SECTION]: {
        isShow: false
      },
      [SUMMARYTOTAL_SECTION]: {
        isShow: false
      }
    }, {
      field: 'Date',
      type: 's',
      [HEADER_SECTION]: {
        title: 'date',
        isShow: true,
        rowSpan: rowSpan
      },
      [MAIN_SECTION]: {
        isShow: true,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].center,
        width: 150
      },
      [TOTAL_SECTION]: {
        isShow: false
      },
      [SUMMARYTOTAL_SECTION]: {
        isShow: false
      }
    }, {
      field: 'CurrencyName',
      type: 's',
      [HEADER_SECTION]: {
        title: 'currency',
        isShow: true,
        rowSpan: rowSpan
      },
      [MAIN_SECTION]: {
        isShow: true,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].center,
        width: 100
      },
      [TOTAL_SECTION]: {
        isShow: true,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].center
      },
      [SUMMARYTOTAL_SECTION]: {
        isShow: false
      }
    }];

    this._createExpandColumns('TurnOver', 'turnover', rows, 3, false);

    rows.push({
      field: 'TotalTransaction',
      type: 'n',
      [HEADER_SECTION]: {
        title: 'totalTransaction',
        isShow: true,
        rowSpan: rowSpan,
        index_r: HEADER_ROW_INDEX
      },
      [MAIN_SECTION]: {
        isShow: true,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].number,
        width: 130
      },
      [TOTAL_SECTION]: {
        isShow: true,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].number
      },
      [SUMMARYTOTAL_SECTION]: {
        isShow: true,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].number
      }
    }, {
      field: 'CustomerWinLoss',
      type: 'n',
      [HEADER_SECTION]: {
        title: 'customer',
        isShow: true,
        rowSpan: rowSpan,
        index_r: HEADER_ROW_INDEX
      },
      [MAIN_SECTION]: {
        isShow: true,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].decimal,
        width: 200
      },
      [TOTAL_SECTION]: {
        isShow: true,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].decimal
      },
      [SUMMARYTOTAL_SECTION]: {
        isShow: true,
        style: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].decimal
      }
    });

    this._createExpandColumns('LicenseeWL', 'licenseeWL', rows, this.totalColumn - (this.productCount > 1 ? this.productCount + 1 : 1), true);

    return rows;
  }

  _createExpandColumns(name, title, rows, colIndex, hasNegativeStyle) {
    if (this.productCount > 1) {
      rows.push({
        [HEADER_SECTION]: {
          title: title,
          isShow: true,
          rowSpan: this.productCount > 1 ? 1 : rowSpan,
          colSpan: this.productCount + 1
        },
        [MAIN_SECTION]: {
          isShow: false
        },
        [TOTAL_SECTION]: {
          isShow: false
        },
        [SUMMARYTOTAL_SECTION]: {
          isShow: false
        }
      });

      for (let i = 0; i < this.productCount; i++) {
        const code = this.productCodes[i];
        rows.push({
          field: name + code,
          type: 'n',
          [HEADER_SECTION]: {
            title: code,
            isShow: true,
            index_c: colIndex + i,
            index_r: HEADER_ROW_INDEX + 1
          },
          [MAIN_SECTION]: {
            hasNegativeStyle: hasNegativeStyle,
            style: hasNegativeStyle ? {
              positive: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].decimal,
              negative: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].negativeDecimal
            } : _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].decimal,
            isShow: true,
            width: 200
          },
          [TOTAL_SECTION]: {
            hasNegativeStyle: hasNegativeStyle,
            style: hasNegativeStyle ? {
              positive: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].decimal,
              negative: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].negativeDecimal
            } : _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].decimal,
            isShow: true
          },
          [SUMMARYTOTAL_SECTION]: {
            hasNegativeStyle: hasNegativeStyle,
            style: hasNegativeStyle ? {
              positive: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].decimal,
              negative: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].negativeDecimal
            } : _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].decimal,
            isShow: true
          }
        });
      }

      rows.push({
        field: 'Total' + name,
        type: 'n',
        [HEADER_SECTION]: {
          title: 'total',
          isShow: true
        },
        [MAIN_SECTION]: {
          hasNegativeStyle: hasNegativeStyle,
          style: hasNegativeStyle ? {
            positive: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].decimal,
            negative: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].negativeDecimal
          } : _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].decimal,
          isShow: true,
          width: 200
        },
        [TOTAL_SECTION]: {
          hasNegativeStyle: hasNegativeStyle,
          style: hasNegativeStyle ? {
            positive: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].decimal,
            negative: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].negativeDecimal
          } : _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].decimal,
          isShow: true
        },
        [SUMMARYTOTAL_SECTION]: {
          hasNegativeStyle: hasNegativeStyle,
          style: hasNegativeStyle ? {
            positive: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].decimal,
            negative: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].negativeDecimal
          } : _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].decimal,
          isShow: true
        }
      });
    } else {
      rows.push({
        field: name + this.productCodes[0],
        type: 'n',
        [HEADER_SECTION]: {
          title: title,
          isShow: true
        },
        [MAIN_SECTION]: {
          hasNegativeStyle: hasNegativeStyle,
          style: hasNegativeStyle ? {
            positive: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].decimal,
            negative: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].negativeDecimal
          } : _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["bodyCellStyle"].decimal,
          isShow: true,
          width: 200
        },
        [TOTAL_SECTION]: {
          hasNegativeStyle: hasNegativeStyle,
          style: hasNegativeStyle ? {
            positive: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].decimal,
            negative: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].negativeDecimal
          } : _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["totalCellStyle"].decimal,
          isShow: true
        },
        [SUMMARYTOTAL_SECTION]: {
          hasNegativeStyle: hasNegativeStyle,
          style: hasNegativeStyle ? {
            positive: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].decimal,
            negative: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].negativeDecimal
          } : _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["grandTotalCellStyle"].decimal,
          isShow: true
        }
      });
    }
  }

  _createTitle(colSpan) {
    this.mergeConfig.push({
      s: {
        r: TITLE_ROW_INDEX,
        c: 0
      },
      e: {
        r: TITLE_ROW_INDEX,
        c: colSpan - 1
      }
    });
    const address = _lib_excel__WEBPACK_IMPORTED_MODULE_1__["default"].getCellAddress({
      c: 0,
      r: TITLE_ROW_INDEX
    });
    this.worksheet[address] = {
      t: "s",
      v: this.title,
      s: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["titleCellStyle"]
    };
  }

  _createHeader() {
    let nextColumnIndex = 0;
    let nextRowIndex = 0;
    const totalCol = this.configColumn.length;

    for (let i = 0; i < totalCol; i++) {
      const column = this.configColumn[i].header;

      if (column.isShow) {
        nextColumnIndex = column.index_c ? column.index_c : nextColumnIndex;
        nextRowIndex = column.index_r ? column.index_r : nextRowIndex;
        const address = _lib_excel__WEBPACK_IMPORTED_MODULE_1__["default"].getCellAddress({
          c: nextColumnIndex,
          r: nextRowIndex
        });
        const header = _lib_service__WEBPACK_IMPORTED_MODULE_4__["HeaderText"][column.title];
        this.worksheet[address] = {
          t: "s",
          v: header,
          s: _constants_excelStyle__WEBPACK_IMPORTED_MODULE_3__["headerCellStyle"]
        };

        if (column.colSpan > 1 || column.rowSpan > 1) {
          this.mergeConfig.push({
            s: {
              r: nextRowIndex,
              c: nextColumnIndex
            },
            e: {
              r: nextRowIndex + (column.rowSpan || 1) - 1,
              c: nextColumnIndex + (column.colSpan || 1) - 1
            }
          });
        }

        nextColumnIndex += column.colSpan || 1;
      }
    }

    this._createTitle(nextColumnIndex);
  }

  _createSheetData() {
    this._createMainData();

    this._createTotalData();

    this._createSummaryData();
  }

  _createMainData() {
    const totalData = this.gridData.Data.length;

    for (let i = 0; i < totalData; i++) {
      let data = this.gridData.Data[i];
      data.Date = moment__WEBPACK_IMPORTED_MODULE_0___default()(data.Date).format(this.reportBy === _constants_report__WEBPACK_IMPORTED_MODULE_5__["ReportBy"].DAILY ? "MM/DD/YYYY" : "MM/YYYY");
      data.Index = i + 1;

      this._createRowBySection(MAIN_SECTION, 0, this.currentRowIndex, data);

      ++this.currentRowIndex;
    }
  }

  _createTotalData() {
    const totalData = this.gridData.Total.length;
    const totalColSpanConfig = this.colSpanConfig[TOTAL_SECTION];

    this._createMergeTotalDataColumn(this.currentRowIndex, totalData, 0, totalColSpanConfig.colSpan, totalColSpanConfig.text, totalColSpanConfig.style);

    for (let i = 0; i < totalData; i++) {
      const data = this.gridData.Total[i];

      this._createRowBySection(TOTAL_SECTION, totalColSpanConfig.colSpan, this.currentRowIndex, data);

      ++this.currentRowIndex;
    }
  }

  _createSummaryData() {
    const summaryColSpanConfig = this.colSpanConfig[SUMMARYTOTAL_SECTION];
    const keys = Object.keys(this.gridData.SummaryTotal);
    const length = keys.length;

    for (let i = length - 1; i >= 0; i--) {
      const key = keys[i];
      const data = this.gridData.SummaryTotal[key];

      this._createMergeTotalDataColumn(this.currentRowIndex, 1, 0, summaryColSpanConfig.colSpan, summaryColSpanConfig.text + ' ' + key, summaryColSpanConfig.style);

      this._createRowBySection(SUMMARYTOTAL_SECTION, summaryColSpanConfig.colSpan, this.currentRowIndex, data);

      ++this.currentRowIndex;
    }
  }

  _createMergeTotalDataColumn(startRowIndex, rowSpan, startColIndex, colSpan, text, style) {
    const address = _lib_excel__WEBPACK_IMPORTED_MODULE_1__["default"].getCellAddress({
      c: startColIndex,
      r: startRowIndex
    });
    this.worksheet[address] = {
      t: 's',
      v: text,
      s: style
    };
    this.mergeConfig.push({
      s: {
        r: startRowIndex,
        c: startColIndex
      },
      e: {
        r: startRowIndex + rowSpan - 1,
        c: startColIndex + colSpan - 1
      }
    });
  }

  _createRowBySection(section, startColIndex, startRowIndex, data) {
    let nextColumnIndex = startColIndex;
    const totalCol = this.configColumn.length;

    for (let i = 0; i < totalCol; i++) {
      const column = this.configColumn[i];
      const sectionColumn = column[section];

      if (sectionColumn.isShow) {
        nextColumnIndex = sectionColumn.index_c ? sectionColumn.index_c : nextColumnIndex;
        const address = _lib_excel__WEBPACK_IMPORTED_MODULE_1__["default"].getCellAddress({
          c: nextColumnIndex,
          r: startRowIndex
        });
        const value = data[column.field];
        this.worksheet[address] = {
          t: column.type,
          v: value,
          s: sectionColumn.hasNegativeStyle ? value >= 0 ? sectionColumn.style.positive : sectionColumn.style.negative : sectionColumn.style
        };
        ++nextColumnIndex;
      }
    }
  }

  _createExcelConfig() {
    let columnModels = [];
    const totalCol = this.configColumn.length;

    for (let i = 0; i < totalCol; i++) {
      const column = this.configColumn[i][MAIN_SECTION];

      if (column.isShow) {
        columnModels.push({
          wpx: column.width
        });
      }
    }

    const cellStart = _lib_excel__WEBPACK_IMPORTED_MODULE_1__["default"].getCellAddress({
      r: 0,
      c: 0
    });
    const cellEnd = _lib_excel__WEBPACK_IMPORTED_MODULE_1__["default"].getCellAddress({
      r: this.currentRowIndex,
      c: this.totalColumn
    });
    this.worksheet["!merges"] = this.mergeConfig;
    this.worksheet["!ref"] = `${cellStart}:${cellEnd}`;
    this.worksheet['!cols'] = columnModels;
  }

}

/***/ }),

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/lib/service.js":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/lib/service.js ***!
  \*************************************************************************/
/*! exports provided: Url, HeaderText, TotalText, Service */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Url", function() { return Url; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderText", function() { return HeaderText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TotalText", function() { return TotalText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Service", function() { return Service; });
/* harmony import */ var _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");

const Url = 'api/SpecialLicenseeWinLossReport/Index';
const HeaderText = {
  index: '#',
  date: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Date'),
  currency: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Currency'),
  turnover: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Turnover'),
  totalTransaction: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('TotalTransaction'),
  customer: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('CustomerW_L'),
  licenseeWL: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('LicenseeW_L'),
  total: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Total'),
  SB: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('ProductSB'),
  NG: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('ProductNG'),
  CS: 'RNG',
  LC: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('ProductLC')
};
const TotalText = {
  total: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Total'),
  totalIn: _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Totalin')
};

const sortNumber = (a, b) => a - b;

const sortString = (a, b) => a > b ? 1 : a < b ? -1 : 0;

class Service {
  static getReportTitle(fromDate, toDate, currencyId, currencyName, baseCurrency) {
    const viewInByCurrency = currencyId == 0 ? _lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('AllCurrencies') : `${_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Viewin').replace('{0}', baseCurrency.toUpperCase() || currencyName)}`;
    return `${_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('LicenseeWinLoss')}, GMT+8, ${fromDate} - ${toDate} - ${viewInByCurrency}`;
  }

  static showErrorMsg() {
    alert(_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('ErrorProcessingMsg'));
  }

  static sort(data, sortBy, sortOrder) {
    sortBy = sortBy === 'Date' ? 'Ticks' : sortBy;
    let compareFunc = null;

    if (sortBy === 'CurrencyName') {
      if (sortOrder === 'asc') {
        compareFunc = (a, b) => sortString(a[sortBy], b[sortBy]);
      } else {
        compareFunc = (a, b) => sortString(b[sortBy], a[sortBy]);
      }
    } else {
      if (sortOrder === 'asc') {
        compareFunc = (a, b) => sortNumber(a[sortBy], b[sortBy]);
      } else {
        compareFunc = (a, b) => sortNumber(b[sortBy], a[sortBy]);
      }
    }

    data.sort(compareFunc);
  }

}
;

/***/ }),

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/reducers/filterHandlerReducer.js":
/*!*******************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/reducers/filterHandlerReducer.js ***!
  \*******************************************************************************************/
/*! exports provided: reportByList, selectedReportBy, dateRange, xsrfToken, params, reportTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportByList", function() { return reportByList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedReportBy", function() { return selectedReportBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateRange", function() { return dateRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xsrfToken", function() { return xsrfToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "params", function() { return params; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportTitle", function() { return reportTitle; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/pages/speciallicenseewl/actions/types.js");


const reportByList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["GET_REPORTBY"]](state, action) {
    return action.data;
  }

});
const selectedReportBy = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_REPORTBY"]](state, action) {
    return action.data;
  }

});
const dateRange = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_DATE_RANGE"]](state, action) {
    return action.data;
  }

});
const xsrfToken = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["GET_XSRF_TOKEN"]](state, action) {
    return action.data;
  }

});
const params = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_PARAMS"]](state, action) {
    return action.data;
  }

});
const reportTitle = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_REPORT_TITLE"]](state, action) {
    return action.data;
  }

});

/***/ }),

/***/ "./www/js/source/reactpages/pages/speciallicenseewl/reducers/index.js":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/speciallicenseewl/reducers/index.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterHandlerReducer.js */ "./www/js/source/reactpages/pages/speciallicenseewl/reducers/filterHandlerReducer.js");
/* harmony import */ var _reducers_productReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../reducers/productReducer */ "./www/js/source/reactpages/reducers/productReducer.js");
/* harmony import */ var _reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../reducers/currencyReducer */ "./www/js/source/reactpages/reducers/currencyReducer.js");
/* harmony import */ var _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");





/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_1__, _reducers_productReducer__WEBPACK_IMPORTED_MODULE_2__, _reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_3__, _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_4__)));

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

/***/ })

/******/ });
//# sourceMappingURL=speciallicenseewl.chunk.js.map