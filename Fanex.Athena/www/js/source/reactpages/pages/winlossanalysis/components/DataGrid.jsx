import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index.js'
// import { Breadcrumb } from '@9softstudio/react-breadcrumb'
import { Table } from '@9softstudio/react-grid';
import { renderHeader, renderDataSection, renderFooter } from '../common/gridUtils';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import ReportTitle from '@jsroot/components/ReportTitle';
import { BreakdownByMode, DefaultPagingOption, GroupByMode, SortOrder } from '../common/constants.js';
import Service from '../common/Service'; 
import ExcelPopUp from './ExcelPopUp.jsx';

export const DataGrid = (props) => {
    const { data, sumTotal, totalRow } = props.reportData;
    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }

    const {requestParam } = props;
    const renderOption = {
        isShowBAField: Service.isContainBAProduct(props.selectedProduct),
        isGroupByPlayerMode: requestParam.GroupMode == GroupByMode.Player,
        isBreakDownPlayerMode: requestParam.BreakdownMode == BreakdownByMode.Player
    }

    const [pagingOption, setPagingOption] = useState(DefaultPagingOption);
    const header = useMemo(() => renderHeader(renderOption), [requestParam])
    const body = useMemo(() => renderDataSection(data, renderOption), [data])
    const footer = useMemo(() => renderFooter(sumTotal, renderOption), [sumTotal])

    var currenPagingOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: totalRow,
        PageList: pagingOption.PageList
    };

    const submitRequest = (params) => {
        props.setRequestParam(params);
        props.toggleLoader(true);
        props.getReportData(params);
    }

    const onSort = (sortBy, sortOrder) => {
        const requestSortOrder = sortOrder == "asc" ? SortOrder.ASC : SortOrder.DESC
        const params = { ...requestParam, SortBy: sortBy, SortOrder: requestSortOrder};
        submitRequest(params);
    }

    const onPaging = (pageIndex, pageSize) =>{
        const params = { ...requestParam, PageSize: pageSize, PageIndex: pageIndex };
        submitRequest(params);
    }

    const exportExcel = (event) => {
        event.preventDefault();
        const params = { ...requestParam, PageSize: 0, PageIndex: 0};
        props.toggleLoader(true);
        Service.getFile(params);
        props.toggleLoader(false);
    }

    const reportTitle = (           
        <>
            <span className='flex-auto'>{props.reportTitle}</span>
            <ExcelPopUp />
        </>
    )


    return (
        <div className='result-content'>
        <ReportTitle content={reportTitle} />
        <Table key={`table-winloss-ananlysis-${requestParam.SubmitTime}`} minWidth={650}
            autoWidth={true}
            autoHeight={true}
            header={header}
            body={body}
            footer={footer}
            containerPadding={30}
            onSort= {onSort}
            isPaging={true}
            pageOption={currenPagingOption}
            shouldResetScrollPosition={props.reloadReport}
            onPaging={onPaging} />
    </div>

    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, pagingOption, reportData, reportTitle, reloadReport, isGroupInOriginalCurrency, selectedProduct } = state;
    return Object.assign({}, { requestParam, pagingOption, reportData, reportTitle, reloadReport, isGroupInOriginalCurrency, selectedProduct });
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);