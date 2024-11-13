import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import { HeaderText, ALL_SELECTED_TEXT, ProductCode } from './constants';
import AppData from '@jsroot/lib/AppData';
import moment from 'moment'

export default class Service {
    static getTitle(fromDate, toDate, baseCurrency, viewSabaCoins = false) {
        if (viewSabaCoins) {
            return `${LangHelper.getSingleResource("BettingTicketCenter")}, ${LangHelper.getSingleResource("Viewin").replace("{0}", LangHelper.getSingleResource("SabaCoins"))}`;
        }

        const dateRangeText = fromDate && toDate
            ? `, ${Site.convertDateToString(fromDate)} → ${Site.convertDateToString(toDate)}`
            : '';

        const baseCurrencyText = baseCurrency ? `, ${LangHelper.getSingleResource("BaseCurrency")}: ${baseCurrency}` : '';

        return LangHelper.getSingleResource("BettingTicketCenter") + dateRangeText + baseCurrencyText;
    }

    static getHeaderName = (column) => {
        if (column === 'LicenseeWL') {
            return `${HeaderText.LicenseeWL}/${HeaderText.Comm}`;
        }

        if (column === 'WinLoss' && AppData.isAllowedCustomerComm) {
            return `${HeaderText.WinLoss}/${HeaderText.Comm}`;
        }

        if (column === "") {
            return "";
        }

        return HeaderText[column];
    }

    static isSingleDate = (dateRange) => {
        if (!dateRange) {
            return false;
        }
        const { fromDate, toDate } = dateRange;
        return moment(fromDate, "MM/DD/YYYY", true).isSame(moment(toDate, "MM/DD/YYYY", true), 'day');
    }

    static getSelectedItemFromTreeListItem(items) {
        return items.reduce((accum, elem) => accum.concat(elem.Children), []).map(elem => elem.Value).join(",");
    }

    static getNormalizedSelectedParamValueForTreeListFilter(selectedValue, dataList) {
        const allSelected = this.getSelectedItemFromTreeListItem(dataList);
        return selectedValue === allSelected ? ALL_SELECTED_TEXT : selectedValue;
    }

    static getSelectedBettype = (selectedValue, dataList) => {
        if (!selectedValue || selectedValue === ALL_SELECTED_TEXT || selectedValue === this.getSelectedItemFromTreeListItem(dataList)) {
            return ALL_SELECTED_TEXT;
        }

        let betTypeList = selectedValue.split(",").map((elem) => ({
            BetType: elem.substring(0, elem.indexOf("_")),
            ProductPrefix: elem.substring(elem.indexOf("_") + 1)
        }));

        let betTypeGroupByProduct = Map.groupBy(betTypeList, (elem) => elem.ProductPrefix)

        // build XML
        let xmlDoc = document.implementation.createDocument(null, "ROOT");
        const keys = [...betTypeGroupByProduct.keys()]

        keys.forEach(key => {
            let node = xmlDoc.createElement("BetType");
            let betTypes = betTypeGroupByProduct.get(key).map(x => x.BetType).join(",");

            node.setAttribute('ProductPrefix', key);
            node.setAttribute('BetTypes', betTypes);
            xmlDoc.documentElement.appendChild(node);
        });

        return new XMLSerializer().serializeToString(xmlDoc);
    }

    static isContainProductSportBookOrBa = (selectedItemsKey) => {
        var listSelectedProduct = selectedItemsKey.split(",");
        return listSelectedProduct.indexOf(ProductCode.SportsBook) >= 0 || listSelectedProduct.indexOf(ProductCode.BA) >= 0
    }
}