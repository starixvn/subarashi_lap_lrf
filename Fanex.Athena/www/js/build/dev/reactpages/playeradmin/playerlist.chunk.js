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

/***/ "./node_modules/@9softstudio/react-multiselect/dist/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@9softstudio/react-multiselect/dist/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";e.exports=n(6)},function(e,t,n){e.exports=n(11)()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={"en-US":{All:"All",SelectedItemCount:"# selected",SelectOptions:"Select options"},"zh-TW":{All:"全部",SelectedItemCount:"已選  # 個項目",SelectOptions:"選擇一個選項"},"zh-CN":{All:"全部",SelectedItemCount:"已选  # 个项目",SelectOptions:"选择一个选项"},"zh-Hans":{All:"全部",SelectedItemCount:"已选  # 个项目",SelectOptions:"选择一个选项"}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),a=i(o),u=i(n(1));function i(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChange=function(e){e.stopPropagation();var t=n.props,r=t.itemData,o=t.onChange,a={key:r.key,value:r.value,checked:!r.checked};o&&o(a)},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"render",value:function(){var e=this.props,t=e.itemData,n=e.id;return a.default.createElement("li",{className:"multiple-select-item"},a.default.createElement("input",{id:n,type:"checkbox",className:"option-checkbox",checked:t.checked,onChange:this.onChange}),a.default.createElement("label",{className:"option-label",htmlFor:n},t.value))}}]),t}();l.propTypes={itemData:u.default.object.isRequired,id:u.default.oneOfType([u.default.number,u.default.string]).isRequired,onChange:u.default.func},t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(5));t.default=r.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),a=f(o),u=f(n(1)),i=f(n(13)),l=f(n(14)),c=f(n(15));function f(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p="value",d=1,h=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChangeHandler=function(e){var t,r=n.props,o=r.keyField,a=r.valueField,u=r.statusField,i=(s(t={},o,e.key),s(t,a,e.value),s(t,u,e.checked),t),l=n.state.dataSource.slice(0);l.find(function(t){return t.key===e.key}).checked=e.checked,n._callBackToParent(i),n.setState({dataSource:l})},n.onToggle=function(){n.setState(function(e){return{showOptionList:!e.showOptionList}},function(){n.searchInputBox&&n.state.showOptionList&&n.searchInputBox.focus()})},n.checkAllHandler=function(e){n.originalDataSource.forEach(function(t){t.checked=e});var t=n.state.searchText,r=n.originalDataSource.filter(function(e){return e[p].startsWith(t)});n.setState({dataSource:r}),n._callBackToParent(null)},n.onChangeSearchText=function(e){n.setState(function(t){var r=n.originalDataSource.filter(function(t){return t[p].startsWith(e)});return{searchText:e,dataSource:r}})},n.onClearSearch=function(){n.setState({searchText:""},function(){return n.onChangeSearchText("")})},n._close=function(){n.setState({showOptionList:!1})},n._handleDocumentClick=function(e){n.wrapper&&!n.wrapper.contains(e.target)&&n.state.showOptionList&&n._close()},n.searchInputBox=null,n.id="multiple-select-"+(e.id||d++),n.originalDataSource=n._convertDataSourceToState(e),n.state={searchText:"",showOptionList:!1,dataSource:n.originalDataSource},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"componentDidMount",value:function(){document.addEventListener("click",this._handleDocumentClick)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this._handleDocumentClick)}},{key:"_callBackToParent",value:function(e){var t=this._getSelectedItemKey(this.originalDataSource);this.props.onChange&&this.props.onChange(e,t)}},{key:"_convertDataSourceToState",value:function(e){var t=e.keyField,n=e.valueField,r=e.statusField;return e.dataSource.map(function(e){var o;return s(o={},"key",e[t]),s(o,p,e[n]),s(o,"checked",e[r]),o})}},{key:"_getSelectedItemKey",value:function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];r.checked&&t.push(r.key)}return t.join(",")}},{key:"_renderOptionAll",value:function(){if(this.props.hasAllOption){var e=this.originalDataSource.filter(function(e){return e.checked}).length===this.originalDataSource.length;return a.default.createElement(c.default,{id:this.id,checked:e,language:this.props.language,onChange:this.checkAllHandler})}return null}},{key:"_renderSearchBox",value:function(){var e=this;if(!this.props.hasSearchBox)return null;return a.default.createElement("div",{style:{width:"100%"}},a.default.createElement("input",{autoFocus:!0,onChange:function(t){return e.onChangeSearchText(t.target.value)},ref:function(t){return e.searchInputBox=t},value:this.state.searchText,type:"text",placeholder:"Search data",style:{width:"100%",border:"1px solid #ccc",padding:"5px 10px",boxSizing:"border-box"}}),a.default.createElement("button",{onClick:this.onClearSearch,style:{position:"absolute",right:"5px",width:"20px",height:"20px",border:0,margin:"5px",backgroundColor:"transparent",cursor:"pointer"}},"X"))}},{key:"render",value:function(){var e=this,t=this.props.maxDisplayItemCount;return a.default.createElement("div",{className:"multiple-select-container",id:this.id,ref:function(t){return e.wrapper=t}},a.default.createElement(i.default,{language:this.props.language,selectedItems:this.selectedItems,onToggle:this.onToggle,maxDisplayItemCount:t}),a.default.createElement("div",{className:"multiple-select-default multiple-select-options-container",style:{display:this.state.showOptionList?"block":"none"}},this._renderSearchBox(),this._renderOptionAll(),a.default.createElement(l.default,{id:this.id,dataSource:this.state.dataSource,onChange:this.onChangeHandler})))}},{key:"selectedItems",get:function(){return this.originalDataSource.filter(function(e){return e.checked})}}]),t}();h.propTypes={language:u.default.string,dataSource:u.default.arrayOf(u.default.object).isRequired,keyField:u.default.string,valueField:u.default.string,statusField:u.default.string,maxDisplayItemCount:u.default.number,onChange:u.default.func,hasAllOption:u.default.bool,hasSearchBox:u.default.bool},h.defaultProps={language:"en-US",keyField:"key",valueField:p,statusField:"checked",hasAllOption:!0,hasSearchBox:!1},t.default=h},function(e,t,n){"use strict";
/** @license React v16.4.1
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(7),o=n(8),a=n(9),u=n(10),i="function"==typeof Symbol&&Symbol.for,l=i?Symbol.for("react.element"):60103,c=i?Symbol.for("react.portal"):60106,f=i?Symbol.for("react.fragment"):60107,s=i?Symbol.for("react.strict_mode"):60108,p=i?Symbol.for("react.profiler"):60114,d=i?Symbol.for("react.provider"):60109,h=i?Symbol.for("react.context"):60110,y=i?Symbol.for("react.async_mode"):60111,m=i?Symbol.for("react.forward_ref"):60112;i&&Symbol.for("react.timeout");var b="function"==typeof Symbol&&Symbol.iterator;function v(e){for(var t=arguments.length-1,n="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);o(!1,"Minified React error #"+e+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",n)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function _(e,t,n){this.props=e,this.context=t,this.refs=a,this.updater=n||g}function O(){}function S(e,t,n){this.props=e,this.context=t,this.refs=a,this.updater=n||g}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&v("85"),this.updater.enqueueSetState(this,e,t,"setState")},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},O.prototype=_.prototype;var k=S.prototype=new O;k.constructor=S,r(k,_.prototype),k.isPureReactComponent=!0;var w={current:null},j=Object.prototype.hasOwnProperty,x={key:!0,ref:!0,__self:!0,__source:!0};function C(e,t,n){var r=void 0,o={},a=null,u=null;if(null!=t)for(r in void 0!==t.ref&&(u=t.ref),void 0!==t.key&&(a=""+t.key),t)j.call(t,r)&&!x.hasOwnProperty(r)&&(o[r]=t[r]);var i=arguments.length-2;if(1===i)o.children=n;else if(1<i){for(var c=Array(i),f=0;f<i;f++)c[f]=arguments[f+2];o.children=c}if(e&&e.defaultProps)for(r in i=e.defaultProps)void 0===o[r]&&(o[r]=i[r]);return{$$typeof:l,type:e,key:a,ref:u,props:o,_owner:w.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===l}var E=/\/+/g,T=[];function R(e,t,n,r){if(T.length){var o=T.pop();return o.result=e,o.keyPrefix=t,o.func=n,o.context=r,o.count=0,o}return{result:e,keyPrefix:t,func:n,context:r,count:0}}function I(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>T.length&&T.push(e)}function D(e,t,n,r){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var a=!1;if(null===e)a=!0;else switch(o){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case l:case c:a=!0}}if(a)return n(r,e,""===t?"."+A(e,0):t),1;if(a=0,t=""===t?".":t+":",Array.isArray(e))for(var u=0;u<e.length;u++){var i=t+A(o=e[u],u);a+=D(o,i,n,r)}else if(null===e||void 0===e?i=null:i="function"==typeof(i=b&&e[b]||e["@@iterator"])?i:null,"function"==typeof i)for(e=i.call(e),u=0;!(o=e.next()).done;)a+=D(o=o.value,i=t+A(o,u++),n,r);else"object"===o&&v("31","[object Object]"===(n=""+e)?"object with keys {"+Object.keys(e).join(", ")+"}":n,"");return a}function A(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}(e.key):t.toString(36)}function M(e,t){e.func.call(e.context,t,e.count++)}function F(e,t,n){var r=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?N(e,r,n,u.thatReturnsArgument):null!=e&&(P(e)&&(t=o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(E,"$&/")+"/")+n,e={$$typeof:l,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}),r.push(e))}function N(e,t,n,r,o){var a="";null!=n&&(a=(""+n).replace(E,"$&/")+"/"),t=R(t,a,r,o),null==e||D(e,"",F,t),I(t)}var $={Children:{map:function(e,t,n){if(null==e)return e;var r=[];return N(e,r,null,t,n),r},forEach:function(e,t,n){if(null==e)return e;t=R(null,null,t,n),null==e||D(e,"",M,t),I(t)},count:function(e){return null==e?0:D(e,"",u.thatReturnsNull,null)},toArray:function(e){var t=[];return N(e,t,null,u.thatReturnsArgument),t},only:function(e){return P(e)||v("143"),e}},createRef:function(){return{current:null}},Component:_,PureComponent:S,createContext:function(e,t){return void 0===t&&(t=null),(e={$$typeof:h,_calculateChangedBits:t,_defaultValue:e,_currentValue:e,_currentValue2:e,_changedBits:0,_changedBits2:0,Provider:null,Consumer:null}).Provider={$$typeof:d,_context:e},e.Consumer=e},forwardRef:function(e){return{$$typeof:m,render:e}},Fragment:f,StrictMode:s,unstable_AsyncMode:y,unstable_Profiler:p,createElement:C,cloneElement:function(e,t,n){(null===e||void 0===e)&&v("267",e);var o=void 0,a=r({},e.props),u=e.key,i=e.ref,c=e._owner;if(null!=t){void 0!==t.ref&&(i=t.ref,c=w.current),void 0!==t.key&&(u=""+t.key);var f=void 0;for(o in e.type&&e.type.defaultProps&&(f=e.type.defaultProps),t)j.call(t,o)&&!x.hasOwnProperty(o)&&(a[o]=void 0===t[o]&&void 0!==f?f[o]:t[o])}if(1===(o=arguments.length-2))a.children=n;else if(1<o){f=Array(o);for(var s=0;s<o;s++)f[s]=arguments[s+2];a.children=f}return{$$typeof:l,type:e.type,key:u,ref:i,props:a,_owner:c}},createFactory:function(e){var t=C.bind(null,e);return t.type=e,t},isValidElement:P,version:"16.4.1",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:w,assign:r}},B={default:$},L=B&&$||B;e.exports=L.default?L.default:L},function(e,t,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,u,i=function(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),l=1;l<arguments.length;l++){for(var c in n=Object(arguments[l]))o.call(n,c)&&(i[c]=n[c]);if(r){u=r(n);for(var f=0;f<u.length;f++)a.call(n,u[f])&&(i[u[f]]=n[u[f]])}}return i}},function(e,t,n){"use strict";var r=function(e){};e.exports=function(e,t,n,o,a,u,i,l){if(r(t),!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var f=[n,o,a,u,i,l],s=0;(c=new Error(t.replace(/%s/g,function(){return f[s++]}))).name="Invariant Violation"}throw c.framesToPop=1,c}}},function(e,t,n){"use strict";e.exports={}},function(e,t,n){"use strict";function r(e){return function(){return e}}var o=function(){};o.thatReturns=r,o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},e.exports=o},function(e,t,n){"use strict";var r=n(12);function o(){}e.exports=function(){function e(e,t,n,o,a,u){if(u!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),a=l(o),u=l(n(1)),i=l(n(2));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"render",value:function(){return a.default.createElement("button",{type:"button",className:"multiple-select-default multiple-select-label",onClick:this.props.onToggle},a.default.createElement("span",{className:"text-display",title:this.selectedItemsString},this.selectedItemsString),a.default.createElement("b",{className:"caret"}))}},{key:"selectedItemsString",get:function(){var e=this.props,t=e.selectedItems,n=e.maxDisplayItemCount,r=t.map(function(e){return e.value}),o=i.default[this.props.language],a=o.SelectOptions,u=r.length;return u>=n?a=o.SelectedItemCount.replace("#",u):u>=1&&(a=r.join(", ")),a}}]),t}();c.propTypes={language:u.default.string,selectedItems:u.default.arrayOf(u.default.object).isRequired,maxDisplayItemCount:u.default.number},c.defaultProps={language:"en-US",maxDisplayItemCount:3},t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),a=l(o),u=l(n(1)),i=l(n(3));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"_renderOptionList",value:function(){var e=this.props,t=e.dataSource,n=e.onChange,r=e.id;return t&&t.length?t.map(function(e,t){return a.default.createElement(i.default,{id:r+"-optionItem-"+t,key:r+"optionItem"+t,itemData:e,onChange:n})}):a.default.createElement("span",null,"No information")}},{key:"render",value:function(){return a.default.createElement("ul",{className:"multiple-select-options"},this._renderOptionList())}}]),t}();c.propTypes={dataSource:u.default.arrayOf(u.default.object).isRequired,id:u.default.oneOfType([u.default.number,u.default.string]).isRequired,onChange:u.default.func},t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),a=c(o),u=c(n(1)),i=c(n(3)),l=c(n(2));function c(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.changeHandler=function(e){var t=e.checked;n.props.onChange&&n.props.onChange(t)},n.itemData={key:"All",value:l.default[n.props.language].All},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"render",value:function(){var e=this.props,t=e.id,n=e.checked;return this.itemData.checked=n,a.default.createElement("ul",{className:"multiple-select-options multiple-select-option-all"},a.default.createElement(i.default,{id:t+"-optionItemAll",itemData:this.itemData,onChange:this.changeHandler}))}}]),t}();f.propTypes={language:u.default.string,onChange:u.default.func,id:u.default.oneOfType([u.default.number,u.default.string]).isRequired,checked:u.default.bool},f.defaultProps={language:"en-US",checked:!1},t.default=f}])});

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/react-input-autosize/lib/AutosizeInput.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-input-autosize/lib/AutosizeInput.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizerStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre'
};

var INPUT_PROPS_BLACKLIST = ['extraWidth', 'injectStyles', 'inputClassName', 'inputRef', 'inputStyle', 'minWidth', 'onAutosize', 'placeholderIsMinWidth'];

var cleanInputProps = function cleanInputProps(inputProps) {
	INPUT_PROPS_BLACKLIST.forEach(function (field) {
		return delete inputProps[field];
	});
	return inputProps;
};

var copyStyles = function copyStyles(styles, node) {
	node.style.fontSize = styles.fontSize;
	node.style.fontFamily = styles.fontFamily;
	node.style.fontWeight = styles.fontWeight;
	node.style.fontStyle = styles.fontStyle;
	node.style.letterSpacing = styles.letterSpacing;
	node.style.textTransform = styles.textTransform;
};

var isIE = typeof window !== 'undefined' && window.navigator ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent) : false;

var generateId = function generateId() {
	// we only need an auto-generated ID for stylesheet injection, which is only
	// used for IE. so if the browser is not IE, this should return undefined.
	return isIE ? '_' + Math.random().toString(36).substr(2, 12) : undefined;
};

var AutosizeInput = function (_Component) {
	_inherits(AutosizeInput, _Component);

	function AutosizeInput(props) {
		_classCallCheck(this, AutosizeInput);

		var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

		_this.inputRef = function (el) {
			_this.input = el;
			if (typeof _this.props.inputRef === 'function') {
				_this.props.inputRef(el);
			}
		};

		_this.placeHolderSizerRef = function (el) {
			_this.placeHolderSizer = el;
		};

		_this.sizerRef = function (el) {
			_this.sizer = el;
		};

		_this.state = {
			inputWidth: props.minWidth,
			inputId: props.id || generateId()
		};
		return _this;
	}

	_createClass(AutosizeInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.mounted = true;
			this.copyInputStyles();
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var id = nextProps.id;

			if (id !== this.props.id) {
				this.setState({ inputId: id || generateId() });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.inputWidth !== this.state.inputWidth) {
				if (typeof this.props.onAutosize === 'function') {
					this.props.onAutosize(this.state.inputWidth);
				}
			}
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: 'copyInputStyles',
		value: function copyInputStyles() {
			if (!this.mounted || !window.getComputedStyle) {
				return;
			}
			var inputStyles = this.input && window.getComputedStyle(this.input);
			if (!inputStyles) {
				return;
			}
			copyStyles(inputStyles, this.sizer);
			if (this.placeHolderSizer) {
				copyStyles(inputStyles, this.placeHolderSizer);
			}
		}
	}, {
		key: 'updateInputWidth',
		value: function updateInputWidth() {
			if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = void 0;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.sizer.scrollWidth + 2;
			}
			// add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
			var extraWidth = this.props.type === 'number' && this.props.extraWidth === undefined ? 16 : parseInt(this.props.extraWidth) || 0;
			newInputWidth += extraWidth;
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		}
	}, {
		key: 'getInput',
		value: function getInput() {
			return this.input;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.input.focus();
		}
	}, {
		key: 'blur',
		value: function blur() {
			this.input.blur();
		}
	}, {
		key: 'select',
		value: function select() {
			this.input.select();
		}
	}, {
		key: 'renderStyles',
		value: function renderStyles() {
			// this method injects styles to hide IE's clear indicator, which messes
			// with input size detection. the stylesheet is only injected when the
			// browser is IE, and can also be disabled by the `injectStyles` prop.
			var injectStyles = this.props.injectStyles;

			return isIE && injectStyles ? _react2.default.createElement('style', { dangerouslySetInnerHTML: {
					__html: 'input#' + this.state.inputId + '::-ms-clear {display: none;}'
				} }) : null;
		}
	}, {
		key: 'render',
		value: function render() {
			var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
				if (previousValue !== null && previousValue !== undefined) {
					return previousValue;
				}
				return currentValue;
			});

			var wrapperStyle = _extends({}, this.props.style);
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

			var inputStyle = _extends({
				boxSizing: 'content-box',
				width: this.state.inputWidth + 'px'
			}, this.props.inputStyle);

			var inputProps = _objectWithoutProperties(this.props, []);

			cleanInputProps(inputProps);
			inputProps.className = this.props.inputClassName;
			inputProps.id = this.state.inputId;
			inputProps.style = inputStyle;

			return _react2.default.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				this.renderStyles(),
				_react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
				_react2.default.createElement(
					'div',
					{ ref: this.sizerRef, style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? _react2.default.createElement(
					'div',
					{ ref: this.placeHolderSizerRef, style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	}]);

	return AutosizeInput;
}(_react.Component);

AutosizeInput.propTypes = {
	className: _propTypes2.default.string, // className for the outer element
	defaultValue: _propTypes2.default.any, // default field value
	extraWidth: _propTypes2.default.oneOfType([// additional width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	id: _propTypes2.default.string, // id to use for the input, can be set for consistent snapshots
	injectStyles: _propTypes2.default.bool, // inject the custom stylesheet to hide clear UI, defaults to true
	inputClassName: _propTypes2.default.string, // className for the input element
	inputRef: _propTypes2.default.func, // ref callback for the input element
	inputStyle: _propTypes2.default.object, // css styles for the input element
	minWidth: _propTypes2.default.oneOfType([// minimum width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
	onChange: _propTypes2.default.func, // onChange handler: function(event) {}
	placeholder: _propTypes2.default.string, // placeholder text
	placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
	style: _propTypes2.default.object, // css styles for the outer element
	value: _propTypes2.default.any // field value
};
AutosizeInput.defaultProps = {
	minWidth: 1,
	injectStyles: true
};

exports.default = AutosizeInput;

/***/ }),

