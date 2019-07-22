import FactoryCommonService from '../../../lib/factoryCommonService';
import { systemType } from '../../../constants/configInfo';

const apiInfo = {
    userNameSuggestion: { action: 'PlayerAdminContainer/GetSuggestionList', type: systemType.newAdmin }
}

export default class PlayerSuggestionService {
    constructor() {
        this.commonService = FactoryCommonService.createInstance();
    }

    getSuggestionList(param) {
        const { userNameSuggestion } = apiInfo;
        const configOption = {
            method: 'get'
        }

        return this.commonService.fetchData(userNameSuggestion.type, userNameSuggestion.action, {...param }, configOption);
    }
}