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
/******/ 		"www/js/build/dev/pages/reports/livereport": 0
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
/******/ 	deferredModules.push([2,"www/js/build/dev/pages/lib/common"]);
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
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($) {
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

/***/ "./www/js/source/components/pluginhelper/daterangepicker.js":
/*!******************************************************************!*\
  !*** ./www/js/source/components/pluginhelper/daterangepicker.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js"), __webpack_require__(/*! moment */ "./node_modules/moment/moment.js"), __webpack_require__(/*! bootstrap-daterangepicker */ "./node_modules/bootstrap-daterangepicker/daterangepicker.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Site, moment) {
        'use strict';

        let _daysOfWeek, _monthNames;

        function initCommonTextResource() {
            if (!_daysOfWeek || !_monthNames) {
                _daysOfWeek = [
                    Site.getSingleResource('Su'), Site.getSingleResource('Mo'), Site.getSingleResource('Tu'), Site.getSingleResource('We'),
                    Site.getSingleResource('Th'), Site.getSingleResource('Fr'), Site.getSingleResource('Sa')
                ];

                _monthNames = [
                    Site.getSingleResource('Jan'), Site.getSingleResource('Feb'), Site.getSingleResource('Mar'), Site.getSingleResource('Apr'),
                    Site.getSingleResource('May2'), Site.getSingleResource('Jun'), Site.getSingleResource('Jul'), Site.getSingleResource('Aug'),
                    Site.getSingleResource('Sep'), Site.getSingleResource('Oct'), Site.getSingleResource('Nov'), Site.getSingleResource('Dec')
                ];
            }
        }

        function initDateRangePicker(firstDayOfWeekIsMonday, rangeOption) {
            const $dateRange = $('#DateRange');

            const $from = $('#FromDate');
            const $to = $('#ToDate');
            const start = moment($from.attr('data-original-from'), 'MM/DD/YYYY');
            const end = moment($to.attr('data-original-to'), 'MM/DD/YYYY');

            function setRangeDate(start, end) {
                $from.val(start.format('MM/DD/YYYY'));
                $to.val(end.format('MM/DD/YYYY'));
                $dateRange.val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
            }

            const now = moment($dateRange.attr('data-today'), 'MM/DD/YYYY');
            const isoDayOfWeek = firstDayOfWeekIsMonday ? 1 : 7; // 1.Monday  7.Sunday
            const startDayOfWeek = now.clone().startOf('week').isoWeekday(isoDayOfWeek);
            const startDayOfLastWeek = now.clone().subtract(1, 'week').startOf('week').isoWeekday(isoDayOfWeek);

            const ranges = {};
            ranges[Site.getSingleResource('Today')] = [now, now];
            ranges[Site.getSingleResource('Yesterday')] = [now.clone().subtract(1, 'days'), now.clone().subtract(1, 'days')];
            ranges[Site.getSingleResource('Currentweek')] = [startDayOfWeek, now];
            ranges[Site.getSingleResource('Lastweek')] = [startDayOfLastWeek, startDayOfLastWeek.clone().add(6, 'days')];
            ranges[Site.getSingleResource('Currentmonth')] = [now.clone().startOf('month'), now];
            ranges[Site.getSingleResource('Lastmonth')] = [now.clone().subtract(1, 'month').startOf('month'), now.clone().subtract(1, 'month').endOf('month')];
            ranges[Site.getSingleResource('Sincelastmonth')] = [now.clone().subtract(1, 'month').startOf('month'), now];

            const customRanges = {};
            const hasRangeOption = rangeOption && rangeOption.length > 0;
            if (hasRangeOption) {
                for (let i = 0; i < rangeOption.length; i++) {
                    const rangeLabel = Site.getSingleResource(rangeOption[i]);
                    customRanges[rangeLabel] = ranges[rangeLabel];
                }
            }

            initCommonTextResource();
            const locale = {
                format: 'MM/DD/YYYY',
                applyLabel: Site.getSingleResource('OK'),
                cancelLabel: Site.getSingleResource('Cancel'),
                daysOfWeek: _daysOfWeek,
                monthNames: _monthNames,
                firstDay: firstDayOfWeekIsMonday ? 1 : 0
            };

            $dateRange.daterangepicker({
                startDate: start,
                endDate: end,
                minDate: moment($dateRange.attr('data-mindate'), 'MM/DD/YYYY'),
                maxDate: moment($dateRange.attr('data-maxdate'), 'MM/DD/YYYY'),
                ranges: hasRangeOption ? customRanges : ranges,
                locale: locale,
                showDropdowns: true,
                linkedCalendars: false,
                alwaysShowCalendars: true,
                showCustomRangeLabel: false
            }, setRangeDate);

            $dateRange.on('apply.daterangepicker', function (ev, picker) {
                setRangeDate(picker.startDate, picker.endDate);
            });

            $dateRange.on('show.daterangepicker', function (ev, picker) {
                const toDate = picker.endDate || new Date();
                const toMoment = moment(toDate);

                picker.rightCalendar.month = toMoment;
                picker.renderCalendar('right');
            });

            $('.date-range').on('click', '.icon-calendar', function () {
                $dateRange.data('daterangepicker').toggle();
            });

            setRangeDate(start, end);
        }

        function initSingleDatePicker(idElement, parentElement) {
            const $picker = $('#' + idElement);
            initCommonTextResource();
            const locale = {
                format: 'MM/DD/YYYY',
                daysOfWeek: _daysOfWeek,
                monthNames: _monthNames
            };

            $picker.daterangepicker({
                startDate: moment($picker.attr('data-original'), 'MM/DD/YYYY'),
                endDate: moment($picker.attr('data-original'), 'MM/DD/YYYY'),
                minDate: moment($picker.attr('data-mindate'), 'MM/DD/YYYY'),
                maxDate: moment($picker.attr('data-maxdate'), 'MM/DD/YYYY'),
                locale: locale,
                singleDatePicker: true,
                showDropdowns: true,
                parentEl: parentElement ? parentElement : '.single-date'
            });

            $('.single-date').on('click', '.icon-calendar', function () {
                $picker.data('daterangepicker').toggle();
            });
        }

        function setValueForDateRange(startDate, endDate) {
            if (startDate) {
                $('#DateRange').data('daterangepicker').setStartDate(startDate);
                $('#FromDate').val(startDate);
            }

            if (endDate) {
                $('#DateRange').data('daterangepicker').setEndDate(endDate);
                $('#ToDate').val(startDate);
            }
        }

        function setValueForSingleDate($element, dateValue) {
            $element.val(dateValue);
        }

        return {
            initDateRangePicker: initDateRangePicker,
            initSingleDatePicker: initSingleDatePicker,
            setValueForDateRange: setValueForDateRange,
            setValueForSingleDate: setValueForSingleDate
        };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./www/js/source/components/pluginhelper/monthpicker.js":
/*!**************************************************************!*\
  !*** ./www/js/source/components/pluginhelper/monthpicker.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed"), __webpack_require__(/*! lib/jquery.monthpicker */ "./www/js/source/lib/jquery.monthpicker.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($) {
        'use strict';
        const PICKER_SELECTOR = '#month-picker';
        const FORMAT = 'MM/dd/yyyy';

        const _historyDate = new Date($('#HistoryDate').val());

        function initMonthPicker(option) {
            const $picker = $(PICKER_SELECTOR);
            const $fromDate = $('#FromDate');
            const $todate = $('#ToDate');

            const fromdate = new Date($fromDate.val());
            const todate = new Date($todate.val());

            const defaultOption = {
                minDate: _historyDate,
                showDateRange: true,
                fromDayId: 'fDay',
                toDayId: 'tDay',
                format: FORMAT,
                month: fromdate,
                fromDay: fromdate.getDate(),
                toDay: todate.getDate(),
                afterChangeMonth: function () {
                    $fromDate.val($picker.monPickr('getFromDate', FORMAT));
                    $todate.val($picker.monPickr('getToDate', FORMAT));
                },
                afterChangeDay: function () {
                    $fromDate.val($picker.monPickr('getFromDate', FORMAT));
                    $todate.val($picker.monPickr('getToDate', FORMAT));

                    if (option && typeof option.customAfterChangeDay === 'function') {
                        option.customAfterChangeDay();
                    }
                }
            };

            if (option) {
                $.extend(defaultOption, option);
            }

            $picker.monPickr(defaultOption);
        }

        function getFromDateString() {
            return $(PICKER_SELECTOR).monPickr('getFromDate', FORMAT);
        }

        function getToDateString() {
            return $(PICKER_SELECTOR).monPickr('getToDate', FORMAT);
        }

        return {
            initMonthPicker: initMonthPicker,
            getFromDateString: getFromDateString,
            getToDateString: getToDateString
        };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./www/js/source/components/pluginhelper/multiselect.nlevel.js":
/*!*********************************************************************!*\
  !*** ./www/js/source/components/pluginhelper/multiselect.nlevel.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js"), __webpack_require__(/*! lib/jquery.multiselect.nlevel */ "./www/js/source/lib/jquery.multiselect.nlevel.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Site) {
    function _initDataUI(sourceData, propertyKeys = { Id: 'Id', Value: 'Value', Text: 'Text' }, dataUI = [], checkedCount = 0,) {
        const length = sourceData.length;
        for (let i = 0; i < length; i++) {
            const item = sourceData[i];
            const isChecked = item['Checked'];
            if (isChecked) {
                checkedCount = checkedCount + 1;
            }
            dataUI.push({
                Id: item[propertyKeys.Id],
                Value: item[propertyKeys.Value],
                Text: item[propertyKeys.Text],
                Checked: isChecked,
                Enable: true,
                Items: item.Children ? _initDataUI(item.Children, propertyKeys, [], checkedCount).Items : undefined
            });
        }
        return { Items: dataUI, CheckedCount: checkedCount };
    }

    const _me = {
        initSubsidiaryList: function (onChangeCallback) {
            const subsidiaryData = $('#subsidiaryData').val();
            if (subsidiaryData !== undefined) {
                const selector = '#grid-subsidiary-multiselect';
                const data = $.parseJSON(subsidiaryData);
                const propertyKeys = { Id: 'Value', Value: 'Value', Text: 'Name' };
                const length = data.length;
                let { Items: dataUI, CheckedCount: checkedCount } = _initDataUI(data, propertyKeys);
                const isCheckAll = checkedCount === length;
                $(selector).multiSelect({
                    minWidth: 200,
                    maxHeight: 400,
                    shadow: true,
                    showHeader: true,
                    isCheckAll: isCheckAll,
                    checkAllText: Site.getSingleResource('All'),
                    selectedText: Site.getSingleResource('SelectedItemCount'),
                    noneSelectedText: Site.getSingleResource('SelectOptions'),
                    showFooter: false,
                    listData: dataUI,
                    onCheck: function () {
                        const checkedItems = $(selector).multiSelect('getCheckedItems');
                        const hasItemsChecked = checkedItems.length > 0;

                        $('#SubsidiaryList').val(checkedItems.join(','));
                        $('#SubsidiaryDropdownList').toggleClass('invalid', !hasItemsChecked);
                        $('#SubmitButton').prop('disabled', !hasItemsChecked);
                        onChangeCallback && onChangeCallback();
                    }
                });

                const checkedItems = $(selector).multiSelect('getCheckedItems');
                $('#SubsidiaryList').val(checkedItems.join(','));
            }

            const isShowSubsidiaryDropdown = $('#IsShowSubsidiaryDropdown').val() == "true" && $('#IsShowSubsidiarySearchCheckBox').val() == "false";
            $('#SubsidiaryDropdown').toggle($(isShowSubsidiaryDropdown || '#SubsidiarySearch').val() == "true");
            $('#SubsidiarySearchCheckbox').prop('checked', $('#SubsidiarySearch').val() == "true");
        }
    };

    return _me;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./www/js/source/components/selectlist.js":
/*!************************************************!*\
  !*** ./www/js/source/components/selectlist.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($) {
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

/***/ "./www/js/source/lib/jquery.monthpicker.js":
/*!*************************************************!*\
  !*** ./www/js/source/lib/jquery.monthpicker.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;///
/*
* monPickr - jQuery Plugin
* Just a simple month picker
*
* Examples and documentation at: http://update.later
*
* Version: 0.0.2 (9 Feb 2012)
* Requires: jQuery v1.7+
*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! common/site */ "./www/js/source/common/site.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Site) {
    (function ($) {
        var logger = { error: $.noop };

        Date.prototype.toStringFormat = function (format) {
            var shortMonthsInYear = Site.getResources(["Jan", "Feb", "Mar", "Apr", "May2", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]),
                longMonthsInYear = Site.getResources(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]),
                year = this.getFullYear(),
                month = this.getMonth(),
                day = this.getDate(),
                result = format;

            function strMonth(value) {
                var monthArrayIndex = parseInt(value);
                return shortMonthsInYear[monthArrayIndex] || value;
            }

            function strLongMonth(value) {
                var monthArrayIndex = parseInt(value);
                return longMonthsInYear[monthArrayIndex] || value;
            }

            result = result.replace(/yyyy/g, year);
            result = result.replace(/yy/g, year.toString().substr(2));

            result = result.replace(/MMMM/g, strLongMonth(month));
            result = result.replace(/MMM/g, strMonth(month));
            result = result.replace(/MM/g, month < 9 ? '0' + (month + 1) : (month + 1));

            result = result.replace(/dd/g, day < 10 ? '0' + day : day);

            return result;
        };

        var isInteger = function (value, writeLogToConsole) {
            var isValid = Math.ceil(value) == Math.floor(value);

            if (writeLogToConsole && !isValid) logger.error('Oops! "' + value + '" is an invalid Integer');

            return isValid;
        }

        var isValidDate = function (value, writeLogToConsole) {
            var _value = new Date(value),
                isValid = isInteger(_value.getDate()) && isInteger(_value.getMonth()) && isInteger(_value.getFullYear());

            if (writeLogToConsole && !isValid) logger.error('Oops! "' + value + '" is an invalid Date');

            return isValid;
        }

        var today = null,
            thisYear = null,
            thisMonth = null,
            thisDay = null,
            firstDayThisYear = null,
            firstDayThisMonth = null,
            lastDayThisMonth = null,

        /*
        * Private methods
        */

            _getData = function (target) {
                var data = $(target).data('monPickr');
                if (!data) {
                    logger.error('Oops! No data of monPickr is available');
                    return null;
                }
                return data;
            },

            _validateMonth = function (minDate, maxDate, year, month) {
                var minYear = minDate.getFullYear(),
                    minMonth = minDate.getMonth(),
                    maxYear = maxDate.getFullYear(),
                    maxMonth = maxDate.getMonth(),

                    outOfLowBoundary = year < minYear || (year == minYear && month < minMonth),
                    outOfHighBoundary = year > maxYear || (year == maxYear && month > maxMonth);

                return !outOfLowBoundary && !outOfHighBoundary;
            },

            _validateDate = function (minDate, maxDate, year, month, date) {
                // Re-new the params cauz of time ignorance
                var minDayInMonth = new Date(year, month, _getMinDayInMonth(minDate, year, month)),
                    maxDayInMonth = new Date(year, month, _getMaxDayInMonth(maxDate, year, month)),
                    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

                return minDate <= date && date <= maxDayInMonth;
            },

            _checkReachBound = function (data, year, month) {
                // diable next/prev button if the selected month reach the bound
                var nextMonth = new Date(year, month + 1, 1),
                    prevMonth = new Date(year, month - 1, 1);

                if (!_validateMonth(data.minDate, data.maxDate, nextMonth.getFullYear(), nextMonth.getMonth())) data.btnNext.addClass('disable');
                else data.btnNext.removeClass('disable');

                if (!_validateMonth(data.minDate, data.maxDate, prevMonth.getFullYear(), prevMonth.getMonth())) data.btnPrev.addClass('disable');
                else data.btnPrev.removeClass('disable');
            },

            _setMonth = function (data, year, month) {
                data.year = year;
                data.month = month;
            },

            _setMonthLabel = function (data) {
                data.lblSelectedMonth.html(new Date(data.year, data.month, 1).toStringFormat(data.monthFormat));
            },

            _selectMonth = function (data, year, month) {
                // invokes handler (if any) just before the event change month
                if (typeof data.beforeChangeMonth == 'function') data.beforeChangeMonth();
                else { logger.error('Oops! beforeChangeMonth event\'s handler (which has type "' + typeof data.beforeChangeMonth + '") is not a function'); }

                // highlight selected month
                data.dropDown.find('.monthWrap a[month].selected').removeClass('selected');
                data.dropDown.find('.monthWrap[year=' + year + '] a[month=' + (month + 1) + ']:first').addClass('selected');

                _setMonth(data, year, month);
                _setMonthLabel(data);

                // if selected year differs from current year then hide current year and show selected one
                if (data.dropDown.find('.monthWrap.selected').attr('year') != year) {
                    _hideCurrentYear(data);
                    _showSelectedYear(data, year);
                    data.dropDown.find('.year a.selected:first').parent().addClass('selected');
                }

                if (data.showDateRange) {
                    var minDayInMonth = _getMinDayInMonth(data.minDate, data.year, data.month),
                    maxDayInMonth = _getMaxDayInMonth(data.maxDate, data.year, data.month);

                    // change fromDate and toDate
                    _selectDay(data, data.ddlFromDate, minDayInMonth, true);
                    _selectDay(data, data.ddlToDate, maxDayInMonth, false);
                }

                _checkReachBound(data, year, month);

                // invokes handler (if any) just after the event change month
                if (typeof data.afterChangeMonth == 'function') data.afterChangeMonth();
                else { logger.error('Oops! afterChangeMonth event\'s handler (which has type "' + typeof data.afterChangeMonth + '") is not a function'); }
            },

            _setDay = function (data, value, isFromDay) {
                var minDayInMonth = _getMinDayInMonth(data.minDate, data.year, data.month),
                    maxDayInMonth = _getMaxDayInMonth(data.maxDate, data.year, data.month);

                if (isFromDay) {
                    data.fromDay = parseInt(value, 10);
                    data.fromDate = new Date(data.year, data.month, value);

                    data.ddlToDate.dropDown.find('li').each(function (index) {
                        var day = index + 1;
                        var isShow = day >= data.fromDay && day >= minDayInMonth && day <= maxDayInMonth;
                        $(this).toggle(isShow);
                    });
                } else {
                    data.toDay = parseInt(value, 10);
                    data.toDate = new Date(data.year, data.month, value);

                    data.ddlFromDate.dropDown.find('li').each(function (index) {
                        var day = index + 1;
                        var isShow = day <= data.toDay && day >= minDayInMonth && day <= maxDayInMonth;
                        $(this).toggle(isShow);
                    });
                }
            },

            _setDayLabel = function (target, value) {
                target.find('.selectedDay').html(value);
            },

            _selectDay = function (data, target, value, isFromDay) {
                // invokes handler (if any) just before the event change day
                if (typeof data.beforeChangeDay == 'function') data.beforeChangeDay();
                else { logger.error('Oops! beforeChangeDay event\'s handler (which has type "' + typeof data.beforeChangeDay + '") is not a function'); }

                _setDayLabel(target, value);
                _setDay(data, value, isFromDay);

                // invokes handler (if any) just after the event change day
                if (typeof data.afterChangeDay == 'function') data.afterChangeDay();
                else { logger.error('Oops! afterChangeDay event\'s handler (which has type "' + typeof data.afterChangeDay + '") is not a function'); }
            },

            _getMinDayInMonth = function (minDate, year, month) {
                var _firstDayOfMonth = new Date(year, month, 1),
                    _minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());

                return _minDate > _firstDayOfMonth ? _minDate.getDate() : 1;
            },

            _getMaxDayInMonth = function (maxDate, year, month) {
                var _lastDayOfMonth = new Date(year, month + 1, 0),
                    _maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());

                return _lastDayOfMonth > _maxDate ? _maxDate.getDate() : _lastDayOfMonth.getDate();
            },

            _hideCurrentYear = function (data) {
                // collapse current year
                var currentMonthWrap = data.dropDown.find('.monthWrap.selected').eq(0);

                if (data.dropDown.is(':hidden')) {
                    currentMonthWrap.hide();
                } else {
                    currentMonthWrap.slideUp(data.showYearSpeed);
                }

                currentMonthWrap.removeClass('selected');
                data.dropDown.find('.year .selected').eq(0).removeClass('selected').parent().removeClass('selected');
            },

            _showSelectedYear = function (data, year) {
                var target = data.dropDown.find('.monthWrap[year=' + year + ']').eq(0);

                target.prev('.year').find('a[year]').eq(0).addClass('selected');
                target.addClass('selected').slideDown(data.showYearSpeed);
            },

            _showDropDown = function (data, target) {
                target.dropDown.slideDown(data.showDropDownSpeed);
            },

            _hideDropDown = function (data, target) {
                target.dropDown.slideUp(data.showDropDownSpeed);
            },

        _methods = {
            init: function (options) {
                options = options || {};

                if ($.isFunction(options.log)) logger.error = options.log;

                if (!this.length) { // if the initial DOM does not exist
                    logger.error('Oops! DOM element "' + this.selector + '" does not exist');
                    return;
                }

                if (options.today && !isValidDate(options.today, true)) return;

                today = options.today ? new Date(options.today) : new Date();
                thisYear = today.getFullYear();
                thisMonth = today.getMonth();
                thisDay = today.getDate();
                firstDayThisYear = new Date(thisYear, 0, 1);
                firstDayThisMonth = new Date(thisYear, thisMonth, 1);
                lastDayThisMonth = new Date(thisYear, thisMonth + 1, 0);

                // Create some defaults, extending them with any options that were provided
                var settings = $.extend({
                    minDate: firstDayThisYear,
                    maxDate: today,
                    month: today,

                    showDateRange: false,
                    fromDay: firstDayThisMonth.getDate(),
                    toDay: today.getDate(),
                    fromDayId: null, // required if showDateRange is true
                    toDayId: null, // required if showDateRange is true

                    expandYearOnhover: false,
                    expandDayOnhover: false,
                    showYearSpeed: 110,
                    showDropDownSpeed: 10,

                    disabled: false,
                    sortDesc: false,
                    monthFormat: 'MMM yyyy',
                    nextText: 'Next Month',
                    prevText: 'Previous Month',
                    monPickrText: 'Show/hide Month Picker',
                    zIndex: 1,

                    beforeChangeMonth: function () { },
                    afterChangeMonth: function () { },
                    beforeChangeDay: function () { },
                    afterChangeDay: function () { }
                }, options);

                //#region VALIDATES INPUT VALUES

                // Validates minDate & maxDate
                if (!isValidDate(settings.minDate, true) || !isValidDate(settings.maxDate, true)) return;

                // Convert minDate & maxDate to Date type for easier later using
                settings.minDate = new Date(settings.minDate);
                settings.maxDate = new Date(settings.maxDate);

                // Validtes selected month
                if (!isValidDate(settings.month, true)) return;

                // Convert selected month to Date type for easier later using
                settings.month = new Date(settings.month);

                var year = settings.month.getFullYear(),
                    month = settings.month.getMonth();

                // Make sure selected month are not out of range (minDate ~ maxDate)
                if (!_validateMonth(settings.minDate, settings.maxDate, year, month)) {
                    logger.error('Oops! Selected month (' + settings.month.toStringFormat('MM/yyyy') +
                        ') is out of range (' + settings.minDate.toStringFormat('MM/yyyy') + ' ~ ' + settings.maxDate.toStringFormat('MM/yyyy') + ')');
                    return;
                }

                // Makes sure selected fromDate & toDate are not out of Range (minDate ~ maxDate)
                var fromDate = new Date(year, month, settings.fromDay),
                    toDate = new Date(year, month, settings.toDay);

                if (!_validateDate(settings.minDate, settings.maxDate, year, month, fromDate)) {
                    logger.error('Oops! fromDate (' + fromDate.toStringFormat('MMM dd, yyyy') + ') is out of range');
                    return;
                }

                if (!_validateDate(settings.minDate, settings.maxDate, year, month, toDate)) {
                    logger.error('Oops! toDate (' + toDate.toStringFormat('MMM dd, yyyy') + ') is out of range');
                    return;
                }

                //#endregion VALIDATES INPUT VALUES

                return this.each(function () {
                    var $this = $(this),
                        data = $this.data('monPickr');

                    // Initialize the plugin if it hasn't
                    if (!data) {
                        $this.data('monPickr', {
                            target: $this,

                            minDate: settings.minDate,
                            maxDate: settings.maxDate,
                            originalYear: settings.year,
                            originalMonth: settings.month,
                            year: settings.month.getFullYear(),
                            month: settings.month.getMonth(),

                            showDateRange: settings.showDateRange,
                            originalFromDay: settings.fromDay,
                            originalToDay: settings.toDay,
                            fromDay: settings.fromDay,
                            toDay: settings.toDay,
                            fromDate: fromDate,
                            toDate: toDate,
                            fromDayId: settings.fromDayId,
                            toDayId: settings.toDayId,

                            expandYearOnhover: settings.expandYearOnhover,
                            expandDayOnhover: settings.expandDayOnhover,
                            showYearSpeed: settings.showYearSpeed,
                            showDropDownSpeed: settings.showDropDownSpeed,

                            disabled: settings.disabled,
                            sortDesc: settings.sortDesc,
                            monthFormat: settings.monthFormat,
                            nextText: settings.nextText,
                            prevText: settings.prevText,
                            monPickrText: settings.monPickrText,
                            zIndex: settings.zIndex,

                            beforeChangeMonth: settings.beforeChangeMonth,
                            afterChangeMonth: settings.afterChangeMonth,
                            beforeChangeDay: settings.beforeChangeDay,
                            afterChangeDay: settings.afterChangeDay
                        });

                        data = $this.data('monPickr')
                    }

                    //#region INIT DOM ELEMENTS

                    //#region Month Picker

                    $this.addClass('monPickr');
                    data.btnPrev = $('<a href="javascript:;" class="prev" title="' + data.prevText + '"><b>&lsaquo;</b></a>');
                    data.btnNext = $('<a href="javascript:;" class="next" title="' + data.nextText + '"><b>&rsaquo;</b></a>');
                    data.lblSelectedMonth = $('<span class="selectedMonth" title="' + data.monPickrText + '"></span>');
                    _setMonthLabel(data);
                    $this.append(data.btnPrev, data.lblSelectedMonth, data.btnNext);

                    $this.wrap('<div class="monPickrWrap" style="z-index: ' + data.zIndex + '" />');
                    data.wrap = $this.parents('.monPickrWrap');
                    data.wrap.wrap('<div class="monPickrWrapParent" style="position: relative" />')
                        .css({ 'position': 'absolute' }).parent().height(data.wrap.outerHeight());

                    data.dropDown = $('<div class="monPickrDropDown" />');

                    var currentYear = data.minDate.getFullYear(),
                        currentMonth = data.minDate.getMonth(),
                        minYear = data.minDate.getFullYear(),
                        minMonth = data.minDate.getMonth(),
                        maxYear = data.maxDate.getFullYear(),
                        maxMonth = data.maxDate.getMonth(),
                        dropDownInner, temp;

                    dropDownInner = '<ul class="monPickrDropDownInner">';

                    if (data.sortDesc) {
                        currentYear = data.maxDate.getFullYear();
                        currentMonth = data.maxDate.getMonth();

                        while (currentYear > minYear || (currentYear == minYear && currentMonth >= minMonth)) {
                            temp = currentYear == data.year ? 'selected' : '';
                            temp += data.expandYearOnhover ? ' hover' : '';

                            dropDownInner +=
                            '<li class="year ' + temp + '">' +
                                '<a year="' + currentYear + '" class="' + temp + '" href="javascript:;">' +
                                    currentYear +
                                '</a>' +
                            '</li>';

                            if (currentYear == data.year) {
                                dropDownInner += '<li class="monthWrap selected" year="' + currentYear + '" style="display: list-item"><ul>';
                            } else {
                                dropDownInner += '<li class="monthWrap" year="' + currentYear + '"><ul>';
                            }

                            while ((currentYear > minYear || (currentYear == minYear && currentMonth >= minMonth)) && currentMonth >= 0) {
                                temp = currentYear == data.year && currentMonth == data.month ? 'class="selected"' : '';

                                dropDownInner +=
                                '<li>' +
                                    '<a month="' + (currentMonth + 1) + '" ' + temp + ' href="javascript:;">' +
                                        new Date(currentYear, currentMonth).toStringFormat('MMMM') + '</a>' +
                                '<li>';

                                currentMonth--;
                            }

                            dropDownInner += '</ul></li>';

                            currentYear--;
                            currentMonth = 11;
                        }
                    } else {
                        while (currentYear < maxYear || (currentYear == maxYear && currentMonth <= maxMonth)) {
                            temp = currentYear == data.year ? 'selected' : '';
                            temp += data.expandYearOnhover ? ' hover' : '';

                            dropDownInner +=
                            '<li class="year ' + temp + '">' +
                                '<a year="' + currentYear + '" class="' + temp + '" href="javascript:;">' +
                                    currentYear +
                                '</a>' +
                            '</li>';

                            if (currentYear == data.year) {
                                dropDownInner += '<li class="monthWrap selected" year="' + currentYear + '" style="display: list-item"><ul>';
                            } else {
                                dropDownInner += '<li class="monthWrap" year="' + currentYear + '"><ul>';
                            }

                            while ((currentYear < maxYear || (currentYear == maxYear && currentMonth <= maxMonth)) && currentMonth < 12) {
                                temp = currentYear == data.year && currentMonth == data.month ? 'class="selected"' : '';

                                dropDownInner +=
                                '<li>' +
                                    '<a month="' + (currentMonth + 1) + '" ' + temp + ' href="javascript:;">' +
                                        new Date(currentYear, currentMonth).toStringFormat('MMMM') + '</a>' +
                                '<li>';

                                currentMonth++;
                            }

                            dropDownInner += '</ul></li>';

                            currentYear++;
                            currentMonth = 0;
                        }
                    }

                    dropDownInner += '</ul>';

                    data.dropDown.append(dropDownInner);
                    $this.after(data.dropDown);

                    _checkReachBound(data, year, month);

                    //#region Events

                    // Toggle the dropdown when users click on selected month label
                    data.wrap.on('click', function (e) {
                        _hideDropDown(data, data.ddlFromDate);
                        _hideDropDown(data, data.ddlToDate);

                        if ($(e.target).hasClass('selectedMonth')) {
                            if (data.dropDown.is(':hidden')) {
                                _showDropDown(data, data);
                            } else {
                                _hideDropDown(data, data);
                            }
                        }
                    });

                    // Collapse all dropdowns when users click outside the picker
                    $('html').on('click', function (e) {
                        var $target = $(e.target);
                        var pickerId = "#" + data.target.attr("id");

                        if (!$target.closest(pickerId).length) {
                            _hideDropDown(data, data);
                        }
                    });

                    // Toggle a dropdown when users click/hover on its "the year" link
                    var expectedEvent = data.expandYearOnhover ? 'mouseenter' : 'click';
                    data.dropDown.on(expectedEvent, '.year a', function () {
                        var $this = $(this), year = $this.attr('year'),
                            thisIsNotSelected = $this.hasClass('selected') == false;

                        switch (expectedEvent) {
                            case 'mouseenter':
                                {
                                    if (thisIsNotSelected) {
                                        _hideCurrentYear(data);
                                        _showSelectedYear(data, year); // expand this
                                    }
                                } break;
                            case 'click':
                                {
                                    _hideCurrentYear(data);

                                    if (thisIsNotSelected) {
                                        // We have to expand "the year" which was clicked.
                                        // Else means this is the current year itself --> we don't need to expand it
                                        _showSelectedYear(data, year);
                                    }

                                    data.dropDown.find('.year a.selected:first').parent().addClass('selected');
                                } break;
                        }
                    });

                    // Change current month when users select a month
                    data.dropDown.on('click', '.monthWrap a[month]', function () {
                        var $this = $(this);
                        _selectMonth(data, $this.parents('.monthWrap').attr('year'), $this.attr('month') - 1);
                        _hideDropDown(data, data);
                    });

                    // Move to next month when users click next button
                    data.btnNext.on('click', function () {
                        var nextMonth = data.month + 1,
                            year = data.year;

                        if (nextMonth > 11) {
                            nextMonth = 0;
                            year++;
                        }

                        if (_validateMonth(data.minDate, data.maxDate, year, nextMonth)) {
                            _selectMonth(data, year, nextMonth);
                        }
                    });

                    // Move to previous month when users click prev button
                    data.btnPrev.on('click', function () {
                        var prevMonth = data.month - 1,
                            year = data.year;

                        if (prevMonth < 0) {
                            prevMonth = 11;
                            year--;
                        }

                        if (_validateMonth(data.minDate, data.maxDate, year, prevMonth)) {
                            _selectMonth(data, year, prevMonth);
                        }
                    });

                    //#endregion Events

                    //#endregion Month Picker

                    //#region Day Picker

                    if (data.showDateRange) { // Renders date range component (fromDate & toDate)
                        var renderDayPicker = function (data, dayPickr, dayPickrId, selectedDay) {
                            dayPickr = $('#' + dayPickrId);

                            if (dayPickr.length > 0) {
                                dayPickr.addClass('dayPickr')
                                    .append('<span class="selectedDay">' + selectedDay + '</span>')
                                    .append('<a class="darr" href="javascript:;"><b>v</b></a>')
                                    .wrap('<div class="selectedDayWrap" style="z-index: ' + data.zIndex + '" />');

                                dayPickr.wrap = dayPickr.parents('.selectedDayWrap')
                                    .wrap('<div class="selectedDayWrapParent" style="position: relative" />')
                                    .css({ 'position': 'absolute' });
                                dayPickr.wrap.parent().height(dayPickr.wrap.outerHeight());
                                dayPickr.dropDown = $('<div class="dayPickrDropDown" />');

                                var currentDay = 1,
                                    minDay = _getMinDayInMonth(data.minDate, data.year, data.month),
                                    maxDay = _getMaxDayInMonth(data.maxDate, data.year, data.month),
                                    dayPickrDropDown;

                                dayPickrDropDown = '<ul>';

                                while (currentDay <= 31) {
                                    temp = currentDay < minDay || currentDay > maxDay ? 'style="display: none"' : '';
                                    dayPickrDropDown += '<li ' + temp + '><a href="javascript:;">' + currentDay + '</a></li>';
                                    currentDay++;
                                }

                                dayPickrDropDown += '</ul>';

                                dayPickr.dropDown.append(dayPickrDropDown);
                                dayPickr.after(dayPickr.dropDown);

                                return dayPickr;
                            } else {
                                logger.error('Oops! fromDayId (' + data.fromDayId + ') or toDayId (' + data.toDayId + ') does not exist');
                            }
                        }

                        data.ddlFromDate = renderDayPicker(data, data.ddlFromDate, data.fromDayId, data.fromDay);
                        data.ddlToDate = renderDayPicker(data, data.ddlToDate, data.toDayId, data.toDay);

                        //#region Events

                        var dayExpectedEvent = data.expandDayOnhover ? 'hover' : 'click',
                            toggleDayPickr = function (e) {
                                if (data.isClosingDropDown) {
                                    data.isClosingDropDown = false;
                                    return;
                                }

                                var target = e.data.target;

                                _hideDropDown(data, data);
                                if (target == data.ddlFromDate) {
                                    _hideDropDown(data, data.ddlToDate);
                                }
                                else {
                                    _hideDropDown(data, data.ddlFromDate);
                                }

                                if (target.dropDown.is(':hidden')) {
                                    _showDropDown(data, target);
                                } else {
                                    _hideDropDown(data, target);
                                }
                            };

                        // Toggle the day picker dropdown when users click/hover on selected day label
                        data.ddlFromDate.wrap.on(dayExpectedEvent, { target: data.ddlFromDate }, toggleDayPickr);
                        data.ddlToDate.wrap.on(dayExpectedEvent, { target: data.ddlToDate }, toggleDayPickr);

                        if (!data.expandDayOnhover) {
                            // Collapse all day picker dropdowns when users click outside the picker
                            $('html').on('click', function (e) {
                                var $target = $(e.target);
                                var targetId = $target.attr("id");
                                targetId = targetId === undefined ? $target.parent().attr("id") : targetId;

                                if (targetId !== data.fromDayId && targetId !== data.toDayId) {
                                    _hideDropDown(data, data.ddlFromDate);
                                    _hideDropDown(data, data.ddlToDate);
                                }
                                else if (targetId !== data.fromDayId) {
                                    _hideDropDown(data, data.ddlFromDate);
                                }
                                else {
                                    _hideDropDown(data, data.ddlToDate);
                                }
                            });
                        }

                        var changeCurrentDay = function (e) {
                            var $this = $(this),
                                selectedDay = $this.find('a').html();

                            // prevent conflict when closing day dropdown
                            if (data.expandDayOnhover) data.isClosingDropDown = true;

                            $this.parents('.dayPickrDropDown').hide();
                            _selectDay(data, e.data.target, selectedDay, e.data.isFromDay);

                            e.stopPropagation();
                        };

                        // Change current fromDay/toDay when users select a day
                        data.ddlFromDate.dropDown.on('click', 'li', { target: data.ddlFromDate, isFromDay: true }, changeCurrentDay);
                        data.ddlToDate.dropDown.on('click', 'li', { target: data.ddlToDate, isFromDay: false }, changeCurrentDay);

                        //#endregion Events
                    }

                    //#endregion Day Picker

                    //#endregion INIT DOM ELEMENTS
                });
            },

            // Returns the current month or null if the invoker's data does not exist
            // format may be '' which tell this to use default format
            getMonth: function (format) {
                var data = _getData(this);
                if (!data) return null;

                if (format != undefined) {
                    format = format.length > 0 ? format : data.monthFormat;
                    return new Date(data.year, data.month).toStringFormat(format);
                } else {
                    return data.month + 1;
                }
            },

            // Sets the current month for the month picker.
            // value may be a Date object or a string but it must be a full date (include year, month & day)
            setMonth: function (value) {
                var data = _getData(this);
                if (!data) return;

                var year, month, _value = value;

                if ((typeof value).toLowerCase() != 'object') {
                    _value = new Date(_value);
                }

                year = _value.getFullYear();
                month = _value.getMonth();

                if (isInteger(year) && isInteger(month)) {
                    if (_validateMonth(data.minDate, data.maxDate, year, month)) {
                        _selectMonth(data, year, month);
                    } else {
                        logger.error('Oops! Can\'t set month because input (' + value.toString() +
                            ') is out of range (' + data.minDate.toStringFormat('MMM yyyy') + ' ~ ' + data.maxDate.toStringFormat('MMM yyyy') + ')');
                    }
                } else {
                    logger.error('Oops! Can\'t set month because of invalid input (' + value.toString() + ')');
                }
            },

            // Returns the current fromDate or null if the invoker's data does not exist
            // format may be '' which tell this to use default format
            getFromDate: function (format) {
                var data = _getData(this);
                if (!data) return null;

                if (format != undefined) {
                    format = format.length > 0 ? format : data.monthFormat;
                    return data.fromDate.toStringFormat(format);
                }

                return data.fromDate;
            },

            // Returns the current toDate or null if the invoker's data does not exist
            // format may be '' which tell this to use default format
            getToDate: function (format) {
                var data = _getData(this);
                if (!data) return null;

                if (format != undefined) {
                    format = format.length > 0 ? format : data.monthFormat;
                    return data.toDate.toStringFormat(format);
                }

                return data.toDate;
            },

            // Sets the current fromDay
            setFromDay: function (value) {
                var data = _getData(this);
                if (!data) return;

                var selectedDate = new Date(data.year, data.month, value);

                if (isInteger(value) && _validateDate(data.minDate, data.maxDate, data.year, data.month, selectedDate)) {
                    _selectDay(data, data.ddlFromDate, value, true);
                } else {
                    logger.error('Oops! input value (' + value + ') is invalid');
                }
            },

            // Sets the current toDay
            setToDay: function (value) {
                var data = _getData(this);
                if (!data) return;

                var selectedDate = new Date(data.year, data.month, value);

                if (isInteger(value) && _validateDate(data.minDate, data.maxDate, data.year, data.month, selectedDate)) {
                    _selectDay(data, data.ddlToDate, value, false);
                } else {
                    logger.error('Oops! input value (' + value + ') is invalid');
                }
            },

            // Resets picker to its data-original initial state
            reset: function () {
                var data = _getData(this);
                if (!data) return;

                _selectMonth(data, data.originalYear, data.originalMonth);
            }
        };

        /*
        * Public methods
        */

        $.fn.monPickr = function (method) {
            if (_methods[method]) { // call a method but init
                return _methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) { // call init method
                return _methods.init.apply(this, arguments);
            } else { //
                logger.error('Oops! Method "' + method + '" does not exist on jQuery.monPickr');
            }
        };
    })(jQuery);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed")))

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed")))

