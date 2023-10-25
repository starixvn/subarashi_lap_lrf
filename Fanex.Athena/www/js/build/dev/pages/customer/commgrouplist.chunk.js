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
/******/ 		"www/js/build/dev/pages/customer/commgrouplist": 0
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
/******/ 	deferredModules.push([33,"www/js/build/dev/pages/lib/common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/js/source/components/jquery.flatpopup.js":
/*!******************************************************!*\
  !*** ./www/js/source/components/jquery.flatpopup.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($) {
    let $blockBody;
    
    const _methods = {
        init: function (inputOptions) {
            const defaultOptions = {
                width: 640,
                height: 480,
                padding: 0,
                id: 'popup-content',
                className: '',
                title: '&nbsp;',
                container: 'body',
                modal: true,
                onOpen: null,
                onOpened: null,
                onClose: null
            };

            $blockBody = $('.popup-block-body');
            const options = $.extend(defaultOptions, inputOptions || {});
            return this.each(function () {
                let $self = $(this);
                const $container = $(options.container);

                if (options.modal && $blockBody.length === 0) {
                    $blockBody = $('<div class="popup-block-body" style="display: none"></div>');
                    $container.append($blockBody);
                }
                
                const $popupElement = $('#' + options.id);
                if ($popupElement.length === 0 || $popupElement.hasClass('flat-popup') === false) {
                    $self.attr('id', options.id);
                    $self.addClass('flat-popup ' + options.className);
                    $self.children().wrapAll('<div class="wrapContent" style="padding:' + options.padding + 'px"></div>');
                    $self.hide()
                         .prepend('<div class="title-bar popup-title"><div class="txt-title">'
                             + options.title
                             + '</div><a class="popup-close" href="javascript:;"><i class="icon-close"></i></a></div>');

                    $self.find('a.popup-close').on('click', function () {
                        if (options.onClose) {
                            options.onClose.apply($self);
                        }

                        if ($self.find('iframe').length > 0) {
                            $self.find('.wrapContent').empty();
                        }
                        _methods.hide.apply($self);
                    });

                    $container.append($self);
                }
                else {
                    $self = $('#' + options.id);
                    $self.find('.txt-title').text(options.title);
                    const $wrapContent = $self.find('.wrapContent');
                    $wrapContent.append($self.children().not('.popup-title'));
                }

                $self.width(options.width);
                $self.height(options.height);

                if (options.onOpen) {
                    options.onOpen.apply($self);
                }

                _methods.show.call($self, options.modal);

                if (options.onOpened) {
                    setTimeout(options.onOpened.apply($self), 350);
                }
            });
        },

        show: function (modal) {
            const $self = this;
            //Set the center alignment padding + border see css style
            const left = ($(window).width() - $self.width()) / 2;
            let top = ($(window).height() - $self.height()) / 2;

            if (top > 300) {
                top -= 100;
            }

            $self.css({
                'top': (top < 0 ? 0 : top) + 'px',
                'left': (left < 0 ? 0 : left) + 'px'
            });

            if (modal === true || modal === undefined) {
                $blockBody.show();
            }

            $self.fadeIn(300);
        },

        hide: function () {
            $(this).fadeOut(300);
            $blockBody.hide();
            return false;
        }
    };

    $.fn.flatPopup = function (methodOrOptions) {
        if (_methods[methodOrOptions]) {
            return _methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to 'init'
            return _methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.flatPopup');
        }
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./www/js/source/components/selectlist.js":
/*!************************************************!*\
  !*** ./www/js/source/components/selectlist.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($) {
    'use strict';

    const CONTAINER_SELECTOR = '.select-list-container';
    const DISABLED_CLASS = 'disabled';
    const HIGHLIGHT_CLASS = 'highlighted';

    function getLabelHtml(option) {
        const targetDropdownId = option.selectionId + '-result-container';
        const className = option.isDisabled ? 'selection disabled' : 'selection';
        return '<div class="select-list-container">' +
                '<div class="' + className + '" id="' + option.selectionId + '" aria-targetDropdown="' + targetDropdownId + '">' +
                    '<div class="selection-label">' + option.labelText + '</div>' +
                    '<div class="selection-icon"><span class="selection-icon-arrow"></span></div>' +
                '</div>' +
            '</div>';
    }

    function getSearchBoxHtml(isShow) {
        return isShow ? '<div class="select-list-dropdown-search"><input class="select-list-search-results" autocomplete="off" /></div>' : '';
    }

    function getOptionItemHtml(dataItem) {
        return '<li class="option-item ' + dataItem.className + '" data-key="' + dataItem.key + '">' + dataItem.value + '</li>';
    }

    function getOptionListHtml(dataList) {
        const htmlArray = ['<div class="select-list-dropdown-results"><ul class="option-list">'];

        for (let i = 0; i < dataList.length; i++) {
            const dataItem = dataList[i];
            htmlArray.push(getOptionItemHtml(dataItem));
        }

        htmlArray.push('</ul></div>');

        return htmlArray.join('');
    }

    function scrollToHighLightItem($container, $item, index) {
        const itemTop = $item.offset().top;
        const itemHeight = $item.outerHeight();
        const containerTop = $container.offset().top;
        let scrollUp = null;
        if (itemTop <= containerTop) {
            scrollUp = true;
        }
        else if (itemTop >= containerTop + $container.height()) {
            scrollUp = false;
        }
        if (scrollUp === null) {
            return;
        }
        if (scrollUp) {
            $container.scrollTop(itemHeight * (index - 1) - $container.height());
        }
        else {
            $container.scrollTop(itemHeight * index);
        }
    }

    function keyUp($element) {
        const $selectList = $element.closest('.select-list-dropdown').find('.select-list-dropdown-results');
        const showOptionList = $selectList.find('.option-item:visible');
        const $highlightItem = $selectList.find('.option-item.' + HIGHLIGHT_CLASS + ':visible').first();
        const index = showOptionList.index($highlightItem);

        $highlightItem.removeClass(HIGHLIGHT_CLASS);
        if ($highlightItem.length > 0 && index !== 0) {
            const $preItem = showOptionList.eq(index - 1);
            $preItem.addClass(HIGHLIGHT_CLASS);
            scrollToHighLightItem($selectList, $preItem, index - 1);
        }
        else {
            showOptionList.last().addClass(HIGHLIGHT_CLASS);
            $selectList.scrollTop(showOptionList.length * $highlightItem.outerHeight());
        }
    }

    function keyDown($element) {
        const $selectList = $element.closest('.select-list-dropdown').find('.select-list-dropdown-results');
        const showOptionList = $selectList.find('.option-item:visible');
        const $highlightItem = $selectList.find('.option-item.' + HIGHLIGHT_CLASS + ':visible').first();
        const index = showOptionList.index($highlightItem);

        $highlightItem.removeClass(HIGHLIGHT_CLASS);
        if ($highlightItem.length > 0 && index !== (showOptionList.length - 1)) {
            const $nextItem = showOptionList.eq(index + 1);
            $nextItem.addClass(HIGHLIGHT_CLASS);
            scrollToHighLightItem($selectList, $nextItem, index + 1);
        }
        else {
            showOptionList.first().addClass(HIGHLIGHT_CLASS);
            $selectList.scrollTop(0);
        }
    }

    function keySearch($element, canEnter) {
        setTimeout(function () {
            const query = $element.val().toUpperCase();
            const $selectList = $element.closest('.select-list-dropdown').find('.select-list-dropdown-results');
            const optionList = $selectList.find('.option-item');
            let isFirstItem = canEnter;
            if (canEnter) {
                optionList.removeClass(HIGHLIGHT_CLASS);
            }
            optionList.each(function (index, item) {
                const $item = $(item);
                const currentText = $item.text().toUpperCase();
                if (currentText.indexOf(query) === -1) {
                    $item.hide();
                }
                else {
                    if (isFirstItem) {
                        $item.addClass(HIGHLIGHT_CLASS);
                        isFirstItem = false;
                        $selectList.scrollTop(0);
                    }
                    $item.show();
                }
            });
        }, 100);
    }

    function enter($element) {
        const $highlightItem = $element.closest('.select-list-dropdown').find('.option-item.' + HIGHLIGHT_CLASS + ':visible');
        $highlightItem.click();
    }

    function getDropdownList(resultContainerId, canSearch, canEnter) {
        /*jshint validthis: true*/
        const $originalSelectElement = $(this);
        const dataList = $originalSelectElement.find('option').map(function (index, item) {
            const key = item.value;
            const text = item.text;

            return { key: key, value: text, className: item.className };
        });
        const selectedValue = $originalSelectElement.val();

        const dropdownListHtml = '<div id="' + resultContainerId + '" class="select-list-result-container"><div class="select-list-dropdown">' +
                                getSearchBoxHtml(canSearch) + getOptionListHtml(dataList) +
                            '</div></div>';
        const $dropdown = $(dropdownListHtml);
        $dropdown.find('.option-item[data-key="' + selectedValue + '"]').addClass(HIGHLIGHT_CLASS);

        $dropdown.on('click', '.option-item', function () {
            $('.option-item').removeClass(HIGHLIGHT_CLASS);
            $(this).addClass(HIGHLIGHT_CLASS);
            const selectedKey = $(this).data('key');
            $originalSelectElement.val(selectedKey);

            $originalSelectElement.trigger('change');
        });

        const $searchBox = $dropdown.find('.select-list-search-results');

        $searchBox.on('click', function (e) {
            e.stopPropagation();
        });

        if (canEnter) {
            $searchBox.on('keyup', function (e) {
                const $this = $(this);
                if (e.keyCode === 40) {
                    keyDown($this);
                }
                else if (e.keyCode === 38) {
                    keyUp($this);
                }
                else if (e.keyCode === 13) {
                    enter($this);
                }
                else {
                    keySearch($this, true);
                }
            });
        }
        else {
            $searchBox.on('keyup', function () {
                const $this = $(this);
                keySearch($this, false);
            });
        }

        return $dropdown;
    }

    function generateId($element) {
        let id = '';

        if ($element.attr('id') !== null) {
            id = $element.attr('id');
        } else if ($element.attr('name') !== null) {
            id = $element.attr('name') + '-' + generateChars(2);
        } else {
            id = generateChars(4);
        }

        id = id.replace(/(:|\.|\[|\]|,)/g, '');
        id = 'select-list-' + id;

        return id;
    }

    function generateChars(length) {
        let chars = '';

        for (let i = 0; i < length; i++) {
            const randomChar = Math.floor(Math.random() * 36);
            chars += randomChar.toString(36);
        }

        return chars;
    }

    function closeAll() {
        $('.select-list-result-container').remove();
    }

    const defaultOption = {
        canSearch: false,
        canEnter: false,
        isDisabled: false,
        beforeOpen: function () { },
        afterOpen: function () { }
    };

    const _methods = {
        init: function (options) {
            const selectListOption = $.extend({}, defaultOption, options || {});

            return this.each(function () {
                const self = this;
                const $element = $(self);
                if (!selectListOption.canSearch) {
                    selectListOption.canSearch = $element.attr('data-can-search') === '1';
                }
                if (!selectListOption.canEnter) {
                    selectListOption.canEnter = $element.attr('data-can-enter') === '1';
                }

                _methods.buildLabel.call(self);

                const $container = $element.parent();
                $container.off('click', '.selection');
                $container.on('click', '.selection', function () {
                    const $selection = $(this);
                    if (!$selection.hasClass(DISABLED_CLASS)) {
                        _methods.toggle.call(self, selectListOption);
                    }
                });

                $element.on('change', function () {
                    _methods.update.call(self);
                });

                $('html').on('click', function (e) {
                    const $target = $(e.target);

                    if (!$target.closest(CONTAINER_SELECTOR).length) {
                        closeAll();
                    }
                });
            });
        },

        buildLabel: function (option) {
            const newOption = option || {};
            const $self = $(this);
            $self.siblings(CONTAINER_SELECTOR).remove();
            const optionSelected = $self.find('option:selected');
            const labelText = optionSelected.length ? optionSelected.text() : '';
            const selectionId = generateId($self);

            newOption.labelText = labelText;
            newOption.selectionId = selectionId;
            const $selectionLabel = $(getLabelHtml(newOption));

            $self.hide().parent().append($selectionLabel);
        },

        open: function (resultContainerId, canSearch, canEnter) {
            closeAll();

            const $self = $(this);
            const $dropdown = getDropdownList.call(this, resultContainerId, canSearch, canEnter);

            const $selection = $self.siblings(CONTAINER_SELECTOR).find('.selection');
            const offset = $selection.offset();
            $dropdown.css({ top: (offset.top + 26) + 'px', left: offset.left + 'px', width: $selection.width() + 'px' });

            $('body').append($dropdown);
            $dropdown.find('.select-list-search-results').focus();
        },

        close: function () {
            const $this = $(this);
            const $selection = $this.siblings(CONTAINER_SELECTOR).find('.selection');
            const resultContainerId = $selection.attr('aria-targetDropdown');
            $('#' + resultContainerId).remove();
        },

        toggle: function (option) {
            const $this = $(this);
            const $selection = $this.siblings(CONTAINER_SELECTOR).find('.selection');
            const resultContainerId = $selection.attr('aria-targetDropdown');

            if (resultContainerId && resultContainerId.length > 0) {
                const $currentDropdown = $('#' + resultContainerId);
                const isShowing = $currentDropdown.length > 0;

                if (isShowing) {
                    $currentDropdown.remove();
                }
                else {
                    if (typeof option.beforeOpen === 'function') {
                        option.beforeOpen.call(this);
                    }

                    _methods.open.call(this, resultContainerId, option.canSearch, option.canEnter);

                    if (typeof option.afterOpen === 'function') {
                        option.afterOpen.call(this);
                    }
                }
            }
        },

        update: function (option) {
            _methods.buildLabel.call(this, option);
        },

        disabled: function (isDisabled) {
            const $selection = $(this).siblings(CONTAINER_SELECTOR).find('.selection');
            $selection.toggleClass(DISABLED_CLASS, !!isDisabled);
        }
    };

    $.fn.selectList = function (methodOrOptions) {
        if (_methods[methodOrOptions]) {
            return _methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return _methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on selectList');
        }
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./www/js/source/extensions/prototype.js":
/*!***********************************************!*\
  !*** ./www/js/source/extensions/prototype.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
﻿///
///
/*
* @Alex-1/11/2013
* The below function will work adequatly for the six simple types I mentioned,
* as long as data in the objects and arrays form a tree structure.That is, there isn't
* more than one reference to the same data in the object.
*
*/

//#region String Prototype

/* jshint ignore:start */
String.prototype.format = function () {
    /// <summary>
    /// simply format method
    /// </summary>
    /// <returns type="string">formated string</returns>
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        formatted = formatted.replace("{" + i + "}", arguments[i]);
    }
    return formatted;
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};

String.prototype.ltrim = function () {
    return this.replace(/^\s*/g, '');
};

String.prototype.rtrim = function () {
    return this.replace(/\s*$/g, '');
};
String.prototype.replaceAll = function (token, newToken, ignoreCase) {
    var _token;
    var str = this + "";
    var i = -1;

    if (typeof token === "string") {
        if (ignoreCase) {
            _token = token.toLowerCase();

            while ((
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                )) !== -1
            ) {
                str = str.substring(0, i) +
                    newToken +
                    str.substring(i + token.length);
            }
        } else {
            return this.split(token).join(newToken);
        }
    }
    return str;
};

//#endregion

//#region Array prototype

Array.prototype.remove = function (value, fieldName) {
    /// <summary>
    ///
    /// Remove specific element in array
    /// </summary>
    /// <param name="value"> element or value of field in object</param>
    /// <param name="fieldName">Name of a field in object</param>
    for (var i = 0; i < this.length; ++i) {
        if (typeof this[i] == 'object' && fieldName !== undefined) {
            if (this[i][fieldName] !== undefined && this[i][fieldName] == value) {
                this.splice(i, 1);
                return;
            }
        } else {
            if (this[i] == value) {
                this.splice(i, 1);
                return;
            }
        }
    }
};
Array.prototype.insertAfter = function (value, after) {
    /// <summary>
    ///
    /// </summary>
    /// <param name="value">element</param>
    /// <param name="after">position</param>
    this.splice(after + 1, 0, value);
};
Array.prototype.insertBefore = function (value, before) {
    /// <summary>
    ///
    /// </summary>
    /// <param name="value">element</param>
    /// <param name="before">position</param>
    this.splice(before, 0, value);
};

//#endregion

/* jshint ignore:end */

/***/ }),

/***/ "./www/js/source/helpers/htmlHelper.js":
/*!*********************************************!*\
  !*** ./www/js/source/helpers/htmlHelper.js ***!
  \*********************************************/
/*! exports provided: encode, decode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode", function() { return encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return decode; });
const encode = (text) => {
    const p = document.createElement("p");
    p.textContent = text;

    return p.innerHTML;
}

const decode = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;

    return txt.value;
}

/***/ }),

/***/ "./www/js/source/lib/bootstrap-table/bootstrap-table-fixed-columns.js":
/*!****************************************************************************!*\
  !*** ./www/js/source/lib/bootstrap-table/bootstrap-table-fixed-columns.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

const Utils = $.fn.bootstrapTable.utils

// Reasonable defaults
const PIXEL_STEP = 10
const LINE_HEIGHT = 40
const PAGE_HEIGHT = 800

function normalizeWheel (event) {
  let sX = 0 // spinX
  let sY = 0 // spinY
  let pX = 0 // pixelX
  let pY = 0 // pixelY

  // Legacy
  if ('detail' in event) { sY = event.detail }
  if ('wheelDelta' in event) { sY = -event.wheelDelta / 120 }
  if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120 }
  if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120 }

  // side scrolling on FF with DOMMouseScroll
  if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
    sX = sY
    sY = 0
  }

  pX = sX * PIXEL_STEP
  pY = sY * PIXEL_STEP

  if ('deltaY' in event) { pY = event.deltaY }
  if ('deltaX' in event) { pX = event.deltaX }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode === 1) { // delta in LINE units
      pX *= LINE_HEIGHT
      pY *= LINE_HEIGHT
    } else { // delta in PAGE units
      pX *= PAGE_HEIGHT
      pY *= PAGE_HEIGHT
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) { sX = (pX < 1) ? -1 : 1 }
  if (pY && !sY) { sY = (pY < 1) ? -1 : 1 }

  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY
  }
}

$.extend($.fn.bootstrapTable.defaults, {
  fixedColumns: false,
  fixedNumber: 0,
  fixedRightNumber: 0
})

$.BootstrapTable = class extends $.BootstrapTable {

  fixedColumnsSupported () {
    return this.options.fixedColumns &&
      !this.options.detailView &&
      !this.options.cardView
  }

  initContainer () {
    super.initContainer()

    if (!this.fixedColumnsSupported()) {
      return
    }

    if (this.options.fixedNumber) {
      this.$tableContainer.append('<div class="fixed-columns"></div>')
      this.$fixedColumns = this.$tableContainer.find('.fixed-columns')
    }

    if (this.options.fixedRightNumber) {
      this.$tableContainer.append('<div class="fixed-columns-right"></div>')
      this.$fixedColumnsRight = this.$tableContainer.find('.fixed-columns-right')
    }
  }

  initBody (...args) {
    super.initBody(...args)

    if (!this.fixedColumnsSupported()) {
      return
    }

    if (this.options.showHeader && this.options.height) {
      return
    }

    this.initFixedColumnsBody()
    this.initFixedColumnsEvents()
  }

  trigger (...args) {
    super.trigger(...args)

    if (!this.fixedColumnsSupported()) {
      return
    }

    if (args[0] === 'post-header') {
      this.initFixedColumnsHeader()
    } else if (args[0] === 'scroll-body') {
      if (this.needFixedColumns && this.options.fixedNumber) {
        this.$fixedBody.scrollTop(this.$tableBody.scrollTop())
      }

      if (this.needFixedColumns && this.options.fixedRightNumber) {
        this.$fixedBodyRight.scrollTop(this.$tableBody.scrollTop())
      }
    }
  }

  updateSelected () {
    super.updateSelected()

    if (!this.fixedColumnsSupported()) {
      return
    }

    this.$tableBody.find('tr').each((i, el) => {
      const $el = $(el)
      const index = $el.data('index')
      const classes = $el.attr('class')

      const inputSelector = `[name="${this.options.selectItemName}"]`
      const $input = $el.find(inputSelector)

      if (typeof index === undefined) {
        return
      }

      const updateFixedBody = ($fixedHeader, $fixedBody) => {
        const $tr = $fixedBody.find(`tr[data-index="${index}"]`)
        $tr.attr('class', classes)

        if ($input.length) {
          $tr.find(inputSelector).prop('checked', $input.prop('checked'))
        }

        if (this.$selectAll.length) {
          $fixedHeader.add($fixedBody)
            .find('[name="btSelectAll"]')
            .prop('checked', this.$selectAll.prop('checked'))
        }
      }

      if (this.$fixedBody && this.options.fixedNumber) {
        updateFixedBody(this.$fixedHeader, this.$fixedBody)
      }

      if (this.$fixedBodyRight && this.options.fixedRightNumber) {
        updateFixedBody(this.$fixedHeaderRight, this.$fixedBodyRight)
      }
    })
  }

  hideLoading () {
    super.hideLoading()

    if (this.needFixedColumns && this.options.fixedNumber) {
      this.$fixedColumns.find('.fixed-table-loading').hide()
    }

    if (this.needFixedColumns && this.options.fixedRightNumber) {
      this.$fixedColumnsRight.find('.fixed-table-loading').hide()
    }
  }

  initFixedColumnsHeader () {
    if (this.options.height) {
      this.needFixedColumns = this.$tableHeader.outerWidth(true) < this.$tableHeader.find('table').outerWidth(true)
    } else {
      this.needFixedColumns = this.$tableBody.outerWidth(true) < this.$tableBody.find('table').outerWidth(true)
    }

    const initFixedHeader = ($fixedColumns, isRight) => {
      $fixedColumns.find('.fixed-table-header').remove()
      $fixedColumns.append(this.$tableHeader.clone(true))

      $fixedColumns.css({
        width: this.getFixedColumnsWidth(isRight)
      })
      return $fixedColumns.find('.fixed-table-header')
    }

    if (this.needFixedColumns && this.options.fixedNumber) {
      this.$fixedHeader = initFixedHeader(this.$fixedColumns)
      this.$fixedHeader.css('margin-right', '')
    } else if (this.$fixedColumns) {
      this.$fixedColumns.html('').css('width', '')
    }

    if (this.needFixedColumns && this.options.fixedRightNumber) {
      this.$fixedHeaderRight = initFixedHeader(this.$fixedColumnsRight, true)
      this.$fixedHeaderRight.scrollLeft(this.$fixedHeaderRight.find('table').width())
    } else if (this.$fixedColumnsRight) {
      this.$fixedColumnsRight.html('').css('width', '')
    }

    this.initFixedColumnsBody()
    this.initFixedColumnsEvents()
  }

  initFixedColumnsBody () {
    const initFixedBody = ($fixedColumns, $fixedHeader) => {
      $fixedColumns.find('.fixed-table-body').remove()
      $fixedColumns.append(this.$tableBody.clone(true))

      const $fixedBody = $fixedColumns.find('.fixed-table-body')

      const tableBody = this.$tableBody.get(0)
      const scrollHeight = tableBody.scrollWidth > tableBody.clientWidth
        ? Utils.getScrollBarWidth() : 0
      const height = this.$tableContainer.outerHeight(true) - scrollHeight - 1

      $fixedColumns.css({
        height
      })

      $fixedBody.css({
        height: height - $fixedHeader.height()
      })

      return $fixedBody
    }

    if (this.needFixedColumns && this.options.fixedNumber) {
      this.$fixedBody = initFixedBody(this.$fixedColumns, this.$fixedHeader)
    }

    if (this.needFixedColumns && this.options.fixedRightNumber) {
      this.$fixedBodyRight = initFixedBody(this.$fixedColumnsRight, this.$fixedHeaderRight)
      this.$fixedBodyRight.scrollLeft(this.$fixedBodyRight.find('table').width())
      this.$fixedBodyRight.css('overflow-y', this.options.height ? 'auto' : 'hidden')
    }
  }

  getFixedColumnsWidth (isRight) {
    let visibleFields = this.getVisibleFields()
    let width = 0
    let fixedNumber = this.options.fixedNumber
    let marginRight = 0

    if (isRight) {
      visibleFields = visibleFields.reverse()
      fixedNumber = this.options.fixedRightNumber
      marginRight = parseInt(this.$tableHeader.css('margin-right'), 10)
    }

    for (let i = 0; i < fixedNumber; i++) {
      width += this.$header.find(`th[data-field="${visibleFields[i]}"]`).outerWidth(true)
    }

    return width + marginRight + 1
  }

  initFixedColumnsEvents () {
    const toggleHover = (e, toggle) => {
      const tr = `tr[data-index="${$(e.currentTarget).data('index')}"]`
      let $trs = this.$tableBody.find(tr)

      if (this.$fixedBody) {
        $trs = $trs.add(this.$fixedBody.find(tr))
      }
      if (this.$fixedBodyRight) {
        $trs = $trs.add(this.$fixedBodyRight.find(tr))
      }

      $trs.css('background-color', toggle ? $(e.currentTarget).css('background-color') : '')
    }

    this.$tableBody.find('tr').hover(e => {
      toggleHover(e, true)
    }, e => {
      toggleHover(e, false)
    })

    const isFirefox = typeof navigator !== 'undefined' &&
      navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    const mousewheel = isFirefox ? 'DOMMouseScroll' : 'mousewheel'
    const updateScroll = (e, fixedBody) => {
      const normalized = normalizeWheel(e)
      const deltaY = Math.ceil(normalized.pixelY)
      const top = this.$tableBody.scrollTop() + deltaY

      if (
        deltaY < 0 && top > 0 ||
        deltaY > 0 && top < fixedBody.scrollHeight - fixedBody.clientHeight
      ) {
        e.preventDefault()
      }

      this.$tableBody.scrollTop(top)
      if (this.$fixedBody) {
        this.$fixedBody.scrollTop(top)
      }
      if (this.$fixedBodyRight) {
        this.$fixedBodyRight.scrollTop(top)
      }
    }

    if (this.needFixedColumns && this.options.fixedNumber) {
      this.$fixedBody.find('tr').hover(e => {
        toggleHover(e, true)
      }, e => {
        toggleHover(e, false)
      })

      this.$fixedBody[0].addEventListener(mousewheel, e => {
        updateScroll(e, this.$fixedBody[0])
      })
    }

    if (this.needFixedColumns && this.options.fixedRightNumber) {
      this.$fixedBodyRight.find('tr').hover(e => {
        toggleHover(e, true)
      }, e => {
        toggleHover(e, false)
      })

      this.$fixedBodyRight.off('scroll').on('scroll', () => {
        const top = this.$fixedBodyRight.scrollTop()

        this.$tableBody.scrollTop(top)
        if (this.$fixedBody) {
          this.$fixedBody.scrollTop(top)
        }
      })
    }

    if (this.options.filterControl) {
      $(this.$fixedColumns).off('keyup change').on('keyup change', e => {
        const $target = $(e.target)
        const value = $target.val()
        const field = $target.parents('th').data('field')
        const $coreTh = this.$header.find(`th[data-field="${field}"]`)

        if ($target.is('input')) {
          $coreTh.find('input').val(value)
        } else if ($target.is('select')) {
          const $select = $coreTh.find('select')
          $select.find('option[selected]').removeAttr('selected')
          $select.find(`option[value="${value}"]`).attr('selected', true)
        }

        this.triggerSearch()
      })
    }
  }

  renderStickyHeader () {
    if (!this.options.stickyHeader) {
      return
    }

    this.$stickyContainer = this.$container.find('.sticky-header-container')
    super.renderStickyHeader()

    if (this.needFixedColumns && this.options.fixedNumber) {
      this.$fixedColumns.css('z-index', 101)
        .find('.sticky-header-container')
        .css('right', '')
        .width(this.$fixedColumns.outerWidth())
    }

    if (this.needFixedColumns && this.options.fixedRightNumber) {
      const $stickyHeaderContainerRight = this.$fixedColumnsRight.find('.sticky-header-container')

      this.$fixedColumnsRight.css('z-index', 101)
      $stickyHeaderContainerRight.css('left', '')
        .scrollLeft($stickyHeaderContainerRight.find('.table').outerWidth())
        .width(this.$fixedColumnsRight.outerWidth())
    }
  }

  matchPositionX () {
    if (!this.options.stickyHeader) {
      return
    }

    this.$stickyContainer.eq(0).scrollLeft(this.$tableBody.scrollLeft())
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")))

/***/ }),

