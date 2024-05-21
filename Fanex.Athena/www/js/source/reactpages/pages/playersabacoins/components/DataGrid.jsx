import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators }  from '../actions';
import { Table } from '@9softstudio/react-grid';
import { renderHeader, renderDataSection, renderTotalSummaryDataSection } from '../lib/gridUtils';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import ReportTitle from '@jsroot/components/ReportTitle';
import { ApiUrl, DefaultPagingOption } from '../lib/constants';

export const DataGrid = (props) => {

    const { data, totalSummary, totalRows } = props.reportData;
    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }

    const { requestParam } = props;


    const _handePaging = (pageSize, pageIndex) => {

        props.toggleLoader(true);

        const newRequestParam = { 
            ...requestParam,
            PageIndex: pageIndex,
            PageSize: pageSize
        };

        props.setRequestParam(newRequestParam);
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
    }

    const _handeSort = (sortBy, sortOrder) => {

        props.toggleLoader(true);

        const newRequestParam = { 
            ...requestParam,
            SortBy: sortBy,
            SortOrder: sortOrder
        };

        props.setRequestParam(newRequestParam);
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
    }

    var bodyDataGrid = renderDataSection(data, requestParam.PageIndex, requestParam.PageSize);
    var footerDataGrid = renderTotalSummaryDataSection(totalSummary);

    var currenPagingOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: totalRows,
        PageList: DefaultPagingOption.PageList
    };

    return (
        <div className='result-content'>
        <ReportTitle content={props.reportTitle} />
        <Table key={`data-grid`} 
            minWidth={650}
            autoWidth={true}
            autoHeight={true}
            header={renderHeader()}
            body={bodyDataGrid}
            footer={footerDataGrid}
            containerPadding={30}
            onSort={(sortBy, sortOrder) => _handeSort(sortBy, sortOrder)}
            isPaging={true}
            pageOption={currenPagingOption}
            shouldResetScrollPosition={true}
            onPaging={(pageIndex, pageSize) => _handePaging(pageSize, pageIndex)} />
    </div>

    );
}

function mapStateToProps(state) {
    const { requestParam, reportData, reportTitle, reloadReport, selectedCurrency } = state;
    return Object.assign({}, { requestParam, reportData, reportTitle, reloadReport, selectedCurrency });
}

function mapDispatchToProps(dispatch) {
    const { getReportData, setRequestParam, toggleLoader } = ActionCreators;
    return bindActionCreators({ getReportData, setRequestParam, toggleLoader }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);