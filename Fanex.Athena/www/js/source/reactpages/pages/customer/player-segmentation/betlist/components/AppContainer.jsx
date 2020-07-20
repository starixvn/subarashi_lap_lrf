
import React from 'react';
import { connect } from 'react-redux';
import Loader from '@jsroot/components/Loader';
import AppLayout from '@jsroot/layouts/AppLayout';
import FormFilter from './FormFilter';
import DataGrid from './DataGrid';

export const AppContainer = props => {
    const { isLoading } = props;

    return (
        <AppLayout>
            <Loader isLoading={isLoading} />
            <FormFilter />
            <DataGrid />
        </AppLayout>
    )
}

function mapStateToProps(state) {
    const { isLoading } = state;
    return Object.assign({ isLoading });
}

export default connect(mapStateToProps)(AppContainer);