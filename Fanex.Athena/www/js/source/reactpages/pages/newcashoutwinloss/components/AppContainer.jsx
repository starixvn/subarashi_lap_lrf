import React from 'react';
import AppLayout from '@jsroot/layouts/AppLayout';
import FormFilter from './FormFilter';
import DataGrid from './DataGrid'
import UpcomingClosurePopUp from '@jsroot/layouts/UpcomingClosurePopUp'
import Loader from '@jsroot/components/Loader';
import { connect } from 'react-redux';

export const AppContainer = props => {
    return (
    <AppLayout className="newcashout-report">
        <Loader isLoading={props.isLoading} />
        <FormFilter />
        <DataGrid />
        <UpcomingClosurePopUp id="cashoutwinloss"/>
    </AppLayout>)
}

function mapStateToProps(state) {
    return Object.assign({}, { isLoading: state.isLoading });
}

export default connect(mapStateToProps)(AppContainer);