/***/ "./node_modules/react-select/dist/react-select.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-select/dist/react-select.es.js ***!
  \***********************************************************/
/*! exports provided: Async, AsyncCreatable, Creatable, Value, Option, defaultMenuRenderer, defaultArrowRenderer, defaultClearRenderer, defaultFilterOptions, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return Async; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncCreatable", function() { return AsyncCreatableSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Creatable", function() { return CreatableSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Value", function() { return Value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Option", function() { return Option; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMenuRenderer", function() { return menuRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultArrowRenderer", function() { return arrowRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultClearRenderer", function() { return clearRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultFilterOptions", function() { return filterOptions; });
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-input-autosize */ "./node_modules/react-input-autosize/lib/AutosizeInput.js");
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_input_autosize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);






var arrowRenderer = function arrowRenderer(_ref) {
	var onMouseDown = _ref.onMouseDown;

	return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement('span', {
		className: 'Select-arrow',
		onMouseDown: onMouseDown
	});
};

arrowRenderer.propTypes = {
	onMouseDown: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
};

var clearRenderer = function clearRenderer() {
	return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement('span', {
		className: 'Select-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
};

var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

var stripDiacritics = function stripDiacritics(str) {
	for (var i = 0; i < map.length; i++) {
		str = str.replace(map[i].letters, map[i].base);
	}
	return str;
};

var trim = function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
};

var isValid = function isValid(value) {
	return typeof value !== 'undefined' && value !== null && value !== '';
};

var filterOptions = function filterOptions(options, filterValue, excludeOptions, props) {
	if (props.ignoreAccents) {
		filterValue = stripDiacritics(filterValue);
	}

	if (props.ignoreCase) {
		filterValue = filterValue.toLowerCase();
	}

	if (props.trimFilter) {
		filterValue = trim(filterValue);
	}

	if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
		return i[props.valueKey];
	});

	return options.filter(function (option) {
		if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(undefined, option, filterValue);
		if (!filterValue) return true;

		var value = option[props.valueKey];
		var label = option[props.labelKey];
		var hasValue = isValid(value);
		var hasLabel = isValid(label);

		if (!hasValue && !hasLabel) {
			return false;
		}

		var valueTest = hasValue ? String(value) : null;
		var labelTest = hasLabel ? String(label) : null;

		if (props.ignoreAccents) {
			if (valueTest && props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
			if (labelTest && props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
		}

		if (props.ignoreCase) {
			if (valueTest && props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (labelTest && props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}

		return props.matchPos === 'start' ? valueTest && props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || labelTest && props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : valueTest && props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || labelTest && props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
	});
};

var menuRenderer = function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption,
	    focusOption = _ref.focusOption,
	    inputValue = _ref.inputValue,
	    instancePrefix = _ref.instancePrefix,
	    onFocus = _ref.onFocus,
	    onOptionRef = _ref.onOptionRef,
	    onSelect = _ref.onSelect,
	    optionClassName = _ref.optionClassName,
	    optionComponent = _ref.optionComponent,
	    optionRenderer = _ref.optionRenderer,
	    options = _ref.options,
	    removeValue = _ref.removeValue,
	    selectValue = _ref.selectValue,
	    valueArray = _ref.valueArray,
	    valueKey = _ref.valueKey;

	var Option = optionComponent;

	return options.map(function (option, i) {
		var isSelected = valueArray && valueArray.some(function (x) {
			return x[valueKey] === option[valueKey];
		});
		var isFocused = option === focusedOption;
		var optionClass = classnames__WEBPACK_IMPORTED_MODULE_1___default()(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});

		return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
			Option,
			{
				className: optionClass,
				focusOption: focusOption,
				inputValue: inputValue,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				option: option,
				optionIndex: i,
				ref: function ref(_ref2) {
					onOptionRef(_ref2, isFocused);
				},
				removeValue: removeValue,
				selectValue: selectValue
			},
			optionRenderer(option, i, inputValue)
		);
	});
};

menuRenderer.propTypes = {
	focusOption: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
	focusedOption: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
	inputValue: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
	instancePrefix: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
	onFocus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
	onOptionRef: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
	onSelect: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
	optionClassName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
	optionComponent: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
	optionRenderer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
	options: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
	removeValue: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
	selectValue: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
	valueArray: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
	valueKey: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};

var blockEvent = (function (event) {
	event.preventDefault();
	event.stopPropagation();
	if (event.target.tagName !== 'A' || !('href' in event.target)) {
		return;
	}
	if (event.target.target) {
		window.open(event.target.href, event.target.target);
	} else {
		window.location.href = event.target.href;
	}
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Option = function (_React$Component) {
	inherits(Option, _React$Component);

	function Option(props) {
		classCallCheck(this, Option);

		var _this = possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
		_this.handleMouseMove = _this.handleMouseMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		_this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.onFocus = _this.onFocus.bind(_this);
		return _this;
	}

	createClass(Option, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		}
	}, {
		key: 'handleMouseEnter',
		value: function handleMouseEnter(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleMouseMove',
		value: function handleMouseMove(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'onFocus',
		value: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    option = _props.option,
			    instancePrefix = _props.instancePrefix,
			    optionIndex = _props.optionIndex;

			var className = classnames__WEBPACK_IMPORTED_MODULE_1___default()(this.props.className, option.className);

			return option.disabled ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'div',
				{ className: className,
					onMouseDown: blockEvent,
					onClick: blockEvent },
				this.props.children
			) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					'aria-label': option.label,
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	}]);
	return Option;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

Option.propTypes = {
	children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node,
	className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // className (based on mouse position)
	instancePrefix: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired, // unique prefix for the ids (used for aria)
	isDisabled: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // the option is disabled
	isFocused: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // the option is focused
	isSelected: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // the option is selected
	onFocus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // method to handle mouseEnter on option element
	onSelect: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // method to handle click on option element
	onUnfocus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // method to handle mouseLeave on option element
	option: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired, // object that is base for that option
	optionIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number // index of the option, used to generate unique ids for aria
};

var Value = function (_React$Component) {
	inherits(Value, _React$Component);

	function Value(props) {
		classCallCheck(this, Value);

		var _this = possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.onRemove = _this.onRemove.bind(_this);
		_this.handleTouchEndRemove = _this.handleTouchEndRemove.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		return _this;
	}

	createClass(Value, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		}
	}, {
		key: 'onRemove',
		value: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		}
	}, {
		key: 'handleTouchEndRemove',
		value: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.onRemove(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'renderRemoveIcon',
		value: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'span',
				{ className: 'Select-value-icon',
					'aria-hidden': 'true',
					onMouseDown: this.onRemove,
					onTouchEnd: this.handleTouchEndRemove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove },
				'\xD7'
			);
		}
	}, {
		key: 'renderLabel',
		value: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'span',
				{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
				this.props.children
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'div',
				{ className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('Select-value', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title
				},
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}
	}]);
	return Value;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

Value.propTypes = {
	children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node,
	disabled: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // disabled prop passed to ReactSelect
	id: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // Unique id for the value - used for aria
	onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // method to handle click on value label
	onRemove: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // method to handle removal of the value
	value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired // the option object for this value
};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/
var stringifyValue = function stringifyValue(value) {
	return typeof value === 'string' ? value : value !== null && JSON.stringify(value) || '';
};

var stringOrNode = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]);
var stringOrNumber = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number]);

var instanceId = 1;

var shouldShowValue = function shouldShowValue(state, props) {
	var inputValue = state.inputValue,
	    isPseudoFocused = state.isPseudoFocused,
	    isFocused = state.isFocused;
	var onSelectResetsInput = props.onSelectResetsInput;


	if (!inputValue) return true;

	if (!onSelectResetsInput) {
		return !(!isFocused && isPseudoFocused || isFocused && !isPseudoFocused);
	}

	return false;
};

var shouldShowPlaceholder = function shouldShowPlaceholder(state, props, isOpen) {
	var inputValue = state.inputValue,
	    isPseudoFocused = state.isPseudoFocused,
	    isFocused = state.isFocused;
	var onSelectResetsInput = props.onSelectResetsInput;


	return !inputValue || !onSelectResetsInput && !isOpen && !isPseudoFocused && !isFocused;
};

/**
 * Retrieve a value from the given options and valueKey
 * @param {String|Number|Array} value	- the selected value(s)
 * @param {Object}		 props	- the Select component's props (or nextProps)
 */
var expandValue = function expandValue(value, props) {
	var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
	var options = props.options,
	    valueKey = props.valueKey;

	if (!options) return;
	for (var i = 0; i < options.length; i++) {
		if (String(options[i][valueKey]) === String(value)) return options[i];
	}
};

var handleRequired = function handleRequired(value, multi) {
	if (!value) return true;
	return multi ? value.length === 0 : Object.keys(value).length === 0;
};

