import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import { Table } from '@9softstudio/react-grid';
import { renderHeader, renderDataSection, renderFooter } from '../common/gridUtils';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { ApiUrl, ViewInLevel } from '../common/constants'
import ReportTitle from '@jsroot/components/ReportTitle';

export const DataGrid = (props) => {

    useEffect(() => {
    }, []);

    const { data } = props.reportData;
    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }

    const { requestParam } = props;

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

    const tableWidth = requestParam.ViewIn === ViewInLevel.DETAIL ? 2754 : undefined;

    return (
        <div className='result-content'>
        <ReportTitle content={props.reportTitle} />
        <Table key={`table-${requestParam.ViewIn}-${props.reloadReport}`}
            minWidth={tableWidth}
            width={tableWidth}
            autoHeight={true}
            header={renderHeader(requestParam.ViewIn)}
            body={renderDataSection(data, requestParam.ViewIn)}
            containerPadding={30}
            onSort={_handleSort}
            isPaging={false}
            shouldResetScrollPosition={props.reloadReport}
            onPaging={(pageIndex, pageSize) => props.setRequestParam({ ...requestParam, pageSize, pageIndex })}/>
    </div>

    );
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam, toggleLoader, getReportData, setReportTitle } = ActionCreators;
    return bindActionCreators({ setRequestParam, toggleLoader, getReportData, setReportTitle }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, pagingOption, reportData, reportTitle, reloadReport } = state;
    return Object.assign({}, { requestParam, pagingOption, reportData, reportTitle, reloadReport });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);