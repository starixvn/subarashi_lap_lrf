import React, { memo } from "react";
import Select from "react-select";
import LangHelper from "@jsroot/lib/langHelper";
import PropTypes from "prop-types";

export const BetTypeFilter = (props) => {
    const { value, onChange, options } = props;

    const _renderBetTypeSelectList = () => {
        return (
            options?.length && (
                <Select
                    instanceId='BettypeList'
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            )
        );
    };

    return (
        <div className='form-group'>
            <label className='label-text'>
                {LangHelper.getSingleResource("BetType")}
            </label>
            {_renderBetTypeSelectList()}
        </div>
    );
};

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    options: PropTypes.array,
};

BetTypeFilter.propTypes = propTypes;

export default memo(BetTypeFilter);
