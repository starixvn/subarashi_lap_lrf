import React, { useRef }  from 'react'
import { useSelector } from 'react-redux'
import DataGrid from './desktop/DataGrid'
import FormFilter from './desktop/FormFilter'
import PageLayout from '../../common/components/PageLayout'
import Loader from '@jsroot/components/Loader';
import MobileFormFilter from './mobile/MobileFormFilter'
import MobileGrid from './mobile/MobileGrid'
import useMobileVersion from '@jsroot/customHooks/useMobileVersion'
import { useIsFirstRender } from 'usehooks-ts'
import SweetAlert from '@jsroot/components/sweet-alert';

export const AppContainer = () => {
    const ref = useRef(false);
    const isMobile = useMobileVersion();
    const isFirstRender = useIsFirstRender();
    const isLoading = useSelector(state => state.isLoading);
    const sweetAlertOption = useSelector(state => state.sweetAlertOption);

    if (isFirstRender){
        ref.current = isMobile;
    }
    const isUseMobileVer =  ref.current;
    const destopLayout = (
        <>
            <Loader isLoading={isLoading} />
            <FormFilter />
            <DataGrid />
            {sweetAlertOption && <SweetAlert {...sweetAlertOption} />}
        </>);
    const mobileLayout = (
        <>
            <Loader isLoading={isLoading} />
            <MobileFormFilter />
            <MobileGrid />
            {sweetAlertOption && <SweetAlert {...sweetAlertOption} />}
        </>
    );
    const layout = isUseMobileVer ? mobileLayout :destopLayout
    const className = isUseMobileVer ? "mobile-container" : "";
    return (
        <PageLayout className={className} selectedTabIndex="3">
            {layout}
        </PageLayout>
    );
}

export default AppContainer;