
import React from 'react';
import { connect } from 'react-redux';
import Loader from '@jsroot/components/Loader';
import AppLayout from '@jsroot/layouts/AppLayout';
import AppData from '@jsroot/lib/AppData';
import LangHelper from '@jsroot/lib/langHelper'
import FormFilter from './FormFilter';
import DataGrid from './DataGrid';

export const AppContainer = props => {
    const { isLoading } = props;
    const _contentTitle = React.useMemo(() => {
        return (<div className="content-title">
            <span>{`${AppData.externalId}(${AppData.systemId})`}</span>
            <span className="base-currency">{` - ${LangHelper.getSingleResource('Viewin').replace('{0}', AppData.baseCurrency)}`}</span>
        </div>);
    });
    return (
        <AppLayout>
            <Loader isLoading={isLoading} />
            {_contentTitle}
            <FormFilter />
            <DataGrid />
        </AppLayout>
    )
}

function mapStateToProps(state) {
    const { isLoading } = state;
    return Object.assign({ isLoading });
}

export default connect(mapStateToProps)(AppContainer);