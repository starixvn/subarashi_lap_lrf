import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../action/index.js'
import { bindActionCreators } from 'redux'
import { buildHeader } from '../lib/gridhelpers';
import { Table } from '@9softstudio/react-grid';

export class DataGrid extends Component {
    render() {
        return(
            <Table minWidth={650}
            autoWidth={true}
            autoHeight={true}
            header={buildHeader()}
         />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
};

function mapStateToProps(state) {
    const { } = state;
    return Object.assign({}, { });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);