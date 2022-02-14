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
/******/ 		"www/js/build/dev/reactpages/licenseecontact/licenseecontact": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/licenseecontact/components/index.jsx","lib/common"]);
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

/***/ "./www/js/source/reactpages/actions/types.js":
/*!***************************************************!*\
  !*** ./www/js/source/reactpages/actions/types.js ***!
  \***************************************************/
/*! exports provided: FETCH_DATA, SET_GRID_DATA, SET_SELECTED_PRODUCT, SET_SELECTED_BASECURRENCY, SET_BASECURRENCY_LIST, SET_SELECTED_CURRENCY, TOGGLE_LOADER, CHANGE_IS_EXCLUDE_TEST, USER_GUIDE_CONTENT, SET_DATE_RANGE, GET_DATE_CONSTRAINT, CHANGE_IS_CONVERT_ALL, SET_SELECTED_STATUS, SET_SELECTED_PLATFORM, SET_SELECTED_LIVESTATUS, SET_USERNAME, SET_REQUEST_PARAM, SET_REPORT_TITLE, SET_PAGING_OPTION, SET_SUBSIDIARY_LIST, SET_SUBSIDIARY_SEARCH */
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
/* Live Status  */

const SET_PAGING_OPTION = 'SET_PAGING_OPTION';
/* Subsidiary Search  */

const SET_SUBSIDIARY_LIST = 'SET_SUBSIDIARY_LIST';
const SET_SUBSIDIARY_SEARCH = 'SET_SUBSIDIARY_SEARCH';

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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ac-container"
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




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
      className: "radio-group"
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
const ICON = 'swal-icon';
const errorIconMarkup = () => {
  const icon = `${ICON}--error`;
  const line = `${icon}__line`;
  const markup = `
    <div class="${icon}__x-mark">
      <span class="${line} ${line}--left"></span>
      <span class="${line} ${line}--right"></span>
    </div>
  `;
  return markup;
};
const warningIconMarkup = () => {
  const icon = `${ICON}--warning`;
  return `
    <span class="${icon}__body">
      <span class="${icon}__dot"></span>
    </span>
  `;
};
const successIconMarkup = () => {
  const icon = `${ICON}--success`;
  return `
    <span class="${icon}__line ${icon}__line--long"></span>
    <span class="${icon}__line ${icon}__line--tip"></span>

    <div class="${icon}__ring"></div>
    <div class="${icon}__hide-corners"></div>
  `;
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
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const PREDEFINED_ICONS = ["error", "warning", "success", "info"];
const ICON_CONTENTS = {
  error: Object(_icon__WEBPACK_IMPORTED_MODULE_3__["errorIconMarkup"])(),
  warning: Object(_icon__WEBPACK_IMPORTED_MODULE_3__["warningIconMarkup"])(),
  success: Object(_icon__WEBPACK_IMPORTED_MODULE_3__["successIconMarkup"])()
};
class SweetAlert extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  _buildButtonGroup(buttons) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "al-button-container"
    }, buttons.map((btnItem, index) => {
      const {
        text
      } = btnItem,
            attrs = _objectWithoutProperties(btnItem, ["text"]);

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", _extends({
        key: index,
        type: "button"
      }, attrs), text);
    }));
  }

  _buildIcon() {
    const {
      icon
    } = this.props;
    const className = `${_icon__WEBPACK_IMPORTED_MODULE_3__["ICON"]} ${_icon__WEBPACK_IMPORTED_MODULE_3__["ICON"]}--${icon}`;

    if (PREDEFINED_ICONS.includes(icon)) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: className,
        dangerouslySetInnerHTML: {
          __html: ICON_CONTENTS[icon]
        }
      });
    }

    return null;
  }

  render() {
    const _this$props = this.props,
          {
      buttons,
      children
    } = _this$props,
          props = _objectWithoutProperties(_this$props, ["buttons", "children"]);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sweet-alert"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_popup__WEBPACK_IMPORTED_MODULE_1__["default"], props, this._buildIcon(), children, this._buildButtonGroup(buttons)));
  }

}
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
    vertical: "center",
    wrapText: '1'
  }
};
const bodyDecimalStyle = {
  numFmt: "#,##0.00"
};
const bodyCellStyle = {
  rowspan: bodyTextStyle,
  center: {
    alignment: _objectSpread(_objectSpread({}, bodyTextStyle.alignment), {}, {
      horizontal: "center"
    })
  },
  left: {
    alignment: _objectSpread(_objectSpread({}, bodyTextStyle.alignment), {}, {
      horizontal: "left"
    })
  },
  right: {
    alignment: _objectSpread(_objectSpread({}, bodyTextStyle.alignment), {}, {
      horizontal: "right"
    })
  },
  number: {
    numFmt: "#,##0"
  },
  decimal: bodyDecimalStyle,
  negativeDecimal: _objectSpread(_objectSpread({}, bodyDecimalStyle), {}, {
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

const totalDecimalStyle = _objectSpread(_objectSpread({}, totalTextStyle), {}, {
  numFmt: "#,##0.00"
});

const totalCellStyle = {
  default: totalTextStyle,
  rowspan: _objectSpread(_objectSpread({}, totalTextStyle), {}, {
    alignment: {
      horizontal: "center",
      vertical: "center"
    }
  }),
  center: _objectSpread(_objectSpread({}, totalTextStyle), {}, {
    alignment: {
      vertical: "center",
      horizontal: "center"
    }
  }),
  number: _objectSpread(_objectSpread({}, totalTextStyle), {}, {
    numFmt: "#,##0"
  }),
  decimal: totalDecimalStyle,
  negativeDecimal: _objectSpread(_objectSpread({}, totalDecimalStyle), {}, {
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

const decimalGrandTotalStyle = _objectSpread(_objectSpread({}, grandTotalTextStyle), {}, {
  numFmt: "#,##0.00"
});

const grandTotalCellStyle = {
  default: grandTotalTextStyle,
  rowspan: _objectSpread(_objectSpread({}, grandTotalTextStyle), {}, {
    alignment: {
      horizontal: "center",
      vertical: "center"
    }
  }),
  center: _objectSpread(_objectSpread({}, grandTotalTextStyle), {}, {
    alignment: {
      horizontal: "center"
    }
  }),
  number: _objectSpread(_objectSpread({}, grandTotalTextStyle), {}, {
    numFmt: "#,##0"
  }),
  decimal: decimalGrandTotalStyle,
  negativeDecimal: _objectSpread(_objectSpread({}, decimalGrandTotalStyle), {}, {
    font: {
      bold: true,
      color: {
        rgb: "FF0000"
      }
    }
  }),
  percent: _objectSpread(_objectSpread({}, grandTotalTextStyle), {}, {
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

      const content = _XLSX.utils.sheet_to_json(worksheet);

      const rows = _XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: '',
        blankrows: true
      });

      const result = {
        header: rows && rows.length ? rows[0] : null,
        content
      };
      callBack && callBack(result);
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    const enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"], // lets us dispatch() functions
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
class StringHelper {
  static isEmptyOrWhiteSpace(str) {
    return !str || str.trim().length === 0;
  }

}

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



const predefinedIcons = {
  error: 'error',
  warning: 'warning',
  success: 'success'
};
const defaultSubmitButton = {
  text: _langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Submit'),
  className: 'btn btn-apply'
};
const defaultCancelButton = {
  text: _langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Cancel'),
  className: 'btn'
};
const defaultOkButton = {
  text: _langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('OK'),
  className: 'btn btn-apply'
};
const generateDefaultConfirmOption = (content, onClose, submitProps, cancelProps, icon = predefinedIcons.warning, customOption = {}) => {
  return _objectSpread({
    buttons: [_objectSpread(_objectSpread({}, defaultSubmitButton), submitProps), _objectSpread(_objectSpread({}, defaultCancelButton), cancelProps)],
    icon,
    isShow: true,
    children: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "center-align"
    }, content),
    onClose
  }, customOption);
};
const generateDefaultAlertOption = (content, onClose, onClick, icon = predefinedIcons.success) => {
  return {
    buttons: [{
      text: _langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('OK'),
      className: 'btn btn-apply',
      onClick: onClick || onClose
    }],
    icon,
    isShow: true,
    children: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "center-align"
    }, content),
    onClose
  };
};

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

/***/ "./www/js/source/reactpages/pages/licenseecontact/actions/gridDataAction.js":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/actions/gridDataAction.js ***!
  \**********************************************************************************/
/*! exports provided: fetchContactList, setModificationAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchContactList", function() { return fetchContactList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setModificationAction", function() { return setModificationAction; });
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/licenseecontact/actions/types.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/pages/licenseecontact/lib/service.js");



const fetchContactList = contactName => async dispatch => {
  dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(true));
  const contactList = await _lib_service__WEBPACK_IMPORTED_MODULE_2__["default"].getContactList(contactName);
  dispatch(setContactList(contactList));
  dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(false));
};
const setModificationAction = data => ({
  type: _types__WEBPACK_IMPORTED_MODULE_1__["SET_MODIFICATION_ACTION"],
  data
});

const setContactList = data => ({
  type: _types__WEBPACK_IMPORTED_MODULE_1__["SET_CONTACT_LIST"],
  data
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/actions/index.js":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/actions/index.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gridDataAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gridDataAction */ "./www/js/source/reactpages/pages/licenseecontact/actions/gridDataAction.js");
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = (_objectSpread(_objectSpread({}, _gridDataAction__WEBPACK_IMPORTED_MODULE_0__), _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__));

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/actions/types.js":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/actions/types.js ***!
  \*************************************************************************/
/*! exports provided: SET_CONTACT_LIST, SET_MODIFICATION_ACTION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CONTACT_LIST", function() { return SET_CONTACT_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_MODIFICATION_ACTION", function() { return SET_MODIFICATION_ACTION; });
const SET_CONTACT_LIST = 'SET_CONTACT_LIST';
const SET_MODIFICATION_ACTION = 'SET_MODIFICATION_ACTION';

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/components/AppContainer.jsx":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/components/AppContainer.jsx ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _layouts_AppLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _jsroot_components_popup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/popup */ "./www/js/source/reactpages/components/popup/index.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/licenseecontact/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/pages/licenseecontact/components/FormFilter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/pages/licenseecontact/components/DataGrid.jsx");
/* harmony import */ var _FormEdit__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./FormEdit */ "./www/js/source/reactpages/pages/licenseecontact/components/FormEdit.jsx");
/* harmony import */ var _FormAdd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./FormAdd */ "./www/js/source/reactpages/pages/licenseecontact/components/FormAdd.jsx");
/* harmony import */ var _FormDelete__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./FormDelete */ "./www/js/source/reactpages/pages/licenseecontact/components/FormDelete.jsx");
/* harmony import */ var _lib_contants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../lib/contants */ "./www/js/source/reactpages/pages/licenseecontact/lib/contants.js");
/* harmony import */ var _lib_excel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../lib/excel */ "./www/js/source/reactpages/pages/licenseecontact/lib/excel.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

















