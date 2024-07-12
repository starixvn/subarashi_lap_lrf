import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions/resultAmendment'
import Popup from '@jsroot/components/popup'
import DataGrid from './DataGrid'
import FormFilter from './FormFilter'
import Loader from '@jsroot/components/Loader'
import AppLayout from '@jsroot/layouts/AppLayout'
import LangHelper from '@jsroot/lib/langHelper'
import TicketListingGrid from './TicketListingGrid'

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }
    _renderTicketListingPopup() {
        if (!this.props.selectedViewEvent) {
            return null;
        }
        const { SessionId, Source, DateTime } = this.props.selectedViewEvent;

        return (<Popup height={550} width={680} isShow={true} title={LangHelper.getSingleResource("TicketList")} onClose={() => this.props.setSelectedViewEvent(null)}>
            <TicketListingGrid sessionId={SessionId} source={Source} dateTime={DateTime} />
        </Popup>)
    }

    render() {
        return (
            <AppLayout>
                <Loader isLoading={this.props.isLoading} />
                <FormFilter />
                <DataGrid />
                {this._renderTicketListingPopup()}
            </AppLayout>
        );
    }
}

function mapStateToProps(state) {
    const { isLoading, selectedViewEvent } = state;
    return Object.assign({}, { isLoading, selectedViewEvent });
}

function mapDispatchToProps(dispatch) {
    const { setSelectedViewEvent } = ActionCreators
    return bindActionCreators({ setSelectedViewEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);