(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["customer/playersegmentation/vipPlayerManagement"],{

/***/ "./node_modules/@9softstudio/react-grid/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@9softstudio/react-grid/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ "./node_modules/react/index.js")):undefined}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=4)}([function(t,n){t.exports=e},function(e,t,n){e.exports=n(7)()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SCROLLBAR_WIDTH=19,t.GUTTER=15,t.DEFAULT_MILLISECOND_FOR_WAITING=500,t.DEFAULT_COLUMN_WIDTH=100},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),a=u(o),i=u(n(1));function u(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onKeyUpHandle=function(e,t){if(13===(e.keyCode?e.keyCode:e.which)){var r=parseInt(n.state.inputValue);r>0&&r<=t&&n.goToPage(r,n.props.pageOption.PageSize)}},n.onInputChangeHandler=function(e){var t=e.target.value;/^\d*$/.test(t)&&n._updateState(t)},n.state={inputValue:n.props.pageOption.PageIndex},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"componentDidUpdate",value:function(e,t){var n=this.props.pageOption.PageIndex;n!==e.pageOption.PageIndex&&this._updateState(n)}},{key:"goToPage",value:function(e,t){this.props.onPaging&&this.props.onPaging(e,t)}},{key:"onClickHandle",value:function(e,t){e||t()}},{key:"_updateState",value:function(e){this.setState({inputValue:e})}},{key:"_renderPageSizeSelection",value:function(e,t,n){var r=this;return a.default.createElement("select",{className:"pagesize-select",disabled:e,value:n,onChange:function(e){return r.goToPage(1,Number(e.target.value))}},this._renderPageSizeOption(this.props.pageOption.PageList))}},{key:"_renderPageSizeOption",value:function(e){return e.map(function(e,t){return a.default.createElement("option",{key:"pagesize"+t,value:e},e)})}},{key:"_renderPageIcon",value:function(e,t,n){var r=this;return a.default.createElement("a",{href:"javascript:;",className:"icon "+e+" "+(t?"disable":""),onClick:function(){return r.onClickHandle(t,n)}})}},{key:"_renderPageInput",value:function(e,t){var n=this;return a.default.createElement("div",{className:"page-input"},a.default.createElement("span",null,"Page "),a.default.createElement("input",{type:"text",className:"page-form",value:e,maxLength:"4",size:"2",onChange:this.onInputChangeHandler,onKeyUp:function(e){return n.onKeyUpHandle(e,t)}}),a.default.createElement("span",null," of "+t," "))}},{key:"_renderPageLabel",value:function(e,t){return a.default.createElement("div",{className:"page-input"},a.default.createElement("span",null,"Page ",e+" of "+t+" "))}},{key:"_renderPageInfo",value:function(e,t,n){var r=(e-1)*t+1,o=e*t;return a.default.createElement("span",{className:"page-info"},"View "+r+"-"+(o>n?n:o)+" of "+n)}},{key:"render",value:function(){var e=this,t=this.props,n=t.isShowPagingInfo,r=t.isAllowInputPageIndex,o=t.pageOption,i=o.PageIndex,u=o.PageSize,l=o.TotalItem,s=o.PageList,c=this.state.inputValue,f=isNaN(parseInt(c)),d=l>s[0],p=Math.ceil(l/u);return a.default.createElement("div",{className:"page-container center-align",style:{display:d?"block":"none"}},this._renderPageIcon("page-first",1===i,function(){return e.goToPage(1,u)}),this._renderPageIcon("page-prev",f||i<=1||i>p,function(){return e.goToPage(i-1,u)}),r?this._renderPageInput(c,p):this._renderPageLabel(i,p),this._renderPageIcon("page-next",f||i>=p||i<1,function(){return e.goToPage(i+1,u)}),this._renderPageIcon("page-last",i===p,function(){return e.goToPage(p,u)}),this._renderPageSizeSelection(f,i,u),n&&this._renderPageInfo(i,u,l))}}]),t}();l.propTypes={pageOption:i.default.shape({PageIndex:i.default.number,PageSize:i.default.number,PageList:i.default.arrayOf(i.default.number),TotalItem:i.default.number}),onPaging:i.default.func,isShowPagingInfo:i.default.bool,isAllowInputPageIndex:i.default.bool},l.defaultProps={pageOption:{PageIndex:1,PageSize:50,PageList:[50,100,200],TotalItem:0},isShowPagingInfo:!0,isAllowInputPageIndex:!0},t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Pager=t.Cell=t.HeaderCell=t.Row=t.HeaderRow=t.Table=void 0;var r=s(n(5)),o=s(n(10)),a=s(n(11)),i=s(n(12)),u=s(n(13)),l=s(n(3));function s(e){return e&&e.__esModule?e:{default:e}}t.Table=r.default,t.HeaderRow=o.default,t.Row=a.default,t.HeaderCell=i.default,t.Cell=u.default,t.Pager=l.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),i=d(a),u=d(n(6)),l=d(n(1)),s=d(n(9)),c=n(2),f=d(n(3));function d(e){return e&&e.__esModule?e:{default:e}}var p=document.body.clientWidth;var h=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));y.call(n),n.bodyWrapper=null,n.footerWrapper=null;n.Header=(0,s.default)({className:"header-content",isHeader:!0});var r={className:"body-content",getRef:function(e){return n.bodyWrapper=e}};n.Body=(0,s.default)(r);var o={className:"footer-content",getRef:function(e){return n.footerWrapper=e}};n.Footer=(0,s.default)(o);var a=n.props,i=a.maxWidth,u=a.bodyHeight,l=a.adjustedHeight,f=i||p;return n.diffWidth=p-f,n.adjustedHeight=l,n.debounceResizing=function(e,t){var n=void 0;return function(){var r=this,o=arguments;clearTimeout(n),n=setTimeout(function(){e.apply(r,o)},t||c.DEFAULT_MILLISECOND_FOR_WAITING)}}(n._handleResize),n.state={maxWidth:f,contentHeight:u,columnsWidth:n._getColumnsWidth(e.header)},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),o(t,[{key:"_getColumnsWidth",value:function(e){var t=this,n=Array.isArray(e);if(n&&0===e.length)return null;var r=[],o={};return function n(a,i){for(var u=0;u<a.length;u++){var l=a[u];if(l){var s=l.props,f=Number(s.colSpan);if(f&&f>1){var d=i+1;void 0===o[d]&&(o[d]=0);var p=o[d],h=p+f-1,y=e[d].props.children,b=t._getNextColspanCells(y,p,h);o[d]+=b.length,n(b,d)}else{var g=s.colWidth?s.colWidth:c.DEFAULT_COLUMN_WIDTH;r.push(g)}}}}(n?e[0].props.children:e.props.children,0),r}},{key:"_getNextColspanCells",value:function(e,t,n){for(var r=[],o=t;o<=n;o++){var a=e[o],i=o<e.length;a||!i?(a.props.colSpan&&(n-=1),r.push(a)):n+=1}return r}},{key:"componentDidMount",value:function(){this._handleResize(),window.addEventListener("resize",this.debounceResizing)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.debounceResizing)}},{key:"componentDidUpdate",value:function(e,t){this.props.header!=e.header&&this.setState({columnsWidth:this._getColumnsWidth(this.props.header)}),this.props.shouldResetScrollPosition&&e.body!=this.props.body&&function(e,t){var n=-e.scrollTop/(t/15);requestAnimationFrame(function(){var t=null;t=setInterval(function(){0!=e.scrollTop?e.scrollTop+=n:clearInterval(t)},15)})}(this.bodyWrapper,200)}},{key:"_calculateBodyHeight",value:function(){var e=window.innerHeight,t=this.footerWrapper?this.footerWrapper.offsetHeight:0;return e-(this.bodyWrapper.offsetTop+t+70)-this.adjustedHeight}},{key:"_getUpdatedColumnLayout",value:function(){var e=this,t=this.props,n=t.width,r=t.autoWidth,o=t.containerPadding,a=r?this.state.maxWidth:n;return a=a-o-c.SCROLLBAR_WIDTH,this.columnWidthSum&&this.state.columnsWidth.map(function(t){return a/e.columnWidthSum*t})}},{key:"render",value:function(){var e=this.props,t=e.width,n=e.autoWidth,o=e.minWidth,a=e.header,l=e.body,s=e.footer,c=e.isPaging,d=e.pageOption,p=e.onPaging,h=e.containerPadding,y=this.state.maxWidth-h,b=t-h,g=this.columnWidthSum&&this.columnWidthSum!==b?this._getUpdatedColumnLayout():this.state.columnsWidth;if(!g)return null;var m={width:b,autoWidth:n,minWidth:o,maxWidth:y},v={onSort:this.props.onSort,width:b,autoWidth:n,minWidth:o,maxWidth:y},_=i.default.createElement(u.default,{columnLayout:g}),O=this.Header,P=this.Body,w=this.Footer;return i.default.createElement("div",null,i.default.createElement("div",{className:"table-container",style:{maxWidth:y}},i.default.createElement(O,v,_,a),l&&i.default.createElement(P,r({},m,{maxHeight:this.state.contentHeight}),_,l),s&&i.default.createElement(w,m,_,s)),c&&d&&i.default.createElement(f.default,{pageOption:d,onPaging:p}))}},{key:"columnWidthSum",get:function(){var e=this.state.columnsWidth;return e&&e.length&&!e.find(function(e){return"number"!=typeof e})?e.reduce(function(e,t){return e+t},0):null}}]),t}();h.propTypes={onSort:l.default.func,width:l.default.oneOfType([l.default.number,l.default.string]),maxWidth:l.default.number,minWidth:l.default.number,autoWidth:l.default.bool,bodyHeight:l.default.number,autoHeight:l.default.bool,header:l.default.oneOfType([l.default.object,l.default.arrayOf(l.default.object)]).isRequired,body:l.default.arrayOf(l.default.object),footer:l.default.arrayOf(l.default.object),isPaging:l.default.bool,onPaging:l.default.func,pageOption:l.default.object,adjustedHeight:l.default.number,containerPadding:l.default.number,shouldResetScrollPosition:l.default.bool},h.defaultProps={onSort:null,width:p,maxWidth:p,autoWidth:!0,isPaging:!1,adjustedHeight:0,bodyHeight:0,autoHeight:!0,containerPadding:30,shouldResetScrollPosition:!0};var y=function(){var e=this;this._handleResize=function(t){if(t&&t.preventDefault(),e.bodyWrapper&&e.props.autoHeight){var n=e._calculateBodyHeight();e.state.contentHeight!==n&&e.setState({contentHeight:n})}var r=document.body.clientWidth-e.diffWidth;e.state.maxWidth!==r&&e.setState({maxWidth:r})}};t.default=h},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),a=u(o),i=u(n(1));function u(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"_getRowLayout",value:function(){return this.props.columnLayout.map(function(e,t){var n=isNaN(e)?e:e+"px";return a.default.createElement("td",{key:"cellLayout"+t,style:{width:n}})})}},{key:"render",value:function(){return a.default.createElement("tr",{className:"first-row"},this._getRowLayout())}}]),t}();l.propTypes={columnLayout:i.default.arrayOf(i.default.oneOfType([i.default.number,i.default.string])).isRequired},t.default=l},function(e,t,n){"use strict";var r=n(8);function o(){}e.exports=function(){function e(e,t,n,o,a,i){if(i!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),i=s(a),u=s(n(1)),l=n(2);function s(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}t.default=function(e,t){var n,s;return s=n=function(n){function u(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(u.__proto__||Object.getPrototypeOf(u)).call(this,e));return t.onSort=function(e,n){var r=t.props.onSort;t.setState({sortBy:e,sortOrder:n},function(){r&&r(e,n)})},t.state={sortBy:null,sortOrder:null},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(u,a.Component),o(u,[{key:"_renderHeaderChildren",value:function(){var e=this,t=this.props.children,n=this.state,r=n.sortBy,o=n.sortOrder;return i.default.Children.map(t,function(t){return i.default.cloneElement(t,{onSort:e.onSort,sortBy:r,sortOrder:o})})}},{key:"render",value:function(){var n=this.props,o=(n.onSort,n.tableClass),a=(n.width,n.autoWidth,n.maxWidth,n.minWidth,n.maxHeight,c(n,["onSort","tableClass","width","autoWidth","maxWidth","minWidth","maxHeight"])),u=e.isHeader,l=e.getRef,s=c(e,["isHeader","getRef"]);return i.default.createElement("div",r({},a,{style:this.containerStyle,ref:l},s),i.default.createElement("div",{className:"table-wrapper"},i.default.createElement("table",r({style:this.tableStyle,className:o},t),u?i.default.createElement("thead",null,this._renderHeaderChildren()):i.default.createElement("tbody",null,this.props.children))))}},{key:"containerWidth",get:function(){var e=this.props,t=e.autoWidth,n=e.maxWidth,r=e.width;return t?n:r}},{key:"containerStyle",get:function(){var e=this.props,t=e.minWidth,n=e.maxHeight;return r({},this.props.style,{width:this.containerWidth,minWidth:t,maxHeight:n})}},{key:"tableStyle",get:function(){var e=this.props.minWidth;return{width:(e?Math.max(this.containerWidth,e):this.containerWidth)-l.SCROLLBAR_WIDTH}}}]),u}(),n.propTypes={onSort:u.default.func,tableClass:u.default.string,width:u.default.oneOfType([u.default.number,u.default.string]).isRequired,maxWidth:u.default.number.isRequired,minWidth:u.default.number,autoWidth:u.default.bool,maxHeight:u.default.number},n.defaultProps={onSort:null,tableClass:"table",autoWidth:!0},s}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),a=u(o),i=u(n(1));function u(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"_renderChildren",value:function(){var e=this.props,t=e.onSort,n=e.children,r=e.sortBy,o=e.sortOrder;return a.default.Children.map(n,function(e){return e&&a.default.cloneElement(e,{onSort:t,sortOrder:r===e.props.sortBy?o:null})})}},{key:"render",value:function(){var e=this.props,t=(e.onSort,e.sortBy,e.sortOrder,function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["onSort","sortBy","sortOrder"]));return a.default.createElement("tr",t,this._renderChildren())}}]),t}();l.propTypes={onSort:i.default.func},l.defaultProps={onSort:null},t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));t.default=function(e){return r.default.createElement("tr",e,e.children)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),i=l(a),u=l(n(1));function l(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onClick=function(){if(n.props.sortBy){var e=n.props.onSort,t=n.props.sortOrder,r=t&&"desc"!==t?"desc":"asc";e&&e(n.props.sortBy,r)}},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),o(t,[{key:"render",value:function(){var e=this.props,t=(e.colWidth,e.sortBy),n=e.sortOrder,o=(e.onSort,e.children),a=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["colWidth","sortBy","sortOrder","onSort","children"]),u=null;if(t){var l=i.default.createElement("div",{style:{display:"block",color:"asc"===n?"#111":"#777"},className:"asc"}),s=i.default.createElement("div",{style:{display:"block",marginTop:"2px",color:"desc"===n?"#111":"#777"},className:"desc"});u=i.default.createElement("th",r({},a,{className:"sortable sorting",style:{position:"relative",backgroundClip:"padding-box"},onClick:this.onClick}),i.default.createElement("div",{style:{width:"90%"}},o),i.default.createElement("span",{style:{float:"right",position:"absolute",top:"40%",right:"2px"}},l,s))}return u||i.default.createElement("th",a,o)}}]),t}();s.propTypes={sortOrder:u.default.string,sortBy:u.default.string,onSort:u.default.func},s.defaultProps={sortOrder:null,sortBy:null,onSort:null},t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));t.default=function(e){return r.default.createElement("td",e,e.children)}}])});

/***/ }),

