import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper';
import VipSwitcherCell from '../../../../components/VipSwitcherCell';

const PlayerRow = (props) => {
    const { dataItem, index } = props;
    const { custId, externalId, systemId, markDate, isMarkVoid } = dataItem;
    
    const _renderVipSwitcherCell = () => {
        return isMarkVoid ?
            <Cell className="center-align">
                <div className="cell-ticket-void">
                    <span>{LangHelper.getSingleResource('No')}</span>
                    <i class="icon-warning"></i>
                </div>
            </Cell>
            : <VipSwitcherCell index={index} />
    }

    return (
        <Row key={`player_row_${custId}`}>
            <Cell className="center-align">{externalId}</Cell>
            <Cell className="center-align">{systemId}</Cell>
            <Cell className="center-align">{markDate}</Cell>
            {_renderVipSwitcherCell()}
        </Row>
    )
}

export default React.memo(PlayerRow);