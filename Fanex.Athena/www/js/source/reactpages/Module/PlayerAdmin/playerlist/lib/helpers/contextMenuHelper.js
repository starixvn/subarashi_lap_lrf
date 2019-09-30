import {
    excludedContextMenuWithNonDeposit,
    excludedContextMenuWithClosed,
    excludedContextMenuWithArchived,
    contextMenuList,
    playerStatusByName
} from '../constants';

export const isShowContextMenuItem = (item, isDeposit, isArchived, isClosed) => {
    if (!isDeposit) {
        return !excludedContextMenuWithNonDeposit.includes(item.key);
    }

    if (isClosed) {
        return !excludedContextMenuWithClosed.includes(item.key);
    }

    if (isArchived) {
        return !excludedContextMenuWithArchived.includes(item.key);
    }

    return true;
}

export const getActiveTabList = (player, tabList) => {
    const { isDeposit, isArchived, status } = player;
    return contextMenuList.filter(item => {
        const isClosedPlayer = status === playerStatusByName.Closed;
        return !!tabList.find(t => item.tabName === t.Name) &&
            isShowContextMenuItem(item, isDeposit, isArchived, isClosedPlayer);
    });
}