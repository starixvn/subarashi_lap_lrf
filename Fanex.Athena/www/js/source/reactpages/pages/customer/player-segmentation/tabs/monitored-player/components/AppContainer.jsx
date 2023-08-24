import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Loader from '@jsroot/components/Loader';
import SweetAlert from '@jsroot/components/sweet-alert';
import LangHelper from '@jsroot/lib/langHelper'
import Popup from '@jsroot/components/popup'
import FormFilter from './FormFilter';
import Content from './Content';
import FormAdd from './FormAdd';
import FormReachedHistory from './FormReachedHistory';
import FormAction from './FormAction';
import { UserActionType } from '../lib/constants';
import { ActionCreators } from '../actions';

export const AppContainer = props => {
    const { isLoading, sweetAlertOption, currentUserAction, setCurrentUserAction } = props;

    const _onClosePopup = () => {
        setCurrentUserAction(null);
    }

    const _renderActionPopup = () => {
        const { type, data } = currentUserAction;
        if (type === UserActionType.AddNew) {
            return (<Popup height={260} width={450} isShow={true} title={LangHelper.getSingleResource("AddNew")} onClose={_onClosePopup}>
            <FormAdd {...data} onClose={_onClosePopup}  />
            </Popup>)
        } else if(type === UserActionType.ViewReachedHistory) {
            return (<Popup height={500} width={680} isShow={true} title={LangHelper.getSingleResource("NotificationHistory")} onClose={_onClosePopup}>
            <FormReachedHistory {...data}  />
            </Popup>)
        } else {
            //no thing
        }
    }

    return (
        <div className="monitored-player">
            <Loader isLoading={isLoading} />
            <FormFilter />
            <FormAction />
            <Content />
            {currentUserAction && _renderActionPopup()}
            {sweetAlertOption && <SweetAlert {...sweetAlertOption} />}
        </div>
    )
}
function mapDispatchToProps(dispatch) {
    const { setCurrentUserAction } = ActionCreators;
    return bindActionCreators(Object.assign({}, { setCurrentUserAction }), dispatch);
}

function mapStateToProps(state) {
    const { isLoading, sweetAlertOption, currentUserAction } = state;
    return Object.assign({ isLoading, sweetAlertOption, currentUserAction });
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);