import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { ActionCreators } from '../actions';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import GridHelper from '../../../lib/helpers/gridHelper';
import PlayerRow from './grid/PlayerRow';
import LangHelper from '@jsroot/lib/langHelper';
import SabaVirtualSettingCell from './grid/SabaVirtualSettingCell';

const MAX_WIDTH_PAGE = 1920;

export const DataGrid = (props) => {
    const MAX_WIDTH = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);
    const { playerList, pagingOption, selectedParams, selectedTabKey, setPagingOption, searchPlayer } = props;

    if (playerList == null) {
        return null;
    }
    if (!playerList.length) {
        return <NoDataTitle />;
    }

    const showSubsidiary = GridHelper.isShowSubsidiary(selectedParams.subsidiarySearch);

    const _renderDataSection = dataList => dataList.map((dataItem) => {
        return <PlayerRow {...{ dataItem, showSubsidiary }} />
    })

    const _renderHeaderSection = () => {
        return([
            <HeaderRow style={{ height: 32 }} key='header1'>
                {showSubsidiary && <HeaderCell colWidth={120} rowSpan={2}>{LangHelper.getSingleResource('Subsidiary')}</HeaderCell>}
                <HeaderCell colWidth={180} rowSpan={2} sortBy={2}>{LangHelper.getSingleResource('ExternalId')}</HeaderCell>
                <HeaderCell colWidth={180} rowSpan={2} sortBy={1}>{LangHelper.getSingleResource('SystemId')}</HeaderCell>    
                <HeaderCell colWidth={240} colSpan={2}><SabaVirtualSettingCell cell={{text : LangHelper.getSingleResource('SabaVirtualSetting')}}></SabaVirtualSettingCell></HeaderCell>
                <HeaderCell colWidth={180} rowSpan={2} sortBy={3}>{LangHelper.getSingleResource('LastModifiedDate')}</HeaderCell>
            </HeaderRow>,
            <HeaderRow style={{ height: 32 }} key='header2'>
                <HeaderCell colWidth={120} sortBy={4}>{LangHelper.getSingleResource('Soccer')}</HeaderCell>
                <HeaderCell colWidth={120} sortBy={5}>{LangHelper.getSingleResource('Basketball')}</HeaderCell>
            </HeaderRow>
        ])             
    }

    const _handleSort = (orderCol, sortType) => {
        sortType = sortType === 'asc' ? 1 : 2;

        const _pagingOption = {
            ...pagingOption,
            sortType,
            orderCol
        }
        const params = {
            ...selectedParams,
            ..._pagingOption
        }
        searchPlayer(selectedTabKey, params, GridHelper.callBackToUpdatePaging({ pagingOption, setPagingOption }));
    }

    return (
        <React.Fragment>
            <Table minWidth={650}
                autoWidth={true}
                maxWidth={MAX_WIDTH}
                autoHeight={true}
                header={_renderHeaderSection()}
                body={_renderDataSection(playerList)}
                containerPadding={30}
                shouldResetScrollPosition={true}
                onSort={_handleSort}/>
        </React.Fragment>
    );
}

function mapDispatchToProps(dispatch) {
    const { searchPlayer, setPagingOption } = ActionCreators;
    return bindActionCreators({ setPagingOption, searchPlayer }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedParams, selectedTabKey, pagingOption } = state;
    return Object.assign({}, { playerList, pagingOption, selectedParams, selectedTabKey });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(DataGrid));


