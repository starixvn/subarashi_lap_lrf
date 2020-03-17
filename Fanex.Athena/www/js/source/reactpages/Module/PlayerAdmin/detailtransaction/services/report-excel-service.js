import LangHelper from '@jsroot/lib/langHelper';
import Excel from '@jsroot/lib/excel';
import { titleCellStyle, headerCellStyle, bodyCellStyle } from '@jsroot/constants/excelStyle'

const TITLE_ROW_INDEX = 0;
const HEADER_ROW_INDEX = 1;
const DATA_ROW_INDEX = 2;
const MAX_COLUMN_INDEX = 5;

export default class ReportExcel {
    constructor(detailTransactionReport = {}, fileName = 'DetailTransaction') {
        this.fileName = fileName;
        this.detailTransactionReport = detailTransactionReport;

        this.worksheet = {};
        this.mergeConfig = [];
        this.headers = [
            { text: LangHelper.getSingleResource('TransactionID'), width: 140 },
            { text: LangHelper.getSingleResource('TransactionTime'), width: 160 },
            { text: LangHelper.getSingleResource('Transaction'), width: 300 },
            { text: LangHelper.getSingleResource('BalanceChange'), width: 140 },
            { text: LangHelper.getSingleResource('AfterBalance'), width: 140 },
            { text: LangHelper.getSingleResource('Remark'), width: 400 }];
        this.currentRowIndex = DATA_ROW_INDEX;
    }

    export(onFinished = () => { }) {
        const detailTransactionReport = this.detailTransactionReport;
        if (!detailTransactionReport.DetailTransactions ||
            !detailTransactionReport.DetailTransactions.length) {
            alert(LangHelper.getSingleResource("NoInfo"));
            onFinished();
            return;
        }

        this.title = `${LangHelper.getSingleResource("DetailTransaction")}, ${detailTransactionReport.FromDateStr} -> ${detailTransactionReport.ToDateStr}`;
        Excel.process(() => {
            this._createTitle();
            this._createHeader();
            this._createSheetData();
            this._createExcelConfig();

            Excel.export(this.worksheet, this.fileName);
            onFinished();
        });
    }

    _createTitle() {
        this.mergeConfig.push({ s: { r: TITLE_ROW_INDEX, c: 0 }, e: { r: TITLE_ROW_INDEX, c: MAX_COLUMN_INDEX } });
        const address = Excel.getCellAddress({ c: 0, r: TITLE_ROW_INDEX });
        this.worksheet[address] = { t: 's', v: this.title, s: titleCellStyle }
    }
    _createHeader() {
        var headers = this.headers;

        for (let i = 0; i <= MAX_COLUMN_INDEX; i++) {
            const address = Excel.getCellAddress({ c: i, r: HEADER_ROW_INDEX });
            this.worksheet[address] = { t: 's', v: headers[i].text, s: headerCellStyle }
        }
    }
    _createSheetData() {
        const mainData = this.detailTransactionReport.DetailTransactions;
        let cellAddress = null;

        for (let i = 0; i < mainData.length; i++) {
            const item = mainData[i];
            let columnIndex = 0;

            cellAddress = Excel.getCellAddress({ c: columnIndex++, r: this.currentRowIndex });
            this.worksheet[cellAddress] = { t: 's', v: item.TransactionId, s: bodyCellStyle.left };

            cellAddress = Excel.getCellAddress({ c: columnIndex++, r: this.currentRowIndex });
            this.worksheet[cellAddress] = { t: 's', v: item.TransactionTimeStr, s: bodyCellStyle.center };

            cellAddress = Excel.getCellAddress({ c: columnIndex++, r: this.currentRowIndex });
            this.worksheet[cellAddress] = { t: 's', v: item.TransactionType, s: bodyCellStyle.left };

            cellAddress = Excel.getCellAddress({ c: columnIndex++, r: this.currentRowIndex });
            this.worksheet[cellAddress] = { t: 's', v: item.BalanceChangeStr, s: bodyCellStyle.right };

            cellAddress = Excel.getCellAddress({ c: columnIndex++, r: this.currentRowIndex });
            this.worksheet[cellAddress] = { t: 's', v: item.AfterBalanceStr, s: bodyCellStyle.right };

            cellAddress = Excel.getCellAddress({ c: columnIndex++, r: this.currentRowIndex });
            this.worksheet[cellAddress] = { t: 's', v: item.Remark, s: bodyCellStyle.left };

            this.currentRowIndex++;
        }
    }
    _createExcelConfig() {
        const cellStart = Excel.getCellAddress({ r: 0, c: 0 });
        const cellEnd = Excel.getCellAddress({ r: this.currentRowIndex, c: MAX_COLUMN_INDEX });

        this.worksheet['!merges'] = this.mergeConfig;
        this.worksheet['!ref'] = `${cellStart}:${cellEnd}`;

        const wscols = [];
        for (let i = 0; i <= MAX_COLUMN_INDEX; i++) {
            wscols.push({ wpx: this.headers[i].width });
        }

        this.worksheet['!cols'] = wscols;
    }
}
