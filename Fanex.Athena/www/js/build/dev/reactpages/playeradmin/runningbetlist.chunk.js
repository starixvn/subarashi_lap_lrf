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
/******/ 		"www/js/build/dev/reactpages/playeradmin/runningbetlist": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/index.jsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/actions/index.js":
/*!**************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/actions/index.js ***!
  \**************************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/requestParamAction */ "./www/js/source/reactpages/actions/requestParamAction.js");


var ActionCreators = Object.assign({}, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_1__);

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/AppContainer.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/AppContainer.jsx ***!
  \*************************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index */ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/actions/index.js");
/* harmony import */ var _jsroot_layouts_betlist_BetListLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/layouts/betlist/BetListLayout */ "./www/js/source/reactpages/layouts/betlist/BetListLayout.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/FormFilter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/DataGrid.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/lib/service.js");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
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














var AppContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(AppContainer, _Component);

  function AppContainer(props) {
    var _this;

    _classCallCheck(this, AppContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppContainer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getResource", function (key) {
      return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource(key);
    });

    _defineProperty(_assertThisInitialized(_this), "formatDateString", function (dateString) {
      var date = new Date(dateString);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return "".concat(month < 10 ? '0' + month : month, "/").concat(day < 10 ? '0' + day : day, "/").concat(date.getFullYear());
    });

    _defineProperty(_assertThisInitialized(_this), "beforeShow", function () {
      _this.props.toggleLoader(true);
    });

    _defineProperty(_assertThisInitialized(_this), "afterShow", function () {
      _this.props.toggleLoader(false);
    });

    _this.title = _lib_service__WEBPACK_IMPORTED_MODULE_9__["default"].getReportTitle(props.requestParam.Currency);
    return _this;
  }

  _createClass(AppContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_11__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_betlist_BetListLayout__WEBPACK_IMPORTED_MODULE_4__["default"], {
        pageName: "PlayerAdmin",
        rootUrl: _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_8__["default"].getRootUrl(),
        getResourceFunc: this.getResource,
        formatDateStringFunc: this.formatDateString,
        baseCurrency: "",
        beforeShowFunc: this.beforeShow,
        afterShowFunc: this.afterShow
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_10__["default"], {
        isLoading: this.props.isLoading
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "betlist-container result-content"
      }, this.title && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_12__["default"], {
        content: this.title
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_6__["default"], null))));
    }
  }]);

  return AppContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapDispatchToProps(dispatch) {
  var toggleLoader = _actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].toggleLoader;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    toggleLoader: toggleLoader
  }, dispatch);
}

function mapStateToProps(state) {
  var isLoading = state.isLoading,
      requestParam = state.requestParam;
  return Object.assign({}, {
    isLoading: isLoading,
    requestParam: requestParam
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/DataGrid.jsx":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/DataGrid.jsx ***!
  \*********************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/actions/index.js");
/* harmony import */ var _jsroot_components_betlist_BetListDataGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/betlist/BetListDataGrid */ "./www/js/source/reactpages/components/betlist/BetListDataGrid.jsx");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/lib/service.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
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









var DataGrid =
/*#__PURE__*/
function (_Component) {
  _inherits(DataGrid, _Component);

  function DataGrid(props) {
    var _this;

    _classCallCheck(this, DataGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataGrid).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getHeaderName", function (column) {
      return _this.headerText[column];
    });

    _defineProperty(_assertThisInitialized(_this), "getResource", function (key) {
      return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource(key);
    });

    _defineProperty(_assertThisInitialized(_this), "afterLoad", function () {
      _this.props.toggleLoader(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onSort", function (sortBy, sortOrder) {
      var param = Object.assign({}, _this.props.requestParam, {
        SortBy: sortBy,
        SortOrder: sortOrder
      });

      _this._getData(param);

      _this.props.setRequestParam(param);
    });

    _defineProperty(_assertThisInitialized(_this), "onPaging", function (index, size) {
      var param = Object.assign({}, _this.props.requestParam, {
        PageIndex: index,
        PageSize: size
      });

      _this._getData(param);

      _this.props.setRequestParam(param);
    });

    _this.headerText = _lib_service__WEBPACK_IMPORTED_MODULE_6__["default"].getHeaderText();
    _this.totalText = _lib_service__WEBPACK_IMPORTED_MODULE_6__["default"].getTotalText();
    _this.state = {
      data: null,
      total: null,
      totalRows: 0
    };
    return _this;
  }

  _createClass(DataGrid, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.requestParam.TimeStamp !== this.props.requestParam.TimeStamp) {
        this._getData(this.props.requestParam);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._getData(this.props.requestParam);
    }
  }, {
    key: "_updateState",
    value: function _updateState(data, total, totalRows) {
      this.setState({
        data: data,
        total: total,
        totalRows: totalRows
      });
      this.props.toggleLoader(false);
    }
  }, {
    key: "_getData",
    value: function _getData(param) {
      this.props.toggleLoader(true);
      _lib_service__WEBPACK_IMPORTED_MODULE_6__["default"].getData(param, this._updateState.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          data = _this$state.data,
          total = _this$state.total,
          totalRows = _this$state.totalRows;
      var requestParam = this.props.requestParam;
      var pageOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: totalRows,
        PageList: [50, 100, 200, 300, 400, 500, 1000, 2000]
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_betlist_BetListDataGrid__WEBPACK_IMPORTED_MODULE_4__["default"], {
        isPaging: true,
        pageOption: pageOption,
        onPaging: this.onPaging,
        getHeaderNameFunc: this.getHeaderName,
        columns: ['Index', 'RefNo', 'TransTime', 'Choice', 'Odds', 'OddsType', 'Stake', 'Status', 'Platform', 'Live'],
        columnWidths: [40, 110, 150, 400, 70, 70, 100, 80, 80, 80],
        sortableColumns: ['Stake'],
        totalColumns: ['Stake'],
        columnAlignments: ['center-align', 'center-align', 'center-align', 'right-align', 'right-align', 'right-align', 'right-align', 'center-align', 'center-align', 'center-align'],
        data: data,
        total: total,
        totalText: this.totalText,
        afterLoad: this.afterLoad,
        onSort: this.onSort,
        adjustedHeight: -20,
        getResourceFunc: this.getResource
      });
    }
  }]);

  return DataGrid;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapDispatchToProps(dispatch) {
  var toggleLoader = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].toggleLoader,
      setRequestParam = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setRequestParam;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    toggleLoader: toggleLoader,
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
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/FormFilter.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/FormFilter.jsx ***!
  \***********************************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/actions/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/service */ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/lib/service.js");
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







