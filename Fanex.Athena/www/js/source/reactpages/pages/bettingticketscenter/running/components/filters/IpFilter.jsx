import React, { memo } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'


export const IpFilter = () => {
    const dispatch = useDispatch();
    const {setIp} = ActionCreators;
    const ip = useSelector(state => state.ip);

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("IP")}</label>
        <input className="input-text" id='ip' name='ip' type='text'
            value={ip}
            onChange={(event) => dispatch(setIp(event.target.value))} />
    </div>)
}

export default memo(IpFilter);