import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { renderHeader, renderDataSection } from '../lib/gridUtils';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { Table } from '@9softstudio/react-grid';
import ReportTitle from '@jsroot/components/ReportTitle';
import LangHelper from '@jsroot/lib/langHelper';
import SimplePagination from '@jsroot/components/SimplePagination';
import AppData from '@jsroot/lib/AppData';
import { ExchangeMode } from '../lib/constants';

const VoidDataGrid = (props) => {
    const [pagingOption, setPagingOption] = useState({pageIndex: 1, totalPage: 0});

    useEffect(() => {
        const { getData } = props;
        const param = { ...props.requestParam };
        getData(param);
    }, [props.requestParam])

    useEffect(() => {
        const { gridData, requestParam } = props;

        if(gridData && gridData.totalPage !== undefined){
            setPagingOption({ pageIndex: requestParam.pageIndex, totalPage: gridData.totalPage });
        }
    }, [props.gridData])

    const handleChangePaging = pageIndex => {
        setPagingOption({ ...pagingOption, pageIndex });
        props.setRequestParam({...props.requestParam, pageIndex});
    }

    const { dataList } = props.gridData;
    if (!dataList) {
        return null;
    }

    if (!dataList.length) {
        return <NoDataTitle />;
    }

    const { requestParam } = props;

    const timezone = AppData.timeZoneList.find(x => x.value === props.selectedTimeZone).label;
    const reportTitle = `${LangHelper.getSingleResource('BettingTicketCenter')}, ${timezone}, ${requestParam.selectedDate}`;

    const {pageIndex, totalPage} = pagingOption;

    return (
        <div>
            <ReportTitle content={reportTitle} />
            <Table minWidth={650}
                autoWidth={true}
                autoHeight={true}
                header={renderHeader()}
                body={renderDataSection(dataList, ExchangeMode.Void)}
                containerPadding={30} />
            {totalPage > 1 && <SimplePagination pageIndex={pageIndex} totalPage={totalPage} 
                onPageChanged={handleChangePaging} />}
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam, getData } = ActionCreators;
    return bindActionCreators({ setRequestParam, getData }, dispatch);
}

function mapStateToProps(state) {
    const { gridData, requestParam, selectedTimeZone } = state;
    return Object.assign({}, { gridData, requestParam, selectedTimeZone});
}

export default connect(mapStateToProps, mapDispatchToProps)(VoidDataGrid);