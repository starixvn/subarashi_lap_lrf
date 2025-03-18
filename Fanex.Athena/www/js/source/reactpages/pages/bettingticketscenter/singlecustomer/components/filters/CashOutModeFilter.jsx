import React, { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Select from 'react-select'
import AppData from '@jsroot/lib/AppData';
import { CashOutMode, ProductCode } from './../../../common/lib/constants'


export const CashOutModeFilter = () => {
    const dispatch = useDispatch();
    const [selectedCashOutMode, isEnableCashOutFilter ] = useSelector(state => [state.selectedCashOutMode, state.isEnableCashOutFilter], shallowEqual);
    const {setSelectedCashOutMode, setSelectedProduct, setProductList} = ActionCreators;

    const onCashOutModeChangeHandler = (item) => {
        if (item.value === CashOutMode.ViewCOOnly) {
            const selectedProduct = AppData.productList.filter(product => product.id == ProductCode.SportsBook)
                .map(product => product.id)
                .join(',');
            const productList = AppData.productList.map(product => product.id == ProductCode.SportsBook ? product : { ...product, status: false });
            dispatch(setSelectedProduct(selectedProduct));
            dispatch(setProductList(productList));
        }
        dispatch(setSelectedCashOutMode(item.value));
    };

    const _renderCashOutFilter = () => {
        const cashOutModeList = AppData.cashOutModeList;

        return cashOutModeList && cashOutModeList.length && (
            <Select
                instanceId="CashOutMode"
                value={selectedCashOutMode}
                options={cashOutModeList}
                disabled={!isEnableCashOutFilter}
                onChange={onCashOutModeChangeHandler} />
        );
    }
    return (
        <div className="form-group">
            <label className="label-text">{LangHelper.getSingleResource("CashOut")}</label>
            {_renderCashOutFilter()}
        </div>
    )
}

export default memo(CashOutModeFilter);