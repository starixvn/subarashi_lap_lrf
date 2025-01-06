import React, { memo } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import Select from 'react-select'
import AppData from '@jsroot/lib/AppData';
import PropTypes from 'prop-types';

export const CashOutModeFilter = (props) => {
    const {value, onChange, disabled} = props;

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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};

CashOutModeFilter.propTypes = propTypes;

export default memo(CashOutModeFilter);