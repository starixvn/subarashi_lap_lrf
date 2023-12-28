import React from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';
import { memo } from 'react';

export const LiveStatusFilter = (props) => {
    const {onChange, isValid} = props;

    const _renderLiveStatusSelectList = () => {
        const liveStatusList = AppData.liveStatusList;

        return liveStatusList && liveStatusList.length && (
            <MultipleSelect
                id="LiveStatusList"
                language={LangHelper.currentLanguage}
                dataSource={liveStatusList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={onChange}
                isValid={isValid} />);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("LiveStatus")}</label>
        {_renderLiveStatusSelectList()}
    </div>)
}

const propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func
};
const defaultProps = {
    isValid: true
};

LiveStatusFilter.propTypes = propTypes;
LiveStatusFilter.defaultProps = defaultProps;

export default memo(LiveStatusFilter);