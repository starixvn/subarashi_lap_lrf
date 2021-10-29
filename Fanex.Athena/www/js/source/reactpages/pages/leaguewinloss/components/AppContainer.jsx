import React from 'react';
import AppLayout from '@jsroot/layouts/AppLayout';
import FormFilter from './FormFilter';
import DataGrid from './DataGrid'
import Loader from '@jsroot/components/Loader';
import { connect } from 'react-redux';

export const AppContainer = props => {
    return (
    <AppLayout className="winlossbyleague-report">
        <Loader isLoading={props.isLoading} />
        <FormFilter />
        <DataGrid />
    </AppLayout>)
}

function mapStateToProps(state) {
    return Object.assign({}, { isLoading: state.isLoading });
}

export default connect(mapStateToProps)(AppContainer);