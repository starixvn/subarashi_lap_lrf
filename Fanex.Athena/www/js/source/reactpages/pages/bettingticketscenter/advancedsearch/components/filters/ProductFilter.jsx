import React, { useEffect, memo } from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import PropTypes from 'prop-types';

export const ProductFilter = (props) => {
    const {value, options, onChange} = props;

    const _renderProductSelectList = () => {
        return options?.length ? (
            <MultipleSelect id="ProductList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={options}
                valueField={"value"}
                keyField={"id"}
                statusField={"status"}
                onChange={onChange}
                isValid={!!value} />
        ) : null;
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Product")}</label>
        {_renderProductSelectList()}
    </div>)
}

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    options: PropTypes.array
};

ProductFilter.propTypes = propTypes;

export default memo(ProductFilter);