import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import AppLayout from '../../../../layouts/AppLayout';
import TabContent from './TabContent';
import WidgetContent from './WidgetContent';


const AppContainer = (props) => {
    return (
        <AppLayout>
            <div className="account-info-container">
                <TabContent />
                <WidgetContent />
            </div>
        </AppLayout>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return Object.assign({}, {});
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AppContainer));