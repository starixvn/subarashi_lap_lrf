import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/lib/langHelper';
import RadioGroup from '@jsroot/components/radio/RadioGroup';
import Excel from '@jsroot/lib/excel';
import { decode } from '@jsroot/lib/htmlHelper';
import { generateDefaultConfirmOption, predefinedIcons } from '@jsroot/lib/sweetAlert';
import AppData from '@jsroot/lib/AppData';
import { ActionCreators } from '../actions';
import DropzoneUpload from '../../../components/DropzoneUpload';
import { Url, ExcelReaderColumn, MaxBatchUpdateMonitoredPlayer } from '../lib/constants';
import { UploadFileOptions, UploadFileOptionValue, tabKeys } from '../../../lib/constants';
import { BatchUpdateMonitoredPlayerAlertOption } from '../helper/sweetAlertHelper';
import MonitoredPlayerService from '../lib/queryService';

class ExcelHelper {
    static getColumnName(header, readerColumn) {
        if (!header || !header.length) {
            return null;
        }
        const columnName = header.find(_ => _ && _.replace(/\s/g, '').toLocaleLowerCase() === readerColumn);
        return columnName;
    }

    static isValidHeader(header) {
        return header && header.length > 0;
    }

    static isValidContent(content) {
        return content && content.length > 0;
    }
}


