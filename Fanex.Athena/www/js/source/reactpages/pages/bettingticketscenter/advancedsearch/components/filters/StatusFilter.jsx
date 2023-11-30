import React, { memo } from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';

export const StatusFilter = (props) => {
    const {onChange} = props
    const _renderStatusSelectList = () => {
        const statusList = AppData.statusList;

        return statusList?.length && (
            <MultipleSelect id="StatusList"
                language={LangHelper.currentLanguage}
                dataSource={statusList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={onChange} />);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Status")}</label>
        {_renderStatusSelectList()}
    </div>)
}
const propTypes = {
    onChange: PropTypes.func
};

StatusFilter.propTypes = propTypes;

export default memo(StatusFilter);