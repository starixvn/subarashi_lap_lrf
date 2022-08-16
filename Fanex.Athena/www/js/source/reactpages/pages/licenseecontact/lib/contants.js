import Site from '@jsroot/lib/site';
import LangHelper from '@jsroot/lib/langHelper';

export const Url = {
    LicenseeCategories: Site.resolveClientUrl("LicenseeContact/GetCategories"),
    ContactSuggestions: Site.resolveClientUrl("LicenseeContact/GetSuggestions"),
    ContactList: Site.resolveClientUrl("LicenseeContact/GetList"),
    ContactDetail: Site.resolveClientUrl("LicenseeContact/GetDetail"),
    ContactAdd: Site.resolveClientUrl("LicenseeContact/Add"),
    ContactEdit: Site.resolveClientUrl("LicenseeContact/Edit"),
    ContactDelete: Site.resolveClientUrl("LicenseeContact/Delete")
}

export const ModificationActionType = {
    AddContact: 1,
    EditContact: 2,
    DeleteContact: 3
}

export const ContactType = {
    Individual: 0,
    Group: 1
}

export const RecipientType = {
    To: 0,
    Cc: 1
}

export const ContactTypeOptions = [
    { value: ContactType.Individual, label: LangHelper.getSingleResource('Individual') },
    { value: ContactType.Group, label: LangHelper.getSingleResource('Group') }
]


export const RecipientTypeOptions = [
    { value: RecipientType.To, label: LangHelper.getSingleResource('ToList') },
    { value: RecipientType.Cc, label: LangHelper.getSingleResource('CcList') }
]

export const fields = {
    Index: 'Index',
    Subsidiary: 'Subsidiary',
    ContactName: 'ContactName',
    ContactType: 'ContactType',
    Position: 'Position',
    Department: 'Department',
    Email: 'Email',
    Skype: 'Skype',
    ToList: 'ToList',
    Remark: 'Remark'
}

export const textHeaders = {
    [fields.Index]: '#',
    [fields.Subsidiary]: LangHelper.getSingleResource('Subsidiary2'),
    [fields.ContactName]: LangHelper.getSingleResource('Name'),
    [fields.ContactType]: LangHelper.getSingleResource('ContactType'),
    [fields.Position]: LangHelper.getSingleResource('Position'),
    [fields.Department]: LangHelper.getSingleResource('Department'),
    [fields.Email]: LangHelper.getSingleResource('Email'),
    [fields.Skype]: LangHelper.getSingleResource('Skype'),
    [fields.ToList]: LangHelper.getSingleResource('ToList'),
    [fields.Remark]: LangHelper.getSingleResource('Remark'),
    Action: LangHelper.getSingleResource('Action'),
}