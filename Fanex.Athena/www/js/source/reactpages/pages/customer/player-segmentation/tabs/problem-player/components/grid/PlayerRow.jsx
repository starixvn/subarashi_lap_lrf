import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper';
import VipSwitcherCell from '../../../../components/VipSwitcherCell';

const PlayerRow = (props) => {
    const { dataItem, index, hasVipManagement } = props;
    const { custId, externalId, systemId, markDate, isMarkVoid, reducedMaxPerEvent, reducedMaxPerBet, reason } = dataItem;
    
    const _renderVipSwitcherCell = () => {
        return isMarkVoid ?
            <Cell className="center-align">
                <div className="cell-ticket-void" title={LangHelper.getSingleResource('DescriptionAbnormalBet')}>
                    <span>{LangHelper.getSingleResource('No')}</span>
                    <i class="icon-warning"></i>
                </div>
            </Cell>
            : <VipSwitcherCell index={index} />
    }

    return (
        <Row key={`player_row_${custId}`}>
            <Cell className="left-align">{externalId}</Cell>
            <Cell className="left-align">{systemId}</Cell>
            <Cell className="right-align">{reducedMaxPerEvent}</Cell>
            <Cell className="right-align">{reducedMaxPerBet}</Cell>
            <Cell className="left-align">{reason}</Cell>
            <Cell className="center-align">{markDate}</Cell>
            {hasVipManagement && _renderVipSwitcherCell()}
        </Row>
    )
}

export default React.memo(PlayerRow);