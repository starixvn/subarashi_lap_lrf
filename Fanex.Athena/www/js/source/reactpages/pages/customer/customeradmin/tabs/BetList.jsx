import React, { useState, useEffect } from 'react';
import ReportTitle from '@jsroot/components/ReportTitle';
import { Table, Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper';
import { connect } from 'react-redux';

const BetList = (props) => {
    const [pagingOption, setPagingOption] = useState({pageIndex: 1, totalPage: 0});

    useEffect(() => {

    }, [props.username])

    const headerText = {
        refNo: LangHelper.getSingleResource('RefNo'),
        transTime: LangHelper.getSingleResource('TransTime'),
        product: LangHelper.getSingleResource('Product'),
        betType: LangHelper.getSingleResource('BetType'),
        turnover: LangHelper.getSingleResource('Turnover'),
        winloss: LangHelper.getSingleResource('WinLoss'),
        turnoverBased: `${LangHelper.getSingleResource('Turnover')} (USD)`,
        winlossBased: `${LangHelper.getSingleResource('WinLoss')} (USD)`,
        status: LangHelper.getSingleResource('Status'),
        sport: LangHelper.getSingleResource('Sport')
    }

    var dataList = {};

    const renderHeader = () => {
        return (
            <HeaderRow style={{ height: 32 }}>
                <HeaderCell colWidth={40}>#</HeaderCell>
                <HeaderCell colWidth={100}>{headerText.refNo}</HeaderCell>
                <HeaderCell colWidth={100}>{headerText.transTime}</HeaderCell>
                <HeaderCell colWidth={80}>{headerText.product}</HeaderCell>
                <HeaderCell colWidth={80}>{headerText.sport}</HeaderCell>
                <HeaderCell colWidth={150}>{headerText.betType}</HeaderCell>
                <HeaderCell colWidth={80} sortBy={'turnover'}>{headerText.turnover}</HeaderCell>
                <HeaderCell colWidth={80} sortBy={'winLoss'}>{headerText.winloss}</HeaderCell>
                <HeaderCell colWidth={80} sortBy={'turnoverBased'}>{headerText.turnoverBased}</HeaderCell>
                <HeaderCell colWidth={80} sortBy={'winLossBased'}>{headerText.winlossBased}</HeaderCell>
                <HeaderCell colWidth={50}>{headerText.status}</HeaderCell>
            </HeaderRow>
        )
    }
    
    const renderDataSection = () => {
        const dataRows = [];
        for (let i = 0; i < dataList.length; i++) {
            dataRows.push(buildDataRow(i + 1, dataList[i]));
        }
    
        return dataRows;
    }

    const buildDataRow = (index, dataItem) => {
        const { refNo, transTimeString, productName, betType, turnover, winLoss, turnoverBased, winLossBased, status, sportName } = dataItem;
    
        return (
            <Row key={index}>
                <Cell className="center-align">{index}</Cell>
                <Cell className="center-align">{refNo}</Cell>
                <Cell className="center-align">{transTimeString}</Cell>
                <Cell>{productName}</Cell>
                <Cell>{sportName}</Cell>
                <Cell>{betType}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(winLoss)}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(turnoverBased)}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(winLossBased)}</Cell>
                <Cell className="center-align">{status}</Cell>
            </Row>
        )
    }

    const handleChangePaging = pageIndex => {
        setPagingOption({ ...pagingOption, pageIndex });
    }

    const getReportTitle = () => {
        const {fromDate,toDate} = props.dateRange;
        return `${LangHelper.getSingleResource('CustomerAdministrationReportTitle').replace('{0}', LangHelper.getSingleResource('BetList'))}:  ${fromDate} -> ${toDate}`;
    }

    const {pageIndex, totalPage} = pagingOption;
    const reportTitle = getReportTitle();

    return (
        <div>
            <ReportTitle content={reportTitle} />
            <Table minWidth={650}
                autoWidth={true}
                autoHeight={true}
                header={renderHeader()}
                body={renderDataSection(dataList)}
                containerPadding={30} />
            {totalPage > 1 && <SimplePagination pageIndex={pageIndex} totalPage={totalPage} 
                onPageChanged={handleChangePaging} />}
        </div>
    );
};

function mapStateToProps(state) {
    const { dateRange, username } = state;
    return Object.assign({}, { dateRange, username });
};

export default connect(mapStateToProps,)(BetList);