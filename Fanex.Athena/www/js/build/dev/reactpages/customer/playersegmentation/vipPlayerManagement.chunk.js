(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["customer/playersegmentation/vipPlayerManagement"],{

/***/ "./node_modules/@legion-lib/react-multiselect/dist/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@legion-lib/react-multiselect/dist/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ "./node_modules/react/index.js")):undefined}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(t,n){t.exports=e},function(e,t,n){e.exports=n(11)()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={"en-US":{All:"All",SelectedItemCount:"# selected",SelectOptions:"Select options",SearchData:"Search data"},"zh-TW":{All:"全部",SelectedItemCount:"已選  # 個項目",SelectOptions:"選擇一個選項",SearchData:"搜寻数据"},"zh-CN":{All:"全部",SelectedItemCount:"已选  # 个项目",SelectOptions:"选择一个选项",SearchData:"搜寻数据"},"zh-Hans":{All:"全部",SelectedItemCount:"已选  # 个项目",SelectOptions:"选择一个选项",SearchData:"搜寻数据"}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),o=u(a),i=u(n(1)),l=u(n(2));function u(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),r(t,[{key:"render",value:function(){return o.default.createElement("button",{type:"button",className:"multiple-select-default multiple-select-label",onClick:this.props.onToggle},o.default.createElement("span",{className:"text-display",title:this.selectedItemsString},this.selectedItemsString),o.default.createElement("b",{className:"caret"}))}},{key:"selectedItemsString",get:function(){var e=this.props,t=e.selectedItems,n=e.maxDisplayItemCount,r=t.map(function(e){return e.value}),a=this.props.texts||l.default[this.props.language],o=a.SelectOptions,i=r.length;return this.props.isAllTextShown&&i==this.props.dataSourceSize?o=a.All:i>=n?o=a.SelectedItemCount.replace("#",i):i>=1&&(o=r.join(", ")),o}}]),t}();c.propTypes={language:i.default.string,selectedItems:i.default.arrayOf(i.default.object).isRequired,maxDisplayItemCount:i.default.number,texts:i.default.object},c.defaultProps={language:"en-US",maxDisplayItemCount:3},t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=c(o),l=c(n(1)),u=c(n(5));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onCollapse=function(e,t){var a=n.props,o=a.dataSource,i=a.onCollapse,l=[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(o));!function e(n){for(var a=function(a){var o=n[a],i=l.findIndex(function(e){return e.key===o.key});l[i]=r({},l[i],{visible:!t});var u=l.filter(function(e){return e.parentKey===o.key});u.length>0&&e(u)},o=0;o<n.length;o++)a(o)}(o.filter(function(t){return t.parentKey===e.key})),i&&i(l)},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"_renderOptionList",value:function(){var e=this,t=this.props,n=t.dataSource,r=t.onChange,a=t.id,o=t.treeViewOption;return n&&n.length?n.map(function(t,l){var c=n.filter(function(e){return e.parentKey===t.key}).length>0;return t.visible&&i.default.createElement(u.default,{id:a+"-optionItem-"+l,key:a+"optionItem"+l,itemData:t,onChange:r,hasChildren:c,treeViewOption:o,onCollapse:e.onCollapse})}):i.default.createElement("span",null,"No information")}},{key:"render",value:function(){return i.default.createElement("ul",{className:"multiple-select-options"},this._renderOptionList())}}]),t}();s.propTypes={dataSource:l.default.arrayOf(l.default.object).isRequired,id:l.default.oneOfType([l.default.number,l.default.string]).isRequired,onChange:l.default.func,treeViewOption:l.default.shape({childrenField:l.default.string,keyField:l.default.string,valueField:l.default.string,statusField:l.default.string,indent:l.default.number,includeSelectedParentKey:l.default.bool})},t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=u(o),l=u(n(1));function u(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onCollapse=function(e){e.preventDefault(),n.setState(function(e){return{isCollapse:!e.isCollapse}},function(){var e=n.props,t=e.itemData,r=e.onCollapse;r&&r(t,n.state.isCollapse)})},n.onChange=function(e){e.stopPropagation();var t=n.props,a=t.itemData,o=t.onChange,i=r({},a,{checked:!a.checked});o&&o(i)},n.state={isCollapse:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"render",value:function(){var e=this.props,t=e.itemData,n=e.id,r=e.treeViewOption,a=e.hasChildren,o=t.value,l=t.checked,u=t.level,c=t.valueDecoration,s="multiple-select-item "+(r?"treeview-select-item":"")+" level-"+u,f=r?{paddingLeft:u*r.indent}:null,d=this.state.isCollapse?"treeview-caret collapse":"treeview-caret",p="option-label"+(c?" "+c:"");return i.default.createElement("li",{className:s,style:f},!!r&&a&&i.default.createElement("button",{className:"btnCaretOption",onClick:this.onCollapse},i.default.createElement("b",{className:d})),i.default.createElement("input",{id:n,type:"checkbox",className:"option-checkbox",checked:l,onChange:this.onChange}),i.default.createElement("label",{className:p,htmlFor:n},o))}}]),t}();c.propTypes={itemData:l.default.object.isRequired,id:l.default.oneOfType([l.default.number,l.default.string]).isRequired,onChange:l.default.func,treeViewOption:l.default.shape({childrenField:l.default.string,keyField:l.default.string,valueField:l.default.string,statusField:l.default.string,indent:l.default.number,includeSelectedParentKey:l.default.bool})},t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),o=c(a),i=c(n(1)),l=c(n(5)),u=c(n(2));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.changeHandler=function(e){var t=e.checked;n.props.onChange&&n.props.onChange(t)},n.itemData={key:"All",value:u.default[n.props.language].All},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),r(t,[{key:"render",value:function(){var e=this.props,t=e.id,n=e.checked;return this.itemData.checked=n,o.default.createElement("ul",{className:"multiple-select-options multiple-select-option-all"},o.default.createElement(l.default,{id:t+"-optionItemAll",itemData:this.itemData,onChange:this.changeHandler}))}}]),t}();s.propTypes={language:i.default.string,onChange:i.default.func,id:i.default.oneOfType([i.default.number,i.default.string]).isRequired,checked:i.default.bool},s.defaultProps={language:"en-US",checked:!1},t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=i(n(0)),o=i(n(2));function i(e){return e&&e.__esModule?e:{default:e}}var l=a.default.forwardRef(function(e,t){var n=e.onClearSearch,i=e.onChangeSearchText,l=e.language,u=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["onClearSearch","onChangeSearchText","language"]),c=o.default[l].SearchData;return a.default.createElement("div",{style:{width:"100%",position:"relative"}},a.default.createElement("input",r({autoFocus:!0,ref:t,type:"text",placeholder:c,style:{width:"100%",border:"1px solid #ccc",padding:"5px 10px",boxSizing:"border-box"},onChange:function(e){return i(e.target.value)}},u)),a.default.createElement("button",{type:"button",onClick:n,style:{position:"absolute",display:"inline-block",right:2,border:0,padding:0,margin:"5px",backgroundColor:"transparent",cursor:"pointer",outline:"none",height:16,width:16}},a.default.createElement("span",{className:"close"})))});t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.KEY_NAME="key",a=t.VALUE_NAME="value",o=t.STATUS_NAME="checked",i=t.SUBLIST_NAME="subList";t.defaultTreeViewOption={childrenField:i,keyField:r,valueField:a,statusField:o,indent:30,includeSelectedParentKey:!0,useOriginalDataSource:!1}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TreeViewSelect=void 0;var r=o(n(10)),a=o(n(13));function o(e){return e&&e.__esModule?e:{default:e}}t.default=r.default,t.TreeViewSelect=a.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=d(o),l=d(n(1)),u=d(n(3)),c=d(n(4)),s=d(n(6)),f=d(n(7));function d(e){return e&&e.__esModule?e:{default:e}}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h="key",y="value",g="checked",v=1;var b=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChangeHandler=function(e){var t,a=n.props,o=a.keyField,i=a.valueField,l=a.statusField,u=(p(t={},o,e.key),p(t,i,e.value),p(t,l,e.checked),t),c=n.state.dataSource.map(function(t){return t.key===e.key?r({},t,{checked:e.checked}):t});n.setState({dataSource:c},function(){return n._callBackToParent(u)})},n.onToggle=function(){n.setState(function(e){return{showOptionList:!e.showOptionList}},function(){n.searchInputBox.current&&n.state.showOptionList&&n.searchInputBox.current.focus()})},n.checkAllHandler=function(e){var t=n.state.dataSource.map(function(t){return t.checked!==e?r({},t,{checked:e}):t});n.setState({dataSource:t},function(){n._callBackToParent(null)})},n.onChangeSearchText=function(e){var t=n.state.dataSource.map(function(t){var n=t[y]&&t[y].toLowerCase(),a=e&&e.toLowerCase(),o=-1!==n.indexOf(a);return t.visible!==o?r({},t,{visible:o}):t});n.setState({searchText:e,dataSource:t})},n.onClearSearch=function(){n.onChangeSearchText("")},n._close=function(){n.setState({showOptionList:!1})},n._handleDocumentClick=function(e){n.wrapper&&!n.wrapper.contains(e.target)&&n.state.showOptionList&&n._close()},n.searchInputBox=i.default.createRef(),n.id="multiple-select-"+(e.id||v++),n.state={originalDataSource:null,searchText:"",showOptionList:!1,dataSource:[]},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"componentDidMount",value:function(){document.addEventListener("click",this._handleDocumentClick)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this._handleDocumentClick)}},{key:"_callBackToParent",value:function(e){var t=this._getSelectedItemKey();this.props.onChange&&this.props.onChange(e,t)}},{key:"_getSelectedItemKey",value:function(){for(var e=[],t=this.state.dataSource,n=0;n<t.length;n++){var r=t[n];r.checked&&e.push(r.key)}return e.join(",")}},{key:"_renderOptionAll",value:function(){if(this.props.hasAllOption){var e=this.state.dataSource.filter(function(e){return e.checked}).length===this.state.dataSource.length;return i.default.createElement(s.default,{id:this.id,checked:e,language:this.props.language,onChange:this.checkAllHandler})}return null}},{key:"_renderSearchBox",value:function(){return this.props.hasSearchBox?i.default.createElement(f.default,{language:this.props.language,onChangeSearchText:this.onChangeSearchText,value:this.state.searchText,onClearSearch:this.onClearSearch,ref:this.searchInputBox}):null}},{key:"render",value:function(){var e=this,t=this.props.maxDisplayItemCount;return i.default.createElement("div",{className:"multiple-select-container",id:this.id,ref:function(t){return e.wrapper=t}},i.default.createElement(u.default,{language:this.props.language,selectedItems:this.selectedItems,dataSourceSize:this.state.dataSource.length,onToggle:this.onToggle,texts:this.props.texts,isAllTextShown:this.props.isAllTextShown,maxDisplayItemCount:t}),i.default.createElement("div",{className:"multiple-select-default multiple-select-options-container",style:{display:this.state.showOptionList?"block":"none"}},this._renderSearchBox(),this._renderOptionAll(),i.default.createElement(c.default,{id:this.id,dataSource:this.state.dataSource,onChange:this.onChangeHandler})))}},{key:"selectedItems",get:function(){return this.state.dataSource.filter(function(e){return e.checked})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.dataSource!==t.originalDataSource?{originalDataSource:e.dataSource,dataSource:function(e){var t=e.keyField,n=e.valueField,r=e.statusField;return e.dataSource.map(function(e){var a;return p(a={},h,e[t]),p(a,y,e[n]),p(a,g,e[r]),p(a,"valueDecoration",e.valueDecoration),p(a,"visible",!0),a})}(e)}:null}}]),t}();b.propTypes={language:l.default.string,dataSource:l.default.arrayOf(l.default.object).isRequired,keyField:l.default.string,valueField:l.default.string,statusField:l.default.string,maxDisplayItemCount:l.default.number,onChange:l.default.func,hasAllOption:l.default.bool,hasSearchBox:l.default.bool,isAllTextShown:l.default.bool,texts:l.default.object},b.defaultProps={language:"en-US",keyField:h,valueField:y,statusField:g,hasAllOption:!0,hasSearchBox:!1},t.default=b},function(e,t,n){"use strict";var r=n(12);function a(){}e.exports=function(){function e(e,t,n,a,o,i){if(i!==r){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=a,n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=h(o),l=h(n(1)),u=h(n(3)),c=h(n(4)),s=h(n(6)),f=h(n(7)),d=n(8),p=n(14);function h(e){return e&&e.__esModule?e:{default:e}}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=1,v=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));b.call(n),n.searchInputBox=i.default.createRef(),n.id="multiple-select-"+(e.id||g++);var r=n._isUseOriginalDataSource()?n.props.dataSource:(0,p.convertDataSourceToState)(n.props);return n.state={originalDataSource:n.props.dataSource,searchText:"",showOptionList:!1,dataSource:r},n.indexByKey=n._createIndexByKey(r),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"componentDidMount",value:function(){document.addEventListener("click",this._handleDocumentClick)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this._handleDocumentClick)}},{key:"componentDidUpdate",value:function(e,t){if(this.props.dataSource!==e.dataSource){var n=this.props.dataSource,r={originalDataSource:n,dataSource:this._isUseOriginalDataSource()?n:(0,p.convertDataSourceToState)(this.props)};this.setState(r),this.indexByKey=this._createIndexByKey(r.dataSource)}}},{key:"_createIndexByKey",value:function(e){return e.reduce(function(e,t,n){return e[t.key]=n,e},{})}},{key:"_isUseOriginalDataSource",value:function(){var e=this.props.treeViewOption;return!(!e||!e.useOriginalDataSource)}},{key:"_callBackToParent",value:function(e){var t=this._getSelectedItemKey();this.props.onChange&&this.props.onChange(e,t,this.state.dataSource)}},{key:"_getSelectedItemKey",value:function(){for(var e=this.props.treeViewOption,t=(e&&r({},d.defaultTreeViewOption,e)||d.defaultTreeViewOption).includeSelectedParentKey,n=[],a=this.state.dataSource,o=function(e){var r=a[e],o=a.filter(function(e){return e.parentKey===r.key}).length>0;!r.checked||!t&&o||n.push(r.key)},i=0;i<a.length;i++)o(i);return n.join(",")}},{key:"_renderOptionAll",value:function(){if(this.props.hasAllOption){var e=this.state.dataSource.filter(function(e){return e.checked}).length===this.state.dataSource.length;return i.default.createElement(s.default,{id:this.id,checked:e,language:this.props.language,onChange:this.checkAllHandler})}return null}},{key:"_renderSearchBox",value:function(){return this.props.hasSearchBox?i.default.createElement(f.default,{language:this.props.language,onChangeSearchText:this.onChangeSearchText,value:this.state.searchText,onClearSearch:this.onClearSearch,ref:this.searchInputBox}):null}},{key:"render",value:function(){var e=this,t=this.props,n=t.maxDisplayItemCount,a=t.treeViewOption,o=a&&r({},d.defaultTreeViewOption,a)||r({},d.defaultTreeViewOption);return i.default.createElement("div",{className:"multiple-select-container",id:this.id,ref:function(t){return e.wrapper=t}},i.default.createElement(u.default,{language:this.props.language,selectedItems:this.selectedItems,dataSourceSize:this.state.dataSource.length,onToggle:this.onToggle,texts:this.props.texts,isAllTextShown:this.props.isAllTextShown,maxDisplayItemCount:n}),i.default.createElement("div",{className:"multiple-select-default multiple-select-options-container",style:{display:this.state.showOptionList?"block":"none"}},this._renderSearchBox(),this._renderOptionAll(),i.default.createElement(c.default,{id:this.id,dataSource:this.state.dataSource,onChange:this.onChangeHandler,treeViewOption:o,onCollapse:this.handleCollapse})))}},{key:"selectedItems",get:function(){var e=this._getSelectedItemKey().split(",");return this.state.dataSource.filter(function(t){return e.includes(t.key)})}}]),t}();v.propTypes={language:l.default.string,dataSource:l.default.arrayOf(l.default.object).isRequired,keyField:l.default.string,valueField:l.default.string,statusField:l.default.string,maxDisplayItemCount:l.default.number,onChange:l.default.func,hasAllOption:l.default.bool,hasSearchBox:l.default.bool,isAllTextShown:l.default.bool,texts:l.default.object,treeViewOption:l.default.shape({childrenField:l.default.string,keyField:l.default.string,valueField:l.default.string,statusField:l.default.string,indent:l.default.number,includeSelectedParentKey:l.default.bool,useOriginalDataSource:l.default.bool})},v.defaultProps={language:"en-US",keyField:d.KEY_NAME,valueField:d.VALUE_NAME,statusField:d.STATUS_NAME,hasAllOption:!0,hasSearchBox:!1};var b=function(){var e=this;this.onChangeHandler=function(t){var n,a=e.props,o=a.keyField,i=a.valueField,l=a.statusField,u=(y(n={},o,t.key),y(n,i,t.value),y(n,l,t.checked),n),c=e.state.dataSource,s=[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(c)),f=e.indexByKey[t.key];s[f]=r({},t);var d=!!t.parentKey,p=s.filter(function(e){return e.parentKey===t.key});if(p.length>0){!function n(a){for(var o=function(o){var i=a[o],l=e.indexByKey[i.key];s[l]=r({},s[l],{checked:t.checked});var u=s.filter(function(e){return e.parentKey===i.key});u.length>0&&n(u)},i=0;i<a.length;i++)o(i)}(p)}if(d){!function t(n){var a=e.indexByKey[n.parentKey],o=s[a];if(o.checked&&!n.checked)s[a]=r({},o,{checked:!1});else if(!o.checked&&n.checked){var i=s.filter(function(e){return e.parentKey===o.key});i.filter(function(e){return e.checked}).length===i.length&&(s[a]=r({},o,{checked:!0}))}var l=s[a];l.parentKey&&t(l)}(t)}e.setState({dataSource:s},function(){return e._callBackToParent(u)})},this.onToggle=function(){e.setState(function(e){return{showOptionList:!e.showOptionList}},function(){e.searchInputBox.current&&e.state.showOptionList&&e.searchInputBox.current.focus()})},this.checkAllHandler=function(t){var n=e.state.dataSource.map(function(e){return e.checked!==t?r({},e,{checked:t}):e});e.setState({dataSource:n},function(){e._callBackToParent(null)})},this.onChangeSearchText=function(t){var n=e.state.dataSource.map(function(e){var n=e[d.VALUE_NAME]&&e[d.VALUE_NAME].toLowerCase(),a=t&&t.toLowerCase(),o=-1!==n.indexOf(a);return e.visible!==o?r({},e,{visible:o}):e});e.setState({searchText:t,dataSource:n})},this.handleCollapse=function(t){e.setState({dataSource:t})},this.onClearSearch=function(){e.onChangeSearchText("")},this._close=function(){e.setState({showOptionList:!1})},this._handleDocumentClick=function(t){e.wrapper&&!e.wrapper.contains(t.target)&&e.state.showOptionList&&e._close()}};t.default=v},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.convertDataSourceToState=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(8);function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.convertDataSourceToState=function e(t){for(var n=t.keyField,l=t.valueField,u=t.statusField,c=t.dataSource,s=t.treeViewOption,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,p=s&&r({},a.defaultTreeViewOption,s)||r({},a.defaultTreeViewOption),h=[],y=0;y<c.length;y++){var g,v=c[y],b=(i(g={},a.KEY_NAME,v[n]),i(g,a.VALUE_NAME,v[l]),i(g,a.STATUS_NAME,!!v[u]),i(g,"visible",!0),i(g,"level",d),i(g,"parentKey",f),g);if(h.push(b),p&&v[p.childrenField]){var m=v[p.childrenField],S=d+1,O=e({keyField:p.keyField,valueField:p.valueField,statusField:p.statusField,dataSource:m,treeViewOption:p},b[a.KEY_NAME],S);h.push.apply(h,o(O))}}return h}}])});

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



/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    playerCount
  } = props;
  const _buildContent = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      key: "searchResult"
    }, `${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('SearchResult')}: ${playerCount} ${_jsroot_lib_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getSingleResource('Player')}(s)`);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ReportTitle__WEBPACK_IMPORTED_MODULE_1__["default"], {
    tag: "div",
    content: _buildContent()
  });
});

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
          _jsroot_lib_site__WEBPACK_IMPORTED_MODULE_11__["default"].downloadFile(response.data, 'VipPlayerList.xls');
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
    selectedCustomerClass
  }) {
    return _objectSpread(_objectSpread({}, selectedParams), {
      username,
      currencyIdList: selectedCurrency,
      vipOption: selectedVipOption,
      subsidiaryList: subsidiarySearch ? selectedSubsidiary : '',
      subsidiarySearch,
      customerClass: selectedCustomerClass
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
//# sourceMappingURL=vipPlayerManagement.chunk.js.map