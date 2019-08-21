import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppLayout from '@jsroot/layouts/AppLayout'
import FormFilter from './FormFilter';
import DataContent from './DataContent';
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
                <DataContent productId={this.props.requestParam.ProductId} />
            </AppLayout>
        );
    }
}

function mapStateToProps(state) {
    const { isLoading, requestParam } = state;
    return Object.assign({}, { isLoading, requestParam });
}

export default connect(mapStateToProps)(AppContainer);