import React, { memo } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import PropTypes from 'prop-types';


export const IpFilter = (props) => {
    const {value, onChange} = props;

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("IP")}</label>
        <input className="input-text" id='ip' name='ip' type='text'
            value={value}
            onChange={onChange} />
    </div>)
}

const propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

IpFilter.propTypes = propTypes;

export default memo(IpFilter);