/***/ "./www/js/source/lib/bootstrap-table/bootstrap-table.js":
/*!**************************************************************!*\
  !*** ./www/js/source/lib/bootstrap-table/bootstrap-table.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/index.js */ "./www/js/source/lib/bootstrap-table/constants/index.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/index.js */ "./www/js/source/lib/bootstrap-table/utils/index.js");
/* harmony import */ var _virtual_scroll_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./virtual-scroll/index.js */ "./www/js/source/lib/bootstrap-table/virtual-scroll/index.js");
/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * version: 1.18.0
 * https://github.com/wenzhixin/bootstrap-table/
 */





class BootstrapTable {
  constructor (el, options) {
    this.options = options
    this.$el = $(el)
    this.$el_ = this.$el.clone()
    this.timeoutId_ = 0
    this.timeoutFooter_ = 0
  }

  init () {
    this.initConstants()
    this.initLocale()
    this.initContainer()
    this.initTable()
    this.initHeader()
    this.initData()
    this.initHiddenRows()
    this.initToolbar()
    this.initPagination()
    this.initBody()
    this.initSearchText()
    this.initServer()
  }

  initConstants () {
    const opts = this.options
    this.constants = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].CONSTANTS
    this.constants.theme = $.fn.bootstrapTable.theme

    const buttonsPrefix = opts.buttonsPrefix ? `${opts.buttonsPrefix}-` : ''
    this.constants.buttonsClass = [
      opts.buttonsPrefix,
      buttonsPrefix + opts.buttonsClass,
      _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(`${buttonsPrefix}%s`, opts.iconSize)
    ].join(' ').trim()

