import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataGrid from './DataGrid'
import FormFilter from './FormFilter'
import Loader from '@jsroot/components/Loader'
import AppLayout from '@jsroot/layouts/AppLayout'
import UnderMaintenancePopUp from './UnderMaintenancePopUp'

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
            <UnderMaintenancePopUp id="UM_exchangewinloss"/>
          </AppLayout>
        );
    }
}

function mapStateToProps(state) {
    return Object.assign({}, { isLoading: state.isLoading });
}

export default connect(mapStateToProps)(AppContainer);