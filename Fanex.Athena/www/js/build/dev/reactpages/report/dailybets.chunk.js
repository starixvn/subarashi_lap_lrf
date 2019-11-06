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
/******/ 		"www/js/build/dev/reactpages/report/dailybets": 0
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
/******/ 	deferredModules.push(["./www/js/source/reactpages/pages/dailybets/components/index.jsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@9softstudio/react-datepicker/dist/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@9softstudio/react-datepicker/dist/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ "./node_modules/react/index.js"),__webpack_require__(/*! moment */ "./node_modules/@9softstudio/react-datepicker/node_modules/moment/moment.js")):undefined}(window,function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=11)}([function(t,n){t.exports=e},function(e,t,n){e.exports=n(13)()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function e(t,n,a){var o=null;void 0!==t&&"null"!=typeof t&&t&&""!==t?"string"==typeof t?o=(0,r.default)(t,n)[a]("day"):"function"==typeof t?o=e(t((0,r.default)()[a]("day")),n,a):t._isAMomentObject&&(o=t[a]("day").clone()):o=(0,r.default)()[a]("day");return o};var r=function(e){return e&&e.__esModule?e:{default:e}}(n(5))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=(t.defaultClasses={show:"rdr-Show",hide:"rdr-Hide",calendar:"rdr-Calendar",dateRange:"rdr-DateRange",predefinedRanges:"rdr-PredefinedRanges",predefinedRangesItem:"rdr-PredefinedRangesItem",predefinedRangesItemActive:"rdr-PredefinedRangesItemActive",monthAndYear:"rdr-MonthAndYear",monthAndYearSelect:"rdr-MonthAndYearSelect",weekDays:"rdr-WeekDays",weekDay:"rdr-WeekDay",days:"rdr-Days",day:"rdr-Day",dayActive:"is-selected",dayPassive:"is-passive",dayInRange:"is-inRange",monthAndYearWrapper:"rdr-MonthAndYear-innerWrapper",prevButton:"rdr-MonthAndYear-button prev",nextButton:"rdr-MonthAndYear-button next",month:"rdr-MonthAndYear-month",monthAndYearDivider:"rdr-MonthAndYear-divider",year:"rdr-MonthAndYear-year",daySunday:"rdr-Sunday",daySpecialDay:"rdr-SpecialDay",rangeButtonGroup:"range-button-group",applyButton:"rdr-Button rdr-ApplyButton",cancelButton:"rdr-Button rdr-CancelButton"},{DateRange:{display:"none",boxSizing:"border-box",background:"#ffffff",borderRadius:"2px",position:"absolute",width:735,zIndex:1,top:60},Calendar:{width:280,padding:10,background:"#ffffff",borderRadius:"2px",display:"inline-block",boxSizing:"border-box",letterSpacing:0,color:"#000000"},Day:{boxSizing:"border-box",display:"inline-block",letterSpacing:"initial",textAlign:"center",fontSize:12,cursor:"pointer",transition:"transform .1s ease"},DayPassive:{opacity:.4,cursor:"normal"},DayHover:{background:"rgba(78, 184, 94, 0.4)"},DayToday:{},DaySunday:{},DaySpecialDay:{},DayActive:{background:"#95a5a6",color:"#ffffff",transform:"scale(0.9)"},DaySelected:{background:"#4eb85e",color:"#ffffff"},DayStartEdge:{},DayEndEdge:{},DayInRange:{background:"rgba(78, 184, 94, 0.2)",color:"#95a5a6"},Weekday:{boxSizing:"border-box",display:"inline-block",letterSpacing:"initial",textAlign:"center",fontSize:12,fontWeight:"600",marginBottom:1},MonthAndYear:{textAlign:"center",boxSizing:"border-box",fontSize:12,padding:"5px 0",height:40,lineHeight:"18px"},MonthButton:{display:"block",boxSizing:"border-box",height:25,width:25,padding:0,margin:"0 10px",border:"none",boxShadow:"none",outline:"none",background:"#fff",cursor:"pointer"},MonthArrow:{display:"block",width:0,height:0,padding:0,margin:0,border:"5px solid transparent",textAlign:"center"},MonthArrowPrev:{borderRightWidth:"7px",borderRightColor:"#34495e",marginLeft:3},MonthArrowNext:{borderLeftWidth:"7px",borderLeftColor:"#34495e",marginLeft:10},MonthAndYearSelect:{height:25,width:65},PredefinedRanges:{width:160,display:"inline-block",verticalAlign:"top",marginLeft:10,marginTop:10},PredefinedRangesItem:{display:"block",fontSize:12,color:"#2c3e50",padding:"10px 14px",borderRadius:"4px",textDecoration:"none",marginBottom:3},PredefinedRangesItemActive:{background:"#4c6375",color:"#fff"},RangeButton:{border:"none",borderRadius:"2px",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",height:25,lineHeight:"25px",textAlign:"center",letterSpacing:"0.5px",display:"inline-block",outline:0,verticalAlign:"middle",width:"48%",color:"#fff"},RangeApplyButton:{marginRight:"calc(4%)",backgroundColor:"#f05b1f"},RangeCancelButton:{backgroundColor:"#757985"}});t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=a.Calendar.width,n=a.Calendar.padding,o=a.Day.margin||0;e.Calendar&&e.Calendar.hasOwnProperty("width")&&(t=e.Calendar.width),e.Calendar&&e.Calendar.hasOwnProperty("padding")&&(n=e.Calendar.padding),e.Day&&e.Day.hasOwnProperty("margin")&&(o=e.Day.margin);var l=(parseInt(t)-2*parseInt(n))/7-2*parseInt(o);return{DateRange:r({},a.DateRange,e.DateRange),Calendar:r({},a.Calendar,e.Calendar),Day:r({width:l,height:l,lineHeight:l+"px"},a.Day,e.Day),DayPassive:r({},a.DayPassive,e.DayPassive),DayHover:r({},a.DayHover,e.DayHover),DayToday:r({},a.DayToday,e.DayToday),DaySunday:r({},a.DaySunday,e.DaySunday),DaySpecialDay:r({},a.DaySpecialDay,e.DaySpecialDay),DayActive:r({},a.DayActive,e.DayActive),DaySelected:r({},a.DaySelected,e.DaySelected),DayStartEdge:r({},a.DayStartEdge,e.DayStartEdge),DayEndEdge:r({},a.DayEndEdge,e.DayEndEdge),DayInRange:r({},a.DayInRange,e.DayInRange),Weekday:r({width:l,height:l/2,lineHeight:l/2+"px"},a.Weekday,e.Weekday),MonthAndYear:r({},a.MonthAndYear,e.MonthAndYear),MonthAndYearSelect:r({},a.MonthAndYearSelect,e.MonthAndYearSelect),MonthButton:r({},a.MonthButton,e.MonthButton),MonthArrow:r({},a.MonthArrow,e.MonthArrow),MonthArrowPrev:r({},a.MonthArrowPrev,e.MonthArrowPrev),MonthArrowNext:r({},a.MonthArrowNext,e.MonthArrowNext),PredefinedRanges:r({},a.PredefinedRanges,e.PredefinedRanges),PredefinedRangesItem:r({},a.PredefinedRangesItem,e.PredefinedRangesItem),PredefinedRangesItemActive:r({},a.PredefinedRangesItemActive,e.PredefinedRangesItemActive),RangeApplyButton:r({},a.RangeButton,a.RangeApplyButton,e.RangeApplyButton),RangeCancelButton:r({},a.RangeButton,a.RangeCancelButton,e.RangeCancelButton)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.MomentFormat={default:"MM/DD/YYYY",monthSelect:"MMM"}},function(e,n){e.exports=t},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),l=h(o),i=h(n(1)),u=h(n(5)),s=h(n(2)),c=h(n(15)),f=n(3),d=h(f),p=n(4);function h(e){return e&&e.__esModule?e:{default:e}}var m=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));r.handleSelect=function(e){var t=r.props,n=t.link,a=t.onChange;a&&a(e),n||r.setState({shownDate:e.clone()})};var a=e.range,o=e.theme,l=e.firstDayOfWeek,i={shownDate:(e.shownDate||a&&a.endDate).clone(),firstDayOfWeek:l||u.default.localeData().firstDayOfWeek()};return r.state=i,r.styles=(0,d.default)(o),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"componentDidMount",value:function(){var e=this.props.onInit;e&&e(this.state.shownDate)}},{key:"componentDidUpdate",value:function(e,t){var n=this.props.shownDate;n!==e.shownDate&&this.setState({shownDate:n.clone()})}},{key:"getShownDate",value:function(){return this.props.link||this.state.shownDate}},{key:"nextButtonClickHandler",value:function(e){e.preventDefault(),this.disableNextButton||this.changeMonth(this.state.shownDate.month()+1,e)}},{key:"prevButtonClickHandler",value:function(e){e.preventDefault(),this.disablePrevButton||this.changeMonth(this.state.shownDate.month()-1,e)}},{key:"changeMonth",value:function(e,t){t.preventDefault();var n=Number(e),r=this.state.shownDate.year();n<0&&(n=11,r-=1),n>11&&(n=0,r+=1);var a=this.props,o=a.link,l=a.linkCB,i=(0,u.default)([r,n,this.state.shownDate.date()]);if(i.isValid()||(i=(0,u.default)([r,n,1])),o&&l)return l(i);this.setState({shownDate:i})}},{key:"changeYear",value:function(e){e.preventDefault();var t=Number(e.target.value),n=(0,u.default)([t,this.state.shownDate.month(),this.state.shownDate.date()]);n.isValid()||(n=(0,u.default)([t,this.state.shownDate.month(),1])),this.setState({shownDate:n})}},{key:"renderMonthList",value:function(e){for(var t=this,n=this.styles,r=this.props,a=r.onlyClasses,o=r.locale.months,i=[],u=0;u<12;u++){var s=this._isDisabledMonth(u);i.push(l.default.createElement("option",{disabled:s,key:"month"+u,value:u},o[u]))}return l.default.createElement("select",{style:a?void 0:n.MonthAndYearSelect,className:e.monthAndYearSelect,onChange:function(e){return t.changeMonth(e.target.value,e)},value:this.state.shownDate.month()},i)}},{key:"_isDisabledMonth",value:function(e){var t=this.limitedDate,n=this.state.shownDate.year();return e<t.startDate.month()&&n<=t.startDate.year()||e>t.endDate.month()&&n>=t.endDate.year()}},{key:"renderYearList",value:function(e){for(var t=this.styles,n=this.props.onlyClasses,r=this.limitedDate,a=[],o=r.startDate.year();o<=r.endDate.year();o++)a.push(l.default.createElement("option",{key:"year"+o,value:o},o));return l.default.createElement("select",{style:n?void 0:t.MonthAndYearSelect,className:e.monthAndYearSelect,onChange:this.changeYear.bind(this),value:this.state.shownDate.year()},a)}},{key:"renderMonthAndYear",value:function(e){var t=this.styles,n=this.props,a=n.onlyClasses,o=n.showMonthArrow;return l.default.createElement("div",{style:a?void 0:t.MonthAndYear,className:e.monthAndYearWrapper},o?l.default.createElement("button",{type:"button",disabled:this.disablePrevButton,style:a?void 0:r({},t.MonthButton,{float:"left"}),className:e.prevButton,onClick:this.prevButtonClickHandler.bind(this)},l.default.createElement("i",{style:a?void 0:r({},t.MonthArrow,t.MonthArrowPrev)})):null,l.default.createElement("span",null,l.default.createElement("span",{className:e.month},this.renderMonthList(e)),l.default.createElement("span",{className:e.monthAndYearDivider}," "),l.default.createElement("span",{className:e.year},this.renderYearList(e))),o?l.default.createElement("button",{type:"button",disabled:this.disableNextButton,style:a?void 0:r({},t.MonthButton,{float:"right"}),className:e.nextButton,onClick:this.nextButtonClickHandler.bind(this)},l.default.createElement("i",{style:a?void 0:r({},t.MonthArrow,t.MonthArrowNext)})):null)}},{key:"renderWeekdays",value:function(e){for(var t=this.state.firstDayOfWeek,n=[],r=this.styles,a=this.props,o=a.onlyClasses,i=a.locale.weekdays,u=7+t,s=t;s<u;s++){var c=i[s%7];n.push(l.default.createElement("span",{style:o?void 0:r.Weekday,className:e.weekDay,key:s+c},c))}return n}},{key:"renderDays",value:function(e){for(var t=this,n=this.styles,a=this.props,o=a.range,i=a.minDate,f=a.maxDate,d=a.format,p=a.onlyClasses,h=a.disableDaysBeforeToday,m=a.specialDays,y=this.getShownDate(),v=this.state.firstDayOfWeek,g=y.unix(),b=y.month(),k=y.daysInMonth(),w=y.clone().startOf("month").isoWeekday(),x=y.clone().month(b-1),C=x.daysInMonth(),_=y.clone().month(b+1),E=[],S=Math.abs(v-(w+7))%7-1;S>=0;S--){var T=x.clone().date(C-S);E.push({dayMoment:T,isPassive:!0})}for(var D=1;D<=k;D++){var P=y.clone().date(D),O=(0,u.default)();h&&Number(P.diff(O,"days"))<=-1?E.push({dayMoment:P,isPassive:!0}):E.push({dayMoment:P})}for(var M=42-E.length,N=1;N<=M;N++){var R=_.clone().date(N);E.push({dayMoment:R,isPassive:!0})}var A=(0,u.default)().startOf("day");return E.map(function(a,u){var h=a.dayMoment,y=a.isPassive,v=!o&&h.unix()===g,b=o&&function(e,t){return e.isBetween(t.startDate,t.endDate)||e.isBetween(t.endDate,t.startDate)}(h,o),k=o&&function(e,t){var n=t.startDate;return e.startOf("day").isSame(n.startOf("day"))}(h,o),w=o&&function(e,t){var n=t.endDate;return e.endOf("day").isSame(n.endOf("day"))}(h,o),x=k||w,C=A.isSame(h),_=0===h.day(),E=m&&m.some(function(e){return h.endOf("day").isSame(e.date.endOf("day"))}),S=function(e,t,n,r){return t&&e.isBefore((0,s.default)(t,r,"startOf"))||n&&e.isAfter((0,s.default)(n,r,"endOf"))}(h,i,f,d);return l.default.createElement(c.default,r({onSelect:t.handleSelect},a,{theme:n,isStartEdge:k,isEndEdge:w,isSelected:v||x,isInRange:b,isSunday:_,isSpecialDay:E,isToday:C,key:u,isPassive:y||S,onlyClasses:p,classNames:e}))})}},{key:"render",value:function(){var e=this.styles,t=this.props,n=t.onlyClasses,a=t.classNames,o=r({},f.defaultClasses,a);return l.default.createElement("div",{style:n?void 0:r({},e.Calendar,this.props.style),className:o.calendar},l.default.createElement("div",{className:o.monthAndYear},this.renderMonthAndYear(o)),l.default.createElement("div",{className:o.weekDays},this.renderWeekdays(o)),l.default.createElement("div",{className:o.days},this.renderDays(o)))}},{key:"limitedDate",get:function(){var e=this.props,t=e.minDate,n=e.maxDate,r=e.format,a=(0,u.default)();return{startDate:t?u.default.isMoment(t)?t:(0,u.default)(t,r):(0,u.default)([a.year()-5,0]),endDate:n?u.default.isMoment(n)?n:(0,u.default)(n,r):(0,u.default)([a.year(),11]).endOf("month")}}},{key:"disablePrevButton",get:function(){var e=this.limitedDate.startDate,t=this.state.shownDate;return this.state.shownDate.month()-1<e.month()&&t.year()<=e.year()}},{key:"disableNextButton",get:function(){var e=this.limitedDate.endDate,t=this.state.shownDate;return this.state.shownDate.month()+1>e.month()&&t.year()>=e.year()}}]),t}();m.defaultProps={format:p.MomentFormat.default,theme:{},showMonthArrow:!0,disableDaysBeforeToday:!1,onlyClasses:!0,classNames:{},specialDays:[]},m.propTypes={showMonthArrow:i.default.bool,disableDaysBeforeToday:i.default.bool,lang:i.default.string,sets:i.default.string,range:i.default.shape({startDate:i.default.object,endDate:i.default.object}),minDate:i.default.oneOfType([i.default.object,i.default.func,i.default.string]),maxDate:i.default.oneOfType([i.default.object,i.default.func,i.default.string]),date:i.default.oneOfType([i.default.object,i.default.string,i.default.func]),format:i.default.string.isRequired,firstDayOfWeek:i.default.oneOfType([i.default.number,i.default.string]),onChange:i.default.func,onInit:i.default.func,link:i.default.oneOfType([i.default.shape({startDate:i.default.object,endDate:i.default.object}),i.default.bool]),linkCB:i.default.func,theme:i.default.object,onlyClasses:i.default.bool,specialDays:i.default.array,classNames:i.default.object,locale:i.default.object},t.default=m},function(e,t,n){var r;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";var n={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var l=a.apply(null,r);l&&e.push(l)}else if("object"===o)for(var i in r)n.call(r,i)&&r[i]&&e.push(i)}}return e.join(" ")}void 0!==e&&e.exports?(a.default=a,e.exports=a):void 0===(r=function(){return a}.apply(t,[]))||(e.exports=r)}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=u(n(5)),l=u(n(17)),i=n(4);function u(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=(s(r={},"Today","Today"),s(r,"Yesterday","Yesterday"),s(r,"Currentweek","Current week"),s(r,"Lastweek","Last week"),s(r,"Currentmonth","Current month"),s(r,"Lastmonth","Last month"),s(r,"Sincelastmonth","Since last month"),r),f=function(e,t,n,r){e[c[t]||t]={startDate:n,endDate:r}},d=function(e,t,n,r,a){n>=r&&n<=a&&f(e,t,n,n)},p=function(e,t,n,r,a,o){o<n||r<a||f(e,t,n<a?a:n,r>o?o:r)};t.default={ranges:function(e,t,n,r){e=e?o.default.isMoment(e)?e:(0,o.default)(e,i.MomentFormat.default):(0,o.default)(),n=n?o.default.isMoment(n)?n:(0,o.default)(n,i.MomentFormat.default):e;var a={};if(e<(t=t?o.default.isMoment(t)?t:(0,o.default)(t,i.MomentFormat.default):e))return a;d(a,"Today",e,t,n);var l=e.clone().add(-1,"days");d(a,"Yesterday",l,t,n);var u=e.clone().startOf("week");p(a,"Currentweek",u,e,t,n);var s=e.clone().subtract(1,"week").startOf("week"),c=s.clone().add(6,"days");p(a,"Lastweek",s,c,t,n);var f=e.clone().startOf("month");p(a,"Currentmonth",f,e,t,n);var h=e.clone().subtract(1,"month").startOf("month"),m=h.clone().endOf("month");if(p(a,"Lastmonth",h,m,t,n),r&&r>1){var y=e.clone().subtract(1,"month").startOf("month");p(a,"Sincelastmonth",y,e,t,n)}return a},locale:a({applyLabel:"OK",cancelLabel:"Cancel"},l.default)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),o=u(a),l=(u(n(10)),u(n(1))),i=u(n(7));function u(e){return e&&e.__esModule?e:{default:e}}var s="overlay",c="overlay-open",f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n._unRegisterEvents=function(){n.props.closeOnOutsideClick&&document.removeEventListener("click",n._handleClickOutSide,!0)},n._handleClickOutSide=function(e){n.containerElement&&!n.containerElement.contains(e.target)&&n.state.isOpening&&n._close()},n.containerElement=null,n.refHandlers={container:function(e){n.containerElement=e}},n.state={isOpening:n.props.isOpening},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),r(t,[{key:"componentDidUpdate",value:function(e,t){var n=this,r=this.props.isOpening;r!==e.isOpening&&this.setState({isOpening:r},function(){var e=n.props,t=e.onOpen,a=e.onClose;r?t&&t():a&&a()})}},{key:"componentDidMount",value:function(){this._registerEvents()}},{key:"componentWillUnmount",value:function(){this._unRegisterEvents()}},{key:"_registerEvents",value:function(){this.props.closeOnOutsideClick&&document.addEventListener("click",this._handleClickOutSide,!0)}},{key:"_close",value:function(){var e=this.props.onClose;this.setState({isOpening:!1},function(){return e&&e()})}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.children,r=(0,i.default)(s,function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},c,this.state.isOpening),t),a={display:this.state.isOpening?"block":"none"};return o.default.createElement("div",{className:r,style:a,ref:this.refHandlers.container},n)}}]),t}();f.propTypes={closeOnOutsideClick:l.default.bool,isOpening:l.default.bool,onOpen:l.default.func,onClose:l.default.func},f.defaultProps={closeOnOutsideClick:!0,isOpening:!1},t.default=f},function(e,t,n){"use strict";!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=n(18)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DatePicker=t.Calendar=t.DateRange=void 0;var r=l(n(12)),a=l(n(6)),o=l(n(22));function l(e){return e&&e.__esModule?e:{default:e}}t.DateRange=r.default,t.Calendar=a.default,t.DatePicker=o.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),l=y(o),i=y(n(1)),u=y(n(2)),s=y(n(6)),c=y(n(16)),f=n(3),d=y(f),p=n(4),h=y(n(8)),m=y(n(9));function y(e){return e&&e.__esModule?e:{default:e}}var v=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));g.call(a);var o=e.format,l=e.linkedCalendars,i=e.theme,s=(0,u.default)(e.startDate,o,"startOf"),c=(0,u.default)(e.endDate,o,"endOf");return a.styles=(0,d.default)(i),a.calendarSelectionStep=0,a.locale=r({},h.default.locale,e.locale),a.ranges=e.ranges||h.default.ranges(e.today,e.minDate,e.maxDate,e.limitedMonthRange),a.isValid=!0,a.originalRange={startDate:s,endDate:c},a.state={range:{startDate:s,endDate:c},link:l&&c,show:!1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"close",value:function(){this.setState({show:!1})}},{key:"componentDidMount",value:function(){var e=this.props.onInit;e&&e(this.state.range)}},{key:"orderRange",value:function(e){var t=e.startDate,n=e.endDate;return t.isAfter(n)?{startDate:n,endDate:t}:e}},{key:"setRange",value:function(e,t){if(e=this.orderRange(e),this.isValid=this.isValidMonthRange(e),this.isValid){var n=void 0===t?{range:e}:{range:e,show:t};this.setState(n)}else{var r=this.props.onChange;r&&r(e,!1)}}},{key:"handlePredefinedRangesSelect",value:function(e){this.setRange(e,!1),this.originalRange=Object.assign({},e);var t=this.props.onChange;t&&t(e,!0)}},{key:"isValidMonthRange",value:function(e){var t=this.props.limitedMonthRange;if(t){var n=e.startDate,r=e.endDate;return 12*(r.year()-n.year())+r.month()-n.month()+1<=t}return!0}},{key:"handleLinkChange",value:function(e){this.setState({link:e})}},{key:"render",value:function(){var e=this,t=this.props,n=t.showRange,a=t.format,o=t.linkedCalendars,i=t.calendars,u=t.firstDayOfWeek,d=t.minDate,p=t.maxDate,h=t.classNames,y=t.onlyClasses,v=t.specialDays,g=t.lang,b=t.disableDaysBeforeToday,k=t.showMonthArrow,w=t.iconElement,x=this.state,C=x.range,_=x.link,E=this.styles,S=r({},f.defaultClasses,h),T=Number(i)-1,D={apply:this.handleApply,cancel:this.handleCancel};return l.default.createElement("div",{className:"daterange-container"},l.default.createElement("div",{className:"daterange-label",onClick:this.show},l.default.createElement("input",{readOnly:!0,name:"DateRange",id:"DateRange",className:"input-text datepicker",type:"text",autoComplete:"off",value:this.dateRangeText}),w),l.default.createElement(m.default,{isOpening:this.state.show,onClose:this.handleCancel},l.default.createElement("div",{className:S.dateRange,ref:function(t){return e.dateRangeContainer=t}},n&&l.default.createElement(c.default,{format:a,ranges:this.ranges,range:C,theme:E,onSelect:function(t){return e.handlePredefinedRangesSelect(t)},onlyClasses:y,classNames:S,locale:this.locale,buttonHandlers:D}),function(){for(var t=[],n=T;n>=0;n--){var r=n==T?C.startDate:C.endDate;t.push(l.default.createElement(s.default,{showMonthArrow:k,shownDate:r,disableDaysBeforeToday:b,lang:g,key:n,link:o&&_,linkCB:e.handleLinkChange.bind(e),range:C,format:a,firstDayOfWeek:u,theme:E,minDate:d,maxDate:p,onlyClasses:y,specialDays:v,classNames:S,onChange:e.handleCalendarSelect,locale:e.locale}))}return t}())))}},{key:"dateRangeText",get:function(){var e=this.state.range;if(e.startDate&&e.endDate){var t=this.props.format;return e.startDate.format(t)+" - "+e.endDate.format(t)}return""}}]),t}(),g=function(){var e=this;this.show=function(){e.calendarSelectionStep=0,e.setState({show:!0})},this.handleCalendarSelect=function(t){var n=e.state.range,r={startDate:n.startDate,endDate:n.endDate};switch(e.calendarSelectionStep){case 0:r.startDate=t,r.endDate=t,e.calendarSelectionStep=1;break;case 1:r.endDate=t,e.calendarSelectionStep=0}e.setRange(r)},this.handleApply=function(){var t=e.props,n=t.onClickApplyButton,r=t.onChange,a=e.state.range;e.originalRange=Object.assign({},a),n&&n(a,e.isValid),r&&r(a,e.isValid),e.close()},this.handleCancel=function(){e.setRange(e.originalRange,!1)}};v.defaultProps={linkedCalendars:!1,theme:{},format:p.MomentFormat.default,calendars:2,onlyClasses:!0,classNames:{},specialDays:[],twoStepChange:!1,showRange:!0,iconElement:l.default.createElement("i",{className:"icon icon-calendar"})},v.propTypes={format:i.default.string,firstDayOfWeek:i.default.number,calendars:i.default.oneOfType([i.default.string,i.default.number]),startDate:i.default.oneOfType([i.default.object,i.default.func,i.default.string]),endDate:i.default.oneOfType([i.default.object,i.default.func,i.default.string]),minDate:i.default.oneOfType([i.default.object,i.default.func,i.default.string]),maxDate:i.default.oneOfType([i.default.object,i.default.func,i.default.string]),dateLimit:i.default.func,ranges:i.default.object,linkedCalendars:i.default.bool,twoStepChange:i.default.bool,theme:i.default.object,onInit:i.default.func,onChange:i.default.func,onlyClasses:i.default.bool,specialDays:i.default.array,classNames:i.default.object,onClickApplyButton:i.default.func,showRange:i.default.bool,limitedMonthRange:i.default.number,today:i.default.oneOfType([i.default.object,i.default.func,i.default.string]),iconElement:i.default.any},t.default=v},function(e,t,n){"use strict";var r=n(14);function a(){}e.exports=function(){function e(e,t,n,a,o,l){if(l!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=a,n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),l=s(o),i=s(n(1)),u=s(n(7));function s(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.state={hover:!1,active:!1},r.styles=r.props.theme,r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"handleMouseEvent",value:function(e){if(e.preventDefault(),this.props.isPassive)return null;var t={};switch(e.type){case"mouseenter":t.hover=!0;break;case"mouseup":case"mouseleave":t.hover=!1,t.active=!1;break;case"mousedown":t.active=!0}this.setState(t)}},{key:"handleSelect",value:function(e){if(e.preventDefault(),this.props.isPassive)return null;this.props.onSelect(this.props.dayMoment)}},{key:"getStateStyles",value:function(){var e=this.state,t=e.hover,n=e.active,a=this.props,o=a.isSelected,l=a.isInRange,i=a.isPassive,u=a.isStartEdge,s=a.isEndEdge,c=(a.dayMoment,a.isToday),f=a.isSunday,d=a.isSpecialDay,p=this.styles,h=t?p.DayHover:{},m=n?p.DayActive:{},y=i?p.DayPassive:{},v=u?p.DayStartEdge:{},g=s?p.DayEndEdge:{},b=o?p.DaySelected:{},k=l?p.DayInRange:{},w=c?p.DayToday:{},x=f?p.DaySunday:{},C=d?p.DaySpecialDay:{};return r({},w,x,C,k,h,y,m,b,v,g)}},{key:"getClassNames",value:function(e){var t,n=this.props,r=n.isSelected,a=n.isInRange,o=n.isPassive,l=n.isStartEdge,i=n.isEndEdge,s=n.isToday,f=n.isSunday,d=n.isSpecialDay;return(0,u.default)((c(t={},e.day,!0),c(t,e.dayActive,r),c(t,e.dayPassive,o),c(t,e.dayInRange,a),c(t,e.dayStartEdge,l),c(t,e.dayEndEdge,i),c(t,e.dayToday,s),c(t,e.daySunday,f),c(t,e.daySpecialDay,d),t))}},{key:"render",value:function(){var e=this.props,t=e.dayMoment,n=e.onlyClasses,a=e.classNames,o=this.styles,i=this.getStateStyles(),u=this.getClassNames(a),s={width:o.Day.width,height:o.Day.height,display:o.Day.display};return l.default.createElement("span",{style:n?void 0:s,onClick:this.handleSelect.bind(this)},l.default.createElement("span",{onMouseEnter:this.handleMouseEvent.bind(this),onMouseLeave:this.handleMouseEvent.bind(this),onMouseDown:this.handleMouseEvent.bind(this),onMouseUp:this.handleMouseEvent.bind(this),className:u,style:n?void 0:r({},o.Day,i)},t.date()))}}]),t}();f.defaultProps={theme:{Day:{}},onlyClasses:!1},f.propTypes={dayMoment:i.default.object.isRequired,onSelect:i.default.func,isSelected:i.default.bool,isInRange:i.default.bool,isPassive:i.default.bool,theme:i.default.shape({Day:i.default.object.isRequired}).isRequired,onlyClasses:i.default.bool,isSpecialDay:i.default.bool,classNames:i.default.object},t.default=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),l=d(o),i=d(n(1)),u=d(n(7)),s=d(n(2)),c=n(3),f=d(n(8));function d(e){return e&&e.__esModule?e:{default:e}}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.styles=r.props.theme,r.selectedItem=r._getSelectedRange(),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"componentDidUpdate",value:function(e,t){this.props.range!==e.range&&(this.selectedItem=this._getSelectedRange())}},{key:"_getSelectedRange",value:function(){var e=this.props,t=e.ranges,n=e.range;return Object.keys(t).find(function(e){var r=t[e];return n.startDate.isSame(r.startDate,"day")&&n.endDate.isSame(r.endDate,"day")})}},{key:"handleSelect",value:function(e,t){t.preventDefault(),this.selectedItem=e;var n=this.props.ranges[e];this.props.onSelect({startDate:(0,s.default)(n.startDate,null,"startOf"),endDate:(0,s.default)(n.endDate,null,"endOf")})}},{key:"clickButton",value:function(e,t){e.preventDefault(),this.props.buttonHandlers[t]()}},{key:"renderRangeList",value:function(e){var t=this,n=this.props,a=n.ranges,o=n.onlyClasses,i=this.styles,s=!1;return Object.keys(a).map(function(n){var a,c=t.selectedItem===n;s=!s&&c;var f=r({},i.PredefinedRangesItem,s?i.PredefinedRangesItemActive:{}),d=(0,u.default)((p(a={},e.predefinedRangesItem,!0),p(a,e.predefinedRangesItemActive,s),a));return l.default.createElement("a",{href:"#",key:"range-"+n,className:d,style:o?void 0:f,onClick:function(e){return t.handleSelect(n,e)}},n)})}},{key:"renderRangeButtons",value:function(e){var t=this,n=this.props,a=n.style,o=n.onlyClasses,i=n.locale,u=r({},f.default.locale,i),s=this.styles,d="apply",p="cancel";return l.default.createElement("div",{className:c.defaultClasses.rangeButtonGroup},l.default.createElement("button",{className:e.applyButton,style:o?void 0:r({},s.RangeApplyButton,a),type:"button",onClick:function(e){return t.clickButton(e,d)}},u.applyLabel),l.default.createElement("button",{className:e.cancelButton,style:o?void 0:r({},s.RangeCancelButton,a),onClick:function(e){return t.clickButton(e,p)},type:"button"},u.cancelLabel))}},{key:"render",value:function(){var e=this.props,t=e.style,n=e.onlyClasses,a=e.classNames,o=this.styles,i=r({},c.defaultClasses,a);return l.default.createElement("div",{style:n?void 0:r({},o.PredefinedRanges,t),className:i.predefinedRanges},this.renderRangeList(i),this.renderRangeButtons(i))}}]),t}();h.defaultProps={onlyClasses:!1,classNames:{}},h.propTypes={ranges:i.default.object.isRequired,onlyClasses:i.default.bool,classNames:i.default.object},t.default=h},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Su","Mo","Tu","We","Th","Fr","Sa"]}},function(e,t,n){"use strict";
/** @license React v16.5.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(0),a=n(19),o=n(20);function l(e){for(var t=arguments.length-1,n="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);!function(e,t,n,r,a,o,l,i){if(!e){if(e=void 0,void 0===t)e=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,r,a,o,l,i],s=0;(e=Error(t.replace(/%s/g,function(){return u[s++]}))).name="Invariant Violation"}throw e.framesToPop=1,e}}(!1,"Minified React error #"+e+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",n)}r||l("227");var i=!1,u=null,s=!1,c=null,f={onError:function(e){i=!0,u=e}};function d(e,t,n,r,a,o,l,s,c){i=!1,u=null,function(e,t,n,r,a,o,l,i,u){var s=Array.prototype.slice.call(arguments,3);try{t.apply(n,s)}catch(e){this.onError(e)}}.apply(f,arguments)}var p=null,h={};function m(){if(p)for(var e in h){var t=h[e],n=p.indexOf(e);if(-1<n||l("96",e),!v[n])for(var r in t.extractEvents||l("97",e),v[n]=t,n=t.eventTypes){var a=void 0,o=n[r],i=t,u=r;g.hasOwnProperty(u)&&l("99",u),g[u]=o;var s=o.phasedRegistrationNames;if(s){for(a in s)s.hasOwnProperty(a)&&y(s[a],i,u);a=!0}else o.registrationName?(y(o.registrationName,i,u),a=!0):a=!1;a||l("98",r,e)}}}function y(e,t,n){b[e]&&l("100",e),b[e]=t,k[e]=t.eventTypes[n].dependencies}var v=[],g={},b={},k={},w=null,x=null,C=null;function _(e,t,n,r){t=e.type||"unknown-event",e.currentTarget=C(r),function(e,t,n,r,a,o,f,p,h){if(d.apply(this,arguments),i){if(i){var m=u;i=!1,u=null}else l("198"),m=void 0;s||(s=!0,c=m)}}(t,n,void 0,e),e.currentTarget=null}function E(e,t){return null==t&&l("30"),null==e?t:Array.isArray(e)?Array.isArray(t)?(e.push.apply(e,t),e):(e.push(t),e):Array.isArray(t)?[e].concat(t):[e,t]}function S(e,t,n){Array.isArray(e)?e.forEach(t,n):e&&t.call(n,e)}var T=null;function D(e,t){if(e){var n=e._dispatchListeners,r=e._dispatchInstances;if(Array.isArray(n))for(var a=0;a<n.length&&!e.isPropagationStopped();a++)_(e,t,n[a],r[a]);else n&&_(e,t,n,r);e._dispatchListeners=null,e._dispatchInstances=null,e.isPersistent()||e.constructor.release(e)}}function P(e){return D(e,!0)}function O(e){return D(e,!1)}var M={injectEventPluginOrder:function(e){p&&l("101"),p=Array.prototype.slice.call(e),m()},injectEventPluginsByName:function(e){var t,n=!1;for(t in e)if(e.hasOwnProperty(t)){var r=e[t];h.hasOwnProperty(t)&&h[t]===r||(h[t]&&l("102",t),h[t]=r,n=!0)}n&&m()}};function N(e,t){var n=e.stateNode;if(!n)return null;var r=w(n);if(!r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}return e?null:(n&&"function"!=typeof n&&l("231",t,typeof n),n)}function R(e,t){if(null!==e&&(T=E(T,e)),e=T,T=null,e&&(S(e,t?P:O),T&&l("95"),s))throw t=c,s=!1,c=null,t}var A=Math.random().toString(36).slice(2),j="__reactInternalInstance$"+A,I="__reactEventHandlers$"+A;function F(e){if(e[j])return e[j];for(;!e[j];){if(!e.parentNode)return null;e=e.parentNode}return 7===(e=e[j]).tag||8===e.tag?e:null}function U(e){return!(e=e[j])||7!==e.tag&&8!==e.tag?null:e}function L(e){if(7===e.tag||8===e.tag)return e.stateNode;l("33")}function z(e){return e[I]||null}function B(e){do{e=e.return}while(e&&7!==e.tag);return e||null}function W(e,t,n){(t=N(e,n.dispatchConfig.phasedRegistrationNames[t]))&&(n._dispatchListeners=E(n._dispatchListeners,t),n._dispatchInstances=E(n._dispatchInstances,e))}function V(e){if(e&&e.dispatchConfig.phasedRegistrationNames){for(var t=e._targetInst,n=[];t;)n.push(t),t=B(t);for(t=n.length;0<t--;)W(n[t],"captured",e);for(t=0;t<n.length;t++)W(n[t],"bubbled",e)}}function Y(e,t,n){e&&n&&n.dispatchConfig.registrationName&&(t=N(e,n.dispatchConfig.registrationName))&&(n._dispatchListeners=E(n._dispatchListeners,t),n._dispatchInstances=E(n._dispatchInstances,e))}function H(e){e&&e.dispatchConfig.registrationName&&Y(e._targetInst,null,e)}function K(e){S(e,V)}var Q=!("undefined"==typeof window||!window.document||!window.document.createElement);function q(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var $={animationend:q("Animation","AnimationEnd"),animationiteration:q("Animation","AnimationIteration"),animationstart:q("Animation","AnimationStart"),transitionend:q("Transition","TransitionEnd")},X={},G={};function J(e){if(X[e])return X[e];if(!$[e])return e;var t,n=$[e];for(t in n)if(n.hasOwnProperty(t)&&t in G)return X[e]=n[t];return e}Q&&(G=document.createElement("div").style,"AnimationEvent"in window||(delete $.animationend.animation,delete $.animationiteration.animation,delete $.animationstart.animation),"TransitionEvent"in window||delete $.transitionend.transition);var Z=J("animationend"),ee=J("animationiteration"),te=J("animationstart"),ne=J("transitionend"),re="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ae=null,oe=null,le=null;function ie(){if(le)return le;var e,t,n=oe,r=n.length,a="value"in ae?ae.value:ae.textContent,o=a.length;for(e=0;e<r&&n[e]===a[e];e++);var l=r-e;for(t=1;t<=l&&n[r-t]===a[o-t];t++);return le=a.slice(e,1<t?1-t:void 0)}function ue(){return!0}function se(){return!1}function ce(e,t,n,r){for(var a in this.dispatchConfig=e,this._targetInst=t,this.nativeEvent=n,e=this.constructor.Interface)e.hasOwnProperty(a)&&((t=e[a])?this[a]=t(n):"target"===a?this.target=r:this[a]=n[a]);return this.isDefaultPrevented=(null!=n.defaultPrevented?n.defaultPrevented:!1===n.returnValue)?ue:se,this.isPropagationStopped=se,this}function fe(e,t,n,r){if(this.eventPool.length){var a=this.eventPool.pop();return this.call(a,e,t,n,r),a}return new this(e,t,n,r)}function de(e){e instanceof this||l("279"),e.destructor(),10>this.eventPool.length&&this.eventPool.push(e)}function pe(e){e.eventPool=[],e.getPooled=fe,e.release=de}a(ce.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=ue)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=ue)},persist:function(){this.isPersistent=ue},isPersistent:se,destructor:function(){var e,t=this.constructor.Interface;for(e in t)this[e]=null;this.nativeEvent=this._targetInst=this.dispatchConfig=null,this.isPropagationStopped=this.isDefaultPrevented=se,this._dispatchInstances=this._dispatchListeners=null}}),ce.Interface={type:null,target:null,currentTarget:function(){return null},eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null},ce.extend=function(e){function t(){}function n(){return r.apply(this,arguments)}var r=this;t.prototype=r.prototype;var o=new t;return a(o,n.prototype),n.prototype=o,n.prototype.constructor=n,n.Interface=a({},r.Interface,e),n.extend=r.extend,pe(n),n},pe(ce);var he=ce.extend({data:null}),me=ce.extend({data:null}),ye=[9,13,27,32],ve=Q&&"CompositionEvent"in window,ge=null;Q&&"documentMode"in document&&(ge=document.documentMode);var be=Q&&"TextEvent"in window&&!ge,ke=Q&&(!ve||ge&&8<ge&&11>=ge),we=String.fromCharCode(32),xe={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},Ce=!1;function _e(e,t){switch(e){case"keyup":return-1!==ye.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"blur":return!0;default:return!1}}function Ee(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var Se=!1;var Te={eventTypes:xe,extractEvents:function(e,t,n,r){var a=void 0,o=void 0;if(ve)e:{switch(e){case"compositionstart":a=xe.compositionStart;break e;case"compositionend":a=xe.compositionEnd;break e;case"compositionupdate":a=xe.compositionUpdate;break e}a=void 0}else Se?_e(e,n)&&(a=xe.compositionEnd):"keydown"===e&&229===n.keyCode&&(a=xe.compositionStart);return a?(ke&&"ko"!==n.locale&&(Se||a!==xe.compositionStart?a===xe.compositionEnd&&Se&&(o=ie()):(oe="value"in(ae=r)?ae.value:ae.textContent,Se=!0)),a=he.getPooled(a,t,n,r),o?a.data=o:null!==(o=Ee(n))&&(a.data=o),K(a),o=a):o=null,(e=be?function(e,t){switch(e){case"compositionend":return Ee(t);case"keypress":return 32!==t.which?null:(Ce=!0,we);case"textInput":return(e=t.data)===we&&Ce?null:e;default:return null}}(e,n):function(e,t){if(Se)return"compositionend"===e||!ve&&_e(e,t)?(e=ie(),le=oe=ae=null,Se=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ke&&"ko"!==t.locale?null:t.data;default:return null}}(e,n))?((t=me.getPooled(xe.beforeInput,t,n,r)).data=e,K(t)):t=null,null===o?t:null===t?o:[o,t]}},De=null,Pe=null,Oe=null;function Me(e){if(e=x(e)){"function"!=typeof De&&l("280");var t=w(e.stateNode);De(e.stateNode,e.type,t)}}function Ne(e){Pe?Oe?Oe.push(e):Oe=[e]:Pe=e}function Re(){if(Pe){var e=Pe,t=Oe;if(Oe=Pe=null,Me(e),t)for(e=0;e<t.length;e++)Me(t[e])}}function Ae(e,t){return e(t)}function je(e,t,n){return e(t,n)}function Ie(){}var Fe=!1;function Ue(e,t){if(Fe)return e(t);Fe=!0;try{return Ae(e,t)}finally{Fe=!1,(null!==Pe||null!==Oe)&&(Ie(),Re())}}var Le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ze(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Le[e.type]:"textarea"===t}function Be(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}function We(e){if(!Q)return!1;var t=(e="on"+e)in document;return t||((t=document.createElement("div")).setAttribute(e,"return;"),t="function"==typeof t[e]),t}function Ve(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function Ye(e){e._valueTracker||(e._valueTracker=function(e){var t=Ve(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function He(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Ve(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}var Ke=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Qe=/^(.*)[\\\/]/,qe="function"==typeof Symbol&&Symbol.for,$e=qe?Symbol.for("react.element"):60103,Xe=qe?Symbol.for("react.portal"):60106,Ge=qe?Symbol.for("react.fragment"):60107,Je=qe?Symbol.for("react.strict_mode"):60108,Ze=qe?Symbol.for("react.profiler"):60114,et=qe?Symbol.for("react.provider"):60109,tt=qe?Symbol.for("react.context"):60110,nt=qe?Symbol.for("react.async_mode"):60111,rt=qe?Symbol.for("react.forward_ref"):60112,at=qe?Symbol.for("react.placeholder"):60113,ot="function"==typeof Symbol&&Symbol.iterator;function lt(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=ot&&e[ot]||e["@@iterator"])?e:null}function it(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case nt:return"AsyncMode";case Ge:return"Fragment";case Xe:return"Portal";case Ze:return"Profiler";case Je:return"StrictMode";case at:return"Placeholder"}if("object"==typeof e){switch(e.$$typeof){case tt:return"Context.Consumer";case et:return"Context.Provider";case rt:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(""!==t?"ForwardRef("+t+")":"ForwardRef")}if("function"==typeof e.then&&(e=1===e._reactStatus?e._reactResult:null))return it(e)}return null}function ut(e){var t="";do{e:switch(e.tag){case 4:case 0:case 1:case 2:case 3:case 7:case 10:var n=e._debugOwner,r=e._debugSource,a=it(e.type),o=null;n&&(o=it(n.type)),n=a,a="",r?a=" (at "+r.fileName.replace(Qe,"")+":"+r.lineNumber+")":o&&(a=" (created by "+o+")"),o="\n    in "+(n||"Unknown")+a;break e;default:o=""}t+=o,e=e.return}while(e);return t}var st=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ct=Object.prototype.hasOwnProperty,ft={},dt={};function pt(e,t,n,r,a){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t}var ht={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ht[e]=new pt(e,0,!1,e,null)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ht[t]=new pt(t,1,!1,e[1],null)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){ht[e]=new pt(e,2,!1,e.toLowerCase(),null)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ht[e]=new pt(e,2,!1,e,null)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ht[e]=new pt(e,3,!1,e.toLowerCase(),null)}),["checked","multiple","muted","selected"].forEach(function(e){ht[e]=new pt(e,3,!0,e,null)}),["capture","download"].forEach(function(e){ht[e]=new pt(e,4,!1,e,null)}),["cols","rows","size","span"].forEach(function(e){ht[e]=new pt(e,6,!1,e,null)}),["rowSpan","start"].forEach(function(e){ht[e]=new pt(e,5,!1,e.toLowerCase(),null)});var mt=/[\-:]([a-z])/g;function yt(e){return e[1].toUpperCase()}function vt(e,t,n,r){var a=ht.hasOwnProperty(t)?ht[t]:null;(null!==a?0===a.type:!r&&(2<t.length&&("o"===t[0]||"O"===t[0])&&("n"===t[1]||"N"===t[1])))||(function(e,t,n,r){if(null===t||void 0===t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,a,r)&&(n=null),r||null===a?function(e){return!!ct.call(dt,e)||!ct.call(ft,e)&&(st.test(e)?dt[e]=!0:(ft[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=null===n?3!==a.type&&"":n:(t=a.attributeName,r=a.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(a=a.type)||4===a&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}function gt(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}function bt(e,t){var n=t.checked;return a({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function kt(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=gt(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function wt(e,t){null!=(t=t.checked)&&vt(e,"checked",t,!1)}function xt(e,t){wt(e,t);var n=gt(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?_t(e,t.type,n):t.hasOwnProperty("defaultValue")&&_t(e,t.type,gt(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function Ct(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!e.defaultChecked,e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function _t(e,t,n){"number"===t&&e.ownerDocument.activeElement===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(mt,yt);ht[t]=new pt(t,1,!1,e,null)}),"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(mt,yt);ht[t]=new pt(t,1,!1,e,"http://www.w3.org/1999/xlink")}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(mt,yt);ht[t]=new pt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace")}),ht.tabIndex=new pt("tabIndex",1,!1,"tabindex",null);var Et={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function St(e,t,n){return(e=ce.getPooled(Et.change,e,t,n)).type="change",Ne(n),K(e),e}var Tt=null,Dt=null;function Pt(e){R(e,!1)}function Ot(e){if(He(L(e)))return e}function Mt(e,t){if("change"===e)return t}var Nt=!1;function Rt(){Tt&&(Tt.detachEvent("onpropertychange",At),Dt=Tt=null)}function At(e){"value"===e.propertyName&&Ot(Dt)&&Ue(Pt,e=St(Dt,e,Be(e)))}function jt(e,t,n){"focus"===e?(Rt(),Dt=n,(Tt=t).attachEvent("onpropertychange",At)):"blur"===e&&Rt()}function It(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Ot(Dt)}function Ft(e,t){if("click"===e)return Ot(t)}function Ut(e,t){if("input"===e||"change"===e)return Ot(t)}Q&&(Nt=We("input")&&(!document.documentMode||9<document.documentMode));var Lt={eventTypes:Et,_isInputEventSupported:Nt,extractEvents:function(e,t,n,r){var a=t?L(t):window,o=void 0,l=void 0,i=a.nodeName&&a.nodeName.toLowerCase();if("select"===i||"input"===i&&"file"===a.type?o=Mt:ze(a)?Nt?o=Ut:(o=It,l=jt):(i=a.nodeName)&&"input"===i.toLowerCase()&&("checkbox"===a.type||"radio"===a.type)&&(o=Ft),o&&(o=o(e,t)))return St(o,n,r);l&&l(e,a,t),"blur"===e&&(e=a._wrapperState)&&e.controlled&&"number"===a.type&&_t(a,"number",a.value)}},zt=ce.extend({view:null,detail:null}),Bt={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wt(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=Bt[e])&&!!t[e]}function Vt(){return Wt}var Yt=0,Ht=0,Kt=!1,Qt=!1,qt=zt.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:Vt,button:null,buttons:null,relatedTarget:function(e){return e.relatedTarget||(e.fromElement===e.srcElement?e.toElement:e.fromElement)},movementX:function(e){if("movementX"in e)return e.movementX;var t=Yt;return Yt=e.screenX,Kt?"mousemove"===e.type?e.screenX-t:0:(Kt=!0,0)},movementY:function(e){if("movementY"in e)return e.movementY;var t=Ht;return Ht=e.screenY,Qt?"mousemove"===e.type?e.screenY-t:0:(Qt=!0,0)}}),$t=qt.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null}),Xt={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",dependencies:["pointerout","pointerover"]}},Gt={eventTypes:Xt,extractEvents:function(e,t,n,r){var a="mouseover"===e||"pointerover"===e,o="mouseout"===e||"pointerout"===e;if(a&&(n.relatedTarget||n.fromElement)||!o&&!a)return null;if(a=r.window===r?r:(a=r.ownerDocument)?a.defaultView||a.parentWindow:window,o?(o=t,t=(t=n.relatedTarget||n.toElement)?F(t):null):o=null,o===t)return null;var l=void 0,i=void 0,u=void 0,s=void 0;"mouseout"===e||"mouseover"===e?(l=qt,i=Xt.mouseLeave,u=Xt.mouseEnter,s="mouse"):"pointerout"!==e&&"pointerover"!==e||(l=$t,i=Xt.pointerLeave,u=Xt.pointerEnter,s="pointer");var c=null==o?a:L(o);if(a=null==t?a:L(t),(e=l.getPooled(i,o,n,r)).type=s+"leave",e.target=c,e.relatedTarget=a,(n=l.getPooled(u,t,n,r)).type=s+"enter",n.target=a,n.relatedTarget=c,r=t,o&&r)e:{for(a=r,s=0,l=t=o;l;l=B(l))s++;for(l=0,u=a;u;u=B(u))l++;for(;0<s-l;)t=B(t),s--;for(;0<l-s;)a=B(a),l--;for(;s--;){if(t===a||t===a.alternate)break e;t=B(t),a=B(a)}t=null}else t=null;for(a=t,t=[];o&&o!==a&&(null===(s=o.alternate)||s!==a);)t.push(o),o=B(o);for(o=[];r&&r!==a&&(null===(s=r.alternate)||s!==a);)o.push(r),r=B(r);for(r=0;r<t.length;r++)Y(t[r],"bubbled",e);for(r=o.length;0<r--;)Y(o[r],"captured",n);return[e,n]}},Jt=Object.prototype.hasOwnProperty;function Zt(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!=e&&t!=t}function en(e,t){if(Zt(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++)if(!Jt.call(t,n[r])||!Zt(e[n[r]],t[n[r]]))return!1;return!0}function tn(e){var t=e;if(e.alternate)for(;t.return;)t=t.return;else{if(0!=(2&t.effectTag))return 1;for(;t.return;)if(0!=(2&(t=t.return).effectTag))return 1}return 5===t.tag?2:3}function nn(e){2!==tn(e)&&l("188")}function rn(e){if(!(e=function(e){var t=e.alternate;if(!t)return 3===(t=tn(e))&&l("188"),1===t?null:e;for(var n=e,r=t;;){var a=n.return,o=a?a.alternate:null;if(!a||!o)break;if(a.child===o.child){for(var i=a.child;i;){if(i===n)return nn(a),e;if(i===r)return nn(a),t;i=i.sibling}l("188")}if(n.return!==r.return)n=a,r=o;else{i=!1;for(var u=a.child;u;){if(u===n){i=!0,n=a,r=o;break}if(u===r){i=!0,r=a,n=o;break}u=u.sibling}if(!i){for(u=o.child;u;){if(u===n){i=!0,n=o,r=a;break}if(u===r){i=!0,r=o,n=a;break}u=u.sibling}i||l("189")}}n.alternate!==r&&l("190")}return 5!==n.tag&&l("188"),n.stateNode.current===n?e:t}(e)))return null;for(var t=e;;){if(7===t.tag||8===t.tag)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}var an=ce.extend({animationName:null,elapsedTime:null,pseudoElement:null}),on=ce.extend({clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ln=zt.extend({relatedTarget:null});function un(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}var sn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},fn=zt.extend({key:function(e){if(e.key){var t=sn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=un(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?cn[e.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:Vt,charCode:function(e){return"keypress"===e.type?un(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?un(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),dn=qt.extend({dataTransfer:null}),pn=zt.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:Vt}),hn=ce.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),mn=qt.extend({deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:null,deltaMode:null}),yn=[["abort","abort"],[Z,"animationEnd"],[ee,"animationIteration"],[te,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[ne,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],vn={},gn={};function bn(e,t){var n=e[0],r="on"+((e=e[1])[0].toUpperCase()+e.slice(1));t={phasedRegistrationNames:{bubbled:r,captured:r+"Capture"},dependencies:[n],isInteractive:t},vn[e]=t,gn[n]=t}[["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["auxclick","auxClick"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],["pointerdown","pointerDown"],["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(e){bn(e,!0)}),yn.forEach(function(e){bn(e,!1)});var kn={eventTypes:vn,isInteractiveTopLevelEventType:function(e){return void 0!==(e=gn[e])&&!0===e.isInteractive},extractEvents:function(e,t,n,r){var a=gn[e];if(!a)return null;switch(e){case"keypress":if(0===un(n))return null;case"keydown":case"keyup":e=fn;break;case"blur":case"focus":e=ln;break;case"click":if(2===n.button)return null;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":e=qt;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":e=dn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":e=pn;break;case Z:case ee:case te:e=an;break;case ne:e=hn;break;case"scroll":e=zt;break;case"wheel":e=mn;break;case"copy":case"cut":case"paste":e=on;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":e=$t;break;default:e=ce}return K(t=e.getPooled(a,t,n,r)),t}},wn=kn.isInteractiveTopLevelEventType,xn=[];function Cn(e){var t=e.targetInst,n=t;do{if(!n){e.ancestors.push(n);break}var r;for(r=n;r.return;)r=r.return;if(!(r=5!==r.tag?null:r.stateNode.containerInfo))break;e.ancestors.push(n),n=F(r)}while(n);for(n=0;n<e.ancestors.length;n++){t=e.ancestors[n];var a=Be(e.nativeEvent);r=e.topLevelType;for(var o=e.nativeEvent,l=null,i=0;i<v.length;i++){var u=v[i];u&&(u=u.extractEvents(r,t,o,a))&&(l=E(l,u))}R(l,!1)}}var _n=!0;function En(e,t){if(!t)return null;var n=(wn(e)?Tn:Dn).bind(null,e);t.addEventListener(e,n,!1)}function Sn(e,t){if(!t)return null;var n=(wn(e)?Tn:Dn).bind(null,e);t.addEventListener(e,n,!0)}function Tn(e,t){je(Dn,e,t)}function Dn(e,t){if(_n){var n=Be(t);if(null===(n=F(n))||"number"!=typeof n.tag||2===tn(n)||(n=null),xn.length){var r=xn.pop();r.topLevelType=e,r.nativeEvent=t,r.targetInst=n,e=r}else e={topLevelType:e,nativeEvent:t,targetInst:n,ancestors:[]};try{Ue(Cn,e)}finally{e.topLevelType=null,e.nativeEvent=null,e.targetInst=null,e.ancestors.length=0,10>xn.length&&xn.push(e)}}}var Pn={},On=0,Mn="_reactListenersID"+(""+Math.random()).slice(2);function Nn(e){return Object.prototype.hasOwnProperty.call(e,Mn)||(e[Mn]=On++,Pn[e[Mn]]={}),Pn[e[Mn]]}function Rn(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function An(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function jn(e,t){var n,r=An(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=An(r)}}function In(){for(var e=window,t=Rn();t instanceof e.HTMLIFrameElement;){try{e=t.contentDocument.defaultView}catch(e){break}t=Rn(e.document)}return t}function Fn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var Un=Q&&"documentMode"in document&&11>=document.documentMode,Ln={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")}},zn=null,Bn=null,Wn=null,Vn=!1;function Yn(e,t){var n=t.window===t?t.document:9===t.nodeType?t:t.ownerDocument;return Vn||null==zn||zn!==Rn(n)?null:("selectionStart"in(n=zn)&&Fn(n)?n={start:n.selectionStart,end:n.selectionEnd}:n={anchorNode:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset},Wn&&en(Wn,n)?null:(Wn=n,(e=ce.getPooled(Ln.select,Bn,e,t)).type="select",e.target=zn,K(e),e))}var Hn={eventTypes:Ln,extractEvents:function(e,t,n,r){var a,o=r.window===r?r.document:9===r.nodeType?r:r.ownerDocument;if(!(a=!o)){e:{o=Nn(o),a=k.onSelect;for(var l=0;l<a.length;l++){var i=a[l];if(!o.hasOwnProperty(i)||!o[i]){o=!1;break e}}o=!0}a=!o}if(a)return null;switch(o=t?L(t):window,e){case"focus":(ze(o)||"true"===o.contentEditable)&&(zn=o,Bn=t,Wn=null);break;case"blur":Wn=Bn=zn=null;break;case"mousedown":Vn=!0;break;case"contextmenu":case"mouseup":case"dragend":return Vn=!1,Yn(n,r);case"selectionchange":if(Un)break;case"keydown":case"keyup":return Yn(n,r)}return null}};function Kn(e,t){return e=a({children:void 0},t),(t=function(e){var t="";return r.Children.forEach(e,function(e){null!=e&&(t+=e)}),t}(t.children))&&(e.children=t),e}function Qn(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+gt(n),t=null,a=0;a<e.length;a++){if(e[a].value===n)return e[a].selected=!0,void(r&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function qn(e,t){return null!=t.dangerouslySetInnerHTML&&l("91"),a({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function $n(e,t){var n=t.value;null==n&&(n=t.defaultValue,null!=(t=t.children)&&(null!=n&&l("92"),Array.isArray(t)&&(1>=t.length||l("93"),t=t[0]),n=t),null==n&&(n="")),e._wrapperState={initialValue:gt(n)}}function Xn(e,t){var n=gt(t.value),r=gt(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function Gn(e){var t=e.textContent;t===e._wrapperState.initialValue&&(e.value=t)}M.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")),w=z,x=U,C=L,M.injectEventPluginsByName({SimpleEventPlugin:kn,EnterLeaveEventPlugin:Gt,ChangeEventPlugin:Lt,SelectEventPlugin:Hn,BeforeInputEventPlugin:Te});var Jn={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};function Zn(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function er(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?Zn(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var tr=void 0,nr=function(e){return"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n)})}:e}(function(e,t){if(e.namespaceURI!==Jn.svg||"innerHTML"in e)e.innerHTML=t;else{for((tr=tr||document.createElement("div")).innerHTML="<svg>"+t+"</svg>",t=tr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function rr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var ar={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},or=["Webkit","ms","Moz","O"];function lr(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),a=n,o=t[n];a=null==o||"boolean"==typeof o||""===o?"":r||"number"!=typeof o||0===o||ar.hasOwnProperty(a)&&ar[a]?(""+o).trim():o+"px","float"===n&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}Object.keys(ar).forEach(function(e){or.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ar[t]=ar[e]})});var ir=a({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ur(e,t){t&&(ir[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML)&&l("137",e,""),null!=t.dangerouslySetInnerHTML&&(null!=t.children&&l("60"),"object"==typeof t.dangerouslySetInnerHTML&&"__html"in t.dangerouslySetInnerHTML||l("61")),null!=t.style&&"object"!=typeof t.style&&l("62",""))}function sr(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function cr(e,t){var n=Nn(e=9===e.nodeType||11===e.nodeType?e:e.ownerDocument);t=k[t];for(var r=0;r<t.length;r++){var a=t[r];if(!n.hasOwnProperty(a)||!n[a]){switch(a){case"scroll":Sn("scroll",e);break;case"focus":case"blur":Sn("focus",e),Sn("blur",e),n.blur=!0,n.focus=!0;break;case"cancel":case"close":We(a)&&Sn(a,e);break;case"invalid":case"submit":case"reset":break;default:-1===re.indexOf(a)&&En(a,e)}n[a]=!0}}}function fr(){}var dr=null,pr=null;function hr(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}function mr(e,t){return"textarea"===e||"option"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}function yr(e){for(e=e.nextSibling;e&&1!==e.nodeType&&3!==e.nodeType;)e=e.nextSibling;return e}function vr(e){for(e=e.firstChild;e&&1!==e.nodeType&&3!==e.nodeType;)e=e.nextSibling;return e}new Set;var gr=[],br=-1;function kr(e){0>br||(e.current=gr[br],gr[br]=null,br--)}function wr(e,t){gr[++br]=e.current,e.current=t}var xr={},Cr={current:xr},_r={current:!1},Er=xr;function Sr(e,t){var n=e.type.contextTypes;if(!n)return xr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a,o={};for(a in n)o[a]=t[a];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Tr(e){return null!==(e=e.childContextTypes)&&void 0!==e}function Dr(e){kr(_r),kr(Cr)}function Pr(e){kr(_r),kr(Cr)}function Or(e,t,n){Cr.current!==xr&&l("168"),wr(Cr,t),wr(_r,n)}function Mr(e,t,n){var r=e.stateNode;if(e=t.childContextTypes,"function"!=typeof r.getChildContext)return n;for(var o in r=r.getChildContext())o in e||l("108",it(t)||"Unknown",o);return a({},n,r)}function Nr(e){var t=e.stateNode;return t=t&&t.__reactInternalMemoizedMergedChildContext||xr,Er=Cr.current,wr(Cr,t),wr(_r,_r.current),!0}function Rr(e,t,n){var r=e.stateNode;r||l("169"),n?(t=Mr(e,t,Er),r.__reactInternalMemoizedMergedChildContext=t,kr(_r),kr(Cr),wr(Cr,t)):kr(_r),wr(_r,n)}var Ar=null,jr=null;function Ir(e){return function(t){try{return e(t)}catch(e){}}}function Fr(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=null,this.index=0,this.ref=null,this.pendingProps=t,this.firstContextDependency=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.effectTag=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childExpirationTime=this.expirationTime=0,this.alternate=null}function Ur(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Lr(e,t,n){var r=e.alternate;return null===r?((r=new Fr(e.tag,t,e.key,e.mode)).type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.effectTag=0,r.nextEffect=null,r.firstEffect=null,r.lastEffect=null),r.childExpirationTime=e.childExpirationTime,r.expirationTime=t!==e.pendingProps?n:e.expirationTime,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,r.firstContextDependency=e.firstContextDependency,r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function zr(e,t,n){var r=e.type,a=e.key;e=e.props;var o=void 0;if("function"==typeof r)o=Ur(r)?2:4;else if("string"==typeof r)o=7;else e:switch(r){case Ge:return Br(e.children,t,n,a);case nt:o=10,t|=3;break;case Je:o=10,t|=2;break;case Ze:return(r=new Fr(15,e,a,4|t)).type=Ze,r.expirationTime=n,r;case at:o=16;break;default:if("object"==typeof r&&null!==r)switch(r.$$typeof){case et:o=12;break e;case tt:o=11;break e;case rt:o=13;break e;default:if("function"==typeof r.then){o=4;break e}}l("130",null==r?r:typeof r,"")}return(t=new Fr(o,e,a,t)).type=r,t.expirationTime=n,t}function Br(e,t,n,r){return(e=new Fr(9,e,r,t)).expirationTime=n,e}function Wr(e,t,n){return(e=new Fr(8,e,null,t)).expirationTime=n,e}function Vr(e,t,n){return(t=new Fr(6,null!==e.children?e.children:[],e.key,t)).expirationTime=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Yr(e,t){e.didError=!1;var n=e.earliestPendingTime;0===n?e.earliestPendingTime=e.latestPendingTime=t:n>t?e.earliestPendingTime=t:e.latestPendingTime<t&&(e.latestPendingTime=t),Hr(t,e)}function Hr(e,t){var n=t.earliestSuspendedTime,r=t.latestSuspendedTime,a=t.earliestPendingTime,o=t.latestPingedTime;0===(a=0!==a?a:o)&&(0===e||r>e)&&(a=r),0!==(e=a)&&0!==n&&n<e&&(e=n),t.nextExpirationTimeToWorkOn=a,t.expirationTime=e}var Kr=!1;function Qr(e){return{baseState:e,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function qr(e){return{baseState:e.baseState,firstUpdate:e.firstUpdate,lastUpdate:e.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function $r(e){return{expirationTime:e,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function Xr(e,t){null===e.lastUpdate?e.firstUpdate=e.lastUpdate=t:(e.lastUpdate.next=t,e.lastUpdate=t)}function Gr(e,t){var n=e.alternate;if(null===n){var r=e.updateQueue,a=null;null===r&&(r=e.updateQueue=Qr(e.memoizedState))}else r=e.updateQueue,a=n.updateQueue,null===r?null===a?(r=e.updateQueue=Qr(e.memoizedState),a=n.updateQueue=Qr(n.memoizedState)):r=e.updateQueue=qr(a):null===a&&(a=n.updateQueue=qr(r));null===a||r===a?Xr(r,t):null===r.lastUpdate||null===a.lastUpdate?(Xr(r,t),Xr(a,t)):(Xr(r,t),a.lastUpdate=t)}function Jr(e,t){var n=e.updateQueue;null===(n=null===n?e.updateQueue=Qr(e.memoizedState):Zr(e,n)).lastCapturedUpdate?n.firstCapturedUpdate=n.lastCapturedUpdate=t:(n.lastCapturedUpdate.next=t,n.lastCapturedUpdate=t)}function Zr(e,t){var n=e.alternate;return null!==n&&t===n.updateQueue&&(t=e.updateQueue=qr(t)),t}function ea(e,t,n,r,o,l){switch(n.tag){case 1:return"function"==typeof(e=n.payload)?e.call(l,r,o):e;case 3:e.effectTag=-1025&e.effectTag|64;case 0:if(null===(o="function"==typeof(e=n.payload)?e.call(l,r,o):e)||void 0===o)break;return a({},r,o);case 2:Kr=!0}return r}function ta(e,t,n,r,a){Kr=!1;for(var o=(t=Zr(e,t)).baseState,l=null,i=0,u=t.firstUpdate,s=o;null!==u;){var c=u.expirationTime;c>a?(null===l&&(l=u,o=s),(0===i||i>c)&&(i=c)):(s=ea(e,0,u,s,n,r),null!==u.callback&&(e.effectTag|=32,u.nextEffect=null,null===t.lastEffect?t.firstEffect=t.lastEffect=u:(t.lastEffect.nextEffect=u,t.lastEffect=u))),u=u.next}for(c=null,u=t.firstCapturedUpdate;null!==u;){var f=u.expirationTime;f>a?(null===c&&(c=u,null===l&&(o=s)),(0===i||i>f)&&(i=f)):(s=ea(e,0,u,s,n,r),null!==u.callback&&(e.effectTag|=32,u.nextEffect=null,null===t.lastCapturedEffect?t.firstCapturedEffect=t.lastCapturedEffect=u:(t.lastCapturedEffect.nextEffect=u,t.lastCapturedEffect=u))),u=u.next}null===l&&(t.lastUpdate=null),null===c?t.lastCapturedUpdate=null:e.effectTag|=32,null===l&&null===c&&(o=s),t.baseState=o,t.firstUpdate=l,t.firstCapturedUpdate=c,e.expirationTime=i,e.memoizedState=s}function na(e,t,n){null!==t.firstCapturedUpdate&&(null!==t.lastUpdate&&(t.lastUpdate.next=t.firstCapturedUpdate,t.lastUpdate=t.lastCapturedUpdate),t.firstCapturedUpdate=t.lastCapturedUpdate=null),ra(t.firstEffect,n),t.firstEffect=t.lastEffect=null,ra(t.firstCapturedEffect,n),t.firstCapturedEffect=t.lastCapturedEffect=null}function ra(e,t){for(;null!==e;){var n=e.callback;if(null!==n){e.callback=null;var r=t;"function"!=typeof n&&l("191",n),n.call(r)}e=e.nextEffect}}function aa(e,t){return{value:e,source:t,stack:ut(t)}}var oa={current:null},la=null,ia=null,ua=null;function sa(e,t){var n=e.type._context;wr(oa,n._currentValue),n._currentValue=t}function ca(e){var t=oa.current;kr(oa),e.type._context._currentValue=t}function fa(e){la=e,ua=ia=null,e.firstContextDependency=null}function da(e,t){return ua!==e&&!1!==t&&0!==t&&("number"==typeof t&&1073741823!==t||(ua=e,t=1073741823),t={context:e,observedBits:t,next:null},null===ia?(null===la&&l("277"),la.firstContextDependency=ia=t):ia=ia.next=t),e._currentValue}var pa={},ha={current:pa},ma={current:pa},ya={current:pa};function va(e){return e===pa&&l("174"),e}function ga(e,t){wr(ya,t),wr(ma,e),wr(ha,pa);var n=t.nodeType;switch(n){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:er(null,"");break;default:t=er(t=(n=8===n?t.parentNode:t).namespaceURI||null,n=n.tagName)}kr(ha),wr(ha,t)}function ba(e){kr(ha),kr(ma),kr(ya)}function ka(e){va(ya.current);var t=va(ha.current),n=er(t,e.type);t!==n&&(wr(ma,e),wr(ha,n))}function wa(e){ma.current===e&&(kr(ha),kr(ma))}var xa=(new r.Component).refs;function Ca(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:a({},t,n),e.memoizedState=n,null!==(r=e.updateQueue)&&0===e.expirationTime&&(r.baseState=n)}var _a={isMounted:function(e){return!!(e=e._reactInternalFiber)&&2===tn(e)},enqueueSetState:function(e,t,n){e=e._reactInternalFiber;var r=ll(),a=$r(r=No(r,e));a.payload=t,void 0!==n&&null!==n&&(a.callback=n),Gr(e,a),Ro(e,r)},enqueueReplaceState:function(e,t,n){e=e._reactInternalFiber;var r=ll(),a=$r(r=No(r,e));a.tag=1,a.payload=t,void 0!==n&&null!==n&&(a.callback=n),Gr(e,a),Ro(e,r)},enqueueForceUpdate:function(e,t){e=e._reactInternalFiber;var n=ll(),r=$r(n=No(n,e));r.tag=2,void 0!==t&&null!==t&&(r.callback=t),Gr(e,r),Ro(e,n)}};function Ea(e,t,n,r,a,o,l){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,l):!t.prototype||!t.prototype.isPureReactComponent||(!en(n,r)||!en(a,o))}function Sa(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&_a.enqueueReplaceState(t,t.state,null)}function Ta(e,t,n,r){var a=e.stateNode,o=Tr(t)?Er:Cr.current;a.props=n,a.state=e.memoizedState,a.refs=xa,a.context=Sr(e,o),null!==(o=e.updateQueue)&&(ta(e,o,n,a,r),a.state=e.memoizedState),"function"==typeof(o=t.getDerivedStateFromProps)&&(Ca(e,t,o,n),a.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof a.getSnapshotBeforeUpdate||"function"!=typeof a.UNSAFE_componentWillMount&&"function"!=typeof a.componentWillMount||(t=a.state,"function"==typeof a.componentWillMount&&a.componentWillMount(),"function"==typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount(),t!==a.state&&_a.enqueueReplaceState(a,a.state,null),null!==(o=e.updateQueue)&&(ta(e,o,n,a,r),a.state=e.memoizedState)),"function"==typeof a.componentDidMount&&(e.effectTag|=4)}var Da=Array.isArray;function Pa(e,t,n){if(null!==(e=n.ref)&&"function"!=typeof e&&"object"!=typeof e){if(n._owner){var r=void 0;(n=n._owner)&&(2!==n.tag&&3!==n.tag&&l("110"),r=n.stateNode),r||l("147",e);var a=""+e;return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===a?t.ref:((t=function(e){var t=r.refs;t===xa&&(t=r.refs={}),null===e?delete t[a]:t[a]=e})._stringRef=a,t)}"string"!=typeof e&&l("284"),n._owner||l("254",e)}return e}function Oa(e,t){"textarea"!==e.type&&l("31","[object Object]"===Object.prototype.toString.call(t)?"object with keys {"+Object.keys(t).join(", ")+"}":t,"")}function Ma(e){function t(t,n){if(e){var r=t.lastEffect;null!==r?(r.nextEffect=n,t.lastEffect=n):t.firstEffect=t.lastEffect=n,n.nextEffect=null,n.effectTag=8}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function a(e,t,n){return(e=Lr(e,t,n)).index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.effectTag=2,n):r:(t.effectTag=2,n):n}function i(t){return e&&null===t.alternate&&(t.effectTag=2),t}function u(e,t,n,r){return null===t||8!==t.tag?((t=Wr(n,e.mode,r)).return=e,t):((t=a(t,n,r)).return=e,t)}function s(e,t,n,r){return null!==t&&t.type===n.type?((r=a(t,n.props,r)).ref=Pa(e,t,n),r.return=e,r):((r=zr(n,e.mode,r)).ref=Pa(e,t,n),r.return=e,r)}function c(e,t,n,r){return null===t||6!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Vr(n,e.mode,r)).return=e,t):((t=a(t,n.children||[],r)).return=e,t)}function f(e,t,n,r,o){return null===t||9!==t.tag?((t=Br(n,e.mode,r,o)).return=e,t):((t=a(t,n,r)).return=e,t)}function d(e,t,n){if("string"==typeof t||"number"==typeof t)return(t=Wr(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case $e:return(n=zr(t,e.mode,n)).ref=Pa(e,null,t),n.return=e,n;case Xe:return(t=Vr(t,e.mode,n)).return=e,t}if(Da(t)||lt(t))return(t=Br(t,e.mode,n,null)).return=e,t;Oa(e,t)}return null}function p(e,t,n,r){var a=null!==t?t.key:null;if("string"==typeof n||"number"==typeof n)return null!==a?null:u(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case $e:return n.key===a?n.type===Ge?f(e,t,n.props.children,r,a):s(e,t,n,r):null;case Xe:return n.key===a?c(e,t,n,r):null}if(Da(n)||lt(n))return null!==a?null:f(e,t,n,r,null);Oa(e,n)}return null}function h(e,t,n,r,a){if("string"==typeof r||"number"==typeof r)return u(t,e=e.get(n)||null,""+r,a);if("object"==typeof r&&null!==r){switch(r.$$typeof){case $e:return e=e.get(null===r.key?n:r.key)||null,r.type===Ge?f(t,e,r.props.children,a,r.key):s(t,e,r,a);case Xe:return c(t,e=e.get(null===r.key?n:r.key)||null,r,a)}if(Da(r)||lt(r))return f(t,e=e.get(n)||null,r,a,null);Oa(t,r)}return null}function m(a,l,i,u){for(var s=null,c=null,f=l,m=l=0,y=null;null!==f&&m<i.length;m++){f.index>m?(y=f,f=null):y=f.sibling;var v=p(a,f,i[m],u);if(null===v){null===f&&(f=y);break}e&&f&&null===v.alternate&&t(a,f),l=o(v,l,m),null===c?s=v:c.sibling=v,c=v,f=y}if(m===i.length)return n(a,f),s;if(null===f){for(;m<i.length;m++)(f=d(a,i[m],u))&&(l=o(f,l,m),null===c?s=f:c.sibling=f,c=f);return s}for(f=r(a,f);m<i.length;m++)(y=h(f,a,m,i[m],u))&&(e&&null!==y.alternate&&f.delete(null===y.key?m:y.key),l=o(y,l,m),null===c?s=y:c.sibling=y,c=y);return e&&f.forEach(function(e){return t(a,e)}),s}function y(a,i,u,s){var c=lt(u);"function"!=typeof c&&l("150"),null==(u=c.call(u))&&l("151");for(var f=c=null,m=i,y=i=0,v=null,g=u.next();null!==m&&!g.done;y++,g=u.next()){m.index>y?(v=m,m=null):v=m.sibling;var b=p(a,m,g.value,s);if(null===b){m||(m=v);break}e&&m&&null===b.alternate&&t(a,m),i=o(b,i,y),null===f?c=b:f.sibling=b,f=b,m=v}if(g.done)return n(a,m),c;if(null===m){for(;!g.done;y++,g=u.next())null!==(g=d(a,g.value,s))&&(i=o(g,i,y),null===f?c=g:f.sibling=g,f=g);return c}for(m=r(a,m);!g.done;y++,g=u.next())null!==(g=h(m,a,y,g.value,s))&&(e&&null!==g.alternate&&m.delete(null===g.key?y:g.key),i=o(g,i,y),null===f?c=g:f.sibling=g,f=g);return e&&m.forEach(function(e){return t(a,e)}),c}return function(e,r,o,u){var s="object"==typeof o&&null!==o&&o.type===Ge&&null===o.key;s&&(o=o.props.children);var c="object"==typeof o&&null!==o;if(c)switch(o.$$typeof){case $e:e:{for(c=o.key,s=r;null!==s;){if(s.key===c){if(9===s.tag?o.type===Ge:s.type===o.type){n(e,s.sibling),(r=a(s,o.type===Ge?o.props.children:o.props,u)).ref=Pa(e,s,o),r.return=e,e=r;break e}n(e,s);break}t(e,s),s=s.sibling}o.type===Ge?((r=Br(o.props.children,e.mode,u,o.key)).return=e,e=r):((u=zr(o,e.mode,u)).ref=Pa(e,r,o),u.return=e,e=u)}return i(e);case Xe:e:{for(s=o.key;null!==r;){if(r.key===s){if(6===r.tag&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),(r=a(r,o.children||[],u)).return=e,e=r;break e}n(e,r);break}t(e,r),r=r.sibling}(r=Vr(o,e.mode,u)).return=e,e=r}return i(e)}if("string"==typeof o||"number"==typeof o)return o=""+o,null!==r&&8===r.tag?(n(e,r.sibling),(r=a(r,o,u)).return=e,e=r):(n(e,r),(r=Wr(o,e.mode,u)).return=e,e=r),i(e);if(Da(o))return m(e,r,o,u);if(lt(o))return y(e,r,o,u);if(c&&Oa(e,o),void 0===o&&!s)switch(e.tag){case 2:case 3:case 0:l("152",(u=e.type).displayName||u.name||"Component")}return n(e,r)}}var Na=Ma(!0),Ra=Ma(!1),Aa=null,ja=null,Ia=!1;function Fa(e,t){var n=new Fr(7,null,null,0);n.type="DELETED",n.stateNode=t,n.return=e,n.effectTag=8,null!==e.lastEffect?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}function Ua(e,t){switch(e.tag){case 7:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,!0);case 8:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,!0);default:return!1}}function La(e){if(Ia){var t=ja;if(t){var n=t;if(!Ua(e,t)){if(!(t=yr(n))||!Ua(e,t))return e.effectTag|=2,Ia=!1,void(Aa=e);Fa(Aa,n)}Aa=e,ja=vr(t)}else e.effectTag|=2,Ia=!1,Aa=e}}function za(e){for(e=e.return;null!==e&&7!==e.tag&&5!==e.tag;)e=e.return;Aa=e}function Ba(e){if(e!==Aa)return!1;if(!Ia)return za(e),Ia=!0,!1;var t=e.type;if(7!==e.tag||"head"!==t&&"body"!==t&&!mr(t,e.memoizedProps))for(t=ja;t;)Fa(e,t),t=yr(t);return za(e),ja=Aa?yr(e.stateNode):null,!0}function Wa(){ja=Aa=null,Ia=!1}var Va=Ke.ReactCurrentOwner;function Ya(e,t,n,r){t.child=null===e?Ra(t,null,n,r):Na(t,e.child,n,r)}function Ha(e,t,n,r,a){n=n.render;var o=t.ref;return _r.current||t.memoizedProps!==r||o!==(null!==e?e.ref:null)?(Ya(e,t,n=n(r,o),a),t.memoizedProps=r,t.child):Ja(e,t,a)}function Ka(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.effectTag|=128)}function Qa(e,t,n,r,a){var o=Tr(n)?Er:Cr.current;return o=Sr(t,o),fa(t),n=n(r,o),t.effectTag|=1,Ya(e,t,n,a),t.memoizedProps=r,t.child}function qa(e,t,n,r,a){if(Tr(n)){var o=!0;Nr(t)}else o=!1;if(fa(t),null===e)if(null===t.stateNode){var l=Tr(n)?Er:Cr.current,i=n.contextTypes,u=null!==i&&void 0!==i,s=new n(r,i=u?Sr(t,l):xr);t.memoizedState=null!==s.state&&void 0!==s.state?s.state:null,s.updater=_a,t.stateNode=s,s._reactInternalFiber=t,u&&((u=t.stateNode).__reactInternalMemoizedUnmaskedChildContext=l,u.__reactInternalMemoizedMaskedChildContext=i),Ta(t,n,r,a),r=!0}else{l=t.stateNode,i=t.memoizedProps,l.props=i;var c=l.context;u=Sr(t,u=Tr(n)?Er:Cr.current);var f=n.getDerivedStateFromProps;(s="function"==typeof f||"function"==typeof l.getSnapshotBeforeUpdate)||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(i!==r||c!==u)&&Sa(t,l,r,u),Kr=!1;var d=t.memoizedState;c=l.state=d;var p=t.updateQueue;null!==p&&(ta(t,p,r,l,a),c=t.memoizedState),i!==r||d!==c||_r.current||Kr?("function"==typeof f&&(Ca(t,n,f,r),c=t.memoizedState),(i=Kr||Ea(t,n,i,r,d,c,u))?(s||"function"!=typeof l.UNSAFE_componentWillMount&&"function"!=typeof l.componentWillMount||("function"==typeof l.componentWillMount&&l.componentWillMount(),"function"==typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount()),"function"==typeof l.componentDidMount&&(t.effectTag|=4)):("function"==typeof l.componentDidMount&&(t.effectTag|=4),t.memoizedProps=r,t.memoizedState=c),l.props=r,l.state=c,l.context=u,r=i):("function"==typeof l.componentDidMount&&(t.effectTag|=4),r=!1)}else l=t.stateNode,i=t.memoizedProps,l.props=i,c=l.context,u=Sr(t,u=Tr(n)?Er:Cr.current),(s="function"==typeof(f=n.getDerivedStateFromProps)||"function"==typeof l.getSnapshotBeforeUpdate)||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(i!==r||c!==u)&&Sa(t,l,r,u),Kr=!1,c=t.memoizedState,d=l.state=c,null!==(p=t.updateQueue)&&(ta(t,p,r,l,a),d=t.memoizedState),i!==r||c!==d||_r.current||Kr?("function"==typeof f&&(Ca(t,n,f,r),d=t.memoizedState),(f=Kr||Ea(t,n,i,r,c,d,u))?(s||"function"!=typeof l.UNSAFE_componentWillUpdate&&"function"!=typeof l.componentWillUpdate||("function"==typeof l.componentWillUpdate&&l.componentWillUpdate(r,d,u),"function"==typeof l.UNSAFE_componentWillUpdate&&l.UNSAFE_componentWillUpdate(r,d,u)),"function"==typeof l.componentDidUpdate&&(t.effectTag|=4),"function"==typeof l.getSnapshotBeforeUpdate&&(t.effectTag|=256)):("function"!=typeof l.componentDidUpdate||i===e.memoizedProps&&c===e.memoizedState||(t.effectTag|=4),"function"!=typeof l.getSnapshotBeforeUpdate||i===e.memoizedProps&&c===e.memoizedState||(t.effectTag|=256),t.memoizedProps=r,t.memoizedState=d),l.props=r,l.state=d,l.context=u,r=f):("function"!=typeof l.componentDidUpdate||i===e.memoizedProps&&c===e.memoizedState||(t.effectTag|=4),"function"!=typeof l.getSnapshotBeforeUpdate||i===e.memoizedProps&&c===e.memoizedState||(t.effectTag|=256),r=!1);return $a(e,t,n,r,o,a)}function $a(e,t,n,r,a,o){Ka(e,t);var l=0!=(64&t.effectTag);if(!r&&!l)return a&&Rr(t,n,!1),Ja(e,t,o);r=t.stateNode,Va.current=t;var i=l?null:r.render();return t.effectTag|=1,null!==e&&l&&(Ya(e,t,null,o),t.child=null),Ya(e,t,i,o),t.memoizedState=r.state,t.memoizedProps=r.props,a&&Rr(t,n,!0),t.child}function Xa(e){var t=e.stateNode;t.pendingContext?Or(0,t.pendingContext,t.pendingContext!==t.context):t.context&&Or(0,t.context,!1),ga(e,t.containerInfo)}function Ga(e,t){if(e&&e.defaultProps)for(var n in t=a({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}function Ja(e,t,n){null!==e&&(t.firstContextDependency=e.firstContextDependency);var r=t.childExpirationTime;if(0===r||r>n)return null;if(null!==e&&t.child!==e.child&&l("153"),null!==t.child){for(n=Lr(e=t.child,e.pendingProps,e.expirationTime),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Lr(e,e.pendingProps,e.expirationTime)).return=t;n.sibling=null}return t.child}function Za(e,t,n){var r=t.expirationTime;if(!_r.current&&(0===r||r>n)){switch(t.tag){case 5:Xa(t),Wa();break;case 7:ka(t);break;case 2:Tr(t.type)&&Nr(t);break;case 3:Tr(t.type._reactResult)&&Nr(t);break;case 6:ga(t,t.stateNode.containerInfo);break;case 12:sa(t,t.memoizedProps.value)}return Ja(e,t,n)}switch(t.expirationTime=0,t.tag){case 4:return function(e,t,n,r){null!==e&&l("155");var a=t.pendingProps;if("object"==typeof n&&null!==n&&"function"==typeof n.then){var o=n=function(e){switch(e._reactStatus){case 1:return e._reactResult;case 2:throw e._reactResult;case 0:throw e;default:throw e._reactStatus=0,e.then(function(t){if(0===e._reactStatus){if(e._reactStatus=1,"object"==typeof t&&null!==t){var n=t.default;t=void 0!==n&&null!==n?n:t}e._reactResult=t}},function(t){0===e._reactStatus&&(e._reactStatus=2,e._reactResult=t)}),e}}(n);o="function"==typeof o?Ur(o)?3:1:void 0!==o&&null!==o&&o.$$typeof?14:4,o=t.tag=o;var i=Ga(n,a);switch(o){case 1:return Qa(e,t,n,i,r);case 3:return qa(e,t,n,i,r);case 14:return Ha(e,t,n,i,r);default:l("283",n)}}if(o=Sr(t,Cr.current),fa(t),o=n(a,o),t.effectTag|=1,"object"==typeof o&&null!==o&&"function"==typeof o.render&&void 0===o.$$typeof){t.tag=2,Tr(n)?(i=!0,Nr(t)):i=!1,t.memoizedState=null!==o.state&&void 0!==o.state?o.state:null;var u=n.getDerivedStateFromProps;return"function"==typeof u&&Ca(t,n,u,a),o.updater=_a,t.stateNode=o,o._reactInternalFiber=t,Ta(t,n,a,r),$a(e,t,n,!0,i,r)}return t.tag=0,Ya(e,t,o,r),t.memoizedProps=a,t.child}(e,t,t.type,n);case 0:return Qa(e,t,t.type,t.pendingProps,n);case 1:var a=t.type._reactResult;return e=Qa(e,t,a,Ga(a,r=t.pendingProps),n),t.memoizedProps=r,e;case 2:return qa(e,t,t.type,t.pendingProps,n);case 3:return e=qa(e,t,a=t.type._reactResult,Ga(a,r=t.pendingProps),n),t.memoizedProps=r,e;case 5:return Xa(t),null===(r=t.updateQueue)&&l("282"),a=null!==(a=t.memoizedState)?a.element:null,ta(t,r,t.pendingProps,null,n),(r=t.memoizedState.element)===a?(Wa(),t=Ja(e,t,n)):(a=t.stateNode,(a=(null===e||null===e.child)&&a.hydrate)&&(ja=vr(t.stateNode.containerInfo),Aa=t,a=Ia=!0),a?(t.effectTag|=2,t.child=Ra(t,null,r,n)):(Ya(e,t,r,n),Wa()),t=t.child),t;case 7:ka(t),null===e&&La(t),r=t.type,a=t.pendingProps;var o=null!==e?e.memoizedProps:null,i=a.children;return mr(r,a)?i=null:null!==o&&mr(r,o)&&(t.effectTag|=16),Ka(e,t),1073741823!==n&&1&t.mode&&a.hidden?(t.expirationTime=1073741823,t.memoizedProps=a,t=null):(Ya(e,t,i,n),t.memoizedProps=a,t=t.child),t;case 8:return null===e&&La(t),t.memoizedProps=t.pendingProps,null;case 16:return null;case 6:return ga(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=Na(t,null,r,n):Ya(e,t,r,n),t.memoizedProps=r,t.child;case 13:return Ha(e,t,t.type,t.pendingProps,n);case 14:return e=Ha(e,t,a=t.type._reactResult,Ga(a,r=t.pendingProps),n),t.memoizedProps=r,e;case 9:return Ya(e,t,r=t.pendingProps,n),t.memoizedProps=r,t.child;case 10:return Ya(e,t,r=t.pendingProps.children,n),t.memoizedProps=r,t.child;case 15:return Ya(e,t,(r=t.pendingProps).children,n),t.memoizedProps=r,t.child;case 12:e:{if(r=t.type._context,a=t.pendingProps,i=t.memoizedProps,o=a.value,t.memoizedProps=a,sa(t,o),null!==i){var u=i.value;if(0===(o=u===o&&(0!==u||1/u==1/o)||u!=u&&o!=o?0:0|("function"==typeof r._calculateChangedBits?r._calculateChangedBits(u,o):1073741823))){if(i.children===a.children&&!_r.current){t=Ja(e,t,n);break e}}else for(null!==(i=t.child)&&(i.return=t);null!==i;){if(null!==(u=i.firstContextDependency))do{if(u.context===r&&0!=(u.observedBits&o)){if(2===i.tag||3===i.tag){var s=$r(n);s.tag=2,Gr(i,s)}(0===i.expirationTime||i.expirationTime>n)&&(i.expirationTime=n),null!==(s=i.alternate)&&(0===s.expirationTime||s.expirationTime>n)&&(s.expirationTime=n);for(var c=i.return;null!==c;){if(s=c.alternate,0===c.childExpirationTime||c.childExpirationTime>n)c.childExpirationTime=n,null!==s&&(0===s.childExpirationTime||s.childExpirationTime>n)&&(s.childExpirationTime=n);else{if(null===s||!(0===s.childExpirationTime||s.childExpirationTime>n))break;s.childExpirationTime=n}c=c.return}}s=i.child,u=u.next}while(null!==u);else s=12===i.tag&&i.type===t.type?null:i.child;if(null!==s)s.return=i;else for(s=i;null!==s;){if(s===t){s=null;break}if(null!==(i=s.sibling)){i.return=s.return,s=i;break}s=s.return}i=s}}Ya(e,t,a.children,n),t=t.child}return t;case 11:return o=t.type,a=(r=t.pendingProps).children,fa(t),a=a(o=da(o,r.unstable_observedBits)),t.effectTag|=1,Ya(e,t,a,n),t.memoizedProps=r,t.child;default:l("156")}}function eo(e){e.effectTag|=4}var to=void 0,no=void 0,ro=void 0;function ao(e,t){var n=t.source,r=t.stack;null===r&&null!==n&&(r=ut(n)),null!==n&&it(n.type),t=t.value,null!==e&&2===e.tag&&it(e.type);try{console.error(t)}catch(e){setTimeout(function(){throw e})}}function oo(e){var t=e.ref;if(null!==t)if("function"==typeof t)try{t(null)}catch(t){Mo(e,t)}else t.current=null}function lo(e){switch("function"==typeof jr&&jr(e),e.tag){case 2:case 3:oo(e);var t=e.stateNode;if("function"==typeof t.componentWillUnmount)try{t.props=e.memoizedProps,t.state=e.memoizedState,t.componentWillUnmount()}catch(t){Mo(e,t)}break;case 7:oo(e);break;case 6:so(e)}}function io(e){return 7===e.tag||5===e.tag||6===e.tag}function uo(e){e:{for(var t=e.return;null!==t;){if(io(t)){var n=t;break e}t=t.return}l("160"),n=void 0}var r=t=void 0;switch(n.tag){case 7:t=n.stateNode,r=!1;break;case 5:case 6:t=n.stateNode.containerInfo,r=!0;break;default:l("161")}16&n.effectTag&&(rr(t,""),n.effectTag&=-17);e:t:for(n=e;;){for(;null===n.sibling;){if(null===n.return||io(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;7!==n.tag&&8!==n.tag;){if(2&n.effectTag)continue t;if(null===n.child||6===n.tag)continue t;n.child.return=n,n=n.child}if(!(2&n.effectTag)){n=n.stateNode;break e}}for(var a=e;;){if(7===a.tag||8===a.tag)if(n)if(r){var o=t,i=a.stateNode,u=n;8===o.nodeType?o.parentNode.insertBefore(i,u):o.insertBefore(i,u)}else t.insertBefore(a.stateNode,n);else r?(o=t,i=a.stateNode,8===o.nodeType?(u=o.parentNode).insertBefore(i,o):(u=o).appendChild(i),null===u.onclick&&(u.onclick=fr)):t.appendChild(a.stateNode);else if(6!==a.tag&&null!==a.child){a.child.return=a,a=a.child;continue}if(a===e)break;for(;null===a.sibling;){if(null===a.return||a.return===e)return;a=a.return}a.sibling.return=a.return,a=a.sibling}}function so(e){for(var t=e,n=!1,r=void 0,a=void 0;;){if(!n){n=t.return;e:for(;;){switch(null===n&&l("160"),n.tag){case 7:r=n.stateNode,a=!1;break e;case 5:case 6:r=n.stateNode.containerInfo,a=!0;break e}n=n.return}n=!0}if(7===t.tag||8===t.tag){e:for(var o=t,i=o;;)if(lo(i),null!==i.child&&6!==i.tag)i.child.return=i,i=i.child;else{if(i===o)break;for(;null===i.sibling;){if(null===i.return||i.return===o)break e;i=i.return}i.sibling.return=i.return,i=i.sibling}a?(o=r,i=t.stateNode,8===o.nodeType?o.parentNode.removeChild(i):o.removeChild(i)):r.removeChild(t.stateNode)}else if(6===t.tag?(r=t.stateNode.containerInfo,a=!0):lo(t),null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return;6===(t=t.return).tag&&(n=!1)}t.sibling.return=t.return,t=t.sibling}}function co(e,t){switch(t.tag){case 2:case 3:break;case 7:var n=t.stateNode;if(null!=n){var r=t.memoizedProps,a=null!==e?e.memoizedProps:r;e=t.type;var o=t.updateQueue;if(t.updateQueue=null,null!==o){for(n[I]=r,"input"===e&&"radio"===r.type&&null!=r.name&&wt(n,r),sr(e,a),t=sr(e,r),a=0;a<o.length;a+=2){var i=o[a],u=o[a+1];"style"===i?lr(n,u):"dangerouslySetInnerHTML"===i?nr(n,u):"children"===i?rr(n,u):vt(n,i,u,t)}switch(e){case"input":xt(n,r);break;case"textarea":Xn(n,r);break;case"select":e=n._wrapperState.wasMultiple,n._wrapperState.wasMultiple=!!r.multiple,null!=(o=r.value)?Qn(n,!!r.multiple,o,!1):e!==!!r.multiple&&(null!=r.defaultValue?Qn(n,!!r.multiple,r.defaultValue,!0):Qn(n,!!r.multiple,r.multiple?[]:"",!1))}}}break;case 8:null===t.stateNode&&l("162"),t.stateNode.nodeValue=t.memoizedProps;break;case 5:case 15:case 16:break;default:l("163")}}function fo(e,t,n){(n=$r(n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){pl(r),ao(e,t)},n}function po(e,t,n){(n=$r(n)).tag=3;var r=e.stateNode;return null!==r&&"function"==typeof r.componentDidCatch&&(n.callback=function(){null===So?So=new Set([this]):So.add(this);var n=t.value,r=t.stack;ao(e,t),this.componentDidCatch(n,{componentStack:null!==r?r:""})}),n}function ho(e){switch(e.tag){case 2:Tr(e.type)&&Dr();var t=e.effectTag;return 1024&t?(e.effectTag=-1025&t|64,e):null;case 3:return Tr(e.type._reactResult)&&Dr(),1024&(t=e.effectTag)?(e.effectTag=-1025&t|64,e):null;case 5:return ba(),Pr(),0!=(64&(t=e.effectTag))&&l("285"),e.effectTag=-1025&t|64,e;case 7:return wa(e),null;case 16:return 1024&(t=e.effectTag)?(e.effectTag=-1025&t|64,e):null;case 6:return ba(),null;case 12:return ca(e),null;default:return null}}to=function(){},no=function(e,t,n,r,o){var l=e.memoizedProps;if(l!==r){var i=t.stateNode;switch(va(ha.current),e=null,n){case"input":l=bt(i,l),r=bt(i,r),e=[];break;case"option":l=Kn(i,l),r=Kn(i,r),e=[];break;case"select":l=a({},l,{value:void 0}),r=a({},r,{value:void 0}),e=[];break;case"textarea":l=qn(i,l),r=qn(i,r),e=[];break;default:"function"!=typeof l.onClick&&"function"==typeof r.onClick&&(i.onclick=fr)}ur(n,r),i=n=void 0;var u=null;for(n in l)if(!r.hasOwnProperty(n)&&l.hasOwnProperty(n)&&null!=l[n])if("style"===n){var s=l[n];for(i in s)s.hasOwnProperty(i)&&(u||(u={}),u[i]="")}else"dangerouslySetInnerHTML"!==n&&"children"!==n&&"suppressContentEditableWarning"!==n&&"suppressHydrationWarning"!==n&&"autoFocus"!==n&&(b.hasOwnProperty(n)?e||(e=[]):(e=e||[]).push(n,null));for(n in r){var c=r[n];if(s=null!=l?l[n]:void 0,r.hasOwnProperty(n)&&c!==s&&(null!=c||null!=s))if("style"===n)if(s){for(i in s)!s.hasOwnProperty(i)||c&&c.hasOwnProperty(i)||(u||(u={}),u[i]="");for(i in c)c.hasOwnProperty(i)&&s[i]!==c[i]&&(u||(u={}),u[i]=c[i])}else u||(e||(e=[]),e.push(n,u)),u=c;else"dangerouslySetInnerHTML"===n?(c=c?c.__html:void 0,s=s?s.__html:void 0,null!=c&&s!==c&&(e=e||[]).push(n,""+c)):"children"===n?s===c||"string"!=typeof c&&"number"!=typeof c||(e=e||[]).push(n,""+c):"suppressContentEditableWarning"!==n&&"suppressHydrationWarning"!==n&&(b.hasOwnProperty(n)?(null!=c&&cr(o,n),e||s===c||(e=[])):(e=e||[]).push(n,c))}u&&(e=e||[]).push("style",u),o=e,(t.updateQueue=o)&&eo(t)}},ro=function(e,t,n,r){n!==r&&eo(t)};var mo={readContext:da},yo=Ke.ReactCurrentOwner,vo=0,go=0,bo=!1,ko=null,wo=null,xo=0,Co=!1,_o=null,Eo=!1,So=null;function To(){if(null!==ko)for(var e=ko.return;null!==e;){var t=e;switch(t.tag){case 2:var n=t.type.childContextTypes;null!==n&&void 0!==n&&Dr();break;case 3:null!==(n=t.type._reactResult.childContextTypes)&&void 0!==n&&Dr();break;case 5:ba(),Pr();break;case 7:wa(t);break;case 6:ba();break;case 12:ca(t)}e=e.return}wo=null,xo=0,Co=!1,ko=null}function Do(e){for(;;){var t=e.alternate,n=e.return,r=e.sibling;if(0==(512&e.effectTag)){var o=t,i=(t=e).pendingProps;switch(t.tag){case 0:case 1:break;case 2:Tr(t.type)&&Dr();break;case 3:Tr(t.type._reactResult)&&Dr();break;case 5:ba(),Pr(),(i=t.stateNode).pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),null!==o&&null!==o.child||(Ba(t),t.effectTag&=-3),to(t);break;case 7:wa(t);var u=va(ya.current),s=t.type;if(null!==o&&null!=t.stateNode)no(o,t,s,i,u),o.ref!==t.ref&&(t.effectTag|=128);else if(i){var c=va(ha.current);if(Ba(t)){o=(i=t).stateNode;var f=i.type,d=i.memoizedProps,p=u;switch(o[j]=i,o[I]=d,s=void 0,u=f){case"iframe":case"object":En("load",o);break;case"video":case"audio":for(f=0;f<re.length;f++)En(re[f],o);break;case"source":En("error",o);break;case"img":case"image":case"link":En("error",o),En("load",o);break;case"form":En("reset",o),En("submit",o);break;case"details":En("toggle",o);break;case"input":kt(o,d),En("invalid",o),cr(p,"onChange");break;case"select":o._wrapperState={wasMultiple:!!d.multiple},En("invalid",o),cr(p,"onChange");break;case"textarea":$n(o,d),En("invalid",o),cr(p,"onChange")}for(s in ur(u,d),f=null,d)d.hasOwnProperty(s)&&(c=d[s],"children"===s?"string"==typeof c?o.textContent!==c&&(f=["children",c]):"number"==typeof c&&o.textContent!==""+c&&(f=["children",""+c]):b.hasOwnProperty(s)&&null!=c&&cr(p,s));switch(u){case"input":Ye(o),Ct(o,d,!0);break;case"textarea":Ye(o),Gn(o);break;case"select":case"option":break;default:"function"==typeof d.onClick&&(o.onclick=fr)}s=f,i.updateQueue=s,(i=null!==s)&&eo(t)}else{d=t,o=s,p=i,f=9===u.nodeType?u:u.ownerDocument,c===Jn.html&&(c=Zn(o)),c===Jn.html?"script"===o?((o=f.createElement("div")).innerHTML="<script><\/script>",f=o.removeChild(o.firstChild)):"string"==typeof p.is?f=f.createElement(o,{is:p.is}):(f=f.createElement(o),"select"===o&&p.multiple&&(f.multiple=!0)):f=f.createElementNS(c,o),(o=f)[j]=d,o[I]=i;e:for(d=o,p=t,f=p.child;null!==f;){if(7===f.tag||8===f.tag)d.appendChild(f.stateNode);else if(6!==f.tag&&null!==f.child){f.child.return=f,f=f.child;continue}if(f===p)break;for(;null===f.sibling;){if(null===f.return||f.return===p)break e;f=f.return}f.sibling.return=f.return,f=f.sibling}p=o;var h=u,m=sr(f=s,d=i);switch(f){case"iframe":case"object":En("load",p),u=d;break;case"video":case"audio":for(u=0;u<re.length;u++)En(re[u],p);u=d;break;case"source":En("error",p),u=d;break;case"img":case"image":case"link":En("error",p),En("load",p),u=d;break;case"form":En("reset",p),En("submit",p),u=d;break;case"details":En("toggle",p),u=d;break;case"input":kt(p,d),u=bt(p,d),En("invalid",p),cr(h,"onChange");break;case"option":u=Kn(p,d);break;case"select":p._wrapperState={wasMultiple:!!d.multiple},u=a({},d,{value:void 0}),En("invalid",p),cr(h,"onChange");break;case"textarea":$n(p,d),u=qn(p,d),En("invalid",p),cr(h,"onChange");break;default:u=d}ur(f,u),c=void 0;var y=f,v=p,g=u;for(c in g)if(g.hasOwnProperty(c)){var k=g[c];"style"===c?lr(v,k):"dangerouslySetInnerHTML"===c?null!=(k=k?k.__html:void 0)&&nr(v,k):"children"===c?"string"==typeof k?("textarea"!==y||""!==k)&&rr(v,k):"number"==typeof k&&rr(v,""+k):"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&"autoFocus"!==c&&(b.hasOwnProperty(c)?null!=k&&cr(h,c):null!=k&&vt(v,c,k,m))}switch(f){case"input":Ye(p),Ct(p,d,!1);break;case"textarea":Ye(p),Gn(p);break;case"option":null!=d.value&&p.setAttribute("value",""+gt(d.value));break;case"select":(u=p).multiple=!!d.multiple,null!=(p=d.value)?Qn(u,!!d.multiple,p,!1):null!=d.defaultValue&&Qn(u,!!d.multiple,d.defaultValue,!0);break;default:"function"==typeof u.onClick&&(p.onclick=fr)}(i=hr(s,i))&&eo(t),t.stateNode=o}null!==t.ref&&(t.effectTag|=128)}else null===t.stateNode&&l("166");break;case 8:o&&null!=t.stateNode?ro(o,t,o.memoizedProps,i):("string"!=typeof i&&(null===t.stateNode&&l("166")),o=va(ya.current),va(ha.current),Ba(t)?(s=(i=t).stateNode,o=i.memoizedProps,s[j]=i,(i=s.nodeValue!==o)&&eo(t)):(s=t,(i=(9===o.nodeType?o:o.ownerDocument).createTextNode(i))[j]=s,t.stateNode=i));break;case 13:case 14:case 16:case 9:case 10:case 15:break;case 6:ba(),to(t);break;case 12:ca(t);break;case 11:break;case 4:l("167");default:l("156")}if(t=ko=null,i=e,1073741823===xo||1073741823!==i.childExpirationTime){for(s=0,o=i.child;null!==o;)u=o.expirationTime,d=o.childExpirationTime,(0===s||0!==u&&u<s)&&(s=u),(0===s||0!==d&&d<s)&&(s=d),o=o.sibling;i.childExpirationTime=s}if(null!==t)return t;null!==n&&0==(512&n.effectTag)&&(null===n.firstEffect&&(n.firstEffect=e.firstEffect),null!==e.lastEffect&&(null!==n.lastEffect&&(n.lastEffect.nextEffect=e.firstEffect),n.lastEffect=e.lastEffect),1<e.effectTag&&(null!==n.lastEffect?n.lastEffect.nextEffect=e:n.firstEffect=e,n.lastEffect=e))}else{if(null!==(e=ho(e)))return e.effectTag&=511,e;null!==n&&(n.firstEffect=n.lastEffect=null,n.effectTag|=512)}if(null!==r)return r;if(null===n)break;e=n}return null}function Po(e){var t=Za(e.alternate,e,xo);return null===t&&(t=Do(e)),yo.current=null,t}function Oo(e,t,n){bo&&l("243"),bo=!0,yo.currentDispatcher=mo;var r=e.nextExpirationTimeToWorkOn;r===xo&&e===wo&&null!==ko||(To(),xo=r,ko=Lr((wo=e).current,null,xo),e.pendingCommitExpirationTime=0);for(var a=!1;;){try{if(t)for(;null!==ko&&!dl();)ko=Po(ko);else for(;null!==ko;)ko=Po(ko)}catch(e){if(null===ko)a=!0,pl(e);else{null===ko&&l("271");var o=ko,i=o.return;if(null!==i){e:{var u=i,s=o,c=e;i=xo,s.effectTag|=512,s.firstEffect=s.lastEffect=null,Co=!0,c=aa(c,s);do{switch(u.tag){case 5:u.effectTag|=1024,u.expirationTime=i,Jr(u,i=fo(u,c,i));break e;case 2:case 3:s=c;var f=u.stateNode;if(0==(64&u.effectTag)&&null!==f&&"function"==typeof f.componentDidCatch&&(null===So||!So.has(f))){u.effectTag|=1024,u.expirationTime=i,Jr(u,i=po(u,s,i));break e}}u=u.return}while(null!==u)}ko=Do(o);continue}a=!0,pl(e)}}break}if(bo=!1,ua=ia=la=yo.currentDispatcher=null,a)wo=null,e.finishedWork=null;else if(null!==ko)e.finishedWork=null;else{if(null===(t=e.current.alternate)&&l("281"),wo=null,Co){if(a=e.latestPendingTime,o=e.latestSuspendedTime,i=e.latestPingedTime,0!==a&&a>r||0!==o&&o>r||0!==i&&i>r)return e.didError=!1,0!==(n=e.latestPingedTime)&&n<=r&&(e.latestPingedTime=0),n=e.earliestPendingTime,t=e.latestPendingTime,n===r?e.earliestPendingTime=t===r?e.latestPendingTime=0:t:t===r&&(e.latestPendingTime=n),n=e.earliestSuspendedTime,t=e.latestSuspendedTime,0===n?e.earliestSuspendedTime=e.latestSuspendedTime=r:n>r?e.earliestSuspendedTime=r:t<r&&(e.latestSuspendedTime=r),Hr(r,e),void(e.expirationTime=e.expirationTime);if(!e.didError&&!n)return e.didError=!0,e.nextExpirationTimeToWorkOn=r,r=e.expirationTime=1,void(e.expirationTime=r)}e.pendingCommitExpirationTime=r,e.finishedWork=t}}function Mo(e,t){var n;e:{for(bo&&!Eo&&l("263"),n=e.return;null!==n;){switch(n.tag){case 2:case 3:var r=n.stateNode;if("function"==typeof n.type.getDerivedStateFromCatch||"function"==typeof r.componentDidCatch&&(null===So||!So.has(r))){Gr(n,e=po(n,e=aa(t,e),1)),Ro(n,1),n=void 0;break e}break;case 5:Gr(n,e=fo(n,e=aa(t,e),1)),Ro(n,1),n=void 0;break e}n=n.return}5===e.tag&&(Gr(e,n=fo(e,n=aa(t,e),1)),Ro(e,1)),n=void 0}return n}function No(e,t){return 0!==go?e=go:bo?e=Eo?1:xo:1&t.mode?(e=$o?2+10*(1+((e-2+15)/10|0)):2+25*(1+((e-2+500)/25|0)),null!==wo&&e===xo&&(e+=1)):e=1,$o&&(0===Wo||e>Wo)&&(Wo=e),e}function Ro(e,t){e:{(0===e.expirationTime||e.expirationTime>t)&&(e.expirationTime=t);var n=e.alternate;null!==n&&(0===n.expirationTime||n.expirationTime>t)&&(n.expirationTime=t);var r=e.return;if(null===r&&5===e.tag)e=e.stateNode;else{for(;null!==r;){if(n=r.alternate,(0===r.childExpirationTime||r.childExpirationTime>t)&&(r.childExpirationTime=t),null!==n&&(0===n.childExpirationTime||n.childExpirationTime>t)&&(n.childExpirationTime=t),null===r.return&&5===r.tag){e=r.stateNode;break e}r=r.return}e=null}}null!==e&&(!bo&&0!==xo&&t<xo&&To(),Yr(e,t),bo&&!Eo&&wo===e||(t=e,e=e.expirationTime,null===t.nextScheduledRoot?(t.expirationTime=e,null===Io?(jo=Io=t,t.nextScheduledRoot=t):(Io=Io.nextScheduledRoot=t).nextScheduledRoot=jo):(0===(n=t.expirationTime)||e<n)&&(t.expirationTime=e),Lo||(Qo?qo&&(zo=t,Bo=1,cl(t,1,!0)):1===e?sl(1,null):ol(t,e))),tl>el&&(tl=0,l("185")))}function Ao(e,t,n,r,a){var o=go;go=1;try{return e(t,n,r,a)}finally{go=o}}var jo=null,Io=null,Fo=0,Uo=void 0,Lo=!1,zo=null,Bo=0,Wo=0,Vo=!1,Yo=!1,Ho=null,Ko=null,Qo=!1,qo=!1,$o=!1,Xo=null,Go=o.unstable_now(),Jo=2+(Go/10|0),Zo=Jo,el=50,tl=0,nl=null,rl=1;function al(){Jo=2+((o.unstable_now()-Go)/10|0)}function ol(e,t){if(0!==Fo){if(t>Fo)return;null!==Uo&&o.unstable_cancelScheduledWork(Uo)}Fo=t,e=o.unstable_now()-Go,Uo=o.unstable_scheduleWork(ul,{timeout:10*(t-2)-e})}function ll(){return Lo?Zo:(il(),0!==Bo&&1073741823!==Bo||(al(),Zo=Jo),Zo)}function il(){var e=0,t=null;if(null!==Io)for(var n=Io,r=jo;null!==r;){var a=r.expirationTime;if(0===a){if((null===n||null===Io)&&l("244"),r===r.nextScheduledRoot){jo=Io=r.nextScheduledRoot=null;break}if(r===jo)jo=a=r.nextScheduledRoot,Io.nextScheduledRoot=a,r.nextScheduledRoot=null;else{if(r===Io){(Io=n).nextScheduledRoot=jo,r.nextScheduledRoot=null;break}n.nextScheduledRoot=r.nextScheduledRoot,r.nextScheduledRoot=null}r=n.nextScheduledRoot}else{if((0===e||a<e)&&(e=a,t=r),r===Io)break;if(1===e)break;n=r,r=r.nextScheduledRoot}}zo=t,Bo=e}function ul(e){if(e.didTimeout&&null!==jo){al();var t=jo;do{var n=t.expirationTime;0!==n&&Jo>=n&&(t.nextExpirationTimeToWorkOn=Jo),t=t.nextScheduledRoot}while(t!==jo)}sl(0,e)}function sl(e,t){if(Ko=t,il(),null!==Ko)for(al(),Zo=Jo;null!==zo&&0!==Bo&&(0===e||e>=Bo)&&(!Vo||Jo>=Bo);)cl(zo,Bo,Jo>=Bo),il(),al(),Zo=Jo;else for(;null!==zo&&0!==Bo&&(0===e||e>=Bo);)cl(zo,Bo,!0),il();if(null!==Ko&&(Fo=0,Uo=null),0!==Bo&&ol(zo,Bo),Ko=null,Vo=!1,tl=0,nl=null,null!==Xo)for(e=Xo,Xo=null,t=0;t<e.length;t++){var n=e[t];try{n._onComplete()}catch(e){Yo||(Yo=!0,Ho=e)}}if(Yo)throw e=Ho,Ho=null,Yo=!1,e}function cl(e,t,n){if(Lo&&l("245"),Lo=!0,null===Ko||n){var r=e.finishedWork;null!==r?fl(e,r,t):(e.finishedWork=null,Oo(e,!1,n),null!==(r=e.finishedWork)&&fl(e,r,t))}else null!==(r=e.finishedWork)?fl(e,r,t):(e.finishedWork=null,Oo(e,!0,n),null!==(r=e.finishedWork)&&(dl()?e.finishedWork=r:fl(e,r,t)));Lo=!1}function fl(e,t,n){var r=e.firstBatch;if(null!==r&&r._expirationTime<=n&&(null===Xo?Xo=[r]:Xo.push(r),r._defer))return e.finishedWork=t,void(e.expirationTime=0);e.finishedWork=null,e===nl?tl++:(nl=e,tl=0),Eo=bo=!0,e.current===t&&l("177"),0===(n=e.pendingCommitExpirationTime)&&l("261"),e.pendingCommitExpirationTime=0,r=t.expirationTime;var a=t.childExpirationTime;if(r=0===r||0!==a&&a<r?a:r,e.didError=!1,0===r?(e.earliestPendingTime=0,e.latestPendingTime=0,e.earliestSuspendedTime=0,e.latestSuspendedTime=0,e.latestPingedTime=0):(0!==(a=e.latestPendingTime)&&(a<r?e.earliestPendingTime=e.latestPendingTime=0:e.earliestPendingTime<r&&(e.earliestPendingTime=e.latestPendingTime)),0===(a=e.earliestSuspendedTime)?Yr(e,r):r>e.latestSuspendedTime?(e.earliestSuspendedTime=0,e.latestSuspendedTime=0,e.latestPingedTime=0,Yr(e,r)):r<a&&Yr(e,r)),Hr(0,e),yo.current=null,1<t.effectTag?null!==t.lastEffect?(t.lastEffect.nextEffect=t,r=t.firstEffect):r=t:r=t.firstEffect,dr=_n,Fn(a=In())){if("selectionStart"in a)var o={start:a.selectionStart,end:a.selectionEnd};else e:{var i=(o=(o=a.ownerDocument)&&o.defaultView||window).getSelection&&o.getSelection();if(i&&0!==i.rangeCount){o=i.anchorNode;var u=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{o.nodeType,s.nodeType}catch(e){o=null;break e}var c=0,f=-1,d=-1,p=0,h=0,m=a,y=null;t:for(;;){for(var v;m!==o||0!==u&&3!==m.nodeType||(f=c+u),m!==s||0!==i&&3!==m.nodeType||(d=c+i),3===m.nodeType&&(c+=m.nodeValue.length),null!==(v=m.firstChild);)y=m,m=v;for(;;){if(m===a)break t;if(y===o&&++p===u&&(f=c),y===s&&++h===i&&(d=c),null!==(v=m.nextSibling))break;y=(m=y).parentNode}m=v}o=-1===f||-1===d?null:{start:f,end:d}}else o=null}o=o||{start:0,end:0}}else o=null;for(pr={focusedElem:a,selectionRange:o},_n=!1,_o=r;null!==_o;){a=!1,o=void 0;try{for(;null!==_o;){if(256&_o.effectTag){var g=_o.alternate;e:switch(u=_o,u.tag){case 2:case 3:if(256&u.effectTag&&null!==g){var b=g.memoizedProps,k=g.memoizedState,w=u.stateNode;w.props=u.memoizedProps,w.state=u.memoizedState;var x=w.getSnapshotBeforeUpdate(b,k);w.__reactInternalSnapshotBeforeUpdate=x}break e;case 5:case 7:case 8:case 6:break e;default:l("163")}}_o=_o.nextEffect}}catch(e){a=!0,o=e}a&&(null===_o&&l("178"),Mo(_o,o),null!==_o&&(_o=_o.nextEffect))}for(_o=r;null!==_o;){g=!1,b=void 0;try{for(;null!==_o;){var C=_o.effectTag;if(16&C&&rr(_o.stateNode,""),128&C){var _=_o.alternate;if(null!==_){var E=_.ref;null!==E&&("function"==typeof E?E(null):E.current=null)}}switch(14&C){case 2:uo(_o),_o.effectTag&=-3;break;case 6:uo(_o),_o.effectTag&=-3,co(_o.alternate,_o);break;case 4:co(_o.alternate,_o);break;case 8:so(k=_o),k.return=null,k.child=null,k.alternate&&(k.alternate.child=null,k.alternate.return=null)}_o=_o.nextEffect}}catch(e){g=!0,b=e}g&&(null===_o&&l("178"),Mo(_o,b),null!==_o&&(_o=_o.nextEffect))}if(E=pr,_=In(),C=E.focusedElem,b=E.selectionRange,_!==C&&C&&C.ownerDocument&&function e(t,n){return!(!t||!n)&&(t===n||(!t||3!==t.nodeType)&&(n&&3===n.nodeType?e(t,n.parentNode):"contains"in t?t.contains(n):!!t.compareDocumentPosition&&!!(16&t.compareDocumentPosition(n))))}(C.ownerDocument.documentElement,C)){null!==b&&Fn(C)&&(_=b.start,void 0===(E=b.end)&&(E=_),"selectionStart"in C?(C.selectionStart=_,C.selectionEnd=Math.min(E,C.value.length)):(_=((g=C.ownerDocument||document)&&g.defaultView||window).getSelection(),k=C.textContent.length,E=Math.min(b.start,k),b=void 0===b.end?E:Math.min(b.end,k),!_.extend&&E>b&&(k=b,b=E,E=k),k=jn(C,E),w=jn(C,b),k&&w&&(1!==_.rangeCount||_.anchorNode!==k.node||_.anchorOffset!==k.offset||_.focusNode!==w.node||_.focusOffset!==w.offset)&&((g=g.createRange()).setStart(k.node,k.offset),_.removeAllRanges(),E>b?(_.addRange(g),_.extend(w.node,w.offset)):(g.setEnd(w.node,w.offset),_.addRange(g))))),_=[];for(E=C;E=E.parentNode;)1===E.nodeType&&_.push({element:E,left:E.scrollLeft,top:E.scrollTop});for("function"==typeof C.focus&&C.focus(),C=0;C<_.length;C++)(E=_[C]).element.scrollLeft=E.left,E.element.scrollTop=E.top}for(pr=null,_n=!!dr,dr=null,e.current=t,_o=r;null!==_o;){r=!1,C=void 0;try{for(_=n;null!==_o;){var S=_o.effectTag;if(36&S){var T=_o.alternate;switch(g=_,(E=_o).tag){case 2:case 3:var D=E.stateNode;if(4&E.effectTag)if(null===T)D.props=E.memoizedProps,D.state=E.memoizedState,D.componentDidMount();else{var P=T.memoizedProps,O=T.memoizedState;D.props=E.memoizedProps,D.state=E.memoizedState,D.componentDidUpdate(P,O,D.__reactInternalSnapshotBeforeUpdate)}var M=E.updateQueue;null!==M&&(D.props=E.memoizedProps,D.state=E.memoizedState,na(0,M,D));break;case 5:var N=E.updateQueue;if(null!==N){if(b=null,null!==E.child)switch(E.child.tag){case 7:b=E.child.stateNode;break;case 2:case 3:b=E.child.stateNode}na(0,N,b)}break;case 7:var R=E.stateNode;null===T&&4&E.effectTag&&hr(E.type,E.memoizedProps)&&R.focus();break;case 8:case 6:case 15:case 16:break;default:l("163")}}if(128&S){var A=_o.ref;if(null!==A){var j=_o.stateNode;switch(_o.tag){case 7:var I=j;break;default:I=j}"function"==typeof A?A(I):A.current=I}}var F=_o.nextEffect;_o.nextEffect=null,_o=F}}catch(e){r=!0,C=e}r&&(null===_o&&l("178"),Mo(_o,C),null!==_o&&(_o=_o.nextEffect))}bo=Eo=!1,"function"==typeof Ar&&Ar(t.stateNode),S=t.expirationTime,t=t.childExpirationTime,0===(t=0===S||0!==t&&t<S?t:S)&&(So=null),e.expirationTime=t,e.finishedWork=null}function dl(){return!!Vo||!(null===Ko||Ko.timeRemaining()>rl)&&(Vo=!0)}function pl(e){null===zo&&l("246"),zo.expirationTime=0,Yo||(Yo=!0,Ho=e)}function hl(e,t){var n=Qo;Qo=!0;try{return e(t)}finally{(Qo=n)||Lo||sl(1,null)}}function ml(e,t){if(Qo&&!qo){qo=!0;try{return e(t)}finally{qo=!1}}return e(t)}function yl(e,t,n){if($o)return e(t,n);Qo||Lo||0===Wo||(sl(Wo,null),Wo=0);var r=$o,a=Qo;Qo=$o=!0;try{return e(t,n)}finally{$o=r,(Qo=a)||Lo||sl(1,null)}}function vl(e,t,n,r,a){var o=t.current;return n=function(e){if(!e)return xr;e=e._reactInternalFiber;e:{(2!==tn(e)||2!==e.tag&&3!==e.tag)&&l("170");var t=e;do{switch(t.tag){case 5:t=t.stateNode.context;break e;case 2:if(Tr(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}break;case 3:if(Tr(t.type._reactResult)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(null!==t);l("171"),t=void 0}if(2===e.tag){var n=e.type;if(Tr(n))return Mr(e,n,t)}else if(3===e.tag&&Tr(n=e.type._reactResult))return Mr(e,n,t);return t}(n),null===t.context?t.context=n:t.pendingContext=n,t=a,(a=$r(r)).payload={element:e},null!==(t=void 0===t?null:t)&&(a.callback=t),Gr(o,a),Ro(o,r),r}function gl(e,t,n,r){var a=t.current;return vl(e,t,n,a=No(ll(),a),r)}function bl(e){if(!(e=e.current).child)return null;switch(e.child.tag){case 7:default:return e.child.stateNode}}function kl(e){var t=2+25*(1+((ll()-2+500)/25|0));t<=vo&&(t=vo+1),this._expirationTime=vo=t,this._root=e,this._callbacks=this._next=null,this._hasChildren=this._didComplete=!1,this._children=null,this._defer=!0}function wl(){this._callbacks=null,this._didCommit=!1,this._onCommit=this._onCommit.bind(this)}function xl(e,t,n){e={current:t=new Fr(5,null,null,t?3:0),containerInfo:e,pendingChildren:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,didError:!1,pendingCommitExpirationTime:0,finishedWork:null,timeoutHandle:-1,context:null,pendingContext:null,hydrate:n,nextExpirationTimeToWorkOn:0,expirationTime:0,firstBatch:null,nextScheduledRoot:null},this._internalRoot=t.stateNode=e}function Cl(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function _l(e,t,n,r,a){Cl(n)||l("200");var o=n._reactRootContainer;if(o){if("function"==typeof a){var i=a;a=function(){var e=bl(o._internalRoot);i.call(e)}}null!=e?o.legacy_renderSubtreeIntoContainer(e,t,a):o.render(t,a)}else{if(o=n._reactRootContainer=function(e,t){if(t||(t=!(!(t=e?9===e.nodeType?e.documentElement:e.firstChild:null)||1!==t.nodeType||!t.hasAttribute("data-reactroot"))),!t)for(var n;n=e.lastChild;)e.removeChild(n);return new xl(e,!1,t)}(n,r),"function"==typeof a){var u=a;a=function(){var e=bl(o._internalRoot);u.call(e)}}ml(function(){null!=e?o.legacy_renderSubtreeIntoContainer(e,t,a):o.render(t,a)})}return bl(o._internalRoot)}function El(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;return Cl(t)||l("200"),function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Xe,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)}De=function(e,t,n){switch(t){case"input":if(xt(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=z(r);a||l("90"),He(r),xt(r,a)}}}break;case"textarea":Xn(e,n);break;case"select":null!=(t=n.value)&&Qn(e,!!n.multiple,t,!1)}},kl.prototype.render=function(e){this._defer||l("250"),this._hasChildren=!0,this._children=e;var t=this._root._internalRoot,n=this._expirationTime,r=new wl;return vl(e,t,null,n,r._onCommit),r},kl.prototype.then=function(e){if(this._didComplete)e();else{var t=this._callbacks;null===t&&(t=this._callbacks=[]),t.push(e)}},kl.prototype.commit=function(){var e=this._root._internalRoot,t=e.firstBatch;if(this._defer&&null!==t||l("251"),this._hasChildren){var n=this._expirationTime;if(t!==this){this._hasChildren&&(n=this._expirationTime=t._expirationTime,this.render(this._children));for(var r=null,a=t;a!==this;)r=a,a=a._next;null===r&&l("251"),r._next=a._next,this._next=t,e.firstBatch=this}this._defer=!1,t=n,Lo&&l("253"),zo=e,Bo=t,cl(e,t,!0),sl(1,null),t=this._next,this._next=null,null!==(t=e.firstBatch=t)&&t._hasChildren&&t.render(t._children)}else this._next=null,this._defer=!1},kl.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var e=this._callbacks;if(null!==e)for(var t=0;t<e.length;t++)(0,e[t])()}},wl.prototype.then=function(e){if(this._didCommit)e();else{var t=this._callbacks;null===t&&(t=this._callbacks=[]),t.push(e)}},wl.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var e=this._callbacks;if(null!==e)for(var t=0;t<e.length;t++){var n=e[t];"function"!=typeof n&&l("191",n),n()}}},xl.prototype.render=function(e,t){var n=this._internalRoot,r=new wl;return null!==(t=void 0===t?null:t)&&r.then(t),gl(e,n,null,r._onCommit),r},xl.prototype.unmount=function(e){var t=this._internalRoot,n=new wl;return null!==(e=void 0===e?null:e)&&n.then(e),gl(null,t,null,n._onCommit),n},xl.prototype.legacy_renderSubtreeIntoContainer=function(e,t,n){var r=this._internalRoot,a=new wl;return null!==(n=void 0===n?null:n)&&a.then(n),gl(t,r,e,a._onCommit),a},xl.prototype.createBatch=function(){var e=new kl(this),t=e._expirationTime,n=this._internalRoot,r=n.firstBatch;if(null===r)n.firstBatch=e,e._next=null;else{for(n=null;null!==r&&r._expirationTime<=t;)n=r,r=r._next;e._next=r,null!==n&&(n._next=e)}return e},Ae=hl,je=yl,Ie=function(){Lo||0===Wo||(sl(Wo,null),Wo=0)};var Sl={createPortal:El,findDOMNode:function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternalFiber;return void 0===t&&("function"==typeof e.render?l("188"):l("268",Object.keys(e))),e=null===(e=rn(t))?null:e.stateNode},hydrate:function(e,t,n){return _l(null,e,t,!0,n)},render:function(e,t,n){return _l(null,e,t,!1,n)},unstable_renderSubtreeIntoContainer:function(e,t,n,r){return(null==e||void 0===e._reactInternalFiber)&&l("38"),_l(e,t,n,!1,r)},unmountComponentAtNode:function(e){return Cl(e)||l("40"),!!e._reactRootContainer&&(ml(function(){_l(null,null,e,!1,function(){e._reactRootContainer=null})}),!0)},unstable_createPortal:function(){return El.apply(void 0,arguments)},unstable_batchedUpdates:hl,unstable_interactiveUpdates:yl,flushSync:function(e,t){Lo&&l("187");var n=Qo;Qo=!0;try{return Ao(e,t)}finally{Qo=n,sl(1,null)}},unstable_flushControlled:function(e){var t=Qo;Qo=!0;try{Ao(e)}finally{(Qo=t)||Lo||sl(1,null)}},__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{Events:[U,L,z,M.injectEventPluginsByName,g,K,function(e){S(e,H)},Ne,Re,Dn,R]},unstable_createRoot:function(e,t){return Cl(e)||l("278"),new xl(e,!0,null!=t&&!0===t.hydrate)}};!function(e){var t=e.findFiberByHostInstance;(function(e){if("undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled||!t.supportsFiber)return!0;try{var n=t.inject(e);Ar=Ir(function(e){return t.onCommitFiberRoot(n,e)}),jr=Ir(function(e){return t.onCommitFiberUnmount(n,e)})}catch(e){}})(a({},e,{findHostInstanceByFiber:function(e){return null===(e=rn(e))?null:e.stateNode},findFiberByHostInstance:function(e){return t?t(e):null}}))}({findFiberByHostInstance:F,bundleType:0,version:"16.5.2",rendererPackageName:"react-dom"});var Tl={default:Sl},Dl=Tl&&Sl||Tl;e.exports=Dl.default||Dl},function(e,t,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,l,i=function(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),u=1;u<arguments.length;u++){for(var s in n=Object(arguments[u]))a.call(n,s)&&(i[s]=n[s]);if(r){l=r(n);for(var c=0;c<l.length;c++)o.call(n,l[c])&&(i[l[c]]=n[l[c]])}}return i}},function(e,t,n){"use strict";e.exports=n(21)},function(e,t,n){"use strict";
/** @license React v16.5.2
 * schedule.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */Object.defineProperty(t,"__esModule",{value:!0});var r=null,a=!1,o=!1,l="object"==typeof performance&&"function"==typeof performance.now,i={timeRemaining:l?function(){var e=m()-performance.now();return 0<e?e:0}:function(){var e=m()-Date.now();return 0<e?e:0},didTimeout:!1};function u(){if(!a){var e=r.timesOutAt;o?h():o=!0,p(c,e)}}function s(){var e=r,t=r.next;if(r===t)r=null;else{var n=r.previous;r=n.next=t,t.previous=n}e.next=e.previous=null,(e=e.callback)(i)}function c(e){a=!0,i.didTimeout=e;try{if(e)for(;null!==r;){var n=t.unstable_now();if(!(r.timesOutAt<=n))break;do{s()}while(null!==r&&r.timesOutAt<=n)}else if(null!==r)do{s()}while(null!==r&&0<m()-t.unstable_now())}finally{a=!1,null!==r?u():o=!1}}var f,d,p,h,m,y=Date,v="function"==typeof setTimeout?setTimeout:void 0,g="function"==typeof clearTimeout?clearTimeout:void 0,b="function"==typeof requestAnimationFrame?requestAnimationFrame:void 0,k="function"==typeof cancelAnimationFrame?cancelAnimationFrame:void 0;function w(e){f=b(function(t){g(d),e(t)}),d=v(function(){k(f),e(t.unstable_now())},100)}if(l){var x=performance;t.unstable_now=function(){return x.now()}}else t.unstable_now=function(){return y.now()};if("undefined"==typeof window){var C=-1;p=function(e){C=setTimeout(e,0,!0)},h=function(){clearTimeout(C)},m=function(){return 0}}else if(window._schedMock){var _=window._schedMock;p=_[0],h=_[1],m=_[2]}else{"undefined"!=typeof console&&("function"!=typeof b&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),"function"!=typeof k&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));var E=null,S=!1,T=-1,D=!1,P=!1,O=0,M=33,N=33;m=function(){return O};var R="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(e){if(e.source===window&&e.data===R){S=!1;var n=t.unstable_now();if(e=!1,0>=O-n){if(!(-1!==T&&T<=n))return void(D||(D=!0,w(A)));e=!0}if(T=-1,n=E,E=null,null!==n){P=!0;try{n(e)}finally{P=!1}}}},!1);var A=function(e){D=!1;var t=e-O+N;t<N&&M<N?(8>t&&(t=8),N=t<M?M:t):M=t,O=e+N,S||(S=!0,window.postMessage(R,"*"))};p=function(e,t){E=e,T=t,P?window.postMessage(R,"*"):D||(D=!0,w(A))},h=function(){E=null,S=!1,T=-1}}t.unstable_scheduleWork=function(e,n){var a=t.unstable_now();if(e={callback:e,timesOutAt:n=void 0!==n&&null!==n&&null!==n.timeout&&void 0!==n.timeout?a+n.timeout:a+5e3,next:null,previous:null},null===r)r=e.next=e.previous=e,u();else{a=null;var o=r;do{if(o.timesOutAt>n){a=o;break}o=o.next}while(o!==r);null===a?a=r:a===r&&(r=e,u()),(n=a.previous).next=a.previous=e,e.next=a,e.previous=n}return e},t.unstable_cancelScheduledWork=function(e){var t=e.next;if(null!==t){if(t===e)r=null;else{e===r&&(r=t);var n=e.previous;n.next=t,t.previous=n}e.next=e.previous=null}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),l=h(o),i=h(n(1)),u=h(n(2)),s=h(n(8)),c=n(4),f=n(3),d=h(n(9)),p=h(n(6));function h(e){return e&&e.__esModule?e:{default:e}}var m=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));y.call(n);var a=e.locale,o=e.date,l=e.format;n.locale=r({},s.default.locale,a);var i=(0,u.default)(o,l,"startOf");return n.state={selectedDate:i,show:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"componentDidUpdate",value:function(e,t){var n=this.props.date;n!==e.date&&this.setState({selectedDate:(0,u.default)(n,this.props.format,"startOf")})}},{key:"render",value:function(){var e=this.props,t=e.format,n=e.firstDayOfWeek,a=e.minDate,o=e.maxDate,i=e.classNames,u=e.iconElement,s=e.isEnable,c=r({},f.defaultClasses,i),h=this.state.show;return l.default.createElement("div",{className:"daterange-container"},l.default.createElement("div",{className:"daterange-label",onClick:this.show},l.default.createElement("input",{readOnly:!0,className:"input-text datepicker",type:"text",autoComplete:"off",value:this.dateText,disabled:!s}),u),l.default.createElement(d.default,{isOpening:h,onClose:this.close},l.default.createElement("div",{className:c.dateRange},l.default.createElement(p.default,{shownDate:this.state.selectedDate,format:t,firstDayOfWeek:n,minDate:a,maxDate:o,classNames:i,onChange:this.handleSelect,locale:this.locale}))))}},{key:"dateText",get:function(){var e=this.state.selectedDate;return e?""+e.format(this.props.format):""}}]),t}();m.propTypes={format:i.default.string,firstDayOfWeek:i.default.number,minDate:i.default.oneOfType([i.default.object,i.default.func,i.default.string]),maxDate:i.default.oneOfType([i.default.object,i.default.func,i.default.string]),classNames:i.default.object,onChange:i.default.func,onInit:i.default.func,locale:i.default.object,date:i.default.oneOfType([i.default.object,i.default.func,i.default.string]),iconElement:i.default.any,isEnable:i.default.bool},m.defaultProps={format:c.MomentFormat.default,iconElement:l.default.createElement("i",{className:"icon icon-calendar"}),isEnable:!0};var y=function(){var e=this;this.handleSelect=function(t){var n=e.props.onChange;n&&n(t),e.setState({selectedDate:t,show:!1})},this.show=function(){e.props.isEnable&&e.setState({show:!0})},this.close=function(){var t=e.props,n=t.date,r=t.format,a=(0,u.default)(n,r,"startOf");e.setState({show:!1,selectedDate:a})}};t.default=m}])});

/***/ }),

