import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '@jsroot/layouts/AppLayout';
import Loader from '@jsroot/components/Loader';
import DataGrid from './DataGrid';
import Title from './Title';

export const AppContainer = (props) => {
    return (
        <AppLayout>
            <Loader isLoading={props.isLoading} />
            <Title />
            <DataGrid />
        </AppLayout>
    )
}

function mapStateToProps(state) {
    return Object.assign({}, { isLoading: state.isLoading });
}

export default connect(mapStateToProps)(AppContainer);