import React from 'react';
import AppLayout from '@jsroot/layouts/AppLayout';
import FormFilter from './FormFilter';
import DataGrid from './DataGrid';

export const AppContainer = (props) => {
    return (
        <AppLayout>
            <FormFilter />
            <DataGrid />
        </AppLayout>
    );
}

export default React.memo(AppContainer);