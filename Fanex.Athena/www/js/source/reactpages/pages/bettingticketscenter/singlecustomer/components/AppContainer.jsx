import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import DataGrid from './desktop/DataGrid'
import FormFilter from './desktop/FormFilter'
import PageLayout from '../../common/components/PageLayout'
import Loader from '@jsroot/components/Loader';
import MobileFormFilter from './mobile/MobileFormFilter'
import useMobileVersion from '@jsroot/customHooks/useMobileVersion'
import MobileGrid from './mobile/MobileGrid'

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
    const layout = isUseMobileVer ? mobileLayout : destopLayout
    const className = isUseMobileVer ? "mobile-container" : "";
    return (
        <PageLayout className={className} selectedTabIndex="0">
            {layout}
        </PageLayout>
    );
}

export default memo(AppContainer);