const AppContainer = ({
  isLoading,
  currentModificationAction,
  contactList,
  setModificationAction,
  fetchContactList,
  toggleLoader
}) => {
  const _renderModificationPopup = () => {
    const {
      type,
      data
    } = currentModificationAction;

    if (type === _lib_contants__WEBPACK_IMPORTED_MODULE_13__["ModificationActionType"].AddContact) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_popup__WEBPACK_IMPORTED_MODULE_4__["default"], {
        height: 550,
        width: 750,
        isShow: true,
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("AddContact"),
        onClose: _onCloseModificationPopup
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormAdd__WEBPACK_IMPORTED_MODULE_11__["default"], {
        contactId: data,
        afterSuccess: _onCloseModificationPopup,
        toggleLoader: toggleLoader
      }));
    } else if (type === _lib_contants__WEBPACK_IMPORTED_MODULE_13__["ModificationActionType"].EditContact) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_popup__WEBPACK_IMPORTED_MODULE_4__["default"], {
        height: 550,
        width: 750,
        isShow: true,
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("EditContact"),
        onClose: _onCloseModificationPopup
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormEdit__WEBPACK_IMPORTED_MODULE_10__["default"], {
        contactId: data,
        afterSuccess: _onCloseModificationPopup,
        toggleLoader: toggleLoader
      }));
    } else if (type === _lib_contants__WEBPACK_IMPORTED_MODULE_13__["ModificationActionType"].DeleteContact) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormDelete__WEBPACK_IMPORTED_MODULE_12__["default"], _extends({}, data, {
        onClose: _onCloseModificationPopup,
        toggleLoader: toggleLoader
      }));
    } else {}
  };

  const _onCloseModificationPopup = () => {
    setModificationAction(null);
    fetchContactList(null);
  };

  const _exportExcel = () => {
    const excel = new _lib_excel__WEBPACK_IMPORTED_MODULE_14__["default"](contactList);
    excel.export();
  };

  const _renderStickyFooter = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "caret-block"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "icon-excel right",
      onClick: _exportExcel,
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource("ExportToExcel")
    }));
  };

  const _renderFormAction = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-action"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "button-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn btn-add",
      onClick: () => {
        setModificationAction({
          type: _lib_contants__WEBPACK_IMPORTED_MODULE_13__["ModificationActionType"].AddContact
        });
      }
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource('AddContact')))), _renderStickyFooter());
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isLoading: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_8__["default"], null), _renderFormAction(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_9__["default"], null), currentModificationAction && _renderModificationPopup());
};

