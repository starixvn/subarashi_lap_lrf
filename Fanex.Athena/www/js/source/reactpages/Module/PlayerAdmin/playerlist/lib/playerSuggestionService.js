import FactoryCommonService from '../../../lib/factoryCommonService';
import { systemType } from '../../../constants/configInfo';

const apiInfo = {
    searchUserNameSuggestion: { action: 'api/PlayerSuggestion/SearchUserNameList', type: systemType.lrf }
}

export default class PlayerSuggestionService {
    constructor() {
        this.commonService = FactoryCommonService.createInstance();
    }

    getSuggestionList(param) {
        const { searchUserNameSuggestion } = apiInfo;
        const configOption = {
            method: 'get'
        }

        return this.commonService.fetchData(searchUserNameSuggestion.type, searchUserNameSuggestion.action, {...param }, configOption);
    }
}