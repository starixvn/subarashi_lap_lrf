import { toggleLoader } from '@jsroot/actions/loaderAction';
import { SET_CONTACT_LIST, SET_MODIFICATION_ACTION } from './types';
import ApiService from '../lib/service';

export const fetchContactList = (contactName, subsidiaryList) => async dispatch => {
    dispatch(toggleLoader(true))
    const contactList = await ApiService.getContactList(contactName, subsidiaryList)
    dispatch(setContactList(contactList))
    dispatch(toggleLoader(false))
}

export const setModificationAction = data => ({
    type: SET_MODIFICATION_ACTION,
    data
})

const setContactList = data => ({
    type: SET_CONTACT_LIST,
    data
})