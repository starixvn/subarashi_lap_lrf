define(
    ['jquery', 'common/querystring', 'common/site', '../report', './godoffortunewinLoss.option', 'components/pluginhelper/multiselect',
        'lib/jqgrid/jquery.jqgrid.additional', 'components/pluginhelper/daterangepicker', 'moment', 'common/popup',
        'helpers/daterange', 'helpers/downloader', 'components/toast', 'helpers/datahelper', 'lib/jqgrid/jquery.jqGrid.en',
        'lib/jqgrid/jquery.jqGrid.min', 'extensions/jquery.extension', 'lib/linq', 'extensions/ajaxBinaryTransporting'],
    function ($, QueryString, Site, Report, GodOfFortuneWinLossOption, MultiSelect, jqGridAdditional, DatePicker, moment, Popup,
        DateHelper, Downloader, Toast, DataHelper) {
        'use strict';
        const REPORT_BY_MONTHLY = 2;
        const VALID_MONTH_RANGE = 3;
        const EXCEL_FILENAME = 'GodOfFortuneWinLoss.xls';

        const cacheData = {};
        let ajaxRequest = null;
        let _sortColumnName = null;
        let _sortOrder = 'desc';
        let _level = 0;
        let _reportBy = null;
        let _submitData; // cache submit data of level 0.
        let drillDownData = {};

        const _me = {
            initialize: function () {
                Site.initialize();
                _me.initEvent();
                _me.initSetting();
                _me.registerGlobalFunction();

                GodOfFortuneWinLossOption.gridOption.onSortCol = function (index) {
                    Site.blockUI();
                    window.setTimeout(function () {
                        if (_sortColumnName === index) {
                            _sortOrder = _sortOrder === 'asc' ? 'desc' : 'asc';
                        } else {
                            _sortOrder = 'asc';
                            _sortColumnName = index;
                        }

                        _me.bindData(_level, _reportBy, cacheData[_level]);

                        Site.unBlockUI();
                    }, 100);
                    return 'stop';
                };

                Site.addUserGuide({
                    resourceName: 'GodOfFortuneWL',
                    title: Site.getSingleResource('GodOfFortuneWinLoss')
                });
                MultiSelect.initCurrencyList();
                DatePicker.initDateRangePicker();
                DateHelper.setConstraintMonthRange(VALID_MONTH_RANGE, Site.buildReportProxyUrl(GodOfFortuneWinLossOption.urlPrefix));
            },

            registerGlobalFunction: function () {
                window.godoffortunewinlossDrilldown = _me.drillDown;
            },

            sortData: function (arrayData) {
                const totalData = arrayData.length;

                if (!_sortColumnName || totalData <= 1) {
                    return arrayData;
                }

                const sortThenBy = arrayData[0].Id ? 'Id' : 'Index';

                const data = DataHelper.sort(
                    arrayData,
                    function (x) { return x[_sortColumnName]; },
                    _sortOrder,
                    function (x) { return x[sortThenBy]; },
                    'asc');

                if (sortThenBy === 'Id') {
                    for (let i = 0; i < totalData; i++) {
                        data[i].Index = i + 1;
                    }
                }
                else {
                    for (let j = 0; j < totalData; j++) {
                        arrayData[j].Id = j + 1;
                        data[j].Index = j + 1;
                    }
                }

                return data;
            },

            initSetting: function () {
                GodOfFortuneWinLossOption.licenseeId = parseInt($('#drillDownLicenseeId').val(), 10);
            },

            initEvent: function () {
                $('body').on('click', '.bet-list-link', function () {
                    const dataDrillDown = $(this).attr('data-drill-down');
                    _me.openBetlistPopUp(dataDrillDown);
                });

                $("#grid-currency-multiselect").on("click", "option", function () {
                    console.log($(this)); //this will log the clicked option.
                });

                $('#SubmitButton').click(function () {
                    $('#IsExportExcel').val(false);
                    _level = 0;
                    _sortColumnName = null;
                    _sortOrder = 'desc';
                    _me.submit();
                });

                $('#BaseCurrency').on('change', function (e) {
                    if (e.target == e.currentTarget) {
                        $('#oldBaseCurrency').val(this.value);
                    }
                });

                if ($("#IsExcludedTestData").is(':checked')) {
                    $("#IsExcludedTestData").attr('value', 'true');
                }

                if ($("#IsConvertAll").is(':checked')) {
                    $("#IsConvertAll").attr('value', 'true');
                }

                $('#ExportToExcel').click(function () {
                    $('#IsExportExcel').val(true);

                    const data = $('#godoffortunewinloss').serializeObject();
                    data.CurrencyIdList = $('#grid-currency-multiselect').multiSelect('getCheckedItems').join(',');

                    if(_level > 0) {
                        data.DrillDownLevel = _level;
                        data.CurrencyIdList = drillDownData.CurrencyId;
                        data.DrillDownFromDate = drillDownData.FromDate;
                        data.DrillDownToDate = drillDownData.ToDate;
                        data.DrillDownCustomerId = drillDownData.AgentId
                    }

                    if (_sortColumnName) {
                        data.sortby = _sortColumnName;
                        data.sortOrder = _sortOrder;
                    }

                    _me.exportExcel(GodOfFortuneWinLossOption.urlExcelData, data, EXCEL_FILENAME);
                });

                $('#level-link-container').on('click', '.level-link', function () {
                    const level = Number($(this).attr('data-level'));
                    _level = level;
                    if (level < 2) {
                        _me.goBack(level);
                    }
                });

                $(window).on('resize', function () {
                    _me.resizeGrid();
                });

                $(window).on('unload', function () {
                    $(window).off('resize');
                });
            },

            exportExcel: function (url, data, fileName) {
                const option = {
                    type: 'POST',
                    data: data,
                    dataType: 'binary',
                    responseType: 'blob',
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    cache: false,
                    url: Site.buildReportProxyUrl(url),
                    success: function (response) {
                        Downloader.download(response, fileName);
                    },
                    beforeSend: function () {
                        Toast.show();
                    }
                };

                $.ajax(option);

                return false;
            },

            //#region Layout
            setReportTitle: function (fromdate, todate, currencyName) {
                const titlePattern = Site.getSingleResource('GodOfFortuneWinLoss') + ', {0} → {1} - {2}';
                const currencyNameOnTitle = Site.getSingleResource('Viewin').replace('{0}', currencyName.toUpperCase());

                const title = $.format(titlePattern,
                    moment(fromdate, 'MM/DD/YYYY').format('MM/DD/YYYY'),
                    moment(todate, 'MM/DD/YYYY').format('MM/DD/YYYY'),
                    currencyNameOnTitle);
                $('.report-title').html(title);
                $('.panel-heading').removeClass('hide');
            },
            //#end

            //#Get Data
            ajaxComplete: function (level, response) {
                const levelNumber = Number(level);
                if (response !== null) {
                    const reportBy = $('input[name="ReportBy"]:checked').val();
                    _reportBy = reportBy;
                    cacheData[levelNumber] = response;

                    if (levelNumber === 0) {
                        _me.setReportTitle($('#FromDate').val(), $('#ToDate').val(), $('#BaseCurrency').val());
                    }

                    Report.renderBreadCrumb(levelNumber, GodOfFortuneWinLossOption.licenseeId);
                    _me.bindData(levelNumber, reportBy, response);
                }
            },

            renderHtmlOption: function (key, value) {
                return '<option value="' + key + '">' + value + '</option>';
            },

            submit: function () {
                Site.updateOriginalLicenseeOption();
                const mainForm = $('#godoffortunewinloss');
                const data = mainForm.serializeObject();
                data.CurrencyIdList = $('#grid-currency-multiselect').multiSelect('getCheckedItems').join(',');

                const option = {
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    cache: false,
                    url: Site.buildReportProxyUrl(GodOfFortuneWinLossOption.urlData),
                    success: function (response) {
                        _submitData = {
                            DrawFilter: data.DrawFilter,
                            CurrencyId: data.CurrencyId,
                            ReportBy: Number(data.ReportBy),
                            FromDate: data.FromDate,
                            ToDate: data.ToDate,
                            BaseCurrency: data.BaseCurrency,
                            IsExcludedTestData: data.IsExcludedTestData,
                            IsConvertAll: data.IsConvertAll,
                            CurrencyIdList: data.CurrencyIdList
                        };
                        _me.ajaxComplete(0, response);
                    },
                    beforeSend: function () {
                        Site.blockUI();
                    },
                    complete: function () {
                        Site.unBlockUI();
                    }
                };
                if (ajaxRequest !== null) {
                    ajaxRequest.abort();
                }
                ajaxRequest = $.ajax(option);

                return true;
            },

            lastDateOfMonth: function (year, month) {
                return new Date(year, month + 1, 0);
            },

            drillDown: function (level, currencyId, customerId, datetime, currencyName) {
                const levelNumber = Number(level);

                if (_level !== levelNumber) {
                    _level = levelNumber;
                }
                const drilldownDate = new Date(datetime);
                const dateRange = Report.GetDrilldownDateRange(_submitData.ReportBy, _submitData.FromDate, _submitData.ToDate, drilldownDate);
                const drillDownFDate = moment(dateRange.FromDate).format('MM/DD/YYYY');
                const drillDownTDate = moment(dateRange.ToDate).format('MM/DD/YYYY');
                
                const param =
                {
                    DrawFilter: _submitData.DrawFilter,
                    IsExcludedTestData: _submitData.IsExcludedTestData,
                    IsConvertAll: _submitData.IsConvertAll,
                    ReportBy: _submitData.ReportBy,
                    FromDate: _submitData.FromDate,
                    ToDate: _submitData.ToDate,
                    BaseCurrency: _submitData.BaseCurrency,
                    CurrencyIdList: currencyId,
                    DrillDownLevel: levelNumber,
                    DrillDownCustomerId: customerId,
                    DrillDownFromDate: drillDownFDate,
                    DrillDownToDate: drillDownTDate
                };
                
                const option = {
                    type: 'POST',
                    data: param,
                    dataType: 'json',
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    cache: false,
                    url: Site.buildReportProxyUrl(GodOfFortuneWinLossOption.urlData),
                    success: function (response) {
                        _me.ajaxComplete(levelNumber, response);
                        if (response !== null && response.data.length > 0) {
                            _me.setReportTitle(dateRange.FromDate, dateRange.ToDate, param.BaseCurrency);
                        }

                        //update excel ULR
                        _me.updateDrilldownData(currencyId, currencyName, drillDownFDate, drillDownTDate, customerId);
                    },
                    beforeSend: function () {
                        Site.blockUI();
                    },
                    complete: function () {
                        Site.unBlockUI();
                    }
                };
                if (ajaxRequest !== null) {
                    ajaxRequest.abort();
                }
                ajaxRequest = $.ajax(option);
            },

            updateDrilldownData: function (currencyId, currencyName, fromDate, toDate, agentId) {
                drillDownData = {
                    CurrencyId: currencyId,
                    CurrencyName: currencyName,
                    FromDate: fromDate,
                    ToDate: toDate,
                    AgentId: agentId,
                    IsExcludedTestData: _submitData.IsExcludedTestData,
                    IsConvertAll: _submitData.IsConvertAll
                };
            },

            goBack: function (level) {
                const reportBy = _submitData.ReportBy;
                Report.renderBreadCrumb(level, GodOfFortuneWinLossOption.licenseeId);

                const data = cacheData[level];
                _me.bindData(level, reportBy, data);

                if (level === 0) {
                    _me.setReportTitle(_submitData.FromDate, _submitData.ToDate, _submitData.BaseCurrency);
                }
                else if (level === 1) {
                    _me.updateDrilldownData(drillDownData.CurrencyId, drillDownData.CurrencyName, drillDownData.FromDate, drillDownData.ToDate, 0);
                    GodOfFortuneWinLossOption.urlExcelData = GodOfFortuneWinLossOption.urlExcelData.replace('level=2', 'level=1');
                }
            },

            //#BindReport

            bindTotal: function (level, totalData, summaryTotal) {
                const columnModel = GodOfFortuneWinLossOption.getTotalColModel(level);
                const colspan = GodOfFortuneWinLossOption.totalColspan[level];
                const summaryColspan = colspan + 1;

                jqGridAdditional.assignTotal(totalData, columnModel);
                const summaryRowCount = Report.bindSummaryTotal(columnModel, summaryTotal);
                jqGridAdditional.setGroupFooters(colspan, summaryColspan, summaryRowCount);
            },

            bindData: function (level, reportBy, response) {
                jqGridAdditional.clearGrid('ReportGrid');
                const numOfRow = response.data.length;
                if (numOfRow === 0) {
                    jqGridAdditional.setNoInfo();
                    return;
                }

                const levelNumber = Number(level);
                const reportGrid = $('#ReportGrid');

                let onPaging = false;
                const data = _me.sortData(response.data);

                const gridOption = GodOfFortuneWinLossOption.getGridOption(levelNumber, reportBy);
                gridOption.rownumbers = true;
                gridOption.data = data;
                gridOption.userData = {};
                gridOption.rowNum = levelNumber === 2 ? GodOfFortuneWinLossOption.pageSize : GodOfFortuneWinLossOption.nonePagingSize;
                gridOption.rowList = GodOfFortuneWinLossOption.rowList;
                gridOption.rowTotal = numOfRow;
                gridOption.pager = '#ppdata';
                gridOption.onPaging = function (pgButton) {
                    if (levelNumber === 2 && numOfRow > GodOfFortuneWinLossOption.pageSize) {
                        if ($('#' + pgButton).hasClass('ui-state-disabled') === false) {
                            Site.blockUI();
                        }
                        onPaging = true;
                    }
                    else {
                        return 'stop';
                    }
                };
                gridOption.gridComplete = function () {
                    jqGridAdditional.gridComplete();
                    if (levelNumber === 2 && numOfRow > GodOfFortuneWinLossOption.pageSize) {
                        $('#pg_ppdata').show();
                    }
                    else {
                        $('#pg_ppdata').hide();
                    }

                    if (onPaging && levelNumber === 2) {
                        $('.ui-jqgrid-ftable').html($('#footer').html());
                    }
                    else {
                        _me.bindTotal(levelNumber, response.total, response.summaryTotal);
                        $('#footer').html($('.ui-jqgrid-ftable').html());
                    }

                    onPaging = false;
                    _me.resizeGrid();

                    Site.unBlockUI();
                };

                // Show the grid
                reportGrid.jqGrid(gridOption);

                if (_sortColumnName) {
                    jqGridAdditional.addSortableHeader(reportGrid, _sortColumnName, _sortOrder);
                }
            },

            //#end

            openBetlistPopUp: function (data) {
                const dataDrillDown = $.parseJSON(data);
                dataDrillDown.DrawFilter = _submitData.DrawFilter;
                dataDrillDown.IsExcludedTestData = _submitData.IsExcludedTestData;
                dataDrillDown.IsConvertAll = _submitData.IsConvertAll;
                dataDrillDown.CurrencyId = _submitData.CurrencyId;
                dataDrillDown.BaseCurrency = $('#BaseCurrency').attr('data-original');

                if (typeof dataDrillDown.DrillDownFromDate === 'string') {
                    dataDrillDown.DrillDownFromDate = new Date(dataDrillDown.DrillDownFromDate);
                    dataDrillDown.DrillDownToDate = new Date(dataDrillDown.DrillDownToDate);
                }

                if (_submitData.ReportBy === REPORT_BY_MONTHLY) {
                    let fday = 1;
                    const month = dataDrillDown.DrillDownFromDate.getMonth();
                    const year = dataDrillDown.DrillDownFromDate.getFullYear();

                    const orignalFDate = new Date(_submitData.FromDate);
                    const originalTDate = new Date(_submitData.ToDate);

                    if (month === orignalFDate.getMonth()) {
                        fday = orignalFDate.getDate();
                    }
                    dataDrillDown.DrillDownFromDate = new Date(year, month, fday, 0, 0, 0, 0);
                    if (month === originalTDate.getMonth()) {
                        const tday = originalTDate.getDate();
                        dataDrillDown.DrillDownToDate = new Date(year, month, tday, 0, 0, 0, 0);
                    }
                    else {
                        dataDrillDown.DrillDownToDate = _me.lastDateOfMonth(year, month);
                    }
                }

                let url = Site.resolveClientUrl('GodOfFortuneWinLossBetList/Index');
                url = QueryString.setParam(url, 'fromdate', moment(dataDrillDown.DrillDownFromDate).format('MM/DD/YYYY'));
                url = QueryString.setParam(url, 'todate', moment(dataDrillDown.DrillDownToDate).format('MM/DD/YYYY'));
                url = QueryString.setParam(url, 'excludetest', dataDrillDown.IsExcludedTestData);
                url = QueryString.setParam(url, 'convertAll', dataDrillDown.IsConvertAll);
                url = QueryString.setParam(url, 'CurrencyId', dataDrillDown.DrillDownCurrencyId);
                url = QueryString.setParam(url, 'CurrencyName', dataDrillDown.DrillDownCurrencyName);
                url = QueryString.setParam(url, 'drawfilter', dataDrillDown.DrawFilter);
                url = QueryString.setParam(url, 'custid', dataDrillDown.CustomerId);
                url = QueryString.setParam(url, 'systemId', dataDrillDown.SystemId);
                url = QueryString.setParam(url, 'externalId', dataDrillDown.ExternalId);

                if (dataDrillDown.IsConvertAll) {
                    url = QueryString.setParam(url, 'BaseCurrency', dataDrillDown.BaseCurrency);
                }

                const popH = Math.min($(window).height() - 100, 650), popW = 920;
                const popupOption = { id: 'betlist-popup', width: popW + 50, height: popH + 50, title: Site.getSingleResource('CustomerBetList') };
                Popup.openPopupWithIframe(url, popupOption);
                window.logOpenBetlistEvent && window.logOpenBetlistEvent();
            },

            resizeGrid: function () {
                const reportGrid = $('#ReportGrid');
                jqGridAdditional.updateGridHeight();
                jqGridAdditional.updateGridWidth(reportGrid);
            }
        };

        return _me;
    });