/***/ "./node_modules/@legion-lib/react-multiselect/dist/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@legion-lib/react-multiselect/dist/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ "./node_modules/react/index.js")):undefined}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(t,n){t.exports=e},function(e,t,n){e.exports=n(11)()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="_language_en_US",a="en-US",o={"en-US":{All:"All",SelectedItemCount:"# selected",SelectOptions:"Select options",SearchData:"Search data"},"zh-TW":{All:"全部",SelectedItemCount:"已選  # 個項目",SelectOptions:"選擇一個選項",SearchData:"搜寻数据"},"zh-CN":{All:"全部",SelectedItemCount:"已选  # 个项目",SelectOptions:"选择一个选项",SearchData:"搜寻数据"},"zh-Hans":{All:"全部",SelectedItemCount:"已选  # 个项目",SelectOptions:"选择一个选项",SearchData:"搜寻数据"}};t.GetTextResources=function(e,t){var n=e||"en-US",i="_language_"+n.replace("-","_"),l=window[i];return l&&l[t]||window[r]&&window[r][t]||o[n]&&o[n][t]||o[a]&&o[a][t]||t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),o=u(a),i=u(n(1)),l=n(2);function u(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),r(t,[{key:"render",value:function(){return o.default.createElement("button",{type:"button",className:"multiple-select-default multiple-select-label",onClick:this.props.onToggle},o.default.createElement("span",{className:"text-display",title:this.selectedItemsString},this.selectedItemsString),o.default.createElement("b",{className:"caret"}))}},{key:"selectedItemsString",get:function(){var e=this.props,t=e.selectedItems,n=e.maxDisplayItemCount,r=t.map(function(e){return e.value}),a=this.props.texts,o=a&&a.SelectOptions||(0,l.GetTextResources)(this.props.language,"SelectOptions"),i=r.length;return this.props.isAllTextShown&&i==this.props.dataSourceSize?o=a&&a.All||(0,l.GetTextResources)(this.props.language,"All"):i>=n?o=(a&&a.SelectedItemCount||(0,l.GetTextResources)(this.props.language,"SelectedItemCount")).replace("#",i):i>=1&&(o=r.join(", ")),o}}]),t}();c.propTypes={language:i.default.string,selectedItems:i.default.arrayOf(i.default.object).isRequired,maxDisplayItemCount:i.default.number,texts:i.default.object},c.defaultProps={language:"en-US",maxDisplayItemCount:3},t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=c(o),l=c(n(1)),u=c(n(5));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onCollapse=function(e,t){var a=n.props,o=a.dataSource,i=a.onCollapse,l=[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(o));!function e(n){for(var a=function(a){var o=n[a],i=l.findIndex(function(e){return e.key===o.key});l[i]=r({},l[i],{visible:!t});var u=l.filter(function(e){return e.parentKey===o.key});u.length>0&&e(u)},o=0;o<n.length;o++)a(o)}(o.filter(function(t){return t.parentKey===e.key})),i&&i(l)},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"_renderOptionList",value:function(){var e=this,t=this.props,n=t.dataSource,r=t.onChange,a=t.id,o=t.treeViewOption;return n&&n.length?n.map(function(t,l){var c=n.filter(function(e){return e.parentKey===t.key}).length>0;return t.visible&&i.default.createElement(u.default,{id:a+"-optionItem-"+l,key:a+"optionItem"+l,itemData:t,onChange:r,hasChildren:c,treeViewOption:o,onCollapse:e.onCollapse})}):i.default.createElement("span",null,"No information")}},{key:"render",value:function(){return i.default.createElement("ul",{className:"multiple-select-options"},this._renderOptionList())}}]),t}();s.propTypes={dataSource:l.default.arrayOf(l.default.object).isRequired,id:l.default.oneOfType([l.default.number,l.default.string]).isRequired,onChange:l.default.func,treeViewOption:l.default.shape({childrenField:l.default.string,keyField:l.default.string,valueField:l.default.string,statusField:l.default.string,indent:l.default.number,includeSelectedParentKey:l.default.bool})},t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=u(o),l=u(n(1));function u(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onCollapse=function(e){e.preventDefault(),n.setState(function(e){return{isCollapse:!e.isCollapse}},function(){var e=n.props,t=e.itemData,r=e.onCollapse;r&&r(t,n.state.isCollapse)})},n.onChange=function(e){e.stopPropagation();var t=n.props,a=t.itemData,o=t.onChange,i=r({},a,{checked:!a.checked});o&&o(i)},n.state={isCollapse:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"render",value:function(){var e=this.props,t=e.itemData,n=e.id,r=e.treeViewOption,a=e.hasChildren,o=t.value,l=t.checked,u=t.level,c=t.valueDecoration,s="multiple-select-item "+(r?"treeview-select-item":"")+" level-"+u,f=r?{paddingLeft:u*r.indent}:null,d=this.state.isCollapse?"treeview-caret collapse":"treeview-caret",p="option-label"+(c?" "+c:"");return i.default.createElement("li",{className:s,style:f},!!r&&a&&i.default.createElement("button",{className:"btnCaretOption",onClick:this.onCollapse},i.default.createElement("b",{className:d})),i.default.createElement("input",{id:n,type:"checkbox",className:"option-checkbox",checked:l,onChange:this.onChange}),i.default.createElement("label",{className:p,htmlFor:n},o))}}]),t}();c.propTypes={itemData:l.default.object.isRequired,id:l.default.oneOfType([l.default.number,l.default.string]).isRequired,onChange:l.default.func,treeViewOption:l.default.shape({childrenField:l.default.string,keyField:l.default.string,valueField:l.default.string,statusField:l.default.string,indent:l.default.number,includeSelectedParentKey:l.default.bool})},t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),o=c(a),i=c(n(1)),l=c(n(5)),u=n(2);function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.changeHandler=function(e){var t=e.checked;n.props.onChange&&n.props.onChange(t)},n.itemData={key:"All",value:(0,u.GetTextResources)(n.props.language,"All")},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),r(t,[{key:"render",value:function(){var e=this.props,t=e.id,n=e.checked;return this.itemData.checked=n,o.default.createElement("ul",{className:"multiple-select-options multiple-select-option-all"},o.default.createElement(l.default,{id:t+"-optionItemAll",itemData:this.itemData,onChange:this.changeHandler}))}}]),t}();s.propTypes={language:i.default.string,onChange:i.default.func,id:i.default.oneOfType([i.default.number,i.default.string]).isRequired,checked:i.default.bool},s.defaultProps={language:"en-US",checked:!1},t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(e){return e&&e.__esModule?e:{default:e}}(n(0)),o=n(2);var i=a.default.forwardRef(function(e,t){var n=e.onClearSearch,i=e.onChangeSearchText,l=e.language,u=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["onClearSearch","onChangeSearchText","language"]),c=(0,o.GetTextResources)(l,"SearchData");return a.default.createElement("div",{style:{width:"100%",position:"relative"}},a.default.createElement("input",r({autoFocus:!0,ref:t,type:"text",placeholder:c,style:{width:"100%",border:"1px solid #ccc",padding:"5px 10px",boxSizing:"border-box"},onChange:function(e){return i(e.target.value)}},u)),a.default.createElement("button",{type:"button",onClick:n,style:{position:"absolute",display:"inline-block",right:2,border:0,padding:0,margin:"5px",backgroundColor:"transparent",cursor:"pointer",outline:"none",height:16,width:16}},a.default.createElement("span",{className:"close"})))});t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.KEY_NAME="key",a=t.VALUE_NAME="value",o=t.STATUS_NAME="checked",i=t.SUBLIST_NAME="subList";t.defaultTreeViewOption={childrenField:i,keyField:r,valueField:a,statusField:o,indent:30,includeSelectedParentKey:!0,useOriginalDataSource:!1}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TreeViewSelect=void 0;var r=o(n(10)),a=o(n(13));function o(e){return e&&e.__esModule?e:{default:e}}t.default=r.default,t.TreeViewSelect=a.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=d(o),l=d(n(1)),u=d(n(3)),c=d(n(4)),s=d(n(6)),f=d(n(7));function d(e){return e&&e.__esModule?e:{default:e}}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h="key",y="value",g="checked",v=1;var b=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChangeHandler=function(e){var t,a=n.props,o=a.keyField,i=a.valueField,l=a.statusField,u=(p(t={},o,e.key),p(t,i,e.value),p(t,l,e.checked),t),c=n.state.dataSource.map(function(t){return t.key===e.key?r({},t,{checked:e.checked}):t});n.setState({dataSource:c},function(){return n._callBackToParent(u)})},n.onToggle=function(){n.setState(function(e){return{showOptionList:!e.showOptionList}},function(){n.searchInputBox.current&&n.state.showOptionList&&n.searchInputBox.current.focus()})},n.checkAllHandler=function(e){var t=n.state.dataSource.map(function(t){return t.checked!==e?r({},t,{checked:e}):t});n.setState({dataSource:t},function(){n._callBackToParent(null)})},n.onChangeSearchText=function(e){var t=n.state.dataSource.map(function(t){var n=t[y]&&t[y].toLowerCase(),a=e&&e.toLowerCase(),o=-1!==n.indexOf(a);return t.visible!==o?r({},t,{visible:o}):t});n.setState({searchText:e,dataSource:t})},n.onClearSearch=function(){n.onChangeSearchText("")},n._close=function(){n.setState({showOptionList:!1})},n._handleDocumentClick=function(e){n.wrapper&&!n.wrapper.contains(e.target)&&n.state.showOptionList&&n._close()},n.searchInputBox=i.default.createRef(),n.id="multiple-select-"+(e.id||v++),n.state={originalDataSource:null,searchText:"",showOptionList:!1,dataSource:[]},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"componentDidMount",value:function(){document.addEventListener("click",this._handleDocumentClick)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this._handleDocumentClick)}},{key:"_callBackToParent",value:function(e){var t=this._getSelectedItemKey();this.props.onChange&&this.props.onChange(e,t)}},{key:"_getSelectedItemKey",value:function(){for(var e=[],t=this.state.dataSource,n=0;n<t.length;n++){var r=t[n];r.checked&&e.push(r.key)}return e.join(",")}},{key:"_renderOptionAll",value:function(){if(this.props.hasAllOption){var e=this.state.dataSource.filter(function(e){return e.checked}).length===this.state.dataSource.length;return i.default.createElement(s.default,{id:this.id,checked:e,language:this.props.language,onChange:this.checkAllHandler})}return null}},{key:"_renderSearchBox",value:function(){return this.props.hasSearchBox?i.default.createElement(f.default,{language:this.props.language,onChangeSearchText:this.onChangeSearchText,value:this.state.searchText,onClearSearch:this.onClearSearch,ref:this.searchInputBox}):null}},{key:"render",value:function(){var e=this,t=this.props.maxDisplayItemCount,n="multiple-select-container"+(this.props.isValid?"":" invalid");return i.default.createElement("div",{className:n,id:this.id,ref:function(t){return e.wrapper=t}},i.default.createElement(u.default,{language:this.props.language,selectedItems:this.selectedItems,dataSourceSize:this.state.dataSource.length,onToggle:this.onToggle,texts:this.props.texts,isAllTextShown:this.props.isAllTextShown,maxDisplayItemCount:t,isValid:this.props.isValid}),i.default.createElement("div",{className:"multiple-select-default multiple-select-options-container",style:{display:this.state.showOptionList?"block":"none"}},this._renderSearchBox(),this._renderOptionAll(),i.default.createElement(c.default,{id:this.id,dataSource:this.state.dataSource,onChange:this.onChangeHandler})))}},{key:"selectedItems",get:function(){return this.state.dataSource.filter(function(e){return e.checked})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.dataSource!==t.originalDataSource?{originalDataSource:e.dataSource,dataSource:function(e){var t=e.keyField,n=e.valueField,r=e.statusField;return e.dataSource.map(function(e){var a;return p(a={},h,e[t]),p(a,y,e[n]),p(a,g,e[r]),p(a,"valueDecoration",e.valueDecoration),p(a,"visible",!0),a})}(e)}:null}}]),t}();b.propTypes={language:l.default.string,dataSource:l.default.arrayOf(l.default.object).isRequired,keyField:l.default.string,valueField:l.default.string,statusField:l.default.string,maxDisplayItemCount:l.default.number,onChange:l.default.func,hasAllOption:l.default.bool,hasSearchBox:l.default.bool,isAllTextShown:l.default.bool,texts:l.default.object,isValid:l.default.bool},b.defaultProps={language:"en-US",keyField:h,valueField:y,statusField:g,hasAllOption:!0,hasSearchBox:!1,isValid:!0},t.default=b},function(e,t,n){"use strict";var r=n(12);function a(){}e.exports=function(){function e(e,t,n,a,o,i){if(i!==r){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=a,n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=h(o),l=h(n(1)),u=h(n(3)),c=h(n(4)),s=h(n(6)),f=h(n(7)),d=n(8),p=n(14);function h(e){return e&&e.__esModule?e:{default:e}}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=1,v=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));b.call(n),n.searchInputBox=i.default.createRef(),n.id="multiple-select-"+(e.id||g++);var r=n._isUseOriginalDataSource()?n.props.dataSource:(0,p.convertDataSourceToState)(n.props);return n.state={originalDataSource:n.props.dataSource,searchText:"",showOptionList:!1,dataSource:r},n.indexByKey=n._createIndexByKey(r),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"componentDidMount",value:function(){document.addEventListener("click",this._handleDocumentClick)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this._handleDocumentClick)}},{key:"componentDidUpdate",value:function(e,t){if(this.props.dataSource!==e.dataSource){var n=this.props.dataSource,r={originalDataSource:n,dataSource:this._isUseOriginalDataSource()?n:(0,p.convertDataSourceToState)(this.props)};this.setState(r),this.indexByKey=this._createIndexByKey(r.dataSource)}}},{key:"_createIndexByKey",value:function(e){return e.reduce(function(e,t,n){return e[t.key]=n,e},{})}},{key:"_isUseOriginalDataSource",value:function(){var e=this.props.treeViewOption;return!(!e||!e.useOriginalDataSource)}},{key:"_callBackToParent",value:function(e){var t=this._getSelectedItemKey();this.props.onChange&&this.props.onChange(e,t,this.state.dataSource)}},{key:"_getSelectedItemKey",value:function(){for(var e=this.props.treeViewOption,t=(e&&r({},d.defaultTreeViewOption,e)||d.defaultTreeViewOption).includeSelectedParentKey,n=[],a=this.state.dataSource,o=function(e){var r=a[e],o=a.filter(function(e){return e.parentKey===r.key}).length>0;!r.checked||!t&&o||n.push(r.key)},i=0;i<a.length;i++)o(i);return n.join(",")}},{key:"_renderOptionAll",value:function(){if(this.props.hasAllOption){var e=this.state.dataSource.filter(function(e){return e.checked}).length===this.state.dataSource.length;return i.default.createElement(s.default,{id:this.id,checked:e,language:this.props.language,onChange:this.checkAllHandler})}return null}},{key:"_renderSearchBox",value:function(){return this.props.hasSearchBox?i.default.createElement(f.default,{language:this.props.language,onChangeSearchText:this.onChangeSearchText,value:this.state.searchText,onClearSearch:this.onClearSearch,ref:this.searchInputBox}):null}},{key:"render",value:function(){var e=this,t=this.props,n=t.maxDisplayItemCount,a=t.treeViewOption,o=a&&r({},d.defaultTreeViewOption,a)||r({},d.defaultTreeViewOption),l="multiple-select-container"+(this.props.isValid?"":" invalid");return i.default.createElement("div",{className:l,id:this.id,ref:function(t){return e.wrapper=t}},i.default.createElement(u.default,{language:this.props.language,selectedItems:this.selectedItems,dataSourceSize:this.state.dataSource.length,onToggle:this.onToggle,texts:this.props.texts,isAllTextShown:this.props.isAllTextShown,maxDisplayItemCount:n}),i.default.createElement("div",{className:"multiple-select-default multiple-select-options-container",style:{display:this.state.showOptionList?"block":"none"}},this._renderSearchBox(),this._renderOptionAll(),i.default.createElement(c.default,{id:this.id,dataSource:this.state.dataSource,onChange:this.onChangeHandler,treeViewOption:o,onCollapse:this.handleCollapse})))}},{key:"selectedItems",get:function(){var e=this._getSelectedItemKey().split(",");return this.state.dataSource.filter(function(t){return e.includes(t.key)})}}]),t}();v.propTypes={language:l.default.string,dataSource:l.default.arrayOf(l.default.object).isRequired,keyField:l.default.string,valueField:l.default.string,statusField:l.default.string,maxDisplayItemCount:l.default.number,onChange:l.default.func,hasAllOption:l.default.bool,hasSearchBox:l.default.bool,isAllTextShown:l.default.bool,texts:l.default.object,isValid:l.default.bool,treeViewOption:l.default.shape({childrenField:l.default.string,keyField:l.default.string,valueField:l.default.string,statusField:l.default.string,indent:l.default.number,includeSelectedParentKey:l.default.bool,useOriginalDataSource:l.default.bool})},v.defaultProps={language:"en-US",keyField:d.KEY_NAME,valueField:d.VALUE_NAME,statusField:d.STATUS_NAME,hasAllOption:!0,hasSearchBox:!1,isValid:!0};var b=function(){var e=this;this.onChangeHandler=function(t){var n,a=e.props,o=a.keyField,i=a.valueField,l=a.statusField,u=(y(n={},o,t.key),y(n,i,t.value),y(n,l,t.checked),n),c=e.state.dataSource,s=[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(c)),f=e.indexByKey[t.key];s[f]=r({},t);var d=!!t.parentKey,p=s.filter(function(e){return e.parentKey===t.key});if(p.length>0){!function n(a){for(var o=function(o){var i=a[o],l=e.indexByKey[i.key];s[l]=r({},s[l],{checked:t.checked});var u=s.filter(function(e){return e.parentKey===i.key});u.length>0&&n(u)},i=0;i<a.length;i++)o(i)}(p)}if(d){!function t(n){var a=e.indexByKey[n.parentKey],o=s[a];if(o.checked&&!n.checked)s[a]=r({},o,{checked:!1});else if(!o.checked&&n.checked){var i=s.filter(function(e){return e.parentKey===o.key});i.filter(function(e){return e.checked}).length===i.length&&(s[a]=r({},o,{checked:!0}))}var l=s[a];l.parentKey&&t(l)}(t)}e.setState({dataSource:s},function(){return e._callBackToParent(u)})},this.onToggle=function(){e.setState(function(e){return{showOptionList:!e.showOptionList}},function(){e.searchInputBox.current&&e.state.showOptionList&&e.searchInputBox.current.focus()})},this.checkAllHandler=function(t){var n=e.state.dataSource.map(function(e){return e.checked!==t?r({},e,{checked:t}):e});e.setState({dataSource:n},function(){e._callBackToParent(null)})},this.onChangeSearchText=function(t){var n=e.state.dataSource.map(function(e){var n=e[d.VALUE_NAME]&&e[d.VALUE_NAME].toLowerCase(),a=t&&t.toLowerCase(),o=-1!==n.indexOf(a);return e.visible!==o?r({},e,{visible:o}):e});e.setState({searchText:t,dataSource:n})},this.handleCollapse=function(t){e.setState({dataSource:t})},this.onClearSearch=function(){e.onChangeSearchText("")},this._close=function(){e.setState({showOptionList:!1})},this._handleDocumentClick=function(t){e.wrapper&&!e.wrapper.contains(t.target)&&e.state.showOptionList&&e._close()}};t.default=v},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.convertDataSourceToState=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(8);function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.convertDataSourceToState=function e(t){for(var n=t.keyField,l=t.valueField,u=t.statusField,c=t.dataSource,s=t.treeViewOption,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,p=s&&r({},a.defaultTreeViewOption,s)||r({},a.defaultTreeViewOption),h=[],y=0;y<c.length;y++){var g,v=c[y],b=(i(g={},a.KEY_NAME,v[n]),i(g,a.VALUE_NAME,v[l]),i(g,a.STATUS_NAME,!!v[u]),i(g,"visible",!0),i(g,"level",d),i(g,"parentKey",f),g);if(h.push(b),p&&v[p.childrenField]){var m=v[p.childrenField],S=d+1,O=e({keyField:p.keyField,valueField:p.valueField,statusField:p.statusField,dataSource:m,treeViewOption:p},b[a.KEY_NAME],S);h.push.apply(h,o(O))}}return h}}])});