/***/ "./node_modules/@9softstudio/react-datepicker/node_modules/moment/moment.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@9softstudio/react-datepicker/node_modules/moment/moment.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var require;//! moment.js

;(function (global, factory) {
     true ? module.exports = factory() :
    undefined
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                !(function webpackMissingModule() { var e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

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
  return function (dispatch) {
    _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_1__["default"].postData(url, params).then(function (response) {
      response.data.timestamp = new Date().getTime();
      dispatch(setGridData(response.data));
    }).catch(function (error) {
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

/***/ "./www/js/source/reactpages/actions/pagingOptionAction.js":
/*!****************************************************************!*\
  !*** ./www/js/source/reactpages/actions/pagingOptionAction.js ***!
  \****************************************************************/
/*! exports provided: setPagingOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPagingOption", function() { return setPagingOption; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

var setPagingOption = function setPagingOption(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_PAGING_OPTION"],
    data: data
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

var setReportTitle = function setReportTitle(title) {
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

/***/ "./www/js/source/reactpages/pages/dailybets/actions/dataAction.js":
/*!************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/actions/dataAction.js ***!
  \************************************************************************/
/*! exports provided: getData, exportExcel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportExcel", function() { return exportExcel; });
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _jsroot_actions_pagingOptionAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/pagingOptionAction */ "./www/js/source/reactpages/actions/pagingOptionAction.js");
/* harmony import */ var _jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/gridDataAction */ "./www/js/source/reactpages/actions/gridDataAction.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/DataService */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var emptyData = {
  dataList: [],
  total: {}
};
var defaultPaingOption = {
  TotalItem: 0
};

var dispatchResult = function dispatchResult(dispatch, data, pagingOption) {
  dispatch(Object(_jsroot_actions_gridDataAction__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(data));
  dispatch(Object(_jsroot_actions_pagingOptionAction__WEBPACK_IMPORTED_MODULE_1__["setPagingOption"])(pagingOption));
  dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(false));
};

var apiUrl = _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl('DailyBetsReport/Index');
var getData = function getData(param) {
  return function (dispatch) {
    dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(true));
    _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_4__["default"].postData(apiUrl, param).then(function (response) {
      var _response$data = response.data,
          dataList = _response$data.dataList,
          total = _response$data.total,
          totalRows = _response$data.totalRows;
      var data = {
        dataList: dataList || [],
        total: total || {}
      };
      var newPagingOption = {
        TotalItem: totalRows,
        PageSize: param.pageSize,
        PageIndex: param.pageIndex
      };
      dispatchResult(dispatch, data, newPagingOption);
    }).catch(function (error) {
      console.log(error.message);
      dispatchResult(dispatch, _objectSpread({}, emptyData), _objectSpread({}, defaultPaingOption));
    });
  };
};
var exportExcel = function exportExcel(param) {
  return function (dispatch) {
    dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(true));
    _jsroot_lib_DataService__WEBPACK_IMPORTED_MODULE_4__["default"].getFile(apiUrl, param).then(function (response) {
      if (response.data.size === 0) {
        alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource("NoInfo"));
      } else {
        _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_3__["default"].downloadFile(response.data, 'DailyBetsReport.zip');
      }

      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(false));
    }).catch(function (error) {
      console.log(error.message);
      dispatch(Object(_jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__["toggleLoader"])(false));
    });
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/actions/index.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/actions/index.js ***!
  \*******************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/requestParamAction */ "./www/js/source/reactpages/actions/requestParamAction.js");
/* harmony import */ var _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/reportTitleAction */ "./www/js/source/reactpages/actions/reportTitleAction.js");
/* harmony import */ var _dataAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataAction */ "./www/js/source/reactpages/pages/dailybets/actions/dataAction.js");



