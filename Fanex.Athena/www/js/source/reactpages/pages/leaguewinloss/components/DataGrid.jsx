import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import { Breadcrumb } from '@9softstudio/react-breadcrumb'
import { Table } from '@9softstudio/react-grid';
import { renderHeader, renderDataSection } from '../common/gridUtils';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { BreadcrumbText, ReportLevel, ApiUrl } from '../common/constants'
import ReportTitle from '@jsroot/components/ReportTitle';

export const DataGrid = (props) => {
    let breadcrumbItems = [{
        label: BreadcrumbText.main,
        value: ReportLevel.MAIN
    }, {
        label: BreadcrumbText.match,
        value: ReportLevel.MATCH
    }, {
        label: BreadcrumbText.bettype,
        value: ReportLevel.BETTYPE
    }];

    useEffect(() => {
    }, []);

    const { data, total } = props.reportData;
    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }

    const { pagingOption, requestParam } = props;

    const drillDownData = (level) => {
        const currentLevel = requestParam.DrillDownLevel;

        if (currentLevel === level || level < ReportLevel.MAIN || level > ReportLevel.BETTYPE) {
            return;
        }

        props.toggleLoader(true);
        const newRequestParam = { 
            ...requestParam,
            DrillDownLevel : level
        };

        props.setRequestParam(newRequestParam);        
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
    }

    return (
        <div className='result-content'>
        <Breadcrumb items={breadcrumbItems} value={requestParam.DrillDownLevel} onChange={(item) => drillDownData(item.value)}/>
        <ReportTitle content={props.reportTitle} />
        <Table key={`table-${requestParam.DrillDownLevel}-${props.reloadReport}`} minWidth={650}
            autoWidth={true}
            autoHeight={true}
            header={renderHeader(requestParam.DrillDownLevel, requestParam.ShowBA)}
            body={renderDataSection(data, requestParam.DrillDownLevel, false,requestParam.ShowBA)}
            footer={renderDataSection([total], requestParam.DrillDownLevel, true, requestParam.ShowBA)}
            containerPadding={30}
            onSort={(sortBy, sortOrder) => props.setRequestParam({ ...requestParam, sortBy, sortOrder })}
            isPaging={true}
            pageOption={pagingOption}
            shouldResetScrollPosition={props.reloadReport}
            onPaging={(pageIndex, pageSize) => props.setRequestParam({ ...requestParam, pageSize, pageIndex })} />
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