var Select$1 = function (_React$Component) {
	inherits(Select, _React$Component);

	function Select(props) {
		classCallCheck(this, Select);

		var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

		['clearValue', 'focusOption', 'getOptionLabel', 'handleInputBlur', 'handleInputChange', 'handleInputFocus', 'handleInputValueChange', 'handleKeyDown', 'handleMenuScroll', 'handleMouseDown', 'handleMouseDownOnArrow', 'handleMouseDownOnMenu', 'handleTouchEnd', 'handleTouchEndClearValue', 'handleTouchMove', 'handleTouchOutside', 'handleTouchStart', 'handleValueClick', 'onOptionRef', 'removeValue', 'selectValue'].forEach(function (fn) {
			return _this[fn] = _this[fn].bind(_this);
		});

		_this.state = {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false
		};
		return _this;
	}

	createClass(Select, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: handleRequired(valueArray[0], this.props.multi)
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (typeof this.props.autofocus !== 'undefined' && typeof console !== 'undefined') {
				console.warn('Warning: The autofocus prop has changed to autoFocus, support will be removed after react-select@1.0');
			}
			if (this.props.autoFocus || this.props.autofocus) {
				this.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (nextProps.required) {
				this.setState({
					required: handleRequired(valueArray[0], nextProps.multi)
				});
			} else if (this.props.required) {
				// Used to be required but it's not any more
				this.setState({ required: false });
			}

			if (this.state.inputValue && this.props.value !== nextProps.value && nextProps.onSelectResetsInput) {
				this.setState({ inputValue: this.handleInputValueChange('') });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = Object(react_dom__WEBPACK_IMPORTED_MODULE_4__["findDOMNode"])(this.focused);
				var menuNode = Object(react_dom__WEBPACK_IMPORTED_MODULE_4__["findDOMNode"])(this.menu);

				var scrollTop = menuNode.scrollTop;
				var scrollBottom = scrollTop + menuNode.offsetHeight;
				var optionTop = focusedOptionNode.offsetTop;
				var optionBottom = optionTop + focusedOptionNode.offsetHeight;

				if (scrollTop > optionTop || scrollBottom < optionBottom) {
					menuNode.scrollTop = focusedOptionNode.offsetTop;
				}

				// We still set hasScrolledToOption to true even if we didn't
				// actually need to scroll, as we've still confirmed that the
				// option is in view.
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}

			if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = Object(react_dom__WEBPACK_IMPORTED_MODULE_4__["findDOMNode"])(this.focused);
				var menuDOM = Object(react_dom__WEBPACK_IMPORTED_MODULE_4__["findDOMNode"])(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				} else if (focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
			if (prevState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(this.state.isOpen);
				var handler = this.state.isOpen ? this.props.onOpen : this.props.onClose;
				handler && handler();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.toggleTouchOutsideEvent(false);
		}
	}, {
		key: 'toggleTouchOutsideEvent',
		value: function toggleTouchOutsideEvent(enabled) {
			if (enabled) {
				if (!document.addEventListener && document.attachEvent) {
					document.attachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.addEventListener('touchstart', this.handleTouchOutside);
				}
			} else {
				if (!document.removeEventListener && document.detachEvent) {
					document.detachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.removeEventListener('touchstart', this.handleTouchOutside);
				}
			}
		}
	}, {
		key: 'handleTouchOutside',
		value: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target)) {
				this.closeMenu();
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			if (!this.input) return;
			this.input.focus();
		}
	}, {
		key: 'blurInput',
		value: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchEndClearValue',
		value: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (event.target.tagName === 'INPUT') {
				if (!this.state.isFocused) {
					this._openAfterFocus = this.props.openOnClick;
					this.focus();
				} else if (!this.state.isOpen) {
					this.setState({
						isOpen: true,
						isPseudoFocused: false
					});
				}

				return;
			}

			// prevent default event handlers
			event.preventDefault();

			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				// This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen
				});
			}

			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;
				var toOpen = true;

				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

				if (this._focusAfterClear) {
					toOpen = false;
					this._focusAfterClear = false;
				}

				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: toOpen,
					isPseudoFocused: false,
					focusedOption: null
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = this.props.openOnClick;
				this.focus();
				this.setState({ focusedOption: null });
			}
		}
	}, {
		key: 'handleMouseDownOnArrow',
		value: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (this.state.isOpen) {
				// prevent default event handlers
				event.stopPropagation();
				event.preventDefault();
				// close the menu
				this.closeMenu();
			} else {
				// If the menu isn't open, let the event bubble to the main handleMouseDown
				this.setState({
					isOpen: true
				});
			}
		}
	}, {
		key: 'handleMouseDownOnMenu',
		value: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu() {
			if (this.props.onCloseResetsInput) {
				this.setState({
					inputValue: this.handleInputValueChange(''),
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			} else {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			}
			this.hasScrolledToOption = false;
		}
	}, {
		key: 'handleInputFocus',
		value: function handleInputFocus(event) {
			if (this.props.disabled) return;

			var toOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
			toOpen = this._focusAfterClear ? false : toOpen; //if focus happens after clear values, don't open dropdown yet.

			if (this.props.onFocus) {
				this.props.onFocus(event);
			}

			this.setState({
				isFocused: true,
				isOpen: !!toOpen
			});

			this._focusAfterClear = false;
			this._openAfterFocus = false;
		}
	}, {
		key: 'handleInputBlur',
		value: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = this.handleInputValueChange('');
			}
			this.setState(onBlurredState);
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value) {
				newInputValue = this.handleInputValueChange(newInputValue);
			}

			this.setState({
				inputValue: newInputValue,
				isOpen: true,
				isPseudoFocused: false
			});
		}
	}, {
		key: 'setInputValue',
		value: function setInputValue(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			this.setState({
				inputValue: newValue
			});
		}
	}, {
		key: 'handleInputValueChange',
		value: function handleInputValueChange(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			return newValue;
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					break;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						break;
					}
					event.preventDefault();
					this.selectFocusedOption();
					break;
				case 13:
					// enter
					event.preventDefault();
					event.stopPropagation();
					if (this.state.isOpen) {
						this.selectFocusedOption();
					} else {
						this.focusNextOption();
					}
					break;
				case 27:
					// escape
					event.preventDefault();
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 32:
					// space
					if (this.props.searchable) {
						break;
					}
					event.preventDefault();
					if (!this.state.isOpen) {
						this.focusNextOption();
						break;
					}
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 38:
					// up
					event.preventDefault();
					this.focusPreviousOption();
					break;
				case 40:
					// down
					event.preventDefault();
					this.focusNextOption();
					break;
				case 33:
					// page up
					event.preventDefault();
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					event.preventDefault();
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						break;
					}
					event.preventDefault();
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						break;
					}
					event.preventDefault();
					this.focusStartOption();
					break;
				case 46:
					// delete
					if (!this.state.inputValue && this.props.deleteRemoves) {
						event.preventDefault();
						this.popValue();
					}
					break;
			}
		}
	}, {
		key: 'handleValueClick',
		value: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		}
	}, {
		key: 'handleMenuScroll',
		value: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;

			if (target.scrollHeight > target.offsetHeight && target.scrollHeight - target.offsetHeight - target.scrollTop <= 0) {
				this.props.onMenuScrollToBottom();
			}
		}
	}, {
		key: 'getOptionLabel',
		value: function getOptionLabel(op) {
			return op[this.props.labelKey];
		}

		/**
   * Turns a value into an array from the given options
   * @param {String|Number|Array} value		- the value of the select input
   * @param {Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
   * @returns	{Array}	the value of the select represented in an array
   */

	}, {
		key: 'getValueArray',
		value: function getValueArray(value) {
			var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = (typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') {
					value = value.split(props.delimiter);
				}
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		}
	}, {
		key: 'setValue',
		value: function setValue(value) {
			var _this2 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (this.props.required) {
				var required = handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this2.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			if (this.props.onChange) {
				this.props.onChange(value);
			}
		}
	}, {
		key: 'selectValue',
		value: function selectValue(value) {
			var _this3 = this;

			// NOTE: we actually add/set the value in a callback to make sure the
			// input value is empty to avoid styling issues in Chrome
			if (this.props.closeOnSelect) {
				this.hasScrolledToOption = false;
			}
			var updatedValue = this.props.onSelectResetsInput ? '' : this.state.inputValue;
			if (this.props.multi) {
				this.setState({
					focusedIndex: null,
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect
				}, function () {
					var valueArray = _this3.getValueArray(_this3.props.value);
					if (valueArray.some(function (i) {
						return i[_this3.props.valueKey] === value[_this3.props.valueKey];
					})) {
						_this3.removeValue(value);
					} else {
						_this3.addValue(value);
					}
				});
			} else {
				this.setState({
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect,
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this3.setValue(value);
				});
			}
		}
	}, {
		key: 'addValue',
		value: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			var visibleOptions = this._visibleOptions.filter(function (val) {
				return !val.disabled;
			});
			var lastValueIndex = visibleOptions.indexOf(value);
			this.setValue(valueArray.concat(value));
			if (visibleOptions.length - 1 === lastValueIndex) {
				// the last option was selected; focus the second-last one
				this.focusOption(visibleOptions[lastValueIndex - 1]);
			} else if (visibleOptions.length > lastValueIndex) {
				// focus the option below the selected one
				this.focusOption(visibleOptions[lastValueIndex + 1]);
			}
		}
	}, {
		key: 'popValue',
		value: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null);
		}
	}, {
		key: 'removeValue',
		value: function removeValue(value) {
			var _this4 = this;

			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.filter(function (i) {
				return i[_this4.props.valueKey] !== value[_this4.props.valueKey];
			}));
			this.focus();
		}
	}, {
		key: 'clearValue',
		value: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			event.preventDefault();

			this.setValue(this.getResetValue());
			this.setState({
				inputValue: this.handleInputValueChange(''),
				isOpen: false
			}, this.focus);

			this._focusAfterClear = true;
		}
	}, {
		key: 'getResetValue',
		value: function getResetValue() {
			if (this.props.resetValue !== undefined) {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			} else {
				return null;
			}
		}
	}, {
		key: 'focusOption',
		value: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		}
	}, {
		key: 'focusNextOption',
		value: function focusNextOption() {
			this.focusAdjacentOption('next');
		}
	}, {
		key: 'focusPreviousOption',
		value: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		}
	}, {
		key: 'focusPageUpOption',
		value: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		}
	}, {
		key: 'focusPageDownOption',
		value: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		}
	}, {
		key: 'focusStartOption',
		value: function focusStartOption() {
			this.focusAdjacentOption('start');
		}
	}, {
		key: 'focusEndOption',
		value: function focusEndOption() {
			this.focusAdjacentOption('end');
		}
	}, {
		key: 'focusAdjacentOption',
		value: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				var newState = {
					focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null),
					isOpen: true
				};
				if (this.props.onSelectResetsInput) {
					newState.inputValue = '';
				}
				this.setState(newState);
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var _potentialIndex = focusedIndex + this.props.pageSize;
				if (_potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = _potentialIndex;
				}
			}

			if (focusedIndex === -1) {
				focusedIndex = 0;
			}

			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		}
	}, {
		key: 'getFocusedOption',
		value: function getFocusedOption() {
			return this._focusedOption;
		}
	}, {
		key: 'selectFocusedOption',
		value: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		}
	}, {
		key: 'renderLoading',
		value: function renderLoading() {
			if (!this.props.isLoading) return;
			return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement('span', { className: 'Select-loading' })
			);
		}
	}, {
		key: 'renderValue',
		value: function renderValue(valueArray, isOpen) {
			var _this5 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				var showPlaceholder = shouldShowPlaceholder(this.state, this.props, isOpen);
				return showPlaceholder ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
						ValueComponent,
						{
							disabled: _this5.props.disabled || value.clearableValue === false,
							id: _this5._instancePrefix + '-value-' + i,
							instancePrefix: _this5._instancePrefix,
							key: 'value-' + i + '-' + value[_this5.props.valueKey],
							onClick: onClick,
							onRemove: _this5.removeValue,
							placeholder: _this5.props.placeholder,
							value: value
						},
						renderLabel(value, i),
						react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
							'span',
							{ className: 'Select-aria-only' },
							'\xA0'
						)
					);
				});
			} else if (shouldShowValue(this.state, this.props)) {
				if (isOpen) onClick = null;
				return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
					ValueComponent,
					{
						disabled: this.props.disabled,
						id: this._instancePrefix + '-value-item',
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						placeholder: this.props.placeholder,
						value: valueArray[0]
					},
					renderLabel(valueArray[0])
				);
			}
		}
	}, {
		key: 'renderInput',
		value: function renderInput(valueArray, focusedOptionIndex) {
			var _classNames,
			    _this6 = this;

			var className = classnames__WEBPACK_IMPORTED_MODULE_1___default()('Select-input', this.props.inputProps.className);
			var isOpen = this.state.isOpen;

			var ariaOwns = classnames__WEBPACK_IMPORTED_MODULE_1___default()((_classNames = {}, defineProperty(_classNames, this._instancePrefix + '-list', isOpen), defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

			var value = this.state.inputValue;
			if (value && !this.props.onSelectResetsInput && !this.state.isFocused) {
				// it hides input value when it is not focused and was not reset on select
				value = '';
			}

			var inputProps = _extends({}, this.props.inputProps, {
				'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
				'aria-describedby': this.props['aria-describedby'],
				'aria-expanded': '' + isOpen,
				'aria-haspopup': '' + isOpen,
				'aria-label': this.props['aria-label'],
				'aria-labelledby': this.props['aria-labelledby'],
				'aria-owns': ariaOwns,
				className: className,
				onBlur: this.handleInputBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleInputFocus,
				ref: function ref(_ref) {
					return _this6.input = _ref;
				},
				role: 'combobox',
				required: this.state.required,
				tabIndex: this.props.tabIndex,
				value: value
			});

			if (this.props.inputRenderer) {
				return this.props.inputRenderer(inputProps);
			}

			if (this.props.disabled || !this.props.searchable) {
				var divProps = objectWithoutProperties(this.props.inputProps, []);


				var _ariaOwns = classnames__WEBPACK_IMPORTED_MODULE_1___default()(defineProperty({}, this._instancePrefix + '-list', isOpen));
				return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement('div', _extends({}, divProps, {
					'aria-expanded': isOpen,
					'aria-owns': _ariaOwns,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					'aria-disabled': '' + this.props.disabled,
					'aria-label': this.props['aria-label'],
					'aria-labelledby': this.props['aria-labelledby'],
					className: className,
					onBlur: this.handleInputBlur,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref2) {
						return _this6.input = _ref2;
					},
					role: 'combobox',
					style: { border: 0, width: 1, display: 'inline-block' },
					tabIndex: this.props.tabIndex || 0
				}));
			}

			if (this.props.autosize) {
				return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_input_autosize__WEBPACK_IMPORTED_MODULE_0___default.a, _extends({ id: this.props.id }, inputProps, { minWidth: '5' }));
			}
			return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'div',
				{ className: className, key: 'input-wrap', style: { display: 'inline-block' } },
				react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement('input', _extends({ id: this.props.id }, inputProps))
			);
		}
	}, {
		key: 'renderClear',
		value: function renderClear() {
			var valueArray = this.getValueArray(this.props.value);
			if (!this.props.clearable || !valueArray.length || this.props.disabled || this.props.isLoading) return;
			var ariaLabel = this.props.multi ? this.props.clearAllText : this.props.clearValueText;
			var clear = this.props.clearRenderer();

			return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'span',
				{
					'aria-label': ariaLabel,
					className: 'Select-clear-zone',
					onMouseDown: this.clearValue,
					onTouchEnd: this.handleTouchEndClearValue,
					onTouchMove: this.handleTouchMove,
					onTouchStart: this.handleTouchStart,
					title: ariaLabel
				},
				clear
			);
		}
	}, {
		key: 'renderArrow',
		value: function renderArrow() {
			if (!this.props.arrowRenderer) return;

			var onMouseDown = this.handleMouseDownOnArrow;
			var isOpen = this.state.isOpen;
			var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen });

			if (!arrow) {
				return null;
			}

			return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'span',
				{
					className: 'Select-arrow-zone',
					onMouseDown: onMouseDown
				},
				arrow
			);
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions$$1(excludeOptions) {
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions$$1 = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : filterOptions;

				return filterOptions$$1(options, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					trimFilter: this.props.trimFilter,
					valueKey: this.props.valueKey
				});
			} else {
				return options;
			}
		}
	}, {
		key: 'onOptionRef',
		value: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.focused = ref;
			}
		}
	}, {
		key: 'renderMenu',
		value: function renderMenu(options, valueArray, focusedOption) {
			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
					focusOption: this.focusOption,
					inputValue: this.state.inputValue,
					instancePrefix: this._instancePrefix,
					labelKey: this.props.labelKey,
					onFocus: this.focusOption,
					onOptionRef: this.onOptionRef,
					onSelect: this.selectValue,
					optionClassName: this.props.optionClassName,
					optionComponent: this.props.optionComponent,
					optionRenderer: this.props.optionRenderer || this.getOptionLabel,
					options: options,
					removeValue: this.removeValue,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey
				});
			} else if (this.props.noResultsText) {
				return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			} else {
				return null;
			}
		}
	}, {
		key: 'renderHiddenField',
		value: function renderHiddenField(valueArray) {
			var _this7 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this7.props.valueKey]);
				}).join(this.props.delimiter);
				return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement('input', {
					disabled: this.props.disabled,
					name: this.props.name,
					ref: function ref(_ref3) {
						return _this7.value = _ref3;
					},
					type: 'hidden',
					value: value
				});
			}
			return valueArray.map(function (item, index) {
				return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement('input', {
					disabled: _this7.props.disabled,
					key: 'hidden.' + index,
					name: _this7.props.name,
					ref: 'value' + index,
					type: 'hidden',
					value: stringifyValue(item[_this7.props.valueKey])
				});
			});
		}
	}, {
		key: 'getFocusableOptionIndex',
		value: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;

			var valueKey = this.props.valueKey;
			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = -1;
				options.some(function (option, index) {
					var isOptionEqual = option[valueKey] === focusedOption[valueKey];
					if (isOptionEqual) {
						focusedOptionIndex = index;
					}
					return isOptionEqual;
				});
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}

			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		}
	}, {
		key: 'renderOuter',
		value: function renderOuter(options, valueArray, focusedOption) {
			var _this8 = this;

			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}

			return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'div',
				{ ref: function ref(_ref5) {
						return _this8.menuContainer = _ref5;
					}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
				react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
					'div',
					{
						className: 'Select-menu',
						id: this._instancePrefix + '-list',
						onMouseDown: this.handleMouseDownOnMenu,
						onScroll: this.handleMenuScroll,
						ref: function ref(_ref4) {
							return _this8.menu = _ref4;
						},
						role: 'listbox',
						style: this.props.menuStyle,
						tabIndex: -1
					},
					menu
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this9 = this;

			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi && this.props.removeSelected ? valueArray : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = options[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = classnames__WEBPACK_IMPORTED_MODULE_1___default()('Select', this.props.className, {
				'has-value': valueArray.length,
				'is-clearable': this.props.clearable,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'Select--multi': this.props.multi,
				'Select--rtl': this.props.rtl,
				'Select--single': !this.props.multi
			});

			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}

			return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				'div',
				{ ref: function ref(_ref7) {
						return _this9.wrapper = _ref7;
					},
					className: className,
					style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
					'div',
					{ ref: function ref(_ref6) {
							return _this9.control = _ref6;
						},
						className: 'Select-control',
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchMove: this.handleTouchMove,
						onTouchStart: this.handleTouchStart,
						style: this.props.style
					},
					react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
						'span',
						{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, valueArray, focusedOption) : null
			);
		}
	}]);
	return Select;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

Select$1.propTypes = {
	'aria-describedby': prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // html id(s) of element(s) that should be used to describe this input (for assistive tech)
	'aria-label': prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // aria label (for assistive tech)
	'aria-labelledby': prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // html id of an element that should be used as the label (for assistive tech)
	arrowRenderer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // create the drop-down caret element
	autoBlur: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // automatically blur the component when an option is selected
	autoFocus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // autofocus the component on mount
	autofocus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // deprecated; use autoFocus instead
	autosize: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether to enable autosizing or not
	backspaceRemoves: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether backspace removes an item if there is no text input
	backspaceToRemoveMessage: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
	className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // className for the outer element
	clearAllText: stringOrNode, // title for the "clear" control when multi: true
	clearRenderer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // create clearable x element
	clearValueText: stringOrNode, // title for the "clear" control
	clearable: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // should it be possible to reset value
	closeOnSelect: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether to close the menu when a value is selected
	deleteRemoves: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether delete removes an item if there is no text input
	delimiter: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // delimiter to use to join multiple values for the hidden field value
	disabled: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether the Select is disabled or not
	escapeClearsValue: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether escape clears the value when the menu is closed
	filterOption: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // method to filter a single option (option, filterString)
	filterOptions: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
	id: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // html id to set on the input element for accessibility or tests
	ignoreAccents: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether to strip diacritics when filtering
	ignoreCase: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether to perform case-insensitive filtering
	inputProps: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, // custom attributes for the Input
	inputRenderer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // returns a custom input component
	instanceId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // set the components instanceId
	isLoading: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether the Select is loading externally or not (such as options being loaded)
	joinValues: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
	labelKey: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // path of the label value in option objects
	matchPos: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // (any|start) match the start or entire string when filtering
	matchProp: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // (any|label|value) which option property to filter on
	menuBuffer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
	menuContainerStyle: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, // optional style to apply to the menu container
	menuRenderer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // renders a custom menu with options
	menuStyle: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, // optional style to apply to the menu
	multi: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // multi-value input
	name: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // generates a hidden <input /> tag with this field name for html forms
	noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
	onBlur: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // onBlur handler: function (event) {}
	onBlurResetsInput: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether input is cleared on blur
	onChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // onChange handler: function (newValue) {}
	onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // fires when the menu is closed
	onCloseResetsInput: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether input is cleared when menu is closed through the arrow
	onFocus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // onFocus handler: function (event) {}
	onInputChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // onInputChange handler: function (inputValue) {}
	onInputKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // input keyDown handler: function (event) {}
	onMenuScrollToBottom: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
	onOpen: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // fires when the menu is opened
	onSelectResetsInput: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether input is cleared on select (works only for multiselect)
	onValueClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // onClick handler for value labels: function (value, event) {}
	openOnClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // boolean to control opening the menu when the control is clicked
	openOnFocus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // always open options menu on focus
	optionClassName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // additional class(es) to apply to the <Option /> elements
	optionComponent: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // option component to render in dropdown
	optionRenderer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // optionRenderer: function (option) {}
	options: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array, // array of options
	pageSize: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, // number of entries to page when using page up/down keys
	placeholder: stringOrNode, // field placeholder, displayed when there's no value
	removeSelected: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether the selected option is removed from the dropdown on multi selects
	required: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // applies HTML5 required attribute when needed
	resetValue: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any, // value to use when you clear the control
	rtl: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // set to true in order to use react-select in right-to-left direction
	scrollMenuIntoView: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
	searchable: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether to enable searching feature or not
	simpleValue: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
	style: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, // optional style to apply to the control
	tabIndex: stringOrNumber, // optional tab index of the control
	tabSelectsValue: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether to treat tabbing out while focused to be value selection
	trimFilter: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // whether to trim whitespace around filter value
	value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any, // initial field value
	valueComponent: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // value component to render
	valueKey: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, // path of the label value in option objects
	valueRenderer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // valueRenderer: function (option) {}
	wrapperStyle: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object // optional style to apply to the component wrapper
};

