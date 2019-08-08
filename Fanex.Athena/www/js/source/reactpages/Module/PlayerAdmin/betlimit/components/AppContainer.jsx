import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppLayout from '@jsroot/layouts/AppLayout'
import FormFilter from './FormFilter';
import DataGrid from './DataGrid';
import Loader from '@jsroot/components/Loader';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppLayout>
                <Loader isLoading={this.props.isLoading} />
                <FormFilter />
                <DataGrid />
            </AppLayout>
        );
    }
}

function mapStateToProps(state) {
    const { isLoading } = state;
    return Object.assign({}, { isLoading });
}

export default connect(mapStateToProps)(AppContainer);