import React, { useEffect, useState } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import FormContact from './base/FormContact';
import ApiService from '../lib/service';

const FormEdit = ({ contactId, ...props }) => {
    const [contact, setContact] = useState(null);
    useEffect(() => {
        ApiService.getContactDetail(contactId)
            .then(response => setContact(response));
    }, [])

    return (
        <FormContact
            contact={contact}
            setContact={setContact}
            api={ApiService.editContact}
            msgConfirm={<span style={{ marginTop: 10, display: 'block' }}>{LangHelper.getSingleResource('AlertUpdateLicenseeContact')}</span>}
            hasConfirm={true}
            {...props}
        >
        </FormContact>
    )
}


export default React.memo(FormEdit)