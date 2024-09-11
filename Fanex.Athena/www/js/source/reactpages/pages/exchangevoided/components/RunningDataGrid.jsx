import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { Table } from '@9softstudio/react-grid';
import ReportTitle from '@jsroot/components/ReportTitle';
import LangHelper from '@jsroot/lib/langHelper';
import { DefaultPagingOption, SortBy, SortOrder, fields, headerText } from '../lib/constants';
import { Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import NumberFormat from '@jsroot/lib/numberFormat';
import Report from '@jsroot/lib/report'
import Popup from '@jsroot/components/popup';
import BetListDetail from './BetListDetail';

const RunningDataGrid = (props) => {
    const isFirstRun = useRef(true);
    const [isShowBetDetail, setIsShowBetDetail] = useState(false);
    const [detailData, setDetailData] = useState([]);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        const { getRunningTicketData } = props;
        const param = { ...props.requestParam };
        getRunningTicketData(param);
    }, [props.requestParam])

    const handleChangePaging = (pageIndex, pageSize) => {
        props.setRequestParam({ ...props.requestParam, pageIndex, pageSize });
    }

    const onSort = (sortBy, sortOrder) => {
        const requestSortOrder = sortOrder == "asc" ? SortOrder.ASC : SortOrder.DESC
        const params = { ...props.requestParam, SortBy: sortBy, SortOrder: requestSortOrder };
        props.setRequestParam(params);
    }

    const { dataList, sumStake, totalPage } = props.gridData;

    const { requestParam } = props;

    const { baseCurrency, isConvertAllToBaseCurrency } = requestParam;
    const currenPagingOption = {
        PageIndex: requestParam.pageIndex,
        PageSize: requestParam.pageSize,
        TotalItem: totalPage,
        PageList: DefaultPagingOption.PageList
    }

    const reportTitle = `${LangHelper.getSingleResource('BettingTicketCenter')}, GMT+8, ${LangHelper.getSingleResource('BaseCurrency')}: ${baseCurrency}`;

    const renderRunningHeader = () => {
        return (
            <HeaderRow style={{ height: 32 }}>
                <HeaderCell colWidth={30}>#</HeaderCell>
                <HeaderCell colWidth={100}>{headerText[fields.externalId]}</HeaderCell>
                <HeaderCell colWidth={100}>{headerText[fields.systemId]}</HeaderCell>
                <HeaderCell colWidth={100}>{headerText[fields.betId]}</HeaderCell>
                <HeaderCell colWidth={100}>{headerText[fields.betPlaced]}</HeaderCell>
                <HeaderCell colWidth={310}>{headerText[fields.market]}</HeaderCell>
                <HeaderCell colWidth={120}>{headerText[fields.selection]}</HeaderCell>
                <HeaderCell colWidth={40}>{headerText[fields.type]}</HeaderCell>
                <HeaderCell colWidth={50}>{headerText[fields.oddsAvg]}</HeaderCell>
                <HeaderCell colWidth={80} sortBy={SortBy.Stake}>{headerText[fields.stake]}</HeaderCell>
            </HeaderRow>
        )
    }

    const renderBody = () => {
        const dataRows = [];
        const skipIndex = (requestParam.pageIndex - 1) * requestParam.pageSize;
        for (let i = 0; i < dataList.length; i++) {
            dataRows.push(buildRunningDataRow(i + skipIndex + 1, dataList[i]));
        }
        return dataRows;
    }

    const showTicketDetail = (betId, type, custId, currencyId) => {
        const url = "api/ExchangeWinLossBetList/Detail";
        const paramBaseCurrency = isConvertAllToBaseCurrency ? baseCurrency : "";
        const params = {
            data: { currencyId ,custId, baseCurrency: paramBaseCurrency, excludeTestData: false, betId, type }
        }

        props.toggleLoader(true);
        Report.fetchGridData(url, params)
            .then(response => {
                setDetailData(response.data);
                setIsShowBetDetail(true);
                props.toggleLoader(false);
            })
            .catch(error => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                props.toggleLoader(false);
            })
    }

    const buildRunningDataRow = (index, dataItem) => {
        const { NickName, Username, CustId, BetId, BetPlacedString, EventTypeName, EventName, MarketName, SelectionName, Type, OddsAvg, Stake, Currency, FancyBetRuns, CategoryType } = dataItem;
        let classType = Type == "Lay" || Type == "No" ? " text-red" : ""
        const isFancyBet = CategoryType == 2;
        const oddsAvgString = isFancyBet ?
            NumberFormat.formatInteger(FancyBetRuns) + '/' + NumberFormat.formatInteger(OddsAvg) :
            NumberFormat.formatDecimal(OddsAvg);
        return (
            <Row key={index}>
                <Cell className="center-align">{index}</Cell>
                <Cell className="left-align" title={NickName}>{NickName}</Cell>
                <Cell className="left-align" title={Username}>{Username}</Cell>
                <Cell className="center-align" title={BetId}><a href="javascript:;" onClick={() => showTicketDetail(BetId, Type, CustId, Currency)}>{BetId}</a></Cell>
                <Cell className="center-align" title={BetPlacedString}>{BetPlacedString}</Cell>
                <Cell className="right-align" title={MarketName}>{`${EventTypeName} > ${EventName} > ${MarketName}`}</Cell>
                <Cell className="right-align text-bold" title={SelectionName}>{SelectionName}</Cell>
                <Cell className={`right-align text-bold${classType}`} title={Type}>{Type}</Cell>
                <Cell className="right-align text-bold" title={oddsAvgString}>{oddsAvgString}</Cell>
                <Cell className="right-align text-bold" title={NumberFormat.formatDecimal(Stake)}>{NumberFormat.formatDecimal(Stake)}</Cell>
            </Row>
        )
    }

    const renderDataFooter = () => {
        return (
            <Row className="fixed-table-grant-total" key="grantTotal-row">
                <Cell className="right-align" colSpan={9}>{LangHelper.getSingleResource("Totalin")} {baseCurrency}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(sumStake)}</Cell>
            </Row>);
    }

    const closeDetailPopup = () =>{
        setIsShowBetDetail(false);
        setDetailData(null);
    }

    if (!dataList) {
        return null;
    }

    if (!dataList.length) {
        return <NoDataTitle />;
    }

    return (
        <div className='result-content'>
            <ReportTitle content={reportTitle} tag='div' />
            <Table key={`RunningTicket-Grid-${requestParam.submitTime}`} minWidth={650}
                autoWidth={true}
                autoHeight={true}
                header={renderRunningHeader()}
                body={renderBody()}
                footer={renderDataFooter()}
                containerPadding={30}
                onSort={onSort}
                isPaging={true}
                pageOption={currenPagingOption}
                shouldResetScrollPosition={props.isLoading}
                onPaging={handleChangePaging} />
            {
                isShowBetDetail &&
                <Popup isShow={isShowBetDetail} title={LangHelper.getSingleResource("Details")} width={730} height={450} onClose={closeDetailPopup}>
                    <BetListDetail data={detailData} />
                </Popup>
            }
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam, getRunningTicketData, toggleLoader } = ActionCreators;
    return bindActionCreators({ setRequestParam, getRunningTicketData, toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    const { gridData, requestParam, isLoading } = state;
    return Object.assign({}, { gridData, requestParam, isLoading });
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningDataGrid);