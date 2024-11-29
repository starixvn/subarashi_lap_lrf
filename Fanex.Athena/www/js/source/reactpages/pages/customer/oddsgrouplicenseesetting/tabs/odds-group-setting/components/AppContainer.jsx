import React from 'react';
import { connect } from 'react-redux';
import Loader from '@jsroot/components/Loader';
import FormFilter from './FormFilter';
import Content from './Content';
import SweetAlert from '@jsroot/components/sweet-alert';

export const AppContainer = props => {
    const { isLoading, sweetAlertOption } = props;

    return (
        <div className="odds-group-setting">
            <Loader isLoading={isLoading} />
            <FormFilter />
            <Content />
            {sweetAlertOption && <SweetAlert {...sweetAlertOption} />}
        </div>
    )
}

function mapStateToProps(state) {
    const { isLoading, sweetAlertOption } = state;
    return Object.assign({ isLoading, sweetAlertOption });
}

export default connect(mapStateToProps)(AppContainer);