import React, { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import CheckBox from '@jsroot/components/CheckBox'
import LangHelper from '@jsroot/lib/langHelper'
import { ActionCreators } from '../../actions/index.js'

export const ConvertAllCheckBox = () => {
    const  isConvertAll  = useSelector(state => state.isConvertAll, shallowEqual);
    const dispatch = useDispatch();
    const { changeIsConvertAll } = ActionCreators;

    return (
        <div className="form-group">
        <CheckBox id="IsConvertAll"
            checked={isConvertAll}
            onChange={(checked) => dispatch(changeIsConvertAll(checked))}
            label={LangHelper.getSingleResource("ConvertAllFiguresToBaseCurrency")} />
    </div>)
}
export default memo(ConvertAllCheckBox);