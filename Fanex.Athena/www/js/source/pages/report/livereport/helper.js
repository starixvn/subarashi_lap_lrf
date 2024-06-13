define(['common/querystring'], function (QueryString) {
    'use strict';

    function getMatchListProductOption(sportId, productCode) {
        const newSportId = Number(sportId);
        let productOptions = [];
        if (newSportId > 0) {
            if (newSportId === 180 || newSportId === 186 || newSportId === 231 || newSportId === 104 ||
                (newSportId >= 190 && newSportId <= 197) || newSportId === 178 || newSportId === 179
                || newSportId === 188) {
                productOptions.push('VS');
            }
            else if (newSportId === 162) {
                productOptions.push('LC');
            }
            else {
                if (productCode === 'SB' || productCode === 'ALL') {
                    productOptions.push('SB');
                }
                if (productCode === 'BA' || productCode === 'ALL') {
                    productOptions.push('BA');
                }
            }
        }
        else {
            if (productCode === 'ALL') {
                productOptions = ['SB', 'BA', 'NG', 'LC', 'VS', 'CS'];
            }
            else {
                productOptions.push(productCode);
            }
        }

        return productOptions;
    }

    return {
        getMatchListProductOption: getMatchListProductOption,
    };
});