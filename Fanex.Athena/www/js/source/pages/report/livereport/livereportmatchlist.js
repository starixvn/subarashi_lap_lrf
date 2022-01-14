define(['common/querystring', 'common/site', './helper', 'helpers/sortableheader'], function (QueryString, Site, Helper, SortableHeader) {
    'use strict';

    const EXCEL_FILENAME = 'LiveReport.xls';

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
        url = QueryString.setParam(url, 'SportId', $('#SportId').val());
        url = QueryString.setParam(url, 'ProductCode', $('#ProductCode').val());
        url = QueryString.setParam(url, 'FromDate', $('#FromDate').val());
        url = QueryString.setParam(url, 'ToDate', $('#ToDate').val());
        url = QueryString.setParam(url, 'LiveIndicator', $('#LiveIndicator').val());
        url = QueryString.setParam(url, 'ProductCodeList', $('#ProductCodeList').val());
        url = QueryString.setParam(url, 'SortColumn', $('#SortColumn').val());
        url = QueryString.setParam(url, 'SortDirection', $('#SortDirection').val());
        url = QueryString.setParam(url, 'CurrencyId', $('#CurrencyId').val());
        url = QueryString.setParam(url, 'CurrencyName', $('#CurrencyName').attr('data-original'));
        url = QueryString.setParam(url, 'BaseCurrency', $('#BaseCurrency').attr('data-original'));
        return url;
    }

    function initEvent() {
        $('body').on('click', '.match-detail-link', function () {
            viewMatchBetList(this);
        });

        $('#SortColumn').val('');
        $('#SortDirection').val('');

        $('#ExportToExcel').click(function () {
            $('#IsExportExcel').val(true);
            $('#LiveReportMatchListForm').submit();
            $('#IsExportExcel').val(false);
        });
    }

    function viewMatchBetList(target) {
        let url = Site.resolveClientUrl('LiveReportBetList/Match');

        const currencyName = $('#CurrencyName').attr('data-original');
        let data = $(target).attr('data-drill-down');
        data = $.parseJSON(data);
        url = Site.setLicenseeOptionOriginalParam(url);
        url = Site.setDateRangeOriginalParam(url);
        url = QueryString.setParam(url, 'CurrencyName', currencyName);
        url = QueryString.setParam(url, 'MatchId', data.MatchId);
        url = QueryString.setParam(url, 'HomeId', data.HomeId);
        url = QueryString.setParam(url, 'AwayId', data.AwayId);
        url = QueryString.setParam(url, 'BetType', data.BetType);
        url = QueryString.setParam(url, 'LiveIndicator', data.LiveIndicator);
        url = Helper.setSumParams(url, data);

        const productOptions = Helper.getMatchListProductOption($('#SportId').val(), $('#ProductCode').val());

        url = Site.setProductCodeListParam(url, productOptions);

        Site.blockUI();
        Site.redirect(url);
    }

    return {
        initialize: initialize
    };
});