import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import {OneTwoBetLicenseeName} from './constants'
import { BreakdownByMode, GroupByMode } from './constants';

export default class Service {
    static getTitle(fromDate, toDate, baseCurrency) {
        const dateRangeText = fromDate && toDate 
            ? `, ${Site.convertDateToString(fromDate)} → ${Site.convertDateToString(toDate)}` 
            : '';

        const baseCurrencyText = baseCurrency ? `, ${LangHelper.getSingleResource("BaseCurrency")}: ${baseCurrency}` : '';

        return LangHelper.getSingleResource("WinlossAnalysis") + dateRangeText + baseCurrencyText;
    }

    static getSelectedItemFromTreeListItem(items){
        return items.reduce((accum, elem) => accum.concat(elem.Children), []).map(elem => elem.Value).join(",");
    }

    static buildBreakDownOptionFromGroupByMode = (groupByMode) => {
        let breakDownByOption = {
            Product: { value: BreakdownByMode.Product, label: LangHelper.getSingleResource('Product'), isDisabled: false },
            Currency: { value: BreakdownByMode.Currency, label: LangHelper.getSingleResource('Currency'), isDisabled: false },
            Agent: { value: BreakdownByMode.Agent, label: LangHelper.getSingleResource('Agent'), isDisabled: false }
        }
        switch(Number(groupByMode)){
            case GroupByMode.Product:
            case GroupByMode.Sport:
            case GroupByMode.BetType:
                breakDownByOption.Product.isDisabled = true;
                break;
            case GroupByMode.Currency:
                breakDownByOption.Currency.isDisabled = true;
                break;
            case GroupByMode.Player:
                breakDownByOption.Agent.isDisabled = true;
                break;
            default:
                break;
        }

        if(AppData.licenseeName.toLowerCase() !== OneTwoBetLicenseeName.toLowerCase()){
            delete breakDownByOption.Agent;
        }

        return Object.values(breakDownByOption);
    } 
}