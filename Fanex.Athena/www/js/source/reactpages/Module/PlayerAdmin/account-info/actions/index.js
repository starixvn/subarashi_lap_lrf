import PlayerAccountService from "../lib/playerAccountService";
import * as subtabAction from './subtabAction';

const getCustomerBettingStatus = (param) => () => {
    const service = new PlayerAccountService();

    return service.getCustomerBettingStatus(param);
}

export const ActionCreators = {
    ...subtabAction,
    getCustomerBettingStatus
}