var ActionCreators = Object.assign({}, _jsroot_actions_requestParamAction__WEBPACK_IMPORTED_MODULE_0__, _jsroot_actions_reportTitleAction__WEBPACK_IMPORTED_MODULE_1__, _dataAction__WEBPACK_IMPORTED_MODULE_2__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/components/AppContainer.jsx":
/*!******************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/components/AppContainer.jsx ***!
  \******************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/pages/dailybets/components/DataGrid.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/pages/dailybets/components/FormFilter.jsx");
/* harmony import */ var _GridCaption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GridCaption */ "./www/js/source/reactpages/pages/dailybets/components/GridCaption.jsx");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/layouts/AppLayout */ "./www/js/source/reactpages/layouts/AppLayout.jsx");







var AppContainer = function AppContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_6__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isLoading: props.isLoading
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridCaption__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

function mapStateToProps(state) {
  var isLoading = state.isLoading;
  return Object.assign({}, {
    isLoading: isLoading
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AppContainer)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/components/DataGrid.jsx":
/*!**************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/components/DataGrid.jsx ***!
  \**************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/dailybets/actions/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_gridUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/gridUtils */ "./www/js/source/reactpages/pages/dailybets/lib/gridUtils.js");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var DataGrid = function DataGrid(props) {
  var isFirstRun = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(true);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    var getData = props.getData;

    var param = _objectSpread({}, props.requestParam);

    getData(param);
  }, [props.requestParam]);
  var gridData = props.gridData;
  var dataList = gridData.dataList,
      total = gridData.total;

  if (!dataList) {
    return null;
  }

  if (!dataList.length) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_6__["default"], null);
  }

  var pagingOption = props.pagingOption,
      requestParam = props.requestParam;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Table"], {
    minWidth: 650,
    autoWidth: true,
    autoHeight: true,
    header: Object(_lib_gridUtils__WEBPACK_IMPORTED_MODULE_5__["renderHeader"])(),
    body: Object(_lib_gridUtils__WEBPACK_IMPORTED_MODULE_5__["renderDataSection"])(dataList),
    footer: Object(_lib_gridUtils__WEBPACK_IMPORTED_MODULE_5__["renderDataSection"])([total], true),
    containerPadding: 30,
    onSort: function onSort(sortBy, sortOrder) {
      return props.setRequestParam(_objectSpread({}, requestParam, {
        sortBy: sortBy,
        sortOrder: sortOrder
      }));
    },
    isPaging: true,
    pageOption: pagingOption,
    onPaging: function onPaging(pageIndex, pageSize) {
      return props.setRequestParam(_objectSpread({}, requestParam, {
        pageSize: pageSize,
        pageIndex: pageIndex
      }));
    }
  });
};

