import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { renderHeader, renderDataSection } from '../lib/gridUtils';

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

    return (
        <Table minWidth={650}
            autoWidth={true}
            autoHeight={true}
            header={renderHeader()}
            body={renderDataSection(dataList)}
            containerPadding={30} />
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
};

function mapStateToProps(state) {
    const { gridData, requestParam } = state;
    return Object.assign({}, { gridData, requestParam });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);