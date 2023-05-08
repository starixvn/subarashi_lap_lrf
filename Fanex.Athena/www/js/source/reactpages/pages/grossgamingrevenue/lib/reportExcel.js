import moment from 'moment'
import Excel from '../../../lib/excel'
import LangHelper from '../../../lib/langHelper'
import { titleCellStyle, headerCellStyle, bodyCellStyle, totalCellStyle, grandTotalCellStyle } from '../../../constants/excelStyle'
import { HeaderText, TotalText } from './service'
import { ReportBy } from '../../../constants/report'
import AppData from '@jsroot/lib/AppData'

const TITLE_ROW_INDEX = 0;
const HEADER_ROW_INDEX = 1;
const MIN_COLUMN = 9;
const MAIN_SECTION = 'main';
const TOTAL_SECTION = 'total';
const SUMMARYTOTAL_SECTION = 'summary';
const HEADER_SECTION = 'header';

export default class ReportExcel {
    constructor (gridData = {}, title, reportBy) {      
        this.worksheet = {};
        this.title = title;
        this.fileName = "GrossGamingRevenue";
        this.gridData = gridData;
        this.reportBy = reportBy;
        this.currentRowIndex = HEADER_ROW_INDEX + 1;
        this.totalColumn = MIN_COLUMN;
        this.configColumn = this._getConfigColumn(reportBy);
        this.colSpanConfig = this._getColSpanConfig();
        this.mergeConfig = [];
    }

    export (onFinished) {
        if (!this.gridData.Data || !this.gridData.Data.length) {
            onFinished && onFinished();
            return;
        }

        Excel.process(() => { 
            this._createHeader();
            this._createSheetData();
            this._createExcelConfig();

            Excel.export(this.worksheet, this.fileName);
            onFinished && onFinished();
        });
    }

    _getColSpanConfig() {
        return {
            [TOTAL_SECTION]: {
                colSpan: 2,
                text: TotalText.total,
                style: totalCellStyle.rowspan
            },
            [SUMMARYTOTAL_SECTION]: {
                colSpan: 3,
                text: TotalText.totalIn,
                style: grandTotalCellStyle.rowspan
            }
        };
    }

    _getConfigColumn(reportBy) {
        let rows = [
        {
            field: 'Index',
            type: 's',
            [HEADER_SECTION]: { title: 'index', isShow: true, index_r: HEADER_ROW_INDEX }, 
            [MAIN_SECTION]: { isShow : true, style: bodyCellStyle.center, width: 50 },
            [TOTAL_SECTION]: { isShow : false },
            [SUMMARYTOTAL_SECTION]: { isShow : false }
        }, {
            field: 'Date',
            type: 's',
            [HEADER_SECTION]: { title: 'date', isShow: true },
            [MAIN_SECTION]: { isShow : true, style: bodyCellStyle.center, width: 150 },
            [TOTAL_SECTION]: { isShow : false },
            [SUMMARYTOTAL_SECTION]: { isShow : false }
        }, {
            field: 'CurrencyName',
            type: 's',
            [HEADER_SECTION]: { title: 'currency', isShow: true },
            [MAIN_SECTION]: { isShow : true, style: bodyCellStyle.center, width: 100 },
            [TOTAL_SECTION]: { isShow : true, style: totalCellStyle.center },
            [SUMMARYTOTAL_SECTION]: { isShow : false }
        }, {
            field: 'TotalTransaction',
            type: 'n',
            [HEADER_SECTION]: { title: 'totalTransaction', isShow: true, index_r: HEADER_ROW_INDEX  },
            [MAIN_SECTION]: { isShow : true, style: bodyCellStyle.number, width: 130 },
            [TOTAL_SECTION]: { isShow : true, style: totalCellStyle.number },
            [SUMMARYTOTAL_SECTION]: { isShow : true, style: grandTotalCellStyle.number }
        }, {
            field: 'TotalTurnOver',
            type: 'n',
            [HEADER_SECTION]: { title: 'totalTurnOver', isShow: true },
            [MAIN_SECTION]: { hasNegativeStyle: false, style: bodyCellStyle.decimal, isShow : true, width: 200 },
            [TOTAL_SECTION]: { hasNegativeStyle: false, style: totalCellStyle.decimal, isShow : true },
            [SUMMARYTOTAL_SECTION]: { hasNegativeStyle: false, style: grandTotalCellStyle.decimal, isShow : true }
        }, {
            field: 'TotalPayout',
            type: 'n',
            [HEADER_SECTION]: { title: 'totalPayout', isShow: true, index_r: HEADER_ROW_INDEX },
            [MAIN_SECTION]: { isShow : true, style: bodyCellStyle.decimal, width: 200 },
            [TOTAL_SECTION]: { isShow : true, style: totalCellStyle.decimal },
            [SUMMARYTOTAL_SECTION]: { isShow : true, style: grandTotalCellStyle.decimal }
        }, {
            field: 'TotalLicenseeWL',
            type: 'n',
            [HEADER_SECTION]: { title: 'totalLicenseeWL', isShow: true },
            [MAIN_SECTION]: { hasNegativeStyle: true, style: { positive: bodyCellStyle.decimal, negative: bodyCellStyle.negativeDecimal }, isShow : true, width: 200 },
            [TOTAL_SECTION]: { hasNegativeStyle: true, style: { positive: totalCellStyle.decimal, negative: totalCellStyle.negativeDecimal }, isShow : true },
            [SUMMARYTOTAL_SECTION]: { hasNegativeStyle: true, style: { positive: grandTotalCellStyle.decimal, negative: grandTotalCellStyle.negativeDecimal }, isShow : true }
        }];

        return rows;
    }

