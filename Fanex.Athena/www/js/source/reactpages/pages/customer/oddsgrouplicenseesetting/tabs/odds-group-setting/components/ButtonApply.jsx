import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/lib/langHelper';
import { GetDataList, UpdateData } from '../lib/queryService';
import { Code, CodeMsg } from '../lib/constants';
import { generateDefaultConfirmOption } from '@jsroot/lib/sweetAlert';

export const ButtonApply = (props) => {
    const { dataList, updateDataList, selectedParams, setUpdateDataList, setUpdatedStatusList, updatedStatusList, setSweetAlertOption, toggleLoader, setDataList } = props;

    if (dataList == null || !dataList.length || selectedParams == null) {
        return null;
    }

    const handleCloseAlert = () => {
        setSweetAlertOption(null);
    }

    const cancelProps = {

        onClick: handleCloseAlert
    }

    const createApplyChaneConfirmProps = () => ({
        onClick: async () => {
            await handleApplyChange();
            await reloadData();
        }
    })

    const buildAlertOptionApplyChane = () => {
        const confirmMessage = LangHelper.getSingleResource("UpdateOddsGroupConfirmationMsg");
        const confirmProps = createApplyChaneConfirmProps();
        const confirmOptions = generateDefaultConfirmOption(confirmMessage, handleCloseAlert, confirmProps, cancelProps, null, { title: LangHelper.getSingleResource("Confirmation"), width: 520, height: 180 });
        return confirmOptions;
    }

    const handleApplyChange = async () => {
        setSweetAlertOption(null);

        var newUpdatedStatusList = {...updatedStatusList};

        for (const key of Object.keys(updateDataList)) {

            newUpdatedStatusList = {
                ...newUpdatedStatusList,
                [key] : {
                    newValue : updateDataList[key].newValue,
                    oldValue : updateDataList[key].oldValue,
                    code: Code.Waiting,
                    msg: CodeMsg[Code.Waiting]
                }
            };
            setUpdatedStatusList(newUpdatedStatusList);

            const params = {
                custIds : key.split('_')[0],
                newValue : updateDataList[key].newValue,
                oldValue : updateDataList[key].oldValue,
                subsidiary: updateDataList[key].subsidiary,
                currency: updateDataList[key].currency
            };

            const data = await UpdateData(params);
            const resultCode =  Object.values(Code).includes(data.Code) ? data.Code : Code.Error;

            newUpdatedStatusList = {
                ...newUpdatedStatusList,
                [key] : {
                    newValue : updateDataList[key].newValue,
                    oldValue : updateDataList[key].oldValue,
                    code: resultCode,
                    msg: CodeMsg[resultCode]
                }
            }

            setUpdatedStatusList(newUpdatedStatusList);
        }
        
        setUpdateDataList({});
    }

    const reloadData = async () => {
        toggleLoader(true);
        var data = await GetDataList(selectedParams);
        setDataList(data);
        toggleLoader(false);
    }

    const _applyChange = async (event) => {
        event.preventDefault();
        const alertOption = buildAlertOptionApplyChane();
        setSweetAlertOption(alertOption);
    }

    return (
        <button type="button" className="btn btn-apply" onClick={_applyChange} disabled={!updateDataList || Object.keys(updateDataList).length === 0}>{LangHelper.getSingleResource('Update')}</button>
    );
}

function mapDispatchToProps(dispatch) {
    const { setUpdateDataList, setUpdatedStatusList, setSweetAlertOption, toggleLoader, setDataList } = ActionCreators;
    return bindActionCreators({ setUpdateDataList, setUpdatedStatusList, setSweetAlertOption, toggleLoader, setDataList}, dispatch);
}

function mapStateToProps(state) {
    const { dataList, updateDataList, updatedStatusList, selectedParams, isLoading } = state;
    return Object.assign({}, { dataList, updateDataList, updatedStatusList, selectedParams, isLoading });
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonApply);


