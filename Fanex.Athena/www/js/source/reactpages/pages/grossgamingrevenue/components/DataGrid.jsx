import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index.js'
import { bindActionCreators } from 'redux'
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@9softstudio/react-grid'
import NumberFormat from '../../../lib/numberFormat'
import NoDataTitle from '../../../components/NoDataTitle'
import Report from '../../../lib/report'
import { ReportBy } from '../../../constants/report'
import { Service, HeaderText, Url, TotalText } from '../lib/service'
import AppData from '@jsroot/lib/AppData'
import ReportTitle from '../../../components/ReportTitle'
import LangHelper from '@jsroot/lib/langHelper'
import ReportExcel from '../lib/reportExcel'

export class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gridData: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.Timestamp !== this.props.params.Timestamp) {
            this._getGridData();
        }
    }
    
    _getGridData() {
        this.props.toggleLoader(true);
        Report.fetchGridData(Url, { xsrfToken: this.props.xsrfToken, data: this.props.params })
            .then(response => {
                const result = response.data;

                const mainData = result.Data;
                if (mainData && mainData.length > 1) {
                    Service.sort(mainData, this.props.params.SortBy, this.props.params.SortOrder);

                    const sortedResult = Object.assign({}, result, { Data: mainData });

                    this.setState({ gridData: sortedResult });
                }
                else {
                    this.setState({ gridData: result });
                }

                this.props.setReportTitle(Service.getReportTitle(this.props.params.FromDate,
                    this.props.params.ToDate, this.props.params.CurrencyId,
                    this.props.params.CurrencyName, this.props.params.BaseCurrency,
                    AppData.viewMode));

                this.props.toggleLoader(false);

            })
            .catch(error => {
                Service.showErrorMsg();
                this.props.toggleLoader(false);
            });
    }
    _sort = (sortBy, sortOrder) => {
        this.props.toggleLoader(true);

        const param = Object.assign({}, this.props.params, { SortOrder: sortOrder, SortBy: sortBy });
        const mainData = this.state.gridData.Data;

        if (mainData && mainData.length > 1) {

            Service.sort(mainData, param.SortBy, param.SortOrder);

            const sortedResult = Object.assign({}, this.state.gridData, { Data: mainData })

            this.setState({ gridData: sortedResult })
        }

        this.props.setParams(param);
        this.props.toggleLoader(false);
    }

    _buildHeader() {
        let rows = [
            <HeaderRow key='header1' style={{ height: 32 }}>
                <HeaderCell colWidth={50} >{HeaderText.index}</HeaderCell>
                <HeaderCell colWidth={150} sortBy={'Date'}>
                    {HeaderText.date}
                </HeaderCell>
                <HeaderCell colWidth={100} sortBy={'CurrencyName'}>
                    {HeaderText.currency}
                </HeaderCell>
                <HeaderCell colWidth={130} sortBy={'TotalTransaction'}>
                    {HeaderText.totalTransaction}
                </HeaderCell>
                <HeaderCell colWidth={200} sortBy={'TotalTurnOver'}>
                    {HeaderText.totalTurnOver}
                </HeaderCell>
                <HeaderCell colWidth={200} sortBy={'TotalPayout'}>
                    {HeaderText.totalPayout}
                </HeaderCell>
                <HeaderCell colWidth={200} sortBy={'TotalLicenseeWL'}>
                    {HeaderText.totalLicenseeWL}
                </HeaderCell>
            </HeaderRow>
        ];

        return rows;
    }

    _buildBody(reportBy) {
        const data = this.state.gridData.Data,
            formatDate = reportBy === ReportBy.DAILY.toString() ? 'MM/DD/YYYY' : 'MM/YYYY';

        let rows = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const reportBy = moment(item.Date).format(formatDate);

            rows.push(
                <Row key={`${item.Ticks}-${item.CurrencyId}`}>
                    <Cell title={i + 1} className='center-align'>{i + 1}</Cell>
                    <Cell title={reportBy} className='center-align'>{reportBy}</Cell>
                    <Cell title={item.CurrencyName} className='center-align'>{item.CurrencyName}</Cell>
                    {this._buildCell(item)}
                </Row>
            );
        }

        return rows;
    }

    _buildFooter() {
        let totalRows = [];

        const total = this.state.gridData.Total,
        colSpan = 2,
        rowSpan = total.length;

        if(AppData.viewMode !== 0) {
            for (let i = 0; i < rowSpan; i++) {
                const item = total[i];            
                totalRows.push(
                    <Row key={item.CurrencyName} className='fixed-table-total'>
                        {i === 0 && <Cell title={TotalText.total} className='center-align' rowSpan={rowSpan} colSpan={colSpan}>{TotalText.total}</Cell>}
                        <Cell title={item.CurrencyName} className='center-align'>{item.CurrencyName}</Cell>
                        {this._buildCell(item)}
                    </Row>
                );         
            }
        }

        const dataSummary = this.state.gridData.SummaryTotal,
            baseCurrencyList = Object.keys(dataSummary),
            colSummarySpan = colSpan + 1;

        for (let i = baseCurrencyList.length - 1; i >= 0; i--) {
            const currency = baseCurrencyList[i],
            item = dataSummary[currency];
            if(currency !== "EUR" || AppData.viewMode !== 0) {
                totalRows.push(
                    <Row key={`tr-grandtotal${i}`} className='fixed-table-grant-total'>
                        <Cell title={`${TotalText.totalIn} ${currency}`} className='center-align' colSpan={colSummarySpan}>{`${TotalText.totalIn} ${currency}`}</Cell>
                        {this._buildCell(item)}
                    </Row>
                );
            }
        }

        return totalRows;
    }

    _buildCell(item) {
        const totalTurnOver = NumberFormat.formatDecimal(item.TotalTurnOver),
            totalPayout = NumberFormat.formatDecimal(item.TotalPayout),
            totalLicenseeWL = NumberFormat.formatDecimal(item.TotalLicenseeWL),
            totalTransaction = NumberFormat.format(item.TotalTransaction, 0);

        const rows = [
            <Cell key='totalTransaction' title={totalTransaction} className='right-align'>{totalTransaction}</Cell>,
            <Cell key='totalTurnOver' title={totalTurnOver} className='right-align'>{totalTurnOver}</Cell>,       
            <Cell key='totalPayout' title={totalPayout} className='right-align'>{totalPayout}</Cell>,
            <Cell key='totalLicenseeWL' title={totalLicenseeWL} className={`right-align ${totalLicenseeWL < 0 ? 'negative' : ''}`}>{totalLicenseeWL}</Cell>
        ];

        return rows;
    }

    _buildExportExcel() {
        return AppData.viewMode === 0 ? <i class="icon-excel" title={LangHelper.getSingleResource("ExportToExcel")} onClick={this.exportExcel}></i> : null;
    }

    exportExcel = (event) => {
        event.preventDefault();
        if (!this.props.params) {
            return;
        }

        this.props.toggleLoader(true);

        const data = this.state.gridData;
        if (!data) {
            return null;
        }

        try {
            this._doExportExcel(this.props.params, data);
        }catch(error) {
            Service.showErrorMsg();
            this.props.toggleLoader(false);
        }
    }

    _doExportExcel(params, gridData) {
        if (!gridData.Data || !gridData.Data.length) {
            this.props.toggleLoader(false);
            alert(LangHelper.getSingleResource("NoInfo"));
            return;
        }

        if (gridData.Data.length > 1) {
            Service.sort(gridData.Data, params.SortBy, params.SortOrder);
        }

        const title = Service.getReportTitle(
            params.FromDate,
            params.ToDate,
            params.CurrencyId,
            params.CurrencyName,
            params.BaseCurrency,
            AppData.viewMode);
        const excel = new ReportExcel(gridData, title, parseInt(params.ReportBy, 10));
        excel.export(() => {
            this.props.toggleLoader(false);
        });
    }


    render() {
        const data = this.state.gridData.Data;
        if (!data) {
            return null;
        }

        const params = this.props.params;

        return (
            <div className={`result-content${AppData.viewMode === 0 ? " dark-view" : null}`}>
                {this.props.reportTitle && <ReportTitle content={this.props.reportTitle} extendContent={this._buildExportExcel()}/> }
                {!data.length ? <NoDataTitle /> :
                <Table
                    minWidth={800}
                    autoWidth={true}
                    bodyHeight={300}
                    header={this._buildHeader()}
                    body={this._buildBody(params.ReportBy)}
                    footer={this._buildFooter()}
                    onSort={this._sort}
                />}
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
    const { params, reportTitle, xsrfToken } = state;
    return Object.assign({}, { params, reportTitle, xsrfToken });
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);