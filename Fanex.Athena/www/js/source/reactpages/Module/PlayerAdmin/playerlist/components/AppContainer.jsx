import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import Content from './Content'
import FormFilter from './FormFilter'
import Loader from '../../../../components/Loader'
import AppLayout from '../../../../layouts/AppLayout'
import PlayerDetail from './PlayerDetail';

const AppContainer = (props) => {
    return (
        <AppLayout>
            <Loader isLoading={props.isLoading} />
            <FormFilter />
            <Content />
            <PlayerDetail />
        </AppLayout>
    );
}

function mapDispatchToProps(dispatch) {
    const { } = ActionCreators;
    return bindActionCreators({ }, dispatch);
}

function mapStateToProps(state) {
    const { isLoading } = state;
    return Object.assign({}, { isLoading });
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AppContainer));