import React, { memo } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import { TreeViewOption } from '@jsroot/constants/report'
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
import PropTypes from 'prop-types';

const SubsidiaryDropDownFilter = (props) => {
    const {onChange} = props
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
            onChange={onChange} />;
    }


    return (                        
    <div className="form-group">
        <label className="label-text">
            {isWhiteLabelView ? LangHelper.getSingleResource("WhiteLabel") : LangHelper.getSingleResource("Subsidiary")}
        </label>
        {_renderSubsidiaryTreeView()}
    </div>)
}

const propTypes = {
    onChange: PropTypes.func,
};

SubsidiaryDropDownFilter.propTypes = propTypes;

export default memo(SubsidiaryDropDownFilter);