function mapDispatchToProps(dispatch) {
  const {
    setModificationAction,
    fetchContactList,
    toggleLoader
  } = _actions__WEBPACK_IMPORTED_MODULE_5__["default"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_6__["bindActionCreators"])({
    setModificationAction,
    fetchContactList,
    toggleLoader
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    isLoading,
    currentModificationAction,
    contactList
  } = state;
  return {
    isLoading,
    currentModificationAction,
    contactList
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/components/DataGrid.jsx":
/*!********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/components/DataGrid.jsx ***!
  \********************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/licenseecontact/actions/index.js");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/htmlHelper */ "./www/js/source/reactpages/lib/htmlHelper.js");
/* harmony import */ var _lib_contants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/contants */ "./www/js/source/reactpages/pages/licenseecontact/lib/contants.js");
/* harmony import */ var _lib_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/helper */ "./www/js/source/reactpages/pages/licenseecontact/lib/helper.js");










const MAX_WIDTH_PAGE = 1920;
const DataGrid = ({
  contactList,
  setModificationAction
}) => {
  const MAX_WIDTH = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);

  if (contactList == null) {
    return null;
  }

  if (!contactList.length) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_5__["default"], null);
  }

  const _headers = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(() => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderRow"], {
      style: {
        height: 35
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 10
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"][_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Index]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 40
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"][_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].ContactName]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 30
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"][_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].ContactType]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 30
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"][_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Position]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 30
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"][_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Department]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 40
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"][_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Email]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 40
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"][_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Skype]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 70
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"][_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].ToList]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 70
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"][_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].CcList]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 40
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"][_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Remark]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 30
    }, _lib_contants__WEBPACK_IMPORTED_MODULE_7__["textHeaders"]['Action']));
  }, []);

  const _body = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(() => {
    return contactList.map((contact, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Row"], {
      key: 'contact_' + contact.ContactID
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "center-align"
    }, index + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "left-align",
      title: contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].ContactName]
    }, contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].ContactName]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "center-align"
    }, Object(_lib_helper__WEBPACK_IMPORTED_MODULE_8__["getContactTypeText"])(contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].ContactType])), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "center-align"
    }, contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Position]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "center-align"
    }, contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Department]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "left-align",
      title: contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Email]
    }, contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Email]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "left-align",
      title: contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Skype]
    }, contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Skype]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "left-align"
    }, contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].ToList].map(to => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_6__["decode"])(to)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "left-align"
    }, contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].CcList].map(cc => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_6__["decode"])(cc)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "left-align"
    }, contact[_lib_contants__WEBPACK_IMPORTED_MODULE_7__["fields"].Remark]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "center-align action-cell"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn-default btn-link btn-icon",
      onClick: () => setModificationAction({
        type: _lib_contants__WEBPACK_IMPORTED_MODULE_7__["ModificationActionType"].EditContact,
        data: contact.ContactID
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "material-icons"
    }, "edit")), !contact.IsMain && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn-default btn-link btn-icon delete-icon",
      onClick: () => setModificationAction({
        type: _lib_contants__WEBPACK_IMPORTED_MODULE_7__["ModificationActionType"].DeleteContact,
        data: {
          contactId: contact.ContactID,
          contactName: contact.ContactName
        }
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "material-icons"
    }, "delete")))));
  }, [contactList]);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Table"], {
    minWidth: 1300,
    autoWidth: true,
    maxWidth: MAX_WIDTH,
    autoHeight: true,
    header: _headers,
    body: _body,
    containerPadding: 30,
    shouldResetScrollPosition: true
  });
};