var FormFilter =
/*#__PURE__*/
function (_Component) {
  _inherits(FormFilter, _Component);

  function FormFilter(props) {
    var _this;

    _classCallCheck(this, FormFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormFilter).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "submit", function () {
      var param = _objectSpread({}, _this.props.requestParam);

      param.TimeStamp = new Date().getTime();

      _this.props.setRequestParam(param);
    });

    _defineProperty(_assertThisInitialized(_this), "exportExcel", function (event) {
      event.preventDefault();
      var requestParam = _this.props.requestParam;

      _this.props.toggleLoader(true);

      _lib_service__WEBPACK_IMPORTED_MODULE_5__["default"]["export"](requestParam, function () {
        _this.props.toggleLoader(false);
      });
    });

    return _this;
  }

  _createClass(FormFilter, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pa-running-betlist-filter"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "btn btn-submit",
        onClick: this.submit
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('Refresh')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pa-running-betlist-export"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "icon-excel",
        onClick: this.exportExcel,
        title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('ExportToExcel')
      })));
    }
  }]);

  return FormFilter;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapDispatchToProps(dispatch) {
  var setRequestParam = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setRequestParam,
      toggleLoader = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].toggleLoader;
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    setRequestParam: setRequestParam,
    toggleLoader: toggleLoader
  }, dispatch);
}

function mapStateToProps(state) {
  var requestParam = state.requestParam;
  return Object.assign({}, {
    requestParam: requestParam
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/index.jsx":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/index.jsx ***!
  \******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/index.js */ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/reducers/index.js");
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

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/lib/service.js":
/*!************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/lib/service.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Service; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/DataService */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var HeaderText = {
  Index: "#",
  Platform: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Platform"),
  ExternalId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("ExternalId"),
  SystemId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("SystemId"),
  RefNo: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("RefNo"),
  TransTime: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("TransTime"),
  Choice: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Choice"),
  Odds: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Odds"),
  OddsType: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("OddsType"),
  Stake: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Stake"),
  Status: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Status"),
  Live: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("Live")
};
var DataApi = "PlayerBetList/GetRunningBetList";

var Service =
/*#__PURE__*/
function () {
  function Service() {
    _classCallCheck(this, Service);
  }

  _createClass(Service, null, [{
    key: "getHeaderText",
    value: function getHeaderText() {
      return HeaderText;
    }
  }, {
    key: "getReportTitle",
    value: function getReportTitle(currency) {
      return currency ? "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Currency'), ": ").concat(currency.toUpperCase()) : '';
    }
  }, {
    key: "getTotalText",
    value: function getTotalText() {
      return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Total');
    }
  }, {
    key: "export",
    value: function _export(param, callback) {
      var url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(DataApi);
      var exportParam = Object.assign({}, param, {
        IsExport: true
      });
      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].getFile(url, exportParam).then(function (response) {
        var NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
          alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("NoInfo"));
        } else {
          _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, 'PlayerAdministratorBetList.xls');
        }

        callback();
      })["catch"](function (error) {
        console.log(error.message);

        if (error.response) {
          alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource("ErrorProcessingMsg"));
          callback();
        }
      });
    }
  }, {
    key: "getData",
    value: function getData(param, callBack) {
      var url = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(DataApi);
      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_2__["default"].postData(url, param).then(function (response) {
        var result = response.data;
        var data = result.Data;

        if (data && data.length > 0) {
          callBack && callBack(data, result.Total, result.TotalRows);
        } else {
          callBack && callBack([], {}, 0);
        }
      })["catch"](function (error) {
        console.log(error.message);
        callBack && callBack([], {}, 0);
      });
    }
  }]);

  return Service;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/reducers/index.js":
