import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MultipleSelect from '@9softstudio/react-multiselect';

import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/lib/langHelper';
import AppData from '@jsroot/lib/AppData';
import { DatePicker } from '@jsroot/components/date-range/index';

export const FormFilter = (props) => {
    const { productOptions, currencyList } = AppData;

    const productChangeHandler = (currentItem, selectedItemsKey) => {
        props.setSelectedProduct(selectedItemsKey)
    }
    const renderProductSelectList = () => {
        return (
            <MultipleSelect id="ProductList"
                language={LangHelper.currentLanguage}
                dataSource={productOptions}
                keyField={"Code"}
                valueField={"Name"}
                statusField={"Status"}
                onChange={productChangeHandler} />
        );
    }

    const renderCurrencySelectList = () => {
        return (
            <MultipleSelect id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"Key"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedCurrency(selectedItemsKey)} />);
    }

    const handleChangeDate = (momentDate) => {
        console.log(momentDate.format("DD/MM/YYYY"));
    }

    const submit = (event) => {
        event.preventDefault();
        const params = getParams();

        console.log(params);
        //props.setReportTitle(Service.getTitle(null, null, params.IsConvertAll ? params.BaseCurrencyName : ''));
        props.setRequestParam(params);
        //props.toggleLoader(true);
        //props.getGridData(ApiUrl.RUNNING_DATA_URL, params);
    }

    const getParams = () => {
        const { pageSize, sortBy, sortOrder } = props.requestParam;

        return {
            pageSize,
            pageIndex: 1,
            productCodeList: props.selectedProduct,
            currencyIdList: props.selectedCurrency,
            sortBy,
            sortOrder
        }
    }

    const { dateConstraint, selectedDate } = props;

    return (
        <div className="page-filter">
            <div className="row">
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
                        <DatePicker
                            minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate} date={selectedDate}
                            onChange={handleChangeDate} />
                    </div>
                </div>
                {
                    productOptions && productOptions.length ? (
                        <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                            <div className="form-group">
                                <label className="label-text">{LangHelper.getSingleResource("Product")}</label>
                                {renderProductSelectList()}
                            </div>
                        </div>
                    ) : null
                }

                {
                    currencyList && currencyList.length ? (
                        <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                            <div className="form-group">
                                <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                                {renderCurrencySelectList()}
                            </div>
                        </div>
                    ) : null
                }

                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" className="btn btn-submit" onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, selectedProduct, selectedCurrency, selectedDate, dateConstraint } = state;
    return Object.assign({}, { requestParam, selectedProduct, selectedCurrency, selectedDate, dateConstraint });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);