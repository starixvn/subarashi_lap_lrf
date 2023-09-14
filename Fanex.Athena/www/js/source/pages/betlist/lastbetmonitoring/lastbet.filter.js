'use strict';
define(
    ['jquery', 'common/site', './lastbet.grid', 'lib/jquery.multiselect', 'extensions/jquery.extension'],
    function ($, Site, LastBetGrid) {
        const _me = {};

        let defaultBasedCurrency ="";
        let _highLightSubmitIntervalId = 0;
         
        let _currentMatchList = [];
        let _currentLeagueList = [];
        let _currentSportList = [];

        const SPECIAL_LEVEL_LENGTH = 11;
        const ALL = "All";

        const DataType = {
            NUMBER: 'number',
            STRING: 'string'
        };

        const Selector = {
            League: '#league',
            Match: '#match'
        };

        const _paramName = {
            SportType: 'SportTypeList',
            League: 'LeagueList',
            CustomerClass: 'CustomerClass',
            MatchId: "MatchId"
        }

        const getDefaultLeagueOpts = () => {
            return {
                minWidth: 200,
                maxHeight: 400,
                shadow: true,
                showHeader: true,
                isCheckAll: true,
                showFooter: false,
                disabled: true,
                isUsedCustomCheckAllText: true,
                customCheckAllText: Site.getSingleResource('All'),
                showSearchBox: true,
                checkAllText: Site.getSingleResource('All'),
                noneSelectedText: Site.getSingleResource('SelectOptions'), // Text show on Multiselect when it has no selected item
                selectedText: Site.getSingleResource('SelectedItemCount'), // Text show when item was selected
                listData: [],
                onCheck: handleLeagueCheck
            }
        }

        const genDefaultList = (prefixIdText) => {
            return [{
                Id: `${prefixIdText}-0`,
                Value: 0,
                Text: '',
                Checked: true,
                Enable: true,
                Css: '',
                CssClass: ''
            }]
        }

        const handleSportCheck = () => {
            const mixParlaySportId = 999;
            const $matchDropdown = $(Selector.Match);

            let selectedSports = $('#sport').multiSelect('getCheckedItems');

            const htmlAllOption = '<option value="0">' + Site.getSingleResource('All') + '</option>';
            $matchDropdown.html(htmlAllOption);

            const canRequest = selectedSports.length === 1 && selectedSports[0] != mixParlaySportId;
            if (canRequest) {
                let sportId = selectedSports[0];
                $.ajax({
                    url: Site.resolveClientUrl('api/LastBetMonitoringBetList/GetRunningMatchList'),
                    data: 'sportid=' + sportId,
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    beforeSend: function () {
                        Site.blockUI();
                    },
                    complete: function () {
                        Site.unBlockUI();
                    },
                    success: function (data) {
                        _currentMatchList = data.MatchList;
                        _currentLeagueList = data.LeagueList;

                        let leagueList = [];
                        if (data.LeagueList.length > 0) {
                            $(data.LeagueList).each(function (i, e) {
                                leagueList.push({
                                    Id: 'league-' + i,
                                    Value: e.LeagueId,
                                    Text: e.LeagueName,
                                    Checked: true,
                                    Enable: true,
                                    Css: '',
                                    CssClass: ''
                                })
                            });

                            let opts = {
                                disabled: false,
                                listData: leagueList
                            }
                            opts = $.extend({}, getDefaultLeagueOpts(), opts);
                            $(Selector.League).multiSelect('updateItems', opts);
                        }
                        else {
                            _me.initLeague();
                        }
                    }
                });
            }
            else {
                _me.initLeague();
            }
            $matchDropdown.selectList('update', { isDisabled: true });
            setSportFilterParam();
            setLeagueFilterParam();
            LastBetGrid.updateParam(DataType.NUMBER, 'MatchId', $matchDropdown.val());
        }

        const handleLeagueCheck = () => {
            let selectedLeagues = $('#league').multiSelect('getCheckedItems');
            setLeagueFilterParam();

            const $matchDropdown = $(Selector.Match);
            $matchDropdown.html('<option value="0">' + Site.getSingleResource('All') + '</option>');

            const isShowOnlyOneLeague = selectedLeagues.length === 1 && selectedLeagues[0] != 0;
            let canShowMatch = isShowOnlyOneLeague;
            if (isShowOnlyOneLeague) {
                const leagueId = selectedLeagues[0];
                const filteredLeague = _currentLeagueList.filter(function (item) { return item.LeagueId == leagueId; });
                const leagueItem = filteredLeague.length ? filteredLeague[0] : null;

                canShowMatch = leagueItem && Site.asBool(leagueItem.IsOutRight) === false;
                if (canShowMatch) {
                    const matchList = _currentMatchList.filter(function (item) { return item.LeagueId == leagueId; });

                    let htmlOption = '';
                    $(matchList).each(function (i, e) {
                        htmlOption += '<option value="' + e.MatchId + '">' + e.MatchName + '</option>';
                    });

                    $matchDropdown.append(htmlOption);
                }
            }

            $matchDropdown.selectList('disabled', !isShowOnlyOneLeague && !canShowMatch);
            $matchDropdown.selectList('update', { isDisabled: !isShowOnlyOneLeague && !canShowMatch });
            LastBetGrid.updateParam(DataType.NUMBER, 'MatchId', $matchDropdown.val());
        }

        const setSportFilterParam = () => {
            let selectedSports = $('#sport').multiSelect('getCheckedItems');
            if (selectedSports.length == _currentSportList.length)
            {
                LastBetGrid.updateParam(DataType.STRING, 'SportIds',ALL);
            }
            else{
                let sportIds = selectedSports.length > 0 ? selectedSports.join(',') : '';
                LastBetGrid.updateParam(DataType.STRING, 'SportIds', sportIds);
            }
        }

        const setLeagueFilterParam = () => {
            let selectedSports = $('#league').multiSelect('getCheckedItems');
            if (selectedSports.length == _currentLeagueList.length)
            {
                LastBetGrid.updateParam(DataType.STRING, 'LeagueList',ALL);
            }
            else{
                let leagueIds = selectedSports.length > 0 ? selectedSports.join(',') : '';
                LastBetGrid.updateParam(DataType.STRING, 'LeagueList', leagueIds);
            }
        }

        _me.initSports = function () {
            const sportList = [];
            $('#sport option').each(function (i, e) {
                sportList.push({
                    Id: 'sport-' + i,
                    Value: $(e).val(),
                    Text: $(e).text(),
                    Checked: true,
                    Enable: true,
                    Css: '',
                    CssClass: ''
                });
            });

            _currentSportList = sportList;

            $('#sport').html('');
            $('#sport').multiSelect({
                minWidth: 100,
                maxHeight: 400,
                shadow: true,
                showSearchBox: true,
                showHeader: true,
                isCheckAll: true,
                showFooter: false,
                checkAllText: Site.getSingleResource('All'),
                noneSelectedText: Site.getSingleResource('SelectOptions'), // Text show on Multiselect when it has no selected item
                selectedText: Site.getSingleResource('SelectedItemCount'), // Text show when item was selected
                listData: sportList,
                onCheck: handleSportCheck
            });
        }

        _me.initLeague = function () {
            const leagueList = genDefaultList('league');
            let opts = $.extend({}, getDefaultLeagueOpts(), { listData: leagueList });
            _me.changeFilterParam(DataType.STRING, _paramName.League, 'All')
            $(Selector.League).multiSelect(opts);
        };

        _me.initMatch = function () {
            $(Selector.Match).change(function () {
                _me.changeFilterParam(DataType.NUMBER, 'MatchId', $(this).val());
            });
        };

        _me.initBetType = function () {
            $('#bet-type').change(function () {
                _me.changeFilterParam(DataType.STRING, 'BetType', $(this).val());
            });
        };

        _me.initLiveStatus = function () {
            $('#live-status').change(function () {
                _me.changeFilterParam(DataType.STRING, 'LiveStatus', $(this).val());
            });
        };

        _me.initOddsType = function () {
            $('#odds-type').change(function () {
                _me.changeFilterParam(DataType.STRING, 'OddsType', $(this).val());
            });
        };

        _me.initSpecialLevel = function () {
            const specialList = [];
            for (let i = 0; i <= 10; i++) {
                specialList.push({
                    Id: 'special-option-' + i,
                    Value: i.toString(),
                    Text: i === 0 ? Site.getSingleResource('SelectOptions') : i.toString(),
                    Checked: true,
                    Enable: true,
                    Css: '',
                    CssClass: ''
                });
            }

            $('#special-level').multiSelect({
                minWidth: 130,
                maxHeight: 400,
                shadow: true,
                showHeader: true,
                isCheckAll: true,
                showFooter: false,
                checkAllText: Site.getSingleResource('All'),
                noneSelectedText: Site.getSingleResource('SelectOptions'), // Text show on Multiselect when it has no selected item
                selectedText: Site.getSingleResource('SelectedItemCount'), // Text show when item was selected
                listData: specialList,
                onCheck: function () {
                    let selectedLevel = $('#special-level').multiSelect('getCheckedItems');
                    selectedLevel = selectedLevel.length === SPECIAL_LEVEL_LENGTH ? '' : selectedLevel.join(',');

                    _me.changeFilterParam(DataType.STRING, 'Level', selectedLevel);
                }
            });
        };

        _me.initCurrency = function () {
            const currencyList = [];
            $('#currency option').each(function (i, e) {
                currencyList.push({
                    Id: 'currency-' + i,
                    Value: $(e).val(),
                    Text: $(e).text(),
                    Checked: true,
                    Enable: true,
                    Css: '',
                    CssClass: ''
                });
            });

            const currencyCount = currencyList.length;
            $('#currency').html('');
            $('#currency').multiSelect({
                minWidth: 100,
                maxHeight: 400,
                shadow: true,
                showHeader: true,
                isCheckAll: true,
                showFooter: false,
                checkAllText: Site.getSingleResource('All'),
                noneSelectedText: Site.getSingleResource('SelectOptions'), // Text show on Multiselect when it has no selected item
                selectedText: Site.getSingleResource('SelectedItemCount'), // Text show when item was selected
                listData: currencyList,
                onCheck: function () {
                    let selectedCurrency = $('#currency').multiSelect('getCheckedItems');
                    selectedCurrency = currencyCount === selectedCurrency.length ? '' : selectedCurrency.join(',');
                    _me.changeFilterParam(DataType.STRING, 'Currency', selectedCurrency);

                    // Update based currency
                    const selectedCurrencyText = $('#currency').multiSelect('getCheckedItemsByText');
                    const baseCurrencyObj = $('#BaseCurrency');
                    const noConvertOption = $('option[value=""]', baseCurrencyObj);

                    if (selectedCurrencyText.length > 1) {
                        noConvertOption.remove();
                        baseCurrencyObj.val(defaultBasedCurrency);
                    }
                    else if (selectedCurrencyText.length === 1) {
                        const currencyName = selectedCurrencyText[0];
                        if (Site.isBaseCurrency(currencyName)) {
                            noConvertOption.remove();
                            baseCurrencyObj.val(currencyName.toLowerCase());
                        }
                        else {
                            if (noConvertOption.length === 0) {
                                $('<option value="">' + currencyName + '</option>').appendTo(baseCurrencyObj);
                            } else {
                                $('option[value=""]', baseCurrencyObj).text(currencyName);
                            }
                            baseCurrencyObj.val('');
                        }
                    }
                    baseCurrencyObj.selectList('update');
                    LastBetGrid.updateParam(DataType.STRING, 'BasedCurrency', baseCurrencyObj.val());
                }
            });
        };

        _me.initTimeZone = function () {
            $('#time-zone').change(function () {
                _me.changeFilterParam(DataType.NUMBER, 'TimeZone', $(this).val());
            });
        };

        _me.initBasedCurrency = function () {
            defaultBasedCurrency = $('#BaseCurrency').val();
            $('#BaseCurrency').change(function () {
                _me.changeFilterParam(DataType.STRING, 'BasedCurrency', $(this).val());
            });
        };

        _me.initStake = function () {
            const maxStake = LastBetGrid.getMaxStake();
            $('#stake-from').numbericTextBox(0, maxStake);
            $('#stake-to').numbericTextBox(0, maxStake);
            $('#stake-from, #stake-to').keyup(function () {
                _me.setHighlightSubmit();
            });

            function changeHandler(paramName, stake, defaultValue) {
                let newStake = stake.replace(/,/g, '');
                newStake = newStake === '' ? defaultValue : parseInt(newStake, 10);
                _me.changeFilterParam(DataType.NUMBER, paramName, newStake);
            }

            $('#stake-from').change(function () {
                changeHandler('StakeFrom', $(this).val(), 0);
            });

            $('#stake-to').change(function () {
                changeHandler('StakeTo', $(this).val(), maxStake);
            });
        };

        _me.initPageSizeControl = function () {
            $('#pagesize a.label').click(function () {
                const $this = $(this);
                if ($this.hasClass('active')) {
                    return;
                }

                $('#pagesize a.label').removeClass('active');
                $this.addClass('active');

                _me.changeFilterParam(DataType.NUMBER, 'PageSize', $this.text());
            });
        };

        _me.initFreezeButton = function () {
            $('#FreezeButton').click(function () {
                const $this = $(this);
                const currentStatus = Number($this.data('status'));
                const newStatus = currentStatus === 1 ? 0 : 1;
                const newValue = newStatus ? Site.getSingleResource('Freeze') : Site.getSingleResource('Unfreeze');
                if (newStatus) {
                    LastBetGrid.startMonitor();
                }
                else {
                    LastBetGrid.stopMonitor();
                }

                $this.text(newValue);
                $this.data('status', newStatus);
            });
        };

        _me.setHighlightSubmit = function () {
            clearInterval(_highLightSubmitIntervalId);
            _highLightSubmitIntervalId = setInterval(function () {
                $('#SubmitButton').addClass('btn-alert');
                setTimeout(function () {
                    $('#SubmitButton').removeClass('btn-alert');
                }, 500);
            }, 1000);
        };
        _me.initSubmit = function () {
            $('#SubmitButton').click(function () {
                clearInterval(_highLightSubmitIntervalId);
                $('#SubmitButton').removeClass('btn-alert');
                const freeStatus = $('#FreezeButton').data('status');
                LastBetGrid.Submit(freeStatus);
            });
        };
        _me.initColumns = function () {
            const columns = [];

            $.each(LastBetGrid.columns, function (i, e) {
                columns.push({
                    Id: 'column-' + i,
                    Value: e.Name,
                    Text: Site.getSingleResource(e.Name),
                    Checked: e.IsShow === 1 ? true : false,
                    Enable: true,
                    Css: '',
                    CssClass: ''
                });
                if (e.IsShow === 0) {
                    $('td[data-name="' + e.Name + '"]').hide();
                }
                $('#se-column').append('<option value="' + e.Name + '">' + e.Name + ' </option>');
            });

            $('#se-column').multiSelect({
                minWidth: 200,
                maxHeight: 400,
                shadow: true,
                showHeader: true,
                isCheckAll: true,
                showFooter: false,
                checkAllText: Site.getSingleResource('All'),
                noneSelectedText: Site.getSingleResource('SelectOptions'),
                selectedText: Site.getSingleResource('SelectedItemCount'),
                listData: columns,
                onCheck: function () {
                    const selectedLevel = $('#se-column').multiSelect('getCheckedItems');
                    const isShowAll = selectedLevel.length === LastBetGrid.columns.length;
                    $.each(LastBetGrid.columns, function (index, item) {
                        const showItem = selectedLevel.indexOf(item.Name) > -1;
                        item.IsShow = isShowAll || showItem ? 1 : 0;
                        $('tr').find('[data-name="' + item.Name + '"]').toggle(isShowAll || showItem);
                    });
                }
            });
        };
        _me.initPlatForm = function () {
            const platformList = [];
            $('#PlatformType option').each(function (i, e) {
                platformList.push({
                    Id: 'platform-type-' + i,
                    Value: $(e).val(),
                    Text: $(e).text(),
                    Checked: true,
                    Enable: true,
                    Css: '',
                    CssClass: ''
                });
            });

            const platformCount = platformList.length;
            $('#PlatformType').html('');
            $('#PlatformType').multiSelect({
                minWidth: 130,
                maxHeight: 400,
                shadow: true,
                showHeader: true,
                isCheckAll: true,
                showFooter: false,
                checkAllText: Site.getSingleResource('All'),
                noneSelectedText: Site.getSingleResource('SelectOptions'), // Text show on Multiselect when it has no selected item
                selectedText: Site.getSingleResource('SelectedItemCount'), // Text show when item was selected
                listData: platformList,
                onCheck: function () {
                    let checkedItems = $('#PlatformType').multiSelect('getCheckedItems');
                    checkedItems = platformCount === checkedItems.length ? 'All' : checkedItems.join(',');

                    _me.changeFilterParam(DataType.STRING, 'BetFrom', checkedItems);
                }
            });
        };

        _me.initCustomerClass = function () {
            const customerClassList = [];
            $('#customer-class option').each(function (i, e) {
                customerClassList.push({
                    Id: 'customer-class-' + i,
                    Value: $(e).val(),
                    Text: $(e).text(),
                    Checked: true,
                    Enable: true,
                    Css: '',
                    CssClass: ''
                });
            });

            const count = customerClassList.length;
            $('#customer-class').html('');
            $('#customer-class').multiSelect({
                minWidth: 130,
                maxHeight: 400,
                shadow: true,
                showHeader: true,
                isCheckAll: true,
                showFooter: false,
                checkAllText: Site.getSingleResource('All'),
                noneSelectedText: Site.getSingleResource('SelectOptions'), // Text show on Multiselect when it has no selected item
                selectedText: Site.getSingleResource('SelectedItemCount'), // Text show when item was selected
                listData: customerClassList,
                onCheck: function () {
                    let checkedItems = $('#customer-class').multiSelect('getCheckedItems');
                    checkedItems = count === checkedItems.length ? ALL : checkedItems.join(',');

                    _me.changeFilterParam(DataType.STRING, 'CustomerClass', checkedItems);
                }
            });
        };

        _me.changeFilterParam = function (type, paramName, value) {
            _me.setHighlightSubmit();
            LastBetGrid.updateParam(type, paramName, value);
        };

        _me.initialize = function () {
            Site.initialize();
            Site.addUserGuide({
                resourceName: 'LastBetsMonitoring',
                title: Site.getSingleResource('LastBetsMonitoring')
            });
            Site.addFilterCollapseExpand();

            _me.initSports();
            _me.initLeague();
            _me.initMatch();
            _me.initBetType();
            _me.initLiveStatus();
            _me.initOddsType();
            _me.initSpecialLevel();
            _me.initCurrency();
            _me.initTimeZone();
            _me.initBasedCurrency();
            _me.initStake();
            _me.initPageSizeControl();
            _me.initFreezeButton();
            _me.initSubmit();
            _me.initPlatForm();
            _me.initColumns();
            _me.initCustomerClass();

            $(Selector.Match).selectList('disabled', true);
        };

        return _me;
    });