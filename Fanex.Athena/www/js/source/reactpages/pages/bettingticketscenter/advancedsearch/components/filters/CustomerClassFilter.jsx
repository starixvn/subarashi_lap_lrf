import React, { memo } from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';

export const CustomerClassFilter = (props) => {
    const { onChange } = props
    
    const _renderCustomerClassSelectList = () => {
        const riskLevels = AppData.riskLevels;
        return riskLevels?.length && (
            <MultipleSelect key="riskLevels"
                id="RiskLevels"
                language={LangHelper.currentLanguage}
                dataSource={riskLevels}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={onChange}
                />);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("RiskLevel")}</label>
        {_renderCustomerClassSelectList()}
    </div>)
}

const propTypes = {
    onChange: PropTypes.func
};

CustomerClassFilter.propTypes = propTypes;

export default memo(CustomerClassFilter);