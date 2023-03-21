import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { ToastContainer, toast, Flip } from 'react-toastify';

import CollapsiblePanel from '@jsroot/components/collapsible-panel'

import { ActionCreators } from '../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import Service from '../common/lib/Service'
import { ApiUrl } from '../common/lib/constants'
import { validateBaseCurrency } from '@jsroot/lib/validationHelper'

const ToastMsg = () => (
    <div>
        <div>{LangHelper.getSingleResource("BTCExportExcelMsg1")}</div>
        <div>{LangHelper.getSingleResource("BTCExportExcelMsg2")}</div>
    </div>
)

export class FormFilter extends Component {

    constructor(props) {
        super(props);
    }

    _showExportWarning = () => {
        toast.success(<ToastMsg />);
    }

    get isValidModel() {
        return !!this.props.selectedProduct
            && !!this.props.selectedStatus
            && !!this.props.selectedLiveStatus
            && !!this.props.selectedCurrency
            && validateBaseCurrency(this.props.selectedBaseCurrency)
    }

    isSingleDate = (dateRange) => {
        const { fromDate, toDate } = dateRange || this.props.dateRange;
        return moment(fromDate, "MM/DD/YYYY", true).isSame(moment(toDate, "MM/DD/YYYY", true), 'day');
    }

    submit = (event) => {
        event.preventDefault();
        const params = this._getParams();
        if (!params) {
            return;
        }

        toast.dismiss();
        const title = Service.getTitle(params.FromDate, params.ToDate);
        this.props.setReportTitle(title);
        this.props.setRequestParam(params);
        this.props.toggleLoader(true);
        this.props.getReportData(ApiUrl.GET_DATA_URL, params);
    }

    _getParams() {
        if (!this.isValidModel) {
            return null;
        }

        const { fromDate, toDate } = this.props.dateRange;
        const { PageSize, SortBy, SortOrder } = this.props.requestParam;
        const baseCurrency = AppData.baseCurrencyList.find(x => x.value === this.props.selectedBaseCurrency);

        return {
            PageSize: PageSize,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            ProductCodes: this.props.selectedProduct,
            SearchCustId: null,
            BaseCurrency: this.props.selectedBaseCurrency,
            StatusIds: "ALL", //this.props.selectedStatus,
            LiveStatus: "ALL", //this.props.selectedLiveStatus,
            SportIds: "ALL", //this.props.selectedSport,
            BetTypeIds: "ALL", //this.props.selectedBettype,
            PlatformIds: "ALL", //this.props.selectedPlatform,
            LiveStatusIds: "ALL", //this.props.selectedLiveStatus,
            IsVipOnly: this.props.selectedVipOnly,
            CustomerClass: "ALL", //this.props.selectedCustomerClass,
            OddsGroup: "ALL", //this.props.selectedOddsGroup,
            IsExludeTestData: this.props.isExcludeTestData,
            IsViewCashOutOnly: this.props.isViewCashOutOnly,
            GroupMode: this.props.selectedGroupByOption,
            BreakdownMode: this.props.selectedBreakDownByOption,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
        }
    }

    _renderGroupByOption = () => {
        const { selectedGroupByOption } = this.props;
        const groupByList = AppData.groupByList;

        return (
            <div className="form-group">
                <label className='label-text'>{LangHelper.getSingleResource('GroupBy')}:</label>
                {
                    groupByList.map((option, i) => {
                        const key = 'GroupBy' + i;
                        return (
                            <span key={`GroupBy${key}`}>
                                <input type='radio' value={option.value} checked={selectedGroupByOption == option.value} id={key}
                                    onChange={ this.changeGroupByOption} />
                                <label htmlFor={key}>{option.label}</label>
                            </span>)
                    })
                    }
            </div>
        );
    }

    changeGroupByOption = (event) =>{
        const breakDownOption = Service.buildBreakDownOptionFromGroupByMode(event.target.value);
        const firstEnabledSelectBreakDown = breakDownOption.find((item => !item.isDisabled));
        this.props.setSelectedGroupByOption(event.target.value);
        this.props.setSelectedBreakDownByOption(firstEnabledSelectBreakDown.value);
    }

    _renderBreakByOption = () => {
        const { selectedBreakDownByOption, selectedGroupByOption } = this.props;
        const breakByList = Service.buildBreakDownOptionFromGroupByMode(selectedGroupByOption);

        return (
            <div className="form-group">
                <label className='label-text'>{LangHelper.getSingleResource('BreakdownBy')}:</label>
                {
                    breakByList.map((option, i) => {
                        const key = 'BreakBy' + i;
                        return (
                            <span key={`BreakBy${key}`}>
                                <input disabled={option.isDisabled} type='radio' value={option.value} checked={selectedBreakDownByOption == option.value} id={key}
                                    onChange={(event) => this.props.setSelectedBreakDownByOption(event.target.value)} />
                                <label htmlFor={key}>{option.label}</label>
                            </span>)
                    })
                }
            </div>
        );
    }
    

    render() {

        return (
            <CollapsiblePanel className="page-filter">
                <div className="row">
                    <ToastContainer
                        autoClose={10000}
                        pauseOnFocusLoss={false}
                        style={{ width: "500px" }}
                        transition={Flip} />
                    <div className='col-12 col-md-12 col-sm-12 col-lg-6 col-xl-6'>
                        <div className='row'>
                            <div className='col-md-12'>
                                {this._renderGroupByOption()}
                            </div>
                            <div className='col-md-12'>
                                {this._renderBreakByOption()}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" disabled={!this.isValidModel} className="btn btn-submit" onClick={this.submit}>{LangHelper.getSingleResource("Submit")}</button>
                            </div>
                        </div>
                    </div>

                </div>
            </CollapsiblePanel>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedGroupByOption, selectedBreakDownByOption, selectedPlatform,
        selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedLiveStatus, username, isConvertAll, userGuideContent, ip, selectedSubsidiary,
        selectedVipOnly, selectedCustomerClass, selectedOddsGroup, isExcludeTestData, isViewCashOutOnly
    } = state;

    return Object.assign({}, {
        requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedGroupByOption, selectedBreakDownByOption, selectedPlatform,
        selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedLiveStatus, username, isConvertAll, userGuideContent, ip, selectedSubsidiary, 
        selectedVipOnly, selectedCustomerClass, selectedOddsGroup, isExcludeTestData, isViewCashOutOnly
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);