function mapDispatchToProps(dispatch) {
  var setRequestParam = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setRequestParam,
      getData = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].getData;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setRequestParam: setRequestParam,
    getData: getData
  }, dispatch);
}

function mapStateToProps(state) {
  var requestParam = state.requestParam,
      pagingOption = state.pagingOption,
      gridData = state.gridData;
  return Object.assign({}, {
    requestParam: requestParam,
    pagingOption: pagingOption,
    gridData: gridData
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/components/FormFilter.jsx":
/*!****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/components/FormFilter.jsx ***!
  \****************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/dailybets/actions/index.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @9softstudio/react-datepicker */ "./node_modules/@9softstudio/react-datepicker/dist/index.js");
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/utils */ "./www/js/source/reactpages/pages/dailybets/lib/utils.js");
/* harmony import */ var _lib_formFilterUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/formFilterUtils */ "./www/js/source/reactpages/pages/dailybets/lib/formFilterUtils.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var FormFilter = function FormFilter(props) {
  var requestParam = props.requestParam;
  var productCodeList = requestParam.productCodeList,
      currencyIdList = requestParam.currencyIdList,
      date = requestParam.date,
      pageSize = requestParam.pageSize,
      sortBy = requestParam.sortBy,
      sortOrder = requestParam.sortOrder;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(productCodeList),
      _useState2 = _slicedToArray(_useState, 2),
      selectedProduct = _useState2[0],
      setSelectedProduct = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(currencyIdList),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedCurrency = _useState4[0],
      setSelectedCurrency = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(date),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedDate = _useState6[0],
      setSelectedDate = _useState6[1];

  var handleChangeProduct = function handleChangeProduct(currentItem, selectedItemsKey) {
    return setSelectedProduct(selectedItemsKey);
  };

  var handleChangeCurrency = function handleChangeCurrency(currentItem, selectedItemsKey) {
    return setSelectedCurrency(selectedItemsKey);
  };

  var buildParam = function buildParam() {
    return {
      pageSize: pageSize,
      pageIndex: 1,
      sortBy: sortBy,
      sortOrder: sortOrder,
      currencyIdList: selectedCurrency,
      productCodeList: selectedProduct,
      date: selectedDate
    };
  };

  var submit = function submit(event) {
    event.preventDefault();
    var params = buildParam();
    props.setRequestParam(params);
  };

  var exportExcel = function exportExcel(event) {
    event.preventDefault();
    var params = buildParam();
    params.isExportExcel = true;
    props.exportExcel(params);
  };

  var productOptions = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].productOptions,
      currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_5__["default"].currencyList;
  var dateConstraint = props.dateConstraint;
  var dateString = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_7__["getFormattedDate"])(selectedDate);
  var isValidParam = !!selectedProduct && !!selectedCurrency;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-filter"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Date")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_6__["DatePicker"], {
    format: "DD/MM/YYYY",
    minDate: dateConstraint.minDate,
    maxDate: dateConstraint.maxDate,
    date: dateString,
    onChange: function onChange(momentDate) {
      return setSelectedDate(momentDate.format("MM/DD/YYYY"));
    }
  }))), productOptions && productOptions.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Product")), Object(_lib_formFilterUtils__WEBPACK_IMPORTED_MODULE_8__["renderProductSelectList"])(productOptions, handleChangeProduct))) : null, currencyList && currencyList.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label-text"
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Currency")), Object(_lib_formFilterUtils__WEBPACK_IMPORTED_MODULE_8__["renderCurrencySelectList"])(currencyList, handleChangeCurrency))) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn btn-submit",
    disabled: !isValidParam,
    onClick: submit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource("Submit"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "caret-block"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-excel right",
    onClick: exportExcel,
    title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getSingleResource('ExportToExcel')
  }))));
};

