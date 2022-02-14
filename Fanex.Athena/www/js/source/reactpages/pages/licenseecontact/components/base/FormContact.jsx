import React, { useState, useMemo } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import Select from 'react-select'
import CheckBox from '@jsroot/components/CheckBox'
import RadioGroup from '@jsroot/components/radio/RadioGroup'
import NoDataTitle from '@jsroot/components/NoDataTitle'
import { ContactTypeOptions, RecipientTypeOptions, RecipientType, fields } from '../../lib/contants';
import SweetAlert from '@jsroot/components/sweet-alert';
import { generateDefaultConfirmOption, generateDefaultAlertOption, defaultOkButton, predefinedIcons } from '@jsroot/lib/sweetAlert';
import StringHelper from '@jsroot/lib/stringHelper';
import { validateContact, contactValidationHandler, getCategoryDisplayName } from '../../lib/helper';

const FormContact = ({ contact, setContact, api, msgConfirm, hasConfirm, afterSuccess, toggleLoader }) => {

    const [sweetAlertOption, setSweetAlertOption] = useState(null);

    const _isDisabledSubmit = useMemo(() => !validateContact(contact), [contact])

    if (!contact) {
        return <NoDataTitle />;
    }


    const _renderGeneralInformation = () => {
        return <div className="general-information col-12 col-md-6 col-sm-6 col-lg-6 col-xl-6">
            <div className="row">
                <div className="title col-12">
                    {LangHelper.getSingleResource('GeneralInformation')}
                </div>
            </div>
            <div className="row">
                <label className="col-5 label-text">{LangHelper.getSingleResource("ContactType")}<span className="required">*</span></label>
                <div className="col-7">
                    <Select instanceId="ContactTypeOptions"
                        className={!contactValidationHandler[fields.ContactType](contact.ContactType) ? 'select-highlight' : ''}
                        isSearchable={false}
                        value={contact.ContactType}
                        options={ContactTypeOptions}
                        onChange={(item) => setContact({ ...contact, ContactType: item.value })} />
                </div>
            </div>
            <div className="row">
                <label className="col-5 label-text">{LangHelper.getSingleResource("Name")}<span className="required">*</span></label>
                <div className="col-7">
                    <input type="text" id="Name" name="Name" className={`input-text ${StringHelper.isEmptyOrWhiteSpace(contact.ContactName) ? 'input-highlight' : ''}`}
                        maxLength={50}
                        value={contact.ContactName}
                        onChange={(event) => setContact({ ...contact, ContactName: event.target.value })} />
                </div>
            </div>
            <div className="row">
                <label className="col-5 label-text">{LangHelper.getSingleResource("Position")}<span className="required">*</span></label>
                <div className="col-7">
                    <input type="text" id="Position" name="Position" className={`input-text ${StringHelper.isEmptyOrWhiteSpace(contact.Position) ? 'input-highlight' : ''}`}
                        maxLength={50}
                        value={contact.Position}
                        onChange={(event) => setContact({ ...contact, Position: event.target.value })} />
                </div>
            </div>
            <div className="row">
                <label className="col-5 label-text">{LangHelper.getSingleResource("Department")}<span className="required">*</span></label>
                <div className="col-7">
                    <input type="text" id="Department" name="Department" className={`input-text ${StringHelper.isEmptyOrWhiteSpace(contact.Department) ? 'input-highlight' : ''}`}
                        maxLength={50}

                        value={contact.Department}
                        onChange={(event) => setContact({ ...contact, Department: event.target.value })} />
                </div>
            </div>
            <div className="row">
                <label className="col-5 label-text">{LangHelper.getSingleResource("Email")}<span className="required">*</span></label>
                <div className="col-7">
                    <input type="email" id="Email" name="Email" className={`input-text ${!contactValidationHandler[fields.Email](contact.Email) ? 'input-highlight' : ''}`}
                        maxLength={50}
                        value={contact.Email}
                        onChange={(event) => setContact({ ...contact, Email: event.target.value })} />
                </div>
            </div>
            <div className="row">
                <label className="col-5 label-text">{LangHelper.getSingleResource("Skype")}<span className="required">*</span></label>
                <div className="col-7">
                    <input type="text" id="Skype" name="Skype" className={`input-text ${StringHelper.isEmptyOrWhiteSpace(contact.Skype) ? 'input-highlight' : ''}`}
                        maxLength={50}

                        value={contact.Skype}
                        onChange={(event) => setContact({ ...contact, Skype: event.target.value })} />
                </div>
            </div>
            <div className="row">
                <label className="col-5 label-text">{LangHelper.getSingleResource("Remark")}</label>
            </div>
            <div className="row">
                <div className="col-12">
                    <textarea id="Remark" name="Remark" rows={4} maxLength={300}
                        value={contact.Remark}
                        onChange={(event) => setContact({ ...contact, Remark: event.target.value })} />
                    <div className="character-remain">
                        {LangHelper.getSingleResource('CharactersRemaining').replace('{0}', 300 - (contact.Remark?.length || 0))}
                    </div>
                </div>
            </div>
        </div>
    }

    const _renderCategoriesSelection = () => {
        const existedCategories = !!contact.Categories.length;
        const isInvalid = !contact.Categories.some(category => category.RecipientType !== null)
        return <div className="category-selection col-12 col-md-6 col-sm-6 col-lg-6 col-xl-6">
            <div className="row">
                <div className="title col-12">
                    {LangHelper.getSingleResource('CategoriesSelection')}
                </div>
                {existedCategories ? <div className="col-12 info-note">
                    * {LangHelper.getSingleResource('AtLeastOneCategoryMustBeSelected')}
                </div> : <>
                    <div className="col-12 warning-note">
                        * {LangHelper.getSingleResource('TheLicenseeHasNoAssignedCategory')}
                    </div>
                </>}
            </div>
            {existedCategories && _renderCategoryAllSelection()}
            {<div className={isInvalid ? "invalid" : ""}>
                {existedCategories && contact.Categories.map(_renderCategorySelection)}
            </div>}
        </div>
    }

    const _renderCategoryAllSelection = () => {
        const isCheckedAll = contact.Categories.every(_ => _.RecipientType === RecipientType.To)
            || contact.Categories.every(_ => _.RecipientType === RecipientType.Cc);

        return <div className="row" >
            <div className="col-12">
                <CheckBox id={"category-selection-all"}
                    checked={isCheckedAll}
                    onChange={checked => {
                        contact.Categories.forEach(category => {
                            category.RecipientType = checked ? RecipientType.To : null;
                        });
                        setContact({ ...contact })
                    }}
                    label={LangHelper.getSingleResource('AllCategories')} />
            </div>
            {isCheckedAll && <div className="col-12">
                <RadioGroup
                    name={"category-selection-group-radio-all"}
                    value={contact.Categories[0].RecipientType}
                    options={RecipientTypeOptions}
                    onChange={(selectedRecipientType) => {
                        contact.Categories.forEach(category => {
                            category.RecipientType = selectedRecipientType;
                        });
                        setContact({ ...contact })
                    }}
                />
            </div>}
        </div>
    }

    const _renderCategorySelection = category => {
        return <div className="row" >
            <div className="col-12">
                <CheckBox id={"category-selection" + category.CategoryId}
                    checked={category.RecipientType !== null}
                    onChange={checked => {
                        category.RecipientType = checked ? RecipientType.To : null;
                        setContact({ ...contact })
                    }}
                    label={getCategoryDisplayName(category)} />
            </div>
            {category.RecipientType !== null && <div className="col-12">
                <RadioGroup
                    key={'category-selection-group-radio' + category.CategoryId + '_' + category.RecipientType}
                    name={"category-selection-group-radio" + category.CategoryId}
                    value={category.RecipientType}
                    options={RecipientTypeOptions}
                    onChange={(selectedRecipientType) => {
                        category.RecipientType = selectedRecipientType;
                        setContact({ ...contact })
                    }}
                />
            </div>}
        </div>
    }

    const handleCloseAlert = () => {
        setSweetAlertOption(null);
    }

    const _handleSubmit = () => {
        if (!validateContact(contact)) {
            return;
        }

        const unassignedCategories = _getUnassignedCategories(contact.Categories);
        const hasUnassignedCategories = unassignedCategories.length > 0;
        if (hasConfirm) {
            setSweetAlertOption(
                generateDefaultConfirmOption(msgConfirm, handleCloseAlert, {
                    ...defaultOkButton,
                    onClick: hasUnassignedCategories ? () => _handleUnassignedCategoriesWarning(unassignedCategories) : _handleCallApi
                }, { onClick: handleCloseAlert }, null, { width: 300, height: 130, title: LangHelper.getSingleResource("Confirmation") })
            );
        } else if (hasUnassignedCategories) {
            _handleUnassignedCategoriesWarning(unassignedCategories);
        } else {
            _handleCallApi();
        }2
    }

    const _handleUnassignedCategoriesWarning = unassignedCategories => {
        const warningMsg = <>
            <p className="warning-title">{LangHelper.getSingleResource("NotReceiveNotificationOnCategoriesWarning")}</p>
            {unassignedCategories.map(_ => <p>{_}</p>)}
        </>
        const confirmOption = generateDefaultConfirmOption(warningMsg, handleCloseAlert, {
            ...defaultOkButton,
            onClick: _handleCallApi
        }, { onClick: handleCloseAlert }, null, { title: LangHelper.getSingleResource("Confirmation"), height: 38 + 48 + unassignedCategories.length * 28 + 50 });
        setSweetAlertOption(confirmOption);
    }

    const _handleCallApi = async () => {
        toggleLoader(true);
        const response = await api(contact);
        toggleLoader(false);
        const { IsSuccess, Message } = response;
        const displayIcon = IsSuccess ? predefinedIcons.success : predefinedIcons.error;
        const title = IsSuccess ? LangHelper.getSingleResource("MessageSuccess") :  LangHelper.getSingleResource("Error")
        const alertOpt = generateDefaultAlertOption(Message, () => { handleCloseAlert(); IsSuccess && afterSuccess(); }, null, displayIcon);
        setSweetAlertOption({ ...alertOpt, title });
    }

    const _getUnassignedCategories = categories => {
        return categories
            .filter(category => category.RecipientType === null)
            .map(getCategoryDisplayName);
    
    }

    const _renderSubmit = () => {
        return <div className="form-bottom col-12">
            <div className="button-group">
                <button type="button" className="btn btn-submit" disabled={_isDisabledSubmit} onClick={_handleSubmit}>{LangHelper.getSingleResource('Submit')}</button>
            </div>
        </div>
    }

    return (
        <div className="form-edit row">
            {_renderGeneralInformation()}
            {_renderCategoriesSelection()}
            {_renderSubmit()}
            {sweetAlertOption && <SweetAlert {...sweetAlertOption} />}
        </div>
    )
}

export default React.memo(FormContact)