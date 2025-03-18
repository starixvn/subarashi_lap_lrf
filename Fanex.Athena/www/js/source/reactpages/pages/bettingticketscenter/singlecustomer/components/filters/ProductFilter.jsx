import React, { useEffect, memo } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import MultipleSelect from '@legion-lib/react-multiselect'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Service from '../../../common/lib/Service'

export const ProductFilter = () => {
    const dispatch = useDispatch();
    const [selectedProduct, productList] = useSelector(state => [state.selectedProduct, state.productList]);
    const {setSelectedProduct, getSportList, getBetTypeList, setEnableCashOutFilter, setSelectedCashOutMode} = ActionCreators;

    useEffect(() => {
        getSportAndBettypeListByProduct(selectedProduct);
        updateCashOutMode(selectedProduct);
    }, []);

    const  _productChangeHandler = (currentItem, selectedItemsKey) => {
        batch(() => {
            dispatch(setSelectedProduct(selectedItemsKey));
            getSportAndBettypeListByProduct(selectedItemsKey);
            updateCashOutMode(selectedItemsKey);
        })
    }

    const getSportAndBettypeListByProduct = (selectedProduct) => {
        dispatch(getSportList(selectedProduct));
        dispatch(getBetTypeList(selectedProduct));
    }

    const updateCashOutMode = (selectedProduct) => {
        const isEnableCashOutFilter = Service.isContainProductSportBook(selectedProduct);
        if (!isEnableCashOutFilter) {
            dispatch(setSelectedCashOutMode(0));
        }
        dispatch(setEnableCashOutFilter(isEnableCashOutFilter));
    }

    const _renderProductSelectList = () => {
        return productList?.length ? (
            <MultipleSelect id="ProductList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={productList}
                valueField={"value"}
                keyField={"id"}
                statusField={"status"}
                onChange={_productChangeHandler}/>
        ) : null;
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Product")}</label>
        {_renderProductSelectList()}
    </div>)
}

export default memo(ProductFilter);