import React from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';
import { memo } from 'react';


export const PlatformFilter = (props) => {
    const {onChange, isValid} = props;

    const _renderPlatformSelectList = () => {
        const platformList = AppData.platformList;

        return platformList && platformList.length && (
            <MultipleSelect
                id="PlatformList"
                language={LangHelper.currentLanguage}
                dataSource={platformList}
                valueField={"value"}
                keyField={"id"}
                statusField={"status"}
                onChange={onChange}
                isValid={isValid}  />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Platform")}</label>
        {_renderPlatformSelectList()}
    </div>)
}

const propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func
};
const defaultProps = {
    isValid: true
};

PlatformFilter.propTypes = propTypes;
PlatformFilter.defaultProps = defaultProps;

export default memo(PlatformFilter);