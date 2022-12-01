import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import CollapsiblePanel from '@jsroot/components/collapsible-panel';
import LangHelper from '@jsroot/lib/langHelper';
import AppData from '@jsroot/lib/AppData';
import Site from '@jsroot/lib/site';
import ActionCreators from '../actions';
import { DateRange } from '@jsroot/components/date-range';
import MultipleSelect from '@9softstudio/react-multiselect';
import moment from 'moment'
import CheckBox from '@jsroot/components/CheckBox'
import AutoComplete from '@jsroot/components/auto-complete'
import { ToastContainer, toast, Flip } from 'react-toastify';
import { ApiUrl, ViewInLevel } from '../common/constants'
import Service from '../common/service'
import DataService from '@jsroot/lib/DataService.js'
import UserGuide from '@jsroot/components/UserGuide'

export const FormFilter = props => {
    const [isConvertAllToBaseCurrency, setConvertAllToBaseCurrency] = useState(true);
    const [leagueName, setLeagueName] = useState('');
    const [refNo, setRefNo] = useState("");
    const [ip, setIp] = useState('');
    const [viewIn, setViewIn] = useState(2);
    const [baseCurrencyList, setBaseCurrencyList] = useState(AppData.baseCurrencyList);

    useEffect(() => {

    }, []);

    const isSingleDate = dateRange => {
        const { fromDate, toDate } = dateRange || props.dateRange;
        return moment(fromDate, "MM/DD/YYYY", true).isSame(moment(toDate, "MM/DD/YYYY", true), 'day');
    }

    const _onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            props.setDateRange(range);
        } else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", AppData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    }

    const _renderDateFilter = () => {
        const dateConstraint = AppData.dateConstraint;
        return (
            <DateRange
                startDate={props.dateRange.fromDate} endDate={props.dateRange.toDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={props.dateRange.toDate} limitedMonthRange={dateConstraint.limitedMonthRange}
                onChange={_onChangeDateRange}
            />
        )
    }

    const _renderBaseCurrencySelectList = () => {
        const selectedBaseCurrency = props.selectedBaseCurrency;
        return baseCurrencyList && baseCurrencyList.length && (
            <Select instanceId="baseCurrency"
                value={selectedBaseCurrency}
                options={baseCurrencyList}
                onChange={(item) => props.setSelectedBaseCurrency(item.value)} />
        );
    }

    const _renderSportSelectList = () => {
        const sportList = AppData.sportList;

        return sportList && sportList.length && (
            <MultipleSelect id="SportList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={sportList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedSport(selectedItemsKey)} />
        );
    }

    const _renderBettypeSelectList = () => {
        const bettypeList = AppData.bettypeList;

        return bettypeList && bettypeList.length && (
            <MultipleSelect id="BettypeList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={bettypeList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedBettype(selectedItemsKey)} />
        );
    }

    const _renderReasonList = () => {
        const reasonList = AppData.reasonList;

        return reasonList && reasonList.length && (
            <MultipleSelect id="ReasonList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={reasonList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => props.setReasonList(selectedItemsKey)} />
        );
    }


    const _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;

        return currencyList && currencyList.length && (
            <MultipleSelect id="CurrencyList"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => onChangeCurrency(selectedItemsKey)} />);
    }

    const onChangeCurrency = (currencyIdList) => {
        let baseCurrency = "";
        let newBaseCurrencyList;

        if (!currencyIdList || currencyIdList.indexOf(',') > 0) { // none or multi currencies
            newBaseCurrencyList = AppData.baseCurrencyList;
            baseCurrency = newBaseCurrencyList.find(x => x.label === props.selectedBaseCurrency) ?
                props.selectedBaseCurrency :
                AppData.defaultBaseCurrency;
            setBaseCurrencyList(newBaseCurrencyList);
        }
        else {
            const currencyName = AppData.currencyList.find(x => x.Id == currencyIdList).Value;
            baseCurrency = currencyName;

            if (!baseCurrencyList.find(x => x.label === currencyName)) {
                newBaseCurrencyList = AppData.baseCurrencyList.slice(0);
                newBaseCurrencyList.push({ value: baseCurrency, label: currencyName });
                setBaseCurrencyList(newBaseCurrencyList);
            }
            else {
                baseCurrency = currencyName;
            }
        }

        props.setSelectedCurrency(currencyIdList);
        props.setSelectedBaseCurrency(baseCurrency);
    }

    const onChangeViewIn = (viewIn) => {
        props.setUsername("");
        setIp("");
        setRefNo("");
        props.setSelectedCurrency(AppData.defaultCurrency);
        props.setSelectedBaseCurrency(AppData.defaultBaseCurrency);
        setViewIn(viewIn);
    }

    const _renderStatusList = () => {
        const statusList = AppData.statusList;

        return statusList && statusList.length && (
            <MultipleSelect id="StatusList"
                language={LangHelper.currentLanguage}
                dataSource={statusList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedStatus(selectedItemsKey)} />);
    }

    const showUserGuide = () => {
        const userGuideContent = props.userGuideContent;

        if (!userGuideContent || userGuideContent.length === 0) {
            props.getUserGuideContent('AbnormalBet');
        }
    }

    const _renderUserGuide = () => {
        const userGuideContent = props.userGuideContent;

        return (<UserGuide 
                title={LangHelper.getSingleResource("UserGuide")} 
                contentTitle={LangHelper.getSingleResource("AbnormalBet")}
                onClick={showUserGuide}
                content={userGuideContent} />)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const params = getParams();
        if (!params) {
            return;
        }

        toast.dismiss();
        const title = Service.getTitle(params.FromDate, params.ToDate, params.ViewIn, params.CurrencyName, params.BaseCurrencyName, params.UserName);
        props.setReportTitle(title);
        props.setRequestParam(params);
        props.toggleLoader(true);
        props.getReportData(ApiUrl.REPORT_DATA_URL, params);
    }

    const getParams = () => {
        if (!isValidModel()) {
            return null;
        }

        const { fromDate, toDate } = props.dateRange;
        const { PageSize, SortBy, SortOrder } = props.requestParam;

        const selectedCurrencyArray = props.selectedCurrency.split(',');
        const selectedSportArray = props.selectedSport.split(',');
        const selectedBettypeArray = props.selectedBettype.split(',');
        const selectedReasonArray = props.selectedReason.split(',');

        const currencyText = selectedCurrencyArray.length === AppData.currencyList.length ? 'All'
            : AppData.currencyList.filter(item => selectedCurrencyArray.includes(item.Id.toString())).map(item => item.Value).join(',');

        const baseCurrency = baseCurrencyList.find(x => x.value === props.selectedBaseCurrency);
        return {
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            CurrencyIdList: props.selectedCurrency,
            BaseCurrency: props.selectedBaseCurrency,
            StatusIdList: props.selectedStatus,
            SportIdList: AppData.sportList.length === selectedSportArray.length ? 'All' : props.selectedSport,
            BetTypeIdList: AppData.bettypeList.length === selectedBettypeArray.length ? 'All' : props.selectedBettype,
            ReasonIdList: AppData.reasonList.length === selectedReasonArray.length ? 'All' : props.selectedReason,
            LeagueName: leagueName,
            UserName: props.username,
            RefNo: refNo === "" ? 0 : refNo,
            Ip: ip,            
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsConvertAllToBaseCurrency: isConvertAllToBaseCurrency,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            CurrencyName: currencyText ? currencyText : '',
            LicenseeName: AppData.licenseeName,
            IsShowIpvn: AppData.IsShowIpvn,
            ViewIn: viewIn
        }
    }


    const isValidModel = () => {
        const result = !!props.selectedProduct
            && !!props.selectedStatus
            && !!props.selectedCurrency
            && !!props.selectedSport
            && !!props.selectedBettype
            && !!props.selectedReason
            && !!props.selectedBaseCurrency;

        return result;
    }


    const exportExcel = (event) => {
        event.preventDefault();
        let exportParam = props.requestParam;

        if (!exportParam || Site.isEmptyObject(exportParam)) {
            exportParam = getParams();
        }
        
        props.toggleLoader(true);
        DataService.getReportFile(ApiUrl.EXPORT_REPORT_DATA_URL[exportParam.ViewIn], exportParam).then((response) => {
            toast.dismiss();
            const NoContentStatusCode = 204;
            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            }
            else {
                const fileName = `${ApiUrl.EXPORT_REPORT_TITLE[exportParam.ViewIn]}.xls`;
                Site.downloadFile(response.data, fileName);
            }
            props.toggleLoader(false);
        }).catch(error => {
            alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
            props.toggleLoader(false);
        });
    }

    const excelButton = <div>
        <i className="icon-excel right" onClick={exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
        {_renderUserGuide()}
    </div>;

    return (
        <>
            <CollapsiblePanel className="page-filter" stickyFooter={excelButton}>
                <div className="row">
                    <ToastContainer
                        autoClose={10000}
                        pauseOnFocusLoss={false}
                        style={{ width: "500px" }}
                        transition={Flip} />
                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
                            {_renderDateFilter()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Sport")}</label>
                            {_renderSportSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("BetType")}</label>
                            {_renderBettypeSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("League")}</label>
                            <input className="input-text" id="LeagueName" name="LeagueName" type="text" value={leagueName} placeholder={LangHelper.getSingleResource("LeagueName")}
                                onChange={(event) => setLeagueName(event.target.value)} />
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Live")}</label>
                            {_renderStatusList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Reason")}</label>
                            {_renderReasonList()}
                        </div>
                    </div>

                </div>
                <div className="row">
                    {viewIn !== ViewInLevel.SUMMARY &&
                        <>
                            <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                                <div className="form-group">
                                    <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                                    <input className="input-text" id="username" name="username" type="text" value={props.username} placeholder={LangHelper.getSingleResource("ExternalIdOrSystemId") }
                                        onChange={(event) => props.setUsername(event.target.value)} />
                                </div>
                            </div>
                            <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                                <div className="form-group">
                                    <label className="label-text">{LangHelper.getSingleResource("IP")}</label>
                                    <input className="input-text" id="Ip" name="Ip" type="text" value={ip} placeholder={LangHelper.getSingleResource("SearchByExtractIp") }
                                        onChange={(event) => setIp(event.target.value)} />
                                </div>
                            </div>
                        </>
                    }
                    {viewIn === ViewInLevel.DETAIL && <>
                        <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                            <div className="form-group">
                                <label className="label-text">{LangHelper.getSingleResource("RefNo")}</label>
                                <input className="input-text" id="RefNo" name="RefNo" type="number" value={refNo}
                                    onChange={(event) => setRefNo(event.target.value)} />
                            </div>
                        </div>
                        <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                            <div className="form-group">
                                <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                                {_renderCurrencySelectList()}
                            </div>
                        </div>
                        <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                            <div className="form-group">
                                <label className="label-text">{LangHelper.getSingleResource("BaseCurrency")}</label>
                                {_renderBaseCurrencySelectList()}
                            </div>
                        </div>                        
                        <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                            <div className="form-group">
                                <CheckBox id="ConvertAllFiguresToBaseCurrency"
                                    checked={isConvertAllToBaseCurrency}
                                    onChange={(checked) => setConvertAllToBaseCurrency(checked)}
                                    label={LangHelper.getSingleResource("ConvertAllFiguresToBaseCurrency")} />
                            </div>
                        </div>
                    </>}
                </div>

                <div className="row" style={{ marginTop: "20px"}}>
                    <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-3">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Viewin").replace("{0}", ":") }</label>
                                <div className='view-in-group'>
                                <input type="radio" value={0} checked={viewIn == ViewInLevel.SUMMARY} name="ViewIn" id="viewinsummary"
                                    onChange={() => onChangeViewIn(0) } />
                                <label htmlFor="viewinsummary">{LangHelper.getSingleResource("Summary")}</label>
                                <input type="radio" value={1} name="ViewIn" id="viewinipsummary" checked={viewIn == ViewInLevel.IPSUMMARY}
                                    onChange={() => onChangeViewIn(1)} />
                                <label htmlFor="viewinipsummary">{LangHelper.getSingleResource("IpSummary")}</label>
                                <input type="radio" value={2} name="ViewIn" id="viewindetail" checked={viewIn == ViewInLevel.DETAIL}
                                    onChange={() => onChangeViewIn(2)} />
                                <label htmlFor="viewindetail">{LangHelper.getSingleResource("Detail")}</label>
                                </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" disabled={!isValidModel()} className="btn btn-submit" onClick={onSubmit}>{LangHelper.getSingleResource("Submit")}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </CollapsiblePanel>
        </>);
}


function mapStateToProps(state) {
    const { requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedReason, userGuideContent, username } = state;

    return Object.assign({}, {
        requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedReason, userGuideContent, username
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);