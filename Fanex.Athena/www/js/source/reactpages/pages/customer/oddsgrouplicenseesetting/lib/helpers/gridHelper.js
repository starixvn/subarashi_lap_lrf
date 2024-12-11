import React from 'react';
import { HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import AppData from '@jsroot/lib/AppData';
import { SubsidiaryViewType } from '@jsroot/constants/report'

export default class GridHelper {
    static renderHeader(dataHeaders) {
        return (
            <HeaderRow style={{ height: 32 }}>
                {dataHeaders && dataHeaders.length > 0 &&
                    dataHeaders.map(_ =>
                        <HeaderCell colWidth={_.colWidth}>
                            {this.renderHeaderCell(_)}
                        </HeaderCell>)}
            </HeaderRow>
        )
    }

    static renderHeaderCell(cell) {
        return <>{cell.childComponent ? cell.childComponent : cell.text}</>;
    }

    static calculateTopPosition(dropdownHeight = 0, currentTop) {
        const innerHeight = window.innerHeight;
        const expectedHeight = dropdownHeight + currentTop + 20;
        return expectedHeight > innerHeight ? currentTop - dropdownHeight : currentTop;
    }

    static isShowSubsidiary = subsidiarySearch => AppData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT && subsidiarySearch;
}
