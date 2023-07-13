import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormFilter from './FormFilter'
import DataGrid from './DataGrid'
import Loader from '@jsroot/components/Loader'
import AppLayout from '@jsroot/layouts/AppLayout'
import UpcomingClosurePopUp from '@jsroot/layouts/UpcomingClosurePopUp'
import ReportTitle from '@jsroot/components/ReportTitle'

export class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppLayout>
        <Loader isLoading={this.props.isLoading} />
        <FormFilter />
        <div className='result-content'>
            { this.props.reportTitle && <ReportTitle content={this.props.reportTitle} /> }
        </div>
        <DataGrid />
        <UpcomingClosurePopUp id="casinoturnover"/>
      </AppLayout>
    );
  }
}

function mapStateToProps(state) {
    return Object.assign({}, { isLoading: state.isLoading, reportTitle: state.reportTitle });
}

export default connect(mapStateToProps)(AppContainer);