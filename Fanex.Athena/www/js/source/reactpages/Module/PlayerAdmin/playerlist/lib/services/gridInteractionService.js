import GridHelper from '../helpers/gridHelper';
import { gridItemDropdownHeight, stringTypeFields } from '../constants';
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
        let itemIndex = playerList.findIndex(x => x.IbcCustId === custId);
        if (itemIndex === -1) {
            itemIndex = playerList.findIndex(x => x.LicenseeCustId === custId);
        }

        if (itemIndex !== -1) {
            const newPlayerItem = {...playerList[itemIndex], [fieldName]: value };
            return updateObjectInArray(playerList, itemIndex, newPlayerItem);
        }

        return [...playerList];
    }

    static updatePlayerWithBaStatus(playerList, ibcCustId, isBa, oddsGroup) {
        const itemIndex = playerList.findIndex(x => x.IbcCustId === ibcCustId);
        const newPlayerItem = {...playerList[itemIndex], BaStatus: isBa, OddsGroup: oddsGroup };
        return updateObjectInArray(playerList, itemIndex, newPlayerItem);
    }

    static sortPlayerList(dataList, sortBy, sortOrder) {
        if (!dataList || dataList.length === 0) {
            return [];
        }

        const isSortAscending = sortOrder.toLowerCase() === 'asc';
        const newDataList = [...dataList];
        const isTringType = stringTypeFields.includes(sortBy);
        newDataList.sort((currentItem, nextItem) => {
            const currentValue = currentItem[sortBy];
            const nextValue = nextItem[sortBy];
            if (isTringType) {
                return this.sortStringValue(currentValue || '', nextValue || '', isSortAscending);
            }

            return isSortAscending ? currentValue - nextValue : -(currentValue - nextValue)
        });

        return newDataList;
    }

    static sortStringValue(current, next, isSortAscending) {
        const currentUpperCase = current.toUpperCase();
        const nextUpperCase = next.toUpperCase();

        const sortResult = currentUpperCase > nextUpperCase ? 1 : (currentUpperCase < nextUpperCase ? -1 : 0);

        return isSortAscending ? sortResult : -sortResult;
    }
}