Select$1.defaultProps = {
	arrowRenderer: arrowRenderer,
	autosize: true,
	backspaceRemoves: true,
	backspaceToRemoveMessage: 'Press backspace to remove {label}',
	clearable: true,
	clearAllText: 'Clear all',
	clearRenderer: clearRenderer,
	clearValueText: 'Clear value',
	closeOnSelect: true,
	deleteRemoves: true,
	delimiter: ',',
	disabled: false,
	escapeClearsValue: true,
	filterOptions: filterOptions,
	ignoreAccents: true,
	ignoreCase: true,
	inputProps: {},
	isLoading: false,
	joinValues: false,
	labelKey: 'label',
	matchPos: 'any',
	matchProp: 'any',
	menuBuffer: 0,
	menuRenderer: menuRenderer,
	multi: false,
	noResultsText: 'No results found',
	onBlurResetsInput: true,
	onCloseResetsInput: true,
	onSelectResetsInput: true,
	openOnClick: true,
	optionComponent: Option,
	pageSize: 5,
	placeholder: 'Select...',
	removeSelected: true,
	required: false,
	rtl: false,
	scrollMenuIntoView: true,
	searchable: true,
	simpleValue: false,
	tabSelectsValue: true,
	trimFilter: true,
	valueComponent: Value,
	valueKey: 'value'
};

var propTypes = {
	autoload: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any, // object to use to cache results; set to null/false to disable caching
	children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // strip diacritics when filtering; defaults to true
	ignoreCase: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // perform case-insensitive filtering; defaults to true
	loadOptions: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	loadingPlaceholder: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([// replaces the placeholder while options are loading
	prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]),
	multi: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool, // multi-value input
	noResultsText: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([// field noResultsText, displayed when no options come back from the server
	prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]),
	onChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // onChange handler: function (newValue) {}
	onInputChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, // optional for keeping track of what is being typed
	options: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired, // array of options
	placeholder: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
	prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]),
	searchPromptText: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([// label to prompt for search input
	prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]),
	value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any // initial field value
};

var defaultCache = {};

var defaultChildren = function defaultChildren(props) {
	return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Select$1, props);
};

var defaultProps = {
	autoload: true,
	cache: defaultCache,
	children: defaultChildren,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	searchPromptText: 'Type to search'
};

var Async = function (_Component) {
	inherits(Async, _Component);

	function Async(props, context) {
		classCallCheck(this, Async);

		var _this = possibleConstructorReturn(this, (Async.__proto__ || Object.getPrototypeOf(Async)).call(this, props, context));

		_this._cache = props.cache === defaultCache ? {} : props.cache;

		_this.state = {
			inputValue: '',
			isLoading: false,
			options: props.options
		};

		_this.onInputChange = _this.onInputChange.bind(_this);
		return _this;
	}

	createClass(Async, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var autoload = this.props.autoload;


			if (autoload) {
				this.loadOptions('');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.options !== this.props.options) {
				this.setState({
					options: nextProps.options
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._callback = null;
		}
	}, {
		key: 'loadOptions',
		value: function loadOptions(inputValue) {
			var _this2 = this;

			var loadOptions = this.props.loadOptions;

			var cache = this._cache;

			if (cache && Object.prototype.hasOwnProperty.call(cache, inputValue)) {
				this._callback = null;

				this.setState({
					isLoading: false,
					options: cache[inputValue]
				});

				return;
			}

			var callback = function callback(error, data) {
				var options = data && data.options || [];

				if (cache) {
					cache[inputValue] = options;
				}

				if (callback === _this2._callback) {
					_this2._callback = null;

					_this2.setState({
						isLoading: false,
						options: options
					});
				}
			};

			// Ignore all but the most recent request
			this._callback = callback;

			var promise = loadOptions(inputValue, callback);
			if (promise) {
				promise.then(function (data) {
					return callback(null, data);
				}, function (error) {
					return callback(error);
				});
			}

			if (this._callback && !this.state.isLoading) {
				this.setState({
					isLoading: true
				});
			}
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(inputValue) {
			var _props = this.props,
			    ignoreAccents = _props.ignoreAccents,
			    ignoreCase = _props.ignoreCase,
			    onInputChange = _props.onInputChange;

			var newInputValue = inputValue;

			if (onInputChange) {
				var value = onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null
				if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
					newInputValue = '' + value;
				}
			}

			var transformedInputValue = newInputValue;

			if (ignoreAccents) {
				transformedInputValue = stripDiacritics(transformedInputValue);
			}

			if (ignoreCase) {
				transformedInputValue = transformedInputValue.toLowerCase();
			}

			this.setState({ inputValue: newInputValue });
			this.loadOptions(transformedInputValue);

			// Return new input value, but without applying toLowerCase() to avoid modifying the user's view case of the input while typing.
			return newInputValue;
		}
	}, {
		key: 'noResultsText',
		value: function noResultsText() {
			var _props2 = this.props,
			    loadingPlaceholder = _props2.loadingPlaceholder,
			    noResultsText = _props2.noResultsText,
			    searchPromptText = _props2.searchPromptText;
			var _state = this.state,
			    inputValue = _state.inputValue,
			    isLoading = _state.isLoading;


			if (isLoading) {
				return loadingPlaceholder;
			}
			if (inputValue && noResultsText) {
				return noResultsText;
			}
			return searchPromptText;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props3 = this.props,
			    children = _props3.children,
			    loadingPlaceholder = _props3.loadingPlaceholder,
			    placeholder = _props3.placeholder;
			var _state2 = this.state,
			    isLoading = _state2.isLoading,
			    options = _state2.options;


			var props = {
				noResultsText: this.noResultsText(),
				placeholder: isLoading ? loadingPlaceholder : placeholder,
				options: isLoading && loadingPlaceholder ? [] : options,
				ref: function ref(_ref) {
					return _this3.select = _ref;
				}
			};

			return children(_extends({}, this.props, props, {
				isLoading: isLoading,
				onInputChange: this.onInputChange
			}));
		}
	}]);
	return Async;
}(react__WEBPACK_IMPORTED_MODULE_3__["Component"]);

Async.propTypes = propTypes;
Async.defaultProps = defaultProps;

var CreatableSelect = function (_React$Component) {
	inherits(CreatableSelect, _React$Component);

	function CreatableSelect(props, context) {
		classCallCheck(this, CreatableSelect);

		var _this = possibleConstructorReturn(this, (CreatableSelect.__proto__ || Object.getPrototypeOf(CreatableSelect)).call(this, props, context));

		_this.filterOptions = _this.filterOptions.bind(_this);
		_this.menuRenderer = _this.menuRenderer.bind(_this);
		_this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
		_this.onInputChange = _this.onInputChange.bind(_this);
		_this.onOptionSelect = _this.onOptionSelect.bind(_this);
		return _this;
	}

	createClass(CreatableSelect, [{
		key: 'createNewOption',
		value: function createNewOption() {
			var _props = this.props,
			    isValidNewOption = _props.isValidNewOption,
			    newOptionCreator = _props.newOptionCreator,
			    onNewOptionClick = _props.onNewOptionClick,
			    _props$options = _props.options,
			    options = _props$options === undefined ? [] : _props$options;


			if (isValidNewOption({ label: this.inputValue })) {
				var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
				var _isOptionUnique = this.isOptionUnique({ option: option, options: options });

				// Don't add the same option twice.
				if (_isOptionUnique) {
					if (onNewOptionClick) {
						onNewOptionClick(option);
					} else {
						options.unshift(option);

						this.select.selectValue(option);
					}
				}
			}
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions$$1() {
			var _props2 = this.props,
			    filterOptions$$1 = _props2.filterOptions,
			    isValidNewOption = _props2.isValidNewOption,
			    promptTextCreator = _props2.promptTextCreator;

			// TRICKY Check currently selected options as well.
			// Don't display a create-prompt for a value that's selected.
			// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.

			var excludeOptions = (arguments.length <= 2 ? undefined : arguments[2]) || [];

			var filteredOptions = filterOptions$$1.apply(undefined, arguments) || [];

			if (isValidNewOption({ label: this.inputValue })) {
				var _newOptionCreator = this.props.newOptionCreator;


				var option = _newOptionCreator({
					label: this.inputValue,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
				// For multi-selects, this would remove it from the filtered list.
				var _isOptionUnique2 = this.isOptionUnique({
					option: option,
					options: excludeOptions.concat(filteredOptions)
				});

				if (_isOptionUnique2) {
					var prompt = promptTextCreator(this.inputValue);

					this._createPlaceholderOption = _newOptionCreator({
						label: prompt,
						labelKey: this.labelKey,
						valueKey: this.valueKey
					});

					filteredOptions.unshift(this._createPlaceholderOption);
				}
			}

			return filteredOptions;
		}
	}, {
		key: 'isOptionUnique',
		value: function isOptionUnique(_ref) {
			var option = _ref.option,
			    options = _ref.options;
			var isOptionUnique = this.props.isOptionUnique;


			options = options || this.props.options;

			return isOptionUnique({
				labelKey: this.labelKey,
				option: option,
				options: options,
				valueKey: this.valueKey
			});
		}
	}, {
		key: 'menuRenderer',
		value: function menuRenderer$$1(params) {
			var menuRenderer$$1 = this.props.menuRenderer;


			return menuRenderer$$1(_extends({}, params, {
				onSelect: this.onOptionSelect,
				selectValue: this.onOptionSelect
			}));
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(input) {
			var onInputChange = this.props.onInputChange;

			// This value may be needed in between Select mounts (when this.select is null)

			this.inputValue = input;

			if (onInputChange) {
				this.inputValue = onInputChange(input);
			}

			return this.inputValue;
		}
	}, {
		key: 'onInputKeyDown',
		value: function onInputKeyDown(event) {
			var _props3 = this.props,
			    shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption,
			    onInputKeyDown = _props3.onInputKeyDown;

			var focusedOption = this.select.getFocusedOption();

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
				this.createNewOption();

				// Prevent decorated Select from doing anything additional with this keyDown event
				event.preventDefault();
			} else if (onInputKeyDown) {
				onInputKeyDown(event);
			}
		}
	}, {
		key: 'onOptionSelect',
		value: function onOptionSelect(option) {
			if (option === this._createPlaceholderOption) {
				this.createNewOption();
			} else {
				this.select.selectValue(option);
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props4 = this.props,
			    refProp = _props4.ref,
			    restProps = objectWithoutProperties(_props4, ['ref']);
			var children = this.props.children;

			// We can't use destructuring default values to set the children,
			// because it won't apply work if `children` is null. A falsy check is
			// more reliable in real world use-cases.

			if (!children) {
				children = defaultChildren$2;
			}

			var props = _extends({}, restProps, {
				allowCreate: true,
				filterOptions: this.filterOptions,
				menuRenderer: this.menuRenderer,
				onInputChange: this.onInputChange,
				onInputKeyDown: this.onInputKeyDown,
				ref: function ref(_ref2) {
					_this2.select = _ref2;

					// These values may be needed in between Select mounts (when this.select is null)
					if (_ref2) {
						_this2.labelKey = _ref2.props.labelKey;
						_this2.valueKey = _ref2.props.valueKey;
					}
					if (refProp) {
						refProp(_ref2);
					}
				}
			});

			return children(props);
		}
	}]);
	return CreatableSelect;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

var defaultChildren$2 = function defaultChildren(props) {
	return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Select$1, props);
};

var isOptionUnique = function isOptionUnique(_ref3) {
	var option = _ref3.option,
	    options = _ref3.options,
	    labelKey = _ref3.labelKey,
	    valueKey = _ref3.valueKey;

	if (!options || !options.length) {
		return true;
	}

	return options.filter(function (existingOption) {
		return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
	}).length === 0;
};

var isValidNewOption = function isValidNewOption(_ref4) {
	var label = _ref4.label;
	return !!label;
};

var newOptionCreator = function newOptionCreator(_ref5) {
	var label = _ref5.label,
	    labelKey = _ref5.labelKey,
	    valueKey = _ref5.valueKey;

	var option = {};
	option[valueKey] = label;
	option[labelKey] = label;
	option.className = 'Select-create-option-placeholder';

	return option;
};

var promptTextCreator = function promptTextCreator(label) {
	return 'Create option "' + label + '"';
};

var shouldKeyDownEventCreateNewOption = function shouldKeyDownEventCreateNewOption(_ref6) {
	var keyCode = _ref6.keyCode;

	switch (keyCode) {
		case 9: // TAB
		case 13: // ENTER
		case 188:
			// COMMA
			return true;
		default:
			return false;
	}
};

// Default prop methods
CreatableSelect.isOptionUnique = isOptionUnique;
CreatableSelect.isValidNewOption = isValidNewOption;
CreatableSelect.newOptionCreator = newOptionCreator;
CreatableSelect.promptTextCreator = promptTextCreator;
CreatableSelect.shouldKeyDownEventCreateNewOption = shouldKeyDownEventCreateNewOption;

CreatableSelect.defaultProps = {
	filterOptions: filterOptions,
	isOptionUnique: isOptionUnique,
	isValidNewOption: isValidNewOption,
	menuRenderer: menuRenderer,
	newOptionCreator: newOptionCreator,
	promptTextCreator: promptTextCreator,
	shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
};

CreatableSelect.propTypes = {
	// Child function responsible for creating the inner Select component
	// This component can be used to compose HOCs (eg Creatable and Async)
	// (props: Object): PropTypes.element
	children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

	// See Select.propTypes.filterOptions
	filterOptions: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any,

	// Searches for any matching option within the set of options.
	// This function prevents duplicate options from being created.
	// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
	isOptionUnique: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

	// Determines if the current input text represents a valid option.
	// ({ label: string }): boolean
	isValidNewOption: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

	// See Select.propTypes.menuRenderer
	menuRenderer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any,

	// Factory to create new option.
	// ({ label: string, labelKey: string, valueKey: string }): Object
	newOptionCreator: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

	// input change handler: function (inputValue) {}
	onInputChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

	// input keyDown handler: function (event) {}
	onInputKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

	// new option click handler: function (option) {}
	onNewOptionClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

	// See Select.propTypes.options
	options: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,

	// Creates prompt/placeholder option text.
	// (filterText: string): string
	promptTextCreator: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

	ref: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

	// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
	shouldKeyDownEventCreateNewOption: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
};

var AsyncCreatableSelect = function (_React$Component) {
	inherits(AsyncCreatableSelect, _React$Component);

	function AsyncCreatableSelect() {
		classCallCheck(this, AsyncCreatableSelect);
		return possibleConstructorReturn(this, (AsyncCreatableSelect.__proto__ || Object.getPrototypeOf(AsyncCreatableSelect)).apply(this, arguments));
	}

	createClass(AsyncCreatableSelect, [{
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
				Async,
				this.props,
				function (_ref) {
					var ref = _ref.ref,
					    asyncProps = objectWithoutProperties(_ref, ['ref']);

					var asyncRef = ref;
					return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
						CreatableSelect,
						asyncProps,
						function (_ref2) {
							var ref = _ref2.ref,
							    creatableProps = objectWithoutProperties(_ref2, ['ref']);

							var creatableRef = ref;
							return _this2.props.children(_extends({}, creatableProps, {
								ref: function ref(select) {
									creatableRef(select);
									asyncRef(select);
									_this2.select = select;
								}
							}));
						}
					);
				}
			);
		}
	}]);
	return AsyncCreatableSelect;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

var defaultChildren$1 = function defaultChildren(props) {
	return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Select$1, props);
};

AsyncCreatableSelect.propTypes = {
	children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
};

AsyncCreatableSelect.defaultProps = {
	children: defaultChildren$1
};

Select$1.Async = Async;
Select$1.AsyncCreatable = AsyncCreatableSelect;
Select$1.Creatable = CreatableSelect;
Select$1.Value = Value;
Select$1.Option = Option;


/* harmony default export */ __webpack_exports__["default"] = (Select$1);


/***/ }),

