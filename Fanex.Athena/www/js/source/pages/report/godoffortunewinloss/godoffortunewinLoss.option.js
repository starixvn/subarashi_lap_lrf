define(
    ['jquery', 'common/querystring', 'common/site', 'lib/jqgrid/jquery.jqgrid.additional', 'lib/linq'],
    function ($, QueryString, Site, jqGridAdditional) {
        'use strict';

        const _me =
        {
            isDisableBetList: false,
            licenseeId: 0,
            pageSize: 50,
            nonePagingSize: 2000,
            rowNum: 50,
            rowList: [50, 100, 200, 300, 400, 500, 1000, 2000],
            totalColspan: [2, 2, 3],

            //level 0,1,2
            urlData: 'GodOfFortuneWinLossReport/Index',
            urlExcelData: 'GodOfFortuneWinLossReport/Index',

            gridOption:
            {
                datatype: 'local',
                colNames: [],
                colModel: [],
                data: [],
                height: '100%',
                autowidth: false,
                forceFit: false,
                shrinkToFit: true,
                loadtext: '',
                loadui: 'disable',
                loadonce: true,
                footerrow: true,
                userDataOnFooter: true,
                userData: [],
                grouping: true,
                viewrecords: true,
                gridview: true,
                rownumbers: true
            },
        };

        const setDrillDownLink = function (level, currencyId, custId, datetime, currencyName, cellvalue) {
            return '<a class="drilldown" href="javascript:;" onclick="return godoffortunewinlossDrilldown(' + level + ',' +
                currencyId + ',' + custId + ',\'' + datetime + '\',\'' + currencyName + '\');">' + cellvalue + '</a>';
        };

        const currencyFormatter = function (cellvalue, options, rowObject) {
            const level = Number(_me.licenseeId) === 1 ? 1 : 2;
            return setDrillDownLink(level, rowObject.currencyId, 0, rowObject.date, rowObject.currencyName, cellvalue);
        };

        const systemIdFormatter = function (cellvalue, options, rowObject) {
            return setDrillDownLink(2, rowObject.currencyId, rowObject.customerId, rowObject.date, rowObject.currencyName, cellvalue);
        };

        const betlistLink = function (cellvalue, options, rowObject) {
            const param =
            {
                DrillDownFromDate: rowObject.date,
                DrillDownToDate: rowObject.date,
                DrillDownCurrencyId: rowObject.currencyId,
                DrillDownCurrencyName: rowObject.currencyName,
                CustomerId: rowObject.customerId,
                ExternalId: rowObject.externalId,
                SystemId: rowObject.systemId
            };

            return '<a class="bet-list-link" href="javascript:;" data-drill-down=\'' + JSON.stringify(param) + '\'>' + cellvalue + '</a>';
        };

        //#region Columns

        const indexColumn =
        {
            name: 'index',
            index: 'index',
            resizable: false,
            width: 45,
            align: 'center',
            valign: 'middle',
            sortable: false
        };

        const dateColumn =
        {
            name: 'date',
            index: 'date',
            resizable: false,
            width: 85,
            align: 'center',
            valign: 'middle',
            sortable: true,
            formatter: 'date',
            formatoptions:
            {
                newformat: 'm/d/Y'
            }
        };

        const externalIdColumn =
        {
            name: 'externalId',
            index: 'externalId',
            resizable: false,
            width: 120,
            align: 'left',
            sortable: true
        };

        const systemIdColumn =
        {
            name: 'systemId',
            index: 'systemId',
            resizable: false,
            width: 150,
            align: 'left',
            sortable: true
        };

        const currencyColumn =
        {
            name: 'currencyName',
            index: 'currencyName',
            width: 65,
            align: 'center',
            sortable: true,
            resizable: false,
            formatter: currencyFormatter
        };

        const turnoverColumn =
        {
            name: 'turnOver',
            index: 'turnOver',
            width: 120,
            align: 'right',
            sortable: true,
            resizable: false,
            formatter: jqGridAdditional.formatDecimal
        };

        const discountValueColumn =
        {
            name: 'discount',
            index: 'discount',
            width: 80,
            align: 'right',
            sortable: true,
            resizable: false,
            formatter: jqGridAdditional.formatDecimal
        };

        const totalTransColumn =
        {
            name: 'totalTransaction',
            index: 'totalTransaction',
            width: 80,
            align: 'right',
            sortable: true,
            resizable: false,
            formatter: 'integer',
            frozen: true,
            formatoptions:
            {
                thousandsSeparator: ','
            }
        };

        const customerWlColumn =
        {
            name: 'customerWinLoss',
            index: 'customerWinLoss',
            width: 120,
            align: 'right',
            sortable: true,
            resizable: false,
            formatter: jqGridAdditional.formatDecimal
        };

        const licenseeWlColumn =
        {
            name: 'licenseeWinLoss',
            index: 'licenseeWinLoss',
            width: 120,
            align: 'right',
            sortable: true,
            resizable: false,
            hidden: false,
            title: true,
            formatter: jqGridAdditional.formatLicenseeWl
        };

        const currencyIdColumn =
        {
            name: 'currencyId',
            index: 'currencyId',
            width: 2,
            align: 'center',
            sortable: true,
            resizable: false,
            hidden: true
        };

        const customerIdColumn =
        {
            name: 'customerId',
            index: 'customerId',
            width: 2,
            align: 'center',
            sortable: true,
            resizable: false,
            hidden: true
        };

        //#endregion

        const colNameList = [
            '#',
            'Date',
            'ExternalId',
            'SystemId',
            'Currency',
            'Turnover',
            'DiscountValue',
            'TotalTransaction',
            'CustomerW_L',
            'LicenseeW_L',
            'CurrencyId',
            'CustomerId'];

        const colModelList = [indexColumn, dateColumn, externalIdColumn, systemIdColumn, currencyColumn, turnoverColumn, discountValueColumn,
            totalTransColumn, customerWlColumn, licenseeWlColumn, currencyIdColumn, customerIdColumn];

        _me.getColName = function () {
            // Column Customer Wl
            const temp = Site.clone(colNameList);
            temp[_me.customerWlIndex] = 'CustomerW_L';
            return Site.getResources(temp);
        };

        _me.getColModel = function (level, reportBy) {
            const levelNumber = Number(level);

            // Column hidden by level
            currencyColumn.formatter = levelNumber === 0 ? currencyFormatter : null;
            systemIdColumn.formatter = levelNumber === 1 ? systemIdFormatter : null;

            dateColumn.hidden = levelNumber > 0;
            externalIdColumn.hidden = levelNumber < 2;
            systemIdColumn.hidden = levelNumber === 0;

            if (levelNumber === 2) {
                externalIdColumn.formatter = betlistLink;
                systemIdColumn.formatter = betlistLink;
            }

            dateColumn.formatoptions = { newformat: Number(reportBy) === 2 ? 'm/Y' : 'm/d/Y' };

            const temp = Site.clone(colModelList);

            return temp;
        };

        _me.getGridOption = function (level, reportBy) {
            _me.gridOption.colNames = _me.getColName();
            _me.gridOption.colModel = _me.getColModel(level, reportBy);
            return Site.clone(_me.gridOption);
        };

        _me.getTotalColModel = function (level) {
            const colModel = _me.getColModel(level, -1);
            // Not show drill down link on total link
            const curCol = Enumerable.From(colModel).First(function (item) {
                return item.name === 'currencyName';
            });

            curCol.formatter = null;
            return colModel;
        };

        return _me;
    });