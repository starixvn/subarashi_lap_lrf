import React from 'react';
import { HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { SortMapper } from '../constants';

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

    
    static getSortInfo(orderCol, sortType) {
        const sortInfo = {
            orderCol: SortMapper.sortCol[orderCol],
            sortType: SortMapper.sortType[sortType]
        }
        return sortInfo;
    }

    static getSortInfoFromPagingOption(options) {
        const { orderCol, sortType } = options;
        return {
            orderCol,
            sortType
        }
    }

    static callBackToUpdatePaging = ({ pagingOption, setPagingOption }) => response => {
        const { totalItem, pageIndex, pageSize, orderCol, sortType } = response;
        const newPagingOption = {
            ...pagingOption,
            ...{
                PageIndex: pageIndex,           
                PageSize: pageSize,
                orderCol,
                sortType,
                TotalItem: totalItem
            }
        }
        setPagingOption(newPagingOption);
    }
}