    this.buttons = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this, opts.buttons, [], [])
  }

  initLocale () {
    if (this.options.locale) {
      const locales = $.fn.bootstrapTable.locales
      const parts = this.options.locale.split(/-|_/)

      parts[0] = parts[0].toLowerCase()
      if (parts[1]) {
        parts[1] = parts[1].toUpperCase()
      }

      if (locales[this.options.locale]) {
        $.extend(this.options, locales[this.options.locale])
      } else if (locales[parts.join('-')]) {
        $.extend(this.options, locales[parts.join('-')])
      } else if (locales[parts[0]]) {
        $.extend(this.options, locales[parts[0]])
      }
    }
  }

  initContainer () {
    const topPagination = ['top', 'both'].includes(this.options.paginationVAlign)
      ? '<div class="fixed-table-pagination clearfix"></div>' : ''
    const bottomPagination = ['bottom', 'both'].includes(this.options.paginationVAlign)
      ? '<div class="fixed-table-pagination"></div>' : ''
    const loadingTemplate = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.options,
      this.options.loadingTemplate, [this.options.formatLoadingMessage()])

    this.$container = $(`
      <div class="bootstrap-table ${this.constants.theme}">
      <div class="fixed-table-toolbar"></div>
      ${topPagination}
      <div class="fixed-table-container">
      <div class="fixed-table-header"><table></table></div>
      <div class="fixed-table-body">
      <div class="fixed-table-loading">
      ${loadingTemplate}
      </div>
      </div>
      <div class="fixed-table-footer"><table><thead><tr></tr></thead></table></div>
      </div>
      ${bottomPagination}
      </div>
    `)

    this.$container.insertAfter(this.$el)
    this.$tableContainer = this.$container.find('.fixed-table-container')
    this.$tableHeader = this.$container.find('.fixed-table-header')
    this.$tableBody = this.$container.find('.fixed-table-body')
    this.$tableLoading = this.$container.find('.fixed-table-loading')
    this.$tableFooter = this.$el.find('tfoot')
    // checking if custom table-toolbar exists or not
    if (this.options.buttonsToolbar) {
      this.$toolbar = $('body').find(this.options.buttonsToolbar)
    } else {
      this.$toolbar = this.$container.find('.fixed-table-toolbar')
    }
    this.$pagination = this.$container.find('.fixed-table-pagination')

    this.$tableBody.append(this.$el)
    this.$container.after('<div class="clearfix"></div>')

    this.$el.addClass(this.options.classes)
    this.$tableLoading.addClass(this.options.classes)

    if (this.options.height) {
      this.$tableContainer.addClass('fixed-height')

      if (this.options.showFooter) {
        this.$tableContainer.addClass('has-footer')
      }

      if (this.options.classes.split(' ').includes('table-bordered')) {
        this.$tableBody.append('<div class="fixed-table-border"></div>')
        this.$tableBorder = this.$tableBody.find('.fixed-table-border')
        this.$tableLoading.addClass('fixed-table-border')
      }

      this.$tableFooter = this.$container.find('.fixed-table-footer')
    }
  }

  initTable () {
    const columns = []
    const data = []

    this.$header = this.$el.find('>thead')
    if (!this.$header.length) {
      this.$header = $(`<thead class="${this.options.theadClasses}"></thead>`).appendTo(this.$el)
    } else if (this.options.theadClasses) {
      this.$header.addClass(this.options.theadClasses)
    }

    this._headerTrClasses = []
    this._headerTrStyles = []
    this.$header.find('tr').each((i, el) => {
      const $tr = $(el)
      const column = []

      $tr.find('th').each((i, el) => {
        const $th = $(el)

        // #2014: getFieldIndex and elsewhere assume this is string, causes issues if not
        if (typeof $th.data('field') !== 'undefined') {
          $th.data('field', `${$th.data('field')}`)
        }
        column.push($.extend({}, {
          title: $th.html(),
          'class': $th.attr('class'),
          titleTooltip: $th.attr('title'),
          rowspan: $th.attr('rowspan') ? +$th.attr('rowspan') : undefined,
          colspan: $th.attr('colspan') ? +$th.attr('colspan') : undefined
        }, $th.data()))
      })
      columns.push(column)

      if ($tr.attr('class')) {
        this._headerTrClasses.push($tr.attr('class'))
      }
      if ($tr.attr('style')) {
        this._headerTrStyles.push($tr.attr('style'))
      }
    })

    if (!Array.isArray(this.options.columns[0])) {
      this.options.columns = [this.options.columns]
    }

    this.options.columns = $.extend(true, [], columns, this.options.columns)
    this.columns = []
    this.fieldsColumnsIndex = []

    _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].setFieldIndex(this.options.columns)

    this.options.columns.forEach((columns, i) => {
      columns.forEach((_column, j) => {
        const column = $.extend({}, BootstrapTable.COLUMN_DEFAULTS, _column)

        if (typeof column.fieldIndex !== 'undefined') {
          this.columns[column.fieldIndex] = column
          this.fieldsColumnsIndex[column.field] = column.fieldIndex
        }

        this.options.columns[i][j] = column
      })
    })

    // if options.data is setting, do not process tbody and tfoot data
    if (!this.options.data.length) {
      const htmlData = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].trToData(this.columns, this.$el.find('>tbody>tr'))
      if (htmlData.length) {
        this.options.data = htmlData
        this.fromHtml = true
      }
    }

    if (!(this.options.pagination && this.options.sidePagination !== 'server')) {
      this.footerData = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].trToData(this.columns, this.$el.find('>tfoot>tr'))
    }

    if (this.footerData) {
      this.$el.find('tfoot').html('<tr></tr>')
    }

    if (!this.options.showFooter || this.options.cardView) {
      this.$tableFooter.hide()
    } else {
      this.$tableFooter.show()
    }
  }

  initHeader () {
    const visibleColumns = {}
    const html = []

    this.header = {
      fields: [],
      styles: [],
      classes: [],
      formatters: [],
      detailFormatters: [],
      events: [],
      sorters: [],
      sortNames: [],
      cellStyles: [],
      searchables: []
    }

    _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].updateFieldGroup(this.options.columns)

    this.options.columns.forEach((columns, i) => {
      html.push(`<tr${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' class="%s"', this._headerTrClasses[i])} ${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' style="%s"', this._headerTrStyles[i])}>`)

      let detailViewTemplate = ''

      if (i === 0 && _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasDetailViewIcon(this.options)) {
        detailViewTemplate = `<th class="detail" rowspan="${this.options.columns.length}">
          <div class="fht-cell"></div>
          </th>`
      }

      if (detailViewTemplate && this.options.detailViewAlign !== 'right') {
        html.push(detailViewTemplate)
      }

      columns.forEach((column, j) => {
        const class_ = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' class="%s"', column['class'])
        const unitWidth = column.widthUnit
        const width = parseFloat(column.width)

        const halign = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('text-align: %s; ', column.halign ? column.halign : column.align)
        const align = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('text-align: %s; ', column.align)
        let style = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('vertical-align: %s; ', column.valign)
        style += _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('width: %s; ', (column.checkbox || column.radio) && !width
          ? (!column.showSelectTitle ? '36px' : undefined)
          : (width ? width + unitWidth : undefined))

        if (typeof column.fieldIndex === 'undefined' && !column.visible) {
          return
        }

        const headerStyle = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(null, this.options.headerStyle, [column])
        const csses = []
        let classes = ''

        if (headerStyle && headerStyle.css) {
          for (const [key, value] of Object.entries(headerStyle.css)) {
            csses.push(`${key}: ${value}`)
          }
        }
        if (headerStyle && headerStyle.classes) {
          classes = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' class="%s"', column['class'] ?
            [column['class'], headerStyle.classes].join(' ') : headerStyle.classes)
        }

        if (typeof column.fieldIndex !== 'undefined') {
          this.header.fields[column.fieldIndex] = column.field
          this.header.styles[column.fieldIndex] = align + style
          this.header.classes[column.fieldIndex] = class_
          this.header.formatters[column.fieldIndex] = column.formatter
          this.header.detailFormatters[column.fieldIndex] = column.detailFormatter
          this.header.events[column.fieldIndex] = column.events
          this.header.sorters[column.fieldIndex] = column.sorter
          this.header.sortNames[column.fieldIndex] = column.sortName
          this.header.cellStyles[column.fieldIndex] = column.cellStyle
          this.header.searchables[column.fieldIndex] = column.searchable

          if (!column.visible) {
            return
          }

          if (this.options.cardView && (!column.cardVisible)) {
            return
          }

          visibleColumns[column.field] = column
        }

        html.push(`<th${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' title="%s"', column.titleTooltip)}`,
          column.checkbox || column.radio
            ? _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' class="bs-checkbox %s"', column['class'] || '')
            : classes || class_,
          _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' style="%s"', halign + style + csses.join('; ')),
          _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' rowspan="%s"', column.rowspan),
          _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' colspan="%s"', column.colspan),
          _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' data-field="%s"', column.field),
          // If `column` is not the first element of `this.options.columns[0]`, then className 'data-not-first-th' should be added.
          j === 0 && i > 0 ? ' data-not-first-th' : '',
          '>')

        html.push(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('<div class="th-inner %s">', this.options.sortable && column.sortable
          ? 'sortable both' : ''))

        let text = this.options.escape ? _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].escapeHTML(column.title) : column.title

        const title = text
        if (column.checkbox) {
          text = ''
          if (!this.options.singleSelect && this.options.checkboxHeader) {
            text = '<label><input name="btSelectAll" type="checkbox" /><span></span></label>'
          }
          this.header.stateField = column.field
        }
        if (column.radio) {
          text = ''
          this.header.stateField = column.field
        }
        if (!text && column.showSelectTitle) {
          text += title
        }

        html.push(text)
        html.push('</div>')
        html.push('<div class="fht-cell"></div>')
        html.push('</div>')
        html.push('</th>')
      })

      if (detailViewTemplate && this.options.detailViewAlign === 'right') {
        html.push(detailViewTemplate)
      }

      html.push('</tr>')
    })

    this.$header.html(html.join(''))
    this.$header.find('th[data-field]').each((i, el) => {
      $(el).data(visibleColumns[$(el).data('field')])
    })
    this.$container.off('click', '.th-inner').on('click', '.th-inner', e => {
      const $this = $(e.currentTarget)

      if (this.options.detailView && !$this.parent().hasClass('bs-checkbox')) {
        if ($this.closest('.bootstrap-table')[0] !== this.$container[0]) {
          return false
        }
      }

      if (this.options.sortable && $this.parent().data().sortable) {
        this.onSort(e)
      }
    })

    this.$header.children().children().off('keypress').on('keypress', e => {
      if (this.options.sortable && $(e.currentTarget).data().sortable) {
        const code = e.keyCode || e.which
        if (code === 13) { // Enter keycode
          this.onSort(e)
        }
      }
    })

    const resizeEvent = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getEventName('resize.bootstrap-table', this.$el.attr('id'))
    $(window).off(resizeEvent)
    if (!this.options.showHeader || this.options.cardView) {
      this.$header.hide()
      this.$tableHeader.hide()
      this.$tableLoading.css('top', 0)
    } else {
      this.$header.show()
      this.$tableHeader.show()
      this.$tableLoading.css('top', this.$header.outerHeight() + 1)
      // Assign the correct sortable arrow
      this.getCaret()
      $(window).on(resizeEvent, () => this.resetView())
    }

    this.$selectAll = this.$header.find('[name="btSelectAll"]')
    this.$selectAll.off('click').on('click', e => {
      e.stopPropagation()
      const checked = $(e.currentTarget).prop('checked')
      this[checked ? 'checkAll' : 'uncheckAll']()
      this.updateSelected()
    })
  }

  initData (data, type) {
    if (type === 'append') {
      this.options.data = this.options.data.concat(data)
    } else if (type === 'prepend') {
      this.options.data = [].concat(data).concat(this.options.data)
    } else {
      data = data || _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].deepCopy(this.options.data)
      this.options.data = Array.isArray(data) ? data : data[this.options.dataField]
    }

    this.data = [...this.options.data]

    if (this.options.sortReset) {
      this.unsortedData = [...this.data]
    }

    if (this.options.sidePagination === 'server') {
      return
    }
    this.initSort()
  }

  initSort () {
    let name = this.options.sortName
    const order = this.options.sortOrder === 'desc' ? -1 : 1
    const index = this.header.fields.indexOf(this.options.sortName)
    let timeoutId = 0

    if (index !== -1) {
      if (this.options.sortStable) {
        this.data.forEach((row, i) => {
          if (!row.hasOwnProperty('_position')) {
            row._position = i
          }
        })
      }

      if (this.options.customSort) {
        _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.options, this.options.customSort, [
          this.options.sortName,
          this.options.sortOrder,
          this.data
        ])
      } else {
        this.data.sort((a, b) => {
          if (this.header.sortNames[index]) {
            name = this.header.sortNames[index]
          }
          const aa = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItemField(a, name, this.options.escape)
          const bb = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItemField(b, name, this.options.escape)
          const value = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.header, this.header.sorters[index], [aa, bb, a, b])

          if (value !== undefined) {
            if (this.options.sortStable && value === 0) {
              return order * (a._position - b._position)
            }
            return order * value
          }

          return _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sort(aa, bb, order, this.options.sortStable,
            a._position, b._position)
        })
      }

      if (this.options.sortClass !== undefined) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          this.$el.removeClass(this.options.sortClass)
          const index = this.$header.find(`[data-field="${this.options.sortName}"]`).index()
          this.$el.find(`tr td:nth-child(${index + 1})`).addClass(this.options.sortClass)
        }, 250)
      }
    } else if (this.options.sortReset) {
      this.data = [...this.unsortedData]
    }
  }

  onSort ({type, currentTarget}) {
    const $this = type === 'keypress' ? $(currentTarget) : $(currentTarget).parent()
    const $this_ = this.$header.find('th').eq($this.index())

    this.$header.add(this.$header_).find('span.order').remove()

    if (this.options.sortName === $this.data('field')) {
      const currentSortOrder = this.options.sortOrder

      if (currentSortOrder === undefined) {
        this.options.sortOrder = 'asc'
      } else if (currentSortOrder === 'asc') {
        this.options.sortOrder = 'desc'
      } else if (this.options.sortOrder === 'desc') {
        this.options.sortOrder = this.options.sortReset ? undefined : 'asc'
      }

      if (this.options.sortOrder === undefined) {
        this.options.sortName = undefined
      }
    } else {
      this.options.sortName = $this.data('field')
      if (this.options.rememberOrder) {
        this.options.sortOrder = $this.data('order') === 'asc' ? 'desc' : 'asc'
      } else {
        this.options.sortOrder = this.columns[this.fieldsColumnsIndex[$this.data('field')]].sortOrder ||
          this.columns[this.fieldsColumnsIndex[$this.data('field')]].order
      }
    }
    this.trigger('sort', this.options.sortName, this.options.sortOrder)

    $this.add($this_).data('order', this.options.sortOrder)

    // Assign the correct sortable arrow
    this.getCaret()

    if (this.options.sidePagination === 'server' && this.options.serverSort) {
      this.options.pageNumber = 1
      this.initServer(this.options.silentSort)
      return
    }

    this.initSort()
    this.initBody()
  }

  initToolbar () {
    const opts = this.options
    let html = []
    let timeoutId = 0
    let $keepOpen
    let switchableCount = 0

    if (this.$toolbar.find('.bs-bars').children().length) {
      $('body').append($(opts.toolbar))
    }
    this.$toolbar.html('')

    if (typeof opts.toolbar === 'string' || typeof opts.toolbar === 'object') {
      $(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('<div class="bs-bars %s-%s"></div>', this.constants.classes.pull, opts.toolbarAlign))
        .appendTo(this.$toolbar)
        .append($(opts.toolbar))
    }

    // showColumns, showToggle, showRefresh
    html = [`<div class="${[
      'columns',
      `columns-${opts.buttonsAlign}`,
      this.constants.classes.buttonsGroup,
      `${this.constants.classes.pull}-${opts.buttonsAlign}`
    ].join(' ')}">`]

    if (typeof opts.icons === 'string') {
      opts.icons = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(null, opts.icons)
    }

    if (typeof opts.buttonsOrder === 'string') {
      opts.buttonsOrder = opts.buttonsOrder.replace(/\[|\]| |'/g, '').toLowerCase().split(',')
    }

    this.buttons = Object.assign(this.buttons, {
      paginationSwitch: {
        text: opts.pagination ? opts.formatPaginationSwitchUp() : opts.formatPaginationSwitchDown(),
        icon: opts.pagination ? opts.icons.paginationSwitchDown : opts.icons.paginationSwitchUp,
        render: false,
        event: this.togglePagination,
        attributes: {
          'aria-label': opts.formatPaginationSwitch(),
          title: opts.formatPaginationSwitch()
        }
      },
      refresh: {
        text: opts.formatRefresh(),
        icon: opts.icons.refresh,
        render: false,
        event: this.refresh,
        attributes: {
          'aria-label': opts.formatRefresh(),
          title: opts.formatRefresh()
        }
      },
      toggle: {
        text: opts.formatToggle(),
        icon: opts.icons.toggleOff,
        render: false,
        event: this.toggleView,
        attributes: {
          'aria-label': opts.formatToggleOn(),
          title: opts.formatToggleOn()
        }
      },
      fullscreen: {
        text: opts.formatFullscreen(),
        icon: opts.icons.fullscreen,
        render: false,
        event: this.toggleFullscreen,
        attributes: {
          'aria-label': opts.formatFullscreen(),
          title: opts.formatFullscreen()
        }
      },
      columns: {
        render: false,
        html: (() => {
          const html = []
          html.push(`<div class="keep-open ${this.constants.classes.buttonsDropdown}" title="${opts.formatColumns()}">
            <button class="${this.constants.buttonsClass} dropdown-toggle" type="button" data-toggle="dropdown"
            aria-label="Columns" title="${opts.formatColumns()}">
            ${opts.showButtonIcons ? _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.columns) : ''}
            ${opts.showButtonText ? opts.formatColumns() : ''}
            ${this.constants.html.dropdownCaret}
            </button>
            ${this.constants.html.toolbarDropdown[0]}`)

          if (opts.showColumnsSearch) {
            html.push(
              _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.toolbarDropdownItem,
                _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('<input type="text" class="%s" name="columnsSearch" placeholder="%s" autocomplete="off">', this.constants.classes.input, opts.formatSearch())
              )
            )
            html.push(this.constants.html.toolbarDropdownSeparator)
          }

          if (opts.showColumnsToggleAll) {
            const allFieldsVisible = this.getVisibleColumns().length === this.columns.filter(column => !this.isSelectionColumn(column)).length
            html.push(
              _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.toolbarDropdownItem,
                _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('<input type="checkbox" class="toggle-all" %s> <span>%s</span>',
                  allFieldsVisible ? 'checked="checked"' : '', opts.formatColumnsToggleAll())
              )
            )

            html.push(this.constants.html.toolbarDropdownSeparator)
          }

          let visibleColumns = 0
          this.columns.forEach((column, i) => {
            if (column.visible) {
              visibleColumns++
            }
          })

          this.columns.forEach((column, i) => {
            if (this.isSelectionColumn(column)) {
              return
            }

            if (opts.cardView && !column.cardVisible) {
              return
            }

            const checked = column.visible ? ' checked="checked"' : ''
            const disabled = (visibleColumns <= opts.minimumCountColumns) && checked ? ' disabled="disabled"' : ''
            if (column.switchable) {
              html.push(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.toolbarDropdownItem,
                _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('<input type="checkbox" data-field="%s" value="%s"%s%s> <span>%s</span>',
                  column.field, i, checked, disabled, column.title)))
              switchableCount++
            }
          })
          html.push(this.constants.html.toolbarDropdown[1], '</div>')
          return html.join('')
        })
      }
    })

    const buttonsHtml = {}
    for (const [buttonName, buttonConfig] of Object.entries(this.buttons)) {
      let buttonHtml
      if (buttonConfig.hasOwnProperty('html')) {
        buttonHtml = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(opts, buttonConfig.html)
      } else {
        buttonHtml = `<button class="${this.constants.buttonsClass}" type="button" name="${buttonName}"`

        if (buttonConfig.hasOwnProperty('attributes')) {
          for (const [attributeName, value] of Object.entries(buttonConfig.attributes)) {
            buttonHtml += ` ${attributeName}="${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(opts, value)}"`
          }
        }

        buttonHtml += '>'

        if (opts.showButtonIcons && buttonConfig.hasOwnProperty('icon')) {
          const icon = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(opts, buttonConfig.icon)
          buttonHtml += _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.icon, opts.iconsPrefix, icon) + ' '
        }

        if (opts.showButtonText && buttonConfig.hasOwnProperty('text')) {
          buttonHtml += _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(opts, buttonConfig.text)
        }

        buttonHtml += '</button>'
      }

      buttonsHtml[buttonName] = buttonHtml
      const optionName = `show${buttonName.charAt(0).toUpperCase()}${buttonName.substring(1)}`
      const showOption = opts[optionName]
      if ((
        !buttonConfig.hasOwnProperty('render') ||
        buttonConfig.hasOwnProperty('render') &&
        buttonConfig.render) &&
        (showOption === undefined || showOption === true)
      ) {
        opts[optionName] = true
      }

      if (!opts.buttonsOrder.includes(buttonName)) {
        opts.buttonsOrder.push(buttonName)
      }
    }

    // Adding the button html to the final toolbar html when the showOption is true
    for (const button of opts.buttonsOrder) {
      const showOption = opts[`show${button.charAt(0).toUpperCase()}${button.substring(1)}`]
      if (showOption) {
        html.push(buttonsHtml[button])
      }
    }

    html.push('</div>')

    // Fix #188: this.showToolbar is for extensions
    if (this.showToolbar || html.length > 2) {
      this.$toolbar.append(html.join(''))
    }

    for (const [buttonName, buttonConfig] of Object.entries(this.buttons)) {
      if (buttonConfig.hasOwnProperty('event')) {
        if (typeof buttonConfig.event === 'function' || typeof buttonConfig.event === 'string') {
          const event = typeof buttonConfig.event === 'string' ? window[buttonConfig.event] : buttonConfig.event
          this.$toolbar.find(`button[name="${buttonName}"]`)
            .off('click')
            .on('click', () => event.call(this))
          continue
        }

        for (const [eventType, eventFunction] of Object.entries(buttonConfig.event)) {
          const event = typeof eventFunction === 'string' ? window[eventFunction] : eventFunction
          this.$toolbar.find(`button[name="${buttonName}"]`)
            .off(eventType)
            .on(eventType, () => event.call(this))
        }
      }
    }

    if (opts.showColumns) {
      $keepOpen = this.$toolbar.find('.keep-open')
      const $checkboxes = $keepOpen.find('input[type="checkbox"]:not(".toggle-all")')
      const $toggleAll = $keepOpen.find('input[type="checkbox"].toggle-all')

      if (switchableCount <= opts.minimumCountColumns) {
        $keepOpen.find('input').prop('disabled', true)
      }

      $keepOpen.find('li, label').off('click').on('click', e => {
        e.stopImmediatePropagation()
      })

      $checkboxes.off('click').on('click', ({currentTarget}) => {
        const $this = $(currentTarget)

        this._toggleColumn($this.val(), $this.prop('checked'), false)
        this.trigger('column-switch', $this.data('field'), $this.prop('checked'))
        $toggleAll.prop('checked', $checkboxes.filter(':checked').length === this.columns.filter(column => !this.isSelectionColumn(column)).length)
      })

      $toggleAll.off('click').on('click', ({currentTarget}) => {
        this._toggleAllColumns($(currentTarget).prop('checked'))
      })

      if (opts.showColumnsSearch) {
        const $columnsSearch = $keepOpen.find('[name="columnsSearch"]')
        const $listItems = $keepOpen.find('.dropdown-item-marker')
        $columnsSearch.on('keyup paste change', ({currentTarget}) => {
          const $this = $(currentTarget)
          const searchValue = $this.val().toLowerCase()
          $listItems.show()
          $checkboxes.each((i, el) => {
            const $checkbox = $(el)
            const $listItem = $checkbox.parents('.dropdown-item-marker')
            const text = $listItem.text().toLowerCase()
            if (!text.includes(searchValue)) {
              $listItem.hide()
            }
          })
        })
      }
    }
    const handleInputEvent = ($searchInput) => {
      const eventTriggers = 'keyup drop blur mouseup'
      $searchInput.off(eventTriggers).on(eventTriggers, event => {
        if (opts.searchOnEnterKey && event.keyCode !== 13) {
          return
        }

        if ([37, 38, 39, 40].includes(event.keyCode)) {
          return
        }

        clearTimeout(timeoutId) // doesn't matter if it's 0
        timeoutId = setTimeout(() => {
          this.onSearch({currentTarget: event.currentTarget})
        }, opts.searchTimeOut)
      })
    }
    // Fix #4516: this.showSearchClearButton is for extensions
    if (
      (opts.search || this.showSearchClearButton)
      && typeof opts.searchSelector !== 'string'
    ) {
      html = []
      const showSearchButton = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.searchButton,
        this.constants.buttonsClass,
        opts.formatSearch(),
        opts.showButtonIcons ? _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.search) : '',
        opts.showButtonText ? opts.formatSearch() : ''
      )
      const showSearchClearButton = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.searchClearButton,
        this.constants.buttonsClass,
        opts.formatClearSearch(),
        opts.showButtonIcons ? _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.clearSearch) : '',
        opts.showButtonText ? opts.formatClearSearch() : ''
      )
      const searchInputHtml = `<input class="${this.constants.classes.input}
        ${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' %s%s', this.constants.classes.inputPrefix, opts.iconSize)}
        search-input" type="search" placeholder="${opts.formatSearch()}" autocomplete="off">`
      let searchInputFinalHtml = searchInputHtml

      if (opts.showSearchButton || opts.showSearchClearButton) {
        const buttonsHtml = (opts.showSearchButton ? showSearchButton : '') +
          (opts.showSearchClearButton ? showSearchClearButton : '')

        searchInputFinalHtml = opts.search ? _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.inputGroup,
          searchInputHtml, buttonsHtml) : buttonsHtml
      }

      html.push(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(`
        <div class="${this.constants.classes.pull}-${opts.searchAlign} search ${this.constants.classes.inputGroup}">
          %s
        </div>
      `, searchInputFinalHtml))

      this.$toolbar.append(html.join(''))
      const $searchInput = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSearchInput(this)
      if (opts.showSearchButton) {
        this.$toolbar.find('.search button[name=search]').off('click').on('click', event => {
          clearTimeout(timeoutId) // doesn't matter if it's 0
          timeoutId = setTimeout(() => {
            this.onSearch({currentTarget: $searchInput})
          }, opts.searchTimeOut)
        })

        if (opts.searchOnEnterKey) {
          handleInputEvent($searchInput)
        }
      } else {
        handleInputEvent($searchInput)
      }

      if (opts.showSearchClearButton) {
        this.$toolbar.find('.search button[name=clearSearch]').click(() => {
          this.resetSearch()
        })
      }
    } else if (typeof opts.searchSelector === 'string') {
      const $searchInput = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSearchInput(this)
      handleInputEvent($searchInput)
    }
  }

  onSearch ({currentTarget, firedByInitSearchText} = {}, overwriteSearchText = true) {
    if (currentTarget !== undefined && $(currentTarget).length && overwriteSearchText) {
      const text = $(currentTarget).val().trim()

      if (this.options.trimOnSearch && $(currentTarget).val() !== text) {
        $(currentTarget).val(text)
      }

      if (this.searchText === text) {
        return
      }

      if (currentTarget === _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSearchInput(this)[0] || $(currentTarget).hasClass('search-input')) {
        this.searchText = text
        this.options.searchText = text
      }
    }

    if (!firedByInitSearchText) {
      this.options.pageNumber = 1
    }
    this.initSearch()
    if (firedByInitSearchText) {
      if (this.options.sidePagination === 'client') {
        this.updatePagination()
      }
    } else {
      this.updatePagination()
    }
    this.trigger('search', this.searchText)
  }

  initSearch () {
    this.filterOptions = this.filterOptions || this.options.filterOptions
    if (this.options.sidePagination !== 'server') {
      if (this.options.customSearch) {
        this.data = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.options, this.options.customSearch,
          [this.options.data, this.searchText, this.filterColumns])

        if (this.options.sortReset) {
          this.unsortedData = [...this.data]
        }
        return
      }

      const s = this.searchText && (this.fromHtml
        ? _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].escapeHTML(this.searchText) : this.searchText).toLowerCase()
      const f = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyObject(this.filterColumns) ? null : this.filterColumns

      // Check filter
      if (typeof this.filterOptions.filterAlgorithm === 'function') {
        this.data = this.options.data.filter((item, i) => this.filterOptions.filterAlgorithm.apply(null, [item, f]))
      } else if (typeof this.filterOptions.filterAlgorithm === 'string') {
        this.data = f ? this.options.data.filter((item, i) => {
          const filterAlgorithm = this.filterOptions.filterAlgorithm
          if (filterAlgorithm === 'and') {
            for (const key in f) {
              if (
                (Array.isArray(f[key]) &&
                  !f[key].includes(item[key])) ||
                (!Array.isArray(f[key]) &&
                  item[key] !== f[key])
              ) {
                return false
              }
            }
          } else if (filterAlgorithm === 'or') {
            let match = false
            for (const key in f) {
              if (
                (Array.isArray(f[key]) &&
                  f[key].includes(item[key])) ||
                (!Array.isArray(f[key]) &&
                  item[key] === f[key])
              ) {
                match = true
              }
            }

            return match
          }

          return true
        }) : [...this.options.data]
      }

      const visibleFields = this.getVisibleFields()
      this.data = s ? this.data.filter((item, i) => {
        for (let j = 0; j < this.header.fields.length; j++) {
          if (!this.header.searchables[j] || (this.options.visibleSearch && visibleFields.indexOf(this.header.fields[j]) === -1)) {
            continue
          }

          const key = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNumeric(this.header.fields[j]) ? parseInt(this.header.fields[j], 10) : this.header.fields[j]
          const column = this.columns[this.fieldsColumnsIndex[key]]
          let value

          if (typeof key === 'string') {
            value = item
            const props = key.split('.')
            for (let i = 0; i < props.length; i++) {
              if (value[props[i]] !== null) {
                value = value[props[i]]
              }
            }
          } else {
            value = item[key]
          }

          if (this.options.searchAccentNeutralise) {
            value = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].normalizeAccent(value)
          }

          // Fix #142: respect searchFormatter boolean
          if (column && column.searchFormatter) {
            value = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(column,
              this.header.formatters[j], [value, item, i, column.field], value)
          }

          if (typeof value === 'string' || typeof value === 'number') {
            if (this.options.strictSearch) {
              if ((`${value}`).toLowerCase() === s) {
                return true
              }
            } else {
              const largerSmallerEqualsRegex = /(?:(<=|=>|=<|>=|>|<)(?:\s+)?(\d+)?|(\d+)?(\s+)?(<=|=>|=<|>=|>|<))/gm
              const matches = largerSmallerEqualsRegex.exec(s)
              let comparisonCheck = false

              if (matches) {
                const operator = matches[1] || `${matches[5]}l`
                const comparisonValue = matches[2] || matches[3]
                const int = parseInt(value, 10)
                const comparisonInt = parseInt(comparisonValue, 10)

                switch (operator) {
                  case '>':
                  case '<l':
                    comparisonCheck = int > comparisonInt
                    break
                  case '<':
                  case '>l':
                    comparisonCheck = int < comparisonInt
                    break
                  case '<=':
                  case '=<':
                  case '>=l':
                  case '=>l':
                    comparisonCheck = int <= comparisonInt
                    break
                  case '>=':
                  case '=>':
                  case '<=l':
                  case '=<l':
                    comparisonCheck = int >= comparisonInt
                    break
                  default:
                    break
                }
              }

              if (comparisonCheck || (`${value}`).toLowerCase().includes(s)) {
                return true
              }
            }
          }
        }
        return false
      }) : this.data

      if (this.options.sortReset) {
        this.unsortedData = [...this.data]
      }

      this.initSort()
    }
  }

  initPagination () {
    const opts = this.options
    if (!opts.pagination) {
      this.$pagination.hide()
      return
    }
    this.$pagination.show()

    const html = []
    let allSelected = false
    let i
    let from
    let to
    let $pageList
    let $pre
    let $next
    let $number
    const data = this.getData({includeHiddenRows: false})
    let pageList = opts.pageList

    if (typeof pageList === 'string') {
      pageList = pageList.replace(/\[|\]| /g, '').toLowerCase().split(',')
    }

    pageList = pageList.map(value => {
      if (typeof value === 'string') {
        return (value.toLowerCase() === opts.formatAllRows().toLowerCase() ||
          ['all', 'unlimited'].includes(value.toLowerCase())) ? opts.formatAllRows() : +value
      }
      return value
    })

    this.paginationParts = opts.paginationParts
    if (typeof this.paginationParts === 'string') {
      this.paginationParts = this.paginationParts.replace(/\[|\]| |'/g, '').split(',')
    }

    if (opts.sidePagination !== 'server') {
      opts.totalRows = data.length
    }

    this.totalPages = 0
    if (opts.totalRows) {
      if (opts.pageSize === opts.formatAllRows()) {
        opts.pageSize = opts.totalRows
        allSelected = true
      }

      this.totalPages = ~~((opts.totalRows - 1) / opts.pageSize) + 1

      opts.totalPages = this.totalPages
    }
    if (this.totalPages > 0 && opts.pageNumber > this.totalPages) {
      opts.pageNumber = this.totalPages
    }

    this.pageFrom = (opts.pageNumber - 1) * opts.pageSize + 1
    this.pageTo = opts.pageNumber * opts.pageSize
    if (this.pageTo > opts.totalRows) {
      this.pageTo = opts.totalRows
    }

    if (this.options.pagination && this.options.sidePagination !== 'server') {
      this.options.totalNotFiltered = this.options.data.length
    }

    if (!this.options.showExtendedPagination) {
      this.options.totalNotFiltered = undefined
    }

    if (this.paginationParts.includes('pageInfo') || this.paginationParts.includes('pageInfoShort') || this.paginationParts.includes('pageSize')) {
      html.push(`<div class="${this.constants.classes.pull}-${opts.paginationDetailHAlign} pagination-detail">`)
    }

    if (this.paginationParts.includes('pageInfo') || this.paginationParts.includes('pageInfoShort')) {
      const paginationInfo = this.paginationParts.includes('pageInfoShort') ? opts.formatDetailPagination(opts.totalRows) : opts.formatShowingRows(this.pageFrom, this.pageTo, opts.totalRows, opts.totalNotFiltered)
      html.push(`<span class="pagination-info">
      ${paginationInfo}
      </span>`)
    }

    if (this.paginationParts.includes('pageSize')) {
      html.push('<span class="page-list">')

      const pageNumber = [
        `<span class="${this.constants.classes.paginationDropdown}">
        <button class="${this.constants.buttonsClass} dropdown-toggle" type="button" data-toggle="dropdown">
        <span class="page-size">
        ${allSelected ? opts.formatAllRows() : opts.pageSize}
        </span>
        ${this.constants.html.dropdownCaret}
        </button>
        ${this.constants.html.pageDropdown[0]}`]

      pageList.forEach((page, i) => {
        if (!opts.smartDisplay || i === 0 || pageList[i - 1] < opts.totalRows) {
          let active
          if (allSelected) {
            active = page === opts.formatAllRows() ? this.constants.classes.dropdownActive : ''
          } else {
            active = page === opts.pageSize ? this.constants.classes.dropdownActive : ''
          }
          pageNumber.push(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.pageDropdownItem, active, page))
        }
      })
      pageNumber.push(`${this.constants.html.pageDropdown[1]}</span>`)

      html.push(opts.formatRecordsPerPage(pageNumber.join('')))
    }

    if (this.paginationParts.includes('pageInfo') || this.paginationParts.includes('pageInfoShort') || this.paginationParts.includes('pageSize')) {
      html.push('</span></div>')
    }

    if (this.paginationParts.includes('pageList')) {
      html.push(`<div class="${this.constants.classes.pull}-${opts.paginationHAlign} pagination">`,
        _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.pagination[0], _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' pagination-%s', opts.iconSize)),
        _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.paginationItem, ' page-pre', opts.formatSRPaginationPreText(), opts.paginationPreText))

      if (this.totalPages < opts.paginationSuccessivelySize) {
        from = 1
        to = this.totalPages
      } else {
        from = opts.pageNumber - opts.paginationPagesBySide
        to = from + (opts.paginationPagesBySide * 2)
      }

      if (opts.pageNumber < (opts.paginationSuccessivelySize - 1)) {
        to = opts.paginationSuccessivelySize
      }

      if (opts.paginationSuccessivelySize > this.totalPages - from) {
        from = from - (opts.paginationSuccessivelySize - (this.totalPages - from)) + 1
      }

      if (from < 1) {
        from = 1
      }

      if (to > this.totalPages) {
        to = this.totalPages
      }

      const middleSize = Math.round(opts.paginationPagesBySide / 2)
      const pageItem = (i, classes = '') => _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.paginationItem,
        classes + (i === opts.pageNumber ? ` ${this.constants.classes.paginationActive}` : ''), opts.formatSRPaginationPageText(i), i)

      if (from > 1) {
        let max = opts.paginationPagesBySide
        if (max >= from) max = from - 1
        for (i = 1; i <= max; i++) {
          html.push(pageItem(i))
        }
        if ((from - 1) === max + 1) {
          i = from - 1
          html.push(pageItem(i))
        } else {
          if ((from - 1) > max) {
            if (
              (from - opts.paginationPagesBySide * 2) > opts.paginationPagesBySide &&
              opts.paginationUseIntermediate
            ) {
              i = Math.round(((from - middleSize) / 2) + middleSize)
              html.push(pageItem(i, ' page-intermediate'))
            } else {
              html.push(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.paginationItem,
                ' page-first-separator disabled', '', '...'))
            }
          }
        }
      }

      for (i = from; i <= to; i++) {
        html.push(pageItem(i))
      }

      if (this.totalPages > to) {
        let min = this.totalPages - (opts.paginationPagesBySide - 1)
        if (to >= min) min = to + 1
        if ((to + 1) === min - 1) {
          i = to + 1
          html.push(pageItem(i))
        } else {
          if (min > (to + 1)) {
            if (
              (this.totalPages - to) > opts.paginationPagesBySide * 2 &&
              opts.paginationUseIntermediate
            ) {
              i = Math.round(((this.totalPages - middleSize - to) / 2) + to)
              html.push(pageItem(i, ' page-intermediate'))
            } else {
              html.push(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.paginationItem,
                ' page-last-separator disabled', '', '...'))
            }
          }
        }

        for (i = min; i <= this.totalPages; i++) {
          html.push(pageItem(i))
        }
      }

      html.push(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.paginationItem, ' page-next', opts.formatSRPaginationNextText(), opts.paginationNextText))
      html.push(this.constants.html.pagination[1], '</div>')
    }
    this.$pagination.html(html.join(''))

    const dropupClass = ['bottom', 'both'].includes(opts.paginationVAlign) ?
      ` ${this.constants.classes.dropup}` : ''
    this.$pagination.last().find('.page-list > span').addClass(dropupClass)

    if (!opts.onlyInfoPagination) {
      $pageList = this.$pagination.find('.page-list a')
      $pre = this.$pagination.find('.page-pre')
      $next = this.$pagination.find('.page-next')
      $number = this.$pagination.find('.page-item').not('.page-next, .page-pre, .page-last-separator, .page-first-separator')

      if (this.totalPages <= 1) {
        this.$pagination.find('div.pagination').hide()
      }

      if (opts.smartDisplay) {
        if (pageList.length < 2 || opts.totalRows <= pageList[0]) {
          this.$pagination.find('span.page-list').hide()
        }
      }

      // when data is empty, hide the pagination
      this.$pagination[this.getData().length ? 'show' : 'hide']()

      if (!opts.paginationLoop) {
        if (opts.pageNumber === 1) {
          $pre.addClass('disabled')
        }
        if (opts.pageNumber === this.totalPages) {
          $next.addClass('disabled')
        }
      }

      if (allSelected) {
        opts.pageSize = opts.formatAllRows()
      }
      // removed the events for last and first, onPageNumber executeds the same logic
      $pageList.off('click').on('click', e => this.onPageListChange(e))
      $pre.off('click').on('click', e => this.onPagePre(e))
      $next.off('click').on('click', e => this.onPageNext(e))
      $number.off('click').on('click', e => this.onPageNumber(e))
    }
  }

  updatePagination (event) {
    // Fix #171: IE disabled button can be clicked bug.
    if (event && $(event.currentTarget).hasClass('disabled')) {
      return
    }

    if (!this.options.maintainMetaData) {
      this.resetRows()
    }

    this.initPagination()

    this.trigger('page-change', this.options.pageNumber, this.options.pageSize)

    if (this.options.sidePagination === 'server') {
      this.initServer()
    } else {
      this.initBody()
    }
  }

  onPageListChange (event) {
    event.preventDefault()
    const $this = $(event.currentTarget)

    $this.parent().addClass(this.constants.classes.dropdownActive)
      .siblings().removeClass(this.constants.classes.dropdownActive)
    this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase()
      ? this.options.formatAllRows() : +$this.text()
    this.$toolbar.find('.page-size').text(this.options.pageSize)

    this.updatePagination(event)
    return false
  }

  onPagePre (event) {
    event.preventDefault()
    if ((this.options.pageNumber - 1) === 0) {
      this.options.pageNumber = this.options.totalPages
    } else {
      this.options.pageNumber--
    }
    this.updatePagination(event)
    return false
  }

  onPageNext (event) {
    event.preventDefault()
    if ((this.options.pageNumber + 1) > this.options.totalPages) {
      this.options.pageNumber = 1
    } else {
      this.options.pageNumber++
    }
    this.updatePagination(event)
    return false
  }

  onPageNumber (event) {
    event.preventDefault()
    if (this.options.pageNumber === +$(event.currentTarget).text()) {
      return
    }
    this.options.pageNumber = +$(event.currentTarget).text()
    this.updatePagination(event)
    return false
  }

  initRow (item, i, data, trFragments) {
    const html = []
    let style = {}
    const csses = []
    let data_ = ''
    let attributes = {}
    const htmlAttributes = []

    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].findIndex(this.hiddenRows, item) > -1) {
      return
    }

    style = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.options, this.options.rowStyle, [item, i], style)

    if (style && style.css) {
      for (const [key, value] of Object.entries(style.css)) {
        csses.push(`${key}: ${value}`)
      }
    }

    attributes = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.options,
      this.options.rowAttributes, [item, i], attributes)

    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        htmlAttributes.push(`${key}="${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].escapeHTML(value)}"`)
      }
    }

    if (item._data && !_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyObject(item._data)) {
      for (const [k, v] of Object.entries(item._data)) {
        // ignore data-index
        if (k === 'index') {
          return
        }
        data_ += ` data-${k}='${typeof v === 'object' ? JSON.stringify(v) : v}'`
      }
    }

    html.push('<tr',
      _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' %s', htmlAttributes.length ? htmlAttributes.join(' ') : undefined),
      _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' id="%s"', Array.isArray(item) ? undefined : item._id),
      _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' class="%s"', style.classes || (Array.isArray(item) ? undefined : item._class)),
      _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' style="%s"', Array.isArray(item) ? undefined : item._style),
      ` data-index="${i}"`,
      _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' data-uniqueid="%s"', _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItemField(item, this.options.uniqueId, false)),
      _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' data-has-detail-view="%s"', (this.options.detailView && _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(null, this.options.detailFilter, [i, item])) ? 'true' : undefined),
      _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('%s', data_),
      '>'
    )

    if (this.options.cardView) {
      html.push(`<td colspan="${this.header.fields.length}"><div class="card-views">`)
    }

    let detailViewTemplate = ''

    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasDetailViewIcon(this.options)) {
      detailViewTemplate = '<td>'

      if (_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(null, this.options.detailFilter, [i, item])) {
        detailViewTemplate += `
          <a class="detail-icon" href="#">
          ${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailOpen)}
          </a>
        `
      }

      detailViewTemplate += '</td>'
    }

    if (detailViewTemplate && this.options.detailViewAlign !== 'right') {
      html.push(detailViewTemplate)
    }

    this.header.fields.forEach((field, j) => {
      let text = ''
      let value_ = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItemField(item, field, this.options.escape)
      let value = ''
      let type = ''
      let cellStyle = {}
      let id_ = ''
      let class_ = this.header.classes[j]
      let style_ = ''
      let styleToAdd_ = ''
      let data_ = ''
      let rowspan_ = ''
      let colspan_ = ''
      let title_ = ''
      const column = this.columns[j]

      if ((this.fromHtml || this.autoMergeCells) && typeof value_ === 'undefined') {
        if ((!column.checkbox) && (!column.radio)) {
          return
        }
      }

      if (!column.visible) {
        return
      }

      if (this.options.cardView && (!column.cardVisible)) {
        return
      }

      if (column.escape) {
        value_ = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].escapeHTML(value_)
      }

      // Style concat
      if (csses.concat([this.header.styles[j]]).length) {
        styleToAdd_ += `${csses.concat([this.header.styles[j]]).join('; ')}`
      }
      if (item[`_${field}_style`]) {
        styleToAdd_ += `${item[`_${field}_style`]}`
      }

      if (styleToAdd_) {
        style_ = ` style="${styleToAdd_}"`
      }
      // Style concat

      // handle id and class of td
      if (item[`_${field}_id`]) {
        id_ = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' id="%s"', item[`_${field}_id`])
      }
      if (item[`_${field}_class`]) {
        class_ = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' class="%s"', item[`_${field}_class`])
      }
      if (item[`_${field}_rowspan`]) {
        rowspan_ = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' rowspan="%s"', item[`_${field}_rowspan`])
      }
      if (item[`_${field}_colspan`]) {
        colspan_ = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' colspan="%s"', item[`_${field}_colspan`])
      }
      if (item[`_${field}_title`]) {
        title_ = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' title="%s"', item[`_${field}_title`])
      }
      cellStyle = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.header,
        this.header.cellStyles[j], [value_, item, i, field], cellStyle)
      if (cellStyle.classes) {
        class_ = ` class="${cellStyle.classes}"`
      }
      if (cellStyle.css) {
        const csses_ = []
        for (const [key, value] of Object.entries(cellStyle.css)) {
          csses_.push(`${key}: ${value}`)
        }
        style_ = ` style="${csses_.concat(this.header.styles[j]).join('; ')}"`
      }

      value = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(column,
        this.header.formatters[j], [value_, item, i, field], value_)

      if (this.searchText !== '' && this.options.searchHighlight) {
        value = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(column, column.searchHighlightFormatter, [value, this.searchText], value.replace(new RegExp('(' + this.searchText + ')', 'gim'), '<mark>$1</mark>'))
      }

      if (item[`_${field}_data`] && !_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyObject(item[`_${field}_data`])) {
        for (const [k, v] of Object.entries(item[`_${field}_data`])) {
          // ignore data-index
          if (k === 'index') {
            return
          }
          data_ += ` data-${k}="${v}"`
        }
      }

      if (column.checkbox || column.radio) {
        type = column.checkbox ? 'checkbox' : type
        type = column.radio ? 'radio' : type

        const c = column['class'] || ''
        const isChecked = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject(value) && value.hasOwnProperty('checked') ?
          value.checked : (value === true || value_) && value !== false
        const isDisabled = !column.checkboxEnabled || (value && value.disabled)

        text = [
          this.options.cardView
            ? `<div class="card-view ${c}">`
            : `<td class="bs-checkbox ${c}"${class_}${style_}>`,
          `<label>
            <input
            data-index="${i}"
            name="${this.options.selectItemName}"
            type="${type}"
            ${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('value="%s"', item[this.options.idField])}
            ${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('checked="%s"', isChecked ? 'checked' : undefined)}
            ${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('disabled="%s"', isDisabled ? 'disabled' : undefined)} />
            <span></span>
            </label>`,
          this.header.formatters[j] && typeof value === 'string' ? value : '',
          this.options.cardView ? '</div>' : '</td>'
        ].join('')

        item[this.header.stateField] = value === true || (!!value_ || (value && value.checked))
      } else {
        value = typeof value === 'undefined' || value === null
          ? this.options.undefinedText : value

        if (this.options.cardView) {
          const cardTitle = this.options.showHeader
            ? `<span class="card-view-title"${style_}>${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getFieldTitle(this.columns, field)}</span>` : ''

          text = `<div class="card-view">${cardTitle}<span class="card-view-value">${value}</span></div>`

          if (this.options.smartDisplay && value === '') {
            text = '<div class="card-view"></div>'
          }
        } else {
          text = `<td${id_}${class_}${style_}${data_}${rowspan_}${colspan_}${title_}>${value}</td>`
        }
      }

      html.push(text)
    })

    if (detailViewTemplate && this.options.detailViewAlign === 'right') {
      html.push(detailViewTemplate)
    }

    if (this.options.cardView) {
      html.push('</div></td>')
    }
    html.push('</tr>')

    return html.join('')
  }

  initBody (fixedScroll) {
    const data = this.getData()

    this.trigger('pre-body', data)

    this.$body = this.$el.find('>tbody')
    if (!this.$body.length) {
      this.$body = $('<tbody></tbody>').appendTo(this.$el)
    }

    // Fix #389 Bootstrap-table-flatJSON is not working
    if (!this.options.pagination || this.options.sidePagination === 'server') {
      this.pageFrom = 1
      this.pageTo = data.length
    }

    const rows = []
    const trFragments = $(document.createDocumentFragment())
    let hasTr = false

    this.autoMergeCells = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].checkAutoMergeCells(data.slice(this.pageFrom - 1, this.pageTo))

    for (let i = this.pageFrom - 1; i < this.pageTo; i++) {
      const item = data[i]
      const tr = this.initRow(item, i, data, trFragments)
      hasTr = hasTr || !!tr
      if (tr && typeof tr === 'string') {
        if (!this.options.virtualScroll) {
          trFragments.append(tr)
        } else {
          rows.push(tr)
        }
      }
    }

    // show no records
    if (!hasTr) {
      this.$body.html(`<tr class="no-records-found">${_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('<td colspan="%s">%s</td>',
        this.getVisibleFields().length + _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getDetailViewIndexOffset(this.options),
        this.options.formatNoMatches())}</tr>`)
    } else {
      if (!this.options.virtualScroll) {
        this.$body.html(trFragments)
      } else {
        if (this.virtualScroll) {
          this.virtualScroll.destroy()
        }
        this.virtualScroll = new _virtual_scroll_index_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
          rows,
          fixedScroll,
          scrollEl: this.$tableBody[0],
          contentEl: this.$body[0],
          itemHeight: this.options.virtualScrollItemHeight,
          callback: () => {
            this.fitHeader()
            this.initBodyEvent()
          }
        })
      }
    }

    if (!fixedScroll) {
      this.scrollTo(0)
    }

    this.initBodyEvent()
    this.updateSelected()
    this.initFooter()
    this.resetView()

    if (this.options.sidePagination !== 'server') {
      this.options.totalRows = data.length
    }

    this.trigger('post-body', data)
  }

  initBodyEvent () {
    // click to select by column
    this.$body.find('> tr[data-index] > td').off('click dblclick').on('click dblclick', e => {
      const $td = $(e.currentTarget)
      const $tr = $td.parent()
      const $cardViewArr = $(e.target).parents('.card-views').children()
      const $cardViewTarget = $(e.target).parents('.card-view')
      const rowIndex = $tr.data('index')
      const item = this.data[rowIndex]
      const index = this.options.cardView ? $cardViewArr.index($cardViewTarget) : $td[0].cellIndex
      const fields = this.getVisibleFields()
      const field = fields[index - _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getDetailViewIndexOffset(this.options)]
      const column = this.columns[this.fieldsColumnsIndex[field]]
      const value = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItemField(item, field, this.options.escape)

      if ($td.find('.detail-icon').length) {
        return
      }

      this.trigger(e.type === 'click' ? 'click-cell' : 'dbl-click-cell', field, value, item, $td)
      this.trigger(e.type === 'click' ? 'click-row' : 'dbl-click-row', item, $tr, field)

      // if click to select - then trigger the checkbox/radio click
      if (
        e.type === 'click' &&
        this.options.clickToSelect &&
        column.clickToSelect &&
        !_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.options, this.options.ignoreClickToSelectOn, [e.target])
      ) {
        const $selectItem = $tr.find(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('[name="%s"]', this.options.selectItemName))
        if ($selectItem.length) {
          $selectItem[0].click()
        }
      }

      if (e.type === 'click' && this.options.detailViewByClick) {
        this.toggleDetailView(rowIndex, this.header.detailFormatters[this.fieldsColumnsIndex[field]])
      }
    }).off('mousedown').on('mousedown', e => {
      // https://github.com/jquery/jquery/issues/1741
      this.multipleSelectRowCtrlKey = e.ctrlKey || e.metaKey
      this.multipleSelectRowShiftKey = e.shiftKey
    })

    this.$body.find('> tr[data-index] > td > .detail-icon').off('click').on('click', e => {
      e.preventDefault()
      this.toggleDetailView($(e.currentTarget).parent().parent().data('index'))
      return false
    })

    this.$selectItem = this.$body.find(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('[name="%s"]', this.options.selectItemName))
    this.$selectItem.off('click').on('click', e => {
      e.stopImmediatePropagation()

      const $this = $(e.currentTarget)
      this._toggleCheck($this.prop('checked'), $this.data('index'))
    })

    this.header.events.forEach((_events, i) => {
      let events = _events
      if (!events) {
        return
      }
      // fix bug, if events is defined with namespace
      if (typeof events === 'string') {
        events = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(null, events)
      }

      const field = this.header.fields[i]
      let fieldIndex = this.getVisibleFields().indexOf(field)

      if (fieldIndex === -1) {
        return
      }

      fieldIndex += _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getDetailViewIndexOffset(this.options)

      for (const key in events) {
        if (!events.hasOwnProperty(key)) {
          continue
        }
        const event = events[key]
        this.$body.find('>tr:not(.no-records-found)').each((i, tr) => {
          const $tr = $(tr)
          const $td = $tr.find(this.options.cardView ? '.card-views>.card-view' : '>td').eq(fieldIndex)
          const index = key.indexOf(' ')
          const name = key.substring(0, index)
          const el = key.substring(index + 1)

          $td.find(el).off(name).on(name, e => {
            const index = $tr.data('index')
            const row = this.data[index]
            const value = row[field]

            event.apply(this, [e, value, row, index])
          })
        })
      }
    })
  }

  initServer (silent, query, url) {
    let data = {}
    const index = this.header.fields.indexOf(this.options.sortName)

    let params = {
      searchText: this.searchText,
      sortName: this.options.sortName,
      sortOrder: this.options.sortOrder
    }

    if (this.header.sortNames[index]) {
      params.sortName = this.header.sortNames[index]
    }

    if (this.options.pagination && this.options.sidePagination === 'server') {
      params.pageSize = this.options.pageSize === this.options.formatAllRows()
        ? this.options.totalRows : this.options.pageSize
      params.pageNumber = this.options.pageNumber
    }

    if (!(url || this.options.url) && !this.options.ajax) {
      return
    }

    if (this.options.queryParamsType === 'limit') {
      params = {
        search: params.searchText,
        sort: params.sortName,
        order: params.sortOrder
      }

      if (this.options.pagination && this.options.sidePagination === 'server') {
        params.offset = this.options.pageSize === this.options.formatAllRows()
          ? 0 : this.options.pageSize * (this.options.pageNumber - 1)
        params.limit = this.options.pageSize === this.options.formatAllRows()
          ? this.options.totalRows : this.options.pageSize
        if (params.limit === 0) {
          delete params.limit
        }
      }
    }

    if (
      this.options.search &&
      this.options.sidePagination === 'server' &&
      this.columns.filter(column => !column.searchable).length
    ) {
      params.searchable = []

      for (const column of this.columns) {
        if (
          !column.checkbox &&
          column.searchable &&
          (
            this.options.visibleSearch &&
            column.visible ||
            !this.options.visibleSearch
          )
        ) {
          params.searchable.push(column.field)
        }
      }
    }

    if (!(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyObject(this.filterColumnsPartial))) {
      params.filter = JSON.stringify(this.filterColumnsPartial, null)
    }

    $.extend(params, query || {})

    data = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.options, this.options.queryParams, [params], data)

    // false to stop request
    if (data === false) {
      return
    }

    if (!silent) {
      this.showLoading()
    }
    const request = $.extend({}, _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(null, this.options.ajaxOptions), {
      type: this.options.method,
      url: url || this.options.url,
      data: this.options.contentType === 'application/json' && this.options.method === 'post'
        ? JSON.stringify(data) : data,
      cache: this.options.cache,
      contentType: this.options.contentType,
      dataType: this.options.dataType,
      success: (_res, textStatus, jqXHR) => {
        const res = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.options,
          this.options.responseHandler, [_res, jqXHR], _res)

        this.load(res)
        this.trigger('load-success', res, jqXHR && jqXHR.status, jqXHR)
        if (!silent) {
          this.hideLoading()
        }

        if (
          this.options.sidePagination === 'server' &&
          res[this.options.totalField] > 0 &&
          !res[this.options.dataField].length
        ) {
          this.updatePagination()
        }
      },
      error: jqXHR => {
        let data = []
        if (this.options.sidePagination === 'server') {
          data = {}
          data[this.options.totalField] = 0
          data[this.options.dataField] = []
        }
        this.load(data)
        this.trigger('load-error', jqXHR && jqXHR.status, jqXHR)
        if (!silent) this.$tableLoading.hide()
      }
    })

    if (this.options.ajax) {
      _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this, this.options.ajax, [request], null)
    } else {
      if (this._xhr && this._xhr.readyState !== 4) {
        this._xhr.abort()
      }
      this._xhr = $.ajax(request)
    }

    return data
  }

  initSearchText () {
    if (this.options.search) {
      this.searchText = ''
      if (this.options.searchText !== '') {
        const $search = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSearchInput(this)
        $search.val(this.options.searchText)
        this.onSearch({currentTarget: $search, firedByInitSearchText: true})
      }
    }
  }

  getCaret () {
    this.$header.find('th').each((i, th) => {
      $(th).find('.sortable').removeClass('desc asc')
        .addClass($(th).data('field') === this.options.sortName
          ? this.options.sortOrder : 'both')
    })
  }

  updateSelected () {
    const checkAll = this.$selectItem.filter(':enabled').length &&
      this.$selectItem.filter(':enabled').length ===
      this.$selectItem.filter(':enabled').filter(':checked').length

    this.$selectAll.add(this.$selectAll_).prop('checked', checkAll)

    this.$selectItem.each((i, el) => {
      $(el).closest('tr')[$(el).prop('checked') ? 'addClass' : 'removeClass']('selected')
    })
  }

  updateRows () {
    this.$selectItem.each((i, el) => {
      this.data[$(el).data('index')][this.header.stateField] = $(el).prop('checked')
    })
  }

  resetRows () {
    for (const row of this.data) {
      this.$selectAll.prop('checked', false)
      this.$selectItem.prop('checked', false)
      if (this.header.stateField) {
        row[this.header.stateField] = false
      }
    }
    this.initHiddenRows()
  }

  trigger (_name, ...args) {
    const name = `${_name}.bs.table`
    this.options[BootstrapTable.EVENTS[name]](...[...args, this])
    this.$el.trigger($.Event(name, { sender: this }), args)

    this.options.onAll(name, ...[...args, this])
    this.$el.trigger($.Event('all.bs.table', { sender: this }), [name, args])
  }

  resetHeader () {
    // fix #61: the hidden table reset header bug.
    // fix bug: get $el.css('width') error sometime (height = 500)
    clearTimeout(this.timeoutId_)
    this.timeoutId_ = setTimeout(() => this.fitHeader(), this.$el.is(':hidden') ? 100 : 0)
  }

  fitHeader () {
    if (this.$el.is(':hidden')) {
      this.timeoutId_ = setTimeout(() => this.fitHeader(), 100)
      return
    }

    const fixedBody = this.$tableBody.get(0)
    const scrollWidth = fixedBody.scrollWidth > fixedBody.clientWidth &&
    fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight()
      ? _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getScrollBarWidth() : 0

    this.$el.css('margin-top', -this.$header.outerHeight())

    const focused = $(':focus')
    if (focused.length > 0) {
      const $th = focused.parents('th')
      if ($th.length > 0) {
        const dataField = $th.attr('data-field')
        if (dataField !== undefined) {
          const $headerTh = this.$header.find(`[data-field='${dataField}']`)
          if ($headerTh.length > 0) {
            $headerTh.find(':input').addClass('focus-temp')
          }
        }
      }
    }

    this.$header_ = this.$header.clone(true, true)
    this.$selectAll_ = this.$header_.find('[name="btSelectAll"]')
    this.$tableHeader
      .css('margin-right', scrollWidth)
      .find('table').css('width', this.$el.outerWidth())
      .html('').attr('class', this.$el.attr('class'))
      .append(this.$header_)

    this.$tableLoading.css('width', this.$el.outerWidth())

    const focusedTemp = $('.focus-temp:visible:eq(0)')
    if (focusedTemp.length > 0) {
      focusedTemp.focus()
      this.$header.find('.focus-temp').removeClass('focus-temp')
    }

    // fix bug: $.data() is not working as expected after $.append()
    this.$header.find('th[data-field]').each((i, el) => {
      this.$header_.find(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('th[data-field="%s"]', $(el).data('field'))).data($(el).data())
    })

    const visibleFields = this.getVisibleFields()
    const $ths = this.$header_.find('th')
    let $tr = this.$body.find('>tr:not(.no-records-found,.virtual-scroll-top)').eq(0)

    while ($tr.length && $tr.find('>td[colspan]:not([colspan="1"])').length) {
      $tr = $tr.next()
    }

    const trLength = $tr.find('> *').length

    $tr.find('> *').each((i, el) => {
      const $this = $(el)

      if (_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasDetailViewIcon(this.options)) {
        if (
          i === 0 && this.options.detailViewAlign !== 'right' ||
          i === trLength - 1 && this.options.detailViewAlign === 'right'
        ) {
          const $thDetail = $ths.filter('.detail')
          const zoomWidth = $thDetail.innerWidth() - $thDetail.find('.fht-cell').width()
          $thDetail.find('.fht-cell').width($this.innerWidth() - zoomWidth)
          return
        }
      }

      const index = i - _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getDetailViewIndexOffset(this.options)
      let $th = this.$header_.find(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('th[data-field="%s"]', visibleFields[index]))
      if ($th.length > 1) {
        $th = $($ths[$this[0].cellIndex])
      }

      const zoomWidth = $th.innerWidth() - $th.find('.fht-cell').width()
      $th.find('.fht-cell').width($this.innerWidth() - zoomWidth)
    })

    this.horizontalScroll()
    this.trigger('post-header')
  }

  initFooter () {
    if (!this.options.showFooter || this.options.cardView) { // do nothing
      return
    }

    const data = this.getData()
    const html = []
    let detailTemplate = ''

    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasDetailViewIcon(this.options)) {
      detailTemplate = '<th class="detail"><div class="th-inner"></div><div class="fht-cell"></div></th>'
    }

    if (detailTemplate && this.options.detailViewAlign !== 'right') {
      html.push(detailTemplate)
    }

    for (const column of this.columns) {
      let falign = ''
      let valign = ''
      const csses = []
      let style = {}
      let class_ = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' class="%s"', column['class'])

      if (
        !column.visible
        || (this.footerData && this.footerData.length > 0 && !(column.field in this.footerData[0]))
      ) {
        continue
      }

      if (this.options.cardView && (!column.cardVisible)) {
        return
      }

      falign = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('text-align: %s; ', column.falign ? column.falign : column.align)
      valign = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('vertical-align: %s; ', column.valign)

      style = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(null, this.options.footerStyle, [column])

      if (style && style.css) {
        for (const [key, value] of Object.entries(style.css)) {
          csses.push(`${key}: ${value}`)
        }
      }
      if (style && style.classes) {
        class_ = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' class="%s"', column['class'] ?
          [column['class'], style.classes].join(' ') : style.classes)
      }

      html.push('<th', class_, _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(' style="%s"', falign + valign + csses.concat().join('; ')))
      let colspan = 0
      if (this.footerData && this.footerData.length > 0) {
        colspan = this.footerData[0]['_' + column.field + '_colspan'] || 0
      }
      if (colspan) {
        html.push(` colspan="${colspan}" `)
      }

      html.push('>')
      html.push('<div class="th-inner">')

      let value = ''
      if (this.footerData && this.footerData.length > 0) {
        value = this.footerData[0][column.field] || ''
      }
      html.push(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(column, column.footerFormatter,
        [data, value], value))

      html.push('</div>')
      html.push('<div class="fht-cell"></div>')
      html.push('</div>')
      html.push('</th>')
    }

    if (detailTemplate && this.options.detailViewAlign === 'right') {
      html.push(detailTemplate)
    }

    if (!this.options.height && !this.$tableFooter.length) {
      this.$el.append('<tfoot><tr></tr></tfoot>')
      this.$tableFooter = this.$el.find('tfoot')
    }

    this.$tableFooter.find('tr').html(html.join(''))

    this.trigger('post-footer', this.$tableFooter)
  }

  fitFooter () {
    if (this.$el.is(':hidden')) {
      setTimeout(() => this.fitFooter(), 100)
      return
    }

    const fixedBody = this.$tableBody.get(0)
    const scrollWidth = fixedBody.scrollWidth > fixedBody.clientWidth &&
    fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight()
      ? _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getScrollBarWidth() : 0

    this.$tableFooter
      .css('margin-right', scrollWidth)
      .find('table').css('width', this.$el.outerWidth())
      .attr('class', this.$el.attr('class'))

    const visibleFields = this.getVisibleFields()
    const $ths = this.$tableFooter.find('th')
    let $tr = this.$body.find('>tr:first-child:not(.no-records-found)')

    $ths.find('.fht-cell').width('auto')

    while ($tr.length && $tr.find('>td[colspan]:not([colspan="1"])').length) {
      $tr = $tr.next()
    }

    const trLength = $tr.find('> *').length

    $tr.find('> *').each((i, el) => {
      const $this = $(el)

      if (_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasDetailViewIcon(this.options)) {
        if (
          i === 0 && this.options.detailViewAlign === 'left' ||
          i === trLength - 1 && this.options.detailViewAlign === 'right'
        ) {
          const $thDetail = $ths.filter('.detail')
          const zoomWidth = $thDetail.innerWidth() - $thDetail.find('.fht-cell').width()
          $thDetail.find('.fht-cell').width($this.innerWidth() - zoomWidth)
          return
        }
      }

      const $th = $ths.eq(i)
      const zoomWidth = $th.innerWidth() - $th.find('.fht-cell').width()
      $th.find('.fht-cell').width($this.innerWidth() - zoomWidth)
    })

    this.horizontalScroll()
  }

  horizontalScroll () {
    // horizontal scroll event
    // TODO: it's probably better improving the layout than binding to scroll event
    this.$tableBody.off('scroll').on('scroll', () => {
      const scrollLeft = this.$tableBody.scrollLeft()

      if (this.options.showHeader && this.options.height) {
        this.$tableHeader.scrollLeft(scrollLeft)
      }

      if (this.options.showFooter && !this.options.cardView) {
        this.$tableFooter.scrollLeft(scrollLeft)
      }

      this.trigger('scroll-body', this.$tableBody)
    })
  }

  getVisibleFields () {
    const visibleFields = []

    for (const field of this.header.fields) {
      const column = this.columns[this.fieldsColumnsIndex[field]]

      if (!column || !column.visible) {
        continue
      }
      visibleFields.push(field)
    }
    return visibleFields
  }

  initHiddenRows () {
    this.hiddenRows = []
  }

  // PUBLIC FUNCTION DEFINITION
  // =======================

  getOptions () {
    // deep copy and remove data
    const options = $.extend({}, this.options)
    delete options.data
    return $.extend(true, {}, options)
  }

  refreshOptions (options) {
    // If the objects are equivalent then avoid the call of destroy / init methods
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].compareObjects(this.options, options, true)) {
      return
    }
    this.options = $.extend(this.options, options)
    this.trigger('refresh-options', this.options)
    this.destroy()
    this.init()
  }

  getData (params) {
    let data = this.options.data
    if (
      (
        this.searchText ||
        this.options.customSearch ||
        this.options.sortName !== undefined ||
        !_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyObject(this.filterColumns) ||
        !_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyObject(this.filterColumnsPartial)
      ) && (!params || !params.unfiltered)
    ) {
      data = this.data
    }

    if (params && params.useCurrentPage) {
      data = data.slice(this.pageFrom - 1, this.pageTo)
    }

    if (params && !params.includeHiddenRows) {
      const hiddenRows = this.getHiddenRows()
      data = data.filter(row => _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].findIndex(hiddenRows, row) === -1)
    }

    if (params && params.formatted) {
      data.forEach((row) => {
        for (const [key, value] of Object.entries(row)) {
          const column = this.columns[this.fieldsColumnsIndex[key]]
          if (!column) {
            return
          }

          row[key] = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(column, this.header.formatters[column.fieldIndex], [value, row, row.index, column.field], value)
        }
      })
    }

    return data
  }

  getSelections () {
    return this.options.data.filter(row => row[this.header.stateField] === true)
  }

  load (_data) {
    let fixedScroll = false
    let data = _data

    // #431: support pagination
    if (this.options.pagination && this.options.sidePagination === 'server') {
      this.options.totalRows = data[this.options.totalField]
      this.options.totalNotFiltered = data[this.options.totalNotFilteredField]
      this.footerData = data[this.options.footerField] ? [data[this.options.footerField]] : undefined
    }

    fixedScroll = data.fixedScroll
    data = Array.isArray(data) ? data : data[this.options.dataField]

    this.initData(data)
    this.initSearch()
    this.initPagination()
    this.initBody(fixedScroll)
  }

  append (data) {
    this.initData(data, 'append')
    this.initSearch()
    this.initPagination()
    this.initSort()
    this.initBody(true)
  }

  prepend (data) {
    this.initData(data, 'prepend')
    this.initSearch()
    this.initPagination()
    this.initSort()
    this.initBody(true)
  }

  remove (params) {
    const len = this.options.data.length
    let i
    let row

    if (!params.hasOwnProperty('field') || !params.hasOwnProperty('values')) {
      return
    }

    for (i = len - 1; i >= 0; i--) {
      let exists = false
      row = this.options.data[i]

      if (!row.hasOwnProperty(params.field) && params.field !== '$index') {
        continue
      } else if (!row.hasOwnProperty(params.field) && params.field === '$index') {
        exists = params.values.includes(i)
      } else {
        exists = params.values.includes(row[params.field])
      }
      if (exists) {
        this.options.data.splice(i, 1)
        if (this.options.sidePagination === 'server') {
          this.options.totalRows -= 1
        }
      }
    }

    if (len === this.options.data.length) {
      return
    }

    this.initSearch()
    this.initPagination()
    this.initSort()
    this.initBody(true)
  }

  removeAll () {
    if (this.options.data.length > 0) {
      this.options.data.splice(0, this.options.data.length)
      this.initSearch()
      this.initPagination()
      this.initBody(true)
    }
  }

  insertRow (params) {
    if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
      return
    }
    this.options.data.splice(params.index, 0, params.row)
    this.initSearch()
    this.initPagination()
    this.initSort()
    this.initBody(true)
  }

  updateRow (params) {
    const allParams = Array.isArray(params) ? params : [params]

    for (const params of allParams) {
      if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
        continue
      }

      if (params.hasOwnProperty('replace') && params.replace) {
        this.options.data[params.index] = params.row
      } else {
        $.extend(this.options.data[params.index], params.row)
      }
    }

    this.initSearch()
    this.initPagination()
    this.initSort()
    this.initBody(true)
  }

  getRowByUniqueId (_id) {
    const uniqueId = this.options.uniqueId
    const len = this.options.data.length
    let id = _id
    let dataRow = null
    let i
    let row
    let rowUniqueId

    for (i = len - 1; i >= 0; i--) {
      row = this.options.data[i]

      if (row.hasOwnProperty(uniqueId)) { // uniqueId is a column
        rowUniqueId = row[uniqueId]
      } else if (row._data && row._data.hasOwnProperty(uniqueId)) { // uniqueId is a row data property
        rowUniqueId = row._data[uniqueId]
      } else {
        continue
      }

      if (typeof rowUniqueId === 'string') {
        id = id.toString()
      } else if (typeof rowUniqueId === 'number') {
        if ((Number(rowUniqueId) === rowUniqueId) && (rowUniqueId % 1 === 0)) {
          id = parseInt(id)
        } else if ((rowUniqueId === Number(rowUniqueId)) && (rowUniqueId !== 0)) {
          id = parseFloat(id)
        }
      }

      if (rowUniqueId === id) {
        dataRow = row
        break
      }
    }

    return dataRow
  }

  updateByUniqueId (params) {
    const allParams = Array.isArray(params) ? params : [params]

    for (const params of allParams) {
      if (!params.hasOwnProperty('id') || !params.hasOwnProperty('row')) {
        continue
      }

      const rowId = this.options.data.indexOf(this.getRowByUniqueId(params.id))
      if (rowId === -1) {
        continue
      }

      if (params.hasOwnProperty('replace') && params.replace) {
        this.options.data[rowId] = params.row
      } else {
        $.extend(this.options.data[rowId], params.row)
      }
    }

    this.initSearch()
    this.initPagination()
    this.initSort()
    this.initBody(true)
  }

  removeByUniqueId (id) {
    const len = this.options.data.length
    const row = this.getRowByUniqueId(id)

    if (row) {
      this.options.data.splice(this.options.data.indexOf(row), 1)
    }

    if (len === this.options.data.length) {
      return
    }

    this.initSearch()
    this.initPagination()
    this.initBody(true)
  }

  updateCell (params) {
    if (!params.hasOwnProperty('index') ||
      !params.hasOwnProperty('field') ||
      !params.hasOwnProperty('value')) {
      return
    }
    this.data[params.index][params.field] = params.value

    if (params.reinit === false) {
      return
    }
    this.initSort()
    this.initBody(true)
  }

  updateCellByUniqueId (params) {
    const allParams = Array.isArray(params) ? params : [params]

    allParams.forEach(({id, field, value}) => {
      const rowId = this.options.data.indexOf(this.getRowByUniqueId(id))

      if (rowId === -1) {
        return
      }
      this.options.data[rowId][field] = value
    })

    if (params.reinit === false) {
      return
    }
    this.initSort()
    this.initBody(true)
  }

  showRow (params) {
    this._toggleRow(params, true)
  }

  hideRow (params) {
    this._toggleRow(params, false)
  }

  _toggleRow (params, visible) {
    let row

    if (params.hasOwnProperty('index')) {
      row = this.getData()[params.index]
    } else if (params.hasOwnProperty('uniqueId')) {
      row = this.getRowByUniqueId(params.uniqueId)
    }

    if (!row) {
      return
    }

    const index = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].findIndex(this.hiddenRows, row)

    if (!visible && index === -1) {
      this.hiddenRows.push(row)
    } else if (visible && index > -1) {
      this.hiddenRows.splice(index, 1)
    }

    this.initBody(true)
    this.initPagination()
  }

  getHiddenRows (show) {
    if (show) {
      this.initHiddenRows()
      this.initBody(true)
      this.initPagination()
      return
    }
    const data = this.getData()
    const rows = []

    for (const row of data) {
      if (this.hiddenRows.includes(row)) {
        rows.push(row)
      }
    }
    this.hiddenRows = rows
    return rows
  }

  showColumn (field) {
    const fields = Array.isArray(field) ? field : [field]
    fields.forEach(field => {
      this._toggleColumn(this.fieldsColumnsIndex[field], true, true)
    })
  }

  hideColumn (field) {
    const fields = Array.isArray(field) ? field : [field]
    fields.forEach(field => {
      this._toggleColumn(this.fieldsColumnsIndex[field], false, true)
    })
  }

  _toggleColumn (index, checked, needUpdate) {
    if (index === -1 || this.columns[index].visible === checked) {
      return
    }
    this.columns[index].visible = checked
    this.initHeader()
    this.initSearch()
    this.initPagination()
    this.initBody()

    if (this.options.showColumns) {
      const $items = this.$toolbar.find('.keep-open input:not(".toggle-all")').prop('disabled', false)

      if (needUpdate) {
        $items.filter(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('[value="%s"]', index)).prop('checked', checked)
      }

      if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
        $items.filter(':checked').prop('disabled', true)
      }
    }
  }

  getVisibleColumns () {
    return this.columns.filter((column) => column.visible && !this.isSelectionColumn(column))
  }

  getHiddenColumns () {
    return this.columns.filter(({visible}) => !visible)
  }

  isSelectionColumn (column) {
    return column.radio || column.checkbox
  }

  showAllColumns () {
    this._toggleAllColumns(true)
  }

  hideAllColumns () {
    this._toggleAllColumns(false)
  }

  _toggleAllColumns (visible) {
    for (const column of this.columns.slice().reverse()) {
      if (column.switchable) {
        if (!visible && this.options.showColumns && this.getVisibleColumns().length === this.options.minimumCountColumns) {
          continue
        }
        column.visible = visible
      }
    }

    this.initHeader()
    this.initSearch()
    this.initPagination()
    this.initBody()
    if (this.options.showColumns) {
      const $items = this.$toolbar.find('.keep-open input[type="checkbox"]:not(".toggle-all")').prop('disabled', false)

      if (visible) {
        $items.prop('checked', visible)
      } else {
        $items.get().reverse().forEach((item) => {
          if ($items.filter(':checked').length > this.options.minimumCountColumns) {
            $(item).prop('checked', visible)
          }
        })
      }

      if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
        $items.filter(':checked').prop('disabled', true)
      }
    }
  }

  mergeCells (options) {
    const row = options.index
    let col = this.getVisibleFields().indexOf(options.field)
    const rowspan = options.rowspan || 1
    const colspan = options.colspan || 1
    let i
    let j
    const $tr = this.$body.find('>tr')

    col += _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getDetailViewIndexOffset(this.options)

    const $td = $tr.eq(row).find('>td').eq(col)

    if (row < 0 || col < 0 || row >= this.data.length) {
      return
    }

    for (i = row; i < row + rowspan; i++) {
      for (j = col; j < col + colspan; j++) {
        $tr.eq(i).find('>td').eq(j).hide()
      }
    }

    $td.attr('rowspan', rowspan).attr('colspan', colspan).show()
  }

  checkAll () {
    this._toggleCheckAll(true)
  }

  uncheckAll () {
    this._toggleCheckAll(false)
  }

  _toggleCheckAll (checked) {
    const rowsBefore = this.getSelections()
    this.$selectAll.add(this.$selectAll_).prop('checked', checked)
    this.$selectItem.filter(':enabled').prop('checked', checked)
    this.updateRows()
    this.updateSelected()

    const rowsAfter = this.getSelections()
    if (checked) {
      this.trigger('check-all', rowsAfter, rowsBefore)
      return
    }

    this.trigger('uncheck-all', rowsAfter, rowsBefore)
  }

  checkInvert () {
    const $items = this.$selectItem.filter(':enabled')
    let checked = $items.filter(':checked')
    $items.each((i, el) => {
      $(el).prop('checked', !$(el).prop('checked'))
    })
    this.updateRows()
    this.updateSelected()
    this.trigger('uncheck-some', checked)
    checked = this.getSelections()
    this.trigger('check-some', checked)
  }

  check (index) {
    this._toggleCheck(true, index)
  }

  uncheck (index) {
    this._toggleCheck(false, index)
  }

  _toggleCheck (checked, index) {
    const $el = this.$selectItem.filter(`[data-index="${index}"]`)
    const row = this.options.data[index]

    if (
      $el.is(':radio') ||
      this.options.singleSelect ||
      this.options.multipleSelectRow &&
      !this.multipleSelectRowCtrlKey &&
      !this.multipleSelectRowShiftKey
    ) {
      for (const r of this.options.data) {
        r[this.header.stateField] = false
      }
      this.$selectItem.filter(':checked').not($el).prop('checked', false)
    }

    row[this.header.stateField] = checked

    if (this.options.multipleSelectRow) {
      if (this.multipleSelectRowShiftKey && this.multipleSelectRowLastSelectedIndex >= 0) {
        const indexes = [this.multipleSelectRowLastSelectedIndex, index].sort()

        for (let i = indexes[0] + 1; i < indexes[1]; i++) {
          this.data[i][this.header.stateField] = true
          this.$selectItem.filter(`[data-index="${i}"]`).prop('checked', true)
        }
      }

      this.multipleSelectRowCtrlKey = false
      this.multipleSelectRowShiftKey = false
      this.multipleSelectRowLastSelectedIndex = checked ? index : -1
    }

    $el.prop('checked', checked)
    this.updateSelected()
    this.trigger(checked ? 'check' : 'uncheck', this.data[index], $el)
  }

  checkBy (obj) {
    this._toggleCheckBy(true, obj)
  }

  uncheckBy (obj) {
    this._toggleCheckBy(false, obj)
  }

  _toggleCheckBy (checked, obj) {
    if (!obj.hasOwnProperty('field') || !obj.hasOwnProperty('values')) {
      return
    }

    const rows = []
    this.data.forEach((row, i) => {
      if (!row.hasOwnProperty(obj.field)) {
        return false
      }
      if (obj.values.includes(row[obj.field])) {
        let $el = this.$selectItem.filter(':enabled')
          .filter(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('[data-index="%s"]', i))

        $el = checked ? $el.not(':checked') : $el.filter(':checked')

        if (!$el.length) {
          return
        }

        $el.prop('checked', checked)
        row[this.header.stateField] = checked
        rows.push(row)
        this.trigger(checked ? 'check' : 'uncheck', row, $el)
      }
    })
    this.updateSelected()
    this.trigger(checked ? 'check-some' : 'uncheck-some', rows)
  }

  refresh (params) {
    if (params && params.url) {
      this.options.url = params.url
    }
    if (params && params.pageNumber) {
      this.options.pageNumber = params.pageNumber
    }
    if (params && params.pageSize) {
      this.options.pageSize = params.pageSize
    }
    this.trigger('refresh', this.initServer(params && params.silent,
      params && params.query, params && params.url))
  }

  destroy () {
    this.$el.insertBefore(this.$container)
    $(this.options.toolbar).insertBefore(this.$el)
    this.$container.next().remove()
    this.$container.remove()
    this.$el.html(this.$el_.html())
      .css('margin-top', '0')
      .attr('class', this.$el_.attr('class') || '') // reset the class
  }

  resetView (params) {
    let padding = 0

    if (params && params.height) {
      this.options.height = params.height
    }

    this.$selectAll.prop('checked', this.$selectItem.length > 0 &&
      this.$selectItem.length === this.$selectItem.filter(':checked').length)

    this.$tableContainer.toggleClass('has-card-view', this.options.cardView)

    if (!this.options.cardView && this.options.showHeader && this.options.height) {
      this.$tableHeader.show()
      this.resetHeader()
      padding += this.$header.outerHeight(true) + 1
    } else {
      this.$tableHeader.hide()
      this.trigger('post-header')
    }

    if (!this.options.cardView && this.options.showFooter) {
      this.$tableFooter.show()
      this.fitFooter()
      if (this.options.height) {
        padding += this.$tableFooter.outerHeight(true)
      }
    }

    if (this.$container.hasClass('fullscreen')) {
      this.$tableContainer.css('height', '')
      this.$tableContainer.css('width', '')
    } else if (this.options.height) {
      if (this.$tableBorder) {
        this.$tableBorder.css('width', '')
        this.$tableBorder.css('height', '')
      }

      const toolbarHeight = this.$toolbar.outerHeight(true)
      const paginationHeight = this.$pagination.outerHeight(true)
      const height = this.options.height - toolbarHeight - paginationHeight
      const $bodyTable = this.$tableBody.find('>table')
      const tableHeight = $bodyTable.outerHeight()
      this.$tableContainer.css('height', `${height}px`)

      if (this.$tableBorder && $bodyTable.is(':visible')) {
        let tableBorderHeight = height - tableHeight - 2
        if (this.$tableBody[0].scrollWidth - this.$tableBody.innerWidth()) {
          tableBorderHeight -= _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getScrollBarWidth()
        }
        this.$tableBorder.css('width', `${$bodyTable.outerWidth()}px`)
        this.$tableBorder.css('height', `${tableBorderHeight}px`)
      }
    }

    if (this.options.cardView) {
      // remove the element css
      this.$el.css('margin-top', '0')
      this.$tableContainer.css('padding-bottom', '0')
      this.$tableFooter.hide()
    } else {
      // Assign the correct sortable arrow
      this.getCaret()
      this.$tableContainer.css('padding-bottom', `${padding}px`)
    }

    this.trigger('reset-view')
  }

  showLoading () {
    this.$tableLoading.toggleClass('open', true)

    let fontSize = this.options.loadingFontSize

    if (this.options.loadingFontSize === 'auto') {
      fontSize = this.$tableLoading.width() * 0.04
      fontSize = Math.max(12, fontSize)
      fontSize = Math.min(32, fontSize)
      fontSize = `${fontSize}px`
    }

    this.$tableLoading.find('.loading-text').css('font-size', fontSize)
  }

  hideLoading () {
    this.$tableLoading.toggleClass('open', false)
  }

  togglePagination () {
    this.options.pagination = !this.options.pagination

    const icon = this.options.showButtonIcons ? this.options.pagination ? this.options.icons.paginationSwitchDown : this.options.icons.paginationSwitchUp : ''
    const text = this.options.showButtonText ? this.options.pagination ? this.options.formatPaginationSwitchUp() : this.options.formatPaginationSwitchDown() : ''
    this.$toolbar.find('button[name="paginationSwitch"]')
      .html(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.icon, this.options.iconsPrefix, icon) + ' ' + text)
    this.updatePagination()
  }

  toggleFullscreen () {
    this.$el.closest('.bootstrap-table').toggleClass('fullscreen')
    this.resetView()
  }

  toggleView () {
    this.options.cardView = !this.options.cardView
    this.initHeader()

    const icon = this.options.showButtonIcons ? this.options.cardView ? this.options.icons.toggleOn : this.options.icons.toggleOff : ''
    const text = this.options.showButtonText ? this.options.cardView ? this.options.formatToggleOff() : this.options.formatToggleOn() : ''
    this.$toolbar.find('button[name="toggle"]')
      .html(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.icon, this.options.iconsPrefix, icon) + ' ' + text)
    this.initBody()
    this.trigger('toggle', this.options.cardView)
  }

  resetSearch (text) {
    const $search = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSearchInput(this)
    $search.val(text || '')
    this.onSearch({currentTarget: $search})
  }

  filterBy (columns, options) {
    this.filterOptions = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyObject(options) ? this.options.filterOptions : $.extend(this.options.filterOptions, options)
    this.filterColumns = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmptyObject(columns) ? {} : columns
    this.options.pageNumber = 1
    this.initSearch()
    this.updatePagination()
  }

  scrollTo (params) {
    let options = {unit: 'px', value: 0}
    if (typeof params === 'object') {
      options = Object.assign(options, params)
    } else if (typeof params === 'string' && params === 'bottom') {
      options.value = this.$tableBody[0].scrollHeight
    } else if (typeof params === 'string' || typeof params === 'number') {
      options.value = params
    }

    let scrollTo = options.value
    if (options.unit === 'rows') {
      scrollTo = 0
      this.$body.find(`> tr:lt(${options.value})`).each((i, el) => {
        scrollTo += $(el).outerHeight(true)
      })
    }

    this.$tableBody.scrollTop(scrollTo)
  }

  getScrollPosition () {
    return this.$tableBody.scrollTop()
  }

  selectPage (page) {
    if (page > 0 && page <= this.options.totalPages) {
      this.options.pageNumber = page
      this.updatePagination()
    }
  }

  prevPage () {
    if (this.options.pageNumber > 1) {
      this.options.pageNumber--
      this.updatePagination()
    }
  }

  nextPage () {
    if (this.options.pageNumber < this.options.totalPages) {
      this.options.pageNumber++
      this.updatePagination()
    }
  }

  toggleDetailView (index, _columnDetailFormatter) {
    const $tr = this.$body.find(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('> tr[data-index="%s"]', index))

    if ($tr.next().is('tr.detail-view')) {
      this.collapseRow(index)
    } else {
      this.expandRow(index, _columnDetailFormatter)
    }

    this.resetView()
  }

  expandRow (index, _columnDetailFormatter) {
    const row = this.data[index]
    const $tr = this.$body.find(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('> tr[data-index="%s"][data-has-detail-view]', index))
    if ($tr.next().is('tr.detail-view')) {
      return
    }

    if (this.options.detailViewIcon) {
      $tr.find('a.detail-icon').html(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailClose))
    }

    $tr.after(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('<tr class="detail-view"><td colspan="%s"></td></tr>', $tr.children('td').length))

    const $element = $tr.next().find('td')

    const detailFormatter = _columnDetailFormatter || this.options.detailFormatter
    const content = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].calculateObjectValue(this.options, detailFormatter, [index, row, $element], '')
    if ($element.length === 1) {
      $element.append(content)
    }

    this.trigger('expand-row', index, row, $element)
  }

  expandRowByUniqueId (uniqueId) {
    const row = this.getRowByUniqueId(uniqueId)

    if (!row) {
      return
    }

    this.expandRow(this.data.indexOf(row))
  }

  collapseRow (index) {
    const row = this.data[index]
    const $tr = this.$body.find(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf('> tr[data-index="%s"][data-has-detail-view]', index))
    if (!$tr.next().is('tr.detail-view')) {
      return
    }

    if (this.options.detailViewIcon) {
      $tr.find('a.detail-icon').html(_utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailOpen))
    }

    this.trigger('collapse-row', index, row, $tr.next())
    $tr.next().remove()
  }

  collapseRowByUniqueId (uniqueId) {
    const row = this.getRowByUniqueId(uniqueId)

    if (!row) {
      return
    }

    this.collapseRow(this.data.indexOf(row))
  }

  expandAllRows () {
    const trs = this.$body.find('> tr[data-index][data-has-detail-view]')
    for (let i = 0; i < trs.length; i++) {
      this.expandRow($(trs[i]).data('index'))
    }
  }

  collapseAllRows () {
    const trs = this.$body.find('> tr[data-index][data-has-detail-view]')
    for (let i = 0; i < trs.length; i++) {
      this.collapseRow($(trs[i]).data('index'))
    }
  }

  updateColumnTitle (params) {
    if (!params.hasOwnProperty('field') || !params.hasOwnProperty('title')) {
      return
    }

    this.columns[this.fieldsColumnsIndex[params.field]].title =
      this.options.escape ? _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].escapeHTML(params.title) : params.title

    if (this.columns[this.fieldsColumnsIndex[params.field]].visible) {
      const header = this.options.height !== undefined ? this.$tableHeader : this.$header
      header.find('th[data-field]').each((i, el) => {
        if ($(el).data('field') === params.field) {
          $($(el).find('.th-inner')[0]).text(params.title)
          return false
        }
      })
    }
  }

  updateFormatText (formatName, text) {
    if (!/^format/.test(formatName) || !this.options[formatName]) {
      return
    }
    if (typeof text === 'string') {
      this.options[formatName] = () => text
    } else if (typeof text === 'function') {
      this.options[formatName] = text
    }
    this.initToolbar()
    this.initPagination()
    this.initBody()
  }
}

