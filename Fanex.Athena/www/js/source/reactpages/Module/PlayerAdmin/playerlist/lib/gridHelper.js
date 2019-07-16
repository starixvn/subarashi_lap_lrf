import React from 'react';
import { HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { fields } from './constants';

export default class GridHelper {
    static renderHeader(displayedColumn) {
        const { Status, UserName, SystemId, RealName, Currency, CurrentBalance, OutstandingBalance,
            OddsGroup, BaStatus, SpecialLevel, LastLoginIp, LastTransaction, Email } = fields;

        return (
            <HeaderRow style={{ height: 32 }}>
                {/* For Phase 2 */}
                {/* <HeaderCell colWidth={30}><input type="checkbox" /></HeaderCell> */}
                {displayedColumn[Status] && <HeaderCell colWidth={80} sortBy={Status}>Status</HeaderCell>}
                {displayedColumn[UserName] && <HeaderCell colWidth={80} sortBy={UserName}>Username</HeaderCell>}
                {displayedColumn[SystemId] && <HeaderCell colWidth={100}>SystemId</HeaderCell>}
                {displayedColumn[RealName] && <HeaderCell colWidth={80} sortBy={RealName}>Real Name</HeaderCell>}
                {displayedColumn[Currency] && <HeaderCell colWidth={60} sortBy={Currency}>Currency</HeaderCell>}
                {displayedColumn[CurrentBalance] && <HeaderCell colWidth={80} sortBy={CurrentBalance}>Current Balance</HeaderCell>}
                {displayedColumn[OutstandingBalance] && <HeaderCell colWidth={80} sortBy={OutstandingBalance}>Outstanding Balance</HeaderCell>}
                {displayedColumn[OddsGroup] && <HeaderCell colWidth={50} sortBy={OddsGroup}>Odds Group</HeaderCell>}
                {displayedColumn[BaStatus] && <HeaderCell colWidth={50} sortBy={BaStatus}>BA Status</HeaderCell>}
                {displayedColumn[SpecialLevel] && <HeaderCell colWidth={50} sortBy={SpecialLevel}>Special Level</HeaderCell>}
                {displayedColumn[LastLoginIp] && <HeaderCell colWidth={60}>Last Login IP</HeaderCell>}
                {displayedColumn[LastTransaction] && <HeaderCell colWidth={100} sortBy={LastTransaction}>Last Transaction</HeaderCell>}
                {displayedColumn[Email] && <HeaderCell colWidth={100}>Email</HeaderCell>}
            </HeaderRow>
        )
    }

    static calculateTopPosition(dropdownHeight, currentTop) {
        const innerHeight = window.innerHeight;
        const expectedHeight = dropdownHeight + currentTop + 20;

        return expectedHeight > innerHeight ? currentTop - dropdownHeight : currentTop;
    }

    static sortPlayerList(dataList, sortBy, sortOrder) {
        if(!dataList || dataList.length === 0){
            return [];
        }

        const isSortAscending = sortOrder.toLowerCase() === 'asc';
        const newDataList = [...dataList];
        const isTringType = typeof newDataList[0][sortBy] === 'string';
        newDataList.sort((currentItem, nextItem) => {
            const currentValue = currentItem[sortBy];
            const nextValue = nextItem[sortBy];
            if (isTringType) {
                return this.sortStringValue(currentValue, nextValue, isSortAscending);
            }

            return isSortAscending ? currentValue - nextValue : -(currentValue - nextValue)
        });

        return newDataList;
    }

    static sortStringValue(current, next, isSortAscending) {
        const currentUpperCase = current.toUpperCase();
        const nextUpperCase = next.toUpperCase();

        if (isSortAscending) {
            return currentUpperCase > nextUpperCase ? 1 : (currentUpperCase < nextUpperCase ? -1 : 0);
        }
        else {
            return currentUpperCase > nextUpperCase ? -1 : (currentUpperCase < nextUpperCase ? 1 : 0);
        }
    }
}