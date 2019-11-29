import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { renderHeader, renderDataSection } from '../lib/gridUtils';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { Table } from '@9softstudio/react-grid';
import ReportTitle from '@jsroot/components/ReportTitle';
import LangHelper from '@jsroot/lib/langHelper';

const DataGrid = (props) => {
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const { getData } = props;
        const param = { ...props.requestParam };
        getData(param);
    }, [props.requestParam])

    const { gridData } = props;
    const { dataList } = gridData;
    if (!dataList) {
        return null;
    }

    if (!dataList.length) {
        return <NoDataTitle />;
    }

    const { pagingOption, requestParam } = props;
    const startIndex = (pagingOption.PageIndex - 1) * pagingOption.PageSize + 1;

    const reportTitle = `${LangHelper.getSingleResource('BettingTicketCenter')}, ${requestParam.selectedDate}`;

    return (
        <>
            <ReportTitle content={reportTitle} />
            <Table minWidth={650}
                autoWidth={true}
                autoHeight={true}
                header={renderHeader()}
                body={renderDataSection(dataList, startIndex)}
                containerPadding={30}
                isPaging={true}
                pageOption={pagingOption}
                onPaging={(pageIndex) => props.setRequestParam({ ...requestParam, pageIndex })} />
        </>
    );
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam, getData } = ActionCreators;
    return bindActionCreators({ setRequestParam, getData }, dispatch);
};

function mapStateToProps(state) {
    const { gridData, requestParam, pagingOption } = state;
    return Object.assign({}, { gridData, requestParam, pagingOption });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);