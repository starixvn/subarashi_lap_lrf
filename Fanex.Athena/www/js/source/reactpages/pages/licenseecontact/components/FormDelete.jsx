import React, { useEffect, useState } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import ApiService from '../lib/service';
import SweetAlert from '@jsroot/components/sweet-alert';
import { generateDefaultConfirmOption, generateDefaultAlertOption, defaultOkButton, predefinedIcons } from '@jsroot/lib/sweetAlert';

const FormDelete = ({ contactId, contactName, onClose, toggleLoader }) => {
    const [sweetAlertOption, setSweetAlertOption] = useState(null);

    useEffect(() => {
        const handleCloseAlert = () => {
            setSweetAlertOption(null);
            onClose();
        }

        const cancelProps = {
            onClick: handleCloseAlert
        }

        const confirmProps = {
            ...defaultOkButton,
            onClick: async () => {
                toggleLoader(true);
                const response = await ApiService.deleteContact(contactId);
                toggleLoader(false);
                const { IsSuccess, Message } = response;
                const displayIcon = IsSuccess ? predefinedIcons.success : predefinedIcons.error;
                const title = IsSuccess ? LangHelper.getSingleResource("MessageSuccess") : LangHelper.getSingleResource("Error")
                const alertOpt = generateDefaultAlertOption(Message, () => { handleCloseAlert(); onClose(); }, null, displayIcon);
                setSweetAlertOption({ ...alertOpt, title });
            }
        }
        const confirmOption = generateDefaultConfirmOption(LangHelper.getSingleResource('AlertDeleteLicenseeContact').replace('{0}', contactName), handleCloseAlert, confirmProps,
            cancelProps,
            predefinedIcons.warning,
            { title: LangHelper.getSingleResource("Confirmation"), height: 210 });

        setSweetAlertOption(confirmOption);

    }, [])

    return <>
        {sweetAlertOption && <SweetAlert {...sweetAlertOption} />}
    </>
}

export default React.memo(FormDelete)