function mapDispatchToProps(dispatch) {
  var setRequestParam = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].setRequestParam,
      exportExcel = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"].exportExcel;
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setRequestParam: setRequestParam,
    exportExcel: exportExcel
  }, dispatch);
}

function mapStateToProps(state) {
  var requestParam = state.requestParam,
      dateConstraint = state.dateConstraint;
  return Object.assign({}, {
    requestParam: requestParam,
    dateConstraint: dateConstraint
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/components/GridCaption.jsx":
/*!*****************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/components/GridCaption.jsx ***!
  \*****************************************************************************/
/*! exports provided: GridCaption, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridCaption", function() { return GridCaption; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/utils */ "./www/js/source/reactpages/pages/dailybets/lib/utils.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var buildCurrencytext = function buildCurrencytext(selectedCurrency) {
  var currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_4__["default"].currencyList;
  var selectedCurrencyList = selectedCurrency.split(',');
  var isSelectAllCurrency = currencyList.map(function (x) {
    return x.Key;
  }).length === selectedCurrencyList.length;

  if (!isSelectAllCurrency) {
    var selectedCurrencyText = currencyList.reduce(function (result, currentItem) {
      if (selectedCurrencyList.findIndex(function (x) {
        return Number(x) === currentItem.Key;
      }) !== -1) {
        result.push(currentItem.Value);
      }

      return result;
    }, []).join(', ');
    var resourceKey = selectedCurrencyList.length > 1 ? 'Currencies' : 'Currency';
    return "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource(resourceKey), ": ") + selectedCurrencyText;
  }

  return _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource('AllCurrencies');
};

var GridCaption = function GridCaption(props) {
  var isFirstRun = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(true);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      content = _useState2[0],
      setContent = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    var requestParam = props.requestParam,
        pagingOption = props.pagingOption;
    var date = requestParam.date,
        currencyIdList = requestParam.currencyIdList;
    var dateString = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["getFormattedDate"])(date);
    var currencyText = buildCurrencytext(currencyIdList);
    var totalTicketText = "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource('TotalTickets'), ": ").concat(_jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].format(pagingOption.TotalItem));
    var content = "".concat(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getSingleResource('DailyBets'), ", ").concat(dateString, " - ").concat(currencyText, " - ").concat(totalTicketText);
    setContent(content);
  }, [props.requestParam, props.pagingOption]);

  if (!content) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: content
  });
};

