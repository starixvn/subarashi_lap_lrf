import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoidDataGrid from './VoidDataGrid'
import FormFilter from './FormFilter'
import Loader from '@jsroot/components/Loader'
import AppLayout from '@jsroot/layouts/AppLayout'
import { ExchangeMode } from '../lib/constants';
import RunningDataGrid from './RunningDataGrid';

export const AppContainer = (props) => {
  return (
    <AppLayout>
      <Loader isLoading={props.isLoading} />
      <FormFilter />
      {props.selectedExchangeMode == ExchangeMode.Running ? <RunningDataGrid/> : <VoidDataGrid/>}
    </AppLayout>
  );
}

function mapStateToProps(state) {
    return Object.assign({}, { isLoading: state.isLoading, selectedExchangeMode: state.selectedExchangeMode });
}

export default connect(mapStateToProps)(AppContainer);