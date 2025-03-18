import React, { useEffect, memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import { TreeViewOption } from '@jsroot/constants/report';
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import { ALL_SELECTED_TEXT } from './../../../common/lib/constants'

export const SportFilter = () => {
    const dispatch = useDispatch();
    const [selectedProduct, selectedSport, sportList ] = useSelector(state => [state.selectedProduct, state.selectedSport, state.sportList], shallowEqual);
    const { setSelectedSport, getLeagueList, setLeagueList, setSelectedLeague } = ActionCreators;

    useEffect(() => {
        getLeagueListByProductAndSport(selectedProduct, selectedSport);
    }, [selectedProduct]);


    const _sportChangeHandler = ((currentItem, selectedItemsKey) => {
        dispatch(setSelectedSport(selectedItemsKey));
        getLeagueListByProductAndSport(selectedProduct, selectedItemsKey);
    });

    const getLeagueListByProductAndSport = (selectedProduct, selectedSport) => {
        const isSingleSport = !!selectedSport && selectedSport !== ALL_SELECTED_TEXT && selectedSport.split(",").length === 1;
        const isEnableLeague = selectedProduct === 'SB' && isSingleSport;

        if (isEnableLeague) {
            dispatch(getLeagueList(selectedSport));
        }
        else {
            dispatch(setLeagueList([]));
            dispatch(setSelectedLeague(ALL_SELECTED_TEXT));
        }
    }

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