function mapStateToProps(state) {
  var requestParam = state.requestParam,
      pagingOption = state.pagingOption;
  return Object.assign({}, {
    requestParam: requestParam,
    pagingOption: pagingOption
  });
}

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(GridCaption));

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/components/index.jsx":
/*!***********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/components/index.jsx ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer.jsx */ "./www/js/source/reactpages/pages/dailybets/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers */ "./www/js/source/reactpages/pages/dailybets/reducers/index.js");
/* harmony import */ var _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var productOptions = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].productOptions,
    currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_6__["default"].currencyList;
var selectedProduct = productOptions.map(function (x) {
  return x.Code;
}).join(',');
var selectedCurrency = currencyList.map(function (x) {
  return x.Key;
}).join(',');

var _window$initialState = window.initialState,
    today = _window$initialState.today,
    initialState = _objectWithoutProperties(_window$initialState, ["today"]);

var requestParam = {
  pageSize: 50,
  pageIndex: 1,
  sortBy: '',
  sortOrder: '',
  productCodeList: selectedProduct,
  currencyIdList: selectedCurrency,
  date: today
};

var defaultState = _objectSpread({}, initialState, {
  requestParam: requestParam
});

var store = _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_5__["default"].createStore(_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);

var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById("app-container"));

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/lib/constants.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/lib/constants.js ***!
  \*******************************************************************/
