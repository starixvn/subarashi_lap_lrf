
import LangHelper from '@jsroot/lib/langHelper'
import { SearchingIdOptions } from '../lib/constants'
export default class Helper {
    static getSearchingIdText = (searchingIdOption) => {
        return searchingIdOption === SearchingIdOptions.refNo ?
            LangHelper.getSingleResource("RefNo") : LangHelper.getSingleResource("LicenseeTxId")
    }
    
    static getUserNameText = (searchingIdOption) => {
        return searchingIdOption === SearchingIdOptions.txID ?
            LangHelper.getSingleResource("Username") + " *": LangHelper.getSingleResource("Username")
    }
}
