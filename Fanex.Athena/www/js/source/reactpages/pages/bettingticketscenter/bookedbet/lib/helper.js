
import LangHelper from '@jsroot/lib/langHelper'

const searchingIdOptionText = [
    "",
    LangHelper.getSingleResource("BookedId"),
    LangHelper.getSingleResource("RefNo"),
    LangHelper.getSingleResource("ExternalIdOrSystemId")
];

export default class Helper {
    static getSearchingIdText = (searchingIdOption) => searchingIdOptionText[searchingIdOption];
}