/*! exports provided: headerText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerText", function() { return headerText; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");

var headerText = {
  playerName: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('PlayerName'),
  currency: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Currency'),
  refNo: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('RefNo'),
  transTime: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('TransTime'),
  product: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Product'),
  betType: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('BetType'),
  turnover: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Turnover'),
  winloss: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('WinLoss'),
  status: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Status')
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/lib/formFilterUtils.js":
/*!*************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/lib/formFilterUtils.js ***!
  \*************************************************************************/
/*! exports provided: renderProductSelectList, renderCurrencySelectList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderProductSelectList", function() { return renderProductSelectList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderCurrencySelectList", function() { return renderCurrencySelectList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @9softstudio/react-multiselect */ "./node_modules/@9softstudio/react-multiselect/dist/index.js");
/* harmony import */ var _9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_2__);



var renderProductSelectList = function renderProductSelectList(dataSource, onChangeHandler) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default.a, {
    id: "ProductList",
    language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].currentLanguage,
    dataSource: dataSource,
    keyField: "Code",
    valueField: "Name",
    statusField: "Status",
    onChange: onChangeHandler
  });
};
var renderCurrencySelectList = function renderCurrencySelectList(dataSource, onChangeHandler) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_multiselect__WEBPACK_IMPORTED_MODULE_2___default.a, {
    id: "ddlCurrency",
    language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].currentLanguage,
    dataSource: dataSource,
    keyField: "Key",
    valueField: "Value",
    statusField: "Status",
    onChange: onChangeHandler
  });
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/lib/gridUtils.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/lib/gridUtils.js ***!
  \*******************************************************************/
