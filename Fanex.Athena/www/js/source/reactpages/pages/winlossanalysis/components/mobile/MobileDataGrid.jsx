import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions/index.js'
import { Table } from '@9softstudio/react-grid';
import { renderHeader, renderDataSection, renderFooter } from '../../common/gridUtils.js';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import ReportTitle from '@jsroot/components/ReportTitle';
import { BreakdownByMode, DefaultPagingOption, GroupByMode, SortOrder } from '../../common/constants.js';
import Service from '../../common/Service.js'; 
import ExcelPopUp from '../ExcelPopUp.jsx';

export const MobileDataGrid = (props) => {
    const { data, sumTotal, totalRow } = props.reportData;
    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }

    const { requestParam } = props;
    const renderOption = {
        isShowBAField: Service.isContainBAProduct(props.selectedProduct),
        isGroupByPlayerMode: requestParam.GroupMode == GroupByMode.Player,
        isBreakDownPlayerMode: requestParam.BreakdownMode == BreakdownByMode.Player
    }

    const header = useMemo(() => renderHeader(renderOption), [requestParam])
    const body = useMemo(() => renderDataSection(data, renderOption), [data])
    const footer = useMemo(() => renderFooter(sumTotal, renderOption), [sumTotal])

    var currenPagingOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: totalRow,
        PageList: DefaultPagingOption.PageList
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

    const reportTitle = (           
        <>
            <span className='flex-auto'>{props.reportTitle}</span>
            <ExcelPopUp />
        </>
    )

    return (
        <div className="mobile-betlist-container betlist-container result-content" ref={ref}>
            <ReportTitle content={reportTitle} />
            <Table key='betlist-mobile-table'
                autoWidth={true}
                autoHeight={false}               
                header={header}
                body={bodyWrapper}
                footer={footer}
                isPaging={true}
                pageOption={pageOption}
                shouldResetScrollPosition={reloadReport}
                bodyHeight="100%"
                containerPadding={2}
                isIncludeScrollWidth={false}
                onSort= {onSort} />
            <RefPager ref={pagerRef} onPaging={onPaging} pageOption={pageOption} isShowPagingInfo={isShowPagingInfo}/>          
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileDataGrid);