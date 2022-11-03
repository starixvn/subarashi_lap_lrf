import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/lib/langHelper';
import RadioGroup from '@jsroot/components/radio/RadioGroup';
import Excel from '@jsroot/lib/excel';
import { decode } from '@jsroot/lib/htmlHelper';
import { generateDefaultConfirmOption, predefinedIcons } from '@jsroot/lib/sweetAlert';
import { ActionCreators } from '../actions';
import DropzoneUpload from '../../../components/DropzoneUpload';
import { Url, ExcelReaderColumn, ActionType } from '../lib/constants';
import { TabType } from '../../../lib/constants';
import { UploadFileOptions, UploadFileOptionValue } from '../../../lib/constants';
import ExcelHelper from '../lib/helpers/excelHelper';
import { UpdateVipStatusAlertOption } from '../../../lib/helpers/sweetAlertHelper';
import AppData from '@jsroot/lib/AppData';
import VipPlayerQueryService from "../lib/queryService";

export const FormAction = props => {
    const { isActiveTaggingAction, playerList, updateVipStatus, setSweetAlertOption, selectedParams } = props;
    const [displayUploadDropzone, setDisplayUploadDropzone] = useState(false);
    const [isActivateVIP, setIsActivateVIP] = useState(false);
    const [resultMsgSubmitVipListFile, setResultMsgSubmitVipListFile] = useState(null);
    const [uploadFileOption, setUploadFileOption] = useState(UploadFileOptionValue.byExternalId);

    const hasVipManagementEdit = AppData.HasVipManagementEdit;

    useEffect(() => { resultMsgSubmitVipListFile && setDisplayUploadDropzone(false) }, [selectedParams]);

    const _handleCloseAlert = () => {
        setSweetAlertOption(null);
    }

    const _cancelProps = {

        onClick: _handleCloseAlert
    }

    const _getParams = (isVip) => {
        const selectedPlayers = playerList.filter(_ => _.isSelected);
        const systemIds = selectedPlayers.map(_ => _.systemId);
        const params = {
            systemIds: systemIds.join(),
            isVip
        }
        return params;
    }

    const _buildAlertOptionUpdateVipStatus = (params, isUpdateVip, noAlertResult, handlerUpdateVipStatusSuccess) => {
        const confirmMessage = isUpdateVip ? LangHelper.getSingleResource("ConfirmActivateVIPPlayer") : LangHelper.getSingleResource("ConfirmDeactivateVIPPlayer");
        handlerUpdateVipStatusSuccess = handlerUpdateVipStatusSuccess || UpdateVipStatusAlertOption.createHandlerAfterUpdateVipStatusSuccess(props);
        const handlerAfterUpdateVipStatus = UpdateVipStatusAlertOption.createHandlerAfterUpdateVipStatus({ setSweetAlertOption, handlerUpdateVipStatusSuccess, isUpdateVip, noAlertResult });
        const confirmProps = UpdateVipStatusAlertOption.createUpdateVipStatusConfirmProps({ params, updateVipStatus, handlerAfterUpdateVipStatus });
        const confirmOptions = generateDefaultConfirmOption(confirmMessage, _handleCloseAlert, confirmProps, _cancelProps, predefinedIcons.warning, { height: 210 });
        return confirmOptions;
    }

    const _handleActivateVip = (event) => {
        event.preventDefault();
        const params = _getParams(true);
        const alertOption = _buildAlertOptionUpdateVipStatus(params, true, false);
        setSweetAlertOption(alertOption);
    }


    const _handleDeactivateVip = (event) => {
        event.preventDefault();
        const params = _getParams(false);
        const alertOption = _buildAlertOptionUpdateVipStatus(params, false, false);
        setSweetAlertOption(alertOption);
    }

    const _handleDisplayUploadDropzone = (type) => {
        if ((type === ActionType.Deactived && isActivateVIP) || (type === ActionType.Actived && !isActivateVIP)) {
            setDisplayUploadDropzone(true);
        }
        else {
            setDisplayUploadDropzone(!displayUploadDropzone);
        }
        setIsActivateVIP(type === ActionType.Actived);
        setResultMsgSubmitVipListFile(null);
    }

    const _handleActiveVipStatusFromFile = (params) => {
        const handlerUpdateVipStatusSuccess = resultMessage => {
            setSweetAlertOption(null);
            setResultMsgSubmitVipListFile(resultMessage);
        }
        const alertOption = _buildAlertOptionUpdateVipStatus(params, isActivateVIP, true, handlerUpdateVipStatusSuccess);
        setSweetAlertOption(alertOption);
    }

    const _onSubmitVipListFile = (files) => {
        const file = files[0];
        Excel.process(() => {
            Excel.read(file, 0, result => {
                const { header, content } = result;
                if (!ExcelHelper.isValidHeader(header) || !ExcelHelper.isValidContent(content)) {
                    alert(decode(LangHelper.getSingleResource("UploadFileError")))
                    return;
                }
                const byExternalId = uploadFileOption == UploadFileOptionValue.byExternalId;
                const selectedColumn = header[0];
                if (!selectedColumn) {
                    alert(decode(LangHelper.getSingleResource("UploadFileError")))
                    return;
                }

                const value = content.map(_ => _[selectedColumn]).join();
                const params = {
                    [byExternalId ? 'externalIds' : 'systemIds']: value,
                    isVip: isActivateVIP
                }

                _handleActiveVipStatusFromFile(params);
            })
        })
    }

    const _handleDownloadTemplateExcel = (event) => {
        event.preventDefault();
        VipPlayerQueryService.downloadVipPlayerListTemplateExcel({ uploadBy: uploadFileOption });
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
                <a href='#' onClick={_handleDownloadTemplateExcel}>*{LangHelper.getSingleResource('ClickHere')}</a>&nbsp;
                <span>{LangHelper.getSingleResource('ToDowloadTemplate')}</span>
            </div>
            <div>
                <span>{`*${LangHelper.getSingleResource('MaximumUploadFileSize')}: ${1} MB`}</span>
            </div>
        </>)
    }

    const _renderDropzoneUploadFile = () => {
        return <DropzoneUpload multiple={false} accept={'.xls,.xlsx'} maxSize={1}
            onClose={() => _handleDisplayUploadDropzone(ActionType.Closed)}
            onSubmit={_onSubmitVipListFile}
            isShowInnerZone={!resultMsgSubmitVipListFile}
            isActive={isActivateVIP}
            tabType={TabType.VipPlayerManagement}
            key={isActivateVIP}>
            <div>
                {resultMsgSubmitVipListFile ? resultMsgSubmitVipListFile : _renderExtraInfoDropzoneUploadFile()}
            </div>
        </DropzoneUpload>
    }

    return (
        <div className="form-action">
            <>
                <div className="action">
                    <button type="button" className="btn" disabled={!isActiveTaggingAction || !hasVipManagementEdit} onClick={_handleActivateVip}>{LangHelper.getSingleResource("ActivateVip")}</button>
                </div>
                <div className="action">
                    <button type="button" className="btn" onClick={_handleDeactivateVip} disabled={!isActiveTaggingAction || !hasVipManagementEdit}>{LangHelper.getSingleResource("DeactivateVip")}</button>
                </div>
                <div className="action">
                    <button type="button" className="btn" onClick={() => _handleDisplayUploadDropzone(ActionType.Actived)} disabled={!hasVipManagementEdit}>{LangHelper.getSingleResource("ActivateListOfPlayers")}</button>
                </div>
                <div className="action">
                    <button type="button" className="btn" onClick={() => _handleDisplayUploadDropzone(ActionType.Deactived)} disabled={!hasVipManagementEdit}>{LangHelper.getSingleResource("DeactivateListOfPlayers")}</button>
                </div>
            </>
            {displayUploadDropzone && _renderDropzoneUploadFile()}
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { searchPlayer, updateVipStatus, setSweetAlertOption, setPagingOption } = ActionCreators;
    return bindActionCreators({ searchPlayer, updateVipStatus, setSweetAlertOption, setPagingOption }, dispatch);
}
function mapStateToProps(state) {
    const { playerList, selectedParams, selectedTabKey, pagingOption } = state;
    const isActiveTaggingAction = playerList && playerList.length && playerList.some(_ => _.isSelected);
    return Object.assign({}, { isActiveTaggingAction, playerList, selectedParams, selectedTabKey, pagingOption });
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FormAction));
