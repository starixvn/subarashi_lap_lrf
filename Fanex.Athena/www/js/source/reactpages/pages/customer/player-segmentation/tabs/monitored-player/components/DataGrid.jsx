import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Row, Cell } from '@9softstudio/react-grid';
import CheckBox from '@jsroot/components/CheckBox'
import AppData from '@jsroot/lib/AppData';
import { ActionCreators } from '../actions';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import GridHelper from '../../../lib/helpers/gridHelper';
import LangHelper from '@jsroot/lib/langHelper'
import { getDataGridHeaders } from '../helper/gridHelper';
import { tabKeys } from '../../../lib/constants';
import { UserActionType } from '../lib/constants'
import { BatchUpdateMonitoredPlayerAlertOption } from '../helper/sweetAlertHelper';
import ThresholdCell from './grid/ThresholdCell';
import { SortMapper } from '../../../lib/constants';

const MAX_WIDTH_PAGE = 1920;

export const DataGrid = (props) => {
    const MAX_WIDTH = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);
    const { isCheckAll, playerList, pagingOption, selectedParams, setPlayerList, setCurrentUserAction,
        setPagingOption, searchPlayer, setSweetAlertOption, deleteMonitoredPlayer } = props;
    const canEdit = AppData[tabKeys.monitoredPlayer].canEdit;

    if (playerList == null) {
        return null;
    }
    if (!playerList.length) {
        return <NoDataTitle />;
    }

    const showSubsidiary = GridHelper.isShowSubsidiary(selectedParams.subsidiarySearch);

    const _dataGridHeaders = React.useMemo(() => {
        const headers = getDataGridHeaders(canEdit, showSubsidiary);
        if (canEdit) {
            return [{
                key: 'CheckAll', text: null, colWidth: 30, childComponent: <CheckBox id="IsCheckAll"
                    checked={isCheckAll}
                    onChange={checked => {
                        const newPlayerList = playerList.map(_ => {
                            return {
                                ..._,
                                ...{ isSelected: checked }
                            }
                        });

                        setPlayerList(newPlayerList);
                    }} />
            }, ...headers]
        }

        return headers;

    }, [playerList, canEdit, showSubsidiary]);

    const _headers = React.useMemo(() => GridHelper.renderHeader(_dataGridHeaders, [_dataGridHeaders]));

    const _body = React.useMemo(() => playerList.map((dataItem, rowIndex) => {
        return <Row key={`player_row_${dataItem.custId}`}>
            {canEdit && <Cell className="center-align">
                <CheckBox id={`selectPlayer_${dataItem.custId}`}
                    checked={dataItem.isSelected === true}
                    onChange={(checked) => {
                        const newDataItem = {
                            ...dataItem,
                            ...{ isSelected: checked }
                        }
                        const newPlayerList = [...playerList];
                        newPlayerList[rowIndex] = newDataItem;
                        setPlayerList([...newPlayerList])
                    }} /></Cell>}
            {showSubsidiary && <Cell className="left-align">{dataItem.subsidiary}</Cell>}
            <Cell className="left-align">{dataItem.externalId}</Cell>
            <Cell className="left-align">{dataItem.systemId}</Cell>
            <Cell className="center-align">{dataItem.currency}</Cell>
            <ThresholdCell player={dataItem} canEdit={canEdit} />
            <Cell className="center-align">
                <button className="btn-default btn-link"
                    onClick={() => {
                        const { fromDate, toDate } = selectedParams;
                        setCurrentUserAction({
                            type: UserActionType.ViewReachedHistory,
                            data: {
                                custId: dataItem.custId,
                                systemId: dataItem.systemId,
                                externalId: dataItem.externalId,
                                fromDate, toDate
                            }
                        })
                    }}>
                    {dataItem.noOfReached}
                </button>
            </Cell>
            <Cell className="center-align">{dataItem.lastReachedDateDisplay}</Cell>
            <Cell className="center-align">{LangHelper.getSingleResource(LangHelper.getSingleResource(dataItem.problemPlayer ? 'Yes' : 'No'))}</Cell>
            <Cell className="center-align">{LangHelper.getSingleResource(LangHelper.getSingleResource(dataItem.vipPlayer ? 'Yes' : 'No'))}</Cell>
            <Cell className="center-align action-cell">
                <button className="btn-default btn-link btn-icon delete-icon"
                    onClick={() => {
                        const onSuccess = BatchUpdateMonitoredPlayerAlertOption
                            .createHandlerAfterBatchUpdateMonitoredPlayerSuccess({ searchPlayer, setPagingOption, pagingOption, selectedParams, setSweetAlertOption, selectedTabKey: tabKeys.monitoredPlayer });
                        deleteMonitoredPlayer(dataItem.custId, dataItem.systemId, onSuccess)
                    }}>
                    <i className="material-icons">delete</i>
                </button>
            </Cell>
        </Row>
    }), [playerList])

    const _handleSort = (orderCol, sortType) => {
        const sortInfo = { orderCol, sortType: SortMapper.sortType[sortType] };
        const _pagingOption = {
            ...pagingOption,
            ...sortInfo
        }
        const params = {
            ...selectedParams,
            ..._pagingOption
        }
        searchPlayer(tabKeys.monitoredPlayer, params, GridHelper.callBackToUpdatePaging({ pagingOption, setPagingOption }));
    }

    return (
        <React.Fragment>
            <Table minWidth={650}
                autoWidth={true}
                maxWidth={MAX_WIDTH}
                autoHeight={true}
                header={_headers}
                body={_body}
                containerPadding={30}
                shouldResetScrollPosition={true}
                onSort={_handleSort} />
        </React.Fragment>
    );
}

function mapDispatchToProps(dispatch) {
    const { searchPlayer, setPlayerList, setPagingOption, setSelectedPlayer,
        setSweetAlertOption, setCurrentUserAction, deleteMonitoredPlayer } = ActionCreators;
    return bindActionCreators({
        setPlayerList, setPagingOption, searchPlayer, setSelectedPlayer,
        setSweetAlertOption, setCurrentUserAction, deleteMonitoredPlayer
    }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedParams, pagingOption } = state;
    const isCheckAll = playerList && !playerList.some(_ => !_.isSelected);
    return Object.assign({}, { playerList, isCheckAll, pagingOption, selectedParams });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);


