import React from 'react';
import { connect } from 'react-redux';
import Content from './Content';
import FormFilter from './FormFilter';
import Loader from '@jsroot/components/Loader';
import AppLayout from '@jsroot/layouts/AppLayout';
import PlayerDetail from './PlayerDetail';

export const AppContainer = (props) => {
    return (
        <AppLayout>
            <Loader isLoading={props.isLoading} />
            <FormFilter />
            <Content />
            <PlayerDetail />
        </AppLayout>
    );
}

function mapStateToProps(state) {
    const { isLoading } = state;
    return Object.assign({}, { isLoading });
}

export default connect(mapStateToProps)(React.memo(AppContainer));