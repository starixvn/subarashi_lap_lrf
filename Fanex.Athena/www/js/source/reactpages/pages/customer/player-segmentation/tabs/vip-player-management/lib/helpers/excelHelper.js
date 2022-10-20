export default class ExcelHelper {
    static getColumnName(header, readerColumn) {
        if(!header || !header.length) {
            return null;
        }
        const columnName = header.find(_ => _ && _ === readerColumn);
        return columnName;
    }

    static isValidHeader(header) {
        return header && header.length == 1;
    }

    static isValidContent(content) {
        return content && content.length > 0;
    }
}