BootstrapTable.VERSION = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].VERSION
BootstrapTable.DEFAULTS = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].DEFAULTS
BootstrapTable.LOCALES = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].LOCALES
BootstrapTable.COLUMN_DEFAULTS = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].COLUMN_DEFAULTS
BootstrapTable.METHODS = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].METHODS
BootstrapTable.EVENTS = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].EVENTS

// BOOTSTRAP TABLE PLUGIN DEFINITION
// =======================

$.BootstrapTable = BootstrapTable
$.fn.bootstrapTable = function (option, ...args) {
  let value

  this.each((i, el) => {
    let data = $(el).data('bootstrap.table')
    const options = $.extend({}, BootstrapTable.DEFAULTS, $(el).data(),
      typeof option === 'object' && option)

    if (typeof option === 'string') {
      if (!_constants_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].METHODS.includes(option)) {
        throw new Error(`Unknown method: ${option}`)
      }

      if (!data) {
        return
      }

      value = data[option](...args)

      if (option === 'destroy') {
        $(el).removeData('bootstrap.table')
      }
    }

    if (!data) {
      data = new $.BootstrapTable(el, options)
      $(el).data('bootstrap.table', data)
      data.init()
    }
  })

  return typeof value === 'undefined' ? this : value
}

$.fn.bootstrapTable.Constructor = BootstrapTable
$.fn.bootstrapTable.theme = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].THEME
$.fn.bootstrapTable.VERSION = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].VERSION
$.fn.bootstrapTable.defaults = BootstrapTable.DEFAULTS
$.fn.bootstrapTable.columnDefaults = BootstrapTable.COLUMN_DEFAULTS
$.fn.bootstrapTable.events = BootstrapTable.EVENTS
$.fn.bootstrapTable.locales = BootstrapTable.LOCALES
$.fn.bootstrapTable.methods = BootstrapTable.METHODS
$.fn.bootstrapTable.utils = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"]

// BOOTSTRAP TABLE INIT
// =======================

$(() => {
  $('[data-toggle="table"]').bootstrapTable()
})

/* harmony default export */ __webpack_exports__["default"] = (BootstrapTable);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")))

/***/ }),

/***/ "./www/js/source/lib/bootstrap-table/constants/index.js":
/*!**************************************************************!*\
  !*** ./www/js/source/lib/bootstrap-table/constants/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {const VERSION = '1.18.0'

let bootstrapVersion = 4
try {
  const rawVersion = $.fn.dropdown.Constructor.VERSION

  // Only try to parse VERSION if it is defined.
  // It is undefined in older versions of Bootstrap (tested with 3.1.1).
  if (rawVersion !== undefined) {
    bootstrapVersion = parseInt(rawVersion, 10)
  }
} catch (e) {
  // ignore
}

try {
  // eslint-disable-next-line no-undef
  const rawVersion = bootstrap.Tooltip.VERSION
  if (rawVersion !== undefined) {
    bootstrapVersion = parseInt(rawVersion, 10)
  }
} catch (e) {
  // ignore
}

const CONSTANTS = {
  3: {
    iconsPrefix: 'glyphicon',
    icons: {
      paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
      paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
      refresh: 'glyphicon-refresh icon-refresh',
      toggleOff: 'glyphicon-list-alt icon-list-alt',
      toggleOn: 'glyphicon-list-alt icon-list-alt',
      columns: 'glyphicon-th icon-th',
      detailOpen: 'glyphicon-plus icon-plus',
      detailClose: 'glyphicon-minus icon-minus',
      fullscreen: 'glyphicon-fullscreen',
      search: 'glyphicon-search',
      clearSearch: 'glyphicon-trash'
    },
    classes: {
      buttonsPrefix: 'btn',
      buttons: 'default',
      buttonsGroup: 'btn-group',
      buttonsDropdown: 'btn-group',
      pull: 'pull',
      inputGroup: 'input-group',
      inputPrefix: 'input-',
      input: 'form-control',
      paginationDropdown: 'btn-group dropdown',
      dropup: 'dropup',
      dropdownActive: 'active',
      paginationActive: 'active',
      buttonActive: 'active'
    },
    html: {
      toolbarDropdown: ['<ul class="dropdown-menu" role="menu">', '</ul>'],
      toolbarDropdownItem: '<li class="dropdown-item-marker" role="menuitem"><label>%s</label></li>',
      toolbarDropdownSeparator: '<li class="divider"></li>',
      pageDropdown: ['<ul class="dropdown-menu" role="menu">', '</ul>'],
      pageDropdownItem: '<li role="menuitem" class="%s"><a href="#">%s</a></li>',
      dropdownCaret: '<span class="caret"></span>',
      pagination: ['<ul class="pagination%s">', '</ul>'],
      paginationItem: '<li class="page-item%s"><a class="page-link" aria-label="%s" href="javascript:void(0)">%s</a></li>',
      icon: '<i class="%s %s"></i>',
      inputGroup: '<div class="input-group">%s<span class="input-group-btn">%s</span></div>',
      searchInput: '<input class="%s%s" type="text" placeholder="%s">',
      searchButton: '<button class="%s" type="button" name="search" title="%s">%s %s</button>',
      searchClearButton: '<button class="%s" type="button" name="clearSearch" title="%s">%s %s</button>'
    }
  },
  4: {
    iconsPrefix: 'fa',
    icons: {
      paginationSwitchDown: 'fa-caret-square-down',
      paginationSwitchUp: 'fa-caret-square-up',
      refresh: 'fa-sync',
      toggleOff: 'fa-toggle-off',
      toggleOn: 'fa-toggle-on',
      columns: 'fa-th-list',
      detailOpen: 'fa-plus',
      detailClose: 'fa-minus',
      fullscreen: 'fa-arrows-alt',
      search: 'fa-search',
      clearSearch: 'fa-trash'
    },
    classes: {
      buttonsPrefix: 'btn',
      buttons: 'secondary',
      buttonsGroup: 'btn-group',
      buttonsDropdown: 'btn-group',
      pull: 'float',
      inputGroup: 'btn-group',
      inputPrefix: 'form-control-',
      input: 'form-control',
      paginationDropdown: 'btn-group dropdown',
      dropup: 'dropup',
      dropdownActive: 'active',
      paginationActive: 'active',
      buttonActive: 'active'
    },
    html: {
      toolbarDropdown: ['<div class="dropdown-menu dropdown-menu-right">', '</div>'],
      toolbarDropdownItem: '<label class="dropdown-item dropdown-item-marker">%s</label>',
      pageDropdown: ['<div class="dropdown-menu">', '</div>'],
      pageDropdownItem: '<a class="dropdown-item %s" href="#">%s</a>',
      toolbarDropdownSeparator: '<div class="dropdown-divider"></div>',
      dropdownCaret: '<span class="caret"></span>',
      pagination: ['<ul class="pagination%s">', '</ul>'],
      paginationItem: '<li class="page-item%s"><a class="page-link" aria-label="%s" href="javascript:void(0)">%s</a></li>',
      icon: '<i class="%s %s"></i>',
      inputGroup: '<div class="input-group">%s<div class="input-group-append">%s</div></div>',
      searchInput: '<input class="%s%s" type="text" placeholder="%s">',
      searchButton: '<button class="%s" type="button" name="search" title="%s">%s %s</button>',
      searchClearButton: '<button class="%s" type="button" name="clearSearch" title="%s">%s %s</button>'
    }
  },
  5: {
    iconsPrefix: 'fa',
    icons: {
      paginationSwitchDown: 'fa-caret-square-down',
      paginationSwitchUp: 'fa-caret-square-up',
      refresh: 'fa-sync',
      toggleOff: 'fa-toggle-off',
      toggleOn: 'fa-toggle-on',
      columns: 'fa-th-list',
      detailOpen: 'fa-plus',
      detailClose: 'fa-minus',
      fullscreen: 'fa-arrows-alt',
      search: 'fa-search',
      clearSearch: 'fa-trash'
    },
    classes: {
      buttonsPrefix: 'btn',
      buttons: 'secondary',
      buttonsGroup: 'btn-group',
      buttonsDropdown: 'btn-group',
      pull: 'float',
      inputGroup: 'btn-group',
      inputPrefix: 'form-control-',
      input: 'form-control',
      paginationDropdown: 'btn-group dropdown',
      dropup: 'dropup',
      dropdownActive: 'active',
      paginationActive: 'active',
      buttonActive: 'active'
    },
    html: {
      toolbarDropdown: ['<div class="dropdown-menu dropdown-menu-right">', '</div>'],
      toolbarDropdownItem: '<label class="dropdown-item dropdown-item-marker">%s</label>',
      pageDropdown: ['<div class="dropdown-menu">', '</div>'],
      pageDropdownItem: '<a class="dropdown-item %s" href="#">%s</a>',
      toolbarDropdownSeparator: '<div class="dropdown-divider"></div>',
      dropdownCaret: '<span class="caret"></span>',
      pagination: ['<ul class="pagination%s">', '</ul>'],
      paginationItem: '<li class="page-item%s"><a class="page-link" aria-label="%s" href="javascript:void(0)">%s</a></li>',
      icon: '<i class="%s %s"></i>',
      inputGroup: '<div class="input-group">%s<div class="input-group-append">%s</div></div>',
      searchInput: '<input class="%s%s" type="text" placeholder="%s">',
      searchButton: '<button class="%s" type="button" name="search" title="%s">%s %s</button>',
      searchClearButton: '<button class="%s" type="button" name="clearSearch" title="%s">%s %s</button>'
    }
  }
}[bootstrapVersion]

const DEFAULTS = {
  height: undefined,
  classes: 'table table-bordered table-hover',
  buttons: {},
  theadClasses: '',
  headerStyle (column) {
    return {}
  },
  rowStyle (row, index) {
    return {}
  },
  rowAttributes (row, index) {
    return {}
  },
  undefinedText: '-',
  locale: undefined,
  virtualScroll: false,
  virtualScrollItemHeight: undefined,
  sortable: true,
  sortClass: undefined,
  silentSort: true,
  sortName: undefined,
  sortOrder: undefined,
  sortReset: false,
  sortStable: false,
  rememberOrder: false,
  serverSort: true,
  customSort: undefined,
  columns: [
    []
  ],
  data: [],
  url: undefined,
  method: 'get',
  cache: true,
  contentType: 'application/json',
  dataType: 'json',
  ajax: undefined,
  ajaxOptions: {},
  queryParams (params) {
    return params
  },
  queryParamsType: 'limit', // 'limit', undefined
  responseHandler (res) {
    return res
  },
  totalField: 'total',
  totalNotFilteredField: 'totalNotFiltered',
  dataField: 'rows',
  footerField: 'footer',
  pagination: false,
  paginationParts: ['pageInfo', 'pageSize', 'pageList'],
  showExtendedPagination: false,
  paginationLoop: true,
  sidePagination: 'client', // client or server
  totalRows: 0,
  totalNotFiltered: 0,
  pageNumber: 1,
  pageSize: 10,
  pageList: [10, 25, 50, 100],
  paginationHAlign: 'right', // right, left
  paginationVAlign: 'bottom', // bottom, top, both
  paginationDetailHAlign: 'left', // right, left
  paginationPreText: '&lsaquo;',
  paginationNextText: '&rsaquo;',
  paginationSuccessivelySize: 5, // Maximum successively number of pages in a row
  paginationPagesBySide: 1, // Number of pages on each side (right, left) of the current page.
  paginationUseIntermediate: false, // Calculate intermediate pages for quick access
  search: false,
  searchHighlight: false,
  searchOnEnterKey: false,
  strictSearch: false,
  searchSelector: false,
  visibleSearch: false,
  showButtonIcons: true,
  showButtonText: false,
  showSearchButton: false,
  showSearchClearButton: false,
  trimOnSearch: true,
  searchAlign: 'right',
  searchTimeOut: 500,
  searchText: '',
  customSearch: undefined,
  showHeader: true,
  showFooter: false,
  footerStyle (column) {
    return {}
  },
  searchAccentNeutralise: false,
  showColumns: false,
  showColumnsToggleAll: false,
  showColumnsSearch: false,
  minimumCountColumns: 1,
  showPaginationSwitch: false,
  showRefresh: false,
  showToggle: false,
  showFullscreen: false,
  smartDisplay: true,
  escape: false,
  filterOptions: {
    filterAlgorithm: 'and'
  },
  idField: undefined,
  selectItemName: 'btSelectItem',
  clickToSelect: false,
  ignoreClickToSelectOn ({tagName}) {
    return ['A', 'BUTTON'].includes(tagName)
  },
  singleSelect: false,
  checkboxHeader: true,
  maintainMetaData: false,
  multipleSelectRow: false,
  uniqueId: undefined,
  cardView: false,
  detailView: false,
  detailViewIcon: true,
  detailViewByClick: false,
  detailViewAlign: 'left',
  detailFormatter (index, row) {
    return ''
  },
  detailFilter (index, row) {
    return true
  },
  toolbar: undefined,
  toolbarAlign: 'left',
  buttonsToolbar: undefined,
  buttonsAlign: 'right',
  buttonsOrder: ['paginationSwitch', 'refresh', 'toggle', 'fullscreen', 'columns'],
  buttonsPrefix: CONSTANTS.classes.buttonsPrefix,
  buttonsClass: CONSTANTS.classes.buttons,
  icons: CONSTANTS.icons,
  iconSize: undefined,
  iconsPrefix: CONSTANTS.iconsPrefix, // glyphicon or fa(font-awesome)
  loadingFontSize: 'auto',
  loadingTemplate (loadingMessage) {
    return `<span class="loading-wrap">
      <span class="loading-text">${loadingMessage}</span>
      <span class="animation-wrap"><span class="animation-dot"></span></span>
      </span>
    `
  },
  onAll (name, args) {
    return false
  },
  onClickCell (field, value, row, $element) {
    return false
  },
  onDblClickCell (field, value, row, $element) {
    return false
  },
  onClickRow (item, $element) {
    return false
  },
  onDblClickRow (item, $element) {
    return false
  },
  onSort (name, order) {
    return false
  },
  onCheck (row) {
    return false
  },
  onUncheck (row) {
    return false
  },
  onCheckAll (rows) {
    return false
  },
  onUncheckAll (rows) {
    return false
  },
  onCheckSome (rows) {
    return false
  },
  onUncheckSome (rows) {
    return false
  },
  onLoadSuccess (data) {
    return false
  },
  onLoadError (status) {
    return false
  },
  onColumnSwitch (field, checked) {
    return false
  },
  onPageChange (number, size) {
    return false
  },
  onSearch (text) {
    return false
  },
  onToggle (cardView) {
    return false
  },
  onPreBody (data) {
    return false
  },
  onPostBody () {
    return false
  },
  onPostHeader () {
    return false
  },
  onPostFooter () {
    return false
  },
  onExpandRow (index, row, $detail) {
    return false
  },
  onCollapseRow (index, row) {
    return false
  },
  onRefreshOptions (options) {
    return false
  },
  onRefresh (params) {
    return false
  },
  onResetView () {
    return false
  },
  onScrollBody () {
    return false
  }
}

const EN = {
  formatLoadingMessage () {
    return 'Loading, please wait'
  },
  formatRecordsPerPage (pageNumber) {
    return `${pageNumber} rows per page`
  },
  formatShowingRows (pageFrom, pageTo, totalRows, totalNotFiltered) {
    if (totalNotFiltered !== undefined && totalNotFiltered > 0 && totalNotFiltered > totalRows) {
      return `Showing ${pageFrom} to ${pageTo} of ${totalRows} rows (filtered from ${totalNotFiltered} total rows)`
    }

    return `Showing ${pageFrom} to ${pageTo} of ${totalRows} rows`
  },
  formatSRPaginationPreText () {
    return 'previous page'
  },
  formatSRPaginationPageText (page) {
    return `to page ${page}`
  },
  formatSRPaginationNextText () {
    return 'next page'
  },
  formatDetailPagination (totalRows) {
    return `Showing ${totalRows} rows`
  },
  formatSearch () {
    return 'Search'
  },
  formatClearSearch () {
    return 'Clear Search'
  },
  formatNoMatches () {
    return 'No matching records found'
  },
  formatPaginationSwitch () {
    return 'Hide/Show pagination'
  },
  formatPaginationSwitchDown () {
    return 'Show pagination'
  },
  formatPaginationSwitchUp () {
    return 'Hide pagination'
  },
  formatRefresh () {
    return 'Refresh'
  },
  formatToggle () {
    return 'Toggle'
  },
  formatToggleOn () {
    return 'Show card view'
  },
  formatToggleOff () {
    return 'Hide card view'
  },
  formatColumns () {
    return 'Columns'
  },
  formatColumnsToggleAll () {
    return 'Toggle all'
  },
  formatFullscreen () {
    return 'Fullscreen'
  },
  formatAllRows () {
    return 'All'
  }
}

const COLUMN_DEFAULTS = {
  field: undefined,
  title: undefined,
  titleTooltip: undefined,
  'class': undefined,
  width: undefined,
  widthUnit: 'px',
  rowspan: undefined,
  colspan: undefined,
  align: undefined, // left, right, center
  halign: undefined, // left, right, center
  falign: undefined, // left, right, center
  valign: undefined, // top, middle, bottom
  cellStyle: undefined,
  radio: false,
  checkbox: false,
  checkboxEnabled: true,
  clickToSelect: true,
  showSelectTitle: false,
  sortable: false,
  sortName: undefined,
  order: 'asc', // asc, desc
  sorter: undefined,
  visible: true,
  switchable: true,
  cardVisible: true,
  searchable: true,
  formatter: undefined,
  footerFormatter: undefined,
  detailFormatter: undefined,
  searchFormatter: true,
  searchHighlightFormatter: false,
  escape: false,
  events: undefined
}

const METHODS = [
  'getOptions',
  'refreshOptions',
  'getData',
  'getSelections',
  'load', 'append', 'prepend',
  'remove', 'removeAll',
  'insertRow', 'updateRow',
  'getRowByUniqueId', 'updateByUniqueId', 'removeByUniqueId',
  'updateCell', 'updateCellByUniqueId',
  'showRow', 'hideRow', 'getHiddenRows',
  'showColumn', 'hideColumn',
  'getVisibleColumns', 'getHiddenColumns',
  'showAllColumns', 'hideAllColumns',
  'mergeCells',
  'checkAll', 'uncheckAll', 'checkInvert',
  'check', 'uncheck',
  'checkBy', 'uncheckBy',
  'refresh',
  'destroy',
  'resetView',
  'showLoading', 'hideLoading',
  'togglePagination', 'toggleFullscreen', 'toggleView',
  'resetSearch',
  'filterBy',
  'scrollTo', 'getScrollPosition',
  'selectPage', 'prevPage', 'nextPage',
  'toggleDetailView',
  'expandRow', 'collapseRow', 'expandRowByUniqueId', 'collapseRowByUniqueId',
  'expandAllRows', 'collapseAllRows',
  'updateColumnTitle', 'updateFormatText'
]

const EVENTS = {
  'all.bs.table': 'onAll',
  'click-row.bs.table': 'onClickRow',
  'dbl-click-row.bs.table': 'onDblClickRow',
  'click-cell.bs.table': 'onClickCell',
  'dbl-click-cell.bs.table': 'onDblClickCell',
  'sort.bs.table': 'onSort',
  'check.bs.table': 'onCheck',
  'uncheck.bs.table': 'onUncheck',
  'check-all.bs.table': 'onCheckAll',
  'uncheck-all.bs.table': 'onUncheckAll',
  'check-some.bs.table': 'onCheckSome',
  'uncheck-some.bs.table': 'onUncheckSome',
  'load-success.bs.table': 'onLoadSuccess',
  'load-error.bs.table': 'onLoadError',
  'column-switch.bs.table': 'onColumnSwitch',
  'page-change.bs.table': 'onPageChange',
  'search.bs.table': 'onSearch',
  'toggle.bs.table': 'onToggle',
  'pre-body.bs.table': 'onPreBody',
  'post-body.bs.table': 'onPostBody',
  'post-header.bs.table': 'onPostHeader',
  'post-footer.bs.table': 'onPostFooter',
  'expand-row.bs.table': 'onExpandRow',
  'collapse-row.bs.table': 'onCollapseRow',
  'refresh-options.bs.table': 'onRefreshOptions',
  'reset-view.bs.table': 'onResetView',
  'refresh.bs.table': 'onRefresh',
  'scroll-body.bs.table': 'onScrollBody'
}

Object.assign(DEFAULTS, EN)

/* harmony default export */ __webpack_exports__["default"] = ({
  VERSION,

  THEME: `bootstrap${bootstrapVersion}`,

  CONSTANTS,

  DEFAULTS,

  COLUMN_DEFAULTS,

  METHODS,

  EVENTS,

  LOCALES: {
    en: EN,
    'en-US': EN
  }
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")))

/***/ }),

/***/ "./www/js/source/lib/bootstrap-table/utils/index.js":
/*!**********************************************************!*\
  !*** ./www/js/source/lib/bootstrap-table/utils/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["default"] = ({

  getSearchInput (that) {
    if (typeof that.options.searchSelector === 'string') {
      return $(that.options.searchSelector)
    }
    return that.$toolbar.find('.search input')
  },

  // it only does '%s', and return '' when arguments are undefined
  sprintf (_str, ...args) {
    let flag = true
    let i = 0

    const str = _str.replace(/%s/g, () => {
      const arg = args[i++]

      if (typeof arg === 'undefined') {
        flag = false
        return ''
      }
      return arg
    })
    return flag ? str : ''
  },

  isObject (val) {
    return val instanceof Object && !Array.isArray(val)
  },

  isEmptyObject (obj = {}) {
    return Object.entries(obj).length === 0 && obj.constructor === Object
  },

  isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  },

  getFieldTitle (list, value) {
    for (const item of list) {
      if (item.field === value) {
        return item.title
      }
    }
    return ''
  },

  setFieldIndex (columns) {
    let totalCol = 0
    const flag = []

    for (const column of columns[0]) {
      totalCol += column.colspan || 1
    }

    for (let i = 0; i < columns.length; i++) {
      flag[i] = []
      for (let j = 0; j < totalCol; j++) {
        flag[i][j] = false
      }
    }

    for (let i = 0; i < columns.length; i++) {
      for (const r of columns[i]) {
        const rowspan = r.rowspan || 1
        const colspan = r.colspan || 1
        const index = flag[i].indexOf(false)

        r.colspanIndex = index

        if (colspan === 1) {
          r.fieldIndex = index
          // when field is undefined, use index instead
          if (typeof r.field === 'undefined') {
            r.field = index
          }
        } else {
          r.colspanGroup = r.colspan
        }

        for (let j = 0; j < rowspan; j++) {
          for (let k = 0; k < colspan; k++) {
            flag[i + j][index + k] = true
          }
        }
      }
    }
  },

  normalizeAccent (value) {
    if (typeof value !== 'string') {
      return value
    }
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  },

  updateFieldGroup (columns) {
    const allColumns = [].concat(...columns)

    for (const c of columns) {
      for (const r of c) {
        if (r.colspanGroup > 1) {
          let colspan = 0
          for (let i = r.colspanIndex; i < r.colspanIndex + r.colspanGroup; i++) {
            const column = allColumns.find(col => col.fieldIndex === i)
            if (column.visible) {
              colspan++
            }
          }
          r.colspan = colspan
          r.visible = colspan > 0
        }
      }
    }
  },

  getScrollBarWidth () {
    if (this.cachedWidth === undefined) {
      const $inner = $('<div/>').addClass('fixed-table-scroll-inner')
      const $outer = $('<div/>').addClass('fixed-table-scroll-outer')

      $outer.append($inner)
      $('body').append($outer)

      const w1 = $inner[0].offsetWidth
      $outer.css('overflow', 'scroll')
      let w2 = $inner[0].offsetWidth

      if (w1 === w2) {
        w2 = $outer[0].clientWidth
      }

      $outer.remove()
      this.cachedWidth = w1 - w2
    }
    return this.cachedWidth
  },

  calculateObjectValue (self, name, args = [], defaultValue) {
    let func = name

    if (typeof name === 'string') {
      // support obj.func1.func2
      const names = name.split('.')

      if (names.length > 1) {
        func = window
        for (const f of names) {
          func = func[f]
        }
      } else {
        func = window[name]
      }
    }

    if (func !== null && typeof func === 'object') {
      return func
    }

    if (typeof func === 'function') {
      return func.apply(self, args || [])
    }

    if (
      !func &&
      typeof name === 'string' &&
      this.sprintf(name, ...args)
    ) {
      return this.sprintf(name, ...args)
    }

    return defaultValue
  },

  compareObjects (objectA, objectB, compareLength) {
    const aKeys = Object.keys(objectA)
    const bKeys = Object.keys(objectB)

    if (compareLength && aKeys.length !== bKeys.length) {
      return false
    }

    for (const key of aKeys) {
      if (bKeys.includes(key) && objectA[key] !== objectB[key]) {
        return false
      }
    }

    return true
  },

  escapeHTML (text) {
    if (typeof text === 'string') {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/`/g, '&#x60;')
    }
    return text
  },

  unescapeHTML (text) {
    if (typeof text === 'string') {
      return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, '\'')
        .replace(/&#x60;/g, '`')
    }
    return text
  },

  getRealDataAttr (dataAttr) {
    for (const [attr, value] of Object.entries(dataAttr)) {
      const auxAttr = attr.split(/(?=[A-Z])/).join('-').toLowerCase()
      if (auxAttr !== attr) {
        dataAttr[auxAttr] = value
        delete dataAttr[attr]
      }
    }
    return dataAttr
  },

  getItemField (item, field, escape) {
    let value = item

    if (typeof field !== 'string' || item.hasOwnProperty(field)) {
      return escape ? this.escapeHTML(item[field]) : item[field]
    }

    const props = field.split('.')
    for (const p of props) {
      value = value && value[p]
    }
    return escape ? this.escapeHTML(value) : value
  },

  isIEBrowser () {
    return navigator.userAgent.includes('MSIE ') ||
      /Trident.*rv:11\./.test(navigator.userAgent)
  },

  findIndex (items, item) {
    for (const it of items) {
      if (JSON.stringify(it) === JSON.stringify(item)) {
        return items.indexOf(it)
      }
    }
    return -1
  },

  trToData (columns, $els) {
    const data = []
    const m = []

    $els.each((y, el) => {
      const $el = $(el)
      const row = {}

      // save tr's id, class and data-* attributes
      row._id = $el.attr('id')
      row._class = $el.attr('class')
      row._data = this.getRealDataAttr($el.data())
      row._style = $el.attr('style')

      $el.find('>td,>th').each((_x, el) => {
        const $el = $(el)
        const cspan = +$el.attr('colspan') || 1
        const rspan = +$el.attr('rowspan') || 1
        let x = _x

        // skip already occupied cells in current row
        for (; m[y] && m[y][x]; x++) {
          // ignore
        }

        // mark matrix elements occupied by current cell with true
        for (let tx = x; tx < x + cspan; tx++) {
          for (let ty = y; ty < y + rspan; ty++) {
            if (!m[ty]) { // fill missing rows
              m[ty] = []
            }
            m[ty][tx] = true
          }
        }

        const field = columns[x].field

        row[field] = $el.html().trim()
        // save td's id, class and data-* attributes
        row[`_${field}_id`] = $el.attr('id')
        row[`_${field}_class`] = $el.attr('class')
        row[`_${field}_rowspan`] = $el.attr('rowspan')
        row[`_${field}_colspan`] = $el.attr('colspan')
        row[`_${field}_title`] = $el.attr('title')
        row[`_${field}_data`] = this.getRealDataAttr($el.data())
        row[`_${field}_style`] = $el.attr('style')
      })
      data.push(row)
    })
    return data
  },

  sort (a, b, order, sortStable, aPosition, bPosition) {
    if (a === undefined || a === null) {
      a = ''
    }
    if (b === undefined || b === null) {
      b = ''
    }

    if (sortStable && a === b) {
      a = aPosition
      b = bPosition
    }

    // If both values are numeric, do a numeric comparison
    if (this.isNumeric(a) && this.isNumeric(b)) {
      // Convert numerical values form string to float.
      a = parseFloat(a)
      b = parseFloat(b)
      if (a < b) {
        return order * -1
      }
      if (a > b) {
        return order
      }
      return 0
    }

    if (a === b) {
      return 0
    }

    // If value is not a string, convert to string
    if (typeof a !== 'string') {
      a = a.toString()
    }

    if (a.localeCompare(b) === -1) {
      return order * -1
    }

    return order
  },

  getEventName (eventPrefix, id = '') {
    id = id || `${+new Date()}${~~(Math.random() * 1000000)}`
    return `${eventPrefix}-${id}`
  },

  hasDetailViewIcon (options) {
    return options.detailView && options.detailViewIcon && !options.cardView
  },

  getDetailViewIndexOffset (options) {
    return this.hasDetailViewIcon(options) && options.detailViewAlign !== 'right' ? 1 : 0
  },

  checkAutoMergeCells (data) {
    for (const row of data) {
      for (const key of Object.keys(row)) {
        if (key.startsWith('_') && (key.endsWith('_rowspan') || key.endsWith('_colspan'))) {
          return true
        }
      }
    }
    return false
  },

  deepCopy (arg) {
    if (arg === undefined) {
      return arg
    }
    return $.extend(true, Array.isArray(arg) ? [] : {}, arg)
  }
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")))

/***/ }),

/***/ "./www/js/source/lib/bootstrap-table/virtual-scroll/index.js":
/*!*******************************************************************!*\
  !*** ./www/js/source/lib/bootstrap-table/virtual-scroll/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const BLOCK_ROWS = 50
const CLUSTER_BLOCKS = 4

class VirtualScroll {

  constructor (options) {
    this.rows = options.rows
    this.scrollEl = options.scrollEl
    this.contentEl = options.contentEl
    this.callback = options.callback
    this.itemHeight = options.itemHeight

    this.cache = {}
    this.scrollTop = this.scrollEl.scrollTop

    this.initDOM(this.rows, options.fixedScroll)

    this.scrollEl.scrollTop = this.scrollTop
    this.lastCluster = 0

    const onScroll = () => {
      if (this.lastCluster !== (this.lastCluster = this.getNum())) {
        this.initDOM(this.rows)
        this.callback()
      }
    }

    this.scrollEl.addEventListener('scroll', onScroll, false)
    this.destroy = () => {
      this.contentEl.innerHtml = ''
      this.scrollEl.removeEventListener('scroll', onScroll, false)
    }
  }

  initDOM (rows, fixedScroll) {
    if (typeof this.clusterHeight === 'undefined') {
      this.cache.scrollTop = this.scrollEl.scrollTop
      this.cache.data = this.contentEl.innerHTML = rows[0] + rows[0] + rows[0]
      this.getRowsHeight(rows)
    }

    const data = this.initData(rows, this.getNum(fixedScroll))
    const thisRows = data.rows.join('')
    const dataChanged = this.checkChanges('data', thisRows)
    const topOffsetChanged = this.checkChanges('top', data.topOffset)
    const bottomOffsetChanged = this.checkChanges('bottom', data.bottomOffset)
    const html = []

    if (dataChanged && topOffsetChanged) {
      if (data.topOffset) {
        html.push(this.getExtra('top', data.topOffset))
      }
      html.push(thisRows)
      if (data.bottomOffset) {
        html.push(this.getExtra('bottom', data.bottomOffset))
      }
      this.contentEl.innerHTML = html.join('')

      if (fixedScroll) {
        this.contentEl.scrollTop = this.cache.scrollTop
      }
    } else if (bottomOffsetChanged) {
      this.contentEl.lastChild.style.height = `${data.bottomOffset}px`
    }
  }

  getRowsHeight () {
    if (typeof this.itemHeight === 'undefined') {
      const nodes = this.contentEl.children
      const node = nodes[Math.floor(nodes.length / 2)]
      this.itemHeight = node.offsetHeight
    }
    this.blockHeight = this.itemHeight * BLOCK_ROWS
    this.clusterRows = BLOCK_ROWS * CLUSTER_BLOCKS
    this.clusterHeight = this.blockHeight * CLUSTER_BLOCKS
  }

  getNum (fixedScroll) {
    this.scrollTop = fixedScroll ? this.cache.scrollTop : this.scrollEl.scrollTop
    return Math.floor(this.scrollTop / (this.clusterHeight - this.blockHeight)) || 0
  }

  initData (rows, num) {
    if (rows.length < BLOCK_ROWS) {
      return {
        topOffset: 0,
        bottomOffset: 0,
        rowsAbove: 0,
        rows
      }
    }
    const start = Math.max((this.clusterRows - BLOCK_ROWS) * num, 0)
    const end = start + this.clusterRows
    const topOffset = Math.max(start * this.itemHeight, 0)
    const bottomOffset = Math.max((rows.length - end) * this.itemHeight, 0)
    const thisRows = []
    let rowsAbove = start
    if (topOffset < 1) {
      rowsAbove++
    }
    for (let i = start; i < end; i++) {
      rows[i] && thisRows.push(rows[i])
    }
    return {
      topOffset,
      bottomOffset,
      rowsAbove,
      rows: thisRows
    }
  }

  checkChanges (type, value) {
    const changed = value !== this.cache[type]
    this.cache[type] = value
    return changed
  }

  getExtra (className, height) {
    const tag = document.createElement('tr')
    tag.className = `virtual-scroll-${className}`
    if (height) {
      tag.style.height = `${height}px`
    }
    return tag.outerHTML
  }
}

/* harmony default export */ __webpack_exports__["default"] = (VirtualScroll);


/***/ }),

