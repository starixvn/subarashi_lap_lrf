import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import CheckBox from '@jsroot/components/CheckBox';
import LangHelper from '@jsroot/lib/langHelper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import VipSwitcherCell from '../../../../components/VipSwitcherCell';

export const PlayerRow = (props) => {
    const { dataItem, setPlayerList, playerList } = props;
    const { externalId, systemId, isSelected, isMarkVoid } = dataItem;

    const _renderVipSwitcherCell = () => {
        return isMarkVoid ?
            <Cell className="center-align">
                <div className="cell-ticket-void">
                    <span>{LangHelper.getSingleResource('No')}</span>
                    <i class="icon icon-warning"></i>
                </div>
            </Cell>
            : <VipSwitcherCell dataItem={dataItem} />
    }

    return (<Row key={`player_row_${systemId}`}>
        <Cell className="center-align">
            {!isMarkVoid && <CheckBox id={`selectPlayer_${systemId}`}
                checked={isSelected === true}
                onChange={(checked) => {
                    dataItem.isSelected = checked;
                    setPlayerList([...playerList]);
                }} />}</Cell>
        <Cell className="center-align">{externalId}</Cell>
        <Cell className="center-align">{systemId}</Cell>
        {_renderVipSwitcherCell()}
    </Row>)
}

function mapDispatchToProps(dispatch) {
    const { setPlayerList } = ActionCreators;
    return bindActionCreators({ setPlayerList }, dispatch);
}

function mapStateToProps(state) {
    const { playerList } = state;
    return Object.assign({}, { playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayerRow));

