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
/******/ 		"www/js/build/dev/reactpages/playeradmin/statement": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/Module/PlayerAdmin/statement/components/index.jsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/statement/actions/index.js":
/*!********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/statement/actions/index.js ***!
  \********************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/requestParamAction */ "./www/js/source/reactpages/actions/requestParamAction.js");

var ActionCreators = Object.assign({}, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_0__);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/statement/components/AppContainer.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/statement/components/AppContainer.jsx ***!
  \*******************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/Module/PlayerAdmin/statement/components/FormFilter.jsx");
/* harmony import */ var _DataContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataContent */ "./www/js/source/reactpages/Module/PlayerAdmin/statement/components/DataContent.jsx");




var AppContainer = function AppContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_2__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataContent__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/statement/components/DataContent.jsx":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/statement/components/DataContent.jsx ***!
  \******************************************************************************************/
/*! exports provided: DataContent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataContent", function() { return DataContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/Module/PlayerAdmin/statement/lib/service.js");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _jsroot_components_utils_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/utils/timer */ "./www/js/source/reactpages/components/utils/timer.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var MinimumContentHeight = 200;
var DataContent =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DataContent, _PureComponent);

  function DataContent(props) {
    var _this;

    _classCallCheck(this, DataContent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataContent).call(this, props));
    _this.contentRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.state = {
      src: '',
      height: 0
    };
    _this.resize = _jsroot_components_utils_timer__WEBPACK_IMPORTED_MODULE_5__["default"].debounce(_this._handleResize, 15).bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DataContent, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.requestParam !== this.props.requestParam) {
        this._getUrl(this.props.requestParam);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._getUrl(this.props.requestParam);

      this._handleResize();

      window.addEventListener('resize', this.resize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
    }
  }, {
    key: "_handleResize",
    value: function _handleResize(event) {
      event && event.preventDefault();

      if (this.contentRef.current) {
        var height = window.innerHeight - this.contentRef.current.getBoundingClientRect().top - 20;
        this.setState({
          height: height > MinimumContentHeight ? height : MinimumContentHeight
        });
      }
    }
  }, {
    key: "_updateSrc",
    value: function _updateSrc(src) {
      this.setState({
        src: src
      });
    }
  }, {
    key: "_getUrl",
    value: function _getUrl(param) {
      _lib_service__WEBPACK_IMPORTED_MODULE_3__["default"].getData(param, this._updateSrc.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          src = _this$state.src,
          height = _this$state.height;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          height: height
        },
        ref: this.contentRef
      }, src ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
        frameBorder: "0",
        src: src,
        width: "100%",
        height: "100%"
      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
    }
  }]);

  return DataContent;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  var requestParam = state.requestParam;
  return Object.assign({}, {
    requestParam: requestParam
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(DataContent));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/statement/components/FormFilter.jsx":
/*!*****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/statement/components/FormFilter.jsx ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/statement/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_components_month_picker_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/month-picker/index */ "./www/js/source/reactpages/components/month-picker/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var FormFilter = function FormFilter(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    fromDate: props.requestParam.fromDate,
    toDate: props.requestParam.toDate
  }),
      _useState2 = _slicedToArray(_useState, 2),
      dateRange = _useState2[0],
      setDateRange = _useState2[1];

  var dateConstraint = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].dateConstraint;

  var onSubmit = function onSubmit() {
    var param = Object.assign({}, props.requestParam, dateRange);
    props.setRequestParam(param);
  };

  var onChange = function onChange(dateRange) {
    setDateRange(dateRange);
  };

  var renderMonthPicker = function renderMonthPicker() {
    var monthOption = {
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('ViewDataInMonth')
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_month_picker_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      minDate: dateConstraint.minDate,
      maxDate: dateConstraint.maxDate,
      fromDate: dateRange.fromDate,
      toDate: dateRange.toDate,
      onChange: onChange,
      monthOption: monthOption,
      showDate: false
    });
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-filter"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-5 col-sm-8 col-lg-4 col-xl-3"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, renderMonthPicker())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn btn-submit",
    onClick: onSubmit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Submit"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "circle"
  }), " ", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("PlayerStatementSupportMonths")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "circle"
  }), " ", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("GrandPrizeNote")))));
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

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/statement/components/index.jsx":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/statement/components/index.jsx ***!
  \************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/Module/PlayerAdmin/statement/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/statement/reducers/index.js");
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

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/statement/lib/service.js":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/statement/lib/service.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Service; });
/* harmony import */ var _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/DataService */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var RelativeUrl = 'PlayerStatement/GetStatementUrl';

