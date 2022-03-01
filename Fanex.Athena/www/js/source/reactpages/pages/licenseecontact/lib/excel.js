import Excel from '@jsroot/lib/excel';
import LangHelper from '@jsroot/lib/langHelper';
import { titleCellStyle, headerCellStyle, bodyCellStyle } from '@jsroot/constants/excelStyle';
import { getContactTypeText } from './helper';
import { fields, textHeaders } from './contants';

const TITLE_ROW_INDEX = 0;
const HEADER_ROW_INDEX = 1;
const DATA_ROW_INDEX = 3;

const MAIN_SECTION_STYLE = 'mainSectionStyle';


export default class LicenseeContactExcel {
    constructor(data) {
        this.data = data;
        this.title = LangHelper.getSingleResource('LicenseeContacts');
        this.worksheet = {};
        this.currentRowIndex = DATA_ROW_INDEX;
        this.columnConfigs = this._getcolumnConfigs();
        this.mergeConfig = [];
    }

    export(onFinished) {
        if (!this.data || !this.data.length) {
            alert(LangHelper.getSingleResource('NoInfo'))
            return;
        }

        Excel.process(() => {
            this._createTitle();
            this._createHeader();
            this._createBodyData();
            this._createExcelConfig();

            Excel.export(this.worksheet, 'LicenseeContacts');
            onFinished && onFinished();
        })
    }

    _createTitle() {
        this.mergeConfig.push({ s: { r: TITLE_ROW_INDEX, c: 0 }, e: { r: TITLE_ROW_INDEX, c: this.columnConfigs.length - 1 } });
        const address = Excel.getCellAddress({ c: 0, r: TITLE_ROW_INDEX });
        this.worksheet[address] = { t: 's', v: this.title, s: titleCellStyle }
    }

    _createHeader() {
        const totalColumn = this.columnConfigs.length;
        for (let i = 0; i < totalColumn; i++) {
            const field = this.columnConfigs[i].field;
            const address = Excel.getCellAddress({
                c: i,
                r: HEADER_ROW_INDEX
            });

            this.worksheet[Excel.getCellAddress({
                c: i,
                r: HEADER_ROW_INDEX
            })] = {
                t: "s",
                v: textHeaders[field] || '',
                s: headerCellStyle
            }

            this.worksheet[Excel.getCellAddress({
                c: i,
                r: HEADER_ROW_INDEX + 1
            })] = {
                t: "s",
                v: '',
                s: headerCellStyle
            }

            this.mergeConfig.push({ s: { r: HEADER_ROW_INDEX, c: i }, e: { r: HEADER_ROW_INDEX + 1, c: i } });
        }
    }

    _createBodyData() {
        const totalColumn = this.columnConfigs.length;
        for (let i = 0; i < this.data.length; i++) {
            const item = { ...this.data[i], [fields.Index]: i + 1 };

            for (let j = 0; j < totalColumn; j++) {
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
        let value = item[columnConfig.field];
        if(columnConfig.field === fields.ToList || columnConfig.field === fields.CcList) {
            value = value.join('\n')
        } else if(columnConfig.field === fields.ContactType) {
            value = getContactTypeText(value)
        }
        const displayedValue = this._shouldSetEmpty(value) ? '' : value;
        return {
            t: Excel.getCellType(displayedValue),
            v: displayedValue,
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
            c: this.columnConfigs.length - 1
        });

        this.worksheet['!merges'] = this.mergeConfig;
        this.worksheet["!ref"] = `${cellStart}:${cellEnd}`;
        this.worksheet['!cols'] = this.columnConfigs.map(x => ({ wpx: x.width }));
    }

    _getcolumnConfigs() {
        var result = [{
            field: fields.Index,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center,
            width: 50
        }, {
            field: fields.ContactName,
            [MAIN_SECTION_STYLE]: bodyCellStyle.left,
            width: 150
        }, {
            field: fields.ContactType,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center,
            width: 100
        }, {
            field: fields.Position,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center,
            width: 150
        }, {
            field: fields.Department,
            [MAIN_SECTION_STYLE]: bodyCellStyle.center,
            width: 150
        }, {
            field: fields.Email,
            [MAIN_SECTION_STYLE]: bodyCellStyle.left,
            width: 150
        }, {
            field: fields.Skype,
            [MAIN_SECTION_STYLE]: bodyCellStyle.left,
            width: 150
        }, {
            field: fields.ToList,
            [MAIN_SECTION_STYLE]: bodyCellStyle.left,
            width: 200
        }, {
            field: fields.CcList,
            [MAIN_SECTION_STYLE]: bodyCellStyle.left,
            width: 200
        }, {
            field: fields.Remark,
            [MAIN_SECTION_STYLE]: bodyCellStyle.left,
            width: 200
        }];
        return result;
    }
}
