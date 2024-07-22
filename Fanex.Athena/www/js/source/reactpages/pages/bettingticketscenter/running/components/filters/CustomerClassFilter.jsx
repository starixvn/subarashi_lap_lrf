import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'

export const CustomerClassFilter = () => {
    const dispatch = useDispatch();
    const {setSelectedCustomerClass} = ActionCreators;
    
    const _customerClassChangeHandler = (currentItem, selectedItemsKey) => {
        const customerClass = AppData.riskLevels.filter( r => selectedItemsKey.includes(r.id)).map( r => r.customerClassList).join(',');
        dispatch(setSelectedCustomerClass(customerClass));
    }


    const _renderCustomerClassSelectList = () => {
        const riskLevels = AppData.riskLevels;
        return riskLevels?.length && (
            <MultipleSelect key="riskLevels"
                id="RiskLevels"
                language={LangHelper.currentLanguage}
                dataSource={riskLevels}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={_customerClassChangeHandler}
                />);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("RiskLevel")}</label>
        {_renderCustomerClassSelectList()}
    </div>)
}

export default memo(CustomerClassFilter);