import React from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';
import { memo } from 'react';

export const ProductFilter = (props) => {
    const {value, onChange, isValid} = props;

    const _renderProductSelectList = () => {
        const productList = AppData.productList;

        return productList && productList.length && (
            <MultipleSelect
                id="ProductList"
                language={LangHelper.currentLanguage}
                value={value}
                hasSearchBox={true}
                dataSource={productList}
                valueField={"value"}
                keyField={"id"}
                statusField={"status"}
                onChange= {onChange}
                isValid= {isValid} />
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
    onChange: PropTypes.func,
    isValid: PropTypes.bool
};

const defaultProps = {
    isValid: true
};

ProductFilter.propTypes = propTypes;
ProductFilter.defaultProps = defaultProps;

export default memo(ProductFilter);