/***/ }),

/***/ "./node_modules/attr-accept/dist/es/index.js":
/*!***************************************************!*\
  !*** ./node_modules/attr-accept/dist/es/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (file, acceptedFiles) {
  if (file && acceptedFiles) {
    var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
    var fileName = file.name || '';
    var mimeType = (file.type || '').toLowerCase();
    var baseMimeType = mimeType.replace(/\/.*$/, '');
    return acceptedFilesArray.some(function (type) {
      var validType = type.trim().toLowerCase();

      if (validType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(validType);
      } else if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }

      return mimeType === validType;
    });
  }

  return true;
};

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
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

/***/ "./node_modules/file-selector/dist/es5/file-selector.js":
/*!**************************************************************!*\
  !*** ./node_modules/file-selector/dist/es5/file-selector.js ***!
  \**************************************************************/
/*! exports provided: fromEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return fromEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file */ "./node_modules/file-selector/dist/es5/file.js");


var FILES_TO_IGNORE = [
    // Thumbnail cache files for macOS and Windows
    '.DS_Store',
    'Thumbs.db' // Windows
];
/**
 * Convert a DragEvent's DataTrasfer object to a list of File objects
 * NOTE: If some of the items are folders,
 * everything will be flattened and placed in the same list but the paths will be kept as a {path} property.
 * @param evt
 */
function fromEvent(evt) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            return [2 /*return*/, isDragEvt(evt) && evt.dataTransfer
                    ? getDataTransferFiles(evt.dataTransfer, evt.type)
                    : getInputFiles(evt)];
        });
    });
}
function isDragEvt(value) {
    return !!value.dataTransfer;
}
function getInputFiles(evt) {
    var files = isInput(evt.target)
        ? evt.target.files
            ? fromList(evt.target.files)
            : []
        : [];
    return files.map(function (file) { return Object(_file__WEBPACK_IMPORTED_MODULE_1__["toFileWithPath"])(file); });
}
function isInput(value) {
    return value !== null;
}
function getDataTransferFiles(dt, type) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        var items, files;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dt.items) return [3 /*break*/, 2];
                    items = fromList(dt.items)
                        .filter(function (item) { return item.kind === 'file'; });
                    // According to https://html.spec.whatwg.org/multipage/dnd.html#dndevents,
                    // only 'dragstart' and 'drop' has access to the data (source node)
                    if (type !== 'drop') {
                        return [2 /*return*/, items];
                    }
                    return [4 /*yield*/, Promise.all(items.map(toFilePromises))];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, noIgnoredFiles(flatten(files))];
                case 2: return [2 /*return*/, noIgnoredFiles(fromList(dt.files)
                        .map(function (file) { return Object(_file__WEBPACK_IMPORTED_MODULE_1__["toFileWithPath"])(file); }))];
            }
        });
    });
}
function noIgnoredFiles(files) {
    return files.filter(function (file) { return FILES_TO_IGNORE.indexOf(file.name) === -1; });
}
// IE11 does not support Array.from()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Browser_compatibility
// https://developer.mozilla.org/en-US/docs/Web/API/FileList
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList
function fromList(items) {
    var files = [];
    // tslint:disable: prefer-for-of
    for (var i = 0; i < items.length; i++) {
        var file = items[i];
        files.push(file);
    }
    return files;
}
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem
function toFilePromises(item) {
    if (typeof item.webkitGetAsEntry !== 'function') {
        return fromDataTransferItem(item);
    }
    var entry = item.webkitGetAsEntry();
    // Safari supports dropping an image node from a different window and can be retrieved using
    // the DataTransferItem.getAsFile() API
    // NOTE: FileSystemEntry.file() throws if trying to get the file
    if (entry && entry.isDirectory) {
        return fromDirEntry(entry);
    }
    return fromDataTransferItem(item);
}
function flatten(items) {
    return items.reduce(function (acc, files) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(acc, (Array.isArray(files) ? flatten(files) : [files])); }, []);
}
function fromDataTransferItem(item) {
    var file = item.getAsFile();
    if (!file) {
        return Promise.reject(item + " is not a File");
    }
    var fwp = Object(_file__WEBPACK_IMPORTED_MODULE_1__["toFileWithPath"])(file);
    return Promise.resolve(fwp);
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry
function fromEntry(entry) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            return [2 /*return*/, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];
        });
    });
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry
function fromDirEntry(entry) {
    var reader = entry.createReader();
    return new Promise(function (resolve, reject) {
        var entries = [];
        function readEntries() {
            var _this = this;
            // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry/createReader
            // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryReader/readEntries
            reader.readEntries(function (batch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
                var files, err_1, items;
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!batch.length) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, Promise.all(entries)];
                        case 2:
                            files = _a.sent();
                            resolve(files);
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            reject(err_1);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            items = Promise.all(batch.map(fromEntry));
                            entries.push(items);
                            // Continue reading
                            readEntries();
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); }, function (err) {
                reject(err);
            });
        }
        readEntries();
    });
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry
function fromFileEntry(entry) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    entry.file(function (file) {
                        var fwp = Object(_file__WEBPACK_IMPORTED_MODULE_1__["toFileWithPath"])(file, entry.fullPath);
                        resolve(fwp);
                    }, function (err) {
                        reject(err);
                    });
                })];
        });
    });
}
//# sourceMappingURL=file-selector.js.map

/***/ }),

/***/ "./node_modules/file-selector/dist/es5/file.js":
/*!*****************************************************!*\
  !*** ./node_modules/file-selector/dist/es5/file.js ***!
  \*****************************************************/
/*! exports provided: COMMON_MIME_TYPES, toFileWithPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMON_MIME_TYPES", function() { return COMMON_MIME_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toFileWithPath", function() { return toFileWithPath; });
var COMMON_MIME_TYPES = new Map([
    ['avi', 'video/avi'],
    ['gif', 'image/gif'],
    ['ico', 'image/x-icon'],
    ['jpeg', 'image/jpeg'],
    ['jpg', 'image/jpeg'],
    ['mkv', 'video/x-matroska'],
    ['mov', 'video/quicktime'],
    ['mp4', 'video/mp4'],
    ['pdf', 'application/pdf'],
    ['png', 'image/png'],
    ['zip', 'application/zip'],
    ['doc', 'application/msword'],
    ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
]);
function toFileWithPath(file, path) {
    var f = withMimeType(file);
    if (typeof f.path !== 'string') { // on electron, path is already set to the absolute path
        var webkitRelativePath = file.webkitRelativePath;
        Object.defineProperty(f, 'path', {
            value: typeof path === 'string'
                ? path
                // If <input webkitdirectory> is set,
                // the File will have a {webkitRelativePath} property
                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
                : typeof webkitRelativePath === 'string' && webkitRelativePath.length > 0
                    ? webkitRelativePath
                    : file.name,
            writable: false,
            configurable: false,
            enumerable: true
        });
    }
    return f;
}
function withMimeType(file) {
    var name = file.name;
    var hasExtension = name && name.lastIndexOf('.') !== -1;
    if (hasExtension && !file.type) {
        var ext = name.split('.')
            .pop().toLowerCase();
        var type = COMMON_MIME_TYPES.get(ext);
        if (type) {
            Object.defineProperty(file, 'type', {
                value: type,
                writable: false,
                configurable: false,
                enumerable: true
            });
        }
    }
    return file;
}
//# sourceMappingURL=file.js.map

/***/ }),

/***/ "./node_modules/file-selector/dist/es5/index.js":
/*!******************************************************!*\
  !*** ./node_modules/file-selector/dist/es5/index.js ***!
  \******************************************************/
/*! exports provided: fromEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-selector */ "./node_modules/file-selector/dist/es5/file-selector.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _file_selector__WEBPACK_IMPORTED_MODULE_0__["fromEvent"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/react-dropzone/dist/es/index.js":
/*!******************************************************!*\
  !*** ./node_modules/react-dropzone/dist/es/index.js ***!
  \******************************************************/
/*! exports provided: default, useDropzone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDropzone", function() { return useDropzone; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var file_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-selector */ "./node_modules/file-selector/dist/es5/index.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/index */ "./node_modules/react-dropzone/dist/es/utils/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint prefer-template: 0 */




/**
 * Convenience wrapper component for the `useDropzone` hook
 *
 * ```jsx
 * <Dropzone>
 *   {({getRootProps, getInputProps}) => (
 *     <div {...getRootProps()}>
 *       <input {...getInputProps()} />
 *       <p>Drag 'n' drop some files here, or click to select files</p>
 *     </div>
 *   )}
 * </Dropzone>
 * ```
 */

var Dropzone = Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function (_ref, ref) {
  var children = _ref.children,
      params = _objectWithoutProperties(_ref, ["children"]);

  var _useDropzone = useDropzone(params),
      open = _useDropzone.open,
      props = _objectWithoutProperties(_useDropzone, ["open"]);

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"])(ref, function () {
    return {
      open: open
    };
  }, [open]); // TODO: Figure out why react-styleguidist cannot create docs if we don't return a jsx element

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, children(_objectSpread({}, props, {
    open: open
  })));
});
Dropzone.displayName = 'Dropzone';
Dropzone.propTypes = {
  /**
   * Render function that exposes the dropzone state and prop getter fns
   *
   * @param {object} params
   * @param {Function} params.getRootProps Returns the props you should apply to the root drop container you render
   * @param {Function} params.getInputProps Returns the props you should apply to hidden file input you render
   * @param {Function} params.open Open the native file selection dialog
   * @param {boolean} params.isFocused Dropzone area is in focus
   * @param {boolean} params.isFileDialogActive File dialog is opened
   * @param {boolean} params.isDragActive Active drag is in progress
   * @param {boolean} params.isDragAccept Dragged files are accepted
   * @param {boolean} params.isDragReject Some dragged files are rejected
   * @param {File[]} params.draggedFiles Files in active drag
   * @param {File[]} params.acceptedFiles Accepted files
   * @param {File[]} params.rejectedFiles Rejected files
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Set accepted file types.
   * See https://github.com/okonet/attr-accept for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all.
   * See: https://github.com/react-dropzone/react-dropzone/issues/276
   */
  accept: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string)]),

  /**
   * Allow drag 'n' drop (or selection from the file dialog) of multiple files
   */
  multiple: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /**
   * If true, disables click to open the native file selection dialog
   */
  noClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /**
   * If true, disables SPACE/ENTER to open the native file selection dialog.
   * Note that it also stops tracking the focus state.
   */
  noKeyboard: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /**
   * If true, disables drag 'n' drop
   */
  noDrag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /**
   * If true, stops drag event propagation to parents
   */
  noDragEventsBubbling: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /**
   * Minimum file size (in bytes)
   */
  minSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,

  /**
   * Maximum file size (in bytes)
   */
  maxSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,

  /**
   * Enable/disable the dropzone
   */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /**
   * Use this to provide a custom file aggregator
   *
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  getFilesFromEvent: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Cb for when closing the file dialog with no selection
   */
  onFileDialogCancel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Cb for when the `dragenter` event occurs.
   *
   * @param {DragEvent} event
   */
  onDragEnter: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Cb for when the `dragleave` event occurs
   *
   * @param {DragEvent} event
   */
  onDragLeave: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Cb for when the `dragover` event occurs
   *
   * @param {DragEvent} event
   */
  onDragOver: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Cb for when the `drop` event occurs.
   * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
   *
   * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
   * `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
   * If `multiple` is set to false and additional files are droppped,
   * all files besides the first will be rejected.
   * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
   *
   * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
   * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
   *
   * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
   * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
   *
   * ```js
   * function onDrop(acceptedFiles) {
   *   const req = request.post('/upload')
   *   acceptedFiles.forEach(file => {
   *     req.attach(file.name, file)
   *   })
   *   req.end(callback)
   * }
   * ```
   *
   * @param {File[]} acceptedFiles
   * @param {File[]} rejectedFiles
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  onDrop: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are accepted, this callback is not invoked.
   *
   * @param {File[]} files
   * @param {(DragEvent|Event)} event
   */
  onDropAccepted: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are rejected, this callback is not invoked.
   *
   * @param {object[]} files
   * @param {(DragEvent|Event)} event
   */
  onDropRejected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (Dropzone);
/**
 * A function that is invoked for the `dragenter`,
 * `dragover` and `dragleave` events.
 * It is not invoked if the items are not files (such as link, text, etc.).
 *
 * @callback dragCb
 * @param {DragEvent} event
 */

/**
 * A function that is invoked for the `drop` or input change event.
 * It is not invoked if the items are not files (such as link, text, etc.).
 *
 * @callback dropCb
 * @param {File[]} acceptedFiles List of accepted files
 * @param {File[]} rejectedFiles List of rejected files
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is invoked for the `drop` or input change event.
 * It is not invoked if the items are files (such as link, text, etc.).
 *
 * @callback dropAcceptedCb
 * @param {File[]} files List of accepted files that meet the given criteria
 * (`accept`, `multiple`, `minSize`, `maxSize`)
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is invoked for the `drop` or input change event.
 *
 * @callback dropRejectedCb
 * @param {File[]} files List of rejected files that do not meet the given criteria
 * (`accept`, `multiple`, `minSize`, `maxSize`)
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is used aggregate files,
 * in a asynchronous fashion, from drag or input change events.
 *
 * @callback getFilesFromEvent
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 * @returns {(File[]|Promise<File[]>)}
 */

/**
 * An object with the current dropzone state and some helper functions.
 *
 * @typedef {object} DropzoneState
 * @property {Function} getRootProps Returns the props you should apply to the root drop container you render
 * @property {Function} getInputProps Returns the props you should apply to hidden file input you render
 * @property {Function} open Open the native file selection dialog
 * @property {boolean} isFocused Dropzone area is in focus
 * @property {boolean} isFileDialogActive File dialog is opened
 * @property {boolean} isDragActive Active drag is in progress
 * @property {boolean} isDragAccept Dragged files are accepted
 * @property {boolean} isDragReject Some dragged files are rejected
 * @property {File[]} draggedFiles Files in active drag
 * @property {File[]} acceptedFiles Accepted files
 * @property {File[]} rejectedFiles Rejected files
 */

var initialState = {
  isFocused: false,
  isFileDialogActive: false,
  isDragActive: false,
  isDragAccept: false,
  isDragReject: false,
  draggedFiles: [],
  acceptedFiles: [],
  rejectedFiles: []
};
/**
 * A React hook that creates a drag 'n' drop area.
 *
 * ```jsx
 * function MyDropzone(props) {
 *   const {getRootProps, getInputProps} = useDropzone({
 *     onDrop: acceptedFiles => {
 *       // do something with the File objects, e.g. upload to some server
 *     }
 *   });
 *   return (
 *     <div {...getRootProps()}>
 *       <input {...getInputProps()} />
 *       <p>Drag and drop some files here, or click to select files</p>
 *     </div>
 *   )
 * }
 * ```
 *
 * @function useDropzone
 *
 * @param {object} props
 * @param {string|string[]} [props.accept] Set accepted file types.
 * See https://github.com/okonet/attr-accept for more information.
 * Keep in mind that mime type determination is not reliable across platforms. CSV files,
 * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
 * Windows. In some cases there might not be a mime type set at all.
 * See: https://github.com/react-dropzone/react-dropzone/issues/276
 * @param {boolean} [props.multiple=true] Allow drag 'n' drop (or selection from the file dialog) of multiple files
 * @param {boolean} [props.preventDropOnDocument=true] If false, allow dropped items to take over the current browser window
 * @param {boolean} [props.noClick=false] If true, disables click to open the native file selection dialog
 * @param {boolean} [props.noKeyboard=false] If true, disables SPACE/ENTER to open the native file selection dialog.
 * Note that it also stops tracking the focus state.
 * @param {boolean} [props.noDrag=false] If true, disables drag 'n' drop
 * @param {boolean} [props.noDragEventsBubbling=false] If true, stops drag event propagation to parents
 * @param {number} [props.minSize=0] Minimum file size (in bytes)
 * @param {number} [props.maxSize=Infinity] Maximum file size (in bytes)
 * @param {boolean} [props.disabled=false] Enable/disable the dropzone
 * @param {getFilesFromEvent} [props.getFilesFromEvent] Use this to provide a custom file aggregator
 * @param {Function} [props.onFileDialogCancel] Cb for when closing the file dialog with no selection
 * @param {dragCb} [props.onDragEnter] Cb for when the `dragenter` event occurs.
 * @param {dragCb} [props.onDragLeave] Cb for when the `dragleave` event occurs
 * @param {dragCb} [props.onDragOver] Cb for when the `dragover` event occurs
 * @param {dropCb} [props.onDrop] Cb for when the `drop` event occurs.
 * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
 *
 * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
 * `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
 * If `multiple` is set to false and additional files are droppped,
 * all files besides the first will be rejected.
 * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
 *
 * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
 * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
 *
 * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
 * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
 *
 * ```js
 * function onDrop(acceptedFiles) {
 *   const req = request.post('/upload')
 *   acceptedFiles.forEach(file => {
 *     req.attach(file.name, file)
 *   })
 *   req.end(callback)
 * }
 * ```
 * @param {dropAcceptedCb} [props.onDropAccepted]
 * @param {dropRejectedCb} [props.onDropRejected]
 *
 * @returns {DropzoneState}
 */