/***/ "./node_modules/util/node_modules/inherits/inherits_browser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/util/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

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
/* harmony import */ var _lib_playerQueryService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/playerQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerQueryService.js");
/* harmony import */ var _commonAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commonAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/commonAction.js");
/* harmony import */ var _gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gridHandlerAction */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/gridHandlerAction.js");
/* harmony import */ var _lib_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/constants.js */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerDataBuilder.js");
/* harmony import */ var _lib_playerSuggestionService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/playerSuggestionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerSuggestionService.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var processBeforeGettingData = function processBeforeGettingData(dispatch) {
  dispatch(Object(_commonAction__WEBPACK_IMPORTED_MODULE_3__["setSelectedPlayer"])(null));
  dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setIsFetchingData"])(true));
  dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(true));
};

var searchPlayer = function searchPlayer(param) {
  return function (dispatch) {
    var service = new _lib_playerQueryService__WEBPACK_IMPORTED_MODULE_2__["default"]();
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
        var selectedPlayer = Object(_lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_6__["buildSelectedPlayer"])(playerList[0]);
        dispatch(Object(_commonAction__WEBPACK_IMPORTED_MODULE_3__["setSelectedPlayer"])(selectedPlayer));
      }

      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(false));
    }).catch(function () {
      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(false));
    });
  };
};
var getSinglePlayer = function getSinglePlayer(custId) {
  return function (dispatch) {
    var service = new _lib_playerQueryService__WEBPACK_IMPORTED_MODULE_2__["default"]();
    processBeforeGettingData(dispatch);
    service.getSinglePlayer(custId).then(function (result) {
      if (result) {
        dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setPlayerList"])([result]));
        dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setIsFetchingData"])(false));

        var pagingOption = _objectSpread({}, _lib_constants_js__WEBPACK_IMPORTED_MODULE_5__["defaultPagingOption"], {
          TotalItem: 1
        });

        dispatch(Object(_gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__["setPagingOption"])(pagingOption));
        var selectedPlayer = Object(_lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_6__["buildSelectedPlayer"])(result);
        dispatch(Object(_commonAction__WEBPACK_IMPORTED_MODULE_3__["setSelectedPlayer"])(selectedPlayer));
      }

      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_1__["toggleLoader"])(false));
    }).catch(function () {
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
    var suggestionService = new _lib_playerSuggestionService__WEBPACK_IMPORTED_MODULE_7__["default"]();
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
/* harmony import */ var _lib_playerCommandService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/playerCommandService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerCommandService.js");

var updateBaStatus = function updateBaStatus(param) {
  return function () {
    var commandService = new _lib_playerCommandService__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
/* harmony import */ var _lib_playerQueryService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/playerQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerQueryService.js");


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
    var service = new _lib_playerQueryService__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
/* harmony import */ var _lib_playerCommandService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/playerCommandService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerCommandService.js");


var setOddsGroupDropdownPosition = function setOddsGroupDropdownPosition(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_ODDSGROUP_POSITION"],
    data: data
  };
};
var updateOddsGroup = function updateOddsGroup(param) {
  return function () {
    var commandService = new _lib_playerCommandService__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
/* harmony import */ var _lib_playerCommandService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/playerCommandService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerCommandService.js");


var setStatusDropdownPosition = function setStatusDropdownPosition(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_STATUS_POSITION"],
    data: data
  };
};
var updatePlayerStatus = function updatePlayerStatus(param) {
  return function () {
    var commandService = new _lib_playerCommandService__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
/* harmony import */ var _lib_playerCommandService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/playerCommandService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerCommandService.js");


var setSpecialLevelDropdownPosition = function setSpecialLevelDropdownPosition(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SPECIAL_LEVEL_POSITION"],
    data: data
  };
};
var updateSpecialLevel = function updateSpecialLevel(param) {
  return function () {
    var commandService = new _lib_playerCommandService__WEBPACK_IMPORTED_MODULE_1__["default"]();
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










var ActionCreators = Object.assign({}, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__, _commonAction__WEBPACK_IMPORTED_MODULE_3__, _filterHandlerAction__WEBPACK_IMPORTED_MODULE_1__, _playerDetailHandlerAction__WEBPACK_IMPORTED_MODULE_2__, _gridHandlerAction__WEBPACK_IMPORTED_MODULE_4__, _gridBaStatusAction__WEBPACK_IMPORTED_MODULE_5__, _gridOddsGroupAction__WEBPACK_IMPORTED_MODULE_6__, _gridSpecialLevelAction__WEBPACK_IMPORTED_MODULE_7__, _gridPlayerStatusAction__WEBPACK_IMPORTED_MODULE_8__, _gridUserNameAction__WEBPACK_IMPORTED_MODULE_9__);

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
/* harmony import */ var _lib_playerQueryService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/playerQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerQueryService.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js");


var getLink = function getLink(systemType, action) {
  return function () {
    var service = new _lib_playerQueryService__WEBPACK_IMPORTED_MODULE_0__["default"]();
    return service.getLink(systemType, action);
  };
};
var getTabList = function getTabList() {
  return function () {
    var service = new _lib_playerQueryService__WEBPACK_IMPORTED_MODULE_0__["default"]();
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

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/types.js ***!
  \*********************************************************************************/
/*! exports provided: SET_PARAM, SET_PLAYER_LIST, SET_SELECTED_PLAYER, SET_SELECTED_PLAYERID_LIST, SET_ADVANCED_SEARCH, SET_COLLAPSE_FILTER, SET_DISPLAYED_COLUMN_LIST, SET_CURRENT_ACTIVE_PLAYER, SET_PAGING, SET_SELECTED_TAB_NAME, SET_IS_FETCHING_DATA, SET_ODDSGROUP_POSITION, SET_SPECIAL_LEVEL_POSITION, SET_STATUS_POSITION, SET_CONTEXT_MENU, SET_SWEET_ALERT_OPTION */
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
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
/* harmony import */ var _lib_gridHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/gridHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridHelper.js");
/* harmony import */ var _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridInteractionService.js");
/* harmony import */ var _grid_OddsGroupDropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./grid/OddsGroupDropdown */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/OddsGroupDropdown.jsx");
/* harmony import */ var _grid_PlayerRow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./grid/PlayerRow */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/PlayerRow.jsx");
/* harmony import */ var _grid_StatusDropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./grid/StatusDropdown */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/components/grid/StatusDropdown.jsx");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js");
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
      var sortedPlayerList = _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_8__["default"].sortPlayerList(playerList, sortBy, sortOrder);
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
          key: dataItem.CustId
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
        return item.CustId === selectedPlayer.custId;
      })] : playerList;
      var displayedColumn = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_12__["buildDisplayedColumnObject"])(displayedColumnList);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Table"], {
        minWidth: 650,
        autoWidth: true,
        maxWidth: this.maxWidth,
        autoHeight: true,
        header: _lib_gridHelper__WEBPACK_IMPORTED_MODULE_7__["default"].renderHeader(displayedColumn),
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
    });

    _this.state = {
      bankAccountNumber: '',
      email: '',
      currency: '',
      oddsGroup: '',
      specialLevel: '',
      baFilter: _lib_constants__WEBPACK_IMPORTED_MODULE_8__["baStatusList"].All,
      searchOption: _lib_constants__WEBPACK_IMPORTED_MODULE_8__["searchOptions"].matchCase
    };
    _this.userGuide = _this._renderUserGuide();
    _this.allSpecialLevel = Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_8__["specialLevelListWithColor"]).map(function (item) {
      return item;
    }).join(',');
    _this.userNameRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    return _this;
  }

  _createClass(FormFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var custId = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_13__["default"].getParam(window.location.href, 'custId');

      if (custId) {
        this.props.getSinglePlayer(custId);
        this.userNameRef.current.value = _jsroot_lib_QueryString__WEBPACK_IMPORTED_MODULE_13__["default"].getParam(window.location.href, 'userName');
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var isAdvancedSearch = this.props.isAdvancedSearch;

      if (prevProps.isAdvancedSearch !== isAdvancedSearch && !isAdvancedSearch) {
        this.setState({
          currency: '',
          oddsGroup: '',
          specialLevel: '',
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

      var _this$props = this.props,
          pagingOption = _this$props.pagingOption,
          searchPlayer = _this$props.searchPlayer;

      var _this$state2 = this.state,
          specialLevel = _this$state2.specialLevel,
          allParam = _objectWithoutProperties(_this$state2, ["specialLevel"]);

      var actualSpecialLevel = specialLevel.trim();

      var param = _objectSpread({}, allParam, {
        userName: userName,
        specialLevel: actualSpecialLevel === '' ? this.allSpecialLevel : actualSpecialLevel,
        pageSize: pagingOption.PageSize,
        pageIndex: pagingOption.PageIndex
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
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state3 = this.state,
          bankAccountNumber = _this$state3.bankAccountNumber,
          email = _this$state3.email,
          searchOption = _this$state3.searchOption,
          advancedSearchParam = _objectWithoutProperties(_this$state3, ["bankAccountNumber", "email", "searchOption"]);

      var _this$props2 = this.props,
          type = _this$props2.type,
          isAdvancedSearch = _this$props2.isAdvancedSearch,
          isFilterCollapsing = _this$props2.isFilterCollapsing,
          currencyList = _this$props2.currencyList,
          getSuggestionList = _this$props2.getSuggestionList;
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
      }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getSingleResource("Username"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filter_SearchOption__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
        onKeyPress: this.handlePressEnter
      }))), type === _lib_constants__WEBPACK_IMPORTED_MODULE_8__["licenseeType"].nonApi && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filter_AthenaSearch__WEBPACK_IMPORTED_MODULE_7__["default"], {
        onChange: this.handleChange,
        bankAccountNumber: bankAccountNumber,
        email: email,
        onKeyPress: this.handlePressEnter
      }), isAdvancedSearch && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filter_AdvancedSearch__WEBPACK_IMPORTED_MODULE_5__["default"], {
        currencyList: currencyList,
        param: advancedSearchParam,
        onChange: this.handleSpecificInputChange
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
      getSinglePlayer = _actions_index_js__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].getSinglePlayer;
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    searchPlayer: searchPlayer,
    setAdvancedSearch: setAdvancedSearch,
    setCollapseFilter: setCollapseFilter,
    getSuggestionList: getSuggestionList,
    getSinglePlayer: getSinglePlayer
  }, dispatch);
}

function mapStateToProps(state) {
  var type = state.type,
      isAdvancedSearch = state.isAdvancedSearch,
      isFilterCollapsing = state.isFilterCollapsing,
      pagingOption = state.pagingOption,
      currencyList = state.currencyList;
  return Object.assign({}, {
    type: type,
    isAdvancedSearch: isAdvancedSearch,
    isFilterCollapsing: isFilterCollapsing,
    pagingOption: pagingOption,
    currencyList: currencyList
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
/* harmony import */ var _constants_configInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants/configInfo */ "./www/js/source/reactpages/Module/constants/configInfo.js");
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
    value: function _buildActionUrl(systemType, action) {
      var selectedPlayer = this.props.selectedPlayer;
      var custId = selectedPlayer.custId,
          licenseeCustId = selectedPlayer.licenseeCustId,
          currencyId = selectedPlayer.currencyId;
      var custIdQueryString = systemType === _constants_configInfo__WEBPACK_IMPORTED_MODULE_5__["systemType"].lrf ? "custId=".concat(custId) : "custId=".concat(custId, "&licenseeCustId=").concat(licenseeCustId);
      var nameValuePairString = custIdQueryString + "&currencyId=".concat(currencyId);
      var queryString = (action.indexOf('?') !== -1 ? '&' : '?') + nameValuePairString;
      var urlByPlayer = action + queryString;
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
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js");
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
          exportExcel = _this$props2.exportExcel;

      if (displayedColumnList.filter(function (x) {
        return x.show;
      }).length === 0) {
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("NoInfo"));
        return;
      }

      var displayedColumn = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_7__["buildDisplayedColumnObject"])(displayedColumnList);
      exportExcel(playerList, param, displayedColumn);
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

      var selectedPlayer = this.props.selectedPlayer;

      if (selectedPlayer) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "link",
          onClick: function onClick() {
            return _this2.props.setSelectedPlayer(null);
          }
        }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('PreviousSearchResult')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "chevron right icon-separator"
        }), " Player: ", selectedPlayer.userName, " (", selectedPlayer.currency, ")"));
      } else {
        var playerCount = this.props.playerCount;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          key: "searchResult"
        }, "Search Result: ".concat(playerCount, " Player(s)"));
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
  var playerCount = pagingOption.TotalItem || 0;
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
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js");
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
        Value: Object(_lib_utils__WEBPACK_IMPORTED_MODULE_6__["getSpecialLevelText"])(item),
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
          param = _this$props.param;
      var currency = param.currency,
          oddsGroup = param.oddsGroup,
          specialLevel = param.specialLevel,
          baFilter = param.baFilter;

      var convertedCurrencyList = this._createSelectData(currencyList, currency);

      var oddsGroupList = this._createSelectData(this.oddsGroupList, oddsGroup);

      var specialLevelList = this._createSelectData(this.specialLevelList, specialLevel);

      var selectedBaStatus = this.baStatusList.find(function (x) {
        return x.value === baFilter;
      });
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
          return _this2.handleChange('currency', selectedItemsKey);
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
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
    currency: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
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
    onKeyPress: onKeyPress
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
    onKeyPress: onKeyPress
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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
  var selectedValue = value || _lib_constants__WEBPACK_IMPORTED_MODULE_2__["searchOptions"].matchCase;
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
  }), "Match prefix e.g. \"", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
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
  }), "Match case e.g. AB\"", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
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

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var UserNameInput = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (props, userNameRef) {
  var onSelectItem = props.onSelectItem,
      minChar = props.minChar,
      getSuggestionList = props.getSuggestionList,
      searchOption = props.searchOption,
      inputAttributes = _objectWithoutProperties(props, ["onSelectItem", "minChar", "getSuggestionList", "searchOption"]);

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

  var handleChange = function handleChange() {
    var element = userNameRef.current;

    if (!element) {
      return;
    }

    var value = element.value;

    if (value.length >= minChar) {
      var param = {
        keyword: value,
        searchType: searchOption
      };
      getSuggestionList(param).then(function (response) {
        var rect = element.getBoundingClientRect();
        var style = {
          left: rect.left,
          top: rect.top + rect.height,
          width: rect.width,
          position: 'fixed'
        };
        setDropdownStyle(style);
        setSuggestionList(response.data || []);
        var hasData = response.data && response.data.length;
        setIsOpenSuggestion(!!hasData);
      });
    } else {
      setIsOpenSuggestion(false);
      setSuggestionList([]);
    }
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
/* harmony import */ var _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridInteractionService.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var generateConfirmOption = function generateConfirmOption(content) {
  return {
    buttons: [{
      text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('Submit'),
      className: 'btn btn-apply'
    }, {
      text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('Cancel'),
      className: 'btn'
    }],
    icon: 'warning',
    isShow: true,
    children: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "center-align"
    }, content)
  };
};

var alertOption = {
  buttons: [{
    text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('OK'),
    className: 'btn btn-apply'
  }],
  icon: 'success',
  isShow: true,
  children: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "center-align"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('UpdateSuccess'))
};

