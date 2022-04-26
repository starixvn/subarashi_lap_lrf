import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ActionCreators from '../actions'
import AutoComplete from '@jsroot/components/auto-complete'
import { TreeViewSelect } from '@9softstudio/react-multiselect'
import CheckBox from '@jsroot/components/CheckBox'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import { Url } from '../lib/contants'
import ApiService from '../lib/service'
import { SubsidiaryViewType, TreeViewOption } from '@jsroot/constants/report'
import StringHelper from '@jsroot/lib/stringHelper'
import { getCategoryDisplayName, isShowSubsidiaryInfo } from '../lib/helper';

const FormFilter = ({ fetchContactList, contactList }) => {

    const _defaultSelectedSubsidiary = useMemo(() => AppData.subsidiaryList.join(','), []);
    const _showSubsidiaryDropdown = useMemo(() => isShowSubsidiaryInfo(AppData.subsidiaryViewType, AppData.subsidiaryList), []);
    const _showSubsidiarySearchCheckBox = useMemo(() => _showSubsidiaryDropdown && AppData.subsidiaryViewType === SubsidiaryViewType.MASTER_MANAGEMENT, [_showSubsidiaryDropdown]);

    const [contactName, setContactName] = useState(null);
    const [subsidiarySearch, setSubsidiarySearch] = useState(!_showSubsidiarySearchCheckBox && _showSubsidiaryDropdown);
    const [subsidiaryList, setSubsidiaryList] = useState(_defaultSelectedSubsidiary);
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
        fetchContactList(contactName, subsidiarySearch ? subsidiaryList.split(',') : null);
    }

    const _renderSubsidiaryTreeView = () => {
        return <TreeViewSelect
            language={LangHelper.currentLanguage}
            id="SubsidiaryTreeView"
            dataSource={AppData.whitelabelList}
            keyField="Value"
            valueField="Name"
            statusField="Checked"
            texts={{ SelectOptions: "Please select", All: "All", SelectedItemCount: "# selected" }}
            isAllTextShown={false}
            hasSearchBox={false}
            treeViewOption={TreeViewOption}
            onChange={(currentItem, selectedItemsKey, treeViewList) => setSubsidiaryList(selectedItemsKey)} />;
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
                {_showSubsidiaryDropdown && subsidiarySearch && <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">
                            {LangHelper.getSingleResource("WhiteLabel")}
                        </label>
                        {_renderSubsidiaryTreeView()}
                    </div>
                </div>}
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
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" className="btn btn-submit" disabled={subsidiarySearch 
                                && AppData.subsidiaryList.length > 0 && StringHelper.isEmptyOrWhiteSpace(subsidiaryList)} 
                                onClick={_handleSearch}>{LangHelper.getSingleResource('Search')}</button>
                        </div>
                    </div>
                </div>
                {_showSubsidiarySearchCheckBox && <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <CheckBox id="SubsidiarySearch"
                            checked={subsidiarySearch}
                            onChange={checked => { setSubsidiarySearch(checked); checked && setSubsidiaryList(_defaultSelectedSubsidiary)}}
                            label={LangHelper.getSingleResource("SubsidiarySearch")} />
                    </div>
                </div>}
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