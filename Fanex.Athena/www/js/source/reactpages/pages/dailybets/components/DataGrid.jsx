import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import { Table } from '@9softstudio/react-grid';
import { renderHeader, renderDataSection } from '../lib/gridUtils';

export const DataGrid = (props) => {
    const [data, setData] = useState(null);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const { getData, pagingOption, setPagingOption, toggleLoader } = props;
        const param = { ...props.requestParam };

        toggleLoader(true);
        getData(param).then(response => {
            const { dataList, total, totalRows } = response;
            setData({ dataList, total });

            const newPagingOption = { 
                ...pagingOption, 
                TotalItem: totalRows, 
                PageSize: param.pageSize, 
                PageIndex: param.pageIndex 
            }
            setPagingOption(newPagingOption);
            toggleLoader(false);
        })
    }, [props.requestParam])

    if (!data) {
        return null;
    }

    const { pagingOption, requestParam } = props;
    const { dataList, total } = data;

    return (
        <Table minWidth={650}
            autoWidth={true}
            autoHeight={true}
            header={renderHeader()}
            body={renderDataSection(dataList)}
            footer={renderDataSection([total], true)}
            containerPadding={30}
            onSort={(sortBy, sortOrder) => props.setRequestParam({ ...requestParam, sortBy, sortOrder })}
            isPaging={true}
            pageOption={pagingOption}
            onPaging={(pageIndex, pageSize) => props.setRequestParam({ ...requestParam, pageSize, pageIndex })} />
    );
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam, getData, setPagingOption, toggleLoader } = ActionCreators;
    return bindActionCreators({ setRequestParam, getData, setPagingOption, toggleLoader }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, pagingOption } = state;
    return Object.assign({}, { requestParam, pagingOption });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);