function useDropzone() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      accept = _ref2.accept,
      _ref2$disabled = _ref2.disabled,
      disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
      _ref2$getFilesFromEve = _ref2.getFilesFromEvent,
      getFilesFromEvent = _ref2$getFilesFromEve === void 0 ? file_selector__WEBPACK_IMPORTED_MODULE_2__["fromEvent"] : _ref2$getFilesFromEve,
      _ref2$maxSize = _ref2.maxSize,
      maxSize = _ref2$maxSize === void 0 ? Infinity : _ref2$maxSize,
      _ref2$minSize = _ref2.minSize,
      minSize = _ref2$minSize === void 0 ? 0 : _ref2$minSize,
      _ref2$multiple = _ref2.multiple,
      multiple = _ref2$multiple === void 0 ? true : _ref2$multiple,
      onDragEnter = _ref2.onDragEnter,
      onDragLeave = _ref2.onDragLeave,
      onDragOver = _ref2.onDragOver,
      onDrop = _ref2.onDrop,
      onDropAccepted = _ref2.onDropAccepted,
      onDropRejected = _ref2.onDropRejected,
      onFileDialogCancel = _ref2.onFileDialogCancel,
      _ref2$preventDropOnDo = _ref2.preventDropOnDocument,
      preventDropOnDocument = _ref2$preventDropOnDo === void 0 ? true : _ref2$preventDropOnDo,
      _ref2$noClick = _ref2.noClick,
      noClick = _ref2$noClick === void 0 ? false : _ref2$noClick,
      _ref2$noKeyboard = _ref2.noKeyboard,
      noKeyboard = _ref2$noKeyboard === void 0 ? false : _ref2$noKeyboard,
      _ref2$noDrag = _ref2.noDrag,
      noDrag = _ref2$noDrag === void 0 ? false : _ref2$noDrag,
      _ref2$noDragEventsBub = _ref2.noDragEventsBubbling,
      noDragEventsBubbling = _ref2$noDragEventsBub === void 0 ? false : _ref2$noDragEventsBub;

  var rootRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var inputRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var isFocused = state.isFocused,
      isFileDialogActive = state.isFileDialogActive,
      draggedFiles = state.draggedFiles; // Fn for opening the file dialog programmatically

  var openFileDialog = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    if (inputRef.current) {
      dispatch({
        type: 'openDialog'
      });
      inputRef.current.value = null;
      inputRef.current.click();
    }
  }, [dispatch]); // Update file dialog active state when the window is focused on

  var onWindowFocus = function onWindowFocus() {
    // Execute the timeout only if the file dialog is opened in the browser
    if (isFileDialogActive) {
      setTimeout(function () {
        if (inputRef.current) {
          var files = inputRef.current.files;

          if (!files.length) {
            dispatch({
              type: 'closeDialog'
            });

            if (typeof onFileDialogCancel === 'function') {
              onFileDialogCancel();
            }
          }
        }
      }, 300);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    window.addEventListener('focus', onWindowFocus, false);
    return function () {
      window.removeEventListener('focus', onWindowFocus, false);
    };
  }, [inputRef, isFileDialogActive, onFileDialogCancel]); // Cb to open the file dialog when SPACE/ENTER occurs on the dropzone

  var onKeyDownCb = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (event) {
    // Ignore keyboard events bubbling up the DOM tree
    if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
      return;
    }

    if (event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
      openFileDialog();
    }
  }, [rootRef, inputRef]); // Update focus state for the dropzone

  var onFocusCb = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    dispatch({
      type: 'focus'
    });
  }, []);
  var onBlurCb = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    dispatch({
      type: 'blur'
    });
  }, []); // Cb to open the file dialog when click occurs on the dropzone

  var onClickCb = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    if (noClick) {
      return;
    } // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
    // to ensure React can handle state changes
    // See: https://github.com/react-dropzone/react-dropzone/issues/450


    if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["isIeOrEdge"])()) {
      setTimeout(openFileDialog, 0);
    } else {
      openFileDialog();
    }
  }, [inputRef, noClick]);
  var dragTargetsRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])([]);

  var onDocumentDrop = function onDocumentDrop(event) {
    if (rootRef.current && rootRef.current.contains(event.target)) {
      // If we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
      return;
    }

    event.preventDefault();
    dragTargetsRef.current = [];
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (preventDropOnDocument) {
      document.addEventListener('dragover', _utils_index__WEBPACK_IMPORTED_MODULE_3__["onDocumentDragOver"], false);
      document.addEventListener('drop', onDocumentDrop, false);
    }

    return function () {
      if (preventDropOnDocument) {
        document.removeEventListener('dragover', _utils_index__WEBPACK_IMPORTED_MODULE_3__["onDocumentDragOver"]);
        document.removeEventListener('drop', onDocumentDrop);
      }
    };
  }, [rootRef, preventDropOnDocument]);
  var onDragEnterCb = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (event) {
    event.preventDefault(); // Persist here because we need the event later after getFilesFromEvent() is done

    event.persist();
    stopPropagation(event); // Count the dropzone and any children that are entered.

    if (dragTargetsRef.current.indexOf(event.target) === -1) {
      dragTargetsRef.current = [].concat(_toConsumableArray(dragTargetsRef.current), [event.target]);
    }

    if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["isEvtWithFiles"])(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function (draggedFiles) {
        if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["isPropagationStopped"])(event) && !noDragEventsBubbling) {
          return;
        }

        dispatch({
          draggedFiles: draggedFiles,
          isDragActive: true,
          type: 'setDraggedFiles'
        });

        if (onDragEnter) {
          onDragEnter(event);
        }
      });
    }
  }, [getFilesFromEvent, onDragEnter, noDragEventsBubbling]);
  var onDragOverCb = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);

    if (event.dataTransfer) {
      try {
        event.dataTransfer.dropEffect = 'copy';
      } catch (_unused) {}
      /* eslint-disable-line no-empty */

    }

    if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["isEvtWithFiles"])(event) && onDragOver) {
      onDragOver(event);
    }

    return false;
  }, [onDragOver, noDragEventsBubbling]);
  var onDragLeaveCb = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event); // Only deactivate once the dropzone and all children have been left

    var targets = dragTargetsRef.current.filter(function (target) {
      return target !== event.target && rootRef.current && rootRef.current.contains(target);
    });
    dragTargetsRef.current = targets;

    if (targets.length > 0) {
      return;
    }

    dispatch({
      isDragActive: false,
      type: 'setDraggedFiles',
      draggedFiles: []
    });

    if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["isEvtWithFiles"])(event) && onDragLeave) {
      onDragLeave(event);
    }
  }, [rootRef, onDragLeave, noDragEventsBubbling]);
  var onDropCb = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (event) {
    event.preventDefault(); // Persist here because we need the event later after getFilesFromEvent() is done

    event.persist();
    stopPropagation(event);
    dragTargetsRef.current = [];

    if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["isEvtWithFiles"])(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function (files) {
        if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["isPropagationStopped"])(event) && !noDragEventsBubbling) {
          return;
        }

        var acceptedFiles = [];
        var rejectedFiles = [];
        files.forEach(function (file) {
          if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["fileAccepted"])(file, accept) && Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["fileMatchSize"])(file, minSize, maxSize)) {
            acceptedFiles.push(file);
          } else {
            rejectedFiles.push(file);
          }
        });

        if (!multiple && acceptedFiles.length > 1) {
          rejectedFiles.push.apply(rejectedFiles, _toConsumableArray(acceptedFiles.splice(0))); // Reject everything and empty accepted files
        }

        dispatch({
          acceptedFiles: acceptedFiles,
          rejectedFiles: rejectedFiles,
          type: 'setFiles'
        });

        if (onDrop) {
          onDrop(acceptedFiles, rejectedFiles, event);
        }

        if (rejectedFiles.length > 0 && onDropRejected) {
          onDropRejected(rejectedFiles, event);
        }

        if (acceptedFiles.length > 0 && onDropAccepted) {
          onDropAccepted(acceptedFiles, event);
        }
      });
    }

    dispatch({
      type: 'reset'
    });
  }, [multiple, accept, minSize, maxSize, getFilesFromEvent, onDrop, onDropAccepted, onDropRejected, noDragEventsBubbling]);

  var composeHandler = function composeHandler(fn) {
    return disabled ? null : fn;
  };

  var composeKeyboardHandler = function composeKeyboardHandler(fn) {
    return noKeyboard ? null : composeHandler(fn);
  };

  var composeDragHandler = function composeDragHandler(fn) {
    return noDrag ? null : composeHandler(fn);
  };

  var stopPropagation = function stopPropagation(event) {
    if (noDragEventsBubbling) {
      event.stopPropagation();
    }
  };

  var getRootProps = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$refKey = _ref3.refKey,
          refKey = _ref3$refKey === void 0 ? 'ref' : _ref3$refKey,
          onKeyDown = _ref3.onKeyDown,
          onFocus = _ref3.onFocus,
          onBlur = _ref3.onBlur,
          onClick = _ref3.onClick,
          onDragEnter = _ref3.onDragEnter,
          onDragOver = _ref3.onDragOver,
          onDragLeave = _ref3.onDragLeave,
          onDrop = _ref3.onDrop,
          rest = _objectWithoutProperties(_ref3, ["refKey", "onKeyDown", "onFocus", "onBlur", "onClick", "onDragEnter", "onDragOver", "onDragLeave", "onDrop"]);

      return _objectSpread(_defineProperty({
        onKeyDown: composeKeyboardHandler(Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["composeEventHandlers"])(onKeyDown, onKeyDownCb)),
        onFocus: composeKeyboardHandler(Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["composeEventHandlers"])(onFocus, onFocusCb)),
        onBlur: composeKeyboardHandler(Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["composeEventHandlers"])(onBlur, onBlurCb)),
        onClick: composeHandler(Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["composeEventHandlers"])(onClick, onClickCb)),
        onDragEnter: composeDragHandler(Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["composeEventHandlers"])(onDragEnter, onDragEnterCb)),
        onDragOver: composeDragHandler(Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["composeEventHandlers"])(onDragOver, onDragOverCb)),
        onDragLeave: composeDragHandler(Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["composeEventHandlers"])(onDragLeave, onDragLeaveCb)),
        onDrop: composeDragHandler(Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["composeEventHandlers"])(onDrop, onDropCb))
      }, refKey, rootRef), !disabled && !noKeyboard ? {
        tabIndex: 0
      } : {}, {}, rest);
    };
  }, [rootRef, onKeyDownCb, onFocusCb, onBlurCb, onClickCb, onDragEnterCb, onDragOverCb, onDragLeaveCb, onDropCb, noKeyboard, noDrag, disabled]);
  var onInputElementClick = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (event) {
    event.stopPropagation();
  }, []);
  var getInputProps = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return function () {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$refKey = _ref4.refKey,
          refKey = _ref4$refKey === void 0 ? 'ref' : _ref4$refKey,
          onChange = _ref4.onChange,
          onClick = _ref4.onClick,
          rest = _objectWithoutProperties(_ref4, ["refKey", "onChange", "onClick"]);

      var inputProps = _defineProperty({
        accept: accept,
        multiple: multiple,
        type: 'file',
        style: {
          display: 'none'
        },
        onChange: composeHandler(Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["composeEventHandlers"])(onChange, onDropCb)),
        onClick: composeHandler(Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["composeEventHandlers"])(onClick, onInputElementClick)),
        autoComplete: 'off',
        tabIndex: -1
      }, refKey, inputRef);

      return _objectSpread({}, inputProps, {}, rest);
    };
  }, [inputRef, accept, multiple, onDropCb, disabled]);
  var fileCount = draggedFiles.length;
  var isDragAccept = fileCount > 0 && Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["allFilesAccepted"])({
    files: draggedFiles,
    accept: accept,
    minSize: minSize,
    maxSize: maxSize,
    multiple: multiple
  });
  var isDragReject = fileCount > 0 && !isDragAccept;
  return _objectSpread({}, state, {
    isDragAccept: isDragAccept,
    isDragReject: isDragReject,
    isFocused: isFocused && !disabled,
    getRootProps: getRootProps,
    getInputProps: getInputProps,
    rootRef: rootRef,
    inputRef: inputRef,
    open: composeHandler(openFileDialog)
  });
}

function reducer(state, action) {
  /* istanbul ignore next */
  switch (action.type) {
    case 'focus':
      return _objectSpread({}, state, {
        isFocused: true
      });

    case 'blur':
      return _objectSpread({}, state, {
        isFocused: false
      });

    case 'openDialog':
      return _objectSpread({}, state, {
        isFileDialogActive: true
      });

    case 'closeDialog':
      return _objectSpread({}, state, {
        isFileDialogActive: false
      });

    case 'setDraggedFiles':
      /* eslint no-case-declarations: 0 */
      var isDragActive = action.isDragActive,
          draggedFiles = action.draggedFiles;
      return _objectSpread({}, state, {
        draggedFiles: draggedFiles,
        isDragActive: isDragActive
      });

    case 'setFiles':
      return _objectSpread({}, state, {
        acceptedFiles: action.acceptedFiles,
        rejectedFiles: action.rejectedFiles
      });

    case 'reset':
      return _objectSpread({}, state, {
        isFileDialogActive: false,
        isDragActive: false,
        draggedFiles: [],
        acceptedFiles: [],
        rejectedFiles: []
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./node_modules/react-dropzone/dist/es/utils/index.js":
/*!************************************************************!*\
  !*** ./node_modules/react-dropzone/dist/es/utils/index.js ***!
  \************************************************************/
/*! exports provided: fileAccepted, fileMatchSize, allFilesAccepted, isPropagationStopped, isEvtWithFiles, isKindFile, onDocumentDragOver, isIeOrEdge, composeEventHandlers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileAccepted", function() { return fileAccepted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileMatchSize", function() { return fileMatchSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allFilesAccepted", function() { return allFilesAccepted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPropagationStopped", function() { return isPropagationStopped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEvtWithFiles", function() { return isEvtWithFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKindFile", function() { return isKindFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onDocumentDragOver", function() { return onDocumentDragOver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIeOrEdge", function() { return isIeOrEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "composeEventHandlers", function() { return composeEventHandlers; });
/* harmony import */ var attr_accept__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! attr-accept */ "./node_modules/attr-accept/dist/es/index.js");
/* harmony import */ var attr_accept__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(attr_accept__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

 // Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
// that MIME type will always be accepted

function fileAccepted(file, accept) {
  return file.type === 'application/x-moz-file' || attr_accept__WEBPACK_IMPORTED_MODULE_0___default()(file, accept);
}
function fileMatchSize(file, minSize, maxSize) {
  if (isDefined(file.size)) {
    if (isDefined(minSize) && isDefined(maxSize)) return file.size >= minSize && file.size <= maxSize;else if (isDefined(minSize)) return file.size >= minSize;else if (isDefined(maxSize)) return file.size <= maxSize;
  }

  return true;
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

function allFilesAccepted(_ref) {
  var files = _ref.files,
      accept = _ref.accept,
      minSize = _ref.minSize,
      maxSize = _ref.maxSize,
      multiple = _ref.multiple;

  if (!multiple && files.length > 1) {
    return false;
  }

  return files.every(function (file) {
    return fileAccepted(file, accept) && fileMatchSize(file, minSize, maxSize);
  });
} // React's synthetic events has event.isPropagationStopped,
// but to remain compatibility with other libs (Preact) fall back
// to check event.cancelBubble

function isPropagationStopped(event) {
  if (typeof event.isPropagationStopped === 'function') {
    return event.isPropagationStopped();
  } else if (typeof event.cancelBubble !== 'undefined') {
    return event.cancelBubble;
  }

  return false;
}
function isEvtWithFiles(event) {
  if (!event.dataTransfer) {
    return !!event.target && !!event.target.files;
  } // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file


  return Array.prototype.some.call(event.dataTransfer.types, function (type) {
    return type === 'Files' || type === 'application/x-moz-file';
  });
}
function isKindFile(item) {
  return _typeof(item) === 'object' && item !== null && item.kind === 'file';
} // allow the entire document to be a drag target

function onDocumentDragOver(event) {
  event.preventDefault();
}

function isIe(userAgent) {
  return userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1;
}

function isEdge(userAgent) {
  return userAgent.indexOf('Edge/') !== -1;
}

function isIeOrEdge() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.navigator.userAgent;
  return isIe(userAgent) || isEdge(userAgent);
}
/**
 * This is intended to be used to compose event handlers
 * They are executed in order until one of them calls `event.isPropagationStopped()`.
 * Note that the check is done on the first invoke too,
 * meaning that if propagation was stopped before invoking the fns,
 * no handlers will be executed.
 *
 * @param {Function} fns the event hanlder functions
 * @return {Function} the event handler to add to an element
 */

function composeEventHandlers() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return fns.some(function (fn) {
      if (!isPropagationStopped(event) && fn) {
        fn.apply(void 0, [event].concat(args));
      }

      return isPropagationStopped(event);
    });
  };
}

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
		key: 'UNSAFE_componentWillReceiveProps',
		value: function UNSAFE_componentWillReceiveProps(nextProps) {
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
				{ className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('Select-value', this.props.value.disabled ? 'Select-value-disabled' : '', this.props.value.className),
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
			var eventTogglerName = enabled ? document.addEventListener ? 'addEventListener' : 'attachEvent' : document.removeEventListener ? 'removeEventListener' : 'detachEvent';
			var pref = document.addEventListener ? '' : 'on';

			document[eventTogglerName](pref + 'touchstart', this.handleTouchOutside);
			document[eventTogglerName](pref + 'mousedown', this.handleTouchOutside);
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
						isPseudoFocused: false,
						focusedOption: null
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
					isOpen: !this.state.isOpen,
					focusedOption: null
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
			if (!this.props.closeOnSelect) {
				return;
			}
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
							value: value,
							values: valueArray
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
				return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_input_autosize__WEBPACK_IMPORTED_MODULE_0___default.a, _extends({ id: this.props.id }, inputProps, { className: className, minWidth: '5' }));
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
						'div',
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
			    promptTextCreator = _props2.promptTextCreator,
			    showNewOptionAtTop = _props2.showNewOptionAtTop;

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

					if (showNewOptionAtTop) {
						filteredOptions.unshift(this._createPlaceholderOption);
					} else {
						filteredOptions.push(this._createPlaceholderOption);
					}
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

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption(event)) {
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
	shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption,
	showNewOptionAtTop: true
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
	shouldKeyDownEventCreateNewOption: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

	// Where to show prompt/placeholder option text.
	// true: new option prompt at top of list (default)
	// false: new option prompt at bottom of list
	showNewOptionAtTop: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
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

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __esDecorate, __runInitializers, __propKey, __setFunctionName, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn, __addDisposableResource, __disposeResources, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__esDecorate", function() { return __esDecorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__runInitializers", function() { return __runInitializers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__propKey", function() { return __propKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__setFunctionName", function() { return __setFunctionName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldIn", function() { return __classPrivateFieldIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__addDisposableResource", function() { return __addDisposableResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__disposeResources", function() { return __disposeResources; });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};

function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};

function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    function next() {
        while (env.stack.length) {
            var rec = env.stack.pop();
            try {
                var result = rec.dispose && rec.dispose.call(rec.value);
                if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
            }
            catch (e) {
                fail(e);
            }
        }
        if (env.hasError) throw env.error;
    }
    return next();
}

/* harmony default export */ __webpack_exports__["default"] = ({
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
});


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

/***/ "./www/js/source/reactpages/actions/dateRangeAction.js":
/*!*************************************************************!*\
  !*** ./www/js/source/reactpages/actions/dateRangeAction.js ***!
  \*************************************************************/
/*! exports provided: setDateRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDateRange", function() { return setDateRange; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

const setDateRange = dateRange => {
  const range = {
    fromDate: dateRange.startDate,
    toDate: dateRange.endDate
  };
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_DATE_RANGE"],
    data: range
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/subsidiaryAction.js":
/*!**************************************************************!*\
  !*** ./www/js/source/reactpages/actions/subsidiaryAction.js ***!
  \**************************************************************/
/*! exports provided: setSubsidiaryList, setSubsidiarySearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSubsidiaryList", function() { return setSubsidiaryList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSubsidiarySearch", function() { return setSubsidiarySearch; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");

const setSubsidiaryList = subsidiaryList => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SUBSIDIARY_LIST"],
    data: subsidiaryList
  };
};
const setSubsidiarySearch = subsidiarySearch => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SUBSIDIARY_SEARCH"],
    data: subsidiarySearch
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/userGuideAction.js":
/*!*************************************************************!*\
  !*** ./www/js/source/reactpages/actions/userGuideAction.js ***!
  \*************************************************************/
/*! exports provided: getUserGuideContent, setUserGuideContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserGuideContent", function() { return getUserGuideContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUserGuideContent", function() { return setUserGuideContent; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/site */ "./www/js/source/reactpages/lib/site.js");



const fetchData = resourceName => {
  const url = _lib_site__WEBPACK_IMPORTED_MODULE_2__["default"].resolveClientUrl('UserGuide/Index?resourcename=' + resourceName) + "&_=" + new Date().getTime();
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
};
function getUserGuideContent(params) {
  return dispatch => {
    fetchData(params).then(response => {
      dispatch(setUserGuideContent(response.data));
    });
  };
}
const setUserGuideContent = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["USER_GUIDE_CONTENT"],
    data: data
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/actions/usernameAction.js":
/*!************************************************************!*\
  !*** ./www/js/source/reactpages/actions/usernameAction.js ***!
  \************************************************************/
/*! exports provided: setUsername */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUsername", function() { return setUsername; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./www/js/source/reactpages/actions/types.js");

const setUsername = value => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_USERNAME"],
    data: value
  };
};

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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



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
const _excluded = ["content", "extendContent", "tag"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


const ReportTitle = _ref => {
  let {
      content,
      extendContent,
      tag
    } = _ref,
    attrs = _objectWithoutProperties(_ref, _excluded);
  const Tag = tag;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "report-title-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, _extends({
    className: "report-title"
  }, attrs), content, extendContent));
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
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Switcher = props => {
  const attributes = _extends({}, (_objectDestructuringEmpty(props), props));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({}, attributes, {
    type: "checkbox"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




class UserGuide extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "onClickHandler", () => {
      this.setState({
        isShow: true
      });
      this.props.onClick && this.props.onClick();
    });
    _defineProperty(this, "onCloseHandler", () => {
      this.setState({
        isShow: false
      });
    });
    this.state = {
      isShow: false
    };
  }
  render() {
    const {
      className,
      title,
      content,
      contentTitle,
      isHtml
    } = this.props;
    const isShow = this.state.isShow && content && ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(content) || content.length > 0) ? true : false;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: className,
      onClick: this.onClickHandler,
      title: title
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_popup_Popup__WEBPACK_IMPORTED_MODULE_2__["default"], {
      width: 640,
      height: 480,
      isShow: isShow,
      title: contentTitle,
      onClose: this.onCloseHandler,
      isHtml: isHtml
    }, content));
  }
}
_defineProperty(UserGuide, "propTypes", {
  title: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  contentTitle: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  isHtml: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
});
_defineProperty(UserGuide, "defaultProps", {
  className: 'icon-book right',
  isHtml: true
});
;

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
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







