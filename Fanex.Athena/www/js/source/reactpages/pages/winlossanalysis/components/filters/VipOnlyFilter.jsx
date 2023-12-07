import React from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import Select from 'react-select'
import PropTypes from 'prop-types';
import AppData from '@jsroot/lib/AppData'
import { memo } from 'react';

export const VipOnlyFilter = (props) => {
    const {onChange, value } = props;

    const _renderVipOnlySelectedList = () => {
        const vipOnlyList = AppData.vipOnlyList;

        return vipOnlyList && vipOnlyList.length && (
            <Select              
                instanceId="IsVipOnly"
                value={value}
                options={vipOnlyList}
                onChange={onChange} />
        );
    }

    return (
        <div className="form-group" title={LangHelper.getSingleResource("VIPPlayerTooltipMsg")}>
            <label className="label-text">{LangHelper.getSingleResource("VIPPlayerOnly")}</label>
            {_renderVipOnlySelectedList()}
        </div>)
}

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
};

VipOnlyFilter.propTypes = propTypes;

export default memo(VipOnlyFilter);