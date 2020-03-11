import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import MultipleSelect from '@9softstudio/react-multiselect'
import AutoComplete from '@jsroot/components/auto-complete'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import StringHelper from '@jsroot/lib/stringHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import { ActionCreators } from '../actions'
import { Url } from '../lib/constants';
import DataSourceHelper from '../../../lib/helpers/dataSourceHelper';
import ParamHelper from "../lib/helpers/paramHelper";
import GridHelper from "../../../lib/helpers/gridHelper";

export class FormFilter extends PureComponent {
    constructor(props) {
        super(props);
    }

    _submit = (event) => {
        event.preventDefault();
        const params = ParamHelper.ConvertToFriendlyParams(this.props);
        if (!params) {
            return;
        }
        this.props.setSelectedParams(params);
        this.props.searchPlayer(this.props.selectedTabKey, params, GridHelper.callBackToUpdatePaging(this.props));
    }

    exportExcel = (event) => {
        event.preventDefault();
        const params = this.props.selectedParams;
        if (!params) {
            return;
        }
        DataService.getFile(Url.exportVipPlayerList, params).then((response) => {
            const NoContentStatusCode = 204;
            if(response.status === NoContentStatusCode){
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                Site.downloadFile(response.data, 'VipPlayerList.xls');
            }
        });
    }

    _renderVipOptionSelectList() {
        const { selectedVipOption, setSelectedVipOption, selectedTabKey } = this.props;
        const vipOptions = AppData[selectedTabKey].vipOptions;
        return vipOptions && vipOptions.length && (
            <Select instanceId="VipOptions"
                isSearchable={false}
                value={selectedVipOption}
                options={vipOptions}
                onChange={(item) => setSelectedVipOption(item.value)} />
        );
    }

    _renderCurrencySelectList() {
        const { selectedCurrency, selectedTabKey } = this.props;
        const currencyList = AppData[selectedTabKey].currencyList;
        const dataSource = DataSourceHelper.CreateDataSourceFrom(currencyList, selectedCurrency);
        return currencyList && currencyList.length && (
            <MultipleSelect id="permissionCurrency"
                language={LangHelper.currentLanguage}
                dataSource={dataSource}
                keyField={"key"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => this.props.setSelectedCurrency(selectedItemsKey)} />);
    }

    _renderExcelIcon() {
        return (<div>
            <i className="icon-excel right" onClick={this.exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
        </div>);
    }

    render() {
        const isDisabledSubmit = StringHelper.isEmptyOrWhiteSpace(this.props.selectedCurrency);
        return (
            <CollapsiblePanel className="page-filter" stickyFooter={this._renderExcelIcon()}>
                <div className="row">
                    <div className="col-12 col-md-4 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Vip")}</label>
                            {this._renderVipOptionSelectList()}
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                            <AutoComplete
                                onSelect={(value) => this.props.setUsername(value)}
                                onInput={(value) => this.props.setUsername(value)}
                                htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                            {this._renderCurrencySelectList()}
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-sm-3 col-lg-2 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" className="btn btn-submit" disabled={isDisabledSubmit} onClick={this._submit}>{LangHelper.getSingleResource("Submit")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </CollapsiblePanel>
        )
    }
}

function mapDispatchToProps(dispatch) {
    const { setDateRange, setSelectedVipOption, setUsername, setSelectedCurrency, setSelectedParams, searchPlayer, setPagingOption } = ActionCreators;
    return bindActionCreators(Object.assign({}, {
        setSelectedVipOption,
        setDateRange,
        setUsername,
        setSelectedCurrency,
        setSelectedParams,
        searchPlayer,
        setPagingOption
    }), dispatch);
}

function mapStateToProps(state) {
    const { dateRange, selectedVipOption, selectedCurrency, selectedParams, username, pagingOption, selectedTabKey } = state;
    return Object.assign({}, {
        selectedVipOption,
        dateRange,
        selectedCurrency,
        username,
        selectedParams,
        pagingOption,
        selectedTabKey
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);