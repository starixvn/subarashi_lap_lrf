import React, { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import { TreeViewOption } from '@jsroot/constants/report';
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'

export const BetTypeFilter = () => {
    const dispatch = useDispatch();
    const [selectedBettype, bettypeList ] = useSelector(state => [state.selectedBettype, state.bettypeList], shallowEqual);
    const {setSelectedBettype} = ActionCreators;

    const _betTypeChangeHandler = (currentItem, selectedItemsKey) => dispatch(setSelectedBettype(selectedItemsKey));

    const _renderBettypeSelectList = () => {  
        if(!bettypeList || !bettypeList.length){
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
                dataSource={bettypeList}
                keyField="Value"
                valueField="Name"
                statusField="Checked"
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption}
                onChange={_betTypeChangeHandler}
                isValid={!!selectedBettype}  />
        );
    
}

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("BetType")}</label>
        {_renderBettypeSelectList()}
    </div>)
}

export default memo(BetTypeFilter);