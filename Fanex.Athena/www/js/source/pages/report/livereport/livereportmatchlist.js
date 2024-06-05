define(
    ['jquery', 'common/querystring', 'common/site', './helper', 'helpers/sortableheader'],
    function ($, QueryString, Site, Helper, SortableHeader) {
        'use strict';

        const _selector = {
            SubmitButton: '#SubmitButton',
            ExportToExcel: '#ExportToExcel',
            Form: '#LiveReportMatchListForm',
            IsExportExcel: '#IsExportExcel',
            FromDate: '#FromDate',
            ToDate: '#ToDate',
            ProductCode: '#ProductCode',
            LiveIndicator: '#LiveIndicator',
            CurrencyName: '#CurrencyName',
            CurrencyId: '#CurrencyId',
            SubsidiaryList: '#SubsidiaryList',
            SubsidiarySearch: '#SubsidiarySearch',
            ProductCodeList: '#ProductCodeList',
            SortColumn: '#SortColumn',
            SortDirection: '#SortDirection',
            BaseCurrency: '#BaseCurrency',
            SportId: '#SportId',
        };

        function initialize() {
            Site.initialize();
            initEvent();
            SortableHeader.createSortingIcon(submitForm);
        }

        function submitForm() {
            let url = Site.resolveClientUrl('LiveReport/MatchListSort');
            url = getMatchListUrl(url);

            $.ajax({
                url: url,
                async: true,
                type: 'GET',
                cache: false,
                success: function (result) {
                    $('#header-content').html(result);
                    SortableHeader.createSortingIcon(submitForm);
                },
                beforeSend: function () {
                    Site.blockUI();
                },
                complete: function () {
                    Site.unBlockUI();
                }
            });

            return false;
        }

        function getMatchListUrl(url) {
            url = Site.setLicenseeOptionOriginalParam(url);
            url = QueryString.setParam(url, 'SportId', $(_selector.SportId).val());
            url = QueryString.setParam(url, 'ProductCode', $(_selector.ProductCode).val());
            url = QueryString.setParam(url, 'FromDate', $(_selector.FromDate).val());
            url = QueryString.setParam(url, 'ToDate', $(_selector.ToDate).val());
            url = QueryString.setParam(url, 'LiveIndicator', $(_selector.LiveIndicator).val());
            url = QueryString.setParam(url, 'ProductCodeList', $(_selector.ProductCodeList).val());
            url = QueryString.setParam(url, 'SortColumn', $(_selector.SortColumn).val());
            url = QueryString.setParam(url, 'SortDirection', $(_selector.SortDirection).val());
            url = QueryString.setParam(url, 'CurrencyId', $(_selector.CurrencyId).val());
            url = QueryString.setParam(url, 'SubsidiarySearch', $(_selector.SubsidiarySearch).val());
            url = QueryString.setParam(url, 'SubsidiaryList', $(_selector.SubsidiaryList).val());
            url = QueryString.setParam(url, 'CurrencyName', $(_selector.CurrencyName).attr('data-original'));
            url = QueryString.setParam(url, 'BaseCurrency', $(_selector.BaseCurrency).attr('data-original'));
            return url;
        }

        function initEvent() {
            $('body').on('click', '.match-detail-link', function () {
                viewMatchBetList(this);
            });

            $(_selector.SortColumn).val('');
            $(_selector.SortDirection).val('');

            $(_selector.ExportToExcel).click(function () {
                $(_selector.IsExportExcel).val(true);
                $(_selector.Form).submit();
                $(_selector.IsExportExcel).val(false);
            });
        }

        function viewMatchBetList(target) {
            let url = Site.resolveClientUrl('LiveReportBetList/Match');

            const currencyName = $(_selector.CurrencyName).attr('data-original');
            let data = $(target).attr('data-drill-down');
            data = $.parseJSON(data);
            url = Site.setLicenseeOptionOriginalParam(url);
            url = QueryString.setParam(url, 'FromDate', $(_selector.FromDate).val());
            url = QueryString.setParam(url, 'ToDate', $(_selector.ToDate).val());
            url = QueryString.setParam(url, 'CurrencyName', currencyName);
            url = QueryString.setParam(url, 'MatchId', data.MatchId);
            url = QueryString.setParam(url, 'HomeId', data.HomeId);
            url = QueryString.setParam(url, 'AwayId', data.AwayId);
            url = QueryString.setParam(url, 'BetType', data.BetType);
            url = QueryString.setParam(url, 'LiveIndicator', data.LiveIndicator);
            url = QueryString.setParam(url, 'SubsidiarySearch', $(_selector.SubsidiarySearch).val());
            url = QueryString.setParam(url, 'SubsidiaryList', $(_selector.SubsidiaryList).val());

            const productOptions = Helper.getMatchListProductOption($(_selector.SportId).val(), $(_selector.ProductCode).val());

            url = Site.setProductCodeListParam(url, productOptions);

            Site.blockUI();
            Site.redirect(url);
        }

        return {
            initialize: initialize
        };
    });