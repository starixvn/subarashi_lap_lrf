import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Select from 'react-select'
import AutoComplete from '@jsroot/components/auto-complete'
import CheckBox from '@jsroot/components/CheckBox'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import { ActionCreators } from '../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import { ApiUrl } from '../../common/lib/constants'
import Service from '../../common/lib/Service'
import UserGuide from '@jsroot/components/UserGuide'
import { validateBaseCurrency } from '@jsroot/lib/validationHelper'
import SearchingIdOption from './SearchingIdOption'
import { SearchingIdOptions } from '../lib/constants'

export class FormFilter extends Component {
    constructor(props) {
        super(props);
    }

    get isValidModel() {
        return this.props.searchingId 
        && validateBaseCurrency(this.props.selectedBaseCurrency) 
        && (this.props.username || this.props.searchingIdOption === SearchingIdOptions.refNo);
    }

    submit = (event) => {
        event.preventDefault();
        const params = this._getParams();
        if (!params) {
            return;
        }

        this.props.setReportTitle(Service.getTitle(null, null, params.BaseCurrency));
        this.props.setRequestParam(params);
        this.props.toggleLoader(true);
        this.props.getGridData(ApiUrl.REFNO_DATA_URL, params);
    }

    exportExcel = (event) => {
        event.preventDefault();

        const params = this._getParams();
        if (!params) {
            return;
        }

        if (AppData.isAllowTxIDColumn) {
            params.IsAllowTxIDColumn = true;
        }

        params.IsExport = true;
        this.props.toggleLoader(true);

        DataService.getFile(ApiUrl.REFNO_DATA_URL, params).then((response) => {
            const NoContentStatusCode = 204;

            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                Site.downloadFile(response.data, 'BettingTicketsCenter_RefNo.xls');
            }
            this.props.toggleLoader(false);
        });
    }

    _getParams() {
        if (!this.isValidModel) {
            return null;
        }

        const { PageSize, SortBy, SortOrder } = this.props.requestParam;

        return {
            PageSize: PageSize,
            PageIndex: 1,
            Refno: this.props.searchingIdOption === SearchingIdOptions.refNo ? this.props.searchingId : '',
            TxId: this.props.searchingIdOption === SearchingIdOptions.txID ? this.props.searchingId : '',
            Username: this.props.username,
            BaseCurrency: this.props.isConvertAll ? this.props.selectedBaseCurrency : '',
            IsConvertAll: this.props.isConvertAll,
            SortBy: SortBy,
            SortOrder: SortOrder
        }
    }

    showUserGuide = () => {
        const userGuideContent = this.props.userGuideContent;

        if (!userGuideContent || userGuideContent.length === 0) {
            this.props.getUserGuideContent('BettingTicketCenterRefno');
        }
    }

    _renderUserGuide() {
        const userGuideContent = this.props.userGuideContent;

        return (<UserGuide
            title={LangHelper.getSingleResource("UserGuide")}
            contentTitle={LangHelper.getSingleResource("BettingTicketCenter")}
            onClick={this.showUserGuide}
            content={userGuideContent} />)
    }

    _renderBaseCurrencySelectList() {
        const selectedBaseCurrency = this.props.selectedBaseCurrency;
        const baseCurrencyList = AppData.baseCurrencyList;

        return baseCurrencyList && baseCurrencyList.length && (
            <Select instanceId="ddlBased"
                value={selectedBaseCurrency}
                options={baseCurrencyList}
                onChange={(item) => this.props.setSelectedBaseCurrency(item.value)} />
        );
    }

    _getSearchingIdText(searchingIdOption) {
        return searchingIdOption === SearchingIdOptions.refNo ?
            LangHelper.getSingleResource("RefNo") : LangHelper.getSingleResource("LicenseeTxId")
    }

    _getUserNameText(searchingIdOption) {
        return searchingIdOption === SearchingIdOptions.txID ?
            LangHelper.getSingleResource("Username") + " *": LangHelper.getSingleResource("Username")
    }

    render() {
        const excelButton = <div>
            <i className="icon-excel right" onClick={this.exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
            {this._renderUserGuide()}
        </div>;

        const { searchingIdOption, searchingId, setSearchingId, setSearchingIdOption } = this.props;
        const searchingIdText = this._getSearchingIdText(searchingIdOption);
        const userNameText = this._getUserNameText(searchingIdOption);

        return (
            <CollapsiblePanel className="page-filter" stickyFooter={excelButton}>
                <div className="row">
                    <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">
                                {searchingIdText}
                                {AppData.isAllowTxIDColumn && (<SearchingIdOption value={searchingIdOption} onChange={(event) => {
                                    setSearchingIdOption(event.target.value)
                                    setSearchingId('')
                                }} />)}
                            </label>
                            <input className="input-text" id="SearchingId" name="SearchingId"
                                type={searchingIdOption === SearchingIdOptions.refNo ? "number" : "text"}
                                value={searchingId}
                                placeholder={searchingIdText}
                                onChange={(event) => setSearchingId(event.target.value)} />
                        </div>
                    </div>

                    <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{userNameText}</label>
                            <AutoComplete url={ApiUrl.CUSTOMER_SEARCH_URL}
                                onSelect={(value) => this.props.setUsername(value)}
                                onInput={(value) => this.props.setUsername(value)}
                                htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("BaseCurrency")}</label>
                            {this._renderBaseCurrencySelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-4 col-sm-4 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <CheckBox id="IsConvertAll"
                                checked={this.props.isConvertAll}
                                onChange={(checked) => this.props.changeIsConvertAll(checked)}
                                label={LangHelper.getSingleResource("ConvertAllFiguresToBaseCurrency")} />
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" disabled={!this.isValidModel} className="btn btn-submit" onClick={this.submit}>{LangHelper.getSingleResource("Submit")}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1" style={{ flex: "0 0 4%" }}>
                        {LangHelper.getSingleResource('Note')}:
                        </div>
                    <div className="col-9">
                        {AppData.isAllowTxIDColumn && <>
                            * {LangHelper.getSingleResource('BettingTicketCenter_RefnoTabNote_TxIDSearch').replace('{0}', AppData.balanceupDay)}
                            <br />
                            * {AppData.productsRequireTxIdNote}
                            <br />
                        </>}                    
                        * {AppData.productsRequireUseNameNote}
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
    const { requestParam, searchingId, searchingIdOption, username, selectedBaseCurrency, isConvertAll, userGuideContent } = state;
    return Object.assign({}, { requestParam, searchingId, searchingIdOption, username, selectedBaseCurrency, isConvertAll, userGuideContent });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);