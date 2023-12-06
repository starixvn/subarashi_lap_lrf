import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import { TreeViewOption } from '@jsroot/constants/report'
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'

const SubsidiaryDropDown = () => {
    const dispatch = useDispatch();
    const {setSubsidiaryList} = ActionCreators;
    const {isWhiteLabelView} = useSubsidiarySearch();

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
            onChange={(currentItem, selectedItemsKey, treeViewList) => dispatch(setSubsidiaryList(selectedItemsKey))} />;
    }


    return (                        
    <div className="form-group">
        <label className="label-text">
            {isWhiteLabelView ? LangHelper.getSingleResource("WhiteLabel") : LangHelper.getSingleResource("Subsidiary")}
        </label>
        {_renderSubsidiaryTreeView()}
    </div>)
}

export default memo(SubsidiaryDropDown);