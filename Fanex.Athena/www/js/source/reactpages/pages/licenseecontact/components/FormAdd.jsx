import React, { useEffect, useState } from 'react'
import FormContact from './base/FormContact';
import LangHelper from '@jsroot/lib/langHelper'
import ApiService from '../lib/service';

const  FormAdd = props => {
    const [contact, setContact] = useState({
        Categories: [],
        ContactName: null,
        ContactType: -1,
        Department: null,
        Email: null,
        Position: null,
        Remark: null,
        Skype: null
    });

    useEffect(() => {
        ApiService.getLicenseeCategories()
            .then(response => setContact({ ...contact, Categories: response }));
    }, [])

    return (
        <FormContact
            contact={contact}
            setContact={setContact}
            api={ApiService.addContact}
            msgConfirm={LangHelper.getSingleResource('AlertAddLicenseeContact')}
            {...props}
        >
        </FormContact>
    )
}


export default React.memo(FormAdd)