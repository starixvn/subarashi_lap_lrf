import React, { useEffect, memo } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import MultipleSelect from '@legion-lib/react-multiselect'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'


export const ProductFilter = () => {
    const dispatch = useDispatch();
    const selectedProduct = useSelector(state => state.selectedProduct);
    const {setSelectedProduct, getSportList, getBetTypeList, setEnableLeague, setLeagueList, setEnableMatch, setSelectedMatch} = ActionCreators;

    useEffect(() => {
        _productChangeHandler(null, selectedProduct);
      }, []);

    const  _productChangeHandler = (currentItem, selectedItemsKey) => {
        batch(() => {
            dispatch(setSelectedProduct(selectedItemsKey));
            dispatch(getSportList(selectedItemsKey));
            dispatch(getBetTypeList(selectedItemsKey));
            dispatch(setEnableLeague(false));
            dispatch(setEnableMatch(false));
        })
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