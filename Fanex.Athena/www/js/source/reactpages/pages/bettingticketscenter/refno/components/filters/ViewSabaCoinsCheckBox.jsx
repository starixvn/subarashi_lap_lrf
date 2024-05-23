import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckBox from '@jsroot/components/CheckBox'
import LangHelper from '@jsroot/lib/langHelper'
import { ActionCreators } from '../../actions/index.js'
import AppData from '@jsroot/lib/AppData'

export const ViewSabaCoinsCheckBox = () => {
    const  viewSabaCoins  = useSelector(state => state.viewSabaCoins);
    const dispatch = useDispatch();
    const { changeViewSabaCoins, changeIsConvertAll, setSelectedBaseCurrency } = ActionCreators;

    const onViewSabaCoinsChane = value => {
        if(value)
        {
            dispatch(changeIsConvertAll(false));
            dispatch(setSelectedBaseCurrency("All"));
        }
        else 
        {
            dispatch(changeIsConvertAll(true));
            dispatch(setSelectedBaseCurrency(AppData.defaultSelectedBaseCurrency));
        }
        dispatch(changeViewSabaCoins(value));
    } 

    return (
        <div className="form-group">
        <CheckBox id="ViewSabaCoins"
            checked={viewSabaCoins}
            onChange={(checked) => onViewSabaCoinsChane(checked)}
            label={LangHelper.getSingleResource("ViewSabaCoins")} />
    </div>)
}
export default memo(ViewSabaCoinsCheckBox);