/*! exports provided: renderHeader, renderDataSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderHeader", function() { return renderHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDataSection", function() { return renderDataSection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./www/js/source/reactpages/pages/dailybets/lib/constants.js");
/* harmony import */ var _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/numberFormat */ "./www/js/source/reactpages/lib/numberFormat.js");




var renderHeader = function renderHeader() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
    style: {
      height: 32
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 40
  }, "#"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 100
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].playerName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 50
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].currency), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 100
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].refNo), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 100
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].transTime), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 80
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].product), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 150
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].betType), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 80,
    sortBy: 'turnover'
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].turnover), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 80,
    sortBy: 'winLoss'
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].winloss), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
    colWidth: 50
  }, _constants__WEBPACK_IMPORTED_MODULE_2__["headerText"].status));
};
var renderDataSection = function renderDataSection(dataList, isTotalRow) {
  if (isTotalRow) {
    return buildTotalRow(dataList[0]);
  }

  var dataRows = [];

  for (var i = 0; i < dataList.length; i++) {
    dataRows.push(buildDataRow(dataList[i]));
  }

  return dataRows;
};

var buildDataRow = function buildDataRow(dataItem) {
  var index = dataItem.index,
      playerName = dataItem.playerName,
      currencyName = dataItem.currencyName,
      refNo = dataItem.refNo,
      transTimeString = dataItem.transTimeString,
      productName = dataItem.productName,
      betType = dataItem.betType,
      turnover = dataItem.turnover,
      winLoss = dataItem.winLoss,
      status = dataItem.status;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    key: index
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, index), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, playerName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, currencyName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, refNo), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, transTimeString), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, productName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, betType), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(turnover)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(winLoss)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, status));
};

var buildTotalRow = function buildTotalRow(dataItem) {
  var turnover = dataItem.turnover,
      winLoss = dataItem.winLoss;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    key: "totalRowUSD"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align",
    colSpan: "7"
  }, "Total In USD"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(turnover)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "right-align"
  }, _jsroot_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(winLoss)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], null));
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/lib/utils.js":
/*!***************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/lib/utils.js ***!
  \***************************************************************/
/*! exports provided: getFormattedDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormattedDate", function() { return getFormattedDate; });
var getFormattedDate = function getFormattedDate(dateString) {
  var dateParts = dateString.split('/');
  return "".concat(dateParts[1], "/").concat(dateParts[0], "/").concat(dateParts[2]);
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/dailybets/reducers/index.js":
/*!********************************************************************!*\
  !*** ./www/js/source/reactpages/pages/dailybets/reducers/index.js ***!
  \********************************************************************/
/*! exports provided: dateConstraint, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateConstraint", function() { return dateConstraint; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/reducers/requestParamReducer */ "./www/js/source/reactpages/reducers/requestParamReducer.js");
/* harmony import */ var _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/reducers/reportTitleReducer */ "./www/js/source/reactpages/reducers/reportTitleReducer.js");
/* harmony import */ var _jsroot_reducers_pagingOptionReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/reducers/pagingOptionReducer */ "./www/js/source/reactpages/reducers/pagingOptionReducer.js");
/* harmony import */ var _jsroot_reducers_gridDataReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/reducers/gridDataReducer */ "./www/js/source/reactpages/reducers/gridDataReducer.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");







var dateConstraint = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, {});
/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_1__, _jsroot_reducers_requestParamReducer__WEBPACK_IMPORTED_MODULE_2__, _jsroot_reducers_reportTitleReducer__WEBPACK_IMPORTED_MODULE_3__, _jsroot_reducers_pagingOptionReducer__WEBPACK_IMPORTED_MODULE_4__, _jsroot_reducers_gridDataReducer__WEBPACK_IMPORTED_MODULE_5__, {
  dateConstraint: dateConstraint
})));

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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var gridData = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _defineProperty({}, _actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_GRID_DATA"], function (state, action) {
  return action.data;
}));

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

/***/ "./www/js/source/reactpages/reducers/pagingOptionReducer.js":
/*!******************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/pagingOptionReducer.js ***!
  \******************************************************************/
/*! exports provided: pagingOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagingOption", function() { return pagingOption; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var defaultPagingOption = {
  PageIndex: 1,
  PageSize: 50,
  TotalItem: 0,
  PageList: [50, 100, 200, 500]
};
var pagingOption = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(defaultPagingOption, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_PAGING_OPTION"], function (prevState, action) {
  return _objectSpread({}, prevState, action.data);
}));

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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var reportTitle = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_REPORT_TITLE"], function (state, action) {
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
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var requestParam = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defineProperty({}, _actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_REQUEST_PARAM"], function (state, action) {
  return _objectSpread({}, action.data);
}));

/***/ })

/******/ });
//# sourceMappingURL=dailybets.chunk.js.map