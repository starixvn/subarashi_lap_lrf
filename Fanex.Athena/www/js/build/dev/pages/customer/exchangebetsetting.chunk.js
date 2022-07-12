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
/******/ 		"www/js/build/dev/pages/customer/exchangebetsetting": 0
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
/******/ 	deferredModules.push([48,"www/js/build/dev/pages/lib/common"]);
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

/***/ "./www/js/source/lib/jquery.balloon.js":
/*!*********************************************!*\
  !*** ./www/js/source/lib/jquery.balloon.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {///
/**
* Hover balloon on elements without css and images.
*
* Copyright (c) 2011 Hayato Takenaka
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* @author: Hayato Takenaka (http://urin.take-uma.net)
* @version: 0.3.0 - 2012/02/25
**/
; (function ($) {
    //-----------------------------------------------------------------------------
    // Private
    //-----------------------------------------------------------------------------
    // Helper for meta programming
    var Meta = {};
    Meta.pos = $.extend(["top", "bottom", "left", "right"], { camel: ["Top", "Bottom", "Left", "Right"] });
    Meta.size = $.extend(["height", "width"], { camel: ["Height", "Width"] });
    Meta.getRelativeNames = function (position) {
        var idx = {
            pos: {
                o: position,                                          // origin
                f: (position % 2 == 0) ? position + 1 : position - 1, // faced
                p1: (position % 2 == 0) ? position : position - 1,
                p2: (position % 2 == 0) ? position + 1 : position,
                c1: (position < 2) ? 2 : 0,
                c2: (position < 2) ? 3 : 1
            },
            size: {
                p: (position < 2) ? 0 : 1, // parallel
                c: (position < 2) ? 1 : 0  // cross
            }
        };
        var names = {};
        for (var m1 in idx) {
            if (!names[m1]) names[m1] = {};
            for (var m2 in idx[m1]) {
                names[m1][m2] = Meta[m1][idx[m1][m2]];
                if (!names.camel) names.camel = {};
                if (!names.camel[m1]) names.camel[m1] = {};
                names.camel[m1][m2] = Meta[m1].camel[idx[m1][m2]];
            }
        }
        names.isTopLeft = (names.pos.o == names.pos.p1);
        return names;
    };

    // Helper class to handle position and size as numerical pixels.
    function NumericalBoxElement() { this.initialize.apply(this, arguments); }
    (function () {
        // Method factories
        var Methods = {
            setBorder: function (pos, isVertical) {
                return function (value) {
                    this.$.css("border-" + pos.toLowerCase() + "-width", value + "px");
                    this["border" + pos] = value;
                    return (this.isActive) ? digitalize(this, isVertical) : this;
                }
            },
            setPosition: function (pos, isVertical) {
                return function (value) {
                    this.$.css(pos.toLowerCase(), value + "px");
                    this[pos.toLowerCase()] = value;
                    return (this.isActive) ? digitalize(this, isVertical) : this;
                }
            }
        };

        NumericalBoxElement.prototype = {
            initialize: function ($element) {
                this.$ = $element;
                $.extend(true, this, this.$.offset(), { center: {}, inner: { center: {}} });
                for (var i = 0; i < Meta.pos.length; i++) {
                    this["border" + Meta.pos.camel[i]] = parseInt(this.$.css("border-" + Meta.pos[i] + "-width")) || 0;
                }
                this.active();
            },
            active: function () { this.isActive = true; digitalize(this); return this; },
            inactive: function () { this.isActive = false; return this; }
        };
        for (var i = 0; i < Meta.pos.length; i++) {
            NumericalBoxElement.prototype["setBorder" + Meta.pos.camel[i]] = Methods.setBorder(Meta.pos.camel[i], (i < 2));
            if (i % 2 == 0)
                NumericalBoxElement.prototype["set" + Meta.pos.camel[i]] = Methods.setPosition(Meta.pos.camel[i], (i < 2));
        }

        function digitalize(box, isVertical) {
            if (isVertical == undefined) { digitalize(box, true); return digitalize(box, false); }
            var m = Meta.getRelativeNames((isVertical) ? 0 : 2);
            box[m.size.p] = box.$["outer" + m.camel.size.p]();
            box[m.pos.f] = box[m.pos.o] + box[m.size.p];
            box.center[m.pos.o] = box[m.pos.o] + box[m.size.p] / 2;
            box.inner[m.pos.o] = box[m.pos.o] + box["border" + m.camel.pos.o];
            box.inner[m.size.p] = box.$["inner" + m.camel.size.p]();
            box.inner[m.pos.f] = box.inner[m.pos.o] + box.inner[m.size.p];
            box.inner.center[m.pos.o] = box.inner[m.pos.f] + box.inner[m.size.p] / 2;
            return box;
        }
    })();

    // Adjust position of balloon body
    function makeupBalloon($target, $balloon, options) {
        $balloon.stop(true, true);
        var outerTip, innerTip,
			initTipStyle = { position: "absolute", height: "0", width: "0", border: "solid 0 transparent" },
			target = new NumericalBoxElement($target),
			balloon = new NumericalBoxElement($balloon);
        balloon.setTop(-options.offsetY
			+ ((options.position && options.position.indexOf("top") >= 0) ? target.top - balloon.height
			: ((options.position && options.position.indexOf("bottom") >= 0) ? target.bottom
			: target.center.top - balloon.height / 2)));
        balloon.setLeft(options.offsetX
			+ ((options.position && options.position.indexOf("left") >= 0) ? target.left - balloon.width
			: ((options.position && options.position.indexOf("right") >= 0) ? target.right
			: target.center.left - balloon.width / 2)));
        if (options.tipSize > 0) {
            // Add hidden balloon tips into balloon body.
            if ($balloon.data("outerTip")) { $balloon.data("outerTip").remove(); $balloon.removeData("outerTip"); }
            if ($balloon.data("innerTip")) { $balloon.data("innerTip").remove(); $balloon.removeData("innerTip"); }
            outerTip = new NumericalBoxElement($("<div>").css(initTipStyle).appendTo($balloon));
            innerTip = new NumericalBoxElement($("<div>").css(initTipStyle).appendTo($balloon));
            // Make tip triangle, adjust position of tips.
            var m;
            for (var i = 0; i < Meta.pos.length; i++) {
                m = Meta.getRelativeNames(i);
                if (balloon.center[m.pos.c1] >= target[m.pos.c1] &&
					balloon.center[m.pos.c1] <= target[m.pos.c2]) {
                    if (i % 2 == 0) {
                        if (balloon[m.pos.o] >= target[m.pos.o] && balloon[m.pos.f] >= target[m.pos.f]) break;
                    } else {
                        if (balloon[m.pos.o] <= target[m.pos.o] && balloon[m.pos.f] <= target[m.pos.f]) break;
                    }
                }
                m = null;
            }
            if (m) {
                balloon["set" + m.camel.pos.p1]
					(balloon[m.pos.p1] + ((m.isTopLeft) ? 1 : -1) * (options.tipSize - balloon["border" + m.camel.pos.o]));
                makeTip(balloon, outerTip, m, options.tipSize, $balloon.css("border-" + m.pos.o + "-color"));
                makeTip(balloon, innerTip, m, options.tipSize - 2 * balloon["border" + m.camel.pos.o], $balloon.css("background-color"));
                $balloon.data("outerTip", outerTip.$).data("innerTip", innerTip.$);
            } else {
                $.each([outerTip.$, innerTip.$], function () { this.remove(); });
            }
        }
        // Make up balloon tip.
        function makeTip(balloon, tip, m, tipSize, color) {
            var len = Math.round(tipSize / 1.7320508);
            tip.inactive()
				["setBorder" + m.camel.pos.f](tipSize)
				["setBorder" + m.camel.pos.c1](len)
				["setBorder" + m.camel.pos.c2](len)
				["set" + m.camel.pos.p1]((m.isTopLeft) ? -tipSize : balloon.inner[m.size.p])
				["set" + m.camel.pos.c1](balloon.inner[m.size.c] / 2 - len)
				.active()
				.$.css("border-" + m.pos.f + "-color", color);
        }
    }

    // True if the event comes from the target or balloon.
    function isValidTargetEvent($target, e) {
        var b = $target.data("balloon") && $target.data("balloon").get(0);
        return !(b && (b == e.relatedTarget || $.contains(b, e.relatedTarget)));
    }

    //-----------------------------------------------------------------------------
    // Public
    //-----------------------------------------------------------------------------
    $.fn.balloon = function (options) {
        options = $.extend(true, {}, $.balloon.defaults, options);
        return this.one("mouseenter", function (e) {
            var $target = $(this), t = this;
            var $balloon = $target.unbind("mouseenter", arguments.callee)
				.showBalloon(options).mouseenter(function (e) {
				    isValidTargetEvent($target, e) && $target.showBalloon();
				}).data("balloon");
            if ($balloon) {
                $balloon.mouseleave(function (e) {
                    if (t == e.relatedTarget || $.contains(t, e.relatedTarget)) return;
                    $target.hideBalloon();
                }).mouseenter(function (e) { $target.showBalloon(); });
            }
        }).mouseleave(function (e) {
            var $target = $(this);
            isValidTargetEvent($target, e) && $target.hideBalloon();
        });
    };

    $.fn.showBalloon = function (options) {
        var $target, $balloon, offTimer;
        if (!$.balloon.defaults.css) $.balloon.defaults.css = {};
        if (options || !this.data("options"))
            this.data("options", $.extend(true, {}, $.balloon.defaults, options));
        options = this.data("options");
        return this.each(function () {
            $target = $(this);
            (offTimer = $target.data("offTimer")) && clearTimeout(offTimer);
            var contents = $.isFunction(options.contents)
				? options.contents()
				: (options.contents || $target.attr("title"));
            var isNew = !($balloon = $target.data("balloon"));
            if (isNew) $balloon = $("<div>").append(contents);
            if (!options.url && (!$balloon || $balloon.html() == "")) return;
            if (!isNew && contents && contents != $balloon.html()) $balloon.empty().append(contents);
            $target.removeAttr("title");
            if (options.url) {
                $balloon.load($.isFunction(options.url) ? options.url(this) : options.url, function (res, sts, xhr) {
                    if (options.ajaxComplete) options.ajaxComplete(res, sts, xhr);
                    makeupBalloon($target, $balloon, options);
                });
            }
            if (isNew) {
                $balloon
					.addClass(options.classname)
					.css(options.css)
					.css({ visibility: "hidden", position: "absolute" })
					.appendTo("body");
                $target.data("balloon", $balloon);
                makeupBalloon($target, $balloon, options);
                $balloon.hide().css("visibility", "visible");
            } else {
                makeupBalloon($target, $balloon, options);
            }
            $target.data("onTimer", setTimeout(function () {
                if (options.showAnimation) {
                    options.showAnimation.apply($balloon.stop(true, true), [options.showDuration]);
                } else {
                    $balloon.show(options.showDuration, function () {
                        if (this.style.removeAttribute) { this.style.removeAttribute("filter"); }
                    });
                }
            }, options.delay));
        });
    };

    $.fn.hideBalloon = function () {
        var options = this.data("options"), onTimer, offTimer;
        return this.each(function () {
            var $target = $(this);
            (onTimer = $target.data("onTimer")) && clearTimeout(onTimer);
            (offTimer = $target.data("offTimer")) && clearTimeout(offTimer);
            $target.data("offTimer", setTimeout(function () {
                var $balloon = $target.data("balloon");
                if (options.hideAnimation) {
                    $balloon && options.hideAnimation.apply($balloon.stop(true, true), [options.hideDuration]);
                } else {
                    $balloon && $balloon.stop(true, true).hide(options.hideDuration);
                }
            },
			options.minLifetime));
        });
    };

    $.balloon = {
        defaults: {
            contents: null, url: null, ajaxComplete: null, classname: null,
            position: "top", offsetX: 0, offsetY: 0, tipSize: 12,
            delay: 0, minLifetime: 200,
            showDuration: 100, showAnimation: null,
            hideDuration: 80, hideAnimation: function (d) { this.fadeOut(d); },
            css: {
                minWidth: "20px",
                padding: "5px",
                borderRadius: "6px",
                border: "solid 1px #777",
                boxShadow: "4px 4px 4px #555",
                color: "#666",
                backgroundColor: "#efefef",
                opacity: ($.support.opacity) ? "0.85" : null,
                zIndex: "32767",
                textAlign: "left"
            }
        }
    };
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")))

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

/***/ "./www/js/source/pages/customer/betsetting/common/betsetting.helper.js":
/*!*****************************************************************************!*\
  !*** ./www/js/source/pages/customer/betsetting/common/betsetting.helper.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js"), __webpack_require__(/*! common/popup */ "./www/js/source/common/popup.js"), __webpack_require__(/*! lib/jquery.balloon */ "./www/js/source/lib/jquery.balloon.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Site, Popup) {

    function isInteger(text) {
        return /^\+?\d+$/.test(text);
    }

    const _me = {
        showDialogMesage: function (title, message) {
            const options = {
                title: title,
                height: 'auto',
                id: 'result-update-betsetting',
                onOpen: function () {
                    $('#btnSubmitBetSetting, #btnReset').prop('disabled', true);
                },
                onClose: function () {
                    $('#result-update-betsetting').remove();
                    $('#btnSubmitBetSetting, #btnReset').removeAttr('disabled');
                    setTimeout(function () {
                        Site.blockUI();
                        Site.getLocation().reload();
                    }, 500);
                },
                width: 450
            };

            const buttons = [{
                text: Site.getSingleResource('OK'),
                isClosedOnClick: true,
                classes: 'btn btn-submit'
            }];

            Popup.openPopupWithButton('<div><p>' + message + '</p></div>', options, buttons);
        },

        convertToFloat: function (str) {
            const temp = str.replace(/,/g, '');
            const temp2 = temp.replace('.', '');
            return isInteger(temp2) ? parseFloat(temp) : NaN;
        },

        showBalloonMsg: function (elementSelector, strMsg) {
            const contents = '<div onclick="hideBalloonMsg(\'' + elementSelector + '\')" style="width:140px;" class="msgerr">' + strMsg + '</div>';

            $(elementSelector).blur(function () { _me.hideBalloonMsg(elementSelector); })
                .focus()
                .showBalloon({
                    contents: contents
                });
        },
        hideBalloonMsg: function (elementSelector) {
            $(elementSelector).hideBalloon();
        }
    };

    return _me;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./www/js/source/pages/customer/betsetting/common/betsetting.status.js":
/*!*****************************************************************************!*\
  !*** ./www/js/source/pages/customer/betsetting/common/betsetting.status.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js"), __webpack_require__(/*! ./betsetting.helper */ "./www/js/source/pages/customer/betsetting/common/betsetting.helper.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Site, BetSettingHelper) {
    const _me = {
        update: function (url, postData) {
            $.ajax({
                type: 'POST',
                url: url,
                cache: false,
                data: postData,
                dataType: 'json',
                success: function (result) {
                    const messageResource = result.IsSuccessful ? 'MessageSuccess' : 'Fail';
                    BetSettingHelper.showDialogMesage(Site.getSingleResource(messageResource), result.Message);
                },
                error: function (request, status, err) {
                    BetSettingHelper.showDialogMesage(Site.getSingleResource('Error'), err);
                }
            });
        },

        getCommonPostData: function ($context) {
            const productId = parseInt($('#ProductId').val(), 10);
            const nickName = $context.data('nick-name');
            // update value  (0: enable, 1: disable) is opposed with current value (1: enable, 0: disable)
            const status = $context.data('status');
            const custId = $context.data('cust-id');

            return {
                productId: productId,
                nickname: nickName,
                status: status,
                custid: custId,
                custIds: $('#CustIds').val()
            };
        }
    };

    return _me;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./www/js/source/pages/customer/betsetting/common/betsetting.validation.js":
/*!*********************************************************************************!*\
  !*** ./www/js/source/pages/customer/betsetting/common/betsetting.validation.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js"), __webpack_require__(/*! ./betsetting.helper */ "./www/js/source/pages/customer/betsetting/common/betsetting.helper.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Site, BetSettingHelper) {
    const SPORTID_NUMBERGAME = 161;

    const _me = {
        checkValidationNumberGame: function () {
            if (!_me.checkLimitMinMaxBet(SPORTID_NUMBERGAME)) {
                return false;
            }

            const maxPerBallSelector = '#max-per-ball-161';
            const maxPerBall = BetSettingHelper.convertToFloat($(maxPerBallSelector).val());
            const maxPerBallLimit = BetSettingHelper.convertToFloat($(maxPerBallSelector).attr('data-max-value'));

            if (isNaN(maxPerBall)) {
                BetSettingHelper.showBalloonMsg(maxPerBallSelector, Site.getSingleResource('IncorrectMaxPerBall'));
                return false;
            }

            if (maxPerBallLimit > 0 && maxPerBall > maxPerBallLimit) {
                BetSettingHelper.showBalloonMsg(maxPerBallSelector, Site.getSingleResource('MaxPerBallLessThanOrEqual') + ' ' + maxPerBallLimit);
                return false;
            }

            return true;
        },

        checkLimitMinMaxBet: function (sportId) {
            const minBetId = '#min-bet-' + sportId;
            const maxBetId = '#max-bet-' + sportId;
            const maxPerMatchId = '#max-per-match-' + sportId;

            const $minBetTextBox = $(minBetId);
            const $maxBetTextBox = $(maxBetId);
            const $maxPerMatchTextBox = $(maxPerMatchId);
            if ($minBetTextBox.length === 0 ||
                $maxBetTextBox.length === 0 ||
                $maxPerMatchTextBox.length === 0) {
                return true;
            }

            // Get value in attribute
            const limitMinBet = BetSettingHelper.convertToFloat($minBetTextBox.attr('data-min-value'));
            const limitMaxBet = BetSettingHelper.convertToFloat($maxBetTextBox.attr('data-max-value'));
            const limitMaxPerMatch = BetSettingHelper.convertToFloat($maxPerMatchTextBox.attr('data-max-value'));
            const limitMaxPerMatchMin = BetSettingHelper.convertToFloat($maxPerMatchTextBox.attr('data-min-value'));

            const minBet = BetSettingHelper.convertToFloat($minBetTextBox.val());
            const maxBet = BetSettingHelper.convertToFloat($maxBetTextBox.val());
            const maxPerMatcth = BetSettingHelper.convertToFloat($maxPerMatchTextBox.val());

            // Check if minbet, maxbet, maxpermatch is valid number
            if (isNaN(minBet)) {
                BetSettingHelper.showBalloonMsg(minBetId, Site.getSingleResource('IncorrectMinBet'));
                return false;
            }
            if (isNaN(maxBet)) {
                BetSettingHelper.showBalloonMsg(maxBetId, Site.getSingleResource('IncorrectMaxBet'));
                return false;
            }
            if (isNaN(maxPerMatcth)) {
                BetSettingHelper.showBalloonMsg(maxPerMatchId, Site.getSingleResource('IncorrectMaxPerMatch'));
                return false;
            }

            // Check contrains
            // min bet <=maxbet <= max per match
            if (limitMinBet > 0 && minBet < BetSettingHelper.convertToFloat(limitMinBet.toString())) {
                BetSettingHelper.showBalloonMsg(minBetId, Site.getSingleResource('MinBetGreaterThanOrEqual') + ' ' + limitMinBet);
                return false;
            }
            if (limitMaxBet > 0 && maxBet > BetSettingHelper.convertToFloat(limitMaxBet.toString())) {
                BetSettingHelper.showBalloonMsg(maxBetId, Site.getSingleResource('MaxBetLessThanOrEqual') + ' ' + limitMaxBet);
                return false;
            }
            if (limitMaxPerMatchMin > 0 && maxPerMatcth < BetSettingHelper.convertToFloat(limitMaxPerMatchMin.toString())) {
                BetSettingHelper.showBalloonMsg(maxPerMatchId, Site.getSingleResource('MaxBetMatchMoreThanOrEqual') + ' ' + limitMaxPerMatchMin);
                return false;
            }
            if (limitMaxPerMatch > 0 && maxPerMatcth > BetSettingHelper.convertToFloat(limitMaxPerMatch.toString())) {
                BetSettingHelper.showBalloonMsg(maxPerMatchId, Site.getSingleResource('MaxBetMatchLessThanOrEqual') + ' ' + limitMaxPerMatch);
                return false;
            }
            if (minBet > maxBet) {
                BetSettingHelper.showBalloonMsg(minBetId, Site.getSingleResource('MinBetCanNotGreaterThanMaxBet'));
                return false;
            }
            if (maxBet > maxPerMatcth) {
                BetSettingHelper.showBalloonMsg(maxBetId, Site.getSingleResource('MaxBetCanNotGreaterThanMaxPerMatch'));
                return false;
            }

            return true;
        },

        checkLimitMinMaxBets: function (sportIds) {
            for (let i = 0; i < sportIds.length; i++) {
                if (!_me.checkLimitMinMaxBet(sportIds[i])) {
                    return false;
                }
            }

            return true;
        }
    };

    return _me;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./www/js/source/pages/customer/betsetting/common/betsettingbase.js":
/*!**************************************************************************!*\
  !*** ./www/js/source/pages/customer/betsetting/common/betsettingbase.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js"), __webpack_require__(/*! common/popup */ "./www/js/source/common/popup.js"), __webpack_require__(/*! ./constant */ "./www/js/source/pages/customer/betsetting/common/constant.js"),
    __webpack_require__(/*! lib/numberformat */ "./www/js/source/lib/numberformat.js"), __webpack_require__(/*! ./betsetting.helper */ "./www/js/source/pages/customer/betsetting/common/betsetting.helper.js"), __webpack_require__(/*! ./betsetting.validation */ "./www/js/source/pages/customer/betsetting/common/betsetting.validation.js"), __webpack_require__(/*! lib/jquery.multiselect.nlevel */ "./www/js/source/lib/jquery.multiselect.nlevel.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Site, Popup, Constant, NumberFormatter, BetSettingHelper, BetSettingValidation) {
        const Product = Constant.Product;

        const _me = {
            elements: {
                custIds: null,
                custNames: null,
                ddlCustomer: null,
                btnSubmit: null,
                btnUpdateStatus: null
            },
            initialize: function () {
                _me.elements.custIds = $("#CustIds");
                _me.elements.custNames = $("#CustNames");
                _me.elements.ddlCustomer = $("#ddl-customers");
                _me.elements.btnSubmit = $("#btnSubmitBetSetting");
                _me.elements.btnUpdateStatus = $("#btnUpdateStatus");

                _me.initSelectedCustomers();

                $('#product-dropdown').on('change', function () {
                    const url = $(this).find('option:selected').data('href');
                    Site.blockUI();
                    Site.redirect(url);
                });
            },
            initSelectedCustomers: function () {
                const ids = _me.elements.custIds.val().split(",");
                if (ids.length === 0) {
                    return;
                }

                const names = _me.elements.custNames.val().split(",");
                const multiSelectData = [];

                for (var i = 0; i < ids.length; i++) {
                    multiSelectData.push({
                        Id: ids[i],
                        Value: ids[i],
                        Text: names[i],
                        Checked: true,
                        Enable: true,
                        Css: '',
                        CssClass: ''
                    });
                }

                _me.elements.ddlCustomer.multiSelect({
                    minWidth: 160,
                    maxHeight: 400,
                    shadow: true,
                    showHeader: true,
                    isCheckAll: true,
                    showFooter: false,
                    checkAllText: Site.getSingleResource('All'),
                    noneSelectedText: Site.getSingleResource('SelectOptions'),
                    tooltipNoItem: Site.getSingleResource('ThereIsNoSelectedItem'),
                    selectedText: Site.getSingleResource('SelectedItemCount'),
                    listData: multiSelectData,
                    onCheck: function () {
                        const checkedItems = _me.elements.ddlCustomer.multiSelect('getCheckedItems');
                        const checkedItemsByText = _me.elements.ddlCustomer.multiSelect('getCheckedItemsByText');

                        _me.elements.custIds.val(checkedItems.join(","));
                        _me.elements.custNames.val(checkedItemsByText.join(","));
                        _me.enableSubmit(_me.elements.custIds.val() !== "");
                    }
                });

                _me.elements.ddlCustomer = $("#ddl-customers");

                $(window).bind("click, contextmenu ", () => {
                    _me.closeDropdown();
                });
            },
            closeDropdown: function () {
                $("#ddl-customers").multiSelect("hideMe");
            },
            enableSubmit: function (isEnable) {
                _me.elements.btnSubmit.attr("disabled", isEnable ? null : "disabled");
                _me.elements.btnUpdateStatus.attr("disabled", isEnable ? null : "disabled");
            },

            getSportIds: function () {
                const $idList = $('#IDList');
                return $idList.length ? $idList.val().split(',') : [];
            },

            setEnable: function () {
                const editable = $('#editable').val();
                const isEnable = !editable || editable === 'True';

                if (!isEnable) {
                    const sportIds = _me.getSportIds();

                    for (let i = 0; i < sportIds.length; i++) {
                        const sportId = sportIds[i];
                        const selector = '#min-bet-' + sportId + ',' + '#max-bet-' + sportId + ',' + '#max-per-match-' + sportId;
                        $(selector).prop('disabled', true);
                    }
                }
            },

            formatInputText: function () {
                const formatter = new NumberFormatter();

                $('input[type=text]').blur(function () {
                    const inputValue = $(this).val().replace(/,/g, '');
                    const formattedValue = formatter.formatNumber(inputValue, { format: '#,###,##0.##' });
                    $(this).val(formattedValue);
                });
            },

            resetInput: function () {
                $('#chkCopyAll').removeAttr('checked');
                $('input[id^="min"], input[id^="max-bet"], input[id^="max-per"]').each(function () {
                    $(this).val($(this).attr('data-original')).prop('disabled', false);
                });
            },

            showComfirm: function ($target, resourceMessage, callback) {
                const productId = parseInt($('#ProductId').val(), 10);
                const isValid = productId === Product.LiveCasino ? true :
                    productId === Product.NumberGame ? BetSettingValidation.checkValidationNumberGame() :
                        BetSettingValidation.checkLimitMinMaxBets(_me.getSportIds());
                if (!isValid) {
                    return;
                }

                const custId = $target.attr('data-cust-id');
                const userName = $target.attr('data-user-name');
                const nickName = $target.attr('data-nick-name');

                _me.showConfirmAction(Site.getSingleResource(resourceMessage), custId, userName, nickName, callback);
            },

            showConfirmAction: function (message, custId, userName, nickName, callback) {
                const options = {
                    title: Site.getSingleResource('Confirmation'),
                    height: 'auto',
                    id: 'confirm-update-betsetting',
                    onOpen: function () {
                        $('#btnSubmitBetSetting, #btnReset').prop('disabled', true);
                    },
                    onClose: function () {
                        $('#btnSubmitBetSetting, #btnReset').removeAttr('disabled');
                        $('#confirm-update-betsetting').remove();
                    },
                    width: 450
                };

                const buttons = [
                    {
                        text: Site.getSingleResource('OK'),
                        isClosedOnClick: true,
                        click: function () {
                            callback(custId, userName, nickName);
                        },
                        classes: 'btn btn-submit'
                    }, {
                        text: Site.getSingleResource('Cancel'),
                        isClosedOnClick: true,
                        classes: 'btn btn-cancel'
                    }];

                Popup.openPopupWithButton('<div><p>' + message + '</p></div>', options, buttons);
            },

            getBetSettingParamsForSports: function () {
                const params = {};
                const sportIds = _me.getSportIds();
                for (let i = 0; i < sportIds.length; i++) {
                    $.extend(params, _me.getBetSettingParams(sportIds[i]));
                }

                return params;
            },

            getBetSettingParams: function (sportId) {
                const $minbet = $('#min-bet-' + sportId);
                const $maxbet = $('#max-bet-' + sportId);
                const $maxPerMatch = $('#max-per-match-' + sportId);

                if ($minbet.length === 0 ||
                    $maxbet.length === 0 ||
                    $maxPerMatch.length === 0) {
                    return '';
                }

                let isUpdate = true;
                const originalMinBet = $('#min-bet-' + sportId).attr('data-original');
                const originalMaxBet = $('#max-bet-' + sportId).attr('data-original');
                const originalMaxPerMatch = $('#max-per-match-' + sportId).attr('data-original');

                // Check if data is changed
                if ($minbet.val() === originalMinBet
                    && $maxbet.val() === originalMaxBet
                    && $maxPerMatch.val() === originalMaxPerMatch) {
                    isUpdate = false;
                }

                // Data is changed, update it
                const minBet = BetSettingHelper.convertToFloat($minbet.val());
                const maxBet = BetSettingHelper.convertToFloat($maxbet.val());
                const maxPerMatcth = BetSettingHelper.convertToFloat($maxPerMatch.val());
                const betType = $('#bet-type-' + sportId).val();

                const result = {};
                result['minbet' + sportId] = minBet;
                result['maxbet' + sportId] = maxBet;
                result['maxpermatch' + sportId] = maxPerMatcth;
                result['update' + sportId] = isUpdate;
                result['bettype' + sportId] = betType;

                return result;
            },

            updateBetSetting: function (url, params) {
                $.ajax({
                    type: 'POST',
                    cache: false,
                    url: url,
                    data: params,
                    dataType: 'json',
                    success: function (result) {
                        const messageResource = Number(result.Code) === 0 ? 'MessageSuccess' : 'Fail';
                        BetSettingHelper.showDialogMesage(Site.getSingleResource(messageResource), result.Message);
                    }
                });
            }
        };

        return _me;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./www/js/source/pages/customer/betsetting/common/constant.js":
/*!********************************************************************!*\
  !*** ./www/js/source/pages/customer/betsetting/common/constant.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    const Product = {
        Sportsbook: 0,
        Racing: 1,
        NumberGame: 2,
        LiveCasino: 4,
        VirtualSports: 5,
        RngCasino: 6,
        Keno: 8,
        AgCasino: 10,
        GoldDeluxe: 11,
        Macau: 12,
        BetTrade: 13,
        Colossusbets: 15,
        AllBet: 21,
        VoidBridge: 22,
        FishingWorld: 24,
        Cashout: 25,
        VirtualSports2: 27,
        Lottery: 28,
        SportsLottery: 63
    };

    const _me = {
        Product: Product
    };

    return _me;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./www/js/source/pages/customer/betsetting/main-exchange.js":
/*!******************************************************************!*\
  !*** ./www/js/source/pages/customer/betsetting/main-exchange.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./products/exchange */ "./www/js/source/pages/customer/betsetting/products/exchange.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (ExchangeBetSetting) {
    $(ExchangeBetSetting.initialize);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57")))

/***/ }),