var BaStatusCell = function BaStatusCell(props) {
  var dataItem = props.dataItem,
      setPlayerList = props.setPlayerList,
      toggleLoader = props.toggleLoader,
      updateBaStatus = props.updateBaStatus,
      setSweetAlertOption = props.setSweetAlertOption;
  var CustId = dataItem.CustId,
      BaStatus = dataItem.BaStatus,
      OddsGroup = dataItem.OddsGroup;

  var handleChangeBaStatus = function handleChangeBaStatus(event) {
    var isBa = event.target.checked;
    var resourceName = isBa ? 'AlertTurnOnBAMsg' : 'AlertTurnOffBAMsg';
    var confirmMessage = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(resourceName);
    var confirmOption = generateConfirmOption(confirmMessage);
    var submitButton = confirmOption.buttons[0];
    confirmOption.buttons[0] = _objectSpread({}, submitButton, {
      onClick: function onClick() {
        setSweetAlertOption(_objectSpread({}, alertOption));
      }
    });

    confirmOption.buttons[1].onClick = function () {
      setSweetAlertOption(null);
    };

    confirmOption.onClose = function () {
      return setSweetAlertOption(null);
    };

    setSweetAlertOption(confirmOption);
    return;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    var param = {
      custId: CustId,
      isBa: isBa
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
        var newPlayerList = _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_7__["default"].updatePlayerWithBaStatus(playerList, CustId, isBa, oddsGroup);
        setPlayerList(newPlayerList);
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('UpdateSuccess'));
      } else {
        var errMsg = Message || _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(ErrorMessage);
        window.alert(errMsg);
      }

      toggleLoader(false);
    }).catch(function (error) {
      console.log(error.message);
      var message = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_8__["getErrorMessageForUpdating"])(error);
      window.alert(message);
      toggleLoader(false);
    });
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
    className: "center-align"
  }, BaStatus !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Switcher__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  var playerList = state.playerList;
  return Object.assign({}, {
    playerList: playerList
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
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _lib_contextMenuHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/contextMenuHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/contextMenuHelper.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var ContextMenu = function ContextMenu(props) {
  var setSelectedPlayer = props.setSelectedPlayer,
      currentActivePlayer = props.currentActivePlayer,
      setSelectedTabName = props.setSelectedTabName,
      getTabList = props.getTabList,
      contextMenu = props.contextMenu;
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
    var custId = currentActivePlayer.custId,
        userName = currentActivePlayer.userName,
        currency = currentActivePlayer.currency,
        isDeposit = currentActivePlayer.isDeposit,
        isArchived = currentActivePlayer.isArchived,
        licenseeCustId = currentActivePlayer.licenseeCustId,
        currencyId = currentActivePlayer.currencyId;
    var selectedPlayer = {
      custId: custId,
      userName: userName,
      currency: currency,
      isDeposit: isDeposit,
      isArchived: isArchived,
      licenseeCustId: licenseeCustId,
      currencyId: currencyId
    };
    setSelectedPlayer(selectedPlayer);
  };

  var style = position && {
    top: position.y,
    left: position.x
  };
  var activeMenuList = [];

  if (currentActivePlayer) {
    var isDeposit = currentActivePlayer.isDeposit,
        isArchived = currentActivePlayer.isArchived,
        status = currentActivePlayer.status;
    var tabList = getTabList();
    activeMenuList = _lib_constants__WEBPACK_IMPORTED_MODULE_5__["contextMenuList"].filter(function (item) {
      var isClosedPlayer = status === _lib_constants__WEBPACK_IMPORTED_MODULE_5__["playerStatusByName"].Closed;
      return !!tabList.find(function (t) {
        return item.tabName === t.Name;
      }) && Object(_lib_contextMenuHelper__WEBPACK_IMPORTED_MODULE_6__["isShowContextMenuItem"])(item, isDeposit, isArchived, isClosedPlayer);
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown context-menu",
    style: style
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_4__["DropdownMenu"], {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    isOpen: isOpenContextMenu || isOpen
  }, activeMenuList.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_dropdown__WEBPACK_IMPORTED_MODULE_4__["DropdownItem"], {
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
  var currentActivePlayer = state.currentActivePlayer,
      contextMenu = state.contextMenu;
  return Object.assign({}, {
    currentActivePlayer: currentActivePlayer,
    contextMenu: contextMenu
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
/* harmony import */ var _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridInteractionService.js");
/* harmony import */ var _lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerDataBuilder.js");








var OddsGroupCell = function OddsGroupCell(props) {
  var dataItem = props.dataItem,
      oddsGroupDropdownPosition = props.oddsGroupDropdownPosition,
      setCurrentActivePlayer = props.setCurrentActivePlayer,
      setOddsGroupDropdownPosition = props.setOddsGroupDropdownPosition;
  var value = dataItem.OddsGroup;
  var style = _lib_constants__WEBPACK_IMPORTED_MODULE_3__["oddsGroupListWithStyle"][value];

  var handleToggleOddsGroup = function handleToggleOddsGroup(event) {
    var currentActivePlayer = Object(_lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_7__["buildCurrentActivePlayer"])(dataItem);
    setCurrentActivePlayer(currentActivePlayer);
    var newPosition = _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_6__["default"].getNextDropdownPosition(event.target, oddsGroupDropdownPosition);
    setOddsGroupDropdownPosition(newPosition);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_DropdownLabel__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
  var oddsGroupDropdownPosition = state.oddsGroupDropdownPosition;
  return Object.assign({}, {
    oddsGroupDropdownPosition: oddsGroupDropdownPosition
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
/* harmony import */ var _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridInteractionService.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js");









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
      toggleLoader = props.toggleLoader;

  var handleChangeOddsGroup = function handleChangeOddsGroup(event, value) {
    event.preventDefault();
    var confirmMessage = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('AlertSetOddsGroupForCustomerMsg').replace('{0}', value);

    if (!window.confirm(confirmMessage)) {
      return;
    }

    if (currentActivePlayer && value !== currentActivePlayer.oddsGroup) {
      var custId = currentActivePlayer.custId;
      var param = {
        custId: custId,
        oddsGroup: value
      };
      toggleLoader(true);
      updateOddsGroup(param).then(function (response) {
        var _response$data = response.data,
            Success = _response$data.Success,
            Message = _response$data.Message,
            ErrorMessage = _response$data.ErrorMessage;

        if (Success) {
          var newPlayerList = _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__["default"].updatePlayerItem(playerList, custId, value, 'OddsGroup');
          setPlayerList(newPlayerList);
          window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('UpdateSuccess'));
        } else {
          var errMsg = Message || _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(ErrorMessage);
          window.alert(errMsg);
        }

        toggleLoader(false);
      }).catch(function (error) {
        console.log(error.message);
        var message = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_8__["getErrorMessageForUpdating"])(error);
        window.alert(message);
        toggleLoader(false);
      });
    }

    handleClose();
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
      toggleLoader = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].toggleLoader;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setOddsGroupDropdownPosition: setOddsGroupDropdownPosition,
    updateOddsGroup: updateOddsGroup,
    setPlayerList: setPlayerList,
    toggleLoader: toggleLoader
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
  var CustId = dataItem.CustId,
      SystemId = dataItem.SystemId,
      RealName = dataItem.RealName,
      Currency = dataItem.Currency,
      CurrentBalance = dataItem.CurrentBalance,
      OutstandingBalance = dataItem.OutstandingBalance,
      LastLoginIp = dataItem.LastLoginIp,
      LastTransaction = dataItem.LastTransaction,
      Email = dataItem.Email,
      OddsGroup = dataItem.OddsGroup,
      SpecialLevel = dataItem.SpecialLevel,
      IsDeposit = dataItem.IsDeposit,
      IsArchived = dataItem.IsArchived;
  var canShowMainColumn = IsDeposit && !IsArchived;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Row"], {
    key: CustId
  }, displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].Status] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_StatusCell__WEBPACK_IMPORTED_MODULE_10__["default"], {
    dataItem: dataItem
  })), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].UserName] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserNameCell__WEBPACK_IMPORTED_MODULE_7__["default"], {
    dataItem: dataItem
  })), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].SystemId] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, canShowMainColumn && SystemId), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].RealName] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, RealName), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].Currency] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, Currency), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].CurrentBalance] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].formatDecimal(CurrentBalance)), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].OutstandingBalance] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].formatDecimal(OutstandingBalance)), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].OddsGroup] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, canShowMainColumn && OddsGroup !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OddsGroupCell__WEBPACK_IMPORTED_MODULE_8__["default"], {
    dataItem: dataItem
  })), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].BaStatus] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BaStatusCell__WEBPACK_IMPORTED_MODULE_11__["default"], {
    dataItem: dataItem
  }), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].SpecialLevel] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, canShowMainColumn && SpecialLevel !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SpecialLevelCell__WEBPACK_IMPORTED_MODULE_9__["default"], {
    dataItem: dataItem
  })), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].LastLoginIp] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, LastLoginIp), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].LastTransaction] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, LastTransaction), displayedColumn[_lib_constants__WEBPACK_IMPORTED_MODULE_4__["fields"].Email] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
    className: "center-align"
  }, Email));
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
/* harmony import */ var _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridInteractionService.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js");
/* harmony import */ var _lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerDataBuilder.js");









var SpecialLevelCell = function SpecialLevelCell(props) {
  var dataItem = props.dataItem,
      specialLevelDropdownPosition = props.specialLevelDropdownPosition,
      setCurrentActivePlayer = props.setCurrentActivePlayer,
      setSpecialLevelDropdownPosition = props.setSpecialLevelDropdownPosition;
  var value = dataItem.SpecialLevel;
  var style = {
    backgroundColor: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["specialLevelListWithColor"][value]
  };

  var handleToggleSpecialLevel = function handleToggleSpecialLevel(event) {
    var currentActivePlayer = Object(_lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_8__["buildCurrentActivePlayer"])(dataItem);
    setCurrentActivePlayer(currentActivePlayer);
    var newPosition = _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_6__["default"].getNextDropdownPosition(event.target, specialLevelDropdownPosition);
    setSpecialLevelDropdownPosition(newPosition);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_DropdownLabel__WEBPACK_IMPORTED_MODULE_4__["default"], {
    text: Object(_lib_utils__WEBPACK_IMPORTED_MODULE_7__["getSpecialLevelText"])(value),
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
  var specialLevelDropdownPosition = state.specialLevelDropdownPosition;
  return Object.assign({}, {
    specialLevelDropdownPosition: specialLevelDropdownPosition
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
/* harmony import */ var _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridInteractionService.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js");










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
      toggleLoader = props.toggleLoader;

  var handleChangeOddsGroup = function handleChangeOddsGroup(event, value) {
    event.preventDefault();
    var resourceName = Number(value) === 0 ? 'AlertRemoveSpecialLevelForCustomerMsg' : 'AlertSetSpecialLevelForCustomerMsg';
    var confirmMessage = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(resourceName);

    if (!window.confirm(confirmMessage)) {
      return;
    }

    if (currentActivePlayer && value !== currentActivePlayer.specialLevel) {
      var custId = currentActivePlayer.custId;
      var param = {
        custId: custId,
        specialLevel: value
      };
      toggleLoader(true);
      updateSpecialLevel(param).then(function (response) {
        var _response$data = response.data,
            Success = _response$data.Success,
            Message = _response$data.Message,
            ErrorMessage = _response$data.ErrorMessage;

        if (Success) {
          var newPlayerList = _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__["default"].updatePlayerItem(playerList, custId, value, 'SpecialLevel');
          setPlayerList(newPlayerList);
          window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource('UpdateSuccess'));
        } else {
          var errMsg = Message || _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource(ErrorMessage);
          window.alert(errMsg);
        }

        toggleLoader(false);
      }).catch(function (error) {
        console.log(error.message);
        var message = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_8__["getErrorMessageForUpdating"])(error);
        window.alert(message);
        toggleLoader(false);
      });
    }

    handleClose();
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
    }, Object(_lib_utils__WEBPACK_IMPORTED_MODULE_8__["getSpecialLevelText"])(item));
  })));
};

function mapDispatchToProps(dispatch) {
  var setSpecialLevelDropdownPosition = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].setSpecialLevelDropdownPosition,
      updateSpecialLevel = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].updateSpecialLevel,
      setPlayerList = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].setPlayerList,
      toggleLoader = _actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"].toggleLoader;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setSpecialLevelDropdownPosition: setSpecialLevelDropdownPosition,
    updateSpecialLevel: updateSpecialLevel,
    setPlayerList: setPlayerList,
    toggleLoader: toggleLoader
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
/* harmony import */ var _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridInteractionService.js");
/* harmony import */ var _lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerDataBuilder.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");








