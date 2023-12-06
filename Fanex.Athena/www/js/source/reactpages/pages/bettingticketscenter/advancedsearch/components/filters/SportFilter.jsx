import React, { memo } from 'react'
import Select from 'react-select'
import LangHelper from '@jsroot/lib/langHelper'
import PropTypes from 'prop-types';

export const SportFilter = (props) => {
    const {value, onChange, options} = props;

    const _renderSportSelectList = () => {
        return options?.length && (
            <Select instanceId="SportList"
                value={value}
                options={options}
                onChange={onChange} />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Sport")}</label>
        {_renderSportSelectList()}
    </div>)
}

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    options: PropTypes.array
};

SportFilter.propTypes = propTypes;

export default memo(SportFilter);