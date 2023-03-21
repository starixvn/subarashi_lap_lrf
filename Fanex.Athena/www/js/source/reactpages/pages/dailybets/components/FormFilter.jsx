import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/lib/langHelper';
import AppData from '@jsroot/lib/AppData';
import { DatePicker } from '@9softstudio/react-datepicker';
import { getFormattedDate } from '../lib/utils';
import { renderProductSelectList, renderCurrencySelectList, renderSportSelectList } from '../lib/formFilterUtils';

export const FormFilter = (props) => {
    const { requestParam, sportList } = props;
    const { productCodeList, currencyIdList, date, pageSize, sortBy, sortOrder } = requestParam;

    const sportCodeList = sportList.map(item => item.Key).join(',');

    const [selectedProduct, setSelectedProduct] = useState(productCodeList);
    const [selectedCurrency, setSelectedCurrency] = useState(currencyIdList);
    const [selectedSport, setSelectedSport] = useState(sportCodeList);
    const [selectedDate, setSelectedDate] = useState(date);

    useEffect(() => {
        setSelectedSport(sportCodeList);
    },[sportCodeList])

    const handleChangeCurrency = (currentItem, selectedItemsKey) => setSelectedCurrency(selectedItemsKey);
    const handleChangeSport = (currentItem, selectedItemsKey) => setSelectedSport(selectedItemsKey);

    const buildParam = () => ({
        pageSize: pageSize,
        pageIndex: 1,
        sortBy,
        sortOrder,
        currencyIdList: selectedCurrency,
        productCodeList: selectedProduct,
        gameCodes: selectedSport,
        date: selectedDate
    });

    const handleChangeProduct = (currentItem, selectedItemsKey) => {
        const param = {productCode: selectedItemsKey}
        props.getSportList(param)
        setSelectedProduct(selectedItemsKey);
    };

    const submit = (event) => {
        event.preventDefault();
        const params = buildParam();

        props.setRequestParam(params);
    }

    const exportExcel = (event) => {
        event.preventDefault();
        const params = buildParam();
        props.exportExcel(params);
    }

    const { productOptions, currencyList } = AppData;
    const { dateConstraint } = props;
    const dateString = getFormattedDate(selectedDate);

    const isValidParam = !!selectedProduct && !!selectedCurrency && (!sportList || !!selectedSport);

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
                                {renderProductSelectList(productOptions, handleChangeProduct)}
                            </div>
                        </div>
                    ) : null
                }
                {
                    sportList && sportList.length ? (
                        <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Sport")}</label>
                            {renderSportSelectList(sportList, handleChangeSport)}
                        </div>
                    </div>
                    ) : null
                }

                {
                    currencyList && currencyList.length ? (
                        <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                            <div className="form-group">
                                <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                                {renderCurrencySelectList(currencyList, handleChangeCurrency)}
                            </div>
                        </div>
                    ) : null
                }

                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" className="btn btn-submit" disabled={!isValidParam}
                                onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>

                <div className="caret-block">
                    <i className="icon-excel right" onClick={exportExcel} title={LangHelper.getSingleResource('ExportToExcel')}></i>
                </div>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam, exportExcel, getSportList } = ActionCreators;
    return bindActionCreators({ setRequestParam, exportExcel, getSportList }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, dateConstraint, sportList } = state;
    return Object.assign({}, { requestParam, dateConstraint, sportList });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);