import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import {ExportExcelMode, OneTwoBetLicenseeName} from './constants'
import { BreakdownByMode, GroupByMode, GroupByList, ALL_SELECTED_TEXT, ProductCode } from './constants';
import { ApiUrl } from '../common/constants.js';
import DataService from '@jsroot/lib/DataService.js';
import { saveAs } from 'file-saver';

export default class Service {
    static isOneTwoBetLicensee = () => {
        return AppData.licenseeName.toLowerCase() === OneTwoBetLicenseeName.toLowerCase()
    }

    static isContainProductSportBookOrBa = (selectedItemsKey) =>{
        var listSelectedProduct = selectedItemsKey.split(",");
        return listSelectedProduct.indexOf(ProductCode.SportsBook) >=0 || listSelectedProduct.indexOf(ProductCode.BA) >=0
    }

    static getSelectedItemFromTreeListItem(items){
        return items.reduce((accum, elem) => accum.concat(elem.Children), []).map(elem => elem.Value).join(",");
    }

    static getInitSelectedBettypeXML(items){
        var xmlDoc = document.implementation.createDocument(null, "ROOT", null);

        items.forEach((item) => {
            if(!item.Children || !item.Children.length)
            {
                return;
            }

            var productCode = item.Value;
            var bettypeList = item.Children.reduce((accum, elem) => accum.concat(elem), []).map(elem => elem.Value.substring(0, elem.Value.indexOf("_"))).join(",");

            Service.buildBettypeElement(xmlDoc, productCode, bettypeList);
        });

        return new XMLSerializer().serializeToString(xmlDoc);
    }

    static getSelectedBettypeXML = (items) => {
        var xmlDoc = document.implementation.createDocument(null, "ROOT", null);

        const parents = items.filter((item) => item.parentKey === null);

        parents.forEach((parent) => {

            const childrenList = items.filter((item) => item.parentKey === parent.key && item.checked);
            if(!childrenList.length)
            {
                return;
            }

            var productCode = parent.key;
            var bettypeList = childrenList.reduce((accum, elem) => accum.concat(elem), []).map(elem => elem.key.substring(0, elem.key.indexOf("_"))).join(",");

            Service.buildBettypeElement(xmlDoc, productCode, bettypeList);
        });

        return new XMLSerializer().serializeToString(xmlDoc);
    }

    static buildBettypeElement = (xmlDoc, productCode, bettypeList) => {
        var bettypeElem = xmlDoc.createElement("Bettype");

        if(productCode === "SB,BA" || productCode === "BA")
        {
            productCode = "SB";
        }

        bettypeElem.setAttribute("pc", productCode);
        bettypeElem.setAttribute("bt", bettypeList);

        xmlDoc.documentElement.appendChild(bettypeElem);
    }

    static buildGroupByOption= () =>{
        return this.isOneTwoBetLicensee()
            ? GroupByList 
            : GroupByList.filter(item => item.value !== GroupByMode.Agent);
    }

    static buildBreakDownOptionFromGroupByMode = (groupByMode) => {
        let breakDownByOption = {
            Product: { value: BreakdownByMode.Product, label: LangHelper.getSingleResource('Product'), isDisabled: false },
            Currency: { value: BreakdownByMode.Currency, label: LangHelper.getSingleResource('Currency'), isDisabled: false },
            Player: { value: BreakdownByMode.Player, label: LangHelper.getSingleResource('Player'), isDisabled: true }
        }
        switch(Number(groupByMode)){
            case GroupByMode.Product:
            case GroupByMode.Sport:
            case GroupByMode.BetType:
                breakDownByOption.Product.isDisabled = true;
                break;
            case GroupByMode.Player:
            case GroupByMode.Currency:
                breakDownByOption.Currency.isDisabled = true;
                break;
            case GroupByMode.Agent:
                breakDownByOption.Currency.isDisabled = true;
                breakDownByOption.Player.isDisabled = false;
                break;
            default:
                break;
        }

        if(!this.isOneTwoBetLicensee()){
            delete breakDownByOption.Player;
        }

        return Object.values(breakDownByOption);
    }
    
    static getNormalizedSelectedParamValueForMultiSelectFilter(selectedValue, dataList, selectedIdFunc){
        const allSelected = (selectedIdFunc instanceof Function) 
            ? dataList.map(selectedIdFunc).join(",")
            : dataList.map(item => item.id).join(",");
        const listAllSelectId = allSelected.split(",");
        const listSelectedId = selectedValue.split(",");
        return listAllSelectId.every(id => listSelectedId.indexOf(id) >= 0) ? ALL_SELECTED_TEXT : selectedValue;
    }

    static getNormalizedSelectedParamValueForTreeListFilter(selectedValue, dataList){
        const allSelected = this.getSelectedItemFromTreeListItem(dataList);
        return selectedValue === allSelected ? ALL_SELECTED_TEXT : selectedValue;
    }

    static isContainBAProduct = (selectedProductCodes) => {
        const baProductCode = "BA";
        const listSelectedProductCodes = selectedProductCodes.split(",");
        return listSelectedProductCodes.includes(baProductCode);
    }

    static getCurrencyCodes = (currencyListIds, currencyList) => {
        const normalizeText = this.getNormalizedSelectedParamValueForMultiSelectFilter(currencyListIds, currencyList);
        if (normalizeText === ALL_SELECTED_TEXT)
        {
            return ALL_SELECTED_TEXT;
        } 
        const currencyCodesText = currencyListIds.split(',').reduce((prev, cur, index) => {
            let code = currencyList.find(c => c.id == cur).value;
            if (index === 0){
                return code;
            }
            return `${prev},${code}`;
        }, "")
        return currencyCodesText;
    }

    static getFile = (params) => {
        if (!params) {
            return;
        }
        return DataService.getProxyFile(DataService.apiKeys.report, ApiUrl.EXPORT_EXCEL_URL, params).then((response) => {
            const contentType = response.headers["content-type"];
            if (contentType && contentType.indexOf('application/json') > -1) {
                const RowsExceedLimitErrorCode = 1001;
                Site.readAsJson(response.data, (result) => {
                    if (result.ErrorCode === RowsExceedLimitErrorCode) {
                        this._showExportWarning();
                    }
                    else {
                        const msg = result.ErrorMsg || LangHelper.getSingleResource("ErrorProcessingMsg");
                        alert(msg);
                    }
                });
            } else {
                const NoContentStatusCode = 204;
                if (response.status === NoContentStatusCode) {
                    alert(LangHelper.getSingleResource("NoInfo"));
                }
                else {
                    const fileName = params.ExportExcelMode == ExportExcelMode.All ? "WinLossReportGroupByAndBreakdownBy" : "WinLossReportGroupBy";
                    const fileNameWithExt = fileName +
                        (response.headers["content-type"] === "application/zip" ? ".zip" : ".xls");

                    Site.downloadFile(response.data, fileNameWithExt);
                }
            }
        }).catch(error => {
            alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
        });
    }
}