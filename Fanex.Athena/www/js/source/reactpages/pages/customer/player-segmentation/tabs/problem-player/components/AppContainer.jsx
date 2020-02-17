
import React from 'react';
import { connect } from 'react-redux';
import Loader from '@jsroot/components/Loader';
import FormFilter from './FormFilter';

export const AppContainer = props => {
    const { isLoading } = props;

    return (
        <div className="problem-player">
            <Loader isLoading={isLoading} />
            <FormFilter />
        </div>
    )
}

function mapStateToProps(state) {
    const { isLoading } = state;
    return Object.assign({ isLoading });
}

export default connect(mapStateToProps)(AppContainer);