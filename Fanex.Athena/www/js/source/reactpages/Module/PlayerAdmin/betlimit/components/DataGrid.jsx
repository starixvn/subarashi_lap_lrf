import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Service from '../lib/service';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div></div>
    }
}

function mapDispatchToProps(dispatch) {
    const { toggleLoader, setRequestParam } = ActionCreators;
    return bindActionCreators({ toggleLoader, setRequestParam }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);