function mapDispatchToProps(dispatch) {
  const {
    setModificationAction
  } = _actions__WEBPACK_IMPORTED_MODULE_4__["default"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setModificationAction
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    contactList
  } = state;
  return {
    contactList
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/components/FormAdd.jsx":
/*!*******************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/components/FormAdd.jsx ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_FormContact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/FormContact */ "./www/js/source/reactpages/pages/licenseecontact/components/base/FormContact.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/pages/licenseecontact/lib/service.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const FormAdd = props => {
  const [contact, setContact] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    Categories: [],
    ContactName: null,
    ContactType: -1,
    Department: null,
    Email: null,
    Position: null,
    Remark: null,
    Skype: null
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    _lib_service__WEBPACK_IMPORTED_MODULE_3__["default"].getLicenseeCategories().then(response => setContact(_objectSpread(_objectSpread({}, contact), {}, {
      Categories: response
    })));
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_base_FormContact__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
    contact: contact,
    setContact: setContact,
    api: _lib_service__WEBPACK_IMPORTED_MODULE_3__["default"].addContact,
    msgConfirm: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('AlertAddLicenseeContact')
  }, props));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(FormAdd));

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/components/FormDelete.jsx":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/components/FormDelete.jsx ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/pages/licenseecontact/lib/service.js");
/* harmony import */ var _jsroot_components_sweet_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/sweet-alert */ "./www/js/source/reactpages/components/sweet-alert/index.jsx");
/* harmony import */ var _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/sweetAlert */ "./www/js/source/reactpages/lib/sweetAlert.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const FormDelete = ({
  contactId,
  contactName,
  onClose,
  toggleLoader
}) => {
  const [sweetAlertOption, setSweetAlertOption] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const handleCloseAlert = () => {
      setSweetAlertOption(null);
      onClose();
    };

    const cancelProps = {
      onClick: handleCloseAlert
    };

    const confirmProps = _objectSpread(_objectSpread({}, _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_4__["defaultOkButton"]), {}, {
      onClick: async () => {
        toggleLoader(true);
        const response = await _lib_service__WEBPACK_IMPORTED_MODULE_2__["default"].deleteContact(contactId);
        toggleLoader(false);
        const {
          IsSuccess,
          Message
        } = response;
        const displayIcon = IsSuccess ? _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_4__["predefinedIcons"].success : _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_4__["predefinedIcons"].error;
        const title = IsSuccess ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Successful") : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Error");
        const alertOpt = Object(_jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_4__["generateDefaultAlertOption"])(Message, () => {
          handleCloseAlert();
          onClose();
        }, null, displayIcon);
        setSweetAlertOption(_objectSpread(_objectSpread({}, alertOpt), {}, {
          title
        }));
      }
    });

    const confirmOption = Object(_jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_4__["generateDefaultConfirmOption"])(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('AlertDeleteLicenseeContact').replace('{0}', contactName), handleCloseAlert, confirmProps, cancelProps, _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_4__["predefinedIcons"].warning, {
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Confirmation")
    });
    setSweetAlertOption(confirmOption);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, sweetAlertOption && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_sweet_alert__WEBPACK_IMPORTED_MODULE_3__["default"], sweetAlertOption));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(FormDelete));

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/components/FormEdit.jsx":
/*!********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/components/FormEdit.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _base_FormContact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/FormContact */ "./www/js/source/reactpages/pages/licenseecontact/components/base/FormContact.jsx");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/pages/licenseecontact/lib/service.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






const FormEdit = (_ref) => {
  let {
    contactId
  } = _ref,
      props = _objectWithoutProperties(_ref, ["contactId"]);

  const [contact, setContact] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    _lib_service__WEBPACK_IMPORTED_MODULE_3__["default"].getContactDetail(contactId).then(response => setContact(response));
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_base_FormContact__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
    contact: contact,
    setContact: setContact,
    api: _lib_service__WEBPACK_IMPORTED_MODULE_3__["default"].editContact,
    msgConfirm: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('AlertUpdateLicenseeContact'),
    hasConfirm: true
  }, props));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(FormEdit));

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/components/FormFilter.jsx":
/*!**********************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/components/FormFilter.jsx ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/licenseecontact/actions/index.js");
/* harmony import */ var _jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/auto-complete */ "./www/js/source/reactpages/components/auto-complete/index.jsx");
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_contants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/contants */ "./www/js/source/reactpages/pages/licenseecontact/lib/contants.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/pages/licenseecontact/lib/service.js");
/* harmony import */ var _lib_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/helper */ "./www/js/source/reactpages/pages/licenseecontact/lib/helper.js");











const FormFilter = ({
  fetchContactList,
  contactList
}) => {
  const [contactName, setContactName] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const [unassignedCategories, setUnassignedCategories] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    fetchContactList(null);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    contactList && _getUnassignedCategories();
  }, [contactList]);

  const _getUnassignedCategories = async () => {
    const _unassignedCategories = await _lib_service__WEBPACK_IMPORTED_MODULE_8__["default"].getUnassignedCategories();

    setUnassignedCategories(_unassignedCategories);
    _unassignedCategories.length && window.dispatchEvent(new Event('resize'));
  };

  const _handleSearch = () => {
    fetchContactList(contactName);
  };

  const _renderCategoryNote = () => {
    if (!unassignedCategories || !unassignedCategories.length) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-5 warning-note"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "text-bold"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('Note') + ': '), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('LicenseeContactCategoryNote')))), unassignedCategories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: 'UnassignedCategory_' + category.CategoryId,
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-5 warning-note"
    }, `- ${Object(_lib_helper__WEBPACK_IMPORTED_MODULE_9__["getCategoryDisplayName"])(category)}`))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-5 warning-note"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('LicenseeContactCategoryRuleNote'))));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "page-filter"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_4__["default"], {
    url: _lib_contants__WEBPACK_IMPORTED_MODULE_7__["Url"].ContactSuggestions,
    queryParamName: 'contactName',
    onSelect: setContactName,
    onInput: setContactName
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn btn-submit",
    onClick: _handleSearch
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('Search')))))), _renderCategoryNote());
};

function mapDispatchToProps(dispatch) {
  const {
    fetchContactList
  } = _actions__WEBPACK_IMPORTED_MODULE_3__["default"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    fetchContactList
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    contactList
  } = state;
  return {
    contactList
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/components/base/FormContact.jsx":
/*!****************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/components/base/FormContact.jsx ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _jsroot_components_radio_RadioGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/radio/RadioGroup */ "./www/js/source/reactpages/components/radio/RadioGroup.jsx");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _lib_contants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/contants */ "./www/js/source/reactpages/pages/licenseecontact/lib/contants.js");
/* harmony import */ var _jsroot_components_sweet_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/sweet-alert */ "./www/js/source/reactpages/components/sweet-alert/index.jsx");
/* harmony import */ var _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/lib/sweetAlert */ "./www/js/source/reactpages/lib/sweetAlert.js");
/* harmony import */ var _jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/lib/stringHelper */ "./www/js/source/reactpages/lib/stringHelper.js");
/* harmony import */ var _lib_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib/helper */ "./www/js/source/reactpages/pages/licenseecontact/lib/helper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













