import React from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import Select from 'react-select'
import PropTypes from 'prop-types';
import AppData from '@jsroot/lib/AppData';
import { memo } from 'react';

export const CashOutModeFilter = (props) => {
    const { onChange, value, disabled } = props;

    const _renderCashOutFilter = () => {
        const cashOutModeList = AppData.cashOutModeList;

        return cashOutModeList && cashOutModeList.length && (
            <Select
                instanceId="CashOutMode"
                value={value}
                options={cashOutModeList}
                disabled={disabled}
                onChange={onChange} />
        );
    }
    return (
        <div className="form-group">
            <label className="label-text">{LangHelper.getSingleResource("CashOut")}</label>
            {_renderCashOutFilter()}
        </div>
    )
}

const propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool
};

CashOutModeFilter.propTypes = propTypes;


export default memo(CashOutModeFilter);