import React, { memo } from 'react'
import Select from 'react-select'
import LangHelper from '@jsroot/lib/langHelper'
import PropTypes from 'prop-types';

export const BetTypeFilter = (props) => {
    const {value, onChange, options} = props;

    const _renderBettypeSelectList = () => {
        const bettypeList = options;

        return bettypeList?.length && (
            <Select instanceId="BettypeList"
                value={value}
                options={bettypeList}
                onChange={onChange} />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("BetType")}</label>
        {_renderBettypeSelectList()}
    </div>)
}

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    options: PropTypes.array
};

BetTypeFilter.propTypes = propTypes;

export default memo(BetTypeFilter);