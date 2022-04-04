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
import { ApiUrl, ReportLevel } from '../common/constants'
import Service from '../common/service'
import DataService from '@jsroot/lib/DataService.js'

export const FormFilter = props => {
    const [isGroupInOriginalCurrency, setGroupInOriginalCurrency] = useState(true);
    const [leagueName, setLeagueName] = useState('');
    const [showBA, setShowBA] = useState(false);
    const [baseCurrencyList, setBaseCurrencyList] = useState(AppData.baseCurrencyList);

    useEffect(() => {
        onChangeProduct(props.selectedProduct);
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

    const _renderProductSelectList = () => {
        const productOptions = AppData.productOptions;

        return productOptions && productOptions.length && (
            <MultipleSelect id="ProductList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={productOptions}
                keyField={"Code"}
                valueField={"Name"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => onChangeProduct(selectedItemsKey)} />
        );
    }

    const _renderSportSelectList = () => {
        const sportList = props.sportList;

        return sportList && sportList.length && (
            <MultipleSelect id="SportList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={sportList}
                keyField={"value"}
                valueField={"label"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedSport(selectedItemsKey)} />
        );
    }

    const _renderBettypeSelectList = () => {
        const bettypeList = props.bettypeList;

        return bettypeList && bettypeList.length && (
            <MultipleSelect id="BettypeList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={bettypeList}
                keyField={"value"}
                valueField={"label"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedBettype(selectedItemsKey)} />
        );
    }

    const onChangeProduct = (productCode) => {
        const productArray = productCode.split(",");
        const BAIndex = productArray.indexOf("BA");

        if (BAIndex !== -1) {
            productArray.splice(BAIndex, 1);
            setShowBA(true);
        }
        else {
            setShowBA(false);
        }
        let newProductCode = productArray.join(",");

        newProductCode = newProductCode === "" && BAIndex !== -1 ? "BA" : newProductCode;
        props.setSelectedProduct(newProductCode);
        props.getSportList(newProductCode, isSingleDate() && props.dateRange.fromDate);
        props.getBettypeList(newProductCode, isSingleDate());
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

    const _renderStatusSelectList = () => {
        const statusList = AppData.statusList;

        return statusList && statusList.length && (
            <MultipleSelect id="StatusList"
                language={LangHelper.currentLanguage}
                dataSource={statusList}
                keyField={"value"}
                valueField={"label"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedStatus(selectedItemsKey)} />);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const params = getParams();
        if (!params) {
            return;
        }

        toast.dismiss();
        const title = Service.getTitle(params.FromDate, params.ToDate, params.CurrencyName, params.BaseCurrencyName, params.UserName);
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

        const currencyText = selectedCurrencyArray.length === AppData.currencyList.length ? 'All'
            : AppData.currencyList.filter(item => selectedCurrencyArray.includes(item.Id.toString())).map(item => item.Value).join(',');

        const baseCurrency = baseCurrencyList.find(x => x.value === props.selectedBaseCurrency);
        return {
            PageSize: PageSize,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            ProductCodeList: props.selectedProduct,
            CurrencyIdList: props.selectedCurrency,
            BaseCurrency: props.selectedBaseCurrency,
            StatusIdList: props.selectedStatus,
            SportIdList: props.sportList.length === selectedSportArray.length ? 'All' : props.selectedSport,
            BetTypeIdList: props.bettypeList.length === selectedBettypeArray.length ? 'All' : props.selectedBettype,
            LeagueName: leagueName,
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsGroupInOriginalCurrency: isGroupInOriginalCurrency,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            CurrencyName: currencyText ? currencyText : '',
            ShowBA: showBA,
            DrillDownLevel: ReportLevel.MAIN,
            UserName: props.username,
        }
    }


    const isValidModel = () => {
        const result = !!props.selectedProduct
            && !!props.selectedStatus
            && !!props.selectedCurrency
            && !!props.selectedSport
            && !!props.selectedBettype
            && !!props.selectedBaseCurrency;

        return result;
    }


    const exportExcel = (event) => {
        event.preventDefault();
        let exportParam = props.requestParam;

        if (!exportParam || Site.isEmptyObject(exportParam)) {
            exportParam = getParams();
        }

        const exportRequestParam = {
            ...exportParam,
            IsExportExcel: true
        };
        
        props.toggleLoader(true);
        DataService.getReportFile(ApiUrl.EXPORT_REPORT_DATA_URL, exportRequestParam).then((response) => {
            toast.dismiss();
            const NoContentStatusCode = 204;
            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            }
            else {
                const fileName = "WinLossByLeague.xls";
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
                            <label className="label-text">{LangHelper.getSingleResource("Product")}</label>
                            {_renderProductSelectList()}
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
                            <label className="label-text">{LangHelper.getSingleResource("League")}</label>
                            <input className="input-text" id="LeagueName" name="LeagueName" type="text" value={leagueName} placeholder={LangHelper.getSingleResource("LeagueName")}
                                onChange={(event) => setLeagueName(event.target.value)} />
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
                            <label className="label-text">{LangHelper.getSingleResource("Status")}</label>
                            {_renderStatusSelectList()}
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                            <AutoComplete url={ApiUrl.CUSTOMER_SEARCH_URL}
                                onSelect={(value) => props.setUsername(value)}
                                onInput={(value) => props.setUsername(value)}
                                htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
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

                    <div className="col-12 col-md-4 col-sm-3 col-lg-2 col-xl-3">
                        <div className="form-group">
                            <CheckBox id="IsGroupInOriginalCurrency"
                                checked={isGroupInOriginalCurrency}
                                onChange={(checked) => setGroupInOriginalCurrency(checked)}
                                label={LangHelper.getSingleResource("IsGroupInOriginalCurrency")} />
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
    const { requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, userGuideContent, username } = state;

    return Object.assign({}, {
        requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, userGuideContent, username
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);