/*!***************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/running-betlist/reducers/index.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/reducers/requestParamReducer */ "./www/js/source/reactpages/reducers/requestParamReducer.js");



/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign({}, _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_1__, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_2__)));

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
/* harmony import */ var _jsroot_components_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/popup */ "./www/js/source/reactpages/components/popup/index.jsx");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
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







var BetListDataGrid =
/*#__PURE__*/
function (_Component) {
  _inherits(BetListDataGrid, _Component);

  function BetListDataGrid(props) {
    var _this;

    _classCallCheck(this, BetListDataGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BetListDataGrid).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onSort", function (sortBy, sortOrder) {
      _this.props.onSort && _this.props.onSort(sortBy, sortOrder);
    });

    _defineProperty(_assertThisInitialized(_this), "onPaging", function (index, size) {
      _this.props.onPaging && _this.props.onPaging(index, size);
    });

    return _this;
  }

  _createClass(BetListDataGrid, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.data !== prevProps.data) {
        this.props.afterLoad && this.props.afterLoad();
      }
    }
  }, {
    key: "_getResource",
    value: function _getResource(key) {
      return this.props.getResourceFunc ? this.props.getResourceFunc(key) : key;
    }
  }, {
    key: "_getTotalCellClassName",
    value: function _getTotalCellClassName(column, value) {
      if (this.props.getTotalCellClassNameFunc) {
        return this.props.getTotalCellClassNameFunc(column, value);
      }

      return column === 'LicenseeWL' && value.substring(0, 1) === '-' ? 'negative' : '';
    }
  }, {
    key: "_getHeaderName",
    value: function _getHeaderName(column) {
      return this.props.getHeaderNameFunc ? this.props.getHeaderNameFunc(column) : column;
    }
  }, {
    key: "_mapData",
    value: function _mapData(data) {
      return this.props.mappingDataFunc ? this.props.mappingDataFunc(data) : data;
    }
  }, {
    key: "_buildHeader",
    value: function _buildHeader() {
      var rows = [];
      var _this$props = this.props,
          columns = _this$props.columns,
          columnWidths = _this$props.columnWidths,
          sortableColumns = _this$props.sortableColumns;

      for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        var isSortable = sortableColumns.indexOf(column) >= 0;

        var headerName = this._getHeaderName(column);

        rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
          key: column,
          colWidth: columnWidths[i],
          sortBy: isSortable ? column : null
        }, headerName));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
        style: {
          height: 32
        }
      }, rows);
    }
  }, {
    key: "_buildBody",
    value: function _buildBody() {
      var _this$props2 = this.props,
          columns = _this$props2.columns,
          columnAlignments = _this$props2.columnAlignments,
          data = _this$props2.data;
      var rows = [];

      for (var i = 0; i < data.length; i++) {
        var item = this._mapData(data[i]);

        var cells = [];

        for (var j = 0; j < columns.length; j++) {
          var column = columns[j];
          cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
            key: "".concat(column, "-").concat(i),
            className: columnAlignments[j],
            dangerouslySetInnerHTML: {
              __html: item[column]
            }
          }));
        }

        rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          key: i
        }, cells));
      }

      return rows;
    }
  }, {
    key: "_buildFooter",
    value: function _buildFooter() {
      if (!this.props.totalColumns || !this.props.totalColumns.length) {
        return false;
      }

      var _this$props3 = this.props,
          columns = _this$props3.columns,
          totalColumns = _this$props3.totalColumns,
          total = _this$props3.total,
          totalText = _this$props3.totalText,
          columnAlignments = _this$props3.columnAlignments;
      var startTotalIndex = columns.indexOf(totalColumns[0]);
      var rows = [];
      var cells = [];
      cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
        key: "total",
        className: "right-align",
        colSpan: startTotalIndex
      }, totalText));

      var item = this._mapData(total);

      for (var i = 0; i < totalColumns.length; i++) {
        var column = totalColumns[i];
        var columnIndex = columns.indexOf(column);

        var className = this._getTotalCellClassName(column, item[column]);

        cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
          key: "Sum".concat(column),
          className: "".concat(columnAlignments[columnIndex], " ").concat(className),
          dangerouslySetInnerHTML: {
            __html: item[column]
          }
        }));
      }

      var blankRows = columns.length - totalColumns.length - startTotalIndex;

      if (blankRows) {
        cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
          key: "blank",
          colSpan: blankRows
        }));
      }

      rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
        className: "fixed-table-grant-total",
        key: "totalRow"
      }, cells));
      return rows;
    }
  }, {
    key: "_renderNodata",
    value: function _renderNodata() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "result-content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "no-info-row center-align"
      }, this._getResource('NoInfo')));
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.data) {
        return null;
      }

      var data = this.props.data;

      if (!data.length) {
        return this._renderNodata();
      }

      var _this$props4 = this.props,
          isPaging = _this$props4.isPaging,
          pageOption = _this$props4.pageOption,
          adjustedHeight = _this$props4.adjustedHeight;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "betlist-container result-content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Table"], {
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
  }]);

  return BetListDataGrid;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

