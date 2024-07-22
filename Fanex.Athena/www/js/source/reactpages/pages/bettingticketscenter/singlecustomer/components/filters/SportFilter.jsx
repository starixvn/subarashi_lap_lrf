import React, { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import { TreeViewOption } from '@jsroot/constants/report';
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'

export const SportFilter = () => {
    const dispatch = useDispatch();
    const [selectedSport, sportList ] = useSelector(state => [state.selectedSport, state.sportList], shallowEqual);
    const { setSelectedSport } = ActionCreators;

    const _sportChangeHandler = ((currentItem, selectedItemsKey) => {
        dispatch(setSelectedSport(selectedItemsKey));
    });

    const _renderSportSelectList = () => {
        if(!sportList || !sportList.length){
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
                dataSource={sportList}
                keyField="Value"
                valueField="Name"
                statusField="Checked"
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption}
                onChange={_sportChangeHandler}
                isValid={!!selectedSport}  />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Sport")}</label>
        {_renderSportSelectList()}
    </div>)
}

export default memo(SportFilter);