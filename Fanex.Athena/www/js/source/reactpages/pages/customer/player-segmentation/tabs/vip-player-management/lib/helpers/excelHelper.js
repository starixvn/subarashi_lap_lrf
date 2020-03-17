export default class ExcelHelper {
    static getColumnName(object, readerColumn) {
        const keys = Object.keys(object);
        const columnName = keys.find(_ => _.replace(/\s/g, '').toLocaleLowerCase() === readerColumn);
        return columnName;
    }
}

