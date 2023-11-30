import React, { memo } from 'react'
import {  useDispatch } from 'react-redux'
import MultipleSelect from '@legion-lib/react-multiselect'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'


export const ProductFilter = () => {
    const dispatch = useDispatch();
    const {setSelectedProduct} = ActionCreators;

    const  _productChangeHandler = (currentItem, selectedItemsKey) => {
        dispatch(setSelectedProduct(selectedItemsKey));
    }

    const _renderProductSelectList = () => {
        const productOptions = AppData.productOptions;

        return productOptions?.length ? (
            <MultipleSelect id="ProductList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={productOptions}
                keyField={"Code"}
                valueField={"Name"}
                statusField={"Status"}
                onChange={_productChangeHandler} />
        ) : null;
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Product")}</label>
        {_renderProductSelectList()}
    </div>)
}

export default memo(ProductFilter);