const DELAY_TIME_MILLISECOND = 300;
class AutoComplete extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    _defineProperty(this, "_handleClickOut", event => {
      if (this.isShowSuggestionList && this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this._clearState();
      }
    });
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
    this.wrapperRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }
  componentDidMount() {
    document.addEventListener("mousedown", this._handleClickOut);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this._handleClickOut);
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
      className: "ac-container",
      ref: this.wrapperRef
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



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
const _excluded = ["tag", "className", "style"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


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
      attrs = _objectWithoutProperties(iconToggle, _excluded);
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
    }, stickyFooter), !!this.props.isCollapseMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  onExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isCollapseMode: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
});
const propTypes = {
  stickyFooter: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  onCollapse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  iconToggle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  isCollapseMode: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
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
  },
  isCollapseMode: true
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



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
      className: `radio-group ${this.props.className}`
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
const _excluded = ["text"],
  _excluded2 = ["buttons", "children"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
        attrs = _objectWithoutProperties(btnItem, _excluded);
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
      props = _objectWithoutProperties(_this$props, _excluded2);
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

/***/ "./www/js/source/reactpages/constants/report.js":
/*!******************************************************!*\
  !*** ./www/js/source/reactpages/constants/report.js ***!
  \******************************************************/
/*! exports provided: ReportLevel, ReportBy, SubsidiaryViewType, TreeViewOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportLevel", function() { return ReportLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportBy", function() { return ReportBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubsidiaryViewType", function() { return SubsidiaryViewType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeViewOption", function() { return TreeViewOption; });
const ReportLevel = {
  MAIN: 0,
  LICENSEE: 1,
  CUSTOMER: 2
};
const ReportBy = {
  DAILY: 1,
  MONTHLY: 2,
  WEEKLY: 3
};
const SubsidiaryViewType = {
  NOT_MANAGEMENT: 0,
  NORMAL_MANAGEMENT: 1,
  MASTER_MANAGEMENT: 2
};
const TreeViewOption = {
  childrenField: 'Children',
  keyField: 'Value',
  valueField: 'Name',
  statusField: 'Checked',
  indent: 30,
  includeSelectedParentKey: false,
  useOriginalDataSource: false
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
      __webpack_require__.e(/*! import() | lib/xlsx-style-sparta */ "lib/xlsx-style-sparta").then(__webpack_require__.t.bind(null, /*! xlsx-style-sparta */ "./node_modules/xlsx-style-sparta/xlsx.js", 7)).then(XLSX => {
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
    const fileNameDownload = `${fileName}.${EXCEL_TYPE}`;

    // IE 10+
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

/***/ "./www/js/source/reactpages/lib/stringHelper.js":
/*!******************************************************!*\
  !*** ./www/js/source/reactpages/lib/stringHelper.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StringHelper; });
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class StringHelper {
  static isEmptyOrWhiteSpace(str) {
    return !str || str.trim().length === 0;
  }
}
_defineProperty(StringHelper, "addSpaceAfterComma", str => {
  return str.split(",").join(", ");
});

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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


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

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/paramHanlderAction.js":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/actions/paramHanlderAction.js ***!
  \***************************************************************************************************/
/*! exports provided: setSelectedParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedParams", function() { return setSelectedParams; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/types.js");

const setSelectedParams = options => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_PARAMS"],
    data: options
  };
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/components/DropzoneUpload.jsx":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/components/DropzoneUpload.jsx ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/htmlHelper */ "./www/js/source/reactpages/lib/htmlHelper.js");
/* harmony import */ var react_dropzone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dropzone */ "./node_modules/react-dropzone/dist/es/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/constants.js");





const MbToByte = 1000 * 1000;
const DropzoneUpload = props => {
  const {
    onSubmit,
    onClose,
    multiple,
    accept,
    children,
    isShowInnerZone,
    tabType,
    isActive
  } = props;
  const maxSize = props.maxSize * MbToByte;
  const [uploadedFiles, setUploadedFiles] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const onDrop = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(acceptedFiles => {
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  });
  const onDropRejected = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(rejectedFiles => {
    const rejectedFile = rejectedFiles[0];
    let errorMsg = Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_2__["decode"])(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('UploadFileError'));
    if (_isInvalidExtension(rejectedFile)) {
      errorMsg = `${Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_2__["decode"])(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('FileExtensionIncorrect'))} (${accept})`;
    } else if (_isInValidSize(rejectedFile)) {
      errorMsg = `${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('FileUploadExceedSize')} ${props.maxSize}MB`;
    }
    alert(errorMsg);
  });
  const {
    getRootProps,
    getInputProps
  } = Object(react_dropzone__WEBPACK_IMPORTED_MODULE_3__["useDropzone"])({
    onDrop,
    onDropRejected,
    multiple,
    accept,
    maxSize
  });
  const _removeFile = file => () => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setUploadedFiles(newFiles);
  };
  const _isInValidSize = file => {
    return file.size > maxSize;
  };
  const _isInvalidExtension = file => {
    const acceptArray = accept.split(',');
    const isValid = acceptArray.some(_ => file.name.endsWith(_));
    return !isValid;
  };
  const _renderAcceptedFiles = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "dropzone-row"
    }, uploadedFiles.map(file => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: file.path,
      className: "file-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "file-close",
      onClick: _removeFile(file)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "icon-close"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, file.name))));
  };
  const _clickHereTitle = () => {
    switch (tabType) {
      case _lib_constants__WEBPACK_IMPORTED_MODULE_4__["TabType"].VipPlayerManagement:
        return isActive ? 'ClickOrDropHereToActivate' : 'ClickOrDropHereToDeactivate';
      default:
        return 'ClickOrDropHere';
    }
  };
  const _isExistFiles = uploadedFiles && uploadedFiles.length > 0;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropzone"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "dropzone-close",
    onClick: () => onClose && onClose()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-close"
  })), isShowInnerZone && (_isExistFiles ? _renderAcceptedFiles() : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropzone-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", getRootProps({
    className: 'inner-dropzone'
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", getInputProps()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource(_clickHereTitle()))))), isShowInnerZone && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropzone-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn",
    disabled: !_isExistFiles,
    onClick: () => onSubmit && onSubmit(uploadedFiles)
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('Submit'))), children);
};
DropzoneUpload.defaultProps = {
  maxSize: 1,
  isShowInnerZone: true
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(DropzoneUpload));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/components/GridCaption.jsx":
/*!************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/components/GridCaption.jsx ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/ReportTitle */ "./www/js/source/reactpages/components/ReportTitle.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");



const GridCaption = props => {
  const {
    playerCount
  } = props;
  const _buildContent = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      key: "searchResult"
    }, `${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('SearchResult')}: ${playerCount} ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('Player')}` + (_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].currentLanguage === _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].languageKeys.eng ? `(s)` : ``));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_1__["default"], {
    tag: "div",
    content: _buildContent()
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(GridCaption));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/components/VipSwitcherCell.jsx":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/components/VipSwitcherCell.jsx ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jsroot_components_Switcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/Switcher */ "./www/js/source/reactpages/components/Switcher.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/sweetAlert */ "./www/js/source/reactpages/lib/sweetAlert.js");
/* harmony import */ var _lib_helpers_sweetAlertHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/helpers/sweetAlertHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/sweetAlertHelper.js");









const VipSwitcherCell = props => {
  const {
    index,
    updateVipStatus,
    setSweetAlertOption,
    playerList,
    hasVipManagementEdit
  } = props;
  const {
    systemId,
    isVip,
    isBA,
    customerClass
  } = playerList[index];
  const canEditVip = hasVipManagementEdit && !isBA;
  const _handleCloseAlert = () => {
    setSweetAlertOption(null);
  };
  const _cancelProps = {
    onClick: _handleCloseAlert
  };
  const _buildAlertOptionUpdateVipStatus = (params, isUpdateVip) => {
    const confirmMessage = isUpdateVip ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("ConfirmActivateVIPPlayer") : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getSingleResource("ConfirmDeactivateVIPPlayer");
    const handlerUpdateVipStatusSuccess = _lib_helpers_sweetAlertHelper__WEBPACK_IMPORTED_MODULE_8__["UpdateVipStatusAlertOption"].createHandlerAfterUpdateVipStatusSuccess(props);
    const handlerAfterUpdateVipStatus = _lib_helpers_sweetAlertHelper__WEBPACK_IMPORTED_MODULE_8__["UpdateVipStatusAlertOption"].createHandlerAfterUpdateVipStatus({
      setSweetAlertOption,
      handlerUpdateVipStatusSuccess,
      isUpdateVip,
      isSingleUpdate: true
    });
    const confirmProps = _lib_helpers_sweetAlertHelper__WEBPACK_IMPORTED_MODULE_8__["UpdateVipStatusAlertOption"].createUpdateVipStatusConfirmProps({
      params,
      updateVipStatus,
      handlerAfterUpdateVipStatus
    });
    const confirmOptions = Object(_jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_7__["generateDefaultConfirmOption"])(confirmMessage, _handleCloseAlert, confirmProps, _cancelProps, _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_7__["predefinedIcons"].warning, {
      height: 210
    });
    return confirmOptions;
  };
  const _handleChangeVipStatus = event => {
    event.preventDefault();
    const checked = event.target.checked;
    const params = {
      systemIds: systemId,
      isVip: !isVip
    };
    const alertOption = _buildAlertOptionUpdateVipStatus(params, checked);
    setSweetAlertOption(alertOption);
  };
  const _getTextDisplay = isVip => {
    return isVip ? 'YES' : 'NO';
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
    className: "center-align"
  }, canEditVip ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Switcher__WEBPACK_IMPORTED_MODULE_5__["default"], {
    checked: isVip,
    onChange: _handleChangeVipStatus
  }) : _getTextDisplay(isVip));
};
function mapDispatchToProps(dispatch) {
  const {
    setPlayerList,
    searchPlayer,
    updateVipStatus,
    setSweetAlertOption,
    setPagingOption
  } = _actions__WEBPACK_IMPORTED_MODULE_3__["default"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setPlayerList,
    updateVipStatus,
    setSweetAlertOption,
    searchPlayer,
    setPagingOption
  }, dispatch);
}
function mapStateToProps(state) {
  const {
    playerList,
    pagingOption,
    selectedTabKey,
    selectedParams
  } = state;
  return Object.assign({}, {
    playerList,
    pagingOption,
    selectedTabKey,
    selectedParams
  });
}
;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(VipSwitcherCell)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/dataSourceHelper.js":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/dataSourceHelper.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataSourceHelper; });
class DataSourceHelper {
  static CreateDataSourceFrom(originDataSource, selectedItems) {
    const selectedItemList = selectedItems.split(',').filter(x => x !== '');
    const convertedList = originDataSource.map(item => {
      const {
        key,
        value,
        valueDecoration
      } = item;
      return {
        key,
        value,
        valueDecoration,
        status: selectedItemList.find(_ => _ == key) ? true : false
      };
    });
    return convertedList;
  }
}

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/gridHelper.js":
/*!***********************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/gridHelper.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GridHelper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/constants.js");
/* harmony import */ var _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/constants/report */ "./www/js/source/reactpages/constants/report.js");
/* harmony import */ var _tabs_problem_player_components_grid_CustomerClassCell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../tabs/problem-player/components/grid/CustomerClassCell */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/components/grid/CustomerClassCell.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






