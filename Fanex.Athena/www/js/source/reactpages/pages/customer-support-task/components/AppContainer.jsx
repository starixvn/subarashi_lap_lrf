import React from 'react'
import { connect } from 'react-redux'
import AppLayout from '../../../layouts/AppLayout'
import Loader from '@jsroot/components/Loader'
import FormFilter from './FormFilter'

const AppContainer = ({ isLoading }) => {
  return (
    <AppLayout>
      <Loader isLoading={isLoading} />
      <FormFilter />
    </AppLayout>
  )
}

function mapStateToProps(state) {
  return Object.assign({ isLoading: state.isLoading });
}

export default connect(mapStateToProps)(AppContainer);