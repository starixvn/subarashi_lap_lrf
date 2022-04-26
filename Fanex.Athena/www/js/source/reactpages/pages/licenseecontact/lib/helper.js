import { ContactTypeOptions, fields, ContactType } from './contants';
import { validateEmail } from '@jsroot/lib/validationHelper';
import StringHelper from '@jsroot/lib/stringHelper';
import LangHelper from '@jsroot/lib/langHelper'
import { SubsidiaryViewType } from '@jsroot/constants/report'

export const contactValidationHandler = {
    [fields.Email]: value => validateEmail(value),
    [fields.ContactType]: value => value === ContactType.Individual || value === ContactType.Group,
    [fields.Subsidiary]: (value, requiredSubsidiary) => !requiredSubsidiary || !!value,
    ['Categories']: value => value.length && value.some(category => category.RecipientType !== null)
}

export const getContactTypeText = contactType => ContactTypeOptions.find(_ => _.value === contactType)?.label || '';

export const validateContact = (contact, requiredSubsidiary) => {
    if (!contact) {
        return false;
    }
    const { Remark, ContactID, ...validateFields } = contact;
    const isInvalid = Object.keys(validateFields).some(field => contactValidationHandler[field]
        ? !contactValidationHandler[field](contact[field], requiredSubsidiary) : StringHelper.isEmptyOrWhiteSpace(contact[field]))
    return !isInvalid;
}

export const getCategoryDisplayName = category => LangHelper.currentLanguage === LangHelper.languageKeys.zhCN ? (category.CategoryNameCN || category.CategoryName) : category.CategoryName;

export const isShowSubsidiaryInfo = (subsidiaryViewType, subsidiaryList) => subsidiaryViewType !== SubsidiaryViewType.NOT_MANAGEMENT && subsidiaryList.length > 0; 

