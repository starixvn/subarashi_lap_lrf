import React, { memo } from "react";
import { TreeViewOption } from '@jsroot/constants/report';
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import LangHelper from "@jsroot/lib/langHelper";
import PropTypes from "prop-types";

export const BetTypeFilter = (props) => {
    const { value, onChange, options } = props;

    const _renderBetTypeSelectList = () => {
        if(!options || !options.length){
            return (
                <TreeViewSelect
                    language={LangHelper.currentLanguage}
                    id="BetTypeList"
                    dataSource={[]}
                    keyField="Value"
                    valueField="Name"
                    statusField="Checked"
                    texts={{ All: LangHelper.getSingleResource("N_A")  }}
                    isAllTextShown={true}
                    hasSearchBox={true}
                    treeViewOption={TreeViewOption}
                    isValid={false} />
            );
        }
        return (
            <TreeViewSelect                  
                language={LangHelper.currentLanguage}
                id="BetTypeList"
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
    };

    return (
        <div className='form-group'>
            <label className='label-text'>
                {LangHelper.getSingleResource("BetType")}
            </label>
            {_renderBetTypeSelectList()}
        </div>
    );
};

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    options: PropTypes.array,
};

BetTypeFilter.propTypes = propTypes;

export default memo(BetTypeFilter);
