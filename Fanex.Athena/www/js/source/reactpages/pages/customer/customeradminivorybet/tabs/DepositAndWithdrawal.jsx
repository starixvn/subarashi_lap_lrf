import React, { useState, useEffect } from 'react';
import DataService from "@jsroot/lib/DataService";
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { Table, Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper';
import { toggleLoader } from "@jsroot/actions/loaderAction";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import NumberFormat from '@jsroot/lib/numberFormat';
import { depositAndWithdrawalUrl } from '../lib/constants';

const DepositAndWithdrawal = (props) => {
    const {fromDate,toDate} = props.dateRange;
    const {custId,sabaId} = props.userInfo;
    const historyOption = props.historyOption;
    const [financialData, setFinancialData] = useState([]);

    useEffect(() => {
        if(!custId) return;

        const url = depositAndWithdrawalUrl[historyOption];
        const params ={
            CustId: custId,         
            userName: props.username,
            FromDate: fromDate,
            ToDate: toDate,
            SabaId: sabaId
        }
        props.toggleLoader(true);

        DataService.postData(url, params)
            .then((response) => {
                setFinancialData(response.data);
                props.toggleLoader(false);
            })
            .catch((error) => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                console.error(error.message);
                props.toggleLoader(false);
            });


    }, [custId,historyOption])

    if (!financialData.length) {
        return <NoDataTitle />;
    }

    const headerText = {
        transID: LangHelper.getSingleResource('TransID'),
        transDate: LangHelper.getSingleResource('TransDate'),
        amount: LangHelper.getSingleResource('Amount'),
        remark: LangHelper.getSingleResource('Remark')
    }

    const renderHeader = () => {
        return (
            <HeaderRow style={{ height: 25 }}>
                <HeaderCell colWidth={150}>{headerText.transID}</HeaderCell>
                <HeaderCell colWidth={150}>{headerText.transDate}</HeaderCell>
                <HeaderCell colWidth={150}>{headerText.amount}</HeaderCell>
                <HeaderCell colWidth={150}>{headerText.remark}</HeaderCell>
            </HeaderRow>
        )
    }
    
    const renderDataSection = () => {
        const dataRows = [];
        for (let i = 0; i < financialData.length; i++) {
            dataRows.push(buildDataRow(i + 1, financialData[i]));
        }
    
        return dataRows;
    }

    const buildDataRow = (index, dataItem) => {
        const { transID, transDateString, amount, remark } = dataItem;
    
        return (
            <Row key={index}>
                <Cell className="center-align">{transID}</Cell>
                <Cell className="center-align">{transDateString}</Cell>
                <Cell className="center-align">{NumberFormat.formatDecimal(amount)}</Cell>
                <Cell className="center-align">{remark}</Cell>
            </Row>
        )
    }

    return (
        <div>
            <Table key={`${custId}_${historyOption}`} minWidth={650}
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
    const { dateRange, username, userInfo, historyOption } = state;
    return Object.assign({}, { dateRange, username, userInfo, historyOption });
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositAndWithdrawal);