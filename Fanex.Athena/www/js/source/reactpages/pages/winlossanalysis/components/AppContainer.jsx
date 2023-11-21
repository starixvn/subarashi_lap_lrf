import React from 'react';
import { useSelector } from 'react-redux';
import DataGrid from './desktop/DataGrid'
import FormFilter from './desktop/FormFilter'
import MobileDataGrid from './mobile/MobileDataGrid';
import MobileFormFilter from './mobile/MobileFormFilter'
import Loader from '@jsroot/components/Loader'
import AppLayout from '@jsroot/layouts/AppLayout'
import useMobileVersion from '@jsroot/customHooks/useMobileVersion'

export const AppContainer = () => {
  const isLoading = useSelector(state => state.isLoading)
  const isUseMobileVer = useMobileVersion();

  const desktopLayout = (
    <AppLayout>
      <Loader isLoading={isLoading} />
      <FormFilter />
      <DataGrid />
    </AppLayout>);

  const mobileLayout = (
    <div className='mobile-container'>
      <AppLayout>
        <Loader isLoading={isLoading} />
        <MobileFormFilter />
        <MobileDataGrid />
      </AppLayout>
    </div>
  );

  return isUseMobileVer ? mobileLayout : desktopLayout;
}

export default AppContainer