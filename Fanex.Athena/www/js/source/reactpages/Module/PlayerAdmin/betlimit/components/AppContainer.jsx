import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '@jsroot/layouts/AppLayout'
import FormFilter from './FormFilter';
import DataContent from './DataContent';
import Loader from '@jsroot/components/Loader';

export const AppContainer = (props) => {
    return (
        <AppLayout>
            <Loader isLoading={props.isLoading} />
            <FormFilter />
            <DataContent />
        </AppLayout>
    );
}

function mapStateToProps(state) {
    const { isLoading } = state;
    return Object.assign({}, { isLoading });
}

export default connect(mapStateToProps)(React.memo(AppContainer));