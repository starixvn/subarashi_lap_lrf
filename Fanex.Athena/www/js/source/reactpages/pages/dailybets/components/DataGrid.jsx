import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import { Table } from '@9softstudio/react-grid';
import { renderHeader, renderDataSection } from '../lib/gridUtils';

export const DataGrid = (props) => {
    const { dataList } = props;
    if (!dataList) {
        return null;
    }

    const handleSort = (sortBy, sortOrder) => {
        console.log(sortBy, sortOrder);
    }

    return (
        <Table minWidth={650}
            autoWidth={true}
            autoHeight={true}
            header={renderHeader()}
            body={renderDataSection(dataList)}
            containerPadding={30}
            onSort={handleSort} />
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);