var Service =
/*#__PURE__*/
function () {
  function Service() {
    _classCallCheck(this, Service);
  }

  _createClass(Service, null, [{
    key: "getData",
    value: function getData(param, callBack) {
      var url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(RelativeUrl);
      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_0__["default"].postData(url, param).then(function (response) {
        callBack && callBack(response.data);
      })["catch"](function (error) {
        console.log(error.message);
        callBack && callBack(null);
      });
    }
  }]);

  return Service;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/statement/reducers/index.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/statement/reducers/index.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/requestParamReducer */ "./www/js/source/reactpages/reducers/requestParamReducer.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign({}, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_1__)));

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





var Day =
/*#__PURE__*/
function (_Component) {
  _inherits(Day, _Component);

  function Day(props, context) {
    var _this;

    _classCallCheck(this, Day);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Day).call(this, props, context));
    _this.state = {
      showDateDrop: false
    };
    return _this;
  }

  _createClass(Day, [{
    key: "_renderOption",
    value: function _renderOption(min, max, value) {
      var _this2 = this;

      var options = [];

      var _loop = function _loop(i) {
        options.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: i,
          onClick: function onClick() {
            return _this2._onChange(i);
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "javascript:;"
        }, i)));
      };

      for (var i = min; i <= max; i++) {
        _loop(i);
      }

      return options;
    }
  }, {
    key: "_onChange",
    value: function _onChange(value) {
      this.props.onChange(parseInt(value, 10));
      this.setState({
        showDateDrop: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var value = this.props.value;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "date"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, this.props.label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "date-content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "date-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "date-picked",
        onClick: function onClick() {
          return _this3.setState({
            showDateDrop: true
          });
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "date-label"
      }, value), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "javascript:;"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "arrow-icon down-arrow"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_1__["default"], {
        isOpening: this.state.showDateDrop,
        onClose: function onClose() {
          return _this3.setState({
            showDateDrop: false
          });
        }
      }, this.state.showDateDrop && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "date-selection-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, this._renderOption(this.props.min, this.props.max, value)))))));
    }
  }]);

  return Day;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(Day, "propTypes", {
  label: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  min: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  max: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
});

_defineProperty(Day, "defaultProps", {
  onChange: function onChange() {}
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






var Month =
/*#__PURE__*/
function (_Component) {
  _inherits(Month, _Component);

  function Month(props, context) {
    var _this;

    _classCallCheck(this, Month);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Month).call(this, props, context));
    var shortMonths = _lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResources(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    var fullMonths = _lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResources(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    _this.shortMonths = shortMonths;
    _this.fullMonths = fullMonths;
    _this.state = {
      expandYear: props.value.year,
      showMonthDrop: false
    };
    return _this;
  }

  _createClass(Month, [{
    key: "_onChange",
    value: function _onChange(value) {
      this.props.onChange(value);
      this.setState({
        showMonthDrop: false
      });
    }
  }, {
    key: "_formatString",
    value: function _formatString(month, year) {
      return this.shortMonths[month] + ' ' + year;
    }
  }, {
    key: "_renderOption",
    value: function _renderOption(min, max, value) {
      var _this2 = this;

      var options = [];

      var _loop = function _loop(i) {
        if (i === _this2.state.expandYear) {
          options.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
            key: i,
            className: "year",
            style: {
              fontWeight: 'bold'
            }
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            href: "javascript:;"
          }, i)));
          var minMonth = i === min.year ? min.month : 0;
          var maxMonth = i === max.year ? max.month : 11;

          var _loop2 = function _loop2(j) {
            var isSelected = i === value.year && j === value.month;
            var valueItem = {
              year: i,
              month: j
            };
            options.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
              key: "".concat(j).concat(i),
              className: "month-option",
              onClick: function onClick() {
                return _this2._onChange(valueItem);
              }
            }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
              href: "javascript:;",
              className: "".concat(isSelected ? 'selected' : '')
            }, _this2.fullMonths[j])));
          };

          for (var j = minMonth; j <= maxMonth; j++) {
            _loop2(j);
          }
        } else {
          options.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
            key: i,
            className: "year",
            onClick: function onClick() {
              return _this2.setState({
                expandYear: i
              });
            }
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            href: "javascript:;"
          }, i)));
        }
      };

      for (var i = min.year; i <= max.year; i++) {
        _loop(i);
      }

      return options;
    }
  }, {
    key: "_getNextMonth",
    value: function _getNextMonth() {
      var month = this.props.value.month + 1;
      var year = this.props.value.year;

      if (month > 11) {
        month = 0;
        year += 1;
      }

      return {
        year: year,
        month: month
      };
    }
  }, {
    key: "_getPrevMonth",
    value: function _getPrevMonth() {
      var month = this.props.value.month - 1;
      var year = this.props.value.year;

      if (month < 0) {
        month = 11;
        year -= 1;
      }

      return {
        year: year,
        month: month
      };
    }
  }, {
    key: "_checkValidMonth",
    value: function _checkValidMonth(month, year) {
      var _this$props = this.props,
          min = _this$props.min,
          max = _this$props.max;
      return year > min.year && year < max.year || year === min.year && month >= min.month || year === max.year && month <= max.month;
    }
  }, {
    key: "_goToMonth",
    value: function _goToMonth(e, value) {
      e.preventDefault();

      if (value.year !== this.state.expandYear) {
        this.setState({
          expandYear: value.year
        });
      }

      this.props.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var nexMonth = this._getNextMonth();

      var preMonth = this._getPrevMonth();

      var validNexMonth = this._checkValidMonth(nexMonth.month, nexMonth.year);

      var validPreMonth = this._checkValidMonth(preMonth.month, preMonth.year);

      var value = this.props.value;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "month"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "label-text"
      }, this.props.label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "month-content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "month-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "month-picked"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "javascript:;",
        className: "prev",
        onClick: function onClick(e) {
          return validPreMonth && _this3._goToMonth(e, preMonth);
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "arrow-icon left-arrow ".concat(validPreMonth ? '' : 'disable')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "month-label",
        onClick: function onClick() {
          return _this3.setState({
            showMonthDrop: true
          });
        }
      }, this._formatString(value.month, value.year)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "javascript:;",
        className: "next",
        onClick: function onClick(e) {
          return validNexMonth && _this3._goToMonth(e, nexMonth);
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "arrow-icon right-arrow ".concat(validNexMonth ? '' : 'disable')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_1__["default"], {
        isOpening: this.state.showMonthDrop,
        onClose: function onClose() {
          return _this3.setState({
            showMonthDrop: false
          });
        }
      }, this.state.showMonthDrop && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "month-selection-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "month-selection"
      }, this._renderOption(this.props.min, this.props.max, value)))))));
    }
  }]);

  return Month;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(Month, "propTypes", {
  label: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  value: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  min: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  max: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func
});

