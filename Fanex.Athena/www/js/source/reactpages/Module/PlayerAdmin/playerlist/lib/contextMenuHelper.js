import { excludedContextMenuWithNonDeposit, excludedContextMenuWithClosed, excludedContextMenuWithArchived } from './constants';

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