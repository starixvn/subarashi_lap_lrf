import React from 'react'
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import PropTypes from 'prop-types';
import { TreeViewOption } from '@jsroot/constants/report';
import { memo } from 'react';

export const SportFilter = (props) => {
    const {dataSource, onChange, isValid } = props;

    const _renderSportSelectList = () => {
        if(!dataSource || !dataSource.length){
            return(
            <TreeViewSelect
                language={LangHelper.currentLanguage}
                id="SportList"
                dataSource={[]}
                keyField="Value"
                valueField="Name"
                statusField="Checked"
                texts={{ All: LangHelper.getSingleResource("N_A") }}
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption}
                isValid={false} />
            )
        }

        return (
            <TreeViewSelect              
                language={LangHelper.currentLanguage}
                id="SportList"
                dataSource={dataSource}
                keyField="Value"
                valueField="Name"
                statusField="Checked"
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption}
                onChange={onChange}
                isValid={isValid}  />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Sport")}</label>
        {_renderSportSelectList()}
    </div>)
}

const propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func,
    dataSource: PropTypes.array
};

const defaultProps = {
    isValid: true,
    dataSource: []
};

SportFilter.propTypes = propTypes;
SportFilter.defaultProps = defaultProps;

export default memo(SportFilter);