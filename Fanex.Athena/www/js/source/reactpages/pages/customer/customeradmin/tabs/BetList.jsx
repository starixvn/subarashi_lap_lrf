import React, {useState, useEffect } from 'react';
import ReportTitle from '@jsroot/components/ReportTitle';
import NumberFormat from '@jsroot/lib/numberFormat';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { Table, Row, Cell, HeaderRow, HeaderCell, Pager } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper';
import DataService from "@jsroot/lib/DataService";
import { toggleLoader } from "@jsroot/actions/loaderAction";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { defaultPagingOption } from "../lib/constants";

const BetList = (props) => {
    const {custId, currencyCode} = props.userInfo;
    const {fromDate, toDate} = props.dateRange;
    const [gridData, setGridData] = useState([]);
    const [pagingOption, setPagingOption] = useState(null);

    const getPagingOption = (gridData) => {
        if (!gridData) {
            return defaultPagingOption;
        }
        return {
            ...defaultPagingOption,
            ...{
                PageIndex: gridData.pageIndex,
                PageSize: gridData.pageSize,
                TotalItem: gridData.totalItem,
            },
        };
    }

    const fetchData = (pageOption) => {
        if (!custId) return;

        const url = "api/CustomerAdministration/GetBetListByCustId";
        const pageOptions = getPagingOption(pageOption);

        const params ={
            CustId: custId,
            FromDate: fromDate,
            ToDate: toDate,
            BaseCurrency: currencyCode,
            ... pageOptions
        }
        props.toggleLoader(true);

        DataService.postData(url, params)
            .then((response) => {
                const resultData = response.data;
                setGridData(resultData.data);
                setPagingOption(getPagingOption(resultData));
                props.toggleLoader(false);
            })
            .catch((error) => {
                console.err(error.message);
                props.toggleLoader(false);
            });
    }

    useEffect(() => {
        fetchData(pagingOption);
    }, [custId])

    if (!gridData.length || !pagingOption) {
        return <NoDataTitle />;
    }

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
        for (let i = 0; i < gridData.length; i++) {
            dataRows.push(buildDataRow(i + 1, gridData[i]));
        }
    
        return dataRows;
    }

    const buildDataRow = (index, dataItem) => {
        const { refNo, transTimeString, productCode, betType, turnover, winLoss, turnoverBased, winLossBased, status, sportName } = dataItem;
        
        return (
            <Row key={index}>
                <Cell className="center-align">{index}</Cell>
                <Cell className="center-align">{refNo}</Cell>
                <Cell className="center-align">{transTimeString}</Cell>
                <Cell>{LangHelper.getSingleResource('Product' + productCode)}</Cell>
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

    const handleChangePaging = (pageIndex, pageSize) => {
        const newPageOptions = { ...pagingOption, pageIndex, pageSize };
        fetchData(newPageOptions);
    }

    const getReportTitle = () => {
        return `${LangHelper.getSingleResource('CustomerAdministrationReportTitle').replace('{0}', LangHelper.getSingleResource('BetList'))}:  ${fromDate} -> ${toDate}`;
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
            <Pager pageOption={pagingOption} onPaging={handleChangePaging} />
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    const { dateRange, username, userInfo} = state;
    return Object.assign({}, { dateRange, username, userInfo });
}

export default connect(mapStateToProps, mapDispatchToProps)(BetList);