/***/ "./www/js/source/pages/customer/betsetting/products/dcsbetsetting.js":
/*!***************************************************************************!*\
  !*** ./www/js/source/pages/customer/betsetting/products/dcsbetsetting.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿/* AllBet, VoidBridge, FishingWorld */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js"), __webpack_require__(/*! ../common/constant */ "./www/js/source/pages/customer/betsetting/common/constant.js"), __webpack_require__(/*! ../common/betsettingbase */ "./www/js/source/pages/customer/betsetting/common/betsettingbase.js"), __webpack_require__(/*! ../common/betsetting.status */ "./www/js/source/pages/customer/betsetting/common/betsetting.status.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Site, Constant, BetSettingBase, BetSettingStatus) {
        const Product = Constant.Product;
        const ProductCodeMap = {};
        ProductCodeMap[Product.VirtualSports] = 'VS';
        ProductCodeMap[Product.VirtualSports2] = 'VS2';
        ProductCodeMap[Product.Lottery] = 'LT';
        ProductCodeMap[Product.SportsLottery] = 'SLT';

        function getConfirmMessage(productId) {
            const productNameResource = 'Product' + ProductCodeMap[productId];
            const message = Site.getSingleResource('UpdateProductBetSettings');
            return message.replace('{0}', Site.getSingleResource(productNameResource));
        }

        const _me = {
            initialize: function () {
                Site.initialize();
                BetSettingBase.initialize();
                BetSettingBase.setEnable();
                _me.initEvent();
                _me.checkToDisableInput();
            },

            initEvent: function () {
                $('#btnUpdateStatus').click(function () {
                    _me.updateStatus($(this));
                });

                $('#btnReset').on('click', function () {
                    BetSettingBase.resetInput();
                });

                $('#btnSubmitBetSetting').on('click', function () {
                    const productId = parseInt($('#ProductId').val(), 10);
                    const messageResource = getConfirmMessage(productId);

                    BetSettingBase.showComfirm($(this), messageResource, _me.updateBetSetting);
                });

                // Formating number in text box.
                BetSettingBase.formatInputText();
            },
            checkToDisableInput: function () {
                const enabled = $('#IsEnabled').val() !== '0';

                if (!enabled) {
                    $('.table-content input[type=text]').prop('disabled', true).addClass('disabled');
                    $('#btnSubmitBetSetting, #btnReset').prop('disabled', true).addClass('disabled');
                }
            },
            updateStatus: function ($context) {
                const url = Site.resolveClientUrl('DcsBetSetting/UpdateStatus');
                const params = BetSettingStatus.getCommonPostData($context);
                BetSettingStatus.update(url, params);
            },

            updateBetSetting: function (custId, userName, nickName) {
                const productId = parseInt($('#ProductId').val(), 10);

                const params = BetSettingBase.getBetSettingParamsForSports();
                params.custid = custId;
                params.userName = userName;
                params.nickName = nickName;
                params.productId = productId;
                params.custIds = $("#CustIds").val();

                BetSettingBase.updateBetSetting(Site.resolveClientUrl('DcsBetSetting/UpdateBetSetting'), params);
            }
        };

        return _me;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./www/js/source/pages/customer/betsetting/products/exchange.js":
/*!**********************************************************************!*\
  !*** ./www/js/source/pages/customer/betsetting/products/exchange.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?fe57"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js"), __webpack_require__(/*! ./dcsbetsetting */ "./www/js/source/pages/customer/betsetting/products/dcsbetsetting.js"), __webpack_require__(/*! ../common/betsetting.helper */ "./www/js/source/pages/customer/betsetting/common/betsetting.helper.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Site, DcsBetSetting, BetSettingHelper) {
        const _me = {
            initialize: function () {
                DcsBetSetting.initialize();
                _me.initEvent();
            },

            initEvent: function () {
                $('#btnSubmit').click(function () {
                    const $dropdown = $('#ddlCommission');
                    _me.updateComm($(this).attr('data-cust-id'), $dropdown.data('original-value'), $('#ddlCommission').val());
                });

                $('#btnReset').click(function () {
                    const $dropdown = $('#ddlCommission');
                    $dropdown.val($dropdown.data('original-value')).change();
                });
            },

            updateComm: function (custId, oldCommission, newCommission) {
                $.ajax({
                    type: 'POST',
                    url: Site.resolveClientUrl('ExchangeDcsBetSetting/UpdateComm'),
                    cache: false,
                    data: {
                        custid: custId,
                        oldCommission: oldCommission,
                        newCommission: newCommission
                    },
                    dataType: 'json',
                    success: function (result) {
                        const messageResource = Number(result.Code) === 0 ? 'MessageSuccess' : 'Fail';
                        BetSettingHelper.showDialogMesage(Site.getSingleResource(messageResource), result.Message);
                    },
                    beforeSend: Site.blockUI,
                    complete: Site.unBlockUI
                });
            }
        };

        return _me;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 48:
/*!************************************************************************!*\
  !*** multi ./www/js/source/pages/customer/betsetting/main-exchange.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./www/js/source/pages/customer/betsetting/main-exchange.js */"./www/js/source/pages/customer/betsetting/main-exchange.js");


/***/ })

/******/ });
//# sourceMappingURL=exchangebetsetting.chunk.js.map