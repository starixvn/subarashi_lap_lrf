import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Row, Cell } from '@9softstudio/react-grid';
import { ActionCreators } from '../actions';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import LangHelper from '@jsroot/lib/langHelper';
import { HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { DefaultPagingOption } from '../lib/constants';
import { GetData } from '../lib/queryService'
import AppData from '@jsroot/lib/AppData'
import { SubsidiaryViewType } from '../../../../../../constants/report'

export const DataGrid = (props) => {
    const [pagingOption, setPagingOption] = useState(DefaultPagingOption);
    const { isLoading, selectedParams, data } = props;
 
    if (data == null || selectedParams == null) {
        return null;
    }

    const { DataList, TotalRows } = data;

    if (!DataList?.length) {
        return <NoDataTitle />;
    }

    const _headers = () => ([
        <HeaderRow style={{ height: 32 }} key='header1'>
            <HeaderCell colWidth={100} rowSpan={2}>{LangHelper.getSingleResource('LogID')}</HeaderCell>
            <HeaderCell colWidth={140} rowSpan={2}>{LangHelper.getSingleResource('LogDate')}</HeaderCell>
            <HeaderCell colWidth={210} rowSpan={2}>{LangHelper.getSingleResource('Action')}</HeaderCell>    
            <HeaderCell colWidth={320} colSpan={3}>{LangHelper.getSingleResource('Detail')}</HeaderCell>
            <HeaderCell colWidth={120} rowSpan={2}>{LangHelper.getSingleResource('Modify')}</HeaderCell>
        </HeaderRow>,
        <HeaderRow style={{ height: 32 }} key='header2' className='row2'>
            <HeaderCell colWidth={190}>
                {AppData.subsidiaryViewType !== SubsidiaryViewType.NOT_MANAGEMENT 
                ? `${LangHelper.getSingleResource("Subsidiary")}/${LangHelper.getSingleResource("Currency")}` 
                : LangHelper.getSingleResource("Currency")}
            </HeaderCell>
            <HeaderCell colWidth={65}>{LangHelper.getSingleResource('NewValue')}</HeaderCell>
            <HeaderCell colWidth={65}>{LangHelper.getSingleResource('OldValue')}</HeaderCell>
        </HeaderRow>
    ]);

    const _body = () => DataList.map((dataItem, rowIndex) => {
        const {LogId, LogDate, Action, Object, NewValue, OldValue, Modify} = dataItem;

        return <Row key={`row_${rowIndex}_${LogId}`}>
            <Cell className="center-align">{LogId}</Cell>
            <Cell className="center-align">{LogDate}</Cell>
            <Cell className="center-align">{Action}</Cell>
            <Cell className="center-align">{Object}</Cell>
            <Cell className="center-align">{NewValue}</Cell>
            <Cell className="center-align">{OldValue}</Cell>
            <Cell className="center-align">{Modify}</Cell>
        </Row>
    });

    const _handePaging = async (pageSize, pageIndex, lastIndex) => {

        props.toggleLoader(true);

        const newSelectedParams = { 
            ...selectedParams,
            PageIndex: pageIndex,
            PageSize: pageSize
        };
        setPagingOption({
            ...pagingOption,
            PageIndex: pageIndex,
            PageSize: pageSize,
            LastIndex: lastIndex
        });

        props.toggleLoader(true);
        var data = await GetData(newSelectedParams);
        !!data && props.setData(data);
        props.setSelectedParams(newSelectedParams);
        props.toggleLoader(false);
    }

    var currenPagingOption = {
        PageIndex: selectedParams.PageIndex,
        PageSize: selectedParams.PageSize,
        TotalItem: TotalRows,
        PageList: pagingOption.PageList
    };

    return (
        <Table minWidth={650}
            autoWidth={true}
            autoHeight={true}
            header={_headers()}
            body={_body()}
            containerPadding={30}
            pageOption={currenPagingOption}
            shouldResetScrollPosition={isLoading}
            isPaging={true}
            onPaging={async (pageIndex, pageSize) => await _handePaging(pageSize, pageIndex)} />
    );
}

function mapDispatchToProps(dispatch) {
    const {  toggleLoader, setData, setSelectedParams } = ActionCreators;
    return bindActionCreators({ toggleLoader, setData, setSelectedParams }, dispatch);
}

function mapStateToProps(state) {
    const { data, selectedParams, isLoading } = state;
    return Object.assign({}, { data, selectedParams, isLoading });
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);