class GridHelper {
  static renderHeader(dataHeaders) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], {
      style: {
        height: 32
      }
    }, dataHeaders && dataHeaders.length > 0 && dataHeaders.map(_ => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
      colWidth: _.colWidth,
      sortBy: _.sortBy
    }, this.renderHeaderCell(_))));
  }
  static renderHeaderCell(cell) {
    var isCustomerClass = cell.key == "customerClass";
    if (isCustomerClass) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tabs_problem_player_components_grid_CustomerClassCell__WEBPACK_IMPORTED_MODULE_5__["default"], {
        cell: cell
      });
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, cell.childComponent ? cell.childComponent : cell.text);
  }
  static calculateTopPosition(dropdownHeight = 0, currentTop) {
    const innerHeight = window.innerHeight;
    const expectedHeight = dropdownHeight + currentTop + 20;
    return expectedHeight > innerHeight ? currentTop - dropdownHeight : currentTop;
  }
  static getSortInfo(orderCol, sortType) {
    const sortInfo = {
      orderCol: _constants__WEBPACK_IMPORTED_MODULE_3__["SortMapper"].sortCol[orderCol],
      sortType: _constants__WEBPACK_IMPORTED_MODULE_3__["SortMapper"].sortType[sortType]
    };
    return sortInfo;
  }
  static getSortInfoFromPagingOption(options) {
    const {
      orderCol,
      sortType
    } = options;
    return {
      orderCol,
      sortType
    };
  }
}
_defineProperty(GridHelper, "callBackToUpdatePaging", ({
  pagingOption,
  setPagingOption
}) => response => {
  const {
    totalItem,
    pageIndex,
    pageSize,
    orderCol,
    sortType
  } = response;
  const newPagingOption = _objectSpread(_objectSpread({}, pagingOption), {
    PageIndex: pageIndex,
    PageSize: pageSize,
    orderCol,
    sortType,
    TotalItem: totalItem
  });
  setPagingOption(newPagingOption);
});
_defineProperty(GridHelper, "isShowSubsidiary", subsidiarySearch => _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_2__["default"].viewType !== _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_4__["SubsidiaryViewType"].NOT_MANAGEMENT && subsidiarySearch);

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/messageHelper.js":
/*!**************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/messageHelper.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MessageHelper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/constants.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



class MessageHelper {}
_defineProperty(MessageHelper, "MsgColors", {
  [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].Success]: {
    content: 'msg-success',
    icon: 'icon-tick'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].InvalidSystemId]: {
    content: 'msg-error',
    icon: 'icon-warning'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].NoChangeBySystemId]: {
    content: 'msg-success',
    icon: 'icon-tick'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].NoChangeByBAStatus]: {
    content: 'msg-success',
    icon: 'icon-tick'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].Avoid]: {
    content: 'msg-error',
    icon: 'icon-warning'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].InvalidExternalId]: {
    content: 'msg-error',
    icon: 'icon-warning'
  }
});
_defineProperty(MessageHelper, "GetMsgUpdateVipStatus", {
  singleUpdate: {
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].Success]: _ => _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('SuccessUpdateVipStatusSingle'),
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].InvalidSystemId]: data => _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('InvalidPlayerUpdateVipStatusSingle').replace('{0}', data.ids),
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].NoChangeBySystemId]: (_, isUpdateVip) => isUpdateVip ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('AlreadyUpdateVipStatusSingle') : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('AlreadyUpdateNotVipStatusSingle'),
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].NoChangeByBAStatus]: () => _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BAPlayerNoUpdateVIPSingle'),
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].Avoid]: data => _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('RetractedPlayerUpdateVipStatusSingle').replace('{0}', data.ids)
  },
  multipleUpdate: {
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].Success]: data => _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('SuccessUpdateVipStatus').replace('{0}', data.numberOfPlayer),
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].InvalidSystemId]: data => _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('InvalidPlayerUpdateVipStatusBySystemId').replace('{0}', data.numberOfPlayer).replace('{1}', data.ids),
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].NoChangeBySystemId]: (data, isUpdateVip) => (isUpdateVip ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('AlreadyUpdateVipStatus') : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('AlreadyUpdateNotVipStatus')).replace('{0}', data.numberOfPlayer),
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].NoChangeByBAStatus]: data => _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('BAPlayerNoUpdateVIP').replace('{0}', data.numberOfPlayer).replace('{1}', data.ids),
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].Avoid]: data => _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('RetractedPlayerUpdateVipStatus').replace('{0}', data.numberOfPlayer).replace('{1}', data.ids),
    [_constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].InvalidExternalId]: data => _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('InvalidPlayerUpdateVipStatusByExternalId').replace('{0}', data.numberOfPlayer).replace('{1}', data.ids)
  }
});
_defineProperty(MessageHelper, "GetListMsgUpdateVipStatus", (msgResults, currentVipStatus, isSingleUpdate = false) => {
  const fieldName = isSingleUpdate ? 'singleUpdate' : 'multipleUpdate';
  const combinedResult = MessageHelper.combineMsgResult(msgResults);
  return combinedResult.map(_ => {
    const code = _.code;
    const msgColor = MessageHelper.MsgColors[code];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "msg-result"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: `icon ${msgColor.icon}`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: msgColor.content
    }, MessageHelper.GetMsgUpdateVipStatus[fieldName][code](_, currentVipStatus)));
  });
});
_defineProperty(MessageHelper, "combineMsgResult", msgResults => {
  const msgResultExternalIdIndex = msgResults.findIndex(_ => _.code === _constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].NoChangeByExternalId); // no change VIP status - by externalId
  if (msgResultExternalIdIndex >= 0) {
    msgResults = MessageHelper.combineMsgResultWithStatusNoChange(msgResults, msgResultExternalIdIndex);
  }
  return msgResults;
});
_defineProperty(MessageHelper, "combineMsgResultWithStatusNoChange", (msgResults, msgResultExternalIdIndex) => {
  const msgResultSystemId = msgResults.find(_ => _.code === _constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].NoChangeBySystemId); // no change VIP status - by systemId
  if (msgResultSystemId) {
    msgResultSystemId.numberOfPlayer += msgResults[msgResultExternalIdIndex].numberOfPlayer;
    msgResults.splice(msgResultExternalIdIndex, 1);
  } else {
    msgResults[msgResultExternalIdIndex].code = _constants__WEBPACK_IMPORTED_MODULE_2__["UpdateVIPStatusCode"].NoChangeBySystemId;
  }
  return msgResults;
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/sweetAlertHelper.js":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/sweetAlertHelper.js ***!
  \*****************************************************************************************************/
/*! exports provided: UpdateVipStatusAlertOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateVipStatusAlertOption", function() { return UpdateVipStatusAlertOption; });
/* harmony import */ var _gridHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gridHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/gridHelper.js");
/* harmony import */ var _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/sweetAlert */ "./www/js/source/reactpages/lib/sweetAlert.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _messageHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./messageHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/messageHelper.js");




const UpdateVipStatusAlertOption = {
  createHandlerAfterUpdateVipStatusSuccess: ({
    setSweetAlertOption,
    searchPlayer,
    selectedTabKey,
    setPagingOption,
    pagingOption,
    selectedParams
  }) => () => {
    setSweetAlertOption(null);
    searchPlayer(selectedTabKey, selectedParams, _gridHelper__WEBPACK_IMPORTED_MODULE_0__["default"].callBackToUpdatePaging({
      pagingOption,
      setPagingOption
    }));
  },
  createHandlerAfterUpdateVipStatus: ({
    setSweetAlertOption,
    handlerUpdateVipStatusSuccess,
    isUpdateVip,
    noAlertResult,
    isSingleUpdate
  }) => response => {
    let alertOpt;
    if (response.isSuccess) {
      const resultMessage = _messageHelper__WEBPACK_IMPORTED_MODULE_3__["default"].GetListMsgUpdateVipStatus(response.data, isUpdateVip, isSingleUpdate);
      alertOpt = noAlertResult ? handlerUpdateVipStatusSuccess(resultMessage) : Object(_jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_1__["generateDefaultAlertOption"])(resultMessage, handlerUpdateVipStatusSuccess, null, _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_1__["predefinedIcons"].success);
      !noAlertResult && setSweetAlertOption(alertOpt);
    } else {
      const message = _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('ErrorProcessingMsg');
      alertOpt = Object(_jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_1__["generateDefaultAlertOption"])(message, () => setSweetAlertOption(null), null, _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_1__["predefinedIcons"].error);
      setSweetAlertOption(alertOpt);
    }
  },
  createUpdateVipStatusConfirmProps: ({
    params,
    updateVipStatus,
    handlerAfterUpdateVipStatus
  }) => ({
    onClick: () => {
      updateVipStatus(params, handlerAfterUpdateVipStatus);
    }
  })
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/gridHandlerReducer.js":
/*!****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/reducers/gridHandlerReducer.js ***!
  \****************************************************************************************************/
/*! exports provided: sweetAlertOption, pagingOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sweetAlertOption", function() { return sweetAlertOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagingOption", function() { return pagingOption; });
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/types.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


const sweetAlertOption = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SWEET_ALERT_OPTION"]](prevState, action) {
    return action.data && _objectSpread({}, action.data);
  }
});
const pagingOption = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_PAGING_OPTION"]](prevState, action) {
    return action.data && _objectSpread({}, action.data);
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/paramHandlerReducer.js":
/*!*****************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/reducers/paramHandlerReducer.js ***!
  \*****************************************************************************************************/
/*! exports provided: selectedParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedParams", function() { return selectedParams; });
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/types.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


const selectedParams = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_SELECTED_PARAMS"]](prevState, action) {
    return action.data && _objectSpread({}, action.data);
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/playerDataReducer.js":
/*!***************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/reducers/playerDataReducer.js ***!
  \***************************************************************************************************/
/*! exports provided: playerList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerList", function() { return playerList; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const playerList = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_PLAYER_LIST"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/components/grid/CustomerClassCell.jsx":
/*!*******************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/problem-player/components/grid/CustomerClassCell.jsx ***!
  \*******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomerClassCell; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_popup_Popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/popup/Popup */ "./www/js/source/reactpages/components/popup/Popup.jsx");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



class CustomerClassCell extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "showCustomerClassInformation", e => {
      this.setState({
        isShowCustomerClassInformation: true
      });
      e.stopPropagation();
      return false;
    });
    _defineProperty(this, "closeCustomerClassInfomation", () => {
      this.setState({
        isShowCustomerClassInformation: false
      });
    });
    _defineProperty(this, "clickOnPopup", e => {
      e.stopPropagation();
      return false;
    });
    this.state = {
      isShowCustomerClassInformation: false
    };
  }
  render() {
    var url = "CustomerClass/CustomerClassInformation?time=" + new Date().getTime();
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.props.cell.text, "\xA0\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "icon-info",
      onClick: this.showCustomerClassInformation
    }), this.state.isShowCustomerClassInformation ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_popup_Popup__WEBPACK_IMPORTED_MODULE_2__["default"], {
      width: 1000,
      height: 600,
      isShow: "true",
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSingleResource('CustomerClassInformation'),
      onClose: this.closeCustomerClassInfomation,
      onClick: this.clickOnPopup,
      isHtml: "false",
      iframeUrl: url
    }) : "");
  }
}

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/filterAction.js":
/*!************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/filterAction.js ***!
  \************************************************************************************************************************/
/*! exports provided: setSelectedVipOption, setSelectedCustomerClass, setSelectedRiskLevel, setDateRange, setSelectedCurrency, setUsername, setSubsidiaryList, setSubsidiarySearch, setSelectedParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedVipOption", function() { return setSelectedVipOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedCustomerClass", function() { return setSelectedCustomerClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedRiskLevel", function() { return setSelectedRiskLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDateRange", function() { return setDateRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedCurrency", function() { return setSelectedCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUsername", function() { return setUsername; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSubsidiaryList", function() { return setSubsidiaryList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSubsidiarySearch", function() { return setSubsidiarySearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedParams", function() { return setSelectedParams; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/types.js");
/* harmony import */ var _jsroot_actions_dateRangeAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/actions/dateRangeAction */ "./www/js/source/reactpages/actions/dateRangeAction.js");
/* harmony import */ var _jsroot_actions_currencyAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/currencyAction */ "./www/js/source/reactpages/actions/currencyAction.js");
/* harmony import */ var _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/actions/usernameAction */ "./www/js/source/reactpages/actions/usernameAction.js");
/* harmony import */ var _actions_paramHanlderAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../actions/paramHanlderAction */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/paramHanlderAction.js");
/* harmony import */ var _jsroot_actions_subsidiaryAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/actions/subsidiaryAction */ "./www/js/source/reactpages/actions/subsidiaryAction.js");






const setSelectedVipOption = option => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_VIP_OPTION"],
    data: option
  };
};
const setSelectedCustomerClass = selectedCustomerClass => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_CUSTOMERCLASS"],
    data: selectedCustomerClass
  };
};
const setSelectedRiskLevel = selectedRiskLevel => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_RISKLEVEL"],
    data: selectedRiskLevel
  };
};
const setDateRange = _jsroot_actions_dateRangeAction__WEBPACK_IMPORTED_MODULE_1__["setDateRange"];
const setSelectedCurrency = _jsroot_actions_currencyAction__WEBPACK_IMPORTED_MODULE_2__["setSelectedCurrency"];
const setUsername = _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_3__["setUsername"];
const setSubsidiaryList = _jsroot_actions_subsidiaryAction__WEBPACK_IMPORTED_MODULE_5__["setSubsidiaryList"];
const setSubsidiarySearch = _jsroot_actions_subsidiaryAction__WEBPACK_IMPORTED_MODULE_5__["setSubsidiarySearch"];
const setSelectedParams = _actions_paramHanlderAction__WEBPACK_IMPORTED_MODULE_4__["setSelectedParams"];

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/index.js":
/*!*****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/index.js ***!
  \*****************************************************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/actions/loaderAction */ "./www/js/source/reactpages/actions/loaderAction.js");
/* harmony import */ var _filterAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterAction */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/filterAction.js");
/* harmony import */ var _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/actions/usernameAction */ "./www/js/source/reactpages/actions/usernameAction.js");
/* harmony import */ var _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/actions/userGuideAction */ "./www/js/source/reactpages/actions/userGuideAction.js");
/* harmony import */ var _actions_playerDataAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../actions/playerDataAction */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/playerDataAction.js");
/* harmony import */ var _actions_gridHandlerAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../actions/gridHandlerAction */ "./www/js/source/reactpages/pages/customer/player-segmentation/actions/gridHandlerAction.js");






const ActionCreators = Object.assign({}, _jsroot_actions_loaderAction__WEBPACK_IMPORTED_MODULE_0__, _filterAction__WEBPACK_IMPORTED_MODULE_1__, _jsroot_actions_usernameAction__WEBPACK_IMPORTED_MODULE_2__, _actions_playerDataAction__WEBPACK_IMPORTED_MODULE_4__, _actions_gridHandlerAction__WEBPACK_IMPORTED_MODULE_5__, _jsroot_actions_userGuideAction__WEBPACK_IMPORTED_MODULE_3__);

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/types.js":
/*!*****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/types.js ***!
  \*****************************************************************************************************************/
/*! exports provided: SET_SELECTED_VIP_OPTION, SET_SELECTED_CUSTOMERCLASS, SET_SELECTED_RISKLEVEL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_VIP_OPTION", function() { return SET_SELECTED_VIP_OPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_CUSTOMERCLASS", function() { return SET_SELECTED_CUSTOMERCLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_RISKLEVEL", function() { return SET_SELECTED_RISKLEVEL; });
const SET_SELECTED_VIP_OPTION = 'SET_SELECTED_VIP_OPTION';
const SET_SELECTED_CUSTOMERCLASS = "SET_SELECTED_CUSTOMERCLASS";
const SET_SELECTED_RISKLEVEL = "SET_SELECTED_RISKLEVEL";

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/AppContainer.jsx":
/*!****************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/AppContainer.jsx ***!
  \****************************************************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/Loader */ "./www/js/source/reactpages/components/Loader.jsx");
/* harmony import */ var _jsroot_components_sweet_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/sweet-alert */ "./www/js/source/reactpages/components/sweet-alert/index.jsx");
/* harmony import */ var _FormFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FormFilter */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/FormFilter.jsx");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Content */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/Content.jsx");
/* harmony import */ var _FormAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FormAction */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/FormAction.jsx");







const AppContainer = props => {
  const {
    isLoading,
    sweetAlertOption
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "vip-player-management"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
    isLoading: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormFilter__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormAction__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_5__["default"], null), sweetAlertOption && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_sweet_alert__WEBPACK_IMPORTED_MODULE_3__["default"], sweetAlertOption));
};
function mapStateToProps(state) {
  const {
    isLoading,
    sweetAlertOption
  } = state;
  return Object.assign({
    isLoading,
    sweetAlertOption
  });
}
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(AppContainer));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/Content.jsx":
/*!***********************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/Content.jsx ***!
  \***********************************************************************************************************************/
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
/* harmony import */ var _components_GridCaption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/GridCaption */ "./www/js/source/reactpages/pages/customer/player-segmentation/components/GridCaption.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/DataGrid.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/index.js");
/* harmony import */ var _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../lib/helpers/gridHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/gridHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }








const Content = props => {
  const {
    playerCount,
    selectedParams,
    selectedTabKey,
    searchPlayer,
    pagingOption,
    setPagingOption
  } = props;
  if (pagingOption.TotalItem == null) {
    return null;
  }
  const _handlePaging = (pageIndex, pageSize) => {
    const sortInfo = _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getSortInfoFromPagingOption(pagingOption);
    const params = _objectSpread(_objectSpread(_objectSpread({}, selectedParams), sortInfo), {
      pageIndex,
      pageSize
    });
    searchPlayer(selectedTabKey, params, _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_7__["default"].callBackToUpdatePaging({
      pagingOption,
      setPagingOption
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "result-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_GridCaption__WEBPACK_IMPORTED_MODULE_4__["default"], {
    playerCount: playerCount
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_3__["Pager"], {
    pageOption: pagingOption,
    onPaging: _handlePaging
  }));
};
function mapDispatchToProps(dispatch) {
  const {
    searchPlayer,
    setPagingOption
  } = _actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    searchPlayer,
    setPagingOption
  }, dispatch);
}
function mapStateToProps(state) {
  const {
    pagingOption,
    selectedParams,
    playerList,
    selectedTabKey
  } = state;
  const playerCount = pagingOption.TotalItem || playerList && playerList.length || 0;
  return Object.assign({}, {
    pagingOption,
    selectedParams,
    selectedTabKey,
    playerCount
  });
}
;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Content));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/DataGrid.jsx":
/*!************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/DataGrid.jsx ***!
  \************************************************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _grid_PlayerRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./grid/PlayerRow */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/grid/PlayerRow.jsx");
/* harmony import */ var _jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/NoDataTitle */ "./www/js/source/reactpages/components/NoDataTitle.jsx");
/* harmony import */ var _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../lib/helpers/gridHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/gridHelper.js");
/* harmony import */ var _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/helpers/gridHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/helpers/gridHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
const _excluded = ["isSelected"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }











