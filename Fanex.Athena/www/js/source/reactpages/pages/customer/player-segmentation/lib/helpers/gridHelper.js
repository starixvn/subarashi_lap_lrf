import React from 'react';
import { HeaderRow, HeaderCell } from '@9softstudio/react-grid';

export default class GridHelper {
    static renderHeader(dataHeaders) {
        return (
            <HeaderRow style={{ height: 32 }}>
                {dataHeaders && dataHeaders.length > 0 &&
                 dataHeaders.map(_ => 
                 <HeaderCell colWidth={_.colWidth} sortBy={_.sortBy}>
                     {_.childComponent ? _.childComponent : _.text}
                 </HeaderCell>)}
            </HeaderRow>
        )
    }

    static calculateTopPosition(dropdownHeight = 0, currentTop) {
        const innerHeight = window.innerHeight;
        const expectedHeight = dropdownHeight + currentTop + 20;
        return expectedHeight > innerHeight ? currentTop - dropdownHeight : currentTop;
    }

    static callBackToUpdatePaging = ({ pagingOption, setPagingOption }) => response => {
        const { totalItem, pageIndex, pageSize } = response;
        const newPagingOption = {
            ...pagingOption,
            ...{
                PageIndex: pageIndex,           
                PageSize: pageSize,
                TotalItem: totalItem
            }
        }
        setPagingOption(newPagingOption);
    }
}