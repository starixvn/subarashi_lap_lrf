import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import NumberFormat from '@jsroot/lib/numberFormat';
import VipSwitcherCell from '../../../../components/VipSwitcherCell';
import HyperLinkCell from '../../../../components/HyperLinkCell';

const PlayerRow = (props) => {
    const { dataItem, index, hasVipManagement, showSubsidiary, onSelectPlayer } = props;
    const { custId, subsidiary, externalId, systemId, markDate, reducedMaxPerEvent, reducedMaxPerBet, reasonList } = dataItem;

    const _renderReasonList = () => reasonList.map(reason => <div>{reason}</div>);
    const onClickExternalId = React.useCallback(() => onSelectPlayer({ custId, externalId, systemId }), [custId, externalId, systemId]);

    return (
        <Row key={`player_row_${custId}`}>
            {showSubsidiary && <Cell className="left-align">{subsidiary}</Cell>}
            <HyperLinkCell name={externalId} onClick={onClickExternalId} />
            <Cell className="left-align">{systemId}</Cell>
            <Cell className="right-align">{NumberFormat.format(reducedMaxPerEvent, 2)}</Cell>
            <Cell className="right-align">{NumberFormat.format(reducedMaxPerBet, 2)}</Cell>
            <Cell className="left-align">{_renderReasonList()}</Cell>
            <Cell className="center-align">{markDate}</Cell>
            {hasVipManagement && <VipSwitcherCell index={index} />}
        </Row>
    )
}

export default React.memo(PlayerRow);