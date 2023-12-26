import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index.js';
import Content from './Content';
import FormFilter from './FormFilter';
import Loader from '@jsroot/components/Loader';
import AppLayout from '@jsroot/layouts/AppLayout';

export const AppContainer = ({ isLoading }) => {
    return (
        <AppLayout>
            <Loader isLoading={isLoading} />
            <FormFilter />
            <Content />
        </AppLayout>
    );
}

function mapDispatchToProps(dispatch) {
    const { toggleLoader } = ActionCreators;
    return bindActionCreators( {toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    const { isLoading } = state;
    return Object.assign({}, { isLoading});
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer); 
