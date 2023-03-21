import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index.js'
// import { Breadcrumb } from '@9softstudio/react-breadcrumb'
import { Table } from '@9softstudio/react-grid';
import { renderHeader, renderDataSection, renderFooter } from '../common/lib/gridUtils';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import ReportTitle from '@jsroot/components/ReportTitle';

export const DataGrid = (props) => {

    useEffect(() => {
    }, []);

    const { data, sumTotal } = props.reportData;
    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }

    const { pagingOption, requestParam } = props;

    return (
        <div className='result-content'>
        <ReportTitle content={props.reportTitle} />
        <Table key={`table-winloss-ananlysis`} minWidth={650}
            autoWidth={true}
            autoHeight={true}
            header={renderHeader(requestParam)}
            body={renderDataSection(data, requestParam)}
            footer={renderFooter(sumTotal, requestParam)}
            containerPadding={30}
            // onSort={(sortBy, sortOrder) => props.setRequestParam({ ...requestParam, sortBy, sortOrder })}
            isPaging={true}
            pageOption={pagingOption}
            shouldResetScrollPosition={props.reloadReport}
            onPaging={(pageIndex, pageSize) => props.setRequestParam({ ...requestParam, pageSize, pageIndex })} />
    </div>

    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, pagingOption, reportData, reportTitle, reloadReport } = state;
    return Object.assign({}, { requestParam, pagingOption, reportData, reportTitle, reloadReport });
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);