    _createTitle(colSpan) {
        this.mergeConfig.push({ s: { r: TITLE_ROW_INDEX, c: 0 }, e: { r: TITLE_ROW_INDEX, c: colSpan - 1 } });
        const address = Excel.getCellAddress({ c: 0, r: TITLE_ROW_INDEX });
        this.worksheet[address] = { t: "s", v: this.title, s: titleCellStyle }
    }

    _createHeader() {
        let nextColumnIndex = 0;
        let nextRowIndex = 0;
        const totalCol = this.configColumn.length;
        for (let i = 0; i < totalCol; i++) {
            const column = this.configColumn[i].header;
            if (column.isShow) {
                nextColumnIndex = column.index_c ? column.index_c : nextColumnIndex;
                nextRowIndex = column.index_r ? column.index_r : nextRowIndex;
                const address = Excel.getCellAddress({ c: nextColumnIndex, r: nextRowIndex });
                const header = HeaderText[column.title];
                this.worksheet[address] = { t: "s", v: header, s: headerCellStyle }

                if (column.colSpan > 1 || column.rowSpan > 1) {
                    this.mergeConfig.push({ 
                        s: { r: nextRowIndex, c: nextColumnIndex }, 
                        e: { r: nextRowIndex + (column.rowSpan || 1) - 1, c: nextColumnIndex + (column.colSpan || 1) - 1 } });
                }

                nextColumnIndex += (column.colSpan || 1) ;
            }
        }
        
        this._createTitle(nextColumnIndex);
    }

    _createSheetData() {
        this._createMainData();
        if(AppData.viewMode !== 0){
            this._createTotalData();
        }        
        this._createSummaryData();
    }

    _createMainData() {
        const totalData = this.gridData.Data.length;
        for (let i = 0; i < totalData; i++) {
            let data = this.gridData.Data[i];
            data.Date = moment(data.Date).format(this.reportBy === ReportBy.DAILY ? "MM/DD/YYYY" : "MM/YYYY");
            data.Index = i + 1;

            this._createRowBySection(MAIN_SECTION, 0, this.currentRowIndex, data);
            ++this.currentRowIndex;
        }
    }

    _createTotalData() {
        const totalData = this.gridData.Total.length;

        const totalColSpanConfig = this.colSpanConfig[TOTAL_SECTION];
        this._createMergeTotalDataColumn(
            this.currentRowIndex, 
            totalData, 
            0, 
            totalColSpanConfig.colSpan, 
            totalColSpanConfig.text, 
            totalColSpanConfig.style);

        for (let i = 0; i < totalData; i++) {
            const data = this.gridData.Total[i];
            this._createRowBySection(TOTAL_SECTION, totalColSpanConfig.colSpan, this.currentRowIndex, data);
            ++this.currentRowIndex;
        }
    }

    _createSummaryData() {
        const summaryColSpanConfig = this.colSpanConfig[SUMMARYTOTAL_SECTION];

        const keys = Object.keys(this.gridData.SummaryTotal);
        const length = keys.length;
        for (let i = length - 1; i >= 0; i--) {
            const key = keys[i];
            const data = this.gridData.SummaryTotal[key];
            
            if(key !== "EUR" || AppData.viewMode !== 0)
            {                     
                this._createMergeTotalDataColumn(
                    this.currentRowIndex, 
                    1, 
                    0, 
                    summaryColSpanConfig.colSpan, 
                    summaryColSpanConfig.text + ' ' + key, 
                    summaryColSpanConfig.style);

                this._createRowBySection(SUMMARYTOTAL_SECTION, summaryColSpanConfig.colSpan, this.currentRowIndex, data);
                ++this.currentRowIndex;
            }
        }
    }

    _createMergeTotalDataColumn(startRowIndex, rowSpan, startColIndex, colSpan, text, style) {
        const address = Excel.getCellAddress({ c: startColIndex, r: startRowIndex });
        this.worksheet[address] = { t: 's', v: text, s: style };
        this.mergeConfig.push({ 
            s: { r: startRowIndex, c: startColIndex }, 
            e: { r: startRowIndex + rowSpan - 1, c: startColIndex + colSpan - 1 } });
    }

    _createRowBySection(section, startColIndex, startRowIndex, data) {
        let nextColumnIndex = startColIndex;
        const totalCol = this.configColumn.length;
        for (let i = 0; i < totalCol; i++) {
            const column = this.configColumn[i];
            const sectionColumn = column[section];
            if (sectionColumn.isShow) {
                nextColumnIndex = sectionColumn.index_c ? sectionColumn.index_c : nextColumnIndex;
                const address = Excel.getCellAddress({ c: nextColumnIndex, r: startRowIndex });
                const value = data[column.field];
                this.worksheet[address] = { t: column.type, v: value, s: sectionColumn.hasNegativeStyle ? (value >= 0 ? sectionColumn.style.positive : sectionColumn.style.negative ) : sectionColumn.style };

                ++nextColumnIndex;
            }
        }
    }

    _createExcelConfig() {        
        let columnModels = [];
        const totalCol = this.configColumn.length;
        for (let i = 0; i < totalCol; i++) {
            const column = this.configColumn[i][MAIN_SECTION];
            if (column.isShow) {
                columnModels.push({ wpx : column.width });
            }
        }
        
        const cellStart = Excel.getCellAddress({ r: 0, c: 0 });
        const cellEnd = Excel.getCellAddress({ r: this.currentRowIndex, c:  this.totalColumn });

        this.worksheet["!merges"] = this.mergeConfig;
        this.worksheet["!ref"] = `${cellStart}:${cellEnd}`;

        this.worksheet['!cols'] = columnModels;
    }
}