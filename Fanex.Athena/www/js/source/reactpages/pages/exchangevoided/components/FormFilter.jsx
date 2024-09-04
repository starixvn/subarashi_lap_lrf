import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LangHelper from '../../../lib/langHelper';
import { DatePicker } from '@legion-lib/react-daterangepicker';
import Note from './Note';
import CollapsiblePanel from '@jsroot/components/collapsible-panel';
import Select from 'react-select'
import AppData from '@jsroot/lib/AppData';
import RadioGroup from '@jsroot/components/radio/RadioGroup';
import { DefaultPagingOption, ExchangeMode, ExchangeViewModeOptions, SortBy, SortOrder } from '../lib/constants';
import MultipleSelect from '@legion-lib/react-multiselect';
import CheckBox from '@jsroot/components/CheckBox';

export class FormFilter extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { ...this.props.requestParam, isFilterCollapsing: false, viewInMode: ExchangeMode.Running, baseCurrencyList: AppData.baseCurrencyList };
    }

    submit = (event) => {
        event.preventDefault();
        const { isFilterCollapsing, viewInMode, ...inputParam } = this.state;
        this.props.setSelectedExchangeMode(viewInMode);
        let params = {};
        if(viewInMode == ExchangeMode.Running){
            params = {
                pageIndex: 1,
                userName: inputParam.userName,
                baseCurrency: this.props.selectedBaseCurrency,
                currencyIdList: this.props.selectedCurrency,
                isConvertAllToBaseCurrency: this.props.isConvertAll,
                pageSize: DefaultPagingOption.PageSize,
                sortBy: SortBy.BetPlaced,
                sortOrder: SortOrder.DESC,
                submitTime: new Date().getTime()
            }
        }
        else
        {
            params = {
                ...inputParam,
                pageIndex: 1,
                timeZone: this.props.selectedTimeZone,
                submitTime: new Date().getTime()
            };
        }
        this.props.setRequestParam(params);
    }

    exportExcel = (event) => {
        event.preventDefault();
        
        const { selectedExchangeMode } = this.props;

        if (selectedExchangeMode == ExchangeMode.Running){
            this.exportRunningExcel()
        }
        else{
            this.exportVoidExcel();
        }

    }

    exportRunningExcel = () =>{
        const {exportRunningTicketExcel, requestParam} = this.props;
        exportRunningTicketExcel(requestParam);
    }

    exportVoidExcel = () => {
        const { gridData } = this.props;
        if (!gridData.dataList) {
            window.alert(LangHelper.getSingleResource("NoInfo"));
            return;
        }
        const timezone = AppData.timeZoneList.find(x => x.value === this.props.selectedTimeZone).label;
        const reportTitle = `${LangHelper.getSingleResource('BettingTicketCenter')}, ${timezone}, ${this.state.selectedDate}`;
        this.props.exportExcel(gridData.dataList, reportTitle);
    }

    handleChangeDate = (momentDate) => {
        this.setState({ selectedDate: momentDate.format("MM/DD/YYYY") });
    }

    handleChangeInput = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleCollapse = (isCollapse) => {
        this.setState({ isFilterCollapsing: isCollapse });
    }

    handleChangeViewMode = (value) => {
        this.setState(
            { 
                viewInMode: value, 
                userName: "", 
                refNo: "",  
                selectedDate: AppData.defaultDate, 
             });
        this.props.setSelectedBaseCurrency(AppData.defaultBaseCurrency);
        this.props.setSelectedCurrency(AppData.defaultCurrency);
        this.props.setSelectedTimeZone(AppData.defaultTimeZone);
        this.props.changeIsConvertAll(true);
    }

    _renderSelectedTimeZone = () => {
        const timeZoneList = AppData.timeZoneList;

        return timeZoneList && timeZoneList.length && (
            <Select instanceId="TimeZoneList"
                value={this.props.selectedTimeZone}
                options={timeZoneList}
                onChange={(item) => this._onChangeTimeZone(item.value)} />
        );
    }

    _onChangeTimeZone = (value) => {
        this.props.setSelectedTimeZone(value);
    }

    _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;

        return currencyList && currencyList.length ? (
            <MultipleSelect id="CurrencyList"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => this._onChangeCurrency(selectedItemsKey)} />) : <></>;

    }

    _onChangeCurrency = (currencyIdList) => {
        let baseCurrency = "";
        let newBaseCurrencyList;

        if (!currencyIdList || currencyIdList.indexOf(',') > 0) { // none or multi currencies
            newBaseCurrencyList = AppData.baseCurrencyList;
            baseCurrency = newBaseCurrencyList.find(x => x.label === this.props.selectedBaseCurrency) ?
                this.props.selectedBaseCurrency :
                AppData.defaultBaseCurrency;
            this.setState({baseCurrencyList:  newBaseCurrencyList});
        }
        else {
            const currencyName = AppData.currencyList.find(x => x.id == currencyIdList).value;
            baseCurrency = currencyName;

            if (!this.state.baseCurrencyList.find(x => x.label === currencyName)) {
                newBaseCurrencyList = AppData.baseCurrencyList.slice(0);
                newBaseCurrencyList.push({ value: baseCurrency, label: currencyName });
                this.setState({baseCurrencyList: newBaseCurrencyList});
            }
            else {
                baseCurrency = currencyName;
            }
        }

        this.props.setSelectedCurrency(currencyIdList);
        this.props.setSelectedBaseCurrency(baseCurrency);
    }

    _renderBaseCurrencySelectList = () => {
        const selectedBaseCurrency = this.props.selectedBaseCurrency;
        const {baseCurrencyList} = this.state;
        return baseCurrencyList && baseCurrencyList.length ? (
            <Select instanceId="baseCurrency"
                value={selectedBaseCurrency}
                options={baseCurrencyList}
                onChange={(item) => this.props.setSelectedBaseCurrency(item.value)} />
        ) : <></>;
    }
    _renderVoidTicketFilter = () => {
        const { dateConstraint } = this.props;
        const { selectedDate } = this.state;
        return <>
            <div className="col-12 col-sm-7 col-md-3 col-xl-2">
                <div className="form-group">
                    <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                    <DatePicker
                        minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate} date={selectedDate}
                        onChange={this.handleChangeDate}
                        langHandler={(key) => key === "May" ? LangHelper.getSingleResource("May2") : LangHelper.getSingleResource(key)} />
                </div>
            </div>

            <div className="col-12 col-sm-7 col-md-3 col-xl-2">
                <div className="form-group">
                    <label className="label-text">{LangHelper.getSingleResource('TimeZone')}</label>
                    {this._renderSelectedTimeZone()}
                </div>
            </div>

            <div className="col-12 col-sm-4 col-md-3 col-xl-2">
                <div className="form-group">
                    <label className="label-text">{LangHelper.getSingleResource('RefNo')}</label>
                    <input className="input-text" id="refNo" name="refNo" type="text" autoComplete="off"
                        placeholder={LangHelper.getSingleResource("RefNo")} onChange={this.handleChangeInput} />
                </div>
            </div>

            <div className="col-12 col-sm-4 col-md-3 col-xl-2">
                <div className="form-group">
                    <label className="label-text">{LangHelper.getSingleResource('Username')}</label>
                    <input className="input-text" id="userName" name="userName" type="text" autoComplete="off"
                        placeholder={LangHelper.getSingleResource("ExternalIdOrSystemId")} onChange={this.handleChangeInput} />
                </div>
            </div>
        </>
    }

    _renderRunningTicketFilter = () => {
        return <>
            <div className="col-12 col-sm-4 col-md-3 col-xl-2">
                <div className="form-group">
                    <label className="label-text">{LangHelper.getSingleResource('Username')}</label>
                    <input className="input-text" id="userName" name="userName" type="text" autoComplete="off"
                        placeholder={LangHelper.getSingleResource("ExternalIdOrSystemId")} onChange={this.handleChangeInput} />
                </div>
            </div>
            <div className='col-12 col-sm-4 col-md-2 col-xl-2'>
                <div className='form-group'>
                    <label className='label-text'>{LangHelper.getSingleResource('Currency')}</label>
                    {this._renderCurrencySelectList()}
                </div>
            </div>
            <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                <div className="form-group">
                    <label className="label-text">{LangHelper.getSingleResource("BaseCurrency")}</label>
                    {this._renderBaseCurrencySelectList()}
                </div>
            </div>
            <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                <div className="form-group">
                    <CheckBox id="ConvertAllFiguresToBaseCurrency"
                        checked={this.props.isConvertAll}
                        onChange={(checked) => this.props.changeIsConvertAll(checked)}
                        label={LangHelper.getSingleResource("ConvertAllFiguresToBaseCurrency")} />
                </div>
            </div>
        </>
    }

    render() {

        const { isFilterCollapsing, viewInMode } = this.state;
        const iconToggle = {
            tag: 'div',
            className: isFilterCollapsing ? 'chevron down' : 'chevron up',
            style: {}
        }
        const isDisableSubmitBtn = viewInMode == ExchangeMode.Running ? this.props.selectedCurrency == "" : false;

        return (
            <CollapsiblePanel className="page-filter" iconToggle={iconToggle}
                onCollapse={() => this.handleCollapse(true)} onExpand={() => this.handleCollapse(false)}>
                <div className='row'>
                    <div className='col-12'>
                        <RadioGroup className='form-group' label={LangHelper.getSingleResource('Viewin2')}
                            name='ExchangeTicketType' options={ExchangeViewModeOptions} value={ExchangeMode.Running}
                            onChange={this.handleChangeViewMode} />
                    </div>
                </div>

                <div className="row">
                    {viewInMode == ExchangeMode.Running ? this._renderRunningTicketFilter() : this._renderVoidTicketFilter()}

                    <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" className="btn btn-submit" disabled={isDisableSubmitBtn}
                                    onClick={this.submit}>{LangHelper.getSingleResource("Submit")}</button>
                            </div>
                        </div>
                    </div>

                    <div className="caret-block">
                        <i className="icon-excel right" onClick={this.exportExcel} title={LangHelper.getSingleResource('ExportToExcel')}></i>
                    </div>
                </div>
                { viewInMode == ExchangeMode.Void &&<Note /> }
            </CollapsiblePanel>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam, exportExcel, exportRunningTicketExcel, setSelectedTimeZone, changeIsConvertAll, setSelectedBaseCurrency, setSelectedCurrency, setSelectedExchangeMode  } = ActionCreators;
    return bindActionCreators({ setRequestParam, exportExcel, exportRunningTicketExcel, setSelectedTimeZone, changeIsConvertAll, setSelectedBaseCurrency, setSelectedCurrency, setSelectedExchangeMode  }, dispatch);
}

function mapStateToProps(state) {
    const { requestParam, dateConstraint, gridData, selectedTimeZone, selectedBaseCurrency, selectedCurrency, isConvertAll, selectedExchangeMode } = state;
    return Object.assign({}, { requestParam, dateConstraint, gridData, selectedTimeZone, selectedBaseCurrency, selectedCurrency, isConvertAll, selectedExchangeMode  });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);