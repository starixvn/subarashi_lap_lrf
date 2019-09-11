import Excel from '@jsroot/lib/excel';
import { headerCellStyle, bodyCellStyle, titleCellStyle } from '@jsroot/constants/excelStyle';
import { generateHeaderText } from '../lib/utils';

const TITLE_ROW_INDEX = 0;
const HEADER_ROW_INDEX = 1;

const MAIN_SECTION_STYLE = 'mainSectionStyle';

const MERGING_CUSTWL_COLUMN_COUNT = 3;

const INDEX_CUSTWL_COLUMN = 3;

const fields = {
    Index: 'Index',
    Turnover: 'Turnover',
    TotalTransaction: 'TotalTransaction',
    WinLoss: 'WinLoss',
    Comm: 'Comm',
    Total: 'Total',
    BetEffective: 'BetEffective',
    LicenseeWL: 'LicenseeWL',
    BAComm: 'BAComm',
    AmtDueToBA: 'AmtDueToBA'
}

export default class ReportExcel {
    constructor(data, hasCustomerComm, isAllowedBA, title) {
        this.data = data;
        this.hasCustomerComm = hasCustomerComm;
        this.isAllowedBA = isAllowedBA;
        this.title = title;

        this.worksheet = {};
        this.currentRowIndex = hasCustomerComm ? 3 : 2;
        this.mergeConfig = [];
        this.columnConfigs = this._getcolumnConfigs(hasCustomerComm, isAllowedBA);
        this.headerText = generateHeaderText(hasCustomerComm);
    }

    export() {
        Excel.process(() => {
            this._createTitle();
            this._createHeader();
            this._createBodyData();
            this._createExcelConfig();

            Excel.export(this.worksheet, "CustomerWinLoss");
        })
    }

    _createTitle() {
        const address = Excel.getCellAddress({
            c: 0,
            r: TITLE_ROW_INDEX
        });
        this.worksheet[address] = {
            t: "s",
            v: this.title,
            s: titleCellStyle
        }

        this.mergeConfig.push({
            s: {
                r: TITLE_ROW_INDEX,
                c: 0
            },
            e: {
                r: TITLE_ROW_INDEX,
                c: this.columnConfigs.length - 1
            }
        });
    }

    _createHeader() {
        const length = this.hasCustomerComm ? this.columnConfigs.length - MERGING_CUSTWL_COLUMN_COUNT + 1 : this.columnConfigs.length;
        for (let i = 0; i < length; i++) {
            if (this.hasCustomerComm) {
                this._buildHeaderWithGroupingColumn(i);
            }
            else {
                const fieldName = this.columnConfigs[i].field;
                const address = Excel.getCellAddress({
                    c: i,
                    r: HEADER_ROW_INDEX
                });
                this.worksheet[address] = {
                    t: "s",
                    v: this.headerText[fieldName],
                    s: headerCellStyle
                }
            }
        }
    }

    _buildHeaderWithGroupingColumn(colIndex) {
        const dataColIndex = colIndex > INDEX_CUSTWL_COLUMN ? colIndex + MERGING_CUSTWL_COLUMN_COUNT - 1 : colIndex;
        const fieldName = this.columnConfigs[dataColIndex].field;
        const text = this.headerText[fieldName];
        if (fieldName === fields.WinLoss) {
            this._buildColSpanColumn(HEADER_ROW_INDEX, dataColIndex, MERGING_CUSTWL_COLUMN_COUNT, this.headerText.CustomerWinLoss);
        }
        else {
            const address = Excel.getCellAddress({
                c: dataColIndex,
                r: HEADER_ROW_INDEX
            });
            this.worksheet[address] = {
                t: "s",
                v: text,
                s: headerCellStyle
            }

            this.mergeConfig.push({
                s: {
                    r: HEADER_ROW_INDEX,
                    c: dataColIndex
                },
                e: {
                    r: HEADER_ROW_INDEX + 1,
                    c: dataColIndex
                }
            });
        }
    }

    _buildColSpanColumn(rowIndex, colIndex, colSpan, colSpanheaderText) {
        const colSpanCellAddress = Excel.getCellAddress({
            c: colIndex,
            r: rowIndex
        });
        this.worksheet[colSpanCellAddress] = {
            t: "s",
            v: colSpanheaderText,
            s: headerCellStyle
        }

        const totalColumn = colIndex + colSpan;
        this.mergeConfig.push({
            s: {
                r: rowIndex,
                c: colIndex
            },
            e: {
                r: rowIndex,
                c: totalColumn - 1
            }
        });

        for (let i = colIndex; i < totalColumn; i++) {
            const address = Excel.getCellAddress({
                c: i,
                r: rowIndex + 1
            });

            const fieldName = this.columnConfigs[i].field;
            this.worksheet[address] = {
                t: "s",
                v: this.headerText[fieldName] || '',
                s: headerCellStyle
            }
        }
    }

    _createBodyData() {
        for (let i = 0; i < this.data.length; i++) {
            const item = this.data[i];

            for (let j = 0; j < this.columnConfigs.length; j++) {
                const address = Excel.getCellAddress({
                    c: j,
                    r: this.currentRowIndex
                });

                this.worksheet[address] = this._buildDataRow(item, MAIN_SECTION_STYLE, i, j);
            }

            this.currentRowIndex++;
        }
    }

    _buildDataRow(item, sectionStyleName, rowIndex, colIndex) {
        const columnConfig = this.columnConfigs[colIndex];
        const fieldName = columnConfig.field;
        const value = colIndex === 0 ? rowIndex + 1 : item[fieldName];

        return {
            t: Excel.getCellType(value),
            v: value,
            s: columnConfig[sectionStyleName]
        }
    }

    _createExcelConfig() {
        const cellStart = Excel.getCellAddress({
            r: 0,
            c: 0
        });
        const cellEnd = Excel.getCellAddress({
            r: this.currentRowIndex,
            c: this.columnConfigs.length
        });

        this.worksheet["!ref"] = `${cellStart}:${cellEnd}`;
        this.worksheet['!cols'] = this.columnConfigs.map(x => ({ wpx: x.width }));
        this.worksheet["!merges"] = this.mergeConfig;
    }

    _getcolumnConfigs(hasCustomerComm, isAllowedBA) {
        const columnConfig = [{
            field: fields.Index,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center,
            width: 50
        }, {
            field: fields.Turnover,
            [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
            width: 150
        }, {
            field: fields.TotalTransaction,
            [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
            width: 150
        }, {
            field: fields.WinLoss,
            [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
            width: 150
        }];

        if (hasCustomerComm) {
            columnConfig.push(
                {
                    field: fields.Comm,
                    [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
                    width: 120
                }, {
                    field: fields.Total,
                    [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
                    width: 150
                }
            );
        }

        columnConfig.push(
            {
                field: fields.BetEffective,
                [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
                width: 150
            }, {
                field: fields.LicenseeWL,
                [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
                width: 150
            }
        );

        if (isAllowedBA) {
            columnConfig.push(
                {
                    field: fields.BAComm,
                    [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
                    width: 120
                }, {
                    field: fields.AmtDueToBA,
                    [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
                    width: 120
                }
            );
        }

        return columnConfig;
    }
}