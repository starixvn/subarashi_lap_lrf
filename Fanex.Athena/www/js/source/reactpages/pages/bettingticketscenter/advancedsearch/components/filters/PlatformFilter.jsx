import React, { memo } from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';


export const PlatformFilter = (props) => {
    const {onChange} = props;

    const _renderPlatformSelectList = () => {
        const platformList = AppData.platformList;

        return platformList?.length && (
            <MultipleSelect key="platformList"
                id="PlatformList"
                language={LangHelper.currentLanguage}
                dataSource={platformList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={onChange} />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Platform")}</label>
        {_renderPlatformSelectList()}
    </div>)
}

const propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

PlatformFilter.propTypes = propTypes;

export default memo(PlatformFilter);