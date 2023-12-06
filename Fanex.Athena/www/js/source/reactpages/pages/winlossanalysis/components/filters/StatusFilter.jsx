import React from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';
import { memo } from 'react';

export const StatusFilter = (props) => {
    const {onChange, isValid} = props
    const _renderStatusSelectList = () => {
        const statusList = AppData.statusList;

        return statusList && statusList.length && (
            <MultipleSelect
                id="StatusList"
                language={LangHelper.currentLanguage}
                dataSource={statusList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={onChange}
                isValid={isValid} />);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Status")}</label>
        {_renderStatusSelectList()}
    </div>)
}
const propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func
};
const defaultProps = {
    isValid: true
};

StatusFilter.propTypes = propTypes;
StatusFilter.defaultProps = defaultProps;

export default memo(StatusFilter);