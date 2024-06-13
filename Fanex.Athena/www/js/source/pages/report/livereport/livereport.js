define(
    ['jquery', 'common/querystring', 'common/site', 'components/pluginhelper/daterangepicker', 'components/pluginhelper/monthpicker', 'components/pluginhelper/multiselect.nlevel', './helper'],
    function ($, QueryString, Site, DatePicker, MonthPicker, MultiSelectNLevel, Helper) {
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
    }
);