var StatusCell = function StatusCell(props) {
  var dataItem = props.dataItem,
      statusDropdownPosition = props.statusDropdownPosition,
      setCurrentActivePlayer = props.setCurrentActivePlayer,
      setStatusDropdownPosition = props.setStatusDropdownPosition;
  var Status = dataItem.Status,
      IsOnline = dataItem.IsOnline,
      IsDeposit = dataItem.IsDeposit;
  var statusName = IsDeposit ? _lib_constants__WEBPACK_IMPORTED_MODULE_3__["playerStatus"][Status] : _lib_constants__WEBPACK_IMPORTED_MODULE_3__["playerStatus"][_lib_constants__WEBPACK_IMPORTED_MODULE_3__["playerStatusByName"].Active];
  var classname = 'status-text ' + statusName;
  var canUpdate = Status !== _lib_constants__WEBPACK_IMPORTED_MODULE_3__["playerStatusByName"].Archived && Status !== _lib_constants__WEBPACK_IMPORTED_MODULE_3__["playerStatusByName"].Closed;

  var handleToggleStatus = function handleToggleStatus(event) {
    var currentActivePlayer = Object(_lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_6__["buildCurrentActivePlayer"])(dataItem);
    setCurrentActivePlayer(currentActivePlayer);
    var newPosition = _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__["default"].getNextDropdownPosition(event.target, statusDropdownPosition);
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
  var statusDropdownPosition = state.statusDropdownPosition;
  return Object.assign({}, {
    statusDropdownPosition: statusDropdownPosition
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
/* harmony import */ var _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/gridInteractionService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridInteractionService.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");









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
      updatePlayerStatus = props.updatePlayerStatus;

  var handleChangeOddsGroup = function handleChangeOddsGroup(event, value) {
    event.preventDefault();
    var messageConfirm = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["messageUpdateState"][value];

    if (currentActivePlayer && window.confirm(messageConfirm)) {
      var custId = currentActivePlayer.custId;
      var param = {
        custId: custId,
        status: value
      };
      toggleLoader(true);
      updatePlayerStatus(param).then(function (response) {
        var IsSuccessful = response.data.IsSuccessful;

        if (IsSuccessful) {
          var newPlayerList = _lib_gridInteractionService__WEBPACK_IMPORTED_MODULE_5__["default"].updatePlayerItem(playerList, custId, value, 'Status');
          setPlayerList(newPlayerList);
        }

        var resultMessage = IsSuccessful ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource('UpdateSuccess') : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource('PlayerAdminUpdateFailedMsg');
        window.alert(resultMessage);
        toggleLoader(false);
      }).catch(function (error) {
        console.log(error.message);
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSingleResource('HttpError_Default'));
        toggleLoader(false);
      });
    }

    handleClose();
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
      updatePlayerStatus = _actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"].updatePlayerStatus;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setStatusDropdownPosition: setStatusDropdownPosition,
    setPlayerList: setPlayerList,
    toggleLoader: toggleLoader,
    updatePlayerStatus: updatePlayerStatus
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
/* harmony import */ var _lib_gridHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/gridHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridHelper.js");
/* harmony import */ var _lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerDataBuilder.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var UserNameCell = function UserNameCell(props) {
  var dataItem = props.dataItem,
      setSelectedPlayer = props.setSelectedPlayer,
      setCurrentActivePlayer = props.setCurrentActivePlayer,
      setContextMenu = props.setContextMenu,
      contextMenu = props.contextMenu;

  var handleSelectPlayer = function handleSelectPlayer(event) {
    event.preventDefault();
    var newSelectedPlayer = Object(_lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_5__["buildSelectedPlayer"])(dataItem);
    setSelectedPlayer(newSelectedPlayer);
  };

  var handleEnterContextMenu = function handleEnterContextMenu(event) {
    event.preventDefault();
    var isOpen = contextMenu.isOpen;

    if (!isOpen) {
      var contextMenuHeight = 140;
      var rect = event.target.getBoundingClientRect();
      var position = {
        x: rect.left - 10,
        y: _lib_gridHelper__WEBPACK_IMPORTED_MODULE_4__["default"].calculateTopPosition(contextMenuHeight, rect.top)
      };
      setContextMenu({
        position: position,
        isOpen: true
      });
      var currentActivePlayer = Object(_lib_playerDataBuilder__WEBPACK_IMPORTED_MODULE_5__["buildCurrentActivePlayer"])(dataItem);
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

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "username-cell"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn-default btn-link username-link",
    onClick: handleSelectPlayer
  }, dataItem.UserName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
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
      setContextMenu = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setContextMenu;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setSelectedPlayer: setSelectedPlayer,
    setCurrentActivePlayer: setCurrentActivePlayer,
    setContextMenu: setContextMenu
  }, dispatch);
}

function mapStateToProps(state) {
  var contextMenu = state.contextMenu;
  return Object.assign({}, {
    contextMenu: contextMenu
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
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/config */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/config.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var type = window.initialState.type;
var hasBaPermission = window._pConfig.hasBaPermission === 1;
var displayedColumnList = Object(_lib_config__WEBPACK_IMPORTED_MODULE_6__["generateColumnList"])(type, hasBaPermission);

var defaultState = _objectSpread({}, window.initialState, {
  displayedColumnList: displayedColumnList
});

var store = _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);

var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/config.js":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/config.js ***!
  \******************************************************************************/
/*! exports provided: generateColumnList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateColumnList", function() { return generateColumnList; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var excludedKeyForApiType = [_constants__WEBPACK_IMPORTED_MODULE_0__["fields"].RealName, _constants__WEBPACK_IMPORTED_MODULE_0__["fields"].LastLoginIp, _constants__WEBPACK_IMPORTED_MODULE_0__["fields"].Email];
var generateColumnList = function generateColumnList(licType, hasBaPermission) {
  var isApiType = licType === _constants__WEBPACK_IMPORTED_MODULE_0__["licenseeType"].api;
  return _constants__WEBPACK_IMPORTED_MODULE_0__["columnList"].filter(function (item) {
    if (item.key === _constants__WEBPACK_IMPORTED_MODULE_0__["fields"].BaStatus) {
      return hasBaPermission;
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

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js ***!
  \*********************************************************************************/
/*! exports provided: specialLevelListWithColor, oddsGroupListWithStyle, licenseeType, fields, columnList, contextMenuKeys, tabNames, excludedTabNameWithNonDepositAndArchived, contextMenuList, heightSlicing, searchOptions, defaultPagingOption, playerStatus, playerStatusByName, displayedPlayerStatusList, messageUpdateState, baStatusList, headerText, gridItemDropdownHeight, stringTypeFields, apiInfo, apiUpdateInfo, excludedContextMenuWithNonDeposit, excludedContextMenuWithClosed, excludedContextMenuWithArchived, playerTypes */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "excludedContextMenuWithNonDeposit", function() { return excludedContextMenuWithNonDeposit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "excludedContextMenuWithClosed", function() { return excludedContextMenuWithClosed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "excludedContextMenuWithArchived", function() { return excludedContextMenuWithArchived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerTypes", function() { return playerTypes; });
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
  LastLoginIp: 'LastLoginIp',
  LastTransaction: 'LastTransaction',
  Email: 'Email'
};
var columnList = [{
  key: fields.Status,
  value: 'Status',
  show: true
}, {
  key: fields.UserName,
  value: 'Username',
  show: true
}, {
  key: fields.SystemId,
  value: 'SystemId',
  show: true
}, {
  key: fields.RealName,
  value: 'Real Name',
  show: true
}, {
  key: fields.Currency,
  value: 'Currency',
  show: true
}, {
  key: fields.CurrentBalance,
  value: 'Current Balance',
  show: true
}, {
  key: fields.OutstandingBalance,
  value: 'Outstanding Balance',
  show: true
}, {
  key: fields.OddsGroup,
  value: 'Odds Group',
  show: true
}, {
  key: fields.BaStatus,
  value: 'BA Status',
  show: true
}, {
  key: fields.SpecialLevel,
  value: 'Special Level',
  show: true
}, {
  key: fields.LastLoginIp,
  value: 'Last Login IP',
  show: true
}, {
  key: fields.LastTransaction,
  value: 'Last Transaction',
  show: true
}, {
  key: fields.Email,
  value: 'Email',
  show: true
}];
var contextMenuKeys = {
  note: 'note',
  password: 'password',
  fundtransferLimit: 'fundtransferLimit',
  betLimit: 'betLimit',
  statement: 'statement',
  personalMessage: 'personalMessage'
};
var tabNames = {
  statement: 'lblPlayerStatement',
  betlist: 'lblBetList',
  betLimit: 'lblBetLimit'
};
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
  key: contextMenuKeys.fundtransferLimit,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('FundtransferLimit'),
  tabName: 'lblFundTransfer'
}, {
  key: contextMenuKeys.betLimit,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BetLimit'),
  tabName: 'lblBetLimit'
}, {
  key: contextMenuKeys.statement,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Statement'),
  tabName: 'lblPlayerStatement'
}, {
  key: contextMenuKeys.personalMessage,
  name: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('PersonalMessage'),
  tabName: 'lblPlayerAdminMessage'
}];
var heightSlicing = {
  default: 300,
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
var messageUpdateState = (_messageUpdateState = {}, _defineProperty(_messageUpdateState, playerStatusByName.Locked, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('UpdateToLockedConfirmMsg')), _defineProperty(_messageUpdateState, playerStatusByName.Closed, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('UpdateToClosedConfirmMsg')), _defineProperty(_messageUpdateState, playerStatusByName.Active, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('UpdateToActiveConfirmMsg')), _messageUpdateState);
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
  LastLoginIp: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('LastLoginIP'),
  LastTransaction: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('LastTransaction'),
  Email: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Email')
};
var gridItemDropdownHeight = {
  'specialLevelDropdown': 231,
  'oddsGroupDropdown': 126,
  'statusDropdown': 112
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
var excludedContextMenuWithNonDeposit = [contextMenuKeys.betLimit, contextMenuKeys.statement];
var excludedContextMenuWithClosed = [contextMenuKeys.password];
var excludedContextMenuWithArchived = [contextMenuKeys.password, contextMenuKeys.betLimit, contextMenuKeys.statement];
var playerTypes = {
  nonDeposit: 1,
  deposit: 2
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/contextMenuHelper.js":
/*!*****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/contextMenuHelper.js ***!
  \*****************************************************************************************/
/*! exports provided: isShowContextMenuItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isShowContextMenuItem", function() { return isShowContextMenuItem; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");

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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
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
          LastLoginIp = _constants__WEBPACK_IMPORTED_MODULE_2__["fields"].LastLoginIp,
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
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].SpecialLevel), displayedColumn[LastLoginIp] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 60
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].LastLoginIp), displayedColumn[LastTransaction] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 60,
        sortBy: LastTransaction
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].LastTransaction), displayedColumn[Email] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 100
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].Email));
    }
  }, {
    key: "calculateTopPosition",
    value: function calculateTopPosition(dropdownHeight, currentTop) {
      var innerHeight = window.innerHeight;
      var expectedHeight = dropdownHeight + currentTop + 20;
      return expectedHeight > innerHeight ? currentTop - dropdownHeight : currentTop;
    }
  }]);

  return GridHelper;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridInteractionService.js":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridInteractionService.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GridInteractionService; });
/* harmony import */ var _gridHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gridHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/gridHelper.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _jsroot_lib_dataReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/dataReducer */ "./www/js/source/reactpages/lib/dataReducer.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
        y: _gridHelper__WEBPACK_IMPORTED_MODULE_0__["default"].calculateTopPosition(dropdownHeight, rect.top + 20)
      };
    }
  }, {
    key: "updatePlayerItem",
    value: function updatePlayerItem(playerList, custId, value, fieldName) {
      var itemIndex = playerList.findIndex(function (x) {
        return x.CustId === custId;
      });

      var newPlayerItem = _objectSpread({}, playerList[itemIndex], _defineProperty({}, fieldName, value));

      return Object(_jsroot_lib_dataReducer__WEBPACK_IMPORTED_MODULE_2__["updateObjectInArray"])(playerList, itemIndex, newPlayerItem);
    }
  }, {
    key: "updatePlayerWithBaStatus",
    value: function updatePlayerWithBaStatus(playerList, custId, isBa, oddsGroup) {
      var itemIndex = playerList.findIndex(function (x) {
        return x.CustId === custId;
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
      newDataList.sort(function (currentItem, nextItem) {
        var currentValue = currentItem[sortBy];
        var nextValue = nextItem[sortBy];

        if (isTringType) {
          return _this.sortStringValue(currentValue || '', nextValue || '', isSortAscending);
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
  }]);

  return GridInteractionService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/lapPlayerQueryService.js":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/lapPlayerQueryService.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LapPlayerQueryService; });
/* harmony import */ var _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playerListDataHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerListDataHelper.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js");
/* harmony import */ var _playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerDataBuilder.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
          return _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
        }

        return _this._fetchFromLrf(param, lrfDataById, lapPlayerList, commonService, lapTotalItem);
      }).catch(function () {
        return _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
      });
    }
  }, {
    key: "_fetchFromLrf",
    value: function _fetchFromLrf(param, lrfDataById, lapPlayerList, commonService, lapTotalItem) {
      var idList = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getCustIdListFromLapData"])(lapPlayerList);
      var lrfParam = {
        currency: param.currency,
        idList: idList.join(','),
        specialLevel: param.specialLevel,
        pageSize: param.pageSize,
        pageIndex: param.pageIndex
      };
      return commonService.fetchData(lrfDataById.type, lrfDataById.action, lrfParam).then(function (lrfResponse) {
        var _lrfResponse$data = lrfResponse.data,
            lrfPlayerList = _lrfResponse$data.DataList,
            TotalItem = _lrfResponse$data.TotalItem;

        if (!lrfPlayerList || !lrfPlayerList.length) {
          return {
            playerList: Object(_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLapPlayerList"])(lapPlayerList),
            totalItem: lapTotalItem
          };
        }

        var playerList = _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(lrfPlayerList, lapPlayerList);
        return {
          playerList: playerList,
          totalItem: Math.max(TotalItem, lapTotalItem)
        };
      }).catch(function () {
        return {
          playerList: Object(_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLapPlayerList"])(lapPlayerList),
          totalItem: lapTotalItem
        };
      });
    }
  }]);

  return LapPlayerQueryService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/lrfPlayerQueryService.js":
/*!*********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/lrfPlayerQueryService.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LrfPlayerQueryService; });
/* harmony import */ var _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playerListDataHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerListDataHelper.js");
/* harmony import */ var _playerDataBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerDataBuilder.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
          return _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
        }

        return _this._fetchFromLap(lrfPlayerList, lapDataById, commonService, TotalItem);
      }).catch(function () {
        return _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
      });
    }
  }, {
    key: "_fetchFromLap",
    value: function _fetchFromLap(lrfPlayerList, lapDataById, commonService, lrfTotalItem) {
      var lapParam = {
        idList: lrfPlayerList.map(function (x) {
          return x.CustId;
        })
      };
      return commonService.fetchData(lapDataById.type, lapDataById.action, lapParam).then(function (lapResponse) {
        var _lapResponse$data = lapResponse.data,
            lapPlayerList = _lapResponse$data.PlayerList,
            lapTotalItem = _lapResponse$data.TotalItem;

        if (!lapPlayerList || !lapPlayerList.length) {
          return {
            playerList: Object(_playerDataBuilder__WEBPACK_IMPORTED_MODULE_1__["buildLrfPlayerList"])(lrfPlayerList),
            totalItem: lrfTotalItem
          };
        }

        var playerList = _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(lrfPlayerList, lapPlayerList);
        return {
          playerList: playerList,
          totalItem: Math.max(lrfTotalItem, lapTotalItem)
        };
      }).catch(function () {
        return {
          playerList: Object(_playerDataBuilder__WEBPACK_IMPORTED_MODULE_1__["buildLrfPlayerList"])(lrfPlayerList),
          totalItem: lrfTotalItem
        };
      });
    }
  }]);

  return LrfPlayerQueryService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerCommandService.js":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerCommandService.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerCommandService; });
/* harmony import */ var _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/factoryCommonService */ "./www/js/source/reactpages/Module/lib/factoryCommonService.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerDataBuilder.js":
/*!*****************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerDataBuilder.js ***!
  \*****************************************************************************************/
