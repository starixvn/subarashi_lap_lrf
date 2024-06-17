import React, { useEffect, useState } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@9softstudio/react-grid';
import NoDataTitle from '@jsroot/components/NoDataTitle'
import LangHelper from '@jsroot/lib/langHelper'
import Service from '../../lib/resultAmendmentService';

const TicketListingGrid = ({ sessionId }) => {
    const [data, setData] = useState({});

    const { Data, MatchInfo } = data;

    const _fetchData = async () => {
        const response = await Service.fetchTicketListing(sessionId);
        setData(response);
    }

    useEffect(() => { 
        _fetchData();
    }, [])

    if(!Data) 
    { 
        return null 
    } 

    if(!Data.length) {
        return <NoDataTitle />;
    }
   

    const _renderCaption = () => {
        return <div className="ticket-listing-caption">
            <span>
                {MatchInfo}
            </span>
            <span className="caret-block">
                <span className="icon-excel-wrapper" onClick={() => Service.exportTicketListing(sessionId)}>
                    <i className="icon-excel" title={LangHelper.getSingleResource('ExportToExcel')}></i>
                </span>
            </span>
        </div>
    }

    const _renderData = () => {
        const header = (<HeaderRow style={{ height: '25px' }}>
            <HeaderCell colWidth={50}>{LangHelper.getSingleResource("#")}</HeaderCell>
            <HeaderCell>{LangHelper.getSingleResource("RefNo")}</HeaderCell>
            <HeaderCell>{LangHelper.getSingleResource("ExternalId")}</HeaderCell>
            <HeaderCell>{LangHelper.getSingleResource("SystemId")}</HeaderCell>
        </HeaderRow>);

        const body = Data.map(item => <Row style={{ height: '25px' }}>
            <Cell className={"center-align"}>{item.Index}</Cell>
            <Cell className={"center-align"}>{item.RefNo}</Cell>
            <Cell className={"left-align"}>{item.ExternalId}</Cell>
            <Cell className={"left-align"}>{item.SystemId}</Cell>

        </Row>)

        return <Table
                minWidth={600}
                maxWidth={650}
                bodyHeight={400}
                autoWidth={true}
                autoHeight={false}
                header={header}
                body={body}
            />
    }

    return (
        <div className="ticket-listing-popup">   
            {_renderCaption()}
            {_renderData()}
        </div>
    )
}

export default TicketListingGrid
