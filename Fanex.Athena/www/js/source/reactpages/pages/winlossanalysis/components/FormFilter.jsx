import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import { ActionCreators } from '../actions/index.js'
import MainFilter from './filter/MainFilter.jsx';
import GroupByFilter from './filter/GroupByFilter.jsx';


export class FormFilter extends Component {
    render() {

        return (
            <CollapsiblePanel className="aggregate-filter">
                <MainFilter/>
                <GroupByFilter/>
            </CollapsiblePanel>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedPlatform, platformList, selectedVipOnly, selectedCustomerClass,
        selectedOddsGroup, isExcludeTestData, isGroupInOriginalCurrency, isViewCashOutOnly, selectedGroupByOption, selectedBreakDownByOption, searchMode,
        selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedLiveStatus, username, userGuideContent, selectedSubsidiary, subsidiarySearch, appUuid
    } = state;

    return Object.assign({}, {
        requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedPlatform, platformList, selectedVipOnly, selectedCustomerClass,
        selectedOddsGroup, isExcludeTestData, isGroupInOriginalCurrency, isViewCashOutOnly, selectedGroupByOption, selectedBreakDownByOption, searchMode,
        selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedLiveStatus, username, userGuideContent, selectedSubsidiary, subsidiarySearch, appUuid
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);