import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@9softstudio/react-grid';
import NoDataTitle from '@jsroot/components/NoDataTitle'
import LangHelper from '@jsroot/lib/langHelper'
import NumberFormat from '@jsroot/lib/numberFormat';
import { decode } from '@jsroot/lib/htmlHelper';
import MonitoredPlayerService from '../lib/queryService';
import { SortMapper } from '../../../lib/constants';

const FormReachedHistory = ({ custId, systemId, externalId, fromDate, toDate }) => {
    const [data, setData] = useState([]);
    let title = useRef(null);
    let _sortInfo = useRef({});

    const hasData = useMemo(() => data && !!data.length, [data]);

    const _fetchData = async (sortInfo = {}) => {
        _sortInfo.current = sortInfo;
        const response = await MonitoredPlayerService.getMonitoredPlayerReachedHistory({ custId, fromDate, toDate, ..._sortInfo.current });
        setData(response.data);
    }

    useEffect(() => {
        title.current = decode(LangHelper.getSingleResource("MonitoredPlayerNotificationHistoryTitle"))
            .replace("{0}", fromDate)
            .replace("{1}", toDate)
            .replace("{2}", `${externalId} (${systemId})`);
        _fetchData();
    }, [])

    const _onSort = (orderCol, sortType) => _fetchData({ orderCol, sortType: SortMapper.sortType[sortType] });

    const _exportExcel = (event) => {
        event.preventDefault();
        if (!hasData) {
            return;
        }
        MonitoredPlayerService.exportMonitoredPlayerReachedHistory({ custId, fromDate, toDate, externalId, systemId, ..._sortInfo.current }); 
    }

    const _renderCaption = () => {
        return <div className="caption">
            <span>
                {title.current}
            </span>
            {hasData && <span className="caret-block">
                <span className="icon-excel-wrapper" onClick={_exportExcel}>
                    <i className="icon-excel" title={LangHelper.getSingleResource('ExportToExcel')}></i>
                </span>
            </span>}
        </div>
    }

    const _renderData = () => {
        if(!hasData) {
            return <NoDataTitle />;
        }

        const header = (<HeaderRow style={{ height: '30px' }}>
            <HeaderCell sortBy={1} >{LangHelper.getSingleResource("Date")}</HeaderCell>
            <HeaderCell sortBy={2} >{LangHelper.getSingleResource("DailyWinningThreshold")}</HeaderCell>
            <HeaderCell sortBy={3}>{LangHelper.getSingleResource("TotalWinningAmount")}</HeaderCell>
        </HeaderRow>);

        const body = data.map(item => <Row style={{ height: '25px' }}>
            <Cell className={"center-align"}>{item.reachedDateDisplay}</Cell>
            <Cell className={"right-align"}>{NumberFormat.format(item.dailyWinningThreshold)}</Cell>
            <Cell className={"right-align"}>{NumberFormat.formatDecimal(item.totalWinningAmount)}</Cell>
        </Row>)

        return <Table
            minWidth={600}
            maxWidth={650}
            bodyHeight={400}
            autoWidth={true}
            autoHeight={false}
            header={header}
            body={body}
            onSort={_onSort}
        />
    }

    return (
        <div className="form-reached-history">
            {_renderCaption()}
            {_renderData()}
        </div>
    )
}

export default FormReachedHistory
