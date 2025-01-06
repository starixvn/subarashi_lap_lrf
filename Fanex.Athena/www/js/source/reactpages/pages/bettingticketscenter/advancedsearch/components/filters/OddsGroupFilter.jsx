import React, { memo } from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';
import { ALL_SELECTED_TEXT } from './../../../common/lib/constants'

export const OddsGroupFilter = (props) => {
    const { onChange } = props
    
    const _renderOddsGroupsSelectList = () => {
        const oddsGroups = AppData.oddsGroups;

        return oddsGroups?.length && (
            <MultipleSelect key="oddsGroup"
                id="OddsGroup"
                language={LangHelper.currentLanguage}
                dataSource={oddsGroups}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={onChange} 
                allOptionValue={ALL_SELECTED_TEXT}/>
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("OddsGroup")}</label>
        {_renderOddsGroupsSelectList()}
    </div>)
}

const propTypes = {
    onChange: PropTypes.func
};

OddsGroupFilter.propTypes = propTypes;

export default memo(OddsGroupFilter);