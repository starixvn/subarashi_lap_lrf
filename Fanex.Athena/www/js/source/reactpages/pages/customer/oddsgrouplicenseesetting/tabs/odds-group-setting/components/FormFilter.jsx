import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index.js'
import { bindActionCreators } from 'redux'
import MultipleSelect, { TreeViewSelect } from '@legion-lib/react-multiselect'
import CheckBox from '@jsroot/components/CheckBox'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import { SubsidiaryViewType, TreeViewOption } from '../../../../../../constants/report'
import UserGuide from '@jsroot/components/UserGuide'
import { GetDataList } from '../lib/queryService'

export class FormFilter extends Component {
    constructor(props) {
        super(props);
    }

    submit = async (event) => {
        event.preventDefault();
        const params = this._getParams();
        if (!params) {
            return;
        }

        this.props.toggleLoader(true);
        var data = await GetDataList(params);
        !!data && this.props.setDataList(data);
        this.props.setUpdateDataList({});
        this.props.setUpdatedStatusList({});
        this.props.setSelectedParams(params);
        this.props.toggleLoader(false);
    }

    _getParams() {
        const { subsidiarySearch, selectedCurrency} = this.props;

        return {
            SubsidiarySearch: subsidiarySearch,
            SubsidiaryList: subsidiarySearch ? this.props.selectedSubsidiary : "",
            CurrencyIdList: selectedCurrency,
            t: new Date().getTime()
        };
    }


    _onChangeSubsidiaryList = (_, selectedItemsKey) => this.props.setSubsidiaryList(selectedItemsKey)

    _renderSubsidiaryTreeView() {
        const selectedSubsidiary = this.props.selectedSubsidiary;

        return <TreeViewSelect
            language={LangHelper.currentLanguage}
            id="SubsidiaryTreeView"
            dataSource={AppData.whitelabelList}
            keyField="Value"
            valueField="Name"
            statusField="Checked"
            isAllTextShown={false}
            hasSearchBox={false}
            treeViewOption={TreeViewOption}
            onChange={this._onChangeSubsidiaryList} 
            isValid={!!selectedSubsidiary} />;
    }

    _onChangeCurrencyList = (_, selectedItemsKey) => this.props.setSelectedCurrency(selectedItemsKey)

    _renderCurrencySelectList() {
        const currencyList = AppData.currencyList;
        const selectedCurrency = this.props.selectedCurrency;

        return currencyList && currencyList.length && (
            <MultipleSelect id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={this._onChangeCurrencyList} 
                isValid={!!selectedCurrency} />);
    }

    _showUserGuide = () => {
        const userGuideContent = this.props.userGuideContent;
        
        if (!userGuideContent || userGuideContent.length === 0) {
            this.props.getUserGuideContent('OddsGroupLicenseeSetting');
        }
    }

    _renderUserGuide = () => {
        const userGuideContent = this.props.userGuideContent;

        return (<UserGuide 
                title={LangHelper.getSingleResource("UserGuide")} 
                contentTitle={LangHelper.getSingleResource("OddsGroupLicenseeSetting")}
                onClick={this._showUserGuide}
                content={userGuideContent} />)
    }

    render() {
        const showSubsidiarySearch = AppData.subsidiaryViewType !== SubsidiaryViewType.NOT_MANAGEMENT;
        return (
            <div className='page-filter'>
                <div className='row'>
                    {showSubsidiarySearch && this.props.subsidiarySearch && (<div className='col-12 col-sm-4 col-md-2 col-xl-2'>
                        <div className="form-group">
                            <label className="label-text">
                                {AppData.subsidiaryViewType === SubsidiaryViewType.MASTER_MANAGEMENT && !AppData.isOneworksMaster ? LangHelper.getSingleResource("WhiteLabel") : LangHelper.getSingleResource("Subsidiary")}
                            </label>
                            {this._renderSubsidiaryTreeView()}
                        </div>
                    </div>)}
                    <div className='col-12 col-sm-4 col-md-2 col-xl-2'>
                        <div className='form-group'>
                            <label className='label-text'>{LangHelper.getSingleResource('Currency')}</label>
                            {this._renderCurrencySelectList()}
                        </div>
                    </div>
                    {showSubsidiarySearch && <div className='col-12 col-sm-3 col-md-2 col-xl-2'>
                        <div className="form-group">
                            <CheckBox id="SubsidiarySearch"
                                checked={this.props.subsidiarySearch}
                                onChange={checked => this.props.setSubsidiarySearch(checked)}
                                label={LangHelper.getSingleResource("SubsidiarySearch")} />
                        </div>
                    </div>}
                    <div className='col-12 col-sm-3 col-md-2 col-xl-1'>
                        <div className='form-group button-group'>
                            <button type='button' className='btn btn-submit'
                                disabled={(this.props.subsidiarySearch && !this.props.selectedSubsidiary) || !this.props.selectedCurrency}
                                onClick={this.submit}>{LangHelper.getSingleResource('Submit')}</button>
                        </div>
                    </div>
                    < div className='caret-block'>
                        {this._renderUserGuide()}
                    </div>
                </div>
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    const { ...rest } = state;
    return Object.assign({}, rest);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);