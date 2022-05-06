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
import CheckBox from '@jsroot/components/CheckBox';
import UserGuide from '@jsroot/components/UserGuide';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { ApiUrl, ReportLevel } from '../common/constants';
import Service from '../common/service';
import DataService from '@jsroot/lib/DataService.js';

export const FormFilter = props => {
    const [isConvertAllToBaseCurrency, setConvertAllToBaseCurrency] = useState(true);
    const [isExcludeTest, setExcludeTest] = useState(true);
    const [username, setUsername] = useState('');
    const [baseCurrencyList, setBaseCurrencyList] = useState(AppData.baseCurrencyList);
    const [reportBy, setReportBy] = useState(1);
    const {} = props

    useEffect(() => {
        onChangeProduct(props.selectedProduct);
    }, []);

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
        return baseCurrencyList && baseCurrencyList.length ? (
            <Select instanceId="baseCurrency"
                value={selectedBaseCurrency}
                options={baseCurrencyList}
                onChange={(item) => props.setSelectedBaseCurrency(item.value)} />
        ) : <></>;
    }

    const _renderProductSelectList = () => {
        const productOptions = AppData.productOptions;

        return productOptions && productOptions.length ? (
            <MultipleSelect id="ProductList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={productOptions}
                keyField={"Code"}
                valueField={"Name"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => onChangeProduct(selectedItemsKey)} />
        ) : <></>;
    }

    const _renderPromotionTypeList = () => {
        const promotionTypeList = props.promotionTypeList;

        return promotionTypeList && promotionTypeList.length >= 0 ? (
            <MultipleSelect id="PromotionTypeList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={promotionTypeList}
                keyField={"value"}
                valueField={"label"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedPromotionTypes(selectedItemsKey)} />
        ) : <></>;
    }

    const onChangeProduct = (productCode) => {
        props.setSelectedProduct(productCode);
        props.getPromotionTypeList(productCode);
    }

    const _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;

        return currencyList && currencyList.length ? (
            <MultipleSelect id="CurrencyList"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => onChangeCurrency(selectedItemsKey)} />) : <></>;
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

    const showUserGuide = () => {
        const userGuideContent = props.userGuideContent;

        if (!userGuideContent || userGuideContent.length === 0) {
            props.getUserGuideContent('ExtraPayout');
        }
    }

    const _renderUserGuide = () => {
        const userGuideContent = props.userGuideContent;

        return (<UserGuide 
                title={LangHelper.getSingleResource("UserGuide")} 
                contentTitle={LangHelper.getSingleResource("ExtraPayout")}
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
        const title = Service.getTitle(params.FromDate, params.ToDate, params.CurrencyName, params.BaseCurrencyName, params.ProductCodeList, params.Username);
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

        const currencyText = selectedCurrencyArray.length === AppData.currencyList.length ? 'All' 
            : AppData.currencyList.filter(item => selectedCurrencyArray.includes(item.Id.toString())).map(item => item.Value).join(',');        

        const baseCurrency = baseCurrencyList.find(x => x.value === props.selectedBaseCurrency);
        return {
            PageSize: 50,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            ProductCodeList: props.selectedProduct, 
            CurrencyIdList: props.selectedCurrency,
            BaseCurrency: props.selectedBaseCurrency,
            ReportBy: reportBy,
            PromotionTypeIdList: props.selectedPromotionTypes,
            Username : username,
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsConvertAllToBaseCurrency: isConvertAllToBaseCurrency,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            CurrencyName: currencyText ? currencyText : '',
            DrillDownLevel: ReportLevel.MAIN,
            IsExcludedTestData: isExcludeTest
        }
    }

    
    const isValidModel = () => {
        const result = !!props.selectedProduct
            && !!props.selectedCurrency
            && !!props.selectedPromotionTypes
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
            ...exportParam
        };

        props.toggleLoader(true);
        DataService.getReportFile(ApiUrl.EXPORT_REPORT_DATA_URL, exportRequestParam).then((response) => {
            toast.dismiss();
            const NoContentStatusCode = 204;
            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            }
            else {
                const fileName = "ExtraPayout.xls";
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
                        <label className="label-text">{LangHelper.getSingleResource("Product")} *</label>
                        {_renderProductSelectList()}
                    </div>
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-3">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("PromotionType")}</label>
                        {_renderPromotionTypeList()}
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

            </div>
            <div className="row">
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                        <input className="input-text" id="Username" name="Username" type="text" value={username} placeholder={LangHelper.getSingleResource("ExternalIdOrSystemId")}
                                onChange={(event) => setUsername(event.target.value)} />
                    </div>
                </div>

                 <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <div className="form-group">
                               <label className="label-text">{LangHelper.getSingleResource("ReportBy")}</label>
                                <input type="radio" value={1} checked={reportBy == 1} name="ReportBy" id="reportbydaily"
                                onChange={() => setReportBy(1) } />
                                <label htmlFor="reportbydaily">{LangHelper.getSingleResource("Daily")}</label>
                                <input type="radio" value={2} name="ReportBy" id="reportbymonthly" checked={reportBy == 2}
                                        onChange={() => setReportBy(2)} />
                                <label htmlFor="reportbymonthly">{LangHelper.getSingleResource("Monthly")}</label>
                        </div>
                </div>

                 <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-3">
                    <div className="form-group">
                        <CheckBox id="ConvertAllFiguresToBaseCurrency"
                            checked={isConvertAllToBaseCurrency}
                            onChange={(checked) => setConvertAllToBaseCurrency(checked)}
                            label={LangHelper.getSingleResource("ConvertAllFiguresToBaseCurrency")} />
                    </div>
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <CheckBox id="ExcludeTest"
                            checked={isExcludeTest}
                            onChange={(checked) => setExcludeTest(checked)}
                            label={LangHelper.getSingleResource("ExcludeTestData")} />
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
    const { requestParam, dateRange, selectedProduct, promotionTypeList, selectedPromotionTypes, selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, userGuideContent } = state;

    return Object.assign({}, {
        requestParam, dateRange, selectedProduct, promotionTypeList, selectedPromotionTypes, selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, userGuideContent
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);