import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/lib/langHelper';
import DataService from '@jsroot/lib/DataService';
import { generateDefaultConfirmOption, generateDefaultAlertOption, predefinedIcons } from '@jsroot/lib/sweetAlert';
import { ActionCreators } from '../actions';
import DropzoneUpload from '../../../components/DropzoneUpload';
import { URL } from '../lib/constants';

export const FormAction = props => {
    const { setSweetAlertOption, isActiveTaggingAction } = props;
    const [ displayUploadDropzone, setDisplayUploadDropzone ] = useState(false);

    const _handleActivateVip = (event) => {
        event.preventDefault();
        const handleCloseAlert = () => {
            setSweetAlertOption(null);
        }
        const confirmMessage = LangHelper.getSingleResource('');
        const cancelProps = {
            onClick: handleCloseAlert
        }
        const confirmProps = {
            onClick: () => {
                alert('ok')
                setSweetAlertOption(null);
            }
        }

        const confirmOption = generateDefaultConfirmOption(confirmMessage, handleCloseAlert, confirmProps, cancelProps);

        setSweetAlertOption(confirmOption);
    }

    const _handleDeactivateVip = (event) => {
        setSweetAlertOption(null);
    }

    const _handleDisplayUploadDropzone = () => {
        setDisplayUploadDropzone(!displayUploadDropzone);
    }

    const _renderDropzoneUploadFile = () => {
        return <DropzoneUpload multiple={false} accept={'.xls,.xlsx'} maxSize={1} 
        onClose={_handleDisplayUploadDropzone}
        onSubmit={(files) => {
            const formData = new FormData();
            formData.set(files[0].name, files[0], files[0].name);
            DataService.postData(URL.uploadVipList, formData)
        }}>
            <div>
                <div>
                    <a href={URL.dowloadVipPlayerList}>*{LangHelper.getSingleResource('ClickHere')}</a>
                    <span>{LangHelper.getSingleResource('ToDowloadTemplate')}</span>
                </div>
                <div>
                    <span>{`*${LangHelper.getSingleResource('MaximumUploadFileSize')}: ${1} MB`}</span>
                </div>
            </div>
        </DropzoneUpload>
    }

    return (
        <div className="form-action">
            <>
                <div className="action">
                    <button type="button" className="btn" disabled={!isActiveTaggingAction} onClick={_handleActivateVip}>{LangHelper.getSingleResource("ActivateVip")}</button>
                </div>
                <div className="action">
                    <button type="button" className="btn" onClick={_handleDeactivateVip} disabled={!isActiveTaggingAction}>{LangHelper.getSingleResource("DeactivateVip")}</button>
                </div>
                <div className="action">
                    <button type="button" className="btn" onClick={_handleDisplayUploadDropzone}>{LangHelper.getSingleResource("UploadVipList")}</button>
                </div>
            </>
            {displayUploadDropzone && _renderDropzoneUploadFile()}
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { setSweetAlertOption } = ActionCreators;
    return bindActionCreators({ setSweetAlertOption }, dispatch);
}
function mapStateToProps(state) {
    const { playerList } = state;
    const isActiveTaggingAction = playerList && playerList.length && playerList.some(_ => _.isSelected);
    return Object.assign({}, { isActiveTaggingAction });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FormAction));
