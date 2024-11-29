import React, { useState } from 'react'
import { connect } from 'react-redux';
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { CodeMsg, Code } from '../../lib/constants';

const OddsGroupOption = (props) => {
    const { dataItem, keyItem, updateDataList, updatedStatusList, setUpdateDataList, setUpdatedStatusList  } = props;
    const currentValue = dataItem.OddsGroup ? dataItem.OddsGroup.toUpperCase() : null;
    const NAValue = "N_A";
    const [selectedValue, setSelectedValue] = useState(currentValue ?? NAValue);
    var oddsGroupList = AppData.oddsGroups;

    const _changeOddsGroupHandler = e =>{
        const newValue = e.target.value;
        const oldValue = currentValue;

        setSelectedValue(newValue);        

        if(newValue == oldValue || newValue == NAValue) {
            removePreviousChange();            
            return;
        }

        updateNewChange(newValue, oldValue);
    }

    const removePreviousChange = () => {
        if (keyItem in updateDataList) {
            const { [keyItem]: _, ...newUpdateDataList } = updateDataList;
            setUpdateDataList(newUpdateDataList);
        }

        if (keyItem in updatedStatusList && updatedStatusList[keyItem]?.code == Code.Change) {
            const { [keyItem]: _, ...newUpdatedStatusList } = updatedStatusList;
            setUpdatedStatusList(newUpdatedStatusList);
        }
    }

    const updateNewChange = (newValue, oldValue) => {
        setUpdateDataList({
            ...updateDataList,
            [keyItem]: {
                newValue,
                oldValue,
                subsidiary: dataItem.Subsidiary,
                currency: dataItem.Currency
            }
        });

        var updatedStatusMsg = CodeMsg[Code.Change];
        updatedStatusMsg = updatedStatusMsg.replace("{0}", oldValue ?? LangHelper.getSingleResource(NAValue));
        updatedStatusMsg = updatedStatusMsg.replace("{1}", newValue ?? LangHelper.getSingleResource(NAValue));

        setUpdatedStatusList({
            ...updatedStatusList,
            [keyItem] : {
                newValue,
                oldValue,
                code: Code.Change,
                msg: updatedStatusMsg
            }
        });
    }

    return oddsGroupList?.length && (
        <select id="OddsGroupList" className='odds-group-dropdown'
            onChange={_changeOddsGroupHandler} 
            value={selectedValue}>
            {selectedValue == NAValue && <option value={NAValue} disabled>{LangHelper.getSingleResource(NAValue)}</option> }
            {oddsGroupList.map(oddsGroup => (
                <option key={oddsGroup.value} value={oddsGroup.value}>{oddsGroup.label}</option>))}
        </select>
    );
}

function mapDispatchToProps(dispatch) {
    const { setUpdateDataList, setUpdatedStatusList } = ActionCreators;
    return bindActionCreators({ setUpdateDataList, setUpdatedStatusList }, dispatch);
}

function mapStateToProps(state) {
    const {  updateDataList, updatedStatusList } = state;
    return Object.assign({}, { updateDataList, updatedStatusList });
}

export default connect(mapStateToProps, mapDispatchToProps)(OddsGroupOption);