import React, { memo } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import CheckBox from '@jsroot/components/CheckBox'


export const ConvertAllCheckBoxFilter = () => {
    const dispatch = useDispatch();
    const {changeIsConvertAll} = ActionCreators;
    const isConvertAll = useSelector(state => state.isConvertAll);

    return (
    <div className="form-group">
        <CheckBox id="IsConvertAll"
            checked={isConvertAll}
            onChange={(checked) => dispatch(changeIsConvertAll(checked))}
            label={LangHelper.getSingleResource("ConvertAllFiguresToBaseCurrency")} />
    </div>)
}

export default memo(ConvertAllCheckBoxFilter);