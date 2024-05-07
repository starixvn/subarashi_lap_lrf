import React from 'react'
import { useSelector } from 'react-redux'
import DataGrid from './desktop/DataGrid'
import FormFilter from './desktop/FormFilter'
import PageLayout from '../../common/components/PageLayout'
import Loader from '@jsroot/components/Loader';

export const AppContainer = () => {

    const isLoading = useSelector(state => state.isLoading)

    return (
        <PageLayout selectedTabIndex="5">
            <Loader isLoading={isLoading} />
            <FormFilter />
            <DataGrid />
        </PageLayout>
    );
}

export default AppContainer;