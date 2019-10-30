import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MultipleSelect from '@9softstudio/react-multiselect';

import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/lib/langHelper';
import AppData from '@jsroot/lib/AppData';
import { DatePicker } from '@9softstudio/react-datepicker';

export const FormFilter = (props) => {
    const { productOptions, currencyList } = AppData;
    const { requestParam } = props;
    const { productCodes, date, pageSize, pageIndex, sortBy, sortOrder } = requestParam;

    const [selectedProduct, setSelectedProduct] = useState(productCodes);
    const [selectedCurrency, setSelectedCurrency] = useState(requestParam.selectedCurrency);
    const [selectedDate, setSelectedDate] = useState(date);

    const renderProductSelectList = () => {
        return (
            <MultipleSelect id="ProductList"
                language={LangHelper.currentLanguage}
                dataSource={productOptions}
                keyField={"Code"}
                valueField={"Name"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => setSelectedProduct(selectedItemsKey)} />
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
                onChange={(currentItem, selectedItemsKey) => setSelectedCurrency(selectedItemsKey)} />);
    }

    const submit = (event) => {
        event.preventDefault();
        const params = {
            pageSize: 50,
            pageIndex: 1,
            sortBy,
            sortOrder,
            selectedCurrency,
            productCodes: selectedProduct,
            date: selectedDate
        };

        props.setRequestParam(params);
    }

    const { dateConstraint } = props;
    const dateParts = selectedDate.split('/');
    const dateString = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;

    return (
        <div className="page-filter">
            <div className="row">
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
                        <DatePicker format="DD/MM/YYYY"
                            minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate} date={dateString}
                            onChange={(momentDate) => setSelectedDate(momentDate.format("MM/DD/YYYY"))} />
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
    const { setRequestParam } = ActionCreators;
    return bindActionCreators({ setRequestParam }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, dateConstraint } = state;
    return Object.assign({}, { requestParam, dateConstraint });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);