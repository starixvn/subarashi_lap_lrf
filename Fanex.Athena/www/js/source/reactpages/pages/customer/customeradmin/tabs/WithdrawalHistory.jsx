import React, { useState, useEffect } from 'react';
import ReportTitle from '@jsroot/components/ReportTitle';
import { Table, Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper';
import DataService from "@jsroot/lib/DataService";
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { toggleLoader } from "@jsroot/actions/loaderAction";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

const WithdrawalHistory = (props) => {
    const {fromDate,toDate} = props.dateRange;
    const {custId} = props.userInfo;
    const [WithdrawHistoryData, setWithdrawHistoryData] = useState([]);

    useEffect(() => {
        if(!custId) return;

        const url = "api/CustomerAdministration/GetWithdrawHistoryByCustId";
        const params ={
            CustId: custId,
            FromDate: fromDate,
            ToDate: toDate
        }
        props.toggleLoader(true);

        DataService.postData(url, params)
            .then((response) => {
                setWithdrawHistoryData(response.data);
                props.toggleLoader(false);
            })
            .catch((error) => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                console.error(error.message);
                props.toggleLoader(false);
            });

    }, [custId])

    const headerText = {
        transID: LangHelper.getSingleResource('TransID'),
        transDate: LangHelper.getSingleResource('TransDate'),
        amount: LangHelper.getSingleResource('Amount'),
        remark: LangHelper.getSingleResource('Remark')
    }

    if (!WithdrawHistoryData.length) {
        return <NoDataTitle />;
    }

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
        for (let i = 0; i < WithdrawHistoryData.length; i++) {
            dataRows.push(buildDataRow(i + 1, WithdrawHistoryData[i]));
        }
    
        return dataRows;
    }

    const buildDataRow = (index, dataItem) => {
        const { transID, transDateString, amount, remark } = dataItem;
    
        return (
            <Row key={index}>
                <Cell className="center-align">{transID}</Cell>
                <Cell className="center-align">{transDateString}</Cell>
                <Cell className="center-align">{amount}</Cell>
                <Cell className="center-align">{remark}</Cell>
            </Row>
        )
    }

    const getReportTitle = () => {
        return `${LangHelper.getSingleResource('CustomerAdministrationReportTitle').replace('{0}', LangHelper.getSingleResource('WithdrawalHistory'))}:  ${fromDate} -> ${toDate}`;
    }

    const reportTitle = getReportTitle();

    return (
        <div>
            <ReportTitle content={reportTitle} />
            <Table minWidth={650}
                autoWidth={true}
                autoHeight={true}
                header={renderHeader()}
                body={renderDataSection()}
                containerPadding={30} />
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    const { dateRange, username , userInfo} = state;
    return Object.assign({}, { dateRange, username , userInfo});
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawalHistory);