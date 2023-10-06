import React from 'react'
import { useSelector } from 'react-redux'
import DataGrid from './desktop/DataGrid'
import FormFilter from './desktop/FormFilter'
import PageLayout from '../../common/components/PageLayout'
import Loader from '@jsroot/components/Loader';
import MobileFormFilter from './mobile/MobileFormFilter'
import MobileGrid from './mobile/MobileGrid'
import useMobileVersion from '@jsroot/customHooks/useMobileVersion'

export const AppContainer = () => {

    const isUseMobileVer = useMobileVersion();
    const isLoading = useSelector(state => state.isLoading)
    const destopLayout = (
        <>
            <Loader isLoading={isLoading} />
            <FormFilter />
            <DataGrid />
        </>);
    const mobileLayout = (
        <>
            <Loader isLoading={isLoading} />
            <MobileFormFilter />
            <MobileGrid />
        </>
    );
    var layout = isUseMobileVer ? mobileLayout :destopLayout
    return (
        <PageLayout selectedTabIndex="1">
            {layout}
        </PageLayout>
    );
}

export default AppContainer;