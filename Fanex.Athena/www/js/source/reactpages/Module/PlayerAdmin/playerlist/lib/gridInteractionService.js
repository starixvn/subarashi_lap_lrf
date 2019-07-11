import GridHelper from './gridHelper';
import { gridItemDropdownHeight } from './constants';
import { updateObjectInArray } from '@jsroot/lib/dataReducer';

export default class GridInteractionService {
    static getNextDropdownPosition(element, currentPosition, dropdownItemName) {
        if (!element || currentPosition) {
            return null;
        }
        const dropdownHeight = gridItemDropdownHeight[dropdownItemName];
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left,
            y: GridHelper.calculateTopPosition(dropdownHeight, rect.top + 20)
        };
    }
    static updatePlayerItem(playerList, custId, value, fieldName) {
        const itemIndex = playerList.findIndex(x => x.CustId === custId);
        const newPlayerItem = {...playerList[itemIndex], [fieldName]: value };
        return updateObjectInArray(playerList, itemIndex, newPlayerItem);
    }
}