/***/ "./www/js/source/lib/jquery.multiselect.nlevel.js":
/*!********************************************************!*\
  !*** ./www/js/source/lib/jquery.multiselect.nlevel.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {﻿///
/*
*Edited by Alex.Nguyen
* Support get checked item.
*/
(function ($) {
    var currentTriggerEvents = [];
    var methods = {
        createMultiselect: function (opts) {
            opts = $.extend({}, $.fn.multiSelect.defaults, opts);
            return this.each(function () {
                return new MultiSelect(this, opts);
            });
        },
        appendItem: function (item) {
        },
        removeItem: function (item) {
        },
        updateItems: function (opts) {
            opts = $.extend({}, $.fn.multiSelect.defaults, opts);
            return this.each(function () {
                return new MultiSelect(this, opts);
            });
        },
        checkAllItems: function () {
            var $inputs = $(this).next('div.ui-multiselect-options').find('label').not('.ui-multiselect-state-disabled').find('input');
            $inputs.not(':disabled').attr('checked', 'checked');
            var numChecked = $(this).next('div.ui-multiselect-options').find('label').not('.ui-multiselect-state-disabled').not('.ui-multiselect-group-mark').find('input').not("#" + $(this).attr('id') + "HeaderCheckBox").filter(':checked').length;
        },
        unCheckAllItems: function () {
            var $inputs = $(this).next('div.ui-multiselect-options').find('label').not('.ui-multiselect-state-disabled').find('input');
            $inputs.not(':disabled').removeAttr('checked');
            var numChecked = $(this).next('div.ui-multiselect-options').find('label').not('.ui-multiselect-state-disabled').find('input').filter(':checked').length;

            $(this).find('input').val($.fn.multiSelect.defaults.noneSelectedText);

        },
        getUncheckItems: function () {
            var listChecked = $(this).next('div.ui-multiselect-options').find('label:not(.ui-multiselect-state-disabled,.ui-multiselect-group-mark)').find('input:not(:checked)').not("#" + $(this).attr('id') + "HeaderCheckBox");
            var tempArray = [];
            for (var i = 0; i < listChecked.length; i++) {
                tempArray.push(listChecked[i].value);
            }
            return tempArray;
        },
        getCheckedItems: function () {
            var listChecked = $(this).next('div.ui-multiselect-options').find('label:not(.ui-multiselect-state-disabled,.ui-multiselect-group-mark)').find('input:not(#' + $(this).attr('id') + "HeaderCheckBox)").filter(':checked');
            var tempArray = [];

            for (var i = 0; i < listChecked.length; i++) {
                tempArray.push(listChecked[i].value);
            }

            return tempArray;
        },

        getMainParentCheckedItems: function () {
            var listChecked = $(this).attr('parent-checked-value').split(',');
            return listChecked;
        },
        getCheckedItemsByText: function () {
            var listChecked = $(this).next('div.ui-multiselect-options').find('label:not(.ui-multiselect-state-disabled,.ui-multiselect-group-mark)').find('input:not(#' + $(this).attr('id') + "HeaderCheckBox)").filter(':checked');
            var tempArray = [];
            for (var i = 0; i < listChecked.length; i++) {
                tempArray.push(listChecked[i].title);
            }
            return tempArray;
        },
        hideMe: function () {
            $(this).next('div.ui-multiselect-options').trigger('close', true, false);
        },
        openMe: function (waiting) {
            //$(this).find('#ui-multiselect-options-' + $(this).find(":first-child").attr("id")).trigger('open', false);
            $(this).next('div.ui-multiselect-options').trigger('open', false);

        }
    };

    $.fn.multiSelect = function (opts) {
        if (methods[opts]) {
            return methods[opts].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof opts === 'object' || !opts) {
            // Default to "createMultiselect"
            return methods.createMultiselect.apply(this, arguments);
        }
        else {
            //throw error
        }
    };
    //// Detect Browser 
    //// Grid Scroller
    var matchedBrowser, browserDectect;

    // Use of jQuery.browser is frowned upon.
    // More details: http://api.jquery.com/jQuery.browser
    // jQuery.uaMatch maintained for back-compat
    function ubMatch(ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
        [];

        return {
            browserDectect: match[1] || "",
            version: match[2] || "0"
        };
    };

    matchedBrowser = ubMatch(navigator.userAgent);
    browserDectect = {};

    if (matchedBrowser.browserDectect) {
        browserDectect[matchedBrowser.browserDectect] = true;
        browserDectect.version = matchedBrowser.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if (browserDectect.chrome) {
        browserDectect.webkit = true;
    } else if (browserDectect.webkit) {
        browserDectect.safari = true;
    }


    // counter to dynamically generate label/option IDs if they don't exist
    var multiselectID = 0;
    // built up a multiselect
    var MultiSelect = function (select, o) {
        //global variables
        var $original = $(select);
        var $select = $original,
            $options, $header, $labels, $footer, $listGroupCheckBox, $body, $listItem, $listCollapse, $divHover,
            $allLabel, $inputHeaderCheckBox, $selectinput, $headerCheckbox, $checkedInput, $dropdownlist,
            html = [],
            optgroups = [],
            isDisabled = $select.is(':disabled'),
            id = select.id || 'ui-multiselect-' + multiselectID++, // unique ID for the label & option tags
            listData = o.listData,
            isShowGroup = false,
            isOpenning = false,
            numGroup = 0;
        //render MultiSleclect Interface
        var RenderInterface = function (id, idDisable, noneSelectedText, title) {
            //remove old
            if ($select.prev().is('div.ui-multiselect-options')) {
                $select.prev().remove();
            }
            if ($select.next().is('div.ui-multiselect-options')) {
                $select.next().remove();
            }

            //render new
            var tempHtml = [];
            tempHtml.push('<a id="' + id + '" class="ui-multiselect ui-multiselect-widget ui-multiselect-state-default ' + (idDisable ? ' ui-multiselect-state-disabled' : '') + '">');
            tempHtml.push('<input readonly="readonly" type="text" class="ui-multiselect-state-default" value="' + noneSelectedText + '" title="' + select.title + '" /><span class="ui-multiselect-icon ui-multiselect-icon-triangle-1-s"></span></a>');
            return tempHtml.join('');
        };
        //render Header 
        var checkShouldShowGroupOrNo = function () {
            for (var i = 0; i < o.listData.length; i++) {
                if (typeof o.listData[i].Items !== 'undefined' && o.listData[i].Items.length > 0) {
                    isShowGroup = true;
                    break;
                }
            }
        }
        var RenderHeader = function (id, checkAllText) {
            var tempHtml = [];
            //html.push('<div class="ui-multiselect-widget-header ui-multiselect-helper-clearfix ui-multiselect-corner-all ui-multiselect-header">');
            //html.push('<ul class="ui-multiselect-helper-reset ui-multiselect-checkboxes" style="overflow-y:hidden;">');
            tempHtml.push('<div class="ui-multiselect-widget-header ui-multiselect-helper-clearfix ui-multiselect-header custom-ui-widget-header" ' + (o.showCheckAll ? '' : 'style="display:none;"') + '>');
            tempHtml.push('<ul class="ui-multiselect-helper-reset ui-multiselect-checkboxes-head" style="overflow-y:hidden;">');
            tempHtml.push('<li style="display:inline;">');
            tempHtml.push('<label class="ui-multiselect-corner-all" style="color: #000;" for="' + id + "HeaderCheckBox" + '">');
            tempHtml.push('<input type="checkbox" id="' + id + "HeaderCheckBox" + '">' + checkAllText + '</label></li>');
            if (isShowGroup) {
                tempHtml.push('<li class="ui-multiselect-icon-dropdown ui-multiselect-icon-collapse" title="Collapse/Expand" style="display:inline; float:right; cursor:pointer;" id="' + id + "CollapseButton" + '" >&nbsp;</li>');
            }
            //tempHtml.push('</li>');
            tempHtml.push('</ul>');
            tempHtml.push('</div>');
            return tempHtml.join('');
        };
        var RenderNoItemHeader = function (id, noItemText) {
            var tempHtml = [];
            tempHtml.push('<div class="ui-multiselect-widget-header ui-multiselect-helper-clearfix ui-multiselect-corner-all ui-multiselect-header custom-ui-widget-header">');
            tempHtml.push('<ul class="ui-multiselect-helper-reset ui-multiselect-checkboxes-head" style="overflow-y:hidden;">');
            tempHtml.push('<li style="display:inline;">');
            tempHtml.push('<label class="ui-multiselect-corner-all" style="color: #000000" >' + noItemText + '</label>');
            tempHtml.push('</ul>');
            tempHtml.push('</div>');
            return tempHtml.join('');
        };
        //render Body
        var InsertRow = function (tempData, index, isChild, isLastChildItem, isNoGroup, siblingGroup, currentParentGroupId, currentGroupId) {
            var tempHtml = [];
            var title = tempData.Text || "",
            value = tempData.Value || "",
            inputID = tempData.Id || "ui-multiselect-" + id + "-option-" + index,
            isDisabled = !tempData.Enable,
            labelClasses = tempData.CssClass || "",
            currentGroupStatus = (tempData.Show == false ? false : true),
            liClasses = "",
            divClasses = "ui-multiselect-div ui-multiselect-corner-all",
            divHtml = "";
            var groupIdAttr = "ui-multiselect-option-group-" + currentGroupId;
            if (typeof value != 'undefined') {
                if (isDisabled) {
                    labelClasses += ' ui-multiselect-state-disabled';
                }
                if (typeof tempData.Items !== 'undefined' && (typeof isChild === 'undefined' || isChild === false) && siblingGroup) {
                    labelClasses += ' ui-multiselect-group-mark';
                }

                liClasses += (isNoGroup == false ? 'rtLI ' : ' rtLI');
                liClasses += (isDisabled ? ' ui-multiselect-disabled ' : '');
                liClasses += (isLastChildItem == true ? " rtLast" : "");
                liClasses += (index === 0 && isNoGroup == false) ? " rtFirst" : "";

                if (!isShowGroup && o.columnNumber > 0) {
                    var style = "float: left; width:" + (100 / o.columnNumber).toFixed(0) + "%;";
                    tempHtml.push('<li class="' + liClasses + '" style="' + style + '">');
                }
                else {
                    tempHtml.push('<li class="' + liClasses + '">');
                }

                if (siblingGroup == false) {
                    if (isNoGroup == true && isShowGroup) {
                        divClasses += (isShowGroup == false ? "" : ((isLastChildItem == true) ? ' rtBot' : ' rtMid'));
                        tempHtml.push('<div class="' + divClasses + '">');

                    }
                    else {
                        tempHtml.push('<div class="' + divClasses + '" style="margin-left:10px;">');
                    }
                }
                else {
                    divClasses += (index === 0) ? " rtMid" : " rtMid rtSelected";
                    divClasses += (isLastChildItem === true ? " rtBot" : "");
                    tempHtml.push('<div class="' + divClasses + '">');
                    if (tempData.Items != null && tempData.Items.length !== 0) {
                        tempHtml.push('<span class="collapseClass rtMinus" showstatus="' + currentGroupStatus + '"></span>');
                    }
                }

                labelClasses += " ui-multiselect-corner-all";
                tempHtml.push('<label for="' + inputID + '" class="' + labelClasses + '" style="' + tempData.CssClass + '">');
                tempHtml.push('<input id="' + inputID + '" type="' + (o.multiple ? 'checkbox' : 'radio') + '" name="' + value + '" value="' + value + '" title="' + title + '" childgroupid="' + currentParentGroupId + '"');

                if (o.isCheckAll) {
                    tempHtml.push(' checked="checked"');
                }
                else if (tempData.Checked) {
                    tempHtml.push(' checked="checked"');
                }
                if (isDisabled) {
                    tempHtml.push(' disabled="disabled"');
                }
                tempHtml.push(' />' + title + '</label>');
                tempHtml.push('</div>');

                if (typeof tempData.Items !== 'undefined' && tempData.Items.length > 0) {
                    //var nextGroupIdAtt = "ui-multiselect-option-group-" + currentGroupId + "-" + index.toString();
                    tempHtml.push('<ul class="ui-multiselect-ul-group custom-multi-select-rtUL" childgroupid="' + groupIdAttr + '">');
                    for (var j = 0; j < tempData.Items.length; j++) {

                        if (typeof tempData.Items[j].Items === 'undefined'
                        || tempData.Items[j].Items == null
                        || tempData.Items[j].Items.length === 0) {
                            tempHtml.push(InsertRow(tempData.Items[j], j,
                                true, (j === tempData.Items.length - 1 ? true : false), true, siblingGroup, groupIdAttr, currentGroupId));
                        }
                        else {
                            currentGroupId += "-" + j.toString();
                            tempHtml.push(InsertRow(tempData.Items[j], j,
                                false, (j === tempData.Items.length - 1 ? true : false), false, siblingGroup, groupIdAttr, currentGroupId));
                        }

                        //tempHtml.push(InsertRow(tempData.Items[j], j, true, (j === tempData.Items.length - 1 ? true : false), false, false));
                    }
                    tempHtml.push("</ul>");
                }

                tempHtml.push('</li>');
            }
            return tempHtml.join('');
        };
        var RenderBody = function () {
            var tempHtml = [];
            var groupIdAttr = "ui-multiselect-option-group-0";
            tempHtml.push('<ul class="ui-multiselect-checkboxes ui-multiselect-helper-reset rtUL ' + (isShowGroup ? "rtLines" : "") + ' ui-multiselect-ul-group" childgroupid="' + groupIdAttr + '">');
            for (var i = 0; i < listData.length; i++) {
                var tempGroup = listData[i];
                var isChild = tempGroup.Items == null || tempGroup.Items.length === 0;
                var isLastChildItem = (i === listData.length - 1 ? true : false);
                var isNoGroup = (typeof tempGroup.Items === 'undefined' || (typeof tempGroup.Items !== 'undefined' && tempGroup.Items.length === 0)) ? true : false;
                var siblingIsGroup = isShowGroup ? true : false;
                var currentGroupId = "0-" + i.toString();
                numGroup++;
                tempHtml.push(InsertRow(tempGroup, i, isChild, isLastChildItem, isNoGroup, siblingIsGroup, groupIdAttr, currentGroupId));
            }
            tempHtml.push('</ul>');
            return tempHtml.join('');
        };
        //render Footer
        var RenderFooter = function () {
            var tempHtml = [];
            tempHtml.push('<div class="ui-multiselect-widget-header ui-multiselect-helper-clearfix ui-multiselect-corner-all ui-multiselect-footer custom-ui-widget-header">');
            tempHtml.push('<a class="ui-multiselect-update-result" href="">' + o.updateResult + '</a>');
            tempHtml.push('</div>');
            return tempHtml.join('');
        };
        //add property value
        var AddPropertyValue = function () {
            // calculate widths
            var iconWidth = $select.find('span.ui-multiselect-icon').width();
            var inputWidth = o.minWidth - iconWidth + 3;

            // set widths
            $select.width(o.minWidth).find('input').width(inputWidth);
        };
        // binding event
        var checkCheckAll = function () {
            if (numGroup == $options.find('input[childgroupid="ui-multiselect-option-group-0"]').filter(':checked').length) {
                $headerCheckbox.prop('checked', true);
                $headerCheckbox.attr('checked', 'checked');
                $listGroupCheckBox.prop('checked', true);
                $listGroupCheckBox.attr('checked', 'checked');
            }
        };
        var UpdateSelected = function () {
            var $inputs = $inputHeaderCheckBox,
                    $checked = $inputs.filter(':checked'),
                    value = '',
                    numChecked = $checked.length;

            if (numChecked === 0) {
                value = o.noneSelectedText;
            } else {
                if (o.isUsedCustomCheckAllText && $inputs.length === numChecked) {
                    value = o.customCheckAllText;
                }
                else {
                    if (isShowGroup == false) {
                        var arrayItemChecked = [];
                        for (var i = 0; i < numChecked; i++) {
                            arrayItemChecked.push($checked[i].title);
                        }
                        value = arrayItemChecked.join(', ');
                        if (value.length * 8 > o.minWidth) {
                            value = o.selectedText.replace('#', numChecked);
                        }
                    }
                    else {
                        if (o.showParentSelectedText) {
                            var $parentChecked = $mainParentGroup.find('input:checked');
                            var parentCheckValue = [];
                            if ($parentChecked.length > 0) {
                                var arrayItemChecked = [];
                                numChecked = $parentChecked.length;
                                for (var i = 0; i < numChecked; i++) {
                                    arrayItemChecked.push($parentChecked[i].title);
                                    parentCheckValue.push($parentChecked[i].value);
                                }
                                value = arrayItemChecked.join(', ');
                                if (value.length * 8 > o.minWidth) {
                                    value = o.selectedText.replace('#', numChecked);
                                }
                            }
                            else {
                                value = o.noneSelectedText;
                            }

                            $select.attr('parent-checked-value', parentCheckValue.join(','));
                        }
                        else {
                            value = o.selectedText.replace('#', numChecked);
                        }
                    }
                }
            }

            // Update tooltip
            if (o.showTooltip) {
                var tooltipValue = $checked.map(function () { return this.title; }).get().join(', ');
                if (tooltipValue == '') {
                    tooltipValue = o.tooltipNoItem;
                }
                $select.attr("original-title", tooltipValue);
            }

            $select.find('input').val(value);
            return value;
        };

        var UpdateSelectedFromChild = function (currentGroup) {
            var parentGroup = currentGroup.parent().parent();
            if (parentGroup.prop("tagName").toLowerCase() == 'ul' && parentGroup.length > 0) {
                var currentChildren = parentGroup.find("li > div > label > input");
                var currentChildSelected = currentChildren.filter(':checked').length;
                if (currentChildren.length == currentChildSelected) {
                    parentGroup.prev().find('input').prop('checked', true);
                    parentGroup.prev().find('input').attr('checked', 'checked');
                }
                UpdateSelectedFromChild(parentGroup);
            }
        };

        var UpdateRemoveParentSelected = function (currentGroup) {
            if (currentGroup.hasClass('ui-multiselect-ul-group') && currentGroup.length > 0) {
                if (currentGroup.prev().find('input').prop('checked') == true) {//true) {
                    currentGroup.prev().find('input').prop('checked', false);
                    currentGroup.prev().find('input').removeAttr('checked');
                    $headerCheckbox.prop('checked', false);
                    $headerCheckbox.removeAttr('checked');
                }
                UpdateRemoveParentSelected(currentGroup.parent().parent());
            }
        };

        var BindingEvent = function () {
            // build header links
            if (o.showHeader) {
                $header.find('input').click(function (e) {
                    var $this = $(this);
                    if ($this.prop('checked') == true) {
                        $this.attr('checked', 'checked');
                        $options.find('label').not('.ui-multiselect-state-disabled').find('input').prop('checked', true);
                        $options.find('label').not('.ui-multiselect-state-disabled').find('input').attr('checked', 'checked');
                    }
                    else {
                        $this.removeAttr('checked');
                        $options.find('label').not('.ui-multiselect-state-disabled').find('input').prop('checked', false);
                        $options.find('label').not('.ui-multiselect-state-disabled').find('input').removeAttr('checked');
                    }
                    UpdateSelected();
                });
            }
            //build footer link
            if (o.showFooter) {
                $footer.find('a').click(function (e) {

                    o.onUpdateResult.call(this);
                    e.preventDefault();
                });
            }

            if (o.showTooltip) {
                try {
                    $select.tipsy(
                        {
                            html: true,
                            opacity: 0.9,
                            gravity: 'sw'
                        }
                    );

                }
                catch (e) { };
            }
            //add handler event collapse
            $listCollapse.each(function () {
                var $this = $(this);
                $this.click(function () {
                    if ($(this).hasClass('rtMinus')) {
                        //alert("aaa");
                        $(this).removeClass('rtMinus').addClass('rtPlus');
                    }
                    else {
                        $(this).removeClass('rtPlus').addClass('rtMinus');
                    }
                    $(this).parent().next().toggle();
                });

                var currentStatus = $this.attr('showstatus');
                if (currentStatus == 'false') {
                    $this.removeClass('rtMinus').addClass('rtPlus');
                    $this.parent().next().hide();
                    //$this.trigger('click');
                }
            });
            // the select box events
            $select.bind({
                click: function () {
                    $options.trigger('toggle');
                },
                keypress: function (e) {
                    switch (e.keyCode) {
                        case 27: // esc
                        case 38: // up
                            $options.trigger('close');
                            break;
                        case 40: // down
                        case 0: // space
                            $options.trigger('toggle');
                            break;
                    }
                },
                mouseenter: function () {
                    if (!$select.hasClass('ui-multiselect-state-disabled')) {
                        $(this).addClass('ui-multiselect-state-hover');
                    };

                },
                mouseleave: function () {
                    $(this).removeClass('ui-multiselect-state-hover');
                },
                focus: function () {
                    if (!$select.hasClass('ui-multiselect-state-disabled')) {
                        $(this).addClass('ui-multiselect-state-focus');
                    }
                },
                blur: function () {
                    $(this).removeClass('ui-multiselect-state-focus');
                }
            });
            // bind custom events to the options div
            $options.unbind('close');
            $options.unbind('open');
            $options.unbind('toggle');
            $options.bind({
                'close': function (e, others, isRetrieveData, targetId) {
                    if ($options.css('display') != 'none') {
                        others = others || false;

                        // hides all other options but the one clicked
                        if (others === true) {
                            $('div.ui-multiselect-options')
                                .filter(':visible')
                                .fadeOut(o.fadeSpeed)
                                .prev('a.ui-multiselect')
                                .removeClass('ui-multiselect-state-active')
                                .trigger('mouseout');

                            // hides the clicked options
                        } else {
                            $select.removeClass('ui-multiselect-state-active').trigger('mouseout');
                            $options.fadeOut(o.fadeSpeed);
                        }
                        if (o.isRetrieveDataAfterClose) {
                            isRetrieveData = isRetrieveData || false;
                            if (isRetrieveData) {
                                $allLabel.find('input[ischeck="true"]').attr('checked', 'checked');
                                if (isOpenning == true) {
                                    $allLabel.find('input[ischeck!="true"]').removeAttr('checked');
                                }
                            }
                            $allLabel.find('input').removeAttr('isCheck');
                        }
                        UpdateSelected();
                        //$.fn.multiSelect.defaults.onLeave();
                        if (typeof (targetId) != "undefined" && (targetId != $select.attr("id") || targetId == 'html') && isOpenning == true) {
                            o.onLeave.call($select);
                        }

                        isOpenning = false;
                    }
                },
                'open': function (e, closeOthers) {

                    // bail if this widget is disabled
                    if ($select.hasClass('ui-multiselect-state-disabled')) {
                        return;
                    }

                    //currentTriggerEvents.push(e.)

                    // use position() if inside ui-widget-content, because offset() won't cut it.
                    var offset = $select.position(),
                            $container = $options.find('ul:last'),
                            top, width;

                    // calling select is active
                    $select.addClass('ui-multiselect-state-active');

                    // hide all other options
                    if (closeOthers || typeof closeOthers === 'undefined') {
                        //$options.trigger('close', [true, true]);
                        $('div.ui-multiselect-options').trigger('close', [true, true, 'html']);
                    }

                    // calculate positioning
                    if (o.position === 'middle') {
                        top = (offset.top + ($select.height() / 2) - ($options.outerHeight() / 2));
                    } else if (o.position === 'top') {
                        top = (offset.top - $options.outerHeight());
                    } else {
                        top = (offset.top + $select.outerHeight());
                    }
                    top += 3; // padding extra 3px to seperate options with multi select div 

                    // calculate the width of the options menu
                    if (browserDectect.msie) {
                        width = $select.width() - 2 - parseInt($options.css('padding-left'), 10) - parseInt($options.css('padding-right'), 10);
                    } else {
                        width = $select.width() + 2 - parseInt($options.css('padding-left'), 10) - parseInt($options.css('padding-right'), 10);
                    }

                    // select the first option
                    //$labels.filter('label:first').trigger('mouseenter').trigger('focus');

                    // show the options div + position it
                    $options.css({
                        position: 'absolute',
                        top: top + 'px',
                        left: offset.left + 'px',
                        width: width + 'px'
                    }).show();

                    // set the scroll of the checkbox container
                    $container.scrollTop(0);

                    // set the height of the checkbox container

                    if (o.maxHeight) {
                        if (o.maxHeight <= $body.height()) {
                            $body.css('max-height', o.maxHeight);
                        }
                    }
                    if (o.isRetrieveDataAfterClose) {
                        $allLabel.find('input').filter(':checked').attr("ischeck", "true");
                    }

                    isOpenning = true;
                    //o.onOpen.call($options[0]);
                },
                'toggle': function () {
                    var isHide = $(this).is(':hidden');
                    if (isHide) {
                        $options.trigger('open');
                    }
                    else {
                        $options.trigger('close', [true, true]);
                    }
                }
            });
            // checkbox click event handle
            $listItem.each(function () {
                var $this = $(this);
                //handle group checkbox click event
                $this.prev().children().not('span.collapseClass').find('input').click(function () {
                    if ($(this).prop('checked') == true) {
                        $(this).attr('checked', 'checked');
                        $(this).parent().parent().next().find('input:not(:disabled)').prop('checked', true);
                        UpdateSelectedFromChild($this);
                        checkCheckAll();
                    }
                    else {
                        $(this).parent().parent().next().find('input:not(:disabled)').removeAttr('checked');
                        $(this).parent().parent().next().find('input:not(:disabled)').prop('checked', false);
                        $headerCheckbox.removeAttr('checked');
                        $headerCheckbox.prop('checked', false);
                    }
                    o.onCheck.call(this);
                    UpdateSelected();
                });


                //handler chilren checkbox event
                var childrenNodes = $this.find('input[childgroupid="' + $this.attr("childgroupid") + '"]');
                childrenNodes.click(function () {
                    var parent = $this;
                    var current = $(this);
                    if (current.prop('checked') == false) {
                        current.removeAttr('checked');
                        UpdateRemoveParentSelected(parent);
                    }
                    else if (current.prop('checked') == true) {
                        current.attr('checked', 'checked');
                        var currentGroup = parent;
                        var currentChildSelected = childrenNodes.filter(':checked').length;
                        var currentChildLength = childrenNodes.length;
                        if (currentChildLength == currentChildSelected) {
                            currentGroup.prev().find('input').prop('checked', true);
                            currentGroup.prev().find('input').attr('checked', 'checked');
                            UpdateSelectedFromChild(current.parent().parent().parent().parent());
                        }
                        checkCheckAll();
                    }
                    o.onCheck.call(this);
                    UpdateSelected();
                });
            });
            //handle collapse button
            $('#' + id + "CollapseButton").click(function () {
                if ($(this).hasClass("ui-multiselect-icon-collapse")) {
                    $(this).removeClass("ui-multiselect-icon-collapse").addClass("ui-multiselect-icon-expand");
                    $options.find('ul.ui-multiselect-ul-group:not(.ui-multiselect-checkboxes):visible').hide();
                    $options.find('span.collapseClass').removeClass('rtMinus').addClass('rtPlus'); ;
                    //$(this).text('Expande All');
                }
                else {
                    $options.find('ul.ui-multiselect-ul-group:not(.ui-multiselect-checkboxes):hidden').show();
                    $options.find('span.collapseClass').removeClass('rtPlus').addClass('rtMinus');
                    $(this).removeClass("ui-multiselect-icon-expand").addClass("ui-multiselect-icon-collapse");
                }
            });
        };
        //initial setup
        var InitialSetup = function () {
            if (o.isCheckAll === true) {
                $headerCheckbox.attr('checked', 'checked');
            }
            // open by default?
            if (o.state === 'open') {
                $options.trigger('open', [false]);
            }

            // update the number of selected elements when the page initially loads, and use that as the defaultValue.  necessary for form resets when options are pre-selected.
            $select.find('input')[0].defaultValue = UpdateSelected();
            //$options.trigger('closed', [true]);
            //            $('div.ui-multiselect-options').trigger('close', [true]);
            $options.hide();
        };

        //Render All
        (function () {
            checkShouldShowGroupOrNo();
            html.push(RenderInterface(id, isDisabled || o.disabled, o.noneSelectedText));
            html.push('<div class="ui-multiselect-options RadTreeView RadTreeView_Office2010Silver' + (o.shadow ? ' ui-multiselect-shadow' : '') + ' ui-multiselect-widget ui-multiselect-widget-content ui-multiselect-corner-all" >');
            if (o.listData.length != 0) {
                html.push(RenderHeader(id, o.checkAllText));
                html.push(RenderBody());
            }
            else {
                html.push(RenderNoItemHeader(id, o.noItemText));
            }
            if (o.showFooter == true) {
                html.push(RenderFooter());
            }
            html.push('</div>');

            //add global variable

            $select = $select.after(html.join('')).next('a.ui-multiselect');
            $options = $select.next('div.ui-multiselect-options');
            $options.attr('id', 'ui-multiselect-options-' + id);
            $options = $('#ui-multiselect-options-' + id);
            $header = $options.find('div.ui-multiselect-header');
            $body = $options.find('ul.ui-multiselect-checkboxes');
            $footer = $options.find('div.ui-multiselect-footer');
            $labels = $options.find('label').not('.ui-multiselect-state-disabled').not('.ui-multiselect-group-mark');
            $allLabel = $options.find('label');
            $listItem = $options.find('ul.ui-multiselect-ul-group');
            $listCollapse = $options.find('span.collapseClass');
            $listGroupCheckBox = $options.find('label.ui-multiselect-group-mark').find('input');
            $divHover = $options.find('div.ui-multiselect-div');
            $mainParentGroup = $options.children().filter('ul.ui-multiselect-checkboxes')
                            .children()
                            .children()
                            .filter('.ui-multiselect-div');

            AddPropertyValue();
            BindingEvent();

            $inputHeaderCheckBox = $labels.find('input').not("#" + id + "HeaderCheckBox");
            $selectinput = $select.find('input');
            $headerCheckbox = $options.find("#" + id + "HeaderCheckBox");
            $checkedInput = $labels.find('input:checked');

            InitialSetup();
            // remove the original input element

            $original.remove();
        })();
        return $select;
    };
    // close each select when clicking on any other element/anywhere else on the page
    $(document).delegate('html', 'click.monpickr', function (e, isInsideCall) {
        var $target = $(e.target);
        if (!$target.closest('div.ui-multiselect-options').length && !$target.parent().hasClass('ui-multiselect')) {
            if (!$target.hasClass('exeption-multiselect-click')) {
                $('div.ui-multiselect-options').trigger('close', [true, true, ($target.attr("id") || 'html')]);
            }
        }
    });


    // default options
    $.fn.multiSelect.defaults = {
        showCheckAll: true,
        showHeader: true,
        showFooter: true,
        showTooltip: false,
        maxHeight: 175, /* max height of the checkbox container (scroll) in pixels */
        minWidth: 215, /* min width of the entire widget in pixels. setting to 'auto' will disable */
        checkAllText: 'Check All',
        noItemText: 'No item found.',
        unCheckAllText: 'Uncheck All',
        updateResult: 'Update Result Table',
        noneSelectedText: 'Select options',
        selectedText: '# selected',
        tooltipNoItem: 'There is no selected item.',
        selectedList: 0,
        position: 'bottom', /* top|middle|bottom */
        shadow: false,
        fadeSpeed: 100,
        disabled: false,
        state: 'closed',
        multiple: true,
        isCheckAll: false,
        hasOptGroup: false,
        isRetrieveDataAfterClose: false,
        listData: [],
        buttons: [],
        isUsedCustomCheckAllText: false,
        customCheckAllText: '',
        columnNumber: 1,
        showParentSelectedText: false,
        onLeave: function () { },
        onCheck: function () { }, /* when an individual checkbox is clicked */
        onOpen: function () { }, /* when the select menu is opened */
        onCheckAll: function () { }, /* when the check all link is clicked */
        onUncheckAll: function () { }, /* when the uncheck all link is clicked */
        onOptgroupToggle: function () { }, /* when the optgroup heading is clicked */
        onUpdateResult: function () { }
    };

})(jQuery);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")))

/***/ }),