BetListDataGrid.propTypes = {
  isPaging: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  pageOption: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    PageIndex: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    PageSize: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    TotalItem: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    PageList: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number)
  }),
  columns: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string),
  columnWidths: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number),
  mappingDataFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  sortableColumns: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string),
  totalColumns: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string),
  getHeaderNameFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  columnAlignments: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string),
  data: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object),
  total: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,
  getTotalCellClassNameFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  totalText: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  onSort: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  onPaging: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  afterLoad: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  adjustedHeight: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
  getResourceFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
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
/* harmony import */ var _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/DataService */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _lib_BetList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/BetList */ "./www/js/source/reactpages/layouts/betlist/lib/BetList.js");
/* harmony import */ var _jsroot_components_popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/popup */ "./www/js/source/reactpages/components/popup/index.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/constants */ "./www/js/source/reactpages/layouts/betlist/lib/constants.js");
var _BetListLayout$propTy;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var BetListLayout =
/*#__PURE__*/
function (_Component) {
  _inherits(BetListLayout, _Component);

  function BetListLayout(props) {
    var _this;

    _classCallCheck(this, BetListLayout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BetListLayout).call(this, props));
    _this.state = {
      isShowPopup: false,
      popupUrl: null,
      popupTitle: null
    };
    return _this;
  }

  _createClass(BetListLayout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.onload = function () {
        window.logOpenBetlistEvent && window.logOpenBetlistEvent(_this2.props.pageName);
      };

      window.ViewResult = function (matchid, raceNo, bettype, sporttype, refno, username, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid, transdecs) {
        var title = _this2._getResource('Result');

        var rootUrl = _this2.props.rootUrl;

        if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].RNG_GAME || sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].RNG_MINIGAME || sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].RNG_MOBILE) {
          var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getRngCasinoResultUrl(rootUrl);

          _this2._showRngCasinoResult(refno, url, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].VOIDBRIDGE) {
          var _url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getVoidbridgeResultUrl(rootUrl, custid, extension2);

          _this2._showThirdPartyResult(_url, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].PP) {
          var _url2 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getPPResultUrl(rootUrl, custid, extension2);

          _this2._showThirdPartyResult(_url2, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].CARDCLUB) {
          var _url3 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getCardClubResultUrl(rootUrl, custid, bettype, extension2);

          _this2._showThirdPartyResult(_url3, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].SG) {
          var _url4 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSGResultUrl(rootUrl, custid, extension2);

          _this2._showThirdPartyResult(_url4, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].ALLBET) {
          var _url5 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getAllBetResultUrl(rootUrl, transdecs, extension2, bettype);

          _this2._openPopup(_url5, title);
        } else if (sporttype === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["SportType"].GLOBALGAMING) {
          var _url6 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getGlobalGamingResultUrl(rootUrl, custid, extension2);

          _this2._showThirdPartyResult(_url6, title);
        } else {
          var _url7 = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getResultUrl(rootUrl, matchid, raceNo, bettype, sporttype, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid);

          _this2._openPopup(_url7, title);
        }
      };

      window.showMP = function (transId) {
        var divEvent = document.querySelector('#divEvent_' + transId);
        divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket

        _this2._showMixParlayDetail(transId, divEvent);
      };

      window.showCombMP = function (transId, index) {
        var divEvent = document.querySelector('#divEvent_' + transId + '' + index);
        divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket

        _this2._showMixParlayDetail(transId, divEvent);
      }; // expand choice content


      window.showNewCombMP = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this2._showNewParlayDetail.apply(_this2, [_this2.props.rootUrl].concat(args));
      }; // expand choice content


      window.showSingleMatchParlayDetail = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        _this2._showSingleMatchParlayDetail.apply(_this2, [_this2.props.rootUrl].concat(args));
      }; // show detail popup (in choice column)


      window.showCombMPDetail = function (transId, refNo, betId, custId, betTeam) {
        var _this2$props = _this2.props,
            rootUrl = _this2$props.rootUrl,
            baseCurrency = _this2$props.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getParlayDetailUrl(rootUrl, transId, refNo, betId, custId, betTeam, baseCurrency);

        _this2._openPopup(url, betTeam);
      };

      window.ViewCashOutHistory = function (transId, refNo, betType, betdaqId) {
        var _this2$props2 = _this2.props,
            rootUrl = _this2$props2.rootUrl,
            baseCurrency = _this2$props2.baseCurrency;

        var _BetList$getCashOutHi = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getCashOutHistoryPopupSetting(rootUrl, baseCurrency, transId, refNo, betType, betdaqId),
            url = _BetList$getCashOutHi.url,
            isCashOut = _BetList$getCashOutHi.isCashOut;

        var title = _this2._getResource(isCashOut ? 'CashOutDetails' : 'BoughtDetails');

        _this2._openPopup(url, title);
      };

      window.ShowBonusDetails = function (refCode, transId) {
        var _this2$props3 = _this2.props,
            rootUrl = _this2$props3.rootUrl,
            baseCurrency = _this2$props3.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getBonusDetailUrl(rootUrl, refCode, transId, baseCurrency);

        var title = _this2._getResource('TransactionDetail');

        _this2._openPopup(url, title);
      };

      window.showAGCasinoDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props4 = _this2.props,
            rootUrl = _this2$props4.rootUrl,
            baseCurrency = _this2$props4.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getAGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('AGCasino') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showRnGCasinoDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props5 = _this2.props,
            rootUrl = _this2$props5.rootUrl,
            baseCurrency = _this2$props5.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getRnGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductCS') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showVoidBridgeDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props6 = _this2.props,
            rootUrl = _this2$props6.rootUrl,
            baseCurrency = _this2$props6.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getVoidBridgeDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductVB') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showTodayRunningBetsDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props7 = _this2.props,
            rootUrl = _this2$props7.rootUrl,
            baseCurrency = _this2$props7.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getAllBetDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductAB') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showColossusBetsDetails = function (refNo, winlostDate, transId, custId, betCheck) {
        var _this2$props8 = _this2.props,
            rootUrl = _this2$props8.rootUrl,
            baseCurrency = _this2$props8.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getColossusBetsDetailUrl(rootUrl, baseCurrency, refNo, winlostDate, transId, custId, betCheck);

        var title = _this2._getResource('TicketDetailOf').replace('{0}', refNo);

        _this2._openPopup(url, title);
      };

      window.showGlobalGaming = function (transId, winlostDate, custId, transType) {
        var _this2$props9 = _this2.props,
            rootUrl = _this2$props9.rootUrl,
            baseCurrency = _this2$props9.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getGlobalGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductFW') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showPPDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props10 = _this2.props,
            rootUrl = _this2$props10.rootUrl,
            baseCurrency = _this2$props10.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getPPDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductPP') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showVideoPokerGameDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props11 = _this2.props,
            rootUrl = _this2$props11.rootUrl,
            baseCurrency = _this2$props11.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getVideoPokerGameDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductCC') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };

      window.showSGDetails = function (transId, winlostDate, custId, transType) {
        var _this2$props12 = _this2.props,
            rootUrl = _this2$props12.rootUrl,
            baseCurrency = _this2$props12.baseCurrency;
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSGDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);

        var title = _this2._getResource('ProductSG') + ' - ' + _this2._getResource('DetailedBetlist') + ' - ' + _this2._formatDateString(winlostDate);

        _this2._openPopup(url, title);
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.showMP = undefined;
      window.showCombMP = undefined;
      window.ViewResult = undefined;
      window.showNewCombMP = undefined;
      window.showCombMPDetail = undefined;
      window.ViewCashOutHistory = undefined;
      window.ShowBonusDetails = undefined;
      window.showAGCasinoDetails = undefined;
      window.showRnGCasinoDetails = undefined;
      window.showVoidBridgeDetails = undefined;
      window.showTodayRunningBetsDetails = undefined;
      window.showColossusBetsDetails = undefined;
      window.showGlobalGaming = undefined;
      window.showPPDetails = undefined;
      window.showSingleMatchParlayDetail = undefined;
      window.showSGDetails = undefined;
    }
  }, {
    key: "_getResource",
    value: function _getResource(key) {
      return this.props.getResourceFunc ? this.props.getResourceFunc(key) : key;
    }
  }, {
    key: "_formatDateString",
    value: function _formatDateString(dateString) {
      return this.props.formatDateStringFunc ? this.props.formatDateStringFunc(dateString) : dateString;
    }
  }, {
    key: "_beforeShow",
    value: function _beforeShow() {
      this.props.beforeShowFunc && this.props.beforeShowFunc();
    }
  }, {
    key: "_afterShow",
    value: function _afterShow() {
      this.props.afterShowFunc && this.props.afterShowFunc();
    }
  }, {
    key: "_resolveClientUrl",
    value: function _resolveClientUrl(relativeUrl) {
      return this.props.rootUrl + relativeUrl;
    }
  }, {
    key: "_showMixParlayDetail",
    value: function _showMixParlayDetail(transId, divEvent) {
      var _this3 = this;

      if (divEvent.style.display === 'none') {
        var url = this._resolveClientUrl('api/MixParlayBetList/Detail?transId=' + transId);

        this._beforeShow(); // this.props.toggleLoader(true);


        _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(function (result) {
          var choice = '';
          var length = result.data.length;

          for (var i = 0; i < length; i++) {
            choice += result.data[i];

            if (i < length - 1) {
              choice += '<div class="line"></div>';
            }
          }

          divEvent.innerHTML = choice;
          divEvent.style.display = 'block';

          _this3._afterShow();
        })["catch"](function (error) {
          _this3._afterShow();

          console.log(error);
        });
      } else {
        divEvent.style.display = 'none';
        divEvent.innerHTML = '';
      }
    }
  }, {
    key: "_showNewParlayDetail",
    value: function _showNewParlayDetail(rootUrl, transId, transIndex, refNo, handicap1, handicap2, betcheck, betteam, custId) {
      var _this4 = this;

      var divEvent = document.querySelector('#divEvent_' + transId + '' + transIndex);
      var nameDiv = document.querySelector('#combinationOfferName_' + transId + transIndex);
      divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket

      if (divEvent.style.display == 'none') {
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getChoiceParlayDetailUrl(rootUrl, transId, refNo, handicap1, handicap2, betcheck, betteam, custId);

        this._beforeShow(); //this.props.toggleLoader(true);


        _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(function (result) {
          var choice = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].buildChoiceParlayDetail(result.data);
          divEvent.innerHTML = choice;
          divEvent.style.display = 'block';
          nameDiv.style.display = 'none';

          _this4._afterShow();
        })["catch"](function (error) {
          _this4._afterShow();

          console.log(error);
        });
      } else {
        divEvent.style.display = 'none';
        divEvent.innerHTML = '';
        nameDiv.style.display = 'block';
      }
    }
  }, {
    key: "_showThirdPartyResult",
    value: function _showThirdPartyResult(url, title) {
      var _this5 = this;

      this._beforeShow(); //this.props.toggleLoader(true);


      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(function (result) {
        if (result.data !== '') {
          _this5._openPopup(result.data, title);
        }

        _this5._afterShow();
      })["catch"](function (error) {
        _this5._afterShow();

        console.log(error);
      });
    }
  }, {
    key: "_showRngCasinoResult",
    value: function _showRngCasinoResult(refno, url, title) {
      var _this6 = this;

      this._beforeShow();

      _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].postData(url, {
        refno: refno
      }).then(function (result) {
        if (result.data.Success) {
          if (result.data.Result === '') {
            return;
          }

          _this6._openPopup(result.data.Result, title);
        } else {
          alert(_this6._getResource("ErrorProcessingMsg"));
        }

        _this6._afterShow();
      })["catch"](function (error) {
        _this6._afterShow();

        console.log(error);
      });
    }
  }, {
    key: "_showSingleMatchParlayDetail",
    value: function _showSingleMatchParlayDetail(rootUrl, transId, custId, status, transIndex) {
      var _this7 = this;

      var divEvent = document.querySelector('#divEvent_' + transId + '' + transIndex);

      if (divEvent.style.display == 'none') {
        var url = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleMatchParlayDetailUrl(rootUrl, transId, custId, status);

        this._beforeShow();

        _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_1__["default"].getData(url).then(function (result) {
          var selection = _lib_BetList__WEBPACK_IMPORTED_MODULE_2__["default"].buildSingleMatchParlayDetail(result.data);
          divEvent.innerHTML = selection;
          divEvent.style.display = 'block';

          _this7._afterShow();
        })["catch"](function (error) {
          console.log(error);
        });
      } else {
        divEvent.style.display = 'none';
        divEvent.innerHTML = '';
      }
    }
  }, {
    key: "_openPopup",
    value: function _openPopup(url, title) {
      this.setState({
        isShowPopup: true,
        popupUrl: url,
        popupTitle: title
      });
    }
  }, {
    key: "_closePopup",
    value: function _closePopup() {
      this.setState({
        isShowPopup: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "betlist-layout"
      }, this.props.children, this.state.isShowPopup && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_popup__WEBPACK_IMPORTED_MODULE_3__["default"], {
        isShow: true,
        iframeUrl: this.state.popupUrl,
        title: this.state.popupTitle,
        width: 900,
        height: 600,
        onClose: function onClose() {
          return _this8._closePopup();
        }
      }));
    }
  }]);

  return BetListLayout;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