const MAX_WIDTH_PAGE = 1920;
const DataGrid = props => {
  const MAX_WIDTH = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);
  const {
    isCheckAll,
    playerList,
    pagingOption,
    selectedParams,
    selectedTabKey,
    isLoading,
    setPlayerList,
    setPagingOption,
    searchPlayer
  } = props;
  const hasVipManagementEdit = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_10__["default"].HasVipManagementEdit;
  if (playerList == null) {
    return null;
  }
  if (!playerList.length) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_NoDataTitle__WEBPACK_IMPORTED_MODULE_7__["default"], null);
  }
  const showSubsidiary = _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_8__["default"].isShowSubsidiary(selectedParams.subsidiarySearch);
  const _dataGridHeaders = [{
    key: 'CheckAll',
    text: null,
    colWidth: 30,
    childComponent: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_5__["default"], {
      id: "IsCheckAll",
      checked: isCheckAll,
      onChange: checked => {
        const newPlayerList = playerList.map(_ => {
          return _objectSpread(_objectSpread({}, _), {
            isSelected: checked && !_.isBA
          });
        });
        setPlayerList(newPlayerList);
      }
    })
  }, ...Object(_lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_9__["getDataGridHeaders"])(showSubsidiary)];
  if (!hasVipManagementEdit) {
    _dataGridHeaders.forEach(function (header, index) {
      header['childComponent'] && delete header['childComponent'];
    });
  }
  const _renderDataSection = dataList => dataList.map((dataItem, index) => {
    const {
        isSelected
      } = dataItem,
      rest = _objectWithoutProperties(dataItem, _excluded);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grid_PlayerRow__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({}, rest, {
      index: index,
      showSubsidiary: showSubsidiary,
      hasVipManagementEdit: hasVipManagementEdit
    }));
  });
  const _handleSort = (orderCol, sortType) => {
    const sortInfo = _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getSortInfo(orderCol, sortType);
    const _pagingOption = _objectSpread(_objectSpread({}, pagingOption), sortInfo);
    const params = _objectSpread(_objectSpread({}, selectedParams), _pagingOption);
    searchPlayer(selectedTabKey, params, _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_8__["default"].callBackToUpdatePaging({
      pagingOption,
      setPagingOption
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_4__["Table"], {
    minWidth: 650,
    autoWidth: true,
    maxWidth: MAX_WIDTH,
    autoHeight: true,
    header: _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_8__["default"].renderHeader(_dataGridHeaders),
    body: _renderDataSection(playerList),
    containerPadding: 30,
    shouldResetScrollPosition: isLoading,
    onSort: _handleSort
  }));
};
function mapDispatchToProps(dispatch) {
  const {
    searchPlayer,
    setPlayerList,
    setPagingOption,
    setSelectedPlayer
  } = _actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setPlayerList,
    setPagingOption,
    searchPlayer,
    setSelectedPlayer
  }, dispatch);
}
function mapStateToProps(state) {
  const {
    playerList,
    selectedParams,
    selectedTabKey,
    pagingOption,
    isLoading
  } = state;
  const isCheckAll = playerList && !playerList.some(_ => !(_.isSelected || _.isBA));
  return Object.assign({}, {
    playerList,
    isCheckAll,
    pagingOption,
    selectedParams,
    selectedTabKey,
    isLoading
  });
}
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(DataGrid)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/FormAction.jsx":
/*!**************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/FormAction.jsx ***!
  \**************************************************************************************************************************/
/*! exports provided: FormAction, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormAction", function() { return FormAction; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_components_radio_RadioGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/radio/RadioGroup */ "./www/js/source/reactpages/components/radio/RadioGroup.jsx");
/* harmony import */ var _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/lib/excel */ "./www/js/source/reactpages/lib/excel.js");
/* harmony import */ var _jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/lib/htmlHelper */ "./www/js/source/reactpages/lib/htmlHelper.js");
/* harmony import */ var _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/lib/sweetAlert */ "./www/js/source/reactpages/lib/sweetAlert.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/index.js");
/* harmony import */ var _components_DropzoneUpload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/DropzoneUpload */ "./www/js/source/reactpages/pages/customer/player-segmentation/components/DropzoneUpload.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/constants.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../lib/constants */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/constants.js");
/* harmony import */ var _lib_helpers_excelHelper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/helpers/excelHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/helpers/excelHelper.js");
/* harmony import */ var _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../lib/helpers/gridHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/gridHelper.js");
/* harmony import */ var _lib_helpers_sweetAlertHelper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../lib/helpers/sweetAlertHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/sweetAlertHelper.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _lib_queryService__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../lib/queryService */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/queryService.js");


















const FormAction = props => {
  const {
    isActiveTaggingAction,
    playerList,
    updateVipStatus,
    setSweetAlertOption,
    selectedParams,
    selectedTabKey,
    pagingOption,
    setPagingOption,
    searchPlayer
  } = props;
  const [displayUploadDropzone, setDisplayUploadDropzone] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [isActivateVIP, setIsActivateVIP] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [resultMsgSubmitVipListFile, setResultMsgSubmitVipListFile] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const [uploadFileOption, setUploadFileOption] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_11__["UploadFileOptionValue"].byExternalId);
  const hasVipManagementEdit = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_15__["default"].HasVipManagementEdit;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    resultMsgSubmitVipListFile && setDisplayUploadDropzone(false);
  }, [selectedParams]);
  const _handleCloseAlert = () => {
    setSweetAlertOption(null);
  };
  const _cancelProps = {
    onClick: _handleCloseAlert
  };
  const _getParams = isVip => {
    const selectedPlayers = playerList.filter(_ => _.isSelected);
    const systemIds = selectedPlayers.map(_ => _.systemId);
    const params = {
      systemIds: systemIds.join(),
      isVip
    };
    return params;
  };
  const _buildAlertOptionUpdateVipStatus = (params, isUpdateVip, noAlertResult, handlerUpdateVipStatusSuccess) => {
    const confirmMessage = isUpdateVip ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("ConfirmActivateVIPPlayer") : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("ConfirmDeactivateVIPPlayer");
    handlerUpdateVipStatusSuccess = handlerUpdateVipStatusSuccess || _lib_helpers_sweetAlertHelper__WEBPACK_IMPORTED_MODULE_14__["UpdateVipStatusAlertOption"].createHandlerAfterUpdateVipStatusSuccess(props);
    const handlerAfterUpdateVipStatus = _lib_helpers_sweetAlertHelper__WEBPACK_IMPORTED_MODULE_14__["UpdateVipStatusAlertOption"].createHandlerAfterUpdateVipStatus({
      setSweetAlertOption,
      handlerUpdateVipStatusSuccess,
      isUpdateVip,
      noAlertResult
    });
    const confirmProps = _lib_helpers_sweetAlertHelper__WEBPACK_IMPORTED_MODULE_14__["UpdateVipStatusAlertOption"].createUpdateVipStatusConfirmProps({
      params,
      updateVipStatus,
      handlerAfterUpdateVipStatus
    });
    const confirmOptions = Object(_jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_7__["generateDefaultConfirmOption"])(confirmMessage, _handleCloseAlert, confirmProps, _cancelProps, _jsroot_lib_sweetAlert__WEBPACK_IMPORTED_MODULE_7__["predefinedIcons"].warning, {
      height: 210
    });
    return confirmOptions;
  };
  const _handleActivateVip = event => {
    event.preventDefault();
    const params = _getParams(true);
    const alertOption = _buildAlertOptionUpdateVipStatus(params, true, false);
    setSweetAlertOption(alertOption);
  };
  const _handleDeactivateVip = event => {
    event.preventDefault();
    const params = _getParams(false);
    const alertOption = _buildAlertOptionUpdateVipStatus(params, false, false);
    setSweetAlertOption(alertOption);
  };
  const _handleDisplayUploadDropzone = type => {
    if (type === _lib_constants__WEBPACK_IMPORTED_MODULE_10__["ActionType"].Deactived && isActivateVIP || type === _lib_constants__WEBPACK_IMPORTED_MODULE_10__["ActionType"].Actived && !isActivateVIP) {
      setDisplayUploadDropzone(true);
    } else {
      setDisplayUploadDropzone(!displayUploadDropzone);
    }
    setIsActivateVIP(type === _lib_constants__WEBPACK_IMPORTED_MODULE_10__["ActionType"].Actived);
    setResultMsgSubmitVipListFile(null);
  };
  const _handleActiveVipStatusFromFile = params => {
    const handlerUpdateVipStatusSuccess = resultMessage => {
      setSweetAlertOption(null);
      setResultMsgSubmitVipListFile(resultMessage);
      searchPlayer(selectedTabKey, selectedParams, _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_13__["default"].callBackToUpdatePaging({
        pagingOption,
        setPagingOption
      }));
    };
    const alertOption = _buildAlertOptionUpdateVipStatus(params, isActivateVIP, true, handlerUpdateVipStatusSuccess);
    setSweetAlertOption(alertOption);
  };
  const _onSubmitVipListFile = files => {
    const file = files[0];
    _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_5__["default"].process(() => {
      _jsroot_lib_excel__WEBPACK_IMPORTED_MODULE_5__["default"].read(file, 0, result => {
        const {
          header,
          content
        } = result;
        if (!_lib_helpers_excelHelper__WEBPACK_IMPORTED_MODULE_12__["default"].isValidHeader(header) || !_lib_helpers_excelHelper__WEBPACK_IMPORTED_MODULE_12__["default"].isValidContent(content)) {
          alert(Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_6__["decode"])(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("UploadFileError")));
          return;
        }
        const byExternalId = uploadFileOption == _lib_constants__WEBPACK_IMPORTED_MODULE_11__["UploadFileOptionValue"].byExternalId;
        const selectedColumn = header[0];
        if (!selectedColumn) {
          alert(Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_6__["decode"])(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("UploadFileError")));
          return;
        }
        if (content.map(_ => _[selectedColumn]).length > _lib_constants__WEBPACK_IMPORTED_MODULE_10__["MaxBatchUpdateVIPPlayer"]) {
          alert(Object(_jsroot_lib_htmlHelper__WEBPACK_IMPORTED_MODULE_6__["decode"])(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("MaxBatchUpdateVIPPlayerError")));
          return;
        }
        const value = content.map(_ => _[selectedColumn]).join();
        const params = {
          [byExternalId ? 'externalIds' : 'systemIds']: value,
          isVip: isActivateVIP
        };
        _handleActiveVipStatusFromFile(params);
      });
    });
  };
  const _handleDownloadTemplateExcel = event => {
    event.preventDefault();
    _lib_queryService__WEBPACK_IMPORTED_MODULE_16__["default"].downloadVipPlayerListTemplateExcel({
      uploadBy: uploadFileOption
    });
  };
  const _renderExtraInfoDropzoneUploadFile = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_radio_RadioGroup__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: 'UploadByOptions',
      value: uploadFileOption,
      options: _lib_constants__WEBPACK_IMPORTED_MODULE_11__["UploadFileOptions"],
      onChange: setUploadFileOption
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      onClick: _handleDownloadTemplateExcel
    }, "*", _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('ClickHere')), "\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('ToDowloadTemplate'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, `*${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource('MaximumUploadFileSize')}: ${1} MB`)));
  };
  const _renderDropzoneUploadFile = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_DropzoneUpload__WEBPACK_IMPORTED_MODULE_9__["default"], {
      multiple: false,
      accept: '.xls,.xlsx',
      maxSize: 1,
      onClose: () => _handleDisplayUploadDropzone(_lib_constants__WEBPACK_IMPORTED_MODULE_10__["ActionType"].Closed),
      onSubmit: _onSubmitVipListFile,
      isShowInnerZone: !resultMsgSubmitVipListFile,
      isActive: isActivateVIP,
      tabType: _lib_constants__WEBPACK_IMPORTED_MODULE_11__["TabType"].VipPlayerManagement,
      key: isActivateVIP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, resultMsgSubmitVipListFile ? resultMsgSubmitVipListFile : _renderExtraInfoDropzoneUploadFile()));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-action"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "action"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn",
    disabled: !isActiveTaggingAction || !hasVipManagementEdit,
    onClick: _handleActivateVip
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("ActivateVip"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "action"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn",
    onClick: _handleDeactivateVip,
    disabled: !isActiveTaggingAction || !hasVipManagementEdit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("DeactivateVip"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "action"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn",
    onClick: () => _handleDisplayUploadDropzone(_lib_constants__WEBPACK_IMPORTED_MODULE_10__["ActionType"].Actived),
    disabled: !hasVipManagementEdit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("ActivateListOfPlayers"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "action"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn",
    onClick: () => _handleDisplayUploadDropzone(_lib_constants__WEBPACK_IMPORTED_MODULE_10__["ActionType"].Deactived),
    disabled: !hasVipManagementEdit
  }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getSingleResource("DeactivateListOfPlayers")))), displayUploadDropzone && _renderDropzoneUploadFile());
};
function mapDispatchToProps(dispatch) {
  const {
    searchPlayer,
    updateVipStatus,
    setSweetAlertOption,
    setPagingOption
  } = _actions__WEBPACK_IMPORTED_MODULE_8__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    searchPlayer,
    updateVipStatus,
    setSweetAlertOption,
    setPagingOption
  }, dispatch);
}
function mapStateToProps(state) {
  const {
    playerList,
    selectedParams,
    selectedTabKey,
    pagingOption
  } = state;
  const isActiveTaggingAction = playerList && playerList.length && playerList.some(_ => _.isSelected);
  return Object.assign({}, {
    isActiveTaggingAction,
    playerList,
    selectedParams,
    selectedTabKey,
    pagingOption
  });
}
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(FormAction)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/FormFilter.jsx":
/*!**************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/FormFilter.jsx ***!
  \**************************************************************************************************************************/
/*! exports provided: FormFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFilter", function() { return FormFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @legion-lib/react-multiselect */ "./node_modules/@legion-lib/react-multiselect/dist/index.js");
/* harmony import */ var _legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/auto-complete */ "./www/js/source/reactpages/components/auto-complete/index.jsx");
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var _jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/collapsible-panel */ "./www/js/source/reactpages/components/collapsible-panel/index.jsx");
/* harmony import */ var _jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/UserGuide */ "./www/js/source/reactpages/components/UserGuide.jsx");
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");
/* harmony import */ var _jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/lib/stringHelper */ "./www/js/source/reactpages/lib/stringHelper.js");
/* harmony import */ var _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/lib/site */ "./www/js/source/reactpages/lib/site.js");
/* harmony import */ var _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/lib/AppData */ "./www/js/source/reactpages/lib/AppData.js");
/* harmony import */ var _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/lib/DataService.js */ "./www/js/source/reactpages/lib/DataService.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../actions */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../lib/constants */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/constants.js");
/* harmony import */ var _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @jsroot/constants/report */ "./www/js/source/reactpages/constants/report.js");
/* harmony import */ var _lib_helpers_dataSourceHelper__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../lib/helpers/dataSourceHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/dataSourceHelper.js");
/* harmony import */ var _lib_helpers_paramHelper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../lib/helpers/paramHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/helpers/paramHelper.js");
/* harmony import */ var _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../lib/helpers/gridHelper */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/helpers/gridHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




