_defineProperty(Month, "defaultProps", {
  label: 'View data in month',
  onChange: function onChange() {}
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







var MonthPicker =
/*#__PURE__*/
function (_Component) {
  _inherits(MonthPicker, _Component);

  function MonthPicker(props) {
    var _this;

    _classCallCheck(this, MonthPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MonthPicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_onMonthChange", function (value) {
      var minDate = value.year === _this.min.year && value.month === _this.min.month ? _this.min.date : 1;
      var maxDate = value.year === _this.max.year && value.month === _this.max.month ? _this.max.date : moment__WEBPACK_IMPORTED_MODULE_3___default()({
        year: value.year,
        month: value.month
      }).daysInMonth();

      _this.setState({
        month: value,
        minDate: minDate,
        maxDate: maxDate,
        from: minDate,
        to: maxDate
      });

      _this.props.onChange({
        fromDate: _this._formatDate(minDate, value.month, value.year),
        toDate: _this._formatDate(maxDate, value.month, value.year)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onFromDateChange", function (value) {
      _this.setState({
        from: value
      });

      _this.props.onChange({
        fromDate: _this._formatDate(value, _this.state.month.month, _this.state.month.year),
        toDate: _this._formatDate(_this.state.to, _this.state.month.month, _this.state.month.year)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onToDateChange", function (value) {
      _this.setState({
        to: value
      });

      _this.props.onChange({
        fromDate: _this._formatDate(_this.state.from, _this.state.month.month, _this.state.month.year),
        toDate: _this._formatDate(value, _this.state.month.month, _this.state.month.year)
      });
    });

    var format = 'MM/DD/YYYY';

    var _minDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(props.minDate, format);

    var _maxDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(props.maxDate, format);

    var min = {
      year: _minDate.year(),
      month: _minDate.month(),
      date: _minDate.date()
    };
    var max = {
      year: _maxDate.year(),
      month: _maxDate.month(),
      date: _maxDate.date()
    };
    _this.min = min;
    _this.max = max;
    var fromDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(props.fromDate, format);
    var toDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(props.toDate, format);
    var currentMonth = {
      year: fromDate.year(),
      month: fromDate.month()
    };
    _this.state = {
      month: currentMonth,
      from: fromDate.date(),
      to: toDate.date()
    };
    return _this;
  }

  _createClass(MonthPicker, [{
    key: "_formatDate",
    value: function _formatDate(date, month, year) {
      return "".concat(month < 9 ? '0' + (month + 1) : month + 1, "/").concat(date < 10 ? '0' + date : date, "/").concat(year);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          month = _this$state.month,
          from = _this$state.from,
          to = _this$state.to;
      var daysInMonth = moment__WEBPACK_IMPORTED_MODULE_3___default()({
        year: month.year,
        month: month.month
      }).daysInMonth();
      var startDate = month.year === this.min.year && month.month === this.min.month ? this.min.date : 1;
      var endDate = month.year === this.max.year && month.month === this.max.month ? this.max.date : daysInMonth;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "month-picker ".concat(this.props.showDate ? '' : 'month-only')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Month__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
        min: this.min,
        max: this.max,
        value: month
      }, this.props.monthOption, {
        onChange: this._onMonthChange
      })), this.props.showDate && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Day__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        min: startDate,
        max: endDate > to ? to : endDate,
        value: from
      }, this.props.fromDateOption, {
        onChange: this._onFromDateChange
      })), this.props.showDate && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Day__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        min: startDate < from ? from : startDate,
        max: endDate,
        value: to
      }, this.props.toDateOption, {
        onChange: this._onToDateChange
      })));
    }
  }]);

  return MonthPicker;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

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
  onChange: function onChange() {},
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
//# sourceMappingURL=statement.chunk.js.map