/***/ }),

/***/ "./www/js/source/pages/report/livereport/helper.js":
/*!*********************************************************!*\
  !*** ./www/js/source/pages/report/livereport/helper.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! common/querystring */ "./www/js/source/common/querystring.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (QueryString) {
    'use strict';

    function getMatchListProductOption(sportId, productCode) {
        const newSportId = Number(sportId);
        let productOptions = [];
        if (newSportId > 0) {
            if (newSportId === 180 || newSportId === 186 || newSportId === 231 || newSportId === 104 ||
                (newSportId >= 190 && newSportId <= 197) || newSportId === 178 || newSportId === 179
                || newSportId === 188) {
                productOptions.push('VS');
            }
            else if (newSportId === 162) {
                productOptions.push('LC');
            }
            else {
                if (productCode === 'SB' || productCode === 'ALL') {
                    productOptions.push('SB');
                }
                if (productCode === 'BA' || productCode === 'ALL') {
                    productOptions.push('BA');
                }
            }
        }
        else {
            if (productCode === 'ALL') {
                productOptions = ['SB', 'BA', 'NG', 'LC', 'VS', 'CS'];
            }
            else {
                productOptions.push(productCode);
            }
        }

        return productOptions;
    }

    return {
        getMatchListProductOption: getMatchListProductOption,
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./www/js/source/pages/report/livereport/livereport.js":
/*!*************************************************************!*\
  !*** ./www/js/source/pages/report/livereport/livereport.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed"), __webpack_require__(/*! common/querystring */ "./www/js/source/common/querystring.js"), __webpack_require__(/*! common/site */ "./www/js/source/common/site.js"), __webpack_require__(/*! components/pluginhelper/daterangepicker */ "./www/js/source/components/pluginhelper/daterangepicker.js"), __webpack_require__(/*! components/pluginhelper/monthpicker */ "./www/js/source/components/pluginhelper/monthpicker.js"), __webpack_require__(/*! components/pluginhelper/multiselect.nlevel */ "./www/js/source/components/pluginhelper/multiselect.nlevel.js"), __webpack_require__(/*! ./helper */ "./www/js/source/pages/report/livereport/helper.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, QueryString, Site, DatePicker, MonthPicker, MultiSelectNLevel, Helper) {
        'use strict';
        const _selector = {
            SubmitButton: '#SubmitButton',
            ExportToExcel: '#ExportToExcel',
            Form: '#LiveReportForm',
            FromDate: '#FromDate',
            ToDate: '#ToDate',
            ProductCode: '#ProductCode',
            LiveIndicator: '#LiveIndicator',
            CurrencyName: '#CurrencyName',
            CurrencyId: '#CurrencyId',
            SubsidiarySearchCheckbox: '#SubsidiarySearchCheckbox',
            SubsidiaryDropdown: '#SubsidiaryDropdown',
            SubsidiarySearch: '#SubsidiarySearch',
            DetailContent: '#DetailContent',
            BaseCurrency: '#BaseCurrency',
            IsExportExcel: '#IsExportExcel',
        };

        function initialize() {
            Site.initialize();
            initEvent();
            DatePicker.initDateRangePicker();
            MonthPicker.initMonthPicker();
            MultiSelectNLevel.initSubsidiaryList();

            Site.addUserGuide({
                resourceName: 'LiveReport',
                title: Site.getSingleResource('LiveReport')
            });
        }

        function initEvent() {
            $('body').on('click', '.product-detail-link', function () {
                viewProductDetail(this);
            });

            $('body').on('click', '.sport-detailt-link', function () {
                viewSportDetail(this);
            });

            $(_selector.ExportToExcel).click(function () {
                const subsidiary = Site.getLrfSubsidiary();
                if (subsidiary && Object.keys(subsidiary).length > 0) {
                    $("#SubsidiarySearch").val(subsidiary.SubsidiarySearch);
                    $("#SubsidiaryList").val(subsidiary.SubsidiaryList);
                }

                $(_selector.IsExportExcel).val(true);
                $(_selector.Form).submit();
                $(_selector.IsExportExcel).val(false);
            });

            $(_selector.SubmitButton).click(function () {
                const subsidiary = Site.getLrfSubsidiary();
                if (subsidiary && Object.keys(subsidiary).length > 0) {
                    $("#SubsidiarySearch").val(subsidiary.SubsidiarySearch);
                    $("#SubsidiaryList").val(subsidiary.SubsidiaryList);
                }

                Site.blockUI();
                $(_selector.Form).submit();
            });

            $(_selector.SubsidiarySearchCheckbox).click(function () {
                $(_selector.SubsidiaryDropdown).toggle(this.checked);
                $(_selector.SubsidiarySearch).val(this.checked);
            });
        }

        function viewProductDetail(target) {
            const productCode = $(target).attr('data-product-code');
            let subsidiary = Site.getLrfSubsidiary();
            if (!subsidiary || Object.keys(subsidiary).length === 0) {
                subsidiary.SubsidiarySearch = $("#SubsidiarySearch").val();
                subsidiary.SubsidiaryList = $("#SubsidiaryList").val();
            }

            let data = {
                productCode: productCode,
                SubsidiarySearch: subsidiary.SubsidiarySearch,
                SubsidiaryList: subsidiary.SubsidiaryList,
                FromDate: $(_selector.FromDate).attr('data-original-from'),
                ToDate: $(_selector.ToDate).attr('data-original-to'),
                BaseCurrency: $(_selector.BaseCurrency).attr('data-original'),
                LiveIndicator: $(_selector.LiveIndicator).attr('data-original')
            };
            data = Site.setLicenseeOptionOriginalParam(data);
            const isSelected = $(target).parent().hasClass('selected');
            if (isSelected) { return; }

            $('a.product-detail-link').parent().removeClass('selected');
            $(target).parent().addClass('selected');

            $.ajax({
                type: 'POST',
                data: data,
                dataType: 'json',
                url: Site.resolveClientUrl('LiveReport/Detail'),
                beforeSend: Site.blockUI,
                complete: function (jqXHR) {
                    if (jqXHR.readyState === 4) {
                        $(_selector.ProductCode).val(data.productCode);
                        $(_selector.DetailContent).html(jqXHR.responseText);
                    }
                    Site.unBlockUI();
                }
            });
        }

        function viewBetList(url, totalValue, productOptions) {
            let subsidiary = Site.getLrfSubsidiary();
            if (!subsidiary || Object.keys(subsidiary).length === 0) {
                subsidiary.SubsidiarySearch = $("#SubsidiarySearch").val();
                subsidiary.SubsidiaryList = $("#SubsidiaryList").val();
            }

            let newUrl = Site.setLicenseeOptionOriginalParam(url);
            newUrl = QueryString.setParam(newUrl, 'FromDate', $(_selector.FromDate).attr('data-original-from'));
            newUrl = QueryString.setParam(newUrl, 'ToDate', $(_selector.ToDate).attr('data-original-to'));
            newUrl = QueryString.setParam(newUrl, 'LiveIndicator', $(_selector.LiveIndicator).attr('data-original'));
            newUrl = Site.setProductCodeListParam(newUrl, productOptions);
            newUrl = QueryString.setParam(newUrl, 'SubsidiarySearch', subsidiary.SubsidiarySearch);
            newUrl = QueryString.setParam(newUrl, 'SubsidiaryList', subsidiary.SubsidiaryList);

            Site.blockUI();
            Site.redirect(newUrl);
        }

        function viewSportDetail(target) {
            const data = $(target).attr('data-drill-down');
            const jsonData = $.parseJSON(data);
            const productCode = $(_selector.ProductCode).val();
            // after users back from match list,
            // the report does not show detailed data,
            // so remove product code to not show detailed data in EXPORT EXCEL
            $(_selector.ProductCode).val('');
            const productOptions = Helper.getMatchListProductOption(jsonData.SportId, productCode);
            const urlMap = {
                Key101: 'LiveReportBetList/MixParlay?bettype=9',
                Key102: 'LiveReportBetList/MixParlay?bettype=29',
                Key103: 'LiveReportBetList/Outright',
                Key161: 'LiveReportBetList/NumberGame?Sporttype=161',
                Key164: 'LiveReportBetList/NumberGame?Sporttype=164',
                Key168: 'LiveReportBetList/NumberGame?Sporttype=168',
                Key181: 'LiveReportBetList/VirtualSports?SportType=181',
                Key182: 'LiveReportBetList/VirtualSports?SportType=182',
                Key183: 'LiveReportBetList/VirtualSports?SportType=183',
                Key184: 'LiveReportBetList/VirtualSports?SportType=184',
                Key185: 'LiveReportBetList/VirtualSports?SportType=185',
                Key104: 'LiveReportBetList/MixParlay?bettype=9',
                Key175: 'LiveReportBetList/BitCoin?SportType=175',
                Key169: 'LiveReportBetList/SportsLottery?Sporttype=169',
                Key231: 'LiveReportBetList/VS3?Sporttype=231'
            };

            let url = urlMap['Key' + jsonData.SportId];
            if (url) {
                viewBetList(Site.resolveClientUrl(url), jsonData.TotalValue, productOptions);
            }
            else {
                let subsidiary = Site.getLrfSubsidiary();
                if (!subsidiary || Object.keys(subsidiary).length === 0) {
                    subsidiary.SubsidiarySearch = $("#SubsidiarySearch").val();
                    subsidiary.SubsidiaryList = $("#SubsidiaryList").val();
                }
                // Match List
                url = Site.resolveClientUrl('LiveReport/MatchList');
                url = Site.setLicenseeOptionOriginalParam(url);
                url = QueryString.setParam(url, 'SubsidiarySearch', subsidiary.SubsidiarySearch);
                url = QueryString.setParam(url, 'SubsidiaryList', subsidiary.SubsidiaryList);
                url = QueryString.setParam(url, 'SportId', jsonData.SportId);
                url = QueryString.setParam(url, 'ProductCode', productCode);
                url = QueryString.setParam(url, 'FromDate', $(_selector.FromDate).attr('data-original-from'));
                url = QueryString.setParam(url, 'ToDate', $(_selector.ToDate).attr('data-original-to'));
                url = QueryString.setParam(url, 'LiveIndicator', $(_selector.LiveIndicator).attr('data-original'));
                url = Site.setProductCodeListParam(url, productOptions);

                Site.blockUI();
                Site.redirect(url);
            }
        }

        return {
            initialize: initialize
        };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./www/js/source/pages/report/livereport/main-livereport.js":
/*!******************************************************************!*\
  !*** ./www/js/source/pages/report/livereport/main-livereport.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./livereport */ "./www/js/source/pages/report/livereport/livereport.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (LiveReport) {
    'use strict';
    $(LiveReport.initialize);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed")))

/***/ }),

/***/ 2:
/*!************************************************************************!*\
  !*** multi ./www/js/source/pages/report/livereport/main-livereport.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./www/js/source/pages/report/livereport/main-livereport.js */"./www/js/source/pages/report/livereport/main-livereport.js");


/***/ })

/******/ });
//# sourceMappingURL=livereport.chunk.js.map