const FormContact = ({
  contact,
  setContact,
  api,
  msgConfirm,
  hasConfirm,
  afterSuccess,
  toggleLoader
}) => {
  const [sweetAlertOption, setSweetAlertOption] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);

  const _isDisabledSubmit = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => !Object(_lib_helper__WEBPACK_IMPORTED_MODULE_10__["validateContact"])(contact), [contact]);

  if (!contact) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_5__["default"], null);
  }

  const _renderGeneralInformation = () => {
    var _contact$Remark;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "general-information col-12 col-md-6 col-sm-6 col-lg-6 col-xl-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "title col-12"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('GeneralInformation'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "col-5 label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("ContactType"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      class: "required"
    }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-7"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_2__["default"], {
      instanceId: "ContactTypeOptions",
      className: !_lib_helper__WEBPACK_IMPORTED_MODULE_10__["contactValidationHandler"][_lib_contants__WEBPACK_IMPORTED_MODULE_6__["fields"].ContactType](contact.ContactType) ? 'select-highlight' : '',
      isSearchable: false,
      value: contact.ContactType,
      options: _lib_contants__WEBPACK_IMPORTED_MODULE_6__["ContactTypeOptions"],
      onChange: item => setContact(_objectSpread(_objectSpread({}, contact), {}, {
        ContactType: item.value
      }))
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "col-5 label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      class: "required"
    }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-7"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      id: "Name",
      name: "Name",
      className: `input-text ${_jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_9__["default"].isEmptyOrWhiteSpace(contact.ContactName) ? 'input-highlight' : ''}`,
      maxLength: 50,
      value: contact.ContactName,
      onChange: event => setContact(_objectSpread(_objectSpread({}, contact), {}, {
        ContactName: event.target.value
      }))
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "col-5 label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Position"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      class: "required"
    }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-7"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      id: "Position",
      name: "Position",
      className: `input-text ${_jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_9__["default"].isEmptyOrWhiteSpace(contact.Position) ? 'input-highlight' : ''}`,
      maxLength: 50,
      value: contact.Position,
      onChange: event => setContact(_objectSpread(_objectSpread({}, contact), {}, {
        Position: event.target.value
      }))
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "col-5 label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Department"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      class: "required"
    }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-7"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      id: "Department",
      name: "Department",
      className: `input-text ${_jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_9__["default"].isEmptyOrWhiteSpace(contact.Department) ? 'input-highlight' : ''}`,
      maxLength: 50,
      value: contact.Department,
      onChange: event => setContact(_objectSpread(_objectSpread({}, contact), {}, {
        Department: event.target.value
      }))
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "col-5 label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      class: "required"
    }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-7"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "email",
      id: "Email",
      name: "Email",
      className: `input-text ${!_lib_helper__WEBPACK_IMPORTED_MODULE_10__["contactValidationHandler"][_lib_contants__WEBPACK_IMPORTED_MODULE_6__["fields"].Email](contact.Email) ? 'input-highlight' : ''}`,
      maxLength: 50,
      value: contact.Email,
      onChange: event => setContact(_objectSpread(_objectSpread({}, contact), {}, {
        Email: event.target.value
      }))
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "col-5 label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Skype"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      class: "required"
    }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-7"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      id: "Skype",
      name: "Skype",
      className: `input-text ${_jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_9__["default"].isEmptyOrWhiteSpace(contact.Skype) ? 'input-highlight' : ''}`,
      maxLength: 50,
      value: contact.Skype,
      onChange: event => setContact(_objectSpread(_objectSpread({}, contact), {}, {
        Skype: event.target.value
      }))
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "col-5 label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Remark"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
      id: "Remark",
      name: "Remark",
      rows: 4,
      maxLength: 300,
      value: contact.Remark,
      onChange: event => setContact(_objectSpread(_objectSpread({}, contact), {}, {
        Remark: event.target.value
      }))
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "character-remain"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('CharactersRemaining').replace('{0}', 300 - (((_contact$Remark = contact.Remark) === null || _contact$Remark === void 0 ? void 0 : _contact$Remark.length) || 0))))));
  };

  const _renderCategoriesSelection = () => {
    const existedCategories = !!contact.Categories.length;
    const isInvalid = !contact.Categories.some(category => category.RecipientType !== null);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "category-selection col-12 col-md-6 col-sm-6 col-lg-6 col-xl-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "title col-12"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('CategoriesSelection')), existedCategories ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 info-note"
    }, "* ", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('AtLeastOneCategoryMustBeSelected')) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 warning-note"
    }, "* ", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('TheLicenseeHasNoAssignedCategory')))), existedCategories && _renderCategoryAllSelection(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: isInvalid ? "invalid" : ""
    }, existedCategories && contact.Categories.map(_renderCategorySelection)));
  };

  const _renderCategoryAllSelection = () => {
    const isCheckedAll = contact.Categories.every(_ => _.RecipientType === _lib_contants__WEBPACK_IMPORTED_MODULE_6__["RecipientType"].To) || contact.Categories.every(_ => _.RecipientType === _lib_contants__WEBPACK_IMPORTED_MODULE_6__["RecipientType"].Cc);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_3__["default"], {
      id: "category-selection-all",
      checked: isCheckedAll,
      onChange: checked => {
        contact.Categories.forEach(category => {
          category.RecipientType = checked ? _lib_contants__WEBPACK_IMPORTED_MODULE_6__["RecipientType"].To : null;
        });
        setContact(_objectSpread({}, contact));
      },
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('AllCategories')
    })), isCheckedAll && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_radio_RadioGroup__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: "category-selection-group-radio-all",
      value: contact.Categories[0].RecipientType,
      options: _lib_contants__WEBPACK_IMPORTED_MODULE_6__["RecipientTypeOptions"],
      onChange: selectedRecipientType => {
        contact.Categories.forEach(category => {
          category.RecipientType = selectedRecipientType;
        });
        setContact(_objectSpread({}, contact));
      }
    })));
  };

  const _renderCategorySelection = category => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_3__["default"], {
      id: "category-selection" + category.CategoryId,
      checked: category.RecipientType !== null,
      onChange: checked => {
        category.RecipientType = checked ? _lib_contants__WEBPACK_IMPORTED_MODULE_6__["RecipientType"].To : null;
        setContact(_objectSpread({}, contact));
      },
      label: Object(_lib_helper__WEBPACK_IMPORTED_MODULE_10__["getCategoryDisplayName"])(category)
    })), category.RecipientType !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_radio_RadioGroup__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: 'category-selection-group-radio' + category.CategoryId + '_' + category.RecipientType,
      name: "category-selection-group-radio" + category.CategoryId,
      value: category.RecipientType,
      options: _lib_contants__WEBPACK_IMPORTED_MODULE_6__["RecipientTypeOptions"],
      onChange: selectedRecipientType => {
        category.RecipientType = selectedRecipientType;
        setContact(_objectSpread({}, contact));
      }
    })));
  };

  const handleCloseAlert = () => {
    setSweetAlertOption(null);
  };

  const _handleSubmit = () => {
    if (!Object(_lib_helper__WEBPACK_IMPORTED_MODULE_10__["validateContact"])(contact)) {
      return;
    }

    const unassignedCategories = _getUnassignedCategories(contact.Categories);

    const hasUnassignedCategories = unassignedCategories.length > 0;

    if (hasConfirm) {
      setSweetAlertOption(Object(_jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_8__["generateDefaultConfirmOption"])(msgConfirm, handleCloseAlert, _objectSpread(_objectSpread({}, _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_8__["defaultOkButton"]), {}, {
        onClick: hasUnassignedCategories ? () => _handleUnassignedCategoriesWarning(unassignedCategories) : _handleCallApi
      }), {
        onClick: handleCloseAlert
      }, _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_8__["predefinedIcons"].warning, {
        width: 300,
        height: 200,
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Confirmation")
      }));
    } else if (hasUnassignedCategories) {
      _handleUnassignedCategoriesWarning(unassignedCategories);
    } else {
      _handleCallApi();
    }

    2;
  };

  const _handleUnassignedCategoriesWarning = unassignedCategories => {
    const warningMsg = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "warning-title"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("NotReceiveNotificationOnCategoriesWarning")), unassignedCategories.map(_ => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, _)));
    const confirmOption = Object(_jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_8__["generateDefaultConfirmOption"])(warningMsg, handleCloseAlert, _objectSpread(_objectSpread({}, _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_8__["defaultOkButton"]), {}, {
      onClick: _handleCallApi
    }), {
      onClick: handleCloseAlert
    }, null, {
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Confirmation"),
      height: 38 + 48 + unassignedCategories.length * 28 + 50
    });
    setSweetAlertOption(confirmOption);
  };

  const _handleCallApi = async () => {
    toggleLoader(true);
    const response = await api(contact);
    toggleLoader(false);
    const {
      IsSuccess,
      Message
    } = response;
    const displayIcon = IsSuccess ? _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_8__["predefinedIcons"].success : _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_8__["predefinedIcons"].error;
    const title = IsSuccess ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Successful") : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("Error");
    const alertOpt = Object(_jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_8__["generateDefaultAlertOption"])(Message, () => {
      handleCloseAlert();
      IsSuccess && afterSuccess();
    }, null, displayIcon);
    setSweetAlertOption(_objectSpread(_objectSpread({}, alertOpt), {}, {
      title
    }));
  };

  const _getUnassignedCategories = categories => {
    return categories.filter(category => category.RecipientType === null).map(_lib_helper__WEBPACK_IMPORTED_MODULE_10__["getCategoryDisplayName"]);
  };

  const _renderSubmit = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-bottom col-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "button-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn btn-submit",
      disabled: _isDisabledSubmit,
      onClick: _handleSubmit
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Submit'))));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-edit row"
  }, _renderGeneralInformation(), _renderCategoriesSelection(), _renderSubmit(), sweetAlertOption && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"], sweetAlertOption));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(FormContact));

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/components/index.jsx":
/*!*****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/components/index.jsx ***!
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
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/pages/licenseecontact/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers */ "./www/js/source/reactpages/pages/licenseecontact/reducers/index.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/store */ "./www/js/source/reactpages/lib/store.js");






