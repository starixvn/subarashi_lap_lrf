import React, { memo } from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';

export const LiveStatusFilter = (props) => {
    const {onChange} = props;

    const _renderLiveStatusSelectList = () => {
        const liveStatusList = AppData.liveStatusList;

        return liveStatusList?.length && (
            <MultipleSelect id="LiveStatusList"
                language={LangHelper.currentLanguage}
                dataSource={liveStatusList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={onChange} />);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Live")}</label>
        {_renderLiveStatusSelectList()}
    </div>)
}

const propTypes = {
    onChange: PropTypes.func
};

LiveStatusFilter.propTypes = propTypes;

export default memo(LiveStatusFilter);