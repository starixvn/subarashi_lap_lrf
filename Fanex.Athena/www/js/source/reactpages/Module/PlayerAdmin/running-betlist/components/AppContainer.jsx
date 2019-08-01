import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import BetListLayout from '@jsroot/layouts/betlist/BetListLayout';
import FormFilter from './FormFilter';
import DataGrid from './DataGrid';
import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';
import Service from '../lib/service';
import Loader from '@jsroot/components/Loader';
import ReportTitle from '@jsroot/components/ReportTitle';

export class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.title = Service.getReportTitle(props.requestParam.Currency);
    }

    getResource = (key) => {
        LangHelper.getSingleResource(key);
    }

    beforeShowParlay = () => {
        this.props.toggleLoader(true);
    }

    afterShowParlay = () => {
        this.props.toggleLoader(false);
    }

    render() {
        return (
            <BetListLayout
                pageName='PlayerAdmin'
                rootUrl={Site.getRootUrl()}
                getResourceFunc={this.getResource}
                baseCurrency={this.props.requestParam.Currency}
                beforeShowParlayFunc={this.beforeShowParlay}
                afterShowParlayFunc={this.afterShowParlay}
            >
                <Loader isLoading={this.props.isLoading} />
                <FormFilter />
                <div className="betlist-container result-content">
                    { this.title && <ReportTitle content={this.title} /> }
                    <DataGrid />
                </div>
            </BetListLayout>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    const { isLoading, requestParam } = state;
    return Object.assign({}, { isLoading, requestParam });
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);