BetListLayout.propTypes = (_BetListLayout$propTy = {
  pageName: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  rootUrl: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  getResourceFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  baseCurrency: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  beforeShowFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  afterShowFunc: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
}, _defineProperty(_BetListLayout$propTy, "beforeShowFunc", prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func), _defineProperty(_BetListLayout$propTy, "afterShowFunc", prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func), _defineProperty(_BetListLayout$propTy, "formatDateStringFunc", prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func), _BetListLayout$propTy);
BetListLayout.defaultProps = {
  rootUrl: '/',
  baseCurrency: ''
};
/* harmony default export */ __webpack_exports__["default"] = (BetListLayout);

/***/ }),

/***/ "./www/js/source/reactpages/layouts/betlist/lib/BetList.js":
/*!*****************************************************************!*\
  !*** ./www/js/source/reactpages/layouts/betlist/lib/BetList.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/QueryString */ "./www/js/source/reactpages/lib/QueryString.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/layouts/betlist/lib/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var BetList =
/*#__PURE__*/
function () {
  function BetList() {
    _classCallCheck(this, BetList);
  }

  _createClass(BetList, [{
    key: "_isFastMarket",
    value: function _isFastMarket(bettype) {
      return bettype >= _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MIN_FASTMARKET && bettype <= _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MAX_FASTMARKET;
    }
  }, {
    key: "_getMixParlayResultUrl",
    value: function _getMixParlayResultUrl(rootUrl, refno, winlostdate, bettype) {
      var url = rootUrl + 'ResultReport/ResultPopup';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refno', refno);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'winlossdate', winlostdate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'bettype', bettype);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'matchid', 1);
      return url;
    }
  }, {
    key: "_getSportBookResultUrl",
    value: function _getSportBookResultUrl(rootUrl, matchid, bettype, raceNo, sporttype, league, isOutright, extension1, extension2) {
      var url = rootUrl + 'ResultReport/ResultPopup';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'matchid', matchid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'bettype', bettype);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'raceno', raceNo);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'sporttype', sporttype);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'isoutright', isOutright);

      if (this._isFastMarket(bettype)) {
        url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'handicap1', extension1);
        url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'handicap2', extension2);
      } else {
        url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betid', extension1);
      }

      return url;
    }
  }, {
    key: "getResultUrl",
    value: function getResultUrl(rootUrl, matchid, raceNo, bettype, sporttype, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid) {
      bettype = Number(bettype);
      var isParlay = bettype === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MIXPARLAY || bettype === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].SYSTEMPARLAY || bettype === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].MIXPARLAY_BETRADAR;
      var url = isParlay ? this._getMixParlayResultUrl(rootUrl, refnoMixParlay, winlostdate, bettype) : this._getSportBookResultUrl(rootUrl, matchid, bettype, raceNo, sporttype, league, isOutright, extension1, extension2, custid);
      return url;
    }
  }, {
    key: "getChoiceParlayDetailUrl",
    value: function getChoiceParlayDetailUrl(rootUrl, transId, refNo, handicap1, handicap2, betcheck, betteam, custId) {
      var url = rootUrl + 'api/MixParlayBetList/NewParlayDetail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refNo', refNo);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'handicap1', handicap1);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'handicap2', handicap2);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betcheck', betcheck);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betteam', betteam);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      return url;
    }
  }, {
    key: "buildChoiceParlayDetail",
    value: function buildChoiceParlayDetail(response) {
      var choice = '';
      var length = response.Data === null ? 0 : response.Data.length;

      if (length > 0) {
        for (var i = 0; i < response.Texts.length; i++) {
          choice += response.Texts[i];
        }

        choice += '<div class="line"></div>';

        for (var _i = 0; _i < response.Data.length; _i++) {
          var item = response.Data[_i];
          choice += item;

          if (_i < length - 1) {
            choice += '<div class="line"></div>';
          }
        }
      }

      return choice;
    }
  }, {
    key: "buildSingleMatchParlayDetail",
    value: function buildSingleMatchParlayDetail(data) {
      var selection = '';
      var length = data === null ? 0 : data.length;

      if (length > 0) {
        selection = '<div class="single-match-parlay-detail">';

        for (var i = 0; i < data.length; i++) {
          selection += data[i];
        }

        selection += '</div>';
      }

      return selection;
    }
  }, {
    key: "getParlayDetailUrl",
    value: function getParlayDetailUrl(rootUrl, transId, refNo, betId, custId, betTeam, baseCurrency) {
      if (Number(transId) === 0) {
        return;
      }

      var url = rootUrl + 'SystemParlayBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refno', refNo);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betteam', betTeam);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'basecurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getSingleMatchParlayDetailUrl",
    value: function getSingleMatchParlayDetailUrl(rootUrl, transId, custId, status) {
      if (Number(transId) === 0) {
        return;
      }

      var url = rootUrl + 'api/SingleMatchParlayBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, "status", status);
      return url;
    }
  }, {
    key: "getCashOutHistoryPopupSetting",
    value: function getCashOutHistoryPopupSetting(rootUrl, baseCurrency, transId, refNo, betType, betdaqId) {
      var isCashOut = betdaqId < 1 || betType === _constants__WEBPACK_IMPORTED_MODULE_1__["BetType"].CASHOUT;
      var url = rootUrl + 'CashOutBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refNo', refNo);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betType', betType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betdaqId', betdaqId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'isCashout', isCashOut);
      return {
        url: url,
        isCashOut: isCashOut
      };
    }
  }, {
    key: "getBonusDetailUrl",
    value: function getBonusDetailUrl(rootUrl, refCode, transId, baseCurrency) {
      var url = rootUrl + 'BonusBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'RefCode', refCode);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'TransId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getAGCasinoDetailUrl",
    value: function getAGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'AGCasinoBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transid', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getRnGCasinoDetailUrl",
    value: function getRnGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'RnGCasinoBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getVoidBridgeDetailUrl",
    value: function getVoidBridgeDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'VoidbridgeBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getAllBetDetailUrl",
    value: function getAllBetDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'AllBetBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transid', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getColossusBetsDetailUrl",
    value: function getColossusBetsDetailUrl(rootUrl, baseCurrency, refNo, winlostDate, transId, custId, betCheck) {
      var url = rootUrl + 'ColossusBetBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'refNo', refNo);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transid', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betCheck', betCheck);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getGlobalGamingDetailUrl",
    value: function getGlobalGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'GlobalGamingBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getPPDetailUrl",
    value: function getPPDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'PragmaticPlayBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getVideoPokerGameDetailUrl",
    value: function getVideoPokerGameDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'CardClubBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getSGDetailUrl",
    value: function getSGDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
      var url = rootUrl + 'SGBetList/Detail';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId', transId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'date', winlostDate);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custId', custId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transType', transType);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'BaseCurrency', baseCurrency);
      return url;
    }
  }, {
    key: "getRngCasinoResultUrl",
    value: function getRngCasinoResultUrl(rootUrl) {
      return rootUrl + 'ResultReport/ShowRngCasinoSingleWalletResult';
    }
  }, {
    key: "getVoidbridgeResultUrl",
    value: function getVoidbridgeResultUrl(rootUrl, custid, gamePlayID) {
      var url = rootUrl + 'ResultReport/VoidbridgeResult';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gamePlayID', gamePlayID);
      return url;
    }
  }, {
    key: "getPPResultUrl",
    value: function getPPResultUrl(rootUrl, custid, gamePlayId) {
      var url = rootUrl + 'PPResultPopup/Index';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gamePlayId', gamePlayId);
      return url;
    }
  }, {
    key: "getCardClubResultUrl",
    value: function getCardClubResultUrl(rootUrl, custid, gameTypeId, transId3rd) {
      var url = rootUrl + 'CardClubResultPopup/Index';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gameTypeId', gameTypeId);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transId3rd', transId3rd);
      return url;
    }
  }, {
    key: "getSGResultUrl",
    value: function getSGResultUrl(rootUrl, custid, gamePlayId) {
      var url = rootUrl + 'SGResultPopup/Index';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gamePlayId', gamePlayId);
      return url;
    }
  }, {
    key: "getAllBetResultUrl",
    value: function getAllBetResultUrl(rootUrl, transdesc, betcheck, bettype) {
      var url = rootUrl + 'ResultReport/AllBetResult';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'betcheck', betcheck);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'bettype', bettype);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'transdesc', encodeURIComponent(transdesc));
      return url;
    }
  }, {
    key: "getGlobalGamingResultUrl",
    value: function getGlobalGamingResultUrl(rootUrl, custid, gameId) {
      var url = rootUrl + 'ResultReport/GlobalGamingResult';
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'custid', custid);
      url = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_0__["default"].setParam(url, 'gameId', gameId);
      return url;
    }
  }]);

  return BetList;
}();

/* harmony default export */ __webpack_exports__["default"] = (new BetList());

/***/ }),

/***/ "./www/js/source/reactpages/layouts/betlist/lib/constants.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/layouts/betlist/lib/constants.js ***!
  \*******************************************************************/
/*! exports provided: BetType, SportType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BetType", function() { return BetType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SportType", function() { return SportType; });
var BetType = {
  CASHOUT: 911,
  MIXPARLAY: 9,
  SYSTEMPARLAY: 29,
  MIXPARLAY_BETRADAR: 2799,
  MIN_FASTMARKET: 221,
  MAX_FASTMARKET: 227
};
var SportType = {
  RNG_GAME: 208,
  RNG_MINIGAME: 209,
  RNG_MOBILE: 210,
  ALLBET: 211,
  VOIDBRIDGE: 212,
  PP: 248,
  GLOBALGAMING: 219,
  CARDCLUB: 165,
  SG: 247
};

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
//# sourceMappingURL=runningbetlist.chunk.js.map