/*! exports provided: buildSelectedPlayer, buildLrfPlayerList, buildLapPlayerList, buildCurrentActivePlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildSelectedPlayer", function() { return buildSelectedPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildLrfPlayerList", function() { return buildLrfPlayerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildLapPlayerList", function() { return buildLapPlayerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildCurrentActivePlayer", function() { return buildCurrentActivePlayer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");

var buildSelectedPlayer = function buildSelectedPlayer(dataItem) {
  var CustId = dataItem.CustId,
      UserName = dataItem.UserName,
      Currency = dataItem.Currency,
      IsDeposit = dataItem.IsDeposit,
      IsArchived = dataItem.IsArchived,
      LicenseeCustId = dataItem.LicenseeCustId,
      CurrencyId = dataItem.CurrencyId;
  return {
    custId: CustId,
    licenseeCustId: LicenseeCustId,
    userName: UserName,
    currency: Currency,
    isDeposit: IsDeposit,
    isArchived: IsArchived,
    currencyId: CurrencyId
  };
};
var buildLrfPlayerList = function buildLrfPlayerList(playerList) {
  if (!playerList) {
    return [];
  }

  return playerList.map(function (item) {
    var CustId = item.CustId,
        UserName = item.UserName,
        SystemId = item.SystemId,
        Currency = item.Currency,
        CurrentBalance = item.CurrentBalance,
        OutstandingBalance = item.OutstandingBalance,
        OddsGroup = item.OddsGroup,
        BaStatus = item.BaStatus,
        SpecialLevel = item.SpecialLevel,
        CurrencyId = item.CurrencyId;
    return {
      CustId: CustId,
      LicenseeCustId: 0,
      UserName: UserName,
      SystemId: SystemId,
      Currency: Currency,
      CurrentBalance: CurrentBalance,
      OutstandingBalance: OutstandingBalance,
      OddsGroup: OddsGroup,
      BaStatus: BaStatus,
      SpecialLevel: SpecialLevel,
      IsDeposit: true,
      IsArchived: false,
      CurrencyId: CurrencyId || 0
    };
  });
};
var buildLapPlayerList = function buildLapPlayerList(playerList) {
  if (!playerList) {
    return [];
  }

  return playerList.map(function (item) {
    var UserName = item.UserName,
        Status = item.Status,
        RealName = item.RealName,
        IP = item.IP,
        email = item.email,
        isOnline = item.isOnline,
        ActStatus = item.ActStatus,
        IBCCustId = item.IBCCustId,
        isArchived = item.isArchived,
        CustId = item.CustId,
        CurrencyCode = item.CurrencyCode,
        CurrentBalance = item.CurrentBalance,
        OutBalance = item.OutBalance,
        Currency = item.Currency;
    return {
      CustId: IBCCustId,
      LicenseeCustId: CustId,
      UserName: UserName,
      Status: Status,
      RealName: RealName,
      LastLoginIp: IP,
      Email: email,
      IsOnline: isOnline,
      IsDeposit: ActStatus === _constants__WEBPACK_IMPORTED_MODULE_0__["playerTypes"].deposit && IBCCustId > 0,
      IsArchived: isArchived,
      Currency: CurrencyCode,
      CurrentBalance: CurrentBalance,
      OutstandingBalance: OutBalance,
      CurrencyId: Currency || 0
    };
  });
};
var buildCurrentActivePlayer = function buildCurrentActivePlayer(dataItem) {
  var CustId = dataItem.CustId,
      UserName = dataItem.UserName,
      Currency = dataItem.Currency,
      Status = dataItem.Status,
      OddsGroup = dataItem.OddsGroup,
      SpecialLevel = dataItem.SpecialLevel,
      IsDeposit = dataItem.IsDeposit,
      IsArchived = dataItem.IsArchived,
      LicenseeCustId = dataItem.LicenseeCustId,
      CurrencyId = dataItem.CurrencyId;
  return {
    custId: CustId,
    licenseeCustId: LicenseeCustId,
    userName: UserName,
    currency: Currency,
    status: Status,
    oddsGroup: OddsGroup,
    specialLevel: SpecialLevel,
    isDeposit: IsDeposit,
    isArchived: IsArchived,
    currencyId: CurrencyId
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerItemQueryService.js":
/*!**********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerItemQueryService.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerItemQueryService; });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _playerListDataHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerListDataHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerListDataHelper.js");
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
    value: function getPlayerById(custId, commonService, apiInfo) {
      var lrfDataById = apiInfo.lrfDataById,
          lapDataById = apiInfo.lapDataById;
      var lrfParam = {
        idList: custId,
        specialLevel: Object.keys(_lib_constants__WEBPACK_IMPORTED_MODULE_0__["specialLevelListWithColor"]).map(function (item) {
          return item;
        }).join(','),
        pageSize: _lib_constants__WEBPACK_IMPORTED_MODULE_0__["defaultPagingOption"].PageSize,
        pageIndex: 1
      };
      var lapParam = {
        idList: [custId]
      };
      var lrfPromise = commonService.fetchData(lrfDataById.type, lrfDataById.action, lrfParam);
      var lapPromise = commonService.fetchData(lapDataById.type, lapDataById.action, lapParam);
      return this._getResult(lrfPromise, lapPromise, commonService);
    }
  }, {
    key: "_getResult",
    value: function _getResult(lrfPromise, lapPromise, commonService) {
      return commonService.fetchMultiple([lrfPromise, lapPromise], function (lrfResponse, lapResponse) {
        var lrfPlayerList = lrfResponse.data.DataList;
        var _lapResponse$data$Pla = lapResponse.data.PlayerList,
            lapPlayerList = _lapResponse$data$Pla === void 0 ? [] : _lapResponse$data$Pla;
        var playerList = _playerListDataHelper__WEBPACK_IMPORTED_MODULE_1__["default"].mergePlayerList(lrfPlayerList, lapPlayerList);
        return playerList.length ? playerList[0] : null;
      }).catch(function (error) {
        console.log(error.message);
        return null;
      });
    }
  }]);

  return PlayerItemQueryService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerListDataHelper.js":
/*!********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerListDataHelper.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerListDataHelper; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
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

      return lrfList.length > lapList.length ? lrfList.map(function (lrfItem) {
        var lapItem = lapList.find(function (x) {
          return x.IBCCustId === lrfItem.CustId;
        }) || {};

        var playerItem = _this.mergePlayerItem(lrfItem, lapItem);

        return playerItem;
      }) : lapList.map(function (lapItem) {
        var lrfItem = lrfList.find(function (x) {
          return x.CustId === lapItem.IBCCustId;
        }) || {};

        var playerItem = _this.mergePlayerItem(lrfItem, lapItem);

        return playerItem;
      });
    }
  }, {
    key: "mergePlayerItem",
    value: function mergePlayerItem(lrfItem, lapItem) {
      var CustId = lrfItem.CustId,
          UserName = lrfItem.UserName,
          SystemId = lrfItem.SystemId,
          Currency = lrfItem.Currency,
          CurrentBalance = lrfItem.CurrentBalance,
          OutstandingBalance = lrfItem.OutstandingBalance,
          OddsGroup = lrfItem.OddsGroup,
          BaStatus = lrfItem.BaStatus,
          SpecialLevel = lrfItem.SpecialLevel,
          CurrencyId = lrfItem.CurrencyId;
      var Status = lapItem.Status,
          RealName = lapItem.RealName,
          IP = lapItem.IP,
          email = lapItem.email,
          isOnline = lapItem.isOnline,
          ActStatus = lapItem.ActStatus,
          IBCCustId = lapItem.IBCCustId,
          isArchived = lapItem.isArchived,
          LastTransaction = lapItem.LastTransaction,
          CurrencyCode = lapItem.CurrencyCode,
          OutBalance = lapItem.OutBalance;
      return {
        CustId: CustId || IBCCustId,
        LicenseeCustId: lapItem.CustId,
        UserName: UserName || lapItem.UserName,
        SystemId: SystemId,
        Currency: Currency || CurrencyCode,
        CurrentBalance: CurrentBalance || lapItem.CurrentBalance,
        OutstandingBalance: OutstandingBalance || OutBalance,
        OddsGroup: OddsGroup,
        BaStatus: BaStatus,
        SpecialLevel: SpecialLevel,
        Status: Status,
        RealName: RealName,
        LastTransaction: LastTransaction,
        LastLoginIp: IP,
        Email: email,
        IsOnline: isOnline,
        IsDeposit: ActStatus === _constants__WEBPACK_IMPORTED_MODULE_0__["playerTypes"].deposit && IBCCustId > 0 || CustId > 0,
        IsArchived: !!isArchived,
        CurrencyId: CurrencyId || lapItem.Currency || 0
      };
    }
  }, {
    key: "getDataObject",
    value: function getDataObject(targetList, listToMatch) {
      var _this2 = this;

      return targetList.reduce(function (accumulator, currentItem) {
        var isExist = listToMatch.findIndex(function (p) {
          return _this2._isMatchCustId(currentItem, p);
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
    key: "_isMatchCustId",
    value: function _isMatchCustId(source, destination) {
      return (!!destination.CustId || !!source.IBCCustId) && destination.CustId === source.IBCCustId || (!!destination.IBCCustId || !!source.CustId) && destination.IBCCustId === source.CustId;
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

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerMultipleQueryService.js":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerMultipleQueryService.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerMultipleQueryService; });
/* harmony import */ var _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playerListDataHelper */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerListDataHelper.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js");
/* harmony import */ var _playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerDataBuilder */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerDataBuilder.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
      var lrfPromise = commonService.fetchData(lrfSearch.type, lrfSearch.action, _objectSpread({}, param)).catch(function (error) {
        console.log(error.message);
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('HttpError_Default'));
        return {
          data: {
            DataList: [],
            TotalItem: 0
          }
        };
      });
      var lapPromise = commonService.fetchData(lapSearch.type, lapSearch.action, _objectSpread({}, param)).catch(function (error) {
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
        var _lrfResponse$data = lrfResponse.data,
            lrfPlayerList = _lrfResponse$data.DataList,
            lrfTotalItem = _lrfResponse$data.TotalItem;
        var _lapResponse$data = lapResponse.data,
            lapPlayerList = _lapResponse$data.PlayerList,
            lapTotalItem = _lapResponse$data.TotalItem;
        var lrfDataObject = _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getDataObject(lrfPlayerList, lapPlayerList);
        var lapDataObject = _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getDataObject(lapPlayerList, lrfPlayerList);
        var playerList = _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(lrfDataObject.commonList, lapDataObject.commonList);
        var totalItem = Math.max(lrfTotalItem, lapTotalItem);
        var idListNotInLrf = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getCustIdListFromLapData"])(lapDataObject.differenceList);

        if (lrfDataObject.differenceList.length === 0 && idListNotInLrf.length === 0) {
          return {
            playerList: playerList,
            totalItem: totalItem
          };
        }

        var idListNotInLap = lrfDataObject.differenceList.map(function (x) {
          return x.CustId;
        });
        var lrfParam = {
          currency: param.currency,
          idList: idListNotInLrf.join(','),
          specialLevel: param.specialLevel,
          pageSize: param.pageSize,
          pageIndex: param.pageIndex
        };
        var lapParam = {
          idList: idListNotInLap
        };

        var getFinalResponse = function getFinalResponse(response) {
          var nextPlayerList = response.playerList,
              nextTotalItem = response.totalItem;
          return {
            playerList: playerList.concat(nextPlayerList),
            totalItem: totalItem + nextTotalItem
          };
        };

        if (idListNotInLrf.length > 0 && idListNotInLap.length > 0) {
          return _this._refetchFormAllSide(lrfParam, lapParam, lrfDataObject, lapDataObject, commonService, apiInfo).then(getFinalResponse);
        } else if (idListNotInLrf.length > 0) {
          return _this._refetchFromLrf(lrfParam, lapDataObject, commonService, apiInfo).then(getFinalResponse);
        } else {
          return _this._refetchFromLap(lapParam, lrfDataObject, commonService, apiInfo).then(getFinalResponse);
        }
      }).catch(function (error) {
        console.log(error.message);
        return _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
      });
    }
  }, {
    key: "_refetchFormAllSide",
    value: function _refetchFormAllSide(lrfParam, lapParam, lrfDataObject, lapDataObject, commonService, apiInfo) {
      var lrfDataById = apiInfo.lrfDataById,
          lapDataById = apiInfo.lapDataById;
      var nextlrfPromise = commonService.fetchData(lrfDataById.type, lrfDataById.action, _objectSpread({}, lrfParam));
      var nextlapPromise = commonService.fetchData(lapDataById.type, lapDataById.action, _objectSpread({}, lapParam));
      return commonService.fetchMultiple([nextlrfPromise, nextlapPromise], function (nextLrfResponse, nextLapResponse) {
        var _nextLrfResponse$data = nextLrfResponse.data,
            nextLrfPlayerList = _nextLrfResponse$data.DataList,
            nextLrfTotalItem = _nextLrfResponse$data.TotalItem;
        var _nextLapResponse$data = nextLapResponse.data,
            nextLapPlayerList = _nextLapResponse$data.PlayerList,
            nextLapTotalItem = _nextLapResponse$data.TotalItem;
        var playerListInLap = _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(lrfDataObject.differenceList, nextLapPlayerList);
        var playerListInLrf = _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(nextLrfPlayerList, lapDataObject.differenceList);
        return {
          playerList: [].concat(_toConsumableArray(playerListInLap), _toConsumableArray(playerListInLrf)),
          totalItem: nextLrfTotalItem + nextLapTotalItem
        };
      }).catch(function (error) {
        console.log(error.message);
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('HttpError_Default'));
        return _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].createEmptyResult();
      });
    }
  }, {
    key: "_refetchFromLrf",
    value: function _refetchFromLrf(lrfParam, lapDataObject, commonService, apiInfo) {
      var lrfDataById = apiInfo.lrfDataById;
      var differenceList = lapDataObject.differenceList;
      return commonService.fetchData(lrfDataById.type, lrfDataById.action, _objectSpread({}, lrfParam)).then(function (nextLrfResponse) {
        var _nextLrfResponse$data2 = nextLrfResponse.data,
            nextLrfPlayerList = _nextLrfResponse$data2.DataList,
            nextLrfTotalItem = _nextLrfResponse$data2.TotalItem;

        if (!nextLrfPlayerList || !nextLrfPlayerList.length) {
          return {
            playerList: Object(_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLapPlayerList"])(differenceList),
            totalItem: differenceList.length
          };
        }

        var playerList = _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(nextLrfPlayerList, differenceList);
        return {
          playerList: playerList,
          totalItem: nextLrfTotalItem
        };
      }).catch(function (error) {
        console.log(error.message);
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('HttpError_Default'));
        return {
          playerList: Object(_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLapPlayerList"])(differenceList),
          totalItem: differenceList.length
        };
      });
    }
  }, {
    key: "_refetchFromLap",
    value: function _refetchFromLap(lapParam, lrfDataObject, commonService, apiInfo) {
      var lapDataById = apiInfo.lapDataById;
      var differenceList = lrfDataObject.differenceList;
      return commonService.fetchData(lapDataById.type, lapDataById.action, _objectSpread({}, lapParam)).then(function (nextLapResponse) {
        var _nextLapResponse$data2 = nextLapResponse.data,
            lapPlayerList = _nextLapResponse$data2.PlayerList,
            nextLapTotalItem = _nextLapResponse$data2.TotalItem;

        if (!lapPlayerList || !lapPlayerList.length) {
          return {
            playerList: Object(_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLrfPlayerList"])(differenceList),
            totalItem: differenceList.length
          };
        }

        var playerList = _playerListDataHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergePlayerList(differenceList, lapPlayerList);
        return {
          playerList: playerList,
          totalItem: nextLapTotalItem
        };
      }).catch(function (error) {
        console.log(error.message);
        window.alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('HttpError_Default'));
        return {
          playerList: Object(_playerDataBuilder__WEBPACK_IMPORTED_MODULE_2__["buildLrfPlayerList"])(differenceList),
          totalItem: differenceList.length
        };
      });
    }
  }]);

  return PlayerMultipleQueryService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerQueryService.js":
/*!******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerQueryService.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerQueryService; });
/* harmony import */ var _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/factoryCommonService */ "./www/js/source/reactpages/Module/lib/factoryCommonService.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _reportExcel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reportExcel */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/reportExcel.js");
/* harmony import */ var _queryServiceFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queryServiceFactory */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/queryServiceFactory.js");
/* harmony import */ var _playerItemQueryService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./playerItemQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerItemQueryService.js");
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
    value: function getSinglePlayer(custId) {
      return _playerItemQueryService__WEBPACK_IMPORTED_MODULE_4__["default"].getPlayerById(custId, this.commonService, _constants__WEBPACK_IMPORTED_MODULE_1__["apiInfo"]);
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
      reportExcel.export();
    }
  }]);

  return PlayerQueryService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerSuggestionService.js":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerSuggestionService.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerSuggestionService; });
/* harmony import */ var _lib_factoryCommonService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/factoryCommonService */ "./www/js/source/reactpages/Module/lib/factoryCommonService.js");
/* harmony import */ var _constants_configInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants/configInfo */ "./www/js/source/reactpages/Module/constants/configInfo.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var apiInfo = {
  userNameSuggestion: {
    action: 'PlayerAdminContainer/GetSuggestionList',
    type: _constants_configInfo__WEBPACK_IMPORTED_MODULE_1__["systemType"].newAdmin
  }
};

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
      var userNameSuggestion = apiInfo.userNameSuggestion;
      var configOption = {
        method: 'get'
      };
      return this.commonService.fetchData(userNameSuggestion.type, userNameSuggestion.action, _objectSpread({}, param), configOption);
    }
  }]);

  return PlayerSuggestionService;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/queryServiceFactory.js":
/*!*******************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/queryServiceFactory.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QueryServiceFactory; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _lapPlayerQueryService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lapPlayerQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/lapPlayerQueryService.js");
/* harmony import */ var _playerMultipleQueryService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerMultipleQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/playerMultipleQueryService.js");
/* harmony import */ var _lrfPlayerQueryService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lrfPlayerQueryService */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/lrfPlayerQueryService.js");
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
          currency = param.currency,
          oddsGroup = param.oddsGroup,
          specialLevel = param.specialLevel;
      return Number(baFilter) !== 0 || currency !== '' || oddsGroup !== '' || Object.keys(_constants__WEBPACK_IMPORTED_MODULE_0__["specialLevelListWithColor"]).length !== specialLevel.split(',').length;
    }
  }]);

  return QueryServiceFactory;
}();



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
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js");
var _displayedTextByField;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var HEADER_ROW_INDEX = 0;
var DATA_ROW_INDEX = 1;
var MAIN_SECTION_STYLE = 'mainSectionStyle';
var displayedTextByField = (_displayedTextByField = {}, _defineProperty(_displayedTextByField, _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].SpecialLevel, function (value) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getSpecialLevelText"])(value);
}), _defineProperty(_displayedTextByField, _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].BaStatus, function (value) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getBaStatusText"])(value);
}), _defineProperty(_displayedTextByField, _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Status, function (value) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getPlayerStatus"])(value);
}), _displayedTextByField);

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

        _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_0__["default"].export(_this.worksheet, _this.title);
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
          v: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["headerText"][field] || '',
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
          _ref13,
          _this2 = this;

      return [(_ref = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Status
      }, _defineProperty(_ref, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref, "width", 60), _ref), (_ref2 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].UserName
      }, _defineProperty(_ref2, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref2, "width", 200), _ref2), (_ref3 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].SystemId
      }, _defineProperty(_ref3, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref3, "width", 200), _ref3), (_ref4 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].RealName
      }, _defineProperty(_ref4, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref4, "width", 150), _ref4), (_ref5 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Currency
      }, _defineProperty(_ref5, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref5, "width", 80), _ref5), (_ref6 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].CurrentBalance
      }, _defineProperty(_ref6, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_ref6, "width", 130), _ref6), (_ref7 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].OutstandingBalance
      }, _defineProperty(_ref7, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].decimal), _defineProperty(_ref7, "width", 130), _ref7), (_ref8 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].OddsGroup
      }, _defineProperty(_ref8, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref8, "width", 70), _ref8), (_ref9 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].BaStatus
      }, _defineProperty(_ref9, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref9, "width", 70), _ref9), (_ref10 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].SpecialLevel
      }, _defineProperty(_ref10, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref10, "width", 70), _ref10), (_ref11 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].LastLoginIp
      }, _defineProperty(_ref11, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref11, "width", 100), _ref11), (_ref12 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].LastTransaction
      }, _defineProperty(_ref12, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref12, "width", 150), _ref12), (_ref13 = {
        field: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["fields"].Email
      }, _defineProperty(_ref13, MAIN_SECTION_STYLE, _jsroot_constants_excelStyle__WEBPACK_IMPORTED_MODULE_1__["bodyCellStyle"].center), _defineProperty(_ref13, "width", 200), _ref13)].filter(function (x) {
        return !!_this2.displayedColumn[x.field];
      });
    }
  }]);

  return ReportExcel;
}();



/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js":
/*!*****************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/utils.js ***!
  \*****************************************************************************/
/*! exports provided: getSpecialLevelText, getBaStatusText, getPlayerStatus, buildDisplayedColumnObject, isDeposit, getCustIdListFromLapData, getErrorMessageForUpdating */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSpecialLevelText", function() { return getSpecialLevelText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaStatusText", function() { return getBaStatusText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPlayerStatus", function() { return getPlayerStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildDisplayedColumnObject", function() { return buildDisplayedColumnObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDeposit", function() { return isDeposit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCustIdListFromLapData", function() { return getCustIdListFromLapData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getErrorMessageForUpdating", function() { return getErrorMessageForUpdating; });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/lib/constants.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_2__);




var getSpecialLevelText = function getSpecialLevelText(value) {
  return value === undefined || value === null ? '' : Number(value) === 0 ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('None') : value;
};
var getBaStatusText = function getBaStatusText(value) {
  return value ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('On') : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Off');
};
var getPlayerStatus = function getPlayerStatus(value) {
  var displayedValue = _lib_constants__WEBPACK_IMPORTED_MODULE_0__["playerStatus"][value];
  return displayedValue || '';
};
var buildDisplayedColumnObject = function buildDisplayedColumnObject(displayedColumnList) {
  return displayedColumnList.reduce(function (accumulator, currentItem) {
    accumulator[currentItem.key] = currentItem.show;
    return accumulator;
  }, {});
};
var isDeposit = function isDeposit(ibcCustId, actStatus) {
  return actStatus === _lib_constants__WEBPACK_IMPORTED_MODULE_0__["playerTypes"].deposit || ibcCustId > 0;
};
var getCustIdListFromLapData = function getCustIdListFromLapData(lapPlayerList) {
  return lapPlayerList.reduce(function (result, item) {
    if (isDeposit(item.IBCCustId, item.ActStatus)) {
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
  return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource(resourceKey).replace(/&apos;/g, "'");
};

var isUnauthorizedResponse = function isUnauthorizedResponse(errorInfo) {
  if (!errorInfo.response) {
    return false;
  }

  var status = errorInfo.response.status;
  return status === 403 || status === 401;
};

/***/ }),

/***/ "./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/filterHandlerReducer.js":
/*!*************************************************************************************************!*\
  !*** ./www/js/source/reactpages/Module/PlayerAdmin/playerlist/reducers/filterHandlerReducer.js ***!
  \*************************************************************************************************/
/*! exports provided: param, playerList, type, currencyList, isAdvancedSearch, isFilterCollapsing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "param", function() { return param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerList", function() { return playerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyList", function() { return currencyList; });
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
  return action.data && _toConsumableArray(action.data);
}));
var type = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {});
var currencyList = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])([], {});
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
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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









/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign({}, _filterHandlerReducer_js__WEBPACK_IMPORTED_MODULE_1__, _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_3__, _playerDetailHandlerReducer__WEBPACK_IMPORTED_MODULE_2__, _gridHandlerReducer__WEBPACK_IMPORTED_MODULE_4__, _gridOddsGroupReducer__WEBPACK_IMPORTED_MODULE_5__, _gridSpecialLevelReducer__WEBPACK_IMPORTED_MODULE_6__, _gridPlayerStatusReducer__WEBPACK_IMPORTED_MODULE_7__, _gridUserNameReducer__WEBPACK_IMPORTED_MODULE_8__)));

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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
      return _objectSpread({}, config, paramConfig);
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

      var config = _objectSpread({}, defaultAjaxConfig, configOption);

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



var NoDataTitle = function NoDataTitle() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "no-info-row center-align"
  }, _lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource("NoInfo"));
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
  width: 550,
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
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
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
        __webpack_require__.e(/*! import() | xlsx-style-sparta */ "xlsx-style-sparta").then(__webpack_require__.t.bind(null, /*! xlsx-style-sparta */ "./node_modules/xlsx-style-sparta/xlsx.js", 7)).then(function (XLSX) {
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