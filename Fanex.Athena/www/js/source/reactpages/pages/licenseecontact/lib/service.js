import DataService from '@jsroot/lib/DataService';
import LangHelper from '@jsroot/lib/langHelper'
import { Url } from './contants';

export default class ApiService {
    static async getContactList(contactName) {
        try {
            const response = await DataService.postData(Url.ContactList, { contactName });
            if (response.status === 200 && response.data.IsSuccess) {
                return response.data.Data;
            }
        }
        catch (e) {
            console.log(e)
        }
        return [];
    }

    static async getContactDetail(contactId) {
        try {
            const response = await DataService.postData(Url.ContactDetail, { contactId });
            if (response.status === 200 && response.data.IsSuccess) {
                return response.data.Data;
            }
        }
        catch (e) {
            console.log(e)
        }
        return null;
    }

    static async getLicenseeCategories() {
        try {
            const response = await DataService.postData(Url.LicenseeCategories, {});
            if (response.status === 200 && response.data.IsSuccess) {
                return response.data.Data;
            }
        }
        catch (e) {
            console.log(e)
        }
        return [];
    }

    
    static async addContact(contact) {
        try {
            const response = await DataService.postData(Url.ContactAdd, contact);
            if (response.status === 200) {
                const { IsSuccess, ErrorCode } = response.data;
                return {
                    IsSuccess,
                    Message: IsSuccess ? LangHelper.getSingleResource('AddSuccess') : LangHelper.getSingleResource('LicenseeContactAddErrorMsg_' + ErrorCode)
                }
            }
        }
        catch (e) {
            console.log(e)
        }

        return {
            IsSuccess: false,
            Message: LangHelper.getSingleResource('HttpError_Default')
        };
    }

    static async editContact(contact) {
        try {
            const response = await DataService.postData(Url.ContactEdit, contact);
            if (response.status === 200) {
                const { IsSuccess, ErrorCode } = response.data;
                return {
                    IsSuccess,
                    Message: IsSuccess ? LangHelper.getSingleResource('UpdateSuccess') : LangHelper.getSingleResource('LicenseeContactEditErrorMsg_' + ErrorCode)
                }
            }
        }
        catch (e) {
            console.log(e)
        }

        return {
            IsSuccess: false,
            Message: LangHelper.getSingleResource('HttpError_Default')
        };
    }


    static async deleteContact(contactId) {
        try {
            const response = await DataService.postData(Url.ContactDelete, { contactId });
            if (response.status === 200) {
                const { IsSuccess, ErrorCode } = response.data;
                return {
                    IsSuccess,
                    Message: IsSuccess ? LangHelper.getSingleResource('DeleteSuccess') : LangHelper.getSingleResource('LicenseeContactDeleteErrorMsg_' + ErrorCode)
                }
            }
        }
        catch (e) {
            console.log(e)
        }

        return {
            IsSuccess: false,
            Message: LangHelper.getSingleResource('HttpError_Default')
        };
    }

    static async getUnassignedCategories() {
        const [contactList, categories] = await Promise.all([this.getContactList(null), this.getLicenseeCategories()]);
        const unassignedCategories = categories.filter(category => {
            const assigned = contactList.some(contact => contact.ToListId.some(to => to === category.CategoryId)
                || contact.CcListId.some(cc => cc === category.CategoryId));
            return !assigned;
        })
        return unassignedCategories;
    }
}
