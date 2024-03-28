define(
    ['jquery', 'common/site', 'common/querystring', 'lib/jqgrid/jquery.jqgrid.additional', './betlist.option', 'moment', 'common/popup',
        'lib/jqgrid/jquery.jqGrid.en', 'lib/jqgrid/jquery.jqGrid.min'],
    function ($, Site, QueryString, jqGridAdditional, BetListOption, moment, Popup) {
        'use strict';
        const BETLIST_META_MODEL = '#BetListMetaModel';

        let _sortColumnName, _sortOrder;
        let _params, _url;
        let _isShowSumStake;
        let _onClientPaging = false;

        function _formatDateString(dateString) {
            return moment(new Date(dateString)).format('MM/DD/YYYY');
        }

        function _beforeShow() {
            Site.blockUI();
        }

        function _afterShow() {
            Site.unBlockUI();
        }

        function _openPopup(url, title, sporttype) {
            if (sporttype) {
                showResultPopUp(url, { width: 800, height: 450, title });
            } else {
                showDetailPopUp(url, { width: 900, height: Math.min($(window).height() - 50, 600), title })
            }
        }

        function _getBaseCurrency() {
            return getBaseCurrency();
        }

        function _getAccessToken() {
            return window.topSameOriginWindow.lrf && window.topSameOriginWindow.lrf.access_token;
        }

        function _getLanguage() {
            return $('#PageLanguage').val();
        }

        function showDetailPopUp(url, option) {
            option.id = 'betlist-popup-detail';
            Popup.openPopupWithIframe(url, option);
        }

        function showResultPopUp(url, option) {
            option.id = 'betlist-popup-result';
            Popup.openPopupWithIframe(url, option);
        }

        function getBaseCurrency() {
            const params = $.parseJSON($(BETLIST_META_MODEL).val());
            return params.BaseCurrency;
        }

        const _me = {
            getSortParams: function () {
                if (!_sortColumnName) {
                    return null;
                }

                return {
                    SortBy: _sortColumnName,
                    SortOrder: _sortOrder
                };
            },
            submiting: true,
            initialize: function () {
                Site.initialize();

                _isShowSumStake = $('#IsShowSumStake').val() === '1';

                _sortColumnName = _sortColumnName || $('#SortBy').val();
                _sortOrder = _sortOrder || $('#SortOrder').val();

                _me.registerBetListGlobalFunctions();
            },

            gridComplete: function (grid) {
                const $grid = $(grid);
                // add sort icon
                let sortCol = _sortColumnName === 'Winlost' ? 'WinLoss' : _sortColumnName;
                sortCol = _sortColumnName === 'nickname' ? 'ExternalId' : sortCol;
                sortCol = _sortColumnName === 'UserName' ? 'SystemId' : sortCol;
                if (sortCol && !_onClientPaging) {
                    jqGridAdditional.addSortableHeader($grid, sortCol, _sortOrder);
                }
                _onClientPaging = false;
                // Resize
                jqGridAdditional.gridComplete();
                // Remove unnecessary item
                if (_isShowSumStake) {
                    $('.ui-jqgrid-ftable td[aria-describedby=BetListGrid_Odds]').html(Site.getSingleResource('GrandTotal')).removeAttr('title');
                } else {
                    $('.ui-jqgrid-ftable td[aria-describedby=BetListGrid_Stake]').html(Site.getSingleResource('GrandTotal')).removeAttr('title');
                }

                $('#pager2').show();

                // fix cursor on non-sortable columns
                const cm = $grid[0].p.colModel;
                $.each($grid[0].grid.headers, function (index, value) {
                    const cmi = cm[index];
                    if (!cmi.sortable) {
                        $('.ui-jqgrid-sortable', value.el).css({ cursor: 'default' });
                    }
                });

                $('.ui-jqgrid-bdiv').css({ 'height': 'auto' });
                jqGridAdditional.updateGridHeight();
                Site.unBlockUI();
            },

            getGridOption: function () {
                const gridOption = $.extend(true, {}, BetListOption.gridOption);

                gridOption.onSortCol = function (index) {
                    if (window.disableBetListSorting) {
                        return 'stop';
                    }
                    Site.blockUI();
                    let newIndex = index;
                    newIndex = newIndex === 'WinLoss' ? 'Winlost' : newIndex;
                    newIndex = newIndex === 'ExternalId' ? 'nickname' : newIndex;
                    if (_sortColumnName === newIndex) {
                        _sortOrder = _sortOrder === 'asc' ? 'desc' : 'asc';
                    } else {
                        _sortOrder = 'desc';
                        _sortColumnName = newIndex;
                    }
                    if (window.CorrectScoreBetList || window.CancelledBetsBetList) {
                        $('#SortBy').val(_sortColumnName);
                        $('#SortOrder').val(_sortOrder);
                    }

                    if (window.serverPaging || $('#IsServerPaging').val() === '1') {
                        _me.loadDataPaging(_url);
                    }
                    else {
                        _me.loadData(_params, _url);
                    }

                    return 'stop';
                };

                // Specify the hidden column
                const hiddenColumnList = $('#HiddenColumnList').val();
                const hiddenColumnTokens = hiddenColumnList.split(',');
                const showSummary = $('#ShowSummary').val() === '0' ? false : hiddenColumnList.indexOf('licenseewl') < 0;

                $.each(hiddenColumnTokens, function (index, value) {
                    jqGridAdditional.hideColumn(BetListOption.columnModel, value);
                });
                if ($('#HasBetEffectiveColumn').val() !== '1') {
                    jqGridAdditional.hideColumn(BetListOption.columnModel, 'BetEffective');
                }
                if (Site.isFakeLicensee()) {
                    jqGridAdditional.hideColumn(BetListOption.columnModel, 'SystemId');
                }
                gridOption.colNames = BetListOption.columnNames;
                gridOption.colModel = BetListOption.columnModel;
                gridOption.footerrow = showSummary;
                const hasCustComm = $('#HasCustComm').val();
                if (hasCustComm === '1') {
                    gridOption.colNames = $.map(gridOption.colNames, function (val) {
                        if (val === 'WinLoss') {
                            return '@[WinLoss]/@[Comm]';
                        }
                        return val;
                    });
                }
                gridOption.colNames = Site.getResources(gridOption.colNames);

                gridOption.onPaging = function () {
                    _onClientPaging = true;
                };
                return gridOption;
            },

            loadData: function (params, url) {
                let jsonParam = params;
                if (typeof jsonParam === 'string') {
                    jsonParam = JSON.parse(jsonParam);
                }

                _params = jsonParam;
                _url = url;

                if (jsonParam && _sortColumnName) {
                    jsonParam.SortBy = _sortColumnName;
                    jsonParam.SortOrder = _sortOrder;
                }

                const paramString = typeof (jsonParam) === 'object' ? JSON.stringify(jsonParam) : jsonParam;

                $.ajax({
                    type: 'POST',
                    data: paramString,
                    contentType: 'application/json',
                    dataType: 'json',
                    cache: false,
                    url: url,
                    success: function (response) {
                        if (response !== null) {
                            _me.bindData(response);
                            _me.setLeagueTitle(response.LeagueName);
                        }
                    },
                    beforeSend: function (request) {
                        Site.tryIgnoreSharding(request);
                        Site.blockUI();
                    },
                    complete: function () {
                        Site.unBlockUI();
                    }
                });
            },

            loadDataPaging: function (url, params) {
                Site.blockUI();
                let newUrl = url;
                if (newUrl && params) {
                    newUrl = QueryString.setParams(newUrl, params);
                }

                _url = newUrl;

                if (newUrl && _sortColumnName) {
                    newUrl = QueryString.setParam(newUrl, 'IsServerPaging', true);
                    newUrl = QueryString.setParam(newUrl, 'SortBy', _sortColumnName);
                    newUrl = QueryString.setParam(newUrl, 'SortOrder', _sortOrder);
                }

                _me.submiting = true;

                const $grid = $('#BetListGrid');
                const gridOption = _me.getGridOption();
                const rows = Number($grid.getGridParam('rowNum')) || gridOption.rowNum;
                gridOption.url = newUrl;
                gridOption.rowNum = rows;
                gridOption.height = 0;
                gridOption.loadonce = false;
                gridOption.datatype = 'json';
                gridOption.gridComplete = function () {
                    const rowCount = $(this).getGridParam('records');
                    if (rowCount === 0) {
                        $('#pager2').hide();
                        jqGridAdditional.setNoInfo();
                        Site.unBlockUI();
                        return;
                    }

                    $('#gbox_BetListGrid').show();
                    _me.gridComplete(this);
                    if (_me.submiting) {
                        $('.ui-pg-selbox').val(rows);
                    }
                    _me.submiting = false;
                };

                // Show the grid
                $grid.jqGrid('GridUnload');
                $('#BetListGrid').jqGrid(gridOption); // must get the grid instance again
                $('#gbox_BetListGrid').hide();
            },

            bindData: function (response) {
                $('#BetListGrid').jqGrid('GridUnload');
                const $grid = $('#BetListGrid'); // must get the grid instance again

                if (response === null || response.Main.length === 0) {
                    jqGridAdditional.setNoInfo();
                    return;
                }

                const rawData = response.Main;
                const summary = response.Total;
                const sumWinLoss = jqGridAdditional.formatDecimal(summary.SumWinLoss);
                const sumLicenseeWl = jqGridAdditional.formatLicenseeWl(summary.SumLicenseeWl);
                const sumBetEffective = jqGridAdditional.formatDecimal(summary.SumBetEffective);
                const gridOption = _me.getGridOption();

                let rowNum = Number($grid.getGridParam('rowNum')) || gridOption.rowNum;
                if (rowNum < gridOption.rowList[0]) {
                    rowNum = gridOption.rowList[0];
                }
                // Show the grid
                gridOption.rowNum = rowNum;
                gridOption.data = rawData;
                gridOption.userData = { WinLoss: sumWinLoss, LicenseeWL: sumLicenseeWl, BetEffective: sumBetEffective };

                if (_isShowSumStake) {
                    gridOption.userData.Stake = jqGridAdditional.formatDecimal(summary.SumStake);
                    gridOption.userDataOnFooter = true;
                    gridOption.footerrow = true;
                }
                else if (response.IsShowTotal === undefined || response.IsShowTotal) {
                    gridOption.userDataOnFooter = true;
                }
                else {
                    gridOption.userDataOnFooter = false;
                    gridOption.footerrow = false;
                }
                gridOption.gridComplete = function () {
                    _me.gridComplete(this);
                };

                $grid.jqGrid(gridOption);
            },

            setLeagueTitle: function (leagueName) {
                const leagueNameText = leagueName === '' || leagueName === undefined ? Site.getSingleResource('BetList') : leagueName;
                $('.league-name-title').html(leagueNameText + ' - ');
            },

            ValidProducts: function () {
                let temp = true;
                if ($('#ProductList').find('input:checked').length === 0) {
                    temp = false;
                    const title = Site.getSingleResource('LrfNotification');
                    const dialogForm = '<div title="' + title + '"><p class="notification">' + Site.getSingleResource('AlertChooseProductMsg') + '</p></div>';
                    Popup.openPopup(dialogForm, { width: 350, height: 120, title: title, className: 'popup-notification' });
                }

                return temp;
            },

            ViewCasinoHandHistory: function (refNo) {
                let url = Site.resolveClientUrl('HandHistory/RNGCasino');
                const urlParam = $('#casino-hand-history-' + refNo).attr('url-param');

                url += urlParam;
                Site.redirect(url);
            },

            registerBetListGlobalFunctions: function () {

                window.openPopup = _openPopup;
                window.getResource = null;
                window.formatDateString = _formatDateString;
                window.beforeShow = _beforeShow;
                window.afterShow = _afterShow;
                window.getBaseCurrency = _getBaseCurrency;
                window.getAccessToken = _getAccessToken;
                window.getLanguage = _getLanguage;

                const betList = {
                    ViewCasinoHandHistory: _me.ViewCasinoHandHistory
                };
                window.BetList = betList;
            },

            resizeGrid: function () {
                const grid = $('#BetListGrid');
                jqGridAdditional.updateGridHeight();
                jqGridAdditional.updateGridWidth(grid);
            }
        };

        return _me;
    });