export const FormAction = props => {
    const { enableRemoveAction, playerList, canEdit, setSweetAlertOption, toggleLoader, selectedParams, deleteMonitoredPlayer } = props;
    const [displayUploadDropzone, setDisplayUploadDropzone] = useState(false);
    const [resultMsgSubmitMonitoredListFile, setResultMsgSubmitMonitoredListFile] = useState(null);
    const [uploadFileOption, setUploadFileOption] = useState(UploadFileOptionValue.byExternalId);

    useEffect(() => { resultMsgSubmitMonitoredListFile && setDisplayUploadDropzone(false) }, [selectedParams]);

    const _handleCloseAlert = () => {
        setSweetAlertOption(null);
    }

    const _cancelProps = {
        onClick: _handleCloseAlert
    }

    const _getSelectedCustIds = () => {
        const selectedPlayers = playerList.filter(_ => _.isSelected);
        const custIds = selectedPlayers.map(_ => _.custId);
        return custIds.join();
    }

    const _batchUpdateMonitoredPlayer = async (params, afterSuccess) => {
        toggleLoader(true);
        const response = await MonitoredPlayerService.batchUpdateMonitoredPlayer(params);
        afterSuccess && afterSuccess(response);
        toggleLoader(false);
    }

    const _onRemoveMonitoredList = (event) => {
        event.preventDefault();
        const { searchPlayer, setPagingOption, pagingOption, selectedParams} = props;
        const onSuccess = BatchUpdateMonitoredPlayerAlertOption.createHandlerAfterBatchUpdateMonitoredPlayerSuccess({ searchPlayer, setPagingOption, pagingOption, selectedParams, setSweetAlertOption, selectedTabKey: tabKeys.monitoredPlayer });
        deleteMonitoredPlayer(_getSelectedCustIds(), LangHelper.getSingleResource('The selected player(s)'), onSuccess);
    }

    const _handleDisplayUploadDropzone = () => {
        setResultMsgSubmitMonitoredListFile(null);
        setDisplayUploadDropzone(!displayUploadDropzone);
    }

    const _batchUpdateMonitoredListFromFile = monitoredList => {
        const batchUpdateSuccess = resultMessage => {
            setSweetAlertOption(null);
            setResultMsgSubmitMonitoredListFile(resultMessage);
        }

        const handlerAfterBatchUpdateMonitoredPlayer = BatchUpdateMonitoredPlayerAlertOption.createHandlerAfterBatchUpdateMonitoredPlayer({ setSweetAlertOption, batchUpdateSuccess, noAlertResult: true });
        _batchUpdateMonitoredPlayer({ batchPlayer: monitoredList }, handlerAfterBatchUpdateMonitoredPlayer);
    }

    const _onSubmitMonitoredListFile = (files) => {
        const file = files[0];
        Excel.process(() => {
            Excel.read(file, 0, result => {
                const { header, content } = result;
                if (!ExcelHelper.isValidHeader(header) || !ExcelHelper.isValidContent(content)) {
                    alert(decode(LangHelper.getSingleResource("UploadFileError")))
                    return;
                }
                const byExternalId = uploadFileOption == UploadFileOptionValue.byExternalId;
                const uploadByColumn = ExcelHelper.getColumnName(header, byExternalId ? ExcelReaderColumn.ExternalId : ExcelReaderColumn.SystemId);
                const winningThresholdColumn = ExcelHelper.getColumnName(header, ExcelReaderColumn.WinningThreshold);

                if (!uploadByColumn || !winningThresholdColumn) {
                    alert(decode(LangHelper.getSingleResource("UploadFileError")))
                    return;
                }

                const monitoredList = _tryGetMonitoredListFromFile(content, uploadByColumn, winningThresholdColumn, byExternalId ? 'externalId' : 'systemId');
                if (!monitoredList) {
                    alert(decode(LangHelper.getSingleResource("UploadFileError")))
                    return;
                }

                if (monitoredList.length > MaxBatchUpdateMonitoredPlayer) {
                    alert(decode(LangHelper.getSingleResource("MaxBatchUpdateMonitoredPlayerError")))
                    return;
                }

                _batchUpdateMonitoredListFromFile(monitoredList);
            })
        })
    }

    const _tryGetMonitoredListFromFile = (fileContent, uploadByColumn, winningThresholdColumn, uploadByProperty) => {
        const monitoredList = [];
        for (let index = 0; index < fileContent.length; index++) {
            const rowContent = fileContent[index];
            const uploadByPropertyValue = rowContent[uploadByColumn]?.trim();
            const winningThresholdValue = parseInt(rowContent[winningThresholdColumn]?.replace(/,/g, ''));
            if (!uploadByPropertyValue || !winningThresholdValue) {
                console.log(`Invalid at row ${index}: ${uploadByPropertyValue} - ${winningThresholdValue}`)
                return null;
            }
            monitoredList.push({ [uploadByProperty]: uploadByPropertyValue, winningThreshold: winningThresholdValue });
        }

        return monitoredList;
    }

    const _renderExtraInfoDropzoneUploadFile = () => {
        return (<>
            <RadioGroup
                name={'UploadByOptions'}
                value={uploadFileOption}
                options={UploadFileOptions}
                onChange={setUploadFileOption}
            />
            <div>
                <a href={`${Url.monitoredPlayerListTemplate}?uploadBy=${uploadFileOption}`}>*{LangHelper.getSingleResource('ClickHere')}</a>&nbsp;
                <span>{LangHelper.getSingleResource('ToDowloadTemplate')}</span>
            </div>
            <div>
                <span>{`*${LangHelper.getSingleResource('MaximumUploadFileSize')}: ${1} MB`}</span>
            </div>
        </>)
    }

    const _renderDropzoneUploadFile = () => {
        return <DropzoneUpload multiple={false} accept={'.xls,.xlsx'} maxSize={1}
            onClose={_handleDisplayUploadDropzone}
            onSubmit={_onSubmitMonitoredListFile}
            isShowInnerZone={!resultMsgSubmitMonitoredListFile}>
            <div>
                {resultMsgSubmitMonitoredListFile ? resultMsgSubmitMonitoredListFile : _renderExtraInfoDropzoneUploadFile()}
            </div>
        </DropzoneUpload>
    }

    return (
        <div className="form-action">
            <>
                <div className="action">
                    <button type="button" className="btn" disabled={!canEdit || !enableRemoveAction} onClick={_onRemoveMonitoredList}>{LangHelper.getSingleResource("Remove")}</button>
                </div>
                <div className="action">
                    <button type="button" className="btn" onClick={_handleDisplayUploadDropzone} disabled={!canEdit}>{LangHelper.getSingleResource("UploadFile")}</button>
                </div>
            </>
            {displayUploadDropzone && _renderDropzoneUploadFile()}
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { searchPlayer, updateVipStatus, setSweetAlertOption, setPagingOption, toggleLoader, deleteMonitoredPlayer } = ActionCreators;
    return bindActionCreators({ searchPlayer, updateVipStatus, setSweetAlertOption, setPagingOption, toggleLoader, deleteMonitoredPlayer }, dispatch);
}
function mapStateToProps(state) {
    const { playerList, selectedParams, pagingOption } = state;
    const enableRemoveAction = playerList && playerList.length && playerList.some(_ => _.isSelected);
    return Object.assign({}, { enableRemoveAction, playerList, selectedParams, pagingOption, canEdit: state.permissions.canEdit  });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FormAction));
