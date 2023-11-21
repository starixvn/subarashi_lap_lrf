import React from 'react'
import Select from 'react-select'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';

export const ProductFilter = (props) => {
    const {value, onChange} = props;

    const _renderProductSelectList = () => {
        const productList = AppData.productList;

        return productList?.length && (
            <Select instanceId="ProductList"
                value={value}
                options={productList}
                onChange={onChange} />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Product")}</label>
        {_renderProductSelectList()}
    </div>)
}

const propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

ProductFilter.propTypes = propTypes;

export default ProductFilter;