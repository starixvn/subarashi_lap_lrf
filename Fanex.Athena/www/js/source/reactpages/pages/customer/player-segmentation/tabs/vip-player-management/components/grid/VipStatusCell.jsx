import React from 'react';
import { Cell } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper';
import VipSwitcherCell from '../../../../components/VipSwitcherCell';

const VipStatusCell = props => {
    const { isMarkVoid, index } = props;
    return isMarkVoid ?
    <Cell className="center-align">
        <div className="cell-ticket-void">
            <span>{LangHelper.getSingleResource('No')}</span>
            <i class="icon icon-warning"></i>
        </div>
    </Cell>
    : <VipSwitcherCell index={index} />
}

export default React.memo(VipStatusCell);

