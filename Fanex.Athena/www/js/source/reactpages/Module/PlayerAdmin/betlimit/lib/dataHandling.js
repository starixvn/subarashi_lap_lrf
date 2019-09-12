import Validatation from './validatation';
import Utility from './utility';

export default class DataHandling {
    static getViewData(rawData) {
        return rawData.map((rawRow) => {
            return DataHandling.getViewRowData(rawRow);
        });
    }

    static getViewRowData(rawData) {
        let row = {
            Id: rawData.Id,
            BetType: rawData.BetType,
            BetSettingType: rawData.BetSettingType,
            MinBet: Utility.formatValue(rawData.MinBet),
            MaxBet: Utility.formatValue(rawData.MaxBet),
            MaxPerMatch: Utility.formatValue(rawData.MaxPerMatch),
            BetValueMin: rawData.BetValueMin,
            BetValueMax: rawData.BetValueMax,
            MaxPerMatchMin: rawData.MaxPerMatchMin,
            MaxPerMatchMax: rawData.MaxPerMatchMax
        };

        row.OriginalMinBet = row.MinBet;
        row.OriginalMaxBet = row.MaxBet;
        row.OriginalMaxPerMatch = row.MaxPerMatch;

        return row;
    }

    static getSubmitRowData(row) {
        return {
            Id: row.Id,
            BetType: row.BetType,
            BetSettingType: row.BetSettingType,
            MinBet: Utility.getValueAsNumber(row.MinBet),
            MaxBet: Utility.getValueAsNumber(row.MaxBet),
            MaxPerMatch: Utility.getValueAsNumber(row.MaxPerMatch),
            IsUpdated: row.MinBet !== row.OriginalMinBet
                || row.MaxBet !== row.OriginalMaxBet
                || row.MaxPerMatch !== row.OriginalMaxPerMatch
        };
    }

    static getSubmitData(rows) {
        const submitData = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const currentValue = DataHandling.getSubmitRowData(row);
            const invalidData = Validatation.validate(currentValue, row);

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
        const currentValue = DataHandling.getSubmitRowData(row);

        return Validatation.validate(currentValue, row);
    }
}