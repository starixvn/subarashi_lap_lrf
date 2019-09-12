import Validatation from './validatation';
import Utility from './utility';
import DataHandling from './dataHandling';

export default class NGDataHandling {
    static getViewData(rawData) {
        return rawData.map((rawRow) => {
            return NGDataHandling.getViewRowData(rawRow);
        });
    }

    static getViewRowData(rawData) {
        let row = DataHandling.getViewRowData(rawData);
        row.MaxPerBall = Utility.formatValue(rawData.MaxPerBall);
        row.MaxPerBallMax = rawData.MaxPerBallMax;
        row.OriginalMaxPerBall = row.MaxPerBall;

        return row;
    }

    static getSubmitRowData(row) {
        let data = DataHandling.getViewRowData(row);
        data.MaxPerBall = Utility.getValueAsNumber(row.MaxPerBall);
        data.IsUpdated = data.IsUpdated || row.MaxPerBall !== row.OriginalMaxPerBall;

        return data;
    }

    static getSubmitData(rows) {
        const submitData = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const currentValue = NGDataHandling.getSubmitRowData(row);
            const invalidData = Validatation.validateNumberGame(currentValue, row);

            if (invalidData !== null) {
                return {
                    IsValid: false,
                    Data: invalidData
                };
            }

            submitData.push(currentValue);
        }

        return {
            IsValid: true,
            Data: submitData
        };
    }

    static validate(row) {
        const currentValue = NGDataHandling.getSubmitRowData(row);

        return Validatation.validateNumberGame(currentValue, row);
    }
}