const defaultState = Object.assign({}, window.initialState, {});
const store = _lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);
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

/***/ "./www/js/source/reactpages/pages/licenseecontact/lib/contants.js":
/*!************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/lib/contants.js ***!
  \************************************************************************/
/*! exports provided: Url, ModificationActionType, ContactType, RecipientType, ContactTypeOptions, RecipientTypeOptions, fields, textHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Url", function() { return Url; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModificationActionType", function() { return ModificationActionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactType", function() { return ContactType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecipientType", function() { return RecipientType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactTypeOptions", function() { return ContactTypeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecipientTypeOptions", function() { return RecipientTypeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textHeaders", function() { return textHeaders; });
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");


const Url = {
  LicenseeCategories: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl("LicenseeContact/GetCategories"),
  ContactSuggestions: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl("LicenseeContact/GetSuggestions"),
  ContactList: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl("LicenseeContact/GetList"),
  ContactDetail: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl("LicenseeContact/GetDetail"),
  ContactAdd: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl("LicenseeContact/Add"),
  ContactEdit: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl("LicenseeContact/Edit"),
  ContactDelete: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl("LicenseeContact/Delete")
};
const ModificationActionType = {
  AddContact: 1,
  EditContact: 2,
  DeleteContact: 3
};
const ContactType = {
  Individual: 0,
  Group: 1
};
const RecipientType = {
  To: 0,
  Cc: 1
};
const ContactTypeOptions = [{
  value: ContactType.Individual,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Individual')
}, {
  value: ContactType.Group,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Group')
}];
const RecipientTypeOptions = [{
  value: RecipientType.To,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('ToList')
}, {
  value: RecipientType.Cc,
  label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('CcList')
}];
const fields = {
  Index: 'Index',
  ContactName: 'ContactName',
  ContactType: 'ContactType',
  Position: 'Position',
  Department: 'Department',
  Email: 'Email',
  Skype: 'Skype',
  ToList: 'ToList',
  CcList: 'CcList',
  Remark: 'Remark'
};
const textHeaders = {
  [fields.Index]: '#',
  [fields.ContactName]: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Name'),
  [fields.ContactType]: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('ContactType'),
  [fields.Position]: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Position'),
  [fields.Department]: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Department'),
  [fields.Email]: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Email'),
  [fields.Skype]: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Skype'),
  [fields.ToList]: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('ToList'),
  [fields.CcList]: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('CcList'),
  [fields.Remark]: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Remark'),
  Action: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Action')
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/lib/excel.js":
/*!*********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/lib/excel.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LicenseeContactExcel; });
/* harmony import */ var _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/excel */ "./www/js/source/reactpages/lib/excel.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/constants/excelStyle */ "./www/js/source/reactpages/constants/excelStyle.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper */ "./www/js/source/reactpages/pages/licenseecontact/lib/helper.js");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contants */ "./www/js/source/reactpages/pages/licenseecontact/lib/contants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const TITLE_ROW_INDEX = 0;
const HEADER_ROW_INDEX = 1;
const DATA_ROW_INDEX = 3;
const MAIN_SECTION_STYLE = 'mainSectionStyle';
class LicenseeContactExcel {
  constructor(data) {
    this.data = data;
    this.title = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('LicenseeContacts');
    this.worksheet = {};
    this.currentRowIndex = DATA_ROW_INDEX;
    this.columnConfigs = this._getcolumnConfigs();
    this.mergeConfig = [];
  }