class FormFilter extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);
    _defineProperty(this, "_submit", event => {
      event.preventDefault();
      const params = _lib_helpers_paramHelper__WEBPACK_IMPORTED_MODULE_18__["default"].ToAPIParams(this.props);
      if (!params) {
        return;
      }
      this.props.setSelectedParams(params);
      this.props.searchPlayer(this.props.selectedTabKey, params, _lib_helpers_gridHelper__WEBPACK_IMPORTED_MODULE_19__["default"].callBackToUpdatePaging(this.props));
    });
    _defineProperty(this, "exportExcel", event => {
      event.preventDefault();
      const {
        selectedParams,
        pagingOption
      } = this.props;
      if (!selectedParams) {
        return;
      }
      const params = _objectSpread(_objectSpread({}, selectedParams), pagingOption);
      _jsroot_lib_DataService_js__WEBPACK_IMPORTED_MODULE_13__["default"].getFile(_lib_constants__WEBPACK_IMPORTED_MODULE_15__["Url"].exportVipPlayerList, params).then(response => {
        const NoContentStatusCode = 204;
        if (response.status === NoContentStatusCode) {
          alert(_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("NoInfo"));
        } else {
          var filename = "VipPlayerList.xls";
          var disposition = response.headers["content-disposition"];
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
          _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_11__["default"].downloadFile(response.data, filename);
        }
      });
    });
    _defineProperty(this, "showUserGuide", () => {
      const userGuideContent = this.props.userGuideContent;
      if (!userGuideContent || userGuideContent.length === 0) {
        this.props.getUserGuideContent('PlayerSegmentationVIP');
      }
    });
    _defineProperty(this, "_onChangeSubsidiaryList", (currentItem, selectedItemsKey, treeViewList) => {
      this.props.setSubsidiaryList(selectedItemsKey);
    });
  }
  _renderVipOptionSelectList() {
    const {
      selectedVipOption,
      setSelectedVipOption,
      selectedTabKey
    } = this.props;
    const vipOptions = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"][selectedTabKey].vipOptions;
    return vipOptions && vipOptions.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
      instanceId: "VipOptions",
      isSearchable: false,
      value: selectedVipOption,
      options: vipOptions,
      onChange: item => setSelectedVipOption(item.value)
    });
  }
  _renderCurrencySelectList() {
    const {
      selectedCurrency,
      selectedTabKey
    } = this.props;
    const currencyList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"][selectedTabKey].currencyList;
    const dataSource = _lib_helpers_dataSourceHelper__WEBPACK_IMPORTED_MODULE_17__["default"].CreateDataSourceFrom(currencyList, selectedCurrency);
    return currencyList && currencyList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4___default.a, {
      id: "permissionCurrency",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].currentLanguage,
      dataSource: dataSource,
      keyField: "key",
      valueField: "value",
      statusField: "status",
      onChange: (_, selectedItemsKey) => this.props.setSelectedCurrency(selectedItemsKey)
    });
  }
  _renderUserGuide() {
    const userGuideContent = this.props.userGuideContent;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_UserGuide__WEBPACK_IMPORTED_MODULE_8__["default"], {
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("UserGuide"),
      contentTitle: `${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("PlayerSegmentation")} / ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource('VipPlayerManagement')}`,
      onClick: this.showUserGuide,
      content: userGuideContent
    });
  }
  _renderStickyFooter() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "icon-excel right",
      onClick: this.exportExcel,
      title: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("ExportToExcel")
    }), this._renderUserGuide());
  }
  _renderSubsidiaryTreeView() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4__["TreeViewSelect"], {
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].currentLanguage,
      id: "SubsidiaryTreeView",
      dataSource: _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"].subsidiaryList,
      keyField: "Value",
      valueField: "Name",
      statusField: "Checked",
      texts: {
        SelectOptions: "Please select",
        All: "All",
        SelectedItemCount: "# selected"
      },
      isAllTextShown: false,
      hasSearchBox: false,
      treeViewOption: _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_16__["TreeViewOption"],
      onChange: this._onChangeSubsidiaryList
    });
  }
  _renderRiskLevelSelectList() {
    const {
      selectedRiskLevel,
      selectedTabKey
    } = this.props;
    const riskLevelList = _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"][selectedTabKey].riskLevelList;
    const dataSource = _lib_helpers_dataSourceHelper__WEBPACK_IMPORTED_MODULE_17__["default"].CreateDataSourceFrom(riskLevelList, selectedRiskLevel);
    return riskLevelList && riskLevelList.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_legion_lib_react_multiselect__WEBPACK_IMPORTED_MODULE_4___default.a, {
      id: "ddlRiskLevel",
      language: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].currentLanguage,
      dataSource: dataSource,
      keyField: "key",
      valueField: "value",
      statusField: "status",
      onChange: (_, selectedItemsKey) => {
        this.props.setSelectedRiskLevel(selectedItemsKey);
        var customerClassSelected = riskLevelList.filter(r => selectedItemsKey.includes(r.key)).map(r => r.customerClassList).join(',');
        this.props.setSelectedCustomerClass(customerClassSelected);
      }
    });
  }
  render() {
    const isDisabledSubmit = this.props.subsidiarySearch && _jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_10__["default"].isEmptyOrWhiteSpace(this.props.selectedSubsidiary) || _jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_10__["default"].isEmptyOrWhiteSpace(this.props.selectedCurrency) || _jsroot_lib_stringHelper__WEBPACK_IMPORTED_MODULE_10__["default"].isEmptyOrWhiteSpace(this.props.selectedCustomerClass);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_collapsible_panel__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: "page-filter",
      stickyFooter: this._renderStickyFooter()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row"
    }, _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"].viewType !== _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_16__["SubsidiaryViewType"].NOT_MANAGEMENT && this.props.subsidiarySearch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-2 col-sm-3 col-lg-3 col-xl-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"].viewType === _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_16__["SubsidiaryViewType"].MASTER_MANAGEMENT ? _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("WhiteLabel") : _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Subsidiary")), this._renderSubsidiaryTreeView())), _jsroot_lib_AppData__WEBPACK_IMPORTED_MODULE_12__["default"].viewType !== _jsroot_constants_report__WEBPACK_IMPORTED_MODULE_16__["SubsidiaryViewType"].NOT_MANAGEMENT && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-2 col-sm-2 col-lg-2 col-xl-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_6__["default"], {
      id: "SubsidiarySearch",
      checked: this.props.subsidiarySearch,
      onChange: checked => this.props.setSubsidiarySearch(checked),
      label: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("SubsidiarySearch")
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-2 col-sm-3 col-lg-4 col-xl-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("VIP2")), this._renderVipOptionSelectList())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-4 col-sm-3 col-lg-3 col-xl-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Username")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_auto_complete__WEBPACK_IMPORTED_MODULE_5__["default"], {
      onSelect: value => this.props.setUsername(value),
      onInput: value => this.props.setUsername(value),
      htmlAttributes: {
        placeholder: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("ExternalIdOrSystemId")
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-2 col-sm-3 col-lg-3 col-xl-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Currency")), this._renderCurrencySelectList())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "label-text"
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("RiskLevel")), this._renderRiskLevelSelectList())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-md-3 col-sm-3 col-lg-2 col-xl-1"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "button-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn btn-submit",
      disabled: isDisabledSubmit,
      onClick: this._submit
    }, _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getSingleResource("Submit")))))));
  }
}
function mapDispatchToProps(dispatch) {
  const {
    setDateRange,
    setSelectedVipOption,
    setUsername,
    setSelectedCurrency,
    setSelectedParams,
    searchPlayer,
    setPagingOption,
    setSubsidiaryList,
    getUserGuideContent,
    setSubsidiarySearch,
    setSelectedCustomerClass,
    setSelectedRiskLevel
  } = _actions__WEBPACK_IMPORTED_MODULE_14__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(Object.assign({}, {
    setSelectedVipOption,
    setDateRange,
    setUsername,
    setSelectedCurrency,
    setSelectedParams,
    searchPlayer,
    setPagingOption,
    setSubsidiaryList,
    getUserGuideContent,
    setSubsidiarySearch,
    setSelectedCustomerClass,
    setSelectedRiskLevel
  }), dispatch);
}
function mapStateToProps(state) {
  const {
    dateRange,
    selectedVipOption,
    selectedCurrency,
    selectedParams,
    username,
    pagingOption,
    selectedTabKey,
    userGuideContent,
    selectedSubsidiary,
    subsidiarySearch,
    selectedCustomerClass,
    selectedRiskLevel
  } = state;
  return Object.assign({}, {
    selectedVipOption,
    dateRange,
    selectedCurrency,
    username,
    selectedParams,
    pagingOption,
    selectedTabKey,
    userGuideContent,
    selectedSubsidiary,
    subsidiarySearch,
    selectedCustomerClass,
    selectedRiskLevel
  });
}
;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FormFilter));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/grid/PlayerRow.jsx":
/*!******************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/grid/PlayerRow.jsx ***!
  \******************************************************************************************************************************/
/*! exports provided: PlayerRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerRow", function() { return PlayerRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SelectionCell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SelectionCell */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/grid/SelectionCell.jsx");
/* harmony import */ var _components_VipSwitcherCell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/VipSwitcherCell */ "./www/js/source/reactpages/pages/customer/player-segmentation/components/VipSwitcherCell.jsx");




const PlayerRow = props => {
  const {
    subsidiary,
    externalId,
    systemId,
    riskLevel,
    isBA,
    index,
    custId,
    showSubsidiary,
    hasVipManagementEdit
  } = props;
  const canEditVip = hasVipManagementEdit && !isBA;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    key: `player_row_${custId}`
  }, canEditVip ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SelectionCell__WEBPACK_IMPORTED_MODULE_2__["default"], {
    rowIndex: index
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], null), showSubsidiary && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align"
  }, subsidiary), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align"
  }, externalId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align"
  }, systemId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "left-align"
  }, riskLevel), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_VipSwitcherCell__WEBPACK_IMPORTED_MODULE_3__["default"], {
    index: index,
    hasVipManagementEdit: hasVipManagementEdit
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(PlayerRow));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/grid/SelectionCell.jsx":
/*!**********************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/grid/SelectionCell.jsx ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @9softstudio/react-grid */ "./node_modules/@9softstudio/react-grid/dist/index.js");
/* harmony import */ var _9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/CheckBox */ "./www/js/source/reactpages/components/CheckBox.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






const SelectionCell = props => {
  const {
    rowIndex,
    playerList,
    setPlayerList
  } = props;
  const dataItem = playerList[rowIndex];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_grid__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
    className: "center-align"
  }, !dataItem.isMarkVoid && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CheckBox__WEBPACK_IMPORTED_MODULE_2__["default"], {
    id: `selectPlayer_${dataItem.custId}`,
    checked: dataItem.isSelected === true,
    onChange: checked => {
      const newDataItem = _objectSpread(_objectSpread({}, dataItem), {
        isSelected: checked
      });
      const newPlayerList = [...playerList];
      newPlayerList[rowIndex] = newDataItem;
      setPlayerList([...newPlayerList]);
    }
  }));
};
function mapDispatchToProps(dispatch) {
  const {
    setPlayerList
  } = _actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])({
    setPlayerList
  }, dispatch);
}
function mapStateToProps(state) {
  const {
    playerList
  } = state;
  return Object.assign({}, {
    playerList
  });
}
;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(SelectionCell)));

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/index.js":
/*!*********************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/index.js ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/AppContainer.jsx */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/components/AppContainer.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/lib/store */ "./www/js/source/reactpages/lib/store.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/reducers/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/constants */ "./www/js/source/reactpages/pages/customer/player-segmentation/lib/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






const initialState = _objectSpread(_objectSpread({}, window.initialState[_lib_constants__WEBPACK_IMPORTED_MODULE_5__["tabKeys"].vipPlayerManagement]), {
  userGuideContent: '',
  pagingOption: {
    PageIndex: 1,
    PageSize: 500,
    PageList: [500, 1000, 1500, 2000],
    TotalItem: null
  }
});
/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    selectedTabKey
  } = props;
  const defaultState = _objectSpread(_objectSpread({}, initialState), {
    selectedTabKey
  });
  const store = _jsroot_lib_store__WEBPACK_IMPORTED_MODULE_3__["default"].createStore(_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], defaultState);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
    store: store
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null));
});

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/constants.js":
/*!*****************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/constants.js ***!
  \*****************************************************************************************************************/
/*! exports provided: dataGridHeaders, Url, ExcelReaderColumn, ActionType, MaxBatchUpdateVIPPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataGridHeaders", function() { return dataGridHeaders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Url", function() { return Url; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelReaderColumn", function() { return ExcelReaderColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionType", function() { return ActionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaxBatchUpdateVIPPlayer", function() { return MaxBatchUpdateVIPPlayer; });
/* harmony import */ var _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/lib/langHelper */ "./www/js/source/reactpages/lib/langHelper.js");

const dataGridHeaders = [{
  key: 'subsidiary',
  text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('Subsidiary'),
  colWidth: 100
}, {
  key: 'externalId',
  text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('ExternalId'),
  sortBy: 'externalId',
  colWidth: 100
}, {
  key: 'systemId',
  text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('SystemId'),
  sortBy: 'systemId',
  colWidth: 100
}, {
  key: 'riskLevel',
  text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('RiskLevel'),
  sortBy: 'riskLevel',
  colWidth: 100
}, {
  key: 'vip',
  text: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('VIP2'),
  colWidth: 100
}];
const Url = {
  vipPlayerListTemplate: 'PlayerSegmentation/DowloadVipListTemplate',
  exportVipPlayerList: 'Api/PlayerSegmentation/ExportVipPlayerList'
};
const ExcelReaderColumn = {
  SystemId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('SystemId'),
  ExternalId: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('ExternalId'),
  RiskLevel: _jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingleResource('RiskLevel')
};
const ActionType = {
  Closed: 0,
  Actived: 1,
  Deactived: 2
};
const MaxBatchUpdateVIPPlayer = 2000;

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/helpers/excelHelper.js":
/*!***************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/helpers/excelHelper.js ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExcelHelper; });
class ExcelHelper {
  static getColumnName(header, readerColumn) {
    if (!header || !header.length) {
      return null;
    }
    const columnName = header.find(_ => _ && _ === readerColumn);
    return columnName;
  }
  static isValidHeader(header) {
    return header && header.length == 1;
  }
  static isValidContent(content) {
    return content && content.length > 0;
  }
}

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/helpers/gridHelper.js":
/*!**************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/helpers/gridHelper.js ***!
  \**************************************************************************************************************************/
/*! exports provided: getDataGridHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataGridHeaders", function() { return getDataGridHeaders; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/constants.js");

const getDataGridHeaders = showSubsidiary => {
  const fullHeaders = [..._constants__WEBPACK_IMPORTED_MODULE_0__["dataGridHeaders"]];
  if (!showSubsidiary) {
    const headerIndex = _constants__WEBPACK_IMPORTED_MODULE_0__["dataGridHeaders"].findIndex(_ => _.key === 'subsidiary');
    fullHeaders.splice(headerIndex, 1);
  }
  return fullHeaders;
};

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/helpers/paramHelper.js":
/*!***************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/lib/helpers/paramHelper.js ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParamHelper; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class ParamHelper {
  static ToAPIParams({
    selectedParams,
    username,
    selectedCurrency,
    selectedVipOption,
    selectedSubsidiary,
    subsidiarySearch,
    selectedCustomerClass,
    pagingOption
  }) {
    return _objectSpread(_objectSpread({}, selectedParams), {
      username,
      currencyIdList: selectedCurrency,
      vipOption: selectedVipOption,
      subsidiaryList: subsidiarySearch ? selectedSubsidiary : '',
      subsidiarySearch,
      customerClass: selectedCustomerClass,
      orderCol: pagingOption.orderCol,
      sortType: pagingOption.sortType
    });
  }
}

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/reducers/filterReducer.js":
/*!**************************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/reducers/filterReducer.js ***!
  \**************************************************************************************************************************/
/*! exports provided: selectedVipOption, selectedCustomerClass, selectedRiskLevel, dateRange, selectedCurrency, username, selectedSubsidiary, subsidiarySearch, selectedParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedVipOption", function() { return selectedVipOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedCustomerClass", function() { return selectedCustomerClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedRiskLevel", function() { return selectedRiskLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateRange", function() { return dateRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedCurrency", function() { return selectedCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "username", function() { return username; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedSubsidiary", function() { return selectedSubsidiary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subsidiarySearch", function() { return subsidiarySearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedParams", function() { return selectedParams; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/actions/types.js");
/* harmony import */ var _jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _jsroot_reducers_dateRangeReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/reducers/dateRangeReducer */ "./www/js/source/reactpages/reducers/dateRangeReducer.js");
/* harmony import */ var _jsroot_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/reducers/currencyReducer */ "./www/js/source/reactpages/reducers/currencyReducer.js");
/* harmony import */ var _jsroot_reducers_usernameReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/reducers/usernameReducer */ "./www/js/source/reactpages/reducers/usernameReducer.js");
/* harmony import */ var _jsroot_reducers_subsidiaryReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/reducers/subsidiaryReducer */ "./www/js/source/reactpages/reducers/subsidiaryReducer.js");
/* harmony import */ var _reducers_paramHandlerReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../reducers/paramHandlerReducer */ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/paramHandlerReducer.js");







const selectedVipOption = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_VIP_OPTION"]](state, action) {
    return action.data;
  }
});
const selectedCustomerClass = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_CUSTOMERCLASS"]](state, action) {
    return action.data;
  }
});
const selectedRiskLevel = Object(_jsroot_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_SELECTED_RISKLEVEL"]](state, action) {
    return action.data;
  }
});
const dateRange = _jsroot_reducers_dateRangeReducer__WEBPACK_IMPORTED_MODULE_2__["dateRange"];
const selectedCurrency = _jsroot_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_3__["selectedCurrency"];
const username = _jsroot_reducers_usernameReducer__WEBPACK_IMPORTED_MODULE_4__["username"];
const selectedSubsidiary = _jsroot_reducers_subsidiaryReducer__WEBPACK_IMPORTED_MODULE_5__["selectedSubsidiary"];
const subsidiarySearch = _jsroot_reducers_subsidiaryReducer__WEBPACK_IMPORTED_MODULE_5__["subsidiarySearch"];
const selectedParams = _reducers_paramHandlerReducer__WEBPACK_IMPORTED_MODULE_6__["selectedParams"];

/***/ }),

/***/ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/reducers/index.js":
/*!******************************************************************************************************************!*\
  !*** ./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/reducers/index.js ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/reducers/loaderReducer */ "./www/js/source/reactpages/reducers/loaderReducer.js");
/* harmony import */ var _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/reducers/userGuideReducer */ "./www/js/source/reactpages/reducers/userGuideReducer.js");
/* harmony import */ var _filterReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filterReducer */ "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/vip-player-management/reducers/filterReducer.js");
/* harmony import */ var _reducers_playerDataReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../reducers/playerDataReducer */ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/playerDataReducer.js");
/* harmony import */ var _reducers_gridHandlerReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../reducers/gridHandlerReducer */ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/gridHandlerReducer.js");
/* harmony import */ var _reducers_tabHandlerReducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../reducers/tabHandlerReducers */ "./www/js/source/reactpages/pages/customer/player-segmentation/reducers/tabHandlerReducers.js");







/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_jsroot_reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_1__, _filterReducer__WEBPACK_IMPORTED_MODULE_3__, _reducers_playerDataReducer__WEBPACK_IMPORTED_MODULE_4__, _reducers_gridHandlerReducer__WEBPACK_IMPORTED_MODULE_5__, _reducers_tabHandlerReducers__WEBPACK_IMPORTED_MODULE_6__, _jsroot_reducers_userGuideReducer__WEBPACK_IMPORTED_MODULE_2__)));

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

/***/ "./www/js/source/reactpages/reducers/dateRangeReducer.js":
/*!***************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/dateRangeReducer.js ***!
  \***************************************************************/
/*! exports provided: dateRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateRange", function() { return dateRange; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const dateRange = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_DATE_RANGE"]](state, action) {
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

/***/ "./www/js/source/reactpages/reducers/subsidiaryReducer.js":
/*!****************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/subsidiaryReducer.js ***!
  \****************************************************************/
/*! exports provided: selectedSubsidiary, subsidiarySearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedSubsidiary", function() { return selectedSubsidiary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subsidiarySearch", function() { return subsidiarySearch; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");


const selectedSubsidiary = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["SET_SUBSIDIARY_LIST"]](prevState, action) {
    return action.data;
  }
});
const subsidiarySearch = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(false, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["SET_SUBSIDIARY_SEARCH"]](prevState, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/reducers/userGuideReducer.js":
/*!***************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/userGuideReducer.js ***!
  \***************************************************************/
/*! exports provided: userGuideContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userGuideContent", function() { return userGuideContent; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const userGuideContent = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["USER_GUIDE_CONTENT"]](state, action) {
    return action.data;
  }
});

/***/ }),

/***/ "./www/js/source/reactpages/reducers/usernameReducer.js":
/*!**************************************************************!*\
  !*** ./www/js/source/reactpages/reducers/usernameReducer.js ***!
  \**************************************************************/
/*! exports provided: username */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "username", function() { return username; });
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/types */ "./www/js/source/reactpages/actions/types.js");
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/createReducer.js */ "./www/js/source/reactpages/lib/createReducer.js");


const username = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(null, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_0__["SET_USERNAME"]](state, action) {
    return action.data;
  }
});

/***/ })

}]);
//# sourceMappingURL=vipPlayerManagement.11c29c81fbb650b10669.chunk.js.map