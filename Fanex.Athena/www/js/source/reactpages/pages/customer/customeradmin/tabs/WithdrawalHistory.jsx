import React, { useState, useEffect } from 'react';
import ReportTitle from '@jsroot/components/ReportTitle';
import { Table, Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper';
import { connect } from 'react-redux';

const WithdrawalHistory = (props) => {
    const [pagingOption, setPagingOption] = useState({pageIndex: 1, totalPage: 0});

    useEffect(() => {

    }, [props.username])

    const headerText = {
        transID: LangHelper.getSingleResource('TransID'),
        transDate: LangHelper.getSingleResource('TransDate'),
        amount: LangHelper.getSingleResource('Amount'),
        remark: LangHelper.getSingleResource('Remark')
    }

    var dataList = {};

    const renderHeader = () => {
        return (
            <HeaderRow style={{ height: 32 }}>
                <HeaderCell colWidth={150}>{headerText.transID}</HeaderCell>
                <HeaderCell colWidth={150}>{headerText.transDate}</HeaderCell>
                <HeaderCell colWidth={150}>{headerText.amount}</HeaderCell>
                <HeaderCell colWidth={150}>{headerText.remark}</HeaderCell>
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
        const { transID, transDate, amount, remark } = dataItem;
    
        return (
            <Row key={index}>
                <Cell className="center-align">{transID}</Cell>
                <Cell className="center-align">{transDate}</Cell>
                <Cell className="center-align">{amount}</Cell>
                <Cell className="center-align">{remark}</Cell>
            </Row>
        )
    }

    const handleChangePaging = pageIndex => {
        setPagingOption({ ...pagingOption, pageIndex });
    }

    const getReportTitle = () => {
        const {fromDate,toDate} = props.dateRange;
        return `${LangHelper.getSingleResource('CustomerAdministrationReportTitle').replace('{0}', LangHelper.getSingleResource('WithdrawalHistory'))}:  ${fromDate} -> ${toDate}`;
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

export default connect(mapStateToProps,)(WithdrawalHistory);