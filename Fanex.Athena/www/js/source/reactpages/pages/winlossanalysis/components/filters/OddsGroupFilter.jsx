import React from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';
import { memo } from 'react';

export const OddsGroupFilter = (props) => {
    const { onChange, isValid } = props
    
    const _renderOddsGroupsSelectList = () => {
        const oddsGroupList = AppData.oddsGroupList;
        return oddsGroupList?.length && (
            <MultipleSelect
                id="ddlOddGroup"
                language={LangHelper.currentLanguage}
                dataSource={oddsGroupList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={onChange} 
                isValid={isValid}/>);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("OddsGroup")}</label>
        {_renderOddsGroupsSelectList()}
    </div>)
}

const propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func
};
const defaultProps = {
    isValid: true
};

OddsGroupFilter.propTypes = propTypes;
OddsGroupFilter.defaultProps = defaultProps;

export default memo(OddsGroupFilter);