  export(onFinished) {
    if (!this.data || !this.data.length) {
      alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('NoInfo'));
      return;
    }

    _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].process(() => {
      this._createTitle();

      this._createHeader();

      this._createBodyData();

      this._createExcelConfig();

      _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].export(this.worksheet, 'LicenseeContacts');
      onFinished && onFinished();
    });
  }

  _createTitle() {
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
    const address = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
      c: 0,
      r: TITLE_ROW_INDEX
    });
    this.worksheet[address] = {
      t: 's',
      v: this.title,
      s: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["titleCellStyle"]
    };
  }

  _createHeader() {
    const totalColumn = this.columnConfigs.length;

    for (let i = 0; i < totalColumn; i++) {
      const field = this.columnConfigs[i].field;
      const address = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
        c: i,
        r: HEADER_ROW_INDEX
      });
      this.worksheet[_jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
        c: i,
        r: HEADER_ROW_INDEX
      })] = {
        t: "s",
        v: _contants__WEBPACK_IMPORTED_MODULE_4__["textHeaders"][field] || '',
        s: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["headerCellStyle"]
      };
      this.worksheet[_jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
        c: i,
        r: HEADER_ROW_INDEX + 1
      })] = {
        t: "s",
        v: '',
        s: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["headerCellStyle"]
      };
      this.mergeConfig.push({
        s: {
          r: HEADER_ROW_INDEX,
          c: i
        },
        e: {
          r: HEADER_ROW_INDEX + 1,
          c: i
        }
      });
    }
  }

  _createBodyData() {
    const totalColumn = this.columnConfigs.length;

    for (let i = 0; i < this.data.length; i++) {
      const item = _objectSpread(_objectSpread({}, this.data[i]), {}, {
        [_contants__WEBPACK_IMPORTED_MODULE_4__["fields"].Index]: i + 1
      });

      for (let j = 0; j < totalColumn; j++) {
        const address = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
          c: j,
          r: this.currentRowIndex
        });
        this.worksheet[address] = this._buildDataRow(item, j);
      }

      this.currentRowIndex++;
    }
  }

  _buildDataRow(item, colIndex) {
    const columnConfig = this.columnConfigs[colIndex];
    let value = item[columnConfig.field];

    if (columnConfig.field === _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].ToList || columnConfig.field === _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].CcList) {
      value = value.join('\n');
    } else if (columnConfig.field === _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].ContactType) {
      value = Object(_helper__WEBPACK_IMPORTED_MODULE_3__["getContactTypeText"])(value);
    }

    const displayedValue = this._shouldSetEmpty(value) ? '' : value;
    return {
      t: _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellType(displayedValue),
      v: displayedValue,
      s: columnConfig[MAIN_SECTION_STYLE]
    };
  }

  _shouldSetEmpty(value) {
    return value === undefined || value === null;
  }

  _createExcelConfig() {
    const cellStart = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
      r: 0,
      c: 0
    });
    const cellEnd = _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].getCellAddress({
      r: this.currentRowIndex,
      c: this.columnConfigs.length - 1
    });
    this.worksheet['!merges'] = this.mergeConfig;
    this.worksheet["!ref"] = `${cellStart}:${cellEnd}`;
    this.worksheet['!cols'] = this.columnConfigs.map(x => ({
      wpx: x.width
    }));
  }

  _getcolumnConfigs() {
    var result = [{
      field: _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].Index,
      [MAIN_SECTION_STYLE]: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["bodyCellStyle"].center,
      width: 50
    }, {
      field: _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].ContactName,
      [MAIN_SECTION_STYLE]: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["bodyCellStyle"].left,
      width: 150
    }, {
      field: _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].ContactType,
      [MAIN_SECTION_STYLE]: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["bodyCellStyle"].center,
      width: 100
    }, {
      field: _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].Position,
      [MAIN_SECTION_STYLE]: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["bodyCellStyle"].center,
      width: 150
    }, {
      field: _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].Department,
      [MAIN_SECTION_STYLE]: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["bodyCellStyle"].center,
      width: 150
    }, {
      field: _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].Email,
      [MAIN_SECTION_STYLE]: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["bodyCellStyle"].left,
      width: 150
    }, {
      field: _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].Skype,
      [MAIN_SECTION_STYLE]: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["bodyCellStyle"].left,
      width: 150
    }, {
      field: _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].ToList,
      [MAIN_SECTION_STYLE]: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["bodyCellStyle"].left,
      width: 200
    }, {
      field: _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].CcList,
      [MAIN_SECTION_STYLE]: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["bodyCellStyle"].left,
      width: 200
    }, {
      field: _contants__WEBPACK_IMPORTED_MODULE_4__["fields"].Remark,
      [MAIN_SECTION_STYLE]: _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_2__["bodyCellStyle"].left,
      width: 200
    }];
    return result;
  }

}

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/lib/helper.js":
/*!**********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/lib/helper.js ***!
  \**********************************************************************/
