import React from 'react'
import { TreeViewOption } from '@jsroot/constants/report';
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import PropTypes from 'prop-types';
import { memo } from 'react';

export const BetTypeFilter = (props) => {
    const {dataSource, onChange, isValid } = props;

    const _renderBettypeSelectList = () => {  
            if(!dataSource || !dataSource.length){
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
        <label className="label-text">{LangHelper.getSingleResource("BetType")}</label>
        {_renderBettypeSelectList()}
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


BetTypeFilter.propTypes = propTypes;
BetTypeFilter.defaultProps = defaultProps;

export default memo(BetTypeFilter);