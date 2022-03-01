import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ActionCreators from '../actions'
import AutoComplete from '@jsroot/components/auto-complete'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import { Url } from '../lib/contants'
import ApiService from '../lib/service'
import { getCategoryDisplayName } from '../lib/helper';

const FormFilter = ({ fetchContactList, contactList }) => {

    const [contactName, setContactName] = useState(null);
    const [unassignedCategories, setUnassignedCategories] = useState([]);

    useEffect(() => {
        fetchContactList(null);
    }, [])

    useEffect(() => {
        contactList && _getUnassignedCategories();
    }, [contactList])

    const _getUnassignedCategories = async () => {
        const _unassignedCategories = await ApiService.getUnassignedCategories();
        setUnassignedCategories(_unassignedCategories);
        _unassignedCategories.length && window.dispatchEvent(new Event('resize'));
    }

    const _handleSearch = () => {
        fetchContactList(contactName);
    }

    const _renderCategoryNote = () => {
        if (!unassignedCategories || !unassignedCategories.length) {
            return null;
        }

        return <>
            <div className="row">
                <div className="col-5 warning-note">
                    <span className="text-bold">{LangHelper.getSingleResource('Note') + ': '}</span>
                    <span>{LangHelper.getSingleResource('LicenseeContactCategoryNote')}</span>
                </div>
            </div>
            {unassignedCategories.map(category => <div key={'UnassignedCategory_' + category.CategoryId} className="row">
                <div className="col-5 warning-note">
                    {`- ${getCategoryDisplayName(category)}`}
                </div>
            </div>)}
            <div className="row">
                <div className="col-5 warning-note">
                    {LangHelper.getSingleResource('LicenseeContactCategoryRuleNote')}
                </div>
            </div>
        </>
    }

    return (
        <CollapsiblePanel className="page-filter">
            <div className="row">
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Name")}</label>
                        <AutoComplete url={Url.ContactSuggestions}
                            queryParamName={'contactName'}
                            onSelect={setContactName}
                            onInput={setContactName}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" className="btn btn-submit" onClick={_handleSearch}>{LangHelper.getSingleResource('Search')}</button>
                        </div>
                    </div>
                </div>
            </div>
            {_renderCategoryNote()}
        </CollapsiblePanel>
    )
}

function mapDispatchToProps(dispatch) {
    const { fetchContactList } = ActionCreators;
    return bindActionCreators({
        fetchContactList
    }, dispatch);
}

function mapStateToProps(state) {
    const { contactList } = state;
    return {
        contactList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);