/*! exports provided: contactValidationHandler, getContactTypeText, validateContact, getCategoryDisplayName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contactValidationHandler", function() { return contactValidationHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContactTypeText", function() { return getContactTypeText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateContact", function() { return validateContact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCategoryDisplayName", function() { return getCategoryDisplayName; });
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contants */ "./www/js/source/reactpages/pages/licenseecontact/lib/contants.js");
/* harmony import */ var _jsroot_lib_validationHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/validationHelper */ "./www/js/source/reactpages/lib/validationHelper.js");
/* harmony import */ var _jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/stringHelper */ "./www/js/source/reactpages/lib/stringHelper.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const contactValidationHandler = {
  [_contants__WEBPACK_IMPORTED_MODULE_0__["fields"].Email]: value => Object(_jsroot_lib_validationHelper__WEBPACK_IMPORTED_MODULE_1__["validateEmail"])(value),
  [_contants__WEBPACK_IMPORTED_MODULE_0__["fields"].ContactType]: value => value === _contants__WEBPACK_IMPORTED_MODULE_0__["ContactType"].Individual || value === _contants__WEBPACK_IMPORTED_MODULE_0__["ContactType"].Group,
  ['Categories']: value => value.length && value.some(category => category.RecipientType !== null)
};
const getContactTypeText = contactType => {
  var _ContactTypeOptions$f;

  return ((_ContactTypeOptions$f = _contants__WEBPACK_IMPORTED_MODULE_0__["ContactTypeOptions"].find(_ => _.value === contactType)) === null || _ContactTypeOptions$f === void 0 ? void 0 : _ContactTypeOptions$f.label) || '';
};
const validateContact = contact => {
  if (!contact) {
    return false;
  }

  const {
    Remark,
    ContactID
  } = contact,
        validateFields = _objectWithoutProperties(contact, ["Remark", "ContactID"]);

  const isInvalid = Object.keys(validateFields).some(field => contactValidationHandler[field] ? !contactValidationHandler[field](contact[field]) : _jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_2__["default"].isEmptyOrWhiteSpace(contact[field]));
  return !isInvalid;
};
const getCategoryDisplayName = category => _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].currentLanguage === _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].languageKeys.zhCN ? category.CategoryNameCN || category.CategoryName : category.CategoryName;

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/lib/service.js":
/*!***********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/lib/service.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApiService; });
/* harmony import */ var _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/DataService */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contants */ "./www/js/source/reactpages/pages/licenseecontact/lib/contants.js");



class ApiService {
  static async getContactList(contactName) {
    try {
      const response = await _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_0__["default"].postData(_contants__WEBPACK_IMPORTED_MODULE_2__["Url"].ContactList, {
        contactName
      });

      if (response.status === 200 && response.data.IsSuccess) {
        return response.data.Data;
      }
    } catch (e) {
      console.log(e);
    }

    return [];
  }

  static async getContactDetail(contactId) {
    try {
      const response = await _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_0__["default"].postData(_contants__WEBPACK_IMPORTED_MODULE_2__["Url"].ContactDetail, {
        contactId
      });

      if (response.status === 200 && response.data.IsSuccess) {
        return response.data.Data;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  static async getLicenseeCategories() {
    try {
      const response = await _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_0__["default"].postData(_contants__WEBPACK_IMPORTED_MODULE_2__["Url"].LicenseeCategories, {});

      if (response.status === 200 && response.data.IsSuccess) {
        return response.data.Data;
      }
    } catch (e) {
      console.log(e);
    }

    return [];
  }

  static async addContact(contact) {
    try {
      const response = await _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_0__["default"].postData(_contants__WEBPACK_IMPORTED_MODULE_2__["Url"].ContactAdd, contact);

      if (response.status === 200) {
        const {
          IsSuccess,
          ErrorCode
        } = response.data;
        return {
          IsSuccess,
          Message: IsSuccess ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('AddSuccess') : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('LicenseeContactAddErrorMsg_' + ErrorCode)
        };
      }
    } catch (e) {
      console.log(e);
    }

    return {
      IsSuccess: false,
      Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('HttpError_Default')
    };
  }

  static async editContact(contact) {
    try {
      const response = await _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_0__["default"].postData(_contants__WEBPACK_IMPORTED_MODULE_2__["Url"].ContactEdit, contact);

      if (response.status === 200) {
        const {
          IsSuccess,
          ErrorCode
        } = response.data;
        return {
          IsSuccess,
          Message: IsSuccess ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('UpdateSuccess') : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('LicenseeContactEditErrorMsg_' + ErrorCode)
        };
      }
    } catch (e) {
      console.log(e);
    }

    return {
      IsSuccess: false,
      Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('HttpError_Default')
    };
  }

  static async deleteContact(contactId) {
    try {
      const response = await _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_0__["default"].postData(_contants__WEBPACK_IMPORTED_MODULE_2__["Url"].ContactDelete, {
        contactId
      });

      if (response.status === 200) {
        const {
          IsSuccess,
          ErrorCode
        } = response.data;
        return {
          IsSuccess,
          Message: IsSuccess ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('DeleteSuccess') : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('LicenseeContactDeleteErrorMsg_' + ErrorCode)
        };
      }
    } catch (e) {
      console.log(e);
    }

    return {
      IsSuccess: false,
      Message: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('HttpError_Default')
    };
  }

  static async getUnassignedCategories() {
    const [contactList, categories] = await Promise.all([this.getContactList(null), this.getLicenseeCategories()]);
    const unassignedCategories = categories.filter(category => {
      const assigned = contactList.some(contact => contact.ToListId.some(to => to === category.CategoryId) || contact.CcListId.some(cc => cc === category.CategoryId));
      return !assigned;
    });
    return unassignedCategories;
  }

}

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/reducers/gridDataReducer.js":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/reducers/gridDataReducer.js ***!
  \************************************************************************************/
/*! exports provided: contactList, currentModificationAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contactList", function() { return contactList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentModificationAction", function() { return currentModificationAction; });
/* harmony import */ var _jsroot_lib_createReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/pages/licenseecontact/actions/types.js");


const contactList = Object(_jsroot_lib_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_CONTACT_LIST"]](prevState, action) {
    return action.data;
  }

});
const currentModificationAction = Object(_jsroot_lib_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_MODIFICATION_ACTION"]](prevState, action) {
    return action.data;
  }

});

/***/ }),

/***/ "./www/js/source/reactpages/pages/licenseecontact/reducers/index.js":
/*!**************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/licenseecontact/reducers/index.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _gridDataReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gridDataReducer */ "./www/js/source/reactpages/pages/licenseecontact/reducers/gridDataReducer.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(_objectSpread(_objectSpread({}, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_1__), _gridDataReducer__WEBPACK_IMPORTED_MODULE_2__)));

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

/***/ })

/******/ });
//# sourceMappingURL=licenseecontact.chunk.js.map