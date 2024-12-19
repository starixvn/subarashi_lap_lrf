import React, { memo } from 'react'
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import { TreeViewOption } from '@jsroot/constants/report';
import LangHelper from '@jsroot/lib/langHelper'
import PropTypes from 'prop-types';

export const SportFilter = (props) => {
    const {value, onChange, options} = props;

    const _renderSportSelectList = () => {
        if(!options || !options.length){
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
                dataSource={options}
                keyField="Value"
                valueField="Name"
                statusField="Checked"
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption}
                onChange={onChange}
                isValid={!!value}  />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Sport")}</label>
        {_renderSportSelectList()}
    </div>)
}

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    options: PropTypes.array
};

SportFilter.propTypes = propTypes;

export default memo(SportFilter);