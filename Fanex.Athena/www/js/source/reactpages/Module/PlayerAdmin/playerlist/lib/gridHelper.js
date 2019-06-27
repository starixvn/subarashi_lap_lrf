import React from 'react';
import { HeaderRow, HeaderCell } from '@9softstudio/react-grid';

export default class GridHelper {
    static renderHeader(displayedColumn) {
        return (
            <HeaderRow style={{ height: 32 }}>
                {/* For Phase 2 */}
                {/* <HeaderCell colWidth={30}><input type="checkbox" /></HeaderCell> */}
                {displayedColumn['Status'] && <HeaderCell colWidth={80}>Status</HeaderCell>}
                {displayedColumn['Username'] && <HeaderCell colWidth={80}>Username</HeaderCell>}
                {displayedColumn['SystemID'] && <HeaderCell colWidth={100}>SystemId</HeaderCell>}
                {displayedColumn['RealName'] && <HeaderCell colWidth={80}>Real Name</HeaderCell>}
                {displayedColumn['Currency'] && <HeaderCell colWidth={60}>Currency</HeaderCell>}
                {displayedColumn['CurrentBalance'] && <HeaderCell colWidth={80}>Current Balance</HeaderCell>}
                {displayedColumn['OutstandingBalance'] && <HeaderCell colWidth={80}>Outstanding Balance</HeaderCell>}
                {displayedColumn['OddsGroup'] && <HeaderCell colWidth={50}>Odds Group</HeaderCell>}
                {displayedColumn['BAStatus'] && <HeaderCell colWidth={50}>BA Status</HeaderCell>}
                {displayedColumn['SpecialLevel'] && <HeaderCell colWidth={50}>Special Level</HeaderCell>}
                {displayedColumn['LastLoginIp'] && <HeaderCell colWidth={60}>Last Login IP</HeaderCell>}
                {displayedColumn['LastTransaction'] && <HeaderCell colWidth={100}>Last Transaction</HeaderCell>}
                {displayedColumn['Email'] && <HeaderCell colWidth={100}>Email</HeaderCell>}
            </HeaderRow>
        )
    }
}