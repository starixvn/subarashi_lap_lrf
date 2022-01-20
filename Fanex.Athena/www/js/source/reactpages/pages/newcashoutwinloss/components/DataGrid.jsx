import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import { Table } from '@9softstudio/react-grid';
import { renderHeader, renderDataSection, renderFooter } from '../common/gridUtils';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import ReportTitle from '@jsroot/components/ReportTitle';
import { ApiUrl, ReportLevel, BreadcrumbText, DefaultPagingOption } from '../common/constants';
import Service from '../common/service';
import { Breadcrumb } from '@9softstudio/react-breadcrumb'

export const DataGrid = (props) => {
    const [pagingOption, setPagingOption] = useState(DefaultPagingOption);

    const breadcrumbItems = [{
        label: BreadcrumbText.main,
        value: ReportLevel.MAIN
    }, {
        label: BreadcrumbText.customer,
        value: ReportLevel.CUSTOMER
    }];

    useEffect(() => {

    }, []);

    const { data, totalRows } = props.reportData;
    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }

    const { requestParam } = props;

    
    const _handleDrilldown = (e, currency, currencyName, drilldownDate) => {
        e.preventDefault();

        const selectedDate = new Date(drilldownDate);
        const dateValue =  Service.getFormattedDate(selectedDate);

        const drilldownFromDate = requestParam.ReportBy == 1 ? drilldownDate : getDrilldownFromDate(selectedDate, requestParam.FromDate);
        const drilldownFromDateValue =  requestParam.ReportBy == 1 ? dateValue : Service.getFormattedDate(drilldownFromDate);

        const drilldownToDate = requestParam.ReportBy == 1 ? drilldownDate : getDrilldownToDate(selectedDate, requestParam.ToDate);
        const drilldownToDateValue =  requestParam.ReportBy == 1 ? dateValue : Service.getFormattedDate(drilldownToDate);

        const newRequestParam = {
            ...requestParam,
            CurrencyIdList : currency,
            DrillDownFromDate : drilldownFromDateValue,
            DrillDownToDate : drilldownToDateValue,
            DrillDownLevel: ReportLevel.CUSTOMER
        }

        const title = Service.getTitle(drilldownFromDateValue, drilldownToDateValue, currencyName, newRequestParam.BaseCurrencyName, newRequestParam.ProductCodeList, newRequestParam.Username);

        props.setReportTitle(title);
        props.setRequestParam(newRequestParam);
        props.toggleLoader(true);
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
    }

    const getDrilldownToDate = (selectedDate, toDate) => {
        var paramTodate = new Date(toDate);
        if(selectedDate.getFullYear() === paramTodate.getFullYear() && selectedDate.getMonth() === paramTodate.getMonth()) {
            return new Date(toDate);
        }
        else {
            return new Date(selectedDate.getFullYear(), selectedDate.getMonth() +1, 0);
        }        
    }

    const getDrilldownFromDate = (selectedDate, fromDate) => {
        var paramFromdate = new Date(fromDate);
        if(selectedDate.getFullYear() === paramFromdate.getFullYear() && selectedDate.getMonth() === paramFromdate.getMonth()) {
            return paramFromdate;
        }
        else {
            return selectedDate;
        }        
    }

    const drillDownData = (level) => {
        const currentLevel = requestParam.DrillDownLevel;

        if (currentLevel === level || level !== ReportLevel.MAIN) {
            return;
        }

        props.toggleLoader(true);
        const newRequestParam = { 
            ...requestParam,
            PageSize: 50,
            PageIndex: 1,
            CurrencyIdList: props.selectedCurrency,
            DrillDownLevel : level
        };

        const title = Service.getTitle(newRequestParam.FromDate, newRequestParam.ToDate, newRequestParam.CurrencyName, newRequestParam.BaseCurrencyName, newRequestParam.ProductCodeList, newRequestParam.Username);
        props.setReportTitle(title);
        props.setRequestParam(newRequestParam);     
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
    }

    const _handePaging = (pageSize, pageIndex, lastIndex) => {

        props.toggleLoader(true);

        const newRequestParam = { 
            ...requestParam,
            PageIndex: pageIndex,
            PageSize: pageSize
        };
        setPagingOption({
            ...pagingOption,
            PageIndex: pageIndex,
            PageSize: pageSize,
            LastIndex: lastIndex
        });

        props.setRequestParam(newRequestParam);
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);

    }

    const _handleSort = (sortBy, sortOrder) => {
        const newRequestParam = { 
            ...requestParam,
            SortBy: sortBy,
            SortOrder: sortOrder
        };

        props.toggleLoader(true);
        props.setRequestParam(newRequestParam)
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
    }

    var index = (requestParam.PageIndex - 1) * pagingOption.PageSize + 1;
    var bodyData = renderDataSection(data, requestParam.DrillDownLevel, _handleDrilldown, index);

    var currenPagingOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: totalRows,
        PageList: pagingOption.PageList
    };

    return (
        <div className='result-content'>
        <Breadcrumb items={breadcrumbItems} value={requestParam.DrillDownLevel} onChange={(item) => drillDownData(item.value)}/>
        <ReportTitle content={props.reportTitle} />
        <Table key={`table-${requestParam.DrillDownLevel}-${props.reloadReport}-${props.SortBy}-${props.SortOrder}-${props.PageIndex}`} minWidth={650}
            autoWidth={true}
            autoHeight={true}
            header={renderHeader(requestParam.DrillDownLevel)}
            body={bodyData}
            footer={renderFooter(props.reportData, requestParam.DrillDownLevel)}
            containerPadding={30}
            onSort={_handleSort}
            isPaging={requestParam.DrillDownLevel === ReportLevel.CUSTOMER}
            pageOption={currenPagingOption}
            shouldResetScrollPosition={true}
            onPaging={(pageIndex, pageSize) => _handePaging(pageSize, pageIndex, index)} />
    </div>

    );
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam, toggleLoader, getReportData, setReportTitle } = ActionCreators;
    return bindActionCreators({ setRequestParam, toggleLoader, getReportData, setReportTitle }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, reportData, reportTitle, reloadReport, selectedCurrency } = state;
    return Object.assign({}, { requestParam, reportData, reportTitle, reloadReport, selectedCurrency });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);