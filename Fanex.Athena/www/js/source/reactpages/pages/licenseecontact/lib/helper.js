import { ContactTypeOptions, fields, ContactType } from './contants';
import { validateEmail } from '@jsroot/lib/validationHelper';
import StringHelper from '@jsroot/lib/stringHelper';
import LangHelper from '@jsroot/lib/langHelper'

export const contactValidationHandler = {
    [fields.Email]: value => validateEmail(value),
    [fields.ContactType]: value => value === ContactType.Individual || value === ContactType.Group,
    ['Categories']: value => value.length && value.some(category => category.RecipientType !== null)
}

export const getContactTypeText = contactType => ContactTypeOptions.find(_ => _.value === contactType)?.label || '';

export const validateContact = contact => {
    if (!contact) {
        return false;
    }
    const { Remark, ContactID, ...validateFields } = contact;
    const isInvalid = Object.keys(validateFields).some(field => contactValidationHandler[field]
        ? !contactValidationHandler[field](contact[field]) : StringHelper.isEmptyOrWhiteSpace(contact[field]))
    return !isInvalid;
}

export const getCategoryDisplayName = category => LangHelper.currentLanguage === LangHelper.languageKeys.zhCN ? (category.CategoryNameCN || category.CategoryName) : category.CategoryName;