/***/ "./www/js/source/lib/numberformat.js":
/*!*******************************************!*\
  !*** ./www/js/source/lib/numberformat.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * jquery.numberformatter - Formatting/Parsing Numbers in jQuery
 *
 * Originally written by
 * Michael Abernethy (mike@abernethysoft.com),
 * Andrew Parry (aparry0@gmail.com)
 *
 * Updated by Sven Busse
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * @author Sven Busse
 **/

// Customize to use AMD module
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($) {
    function NumberFormatter() {
        this.defaults = {
            format: "#,###.00",
            locale: "us",
            decimalSeparatorAlwaysShown: false,
            nanForceZero: true,
            round: true,
            isFullLocale: false,
            overrideGroupSep: null,
            overrideDecSep: null,
            overrideNegSign: null,
            isPercentage: false,            // treats the input as a percentage (i.e. input multiplied by 100)
            autoDetectPercentage: true      // will search if the format string ends with '%', if it does then the above option is implicitly set
        };

        var nfLocales = { initialized: false };

        var nfLocalesLikeUS = ['ae', 'ar', 'au', 'ca', 'cn', 'eg', 'gb', 'hk', 'il', 'in', 'jp', 'mx', 'sa', 'sk', 'th', 'tw', 'us', 'za'];
        var nfLocalesLikeDE = ['at', 'be', 'br', 'de', 'dk', 'ee', 'es', 'gr', 'it', 'lt', 'lv', 'nl', 'pt', 'tr', 'vn'];
        var nfLocalesLikeFR = ['bg', 'cz', 'fi', 'fr', 'no', 'pl', 'ro', 'ru', 'se'];
        var nfLocalesLikeCH = ['ch'];

        var nfLocaleFormatting = [[".", ","], [",", "."], [",", " "], [".", "'"]];
        var nfAllLocales = [nfLocalesLikeUS, nfLocalesLikeDE, nfLocalesLikeFR, nfLocalesLikeCH];

        function init() {
            // write the arrays into the hashtable
            for (var localeGroupIdx = 0; localeGroupIdx < nfAllLocales.length; localeGroupIdx++) {
                var localeGroup = nfAllLocales[localeGroupIdx];
                for (var i = 0; i < localeGroup.length; i++) {
                    nfLocales[localeGroup[i]] = localeGroupIdx;
                }
            }

            nfLocales.initialized = true;
        }

        function formatCodes(locale, isFullLocale) {
            if (!nfLocales.initialized)
                init();

            // default values
            var dec = ".";
            var group = ",";
            var neg = "-";

            if (isFullLocale == false) {
                // Extract and convert to lower-case any language code from a real 'locale' formatted string, if not use as-is
                // (To prevent locale format like : "fr_FR", "en_US", "de_DE", "fr_FR", "en-US", "de-DE")
                if (locale.indexOf('_') != -1)
                    locale = locale.split('_')[1].toLowerCase();
                else if (locale.indexOf('-') != -1)
                    locale = locale.split('-')[1].toLowerCase();
            }

            // hashtable lookup to match locale with codes
            var codesIndex = nfLocales[locale];
            if (codesIndex) {
                var codes = nfLocaleFormatting[codesIndex];
                if (codes) {
                    dec = codes[0];
                    group = codes[1];
                }
            }
            return { dec: dec, group: group, neg: neg };
        }

        function _roundNumber(number, decimalPlaces) {
            var power = Math.pow(10, decimalPlaces || 0);
            var value = String(Math.round(number * power) / power);

            // ensure the decimal places are there
            if (decimalPlaces > 0) {
                var dp = value.indexOf(".");
                if (dp == -1) {
                    value += '.';
                    dp = 0;
                } else {
                    dp = value.length - (dp + 1);
                }

                while (dp < decimalPlaces) {
                    value += '0';
                    dp++;
                }
            }
            return value;
        }

        /**
         * Formats a Number object into a string, using the given formatting options
         *
         * @param {Object} numberString
         * @param {Object} options
         */
        function _formatNumber(number, options, suffix, prefix, negativeInFront) {
            options = $.extend({}, this.defaults, options);
            var formatData = formatCodes(options.locale.toLowerCase(), options.isFullLocale);

            var dec = formatData.dec;
            var group = formatData.group;
            var neg = formatData.neg;

            // check overrides
            if (options.overrideGroupSep != null) {
                group = options.overrideGroupSep;
            }
            if (options.overrideDecSep != null) {
                dec = options.overrideDecSep;
            }
            if (options.overrideNegSign != null) {
                neg = options.overrideNegSign;
            }

            // Check NAN handling
            var forcedToZero = false;
            if (isNaN(number)) {
                if (options.nanForceZero == true) {
                    number = 0;
                    forcedToZero = true;
                } else {
                    return '';
                }
            }

            // special case for percentages
            if (options.isPercentage == true || (options.autoDetectPercentage && suffix.charAt(suffix.length - 1) == '%')) {
                number = number * 100;
            }

            var returnString = "";
            if (options.format.indexOf(".") > -1) {
                var decimalPortion = dec;
                var decimalFormat = options.format.substring(options.format.lastIndexOf(".") + 1);

                // round or truncate number as needed
                if (options.round == true)
                    number = Number(_roundNumber(number, decimalFormat.length));
                else {
                    var numStr = number.toString();
                    if (numStr.lastIndexOf('.') > 0) {
                        numStr = numStr.substring(0, numStr.lastIndexOf('.') + decimalFormat.length + 1);
                    }
                    number = Number(numStr);
                }

                var decimalValue = Number(number.toString().substring(number.toString().indexOf('.')));
                var decimalString = String(_roundNumber(decimalValue, decimalFormat.length));
                decimalString = decimalString.substring(decimalString.lastIndexOf('.') + 1);
                for (var i = 0; i < decimalFormat.length; i++) {
                    if (decimalFormat.charAt(i) == '#' && decimalString.charAt(i) != '0') {
                        decimalPortion += decimalString.charAt(i);
                    } else if (decimalFormat.charAt(i) == '#' && decimalString.charAt(i) == '0') {
                        var notParsed = decimalString.substring(i);
                        if (notParsed.match('[1-9]')) {
                            decimalPortion += decimalString.charAt(i);
                        } else
                            break;
                    } else if (decimalFormat.charAt(i) == "0")
                        decimalPortion += decimalString.charAt(i);
                }
                returnString += decimalPortion
            } else
                number = Math.round(number);

            var ones = Math.floor(number);
            if (number < 0)
                ones = Math.ceil(number);

            var onesFormat = "";
            if (options.format.indexOf(".") == -1)
                onesFormat = options.format;
            else
                onesFormat = options.format.substring(0, options.format.indexOf("."));

            var onePortion = "";
            if (!(ones == 0 && onesFormat.substr(onesFormat.length - 1) == '#') || forcedToZero) {
                // find how many digits are in the group
                var oneText = String(Math.abs(ones));
                var groupLength = 9999;
                if (onesFormat.lastIndexOf(",") != -1)
                    groupLength = onesFormat.length - onesFormat.lastIndexOf(",") - 1;
                var groupCount = 0;
                for (i = oneText.length - 1; i > -1; i--) {
                    onePortion = oneText.charAt(i) + onePortion;
                    groupCount++;
                    if (groupCount == groupLength && i != 0) {
                        onePortion = group + onePortion;
                        groupCount = 0;
                    }
                }

                // account for any pre-data padding
                if (onesFormat.length > onePortion.length) {
                    var padStart = onesFormat.indexOf('0');
                    if (padStart != -1) {
                        var padLen = onesFormat.length - padStart;

                        // pad to left with 0's or group char
                        var pos = onesFormat.length - onePortion.length - 1;
                        while (onePortion.length < padLen) {
                            var padChar = onesFormat.charAt(pos);
                            // replace with real group char if needed
                            if (padChar == ',')
                                padChar = group;
                            onePortion = padChar + onePortion;
                            pos--;
                        }
                    }
                }
            }

            if (!onePortion && onesFormat.indexOf('0', onesFormat.length - 1) !== -1)
                onePortion = '0';

            returnString = onePortion + returnString;

            // handle special case where negative is in front of the invalid characters
            if (number < 0 && negativeInFront && prefix.length > 0)
                prefix = neg + prefix;
            else if (number < 0)
                returnString = neg + returnString;

            if (!options.decimalSeparatorAlwaysShown) {
                if (returnString.lastIndexOf(dec) == returnString.length - 1) {
                    returnString = returnString.substring(0, returnString.length - 1);
                }
            }
            returnString = prefix + returnString + suffix;
            return returnString;
        }

        /*  Formatting Methods  */

        /**
         * First parses a string and reformats it with the given options.
         *
         * @param {Object} numberString
         * @param {Object} options
         */
        this.formatNumber = function (numberString, options) {
            options = $.extend({}, this.defaults, options);
            var formatData = formatCodes(options.locale.toLowerCase(), options.isFullLocale);

            var dec = formatData.dec;
            var group = formatData.group;
            var neg = formatData.neg;

            var validFormat = "0#-,.";

            // in the prefix & suffix part of the format string, characters can be escaped
            // by surrounding them in single quotes, so they are not intepreted as formatting placeholders
            var singleQuote = '\'';
            var nextCharIsQuoted = false;

            // strip all the invalid characters at the beginning and the end
            // of the format, and we'll stick them back on at the end
            // make a special case for the negative sign "-" though, so
            // we can have formats like -$23.32
            var prefix = "";
            var negativeInFront = false;
            for (var i = 0; i < options.format.length; i++) {
                if (options.format.charAt(i) == singleQuote) {
                    if (options.format.charAt(i + 1) == singleQuote) {
                        prefix = prefix + singleQuote;
                    }
                    nextCharIsQuoted = !nextCharIsQuoted && options.format.charAt(i + 2) == singleQuote;
                } else if (validFormat.indexOf(options.format.charAt(i)) == -1 || nextCharIsQuoted) {
                    prefix = prefix + options.format.charAt(i);
                } else {
                    if (i == 0 && options.format.charAt(i) == '-') {
                        negativeInFront = true;
                    } else {
                        // end of prefix has been reached, remove it from format string
                        options.format = options.format.substring(i, options.format.length);
                        break;
                    }
                }
            }
            var suffix = "";
            for (i = options.format.length - 1; i >= 0; i--) {
                if (options.format.charAt(i) == singleQuote) {
                    if (options.format.charAt(i - 1) == singleQuote) {
                        suffix = singleQuote + suffix;
                    }
                    nextCharIsQuoted = !nextCharIsQuoted && options.format.charAt(i - 2) == singleQuote;
                } else if (validFormat.indexOf(options.format.charAt(i)) == -1 || nextCharIsQuoted) {
                    suffix = options.format.charAt(i) + suffix;
                } else {
                    // beginning of suffix has been reached, remove it from format string
                    options.format = options.format.substring(0, i + 1);
                    break;
                }
            }

            // now we need to convert it into a number
            //while (numberString.indexOf(group) > -1)
            //  numberString = numberString.replace(group, '');
            //var number = new Number(numberString.replace(dec, ".").replace(neg, "-"));
            var number = Number(numberString);

            return _formatNumber(number, options, suffix, prefix, negativeInFront);
        };
    }

    return NumberFormatter;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }),

/***/ "./www/js/source/pages/customer/customercomm/commgroup.js":
/*!****************************************************************!*\
  !*** ./www/js/source/pages/customer/customercomm/commgroup.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Site) {
    'use strict';

    function goToCustomerList(groupCommId) {
        if (isParentSameOrigin()) {
            // Deactive Commission Group menu (55) and active Customer list menu (43)
            $('li>#MenuItem55', window.parent.document).parent().removeClass('active');
            $('li>#MenuItem43', window.parent.document).parent().addClass('active');
            _me.setPageTitle(Site.getSingleResource('CustomerList'));
        }
        Site.redirect(Site.resolveClientUrl('Customer/CustomerList?groupId=' + groupCommId));
    }

    function setPageTitle(title) {
        if (isParentSameOrigin()) {
            $('#page-title', window.parent.document).text(title);
        }
    }

    function isParentSameOrigin() {
        let sameOrigin;
        try {
            sameOrigin = window.parent.location.host === window.location.host;
        }
        catch (e) {
            sameOrigin = false;
        }
        return sameOrigin;
    }

    const _me = {
        goToCustomerList: goToCustomerList,
        setPageTitle: setPageTitle
    };

    return _me;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./www/js/source/pages/customer/customercomm/commgrouplist.js":
/*!********************************************************************!*\
  !*** ./www/js/source/pages/customer/customercomm/commgrouplist.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js"), __webpack_require__(/*! common/popup */ "./www/js/source/common/popup.js"), __webpack_require__(/*! ./commgroup */ "./www/js/source/pages/customer/customercomm/commgroup.js"), __webpack_require__(/*! lib/numberformat */ "./www/js/source/lib/numberformat.js"),
    __webpack_require__(/*! lib/jquery.multiselect.nlevel */ "./www/js/source/lib/jquery.multiselect.nlevel.js"), __webpack_require__(/*! lib/bootstrap-table/bootstrap-table */ "./www/js/source/lib/bootstrap-table/bootstrap-table.js"), __webpack_require__(/*! lib/bootstrap-table/bootstrap-table-fixed-columns */ "./www/js/source/lib/bootstrap-table/bootstrap-table-fixed-columns.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Site, Popup, CustomerCommGroup, NumberFormatter) {
        'use strict';

        const deleteGroupData = {
            groupId: 0,
            isRemovePlayerComm: false,
            isResetDefault: false
        };

        function initialize() {
            Site.initialize();
            Site.addUserGuide({
                resourceName: 'CommissionGroupList',
                title: Site.getSingleResource('CommissionGroupList')
            });

            _me.initEvent();
        }

        function initEvent() {
            $('#ExportToExcel').click(function () {
                $('#CommissionGroupForm').submit();
            });
            initShowHideProducts();
            initTableComm();
        }

        function confirmDeleteCommGroup(groupId) {
            $.ajax({
                url: Site.resolveClientUrl('CustomerComGroup/GetDefaultGroup'),
                type: 'GET',
                dataType: 'JSon',
                cache: false,
                success: function (response) {
                    deleteGroupData.groupId = groupId;
                    if (response.id.toString() === groupId.toString()) {
                        deleteGroupData.isResetDefault = true;
                        _me.showConfirmDeleteDefaulCommGroupPopup();
                    }
                    else {
                        deleteGroupData.isResetDefault = false;
                        _me.showOptionDeleteCommGroupPopup();
                    }
                }
            });
        }

        function deleteCommGroup() {
            $.ajax({
                type: 'POST',
                url: Site.resolveClientUrl('CustomerComGroup/Delete'),
                data: deleteGroupData,
                success: function (result) {
                    if (result.Code > 0) {
                        _me.showResultPopup(Site.getSingleResource('Error'), result.Message);
                    } else {
                        _me.showResultPopup(Site.getSingleResource('Success'), Site.getSingleResource('MessageSuccess'));

                        setTimeout(() => {
                            Site.redirect(Site.resolveClientUrl('CustomerComGroup/Index'));
                        }, 3000);
                    }

                    Site.unBlockUI();
                },
                beforeSend: Site.blockUI
            });
        }

        function showConfirmDeleteDefaulCommGroupPopup() {
            const options = {
                modal: true,
                title: Site.getSingleResource('Confirm'),
                height: 'auto',
                id: 'del-default-comm-group',
                width: 380
            };

            const buttons = [
                {
                    text: Site.getSingleResource('OK'),
                    isClosedOnClick: true,
                    click: _me.showOptionDeleteCommGroupPopup,
                    classes: 'btn btn-submit'
                }, {
                    text: Site.getSingleResource('Cancel'),
                    isClosedOnClick: true,
                    classes: 'btn btn-cancel'
                }];

            Popup.openPopupWithButton('<div><p>' + Site.getSingleResource('DefaultGroupMsg') + '</p></div>', options, buttons);
        }

        function showOptionDeleteCommGroupPopup() {
            let popup = $('#option-del-comm-group');

            if (popup.length === 0) {
                popup = $('#confirm-delete-comm-group');
                popup.remove();
                popup.find('input[name="IsRemovePlayerComm"]').on('click', function () {
                    $(this).prop('checked', true);
                });
            }

            const options = {
                modal: true,
                title: Site.getSingleResource('DeleteCommissionGroup'),
                height: 'auto',
                id: 'option-del-comm-group',
                width: 380
            };

            const buttons = [
                {
                    text: Site.getSingleResource('Delete'),
                    isClosedOnClick: true,
                    click: function () {
                        deleteGroupData.isRemovePlayerComm = $('input[name="IsRemovePlayerComm"]:checked').val();
                        _me.showConfirmDeleteCommGroupPopup();
                    },
                    classes: 'btn btn-submit'
                }, {
                    text: Site.getSingleResource('Cancel'),
                    isClosedOnClick: true,
                    click: function () {
                        $('#IsRemovePlayerComm').prop('checked', true);
                    },
                    classes: 'btn btn-cancel',
                    id: 'option-del-comm-group-cancel'
                }];

            Popup.openPopupWithButton(popup, options, buttons);
        }

        function showConfirmDeleteCommGroupPopup() {
            const options = {
                modal: true,
                title: Site.getSingleResource('Confirm'),
                height: 'auto',
                id: 'confirm-del-comm-group',
                width: 380
            };

            const buttons = [
                {
                    text: Site.getSingleResource('OK'),
                    isClosedOnClick: true,
                    click: _me.deleteCommGroup,
                    classes: 'btn btn-submit'
                }, {
                    text: Site.getSingleResource('Cancel'),
                    isClosedOnClick: true,
                    click: _me.showOptionDeleteCommGroupPopup,
                    classes: 'btn btn-cancel',
                    id: 'confirm-del-comm-group-cancel'
                }];

            Popup.openPopupWithButton('<div><p>' + Site.getSingleResource('AreYouSure') + '</p></div>', options, buttons);
        }

        function showResultPopup(title, message) {
            const options = {
                modal: true,
                title: title,
                height: 'auto',
                id: 'result-del-comm-group',
                width: 380
            };

            if ($('#result-del-comm-group').length > 0) {
                $('#result-msg').html(message);
            }

            const buttons = [
                {
                    text: Site.getSingleResource('OK'),
                    isClosedOnClick: true,
                    classes: 'btn btn-submit',
                    id: 'result-OK'
                }];

            Popup.openPopupWithButton('<div><p id="result-msg">' + message + '</p></div>', options, buttons);
        }

        function initShowHideProducts() {
            let products = $('#ProductList').val().split(",");
            var dataUI = [];
            for (let i = 0; i < products.length; i++) {
                var product = products[i];
                dataUI.push({
                    Id: product,
                    Value: product,
                    Text: Site.getSingleResource("Product" + product),
                    Checked: true,
                    Enable: true,
                    Css: '',
                    CssClass: ''
                });
            }

            $("#mult-products").multiSelect({
                minWidth: 200,
                maxHeight: 400,
                shadow: true,
                showHeader: true,
                isCheckAll: true,
                showFooter: false,
                checkAllText: Site.getSingleResource('All'),
                noneSelectedText: Site.getSingleResource('SelectOptions'),
                tooltipNoItem: Site.getSingleResource('ThereIsNoSelectedItem'),
                selectedText: Site.getSingleResource('SelectedItemCount'),
                listData: dataUI,
                onCheck: function () {
                    var l = $(".fixed-table-container > .fixed-table-body").scrollLeft();
                    freezeTableCommColumns();
                    if (l > 0) {
                        $(".fixed-table-container > .fixed-table-body").scrollLeft(l);
                    }

                    $('#comm-group-list .delete-comm-group').on('click', function (e) {
                        _me.confirmDeleteCommGroup($(e.target).data('id'));
                    });
                }
            });
        }

        function initTableComm() {
            freezeTableCommColumns();

            $('#comm-group-list .delete-comm-group').on('click', function (e) {
                _me.confirmDeleteCommGroup($(e.target).data('id'));
            });
        }

        function freezeTableCommColumns() {
            let $tableComm = $('#comm-group-list');

            const formatter = new NumberFormatter();

            let columns = [
                { field: 'RowNum', valign: 'middle', align: 'center', title: '#', width: 80, class: 'col-frozen' },
                { field: 'GroupCommId', valign: 'middle', align: 'center', title: Site.getSingleResource('GroupId'), width: 100, class: 'col-frozen' },
                {
                    field: 'GroupName',
                    valign: 'middle',
                    halign: 'center',
                    align: 'left',
                    title: Site.getSingleResource('GroupName'),
                    width: 200,
                    class: 'col-frozen',
                    formatter: function (val, row) {
                        var url = Site.resolveClientUrl('CustomerComGroup/Update?groupId=' + row.GroupCommId);
                        return `<a href="${url}" title="${Site.getSingleResource('EditGroup')}" class="truncate">${val}</a>`;
                    }
                },
                {
                    field: 'IsDefaultGroup',
                    valign: 'middle',
                    align: 'center',
                    title: Site.getSingleResource('DefaultGroup'),
                    width: 120,
                    class: 'col-frozen',
                    formatter: function (val) {
                        var s = val ? "icon-checkmark" : "";
                        return `<div class="${s}"></div>`;
                    }
                },
                {
                    field: 'NumberOfCustomer',
                    valign: 'middle',
                    align: 'center',
                    title: Site.getSingleResource('NoOfCustmer'),
                    width: 120,
                    class: 'col-frozen',
                    formatter: function (val) {
                        var n = formatter.formatNumber(val, { format: '#,##0' });
                        return `<a>${n}</a>`;
                    }
                }];

            let products = $('#ProductList').val().split(",");
            let selectedProducts = $("#mult-products").multiSelect("getCheckedItems");
            for (var i = 0; i < products.length; i++) {
                var key = products[i];
                columns.push({
                    field: 'Col-' + key,
                    valign: 'middle',
                    align: 'center',
                    title: Site.getSingleResource('Product' + key),
                    class: `col-${key} ${selectedProducts.indexOf(key) != -1 ? "" : "hide"}`,
                    width: key.includes("Parlay") ? 150 : 115,
                    formatter: function (val) {
                        var n = formatter.formatNumber(val * 100, { format: '#,##0.00' });
                        return `${n}%`;
                    }
                });
            }

            columns.push({
                field: 'GroupColor',
                valign: 'middle',
                align: 'center',
                title: Site.getSingleResource('GroupColor'),
                width: 100,
                class: 'col-frozen',
                formatter: function (val) {
                    return `<div class="group-color-box" style="background-color:${val || '#ffffff'};"></div>`;
                }
            });

            columns.push({
                field: 'EditGroup',
                valign: 'middle',
                align: 'center',
                title: Site.getSingleResource('EditGroup'),
                width: 100,
                class: 'col-frozen',
                formatter: function (_, row) {
                    let editUrl = Site.resolveClientUrl('CustomerComGroup/Update?groupId=' + row.GroupCommId);
                    return `<a class="icon-pencil" title="${Site.getSingleResource('EditGroup')}" href="${editUrl}"></a>\
                            <a class="icon-bin delete-comm-group" title="${Site.getSingleResource('DeleteGroup')}" data-id="${row.GroupCommId}"></a>`;
                }
            });

            let rows = [];
            let data = $.parseJSON($("#CommGroupsData").val());
            for (var i = 0; i < data.length; i++) {
                let item = data[i];
                let row = {
                    RowNum: i + 1,
                    ...item
                };

                let commValues = item.CommValues;
                for (var j = 0; j < products.length; j++) {
                    var key = products[j];
                    row['Col-' + key] = commValues[key];
                }

                rows.push(row);
            }

            let gridOptions = {
                columns: columns,
                data: rows,
                fixedColumns: true,
                fixedNumber: 5,
                fixedRightNumber: 2,
                showColumns: false
            };

            $tableComm.bootstrapTable('destroy').bootstrapTable(gridOptions);
        }

        const _me = {
            initialize: initialize,
            initEvent: initEvent,
            confirmDeleteCommGroup: confirmDeleteCommGroup,
            showConfirmDeleteDefaulCommGroupPopup: showConfirmDeleteDefaulCommGroupPopup,
            showOptionDeleteCommGroupPopup: showOptionDeleteCommGroupPopup,
            showConfirmDeleteCommGroupPopup: showConfirmDeleteCommGroupPopup,
            showResultPopup: showResultPopup,
            deleteCommGroup: deleteCommGroup
        };

        return _me;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./www/js/source/pages/customer/customercomm/main-commgrouplist.js":
/*!*************************************************************************!*\
  !*** ./www/js/source/pages/customer/customercomm/main-commgrouplist.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./commgrouplist */ "./www/js/source/pages/customer/customercomm/commgrouplist.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (CustomerCommGroupList) {
    'use strict';

    $(CustomerCommGroupList.initialize);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")))

/***/ }),

/***/ 33:
/*!*******************************************************************************!*\
  !*** multi ./www/js/source/pages/customer/customercomm/main-commgrouplist.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./www/js/source/pages/customer/customercomm/main-commgrouplist.js */"./www/js/source/pages/customer/customercomm/main-commgrouplist.js");


/***/ })

/******/ });
//# sourceMappingURL=commgrouplist.chunk.js.map