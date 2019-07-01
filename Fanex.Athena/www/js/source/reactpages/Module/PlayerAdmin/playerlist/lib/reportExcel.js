import Excel from '@jsroot/lib/excel';
import { headerCellStyle, bodyCellStyle } from '@jsroot/constants/excelStyle';
import { headerText } from '../lib/constants';
import { setupWebpackPublicPath } from '../../../lib/publicPathUtils';

const HEADER_ROW_INDEX = 0;
const DATA_ROW_INDEX = 1;

const TOTAL_COLUMN = 13;

const MAIN_SECTION_STYLE = 'mainSectionStyle';

const fields = {
    Status: 'Status',
    UserName: 'UserName',
    SystemId: 'SystemId',
    RealName: 'RealName',
    Currency: 'Currency',
    CurrentBalance: 'CurrentBalance',
    OutstandingBalance: 'OutstandingBalance',
    OddsGroup: 'OddsGroup',
    BaStatus: 'BaStatus',
    SpecialLevel: 'SpecialLevel',
    LastLoginIp: 'LastLoginIp',
    LastTransaction: 'LastTransaction',
    Email: 'Email'
}

export default class ReportExcel {
    constructor(licType, data, title) {
        this.data = data;
        this.title = title;
        this.licType = licType;

        this.worksheet = {};
        this.currentRowIndex = DATA_ROW_INDEX;
        this.columnConfigs = this._getcolumnConfigs();
    }

    export (onFinished) {
        setupWebpackPublicPath();
        Excel.process(() => {
            this._createHeader();
            this._createBodyData();
            this._createExcelConfig();

            Excel.export(this.worksheet, this.title);
            onFinished && onFinished();
        })
    }

    _createHeader() {
        const fieldKeys = Object.keys(fields);
        for (let i = 0; i < TOTAL_COLUMN; i++) {
            const field = fieldKeys[i];
            const address = Excel.getCellAddress({
                c: i,
                r: HEADER_ROW_INDEX
            });
            this.worksheet[address] = {
                t: "s",
                v: headerText[field] || '',
                s: headerCellStyle
            }
        }
    }

    _createBodyData() {
        for (let i = 0; i < this.data.length; i++) {
            const item = this.data[i];

            for (let j = 0; j < TOTAL_COLUMN; j++) {
                const address = Excel.getCellAddress({
                    c: j,
                    r: this.currentRowIndex
                });

                this.worksheet[address] = this._buildDataRow(item, j);
            }

            this.currentRowIndex++;
        }
    }

    _buildDataRow(item, colIndex) {
        const columnConfig = this.columnConfigs[colIndex];
        const value = item[columnConfig.field];

        return {
            t: Excel.getCellType(value),
            v: this._shouldSetEmpty(value) ? '' : value,
            s: columnConfig[MAIN_SECTION_STYLE]
        }
    }

    _shouldSetEmpty(value) {
        return value === undefined || value === null;
    }

    _createExcelConfig() {
        const cellStart = Excel.getCellAddress({
            r: 0,
            c: 0
        });
        const cellEnd = Excel.getCellAddress({
            r: this.currentRowIndex,
            c: TOTAL_COLUMN
        });

        this.worksheet["!ref"] = `${cellStart}:${cellEnd}`;
        this.worksheet['!cols'] = [{
            wpx: 60
        }, {
            wpx: 200
        }, {
            wpx: 200
        }, {
            wpx: 150
        }, {
            wpx: 80
        }, {
            wpx: 130
        }, {
            wpx: 130
        }, {
            wpx: 70
        }, {
            wpx: 70
        }, {
            wpx: 70
        }, {
            wpx: 100
        }, {
            wpx: 150
        }, {
            wpx: 200
        }];
    }

    _getcolumnConfigs() {
        return [{
            field: fields.Status,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }, {
            field: fields.UserName,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }, {
            field: fields.SystemId,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }, {
            field: fields.RealName,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }, {
            field: fields.Currency,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }, {
            field: fields.CurrentBalance,
            [MAIN_SECTION_STYLE]: bodyCellStyle.decimal
        }, {
            field: fields.OutstandingBalance,
            [MAIN_SECTION_STYLE]: bodyCellStyle.decimal
        }, {
            field: fields.OddsGroup,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }, {
            field: fields.BaStatus,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }, {
            field: fields.SpecialLevel,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }, {
            field: fields.LastLoginIp,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }, {
            field: fields.LastTransaction,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }, {
            field: fields.Email,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center
        }]
    }
}